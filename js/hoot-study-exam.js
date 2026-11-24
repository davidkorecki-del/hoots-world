/* Hoot Study Exam (Grade 7 NY Teen Suite — kidc only).
   1. Official-Style NY Grade 7 2-Session CBT State Exam Simulator:
      - Session 1 (Non-Calculator, 6 questions) + Session 2 (Calculator Unlocked, 8 questions)
      - Question Navigator Strip, Flag for Review, MC Cross-Out Eliminator, Scratchpad & Reference
      - NY Performance Level Band (Level 1–4) + Standards Breakdown + Mistake Vault sync
   2. Daily 90-Second Cross-Subject Brain Warm-Up (1 Math · 1 ELA · 1 Science/NY History) */
(function () {
  "use strict";

  var EXAMS_KEY = "hootworld.hs.exams.v1";
  var DAILY_KEY = "hootworld.hs.daily.v1";

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

  /* =========================================================================
     1. NY GRADE 7 2-SESSION COMPUTER-BASED EXAM SIMULATOR (NYSED FORMAT)
     ========================================================================= */
  var S1_IDS = ["m7-int-add", "m7-int-mul", "m7-rationals", "m7-like-terms", "m7-distribute", "m7-unit-rate"];
  var S2_IDS = ["m7-proportional", "m7-percent-of", "m7-tax-tip-discount", "m7-two-step", "m7-circles", "m7-angles", "m7-prism-volume", "m7-compound-prob", "m7-data-stats"];

  function buildSessionProblems(ids, count) {
    var HS = window.HootStudy;
    if (!HS || !HS.lessons) return [];
    var pool = ids.map(function (id) {
      return HS.lessons.filter(function (l) { return l.id === id; })[0];
    }).filter(Boolean);
    var out = [];
    for (var i = 0; i < count && pool.length; i++) {
      var l = pool[i % pool.length];
      if (l.newRun) l.newRun();
      var p = l.gen();
      p._std = (l.std || "NY 7").split(",")[0].trim();
      p._lesson = l;
      out.push(p);
    }
    return out;
  }

  function recordExam(score, total, level) {
    var all = loadJ(EXAMS_KEY), kid = activeKid();
    var list = all[kid] || [];
    list.unshift({ ts: Date.now(), score: score, total: total, level: level });
    all[kid] = list.slice(0, 20);
    saveJ(EXAMS_KEY, all);
  }
  function getExams(kid) {
    return loadJ(EXAMS_KEY)[kid || activeKid()] || [];
  }

  function openNyExam(body) {
    if (!body || !window.HootStudy) return;
    if (window.HootStudy.stop) window.HootStudy.stop();

    var s1 = buildSessionProblems(S1_IDS, 6);
    var s2 = buildSessionProblems(S2_IDS, 8);
    var state = {
      phase: "s1", /* s1 | break | s2 | results */
      idx: 0,
      ans1: {}, ans2: {},
      flags1: {}, flags2: {},
      xout1: {}, xout2: {},
      t0: Date.now()
    };

    function curList() { return state.phase === "s1" ? s1 : s2; }
    function curAns() { return state.phase === "s1" ? state.ans1 : state.ans2; }
    function curFlags() { return state.phase === "s1" ? state.flags1 : state.flags2; }
    function curXout() { return state.phase === "s1" ? state.xout1 : state.xout2; }

    function gradeAll() {
      var allP = s1.concat(s2);
      var allA = [];
      for (var i = 0; i < s1.length; i++) allA.push(state.ans1[i]);
      for (var j = 0; j < s2.length; j++) allA.push(state.ans2[j]);

      var okCount = 0, stdMap = {}, misses = [];
      allP.forEach(function (p, k) {
        var userVal = allA[k];
        var isRight = userVal !== undefined && userVal !== "" && window.HootStudy.correct(p, userVal) === true;
        var st = p._std || "NY 7";
        stdMap[st] = stdMap[st] || { ok: 0, tot: 0 };
        stdMap[st].tot++;
        if (isRight) { okCount++; stdMap[st].ok++; }
        else { misses.push({ p: p, given: userVal }); }
      });

      var pct = Math.round((okCount / Math.max(1, allP.length)) * 100);
      var level = pct >= 85 ? 4 : pct >= 70 ? 3 : pct >= 50 ? 2 : 1;
      var levelLabels = {
        4: "Level 4 · Excels in NY Grade 7 Standards 🏆",
        3: "Level 3 · Proficient in NY Grade 7 Standards ✅",
        2: "Level 2 · Partially Proficient — Review flagged standards 📈",
        1: "Level 1 · Building Foundations — Start with Mistake Vault 🎯"
      };
      recordExam(okCount, allP.length, level);

      /* Save missed questions to Mistake Vault store cleanly */
      try {
        var vAll = loadJ("hootworld.hs.vault.v1"), kid = activeKid();
        var vList = vAll[kid] || [];
        misses.forEach(function (m) {
          var p = m.p;
          if (vList.some(function (x) { return x.q === p.q; })) return;
          vList.unshift({
            q: p.q, type: p.type, ans: p.ans, choices: p.choices || null, unit: p.unit || "",
            steps: p.steps || [], hints: p.hints || [], vis: p.vis || null,
            lessonTitle: (p._lesson && p._lesson.title) || "NY Exam", std: p._std || "NY 7", course: "math7"
          });
        });
        vAll[kid] = vList.slice(0, 30);
        saveJ("hootworld.hs.vault.v1", vAll);
        window.dispatchEvent(new CustomEvent("hoot-vault-change"));
      } catch (e) {}

      var mins = Math.max(1, Math.round((Date.now() - state.t0) / 60000));
      var stdRows = Object.keys(stdMap).map(function (st) {
        var r = stdMap[st], sp = Math.round((r.ok / Math.max(1, r.tot)) * 100);
        return '<div class="hs-stdr"><span><b>' + esc(st) + '</b></span><span class="hs-stdbar"><i style="width:' + sp + "%;background:" + (sp >= 80 ? "#16A34A" : sp >= 50 ? "#F59E0B" : "#DC2626") + '"></i></span><span>' + r.ok + "/" + r.tot + "</span></div>";
      }).join("");

      body.innerHTML =
        '<div class="hs cbt-wrap">' +
          '<section class="hs-card">' +
            '<span class="hs-mode-pill">🏛️ NY Grade 7 CBT State Exam Report</span>' +
            '<h3>' + okCount + " of " + allP.length + " (" + pct + "%) · " + mins + " min</h3>" +
            '<div class="cbt-lvl l' + level + '"><b>' + esc(levelLabels[level]) + "</b></div>" +
            '<div class="hs-std-grid"><h4>NY Grade 7 Standards Breakdown</h4>' + stdRows + "</div>" +
            (misses.length
              ? '<h4>Review Missed Items (' + misses.length + ' saved to Mistake Vault)</h4>' +
                misses.map(function (m) {
                  return '<div class="hs-miss"><p class="hs-q">' + esc(m.p.q) + '</p>' +
                    '<ol class="hs-sol">' + (m.p.steps || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div>";
                }).join("")
              : '<p class="hs-verdict ok">🎉 Perfect score across both Session 1 &amp; Session 2!</p>') +
            '<div class="hs-end"><button type="button" class="hs-btn pri" data-cbt="restart">↻ Take Another NY Exam</button></div>' +
          "</section>" +
        "</div>";
    }

    function draw() {
      if (state.phase === "results") { gradeAll(); return; }
      if (state.phase === "break") {
        body.innerHTML =
          '<div class="hs cbt-wrap">' +
            '<section class="hs-card" style="text-align:center;padding:28px 20px">' +
              '<span class="hs-mode-pill">✓ Session 1 Submitted (Non-Calculator)</span>' +
              '<h3>Take a 10-second breather!</h3>' +
              '<p>Awesome focus on Session 1! Up next is <b>Session 2 (8 Questions)</b> — your <b>🧮 NY Grade 7 Calculator</b> and <b>📖 Reference Sheet</b> are now unlocked.</p>' +
              '<button type="button" class="hs-btn pri" data-cbt="start-s2">Start Session 2 (Calculator Unlocked) ▶</button>' +
            "</section>" +
          "</div>";
        return;
      }

      var list = curList(), ans = curAns(), flags = curFlags(), xout = curXout();
      var p = list[state.idx], isS1 = state.phase === "s1";
      var curVal = ans[state.idx];
      var isFlagged = !!flags[state.idx];
      var vis = window.HootStudyVisuals && p.vis ? window.HootStudyVisuals.render(p._lesson, p, { reveal: false }) : "";

      var navHtml = list.map(function (_, i) {
        var hasA = ans[i] !== undefined && ans[i] !== "";
        var fl = !!flags[i];
        return '<button type="button" class="cbt-qbtn' + (i === state.idx ? " now" : "") + (hasA ? " ans" : "") + (fl ? " flg" : "") + '" data-cbt-jump="' + i + '">' +
          (i + 1) + (fl ? "🚩" : "") + "</button>";
      }).join("");

      var inputHtml = "";
      if (p.type === "mc") {
        var xMap = xout[state.idx] || {};
        inputHtml = '<div class="hs-mc">' + p.choices.map(function (c, ci) {
          var sel = String(curVal) === String(ci);
          var struck = !!xMap[ci];
          return '<div class="cbt-mc-row">' +
            '<button type="button" class="hs-choice' + (sel ? " cbt-sel" : "") + (struck ? " cbt-xout" : "") + '" data-cbt-mc="' + ci + '">' + esc(c) + "</button>" +
            '<button type="button" class="cbt-cut' + (struck ? " on" : "") + '" data-cbt-xout="' + ci + '" title="Cross out choice" aria-label="Cross out option ' + (ci + 1) + '">✂️</button>' +
          "</div>";
        }).join("") + "</div>";
      } else {
        inputHtml = '<div class="hs-form">' +
          '<input class="hs-in" id="cbt-num-in" inputmode="decimal" autocomplete="off" value="' + esc(curVal == null ? "" : curVal) + '" placeholder="Type your answer' + (p.unit ? " (" + esc(p.unit) + ")" : "") + '">' +
          '<div class="hs-qbar"><button type="button" class="hs-sym" data-cbt-sym="-">−</button><button type="button" class="hs-sym" data-cbt-sym="/">/</button><button type="button" class="hs-sym" data-cbt-sym=".">.</button></div>' +
        "</div>";
      }

      body.innerHTML =
        '<div class="hs cbt-wrap">' +
          '<div class="hs-toprow">' +
            '<span class="hs-mode-pill">' + (isS1 ? "🧠 Session 1 · Non-Calculator" : "🧮 Session 2 · Calculator Allowed") + "</span>" +
            '<div class="hs-tools">' +
              '<button type="button" class="hs-tool" data-cbt-tool="pad">✏️ Scratchpad</button>' +
              '<button type="button" class="hs-tool" data-cbt-tool="calc">' + (isS1 ? "🔒 No Calc" : "🧮 Calculator") + "</button>" +
              '<button type="button" class="hs-tool" data-cbt-tool="ref">📖 Reference</button>' +
            "</div>" +
          "</div>" +
          '<div class="hs-drawer" id="cbt-ref" hidden>' + (window.HootStudyVisuals ? window.HootStudyVisuals.referenceHtml("math7") : "") + "</div>" +
          '<div class="hs-drawer" id="cbt-pad" hidden></div>' +
          '<div class="hs-drawer" id="cbt-calc" hidden></div>' +
          '<div class="cbt-nav" aria-label="Question navigator">' + navHtml + "</div>" +
          '<section class="hs-card">' +
            '<div class="cbt-qhead"><span class="hs-count">Question ' + (state.idx + 1) + " of " + list.length + " · " + esc(p._std) + '</span>' +
            '<button type="button" class="cbt-flag' + (isFlagged ? " on" : "") + '" data-cbt="flag">' + (isFlagged ? "🚩 Flagged" : "🏳️ Flag for review") + "</button></div>" +
            '<p class="hs-q">' + esc(p.q) + "</p>" +
            vis + inputHtml +
            '<div class="cbt-foot">' +
              '<button type="button" class="hs-btn sm" data-cbt="prev"' + (state.idx === 0 ? " disabled" : "") + ">◀ Previous</button>" +
              (state.idx < list.length - 1
                ? '<button type="button" class="hs-btn pri sm" data-cbt="next">Next ▶</button>'
                : '<button type="button" class="hs-btn pri sm" data-cbt="submit">' + (isS1 ? "Submit Session 1 ▶" : "Finish & Grade Exam 🏆") + "</button>") +
            "</div>" +
          "</section>" +
        "</div>";
    }

    function saveNum() {
      var inp = body.querySelector("#cbt-num-in");
      if (inp) curAns()[state.idx] = inp.value.trim();
    }

    body.oninput = function (e) {
      if (e.target && e.target.id === "cbt-num-in") curAns()[state.idx] = e.target.value.trim();
    };
    body.onclick = function (e) {
      var tool = e.target.closest("[data-cbt-tool]");
      if (tool) {
        var tk = tool.getAttribute("data-cbt-tool");
        var dr = body.querySelector("#cbt-" + tk);
        if (dr) {
          dr.hidden = !dr.hidden;
          tool.classList.toggle("on", !dr.hidden);
          if (tk === "pad" && !dr.hidden && !dr.querySelector("canvas") && window.HootStudyVisuals) window.HootStudyVisuals.mountScratchpad(dr);
          if (tk === "calc" && !dr.hidden && !dr.firstElementChild && window.HootStudyPro) {
            window.HootStudyPro.mountCalculator(dr, { lessonId: state.phase === "s1" ? "m7-int-add" : "m7-circles" });
          }
        }
        return;
      }
      var sym = e.target.closest("[data-cbt-sym]");
      if (sym) {
        var inp = body.querySelector("#cbt-num-in");
        if (inp) {
          var s = sym.getAttribute("data-cbt-sym");
          inp.value = s === "-" ? (inp.value.indexOf("-") === 0 ? inp.value.slice(1) : "-" + inp.value) : inp.value + s;
          curAns()[state.idx] = inp.value.trim();
          inp.focus();
        }
        return;
      }
      var jmp = e.target.closest("[data-cbt-jump]");
      if (jmp) { saveNum(); state.idx = +jmp.getAttribute("data-cbt-jump"); draw(); return; }
      var mc = e.target.closest("[data-cbt-mc]");
      if (mc) { curAns()[state.idx] = +mc.getAttribute("data-cbt-mc"); draw(); return; }
      var xo = e.target.closest("[data-cbt-xout]");
      if (xo) {
        var ci = +xo.getAttribute("data-cbt-xout");
        curXout()[state.idx] = curXout()[state.idx] || {};
        curXout()[state.idx][ci] = !curXout()[state.idx][ci];
        draw();
        return;
      }
      var act = e.target.closest("[data-cbt]");
      if (!act) return;
      var k = act.getAttribute("data-cbt");
      if (k === "flag") { curFlags()[state.idx] = !curFlags()[state.idx]; draw(); }
      else if (k === "prev") { saveNum(); state.idx = Math.max(0, state.idx - 1); draw(); }
      else if (k === "next") { saveNum(); state.idx = Math.min(curList().length - 1, state.idx + 1); draw(); }
      else if (k === "submit") { saveNum(); state.phase = state.phase === "s1" ? "break" : "results"; state.idx = 0; draw(); }
      else if (k === "start-s2") { state.phase = "s2"; state.idx = 0; draw(); }
      else if (k === "restart") { openNyExam(body); }
    };

    draw();
  }

  /* =========================================================================
     2. DAILY 90-SECOND CROSS-SUBJECT BRAIN WARM-UP (1 Math · 1 ELA · 1 Sci/SS)
     ========================================================================= */
  function dailyInfo(kid) {
    var all = loadJ(DAILY_KEY), rec = all[kid || activeKid()] || { dates: [] };
    var tk = todayKey();
    return { doneToday: rec.dates.indexOf(tk) >= 0, totalDays: rec.dates.length };
  }
  function markDailyDone() {
    var all = loadJ(DAILY_KEY), kid = activeKid(), tk = todayKey();
    var rec = all[kid] || { dates: [] };
    if (rec.dates.indexOf(tk) < 0) rec.dates.push(tk);
    all[kid] = rec;
    saveJ(DAILY_KEY, all);
  }
  function openDailyWarmup(body) {
    if (!body || !window.HootStudy || !window.HootStudy.lessons) return;
    var tk = todayKey();
    var seed = 0;
    for (var i = 0; i < tk.length; i++) seed = (seed * 31 + tk.charCodeAt(i)) >>> 0;

    function pickCourse(cid, offset) {
      var list = window.HootStudy.lessons.filter(function (l) {
        return (l.course || "math7") === cid && l.id.indexOf("-review") < 0 && !l.isWorkshop;
      });
      if (!list.length) return null;
      var l = list[(seed + offset) % list.length];
      if (l.newRun) l.newRun();
      var p = l.gen();
      p._lesson = l; p._std = l.std;
      return p;
    }

    var probs = [
      pickCourse("math7", 0),
      pickCourse("ela7", 3),
      pickCourse(seed % 2 === 0 ? "sci7" : "ss7", 7)
    ].filter(Boolean);

    markDailyDone();
    window.HootStudy.play({
      id: "daily-warmup", title: "Daily 90-Second Brain Warm-Up", std: tk,
      subject: "1 Math · 1 ELA · 1 Science/NY History", course: "math7", again: "fresh sprint"
    }, body, {
      problems: probs, modeTag: "daily",
      stepsLabel: "⚡ Daily 90-Second Brain Warm-Up · " + tk,
      skipRecord: true, silentIntro: true
    });
  }

  window.HootStudyExam = {
    openNyExam: openNyExam,
    getExams: getExams,
    openDailyWarmup: openDailyWarmup,
    dailyInfo: dailyInfo
  };
})();
