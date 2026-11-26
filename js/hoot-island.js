(function () {
  "use strict";

  var SKY_ORDER = ["day", "sunset", "night", "dawn"];
  var SKY_META = {
    day:    { emo: "☀️", label: "Day" },
    sunset: { emo: "🌅", label: "Sunset" },
    night:  { emo: "🌙", label: "Night" },
    dawn:   { emo: "🌤️", label: "Morning" }
  };

  var LANDMARKS = [
    { key: "treehouse",  emo: "🦉", label: "Treehouse",  x: 50, y: 50, fx: "none" },
    { key: "rocket",     emo: "🚀", label: "Rocket",     x: 10, y: 27, fx: "thruster" },
    { key: "train",      emo: "🚂", label: "Train",      x: 26, y: 35, fx: "steam" },
    { key: "pizza",      emo: "🍕", label: "Pizza",      x: 13, y: 53, fx: "smoke" },
    { key: "friends",    emo: "🐮", label: "Farm Barn",  x: 29, y: 63, fx: "none" },
    { key: "real",       emo: "🚒", label: "Firehouse",  x: 13, y: 78, fx: "beacon" },
    { key: "dance",      emo: "🪩", label: "Disco",      x: 90, y: 27, fx: "disco" },
    { key: "dino",       emo: "🦕", label: "Dino Dig",   x: 73, y: 35, fx: "none" },
    { key: "storymaker", emo: "🎙️", label: "Storybooks", x: 87, y: 53, fx: "note" },
    { key: "paint",      emo: "🎨", label: "Art Gazebo", x: 71, y: 63, fx: "none" },
    { key: "piano",      emo: "🎹", label: "Piano",      x: 86, y: 78, fx: "note" },
    { key: "fishing",    emo: "🎣", label: "Pond",       x: 50, y: 79, fx: "fish" }
  ];

  var BEDTIME_ANIMALS = [
    { id: "owl",   emo: "🦉", name: "Hoot" },
    { id: "dog",   emo: "🐶", name: "Puppy" },
    { id: "bunny", emo: "🐰", name: "Bunny" },
    { id: "duck",  emo: "🦆", name: "Duck" },
    { id: "frog",  emo: "🐸", name: "Frog" }
  ];

  var WHEEL_SLICES = [
    { kind: "letter", val: "Z", label: "Z", clip: "assets/voice/call-letter-z.mp3", color: "#ff6b6b" },
    { kind: "number", val: "1", label: "1", clip: "assets/voice/name-number-1.mp3", color: "#ffd166" },
    { kind: "letter", val: "R", label: "R", clip: "assets/voice/call-letter-r.mp3", color: "#4ecdc4" },
    { kind: "number", val: "2", label: "2", clip: "assets/voice/name-number-2.mp3", color: "#a78bfa" },
    { kind: "letter", val: "H", label: "H", clip: "assets/voice/call-letter-h.mp3", color: "#ff9f43" },
    { kind: "number", val: "3", label: "3", clip: "assets/voice/name-number-3.mp3", color: "#54a0ff" },
    { kind: "letter", val: "A", label: "A", clip: "assets/voice/call-letter-a.mp3", color: "#5cd68d" },
    { kind: "number", val: "5", label: "5", clip: "assets/voice/name-number-5.mp3", color: "#ff7eb3" }
  ];

  var VALID_HATS = { none: 1, crown: 1, wizard: 1, astronaut: 1, cowboy: 1, shades: 1 };

  var state = {
    mounted: false,
    profile: { id: "kida", label: "Zane", emoji: "👦", color: "#ff7e29" },
    api: null,
    skyMode: defaultSkyMode(),
    skyManual: false,
    hat: "none",
    hootTaps: 0,
    sparkleCount: 0,
    morningOpen: false,
    morningStep: 0,
    morningWeather: null,
    morningFeeling: null,
    morningWheelResult: null,
    bedtimeOpen: false,
    lampsOffMap: {},
    firefliesCaught: 0
  };

  var voiceEl = null;
  var bellyTimer = null;
  var audioCtx = null;
  var activeCleanup = null;
  var activeModalEl = null;
  var activeModalKeyHandler = null;

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normProfile(p) {
    if (!p || typeof p !== "object") {
      return { id: "kida", label: "Friend", emoji: "🦉", color: "#ff8f2e" };
    }
    return {
      id: p.id || "kida",
      label: p.label || (p.id === "kidb" ? "Riley" : "Zane"),
      emoji: p.emoji || "🦉",
      color: p.color || "#ff8f2e"
    };
  }

  function defaultSkyMode() {
    var hr = new Date().getHours();
    if (hr >= 5 && hr < 9) return "dawn";
    if (hr >= 9 && hr < 17) return "day";
    if (hr >= 17 && hr < 20) return "sunset";
    return "night";
  }

  function readSavedHat(profileId) {
    try {
      var raw = window.localStorage.getItem("hw.hoot.hat.v1." + (profileId || "kida"));
      if (raw && VALID_HATS[raw]) return raw;
    } catch (e) {}
    return "none";
  }

  /* ---------- Audio & Soft WebAudio Synth ---------- */
  function getAudioCtx() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      if (!audioCtx) audioCtx = new Ctx();
      if (audioCtx.state === "suspended" && audioCtx.resume) {
        audioCtx.resume().catch(function () {});
      }
      return audioCtx;
    } catch (e) {
      return null;
    }
  }

  function playTone(freq, dur, type, gainVal, delaySec) {
    var ctx = getAudioCtx();
    if (!ctx) return;
    try {
      var now = ctx.currentTime + (delaySec || 0);
      var osc = ctx.createOscillator();
      var g = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(gainVal || 0.12, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + (dur || 0.25));
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + (dur || 0.25) + 0.03);
    } catch (e) {}
  }

  function playChime(kind) {
    if (kind === "pop") {
      playTone(523.25, 0.14, "triangle", 0.11, 0);
      playTone(659.25, 0.18, "triangle", 0.11, 0.06);
    } else if (kind === "sky") {
      playTone(440, 0.18, "sine", 0.09, 0);
      playTone(554.37, 0.2, "sine", 0.09, 0.08);
      playTone(659.25, 0.28, "sine", 0.1, 0.16);
    } else if (kind === "birds") {
      playTone(880, 0.12, "sine", 0.08, 0);
      playTone(1174.66, 0.14, "sine", 0.08, 0.09);
      playTone(1046.5, 0.18, "sine", 0.08, 0.2);
    } else if (kind === "tick") {
      playTone(680, 0.045, "triangle", 0.08, 0);
    } else if (kind === "boing") {
      playTone(320, 0.12, "sine", 0.1, 0);
      playTone(580, 0.18, "sine", 0.1, 0.07);
    } else if (kind === "roar") {
      playTone(165, 0.24, "sawtooth", 0.07, 0);
      playTone(130, 0.28, "sawtooth", 0.06, 0.12);
    } else if (kind === "lullaby") {
      playTone(523.25, 0.45, "sine", 0.07, 0);
      playTone(392.0, 0.5, "sine", 0.06, 0.18);
      playTone(329.63, 0.65, "sine", 0.06, 0.36);
    } else if (kind === "lullaby-done") {
      playTone(392.0, 0.6, "sine", 0.06, 0);
      playTone(329.63, 0.7, "sine", 0.06, 0.22);
      playTone(261.63, 0.95, "sine", 0.07, 0.44);
    } else if (kind === "firefly") {
      playTone(1046.5, 0.22, "sine", 0.06, 0);
      playTone(1318.5, 0.28, "sine", 0.05, 0.08);
    } else if (kind === "fanfare") {
      playTone(523.25, 0.18, "triangle", 0.11, 0);
      playTone(659.25, 0.18, "triangle", 0.11, 0.09);
      playTone(783.99, 0.22, "triangle", 0.11, 0.18);
      playTone(1046.5, 0.38, "triangle", 0.12, 0.27);
    }
  }

  function stopVoice() {
    if (voiceEl) {
      try {
        voiceEl.pause();
        voiceEl.currentTime = 0;
      } catch (e) {}
    }
  }

  function playVoice(path, opts) {
    if (!path) return;
    try {
      if (opts && opts.belly) {
        window.__bellyArmed = true;
        if (bellyTimer) clearTimeout(bellyTimer);
        bellyTimer = setTimeout(function () {
          window.__bellyArmed = false;
          bellyTimer = null;
        }, 1300);
      }
      if (!voiceEl) {
        voiceEl = new Audio();
        voiceEl.preload = "auto";
      }
      voiceEl.pause();
      voiceEl.src = path;
      var pr = voiceEl.play();
      if (pr && typeof pr.catch === "function") {
        pr.catch(function () {});
      }
    } catch (e) {}
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stopVoice();
  });

  /* ---------- SVG Builders (Hats, Eye-Tracking Hoot, Storybook Island) ---------- */
  function hatSvg(hatId) {
    if (hatId === "crown") {
      return '<g class="hi-hat-el" transform="translate(100,24)">' +
        '<path d="M-30 10 L-26 -16 L-10 -2 L0 -22 L10 -2 L26 -16 L30 10 Z" fill="#ffd43b" stroke="#4a2e1b" stroke-width="4" stroke-linejoin="round"/>' +
        '<circle cx="0" cy="-22" r="5" fill="#ff595e" stroke="#4a2e1b" stroke-width="2.5"/>' +
        '<circle cx="-26" cy="-16" r="4" fill="#4cc9f0" stroke="#4a2e1b" stroke-width="2.5"/>' +
        '<circle cx="26" cy="-16" r="4" fill="#80ed99" stroke="#4a2e1b" stroke-width="2.5"/>' +
        '<rect x="-31" y="6" width="62" height="10" rx="5" fill="#ffb703" stroke="#4a2e1b" stroke-width="3.5"/>' +
      '</g>';
    }
    if (hatId === "wizard") {
      return '<g class="hi-hat-el" transform="translate(100,26)">' +
        '<ellipse cx="0" cy="12" rx="44" ry="11" fill="#4c3599" stroke="#4a2e1b" stroke-width="4"/>' +
        '<path d="M-28 10 L-4 -42 Q2 -48 8 -40 L28 10 Z" fill="#6947c7" stroke="#4a2e1b" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M-24 6 Q0 12 24 6" fill="none" stroke="#ffd43b" stroke-width="5" stroke-linecap="round"/>' +
        '<text x="-7" y="-12" font-size="16" fill="#ffe66d">★</text>' +
      '</g>';
    }
    if (hatId === "astronaut") {
      return '<g class="hi-hat-el">' +
        '<circle cx="100" cy="76" r="62" fill="rgba(186,236,255,0.28)" stroke="#ffffff" stroke-width="5"/>' +
        '<circle cx="100" cy="76" r="62" fill="none" stroke="#4a2e1b" stroke-width="2.5"/>' +
        '<path d="M62 34 Q82 22 104 26" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="6" stroke-linecap="round"/>' +
      '</g>';
    }
    if (hatId === "cowboy") {
      return '<g class="hi-hat-el" transform="translate(100,26)">' +
        '<path d="M-46 10 Q0 22 46 10 Q38 0 26 2 L-26 2 Q-38 0 -46 10 Z" fill="#c67b3b" stroke="#4a2e1b" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M-26 4 L-20 -20 Q-8 -28 0 -18 Q8 -28 20 -20 L26 4 Z" fill="#d98b44" stroke="#4a2e1b" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M-24 2 Q0 8 24 2" fill="none" stroke="#e63946" stroke-width="5" stroke-linecap="round"/>' +
      '</g>';
    }
    if (hatId === "shades") {
      return '<g class="hi-hat-el">' +
        '<path d="M52 72 L66 60 L82 60 L94 72 L86 86 L60 86 Z" fill="#2b2d42" stroke="#ffd43b" stroke-width="4" stroke-linejoin="round"/>' +
        '<path d="M106 72 L118 60 L134 60 L148 72 L140 86 L114 86 Z" fill="#2b2d42" stroke="#ffd43b" stroke-width="4" stroke-linejoin="round"/>' +
        '<line x1="94" y1="72" x2="106" y2="72" stroke="#ffd43b" stroke-width="5" stroke-linecap="round"/>' +
        '<line x1="64" y1="68" x2="72" y2="78" stroke="rgba(255,255,255,0.7)" stroke-width="3" stroke-linecap="round"/>' +
        '<line x1="118" y1="68" x2="126" y2="78" stroke="rgba(255,255,255,0.7)" stroke-width="3" stroke-linecap="round"/>' +
      '</g>';
    }
    return "";
  }

  function hootSvg(hatId, opts) {
    var sleepy = opts && opts.sleepy;
    var prefix = (opts && opts.idPrefix) || "hi";
    return '<svg class="hi-hoot-svg" viewBox="0 0 200 218" aria-hidden="true">' +
      /* Tail & Wings */
      '<path d="M82 182 L100 208 L118 182 Z" fill="#8a5a33" stroke="#4a2e1b" stroke-width="4" stroke-linejoin="round"/>' +
      '<ellipse class="hi-wing-l" cx="34" cy="130" rx="19" ry="42" fill="#8a5a33" stroke="#4a2e1b" stroke-width="4"/>' +
      '<ellipse class="hi-wing-r" cx="166" cy="130" rx="19" ry="42" fill="#8a5a33" stroke="#4a2e1b" stroke-width="4"/>' +
      /* Body & Belly */
      '<ellipse cx="100" cy="122" rx="66" ry="70" fill="#a06a3b" stroke="#4a2e1b" stroke-width="4.5"/>' +
      '<ellipse cx="100" cy="144" rx="44" ry="44" fill="#fdeed3"/>' +
      '<path d="M84 134 q6 6 12 0 M104 134 q6 6 12 0 M94 150 q6 6 12 0" stroke="#d9b98a" stroke-width="3.6" fill="none" stroke-linecap="round"/>' +
      /* Ear tufts */
      '<path d="M52 46 Q40 16 64 24 Q76 29 72 50 Z" fill="#8a5a33" stroke="#4a2e1b" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M148 46 Q160 16 136 24 Q124 29 128 50 Z" fill="#8a5a33" stroke="#4a2e1b" stroke-width="4" stroke-linejoin="round"/>' +
      /* Head */
      '<circle cx="100" cy="76" r="52" fill="#a06a3b" stroke="#4a2e1b" stroke-width="4.5"/>' +
      /* Eye disks */
      '<ellipse cx="78" cy="76" rx="23" ry="25" fill="#fdeed3" stroke="#4a2e1b" stroke-width="3"/>' +
      '<ellipse cx="122" cy="76" rx="23" ry="25" fill="#fdeed3" stroke="#4a2e1b" stroke-width="3"/>' +
      /* Eyes (either sleepy curved lines or tracking pupils) */
      (sleepy
        ? '<g class="hi-sleepy-eyes"><path d="M62 78 Q78 90 94 78" fill="none" stroke="#4a2e1b" stroke-width="5" stroke-linecap="round"/>' +
          '<path d="M106 78 Q122 90 138 78" fill="none" stroke="#4a2e1b" stroke-width="5" stroke-linecap="round"/></g>'
        : '<g class="' + prefix + '-pupil-l">' +
            '<circle cx="78" cy="76" r="11.5" fill="#17324f"/>' +
            '<circle cx="82" cy="72" r="4.2" fill="#ffffff"/>' +
            '<circle cx="74" cy="80" r="2" fill="#ffffff" opacity="0.8"/>' +
          '</g>' +
          '<g class="' + prefix + '-pupil-r">' +
            '<circle cx="122" cy="76" r="11.5" fill="#17324f"/>' +
            '<circle cx="126" cy="72" r="4.2" fill="#ffffff"/>' +
            '<circle cx="118" cy="80" r="2" fill="#ffffff" opacity="0.8"/>' +
          '</g>' +
          '<g class="hi-hoot-eyelids">' +
            '<ellipse cx="78" cy="76" rx="22" ry="24" fill="#a06a3b"/>' +
            '<ellipse cx="122" cy="76" rx="22" ry="24" fill="#a06a3b"/>' +
            '<path d="M62 78 Q78 88 94 78" fill="none" stroke="#4a2e1b" stroke-width="4.5" stroke-linecap="round"/>' +
            '<path d="M106 78 Q122 88 138 78" fill="none" stroke="#4a2e1b" stroke-width="4.5" stroke-linecap="round"/>' +
          '</g>') +
      /* Cheeks & Beak */
      '<circle cx="56" cy="96" r="8.5" fill="#ff9e8a" opacity="0.82"/>' +
      '<circle cx="144" cy="96" r="8.5" fill="#ff9e8a" opacity="0.82"/>' +
      '<path d="M90 90 Q100 85 110 90 Q106 105 100 107 Q94 105 90 90 Z" fill="#ff9f1c" stroke="#4a2e1b" stroke-width="3" stroke-linejoin="round"/>' +
      /* Feet gripping branch */
      '<path d="M74 190 q-8 8 -14 6 M74 190 q-2 10 -8 12 M74 190 q5 10 2 13 M126 190 q8 8 14 6 M126 190 q2 10 8 12 M126 190 q-5 10 -2 13" stroke="#ff9f1c" stroke-width="5.5" fill="none" stroke-linecap="round"/>' +
      /* Saved Hat Overlay */
      hatSvg(hatId) +
    '</svg>';
  }

  function islandBackdropSvg() {
    return '<svg class="hi-island-svg" viewBox="0 0 1000 580" preserveAspectRatio="none" aria-hidden="true">' +
      '<defs>' +
        '<linearGradient id="hiGrass1" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#8be05c"/><stop offset="100%" stop-color="#4fb848"/>' +
        '</linearGradient>' +
        '<linearGradient id="hiGrass2" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#a6ec6b"/><stop offset="100%" stop-color="#5ec752"/>' +
        '</linearGradient>' +
        '<linearGradient id="hiSand" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#ffe7a8"/><stop offset="100%" stop-color="#f2c472"/>' +
        '</linearGradient>' +
        '<linearGradient id="hiPond" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#6ce5ff"/><stop offset="100%" stop-color="#22a8d8"/>' +
        '</linearGradient>' +
      '</defs>' +
      /* Distant ocean waves */
      '<path d="M0 370 Q80 358 160 370 T320 370 T480 370 T640 370 T800 370 T1000 370 L1000 580 L0 580 Z" fill="rgba(255,255,255,0.12)"/>' +
      '<path d="M30 495 q32 -8 64 0 t64 0 M760 515 q32 -8 64 0 t64 0 M180 542 q36 -8 72 0" stroke="rgba(255,255,255,0.35)" stroke-width="5" fill="none" stroke-linecap="round"/>' +
      /* Sandy island shore */
      '<path d="M40 435 C40 320 140 210 500 205 C860 210 960 320 960 435 C960 515 790 548 500 548 C210 548 40 515 40 435 Z" fill="url(#hiSand)" stroke="#4a2e1b" stroke-width="5"/>' +
      /* Back rolling hills */
      '<path d="M68 400 C68 255 185 165 365 190 C445 135 555 135 635 190 C815 165 932 255 932 400 C932 478 760 515 500 515 C240 515 68 478 68 400 Z" fill="url(#hiGrass1)" stroke="#4a2e1b" stroke-width="5"/>' +
      /* Sunlit central meadow */
      '<ellipse cx="500" cy="375" rx="345" ry="118" fill="url(#hiGrass2)"/>' +
      /* Winding warm dirt pathways connecting landmarks */
      '<path d="M130 290 Q240 310 340 330 Q430 350 500 315 Q585 350 710 335 Q800 320 870 290" fill="none" stroke="#f5d593" stroke-width="22" stroke-linecap="round" opacity="0.88"/>' +
      '<path d="M140 440 Q270 390 500 330 Q720 390 860 440" fill="none" stroke="#f5d593" stroke-width="20" stroke-linecap="round" opacity="0.85"/>' +
      /* Mini wooden train track curve on west hill */
      '<path d="M190 225 Q265 180 345 225" fill="none" stroke="#7f4f24" stroke-width="7" stroke-dasharray="10 8" stroke-linecap="round"/>' +
      /* Giant central oak tree supporting Hoot's perch & Treehouse */
      '<g transform="translate(500,250)">' +
        '<path d="M-36 78 Q-26 10 -24 -42 L24 -42 Q26 10 36 78 Z" fill="#8b5a2b" stroke="#4a2e1b" stroke-width="4.5"/>' +
        '<path d="M-76 -16 Q-28 -24 0 -10 Q32 -24 76 -14" fill="none" stroke="#8b5a2b" stroke-width="14" stroke-linecap="round"/>' +
        '<circle cx="-58" cy="-54" r="46" fill="#49b649" stroke="#4a2e1b" stroke-width="4"/>' +
        '<circle cx="58" cy="-54" r="46" fill="#49b649" stroke="#4a2e1b" stroke-width="4"/>' +
        '<circle cx="0" cy="-76" r="64" fill="#64cf57" stroke="#4a2e1b" stroke-width="4.5"/>' +
      '</g>' +
      /* Sparkling Fishing Pond in southern lagoon */
      '<ellipse cx="500" cy="456" rx="126" ry="52" fill="url(#hiPond)" stroke="#4a2e1b" stroke-width="4.5"/>' +
      '<path d="M445 446 q20 -6 40 0 M522 466 q18 -5 36 0" stroke="rgba(255,255,255,0.65)" stroke-width="4" fill="none" stroke-linecap="round"/>' +
      /* Decorative storybook trees & flower tufts */
      '<g fill="#3ea343" stroke="#4a2e1b" stroke-width="3">' +
        '<circle cx="206" cy="272" r="22"/><circle cx="385" cy="240" r="20"/>' +
        '<circle cx="620" cy="242" r="20"/><circle cx="792" cy="270" r="22"/>' +
        '<circle cx="378" cy="412" r="18"/><circle cx="625" cy="410" r="18"/>' +
      '</g>' +
      '<g>' +
        '<circle cx="236" cy="395" r="5" fill="#ff70a6"/><circle cx="248" cy="402" r="4.5" fill="#ffd43b"/>' +
        '<circle cx="755" cy="396" r="5" fill="#ff70a6"/><circle cx="768" cy="388" r="4.5" fill="#70d6ff"/>' +
        '<circle cx="350" cy="462" r="5" fill="#ffd43b"/><circle cx="650" cy="462" r="5" fill="#ff9770"/>' +
      '</g>' +
    '</svg>';
  }

  function landmarkFxHtml(fx) {
    if (fx === "steam") {
      return '<span class="hi-fx-steam" aria-hidden="true"></span><span class="hi-fx-steam hi-fx-steam-2" aria-hidden="true"></span>';
    }
    if (fx === "smoke") {
      return '<span class="hi-fx-smoke" aria-hidden="true"></span><span class="hi-fx-smoke hi-fx-smoke-2" aria-hidden="true"></span>';
    }
    if (fx === "thruster") {
      return '<span class="hi-fx-thruster" aria-hidden="true"></span>';
    }
    if (fx === "fish") {
      return '<span class="hi-fx-fish" aria-hidden="true">🐟</span>';
    }
    if (fx === "disco") {
      return '<span class="hi-fx-disco" aria-hidden="true"></span>';
    }
    if (fx === "note") {
      return '<span class="hi-fx-note" aria-hidden="true">🎵</span>';
    }
    if (fx === "beacon") {
      return '<span class="hi-fx-beacon" aria-hidden="true"></span>';
    }
    return "";
  }

  function starsHtml(count) {
    var out = "";
    for (var i = 0; i < count; i++) {
      var left = ((i * 37 + 11) % 94) + 3;
      var top = ((i * 23 + 7) % 86) + 5;
      var sz = 3 + (i % 4);
      var dur = (2.1 + (i % 5) * 0.45).toFixed(2);
      var dl = ((i % 7) * 0.35).toFixed(2);
      out += '<span class="hi-star" style="left:' + left + '%;top:' + top + '%;width:' + sz + 'px;height:' + sz + 'px;--d:' + dur + 's;--dl:' + dl + 's"></span>';
    }
    return out;
  }

  function islandFirefliesHtml(count) {
    var out = "";
    for (var i = 0; i < count; i++) {
      var left = 8 + ((i * 19 + 7) % 84);
      var top = 26 + ((i * 29 + 11) % 58);
      var fd = (4.6 + (i % 4) * 1.1).toFixed(1);
      var fdl = ((i % 5) * 0.7).toFixed(1);
      out += '<span class="hi-island-firefly" style="left:' + left + '%;top:' + top + '%;--fd:' + fd + 's;--fdl:' + fdl + 's"></span>';
    }
    return out;
  }

  /* ---------- Public renderHtml(profile) ---------- */
  function renderHtml(profile) {
    var p = normProfile(profile);
    state.profile = p;
    state.hat = readSavedHat(p.id);
    if (!state.skyManual) state.skyMode = defaultSkyMode();
    var skyInfo = SKY_META[state.skyMode] || SKY_META.day;

    var landmarksHtml = LANDMARKS.map(function (lm) {
      return '<button type="button" class="hi-landmark hi-lm-' + lm.key + '" data-hi-game="' + lm.key + '"' +
        ' style="left:' + lm.x + '%;top:' + lm.y + '%" aria-label="' + esc(lm.label) + '">' +
        '<span class="hi-lm-art" aria-hidden="true">' +
          landmarkFxHtml(lm.fx) +
          '<span class="hi-lm-emo">' + lm.emo + '</span>' +
        '</span>' +
        '<span class="hi-lm-label">' + esc(lm.label) + '</span>' +
      '</button>';
    }).join("");

    var sparklePoolHtml = "";
    for (var s = 0; s < 24; s++) {
      sparklePoolHtml += '<span class="hi-sparkle" aria-hidden="true">✨</span>';
    }

    return '<section class="hi-shell" data-hi-profile="' + esc(p.id) + '" style="--hi-accent:' + esc(p.color) + '">' +
      '<div class="hi-stage-frame hi-sky-' + state.skyMode + '">' +
        '<div class="hi-hud-top">' +
          '<div class="hi-kid-pill">' +
            '<span class="hi-kid-av" aria-hidden="true">' + esc(p.emoji) + '</span>' +
            '<span>' + esc(p.label) + '\'s Island</span>' +
          '</div>' +
          '<button type="button" class="hi-sky-btn" data-hi-sky="1" aria-label="Change sky time">' +
            '<span class="hi-sky-btn-emo" aria-hidden="true">' + skyInfo.emo + '</span>' +
            '<span class="hi-sky-btn-tx">' + esc(skyInfo.label) + '</span>' +
          '</button>' +
        '</div>' +
        '<div class="hi-viewport">' +
          '<div class="hi-world">' +
            '<div class="hi-sky-layer" aria-hidden="true">' +
              '<div class="hi-stars">' + starsHtml(28) + '</div>' +
              '<div class="hi-sun"></div>' +
              '<div class="hi-moon"></div>' +
              '<div class="hi-cloud" style="top:11%;left:6%;width:92px;height:32px;--cd:44s"></div>' +
              '<div class="hi-cloud" style="top:18%;left:38%;width:76px;height:26px;--cd:56s"></div>' +
              '<div class="hi-cloud" style="top:9%;left:68%;width:104px;height:34px;--cd:49s"></div>' +
            '</div>' +
            islandBackdropSvg() +
            '<button type="button" class="hi-hoot-perch" data-hi-hoot="1" aria-label="Tickle Hoot">' +
              hootSvg(state.hat, { idPrefix: "hi" }) +
            '</button>' +
            '<div class="hi-hoot-hearts" aria-hidden="true"></div>' +
            '<div class="hi-landmarks">' + landmarksHtml + '</div>' +
            '<div class="hi-fireflies" aria-hidden="true">' + islandFirefliesHtml(10) + '</div>' +
            '<div class="hi-fx-layer" aria-hidden="true">' + sparklePoolHtml + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="hi-pan-hint" aria-hidden="true">👈 Slide to explore 👉</div>' +
      '</div>' +
      '<nav class="hi-dock" aria-label="Island shortcuts">' +
        '<button type="button" class="hi-dock-btn hi-dock-morning" data-hi-dock="morning">' +
          '<span class="hi-dock-emo" aria-hidden="true">🌅</span><span>Morning</span>' +
        '</button>' +
        '<button type="button" class="hi-dock-btn hi-dock-bedtime" data-hi-dock="bedtime">' +
          '<span class="hi-dock-emo" aria-hidden="true">🌙</span><span>Bedtime</span>' +
        '</button>' +
        '<button type="button" class="hi-dock-btn hi-dock-games" data-hi-dock="games">' +
          '<span class="hi-dock-emo" aria-hidden="true">🎮</span><span>All 25 Games</span>' +
        '</button>' +
        '<button type="button" class="hi-dock-btn hi-dock-stickers" data-hi-dock="stickers">' +
          '<span class="hi-dock-emo" aria-hidden="true">📒</span><span>Stickers</span>' +
        '</button>' +
        '<button type="button" class="hi-dock-btn hi-dock-classic" data-hi-dock="classic">' +
          '<span class="hi-dock-emo" aria-hidden="true">📋</span><span>Classic</span>' +
        '</button>' +
      '</nav>' +
    '</section>';
  }

  /* ---------- Public mount(root, api) ---------- */
  function mount(root, api) {
    if (activeCleanup) {
      try { activeCleanup(); } catch (e) {}
      activeCleanup = null;
    }
    if (!root) return;
    var shell = root.querySelector(".hi-shell");
    if (!shell) return;

    var safeApi = api || {};
    state.api = safeApi;
    if (safeApi.profile) state.profile = normProfile(safeApi.profile);
    state.mounted = true;

    var frame = shell.querySelector(".hi-stage-frame");
    var viewport = shell.querySelector(".hi-viewport");
    var world = shell.querySelector(".hi-world");
    var hootBtn = shell.querySelector("[data-hi-hoot]");
    var heartsBox = shell.querySelector(".hi-hoot-hearts");
    var skyBtn = shell.querySelector("[data-hi-sky]");
    var panHint = shell.querySelector(".hi-pan-hint");
    var sparkles = Array.prototype.slice.call(shell.querySelectorAll(".hi-sparkle"));
    var sparkleIdx = 0;
    var lastSparkleTime = 0;
    var lastSparkleX = -999;
    var lastSparkleY = -999;
    var SPARKLE_ICONS = ["✨", "⭐", "🫧", "🌟", "💫"];

    /* Refresh Hoot's saved hat (e.g., returning from Treehouse Hoot) */
    function refreshHat() {
      var latest = readSavedHat(state.profile.id);
      if (latest !== state.hat) {
        state.hat = latest;
        if (hootBtn) hootBtn.innerHTML = hootSvg(state.hat, { idPrefix: "hi" });
      }
    }
    refreshHat();

    /* Center viewport on Hoot's Treehouse on narrow mobile screens */
    var ignoreScroll = false;
    function centerViewport() {
      if (viewport && viewport.scrollWidth > viewport.clientWidth + 8) {
        ignoreScroll = true;
        viewport.scrollLeft = Math.round((viewport.scrollWidth - viewport.clientWidth) / 2);
        setTimeout(function () { ignoreScroll = false; }, 120);
      }
    }
    requestAnimationFrame(centerViewport);

    var onScroll = function () {
      if (ignoreScroll) return;
      if (panHint && !panHint.classList.contains("hi-hidden")) {
        panHint.classList.add("hi-hidden");
      }
    };
    if (viewport) viewport.addEventListener("scroll", onScroll, { passive: true });

    /* Sky Cycle Button */
    function applySky(mode) {
      state.skyMode = mode;
      state.skyManual = true;
      if (frame) {
        SKY_ORDER.forEach(function (m) { frame.classList.remove("hi-sky-" + m); });
        frame.classList.add("hi-sky-" + mode);
      }
      if (skyBtn) {
        var meta = SKY_META[mode] || SKY_META.day;
        var em = skyBtn.querySelector(".hi-sky-btn-emo");
        var tx = skyBtn.querySelector(".hi-sky-btn-tx");
        if (em) em.textContent = meta.emo;
        if (tx) tx.textContent = meta.label;
      }
    }

    var onSkyClick = function () {
      var idx = SKY_ORDER.indexOf(state.skyMode);
      var next = SKY_ORDER[(idx + 1) % SKY_ORDER.length];
      applySky(next);
      playChime("sky");
    };
    if (skyBtn) skyBtn.addEventListener("click", onSkyClick);

    /* Finger Sparkle Trail */
    function spawnSparkle(clientX, clientY) {
      if (!world || !sparkles.length) return;
      var now = Date.now();
      if (now - lastSparkleTime < 45) return;
      var rect = world.getBoundingClientRect();
      var x = clientX - rect.left;
      var y = clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
      var dist = Math.hypot(x - lastSparkleX, y - lastSparkleY);
      if (dist < 14 && now - lastSparkleTime < 140) return;

      lastSparkleTime = now;
      lastSparkleX = x;
      lastSparkleY = y;

      var el = sparkles[sparkleIdx];
      sparkleIdx = (sparkleIdx + 1) % sparkles.length;
      el.textContent = SPARKLE_ICONS[state.sparkleCount % SPARKLE_ICONS.length];
      el.style.setProperty("--sx", Math.round(x - 9) + "px");
      el.style.setProperty("--sy", Math.round(y - 9) + "px");
      el.style.setProperty("--dx", Math.round((Math.random() - 0.5) * 34) + "px");
      el.style.setProperty("--dy", Math.round(-22 - Math.random() * 28) + "px");
      el.classList.remove("hi-active");
      void el.offsetWidth;
      el.classList.add("hi-active");
      state.sparkleCount += 1;
    }

    /* Smooth Eye-Tracking Hoot via RAF Lerp */
    var targetPx = 0, targetPy = 0;
    var curPx = 0, curPy = 0;
    var eyeRaf = null;
    var destroyed = false;

    function updateEyeTarget(clientX, clientY) {
      if (!hootBtn) return;
      var rect = hootBtn.getBoundingClientRect();
      var cx = rect.left + rect.width * 0.5;
      var cy = rect.top + rect.height * 0.36;
      var dx = clientX - cx;
      var dy = clientY - cy;
      var dist = Math.hypot(dx, dy) || 1;
      var maxR = 6.2;
      var mag = Math.min(maxR, dist / 28);
      targetPx = (dx / dist) * mag;
      targetPy = (dy / dist) * mag;
    }

    function stepEyes() {
      if (destroyed) return;
      curPx += (targetPx - curPx) * 0.18;
      curPy += (targetPy - curPy) * 0.18;
      if (hootBtn) {
        var pl = hootBtn.querySelector(".hi-pupil-l");
        var pr = hootBtn.querySelector(".hi-pupil-r");
        var tf = "translate(" + curPx.toFixed(2) + "," + curPy.toFixed(2) + ")";
        if (pl) pl.setAttribute("transform", tf);
        if (pr) pr.setAttribute("transform", tf);
      }
      eyeRaf = requestAnimationFrame(stepEyes);
    }
    eyeRaf = requestAnimationFrame(stepEyes);

    /* Natural occasional Hoot blink */
    var blinkInterval = setInterval(function () {
      if (!hootBtn || destroyed) return;
      hootBtn.classList.add("hi-blinking");
      setTimeout(function () {
        if (hootBtn) hootBtn.classList.remove("hi-blinking");
      }, 145);
    }, 4400);

    /* Direct tap on Hoot -> giggle + hearts + transient __bellyArmed */
    var onHootTap = function (ev) {
      ev.stopPropagation();
      state.hootTaps += 1;
      playVoice("assets/voice/hoot-giggle.mp3", { belly: true });
      if (hootBtn) {
        hootBtn.classList.remove("hi-giggle");
        void hootBtn.offsetWidth;
        hootBtn.classList.add("hi-giggle");
      }
      if (heartsBox) {
        var icons = ["💖", "💛", "✨", "🧡", "💕", "⭐"];
        for (var i = 0; i < 6; i++) {
          var h = document.createElement("span");
          h.className = "hi-heart-pop";
          h.textContent = icons[i % icons.length];
          h.style.setProperty("--hx", Math.round((i - 2.5) * 26 + (Math.random() - 0.5) * 18) + "px");
          h.style.setProperty("--hy", Math.round(-68 - Math.random() * 44) + "px");
          h.style.animationDelay = (i * 0.05) + "s";
          heartsBox.appendChild(h);
          (function (node) {
            setTimeout(function () { if (node.parentNode) node.parentNode.removeChild(node); }, 1050);
          })(h);
        }
      }
    };
    if (hootBtn) hootBtn.addEventListener("click", onHootTap);

    /* Pointer & Touch handlers on world for eye-tracking + finger sparkles + mouse drag-pan */
    var dragState = { down: false, startX: 0, startScroll: 0, moved: false };

    var onPointerMove = function (e) {
      updateEyeTarget(e.clientX, e.clientY);
      if (e.buttons || e.pointerType === "touch" || e.pointerType === "mouse") {
        spawnSparkle(e.clientX, e.clientY);
      }
      if (dragState.down && viewport && e.pointerType === "mouse") {
        var dx = e.clientX - dragState.startX;
        if (Math.abs(dx) > 6) dragState.moved = true;
        viewport.scrollLeft = dragState.startScroll - dx;
      }
    };

    var onPointerDown = function (e) {
      updateEyeTarget(e.clientX, e.clientY);
      spawnSparkle(e.clientX, e.clientY);
      if (viewport && e.pointerType === "mouse" && !e.target.closest("button")) {
        dragState.down = true;
        dragState.startX = e.clientX;
        dragState.startScroll = viewport.scrollLeft;
        dragState.moved = false;
        viewport.classList.add("hi-dragging");
      }
    };

    var onPointerUp = function () {
      dragState.down = false;
      if (viewport) viewport.classList.remove("hi-dragging");
    };

    var onTouchMove = function (e) {
      if (e.touches && e.touches[0]) {
        updateEyeTarget(e.touches[0].clientX, e.touches[0].clientY);
        spawnSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    if (frame) {
      frame.addEventListener("pointermove", onPointerMove, { passive: true });
      frame.addEventListener("pointerdown", onPointerDown, { passive: true });
      frame.addEventListener("touchmove", onTouchMove, { passive: true });
    }
    window.addEventListener("pointerup", onPointerUp, { passive: true });

    /* Landmark & Floating Dock clicks via delegated listener */
    var onShellClick = function (e) {
      var lm = e.target.closest && e.target.closest("[data-hi-game]");
      if (lm) {
        var key = lm.getAttribute("data-hi-game");
        playChime("pop");
        if (typeof safeApi.openGame === "function") safeApi.openGame(key);
        return;
      }
      var dk = e.target.closest && e.target.closest("[data-hi-dock]");
      if (dk) {
        var act = dk.getAttribute("data-hi-dock");
        playChime("pop");
        if (act === "morning") openMorning(state.profile, safeApi);
        else if (act === "bedtime") openBedtime(state.profile, safeApi);
        else if (act === "games" && typeof safeApi.openTab === "function") safeApi.openTab("games");
        else if (act === "stickers" && typeof safeApi.openStickers === "function") safeApi.openStickers();
        else if (act === "classic" && typeof safeApi.switchToClassic === "function") safeApi.switchToClassic();
      }
    };
    shell.addEventListener("click", onShellClick);

    var onFocusOrStorage = function () { refreshHat(); };
    window.addEventListener("storage", onFocusOrStorage);
    window.addEventListener("focus", onFocusOrStorage);

    activeCleanup = function () {
      destroyed = true;
      state.mounted = false;
      if (eyeRaf) cancelAnimationFrame(eyeRaf);
      clearInterval(blinkInterval);
      if (viewport) viewport.removeEventListener("scroll", onScroll);
      if (skyBtn) skyBtn.removeEventListener("click", onSkyClick);
      if (hootBtn) hootBtn.removeEventListener("click", onHootTap);
      if (frame) {
        frame.removeEventListener("pointermove", onPointerMove);
        frame.removeEventListener("pointerdown", onPointerDown);
        frame.removeEventListener("touchmove", onTouchMove);
      }
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("storage", onFocusOrStorage);
      window.removeEventListener("focus", onFocusOrStorage);
      shell.removeEventListener("click", onShellClick);
    };
  }

  /* ---------- Modal Lifecycle Helpers ---------- */
  function closeModal() {
    stopVoice();
    if (activeModalKeyHandler) {
      document.removeEventListener("keydown", activeModalKeyHandler);
      activeModalKeyHandler = null;
    }
    if (activeModalEl && activeModalEl.parentNode) {
      activeModalEl.parentNode.removeChild(activeModalEl);
    }
    activeModalEl = null;
    state.morningOpen = false;
    state.bedtimeOpen = false;
  }

  function burstConfetti(count) {
    var layer = document.createElement("div");
    layer.className = "hi-confetti-layer";
    layer.setAttribute("aria-hidden", "true");
    var colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#9b5de5", "#ff7eb3"];
    for (var i = 0; i < (count || 28); i++) {
      var bit = document.createElement("span");
      bit.className = "hi-confetti-bit";
      bit.style.left = Math.round(Math.random() * 96 + 2) + "%";
      bit.style.background = colors[i % colors.length];
      bit.style.setProperty("--cfd", (1.2 + Math.random() * 1.1).toFixed(2) + "s");
      bit.style.animationDelay = (Math.random() * 0.28).toFixed(2) + "s";
      layer.appendChild(bit);
    }
    document.body.appendChild(layer);
    setTimeout(function () {
      if (layer.parentNode) layer.parentNode.removeChild(layer);
    }, 2400);
  }

  /* ---------- Magic Letter & Number Wheel SVG ---------- */
  function buildWheelSvg() {
    var cx = 110, cy = 110, r = 102;
    var n = WHEEL_SLICES.length;
    var sliceDeg = 360 / n;
    var parts = ['<svg class="hi-wheel-svg" viewBox="0 0 220 220" aria-hidden="true">'];
    for (var i = 0; i < n; i++) {
      var a0 = (i * sliceDeg - 90) * Math.PI / 180;
      var a1 = ((i + 1) * sliceDeg - 90) * Math.PI / 180;
      var x0 = cx + r * Math.cos(a0);
      var y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1);
      var y1 = cy + r * Math.sin(a1);
      var midDeg = (i + 0.5) * sliceDeg;
      var mid = (midDeg - 90) * Math.PI / 180;
      var tx = cx + r * 0.65 * Math.cos(mid);
      var ty = cy + r * 0.65 * Math.sin(mid);
      parts.push(
        '<path d="M' + cx + ' ' + cy + ' L' + x0.toFixed(1) + ' ' + y0.toFixed(1) +
        ' A' + r + ' ' + r + ' 0 0 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) +
        ' Z" fill="' + WHEEL_SLICES[i].color + '" stroke="#4a2e1b" stroke-width="3.5"/>' +
        '<text x="' + tx.toFixed(1) + '" y="' + ty.toFixed(1) + '" text-anchor="middle" dominant-baseline="central" transform="rotate(' + midDeg.toFixed(1) + ' ' + tx.toFixed(1) + ' ' + ty.toFixed(1) + ')" font-size="30" font-weight="900" fill="#ffffff" stroke="#4a2e1b" stroke-width="1.8" paint-order="stroke">' +
          WHEEL_SLICES[i].label +
        '</text>'
      );
    }
    parts.push('<circle cx="110" cy="110" r="24" fill="#fffdf5" stroke="#4a2e1b" stroke-width="4.5"/>');
    parts.push('<text x="110" y="119" text-anchor="middle" font-size="22">⭐</text>');
    parts.push('</svg>');
    return parts.join("");
  }

  /* ---------- Public openMorning(profile, api) ---------- */
  function openMorning(profile, api) {
    closeModal();
    var p = normProfile(profile || state.profile);
    state.profile = p;
    state.hat = readSavedHat(p.id);
    state.morningOpen = true;
    state.morningStep = 0;
    state.morningWeather = null;
    state.morningFeeling = null;
    state.morningWheelResult = null;

    var wheelAngle = 0;
    var spinning = false;
    var wakeDone = false;

    var modal = document.createElement("div");
    modal.className = "hi-modal hi-morning";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Morning Circle");

    var greetingClip = p.id === "kidb"
      ? "assets/voice/good-morning-kidb.mp3"
      : p.id === "kida"
        ? "assets/voice/good-morning-kida.mp3"
        : "assets/voice/hoot-welcome.mp3";
    playVoice(greetingClip);

    function renderMorningStep() {
      var step = state.morningStep;
      var dots = [0, 1, 2, 3].map(function (i) {
        var cls = i < step ? "hi-done" : (i === step ? "hi-on" : "");
        return '<span class="hi-mc-dot ' + cls + '" aria-hidden="true"></span>';
      }).join("");

      var body = "";
      if (step === 0) {
        body =
          '<h2 class="hi-mc-title">🌅 Good Morning, ' + esc(p.label) + '!</h2>' +
          '<div class="hi-mc-hoot-stage">' +
            '<button type="button" class="hi-mc-hoot-btn' + (wakeDone ? " hi-awake" : "") + '" data-hi-mc="wake" aria-label="Wake up Hoot">' +
              hootSvg(state.hat, { sleepy: !wakeDone, idPrefix: "himc" }) +
            '</button>' +
          '</div>' +
          '<button type="button" class="hi-mc-action" data-hi-mc="wake">' +
            (wakeDone ? '☀️ Hoot is Awake! ➡️' : '☀️ Wake Up Hoot!') +
          '</button>';
      } else if (step === 1) {
        var weathers = [
          { id: "sunny",   emo: "☀️", label: "Sunny",   clip: "assets/voice/hoot-wea-sunny.mp3" },
          { id: "rain",    emo: "🌧️", label: "Rainy",   clip: "assets/voice/hoot-wea-rain.mp3" },
          { id: "snow",    emo: "❄️", label: "Snowy",   clip: "assets/voice/hoot-wea-snow.mp3" },
          { id: "rainbow", emo: "🌈", label: "Rainbow", clip: "assets/voice/hoot-wea-rainbow.mp3" }
        ];
        body =
          '<h2 class="hi-mc-title">🌤️ Today\'s Weather</h2>' +
          '<div class="hi-mc-grid">' +
            weathers.map(function (w) {
              var picked = state.morningWeather === w.id ? " hi-picked" : "";
              return '<button type="button" class="hi-mc-choice' + picked + '" data-hi-weather="' + w.id + '" data-hi-clip="' + w.clip + '">' +
                '<span class="hi-mc-choice-emo" aria-hidden="true">' + w.emo + '</span>' +
                '<span>' + w.label + '</span>' +
              '</button>';
            }).join("") +
          '</div>' +
          '<button type="button" class="hi-mc-action" data-hi-mc="next">Next ➡️</button>';
      } else if (step === 2) {
        var feelings = [
          { id: "happy",  emo: "😊", label: "Happy",  chime: "pop",   clip: "assets/voice/hoot-great-job.mp3" },
          { id: "silly",  emo: "🤪", label: "Silly",  chime: "boing", clip: "assets/voice/hoot-super.mp3" },
          { id: "sleepy", emo: "😴", label: "Sleepy", chime: "lullaby", clip: "assets/voice/owl-sleepy.mp3" },
          { id: "brave",  emo: "🦁", label: "Brave",  chime: "roar",  clip: "assets/voice/hoot-amazing.mp3" }
        ];
        body =
          '<h2 class="hi-mc-title">💛 How Do You Feel?</h2>' +
          '<div class="hi-mc-grid">' +
            feelings.map(function (f) {
              var picked = state.morningFeeling === f.id ? " hi-picked" : "";
              return '<button type="button" class="hi-mc-choice' + picked + '" data-hi-feeling="' + f.id + '" data-hi-chime="' + f.chime + '" data-hi-clip="' + f.clip + '">' +
                '<span class="hi-mc-choice-emo" aria-hidden="true">' + f.emo + '</span>' +
                '<span>' + f.label + '</span>' +
              '</button>';
            }).join("") +
          '</div>' +
          '<button type="button" class="hi-mc-action" data-hi-mc="next">Spin the Wheel ➡️</button>';
      } else {
        body =
          '<h2 class="hi-mc-title">🎡 Magic Letter &amp; Number Wheel!</h2>' +
          '<div class="hi-wheel-wrap">' +
            '<div class="hi-wheel-pointer" aria-hidden="true"></div>' +
            '<div class="hi-wheel-ring">' + buildWheelSvg() + '</div>' +
          '</div>' +
          '<div class="hi-wheel-result">' +
            (state.morningWheelResult ? ('🌟 ' + esc(state.morningWheelResult) + '!') : '✨ Tap SPIN!') +
          '</div>' +
          '<div class="hi-mc-btn-row">' +
            '<button type="button" class="hi-mc-action hi-spin-btn" data-hi-mc="spin">🎡 SPIN!</button>' +
            (state.morningWheelResult
              ? '<button type="button" class="hi-mc-action" data-hi-mc="finish">🎉 Let\'s Play!</button>'
              : '') +
          '</div>';
      }

      modal.innerHTML =
        '<button type="button" class="hi-modal-close" data-hi-close="1" aria-label="Close Morning Circle">✕</button>' +
        '<div class="hi-modal-card">' +
          '<div class="hi-mc-dots">' + dots + '</div>' +
          body +
        '</div>';

      if (step === 3 && wheelAngle) {
        var wsvg = modal.querySelector(".hi-wheel-svg");
        if (wsvg) wsvg.style.transform = "rotate(" + wheelAngle + "deg)";
      }
    }

    modal.addEventListener("click", function (e) {
      var closeBtn = e.target.closest && e.target.closest("[data-hi-close]");
      if (closeBtn) {
        closeModal();
        return;
      }

      var wakeBtn = e.target.closest && e.target.closest('[data-hi-mc="wake"]');
      if (wakeBtn) {
        if (!wakeDone) {
          wakeDone = true;
          playChime("birds");
          playVoice("assets/voice/hoot-giggle.mp3", { belly: true });
          renderMorningStep();
          setTimeout(function () {
            if (state.morningOpen && state.morningStep === 0) {
              state.morningStep = 1;
              renderMorningStep();
            }
          }, 900);
        } else {
          state.morningStep = 1;
          renderMorningStep();
        }
        return;
      }

      var wBtn = e.target.closest && e.target.closest("[data-hi-weather]");
      if (wBtn) {
        state.morningWeather = wBtn.getAttribute("data-hi-weather");
        playChime("pop");
        playVoice(wBtn.getAttribute("data-hi-clip"));
        renderMorningStep();
        return;
      }

      var fBtn = e.target.closest && e.target.closest("[data-hi-feeling]");
      if (fBtn) {
        state.morningFeeling = fBtn.getAttribute("data-hi-feeling");
        playChime(fBtn.getAttribute("data-hi-chime") || "pop");
        playVoice(fBtn.getAttribute("data-hi-clip"));
        renderMorningStep();
        return;
      }

      var nextBtn = e.target.closest && e.target.closest('[data-hi-mc="next"]');
      if (nextBtn) {
        playChime("pop");
        state.morningStep = Math.min(3, state.morningStep + 1);
        renderMorningStep();
        if (state.morningStep === 2) {
          playVoice("assets/voice/ask-which-feeling.mp3");
        }
        return;
      }

      var spinBtn = e.target.closest && e.target.closest('[data-hi-mc="spin"]');
      if (spinBtn && !spinning) {
        spinning = true;
        var pickIdx = Math.floor(Math.random() * WHEEL_SLICES.length);
        var slice = WHEEL_SLICES[pickIdx];
        var sliceDeg = 360 / WHEEL_SLICES.length;
        /* Pointer sits at top (0deg); slice i center is at (i + 0.5) * sliceDeg */
        var targetMod = (360 - ((pickIdx + 0.5) * sliceDeg)) % 360;
        var curMod = ((wheelAngle % 360) + 360) % 360;
        var delta = (targetMod - curMod + 360) % 360;
        wheelAngle += 1080 + delta;

        var wsvg = modal.querySelector(".hi-wheel-svg");
        if (wsvg) wsvg.style.transform = "rotate(" + wheelAngle + "deg)";

        for (var t = 0; t < 8; t++) {
          (function (stepT) {
            setTimeout(function () {
              if (state.morningOpen) playChime("tick");
            }, stepT * 145);
          })(t);
        }

        setTimeout(function () {
          spinning = false;
          if (!state.morningOpen) return;
          state.morningWheelResult = slice.label;
          playChime("fanfare");
          playVoice(slice.clip);
          burstConfetti(32);
          renderMorningStep();
        }, 1480);
        return;
      }

      var finishBtn = e.target.closest && e.target.closest('[data-hi-mc="finish"]');
      if (finishBtn) {
        playChime("fanfare");
        burstConfetti(34);
        playVoice("assets/voice/hoot-ready-go.mp3");
        setTimeout(function () {
          if (state.morningOpen) closeModal();
        }, 420);
      }
    });

    activeModalKeyHandler = function (ev) {
      if (ev.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", activeModalKeyHandler);

    renderMorningStep();
    document.body.appendChild(modal);
    activeModalEl = modal;
  }

  /* ---------- Public openBedtime(profile, api) ---------- */
  function openBedtime(profile, api) {
    closeModal();
    var p = normProfile(profile || state.profile);
    var safeApi = api || state.api || {};
    state.profile = p;
    state.bedtimeOpen = true;
    state.lampsOffMap = {};
    state.firefliesCaught = 0;

    var modal = document.createElement("div");
    modal.className = "hi-modal hi-bedtime";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Goodnight Hoot Bedtime");

    var sleepyClip = p.id === "kidb"
      ? "assets/voice/sleepy-kidb.mp3"
      : p.id === "kida"
        ? "assets/voice/sleepy-kida.mp3"
        : "assets/voice/owl-sleepy.mp3";
    playVoice(sleepyClip);

    var firefliesHtml = "";
    for (var i = 0; i < 7; i++) {
      var fl = 7 + ((i * 17 + 5) % 82);
      var ft = 12 + ((i * 23 + 9) % 72);
      var fd = (4.8 + (i % 4) * 1.15).toFixed(1);
      var fdl = ((i % 5) * 0.55).toFixed(1);
      firefliesHtml +=
        '<button type="button" class="hi-bt-firefly" data-hi-firefly="' + i + '"' +
        ' style="left:' + fl + '%;top:' + ft + '%;--fd:' + fd + 's;--fdl:' + fdl + 's" aria-label="Catch firefly">' +
          '<span class="hi-bt-firefly-dot" aria-hidden="true"></span>' +
        '</button>';
    }

    var bedsHtml = BEDTIME_ANIMALS.map(function (a) {
      return '<button type="button" class="hi-bt-bed" data-hi-lamp="' + a.id + '" aria-label="Turn off ' + a.name + '\'s lamp">' +
        '<span class="hi-bt-zzz" aria-hidden="true">Zzz</span>' +
        '<span class="hi-bt-lamp" aria-hidden="true">💡</span>' +
        '<span class="hi-bt-animal" aria-hidden="true">' + a.emo + '</span>' +
        '<span>' + a.name + '</span>' +
      '</button>';
    }).join("");

    modal.innerHTML =
      '<div class="hi-bt-sky" aria-hidden="true">' +
        '<div class="hi-stars" style="opacity:1">' + starsHtml(36) + '</div>' +
        '<div class="hi-bt-moon"></div>' +
      '</div>' +
      '<div class="hi-bt-firefly-layer">' + firefliesHtml + '</div>' +
      '<button type="button" class="hi-modal-close" data-hi-close="1" aria-label="Close Bedtime">✕</button>' +
      '<div class="hi-modal-card">' +
        '<div class="hi-bt-header">' +
          '<h2 class="hi-bt-title">🌙 Goodnight, ' + esc(p.label) + '</h2>' +
          '<span class="hi-bt-jar" data-hi-jar="1">✨ 0</span>' +
        '</div>' +
        '<div class="hi-bt-animals">' + bedsHtml + '</div>' +
        '<button type="button" class="hi-bt-story-btn" data-hi-bt-story="1">' +
          '<span aria-hidden="true">📖</span><span>Bedtime Story</span><span aria-hidden="true">🌙</span>' +
        '</button>' +
      '</div>';

    modal.addEventListener("click", function (e) {
      var closeBtn = e.target.closest && e.target.closest("[data-hi-close]");
      if (closeBtn) {
        closeModal();
        return;
      }

      var lampBtn = e.target.closest && e.target.closest("[data-hi-lamp]");
      if (lampBtn) {
        var id = lampBtn.getAttribute("data-hi-lamp");
        if (!state.lampsOffMap[id]) {
          state.lampsOffMap[id] = true;
          lampBtn.classList.add("hi-off");
          var offCount = Object.keys(state.lampsOffMap).length;
          if (offCount >= BEDTIME_ANIMALS.length) {
            modal.classList.add("hi-very-sleepy");
            playChime("lullaby-done");
            playVoice("assets/voice/hoot-peek-night.mp3");
            var stBtn = modal.querySelector("[data-hi-bt-story]");
            if (stBtn) stBtn.classList.add("hi-ready");
          } else {
            playChime("lullaby");
          }
        } else {
          /* Gentle toggle back on if kid wants to play with the lamp again */
          delete state.lampsOffMap[id];
          lampBtn.classList.remove("hi-off");
          modal.classList.remove("hi-very-sleepy");
          playChime("firefly");
        }
        return;
      }

      var ffBtn = e.target.closest && e.target.closest("[data-hi-firefly]");
      if (ffBtn && !ffBtn.classList.contains("hi-caught")) {
        ffBtn.classList.add("hi-caught");
        state.firefliesCaught += 1;
        playChime("firefly");
        var jar = modal.querySelector("[data-hi-jar]");
        if (jar) jar.textContent = "✨ " + state.firefliesCaught;
        setTimeout(function () {
          if (!state.bedtimeOpen || !ffBtn.parentNode) return;
          ffBtn.style.left = Math.round(10 + Math.random() * 80) + "%";
          ffBtn.style.top = Math.round(12 + Math.random() * 72) + "%";
          ffBtn.classList.remove("hi-caught");
        }, 1600);
        return;
      }

      var storyBtn = e.target.closest && e.target.closest("[data-hi-bt-story]");
      if (storyBtn) {
        playChime("lullaby");
        closeModal();
        if (typeof safeApi.openStory === "function") {
          safeApi.openStory();
        }
      }
    });

    activeModalKeyHandler = function (ev) {
      if (ev.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", activeModalKeyHandler);

    document.body.appendChild(modal);
    activeModalEl = modal;
  }

  /* ---------- Verification Snapshot ---------- */
  function snapshot() {
    return {
      mounted: state.mounted,
      profileId: state.profile ? state.profile.id : null,
      skyMode: state.skyMode,
      hat: readSavedHat(state.profile ? state.profile.id : "kida"),
      landmarkCount: LANDMARKS.length,
      landmarks: LANDMARKS.map(function (l) { return l.key; }),
      hootTaps: state.hootTaps,
      sparkleCount: state.sparkleCount,
      morningOpen: state.morningOpen,
      morningStep: state.morningStep,
      morningWeather: state.morningWeather,
      morningFeeling: state.morningFeeling,
      morningWheelResult: state.morningWheelResult,
      bedtimeOpen: state.bedtimeOpen,
      lampsOff: Object.keys(state.lampsOffMap).length,
      lampsTotal: BEDTIME_ANIMALS.length,
      firefliesCaught: state.firefliesCaught
    };
  }

  window.HootIsland = {
    renderHtml: renderHtml,
    mount: mount,
    openMorning: openMorning,
    openBedtime: openBedtime,
    closeModal: closeModal,
    snapshot: snapshot
  };
})();
