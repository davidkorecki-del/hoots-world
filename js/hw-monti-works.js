/* Hoot's World — Bubbly Physical Montessori Shelf Works (Wave 3 Redesign)
   Replaces tiny icon/text shelf works with big, glossy, illustrated physical
   objects (well over 64px), flying/pouring/blooming/shaking motion, Hoot's
   real recorded voice clips (zero TTS), soft fail, and one obvious glowing
   next action on every step and win screen. */
(function () {
  "use strict";

  var COLORS = {
    red:    { main: "#ef4747", light: "#ff8787", dark: "#b82020", lid: "#e03131", name: "red" },
    blue:   { main: "#2d9cdb", light: "#7cc8f8", dark: "#176799", lid: "#1c7ed6", name: "blue" },
    yellow: { main: "#f7c218", light: "#ffe678", dark: "#c28c00", lid: "#f0b400", name: "yellow" },
    green:  { main: "#40c057", light: "#8ce99a", dark: "#237a32", lid: "#2f9e44", name: "green" },
    orange: { main: "#ff8c2b", light: "#ffc078", dark: "#c95b00", lid: "#f76707", name: "orange" },
    purple: { main: "#9c6ade", light: "#d0bfff", dark: "#6741b8", lid: "#7950f2", name: "purple" },
    pink:   { main: "#f06595", light: "#faa2c1", dark: "#b52b5e", lid: "#e64980", name: "pink" }
  };

  /* ---------- Sound & Hoot Voice helpers (no TTS ever) ---------- */
  var localAC = null;
  function getAC() {
    if (typeof window.__hwAudioCtx === "function") return window.__hwAudioCtx();
    try {
      if (!localAC) localAC = new (window.AudioContext || window.webkitAudioContext)();
      if (localAC && localAC.state === "suspended") localAC.resume();
    } catch (e) { localAC = null; }
    return localAC;
  }
  function tone(freq, dur, type, vol, delay) {
    var ac = getAC(); if (!ac) return;
    try {
      var t = ac.currentTime + (delay || 0);
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = type || "sine"; o.frequency.value = freq || 520;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(vol || 0.11, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.16));
      o.connect(g); g.connect(ac.destination);
      o.start(t); o.stop(t + (dur || 0.16) + 0.03);
    } catch (e) {}
  }
  function sfxPop(step) { var b = 460 + (step || 1) * 42; tone(b, 0.11, "sine", 0.12, 0); tone(b * 1.25, 0.12, "triangle", 0.09, 0.045); }
  function sfxPick() { tone(560, 0.09, "triangle", 0.1, 0); tone(740, 0.09, "sine", 0.08, 0.04); }
  function sfxSoftBoing() { tone(280, 0.14, "triangle", 0.1, 0); tone(220, 0.16, "sine", 0.08, 0.07); }
  function sfxChime() { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.24, "triangle", 0.11, i * 0.08); }); }
  function sayClips(clips) {
    if (!clips || !clips.length) return;
    if (typeof window.__hwSay === "function") { window.__hwSay(clips); }
  }
  function closeOverlayIfOpen(card) {
    var x = document.getElementById("ll-oclose");
    if (x && card && card.closest && card.closest("#ll-overlay")) x.click();
  }
  function confettiBurst(host) {
    if (!host) return;
    var cols = ["#ef4747", "#ffd93b", "#2d9cdb", "#40c057", "#f06595", "#9c6ade"];
    for (var i = 0; i < 24; i++) {
      var p = document.createElement("span");
      p.style.cssText = "position:absolute;z-index:20;pointer-events:none;width:12px;height:14px;border-radius:4px;left:" + (15 + Math.random() * 70) + "%;top:18%;background:" + cols[i % cols.length] + ";";
      host.appendChild(p);
      var dx = (Math.random() - 0.5) * 220, dy = 140 + Math.random() * 180, rot = (Math.random() - 0.5) * 420;
      if (p.animate) {
        p.animate([
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          { transform: "translate(" + dx + "px," + dy + "px) rotate(" + rot + "deg)", opacity: 0 }
        ], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.3,1)" });
      }
      (function (el) { setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 1500); })(p);
    }
  }

  /* ---------- Physical parabolic flight animator ---------- */
  function sparkAt(x, y) {
    var s = document.createElement("div");
    s.className = "mw-spark";
    s.style.left = x + "px"; s.style.top = y + "px";
    document.body.appendChild(s);
    setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 480);
  }
  function flyTo(fromEl, toEl, html, sizePx, onLand) {
    var done = false;
    function finish() { if (done) return; done = true; if (onLand) onLand(); }
    if (!fromEl || !toEl) { finish(); return; }
    var r1 = fromEl.getBoundingClientRect(), r2 = toEl.getBoundingClientRect();
    if (!r1.width || !r2.width) { finish(); return; }
    var sz = sizePx || 72;
    var x0 = r1.left + r1.width / 2 - sz / 2, y0 = r1.top + r1.height / 2 - sz / 2;
    var x1 = r2.left + r2.width / 2 - sz / 2, y1 = r2.top + r2.height / 2 - sz / 2;
    var f = document.createElement("div");
    f.className = "mw-flyer";
    f.style.width = sz + "px"; f.style.height = sz + "px";
    f.style.left = x0 + "px"; f.style.top = y0 + "px";
    f.innerHTML = html;
    document.body.appendChild(f);
    var dx = x1 - x0, dy = y1 - y0, midX = dx * 0.5, midY = Math.min(0, dy) - 70;
    if (f.animate) {
      var anim = f.animate([
        { transform: "translate(0px,0px) scale(1.12)", offset: 0 },
        { transform: "translate(" + midX + "px," + midY + "px) scale(1.18)", offset: 0.52 },
        { transform: "translate(" + dx + "px," + dy + "px) scale(0.72)", offset: 1 }
      ], { duration: 380, easing: "cubic-bezier(.28,.84,.42,1)" });
      anim.onfinish = function () {
        if (f.parentNode) f.parentNode.removeChild(f);
        sparkAt(r2.left + r2.width / 2, r2.top + r2.height / 2);
        finish();
      };
      setTimeout(function () { if (f.parentNode) f.parentNode.removeChild(f); finish(); }, 460);
    } else {
      if (f.parentNode) f.parentNode.removeChild(f);
      sparkAt(r2.left + r2.width / 2, r2.top + r2.height / 2);
      finish();
    }
  }

  /* ---------- Crisp Bubbly SVG Illustrations ---------- */
  function hootMiniSvg() {
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' +
      '<ellipse cx="50" cy="58" rx="34" ry="34" fill="#a06a3b" stroke="#17263b" stroke-width="4"/>' +
      '<ellipse cx="50" cy="68" rx="22" ry="20" fill="#fdeed3"/>' +
      '<path d="M24 26 L36 16 L40 32 Z M76 26 L64 16 L60 32 Z" fill="#8a5a33" stroke="#17263b" stroke-width="3.5" stroke-linejoin="round"/>' +
      '<circle cx="38" cy="46" r="12" fill="#fff" stroke="#17263b" stroke-width="3"/>' +
      '<circle cx="62" cy="46" r="12" fill="#fff" stroke="#17263b" stroke-width="3"/>' +
      '<circle cx="38" cy="46" r="6" fill="#17263b"/><circle cx="62" cy="46" r="6" fill="#17263b"/>' +
      '<circle cx="40" cy="44" r="2.2" fill="#fff"/><circle cx="64" cy="44" r="2.2" fill="#fff"/>' +
      '<polygon points="50,50 44,58 56,58" fill="#ff9f1c" stroke="#17263b" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<circle cx="24" cy="56" r="5" fill="#ffb59d" opacity=".9"/><circle cx="76" cy="56" r="5" fill="#ffb59d" opacity=".9"/>' +
      '</svg>';
  }

  function beadSvg(colorKey) {
    var c = COLORS[colorKey] || COLORS.red;
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' +
      '<circle cx="50" cy="50" r="46" fill="' + c.main + '"/>' +
      '<path d="M12 58 A40 40 0 0 0 88 58 A46 46 0 0 1 12 58 Z" fill="' + c.dark + '" opacity=".38"/>' +
      '<ellipse cx="42" cy="34" rx="22" ry="14" fill="' + c.light + '" opacity=".72" transform="rotate(-20 42 34)"/>' +
      '<ellipse cx="32" cy="27" rx="10" ry="6" fill="#ffffff" opacity=".88" transform="rotate(-25 32 27)"/>' +
      '<circle cx="70" cy="70" r="5" fill="#ffffff" opacity=".32"/>' +
      '</svg>';
  }

  function jarSvg(colorKey, count) {
    var c = COLORS[colorKey] || COLORS.red;
    var beads = "";
    var spots = [
      { cx: 43, cy: 112 },
      { cx: 77, cy: 112 },
      { cx: 60, cy: 86 }
    ];
    for (var i = 0; i < Math.min(count, 3); i++) {
      var sp = spots[i];
      beads += '<g>' +
        '<circle cx="' + sp.cx + '" cy="' + sp.cy + '" r="17" fill="' + c.main + '" stroke="#17263b" stroke-width="3.2"/>' +
        '<ellipse cx="' + (sp.cx - 5) + '" cy="' + (sp.cy - 6) + '" rx="6" ry="3.6" fill="#ffffff" opacity=".82" transform="rotate(-24 ' + (sp.cx - 5) + ' ' + (sp.cy - 6) + ')"/>' +
        '</g>';
    }
    return '<svg viewBox="0 0 120 150" aria-hidden="true">' +
      /* Soft shadow under jar */
      '<ellipse cx="60" cy="142" rx="40" ry="6" fill="#17263b" opacity=".14"/>' +
      /* Glass jar body */
      '<path d="M32 34 L88 34 Q92 44 102 54 Q108 62 108 76 L108 122 Q108 138 92 138 L28 138 Q12 138 12 122 L12 76 Q12 62 18 54 Q28 44 32 34 Z" fill="#e8f7ff" stroke="#17263b" stroke-width="4.5" stroke-linejoin="round"/>' +
      /* Subtle tinted bottom glow matching jar colour */
      '<path d="M18 96 L102 96 L102 122 Q102 133 90 133 L30 133 Q18 133 18 122 Z" fill="' + c.light + '" opacity=".35"/>' +
      /* Visible glossy beads filling up inside the jar */
      beads +
      /* Curved glass reflections on top of beads */
      '<path d="M22 68 L22 118 Q22 126 28 128" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity=".82"/>' +
      '<path d="M98 72 L98 94" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".6"/>' +
      /* Colour ribbon around the jar neck */
      '<rect x="28" y="34" width="64" height="12" rx="6" fill="' + c.main + '" stroke="#17263b" stroke-width="3.5"/>' +
      /* Threaded colourful screw-top lid */
      '<rect x="24" y="12" width="72" height="22" rx="9" fill="' + c.lid + '" stroke="#17263b" stroke-width="4.5"/>' +
      '<line x1="34" y1="20" x2="86" y2="20" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".6"/>' +
      '</svg>';
  }

  function pinkCubeSvg(sizePx) {
    return '<svg viewBox="0 0 100 100" width="' + sizePx + '" height="' + sizePx + '" aria-hidden="true">' +
      '<rect x="6" y="14" width="88" height="80" rx="14" fill="#ef84aa" stroke="#17263b" stroke-width="4.5"/>' +
      '<path d="M10 26 Q10 14 22 14 L78 14 Q90 14 90 26 L90 36 L10 36 Z" fill="#ffb8d0"/>' +
      '<rect x="16" y="20" width="28" height="9" rx="4.5" fill="#ffffff" opacity=".75"/>' +
      '<rect x="10" y="76" width="80" height="14" rx="8" fill="#c95680" opacity=".45"/>' +
      '</svg>';
  }

  function pitcherSvg() {
    return '<svg viewBox="0 0 120 120" aria-hidden="true">' +
      /* Handle */
      '<path d="M84 42 Q110 42 110 66 Q110 88 82 88" fill="none" stroke="#17263b" stroke-width="11" stroke-linecap="round"/>' +
      '<path d="M84 42 Q108 42 108 66 Q108 88 82 88" fill="none" stroke="#74c0fc" stroke-width="5" stroke-linecap="round"/>' +
      /* Spout & rounded body */
      '<path d="M12 32 L34 28 L86 28 Q94 46 92 86 Q90 106 60 106 Q30 106 28 86 Q26 52 12 32 Z" fill="#4dabf7" stroke="#17263b" stroke-width="4.5" stroke-linejoin="round"/>' +
      '<path d="M36 42 Q36 86 44 96" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity=".75"/>' +
      '<ellipse cx="58" cy="29" rx="26" ry="7" fill="#d0ebff" stroke="#17263b" stroke-width="3.5"/>' +
      '<circle cx="52" cy="70" r="8" fill="#ffe066" stroke="#17263b" stroke-width="2.5"/>' +
      '</svg>';
  }

  function pomSvg(colorKey) {
    var c = COLORS[colorKey] || COLORS.red;
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' +
      '<g fill="' + c.main + '" stroke="#17263b" stroke-width="3.5">' +
        '<circle cx="50" cy="20" r="16"/><circle cx="72" cy="28" r="16"/><circle cx="80" cy="50" r="16"/>' +
        '<circle cx="72" cy="72" r="16"/><circle cx="50" cy="80" r="16"/><circle cx="28" cy="72" r="16"/>' +
        '<circle cx="20" cy="50" r="16"/><circle cx="28" cy="28" r="16"/>' +
      '</g>' +
      '<circle cx="50" cy="50" r="32" fill="' + c.main + '"/>' +
      '<circle cx="42" cy="38" r="14" fill="' + c.light + '" opacity=".75"/>' +
      '<circle cx="36" cy="32" r="6" fill="#ffffff" opacity=".82"/>' +
      '</svg>';
  }

  function bowlSvg(insideColors) {
    var poms = "";
    var spots = [
      { x: 52, y: 42 }, { x: 94, y: 42 }, { x: 136, y: 42 },
      { x: 72, y: 26 }, { x: 114, y: 26 }, { x: 94, y: 14 }
    ];
    for (var i = 0; i < insideColors.length && i < spots.length; i++) {
      var c = COLORS[insideColors[i]] || COLORS.red;
      var s = spots[i];
      poms += '<g transform="translate(' + (s.x - 20) + ',' + (s.y - 20) + ')">' +
        '<circle cx="20" cy="20" r="18" fill="' + c.main + '" stroke="#17263b" stroke-width="3"/>' +
        '<circle cx="15" cy="14" r="6" fill="' + c.light + '" opacity=".85"/>' +
        '</g>';
    }
    return '<svg viewBox="0 0 190 112" aria-hidden="true">' +
      '<ellipse cx="95" cy="103" rx="60" ry="7" fill="#17263b" opacity=".16"/>' +
      /* Inside rim back */
      '<ellipse cx="95" cy="46" rx="80" ry="18" fill="#c98c44" stroke="#17263b" stroke-width="4.5"/>' +
      /* Fluffy pom-poms piling visibly inside the bowl */
      poms +
      /* Front curved wooden/ceramic bowl body */
      '<path d="M15 46 Q20 100 95 100 Q170 100 175 46 Q135 60 95 60 Q55 60 15 46 Z" fill="#ff9f43" stroke="#17263b" stroke-width="4.5" stroke-linejoin="round"/>' +
      '<path d="M36 66 Q58 86 95 88" fill="none" stroke="#ffffff" stroke-width="5.5" stroke-linecap="round" opacity=".65"/>' +
      '</svg>';
  }

  function flowerPotSvg(bloomKind, isBloomed) {
    var top = "";
    if (!isBloomed) {
      /* Cute thirsty little sprout */
      top = '<path d="M50 72 Q50 56 50 48" stroke="#2f9e44" stroke-width="5" stroke-linecap="round" fill="none"/>' +
        '<ellipse cx="38" cy="52" rx="12" ry="7" fill="#51cf66" stroke="#17263b" stroke-width="3" transform="rotate(-26 38 52)"/>' +
        '<ellipse cx="62" cy="50" rx="12" ry="7" fill="#51cf66" stroke="#17263b" stroke-width="3" transform="rotate(24 62 50)"/>';
    } else {
      var pColors = {
        daisy:     { p: "#ffffff", c: "#ffd43b" },
        blossom:   { p: "#ff8fab", c: "#ffe066" },
        sunflower: { p: "#ffd43b", c: "#7f4f24" },
        tulip:     { p: "#ff595e", c: "#ffd43b" },
        hibiscus:  { p: "#b197fc", c: "#ffd43b" }
      }[bloomKind] || { p: "#ffd43b", c: "#ff8c2b" };
      top = '<path d="M50 74 Q48 56 50 38" stroke="#2f9e44" stroke-width="6" stroke-linecap="round" fill="none"/>' +
        '<ellipse cx="36" cy="58" rx="13" ry="7" fill="#51cf66" stroke="#17263b" stroke-width="3" transform="rotate(-28 36 58)"/>' +
        '<ellipse cx="64" cy="56" rx="13" ry="7" fill="#51cf66" stroke="#17263b" stroke-width="3" transform="rotate(28 64 56)"/>' +
        '<g fill="' + pColors.p + '" stroke="#17263b" stroke-width="3">' +
          '<circle cx="50" cy="14" r="11"/><circle cx="67" cy="23" r="11"/><circle cx="63" cy="40" r="11"/>' +
          '<circle cx="37" cy="40" r="11"/><circle cx="33" cy="23" r="11"/>' +
        '</g>' +
        '<circle cx="50" cy="28" r="11" fill="' + pColors.c + '" stroke="#17263b" stroke-width="3"/>' +
        '<circle cx="47" cy="25" r="3" fill="#ffffff" opacity=".75"/>';
    }
    return '<svg viewBox="0 0 100 136" aria-hidden="true">' +
      top +
      /* Soil mound */
      '<ellipse cx="50" cy="76" rx="34" ry="10" fill="#6b4423" stroke="#17263b" stroke-width="3.5"/>' +
      /* Terracotta pot body */
      '<path d="M22 82 L78 82 L70 128 Q50 133 30 128 Z" fill="#e07a5f" stroke="#17263b" stroke-width="4" stroke-linejoin="round"/>' +
      /* Pot rim */
      '<rect x="14" y="72" width="72" height="14" rx="7" fill="#f29479" stroke="#17263b" stroke-width="4"/>' +
      '<line x1="28" y1="92" x2="32" y2="118" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity=".55"/>' +
      '</svg>';
  }

  function shapeBlockSvg(shapeKey, isHole) {
    var map = {
      circle:   { c: COLORS.red,    path: '<circle cx="50" cy="50" r="38"' },
      square:   { c: COLORS.blue,   path: '<rect x="14" y="14" width="72" height="72" rx="14"' },
      triangle: { c: COLORS.green,  path: '<polygon points="50,10 90,86 10,86"' },
      star:     { c: COLORS.yellow, path: '<polygon points="50,7 62,36 93,38 69,58 77,90 50,73 23,90 31,58 7,38 38,36"' },
      heart:    { c: COLORS.pink,   path: '<path d="M50 88 C12 60 8 30 28 18 C40 11 48 20 50 30 C52 20 60 11 72 18 C92 30 88 60 50 88 Z"' }
    };
    var info = map[shapeKey] || map.circle;
    if (isHole) {
      return '<svg viewBox="0 0 100 100" aria-hidden="true">' +
        info.path + ' fill="#5c3911" stroke="#ffe5a3" stroke-width="4" stroke-linejoin="round"/>' +
        '</svg>';
    }
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' +
      info.path + ' fill="' + info.c.main + '" stroke="#17263b" stroke-width="5" stroke-linejoin="round"/>' +
      '<ellipse cx="42" cy="34" rx="14" ry="8" fill="#ffffff" opacity=".5" transform="rotate(-20 42 34)"/>' +
      '</svg>';
  }

  function pegSvg() {
    return '<svg viewBox="0 0 40 34" width="32" height="28" aria-hidden="true">' +
      '<rect x="13" y="2" width="14" height="30" rx="5" fill="#e8b878" stroke="#17263b" stroke-width="3.2"/>' +
      '<line x1="13" y1="16" x2="27" y2="16" stroke="#17263b" stroke-width="3"/>' +
      '</svg>';
  }

  function garmentSvg(kind) {
    var svgs = {
      "T-shirt": '<path d="M26 18 L40 14 Q50 24 60 14 L74 18 L90 36 L76 48 L70 42 L70 86 L30 86 L30 42 L24 48 L10 36 Z" fill="#ef4747" stroke="#17263b" stroke-width="4.5" stroke-linejoin="round"/><circle cx="50" cy="52" r="10" fill="#ffd93b"/>',
      "socks":   '<path d="M22 14 L42 14 L42 54 Q42 74 22 76 Q10 76 12 64 Q14 54 22 54 Z M58 18 L78 18 L78 58 Q78 78 58 80 Q46 80 48 68 Q50 58 58 58 Z" fill="#2d9cdb" stroke="#17263b" stroke-width="4.5" stroke-linejoin="round"/><line x1="22" y1="28" x2="42" y2="28" stroke="#ffd93b" stroke-width="6"/><line x1="58" y1="32" x2="78" y2="32" stroke="#ffd93b" stroke-width="6"/>',
      "dress":   '<path d="M36 14 Q50 24 64 14 L72 28 L64 42 L84 86 L16 86 L36 42 L28 28 Z" fill="#f06595" stroke="#17263b" stroke-width="4.5" stroke-linejoin="round"/><circle cx="50" cy="64" r="9" fill="#ffe066"/>',
      "trousers":'<path d="M24 14 L76 14 L80 86 L56 86 L50 48 L44 86 L20 86 Z" fill="#4aa8dd" stroke="#17263b" stroke-width="4.5" stroke-linejoin="round"/><line x1="24" y1="26" x2="76" y2="26" stroke="#17263b" stroke-width="3.5"/>',
      "hat":     '<path d="M18 58 Q20 22 50 22 Q80 22 82 58 Z" fill="#f7c218" stroke="#17263b" stroke-width="4.5"/><path d="M14 58 L92 58 Q94 70 76 70 L20 68 Q12 68 14 58 Z" fill="#ff8c2b" stroke="#17263b" stroke-width="4.5"/>'
    };
    return '<svg viewBox="0 0 100 100" aria-hidden="true">' + (svgs[kind] || svgs["T-shirt"]) + '</svg>';
  }

  function shakerCylinderSvg(matched, shaking) {
    var bodyFill = matched ? "#ffd43b" : "#e5b87b";
    var capFill = matched ? "#40c057" : "#4dabf7";
    var waves = shaking || matched
      ? '<path d="M8 38 Q2 50 8 62 M92 38 Q98 50 92 62" fill="none" stroke="#ff6b4a" stroke-width="4.5" stroke-linecap="round"/>'
      : "";
    var sym = matched
      ? '<text x="50" y="62" text-anchor="middle" font-size="28" fill="#17263b">🎵</text>'
      : '<circle cx="50" cy="54" r="8" fill="#fff" opacity=".6"/>';
    return '<svg viewBox="0 0 100 110" aria-hidden="true">' +
      waves +
      '<rect x="24" y="20" width="52" height="76" rx="14" fill="' + bodyFill + '" stroke="#17263b" stroke-width="4.5"/>' +
      '<rect x="22" y="12" width="56" height="18" rx="9" fill="' + capFill + '" stroke="#17263b" stroke-width="4.5"/>' +
      '<rect x="22" y="84" width="56" height="16" rx="8" fill="' + capFill + '" stroke="#17263b" stroke-width="4.5"/>' +
      '<line x1="34" y1="36" x2="34" y2="76" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity=".6"/>' +
      sym +
      '</svg>';
  }

  function makeHootBar(initialMsg, onTapHoot) {
    var bar = document.createElement("div");
    bar.className = "mw-hootbar";
    bar.innerHTML = '<button type="button" class="mw-hoot-btn" aria-label="Tap Hoot to hear again">' + hootMiniSvg() + '</button><p class="mw-msg" aria-live="polite"></p>';
    var btn = bar.querySelector(".mw-hoot-btn");
    var msg = bar.querySelector(".mw-msg");
    msg.textContent = initialMsg || "";
    btn.addEventListener("click", function () {
      sfxPick();
      btn.classList.remove("mw-cheer"); void btn.offsetWidth; btn.classList.add("mw-cheer");
      if (onTapHoot) onTapHoot();
    });
    return {
      el: bar,
      say: function (t) { msg.textContent = t; },
      cheer: function () { btn.classList.remove("mw-cheer"); void btn.offsetWidth; btn.classList.add("mw-cheer"); }
    };
  }

  function rebuildWorkCard(cardId) {
    var card = document.getElementById(cardId);
    if (!card) return null;
    card.classList.add("mw-upgraded");
    var title = card.querySelector("h3");
    var how = card.querySelector(".work-how");
    var home = card.querySelector(".work-home");
    var stage = document.createElement("div");
    stage.className = "mw-stage";
    card.innerHTML = "";
    if (title) card.appendChild(title);
    if (how) card.appendChild(how);
    card.appendChild(stage);
    if (home) card.appendChild(home);
    return { card: card, stage: stage };
  }

  /* ==================== 1. COLOUR BEAD SORTING (EXEMPLAR) ==================== */
  function initBeadSorting() {
    var w = rebuildWorkCard("monti-sort"); if (!w) return;
    var ORDER_DEF = ["red", "blue", "yellow", "yellow", "red", "blue", "blue", "yellow", "red"];
    var picked = null, sorted = 0, finished = false, counts = { red: 0, blue: 0, yellow: 0 }, total = 9;
    var hoot = makeHootBar("Tap a big glossy bead, then tap its matching jar!", function () {
      if (picked) sayClips(["name-color-" + picked.getAttribute("data-bead")]);
      else sayClips(["hoot-look-closely"]);
    });
    var tray = document.createElement("div");
    tray.className = "mw-bead-tray mw-tray-invite"; tray.id = "monti-beads";
    tray.setAttribute("aria-label", "Tray of beads to sort");

    var jarRow = document.createElement("div");
    jarRow.className = "mw-jar-row";
    var jars = {};
    ["red", "blue", "yellow"].forEach(function (c) {
      var jb = document.createElement("button");
      jb.type = "button"; jb.className = "mw-jar monti-jar";
      jb.setAttribute("data-jar", c);
      jb.setAttribute("aria-label", COLORS[c].name + " jar");
      jarRow.appendChild(jb);
      jars[c] = jb;
    });

    var winBar = document.createElement("div");
    winBar.className = "mw-winbar"; winBar.hidden = true;
    winBar.innerHTML = '<button type="button" class="mw-cta mw-cta-again mw-glow">🔄 Sort again</button><button type="button" class="mw-cta-soft">✅ All done</button>';

    w.stage.appendChild(hoot.el);
    w.stage.appendChild(tray);
    w.stage.appendChild(jarRow);
    w.stage.appendChild(winBar);

    function renderJar(c) {
      var n = counts[c];
      jars[c].innerHTML = jarSvg(c, n) + '<span class="mw-jar-badge">' + n + " / 3" + (n >= 3 ? " ★" : "") + "</span>";
      jars[c].classList.toggle("mw-jar-full", n >= 3);
    }
    function updateCue() {
      tray.classList.toggle("mw-tray-invite", !picked && !finished);
      ["red", "blue", "yellow"].forEach(function (c) {
        jars[c].classList.toggle("mw-jar-ready", !!picked && !finished && counts[c] < 3);
      });
    }
    function shuffled() {
      var o = ["red", "red", "red", "blue", "blue", "blue", "yellow", "yellow", "yellow"];
      for (var i = o.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = o[i]; o[i] = o[j]; o[j] = t; }
      return o;
    }
    function fill(order) {
      tray.innerHTML = ""; picked = null; sorted = 0; finished = false; total = order.length;
      counts = { red: 0, blue: 0, yellow: 0 };
      ["red", "blue", "yellow"].forEach(renderJar);
      winBar.hidden = true;
      tray.style.display = "";
      hoot.say("Tap a big glossy bead, then tap its matching jar!");
      order.forEach(function (c) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "mw-bead bead";
        b.setAttribute("data-bead", c);
        b.setAttribute("aria-label", COLORS[c].name + " bead");
        b.innerHTML = beadSvg(c);
        b.addEventListener("click", function () {
          if (finished || b.classList.contains("done")) return;
          if (picked) picked.classList.remove("picked");
          picked = b; b.classList.add("picked");
          sfxPick();
          hoot.say("You picked a " + COLORS[c].name.toUpperCase() + " bead! Tap the " + COLORS[c].name + " jar!");
          sayClips(["name-color-" + c]);
          updateCue();
        });
        tray.appendChild(b);
      });
      updateCue();
    }

    ["red", "blue", "yellow"].forEach(function (jc) {
      jars[jc].addEventListener("click", function () {
        if (finished) return;
        if (!picked) {
          sfxSoftBoing();
          tray.classList.remove("mw-nudge"); void tray.offsetWidth; tray.classList.add("mw-nudge");
          hoot.say("Tap a glossy bead first!");
          return;
        }
        var c = picked.getAttribute("data-bead");
        if (jc === c) {
          var src = picked;
          picked = null;
          src.classList.remove("picked"); src.classList.add("done");
          updateCue();
          flyTo(src, jars[jc], beadSvg(c), 74, function () {
            counts[c]++; sorted++;
            renderJar(c);
            jars[jc].classList.remove("mw-jar-bounce"); void jars[jc].offsetWidth; jars[jc].classList.add("mw-jar-bounce");
            sfxPop(sorted);
            hoot.cheer();
            if (sorted >= total) {
              finished = true;
              tray.style.display = "none";
              hoot.say("🎉 Every jar is full! Great sorting!");
              sayClips(["hoot-great-job"]);
              sfxChime(); confettiBurst(w.card);
              winBar.hidden = false;
              updateCue();
            } else {
              hoot.say("Plop! " + sorted + " of " + total + " in! Pick another bead!");
              updateCue();
            }
          });
        } else {
          sfxSoftBoing();
          jars[jc].classList.remove("mw-wobble"); void jars[jc].offsetWidth; jars[jc].classList.add("mw-wobble");
          hoot.say("Oops! Find the " + COLORS[c].name.toUpperCase() + " jar for your " + COLORS[c].name + " bead!");
          sayClips(["name-color-" + c]);
        }
      });
    });

    winBar.querySelector(".mw-cta-again").addEventListener("click", function () { sfxPick(); fill(shuffled()); });
    winBar.querySelector(".mw-cta-soft").addEventListener("click", function () { sfxPick(); fill(shuffled()); closeOverlayIfOpen(w.card); });
    fill(ORDER_DEF);
  }

  /* ==================== 2. THE PINK TOWER ==================== */
  function initPinkTower() {
    var w = rebuildWorkCard("monti-tower"); if (!w) return;
    var hoot = makeHootBar("Tap the BIGGEST pink cube first!", function () { sayClips(["ask-which-big"]); });
    var grid = document.createElement("div"); grid.className = "mw-tower-stage";
    var tray = document.createElement("div"); tray.className = "mw-cube-tray"; tray.id = "monti-cubes";
    var mat = document.createElement("div"); mat.className = "mw-tower-mat"; mat.id = "monti-tower-visual";
    grid.appendChild(tray); grid.appendChild(mat);
    var winBar = document.createElement("div"); winBar.className = "mw-winbar"; winBar.hidden = true;
    winBar.innerHTML = '<button type="button" class="mw-cta mw-cta-again mw-glow">🔄 Build again</button>';
    w.stage.appendChild(hoot.el); w.stage.appendChild(grid); w.stage.appendChild(winBar);

    var expect = 5, placed = 0;
    function renderMatEmpty() { mat.innerHTML = '<span class="mw-tower-empty">Tower mat</span>'; }
    function reset() {
      expect = 5; placed = 0; tray.innerHTML = ""; winBar.hidden = true; renderMatEmpty();
      hoot.say("Tap the BIGGEST pink cube first!");
      [3, 5, 1, 4, 2].forEach(function (rank) {
        var sz = 36 + rank * 12; /* 48..96px visual inside >=72px touch target */
        var b = document.createElement("button");
        b.type = "button"; b.className = "mw-cube-btn cube";
        b.setAttribute("data-rank", rank);
        b.setAttribute("aria-label", "Pink cube size " + rank + " of 5");
        b.innerHTML = pinkCubeSvg(sz);
        b.addEventListener("click", function () {
          if (placed >= 5 || b.classList.contains("placed")) return;
          if (rank === expect) {
            b.classList.add("placed");
            var empty = mat.querySelector(".mw-tower-empty"); if (empty) empty.remove();
            flyTo(b, mat, pinkCubeSvg(sz), sz, function () {
              var tier = document.createElement("span");
              tier.className = "mw-tower-tier";
              tier.innerHTML = pinkCubeSvg(32 + rank * 13);
              mat.appendChild(tier);
              expect--; placed++;
              sfxPop(placed + 1); hoot.cheer();
              sayClips(placed >= 5 ? ["name-number-5", "hoot-great-job"] : ["name-number-" + placed]);
              if (placed >= 5) {
                hoot.say("🎉 Your Pink Tower stands tall! Amazing work!");
                sfxChime(); confettiBurst(w.card); winBar.hidden = false;
              } else {
                hoot.say("Nice! " + placed + " of 5 stacked. Tap the next BIGGEST cube!");
              }
            });
          } else {
            sfxSoftBoing();
            b.classList.remove("mw-wobble"); void b.offsetWidth; b.classList.add("mw-wobble");
            sayClips(["hoot-try-again", "ask-which-big"]);
            hoot.say("Look for a BIGGER pink cube!");
          }
        });
        tray.appendChild(b);
      });
    }
    winBar.querySelector("button").addEventListener("click", function () { sfxPick(); reset(); });
    reset();
  }

  /* ==================== 3. POURING PRACTICE ==================== */
  function initPouring() {
    var w = rebuildWorkCard("monti-pour"); if (!w) return;
    var hoot = makeHootBar("Tap the blue pitcher to pour! Stop right at the red line!", function () { sayClips(["ask-stop-at-line"]); });
    var scene = document.createElement("div"); scene.className = "mw-pour-scene";
    scene.innerHTML =
      '<button type="button" class="mw-pitcher-btn mw-glow" id="pour-pitcher" aria-label="Pour water from pitcher">' + pitcherSvg() + '</button>' +
      '<div class="mw-glass-wrap"><div class="mw-water-stream" id="mw-stream"></div>' +
      '<div class="mw-pour-glass"><div class="mw-pour-fill" id="pour-fill"></div><div class="mw-pour-line"></div><span class="mw-pour-line-tag">STOP</span></div></div>';
    var controls = document.createElement("div"); controls.className = "mw-pour-controls";
    controls.innerHTML =
      '<button type="button" class="mw-cta mw-cta-again mw-glow" id="pour-btn">💧 Pour</button>' +
      '<button type="button" class="mw-cta mw-cta-done" id="pour-done" hidden>✅ Stop! All Done!</button>' +
      '<button type="button" class="mw-cta-soft" id="pour-reset">🔄 Empty</button>';
    w.stage.appendChild(hoot.el); w.stage.appendChild(scene); w.stage.appendChild(controls);

    var pitcher = scene.querySelector("#pour-pitcher");
    var stream = scene.querySelector("#mw-stream");
    var fill = scene.querySelector("#pour-fill");
    var pourBtn = controls.querySelector("#pour-btn");
    var doneBtn = controls.querySelector("#pour-done");
    var resetBtn = controls.querySelector("#pour-reset");
    var level = 0, done = false;

    function updateGlow() {
      var atLine = level >= 58 && level <= 86;
      var spilled = level > 86;
      pourBtn.hidden = done || spilled;
      doneBtn.hidden = done || !atLine;
      pitcher.classList.toggle("mw-glow", !done && !atLine && !spilled);
      pourBtn.classList.toggle("mw-glow", !done && !atLine && !spilled);
      doneBtn.classList.toggle("mw-glow", !done && atLine);
      resetBtn.classList.toggle("mw-glow", done || spilled);
      resetBtn.textContent = (done || spilled) ? "🔄 Pour again!" : "🔄 Empty";
    }
    function doPour() {
      if (done || level >= 100) return;
      pitcher.classList.add("pouring"); stream.classList.add("on");
      setTimeout(function () { pitcher.classList.remove("pouring"); stream.classList.remove("on"); }, 340);
      level = Math.min(100, level + 13 + Math.round(Math.random() * 8));
      fill.style.height = level + "%";
      tone(320 + level * 3.2, 0.18, "sine", 0.11);
      if (level > 86) {
        sfxSoftBoing();
        hoot.say("Splash! A tiny spill — tap Pour again and stop at the red line!");
        sayClips(["hoot-try-again"]);
      } else if (level >= 58) {
        hoot.cheer();
        hoot.say("Right at the line! Tap the GREEN button — All Done!");
        sayClips(["ask-stop-at-line"]);
      } else {
        hoot.say("Glug, glug… watch the water climb to the red line!");
      }
      updateGlow();
    }
    pitcher.addEventListener("click", doPour);
    pourBtn.addEventListener("click", doPour);
    doneBtn.addEventListener("click", function () {
      if (done || level < 58 || level > 86) return;
      done = true;
      hoot.cheer();
      hoot.say("🎉 Right at the line — zero spills! Beautiful pouring!");
      sayClips(["hoot-great-job"]);
      sfxChime(); confettiBurst(w.card);
      updateGlow();
    });
    resetBtn.addEventListener("click", function () {
      level = 0; done = false; fill.style.height = "0%";
      sfxPick();
      hoot.say("Fresh glass! Tap the blue pitcher to pour!");
      updateGlow();
    });
    updateGlow();
  }

  /* ==================== 4. SPOON TRANSFER — POM-POMS ==================== */
  function initSpoonPomPoms() {
    var w = rebuildWorkCard("monti-spoon"); if (!w) return;
    var POM_COLS = ["red", "yellow", "blue", "green", "orange", "purple"];
    var hoot = makeHootBar("Tap a fluffy pom-pom, then tap the big bowl!", function () { sayClips(["hoot-look-closely"]); });
    var stage = document.createElement("div"); stage.className = "mw-pom-stage";
    var tray = document.createElement("div"); tray.className = "mw-pom-tray"; tray.id = "pom-tray";
    var bowl = document.createElement("button"); bowl.type = "button"; bowl.className = "mw-bowl-btn pom-bowl"; bowl.id = "pom-bowl";
    stage.appendChild(tray); stage.appendChild(bowl);
    var winBar = document.createElement("div"); winBar.className = "mw-winbar"; winBar.hidden = true;
    winBar.innerHTML = '<button type="button" class="mw-cta mw-cta-again mw-glow">🔄 Play again</button>';
    w.stage.appendChild(hoot.el); w.stage.appendChild(stage); w.stage.appendChild(winBar);

    var holding = null, inside = [];
    function renderBowl() {
      bowl.innerHTML = bowlSvg(inside) + '<span class="mw-jar-badge">' + inside.length + " / " + POM_COLS.length + (inside.length >= POM_COLS.length ? " ★" : "") + "</span>";
      bowl.classList.toggle("mw-glow", !!holding);
    }
    function reset() {
      tray.innerHTML = ""; holding = null; inside = []; winBar.hidden = true; tray.style.display = "";
      hoot.say("Tap a fluffy pom-pom, then tap the big bowl!");
      POM_COLS.forEach(function (c) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "mw-pom pom";
        b.setAttribute("data-col", c);
        b.setAttribute("aria-label", COLORS[c].name + " pom-pom");
        b.innerHTML = pomSvg(c);
        b.addEventListener("click", function () {
          if (b.classList.contains("done")) return;
          if (holding) holding.classList.remove("picked");
          holding = b; b.classList.add("picked");
          sfxPick();
          hoot.say("It's on your spoon! Now tap the big bowl!");
          sayClips(["name-color-" + c]);
          renderBowl();
        });
        tray.appendChild(b);
      });
      renderBowl();
    }
    bowl.addEventListener("click", function () {
      if (!holding) {
        sfxSoftBoing();
        tray.classList.remove("mw-nudge"); void tray.offsetWidth; tray.classList.add("mw-nudge");
        hoot.say("Pick up a fluffy pom-pom from the tray first!");
        return;
      }
      var src = holding, col = src.getAttribute("data-col");
      holding = null;
      src.classList.remove("picked"); src.classList.add("done");
      renderBowl();
      flyTo(src, bowl, pomSvg(col), 74, function () {
        inside.push(col);
        renderBowl();
        bowl.classList.remove("mw-pop"); void bowl.offsetWidth; bowl.classList.add("mw-pop");
        sfxPop(inside.length); hoot.cheer();
        if (inside.length >= POM_COLS.length) {
          tray.style.display = "none";
          hoot.say("🎉 All 6 fluffy pom-poms are in the bowl!");
          sayClips(["name-number-6", "hoot-great-job"]);
          sfxChime(); confettiBurst(w.card); winBar.hidden = false;
        } else {
          hoot.say("Plop! " + inside.length + " in the bowl! Pick the next one!");
          sayClips(["name-number-" + inside.length]);
        }
      });
    });
    winBar.querySelector("button").addEventListener("click", function () { sfxPick(); reset(); });
    reset();
  }

  /* ==================== 5. WATER THE FLOWERS ==================== */
  function initWaterFlowers() {
    var w = rebuildWorkCard("monti-flowers"); if (!w) return;
    var KINDS = ["daisy", "blossom", "sunflower", "tulip", "hibiscus"];
    var hoot = makeHootBar("Tap each little sprout to water it and watch it bloom!", function () { sayClips(["hoot-look-closely"]); });
    var row = document.createElement("div"); row.className = "mw-flower-row"; row.id = "flower-row";
    var winBar = document.createElement("div"); winBar.className = "mw-winbar"; winBar.hidden = true;
    winBar.innerHTML = '<button type="button" class="mw-cta mw-cta-again mw-glow">🔄 Water again</button>';
    w.stage.appendChild(hoot.el); w.stage.appendChild(row); w.stage.appendChild(winBar);

    var bloomed = 0;
    function reset() {
      row.innerHTML = ""; bloomed = 0; winBar.hidden = true;
      hoot.say("Tap each little sprout to water it and watch it bloom!");
      KINDS.forEach(function (kind, i) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "mw-pot-btn flower";
        b.setAttribute("aria-label", "Water flowerpot " + (i + 1));
        b.innerHTML = flowerPotSvg(kind, false);
        b.addEventListener("click", function () {
          if (b.classList.contains("bloomed")) { sfxPick(); b.classList.remove("mw-pop"); void b.offsetWidth; b.classList.add("mw-pop"); return; }
          b.classList.add("bloomed");
          var drop = document.createElement("span"); drop.className = "mw-splash-drops"; drop.textContent = "💧💧";
          b.appendChild(drop);
          setTimeout(function () { if (drop.parentNode) drop.parentNode.removeChild(drop); }, 420);
          b.innerHTML = flowerPotSvg(kind, true);
          b.classList.add("mw-pop");
          bloomed++; sfxPop(bloomed + 1); hoot.cheer();
          if (bloomed >= KINDS.length) {
            hoot.say("🎉 All 5 flowers bloomed! What a sunny garden!");
            sayClips(["name-number-5", "hoot-great-job"]);
            sfxChime(); confettiBurst(w.card); winBar.hidden = false;
          } else {
            hoot.say("Bloom! " + bloomed + " of 5 watered! Tap another sprout!");
            sayClips(["name-number-" + bloomed]);
          }
        });
        row.appendChild(b);
      });
    }
    winBar.querySelector("button").addEventListener("click", function () { sfxPick(); reset(); });
    reset();
  }

  /* ==================== 6. SHAPE SORTER ==================== */
  function initShapeSorter() {
    var w = rebuildWorkCard("monti-shapes"); if (!w) return;
    var PIECES = ["star", "circle", "heart", "square", "triangle"];
    var HOLES = ["circle", "triangle", "star", "square", "heart"];
    var hoot = makeHootBar("Tap a chunky shape, then tap the matching hole!", function () {
      if (picked) sayClips(["name-shape-" + picked.getAttribute("data-shape")]);
      else sayClips(["hoot-look-closely"]);
    });
    var tray = document.createElement("div"); tray.className = "mw-shape-tray"; tray.id = "shape-tray";
    var box = document.createElement("div"); box.className = "mw-shape-box"; box.id = "shape-holes";
    var winBar = document.createElement("div"); winBar.className = "mw-winbar"; winBar.hidden = true;
    winBar.innerHTML = '<button type="button" class="mw-cta mw-cta-again mw-glow">🔄 Sort again</button>';
    w.stage.appendChild(hoot.el); w.stage.appendChild(tray); w.stage.appendChild(box); w.stage.appendChild(winBar);

    var picked = null, done = 0;
    function updateCue() {
      Array.prototype.forEach.call(box.children, function (h) {
        h.classList.toggle("mw-glow", !!picked && !h.classList.contains("filled"));
      });
    }
    function reset() {
      tray.innerHTML = ""; box.innerHTML = ""; picked = null; done = 0; winBar.hidden = true; tray.style.display = "";
      hoot.say("Tap a chunky shape, then tap the matching hole!");
      PIECES.forEach(function (sh) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "mw-shape-piece sorter-piece";
        b.setAttribute("data-shape", sh); b.setAttribute("aria-label", sh + " shape");
        b.innerHTML = shapeBlockSvg(sh, false);
        b.addEventListener("click", function () {
          if (b.classList.contains("done")) return;
          if (picked) picked.classList.remove("picked");
          picked = b; b.classList.add("picked");
          sfxPick();
          hoot.say("You picked the " + sh.toUpperCase() + "! Tap the " + sh + " hole!");
          sayClips(["name-shape-" + sh]);
          updateCue();
        });
        tray.appendChild(b);
      });
      HOLES.forEach(function (sh) {
        var h = document.createElement("button");
        h.type = "button"; h.className = "mw-shape-hole sorter-hole";
        h.setAttribute("data-hole", sh); h.setAttribute("aria-label", sh + " hole");
        h.innerHTML = shapeBlockSvg(sh, true);
        h.addEventListener("click", function () {
          if (h.classList.contains("filled")) return;
          if (!picked) {
            sfxSoftBoing();
            tray.classList.remove("mw-nudge"); void tray.offsetWidth; tray.classList.add("mw-nudge");
            hoot.say("Pick up a shape from the tray first!");
            return;
          }
          var pShape = picked.getAttribute("data-shape");
          if (pShape === sh) {
            var src = picked; picked = null;
            src.classList.remove("picked"); src.classList.add("done");
            updateCue();
            flyTo(src, h, shapeBlockSvg(sh, false), 76, function () {
              h.classList.add("filled", "mw-pop");
              h.innerHTML = shapeBlockSvg(sh, false);
              done++; sfxPop(done + 1); hoot.cheer();
              if (done >= PIECES.length) {
                tray.style.display = "none";
                hoot.say("🎉 Every shape clicked right in! Super sorting!");
                sayClips(["name-shape-" + sh, "hoot-great-job"]);
                sfxChime(); confettiBurst(w.card); winBar.hidden = false;
              } else {
                hoot.say("Click! The " + sh + " fits! Pick another shape!");
                sayClips(["name-shape-" + sh]);
              }
            });
          } else {
            sfxSoftBoing();
            h.classList.remove("mw-wobble"); void h.offsetWidth; h.classList.add("mw-wobble");
            hoot.say("Oops! Find the " + pShape.toUpperCase() + " hole!");
            sayClips(["hoot-try-again", "name-shape-" + pShape]);
          }
        });
        box.appendChild(h);
      });
      updateCue();
    }
    winBar.querySelector("button").addEventListener("click", function () { sfxPick(); reset(); });
    reset();
  }

  /* ==================== 7. HANG THE WASHING ==================== */
  function initWashing() {
    var w = rebuildWorkCard("monti-washing"); if (!w) return;
    var ITEMS = ["T-shirt", "socks", "dress", "trousers", "hat"];
    var hoot = makeHootBar("Tap wet clothes in the basket, then tap a clothespin!", function () { sayClips(["hoot-look-closely"]); });
    var sky = document.createElement("div"); sky.className = "mw-wash-sky";
    sky.innerHTML = '<div class="mw-wash-rope" aria-hidden="true"></div><div class="mw-wash-line" id="wash-line"></div>';
    var line = sky.querySelector("#wash-line");
    var basket = document.createElement("div"); basket.className = "mw-wash-basket"; basket.id = "wash-basket";
    var winBar = document.createElement("div"); winBar.className = "mw-winbar"; winBar.hidden = true;
    winBar.innerHTML = '<button type="button" class="mw-cta mw-cta-again mw-glow">🔄 Wash again</button>';
    w.stage.appendChild(hoot.el); w.stage.appendChild(sky); w.stage.appendChild(basket); w.stage.appendChild(winBar);

    var picked = null, hung = 0;
    function updateCue() {
      Array.prototype.forEach.call(line.children, function (sl) {
        sl.classList.toggle("mw-glow", !!picked && !sl.classList.contains("filled"));
      });
    }
    function reset() {
      line.innerHTML = ""; basket.innerHTML = ""; picked = null; hung = 0; winBar.hidden = true; basket.style.display = "";
      hoot.say("Tap wet clothes in the basket, then tap a clothespin!");
      for (var i = 0; i < ITEMS.length; i++) {
        var sl = document.createElement("button");
        sl.type = "button"; sl.className = "mw-wash-slot wash-slot";
        sl.setAttribute("aria-label", "Clothespin " + (i + 1));
        sl.innerHTML = pegSvg();
        (function (slot) {
          slot.addEventListener("click", function () {
            if (slot.classList.contains("filled")) return;
            if (!picked) {
              sfxSoftBoing();
              basket.classList.remove("mw-nudge"); void basket.offsetWidth; basket.classList.add("mw-nudge");
              hoot.say("Pick up a wet garment from the basket first!");
              return;
            }
            var src = picked, kind = src.getAttribute("data-item");
            picked = null; src.classList.remove("picked"); src.classList.add("done");
            updateCue();
            flyTo(src, slot, garmentSvg(kind), 76, function () {
              slot.classList.add("filled", "mw-pop");
              slot.innerHTML = pegSvg() + '<div class="mw-garment-hang" style="width:68px;height:68px">' + garmentSvg(kind) + "</div>";
              hung++; sfxPop(hung + 1); hoot.cheer();
              if (hung >= ITEMS.length) {
                basket.style.display = "none";
                hoot.say("🎉 All 5 clothes are drying in the breeze!");
                sayClips(["name-number-5", "hoot-great-job"]);
                sfxChime(); confettiBurst(w.card); winBar.hidden = false;
              } else {
                hoot.say("Hung up! " + hung + " of 5 on the line! Pick another!");
                sayClips(["name-number-" + hung]);
              }
            });
          });
        })(sl);
        line.appendChild(sl);
      }
      ITEMS.forEach(function (kind) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "mw-wash-item wash-item";
        b.setAttribute("data-item", kind); b.setAttribute("aria-label", "Wet " + kind);
        b.innerHTML = garmentSvg(kind);
        b.addEventListener("click", function () {
          if (b.classList.contains("done")) return;
          if (picked) picked.classList.remove("picked");
          picked = b; b.classList.add("picked");
          sfxPick();
          hoot.say("Got the " + kind + "! Tap any glowing clothespin!");
          updateCue();
        });
        basket.appendChild(b);
      });
      updateCue();
    }
    winBar.querySelector("button").addEventListener("click", function () { sfxPick(); reset(); });
    reset();
  }

  /* ==================== 8. SOUND CYLINDERS ==================== */
  function initSoundCylinders() {
    var w = rebuildWorkCard("monti-sound"); if (!w) return;
    var FREQS = { low: 250, mid: 440, high: 700 };
    var LABELS = { low: "low", mid: "middle", high: "high" };
    var hoot = makeHootBar("Tap a wooden shaker to listen, then find its matching sound!", function () { sayClips(["hoot-look-closely"]); });
    var grid = document.createElement("div"); grid.className = "mw-sound-grid"; grid.id = "sound-grid";
    var winBar = document.createElement("div"); winBar.className = "mw-winbar"; winBar.hidden = true;
    winBar.innerHTML = '<button type="button" class="mw-cta mw-cta-again mw-glow">🔄 Mix &amp; play again</button>';
    w.stage.appendChild(hoot.el); w.stage.appendChild(grid); w.stage.appendChild(winBar);

    var first = null, pairs = 0, busy = false;
    function shakeSound(f) { tone(f, 0.11, "triangle", 0.13, 0); tone(f, 0.11, "triangle", 0.12, 0.12); tone(f, 0.14, "sine", 0.12, 0.24); }
    function reset() {
      grid.innerHTML = ""; first = null; pairs = 0; busy = false; winBar.hidden = true;
      hoot.say("Tap a wooden shaker to listen, then find its matching sound!");
      var sounds = ["mid", "low", "high", "low", "high", "mid"];
      for (var i = sounds.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = sounds[i]; sounds[i] = sounds[j]; sounds[j] = t; }
      sounds.forEach(function (snd, idx) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "mw-cyl-btn sound-cyl";
        b.setAttribute("data-sound", snd); b.setAttribute("aria-label", "Sound shaker " + (idx + 1));
        b.innerHTML = shakerCylinderSvg(false, false);
        b.addEventListener("click", function () {
          if (busy) return;
          shakeSound(FREQS[snd]);
          b.classList.remove("shaking"); void b.offsetWidth; b.classList.add("shaking");
          if (b.classList.contains("matched")) { hoot.say("🎵 That pair is already matched!"); return; }
          if (!first) {
            first = b; b.classList.add("picked");
            b.innerHTML = shakerCylinderSvg(false, true);
            hoot.say("Ooh, a " + LABELS[snd] + " sound! Tap another shaker to find its twin!");
            return;
          }
          if (b === first) { hoot.say("Tap a DIFFERENT shaker to find its twin!"); return; }
          if (b.getAttribute("data-sound") === first.getAttribute("data-sound")) {
            var a = first; first = null;
            a.classList.remove("picked"); a.classList.add("matched", "mw-pop");
            b.classList.add("matched", "mw-pop");
            a.innerHTML = shakerCylinderSvg(true, false);
            b.innerHTML = shakerCylinderSvg(true, false);
            pairs++; sfxPop(pairs + 2); hoot.cheer();
            if (pairs >= 3) {
              hoot.say("🎉 You matched all 3 sound pairs with your ears!");
              sayClips(["hoot-great-job"]);
              sfxChime(); confettiBurst(w.card); winBar.hidden = false;
            } else {
              hoot.say("⭐ Match! " + pairs + " of 3 pairs found!");
              sayClips(["hoot-star"]);
            }
          } else {
            var a2 = first; first = null; busy = true;
            b.classList.remove("mw-wobble"); void b.offsetWidth; b.classList.add("mw-wobble");
            hoot.say("Different sounds! Shake again and listen closely!");
            sayClips(["hoot-try-again"]);
            setTimeout(function () {
              a2.classList.remove("picked"); a2.innerHTML = shakerCylinderSvg(false, false);
              busy = false;
            }, 460);
          }
        });
        grid.appendChild(b);
      });
    }
    winBar.querySelector("button").addEventListener("click", function () { sfxPick(); reset(); });
    reset();
  }

  /* ==================== 9. THREAD THE PATTERN ==================== */
  function initThreadPattern() {
    var w = rebuildWorkCard("monti-thread"); if (!w) return;
    var PATTERNS = [
      ["red", "blue", "red", "blue", "red", "blue", "red", "blue"],
      ["red", "red", "blue", "red", "red", "blue", "red", "blue"],
      ["red", "blue", "yellow", "red", "blue", "yellow", "red", "blue"]
    ];
    var seq = PATTERNS[0].slice(), GIVEN = 4, idx = GIVEN, patIdx = 0;
    var hoot = makeHootBar("Look at the glossy beads on the string! Which colour comes next?", function () {
      sayClips(seq.slice(0, idx).map(function (c) { return "name-color-" + c; }).concat(["ask-what-comes-next"]));
    });
    var board = document.createElement("div"); board.className = "mw-lace-board"; board.id = "thread-string";
    var choices = document.createElement("div"); choices.className = "mw-thread-choices"; choices.id = "thread-choices";
    var winBar = document.createElement("div"); winBar.className = "mw-winbar"; winBar.hidden = true;
    winBar.innerHTML = '<button type="button" class="mw-cta mw-cta-again mw-glow">🔄 New necklace</button>';
    w.stage.appendChild(hoot.el); w.stage.appendChild(board); w.stage.appendChild(choices); w.stage.appendChild(winBar);

    function renderString() {
      board.innerHTML = '<div class="mw-lace-cord" aria-hidden="true"></div>';
      for (var i = 0; i < seq.length; i++) {
        var sl = document.createElement("span");
        if (i < idx) {
          sl.className = "mw-lace-slot";
          sl.innerHTML = beadSvg(seq[i]);
        } else {
          sl.className = "mw-lace-slot " + (i === idx ? "next-slot" : "empty");
        }
        board.appendChild(sl);
      }
    }
    ["red", "blue", "yellow"].forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "mw-thread-choice thread-choice";
      b.setAttribute("data-bead", c); b.setAttribute("aria-label", COLORS[c].name + " bead");
      b.innerHTML = beadSvg(c);
      b.addEventListener("click", function () {
        if (idx >= seq.length) return;
        if (c === seq[idx]) {
          var targetSlot = board.querySelector(".next-slot") || board;
          flyTo(b, targetSlot, beadSvg(c), 68, function () {
            idx++; renderString();
            sfxPop(idx - GIVEN + 1); hoot.cheer();
            if (idx >= seq.length) {
              hoot.say("🎉 Necklace finished! Every bead in the pattern!");
              sayClips(["name-color-" + c, "hoot-great-job"]);
              sfxChime(); confettiBurst(w.card); winBar.hidden = false;
            } else {
              hoot.say("Pop! What colour comes next?");
              sayClips(["name-color-" + c, "ask-what-comes-next"]);
            }
          });
        } else {
          sfxSoftBoing();
          b.classList.remove("mw-wobble"); void b.offsetWidth; b.classList.add("mw-wobble");
          hoot.say("Look at the beads on the string — try another colour!");
          sayClips(["hoot-try-again"].concat(seq.slice(Math.max(0, idx - 4), idx).map(function (col) { return "name-color-" + col; })).concat(["ask-what-comes-next"]));
        }
      });
      choices.appendChild(b);
    });
    winBar.querySelector("button").addEventListener("click", function () {
      sfxPick();
      patIdx = (patIdx + 1) % PATTERNS.length;
      seq = PATTERNS[patIdx].slice(); idx = GIVEN; winBar.hidden = true;
      renderString();
      hoot.say("New necklace! Which colour comes next?");
      sayClips(seq.slice(0, GIVEN).map(function (c) { return "name-color-" + c; }).concat(["ask-what-comes-next"]));
    });
    renderString();
    document.addEventListener("hw-work-open", function (e) {
      if (e.detail === "monti-thread") {
        sayClips(seq.slice(0, idx).map(function (c) { return "name-color-" + c; }).concat(["ask-what-comes-next"]));
      }
    });
  }

  function bootAll() {
    initBeadSorting();
    initPinkTower();
    initPouring();
    initSpoonPomPoms();
    initWaterFlowers();
    initShapeSorter();
    initWashing();
    initSoundCylinders();
    initThreadPattern();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootAll);
  else bootAll();
})();
