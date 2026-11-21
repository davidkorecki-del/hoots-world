/* Hoot lessons engine (3e22)
   Data-driven lessons for the little ones. Every lesson is a list of items
   plus recorded clips — no speech synthesis, ever. One loop for all of them:
     1. Hoot shows each item and says its name (tap any item to hear it again)
     2. "Your turn" rounds: Hoot asks for one item among 3; positions shuffle
        every round so position can't be memorised; wrong taps get a hint
        and the same question again; right taps get praise and the next
        round starts by itself
     3. Recap + sticker, then Play again / Next lesson
   Results are saved per child (first-try right / wrong taps / when), which
   the mastery + review layer (3e24) builds on.
   Public API: window.HootLessons = { paths, lessons, byTitle, renderPath,
   play, stop, isDone, results }. */
(function () {
  "use strict";

  var VOICE = "assets/voice/";
  var STORE_KEY = "hootworld.hl.v1";

  /* ---------- item vocab (what each picture is + the clip that names it) ---------- */
  var LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
  var LETTER_COLORS = ["#C2410C", "#1D4ED8", "#1B7A34", "#6D28D9", "#B4231C", "#0E7490", "#BE185D"]; /* all >= 4.5:1 on white */
  var COLORS = {
    red: "#E03131", yellow: "#FFD43B", blue: "#1C7ED6", green: "#2F9E44", orange: "#FD7E14",
    purple: "#7048E8", pink: "#F783AC", brown: "#8B5A2B", black: "#1A1A1A", white: "#FFFFFF"
  };
  var SHAPES = ["circle", "square", "triangle", "star", "heart", "rectangle", "oval", "diamond"];
  var BODY = { eyes: "👀", ears: "👂", nose: "👃", mouth: "👄", hands: "🙌", feet: "🦶" };
  var PRAISE = ["hoot-great-job", "hoot-amazing", "hoot-star", "hoot-great-thinking"];
  var NUDGE = ["hoot-try-again", "hoot-look-closely", "hoot-keep-going"];

  var POS_SVG = function (k) {
    var box = '<rect x="18" y="52" width="64" height="38" rx="4" fill="#C2410C" stroke="#17263b" stroke-width="4"/>';
    var ball = { in: '<path d="M16 44 V88 H84 V44" fill="#FDE2CF" stroke="#17263b" stroke-width="4" stroke-linejoin="round"/><circle cx="50" cy="70" r="14" fill="#1D4ED8" stroke="#17263b" stroke-width="3"/><path d="M16 88 H84" stroke="#C2410C" stroke-width="6"/><path d="M16 44 V88 M84 44 V88" stroke="#C2410C" stroke-width="5"/>',
      on: '<circle cx="50" cy="38" r="13" fill="#1D4ED8" stroke="#17263b" stroke-width="3"/>' + box,
      under: '<rect x="18" y="26" width="64" height="38" rx="4" fill="#C2410C" stroke="#17263b" stroke-width="4"/><path d="M24 64 V80 M76 64 V80" stroke="#17263b" stroke-width="5"/><circle cx="50" cy="80" r="11" fill="#1D4ED8" stroke="#17263b" stroke-width="3"/>' }[k];
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' + ball + "</svg>";
  };
  var PIC = {
    home: { emo: "🏠", name: "Home", clip: "call-home", teach: "teach-home", text: "This is a HOME — where a family lives." },
    town: { emo: "🏘️", name: "Town", clip: "call-town", teach: "teach-town", text: "This is a TOWN — houses, shops and a library." },
    map: { emo: "🗺️", name: "Map", clip: "call-map", teach: "teach-map", text: "This is a MAP — it shows where things are." },
    flag: { emo: "🇺🇸", name: "Flag", clip: "call-flag", teach: "teach-flag", text: "This is the flag of the United States — stars and stripes!" },
    ct: { emo: "🌳", name: "Connecticut", clip: "teach-connecticut", teach: "teach-connecticut", text: "We live in CONNECTICUT! Connecticut is our state." },
    firefighter: { emo: "🧑‍🚒", name: "Firefighter", clip: "call-firefighter", teach: "teach-firefighter", text: "A FIREFIGHTER helps put out fires." },
    doctor: { emo: "🧑‍⚕️", name: "Doctor", clip: "call-doctor", teach: "teach-doctor", text: "A DOCTOR helps us when we are sick." },
    teacher: { emo: "🧑‍🏫", name: "Teacher", clip: "call-teacher", teach: "teach-teacher", text: "A TEACHER helps us learn." },
    police: { emo: "👮", name: "Police officer", clip: "call-police-officer", teach: "teach-police-officer", text: "A POLICE OFFICER helps keep us safe." },
    turns: { emo: "🔁", name: "Take turns", clip: "teach-take-turns", teach: "teach-take-turns", text: "We TAKE TURNS. That's a good rule!" },
    kind: { emo: "🤲", name: "Kind hands", clip: "teach-kind-hands", teach: "teach-kind-hands", text: "We use KIND HANDS. That's a good rule too!" },
    in: { svg: "in", name: "In", clip: "call-in", text: "The ball is IN the box." },
    on: { svg: "on", name: "On", clip: "call-on", text: "The ball is ON the box." },
    under: { svg: "under", name: "Under", clip: "call-under", text: "The ball is UNDER the box." }
  };
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  /* 3e37: the call-letter / call-color / call-shape / call-number clips are
     Hoot's QUESTIONS ("Find the letter A"), not names. They are only played
     to ask. To name something (teaching, praise, a wrong tap) Hoot uses a
     name clip when one exists (name-<kind>-<key>, listed in HOOT_NAMES), the
     letter's sound clip for letters, or nothing. */
  var HOOT_NAMES = window.HOOT_NAMES = window.HOOT_NAMES || {};
  /* 3e44: voice request 6 (Muse). Games inside the player look clips up here
     (window.parent.HOOT_HAVE) and only play a clip that is listed. */
  var HOOT_HAVE = window.HOOT_HAVE = window.HOOT_HAVE || {};
  /* 3e52: voice request 7 (32 lines), checked by speech recognition and levelled */
  ["ask-hear-with", "ask-how-many", "ask-how-many-altogether", "ask-how-many-animals", "ask-how-many-ducklings", "ask-how-many-stars", "ask-see-with", "ask-smell-with", "ask-stop-at-line", "ask-what-comes-after", "ask-what-shape-hiding", "ask-which-pile", "ask-who-lives-in", "ask-whos-in-hat", "band-watch-listen", "name-color-sky-blue", "say-your-turn", "word-and", "word-bells", "word-circles", "word-diamonds", "word-drum", "word-hearts", "word-make", "word-ovals", "word-plus", "word-rectangles", "word-shaker", "word-squares", "word-stars", "word-triangles", "word-xylophone"].forEach(function (k) { HOOT_HAVE[k] = 1; });
  /* wave-2 (Muse): auto-flow + name clips recorded 2026-11-21, files on main in 89f9611/ccb7746 */
  ["hoot-tap-big-btn", "hoot-next-one", "hoot-clean-page", "hoot-turn-page", "hoot-try-this-one", "name-different", "name-doctor", "name-firefighter", "name-flag", "name-home", "name-in", "name-less", "name-map", "name-more", "name-on", "name-police-officer", "name-same", "name-teacher", "name-town", "name-under"].forEach(function (k) { HOOT_HAVE[k] = 1; });
  ["ask-can-you-find", "ask-who-says-baa", "ask-who-says-meow", "ask-who-says-oink", "ask-who-says-ribbit", "feed-hungry-for", "food-apple", "food-apple-one", "food-banana", "food-banana-one", "food-broccoli", "food-broccoli-one", "food-carrot", "food-carrot-one", "food-cheese", "food-cheese-one", "food-corn", "food-corn-one", "food-egg", "food-egg-one", "food-grapes", "food-grapes-one", "food-orange", "food-orange-one", "food-pear", "food-pear-one", "food-strawberry", "food-strawberry-one", "food-watermelon", "food-watermelon-one", "homes-where-ant", "homes-where-bear", "homes-where-bee", "homes-where-bird", "homes-where-fish", "homes-where-fox", "homes-where-frog", "homes-where-penguin", "homes-where-rabbit", "homes-where-spider", "homes-where-squirrel", "homes-where-turtle", "name-letter-a", "name-letter-b", "name-letter-c", "name-letter-d", "name-letter-e", "name-letter-f", "name-letter-g", "name-letter-h", "name-letter-i", "name-letter-j", "name-letter-k", "name-letter-l", "name-letter-m", "name-letter-n", "name-letter-o", "name-letter-p", "name-letter-q", "name-letter-r", "name-letter-s", "name-letter-t", "name-letter-u", "name-letter-v", "name-letter-w", "name-letter-x", "name-letter-y", "name-letter-z", "peek-where-bear", "peek-where-bunny", "peek-where-fox", "peek-where-frog", "peek-where-hedgehog", "peek-where-squirrel", "sound-baa", "sound-meow", "sound-moo", "sound-oink", "sound-quack", "sound-ribbit", "sound-woof", "teach-eyes", "word-ant", "word-ball", "word-balloon", "word-bear", "word-bee", "word-bird", "word-bunny", "word-butterflies", "word-butterfly", "word-cat", "word-chef-outfit", "word-cow", "word-crown", "word-dino-costume", "word-dino-feet", "word-dog", "word-duck", "word-duckling", "word-fish", "word-flower", "word-flower-lei", "word-fox", "word-frog", "word-glasses", "word-gold-medal", "word-hat", "word-hedgehog", "word-home-anthill", "word-home-beehive", "word-home-burrow", "word-home-cave", "word-home-den", "word-home-icy-shore", "word-home-lily-pad", "word-home-nest", "word-home-pond", "word-home-shell", "word-home-tree-hollow", "word-home-web", "word-kite", "word-kitten", "word-lion", "word-moon", "word-outfit", "word-party-hat", "word-penguin", "word-pig", "word-pirate-hat", "word-present", "word-pumpkin", "word-rabbit", "word-rainbow-top", "word-red-boots", "word-rosy-cheeks", "word-sheep", "word-shoes", "word-sneakers", "word-sparkle-shoes", "word-spider", "word-squirrel", "word-star", "word-star-glasses", "word-star-wand", "word-sun-hat", "word-sunglasses", "word-super-mask", "word-super-suit", "word-teddy-bear", "word-treasure", "word-turtle", "ask-who-says-woof", "ask-who-says-moo", "ask-who-says-quack"].forEach(function (k) { HOOT_HAVE[k] = 1; });
  /* 3e41: the names, cut from Hoot's own "Find the color blue" recordings
     (assets/voice/name-*.mp3). Each cut was checked by speech recognition to
     say only the name, and levelled to match Hoot's other lines. */
  ["black", "blue", "brown", "green", "orange", "pink", "purple", "red", "white", "yellow"].forEach(function (k) { HOOT_NAMES["color-" + k] = 1; });
  ["circle", "diamond", "heart", "oval", "rectangle", "square", "star", "triangle"].forEach(function (k) { HOOT_NAMES["shape-" + k] = 1; });
  for (var nn = 1; nn <= 10; nn++) HOOT_NAMES["number-" + nn] = 1;
  "abcdefghijklmnopqrstuvwxyz".split("").forEach(function (c) { HOOT_NAMES["letter-" + c] = 1; }); /* 3e44: letter names recorded (request 6) */
  function nameClip(it) {
    if (!it) return null;
    var k = (it.kind === "dots" || it.kind === "grp" ? "number" : it.kind) + "-" + it.key;
    return HOOT_NAMES[k] ? "name-" + k : null;
  }
  window.__hootNameClip = function (kind, key) { var k = kind + "-" + key; return HOOT_NAMES[k] ? "name-" + k : null; };
  function isAskClip(c) { return /^call-(letter|color|shape|number)-/.test(String(c || "")); }
  function sayName(it) { /* how Hoot NAMES an item; never a question clip */
    var n = nameClip(it); if (n) return [n];
    if (it.kind === "letter") return [it.sound];
    return it.clip && !isAskClip(it.clip) ? [it.clip] : [];
  }
  function item(kind, key) {
    if (kind === "letter") return { kind: kind, key: key, name: key.toUpperCase(), clip: "call-letter-" + key, sound: "coach/phonics-" + key };
    if (kind === "color") return { kind: kind, key: key, name: cap(key), clip: "call-color-" + key };
    if (kind === "shape") return { kind: kind, key: key, name: cap(key), clip: "call-shape-" + key };
    if (kind === "number") return { kind: kind, key: key, name: String(key), clip: "call-number-" + key };
    if (kind === "dots") return { kind: kind, key: key, name: key + (key === 1 ? " dot" : " dots"), clip: "call-number-" + key };
    if (kind === "body") return { kind: kind, key: key, name: cap(key), clip: "teach-" + key };
    if (kind === "pic") { var p = PIC[key]; return { kind: kind, key: key, name: p.name, clip: p.clip, teach: p.teach || p.clip, text: p.text, emo: p.emo, svg: p.svg }; }
    if (kind === "grp") return { kind: kind, key: key, name: key + (key === 1 ? " dot" : " dots"), clip: "call-number-" + key };
    if (kind === "pair") { var sh = String(key).split("|"); return { kind: kind, key: key, name: sh[0] === sh[1] ? "the same" : "different", same: sh[0] === sh[1], shapes: sh }; }
    return null;
  }

  /* ---------- lesson data ---------- */
  var lessons = [];
  var paths = {
    letters: { id: "letters", title: "Letters A–Z", emo: "🔤", lessons: [] },
    basics: { id: "basics", title: "Colours, shapes & numbers", emo: "🎨", lessons: [] }
  };

  /* Letter of the week: teach name + sound, then rounds by name and by sound.
     Distractors come from letters already learned (spiral review); the last
     round asks for an earlier letter by name, so old letters keep coming back. */
  LETTERS.forEach(function (l, i) {
    var it = item("letter", l);
    var prev = LETTERS.slice(Math.max(0, i - 6), i);
    var pool = prev.length >= 2 ? prev : LETTERS.slice(i + 1, i + 4);
    var rounds = [
      { target: l, ask: "name", pool: pool },
      { target: l, ask: "sound", pool: pool },
      { target: l, ask: "name", pool: pool }
    ];
    if (prev.length) rounds[2] = { target: prev[prev.length - 1 - (i % Math.min(prev.length, 3))], ask: "name", pool: [l].concat(prev), review: true };
    var lesson = {
      id: "letter-" + l, path: "letters", title: "Letter " + l.toUpperCase(), emo: l.toUpperCase(),
      kind: "letter", teach: [l], rounds: rounds, color: LETTER_COLORS[i % LETTER_COLORS.length],
      intro: "Hoo hoo! Today's letter is " + l.toUpperCase() + "! Watch and listen.",
      recap: "You learned the letter " + l.toUpperCase() + " — its name AND its sound!"
    };
    lessons.push(lesson); paths.letters.lessons.push(lesson.id);
  });

  function addSet(id, title, emo, kind, teach, roundTargets, pool, recap, color) {
    var lesson = {
      id: id, path: "basics", title: title, emo: emo, kind: kind, teach: teach, color: color || "#2F6FD6",
      rounds: roundTargets.map(function (t) { return { target: t, ask: "name", pool: pool || teach }; }),
      intro: "Hoo hoo! Watch and listen — then it's your turn!", recap: recap
    };
    lessons.push(lesson); paths.basics.lessons.push(id);
  }
  /* 3e45: the first colour and shape lessons now teach like "My home, my town":
     one picture at a time, Hoot says its name, then ONE question per round.
     Same titles as the old Little Explorers cards, so those cards open these. */
  addSet("colors-first", "Colour names", "🔴", "color", ["red", "yellow", "blue"], ["yellow", "blue", "red"], null,
    "RED like a strawberry, YELLOW like the sun, BLUE like the sky — colours have names!", "#D9480F");
  addSet("colors-more", "More colours: green, orange, purple", "🟢", "color", ["green", "orange", "purple"], ["orange", "purple", "green"], ["red", "yellow", "blue", "green", "orange", "purple"],
    "GREEN, ORANGE and PURPLE — three more colour names!", "#2B8A3E");
  addSet("shapes-first", "Shape names", "🔺", "shape", ["circle", "square", "triangle"], ["square", "triangle", "circle"], null,
    "A CIRCLE is round, a SQUARE has four equal sides, a TRIANGLE has three!", "#1971C2");
  addSet("shapes-star-heart", "Star and heart shapes", "⭐", "shape", ["star", "heart"], ["heart", "star", "heart"], ["circle", "square", "triangle", "star", "heart"],
    "A STAR has five points and a HEART means love!", "#C2255C");
  addSet("colors-new", "Pink, brown, black & white", "🎨", "color", ["pink", "brown", "black", "white"], ["pink", "black", "brown", "white"], null,
    "PINK, BROWN, BLACK and WHITE — four new colour names!", "#C2255C");
  addSet("colors-all", "Rainbow review", "🌈", "color", ["red", "orange", "yellow", "green", "blue", "purple"], ["green", "red", "purple", "yellow", "blue"],
    ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "black", "white"], "You know so many colour names!", "#7048E8");
  addSet("shapes-new", "Rectangle, oval & diamond", "🔷", "shape", ["rectangle", "oval", "diamond"], ["oval", "diamond", "rectangle"], null,
    "A RECTANGLE is a long box, an OVAL is a stretched circle, and a DIAMOND is a tilted square!", "#0B7A8A");
  addSet("shapes-all", "Shape review", "⭐", "shape", ["circle", "square", "triangle", "star", "heart"], ["star", "circle", "heart", "triangle", "square"],
    SHAPES, "You can name all the shapes!", "#C2410C");
  addSet("numbers-1-5", "Numbers 1 to 5", "🔢", "number", [1, 2, 3, 4, 5], [3, 1, 5, 2, 4], null, "1, 2, 3, 4, 5 — you know their names!", "#1B7A34");
  addSet("numbers-6-10", "Numbers 6 to 10", "🔟", "number", [6, 7, 8, 9, 10], [8, 6, 10, 7, 9], null, "6, 7, 8, 9, 10 — big numbers!", "#2F6FD6");
  addSet("dots-count", "How many dots?", "⚫", "dots", [1, 2, 3, 4, 5], [2, 4, 3, 5, 1], [1, 2, 3, 4, 5], "You counted the dots — touch each one, say its number!", "#8A4FD0");
  addSet("body-more", "Hands, feet & mouth", "🙌", "body", ["hands", "feet", "mouth"], ["feet", "mouth", "hands", "eyes"], ["eyes", "ears", "nose", "mouth", "hands", "feet"],
    "HANDS to hold, FEET to walk, a MOUTH to talk and eat!", "#B4231C");

  /* 3e27 — lessons built on the 31 new Hoot clips */
  paths.world = { id: "world", title: "My world", emo: "🌍", lessons: [] };
  function addPic(path, id, title, emo, teachKeys, roundKeys, pool, recap, color, intro) {
    var lesson = { id: id, path: path, title: title, emo: emo, kind: "pic", teach: teachKeys, color: color,
      rounds: roundKeys.map(function (t) { return { target: t, ask: "name", pool: pool || roundKeys }; }),
      intro: intro || "Hoo hoo! Watch and listen — then it's your turn!", recap: recap };
    lessons.push(lesson); paths[path].lessons.push(id);
  }
  addPic("world", "world-home", "My home, my town & my country", "🏡", ["home", "town", "map", "flag", "ct"], ["town", "flag", "map", "home"], ["home", "town", "map", "flag"],
    "A HOME is where a family lives, a TOWN has houses and shops, a MAP shows where things are — and that's the flag of the United States!", "#1D4ED8");
  addPic("world", "world-helpers", "Community helpers", "🧑‍🚒", ["firefighter", "doctor", "teacher", "police", "turns", "kind"], ["doctor", "firefighter", "police", "teacher"], ["firefighter", "doctor", "teacher", "police"],
    "Firefighters, doctors, teachers and police officers help our town — and we help too, by taking turns and using kind hands!", "#B4231C");
  addPic("basics", "pos-in-on-under", "In, on & under", "📦", ["in", "on", "under"], ["on", "under", "in", "under"], ["in", "on", "under"],
    "IN the box, ON the box, UNDER the box — you know where things are!", "#0E7490");
  var cmpL = { id: "more-less", path: "basics", title: "More and less", emo: "⚖️", kind: "grp", color: "#6D28D9",
    teachItems: [{ kind: "grp", key: 5, say: ["call-more"], text: "This group has MORE dots — 5!" }, { kind: "grp", key: 2, say: ["call-less"], text: "This group has LESS — only 2." }],
    rounds: [{ ask: "more" }, { ask: "less" }, { ask: "more" }, { ask: "less" }],
    intro: "Hoo hoo! Some groups have MORE, some have LESS. Watch!", recap: "MORE means a bigger group, LESS means a smaller group!" };
  var pairL = { id: "same-different", path: "basics", title: "Same and different", emo: "🔍", kind: "pair", color: "#BE185D",
    teachItems: [{ kind: "pair", key: "circle|circle", say: ["call-same"], text: "Circle and circle — the SAME!" }, { kind: "pair", key: "circle|star", say: ["call-different"], text: "Circle and star — DIFFERENT!" }],
    rounds: [{ ask: "same" }, { ask: "different" }, { ask: "same" }, { ask: "different" }],
    intro: "Hoo hoo! Let's look closely — are they the same, or different?", recap: "SAME means they match. DIFFERENT means they don't!" };
  [cmpL, pairL].forEach(function (x) { lessons.push(x); paths.basics.lessons.push(x.id); });

  var byId = {}, byTitleMap = {};
  lessons.forEach(function (l) { byId[l.id] = l; byTitleMap[l.title] = l; });

  /* ---------- per-child results ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function save(d) { try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch (e) {} }
  function kidId() {
    try { return (window.__llState && window.__llState()) || document.body.getAttribute("data-profile") || "kida"; } catch (e) { return "kida"; }
  }
  /* Mastery: finished with at most 1 wrong tap = learned this time.
     Learned lessons come back for review after 1, 3, 7, then 21 days;
     a struggle (2+ wrong) resets to "needs another look" (review tomorrow). */
  var DAY = 864e5, GAPS = [1, 3, 7, 21];
  function record(lesson, wrong, rounds, ms) {
    var d = load(), k = kidId(), now = Date.now();
    d[k] = d[k] || {};
    var r = d[k][lesson.id] || { plays: 0, best: null, stage: 0 };
    r.plays += 1;
    r.lastWrong = wrong;
    r.rounds = rounds;
    r.done = true;
    r.best = r.best == null ? wrong : Math.min(r.best, wrong);
    if (wrong <= 1) {
      if (!r.due || now >= r.due || !r.mastered) r.stage = Math.min((r.stage || 0) + (r.mastered ? 1 : 0), GAPS.length - 1);
      r.mastered = true;
      r.struggle = false;
      r.due = now + GAPS[r.stage] * DAY;
    } else {
      r.struggle = true;
      r.stage = 0;
      r.due = now + DAY;
    }
    r.last = now;
    d[k][lesson.id] = r;
    save(d);
    try { document.dispatchEvent(new CustomEvent("hoot-lesson-done", { detail: { kid: k, id: lesson.id, title: lesson.title, wrong: wrong, rounds: rounds, ms: ms || 0, mastered: wrong <= 1 } })); } catch (e) {}
  }
  function dueReviews(kid) {
    var res = results(kid), now = Date.now(), out = [];
    Object.keys(res).forEach(function (id) { var r = res[id]; if (byId[id] && r.done && r.due && r.due <= now) out.push({ id: id, title: byId[id].title, struggle: !!r.struggle, due: r.due }); });
    out.sort(function (a, b) { return (b.struggle - a.struggle) || (a.due - b.due); });
    return out;
  }
  function isDone(title, kid) {
    var l = byTitleMap[title]; if (!l) return false;
    var d = load()[kid || kidId()] || {};
    return !!(d[l.id] && d[l.id].done);
  }
  function results(kid) { return load()[kid || kidId()] || {}; }

  /* ---------- audio: clips only, one queue, cancellable ---------- */
  var gen = 0, cur = null, voiceEl = null, lastSaid = {};
  function stopAudio() { gen++; if (cur) { cur.__govWait = false; cur.__govNext = null; cur.onended = cur.onerror = null; try { cur.pause(); } catch (e) {} cur = null; } }
  function say(keys, done) {
    var my = ++gen, i = 0;
    if (cur) { cur.__govWait = false; cur.__govNext = null; cur.onended = cur.onerror = null; try { cur.pause(); } catch (e) {} }
    keys = (keys || []).filter(Boolean);
    (function next() {
      if (my !== gen) return;
      if (i >= keys.length) { if (done) done(); return; }
      var k = keys[i++];
      lastSaid[k] = Date.now();
      if (!voiceEl) voiceEl = new Audio();
      var a = voiceEl;
      a.__govWait = false; a.__govNext = null; a.onended = a.onerror = null;
      try { a.pause(); } catch (e) {}
      a.src = VOICE + k + ".mp3";
      cur = a;
      var fin = function () { a.onended = a.onerror = null; if (my === gen) setTimeout(next, 180); };
      a.onended = fin; a.onerror = fin;
      var p = a.play();
      if (p && p.catch) p.catch(function () { setTimeout(fin, 900); });
    })();
  }
  /* rotate praise/nudge so no line repeats within 15 s */
  function pickFresh(list, avoid) {
    var now = Date.now();
    for (var i = 0; i < list.length; i++) {
      var k = list[(pickFresh.n = ((pickFresh.n || 0) + 1)) % list.length];
      if (k !== avoid && (!lastSaid[k] || now - lastSaid[k] > 15000)) return k;
    }
    return null; /* everything said recently: say nothing extra rather than repeat */
  }

  /* ---------- rendering ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function shapeSvg(k, fill) {
    var f = fill || "#2F6FD6", s = 'stroke="#17263b" stroke-width="4"';
    var body = {
      circle: '<circle cx="50" cy="50" r="38" fill="' + f + '" ' + s + "/>",
      square: '<rect x="14" y="14" width="72" height="72" rx="4" fill="' + f + '" ' + s + "/>",
      triangle: '<polygon points="50,10 90,86 10,86" fill="' + f + '" ' + s + ' stroke-linejoin="round"/>',
      star: '<polygon points="50,6 61,38 95,38 67,58 78,92 50,72 22,92 33,58 5,38 39,38" fill="' + f + '" ' + s + ' stroke-linejoin="round"/>',
      heart: '<path d="M50 88 C10 60 6 32 26 20 C38 13 48 20 50 30 C52 20 62 13 74 20 C94 32 90 60 50 88Z" fill="' + f + '" ' + s + "/>",
      rectangle: '<rect x="6" y="28" width="88" height="46" rx="4" fill="' + f + '" ' + s + "/>",
      oval: '<ellipse cx="50" cy="50" rx="44" ry="28" fill="' + f + '" ' + s + "/>",
      diamond: '<polygon points="50,6 90,50 50,94 10,50" fill="' + f + '" ' + s + ' stroke-linejoin="round"/>'
    }[k] || "";
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' + body + "</svg>";
  }
  function dotsSvg(n) {
    var pos = { 1: [[50, 50]], 2: [[30, 50], [70, 50]], 3: [[25, 72], [50, 28], [75, 72]], 4: [[30, 30], [70, 30], [30, 70], [70, 70]], 5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]], 6: [[30, 24], [70, 24], [30, 50], [70, 50], [30, 76], [70, 76]] }[n] || [];
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' + pos.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11" fill="#17263b"/>'; }).join("") + "</svg>";
  }
  function face(it, lesson) {
    if (it.kind === "letter") return '<span class="hl-glyph" style="color:' + lesson.color + '">' + it.key.toUpperCase() + '<small>' + it.key + "</small></span>";
    if (it.kind === "color") return '<span class="hl-swatch" style="background:' + COLORS[it.key] + '"></span>';
    if (it.kind === "shape") return shapeSvg(it.key, ["#E03131", "#1C7ED6", "#2F9E44", "#FD7E14", "#7048E8", "#F783AC", "#0B7A8A", "#FAB005"][SHAPES.indexOf(it.key) % 8]);
    if (it.kind === "number") return '<span class="hl-num">' + it.key + "</span>";
    if (it.kind === "dots") return dotsSvg(it.key);
    if (it.kind === "body") return '<span class="hl-emoji">' + BODY[it.key] + "</span>";
    if (it.kind === "pic") return it.svg ? POS_SVG(it.svg) : '<span class="hl-emoji">' + it.emo + "</span>";
    if (it.kind === "grp") return dotsSvg(it.key);
    if (it.kind === "pair") return '<span class="hl-pair">' + shapeSvg(it.shapes[0], "#1D4ED8") + shapeSvg(it.shapes[1], "#1D4ED8") + "</span>";
    return "";
  }
  /* the dots lesson shows dots only — the label would give the answer away */
  /* labels would give the answer away for dots, letters, groups, pairs and in/on/under */
  function label(it) { return it.kind === "dots" || it.kind === "letter" || it.kind === "grp" || it.kind === "pair" || (it.kind === "pic" && it.svg) ? "" : '<b class="hl-lab">' + esc(it.name) + "</b>"; }
  function hootSvg() {
    var src = document.querySelector("#panel-little .lt-hoot svg, .lt-hoot svg");
    return src ? src.outerHTML : '<span style="font-size:52px">🦉</span>';
  }

  function renderPath(pathId, body) {
    var p = paths[pathId]; if (!p || !body) return false;
    var res = results();
    if (external[pathId]) {
      body.innerHTML = '<div class="hs hs-list"><p class="hs-std">' + (pathId === "math7" ? "Fresh problems every time" : "Fresh questions every time") + ' · 4 of 5 right first try = learned</p>' + p.lessons.map(function (id, i) {
        var x = byId[id], r = res[id] || {};
        var st = r.struggle ? '<span class="hs-tag no">practise again</span>' : r.mastered ? '<span class="hs-tag ok">✓ learned</span>' : "";
        return '<button type="button" class="hs-row" data-hl-open="' + id + '"><span class="hs-n">' + (i + 1) + '</span><span class="hs-t">' + esc(x.title) + '<small>' + esc(x.std || "") + "</small></span>" + st + "</button>";
      }).join("") + "</div>";
      return true;
    }
    var firstTodo = -1;
    p.lessons.forEach(function (id, idx) { if (firstTodo < 0 && !(res[id] && res[id].done)) firstTodo = idx; });
    body.innerHTML = '<div class="hl hl-pathview"><p class="hl-pathlead">' + (pathId === "letters"
      ? "One letter at a time — Hoot says its name and its sound, then you find it. Earlier letters keep coming back so they stick."
      : "Colours, shapes and numbers — Hoot shows each one, then it's your turn.") + "</p>" +
      '<div class="hl-tiles">' + p.lessons.map(function (id, idx) {
        var l = byId[id], done = res[id] && res[id].done, isNext = idx === firstTodo;
        return '<button type="button" class="hl-tile' + (done ? " done" : "") + (isNext ? " next" : "") + '" data-hl-open="' + id + '" style="--c:' + l.color + '">' +
          (isNext ? '<span class="hl-tile-go" aria-hidden="true">▶</span>' : "") +
          '<span class="hl-tile-emo">' + esc(l.emo) + "</span><span class=\"hl-tile-t\">" + esc(l.title) + "</span>" + (done ? '<span class="hl-tile-star" aria-label="done">⭐</span>' : "") + "</button>";
      }).join("") + "</div></div>";
    return true;
  }

  /* 3e31: a song goes with each set — ABC song for the Letters path, Counting
     song for the number lessons. The button shows on every lesson in the set;
     the first time a child finishes the WHOLE set, Hoot sings it by himself. */
  var NUM_SET = ["numbers-1-5", "numbers-6-10", "dots-count"];
  function songSet(lesson) {
    if (lesson.path === "letters") return { key: "song-abc", title: "ABC song", emo: "🔤", ids: paths.letters.lessons, all: "You know ALL 26 letters! Let's sing the ABC song!" };
    if (NUM_SET.indexOf(lesson.id) >= 0) return { key: "song-counting", title: "Counting song", emo: "🌷", ids: NUM_SET, all: "You finished all the number lessons! Let's sing the counting song!" };
    return null;
  }
  function setDone(set, kid) { var r = results(kid); return set.ids.every(function (id) { return r[id] && r[id].done; }); }
  function HG() { var g = window.HootGames; return g && g.songs && g.sing ? g : null; }

  var run = null;
  function clearRunTimers(r) {
    if (!r) return;
    if (r.idleT) { r.idleT.forEach(function (t) { clearTimeout(t); }); r.idleT = []; }
    if (r.autoT) { clearTimeout(r.autoT); r.autoT = null; }
    if (r.ceilT) { clearTimeout(r.ceilT); r.ceilT = null; }
  }
  function stop() { try { var g = HG(); if (g && !document.querySelector(".pg-singing.kh-bye")) g.stopSing(); } catch (e) {} stopAudio(); if (run) { clearRunTimers(run); run.dead = true; run = null; } try { if (window.HootStudy) window.HootStudy.stop(); } catch (e) {} }

  /* other engines (Grade 7 math) register their paths here so progress,
     mastery, reviews, Practice and the dashboard work the same everywhere */
  var external = {};
  function register(path, list, playFn) {
    paths[path.id] = { id: path.id, title: path.title, emo: path.emo, lessons: [] };
    list.forEach(function (x) { x.path = path.id; x.ext = true; lessons.push(x); byId[x.id] = x; byTitleMap[x.title] = x; paths[path.id].lessons.push(x.id); });
    external[path.id] = playFn;
  }
  /* Fix pass: a big bubbly illustration at the top of every lesson screen.
     The four moved lessons reuse their generic lesson art; every other
     native lesson has its own hl-<id>.svg (letters: hl-letter-<x>.svg). */
  var HL_ART = {
    "colors-first": "little-colour-names",
    "colors-more": "little-more-colours-green-orange-purple",
    "shapes-first": "little-shape-names",
    "shapes-star-heart": "little-star-and-heart-shapes"
  };
  function hlArtFile(id) {
    return "assets/lesson-art/" + (HL_ART[id] || ("hl-" + id)) + ".svg";
  }
  function play(id, body) {
    var lesson = byId[id] || byTitleMap[id];
    if (!lesson || !body) return false;
    stop();
    if (lesson.ext && external[lesson.path]) { external[lesson.path](lesson, body); return true; }
    var R = run = { lesson: lesson, round: 0, wrong: 0, dead: false, body: body, t0: Date.now(), idleT: [], autoT: null, ceilT: null };
    function hasClip(k) { return !!(window.HOOT_HAVE && window.HOOT_HAVE[k]); }
    function clearIdle() { clearRunTimers(R); }
    function findTargetBtn(key) {
      var bs = choices.querySelectorAll(".hl-opt");
      for (var i = 0; i < bs.length; i++) if (bs[i].getAttribute("data-k") === String(key)) return bs[i];
      return null;
    }
    /* Wave 2 (Finding 2): 7s / 14s / 25s gentle idle re-prompt ladder (2-4 path only) */
    function armIdle(rd, tgt) {
      clearIdle();
      R.idleT.push(setTimeout(function () {
        if (!alive() || !R.cur || R.cur.rd !== rd) return;
        choices.querySelectorAll(".hl-opt:not(:disabled)").forEach(function (o) {
          o.classList.remove("hl-nudge"); void o.offsetWidth; o.classList.add("hl-nudge");
        });
        say(askClips(rd, tgt));
      }, 7000));
      R.idleT.push(setTimeout(function () {
        if (!alive() || !R.cur || R.cur.rd !== rd) return;
        var tb = findTargetBtn(tgt.key);
        if (tb && !tb.disabled) tb.classList.add("hint");
        say((hasClip("hoot-try-this-one") ? ["hoot-try-this-one"] : []).concat(askClips(rd, tgt)));
      }, 14000));
    }
    var teach = lesson.teachItems ? lesson.teachItems.map(function (t) { var it = item(t.kind, t.key); it.say = t.say; it.text = t.text; return it; })
      : lesson.teach.map(function (k) { return item(lesson.kind, k); });
    /* teaching NAMES each item ("blue"), never asks ("Find the color blue").
       If an item has no name recording, Hoot shows it silently rather than
       play a question clip. */
    function teachClips(it) { if (it.say) return it.say; if (it.kind === "pic") return [it.teach]; return sayName(it); }
    var set = songSet(lesson), g = HG(), sg = set && g && g.songs.filter(function (x) { return x.key === set.key; })[0];
    var songHtml = sg ? g.songBtn(sg, "hl-song") : "";
    body.innerHTML =
      '<div class="hl" data-hl="' + lesson.id + '">' +
        '<div class="hl-stage"><div class="hl-hoot">' + hootSvg() + "</div>" +
          '<p class="hl-bubble" aria-live="polite"></p></div>' +
        '<img class="hl-art" src="' + hlArtFile(lesson.id) + '" alt="" onerror="this.remove()">' +
        '<div class="hl-show">' + teach.map(function (it, i) {
          return '<button type="button" class="hl-item" data-i="' + i + '" aria-label="Hear ' + esc(it.name) + '">' + face(it, lesson) + label(it) + "</button>";
        }).join("") + "</div>" +
        '<button type="button" class="hl-replay" disabled>🔊 Hoot is teaching…</button>' +
        '<div class="hl-dots" aria-hidden="true"></div>' +
        '<div class="hl-choices"></div>' +
        '<div class="hl-end" hidden><p class="hl-sticker" aria-hidden="true"></p><p class="hl-autonote" hidden></p>' +
          '<div class="hl-endbtns"><button type="button" class="hl-next">Next lesson ▶</button><div class="hl-subbtns"><button type="button" class="hl-again">↻ Play again</button>' + songHtml + "</div></div></div>" +
      "</div>";
    var root = body.querySelector(".hl"), bubble = root.querySelector(".hl-bubble"), show = root.querySelector(".hl-show"),
      replay = root.querySelector(".hl-replay"), choices = root.querySelector(".hl-choices"), dots = root.querySelector(".hl-dots"), end = root.querySelector(".hl-end");
    function alive() { return run === R && !R.dead; }
    function setBubble(t) { bubble.textContent = t; }

    /* tap any shown item to hear it again */
    show.addEventListener("click", function (e) {
      var b = e.target.closest(".hl-item"); if (!b || !alive() || R.teaching) return;
      var it = teach[+b.getAttribute("data-i")];
      say(teachClips(it));
    });

    function teachAll() {
      R.teaching = true;
      replay.disabled = true; replay.textContent = "🔊 Hoot is teaching…";
      choices.innerHTML = ""; dots.innerHTML = ""; end.hidden = true;
      show.hidden = false;
      setBubble(lesson.intro);
      var i = 0, items = show.querySelectorAll(".hl-item");
      say(["owl-hello"], function step() {
        if (!alive()) return;
        items.forEach(function (x) { x.classList.remove("on"); });
        if (i >= teach.length) { R.teaching = false; startRound(); return; }
        var it = teach[i], el = items[i++];
        el.classList.add("on");
        setBubble(it.text || (it.kind === "letter" ? "This is " + it.name + ". " + it.name + " says its sound — listen!" : "This is " + it.name + "!"));
        say(teachClips(it), function () { setTimeout(step, 350); });
      });
    }
    function paintDots() {
      var n = lesson.rounds.length, h = "";
      for (var k = 0; k < n; k++) h += '<i class="' + (k < R.round ? "on" : k === R.round ? "now" : "") + '"></i>';
      dots.innerHTML = h + "<span>" + (R.round >= n ? "All " + n + " done — well done!" : (R.round + 1) + " of " + n) + "</span>";
    }
    function shuffle(a) { for (var k = a.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)); var t = a[k]; a[k] = a[j]; a[j] = t; } return a; }
    function askText(rd, it) {
      if (rd.ask === "sound") return "Which letter makes this sound? Listen…";
      if (rd.ask === "more") return "Which group has MORE dots?";
      if (rd.ask === "less") return "Which group has LESS — fewer dots?";
      if (rd.ask === "same") return "Find the pair that is the SAME!";
      if (rd.ask === "different") return "Find the pair that is DIFFERENT!";
      if (it.kind === "pic" && it.svg) return "Where is the ball? Find " + it.name.toUpperCase() + "!";
      if (it.kind === "dots") return "Find the one with " + it.name + "!";
      if (it.kind === "letter") return (rd.review ? "Remember this one? " : "Your turn! ") + "Find the letter " + it.name + "!";
      if (it.kind === "body") return "Your turn! Find " + it.name.toUpperCase() + "!";
      return "Your turn! Tap " + it.name.toUpperCase() + "!";
    }
    function askClips(rd, it) { return rd.ask === "sound" ? [it.sound] : rd.ask === "more" ? ["call-more"] : rd.ask === "less" ? ["call-less"] : rd.ask === "same" ? ["call-same"] : rd.ask === "different" ? ["call-different"] : [it.clip]; }
    function genRound(rd) {
      if (rd.ask === "more" || rd.ask === "less") {
        var a = 1 + Math.floor(Math.random() * 6), b;
        do { b = 1 + Math.floor(Math.random() * 6); } while (Math.abs(a - b) < 2);
        var big = Math.max(a, b), small = Math.min(a, b);
        return { tgt: item("grp", rd.ask === "more" ? big : small), opts: shuffle([item("grp", a), item("grp", b)]) };
      }
      if (rd.ask === "same" || rd.ask === "different") {
        var S = shuffle(["circle", "square", "triangle", "star", "heart"].slice());
        var sameP = function (s) { return item("pair", s + "|" + s); }, diffP = function (s, t) { return item("pair", s + "|" + t); };
        var tg = rd.ask === "same" ? sameP(S[0]) : diffP(S[0], S[1]);
        var others = rd.ask === "same" ? [diffP(S[1], S[2]), diffP(S[3], S[4])] : [sameP(S[2]), sameP(S[3])];
        return { tgt: tg, opts: shuffle([tg].concat(others)) };
      }
      var t = item(lesson.kind, rd.target);
      var oth = shuffle(rd.pool.filter(function (k) { return k !== rd.target; })).slice(0, 2);
      return { tgt: t, opts: shuffle([rd.target].concat(oth)).map(function (k) { return item(lesson.kind, k); }) };
    }
    function startRound() {
      if (!alive()) return;
      clearIdle();
      var rd = lesson.rounds[R.round], g = genRound(rd), tgt = g.tgt, opts = g.opts;
      show.hidden = true;
      R.opts = opts;
      R.cur = { rd: rd, tgt: tgt, wrongHere: 0 };
      paintDots();
      replay.disabled = false; replay.textContent = "🔊 Hear it again";
      choices.innerHTML = opts.map(function (it) {
        return '<button type="button" class="hl-opt hl-ready" data-k="' + esc(it.key) + '" aria-label="' + esc(it.name) + '">' + face(it, lesson) + label(it) + "</button>";
      }).join("");
      setBubble(askText(rd, tgt));
      say(askClips(rd, tgt), function () { if (alive() && R.cur && R.cur.rd === rd) armIdle(rd, tgt); });
    }
    replay.addEventListener("click", function () {
      if (!alive()) return;
      clearIdle();
      if (R.cur && !R.teaching) {
        var rd0 = R.cur.rd, tgt0 = R.cur.tgt;
        say(askClips(rd0, tgt0), function () { if (alive() && R.cur && R.cur.rd === rd0) armIdle(rd0, tgt0); });
      }
      else if (end && !end.hidden) teachAll();
    });
    choices.addEventListener("click", function (e) {
      var b = e.target.closest(".hl-opt"); if (!b || b.disabled || !alive() || !R.cur) return;
      clearIdle();
      choices.querySelectorAll(".hl-opt").forEach(function (o) { o.classList.remove("hl-nudge"); });
      var key = b.getAttribute("data-k"), tgt = R.cur.tgt, rd = R.cur.rd;
      if (String(key) === String(tgt.key)) {
        b.classList.add("right");
        try { if (window.__oopsAnswer) window.__oopsAnswer({ pid: kidId(), lessonId: lesson.id, title: lesson.title, item: "r" + R.round, right: true }); } catch (e) {} /* Wave E2: Oops Garden */
        choices.querySelectorAll(".hl-opt").forEach(function (o) { o.disabled = true; });
        var pr = pickFresh(PRAISE);
        var yes = rd.ask === "sound" ? tgt.name + " makes that sound!" : rd.ask === "more" ? "That group has MORE!" : rd.ask === "less" ? "That group has LESS!" : rd.ask === "same" ? "Those two are the SAME!" : rd.ask === "different" ? "Those two are DIFFERENT!" : "That's " + tgt.name + "!";
        setBubble("⭐ YES! " + yes);
        burst(b);
        R.cur = null;
        /* right answer: the item's NAME (never the question again, never the sound
           Hoot just played to ask) and then praise */
        say((rd.ask === "name" || rd.ask === "sound" ? sayName(tgt).filter(function (c) { return !/^coach\/phonics-/.test(c); }) : []).concat([pr]), function () {
          if (!alive()) return;
          R.round += 1;
          if (R.round >= lesson.rounds.length) { finish(); return; }
          /* 3e41: a short breath after the praise, so the next question is
             clearly a NEW one and not the last one said again */
          setTimeout(function () { if (alive()) startRound(); }, 800);
        });
      } else {
        R.wrong += 1; R.cur.wrongHere += 1;
        try { if (window.__oopsAnswer) window.__oopsAnswer({ pid: kidId(), lessonId: lesson.id, title: lesson.title, item: "r" + R.round, right: false }); } catch (e) {} /* Wave E2: Oops Garden */
        b.classList.add("wrong"); b.disabled = true;
        var tapped = (R.opts || []).filter(function (o) { return String(o.key) === String(key); })[0] || item(lesson.kind, isNaN(+key) ? key : +key);
        var cmpT = rd.ask === "more" || rd.ask === "less" ? "That group has " + tapped.name + ". " + (rd.ask === "more" ? "Find the group with MORE!" : "Find the group with LESS!")
          : rd.ask === "same" || rd.ask === "different" ? "Those two are " + tapped.name + ". Find the pair that is " + (rd.ask === "same" ? "the SAME!" : "DIFFERENT!") : null;
        setBubble(cmpT || ("That one is " + tapped.name + ". " + (rd.ask === "sound" ? "Listen again — which letter makes this sound?" : "Look for " + tgt.name + "!")));
        var target = findTargetBtn(tgt.key);
        if (R.cur.wrongHere >= 2 && target) target.classList.add("hint");
        var nudge = pickFresh(NUDGE);
        say([nudge].concat(tapped.kind === "pair" ? [] : sayName(tapped)).concat(askClips(rd, tgt)), function () {
          if (alive() && R.cur && R.cur.rd === rd) armIdle(rd, tgt);
        });
      }
    });
    function finish() {
      clearIdle();
      paintDots();
      choices.innerHTML = "";
      replay.textContent = "↻ Watch Hoot teach again";
      replay.disabled = false;
      var sticker = typeof window.__llStickerFor === "function" ? window.__llStickerFor(lesson.title) : "🌟";
      end.querySelector(".hl-sticker").textContent = sticker;
      end.hidden = false;
      var fromToday = !!window.__hwFromTodayPath && typeof window.__llAdvanceTodayPath === "function";
      var nxt = nextLesson(lesson);
      var nb = end.querySelector(".hl-next");
      var note = end.querySelector(".hl-autonote");
      if (fromToday) {
        nb.disabled = false;
        nb.textContent = "Next up ▶";
        nb.classList.add("hw-next-pulse");
        if (note) { note.hidden = false; note.textContent = "✨ Moving to the next stop…"; }
      } else if (nxt) {
        nb.disabled = false;
        nb.textContent = "Next lesson ▶";
        nb.classList.add("hw-next-pulse");
        if (note) note.hidden = true;
      } else {
        nb.textContent = "🏆 Path complete";
        nb.disabled = true;
        nb.classList.remove("hw-next-pulse");
        if (note) note.hidden = true;
      }
      var wasAll = sg ? setDone(set) : true;
      record(lesson, R.wrong, lesson.rounds.length, Date.now() - R.t0);
      var bigDay = sg && !wasAll && setDone(set);
      setBubble("🦉 " + (bigDay ? "🏆 " + set.all : lesson.recap + " You earned a sticker!"));
      var nk = ""; try { nk = window.__llNameKey ? window.__llNameKey() || "" : ""; } catch (e) {}
      var recapNames = [];
      teach.slice(0, 4).forEach(function (t) { teachClips(t).forEach(function (c) { if (c) recapNames.push(c); }); });
      var advanced = false;
      function doTodayAdvance() {
        if (advanced || !alive()) return;
        advanced = true;
        clearIdle();
        if (hasClip("hoot-next-one")) {
          say(["hoot-next-one"], function () { if (alive() && typeof window.__llAdvanceTodayPath === "function") window.__llAdvanceTodayPath(); });
        } else if (typeof window.__llAdvanceTodayPath === "function") {
          window.__llAdvanceTodayPath();
        }
      }
      function scheduleTodayAdvance() {
        if (!fromToday || advanced || !alive()) return;
        if (R.autoT) clearTimeout(R.autoT);
        R.autoT = setTimeout(doTodayAdvance, 1500);
      }
      if (fromToday && !bigDay) {
        R.ceilT = setTimeout(doTodayAdvance, 12000);
      }
      say((nk ? ["great-job-" + nk] : []).concat(["hoot-you-learned"]).concat(recapNames), function () {
        if (!alive()) return;
        var sb = end.querySelector(".hl-song");
        if (bigDay && sb && !sb.classList.contains("pg-singing")) { g.sing(set.key, sb); return; }
        if (fromToday) { scheduleTodayAdvance(); return; }
        if (nxt && hasClip("hoot-tap-big-btn")) say(["hoot-tap-big-btn"]);
      });
      try {
        var sc = body; var r = end.getBoundingClientRect(), sr = sc.getBoundingClientRect();
        if (r.bottom > sr.bottom) sc.scrollTop += r.bottom - sr.bottom + 12;
      } catch (e) {}
    }
    var songB = end.querySelector(".hl-song");
    if (songB) songB.addEventListener("click", function () { if (!alive()) return; clearIdle(); stopAudio(); g.sing(set.key, songB); });
    end.querySelector(".hl-again").addEventListener("click", function () { if (!alive()) return; clearIdle(); if (songB && songB.classList.contains("pg-singing")) g.stopSing(); R.round = 0; R.wrong = 0; R.t0 = Date.now(); teachAll(); });
    end.querySelector(".hl-next").addEventListener("click", function () {
      clearIdle();
      if (window.__hwFromTodayPath && typeof window.__llAdvanceTodayPath === "function") {
        window.__llAdvanceTodayPath();
        return;
      }
      var nxt = nextLesson(lesson); if (!nxt) return;
      var ttl = document.querySelector("#ll-otitle"); if (ttl) ttl.textContent = nxt.title;
      play(nxt.id, body);
      try { body.scrollTop = 0; } catch (e) {}
    });
    teachAll();
    return true;
  }
  function nextLesson(lesson) {
    var list = paths[lesson.path].lessons, i = list.indexOf(lesson.id);
    return i >= 0 && i < list.length - 1 ? byId[list[i + 1]] : null;
  }
  function burst(el) {
    try {
      var s = document.createElement("span"); s.className = "hl-burst"; s.textContent = "⭐";
      el.appendChild(s); setTimeout(function () { s.remove(); }, 900);
    } catch (e) {}
  }

  /* path view: tap a tile to open that lesson */
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-hl-open]");
    if (!t) return;
    var body = t.closest("#ll-obody"); if (!body) return;
    var l = byId[t.getAttribute("data-hl-open")];
    if (!l) return;
    window.__hwFromTodayPath = false;
    var ttl = document.querySelector("#ll-otitle"); if (ttl) ttl.textContent = l.title;
    play(l.id, body);
    body.scrollTop = 0;
  });

  window.HootLessons = {
    paths: paths, lessons: lessons, byId: byId,
    byTitle: function (t) { return byTitleMap[t] || null; },
    renderPath: renderPath, play: play, stop: stop, isDone: isDone, results: results, dueReviews: dueReviews,
    register: register,
    recordResult: function (id, wrong, rounds, ms) { if (byId[id]) record(byId[id], wrong, rounds, ms); }
  };
})();
