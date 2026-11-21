/* Hoot's Party Games (3e29) — five new games in one shared format.
   Same rules as the lessons: one big Play button, Hoot explains out loud
   with recorded clips only (never speech synthesis), short rounds that move
   on by themselves, gentle hints, confetti + a sticker at the end, and the
   week's skill (letter of the week) where it fits.
   Look: bright candy colours, rounded glossy shapes, everything bounces on
   the beat — Hoot is the star; no borrowed characters, logos or songs.
   Music is an original tune made in code (Web Audio); it ducks under Hoot.
   Optional extra clips/songs from Muse are picked up automatically if the
   files exist (see HOOT-AUDIO-REQUEST.csv) — the games work without them. */
(function () {
  "use strict";
  var VOICE = "assets/voice/";
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  /* ---------- optional clips from Muse ----------
     Names listed here are used; anything not listed falls back to Hoot's
     existing clips. When Muse's files arrive, add their names to HAVE. */
  var HAVE = ["game-bubbles-intro", "game-garden-intro", "game-train-intro", "game-dance-intro", "game-helpers-intro", "game-sayit-intro",
    "say-pop-sound", "say-plant", "say-load", "say-show-me", "say-where-work", "hoot-party-done",
    "song-hoot-party", "song-hoot-party-inst", "song-abc", "song-counting", "song-dance-party", "song-goodbye"];
  var have = {}; HAVE.forEach(function (k) { have[k] = true; });
  function opt(k) { return have[k] ? k : null; }

  /* ---------- voice: clips only, one queue; never repeat a line within 15 s ---------- */
  /* The app's voice governor (index.html) holds a clip that is asked to play while
     another is speaking and plays it later. A line we have moved past must
     therefore be taken out of that wait list, or it would speak late. */
  var gen = 0, curA = null, said = {}, voicePoolEl = null;
  function resetAudioEl(a) {
    if (!a) return;
    a.__govWait = false; a.__govNext = null; a.onended = a.onerror = null;
    try { a.pause(); } catch (e) {}
  }
  function stopVoice() { gen++; resetAudioEl(curA); curA = null; duck(false); }
  function say(keys, done, allowRepeat) {
    var my = ++gen, i = 0, now = Date.now();
    resetAudioEl(curA);
    keys = (keys || []).filter(function (k) { if (!k) return false; if (!allowRepeat && /^(hoot|owl)-/.test(k) && said[k] && now - said[k] < 15000) return false; return true; });
    duck(true);
    (function next() {
      if (my !== gen) return;
      if (i >= keys.length) { duck(false); if (done) done(); return; }
      var k = keys[i++]; said[k] = Date.now();
      if (!voicePoolEl) voicePoolEl = new Audio();
      var a = voicePoolEl; curA = a;
      resetAudioEl(a);
      a.src = VOICE + k + ".mp3";
      var fin = function () { a.onended = a.onerror = null; if (my === gen) setTimeout(next, 140); };
      a.onended = fin; a.onerror = fin;
      var p = a.play(); if (p && p.catch) p.catch(function () { setTimeout(fin, 700); });
    })();
  }
  var PRAISE = ["hoot-great-job", "hoot-amazing", "hoot-star", "hoot-great-thinking"], NUDGE = ["hoot-try-again", "hoot-look-closely", "hoot-keep-going"];
  var pn = 0;
  function fresh(list) { for (var i = 0; i < list.length; i++) { var k = list[(pn++) % list.length]; if (!said[k] || Date.now() - said[k] > 15000) return k; } return null; }

  /* ---------- music: an original, gentle loop (pentatonic, 112 bpm) ---------- */
  var AC = null, master = null, musicOn = true, loopT = null, ducked = false;
  var MELODY = [0, 2, 4, 7, 4, 2, 4, 9, 7, 4, 2, 0, 2, 4, 2, 0], BASS = [0, 0, 7, 7, 5, 5, 7, 7];
  function ac() {
    if (!AC) {
      try {
        AC = window.__hwAudioCtx ? window.__hwAudioCtx() : new (window.AudioContext || window.webkitAudioContext)();
        if (AC) { master = AC.createGain(); master.gain.value = 0.07; master.connect(AC.destination); }
      } catch (e) { AC = null; }
    }
    return AC;
  }
  function note(semi, t, dur, type, vol) {
    var c = ac(); if (!c) return;
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || "triangle"; o.frequency.value = 392 * Math.pow(2, semi / 12);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol || 0.5, t + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  }
  /* Muse's party theme (instrumental). The file fades at its end, so each pass
     overlaps the next with a short crossfade instead of a hard loop. */
  var song = null, songLoading = false, songGain = null, songSrc = [], songT = null, songOn = false;
  function loadSong(cb) {
    if (song) return cb(true);
    if (!have["song-hoot-party-inst"] || songLoading || !window.fetch) return cb(false);
    songLoading = true;
    fetch(VOICE + "song-hoot-party-inst.mp3").then(function (r) { if (!r.ok) throw 0; return r.arrayBuffer(); })
      .then(function (b) { return new Promise(function (ok, no) { AC.decodeAudioData(b, ok, no); }); })
      .then(function (buf) { song = buf; songLoading = false; cb(true); }, function () { songLoading = false; cb(false); });
  }
  function songPass() {
    if (!songOn || !song) return;
    var c = AC, t = c.currentTime + 0.03, src = c.createBufferSource(), g = c.createGain(), X = 1.2;
    src.buffer = song; src.connect(g); g.connect(songGain);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + 0.5);
    g.gain.setValueAtTime(1, t + song.duration - X); g.gain.linearRampToValueAtTime(0, t + song.duration);
    src.start(t); songSrc.push(src); src.onended = function () { songSrc = songSrc.filter(function (x) { return x !== src; }); };
    songT = setTimeout(songPass, (song.duration - X) * 1000);
  }
  function startMusic() {
    var c = ac(); if (!c || !musicOn) return;
    if (c.state === "suspended") c.resume();
    stopMusic();
    if (have["song-hoot-party-inst"]) {
      if (!songGain) { songGain = c.createGain(); songGain.gain.value = ducked ? 0.09 : 0.28; songGain.connect(c.destination); }
      songOn = true;
      loadSong(function (ok) { if (!songOn) return; if (ok) songPass(); else { songOn = false; synthMusic(); } });
      return;
    }
    synthMusic();
  }
  function synthMusic() {
    var c = ac(); if (!c || !musicOn) return;
    var beat = 60 / 112 / 2, step = 0;
    (function tick() {
      var t = c.currentTime + 0.05;
      for (var k = 0; k < 8; k++, step++) {
        note(MELODY[step % MELODY.length], t + k * beat, beat * 0.9, "triangle", 0.45);
        if (k % 2 === 0) note(BASS[(step / 2) % BASS.length | 0] - 12, t + k * beat, beat * 1.8, "sine", 0.5);
      }
      loopT = setTimeout(tick, beat * 8 * 1000 - 30);
    })();
  }
  function stopMusic() {
    if (loopT) { clearTimeout(loopT); loopT = null; }
    songOn = false; if (songT) { clearTimeout(songT); songT = null; }
    songSrc.forEach(function (x) { try { x.stop(); } catch (e) {} }); songSrc = [];
  }
  function duck(on) {
    ducked = on; if (!AC) return;
    try { if (master) master.gain.setTargetAtTime(on ? 0.02 : 0.07, AC.currentTime, 0.08); } catch (e) {}
    try { if (songGain) songGain.gain.setTargetAtTime(on ? 0.09 : 0.28, AC.currentTime, 0.12); } catch (e) {}
  }
  /* the sung party theme, on the end screen; it is the only sound playing */
  var SONGS = [
    { key: "song-abc", title: "ABC song", emo: "🔤" },
    { key: "song-counting", title: "Counting song", emo: "🌷" },
    { key: "song-hoot-party", title: "Party song", emo: "🎉" },
    { key: "song-dance-party", title: "Dance song", emo: "💃" },
    { key: "song-goodbye", title: "Goodbye song", emo: "👋" }
  ].filter(function (x) { return have[x.key]; });
  var singA = null, singBtn = null;
  function label(btn, on) { if (btn) { btn.classList.toggle("pg-singing", on); var b = btn.querySelector(".pg-sl"); if (b) b.textContent = on ? "⏹ Stop" : btn.getAttribute("data-label"); } }
  function stopSing() { if (singA) { singA.__govWait = false; try { singA.pause(); } catch (e) {} singA = null; } label(singBtn, false); singBtn = null; }
  /* tap to sing, tap again to stop; one song at a time, nothing else plays over it */
  function sing(key, btn) {
    var same = singA && singBtn === btn;
    stopSing(); if (same) return;
    stopVoice(); stopMusic();
    var a = singA = new Audio(VOICE + key + ".mp3"); singBtn = btn; label(btn, true);
    a.__govWait = false;
    a.onended = a.onerror = function () { if (singA === a) { singA = null; label(btn, false); singBtn = null; } };
    var p = a.play(); if (p && p.catch) p.catch(function () { if (singA === a) stopSing(); });
  }
  function songBtn(sg, cls) { return '<button type="button" class="' + cls + '" data-song="' + sg.key + '" data-label="' + sg.title + '"><span aria-hidden="true">' + sg.emo + '</span> <b class="pg-sl">' + sg.title + "</b></button>"; }
  var END_SONG = { bubbles: "song-abc", garden: "song-counting", train: "song-hoot-party", dance: "song-dance-party", helpers: "song-hoot-party" };
  function sfx(kind) {
    var c = ac(); if (!c) return; var t = c.currentTime + 0.01;
    if (kind === "pop") { note(12, t, 0.12, "sine", 0.9); note(19, t + 0.05, 0.12, "sine", 0.7); }
    else if (kind === "boing") { note(-5, t, 0.18, "square", 0.25); }
    else if (kind === "win") { [0, 4, 7, 12, 16].forEach(function (s, i) { note(s, t + i * 0.09, 0.3, "triangle", 0.8); }); }
    else if (kind === "toot") { note(-12, t, 0.35, "sawtooth", 0.25); note(-8, t, 0.35, "sawtooth", 0.2); }
  }

  /* ---------- shared look ---------- */
  var COLORS = { red: "#E03131", yellow: "#FFD43B", blue: "#1C7ED6", green: "#2F9E44", orange: "#FD7E14", purple: "#7048E8", pink: "#F06595", brown: "#8B5A2B", black: "#1A1A1A", white: "#FFFFFF" };
  function shapeSvg(k, fill, size) {
    var f = fill || "#1C7ED6", s = 'stroke="#17263b" stroke-width="4" stroke-linejoin="round"';
    var b = { circle: '<circle cx="50" cy="50" r="38" fill="' + f + '" ' + s + "/>", square: '<rect x="14" y="14" width="72" height="72" rx="10" fill="' + f + '" ' + s + "/>",
      triangle: '<polygon points="50,10 90,86 10,86" fill="' + f + '" ' + s + "/>", star: '<polygon points="50,6 61,38 95,38 67,58 78,92 50,72 22,92 33,58 5,38 39,38" fill="' + f + '" ' + s + "/>",
      heart: '<path d="M50 88 C10 60 6 32 26 20 C38 13 48 20 50 30 C52 20 62 13 74 20 C94 32 90 60 50 88Z" fill="' + f + '" ' + s + "/>",
      diamond: '<polygon points="50,6 90,50 50,94 10,50" fill="' + f + '" ' + s + "/>" }[k] || "";
    return '<svg viewBox="0 0 100 100" width="' + (size || 64) + '" height="' + (size || 64) + '" aria-hidden="true">' + b + "</svg>";
  }
  function hootSvg() { var s = document.querySelector("#panel-little .lt-hoot svg, .lt-hoot svg"); return s ? s.outerHTML : '<span style="font-size:48px">🦉</span>'; }
  var STICKERS = ["🎉", "🦉", "🌈", "🚂", "🌻", "🫧", "💃", "🚒", "⭐", "🍭"];

  /* ---------- game definitions ---------- */
  var GAMES = {
    bubbles: { title: "Letter Bubble Parade", emo: "🫧", bg: "linear-gradient(180deg,#BDE7FF,#E8D5FF)", rounds: 6,
      intro: "Bubbles are floating up! Listen to the sound, then pop the bubbles with that letter!" },
    garden: { title: "Counting Garden", emo: "🌷", bg: "linear-gradient(180deg,#C9F2D5,#FFF3B0)", rounds: 6,
      intro: "Let's grow a garden! I'll say a number. Tap the soil to plant that many flowers, and count with me!" },
    train: { title: "Colour & Shape Train", emo: "🚂", bg: "linear-gradient(180deg,#FFD6E7,#D0EBFF)", rounds: 6,
      intro: "Choo choo! All aboard Hoot's train! Listen, then tap the car I call!" },
    dance: { title: "Hoot's Dance Party", emo: "💃", bg: "linear-gradient(180deg,#FFE3F1,#FFF0C2)", rounds: 6,
      intro: "It's a dance party! When I call a body part, or up, or down, tap the matching picture!" },
    helpers: { title: "Helper Town", emo: "🚒", bg: "linear-gradient(180deg,#D3F9D8,#D0EBFF)", rounds: 6,
      intro: "Welcome to Helper Town! I'll call a helper. Tap the place where they work!" },
    sayit: { title: "Say It with Hoot", emo: "🎙️", bg: "linear-gradient(180deg,#FFE3F1,#BDE7FF)", rounds: 6,
      intro: "Say it with Hoot! I say a word, then you say it into the microphone — and you hear your own voice!" }
  };
  var ORDER = ["bubbles", "garden", "train", "dance", "helpers", "sayit"];
  var SAYIT_ITEMS = [
    { clip: "sayit-apple", emo: "🍎", word: "APPLE" }, { clip: "sayit-banana", emo: "🍌", word: "BANANA" },
    { clip: "sayit-bubbles", emo: "🫧", word: "BUBBLES" }, { clip: "sayit-rainbow", emo: "🌈", word: "RAINBOW" },
    { clip: "sayit-dinosaur", emo: "🦕", word: "DINOSAUR" }, { clip: "sayit-butterfly", emo: "🦋", word: "BUTTERFLY" },
    { clip: "sayit-cookie", emo: "🍪", word: "COOKIE" }, { clip: "sayit-moon", emo: "🌙", word: "MOON" },
    { clip: "sayit-woof", emo: "🐶", word: "WOOF WOOF" }, { clip: "sayit-moo", emo: "🐮", word: "MOO" },
    { clip: "sayit-roar", emo: "🦁", word: "ROAR" }, { clip: "sayit-beep", emo: "🚗", word: "BEEP BEEP" },
    { clip: "sayit-wiggle", emo: "🪱", word: "WIGGLY WORM" }, { clip: "sayit-super", emo: "⭐", word: "SUPER DUPER" },
    { clip: "sayit-abra", emo: "🪄", word: "ABRACADABRA" }, { clip: "sayit-hooray", emo: "🎉", word: "HOORAY" }
  ];

  /* ---------- Say It with Hoot: mic state (module level so stop() can kill it) ----------
     The child's recording lives in memory only; it is never saved or sent
     anywhere, and stop() — called on game exit — destroys it. */
  var micRec = null, micUrl = null, micAudio = null, micTimer = null, micPending = false;
  function sayitCleanup() {
    micPending = false;
    if (micTimer) { clearTimeout(micTimer); micTimer = null; }
    if (micRec) {
      var r = micRec; micRec = null; r.dead = true;
      try { r.mr.stop(); } catch (e) {}
      try { r.stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
    }
    if (micAudio) { micAudio.onended = micAudio.onerror = null; try { micAudio.pause(); } catch (e) {} }
    if (micUrl) { try { URL.revokeObjectURL(micUrl); } catch (e) {} micUrl = null; }
  }

  /* ---------- runner ---------- */
  var R = null;
  function clearIdleTimers(s) {
    if (!s || !s.idleT) return;
    s.idleT.forEach(function (t) { clearTimeout(t); });
    s.idleT = [];
  }
  function stop() { stopVoice(); stopMusic(); stopSing(); sayitCleanup(); if (R) { clearIdleTimers(R); R.dead = true; clearInterval(R.iv); R = null; } }
  function play(key, body) {
    var G = GAMES[key]; if (!G || !body) return false;
    stop();
    var S = R = { key: key, round: 0, wrong: 0, dead: false, t0: Date.now(), iv: null, idleT: [] };
    body.innerHTML = '<div class="pg" style="--bg:' + G.bg + '">' +
      '<div class="pg-top"><div class="pg-hoot">' + hootSvg() + '</div><p class="pg-bubble" aria-live="polite"></p>' +
      '<button type="button" class="pg-music" aria-pressed="' + musicOn + '" aria-label="Music on or off">' + (musicOn ? "🎵" : "🔇") + "</button></div>" +
      '<div class="pg-dots" aria-hidden="true"></div><div class="pg-stage"></div>' +
      '<div class="pg-start"><button type="button" class="pg-play">▶ Play</button></div>' +
      '<div class="pg-end" hidden><p class="pg-sticker"></p><div class="pg-endbtns"><button type="button" class="pg-again">↻ Play again</button>' + (function () { var sg = SONGS.filter(function (x) { return x.key === END_SONG[key]; })[0]; return sg ? songBtn(sg, "pg-sing") : ""; })() + '</div></div></div>';
    var root = body.querySelector(".pg"), bubble = root.querySelector(".pg-bubble"), stage = root.querySelector(".pg-stage"), dots = root.querySelector(".pg-dots");
    function alive() { return R === S && !S.dead; }
    function setB(t) { bubble.textContent = t; }
    function paint() { var n = G.rounds, h = ""; for (var i = 0; i < n; i++) h += '<i class="' + (i < S.round ? "on" : i === S.round ? "now" : "") + '"></i>'; dots.innerHTML = h; }
    setB(G.intro);
    root.querySelector(".pg-music").addEventListener("click", function (e) {
      musicOn = !musicOn; e.currentTarget.textContent = musicOn ? "🎵" : "🔇"; e.currentTarget.setAttribute("aria-pressed", musicOn);
      if (musicOn && !root.querySelector(".pg-start:not([hidden])")) startMusic(); else stopMusic();
    });
    root.querySelector(".pg-play").addEventListener("click", function () {
      root.querySelector(".pg-start").hidden = true;
      startMusic();
      say([opt("game-" + key + "-intro") || "owl-excited"], function () { if (alive()) next(); });
    });
    root.querySelector(".pg-again").addEventListener("click", function () { play(key, body); });
    var singB = root.querySelector(".pg-sing"); if (singB) singB.addEventListener("click", function () { sing(singB.getAttribute("data-song"), singB); });
    function win(btn) {
      sfx("pop"); if (btn) { btn.classList.add("pg-yay"); var s = document.createElement("span"); s.className = "pg-burst"; s.textContent = "⭐"; btn.appendChild(s); }
    }
    function clearIdle() { clearIdleTimers(S); }
    /* Wave 2 (Finding 2): 7s / 14s gentle re-prompt + visual spotlight for 2-4 party games */
    function armIdle(clips, nudgeSel, hintFn) {
      clearIdle();
      var r0 = S.round;
      S.idleT.push(setTimeout(function () {
        if (!alive() || S.won || S.round !== r0 || micRec || micPending) return;
        if (nudgeSel) stage.querySelectorAll(nudgeSel).forEach(function (el) {
          if (!el.disabled) { el.classList.remove("pg-idle-nudge"); void el.offsetWidth; el.classList.add("pg-idle-nudge"); }
        });
        if (clips && clips.length) say(clips, null, true);
      }, 7000));
      S.idleT.push(setTimeout(function () {
        if (!alive() || S.won || S.round !== r0 || micRec || micPending) return;
        if (typeof hintFn === "function") {
          var targets = hintFn() || [];
          targets.forEach(function (el) { if (el && !el.disabled) el.classList.add("pg-hint"); });
        }
        if (clips && clips.length) say(clips, null, true);
      }, 14000));
    }
    function roundDone() {
      if (!alive() || S.advanced) return;
      clearIdle();
      S.advanced = true;
      S.round++; paint();
      if (S.round >= G.rounds) return finish();
      setTimeout(function () { if (alive()) { S.advanced = false; S.won = false; next(); } }, 500);
    }
    /* a won round always moves on: by Hoot's praise ending, or by this backup timer */
    function wonRound() { clearIdle(); S.won = true; var r = S.round; setTimeout(function () { if (alive() && S.round === r && S.won) roundDone(); }, 4500); return roundDone; }
    function wrongTap(btn, text, clips) {
      if (S.won) return;
      clearIdle();
      S.wrong++; sfx("boing");
      if (btn) { btn.classList.remove("pg-no"); void btn.offsetWidth; btn.classList.add("pg-no"); }
      setB(text);
      say([fresh(NUDGE)].concat(clips || []));
    }
    function finish() {
      clearIdle();
      stage.innerHTML = '<div class="pg-confetti" aria-hidden="true">' + Array.apply(null, Array(24)).map(function (_, i) { return '<i style="--x:' + ri(2, 96) + "%;--d:" + (ri(0, 8) / 10) + "s;--c:" + pick(["#F06595", "#FFD43B", "#1C7ED6", "#2F9E44", "#7048E8", "#FD7E14"]) + '"></i>'; }).join("") + "</div>";
      stopMusic(); sfx("win");
      var st = STICKERS[ORDER.indexOf(key) * 2 % STICKERS.length];
      root.querySelector(".pg-sticker").textContent = st;
      root.querySelector(".pg-end").hidden = false;
      setB("🎉 You did it! " + G.title + " — all " + G.rounds + " rounds! Here's your sticker!");
      say([opt("hoot-party-done") || "hoot-you-learned", fresh(PRAISE)]);
      try { document.dispatchEvent(new CustomEvent("hoot-party-done", { detail: { key: key, title: G.title, wrong: S.wrong, ms: Date.now() - S.t0 } })); } catch (e) {}
    }
    var next = { bubbles: bubblesRound, garden: gardenRound, train: trainRound, dance: danceRound, helpers: helpersRound, sayit: sayitRound }[key];

    /* ----- 1. Letter Bubble Parade ----- */
    function bubblesRound() {
      paint();
      var lw = (window.__llLetterOfWeek && window.__llLetterOfWeek()) || "a";
      var review = (window.__llLettersLearned && window.__llLettersLearned()) || [];
      var ABC = "abcdefghijklmnopqrstuvwxyz".split("");
      var others = shuffle(ABC.filter(function (l) { return l !== lw; }));
      var pool = shuffle(review.filter(function (l) { return l !== lw; }).concat(others)).slice(0, 4);
      /* 3e42: the week's letter is one round in three (the first round
         included); the others are letters already learned or the next few
         new ones, and never the same letter twice in a row. */
      var target;
      if (S.round % 3 === 0) target = lw;
      else {
        var at = ABC.indexOf(lw), soon = [1, 2, 3].map(function (k) { return ABC[(at + k) % 26]; });
        var mix = review.filter(function (l) { return l !== lw; }).concat(soon, ["a", "b", "c", "m", "s", "t"].filter(function (l) { return l !== lw; }));
        mix = mix.filter(function (l) { return l !== S.lastT; });
        target = pick(mix);
      }
      S.lastT = target;
      var letters = shuffle([target, target].concat(pool.filter(function (l) { return l !== target; }).slice(0, 3)));
      var left = 2;
      stage.innerHTML = '<div class="pg-sky">' + letters.map(function (l, i) {
        return '<button type="button" class="pg-bub" data-l="' + l + '" style="--x:' + (2 + i * 18) + "%;--y:" + ri(75, 210) + "px;--t:" + (3 + ri(0, 2)) + "s;--d:-" + (i * 0.6) + 's" aria-label="Bubble ' + l.toUpperCase() + '">' + l.toUpperCase() + "</button>";
      }).join("") + "</div>";
      setB("Pop the bubbles that say… 🔊");
      var askBub = [opt("say-pop-sound"), "coach/phonics-" + target].filter(Boolean);
      var hintBub = function () { return Array.prototype.slice.call(stage.querySelectorAll('.pg-bub[data-l="' + target + '"]:not(:disabled)')); };
      say(askBub, function () { armIdle(askBub, ".pg-bub", hintBub); }, true);
      stage.querySelectorAll(".pg-bub").forEach(function (b) {
        b.addEventListener("animationiteration", function () { /* floated off the top: comes back, never lost */ });
        b.addEventListener("click", function () {
          if (b.disabled || !alive()) return;
          clearIdle();
          if (b.getAttribute("data-l") === target) {
            b.disabled = true; win(b); b.classList.add("pg-popped"); left--;
            if (left === 0) { stage.querySelectorAll(".pg-bub").forEach(function (x) { x.disabled = true; }); setB("⭐ POP! Those say “" + target.toUpperCase() + "”!"); var lName = (window.__hootNameClip && window.__hootNameClip("letter", target)) || ("name-letter-" + target); say([lName, fresh(PRAISE)], wonRound()); }
            else { setB("POP! One more " + target.toUpperCase() + "!"); armIdle(askBub, ".pg-bub", hintBub); }
          } else { wrongTap(b, "That bubble is " + b.getAttribute("data-l").toUpperCase() + ". Listen again for the sound!", ["coach/phonics-" + target]); armIdle(askBub, ".pg-bub", hintBub); }
        });
      });
    }
    /* ----- 2. Counting Garden ----- */
    function gardenRound() {
      paint();
      var max = S.round < 3 ? 5 : 8, n = ri(2, max), planted = 0, FL = ["🌷", "🌻", "🌼", "🌸", "🌺"];
      stage.innerHTML = '<div class="pg-garden">' + Array.apply(null, Array(10)).map(function (_, i) { return '<button type="button" class="pg-soil" data-i="' + i + '" aria-label="Plant a flower"><span>🟫</span></button>'; }).join("") + '</div><p class="pg-count" aria-live="polite">0</p>';
      var counter = stage.querySelector(".pg-count");
      setB("Plant this many flowers… " + n + "!");
      /* 3e37: call-number clips are questions ("Find the number…"), so they are
         never used to count; a name clip is used once it exists */
      var numName = function (k) { return window.__hootNameClip ? window.__hootNameClip("number", k) : null; };
      var askGarden = [opt("say-plant"), numName(n)].filter(Boolean);
      var hintGarden = function () { var one = stage.querySelector(".pg-soil:not(:disabled)"); return one ? [one] : []; };
      say(askGarden, function () { armIdle(askGarden, ".pg-soil", hintGarden); }, true);
      stage.querySelectorAll(".pg-soil").forEach(function (b) {
        b.addEventListener("click", function () {
          if (b.disabled || !alive() || planted >= n) return;
          clearIdle();
          b.disabled = true; planted++; b.innerHTML = '<span class="pg-flower">' + pick(FL) + "</span>"; counter.textContent = planted;
          sfx("pop");
          if (planted < n) { var nc = numName(planted); if (nc) { stopVoice(); say([nc], function () { armIdle(askGarden, ".pg-soil", hintGarden); }, true); } else armIdle(askGarden, ".pg-soil", hintGarden); }
          else {
            stage.querySelectorAll(".pg-soil").forEach(function (x) { x.disabled = true; });
            setB("⭐ " + n + " flowers! Your garden is growing!");
            stopVoice(); say([numName(n), fresh(PRAISE)].filter(Boolean), wonRound(), true);
          }
        });
      });
    }
    /* ----- 3. Colour & Shape Train ----- */
    function trainRound() {
      paint();
      var colorMode = S.round % 2 === 0;
      var keys = colorMode ? shuffle(["red", "yellow", "blue", "green", "orange", "purple", "pink"]).slice(0, 3) : shuffle(["circle", "square", "triangle", "star", "heart", "diamond"]).slice(0, 3);
      var target = pick(keys), fills = shuffle(["#E03131", "#1C7ED6", "#2F9E44", "#FD7E14", "#7048E8", "#F06595"]);
      stage.innerHTML = '<div class="pg-track"><div class="pg-train">' + keys.map(function (k, i) {
        var face = colorMode ? '<span class="pg-car-paint" style="background:' + COLORS[k] + '"></span>' : shapeSvg(k, fills[i], 58);
        return '<button type="button" class="pg-car" data-k="' + k + '" aria-label="' + k + ' car">' + face + "</button>";
      }).join("") + '<span class="pg-engine" aria-hidden="true">🚂</span></div></div>';
      sfx("toot");
      setB("Load the " + target.toUpperCase() + " car!");
      /* "Load the…" + the name ("red"); the question clip is only a fallback */
      var tName = window.__hootNameClip ? window.__hootNameClip(colorMode ? "color" : "shape", target) : null;
      var askTrain = tName ? [opt("say-load"), tName].filter(Boolean) : [(colorMode ? "call-color-" : "call-shape-") + target];
      var hintTrain = function () { var c = stage.querySelector('.pg-car[data-k="' + target + '"]'); return c ? [c] : []; };
      say(askTrain, function () { armIdle(askTrain, ".pg-car", hintTrain); }, true);
      stage.querySelectorAll(".pg-car").forEach(function (b) {
        b.addEventListener("click", function () {
          if (b.disabled || !alive()) return;
          clearIdle();
          if (b.getAttribute("data-k") === target) {
            stage.querySelectorAll(".pg-car").forEach(function (x) { x.disabled = true; });
            win(b); b.insertAdjacentHTML("beforeend", '<span class="pg-cargo" aria-hidden="true">🧸</span>');
            setB("⭐ All aboard the " + target.toUpperCase() + " car! Choo choo!");
            stage.querySelector(".pg-train").classList.add("pg-go");
            say([tName, fresh(PRAISE)].filter(Boolean), wonRound(), true);
          } else { wrongTap(b, "That's the " + b.getAttribute("data-k").toUpperCase() + " car. Find " + target.toUpperCase() + "!", [(colorMode ? "call-color-" : "call-shape-") + target]); armIdle(askTrain, ".pg-car", hintTrain); }
        });
      });
    }
    /* ----- 4. Hoot's Dance Party ----- */
    function danceRound() {
      paint();
      var MOVES = { hands: ["🙌", "teach-hands", "HANDS"], feet: ["🦶", "teach-feet", "FEET"], eyes: ["👀", "teach-eyes", "EYES"], ears: ["👂", "teach-ears", "EARS"], nose: ["👃", "teach-nose", "NOSE"], mouth: ["👄", "teach-mouth", "MOUTH"], up: ["⬆️", "teach-up", "UP"], down: ["⬇️", "teach-down", "DOWN"] };
      var keys = shuffle(Object.keys(MOVES)).slice(0, 3), target = pick(keys);
      stage.innerHTML = '<div class="pg-floor">' + keys.map(function (k) { return '<button type="button" class="pg-move" data-k="' + k + '" aria-label="' + MOVES[k][2] + '"><span>' + MOVES[k][0] + "</span><b>" + MOVES[k][2] + "</b></button>"; }).join("") + "</div>";
      root.querySelector(".pg-hoot").classList.add("pg-dancing");
      var dir = target === "up" || target === "down";
      setB(dir ? "Which one is " + MOVES[target][2] + "?" : "Show me your… " + MOVES[target][2] + "!");
      var askDance = dir ? ["ask-which-" + target] : [opt("say-show-me"), MOVES[target][1]].filter(Boolean);
      var hintDance = function () { var m = stage.querySelector('.pg-move[data-k="' + target + '"]'); return m ? [m] : []; };
      say(askDance, function () { armIdle(askDance, ".pg-move", hintDance); }, true);
      stage.querySelectorAll(".pg-move").forEach(function (b) {
        b.addEventListener("click", function () {
          if (b.disabled || !alive()) return;
          clearIdle();
          var k = b.getAttribute("data-k");
          if (k === target) { stage.querySelectorAll(".pg-move").forEach(function (x) { x.disabled = true; }); win(b); setB("⭐ " + MOVES[k][2] + "! Wiggle wiggle!"); say([MOVES[k][1], fresh(PRAISE)], wonRound(), true); }
          else { wrongTap(b, "That's " + MOVES[k][2] + ". Show me " + MOVES[target][2] + "!", [MOVES[target][1]]); armIdle(askDance, ".pg-move", hintDance); }
        });
      });
    }
    /* ----- 5. Helper Town ----- */
    function helpersRound() {
      paint();
      var H = { firefighter: ["🧑‍🚒", "🚒", "Fire station", "call-firefighter", "teach-firefighter"], doctor: ["🧑‍⚕️", "🏥", "Hospital", "call-doctor", "teach-doctor"],
        teacher: ["🧑‍🏫", "🏫", "School", "call-teacher", "teach-teacher"], police: ["👮", "🚓", "Police station", "call-police-officer", "teach-police-officer"] };
      var keys = shuffle(Object.keys(H)).slice(0, 3), target = pick(keys);
      stage.innerHTML = '<div class="pg-helper"><span aria-hidden="true">' + H[target][0] + '</span></div><div class="pg-town">' + keys.map(function (k) {
        return '<button type="button" class="pg-place" data-k="' + k + '"><span>' + H[k][1] + "</span><b>" + H[k][2] + "</b></button>";
      }).join("") + "</div>";
      setB("Where does this helper work?");
      var askHelp = [opt("say-where-work"), H[target][3]].filter(Boolean);
      var hintHelp = function () { var pl = stage.querySelector('.pg-place[data-k="' + target + '"]'); return pl ? [pl] : []; };
      say(askHelp, function () { armIdle(askHelp, ".pg-place", hintHelp); }, true);
      stage.querySelectorAll(".pg-place").forEach(function (b) {
        b.addEventListener("click", function () {
          if (b.disabled || !alive()) return;
          clearIdle();
          var k = b.getAttribute("data-k");
          if (k === target) { stage.querySelectorAll(".pg-place").forEach(function (x) { x.disabled = true; }); win(b); stage.querySelector(".pg-helper").classList.add("pg-walk"); setB("⭐ Yes! " + H[k][4].replace("teach-", "").replace("-", " ").toUpperCase() + " works at the " + H[k][2].toUpperCase() + "!"); say([H[k][4], fresh(PRAISE)], wonRound(), true); }
          else { wrongTap(b, "That's the " + H[k][2] + ". Where does the " + (target === "police" ? "police officer" : target) + " work?", [H[target][3]]); armIdle(askHelp, ".pg-place", hintHelp); }
        });
      });
    }
    paint();
    return true;

    /* ----- 6. Say It with Hoot -----
       Repeat-after-me for the littles (Dawid approved 2026-11-17): Hoot says
       a word, the child taps the big mic and says it back, hears their own
       voice played back, and Hoot cheers. There are NO wrong answers and no
       speech grading — kid speech recognition is unreliable, and the fun is
       hearing yourself. The recording lives in memory only and is destroyed
       by stop() on exit. If the mic is unavailable, tapping it still cheers
       the out-loud try — never a dead end. */
    function sayitCheer(heardIt) {
      if (!alive() || S.won) return;
      win(stage.querySelector(".pg-saycard"));
      setB(heardIt ? "🎉 Woo hoo! That was YOUR voice!" : "🎉 Great talking! Hoot loves your voice!");
      S.pn = ((S.pn || 0) % 5) + 1;
      say(["sayit-praise-" + S.pn], wonRound(), true);
    }
    function sayitRound() {
      paint();
      if (!S.pool) S.pool = shuffle(SAYIT_ITEMS.slice());
      var item = S.pool[S.round % S.pool.length];
      stage.innerHTML = '<div class="pg-saycard"><span class="pg-sayemo" aria-hidden="true">' + item.emo + '</span><b class="pg-sayword">' + item.word + "</b></div>" +
        '<div class="pg-saybtns"><button type="button" class="pg-mic" aria-label="Tap, say it, then tap again">🎙️</button>' +
        '<button type="button" class="pg-sayagain">🔊 Hear Hoot again</button></div>' +
        '<p class="pg-sayhint">Tap the microphone, say it out loud, then tap again!</p>';
      setB("Say it with me… " + item.word + "!");
      var askSayit = [item.clip, "sayit-yourturn"];
      var micBtn = stage.querySelector(".pg-mic");
      var hintSayit = function () { return micBtn ? [micBtn] : []; };
      say(askSayit, function () { armIdle(askSayit, ".pg-mic", hintSayit); }, true);
      stage.querySelector(".pg-sayagain").addEventListener("click", function () {
        if (alive() && !micRec && !micPending) { clearIdle(); say([item.clip], function () { armIdle(askSayit, ".pg-mic", hintSayit); }, true); }
      });
      micBtn.addEventListener("click", function () {
        if (!alive() || micPending) return;
        clearIdle();
        if (micRec) { try { micRec.mr.stop(); } catch (e) {} return; }
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder)) { sayitCheer(false); return; }
        micPending = true;
        stopVoice();
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
          micPending = false;
          if (!alive()) { stream.getTracks().forEach(function (t) { t.stop(); }); return; }
          var mr;
          try { mr = new MediaRecorder(stream); } catch (e) { stream.getTracks().forEach(function (t) { t.stop(); }); sayitCheer(false); return; }
          var chunks = [];
          var rec = { mr: mr, stream: stream, dead: false };
          mr.ondataavailable = function (ev) { if (ev.data && ev.data.size) chunks.push(ev.data); };
          mr.onstop = function () {
            stream.getTracks().forEach(function (t) { t.stop(); });
            if (rec.dead || !alive()) return;
            if (micTimer) { clearTimeout(micTimer); micTimer = null; }
            micRec = null;
            micBtn.classList.remove("on"); micBtn.textContent = "🎙️";
            var blob = mr.mimeType ? new Blob(chunks, { type: mr.mimeType }) : new Blob(chunks);
            if (!blob.size) { sayitCheer(false); return; }
            if (micUrl) { try { URL.revokeObjectURL(micUrl); } catch (e) {} }
            micUrl = URL.createObjectURL(blob);
            setB("Listen… that's YOU! 👂");
            say(["sayit-thatsyou"], function () {
              if (!alive()) return;
              if (!micAudio) micAudio = new Audio();
              micAudio.src = micUrl;
              micAudio.onended = function () { sayitCheer(true); };
              micAudio.onerror = function () { sayitCheer(false); };
              var p = micAudio.play();
              if (p && p.catch) p.catch(function () { sayitCheer(true); });
            }, true);
          };
          micRec = rec;
          mr.start();
          micBtn.classList.add("on"); micBtn.textContent = "⏺️";
          setB("I'm listening… say it now!");
          micTimer = setTimeout(function () { if (micRec) { try { micRec.mr.stop(); } catch (e) {} } }, 3500);
        }).catch(function () { micPending = false; if (alive()) sayitCheer(false); });
      });
    }
  }

  window.HootGames = {
    list: ORDER.map(function (k) { return { key: k, title: GAMES[k].title, emo: GAMES[k].emo }; }),
    play: play, stop: stop,
    songs: SONGS, sing: sing, stopSing: stopSing, songBtn: songBtn
  };
})();
