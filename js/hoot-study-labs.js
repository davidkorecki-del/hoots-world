/* Hoot Study Labs (Grade 7 NY Teen Suite — kidc only).
   Interactive playable manipulatives + Step-by-Step Algebra Coach + Interactive NY History Map:
   1. Equation Balance & Step-by-Step Algebra Lab (7.EE.4)
   2. Proportional Slope Coordinate Explorer (7.RP.2)
   3. Circle & Angle Protractor Lab (7.G.4, 7.G.5)
   4. Punnett Square & Hudson River Food Web Lab (MS-LS2, MS-LS3)
   5. Interactive NY History Map & Primary Source Explorer (7.1–7.8) */
(function () {
  "use strict";

  var MAP_KEY = "hootworld.hs.nymap.v1";
  var LABS_KEY = "hootworld.hs.labs.v1";

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
  function markLabDone(labId) {
    var all = loadJ(LABS_KEY), kid = activeKid();
    all[kid] = all[kid] || {};
    all[kid][labId] = (all[kid][labId] || 0) + 1;
    saveJ(LABS_KEY, all);
  }
  function getLabsDone(kid) {
    return loadJ(LABS_KEY)[kid || activeKid()] || {};
  }
  function getMapDone(kid) {
    return loadJ(MAP_KEY)[kid || activeKid()] || {};
  }
  function markMapPin(pinId) {
    var all = loadJ(MAP_KEY), kid = activeKid();
    all[kid] = all[kid] || {};
    all[kid][pinId] = 1;
    saveJ(MAP_KEY, all);
  }
  function rnd(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }

  /* =========================================================================
     LAB 1: EQUATION BALANCE & STEP-BY-STEP ALGEBRA COACH (7.EE.4)
     ========================================================================= */
  function renderBalanceLab(stage) {
    var st = {};
    function newEq() {
      var a = rnd(2, 6), x = rnd(-5, 9);
      if (x === 0) x = 4;
      var b = rnd(-9, 12);
      if (b === 0) b = 5;
      var c = a * x + b;
      st = { a: a, b: b, c: c, ans: x, curA: a, curB: b, curC: c, steps: [], tilt: 0, msg: "Isolate x by doing the SAME operation to both sides!", msgType: "" };
      draw();
    }
    function fmtLeft(a, b) {
      var ax = a === 1 ? "x" : a === -1 ? "−x" : a + "x";
      if (b === 0) return ax;
      return ax + (b > 0 ? " + " + b : " − " + Math.abs(b));
    }
    function applyOp(op, val) {
      if (st.curA === 1 && st.curB === 0) return;
      var v = +val;
      if (!v || !isFinite(v)) return;
      var prev = fmtLeft(st.curA, st.curB) + " = " + st.curC;
      if (op === "sub") {
        st.curB -= v; st.curC -= v;
        st.steps.push("Subtract " + v + " from both sides → " + fmtLeft(st.curA, st.curB) + " = " + st.curC);
        st.tilt = -5;
        st.msg = st.curB === 0 ? "Nice! Now undo the multiplication by dividing both sides by " + st.curA + "." : "Balanced! Keep simplifying until the constant term is 0.";
        st.msgType = st.curB === 0 ? "ok" : "";
      } else if (op === "add") {
        st.curB += v; st.curC += v;
        st.steps.push("Add " + v + " to both sides → " + fmtLeft(st.curA, st.curB) + " = " + st.curC);
        st.tilt = 5;
        st.msg = st.curB === 0 ? "Awesome! Now divide both sides by " + st.curA + " to isolate x." : "Balanced! Try undoing the constant term directly.";
        st.msgType = st.curB === 0 ? "ok" : "";
      } else if (op === "div") {
        if (st.curB !== 0) {
          st.tilt = 9;
          st.msg = "💡 Tip: Undo the " + (st.curB > 0 ? "+ " + st.curB : "− " + Math.abs(st.curB)) + " FIRST before dividing — it keeps the numbers clean!";
          st.msgType = "warn";
          draw();
          return;
        }
        if (v !== st.curA) {
          st.tilt = -8;
          st.msg = "Dividing by " + v + " won't leave 1x — divide both sides by " + st.curA + " instead!";
          st.msgType = "warn";
          draw();
          return;
        }
        st.curA = 1; st.curC = st.curC / v;
        st.steps.push("Divide both sides by " + v + " → x = " + st.curC);
        st.tilt = 0;
        st.msg = "🎉 Solved! x = " + st.curC + " (Check: " + st.a + "(" + st.curC + ")" + (st.b >= 0 ? " + " + st.b : " − " + Math.abs(st.b)) + " = " + st.c + " ✓)";
        st.msgType = "ok";
        markLabDone("balance");
        if (window.HootStudyPro && window.HootStudyPro.celebrate) window.HootStudyPro.celebrate();
      }
      draw();
      if (st.tilt !== 0) {
        setTimeout(function () {
          st.tilt = 0;
          var beam = stage.querySelector(".lab-beam");
          if (beam) beam.style.transform = "rotate(0deg)";
        }, 320);
      }
    }
    function draw() {
      var solved = st.curA === 1 && st.curB === 0;
      var bAbs = Math.abs(st.b);
      /* Offer smart step choices + distractors so Kaitlyn genuinely chooses the right inverse operation */
      var ops = [
        { op: "sub", val: bAbs, lbl: "− " + bAbs + " both sides" },
        { op: "add", val: bAbs, lbl: "+ " + bAbs + " both sides" },
        { op: "div", val: st.a, lbl: "÷ " + st.a + " both sides" },
        { op: "div", val: st.a + 1, lbl: "÷ " + (st.a + 1) + " both sides" }
      ];
      stage.innerHTML =
        '<div class="lab-card">' +
          '<div class="lab-hdr"><div><h3>⚖️ Equation Balance &amp; Step-by-Step Algebra</h3><p>Pick the inverse operation for each line to isolate <b>x</b> while keeping the scale balanced.</p></div>' +
          '<button type="button" class="hs-btn sm" data-bal-new="1">↻ New Equation</button></div>' +
          '<div class="lab-eq-pill">' + esc(fmtLeft(st.curA, st.curB)) + " = " + esc(st.curC) + "</div>" +
          '<div class="lab-svg-box">' +
            '<svg viewBox="0 0 420 135" aria-label="Interactive equation balance scale">' +
              '<g class="lab-beam" style="transform-origin:210px 92px;transform:rotate(' + st.tilt + 'deg);transition:transform .35s cubic-bezier(.2,1.4,.4,1)">' +
                '<rect x="46" y="88" width="328" height="8" rx="4" fill="#10B981"/>' +
                '<rect x="52" y="34" width="136" height="46" rx="12" fill="rgba(59,130,246,.16)" stroke="#3B82F6" stroke-width="2.5"/>' +
                '<text x="120" y="63" text-anchor="middle" font-size="18" font-weight="800" fill="#60A5FA">' + esc(fmtLeft(st.curA, st.curB)) + "</text>" +
                '<rect x="232" y="34" width="136" height="46" rx="12" fill="rgba(236,72,153,.16)" stroke="#EC4899" stroke-width="2.5"/>' +
                '<text x="300" y="63" text-anchor="middle" font-size="18" font-weight="800" fill="#F472B6">' + esc(st.curC) + "</text>" +
                '<circle cx="210" cy="57" r="14" fill="#059669"/><text x="210" y="62" text-anchor="middle" font-size="16" font-weight="800" fill="#fff">=</text>' +
              "</g>" +
              '<polygon points="188,128 210,94 232,128" fill="#059669"/>' +
            "</svg>" +
          "</div>" +
          '<div class="lab-ops">' + ops.map(function (o) {
            return '<button type="button" class="hs-btn sm" data-bal-op="' + o.op + '" data-bal-v="' + o.val + '"' + (solved ? " disabled" : "") + ">" + esc(o.lbl) + "</button>";
          }).join("") + "</div>" +
          '<p class="hs-fb ' + (st.msgType === "ok" ? "ok" : st.msgType === "warn" ? "warn" : "") + '">' + esc(st.msg) + "</p>" +
          (st.steps.length ? '<ol class="hs-sol">' + st.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" : "") +
        "</div>";
    }
    stage.onclick = function (e) {
      if (e.target.closest("[data-bal-new]")) { newEq(); return; }
      var b = e.target.closest("[data-bal-op]");
      if (b) applyOp(b.getAttribute("data-bal-op"), b.getAttribute("data-bal-v"));
    };
    newEq();
  }

  /* =========================================================================
     LAB 2: PROPORTIONAL SLOPE COORDINATE EXPLORER (7.RP.2)
     ========================================================================= */
  function renderSlopeLab(stage) {
    var pt = { x: 4, y: 6 };
    var targetK = null;
    var hitTarget = false;

    function kVal() { return Math.round((pt.y / Math.max(1, pt.x)) * 100) / 100; }

    function draw() {
      var k = kVal();
      var x2 = 10, y2 = k * 10;
      if (y2 > 10) { y2 = 10; x2 = 10 / Math.max(0.01, k); }
      function gx(x) { return +(46 + x * 32).toFixed(1); }
      function gy(y) { return +(210 - y * 19).toFixed(1); }
      var grid = "";
      for (var i = 0; i <= 10; i++) {
        grid += '<line x1="' + gx(i) + '" y1="20" x2="' + gx(i) + '" y2="210" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>';
        grid += '<line x1="46" y1="' + gy(i) + '" x2="366" y2="' + gy(i) + '" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>';
        if (i % 2 === 0) {
          grid += '<text x="' + gx(i) + '" y="226" text-anchor="middle" font-size="10" font-weight="700" fill="currentColor" opacity="0.75">' + i + "</text>";
          grid += '<text x="36" y="' + (gy(i) + 4) + '" text-anchor="end" font-size="10" font-weight="700" fill="currentColor" opacity="0.75">' + i + "</text>";
        }
      }
      var matched = targetK != null && Math.abs(k - targetK) < 0.01;
      if (matched && !hitTarget) { hitTarget = true; markLabDone("slope"); }
      var tblRows = [1, 2, 4, 6].map(function (xv) {
        var yv = Math.round(xv * k * 100) / 100;
        return "<tr><td>" + xv + "</td><td>" + yv + "</td><td>" + k + "</td></tr>";
      }).join("");

      stage.innerHTML =
        '<div class="lab-card">' +
          '<div class="lab-hdr"><div><h3>📈 Proportional Slope Explorer (y = kx)</h3><p>Drag the sliders or tap the graph to move <b>(x, y)</b> and see how constant <b>k = y ÷ x</b> behaves.</p></div>' +
          '<button type="button" class="hs-btn sm pri" data-slp-chal="1">🎯 Challenge</button></div>' +
          (targetK != null ? '<p class="hs-fb ' + (matched ? "ok" : "warn") + '">' + (matched ? "🎉 Nailed it! k = " + targetK + " at (" + pt.x + ", " + pt.y + ")!" : "🎯 Goal: Move the point so the constant of proportionality is k = " + targetK) + "</p>" : "") +
          '<div class="lab-slope-grid">' +
            '<div class="lab-svg-box">' +
              '<svg class="lab-slope-svg" viewBox="0 0 400 240" aria-label="Interactive proportional coordinate plane">' +
                grid +
                '<line x1="46" y1="210" x2="366" y2="210" stroke="currentColor" stroke-width="2"/>' +
                '<line x1="46" y1="20" x2="46" y2="210" stroke="currentColor" stroke-width="2"/>' +
                '<line x1="' + gx(0) + '" y1="' + gy(0) + '" x2="' + gx(x2) + '" y2="' + gy(y2) + '" stroke="#10B981" stroke-width="3.5" stroke-linecap="round"/>' +
                '<line x1="' + gx(pt.x) + '" y1="210" x2="' + gx(pt.x) + '" y2="' + gy(pt.y) + '" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="4 3"/>' +
                '<line x1="46" y1="' + gy(pt.y) + '" x2="' + gx(pt.x) + '" y2="' + gy(pt.y) + '" stroke="#60A5FA" stroke-width="1.5" stroke-dasharray="4 3"/>' +
                '<circle cx="' + gx(0) + '" cy="' + gy(0) + '" r="4.5" fill="#10B981"/>' +
                '<circle cx="' + gx(pt.x) + '" cy="' + gy(pt.y) + '" r="9" fill="#EC4899" stroke="#fff" stroke-width="2.5"/>' +
                '<text x="' + Math.min(340, gx(pt.x) + 12) + '" y="' + Math.max(32, gy(pt.y) - 10) + '" font-size="12" font-weight="800" fill="#F472B6">(' + pt.x + ", " + pt.y + ")</text>" +
              "</svg>" +
            "</div>" +
            '<div class="lab-slope-side">' +
              '<div class="lab-readout"><b>Equation:</b> y = ' + k + 'x<br><small>k = ' + pt.y + " ÷ " + pt.x + " = <b>" + k + "</b></small></div>" +
              '<label class="lab-rng">x = <b>' + pt.x + '</b><input type="range" min="1" max="10" step="1" value="' + pt.x + '" data-slp-axis="x"></label>' +
              '<label class="lab-rng">y = <b>' + pt.y + '</b><input type="range" min="1" max="10" step="1" value="' + pt.y + '" data-slp-axis="y"></label>' +
              '<table class="lab-tbl"><thead><tr><th>x</th><th>y</th><th>y ÷ x</th></tr></thead><tbody>' + tblRows + "</tbody></table>" +
            "</div>" +
          "</div>" +
        "</div>";
    }

    stage.oninput = function (e) {
      var ax = e.target && e.target.getAttribute && e.target.getAttribute("data-slp-axis");
      if (!ax) return;
      pt[ax] = +e.target.value;
      draw();
    };
    stage.onclick = function (e) {
      if (e.target.closest("[data-slp-chal]")) {
        var ks = [0.5, 1.5, 2, 2.5, 3];
        targetK = ks[Math.floor(Math.random() * ks.length)];
        hitTarget = false;
        draw();
        return;
      }
      var svg = e.target.closest(".lab-slope-svg");
      if (svg) {
        var r = svg.getBoundingClientRect();
        var sx = ((e.clientX - r.left) / Math.max(1, r.width)) * 400;
        var sy = ((e.clientY - r.top) / Math.max(1, r.height)) * 240;
        var nx = Math.max(1, Math.min(10, Math.round((sx - 46) / 32)));
        var ny = Math.max(1, Math.min(10, Math.round((210 - sy) / 19)));
        pt.x = nx; pt.y = ny;
        draw();
      }
    };
    draw();
  }

  /* =========================================================================
     LAB 3: CIRCLE & ANGLE PROTRACTOR LAB (7.G.4 & 7.G.5)
     ========================================================================= */
  function renderGeomLab(stage) {
    var mode = "circle", radius = 5, deg = 55;

    function draw() {
      var inner = "";
      if (mode === "circle") {
        var d = radius * 2;
        var circ = (2 * 3.14 * radius).toFixed(2);
        var area = (3.14 * radius * radius).toFixed(2);
        var pxR = 14 + radius * 7;
        inner =
          '<div class="lab-svg-box">' +
            '<svg viewBox="0 0 400 220" aria-label="Interactive circle radius visualizer">' +
              '<circle cx="150" cy="110" r="' + pxR + '" fill="rgba(16,185,129,.16)" stroke="#10B981" stroke-width="3.5"/>' +
              '<line x1="150" y1="110" x2="' + (150 + pxR) + '" y2="110" stroke="#F472B6" stroke-width="3"/>' +
              '<circle cx="150" cy="110" r="4" fill="#F472B6"/>' +
              '<text x="' + (150 + pxR / 2) + '" y="102" text-anchor="middle" font-size="13" font-weight="800" fill="#F472B6">r = ' + radius + "</text>" +
              '<text x="275" y="66" font-size="13" font-weight="800" fill="currentColor">Diameter d = ' + d + "</text>" +
              '<text x="275" y="100" font-size="14" font-weight="800" fill="#10B981">C = 2πr ≈ ' + circ + "</text>" +
              '<text x="275" y="132" font-size="14" font-weight="800" fill="#60A5FA">A = πr² ≈ ' + area + "</text>" +
              '<text x="275" y="162" font-size="11" font-weight="600" fill="currentColor" opacity="0.72">Notice: doubling r</text>' +
              '<text x="275" y="178" font-size="11" font-weight="600" fill="currentColor" opacity="0.72">quadruples Area (r²)!</text>' +
            "</svg>" +
          "</div>" +
          '<label class="lab-rng">Radius r = <b>' + radius + ' cm</b><input type="range" min="1" max="12" step="1" value="' + radius + '" data-geo-r="1"></label>';
      } else {
        var rad = (deg * Math.PI) / 180;
        var rx = +(200 + 100 * Math.cos(rad)).toFixed(1);
        var ry = +(155 - 100 * Math.sin(rad)).toFixed(1);
        var comp = deg <= 90 ? (90 - deg) + "°" : "None (> 90°)";
        var supp = (180 - deg) + "°";
        var kind = deg < 90 ? "Acute" : deg === 90 ? "Right (90°)" : "Obtuse";
        inner =
          '<div class="lab-svg-box">' +
            '<svg viewBox="0 0 400 185" aria-label="Interactive angle protractor">' +
              '<path d="M 100 155 A 100 100 0 0 1 300 155" fill="rgba(59,130,246,.08)" stroke="currentColor" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="4 4"/>' +
              '<line x1="70" y1="155" x2="330" y2="155" stroke="currentColor" stroke-width="2.5"/>' +
              '<line x1="200" y1="155" x2="200" y2="55" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 4"/>' +
              '<line x1="200" y1="155" x2="' + rx + '" y2="' + ry + '" stroke="#EC4899" stroke-width="4" stroke-linecap="round"/>' +
              '<circle cx="200" cy="155" r="5" fill="#10B981"/>' +
              '<text x="200" y="34" text-anchor="middle" font-size="14" font-weight="800" fill="#F472B6">θ = ' + deg + "° (" + kind + ")</text>" +
              '<text x="316" y="138" text-anchor="middle" font-size="11" font-weight="700" fill="#10B981">θ = ' + deg + "°</text>" +
              '<text x="86" y="138" text-anchor="middle" font-size="11" font-weight="700" fill="#60A5FA">180° − θ = ' + supp + "</text>" +
            "</svg>" +
          "</div>" +
          '<label class="lab-rng">Angle θ = <b>' + deg + '°</b><input type="range" min="10" max="170" step="5" value="' + deg + '" data-geo-deg="1"></label>' +
          '<div class="lab-stats-3">' +
            '<div><small>Complementary (90°)</small><b>' + comp + "</b></div>" +
            '<div><small>Supplementary (180°)</small><b>' + supp + "</b></div>" +
            '<div><small>Vertical Angle</small><b>' + deg + "° (Equal)</b></div>" +
          "</div>";
      }
      stage.innerHTML =
        '<div class="lab-card">' +
          '<div class="lab-hdr"><div><h3>📐 Circle &amp; Angle Protractor Lab</h3><p>Slide to feel how radius scales Area (πr²) and how angle pairs lock together.</p></div>' +
          '<div class="lab-seg">' +
            '<button type="button" class="hs-btn sm' + (mode === "circle" ? " pri" : "") + '" data-geo-mode="circle">⭕ Circles</button>' +
            '<button type="button" class="hs-btn sm' + (mode === "angle" ? " pri" : "") + '" data-geo-mode="angle">📐 Angles</button>' +
          "</div></div>" +
          inner +
        "</div>";
    }
    stage.onclick = function (e) {
      var m = e.target.closest("[data-geo-mode]");
      if (m) { mode = m.getAttribute("data-geo-mode"); markLabDone("geom"); draw(); }
    };
    stage.oninput = function (e) {
      if (e.target.hasAttribute("data-geo-r")) { radius = +e.target.value; markLabDone("geom"); draw(); }
      if (e.target.hasAttribute("data-geo-deg")) { deg = +e.target.value; markLabDone("geom"); draw(); }
    };
    draw();
  }

  /* =========================================================================
     LAB 4: PUNNETT SQUARE & HUDSON RIVER FOOD WEB SIMULATOR (MS-LS2/3)
     ========================================================================= */
  function renderSciLab(stage) {
    var mode = "punnett", p1 = "Pp", p2 = "Pp";
    var eco = { bass: 100, oysters: 50 };

    function draw() {
      var inner = "";
      if (mode === "punnett") {
        var a1 = p1.split(""), a2 = p2.split("");
        var cells = [a1[0] + a2[0], a1[0] + a2[1], a1[1] + a2[0], a1[1] + a2[1]].map(function (c) {
          return c === "pP" ? "Pp" : c;
        });
        var dom = cells.filter(function (c) { return c.indexOf("P") >= 0; }).length;
        var pctDom = dom * 25, pctRec = (4 - dom) * 25;
        inner =
          '<div class="lab-pun-ctrls">' +
            '<div><small>Parent 1:</small> ' + ["PP", "Pp", "pp"].map(function (g) {
              return '<button type="button" class="hs-btn sm' + (p1 === g ? " pri" : "") + '" data-p1="' + g + '">' + g + "</button>";
            }).join("") + "</div>" +
            '<div><small>Parent 2:</small> ' + ["PP", "Pp", "pp"].map(function (g) {
              return '<button type="button" class="hs-btn sm' + (p2 === g ? " pri" : "") + '" data-p2="' + g + '">' + g + "</button>";
            }).join("") + "</div>" +
          "</div>" +
          '<div class="lab-pun-grid">' +
            '<div class="lp-hd">×</div><div class="lp-hd">' + a2[0] + '</div><div class="lp-hd">' + a2[1] + "</div>" +
            '<div class="lp-hd">' + a1[0] + '</div><div class="lp-cell ' + (cells[0].indexOf("P") >= 0 ? "dom" : "rec") + '">' + cells[0] + ' <small>' + (cells[0].indexOf("P") >= 0 ? "🌸 Purple" : "🌼 White") + '</small></div>' +
            '<div class="lp-cell ' + (cells[1].indexOf("P") >= 0 ? "dom" : "rec") + '">' + cells[1] + ' <small>' + (cells[1].indexOf("P") >= 0 ? "🌸 Purple" : "🌼 White") + "</small></div>" +
            '<div class="lp-hd">' + a1[1] + '</div><div class="lp-cell ' + (cells[2].indexOf("P") >= 0 ? "dom" : "rec") + '">' + cells[2] + ' <small>' + (cells[2].indexOf("P") >= 0 ? "🌸 Purple" : "🌼 White") + '</small></div>' +
            '<div class="lp-cell ' + (cells[3].indexOf("P") >= 0 ? "dom" : "rec") + '">' + cells[3] + ' <small>' + (cells[3].indexOf("P") >= 0 ? "🌸 Purple" : "🌼 White") + "</small></div>" +
          "</div>" +
          '<div class="lab-stats-3">' +
            '<div><small>Dominant (Purple)</small><b>' + pctDom + "% (" + dom + "/4)</b></div>" +
            '<div><small>Recessive (White)</small><b>' + pctRec + "% (" + (4 - dom) + "/4)</b></div>" +
            '<div><small>Rule</small><b>1 capital P hides p</b></div>' +
          "</div>";
      } else {
        /* Hudson River Food Web cascade model */
        var smallFish = Math.max(15, Math.min(100, Math.round(115 - eco.bass * 0.65 + eco.oysters * 0.15)));
        var plankton = Math.max(15, Math.min(100, Math.round(110 - smallFish * 0.6)));
        var clarity = Math.max(15, Math.min(100, Math.round(25 + eco.oysters * 0.72)));
        var note = eco.bass < 35
          ? "With few Striped Bass predators, Small Fish boom — eating down zooplankton fast!"
          : eco.oysters > 75
            ? "Thriving Oyster reefs filter the Hudson River, boosting water clarity and habitat health!"
            : "Balanced food web: predators keep consumers in check while producers power the pyramid.";
        var bar = function (lbl, val, col) {
          return '<div class="hs-stdr"><span><b>' + lbl + '</b></span><span class="hs-stdbar"><i style="width:' + val + "%;background:" + col + '"></i></span><span>' + val + "%</span></div>";
        };
        inner =
          '<div class="lab-eco-ctrl">' +
            '<label class="lab-rng">🐟 Striped Bass (Top Predator): <b>' + eco.bass + '%</b><input type="range" min="0" max="100" step="5" value="' + eco.bass + '" data-eco="bass"></label>' +
            '<label class="lab-rng">🦪 Hudson Oyster Reefs (Filterers): <b>' + eco.oysters + '%</b><input type="range" min="0" max="100" step="5" value="' + eco.oysters + '" data-eco="oysters"></label>' +
          "</div>" +
          '<div class="hs-std-grid">' +
            bar("🌿 Algae & Clarity", clarity, "#10B981") +
            bar("🦐 Zooplankton", plankton, "#3B82F6") +
            bar("🐠 Small Fish", smallFish, "#F59E0B") +
            bar("🐟 Striped Bass", eco.bass, "#EC4899") +
          "</div>" +
          '<p class="hs-fb ok">🌊 ' + esc(note) + "</p>";
      }
      stage.innerHTML =
        '<div class="lab-card">' +
          '<div class="lab-hdr"><div><h3>🧬 Science Simulator: Genetics &amp; Hudson Food Web</h3><p>Test parent genotypes or shift predator populations to watch real biological rules react.</p></div>' +
          '<div class="lab-seg">' +
            '<button type="button" class="hs-btn sm' + (mode === "punnett" ? " pri" : "") + '" data-sci-mode="punnett">🧬 Punnett Square</button>' +
            '<button type="button" class="hs-btn sm' + (mode === "eco" ? " pri" : "") + '" data-sci-mode="eco">🌊 Food Web</button>' +
          "</div></div>" +
          inner +
        "</div>";
    }
    stage.onclick = function (e) {
      var m = e.target.closest("[data-sci-mode]");
      if (m) { mode = m.getAttribute("data-sci-mode"); markLabDone("sci"); draw(); return; }
      var b1 = e.target.closest("[data-p1]");
      if (b1) { p1 = b1.getAttribute("data-p1"); markLabDone("sci"); draw(); return; }
      var b2 = e.target.closest("[data-p2]");
      if (b2) { p2 = b2.getAttribute("data-p2"); markLabDone("sci"); draw(); }
    };
    stage.oninput = function (e) {
      var k = e.target.getAttribute("data-eco");
      if (k) { eco[k] = +e.target.value; markLabDone("sci"); draw(); }
    };
    draw();
  }

  /* =========================================================================
     LAB 5: DRAG-TO-ROTATE 3D PRISM & UNFOLDING 2D NET (7.G.6)
     ========================================================================= */
  function renderPrism3DLab(stage) {
    var s = { l: 6, w: 4, h: 3, unfold: 0, yaw: -0.62, pitch: 0.46, dragging: false, lx: 0, ly: 0, animRaf: 0 };

    stage.innerHTML =
      '<div class="lab-card">' +
        '<div class="lab-hdr"><div><h3>🧊 3D Prism &amp; Unfolding 2D Net (7.G.6)</h3><p>Drag directly on the 3D box to orbit it in space, then slide <b>Unfold 2D Net</b> to see all 6 faces of Surface Area!</p></div>' +
        '<button type="button" class="hs-btn sm pri" data-p3-anim="1">📦 Auto Unfold / Fold</button></div>' +
        '<div class="lab-p3-grid">' +
          '<div class="lab-p3-stage">' +
            '<canvas class="lab-p3-cv" width="680" height="440" aria-label="Interactive 3D rectangular prism canvas"></canvas>' +
            '<small class="lab-p3-tip">👆 Drag to rotate 3D · 6 color-coded faces</small>' +
          "</div>" +
          '<div class="lab-p3-ctrl">' +
            '<div class="lab-readout" id="p3-readout"></div>' +
            '<label class="lab-rng">📦 Unfold 2D Net: <b id="p3-uv">0%</b><input type="range" min="0" max="100" step="1" value="0" data-p3="unfold"></label>' +
            '<label class="lab-rng">Length (l): <b id="p3-lv">6</b><input type="range" min="2" max="10" step="1" value="6" data-p3="l"></label>' +
            '<label class="lab-rng">Width (w): <b id="p3-wv">4</b><input type="range" min="2" max="8" step="1" value="4" data-p3="w"></label>' +
            '<label class="lab-rng">Height (h): <b id="p3-hv">3</b><input type="range" min="2" max="8" step="1" value="3" data-p3="h"></label>' +
            '<div class="lab-p3-legend">' +
              '<span><i style="background:#10B981"></i> Top &amp; Bottom (2 × lw)</span>' +
              '<span><i style="background:#3B82F6"></i> Front &amp; Back (2 × lh)</span>' +
              '<span><i style="background:#EC4899"></i> Left &amp; Right (2 × wh)</span>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>";

    var cv = stage.querySelector(".lab-p3-cv");
    var ctx = cv.getContext("2d");
    var ro = stage.querySelector("#p3-readout");

    function updateReadout() {
      var vol = s.l * s.w * s.h;
      var lw = s.l * s.w, lh = s.l * s.h, wh = s.w * s.h;
      var sa = 2 * (lw + lh + wh);
      ro.innerHTML =
        '<b>Volume:</b> ' + s.l + " × " + s.w + " × " + s.h + " = <b>" + vol + " u³</b><br>" +
        '<b>Surface Area:</b> 2(' + lw + " + " + lh + " + " + wh + ") = <b>" + sa + " u²</b>";
      stage.querySelector("#p3-uv").textContent = Math.round(s.unfold * 100) + "%";
      stage.querySelector("#p3-lv").textContent = s.l;
      stage.querySelector("#p3-wv").textContent = s.w;
      stage.querySelector("#p3-hv").textContent = s.h;
    }

    function rot3(p) {
      /* Center vertical offset gently so folded & unfolded both stay framed */
      var cy = (1 - s.unfold) * (s.h * 0.45);
      var cz = s.unfold * (-s.w * 0.35);
      var x = p[0], y = p[1] - cy, z = p[2] - cz;
      /* Yaw around Y */
      var cyaw = Math.cos(s.yaw), syaw = Math.sin(s.yaw);
      var x1 = x * cyaw - z * syaw;
      var z1 = x * syaw + z * cyaw;
      /* Pitch around X */
      var cp = Math.cos(s.pitch), sp = Math.sin(s.pitch);
      var y2 = y * cp - z1 * sp;
      var z2 = y * sp + z1 * cp;
      return [x1, y2, z2];
    }

    function proj(v) {
      /* Auto-zoom closer when folded, pull back smoothly as the 2D net unfolds flat! */
      var cam = 16.5 + s.unfold * 8.5;
      var scale = (cv.width * 0.62) / Math.max(6, cam - v[2]);
      return [cv.width * 0.5 + v[0] * scale, cv.height * 0.52 - v[1] * scale, v[2]];
    }

    function draw3D() {
      var dark = document.body.classList.contains("hs-dark");
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = dark ? "#0B1220" : "#F8FAFC";
      ctx.fillRect(0, 0, cv.width, cv.height);

      /* Subtle floor grid lines */
      ctx.strokeStyle = dark ? "rgba(148,163,184,0.08)" : "rgba(100,116,139,0.12)";
      ctx.lineWidth = 1;
      for (var g = -12; g <= 12; g += 3) {
        var a1 = proj(rot3([g, -0.02, -12])), a2 = proj(rot3([g, -0.02, 12]));
        ctx.beginPath(); ctx.moveTo(a1[0], a1[1]); ctx.lineTo(a2[0], a2[1]); ctx.stroke();
        var b1 = proj(rot3([-12, -0.02, g])), b2 = proj(rot3([12, -0.02, g]));
        ctx.beginPath(); ctx.moveTo(b1[0], b1[1]); ctx.lineTo(b2[0], b2[1]); ctx.stroke();
      }

      var hx = s.l / 2, hz = s.w / 2, h = s.h;
      var th = s.unfold * (Math.PI / 2);
      var cth = Math.cos(th), sth = Math.sin(th);
      var c2 = Math.cos(2 * th), s2 = Math.sin(2 * th);

      /* Exact 6 hinged faces of the rectangular prism */
      var backTopY = h * cth, backTopZ = -hz - h * sth;
      var topFarY = backTopY + s.w * s2, topFarZ = backTopZ + s.w * c2;
      var alpha = s.unfold < 0.15 ? 0.96 : 0.84;
      var faces = [
        { name: "Bottom", area: s.l * s.w, fill: "rgba(16,185,129," + alpha + ")", stroke: "#059669",
          pts: [[-hx, 0, -hz], [hx, 0, -hz], [hx, 0, hz], [-hx, 0, hz]] },
        { name: "Front", area: s.l * s.h, fill: "rgba(59,130,246," + alpha + ")", stroke: "#2563EB",
          pts: [[-hx, 0, hz], [hx, 0, hz], [hx, h * cth, hz + h * sth], [-hx, h * cth, hz + h * sth]] },
        { name: "Back", area: s.l * s.h, fill: "rgba(37,99,235," + alpha + ")", stroke: "#1D4ED8",
          pts: [[hx, 0, -hz], [-hx, 0, -hz], [-hx, backTopY, backTopZ], [hx, backTopY, backTopZ]] },
        { name: "Top", area: s.l * s.w, fill: "rgba(52,211,153," + alpha + ")", stroke: "#047857",
          pts: [[-hx, backTopY, backTopZ], [hx, backTopY, backTopZ], [hx, topFarY, topFarZ], [-hx, topFarY, topFarZ]] },
        { name: "Left", area: s.w * s.h, fill: "rgba(236,72,153," + alpha + ")", stroke: "#BE185D",
          pts: [[-hx, 0, -hz], [-hx, 0, hz], [-hx - h * sth, h * cth, hz], [-hx - h * sth, h * cth, -hz]] },
        { name: "Right", area: s.w * s.h, fill: "rgba(219,39,119," + alpha + ")", stroke: "#DB2777",
          pts: [[hx, 0, hz], [hx, 0, -hz], [hx + h * sth, h * cth, -hz], [hx + h * sth, h * cth, hz]] }
      ];

      var drawList = faces.map(function (f) {
        var rpts = f.pts.map(rot3);
        var ppts = rpts.map(proj);
        var avgZ = (rpts[0][2] + rpts[1][2] + rpts[2][2] + rpts[3][2]) / 4;
        var cx = (ppts[0][0] + ppts[1][0] + ppts[2][0] + ppts[3][0]) / 4;
        var cy = (ppts[0][1] + ppts[1][1] + ppts[2][1] + ppts[3][1]) / 4;
        return { f: f, ppts: ppts, avgZ: avgZ, cx: cx, cy: cy };
      }).sort(function (a, b) { return a.avgZ - b.avgZ; });

      drawList.forEach(function (item) {
        var p = item.ppts;
        ctx.beginPath();
        ctx.moveTo(p[0][0], p[0][1]);
        ctx.lineTo(p[1][0], p[1][1]);
        ctx.lineTo(p[2][0], p[2][1]);
        ctx.lineTo(p[3][0], p[3][1]);
        ctx.closePath();
        ctx.fillStyle = item.f.fill;
        ctx.fill();
        ctx.lineWidth = 2.4;
        ctx.strokeStyle = dark ? "#E2E8F0" : "#0F172A";
        ctx.stroke();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 15px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.f.area + " u²", item.cx, item.cy);
      });
    }

    cv.addEventListener("pointerdown", function (e) {
      s.dragging = true; s.lx = e.clientX; s.ly = e.clientY;
      try { cv.setPointerCapture(e.pointerId); } catch (err) {}
    });
    cv.addEventListener("pointermove", function (e) {
      if (!s.dragging) return;
      s.yaw += (e.clientX - s.lx) * 0.012;
      s.pitch = Math.max(-1.25, Math.min(1.42, s.pitch + (e.clientY - s.ly) * 0.012));
      s.lx = e.clientX; s.ly = e.clientY;
      draw3D();
    });
    cv.addEventListener("pointerup", function () { s.dragging = false; });
    cv.addEventListener("pointercancel", function () { s.dragging = false; });

    stage.oninput = function (e) {
      var k = e.target && e.target.getAttribute && e.target.getAttribute("data-p3");
      if (!k) return;
      if (k === "unfold") s.unfold = (+e.target.value) / 100;
      else s[k] = +e.target.value;
      markLabDone("prism3d");
      updateReadout();
      draw3D();
    };
    stage.onclick = function (e) {
      if (!e.target.closest("[data-p3-anim]")) return;
      if (s.animRaf) cancelAnimationFrame(s.animRaf);
      var target = s.unfold > 0.5 ? 0 : 1;
      var targetPitch = target === 1 ? 1.15 : 0.46;
      var startU = s.unfold, startP = s.pitch, t0 = performance.now();
      markLabDone("prism3d");
      function step(now) {
        var t = Math.min(1, (now - t0) / 700);
        var ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        s.unfold = startU + (target - startU) * ease;
        s.pitch = startP + (targetPitch - startP) * ease;
        var rng = stage.querySelector('[data-p3="unfold"]');
        if (rng) rng.value = String(Math.round(s.unfold * 100));
        updateReadout();
        draw3D();
        if (t < 1) s.animRaf = requestAnimationFrame(step);
      }
      s.animRaf = requestAnimationFrame(step);
    };

    updateReadout();
    draw3D();
  }

  /* Main Interactive Labs Launcher */
  function openLabs(body, startTab) {
    if (!body) return;
    var tab = startTab || "balance";
    var TABS = [
      { id: "balance", lbl: "⚖️ Algebra Balance" },
      { id: "prism3d", lbl: "🧊 3D Prism & Net" },
      { id: "slope", lbl: "📈 Slope Explorer" },
      { id: "geom", lbl: "📐 Circles & Angles" },
      { id: "sci", lbl: "🧬 Genetics & Food Web" }
    ];
    function mount() {
      body.innerHTML =
        '<div class="hs lab-wrap">' +
          '<div class="fc-decks" role="tablist" aria-label="Interactive STEM Labs">' +
            TABS.map(function (t) {
              return '<button type="button" class="fc-pill' + (t.id === tab ? " on" : "") + '" data-lab-tab="' + t.id + '">' + t.lbl + "</button>";
            }).join("") +
          '</div><div id="lab-stage"></div></div>';
      var stage = body.querySelector("#lab-stage");
      if (tab === "balance") renderBalanceLab(stage);
      else if (tab === "prism3d") renderPrism3DLab(stage);
      else if (tab === "slope") renderSlopeLab(stage);
      else if (tab === "geom") renderGeomLab(stage);
      else renderSciLab(stage);
    }
    body.onclick = function (e) {
      var tb = e.target.closest("[data-lab-tab]");
      if (tb) { tab = tb.getAttribute("data-lab-tab"); mount(); }
    };
    mount();
  }

  /* =========================================================================
     5. INTERACTIVE NEW YORK HISTORY MAP & PRIMARY SOURCE EXPLORER (7.1–7.8)
     ========================================================================= */
  var NY_PINS = [
    {
      id: "onondaga", x: 218, y: 122, name: "Onondaga", era: "7.1 · Haudenosaunee Confederacy",
      quote: "\"We bind ourselves together by taking hold of each other's hands so firmly and forming a circle so strong that if a tree should fall upon it, it could not shake nor break it.\" — Great Law of Peace",
      summary: "Keepers of the Central Council Fire at the heart of the Five (later Six) Nations. Clan mothers selected and could remove leaders, influencing democratic ideas in North America.",
      q: "Why was Onondaga called the 'Keepers of the Central Fire'?",
      a: "It was the geographic center where the Grand Council met.",
      w: ["It was the southernmost Dutch port on the Atlantic.", "It was where the Erie Canal emptied into Lake Erie."]
    },
    {
      id: "nyc", x: 322, y: 244, name: "New Amsterdam / NYC", era: "7.2 & 7.5 · 1664 & 1789",
      quote: "\"I do solemnly swear that I will faithfully execute the Office of President of the United States.\" — George Washington, Federal Hall NYC, April 30, 1789",
      summary: "Founded as Dutch New Amsterdam, renamed New York by the English in 1664, site of the 1735 Zenger free-press trial, and the first U.S. capital where Washington was inaugurated.",
      q: "What milestone happened at Federal Hall in New York City in 1789?",
      a: "George Washington was inaugurated as the first U.S. President.",
      w: ["The British surrendered at the end of the Revolution.", "The Erie Canal officially opened to Lake Erie."]
    },
    {
      id: "saratoga", x: 316, y: 126, name: "Saratoga", era: "7.3 · Turning Point (1777)",
      quote: "\"This victory has proved to Europe that America can stand and defeat Britain's finest armies.\" — Continental Congress dispatch, 1777",
      summary: "British General Burgoyne surrendered his army in upstate New York in October 1777 — the turning point that convinced France to enter the Revolution as America's ally.",
      q: "How did the Battle of Saratoga (1777) change the Revolutionary War?",
      a: "It convinced France to join the war on the American side.",
      w: ["It ended the Civil War in the North.", "It forced the Dutch to leave Manhattan."]
    },
    {
      id: "erie", x: 266, y: 146, name: "Erie Canal", era: "7.6 · Empire State (1825)",
      quote: "\"As a bond of union between the Atlantic and the western seas, this waterway will enrich every village along its banks.\" — Gov. DeWitt Clinton, 1825",
      summary: "Completed in 1825 from Albany on the Hudson to Buffalo on Lake Erie, slashing shipping costs by 90% and making New York City the busiest port in the United States.",
      q: "Which two waterways did the Erie Canal connect in 1825?",
      a: "The Hudson River and Lake Erie",
      w: ["The Mississippi River and the Gulf of Mexico", "Boston Harbor and Chesapeake Bay"]
    },
    {
      id: "seneca", x: 174, y: 152, ly: 23, name: "Seneca Falls", era: "7.7 · Women's Rights (1848)",
      quote: "\"We hold these truths to be self-evident: that all men and women are created equal.\" — Declaration of Sentiments, Seneca Falls, 1848",
      summary: "Organized by Elizabeth Cady Stanton and Lucretia Mott in upstate New York, launching the organized American women's rights and suffrage movement.",
      q: "Which famous document was written at the 1848 Seneca Falls Convention?",
      a: "The Declaration of Sentiments",
      w: ["The Articles of Confederation", "The Mayflower Compact"]
    },
    {
      id: "rochester", x: 134, y: 118, name: "Rochester", era: "7.7 · Abolition & The North Star",
      quote: "\"Right is of no Sex — Truth is of no Color — God is the Father of us all, and we are all brethren.\" — Frederick Douglass, The North Star masthead",
      summary: "Frederick Douglass published his abolitionist newspaper The North Star in Rochester and helped freedom seekers cross Lake Ontario on the Underground Railroad.",
      q: "What was the name of Frederick Douglass's antislavery newspaper published in Rochester?",
      a: "The North Star",
      w: ["Common Sense", "The Federalist Papers"]
    }
  ];

  function openNyMap(body) {
    if (!body) return;
    var activeId = "onondaga";
    var fbText = "", fbOk = false;

    function draw() {
      var doneMap = getMapDone();
      var doneCount = Object.keys(doneMap).length;
      var pin = NY_PINS.filter(function (p) { return p.id === activeId; })[0] || NY_PINS[0];
      var choices = [pin.a].concat(pin.w).sort();

      var pinsSvg = NY_PINS.map(function (p) {
        var on = p.id === activeId, dn = !!doneMap[p.id];
        return '<g class="nym-pin' + (on ? " on" : "") + (dn ? " dn" : "") + '" data-nym-pin="' + p.id + '" style="cursor:pointer">' +
          '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + (on ? 12 : 9) + '" fill="' + (dn ? "#10B981" : on ? "#EC4899" : "#3B82F6") + '" stroke="#fff" stroke-width="2.5"/>' +
          '<text x="' + p.x + '" y="' + (p.y + (p.ly || -15)) + '" text-anchor="middle" font-size="10.5" font-weight="800" fill="currentColor">' + esc(p.name) + (dn ? " ✓" : "") + "</text></g>";
      }).join("");

      body.innerHTML =
        '<div class="hs nym-wrap">' +
          '<div class="lab-card">' +
            '<div class="lab-hdr"><div><h3>🗺️ Interactive New York History Map</h3><p>Tap any landmark on the map to read its primary source and beat its check-in question.</p></div>' +
            '<span class="hs-mode-pill">' + doneCount + " / " + NY_PINS.length + " Landmarks Mastered</span></div>" +
            '<div class="lab-svg-box">' +
              '<svg viewBox="0 0 420 275" aria-label="Interactive historical map of New York State">' +
                /* Stylized New York State outline + Long Island */
                '<path d="M 62 152 L 96 116 L 160 112 L 222 86 L 266 36 L 326 30 L 336 112 L 342 198 L 328 242 L 310 236 L 288 188 L 242 178 L 122 176 L 62 168 Z" fill="rgba(16,185,129,.12)" stroke="#10B981" stroke-width="2.5" stroke-linejoin="round"/>' +
                '<path d="M 326 244 L 396 226 L 392 240 L 328 254 Z" fill="rgba(16,185,129,.12)" stroke="#10B981" stroke-width="2"/>' +
                /* Erie Canal & Hudson River blue lines */
                '<path d="M 78 148 Q 165 130 318 144" fill="none" stroke="#38BDF8" stroke-width="3.5" stroke-dasharray="6 4"/>' +
                '<path d="M 318 118 L 322 242" fill="none" stroke="#38BDF8" stroke-width="3.5"/>' +
                '<text x="190" y="164" font-size="9.5" font-weight="700" fill="#38BDF8">Erie Canal (1825)</text>' +
                '<text x="352" y="190" font-size="9.5" font-weight="700" fill="#38BDF8">Hudson R.</text>' +
                pinsSvg +
              "</svg>" +
            "</div>" +
            '<div class="fc-decks" style="margin:6px 0 12px">' + NY_PINS.map(function (p) {
              var on = p.id === activeId, dn = !!doneMap[p.id];
              return '<button type="button" class="fc-pill' + (on ? " on" : "") + '" data-nym-pin="' + p.id + '">' + (dn ? "✓ " : "📍 ") + esc(p.name) + "</button>";
            }).join("") + "</div>" +
            '<div class="nym-detail">' +
              '<span class="rl-tag">' + esc(pin.era) + "</span>" +
              '<h4>' + esc(pin.name) + "</h4>" +
              '<blockquote class="hs-pass">' + esc(pin.quote) + "</blockquote>" +
              '<p>' + esc(pin.summary) + "</p>" +
              '<div class="nym-quiz"><p class="hs-q">' + esc(pin.q) + '</p><div class="hs-mc">' +
                choices.map(function (c) {
                  return '<button type="button" class="hs-choice" data-nym-ans="' + esc(c) + '">' + esc(c) + "</button>";
                }).join("") +
              '</div>' + (fbText ? '<p class="hs-fb ' + (fbOk ? "ok" : "no") + '">' + esc(fbText) + "</p>" : "") + "</div>" +
            "</div>" +
          "</div>" +
        "</div>";
    }

    body.onclick = function (e) {
      var pEl = e.target.closest("[data-nym-pin]");
      if (pEl) { activeId = pEl.getAttribute("data-nym-pin"); fbText = ""; draw(); return; }
      var aEl = e.target.closest("[data-nym-ans]");
      if (aEl) {
        var pin = NY_PINS.filter(function (p) { return p.id === activeId; })[0];
        var val = aEl.getAttribute("data-nym-ans");
        if (val === pin.a) {
          markMapPin(pin.id);
          fbOk = true;
          fbText = "✓ Correct! " + pin.name + " mastered on your NY History Map!";
        } else {
          fbOk = false;
          fbText = "Not quite — re-read the primary source quote above and try again!";
        }
        draw();
      }
    };
    draw();
  }

  window.HootStudyLabs = {
    openLabs: openLabs,
    openNyMap: openNyMap,
    getLabsDone: getLabsDone,
    getMapDone: getMapDone,
    NY_PINS_COUNT: NY_PINS.length
  };
})();
