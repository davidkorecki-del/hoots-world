/* Hoot Study Visuals & Workspace (Grade 7 NY Tutor upgrade for kidc)
   Provides:
   1. Dynamic problem-matched SVG visual diagrams for Math 7, Science 7, and Social Studies 7
   2. Built-in iPad / Apple Pencil collapsible Scratchpad canvas (grid, colors, eraser, undo, clear)
   3. Context-aware NY Grade 7 Formula & Reference Drawer (Math, ELA, Science, Social Studies)
   Pure client-side SVG + Canvas2D, works cleanly in both Light and Focus Dark study themes. */
(function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function sgn(n) { return n < 0 ? "−" + Math.abs(n) : String(n); }

  /* =========================================================================
     1. DYNAMIC MATH VISUALS (BUILT LIVE FROM EACH PROBLEM'S EXACT NUMBERS!)
     ========================================================================= */
  function svgWrap(vb, aria, body, caption) {
    return '<figure class="hs-vis" role="img" aria-label="' + esc(aria) + '">' +
      '<svg viewBox="' + vb + '" class="hs-svg" aria-hidden="true">' + body + "</svg>" +
      (caption ? '<figcaption class="hs-vis-cap">' + esc(caption) + "</figcaption>" : "") +
      "</figure>";
  }

  function renderMathVis(v, reveal) {
    if (!v || !v.kind) return "";

    if (v.kind === "numberline") {
      var a = v.a, b = v.b, ans = v.ans, delta = ans - a;
      var lo = Math.min(0, a, reveal ? ans : a - 3) - 2;
      var hi = Math.max(0, a, reveal ? ans : a + 3) + 2;
      if (hi - lo < 12) { var pad = Math.ceil((12 - (hi - lo)) / 2); lo -= pad; hi += pad; }
      if (hi - lo > 30) { lo = Math.min(0, a, ans) - 2; hi = Math.max(0, a, ans) + 2; }
      var span = hi - lo, x0 = 28, x1 = 412, y = 78;
      var px = function (n) { return +(x0 + ((n - lo) / span) * (x1 - x0)).toFixed(1); };
      var step = span > 20 ? 5 : span > 12 ? 2 : 1;
      var ticks = "";
      for (var t = Math.ceil(lo / step) * step; t <= hi; t += step) {
        var tx = px(t), isZ = t === 0;
        ticks += '<line x1="' + tx + '" y1="' + (y - (isZ ? 10 : 6)) + '" x2="' + tx + '" y2="' + (y + (isZ ? 10 : 6)) + '" stroke="' + (isZ ? "#0B5E43" : "currentColor") + '" stroke-width="' + (isZ ? 2.6 : 1.4) + '" opacity="' + (isZ ? 1 : 0.55) + '"/>';
        ticks += '<text x="' + tx + '" y="' + (y + 24) + '" text-anchor="middle" font-size="11" font-weight="' + (isZ ? 800 : 600) + '" fill="' + (isZ ? "#0B5E43" : "currentColor") + '">' + sgn(t) + "</text>";
      }
      var ax = px(a), ansX = px(ans);
      var jump = "";
      if (reveal) {
        var midX = +((ax + ansX) / 2).toFixed(1);
        var arcH = Math.min(48, Math.max(24, Math.abs(ansX - ax) * 0.28));
        jump = '<path d="M ' + ax + " " + (y - 8) + " Q " + midX + " " + (y - 8 - arcH) + " " + ansX + " " + (y - 10) + '" fill="none" stroke="#E0457B" stroke-width="3" stroke-dasharray="5 3"/>' +
          '<circle cx="' + ansX + '" cy="' + y + '" r="7" fill="#16A34A" stroke="#fff" stroke-width="2"/>' +
          '<text x="' + midX + '" y="' + (y - arcH - 6) + '" text-anchor="middle" font-size="12" font-weight="800" fill="#E0457B">' + (delta >= 0 ? "+" + delta + " (right)" : "−" + Math.abs(delta) + " (left)") + "</text>" +
          '<text x="' + ansX + '" y="' + (y - 15) + '" text-anchor="middle" font-size="12" font-weight="800" fill="#16A34A">' + sgn(ans) + "</text>";
      } else {
        var dir = delta >= 0 ? 1 : -1;
        jump = '<text x="' + ax + '" y="' + (y - 16) + '" text-anchor="middle" font-size="12" font-weight="800" fill="#2563EB">Start: ' + sgn(a) + "</text>" +
          '<text x="' + (dir > 0 ? 350 : 90) + '" y="24" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor" opacity="0.7">' + (dir > 0 ? "move right →" : "← move left") + "</text>";
      }
      var body = '<line x1="16" y1="' + y + '" x2="424" y2="' + y + '" stroke="currentColor" stroke-width="2.2"/>' +
        '<polygon points="428,' + y + ' 418,' + (y - 5) + ' 418,' + (y + 5) + '" fill="currentColor"/>' +
        '<polygon points="12,' + y + ' 22,' + (y - 5) + ' 22,' + (y + 5) + '" fill="currentColor"/>' +
        ticks + jump +
        '<circle cx="' + ax + '" cy="' + y + '" r="7" fill="#2563EB" stroke="#fff" stroke-width="2"/>';
      return svgWrap("0 0 440 116", "Number line starting at " + a, body, "Number line · negative left, positive right");
    }

    if (v.kind === "balance") {
      var bodyB =
        '<line x1="220" y1="98" x2="220" y2="122" stroke="currentColor" stroke-width="4" opacity="0.45"/>' +
        '<polygon points="196,126 244,126 220,100" fill="#0B5E43"/>' +
        '<line x1="76" y1="88" x2="364" y2="88" stroke="#0B5E43" stroke-width="5" stroke-linecap="round"/>' +
        '<rect x="44" y="42" width="144" height="44" rx="12" fill="rgba(37,99,235,.14)" stroke="#2563EB" stroke-width="2.5"/>' +
        '<text x="116" y="70" text-anchor="middle" font-size="19" font-weight="800" fill="#2563EB">' + esc(v.left) + "</text>" +
        '<circle cx="220" cy="64" r="16" fill="#0B5E43"/>' +
        '<text x="220" y="70" text-anchor="middle" font-size="18" font-weight="800" fill="#fff">' + esc(v.op || "=") + "</text>" +
        '<rect x="252" y="42" width="144" height="44" rx="12" fill="rgba(224,69,123,.14)" stroke="#E0457B" stroke-width="2.5"/>' +
        '<text x="324" y="70" text-anchor="middle" font-size="19" font-weight="800" fill="#E0457B">' + esc(v.right) + "</text>" +
        (reveal && v.solved ? '<text x="220" y="24" text-anchor="middle" font-size="14" font-weight="800" fill="#16A34A">Balanced: ' + esc(v.solved) + "</text>" : '<text x="220" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor" opacity="0.7">Whatever you do to one side, do to the other</text>');
      return svgWrap("0 0 440 136", "Equation balance scale: " + v.left + " " + (v.op || "=") + " " + v.right, bodyB);
    }

    if (v.kind === "circle") {
      var isA = v.area, useD = v.useD, rVal = v.r;
      var cx = 145, cy = 74, R = 52;
      var fillC = isA ? "rgba(58,86,212,.16)" : "rgba(11,138,95,.05)";
      var strokeC = isA ? "#3A56D4" : "#0B8A5F";
      var lineEl = useD
        ? '<line x1="' + (cx - R) + '" y1="' + cy + '" x2="' + (cx + R) + '" y2="' + cy + '" stroke="#E0457B" stroke-width="3" stroke-dasharray="6 4"/>' +
          '<text x="' + cx + '" y="' + (cy - 10) + '" text-anchor="middle" font-size="13" font-weight="800" fill="#E0457B">d = ' + (2 * rVal) + " cm</text>"
        : '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + R) + '" y2="' + cy + '" stroke="#E0457B" stroke-width="3"/>' +
          '<text x="' + (cx + R / 2) + '" y="' + (cy - 10) + '" text-anchor="middle" font-size="13" font-weight="800" fill="#E0457B">r = ' + rVal + " cm</text>";
      var bodyC =
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="' + fillC + '" stroke="' + strokeC + '" stroke-width="' + (isA ? 3 : 5) + '"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="#E0457B"/>' + lineEl +
        '<text x="236" y="54" font-size="14" font-weight="800" fill="' + strokeC + '">' + (isA ? "Find: AREA (inside)" : "Find: CIRCUMFERENCE (around)") + "</text>" +
        '<text x="236" y="78" font-size="13" font-weight="700" fill="currentColor" opacity="0.82">' + (useD ? "Given diameter = " + (2 * rVal) + " cm" : "Given radius = " + rVal + " cm") + "</text>" +
        '<text x="236" y="100" font-size="12" font-weight="600" fill="currentColor" opacity="0.68">' + (isA ? "Formula: A = π × r²" : "Formula: C = 2 × π × r") + "  (π ≈ 3.14)</text>";
      return svgWrap("0 0 440 146", "Circle geometry diagram", bodyC);
    }

    if (v.kind === "angle") {
      var aDeg = v.a, kind = v.sub, bodyA = "";
      if (kind === "comp") {
        var rad = (aDeg * Math.PI) / 180;
        var ox = 155, oy = 118, L = 86;
        var mx = +(ox + Math.cos(rad) * L).toFixed(1), my = +(oy - Math.sin(rad) * L).toFixed(1);
        bodyA =
          '<path d="M ' + (ox + 16) + " " + oy + " L " + (ox + 16) + " " + (oy - 16) + " L " + ox + " " + (oy - 16) + '" fill="none" stroke="#0B5E43" stroke-width="2"/>' +
          '<line x1="' + ox + '" y1="' + oy + '" x2="' + (ox + L + 10) + '" y2="' + oy + '" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
          '<line x1="' + ox + '" y1="' + oy + '" x2="' + ox + '" y2="' + (oy - L - 6) + '" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
          '<line x1="' + ox + '" y1="' + oy + '" x2="' + mx + '" y2="' + my + '" stroke="#E0457B" stroke-width="3" stroke-linecap="round"/>' +
          '<text x="' + (ox + 44) + '" y="' + (oy - 12) + '" font-size="14" font-weight="800" fill="#2563EB">' + aDeg + '°</text>' +
          '<text x="' + (ox + 14) + '" y="' + (oy - 54) + '" font-size="14" font-weight="800" fill="#E0457B">' + (reveal ? (90 - aDeg) + "°" : "?°") + "</text>" +
          '<text x="278" y="64" font-size="14" font-weight="800" fill="#0B5E43">Complementary</text>' +
          '<text x="278" y="86" font-size="13" font-weight="600" fill="currentColor" opacity="0.78">Right angle = 90° total</text>';
      } else if (kind === "supp") {
        var ox2 = 175, oy2 = 108, L2 = 88, rad2 = (aDeg * Math.PI) / 180;
        var mx2 = +(ox2 + Math.cos(rad2) * L2).toFixed(1), my2 = +(oy2 - Math.sin(rad2) * L2).toFixed(1);
        bodyA =
          '<line x1="60" y1="' + oy2 + '" x2="290" y2="' + oy2 + '" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
          '<line x1="' + ox2 + '" y1="' + oy2 + '" x2="' + mx2 + '" y2="' + my2 + '" stroke="#E0457B" stroke-width="3" stroke-linecap="round"/>' +
          '<path d="M ' + (ox2 - 28) + " " + oy2 + " A 28 28 0 0 1 " + (ox2 + 28) + " " + oy2 + '" fill="rgba(37,99,235,.12)" stroke="#2563EB" stroke-width="2"/>' +
          '<text x="' + (ox2 + 38) + '" y="' + (oy2 - 14) + '" font-size="14" font-weight="800" fill="#2563EB">' + aDeg + "°</text>" +
          '<text x="' + (ox2 - 54) + '" y="' + (oy2 - 14) + '" font-size="14" font-weight="800" fill="#E0457B">' + (reveal ? (180 - aDeg) + "°" : "?°") + "</text>" +
          '<text x="312" y="64" font-size="14" font-weight="800" fill="#0B5E43">Supplementary</text>' +
          '<text x="312" y="86" font-size="13" font-weight="600" fill="currentColor" opacity="0.78">Straight line = 180°</text>';
      } else {
        bodyA =
          '<line x1="78" y1="30" x2="250" y2="118" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
          '<line x1="78" y1="118" x2="250" y2="30" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>' +
          '<text x="112" y="79" text-anchor="middle" font-size="15" font-weight="800" fill="#2563EB">' + aDeg + "°</text>" +
          '<text x="216" y="79" text-anchor="middle" font-size="15" font-weight="800" fill="#E0457B">' + (reveal ? aDeg + "°" : "?°") + "</text>" +
          '<text x="282" y="64" font-size="14" font-weight="800" fill="#0B5E43">Vertical Angles</text>' +
          '<text x="282" y="86" font-size="13" font-weight="600" fill="currentColor" opacity="0.78">Opposite across an X</text>';
      }
      return svgWrap("0 0 440 138", "Angle pair diagram", bodyA);
    }

    if (v.kind === "coord") {
      var xs = v.xs, ys = v.ys, maxX = Math.max(10, xs[xs.length - 1] + 1), maxY = Math.max(10, ys[ys.length - 1] + 4);
      var gx0 = 56, gx1 = 236, gy0 = 122, gy1 = 20;
      var sx = function (x) { return +(gx0 + (x / maxX) * (gx1 - gx0)).toFixed(1); };
      var sy = function (y) { return +(gy0 - (y / maxY) * (gy0 - gy1)).toFixed(1); };
      var pts = xs.map(function (x, i) { return sx(x) + "," + sy(ys[i]); }).join(" ");
      var dots = xs.map(function (x, i) {
        return '<circle cx="' + sx(x) + '" cy="' + sy(ys[i]) + '" r="5" fill="#2563EB" stroke="#fff" stroke-width="1.5"/>' +
          '<text x="' + (sx(x) + 6) + '" y="' + (sy(ys[i]) - 6) + '" font-size="10" font-weight="700" fill="currentColor">(' + x + "," + ys[i] + ")</text>";
      }).join("");
      var lineFromZero = reveal ? '<line x1="' + gx0 + '" y1="' + gy0 + '" x2="' + sx(xs[xs.length - 1]) + '" y2="' + sy(ys[ys.length - 1]) + '" stroke="' + (v.prop ? "#16A34A" : "#DC2626") + '" stroke-width="2" stroke-dasharray="5 3"/>' : "";
      var bodyG =
        '<rect x="' + gx0 + '" y="' + gy1 + '" width="' + (gx1 - gx0) + '" height="' + (gy0 - gy1) + '" fill="rgba(148,163,184,.08)" stroke="currentColor" stroke-opacity="0.25"/>' +
        '<line x1="' + gx0 + '" y1="' + gy0 + '" x2="' + (gx1 + 10) + '" y2="' + gy0 + '" stroke="currentColor" stroke-width="2"/>' +
        '<line x1="' + gx0 + '" y1="' + gy0 + '" x2="' + gx0 + '" y2="' + (gy1 - 6) + '" stroke="currentColor" stroke-width="2"/>' +
        '<circle cx="' + gx0 + '" cy="' + gy0 + '" r="4" fill="#E0457B"/>' +
        '<text x="' + (gx0 - 6) + '" y="' + (gy0 + 13) + '" text-anchor="end" font-size="10" font-weight="800" fill="#E0457B">(0,0)</text>' +
        lineFromZero +
        '<polyline points="' + pts + '" fill="none" stroke="#2563EB" stroke-width="2.5"/>' + dots +
        '<text x="272" y="54" font-size="13" font-weight="800" fill="currentColor">Proportional Graph Test</text>' +
        '<text x="272" y="76" font-size="12" font-weight="600" fill="currentColor" opacity="0.78">Straight line through (0, 0)</text>' +
        '<text x="272" y="96" font-size="12" font-weight="600" fill="currentColor" opacity="0.78">and y ÷ x stays constant!</text>';
      return svgWrap("0 0 440 144", "Coordinate plot of x,y pairs", bodyG);
    }

    if (v.kind === "percent-bar") {
      var pct = Math.max(0, Math.min(100, v.pct || 25));
      var barW = 340, fillW = Math.round(barW * pct / 100);
      var col = v.mode === "discount" ? "#16A34A" : v.mode === "tax" || v.mode === "tip" ? "#F59E0B" : "#3A56D4";
      var bodyP =
        '<text x="50" y="28" font-size="13" font-weight="800" fill="currentColor">' + esc(v.title || "Percent Bar") + "</text>" +
        '<rect x="50" y="40" width="' + barW + '" height="34" rx="10" fill="rgba(148,163,184,.18)" stroke="currentColor" stroke-opacity="0.35" stroke-width="2"/>' +
        '<rect x="50" y="40" width="' + Math.max(14, fillW) + '" height="34" rx="10" fill="' + col + '" opacity="0.86"/>' +
        '<text x="' + (50 + Math.max(24, fillW / 2)) + '" y="62" text-anchor="middle" font-size="13" font-weight="800" fill="#fff">' + pct + "%</text>" +
        '<text x="50" y="92" font-size="11" font-weight="700" fill="currentColor" opacity="0.7">0%</text>' +
        '<text x="220" y="92" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor" opacity="0.7">50%</text>' +
        '<text x="390" y="92" text-anchor="end" font-size="11" font-weight="700" fill="currentColor" opacity="0.7">100% = ' + esc(v.whole) + "</text>";
      return svgWrap("0 0 440 104", "Percent tape diagram", bodyP);
    }

    if (v.kind === "marbles") {
      var list = [], i;
      for (i = 0; i < v.r; i++) list.push("#EF4444");
      for (i = 0; i < v.b; i++) list.push("#3B82F6");
      for (i = 0; i < v.g; i++) list.push("#22C55E");
      var cols = Math.min(8, Math.max(4, Math.ceil(list.length / 3)));
      var dotsM = list.map(function (c, idx) {
        var colI = idx % cols, rowI = Math.floor(idx / cols);
        var mx = 68 + colI * 24, my = 104 - rowI * 24;
        return '<circle cx="' + mx + '" cy="' + my + '" r="9.5" fill="' + c + '" stroke="#1E293B" stroke-width="1.5"/>' +
          '<circle cx="' + (mx - 3) + '" cy="' + (my - 3) + '" r="2.6" fill="#fff" opacity="0.65"/>';
      }).join("");
      var bodyM =
        '<rect x="48" y="24" width="212" height="98" rx="18" fill="rgba(148,163,184,.12)" stroke="currentColor" stroke-width="2.5" stroke-opacity="0.45"/>' +
        dotsM +
        '<text x="282" y="48" font-size="13" font-weight="800" fill="#EF4444">● Red: ' + v.r + "</text>" +
        '<text x="282" y="70" font-size="13" font-weight="800" fill="#3B82F6">● Blue: ' + v.b + "</text>" +
        '<text x="282" y="92" font-size="13" font-weight="800" fill="#22C55E">● Green: ' + v.g + "</text>" +
        '<text x="282" y="114" font-size="12" font-weight="700" fill="currentColor" opacity="0.75">Total: ' + list.length + " marbles</text>";
      return svgWrap("0 0 440 134", "Marble bag with " + v.r + " red, " + v.b + " blue, " + v.g + " green", bodyM);
    }

    if (v.kind === "scale") {
      var bodyS =
        '<line x1="64" y1="68" x2="376" y2="68" stroke="#0B5E43" stroke-width="4" stroke-dasharray="8 5"/>' +
        '<circle cx="64" cy="68" r="10" fill="#2563EB"/><text x="64" y="96" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor">Town A</text>' +
        '<circle cx="376" cy="68" r="10" fill="#E0457B"/><text x="376" y="96" text-anchor="middle" font-size="12" font-weight="800" fill="currentColor">Town B</text>' +
        '<rect x="168" y="20" width="104" height="28" rx="8" fill="rgba(11,94,67,.14)" stroke="#0B5E43" stroke-width="2"/>' +
        '<text x="220" y="39" text-anchor="middle" font-size="13" font-weight="800" fill="#0B5E43">' + v.d + " cm on map</text>" +
        '<text x="220" y="96" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor" opacity="0.8">Map Scale: 1 cm = ' + v.s + " km</text>";
      return svgWrap("0 0 440 112", "Scale drawing map", bodyS);
    }

    if (v.kind === "prism") {
      var bodyPr =
        '<polygon points="100,48 210,48 248,24 138,24" fill="rgba(58,86,212,.18)" stroke="#3A56D4" stroke-width="2.5"/>' +
        '<rect x="100" y="48" width="110" height="68" fill="rgba(58,86,212,.10)" stroke="#3A56D4" stroke-width="2.5"/>' +
        '<polygon points="210,48 248,24 248,92 210,116" fill="rgba(58,86,212,.26)" stroke="#3A56D4" stroke-width="2.5"/>' +
        '<text x="155" y="133" text-anchor="middle" font-size="13" font-weight="800" fill="#2563EB">length = ' + v.l + "</text>" +
        '<text x="242" y="114" font-size="13" font-weight="800" fill="#E0457B">width = ' + v.w + "</text>" +
        '<text x="86" y="86" text-anchor="end" font-size="13" font-weight="800" fill="#0B5E43">h = ' + v.h + "</text>" +
        '<text x="292" y="54" font-size="13" font-weight="800" fill="currentColor">' + (v.mode === "sa" ? "Surface Area" : "Volume") + "</text>" +
        '<text x="292" y="76" font-size="12" font-weight="600" fill="currentColor" opacity="0.78">' + (v.mode === "sa" ? "SA = 2(lw + lh + wh)" : "V = l × w × h") + "</text>";
      return svgWrap("0 0 440 146", "Rectangular prism " + v.l + " by " + v.w + " by " + v.h, bodyPr);
    }

    if (v.kind === "tree") {
      var bodyT =
        '<circle cx="48" cy="70" r="7" fill="#0B5E43"/>' +
        '<line x1="55" y1="70" x2="145" y2="34" stroke="currentColor" stroke-width="2"/><line x1="55" y1="70" x2="145" y2="106" stroke="currentColor" stroke-width="2"/>' +
        '<rect x="132" y="20" width="76" height="26" rx="8" fill="rgba(37,99,235,.15)" stroke="#2563EB" stroke-width="2"/><text x="170" y="37" text-anchor="middle" font-size="12" font-weight="800" fill="#2563EB">' + esc(v.s1) + "</text>" +
        '<rect x="132" y="94" width="76" height="26" rx="8" fill="rgba(148,163,184,.18)" stroke="currentColor" stroke-opacity="0.4" stroke-width="1.5"/><text x="170" y="111" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">other</text>' +
        '<line x1="208" y1="33" x2="294" y2="22" stroke="#E0457B" stroke-width="2.5"/><line x1="208" y1="33" x2="294" y2="54" stroke="currentColor" stroke-width="1.5" opacity="0.45"/>' +
        '<rect x="294" y="10" width="124" height="26" rx="8" fill="rgba(224,69,123,.15)" stroke="#E0457B" stroke-width="2"/><text x="356" y="27" text-anchor="middle" font-size="12" font-weight="800" fill="#E0457B">' + esc(v.s2) + "</text>" +
        '<text x="296" y="96" font-size="12" font-weight="800" fill="#0B5E43">Multiply independent odds:</text>' +
        '<text x="296" y="116" font-size="12" font-weight="700" fill="currentColor" opacity="0.8">P(A and B) = P(A) × P(B)</text>';
      return svgWrap("0 0 440 134", "Compound probability tree diagram", bodyT);
    }

    if (v.kind === "dotplot") {
      var arr = v.nums.slice().sort(function (x, y) { return x - y; });
      var mn = arr[0] - 1, mx = arr[arr.length - 1] + 1, sp = Math.max(1, mx - mn);
      var counts = {}, dotsD = "";
      arr.forEach(function (n) {
        counts[n] = (counts[n] || 0) + 1;
        var dx = +(44 + ((n - mn) / sp) * 352).toFixed(1), dy = 86 - counts[n] * 16;
        dotsD += '<circle cx="' + dx + '" cy="' + dy + '" r="6" fill="#2563EB" stroke="#fff" stroke-width="1.5"/>';
      });
      var axisT = "";
      for (var k = mn; k <= mx; k++) {
        if (sp > 14 && (k - mn) % 2 !== 0) continue;
        var kx = +(44 + ((k - mn) / sp) * 352).toFixed(1);
        axisT += '<line x1="' + kx + '" y1="86" x2="' + kx + '" y2="94" stroke="currentColor" stroke-width="1.5"/>' +
          '<text x="' + kx + '" y="108" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">' + k + "</text>";
      }
      var bodyD = '<line x1="34" y1="90" x2="406" y2="90" stroke="currentColor" stroke-width="2"/>' + axisT + dotsD +
        '<text x="220" y="20" text-anchor="middle" font-size="12" font-weight="800" fill="#0B5E43">Data set: ' + arr.join(", ") + "</text>";
      return svgWrap("0 0 440 118", "Dot plot of data values", bodyD);
    }

    return "";
  }

  /* =========================================================================
     2. LABELED SCIENCE & SOCIAL STUDIES SCHEMATICS
     ========================================================================= */
  function renderSubjectVis(lessonId) {
    if (!lessonId) return "";
    if (lessonId === "s7-cells") {
      return svgWrap("0 0 440 144", "Animal cell vs plant cell organelles",
        '<ellipse cx="110" cy="76" rx="74" ry="48" fill="rgba(59,130,246,.12)" stroke="#2563EB" stroke-width="3"/>' +
        '<circle cx="102" cy="74" r="18" fill="rgba(124,58,237,.25)" stroke="#7C3AED" stroke-width="2"/><text x="102" y="78" text-anchor="middle" font-size="9" font-weight="800" fill="#7C3AED">Nucleus</text>' +
        '<ellipse cx="144" cy="92" rx="14" ry="7" fill="#F97316"/><text x="110" y="18" text-anchor="middle" font-size="12" font-weight="800" fill="#2563EB">Animal Cell</text>' +
        '<rect x="242" y="28" width="154" height="96" rx="14" fill="rgba(34,197,94,.12)" stroke="#15803D" stroke-width="5"/>' +
        '<rect x="250" y="36" width="138" height="80" rx="10" fill="none" stroke="#22C55E" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<ellipse cx="332" cy="78" rx="34" ry="22" fill="rgba(14,165,233,.25)" stroke="#0284C7" stroke-width="2"/><text x="332" y="82" text-anchor="middle" font-size="9" font-weight="800" fill="#0369A1">Vacuole</text>' +
        '<circle cx="278" cy="64" r="14" fill="rgba(124,58,237,.25)" stroke="#7C3AED" stroke-width="2"/>' +
        '<ellipse cx="274" cy="96" rx="12" ry="6" fill="#16A34A"/><ellipse cx="300" cy="48" rx="12" ry="6" fill="#16A34A"/>' +
        '<text x="319" y="18" text-anchor="middle" font-size="12" font-weight="800" fill="#15803D">Plant Cell (+Wall, Chloroplasts)</text>',
        "Cell schematic · Nucleus = DNA · Mitochondria = Energy · Chloroplast = Sunlight → Sugar");
    }
    if (lessonId === "s7-photo") {
      return svgWrap("0 0 440 132", "Photosynthesis and cellular respiration cycle",
        '<rect x="22" y="34" width="156" height="64" rx="14" fill="rgba(34,197,94,.16)" stroke="#16A34A" stroke-width="2.5"/>' +
        '<text x="100" y="58" text-anchor="middle" font-size="13" font-weight="800" fill="#15803D">🌿 Photosynthesis</text>' +
        '<text x="100" y="76" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">Light + CO₂ + H₂O</text>' +
        '<text x="100" y="90" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor" opacity="0.75">(in Chloroplasts)</text>' +
        '<rect x="262" y="34" width="156" height="64" rx="14" fill="rgba(249,115,22,.16)" stroke="#EA580C" stroke-width="2.5"/>' +
        '<text x="340" y="58" text-anchor="middle" font-size="13" font-weight="800" fill="#C2410C">⚡ Respiration</text>' +
        '<text x="340" y="76" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">Sugar + O₂ → Energy</text>' +
        '<text x="340" y="90" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor" opacity="0.75">(in Mitochondria)</text>' +
        '<path d="M 182 48 Q 220 18 258 48" fill="none" stroke="#16A34A" stroke-width="3"/><text x="220" y="24" text-anchor="middle" font-size="11" font-weight="800" fill="#16A34A">Sugar + O₂ →</text>' +
        '<path d="M 258 84 Q 220 116 182 84" fill="none" stroke="#EA580C" stroke-width="3"/><text x="220" y="118" text-anchor="middle" font-size="11" font-weight="800" fill="#C2410C">← CO₂ + H₂O</text>');
    }
    if (lessonId === "s7-ecosystems") {
      return svgWrap("0 0 440 138", "10 percent energy pyramid",
        '<polygon points="150,18 210,18 228,46 132,46" fill="#EF4444" opacity="0.82"/><text x="180" y="36" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">0.1% Apex</text>' +
        '<polygon points="130,49 230,49 248,77 112,77" fill="#F97316" opacity="0.84"/><text x="180" y="67" text-anchor="middle" font-size="10" font-weight="800" fill="#fff">1% Secondary</text>' +
        '<polygon points="110,80 250,80 268,108 92,108" fill="#EAB308" opacity="0.88"/><text x="180" y="98" text-anchor="middle" font-size="10" font-weight="800" fill="#1E293B">10% Primary Consumers</text>' +
        '<polygon points="90,111 270,111 288,134 72,134" fill="#22C55E" opacity="0.88"/><text x="180" y="126" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">100% Producers (Plants / Algae)</text>' +
        '<text x="306" y="54" font-size="12" font-weight="800" fill="#0B5E43">10% Rule</text>' +
        '<text x="306" y="74" font-size="11" font-weight="600" fill="currentColor" opacity="0.8">Arrows show</text>' +
        '<text x="306" y="90" font-size="11" font-weight="600" fill="currentColor" opacity="0.8">ENERGY flow ↑</text>' +
        '<text x="306" y="112" font-size="11" font-weight="700" fill="#7C3AED">🍄 Decomposers</text>' +
        '<text x="306" y="126" font-size="10" font-weight="600" fill="currentColor" opacity="0.75">recycle nutrients</text>');
    }
    if (lessonId === "s7-matter") {
      return svgWrap("0 0 440 120", "Solid, liquid, and gas particle spacing",
        '<rect x="22" y="28" width="114" height="72" rx="12" fill="rgba(37,99,235,.10)" stroke="#2563EB" stroke-width="2"/>' +
        '<text x="79" y="20" text-anchor="middle" font-size="12" font-weight="800" fill="#2563EB">SOLID (vibrate)</text>' +
        '<g fill="#2563EB"><circle cx="52" cy="52" r="7"/><circle cx="70" cy="52" r="7"/><circle cx="88" cy="52" r="7"/><circle cx="106" cy="52" r="7"/><circle cx="52" cy="72" r="7"/><circle cx="70" cy="72" r="7"/><circle cx="88" cy="72" r="7"/><circle cx="106" cy="72" r="7"/></g>' +
        '<rect x="162" y="28" width="114" height="72" rx="12" fill="rgba(14,165,233,.10)" stroke="#0284C7" stroke-width="2"/>' +
        '<text x="219" y="20" text-anchor="middle" font-size="12" font-weight="800" fill="#0284C7">LIQUID (slide)</text>' +
        '<g fill="#0284C7"><circle cx="188" cy="64" r="7"/><circle cx="208" cy="76" r="7"/><circle cx="228" cy="60" r="7"/><circle cx="248" cy="74" r="7"/><circle cx="198" cy="86" r="7"/><circle cx="238" cy="84" r="7"/></g>' +
        '<rect x="302" y="28" width="114" height="72" rx="12" fill="rgba(249,115,22,.10)" stroke="#EA580C" stroke-width="2"/>' +
        '<text x="359" y="20" text-anchor="middle" font-size="12" font-weight="800" fill="#EA580C">GAS (fast &amp; free)</text>' +
        '<g fill="#EA580C"><circle cx="326" cy="46" r="6"/><circle cx="388" cy="44" r="6"/><circle cx="356" cy="66" r="6"/><circle cx="324" cy="86" r="6"/><circle cx="394" cy="84" r="6"/></g>');
    }
    if (lessonId === "s7-earth") {
      return svgWrap("0 0 440 132", "The rock cycle",
        '<rect x="155" y="10" width="130" height="32" rx="10" fill="rgba(239,68,68,.16)" stroke="#DC2626" stroke-width="2.5"/><text x="220" y="30" text-anchor="middle" font-size="12" font-weight="800" fill="#DC2626">🌋 IGNEOUS (cooled)</text>' +
        '<rect x="26" y="88" width="160" height="32" rx="10" fill="rgba(234,179,8,.18)" stroke="#CA8A04" stroke-width="2.5"/><text x="106" y="108" text-anchor="middle" font-size="12" font-weight="800" fill="#A16207">🪨 SEDIMENTARY (layers)</text>' +
        '<rect x="254" y="88" width="160" height="32" rx="10" fill="rgba(124,58,237,.16)" stroke="#7C3AED" stroke-width="2.5"/><text x="334" y="108" text-anchor="middle" font-size="12" font-weight="800" fill="#6D28D9">💎 METAMORPHIC (heat)</text>' +
        '<line x1="168" y1="44" x2="118" y2="84" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<line x1="190" y1="104" x2="250" y2="104" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<line x1="322" y1="84" x2="272" y2="44" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<text x="96" y="64" font-size="10" font-weight="700" fill="currentColor" opacity="0.75">weathering</text>' +
        '<text x="220" y="96" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor" opacity="0.75">heat &amp; pressure</text>' +
        '<text x="344" y="64" font-size="10" font-weight="700" fill="currentColor" opacity="0.75">melting</text>');
    }
    if (lessonId === "s7-heredity") {
      return svgWrap("0 0 440 132", "Punnett square inheritance model",
        '<text x="144" y="24" text-anchor="middle" font-size="14" font-weight="800" fill="#2563EB">T</text>' +
        '<text x="200" y="24" text-anchor="middle" font-size="14" font-weight="800" fill="#E0457B">t</text>' +
        '<text x="96" y="58" text-anchor="middle" font-size="14" font-weight="800" fill="#2563EB">T</text>' +
        '<text x="96" y="102" text-anchor="middle" font-size="14" font-weight="800" fill="#E0457B">t</text>' +
        '<rect x="116" y="32" width="56" height="44" fill="rgba(37,99,235,.14)" stroke="currentColor" stroke-width="2"/><text x="144" y="59" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor">TT</text>' +
        '<rect x="172" y="32" width="56" height="44" fill="rgba(37,99,235,.10)" stroke="currentColor" stroke-width="2"/><text x="200" y="59" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor">Tt</text>' +
        '<rect x="116" y="76" width="56" height="44" fill="rgba(37,99,235,.10)" stroke="currentColor" stroke-width="2"/><text x="144" y="103" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor">Tt</text>' +
        '<rect x="172" y="76" width="56" height="44" fill="rgba(224,69,123,.14)" stroke="currentColor" stroke-width="2"/><text x="200" y="103" text-anchor="middle" font-size="15" font-weight="800" fill="#E0457B">tt</text>' +
        '<text x="256" y="54" font-size="13" font-weight="800" fill="#0B5E43">Punnett Square</text>' +
        '<text x="256" y="76" font-size="12" font-weight="600" fill="currentColor" opacity="0.82">Dominant (T): 3 of 4 (75%)</text>' +
        '<text x="256" y="96" font-size="12" font-weight="600" fill="#E0457B">Recessive (tt): 1 of 4 (25%)</text>');
    }
    if (lessonId === "ss7-native") {
      return svgWrap("0 0 440 124", "Haudenosaunee Five Nations across New York",
        '<rect x="18" y="34" width="404" height="54" rx="14" fill="rgba(154,52,18,.10)" stroke="#9A3412" stroke-width="2"/>' +
        '<text x="220" y="22" text-anchor="middle" font-size="12" font-weight="800" fill="#9A3412">🏹 Haudenosaunee Confederacy (West → East across NY)</text>' +
        ["Seneca", "Cayuga", "Onondaga", "Oneida", "Mohawk"].map(function (n, idx) {
          var nx = 58 + idx * 80;
          return '<rect x="' + (nx - 34) + '" y="46" width="68" height="30" rx="8" fill="#9A3412"/><text x="' + nx + '" y="65" text-anchor="middle" font-size="11" font-weight="800" fill="#fff">' + n + "</text>";
        }).join("") +
        '<text x="220" y="108" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor" opacity="0.8">Tuscarora joined in 1722 (Six Nations) · Lenape lived along lower Hudson &amp; NYC</text>');
    }
    if (lessonId === "ss7-road-rev" || lessonId === "ss7-rev-war") {
      var evs = lessonId === "ss7-road-rev"
        ? [["1765", "Stamp Act"], ["1770", "Boston Mass."], ["1773", "Tea Party"], ["1775", "Lexington"], ["1776", "Declaration"]]
        : [["1775", "Lexington"], ["1776", "Declaration"], ["1777", "Saratoga NY"], ["1778", "Valley Forge"], ["1781", "Yorktown"]];
      return svgWrap("0 0 440 108", "American Revolution timeline",
        '<line x1="36" y1="54" x2="404" y2="54" stroke="#9A3412" stroke-width="3.5"/>' +
        evs.map(function (e, i) {
          var ex = 48 + i * 86;
          return '<circle cx="' + ex + '" cy="54" r="8" fill="#9A3412" stroke="#fff" stroke-width="2"/>' +
            '<text x="' + ex + '" y="36" text-anchor="middle" font-size="12" font-weight="800" fill="#9A3412">' + e[0] + "</text>" +
            '<text x="' + ex + '" y="78" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">' + e[1] + "</text>";
        }).join(""));
    }
    if (lessonId === "ss7-constitution" || lessonId === "ss7-government") {
      return svgWrap("0 0 440 132", "Three branches of US government",
        '<rect x="148" y="10" width="144" height="36" rx="10" fill="rgba(37,99,235,.15)" stroke="#2563EB" stroke-width="2.5"/><text x="220" y="26" text-anchor="middle" font-size="11.5" font-weight="800" fill="#2563EB">🏛️ LEGISLATIVE</text><text x="220" y="40" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">Congress makes laws</text>' +
        '<rect x="20" y="84" width="160" height="36" rx="10" fill="rgba(22,163,74,.15)" stroke="#16A34A" stroke-width="2.5"/><text x="100" y="100" text-anchor="middle" font-size="11.5" font-weight="800" fill="#15803D">🇺🇸 EXECUTIVE</text><text x="100" y="114" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">President enforces (veto)</text>' +
        '<rect x="260" y="84" width="160" height="36" rx="10" fill="rgba(124,58,237,.15)" stroke="#7C3AED" stroke-width="2.5"/><text x="340" y="100" text-anchor="middle" font-size="11.5" font-weight="800" fill="#6D28D9">⚖️ JUDICIAL</text><text x="340" y="114" text-anchor="middle" font-size="10" font-weight="600" fill="currentColor">Courts interpret laws</text>' +
        '<line x1="165" y1="48" x2="112" y2="82" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<line x1="275" y1="48" x2="328" y2="82" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<line x1="184" y1="102" x2="256" y2="102" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>' +
        '<text x="220" y="74" text-anchor="middle" font-size="10.5" font-weight="800" fill="#9A3412">Checks &amp; Balances</text>');
    }
    return "";
  }

  function render(lesson, problem, opts) {
    opts = opts || {};
    if (problem && problem.vis) return renderMathVis(problem.vis, !!opts.reveal);
    if (lesson && lesson.id) return renderSubjectVis(lesson.id);
    return "";
  }

  /* =========================================================================
     3. PRO iPAD / APPLE PENCIL SCRATCHPAD (SMOOTH INK, HIGHLIGHTER, LINE SNAP, PNG)
     ========================================================================= */
  function mountScratchpad(host) {
    if (!host) return;
    host.innerHTML =
      '<div class="hs-pad-bar">' +
      '<button type="button" class="hs-pad-col on" data-col="#1E293B" aria-label="Dark ink" style="--c:#1E293B"></button>' +
      '<button type="button" class="hs-pad-col" data-col="#2563EB" aria-label="Blue ink" style="--c:#2563EB"></button>' +
      '<button type="button" class="hs-pad-col" data-col="#E0457B" aria-label="Pink ink" style="--c:#E0457B"></button>' +
      '<button type="button" class="hs-pad-act" data-act="hi" title="Highlighter">🖍️ Highlight</button>' +
      '<button type="button" class="hs-pad-act" data-act="line" title="Straight line tool">📏 Line</button>' +
      '<button type="button" class="hs-pad-act" data-act="eraser">🧽 Eraser</button>' +
      '<button type="button" class="hs-pad-act on" data-act="grid">⊞ Grid</button>' +
      '<button type="button" class="hs-pad-act" data-act="undo">↩ Undo</button>' +
      '<button type="button" class="hs-pad-act" data-act="clear">Clear</button>' +
      '<button type="button" class="hs-pad-act" data-act="save" title="Save scratchpad as PNG">💾 PNG</button>' +
      '</div><canvas class="hs-pad-cv" width="680" height="230" aria-label="Pro Scratchpad workspace"></canvas>';

    var cv = host.querySelector(".hs-pad-cv");
    var ctx = cv.getContext("2d");
    var strokes = [], curStroke = null, color = "#1E293B", tool = "pen", showGrid = true;

    function isDark() { return document.body.classList.contains("hs-dark"); }
    function drawSmooth(pts) {
      if (pts.length === 1) {
        ctx.beginPath(); ctx.arc(pts[0][0], pts[0][1], Math.max(1.5, ctx.lineWidth * 0.5), 0, Math.PI * 2); ctx.fill();
        return;
      }
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (var i = 1; i < pts.length - 1; i++) {
        var mx = (pts[i][0] + pts[i + 1][0]) * 0.5;
        var my = (pts[i][1] + pts[i + 1][1]) * 0.5;
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
      }
      var last = pts[pts.length - 1];
      ctx.lineTo(last[0], last[1]);
      ctx.stroke();
    }
    function drawAll() {
      var w = cv.width, h = cv.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = isDark() ? "#0F172A" : "#FFFDF8";
      ctx.fillRect(0, 0, w, h);
      if (showGrid) {
        ctx.strokeStyle = isDark() ? "rgba(148,163,184,0.14)" : "rgba(148,163,184,0.25)";
        ctx.lineWidth = 1;
        for (var gx = 24; gx < w; gx += 24) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke(); }
        for (var gy = 24; gy < h; gy += 24) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke(); }
      }
      strokes.forEach(function (st) {
        if (!st.pts.length) return;
        ctx.save();
        ctx.lineCap = "round"; ctx.lineJoin = "round";
        if (st.tool === "hi") {
          ctx.globalAlpha = 0.34;
          ctx.strokeStyle = "#FACC15";
          ctx.fillStyle = "#FACC15";
          ctx.lineWidth = 18;
          drawSmooth(st.pts);
        } else if (st.tool === "eraser") {
          ctx.strokeStyle = isDark() ? "#0F172A" : "#FFFDF8";
          ctx.fillStyle = ctx.strokeStyle;
          ctx.lineWidth = 20;
          drawSmooth(st.pts);
        } else if (st.tool === "line") {
          var lc = st.col === "#1E293B" && isDark() ? "#F8FAFC" : st.col;
          ctx.strokeStyle = lc;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(st.pts[0][0], st.pts[0][1]);
          var end = st.pts[st.pts.length - 1];
          ctx.lineTo(end[0], end[1]);
          ctx.stroke();
        } else {
          var pc = st.col === "#1E293B" && isDark() ? "#F8FAFC" : st.col;
          ctx.strokeStyle = pc;
          ctx.fillStyle = pc;
          ctx.lineWidth = st.w || 3.2;
          drawSmooth(st.pts);
        }
        ctx.restore();
      });
    }
    function pt(e) {
      var r = cv.getBoundingClientRect();
      return [(e.clientX - r.left) * (cv.width / Math.max(1, r.width)), (e.clientY - r.top) * (cv.height / Math.max(1, r.height))];
    }
    cv.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      try { cv.setPointerCapture(e.pointerId); } catch (err) {}
      var pWidth = (e.pointerType === "pen" && e.pressure > 0) ? (1.8 + e.pressure * 3.8) : 3.2;
      curStroke = { col: color, tool: tool, w: pWidth, pts: [pt(e)] };
      strokes.push(curStroke);
      drawAll();
    });
    cv.addEventListener("pointermove", function (e) {
      if (!curStroke) return;
      e.preventDefault();
      var p = pt(e);
      if (curStroke.tool === "line") curStroke.pts = [curStroke.pts[0], p];
      else curStroke.pts.push(p);
      drawAll();
    });
    cv.addEventListener("pointerup", function () { curStroke = null; });
    cv.addEventListener("pointercancel", function () { curStroke = null; });

    function syncToolBtns() {
      ["hi", "line", "eraser"].forEach(function (k) {
        var b = host.querySelector('[data-act="' + k + '"]');
        if (b) b.classList.toggle("on", tool === k);
      });
    }

    host.addEventListener("click", function (e) {
      var cBtn = e.target.closest("[data-col]");
      if (cBtn) {
        color = cBtn.getAttribute("data-col");
        if (tool === "eraser" || tool === "hi") tool = "pen";
        host.querySelectorAll(".hs-pad-col").forEach(function (b) { b.classList.toggle("on", b === cBtn); });
        syncToolBtns();
        return;
      }
      var aBtn = e.target.closest("[data-act]");
      if (!aBtn) return;
      var act = aBtn.getAttribute("data-act");
      if (act === "hi" || act === "line" || act === "eraser") {
        tool = tool === act ? "pen" : act;
        syncToolBtns();
      } else if (act === "grid") { showGrid = !showGrid; aBtn.classList.toggle("on", showGrid); drawAll(); }
      else if (act === "undo") { strokes.pop(); drawAll(); }
      else if (act === "clear") { strokes = []; drawAll(); }
      else if (act === "save") {
        try {
          var a = document.createElement("a");
          a.download = "hoots-scratchpad.png";
          a.href = cv.toDataURL("image/png");
          a.click();
        } catch (err) {}
      }
    });
    drawAll();
  }

  /* =========================================================================
     4. ONE-TAP NY GRADE 7 FORMULA & REFERENCE SHEET DRAWER
     ========================================================================= */
  function referenceHtml(courseId) {
    var c = courseId || "math7";
    if (c === "ela7") {
      return '<h4>📖 Grade 7 NY ELA Reference</h4><ul class="hs-ref-list">' +
        '<li><b>Clause vs. Phrase:</b> Clause = subject + verb. Dependent clauses start with <i>because, although, when, if, since, until, while</i>.</li>' +
        '<li><b>Sentence Types:</b> Simple (1 indep.) · Compound (2 indep. + FANBOYS or ;) · Complex (1 indep. + dep.) · Compound-Complex (2+ indep. + dep.).</li>' +
        '<li><b>Coordinate Adjectives:</b> Comma if you can put <i>and</i> between them and swap them. Never put a comma before the noun.</li>' +
        '<li><b>CER Argument:</b> <b>C</b>laim (clear position) + <b>E</b>vidence (direct fact/quote) + <b>R</b>easoning (explains how evidence proves claim).</li></ul>';
    }
    if (c === "sci7") {
      return '<h4>📖 Grade 7 NY Science Reference</h4><ul class="hs-ref-list">' +
        '<li><b>Plant vs. Animal Cells:</b> Both have nucleus, mitochondria, membrane, cytoplasm. Plant cells add <i>cell wall, chloroplasts, large central vacuole</i>.</li>' +
        '<li><b>Photosynthesis ↔ Respiration:</b> CO₂ + H₂O + Light ⇄ Glucose (C₆H₁₂O₆) + O₂.</li>' +
        '<li><b>Energy Pyramid:</b> Only ~10% of energy passes to the next trophic level; arrows point in the direction energy flows.</li>' +
        '<li><b>Chemical vs. Physical:</b> Physical changes keep the same substance; chemical changes create a new substance (gas, color, heat, precipitate).</li></ul>';
    }
    if (c === "ss7") {
      return '<h4>📖 Grade 7 NY Social Studies Reference</h4><ul class="hs-ref-list">' +
        '<li><b>Haudenosaunee Six Nations:</b> Mohawk, Oneida, Onondaga, Cayuga, Seneca (+ Tuscarora in 1722); Great Law of Peace; Three Sisters crops.</li>' +
        '<li><b>Road to Revolution:</b> Stamp Act (1765) → Boston Massacre (1770) → Tea Party (1773) → Lexington (1775) → Declaration (1776) → Saratoga NY (1777) → Yorktown (1781).</li>' +
        '<li><b>Constitution (1787):</b> Legislative (Congress makes laws) · Executive (President enforces/vetoes) · Judicial (Courts interpret). First 10 amendments = Bill of Rights (1791).</li>' +
        '<li><b>NY &amp; Reform:</b> Erie Canal (1825) linked Albany to Buffalo; Seneca Falls (1848) launched women\'s rights movement.</li></ul>';
    }
    return '<h4>📖 NY Grade 7 Math Formula &amp; Reference Sheet</h4><ul class="hs-ref-list">' +
      '<li><b>Unit Rate &amp; Proportions:</b> <code>k = y ÷ x</code> · <code>y = kx</code> (graph is a straight line through <code>(0, 0)</code>).</li>' +
      '<li><b>Percents:</b> <code>part = % × whole</code> · <code>% change = (change ÷ original) × 100</code> · Discount subtracts; tax &amp; tip add.</li>' +
      '<li><b>Integer Signs:</b> Subtracting = adding opposite · Same signs ×/÷ → <code>+</code> · Different signs ×/÷ → <code>−</code>.</li>' +
      '<li><b>Inequalities:</b> Multiply or divide by a <b>negative</b> → <b>FLIP</b> the sign!</li>' +
      '<li><b>Circles:</b> <code>r = d ÷ 2</code> · <code>C = 2πr</code> · <code>A = πr²</code> (use <code>π ≈ 3.14</code>).</li>' +
      '<li><b>Angles &amp; Prisms:</b> Complementary = <code>90°</code> · Supplementary = <code>180°</code> · Vertical = equal · Prism <code>V = l × w × h</code>, <code>SA = 2(lw + lh + wh)</code>.</li>' +
      '<li><b>Probability &amp; Data:</b> <code>P(A and B) = P(A) × P(B)</code> · Mean = sum ÷ count · MAD = average distance from mean.</li></ul>';
  }

  window.HootStudyVisuals = {
    render: render,
    mountScratchpad: mountScratchpad,
    referenceHtml: referenceHtml
  };
})();
