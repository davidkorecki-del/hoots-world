/* Hoot Teen Arcade, XP/Leveling, Customize My Vibe & Lo-Fi Audio Studio (kidc only).
   Designed so a 12-year-old genuinely WANTS to open the app every day:
   - XP Levels, Study Gems, Custom Avatars, Mood Status & Animated Workspace Particles
   - Pure Offline WebAudio Lo-Fi Study Soundbar (Soft Rain, Fireplace, Ocean Waves, Lo-Fi Chords)
   - 4 Addictive Grade 7 Brain Arcade Games:
     1. Daily HOOTLE (5-letter Grade 7 Wordle + unlimited bonus mode)
     2. Equation Dash (45s musical-combo math arcade)
     3. Word Blitz (45s ELA roots, vocab & connotation combo arcade)
     4. Timeline Rush (NY History Higher/Lower streak duel) */
(function () {
  "use strict";

  var VIBE_KEY = "hootworld.hs.vibe.v1";
  var SCORE_KEY = "hootworld.hs.arcade.v1";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function activeKid() {
    try { return (window.__llState && window.__llState()) || "kidc"; } catch (e) { return "kidc"; }
  }
  function loadJ(k) { try { return JSON.parse(localStorage.getItem(k) || "{}") || {}; } catch (e) { return {}; } }
  function saveJ(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function todayKey() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function shuf(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* =========================================================================
     1. XP, SCHOLAR RANKS, GEMS & CUSTOMIZE MY VIBE STORE
     ========================================================================= */
  var RANKS = [
    { lv: 1, min: 0, title: "Rising Scholar" },
    { lv: 2, min: 100, title: "Trailblazer" },
    { lv: 3, min: 250, title: "Honor Roll" },
    { lv: 4, min: 450, title: "Mind Architect" },
    { lv: 5, min: 700, title: "Empire Genius" },
    { lv: 6, min: 1050, title: "NY Legend" }
  ];
  var AVATARS = [
    { id: "muse", ico: "🎧", name: "Lo-Fi Muse", cost: 0 },
    { id: "fox", ico: "🦊", name: "Cyber Fox", cost: 0 },
    { id: "moon", ico: "🌙", name: "Moon Coder", cost: 0 },
    { id: "art", ico: "🎨", name: "Studio Artist", cost: 0 },
    { id: "nova", ico: "⚡", name: "Nova", cost: 30 },
    { id: "prism", ico: "🦋", name: "Prism", cost: 40 },
    { id: "mystic", ico: "🔮", name: "Mystic", cost: 50 },
    { id: "crown", ico: "👑", name: "NY Legend", cost: 80 }
  ];
  var MOODS = [
    "Locked in 🎧", "Chill Study ☕", "Quiz Prep ⚡",
    "Creative Mode 🎨", "Speedrun 🔥", "Night Owl 🌙"
  ];
  var FX_MODES = [
    { id: "stars", ico: "✨", name: "Firefly Stars", cost: 0 },
    { id: "sakura", ico: "🌸", name: "Sakura Petals", cost: 0 },
    { id: "snow", ico: "❄️", name: "Soft Snow", cost: 25 },
    { id: "bokeh", ico: "🫧", name: "Prism Bokeh", cost: 35 },
    { id: "off", ico: "⏸", name: "Still", cost: 0 }
  ];

  function getVibe(kid) {
    var all = loadJ(VIBE_KEY), id = kid || activeKid();
    var v = all[id] || {};
    return {
      xp: v.xp || 0,
      gems: v.gems != null ? v.gems : 50,
      avatar: v.avatar || "muse",
      mood: v.mood || "Locked in 🎧",
      fx: v.fx || "stars",
      owned: v.owned || { muse: 1, fox: 1, moon: 1, art: 1, stars: 1, sakura: 1, off: 1 }
    };
  }
  function saveVibe(v, kid) {
    var all = loadJ(VIBE_KEY);
    all[kid || activeKid()] = v;
    saveJ(VIBE_KEY, all);
  }
  function rankFor(xp) {
    var cur = RANKS[0], next = RANKS[1];
    for (var i = 0; i < RANKS.length; i++) {
      if (xp >= RANKS[i].min) { cur = RANKS[i]; next = RANKS[i + 1] || null; }
    }
    var pct = next ? Math.min(100, Math.round(((xp - cur.min) / (next.min - cur.min)) * 100)) : 100;
    return { lv: cur.lv, title: cur.title, pct: pct, toNext: next ? (next.min - xp) : 0 };
  }
  function awardXP(xpAmt, gemAmt) {
    var v = getVibe();
    var prevLv = rankFor(v.xp).lv;
    v.xp += (xpAmt || 0);
    v.gems += (gemAmt || 0);
    saveVibe(v);
    var newLv = rankFor(v.xp).lv;
    if (newLv > prevLv && window.HootStudyPro && window.HootStudyPro.celebrate) {
      window.HootStudyPro.celebrate();
    }
    window.dispatchEvent(new CustomEvent("hoot-vibe-change"));
    return { xp: v.xp, gems: v.gems, leveledUp: newLv > prevLv, rank: rankFor(v.xp) };
  }
  function avatarObj(id) {
    return AVATARS.filter(function (a) { return a.id === id; })[0] || AVATARS[0];
  }

  /* =========================================================================
     2. ANIMATED WORKSPACE AMBIENT PARTICLES (Stars / Sakura / Snow / Bokeh)
     ========================================================================= */
  var fxState = { cv: null, ctx: null, raf: 0, mode: "off", pts: [] };
  function stopFx() {
    if (fxState.raf) { cancelAnimationFrame(fxState.raf); fxState.raf = 0; }
    if (fxState.cv && fxState.cv.parentNode) fxState.cv.parentNode.removeChild(fxState.cv);
    fxState.cv = null; fxState.mode = "off";
  }
  function syncFx(isTeenActive) {
    if (!isTeenActive || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      stopFx();
      return;
    }
    var want = getVibe().fx || "stars";
    if (want === "off") { stopFx(); return; }
    if (fxState.cv && fxState.mode === want) return;
    stopFx();
    var cv = document.createElement("canvas");
    cv.id = "hs-vibe-fx";
    cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    fxState.cv = cv;
    fxState.ctx = cv.getContext("2d");
    fxState.mode = want;

    function resize() {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    }
    resize();
    var n = want === "bokeh" ? 16 : 26;
    fxState.pts = [];
    for (var i = 0; i < n; i++) {
      fxState.pts.push({
        x: Math.random() * cv.width,
        y: Math.random() * cv.height,
        r: want === "bokeh" ? (18 + Math.random() * 32) : (want === "sakura" ? 4 + Math.random() * 4 : 1.6 + Math.random() * 2.6),
        vx: (Math.random() - 0.5) * (want === "sakura" ? 0.55 : 0.25),
        vy: want === "stars" || want === "bokeh" ? (-0.15 - Math.random() * 0.22) : (0.35 + Math.random() * 0.55),
        ph: Math.random() * Math.PI * 2,
        hue: [160, 235, 330, 42][i % 4]
      });
    }
    function tick(t) {
      if (!fxState.cv || !document.body.classList.contains("ll-teen")) { stopFx(); return; }
      if (cv.width !== window.innerWidth || cv.height !== window.innerHeight) resize();
      var ctx = fxState.ctx, dark = document.body.classList.contains("hs-dark");
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (var i = 0; i < fxState.pts.length; i++) {
        var p = fxState.pts[i];
        p.x += p.vx + Math.sin(t * 0.001 + p.ph) * (want === "sakura" ? 0.45 : 0.14);
        p.y += p.vy;
        if (p.y < -40) p.y = cv.height + 30;
        if (p.y > cv.height + 40) p.y = -30;
        if (p.x < -40) p.x = cv.width + 30;
        if (p.x > cv.width + 40) p.x = -30;
        var tw = 0.45 + 0.55 * Math.sin(t * 0.0022 + p.ph);
        ctx.save();
        if (want === "stars") {
          ctx.globalAlpha = (dark ? 0.52 : 0.30) * tw;
          ctx.fillStyle = dark ? "#A7F3D0" : "#059669";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        } else if (want === "sakura") {
          ctx.translate(p.x, p.y);
          ctx.rotate(t * 0.001 + p.ph);
          ctx.globalAlpha = dark ? 0.45 : 0.50;
          ctx.fillStyle = "#FDA4AF";
          ctx.beginPath(); ctx.ellipse(0, 0, p.r * 1.4, p.r * 0.72, 0, 0, Math.PI * 2); ctx.fill();
        } else if (want === "snow") {
          ctx.globalAlpha = dark ? 0.48 : 0.55;
          ctx.fillStyle = dark ? "#E0F2FE" : "#93C5FD";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        } else if (want === "bokeh") {
          ctx.globalAlpha = dark ? 0.08 : 0.07;
          ctx.fillStyle = "hsl(" + p.hue + ",80%,65%)";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }
      fxState.raf = requestAnimationFrame(tick);
    }
    fxState.raf = requestAnimationFrame(tick);
  }

  /* =========================================================================
     3. OFFLINE WEBAUDIO LO-FI SOUNDSCAPES & MUSICAL COMBO CHIMES
     ========================================================================= */
  var snd = { ctx: null, active: "off", stopFn: null };
  function ensureAudio() {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!snd.ctx) snd.ctx = new Ctx();
    if (snd.ctx.state === "suspended") try { snd.ctx.resume(); } catch (e) {}
    return snd.ctx;
  }
  function stopSound() {
    if (snd.stopFn) { try { snd.stopFn(); } catch (e) {} snd.stopFn = null; }
    snd.active = "off";
    document.querySelectorAll("[data-lofi-snd]").forEach(function (b) { b.classList.remove("on"); });
  }
  function playSound(kind) {
    if (snd.active === kind) { stopSound(); return; }
    stopSound();
    var c = ensureAudio();
    if (!c) return;
    snd.active = kind;
    var nodes = [], iv = null;
    try {
      if (kind === "rain" || kind === "waves" || kind === "fire") {
        var sr = c.sampleRate, len = sr * 3, buf = c.createBuffer(1, len, sr);
        var d = buf.getChannelData(0), last = 0;
        for (var i = 0; i < len; i++) {
          var w = Math.random() * 2 - 1;
          d[i] = (last + 0.022 * w) / 1.022; last = d[i];
          d[i] *= kind === "fire" ? 1.8 : 2.2;
          if (kind === "fire" && Math.random() < 0.0012) d[i] += (Math.random() - 0.5) * 0.65;
        }
        var src = c.createBufferSource(); src.buffer = buf; src.loop = true;
        var lp = c.createBiquadFilter(); lp.type = "lowpass";
        lp.frequency.value = kind === "fire" ? 420 : kind === "waves" ? 480 : 660;
        var g = c.createGain(); g.gain.value = 0.085;
        src.connect(lp); lp.connect(g); g.connect(c.destination);
        if (kind === "waves") {
          var lfo = c.createOscillator(), lg = c.createGain();
          lfo.frequency.value = 0.14; lg.gain.value = 0.045;
          lfo.connect(lg); lg.connect(g.gain); lfo.start(); nodes.push(lfo);
        }
        src.start(); nodes.push(src);
      } else if (kind === "lofi") {
        /* Dreamy warm Lo-Fi electric piano chords: Fmaj7 -> Em7 -> Dm7 -> Cmaj7 */
        var chords = [
          [174.61, 220.0, 261.63, 329.63],
          [164.81, 196.0, 246.94, 293.66],
          [146.83, 174.61, 220.0, 261.63],
          [130.81, 196.0, 246.94, 329.63]
        ];
        var ci = 0;
        function strum() {
          if (snd.active !== "lofi") return;
          var ch = chords[ci++ % chords.length];
          var now = c.currentTime;
          ch.forEach(function (freq, k) {
            var o = c.createOscillator(), lp = c.createBiquadFilter(), g = c.createGain();
            o.type = "triangle"; o.frequency.value = freq;
            lp.type = "lowpass"; lp.frequency.value = 920;
            g.gain.setValueAtTime(0.0001, now + k * 0.04);
            g.gain.linearRampToValueAtTime(0.032, now + k * 0.04 + 0.12);
            g.gain.exponentialRampToValueAtTime(0.0001, now + 2.7);
            o.connect(lp); lp.connect(g); g.connect(c.destination);
            o.start(now + k * 0.04); o.stop(now + 2.8);
          });
        }
        strum();
        iv = setInterval(strum, 2850);
      }
    } catch (e) {}
    snd.stopFn = function () {
      if (iv) clearInterval(iv);
      nodes.forEach(function (n) { try { n.stop(); } catch (e) {} });
    };
    document.querySelectorAll("[data-lofi-snd]").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-lofi-snd") === kind);
    });
  }
  var PENTA = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66];
  function chime(step, bad) {
    var c = ensureAudio(); if (!c) return;
    try {
      var o = c.createOscillator(), g = c.createGain(), now = c.currentTime;
      o.type = bad ? "sawtooth" : "sine";
      o.frequency.setValueAtTime(bad ? 190 : PENTA[Math.min(PENTA.length - 1, Math.max(0, step))], now);
      g.gain.setValueAtTime(bad ? 0.045 : 0.07, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + (bad ? 0.18 : 0.32));
      o.connect(g); g.connect(c.destination);
      o.start(now); o.stop(now + 0.35);
    } catch (e) {}
  }

  /* =========================================================================
     4. CUSTOMIZE MY VIBE MODAL / OVERLAY
     ========================================================================= */
  function openVibeStudio(body) {
    if (!body) return;
    function draw() {
      var v = getVibe(), rk = rankFor(v.xp), av = avatarObj(v.avatar);
      body.innerHTML =
        '<div class="hs vb-wrap">' +
          '<section class="hs-card vb-top">' +
            '<div class="vb-av-big">' + av.ico + "</div>" +
            '<div class="vb-info"><h3>Level ' + rk.lv + " · " + esc(rk.title) + '</h3>' +
            '<p>' + v.xp + " XP · 💎 <b>" + v.gems + " Study Gems</b>" + (rk.toNext ? " · " + rk.toNext + " XP to Level " + (rk.lv + 1) : " · Max Rank!") + "</p>" +
            '<div class="vb-xpbar"><i style="width:' + rk.pct + '%"></i></div></div>' +
          "</section>" +
          '<section class="hs-card">' +
            '<h4>✨ Choose Your Avatar</h4>' +
            '<div class="vb-grid">' + AVATARS.map(function (a) {
              var own = !!v.owned[a.id] || a.cost === 0, on = v.avatar === a.id;
              return '<button type="button" class="vb-tile' + (on ? " on" : "") + (own ? "" : " lock") + '" data-vb-av="' + a.id + '">' +
                '<span class="vb-ic">' + a.ico + '</span><b>' + esc(a.name) + '</b><small>' + (on ? "Equipped ✓" : own ? "Equip" : "💎 " + a.cost) + "</small></button>";
            }).join("") + "</div>" +
          "</section>" +
          '<section class="hs-card">' +
            '<h4>🌌 Animated Workspace Atmosphere</h4>' +
            '<div class="vb-grid">' + FX_MODES.map(function (f) {
              var own = !!v.owned[f.id] || f.cost === 0, on = v.fx === f.id;
              return '<button type="button" class="vb-tile' + (on ? " on" : "") + (own ? "" : " lock") + '" data-vb-fx="' + f.id + '">' +
                '<span class="vb-ic">' + f.ico + '</span><b>' + esc(f.name) + '</b><small>' + (on ? "Active ✓" : own ? "Activate" : "💎 " + f.cost) + "</small></button>";
            }).join("") + "</div>" +
          "</section>" +
          '<section class="hs-card">' +
            '<h4>💬 Study Mood Status</h4>' +
            '<div class="fc-decks">' + MOODS.map(function (m) {
              return '<button type="button" class="fc-pill' + (v.mood === m ? " on" : "") + '" data-vb-mood="' + esc(m) + '">' + esc(m) + "</button>";
            }).join("") + "</div>" +
          "</section>" +
          '<section class="hs-card">' +
            '<h4>🎧 Lo-Fi Study Soundbar (100% Offline)</h4>' +
            '<div class="fc-decks">' +
              '<button type="button" class="fc-pill' + (snd.active === "lofi" ? " on" : "") + '" data-lofi-snd="lofi">🎹 Lo-Fi Chords</button>' +
              '<button type="button" class="fc-pill' + (snd.active === "rain" ? " on" : "") + '" data-lofi-snd="rain">🌧 Soft Rain</button>' +
              '<button type="button" class="fc-pill' + (snd.active === "fire" ? " on" : "") + '" data-lofi-snd="fire">🔥 Fireplace</button>' +
              '<button type="button" class="fc-pill' + (snd.active === "waves" ? " on" : "") + '" data-lofi-snd="waves">🌊 Ocean Waves</button>' +
            "</div>" +
          "</section>" +
        "</div>";
    }
    body.onclick = function (e) {
      var avB = e.target.closest("[data-vb-av]");
      if (avB) {
        var id = avB.getAttribute("data-vb-av"), item = avatarObj(id), v = getVibe();
        if (v.owned[id] || item.cost === 0) { v.avatar = id; saveVibe(v); window.dispatchEvent(new CustomEvent("hoot-vibe-change")); draw(); }
        else if (v.gems >= item.cost) { v.gems -= item.cost; v.owned[id] = 1; v.avatar = id; saveVibe(v); chime(5); if (window.HootStudyPro && window.HootStudyPro.celebrate) window.HootStudyPro.celebrate(); window.dispatchEvent(new CustomEvent("hoot-vibe-change")); draw(); }
        else { chime(0, true); }
        return;
      }
      var fxB = e.target.closest("[data-vb-fx]");
      if (fxB) {
        var fid = fxB.getAttribute("data-vb-fx"), fObj = FX_MODES.filter(function (x) { return x.id === fid; })[0], v2 = getVibe();
        if (!fObj) return;
        if (v2.owned[fid] || fObj.cost === 0) { v2.fx = fid; saveVibe(v2); syncFx(true); draw(); }
        else if (v2.gems >= fObj.cost) { v2.gems -= fObj.cost; v2.owned[fid] = 1; v2.fx = fid; saveVibe(v2); syncFx(true); chime(5); draw(); }
        else { chime(0, true); }
        return;
      }
      var mdB = e.target.closest("[data-vb-mood]");
      if (mdB) { var v3 = getVibe(); v3.mood = mdB.getAttribute("data-vb-mood"); saveVibe(v3); window.dispatchEvent(new CustomEvent("hoot-vibe-change")); draw(); return; }
      var snB = e.target.closest("[data-lofi-snd]");
      if (snB) { playSound(snB.getAttribute("data-lofi-snd")); draw(); }
    };
    draw();
  }

  /* =========================================================================
     5. BRAIN ARCADE — 4 ADDICTIVE GRADE 7 GAMES
     ========================================================================= */
  var HOOTLE_WORDS = [
    { w: "RATIO", def: "7.RP · A comparison of two quantities by division (like 3:4)." },
    { w: "PRISM", def: "7.G.6 · A 3D solid with two identical parallel bases and rectangular faces." },
    { w: "SLOPE", def: "7.RP.2 · Steepness of a line; for proportions, slope equals constant k." },
    { w: "CELLS", def: "MS-LS1 · The smallest basic building blocks of all living organisms." },
    { w: "FORCE", def: "MS-PS2 · A push or pull measured in newtons (F = m × a)." },
    { w: "UNION", def: "7.8 · The Northern United States during the American Civil War." },
    { w: "CLAIM", def: "7W1 · An arguable main position supported by evidence and reasoning." },
    { w: "THEME", def: "7R2 · The central message or life lesson woven through a literary text." },
    { w: "GENES", def: "MS-LS3 · Sections of DNA on chromosomes that pass traits to offspring." },
    { w: "SCALE", def: "7.G.1 · The ratio comparing a map or drawing size to real-world size." },
    { w: "ANGLE", def: "7.G.5 · Space between two intersecting rays, measured in degrees." },
    { w: "GRAPH", def: "7.RP · A visual plot showing how two variables relate on a plane." },
    { w: "SOLVE", def: "7.EE.4 · To isolate a variable and find the value that makes an equation true." },
    { w: "EQUAL", def: "7.EE · Balanced with the exact same value on both sides of the = sign." },
    { w: "MAGMA", def: "MS-ESS2 · Molten rock beneath Earth's surface that cools into igneous rock." },
    { w: "CRUST", def: "MS-ESS2 · Earth's thin outermost rocky shell broken into tectonic plates." },
    { w: "TAXES", def: "7.3 · British taxes like the Stamp Act sparked 'No taxation without representation!'" },
    { w: "IRONY", def: "7R · A sharp contrast between what is expected and what actually happens." },
    { w: "ATOMS", def: "MS-PS1 · Tiny building blocks of matter that join together into molecules." },
    { w: "CLOUD", def: "MS-ESS2 · Formed when rising water vapor cools and condenses into droplets." }
  ];

  function getScores() { return loadJ(SCORE_KEY)[activeKid()] || {}; }
  function saveBest(gameKey, val) {
    var all = loadJ(SCORE_KEY), kid = activeKid();
    all[kid] = all[kid] || {};
    var isPB = !all[kid][gameKey] || val > all[kid][gameKey];
    if (isPB) { all[kid][gameKey] = val; saveJ(SCORE_KEY, all); }
    return isPB;
  }

  /* GAME 1: DAILY HOOTLE (5-Letter Grade 7 Wordle) */
  function renderHootle(stage) {
    var tk = todayKey(), seed = 0;
    for (var i = 0; i < tk.length; i++) seed = (seed * 31 + tk.charCodeAt(i)) >>> 0;
    var item = HOOTLE_WORDS[seed % HOOTLE_WORDS.length];
    var bonusIdx = 0;
    var st = { target: item.w, def: item.def, guesses: [], cur: "", done: false, won: false, msg: "Guess today's 5-letter Grade 7 word!", isBonus: false };

    function evalGuess(g, tgt) {
      var res = ["abs", "abs", "abs", "abs", "abs"], pool = tgt.split("");
      for (var i = 0; i < 5; i++) { if (g[i] === tgt[i]) { res[i] = "hit"; pool[i] = null; } }
      for (var j = 0; j < 5; j++) {
        if (res[j] === "hit") continue;
        var k = pool.indexOf(g[j]);
        if (k >= 0) { res[j] = "near"; pool[k] = null; }
      }
      return res;
    }

    function keyColors() {
      var m = {}, pri = { hit: 3, near: 2, abs: 1 };
      st.guesses.forEach(function (g) {
        var ev = evalGuess(g, st.target);
        for (var i = 0; i < 5; i++) {
          var ch = g[i];
          if (!m[ch] || pri[ev[i]] > pri[m[ch]]) m[ch] = ev[i];
        }
      });
      return m;
    }

    function submit() {
      if (st.done) return;
      if (st.cur.length < 5) { st.msg = "Type all 5 letters first!"; draw(); return; }
      st.guesses.push(st.cur);
      if (st.cur === st.target) {
        st.done = true; st.won = true;
        awardXP(45, 20); chime(6);
        if (window.HootStudyPro && window.HootStudyPro.celebrate) window.HootStudyPro.celebrate();
        st.msg = "🎉 Solved in " + st.guesses.length + "/6! +45 XP · +20 💎";
      } else if (st.guesses.length >= 6) {
        st.done = true; st.won = false;
        st.msg = "The word was " + st.target + " — try a bonus round!";
      } else {
        st.msg = (6 - st.guesses.length) + " tries left";
        chime(2);
      }
      st.cur = "";
      draw();
    }

    function addLetter(ch) {
      if (st.done) return;
      if (ch === "ENTER") { submit(); return; }
      if (ch === "DEL") { st.cur = st.cur.slice(0, -1); draw(); return; }
      if (/^[A-Z]$/.test(ch) && st.cur.length < 5) { st.cur += ch; draw(); }
    }

    function draw() {
      var rows = "";
      for (var r = 0; r < 6; r++) {
        var g = st.guesses[r], ev = g ? evalGuess(g, st.target) : null;
        rows += '<div class="htl-row">';
        for (var c = 0; c < 5; c++) {
          var ch = g ? g[c] : (r === st.guesses.length ? (st.cur[c] || "") : "");
          var cls = ev ? ev[c] : (ch ? "fill" : "");
          rows += '<span class="htl-cell ' + cls + '">' + esc(ch) + "</span>";
        }
        rows += "</div>";
      }
      var kc = keyColors();
      var krows = ["QWERTYUIOP", "ASDFGHJKL", "ENTER,Z,X,C,V,B,N,M,DEL"];
      var kb = krows.map(function (row) {
        var keys = row.indexOf(",") >= 0 ? row.split(",") : row.split("");
        return '<div class="htl-krow">' + keys.map(function (k) {
          return '<button type="button" class="htl-key ' + (kc[k] || "") + (k.length > 1 ? " wide" : "") + '" data-htl-k="' + k + '">' + (k === "DEL" ? "⌫" : k) + "</button>";
        }).join("") + "</div>";
      }).join("");

      stage.innerHTML =
        '<div class="lab-card htl-card">' +
          '<div class="lab-hdr"><div><h3>🟩 ' + (st.isBonus ? "Bonus HOOTLE" : "Daily HOOTLE · " + tk) + '</h3><p>5-letter NY Grade 7 word challenge — green = exact spot, gold = in word.</p></div>' +
          '<button type="button" class="hs-btn sm" data-htl-bonus="1">↻ New Word</button></div>' +
          '<div class="htl-grid" aria-label="Hootle word grid">' + rows + "</div>" +
          '<p class="hs-fb ' + (st.won ? "ok" : "") + '" style="text-align:center">' + esc(st.msg) + "</p>" +
          (st.done ? '<div class="hs-cer-model"><b>' + esc(st.target) + ":</b> " + esc(st.def) + "</div>" : "") +
          '<div class="htl-kb">' + kb + "</div>" +
        "</div>";
    }

    stage.onclick = function (e) {
      if (e.target.closest("[data-htl-bonus]")) {
        bonusIdx++;
        var nxt = HOOTLE_WORDS[(seed + bonusIdx * 7) % HOOTLE_WORDS.length];
        st = { target: nxt.w, def: nxt.def, guesses: [], cur: "", done: false, won: false, msg: "Bonus Grade 7 word ready!", isBonus: true };
        draw();
        return;
      }
      var kb = e.target.closest("[data-htl-k]");
      if (kb) addLetter(kb.getAttribute("data-htl-k"));
    };
    function onKey(e) {
      if (!stage.querySelector(".htl-grid")) { document.removeEventListener("keydown", onKey); return; }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter") { e.preventDefault(); addLetter("ENTER"); }
      else if (e.key === "Backspace") { e.preventDefault(); addLetter("DEL"); }
      else if (/^[a-zA-Z]$/.test(e.key)) { e.preventDefault(); addLetter(e.key.toUpperCase()); }
    }
    document.addEventListener("keydown", onKey);
    draw();
  }

  /* GAME 2: EQUATION DASH (45s Musical-Combo Math Arcade) */
  function renderEquationDash(stage) {
    var st = { running: false, left: 45, score: 0, combo: 0, maxCombo: 0, q: null, iv: null, done: false, isPB: false };
    function genQ() {
      var kind = rnd(0, 3);
      var q, a, wrongs;
      if (kind === 0) {
        var x = rnd(-12, 12), y = rnd(-12, 12);
        q = "(" + x + ") + (" + y + ") = ?"; a = x + y;
        wrongs = [a + 2, a - 2, -a === a ? a + 4 : -a];
      } else if (kind === 1) {
        var m = rnd(-8, 8) || 3, n = rnd(-7, 7) || -4;
        q = m + " × (" + n + ") = ?"; a = m * n;
        wrongs = [-a, a + m, a - n];
      } else if (kind === 2) {
        var coef = rnd(2, 6), sol = rnd(2, 9), b = rnd(1, 9), rhs = coef * sol + b;
        q = coef + "x + " + b + " = " + rhs + "  →  x = ?"; a = sol;
        wrongs = [sol + 1, sol - 1, Math.max(1, sol + 2)];
      } else {
        var pct = [10, 20, 25, 50][rnd(0, 3)], base = [20, 40, 60, 80, 100][rnd(0, 4)];
        q = pct + "% of " + base + " = ?"; a = (pct * base) / 100;
        wrongs = [a + 5, Math.max(1, a - 5), a * 2];
      }
      var set = [a];
      wrongs.forEach(function (w) { if (set.indexOf(w) < 0) set.push(w); });
      while (set.length < 4) { var cand = a + rnd(-6, 6); if (set.indexOf(cand) < 0) set.push(cand); }
      st.q = { q: q, a: String(a), opts: shuf(set.map(String)) };
    }
    function stop() { if (st.iv) { clearInterval(st.iv); st.iv = null; } }
    function start() {
      stop();
      st = { running: true, left: 45, score: 0, combo: 0, maxCombo: 0, q: null, iv: null, done: false, isPB: false };
      genQ();
      st.iv = setInterval(function () {
        if (!document.body.contains(stage) || !stage.querySelector(".dash-card")) { stop(); return; }
        st.left--;
        var tEl = stage.querySelector(".dash-t");
        if (tEl) tEl.textContent = st.left + "s";
        if (st.left <= 0) {
          stop(); st.running = false; st.done = true;
          st.isPB = saveBest("dash", st.score);
          awardXP(Math.max(15, Math.round(st.score / 5)), Math.max(5, Math.round(st.score / 15)));
          if (st.isPB && window.HootStudyPro && window.HootStudyPro.celebrate) window.HootStudyPro.celebrate();
          draw();
        }
      }, 1000);
      draw();
    }
    function draw() {
      var best = getScores().dash || 0;
      var mult = Math.min(5, 1 + Math.floor(st.combo / 3));
      if (!st.running && !st.done) {
        stage.innerHTML = '<div class="lab-card dash-card" style="text-align:center;padding:28px 18px">' +
          '<h3>🧮 Equation Dash</h3><p>45 seconds of rapid-fire Grade 7 integers, percents &amp; equations. Chain streaks to hit <b>5× FEVER</b>!</p>' +
          (best ? '<p class="hs-mode-pill">🏆 Personal Best: ' + best + " pts</p>" : "") +
          '<div><button type="button" class="hs-btn pri" data-dash-go="1">⚡ Start 45s Dash</button></div></div>';
        return;
      }
      if (st.done) {
        stage.innerHTML = '<div class="lab-card dash-card" style="text-align:center;padding:28px 18px">' +
          '<h3>🏁 Dash Complete: ' + st.score + ' pts!</h3>' +
          '<p class="hs-verdict ok">' + (st.isPB ? "🏆 NEW PERSONAL BEST!" : "Best: " + best + " pts") + " · Max Combo: 🔥 " + st.maxCombo + "</p>" +
          '<button type="button" class="hs-btn pri" data-dash-go="1">↻ Dash Again</button></div>';
        return;
      }
      stage.innerHTML =
        '<div class="lab-card dash-card">' +
          '<div class="arc-hud"><span>⏱ <b class="dash-t">' + st.left + 's</b></span><span>⭐ <b>' + st.score + '</b></span><span class="arc-combo' + (mult >= 3 ? " hot" : "") + '">🔥 ' + st.combo + " (" + mult + "×)</span></div>" +
          '<div class="arc-prompt">' + esc(st.q.q) + "</div>" +
          '<div class="arc-grid-2">' + st.q.opts.map(function (o) {
            return '<button type="button" class="hs-choice arc-opt" data-dash-ans="' + esc(o) + '">' + esc(o) + "</button>";
          }).join("") + "</div>" +
        "</div>";
    }
    stage.onclick = function (e) {
      if (e.target.closest("[data-dash-go]")) { start(); return; }
      var b = e.target.closest("[data-dash-ans]");
      if (b && st.running) {
        if (b.getAttribute("data-dash-ans") === st.q.a) {
          st.combo++; if (st.combo > st.maxCombo) st.maxCombo = st.combo;
          var mult = Math.min(5, 1 + Math.floor(st.combo / 3));
          st.score += 10 * mult;
          chime(st.combo % PENTA.length);
        } else {
          st.combo = 0; chime(0, true);
        }
        genQ(); draw();
      }
    };
    draw();
  }

  /* GAME 3: WORD BLITZ (45s ELA Roots, Vocab & Connotation Arcade) */
  var BLITZ_BANK = [
    { q: "Root BIO means…", a: "life", w: ["far", "water", "time"] },
    { q: "Root CHRON means…", a: "time", w: ["sound", "carry", "build"] },
    { q: "Root PORT means…", a: "carry", w: ["look", "heat", "small"] },
    { q: "Root AUD means…", a: "hear", w: ["write", "earth", "life"] },
    { q: "Root SPECT means…", a: "look", w: ["break", "good", "far"] },
    { q: "Root TELE means…", a: "far", w: ["small", "self", "water"] },
    { q: "Root THERM means…", a: "heat", w: ["time", "sound", "carry"] },
    { q: "Root BENE means…", a: "good", w: ["bad", "write", "earth"] },
    { q: "Root GEO means…", a: "earth", w: ["life", "look", "heat"] },
    { q: "Root STRUCT means…", a: "build", w: ["break", "hear", "far"] },
    { q: "METICULOUS means…", a: "very careful", w: ["sloppy", "famished", "hesitant"] },
    { q: "FRUGAL means…", a: "careful with money", w: ["wasteful", "shy", "loud"] },
    { q: "RELUCTANT means…", a: "hesitant", w: ["eager", "elated", "calm"] },
    { q: "More POSITIVE connotation:", a: "determined", w: ["stubborn", "bossy", "nosy"] },
    { q: "More POSITIVE connotation:", a: "cozy", w: ["cramped", "gaudy", "reckless"] },
    { q: "More POSITIVE connotation:", a: "confident", w: ["arrogant", "cocky", "smirk"] }
  ];
  function renderWordBlitz(stage) {
    var st = { running: false, left: 45, score: 0, combo: 0, maxCombo: 0, q: null, iv: null, done: false, isPB: false };
    function pickQ() {
      var it = BLITZ_BANK[rnd(0, BLITZ_BANK.length - 1)];
      st.q = { q: it.q, a: it.a, opts: shuf([it.a].concat(it.w)) };
    }
    function stop() { if (st.iv) { clearInterval(st.iv); st.iv = null; } }
    function start() {
      stop();
      st = { running: true, left: 45, score: 0, combo: 0, maxCombo: 0, q: null, iv: null, done: false, isPB: false };
      pickQ();
      st.iv = setInterval(function () {
        if (!document.body.contains(stage) || !stage.querySelector(".blitz-card")) { stop(); return; }
        st.left--;
        var tEl = stage.querySelector(".blitz-t");
        if (tEl) tEl.textContent = st.left + "s";
        if (st.left <= 0) {
          stop(); st.running = false; st.done = true;
          st.isPB = saveBest("blitz", st.score);
          awardXP(Math.max(15, Math.round(st.score / 5)), Math.max(5, Math.round(st.score / 15)));
          if (st.isPB && window.HootStudyPro && window.HootStudyPro.celebrate) window.HootStudyPro.celebrate();
          draw();
        }
      }, 1000);
      draw();
    }
    function draw() {
      var best = getScores().blitz || 0;
      var mult = Math.min(5, 1 + Math.floor(st.combo / 3));
      if (!st.running && !st.done) {
        stage.innerHTML = '<div class="lab-card blitz-card" style="text-align:center;padding:28px 18px">' +
          '<h3>⚡ Word Blitz</h3><p>45 seconds of Greek &amp; Latin roots, vocabulary &amp; connotation speed rounds!</p>' +
          (best ? '<p class="hs-mode-pill">🏆 Personal Best: ' + best + " pts</p>" : "") +
          '<div><button type="button" class="hs-btn pri" data-blz-go="1">⚡ Start Word Blitz</button></div></div>';
        return;
      }
      if (st.done) {
        stage.innerHTML = '<div class="lab-card blitz-card" style="text-align:center;padding:28px 18px">' +
          '<h3>🏁 Word Blitz: ' + st.score + ' pts!</h3>' +
          '<p class="hs-verdict ok">' + (st.isPB ? "🏆 NEW PERSONAL BEST!" : "Best: " + best + " pts") + " · Max Combo: 🔥 " + st.maxCombo + "</p>" +
          '<button type="button" class="hs-btn pri" data-blz-go="1">↻ Play Again</button></div>';
        return;
      }
      stage.innerHTML =
        '<div class="lab-card blitz-card">' +
          '<div class="arc-hud"><span>⏱ <b class="blitz-t">' + st.left + 's</b></span><span>⭐ <b>' + st.score + '</b></span><span class="arc-combo' + (mult >= 3 ? " hot" : "") + '">🔥 ' + st.combo + " (" + mult + "×)</span></div>" +
          '<div class="arc-prompt">' + esc(st.q.q) + "</div>" +
          '<div class="arc-grid-2">' + st.q.opts.map(function (o) {
            return '<button type="button" class="hs-choice arc-opt" data-blz-ans="' + esc(o) + '">' + esc(o) + "</button>";
          }).join("") + "</div>" +
        "</div>";
    }
    stage.onclick = function (e) {
      if (e.target.closest("[data-blz-go]")) { start(); return; }
      var b = e.target.closest("[data-blz-ans]");
      if (b && st.running) {
        if (b.getAttribute("data-blz-ans") === st.q.a) {
          st.combo++; if (st.combo > st.maxCombo) st.maxCombo = st.combo;
          st.score += 10 * Math.min(5, 1 + Math.floor(st.combo / 3));
          chime(st.combo % PENTA.length);
        } else { st.combo = 0; chime(0, true); }
        pickQ(); draw();
      }
    };
    draw();
  }

  /* GAME 4: TIMELINE RUSH (NY History Higher / Lower Streak Duel) */
  var EVENTS = [
    { name: "Jamestown Founded", yr: 1607, tag: "Colonial America" },
    { name: "Mayflower Compact", yr: 1620, tag: "Self-Government" },
    { name: "New Amsterdam → New York", yr: 1664, tag: "NY History" },
    { name: "John Peter Zenger Trial", yr: 1735, tag: "Free Press" },
    { name: "The Stamp Act", yr: 1765, tag: "Road to Revolution" },
    { name: "Boston Tea Party", yr: 1773, tag: "Road to Revolution" },
    { name: "Declaration of Independence", yr: 1776, tag: "Independence" },
    { name: "Battle of Saratoga (NY)", yr: 1777, tag: "Turning Point" },
    { name: "U.S. Constitution Written", yr: 1787, tag: "Constitution" },
    { name: "Washington Inaugurated in NYC", yr: 1789, tag: "First Capital" },
    { name: "Louisiana Purchase", yr: 1803, tag: "Expansion" },
    { name: "Erie Canal Opens (NY)", yr: 1825, tag: "Empire State" },
    { name: "Seneca Falls Convention (NY)", yr: 1848, tag: "Women's Rights" },
    { name: "Fort Sumter (Civil War Starts)", yr: 1861, tag: "Civil War" },
    { name: "Emancipation Proclamation", yr: 1863, tag: "Civil War" },
    { name: "13th Amendment Ends Slavery", yr: 1865, tag: "Reconstruction" }
  ];
  function renderTimelineRush(stage) {
    var st = { streak: 0, pair: null, reveal: false, ok: false, over: false, isPB: false };
    function nextPair() {
      var s = shuf(EVENTS);
      st.pair = [s[0], s[1]];
      st.reveal = false;
    }
    function draw() {
      var best = getScores().timeline || 0;
      if (!st.pair) nextPair();
      var a = st.pair[0], b = st.pair[1];
      stage.innerHTML =
        '<div class="lab-card">' +
          '<div class="arc-hud"><span>🗺️ Timeline Rush</span><span>🔥 Streak: <b>' + st.streak + '</b></span><span>🏆 Best: <b>' + best + "</b></span></div>" +
          '<p class="hs-q" style="text-align:center">Which event happened FIRST in history?</p>' +
          '<div class="arc-grid-2">' +
            '<button type="button" class="tl-card' + (st.reveal ? (a.yr < b.yr ? " win" : " lose") : "") + '" data-tl="0"' + (st.reveal ? " disabled" : "") + '>' +
              '<span class="rl-tag">' + esc(a.tag) + '</span><b>' + esc(a.name) + '</b>' +
              '<strong class="tl-yr">' + (st.reveal ? a.yr : "????") + "</strong></button>" +
            '<button type="button" class="tl-card' + (st.reveal ? (b.yr < a.yr ? " win" : " lose") : "") + '" data-tl="1"' + (st.reveal ? " disabled" : "") + '>' +
              '<span class="rl-tag">' + esc(b.tag) + '</span><b>' + esc(b.name) + '</b>' +
              '<strong class="tl-yr">' + (st.reveal ? b.yr : "????") + "</strong></button>" +
          "</div>" +
          (st.reveal
            ? '<div style="text-align:center;margin-top:12px"><p class="hs-fb ' + (st.ok ? "ok" : "no") + '">' +
                (st.ok ? "✓ Exact! Streak " + st.streak + "! (+10 XP)" : "Not quite! Streak ended at " + st.streak + (st.isPB ? " — 🏆 New Best!" : "")) + '</p>' +
                '<button type="button" class="hs-btn pri" data-tl-next="1">' + (st.ok ? "Next Duel ▶" : "↻ Start New Streak") + "</button></div>"
            : "") +
        "</div>";
    }
    stage.onclick = function (e) {
      if (e.target.closest("[data-tl-next]")) {
        if (!st.ok) st.streak = 0;
        nextPair(); draw(); return;
      }
      var btn = e.target.closest("[data-tl]");
      if (btn && !st.reveal) {
        var idx = +btn.getAttribute("data-tl");
        var picked = st.pair[idx], other = st.pair[1 - idx];
        st.reveal = true;
        st.ok = picked.yr < other.yr;
        if (st.ok) {
          st.streak++;
          st.isPB = saveBest("timeline", st.streak);
          awardXP(10, 4);
          chime(st.streak % PENTA.length);
        } else {
          st.isPB = saveBest("timeline", st.streak);
          chime(0, true);
        }
        draw();
      }
    };
    draw();
  }

  function openArcade(body, startGame) {
    if (!body) return;
    var tab = startGame || "hootle";
    var TABS = [
      { id: "hootle", lbl: "🟩 Daily HOOTLE" },
      { id: "dash", lbl: "🧮 Equation Dash" },
      { id: "blitz", lbl: "⚡ Word Blitz" },
      { id: "timeline", lbl: "🗺️ Timeline Rush" }
    ];
    function mount() {
      body.innerHTML =
        '<div class="hs lab-wrap">' +
          '<div class="fc-decks" role="tablist" aria-label="Brain Arcade games">' +
            TABS.map(function (t) {
              return '<button type="button" class="fc-pill' + (t.id === tab ? " on" : "") + '" data-arc-tab="' + t.id + '">' + t.lbl + "</button>";
            }).join("") +
          '</div><div id="arc-stage"></div></div>';
      var st = body.querySelector("#arc-stage");
      if (tab === "hootle") renderHootle(st);
      else if (tab === "dash") renderEquationDash(st);
      else if (tab === "blitz") renderWordBlitz(st);
      else renderTimelineRush(st);
    }
    body.onclick = function (e) {
      var tb = e.target.closest("[data-arc-tab]");
      if (tb) { tab = tb.getAttribute("data-arc-tab"); mount(); }
    };
    mount();
  }

  /* Global soundbar click handler (works on Today Hero & Vibe Studio) */
  document.addEventListener("click", function (e) {
    if (!e.target || !e.target.closest) return;
    var sb = e.target.closest("[data-lofi-snd]");
    if (sb && !sb.closest("#ll-obody")) playSound(sb.getAttribute("data-lofi-snd"));
  });

  window.HootTeenArcade = {
    getVibe: getVibe,
    getScores: getScores,
    rankFor: rankFor,
    avatarObj: avatarObj,
    awardXP: awardXP,
    syncFx: syncFx,
    stopFx: stopFx,
    playSound: playSound,
    stopSound: stopSound,
    activeSound: function () { return snd.active; },
    openVibeStudio: openVibeStudio,
    openArcade: openArcade
  };
})();
