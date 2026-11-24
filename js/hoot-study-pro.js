/* Hoot Study Pro (Grade 7 NY Teen Suite — kidc only).
   Provides:
   1. Scientific / Fraction Calculator Drawer (NY Session 1 non-calc vs Session 2 calc aware)
   2. 3D Spaced-Repetition Flashcards across Math, ELA, Science & NY History
   3. Focus Study Timer (15m/25m/5m) + pure offline WebAudio Rain / Brown Noise ambient sound
   4. Saved CER Writing Portfolio store
   5. Grade 7 Interactive Reading & Writing Lab (tap-to-define inline vocabulary)
   6. NY Grade 7 Mastery Transcript & Printable Quarterly Report */
(function () {
  "use strict";

  var CARDS_KEY = "hootworld.hs.cards.v1";
  var CUSTOM_CARDS_KEY = "hootworld.hs.customcards.v1";
  var MATCH_BEST_KEY = "hootworld.hs.matchbest.v1";
  var PINS_KEY = "hootworld.hs.pins.v1";
  var CER_KEY = "hootworld.hs.cer.v1";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function activeKid() {
    try { return (window.__llState && window.__llState()) || "kidc"; } catch (e) { return "kidc"; }
  }
  function loadJ(k) {
    try { return JSON.parse(localStorage.getItem(k) || "{}") || {}; } catch (e) { return {}; }
  }
  function saveJ(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
  }

  /* =========================================================================
     1. SCIENTIFIC / FRACTION CALCULATOR DRAWER (NY Grade 7 Exam-Aware)
     ========================================================================= */
  var NON_CALC = { "m7-int-add": 1, "m7-int-mul": 1, "m7-rationals": 1 };

  function isCalcLocked(lessonId) {
    return !!(lessonId && NON_CALC[lessonId]);
  }

  function safeEvalExpr(expr) {
    var s = String(expr || "").trim()
      .replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-")
      .replace(/π/g, "3.1415926535");
    if (!s || /[^0-9+\-*/().\s]/.test(s)) return null;
    try {
      var val = Function('"use strict"; return (' + s + ");")();
      if (typeof val !== "number" || !isFinite(val)) return null;
      return Math.round(val * 1000000) / 1000000;
    } catch (e) {
      return null;
    }
  }

  function mountCalculator(host, opts) {
    if (!host) return;
    opts = opts || {};
    if (isCalcLocked(opts.lessonId)) {
      host.innerHTML =
        '<div class="hs-calc-lock">' +
        '<b>🧠 NY Grade 7 Session 1 — Mental Math Skill</b>' +
        '<p>Just like Session 1 of the NY State Math Test, calculators are paused on signed-number arithmetic so your brain builds fast fluency. Use the <b>✏️ Scratchpad</b> to sketch a number line!</p>' +
        "</div>";
      return;
    }
    var expr = "", lastVal = "";
    host.innerHTML =
      '<div class="hs-calc">' +
        '<div class="hs-calc-head"><span>🧮 NY Grade 7 Calculator</span>' +
        '<button type="button" class="hs-calc-ins" data-calc="insert" title="Insert result into answer box">Insert →</button></div>' +
        '<div class="hs-calc-scr" aria-live="polite"><small class="hs-calc-expr"></small><strong class="hs-calc-val">0</strong></div>' +
        '<div class="hs-calc-grid">' +
          '<button type="button" class="hc-fn" data-calc="C">C</button>' +
          '<button type="button" class="hc-fn" data-calc="(">(</button>' +
          '<button type="button" class="hc-fn" data-calc=")">)</button>' +
          '<button type="button" class="hc-op" data-calc="÷">÷</button>' +
          '<button type="button" data-calc="7">7</button>' +
          '<button type="button" data-calc="8">8</button>' +
          '<button type="button" data-calc="9">9</button>' +
          '<button type="button" class="hc-op" data-calc="×">×</button>' +
          '<button type="button" data-calc="4">4</button>' +
          '<button type="button" data-calc="5">5</button>' +
          '<button type="button" data-calc="6">6</button>' +
          '<button type="button" class="hc-op" data-calc="−">−</button>' +
          '<button type="button" data-calc="1">1</button>' +
          '<button type="button" data-calc="2">2</button>' +
          '<button type="button" data-calc="3">3</button>' +
          '<button type="button" class="hc-op" data-calc="+">+</button>' +
          '<button type="button" class="hc-fn" data-calc="π">π</button>' +
          '<button type="button" data-calc="0">0</button>' +
          '<button type="button" data-calc=".">.</button>' +
          '<button type="button" class="hc-eq" data-calc="=">=</button>' +
          '<button type="button" class="hc-fn" data-calc="±">±</button>' +
          '<button type="button" class="hc-fn" data-calc="sq">x²</button>' +
          '<button type="button" class="hc-fn" data-calc="pi314">3.14</button>' +
          '<button type="button" class="hc-fn" data-calc="bk">⌫</button>' +
        "</div>" +
      "</div>";

    var exprEl = host.querySelector(".hs-calc-expr");
    var valEl = host.querySelector(".hs-calc-val");
    function paint() {
      exprEl.textContent = expr || "";
      valEl.textContent = lastVal !== "" ? lastVal : (expr || "0");
    }
    host.onclick = function (e) {
      var b = e.target.closest("[data-calc]");
      if (!b) return;
      var k = b.getAttribute("data-calc");
      if (k === "C") { expr = ""; lastVal = ""; paint(); return; }
      if (k === "bk") { expr = expr.slice(0, -1); lastVal = ""; paint(); return; }
      if (k === "pi314") { expr += "3.14"; lastVal = ""; paint(); return; }
      if (k === "±") {
        var cur = safeEvalExpr(expr || lastVal);
        if (cur != null) { expr = String(-cur); lastVal = expr; }
        else if (expr.indexOf("-") === 0) expr = expr.slice(1);
        else expr = "-" + expr;
        paint();
        return;
      }
      if (k === "sq") {
        var n = safeEvalExpr(expr || lastVal);
        if (n != null) {
          var sq = Math.round(n * n * 1000000) / 1000000;
          expr = "(" + (expr || lastVal) + ")²";
          lastVal = String(sq);
          paint();
          expr = String(sq);
        }
        return;
      }
      if (k === "=") {
        var r = safeEvalExpr(expr);
        if (r != null) { lastVal = String(r); paint(); expr = String(r); }
        else { lastVal = "Check syntax"; paint(); lastVal = ""; }
        return;
      }
      if (k === "insert") {
        var out = lastVal !== "" ? lastVal : (safeEvalExpr(expr) != null ? String(safeEvalExpr(expr)) : expr);
        if (!out) return;
        var inp = document.querySelector("#ll-obody .hs-in");
        if (inp && !inp.disabled) {
          inp.value = out;
          inp.focus();
        }
        return;
      }
      if (lastVal !== "" && /^[0-9.π(]$/.test(k)) { expr = ""; lastVal = ""; }
      else { lastVal = ""; }
      expr += k;
      paint();
    };
  }

  /* =========================================================================
     2. 3D SPACED-REPETITION FLASHCARDS (All 4 NY Grade 7 Subjects)
     ========================================================================= */
  var DECKS = [
    { id: "all", label: "All Subjects", emo: "⚡" },
    { id: "math7", label: "Math Formulas", emo: "📐" },
    { id: "ela7", label: "ELA Roots & Grammar", emo: "📚" },
    { id: "sci7", label: "Science Vocab", emo: "🔬" },
    { id: "ss7", label: "NY History Dates", emo: "🗽" }
  ];

  var FLASHCARDS = [
    /* Math 7 */
    { id: "m1", deck: "math7", tag: "7.RP.2", front: "Constant of Proportionality (k)", back: "k = y ÷ x  →  equation y = kx. Its graph is a straight line through the origin (0, 0)." },
    { id: "m2", deck: "math7", tag: "7.RP.3", front: "Percent Change Formula", back: "% change = (|new − original| ÷ original) × 100. Always divide by the ORIGINAL amount." },
    { id: "m3", deck: "math7", tag: "7.NS.2", front: "Integer Sign Rules (× and ÷)", back: "Same signs → POSITIVE (+). Different signs → NEGATIVE (−). Subtracting = adding the opposite." },
    { id: "m4", deck: "math7", tag: "7.EE.4", front: "Golden Rule of Inequalities", back: "When you multiply or divide BOTH sides by a NEGATIVE number, FLIP the inequality sign (< ↔ >)." },
    { id: "m5", deck: "math7", tag: "7.G.4", front: "Circle Circumference & Area", back: "C = 2πr = πd   ·   A = πr²   (Radius r = d ÷ 2; use π ≈ 3.14)." },
    { id: "m6", deck: "math7", tag: "7.G.5", front: "Complementary vs. Supplementary Angles", back: "Complementary = sum to 90° (right angle). Supplementary = sum to 180° (straight line). Vertical angles = equal." },
    { id: "m7", deck: "math7", tag: "7.G.6", front: "Rectangular Prism Volume & Surface Area", back: "Volume: V = l × w × h (cubic units). Surface Area: SA = 2(lw + lh + wh) (square units)." },
    { id: "m8", deck: "math7", tag: "7.SP.8", front: "Compound Independent Probability", back: "P(A and B) = P(A) × P(B). Multiply the probability of each independent event." },
    { id: "m9", deck: "math7", tag: "7.SP.4", front: "Mean Absolute Deviation (MAD)", back: "1) Find the mean. 2) Find each value's positive distance from the mean. 3) Average those distances." },
    /* ELA 7 */
    { id: "e1", deck: "ela7", tag: "7L1a", front: "Clause vs. Phrase", back: "A CLAUSE has both a subject AND a verb. A PHRASE is missing one (e.g., \"under the bridge\")." },
    { id: "e2", deck: "ela7", tag: "7L1b", front: "Compound vs. Complex Sentence", back: "Compound = 2 independent clauses joined by FANBOYS or semicolon. Complex = 1 independent + 1+ dependent clause." },
    { id: "e3", deck: "ela7", tag: "7L4b", front: "Greek & Latin Roots: bio · chron · port · spect", back: "bio = life · chron = time · port = carry · spect = look/watch." },
    { id: "e4", deck: "ela7", tag: "7L4b", front: "Greek & Latin Roots: aud · tele · graph · bene", back: "aud = hear · tele = far · graph = write · bene = good/well." },
    { id: "e5", deck: "ela7", tag: "7L5c", front: "Denotation vs. Connotation", back: "Denotation = dictionary meaning. Connotation = emotional feeling (e.g., \"determined\" positive vs. \"stubborn\" negative)." },
    { id: "e6", deck: "ela7", tag: "7R6", front: "Third Person Limited vs. Omniscient", back: "Limited = narrator knows ONE character's thoughts. Omniscient = all-knowing narrator sees MULTIPLE minds." },
    { id: "e7", deck: "ela7", tag: "7W1", front: "CER Argument Structure", back: "Claim (clear arguable stance) + Evidence (specific text quote/data) + Reasoning (explains HOW evidence proves claim)." },
    /* Science 7 */
    { id: "s1", deck: "sci7", tag: "MS-LS1", front: "3 Organelles Unique to Plant Cells", back: "1) Rigid Cell Wall, 2) Chloroplasts (photosynthesis), and 3) Large Central Vacuole (water storage)." },
    { id: "s2", deck: "sci7", tag: "MS-LS1", front: "Levels of Biological Organization", back: "Cell → Tissue → Organ → Organ System → Organism (smallest to largest)." },
    { id: "s3", deck: "sci7", tag: "MS-LS1", front: "Photosynthesis vs. Cellular Respiration", back: "Photosynthesis (chloroplasts): CO₂ + H₂O + light → Glucose + O₂. Respiration (mitochondria): Glucose + O₂ → Energy + CO₂ + H₂O." },
    { id: "s4", deck: "sci7", tag: "MS-LS2", front: "10% Energy Pyramid Rule", back: "Only ~10% of energy moves up to the next trophic level; arrows in food webs always point in the direction ENERGY flows." },
    { id: "s5", deck: "sci7", tag: "MS-PS1", front: "Physical vs. Chemical Change", back: "Physical = shape/state changes, same substance (melting ice). Chemical = NEW substance forms (burning, rusting, gas bubbles)." },
    { id: "s6", deck: "sci7", tag: "MS-ESS2", front: "3 Rock Types in the Rock Cycle", back: "Igneous (cooled magma/lava), Sedimentary (pressed layers, holds fossils), Metamorphic (heat & pressure)." },
    { id: "s7", deck: "sci7", tag: "MS-LS3", front: "Dominant vs. Recessive Alleles", back: "Dominant (P) shows whenever present (PP or Pp). Recessive (p) only shows with two copies (pp)." },
    { id: "s8", deck: "sci7", tag: "Practices", front: "Independent vs. Dependent Variable", back: "Independent = what YOU change on purpose. Dependent = what you MEASURE. Controlled = kept identical." },
    /* Social Studies 7 */
    { id: "h1", deck: "ss7", tag: "7.1", front: "Haudenosaunee Confederacy & Three Sisters", back: "5 original NY nations (Mohawk, Oneida, Onondaga, Cayuga, Seneca) + Tuscarora (6th). Three Sisters = corn, beans, squash." },
    { id: "h2", deck: "ss7", tag: "7.2", front: "1607 · 1620 · 1664 Colonial Milestones", back: "1607 Jamestown (1st permanent English town) · 1620 Mayflower Compact · 1664 English rename New Amsterdam → New York." },
    { id: "h3", deck: "ss7", tag: "7.3", front: "Road to Revolution Timeline (1765–1776)", back: "1765 Stamp Act → 1770 Boston Massacre → 1773 Tea Party → 1775 Lexington & Concord → July 4, 1776 Declaration." },
    { id: "h4", deck: "ss7", tag: "7.3", front: "Battle of Saratoga (1777) — Turning Point", back: "American victory in New York that convinced FRANCE to join the war as a vital ally." },
    { id: "h5", deck: "ss7", tag: "7.4", front: "Great Compromise (1787)", back: "Created a 2-house Congress: Senate (2 equal votes per state) + House of Representatives (based on state population)." },
    { id: "h6", deck: "ss7", tag: "7.5", front: "Three Branches & Checks and Balances", back: "Legislative (Congress makes laws), Executive (President enforces/vetoes), Judicial (Courts interpret/judicial review)." },
    { id: "h7", deck: "ss7", tag: "7.6–7.7", front: "1803 · 1825 · 1848 Expansion & Reform", back: "1803 Louisiana Purchase (doubled US) · 1825 Erie Canal (Albany–Buffalo) · 1848 Seneca Falls (women's rights)." },
    { id: "h8", deck: "ss7", tag: "7.8", front: "Civil War Turning Points (1861–1865)", back: "1861 Fort Sumter → 1863 Emancipation Proclamation & Gettysburg → 1865 Appomattox surrender & 13th Amendment (ended slavery)." }
  ];

  function cardBoxMap() {
    var all = loadJ(CARDS_KEY);
    return all[activeKid()] || {};
  }
  function setCardBox(cardId, box) {
    var all = loadJ(CARDS_KEY), kid = activeKid();
    all[kid] = all[kid] || {};
    all[kid][cardId] = box;
    saveJ(CARDS_KEY, all);
  }
  function getCustomCards(kid) {
    return (loadJ(CUSTOM_CARDS_KEY)[kid || activeKid()] || []).slice();
  }
  function addCustomCard(tag, front, back) {
    var all = loadJ(CUSTOM_CARDS_KEY), kid = activeKid();
    var list = all[kid] || [];
    list.unshift({ id: "c_" + Date.now() + "_" + Math.floor(Math.random() * 999), deck: "custom", tag: (tag || "My Quiz").trim().slice(0, 28), front: front.trim().slice(0, 120), back: back.trim().slice(0, 240) });
    all[kid] = list.slice(0, 60);
    saveJ(CUSTOM_CARDS_KEY, all);
  }
  function removeCustomCard(id) {
    var all = loadJ(CUSTOM_CARDS_KEY), kid = activeKid();
    all[kid] = (all[kid] || []).filter(function (c) { return c.id !== id; });
    saveJ(CUSTOM_CARDS_KEY, all);
  }
  function getMatchBest(deckId) {
    var all = loadJ(MATCH_BEST_KEY);
    return (all[activeKid()] || {})[deckId] || null;
  }
  function saveMatchBest(deckId, secs) {
    var all = loadJ(MATCH_BEST_KEY), kid = activeKid();
    all[kid] = all[kid] || {};
    if (!all[kid][deckId] || secs < all[kid][deckId]) {
      all[kid][deckId] = secs;
      saveJ(MATCH_BEST_KEY, all);
      return true;
    }
    return false;
  }

  /* Lesson Pinning / Bookmarks for upcoming school quizzes */
  function getPins(kid) {
    return (loadJ(PINS_KEY)[kid || activeKid()] || []).slice();
  }
  function isPinned(title, kid) {
    return getPins(kid).indexOf(title) >= 0;
  }
  function togglePin(title) {
    if (!title) return false;
    var all = loadJ(PINS_KEY), kid = activeKid();
    var list = all[kid] || [];
    var idx = list.indexOf(title);
    var added = false;
    if (idx >= 0) list.splice(idx, 1);
    else { list.unshift(title); added = true; }
    all[kid] = list.slice(0, 12);
    saveJ(PINS_KEY, all);
    return added;
  }
  function pinnedStripHtml() {
    var pins = getPins();
    if (!pins.length) return "";
    return '<div class="tc-pins"><span class="tc-pins-lbl">📌 Pinned for Upcoming Quizzes:</span>' +
      pins.map(function (t) {
        return '<span class="tc-pin-chip"><button type="button" class="tc-pin-go" data-rl-open="' + esc(t) + '">' + esc(t) + '</button><button type="button" class="tc-pin-x" data-pin-toggle="' + esc(t) + '" aria-label="Unpin ' + esc(t) + '">✕</button></span>';
      }).join("") + "</div>";
  }

  function shufArr(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  function openFlashcards(body, startDeck) {
    if (!body) return;
    var deck = startDeck || "all";
    var mode = "flip"; /* flip | match | build */
    var idx = 0, flipped = false;
    var matchSt = null, matchIv = null;

    function allCards() { return FLASHCARDS.concat(getCustomCards()); }
    function deckList() {
      var custN = getCustomCards().length;
      return DECKS.concat([{ id: "custom", label: "My Cards (" + custN + ")", emo: "🗂️" }]);
    }
    function filtered() {
      var boxes = cardBoxMap();
      var list = allCards().filter(function (c) { return deck === "all" || c.deck === deck; });
      return list.slice().sort(function (a, b) { return (boxes[a.id] || 0) - (boxes[b.id] || 0); });
    }
    var queue = filtered();

    function stopMatchTimer() { if (matchIv) { clearInterval(matchIv); matchIv = null; } }

    function startMatch() {
      stopMatchTimer();
      var pool = allCards().filter(function (c) { return deck === "all" || c.deck === deck; });
      if (pool.length < 3) pool = allCards();
      var chosen = shufArr(pool).slice(0, Math.min(6, pool.length));
      matchSt = {
        terms: shufArr(chosen.map(function (c) { return { id: c.id, txt: c.front }; })),
        defs: shufArr(chosen.map(function (c) { return { id: c.id, txt: c.back }; })),
        matched: {}, selTerm: null, selDef: null, wrongFlash: false,
        t0: Date.now(), secs: 0, done: false, isPB: false, total: chosen.length
      };
      matchIv = setInterval(function () {
        if (!matchSt || matchSt.done || !body.querySelector(".ms-clock")) { stopMatchTimer(); return; }
        matchSt.secs = Math.round((Date.now() - matchSt.t0) / 100) / 10;
        var el = body.querySelector(".ms-clock");
        if (el) el.textContent = matchSt.secs.toFixed(1) + "s";
      }, 100);
    }

    function modeBarHtml() {
      return '<div class="fc-modes">' +
        '<button type="button" class="hs-btn sm' + (mode === "flip" ? " pri" : "") + '" data-fc-mode="flip">🃏 3D Flip</button>' +
        '<button type="button" class="hs-btn sm' + (mode === "match" ? " pri" : "") + '" data-fc-mode="match">⚡ Match Sprint</button>' +
        '<button type="button" class="hs-btn sm' + (mode === "build" ? " pri" : "") + '" data-fc-mode="build">➕ My Quiz Cards</button>' +
      "</div>";
    }

    function draw() {
      var decksHtml = '<div class="fc-decks" role="tablist" aria-label="Flashcard subjects">' +
        deckList().map(function (d) {
          return '<button type="button" class="fc-pill' + (d.id === deck ? " on" : "") + '" data-fc-deck="' + d.id + '">' + d.emo + " " + esc(d.label) + "</button>";
        }).join("") + "</div>";

      if (mode === "build") {
        stopMatchTimer();
        var mine = getCustomCards();
        body.innerHTML =
          '<div class="hs fc-wrap">' + modeBarHtml() +
            '<section class="hs-card">' +
              '<h3>➕ Build Your Own School Quiz Deck</h3>' +
              '<p>Have a Science, History, or Spanish quiz coming up? Add your own terms below — they work in both <b>3D Flip</b> and <b>Match Sprint</b>!</p>' +
              '<form class="hs-cer" data-fc-add="1">' +
                '<label class="hs-cer-lbl">Quiz / Topic Tag<input class="hs-in" name="tag" maxlength="28" placeholder="e.g. Friday Bio Quiz"></label>' +
                '<label class="hs-cer-lbl">Front (Term or Question)<input class="hs-in" name="front" maxlength="120" placeholder="e.g. Mitosis" required></label>' +
                '<label class="hs-cer-lbl">Back (Definition or Answer)<textarea class="hs-cer-in" name="back" rows="2" maxlength="240" placeholder="e.g. Cell division that produces two identical body cells" required></textarea></label>' +
                '<button type="submit" class="hs-btn pri">＋ Add to My Cards</button>' +
              "</form>" +
              '<h4 style="margin:14px 0 8px">My Saved Cards (' + mine.length + ")</h4>" +
              (mine.length
                ? '<div class="fc-cust-list">' + mine.map(function (c) {
                    return '<div class="fc-cust-row"><div><span class="fc-tag">' + esc(c.tag) + '</span> <b>' + esc(c.front) + '</b><small>' + esc(c.back) + '</small></div>' +
                      '<button type="button" class="hs-btn sm" data-fc-del="' + esc(c.id) + '" aria-label="Delete card">🗑</button></div>';
                  }).join("") + "</div>"
                : '<p class="hoot-line" style="margin:0">No custom cards yet — add your first quiz card above!</p>') +
            "</section>" +
          "</div>";
        return;
      }

      if (mode === "match") {
        if (!matchSt) startMatch();
        var best = getMatchBest(deck);
        var matchedN = Object.keys(matchSt.matched).length;
        body.innerHTML =
          '<div class="hs fc-wrap">' + modeBarHtml() + decksHtml +
            '<div class="fc-meta"><span>Matched: <b>' + matchedN + " / " + matchSt.total + '</b></span><span>⏱ <b class="ms-clock">' + matchSt.secs.toFixed(1) + "s</b>" + (best ? " · 🏆 Best: " + best.toFixed(1) + "s" : "") + "</span></div>" +
            (matchSt.done
              ? '<section class="hs-card" style="text-align:center;padding:24px"><h3>🎉 Sprint Complete in ' + matchSt.secs.toFixed(1) + "s!</h3>" +
                '<p class="hs-verdict ok">' + (matchSt.isPB ? "🏆 Brand-new Personal Best!" : "Awesome speed! Try another round to beat " + (best || matchSt.secs).toFixed(1) + "s.") + "</p>" +
                '<button type="button" class="hs-btn pri" data-ms-again="1">↻ Play Another Sprint</button></section>'
              : '<div class="ms-grid">' +
                  '<div class="ms-col">' + matchSt.terms.map(function (t) {
                    var dn = !!matchSt.matched[t.id], sel = matchSt.selTerm === t.id;
                    return '<button type="button" class="ms-tile term' + (dn ? " done" : "") + (sel ? " sel" : "") + '" data-ms-t="' + esc(t.id) + '"' + (dn ? " disabled" : "") + ">" + esc(t.txt) + "</button>";
                  }).join("") + "</div>" +
                  '<div class="ms-col">' + matchSt.defs.map(function (d) {
                    var dn = !!matchSt.matched[d.id], sel = matchSt.selDef === d.id;
                    return '<button type="button" class="ms-tile def' + (dn ? " done" : "") + (sel ? " sel" : "") + '" data-ms-d="' + esc(d.id) + '"' + (dn ? " disabled" : "") + ">" + esc(d.txt) + "</button>";
                  }).join("") + "</div>" +
                "</div>") +
          "</div>";
        return;
      }

      /* Default: 3D Flip mode */
      stopMatchTimer();
      var boxes = cardBoxMap();
      var totalInDeck = allCards().filter(function (c) { return deck === "all" || c.deck === deck; });
      if (!totalInDeck.length) {
        body.innerHTML = '<div class="hs fc-wrap">' + modeBarHtml() + decksHtml +
          '<section class="hs-card"><h3>No cards in this deck yet</h3><p>Switch to <b>➕ My Quiz Cards</b> to add your own school study cards!</p></section></div>';
        return;
      }
      if (!queue.length) queue = filtered();
      var mastered = totalInDeck.filter(function (c) { return (boxes[c.id] || 0) >= 2; }).length;
      var card = queue[idx % queue.length];
      var box = card ? (boxes[card.id] || 0) : 0;

      body.innerHTML =
        '<div class="hs fc-wrap">' + modeBarHtml() + decksHtml +
          '<div class="fc-meta"><span>Card ' + ((idx % queue.length) + 1) + " of " + queue.length + '</span><span>Mastered: <b>' + mastered + " / " + totalInDeck.length + "</b></span></div>" +
          '<div class="fc-stage">' +
            '<button type="button" class="fc-card' + (flipped ? " flipped" : "") + '" data-fc-flip="1" aria-label="Flip flashcard">' +
              '<div class="fc-inner">' +
                '<div class="fc-face fc-front">' +
                  '<span class="fc-tag">' + esc(card.tag) + (box >= 2 ? " · ✓ Mastered" : "") + "</span>" +
                  '<h3 class="fc-q">' + esc(card.front) + "</h3>" +
                  '<small class="fc-hint">Tap card to flip</small>' +
                "</div>" +
                '<div class="fc-face fc-back">' +
                  '<span class="fc-tag">' + esc(card.tag) + " · Answer</span>" +
                  '<p class="fc-a">' + esc(card.back) + "</p>" +
                "</div>" +
              "</div>" +
            "</button>" +
          "</div>" +
          '<div class="fc-acts">' +
            '<button type="button" class="hs-btn" data-fc-rate="again">🔁 Study again</button>' +
            '<button type="button" class="hs-btn pri" data-fc-rate="good">✅ Got it!</button>' +
          "</div>" +
        "</div>";
    }

    function checkMatchPair() {
      if (!matchSt || !matchSt.selTerm || !matchSt.selDef) return;
      if (matchSt.selTerm === matchSt.selDef) {
        matchSt.matched[matchSt.selTerm] = 1;
        matchSt.selTerm = null; matchSt.selDef = null;
        if (Object.keys(matchSt.matched).length === matchSt.total) {
          stopMatchTimer();
          matchSt.secs = Math.max(0.1, Math.round((Date.now() - matchSt.t0) / 100) / 10);
          matchSt.done = true;
          matchSt.isPB = saveMatchBest(deck, matchSt.secs);
        }
      } else {
        matchSt.selTerm = null; matchSt.selDef = null;
      }
      draw();
    }

    body.onsubmit = function (e) {
      var f = e.target;
      if (!f || f.getAttribute("data-fc-add") !== "1") return;
      e.preventDefault();
      var tag = f.querySelector('[name="tag"]').value;
      var fr = f.querySelector('[name="front"]').value;
      var bk = f.querySelector('[name="back"]').value;
      if (!fr.trim() || !bk.trim()) return;
      addCustomCard(tag, fr, bk);
      deck = "custom";
      queue = filtered();
      draw();
    };

    body.onclick = function (e) {
      var mBtn = e.target.closest("[data-fc-mode]");
      if (mBtn) {
        mode = mBtn.getAttribute("data-fc-mode");
        if (mode === "match") startMatch(); else stopMatchTimer();
        queue = filtered(); idx = 0; flipped = false;
        draw();
        return;
      }
      var dBtn = e.target.closest("[data-fc-deck]");
      if (dBtn) {
        deck = dBtn.getAttribute("data-fc-deck");
        queue = filtered(); idx = 0; flipped = false;
        if (mode === "match") startMatch();
        draw();
        return;
      }
      var delBtn = e.target.closest("[data-fc-del]");
      if (delBtn) { removeCustomCard(delBtn.getAttribute("data-fc-del")); queue = filtered(); draw(); return; }
      if (e.target.closest("[data-ms-again]")) { startMatch(); draw(); return; }
      var mt = e.target.closest("[data-ms-t]");
      if (mt && matchSt) { matchSt.selTerm = mt.getAttribute("data-ms-t"); if (matchSt.selDef) checkMatchPair(); else draw(); return; }
      var md = e.target.closest("[data-ms-d]");
      if (md && matchSt) { matchSt.selDef = md.getAttribute("data-ms-d"); if (matchSt.selTerm) checkMatchPair(); else draw(); return; }
      if (e.target.closest("[data-fc-flip]")) {
        flipped = !flipped;
        var cardEl = body.querySelector(".fc-card");
        if (cardEl) cardEl.classList.toggle("flipped", flipped);
        return;
      }
      var rBtn = e.target.closest("[data-fc-rate]");
      if (rBtn) {
        var rate = rBtn.getAttribute("data-fc-rate");
        var curCard = queue[idx % queue.length];
        if (curCard) {
          var prev = cardBoxMap()[curCard.id] || 0;
          setCardBox(curCard.id, rate === "good" ? Math.min(3, prev + 1) : 0);
          if (rate === "again") queue.splice(Math.min(queue.length, idx + 3), 0, curCard);
        }
        idx = (idx + 1) % queue.length;
        flipped = false;
        draw();
      }
    };
    draw();
  }

  /* =========================================================================
     3. FOCUS STUDY TIMER + PURE OFFLINE WEBAUDIO AMBIENT RAIN / BROWN NOISE
     ========================================================================= */
  var timer = { totalSec: 15 * 60, leftSec: 15 * 60, running: false, iv: null, mode: "15" };
  var audio = { ctx: null, node: null, gain: null, on: false };

  function fmtTime(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
  }
  function paintTimerDOM() {
    var pct = Math.round(((timer.totalSec - timer.leftSec) / Math.max(1, timer.totalSec)) * 100);
    document.querySelectorAll(".ft-clock").forEach(function (el) { el.textContent = fmtTime(timer.leftSec); });
    document.querySelectorAll(".ft-bar i").forEach(function (el) { el.style.width = pct + "%"; });
    document.querySelectorAll('[data-ft="toggle"]').forEach(function (el) {
      el.textContent = timer.running ? "⏸ Pause" : (timer.leftSec === 0 ? "↻ Restart" : "▶ Start");
    });
    document.querySelectorAll('[data-ft="ambient"]').forEach(function (el) {
      el.classList.toggle("on", audio.on);
      el.textContent = audio.on ? "🌧 Rain: On" : "🌧 Soft Rain";
      el.setAttribute("aria-pressed", String(audio.on));
    });
    document.querySelectorAll("[data-ft-preset]").forEach(function (el) {
      el.classList.toggle("on", el.getAttribute("data-ft-preset") === timer.mode);
    });
  }
  function setTimerPreset(mins) {
    clearInterval(timer.iv); timer.running = false;
    timer.mode = String(mins);
    timer.totalSec = (+mins) * 60;
    timer.leftSec = timer.totalSec;
    paintTimerDOM();
  }
  function toggleTimer() {
    if (timer.running) {
      clearInterval(timer.iv); timer.running = false;
    } else {
      if (timer.leftSec <= 0) timer.leftSec = timer.totalSec;
      timer.running = true;
      timer.iv = setInterval(function () {
        if (timer.leftSec > 0) { timer.leftSec--; paintTimerDOM(); }
        else { clearInterval(timer.iv); timer.running = false; paintTimerDOM(); playGentleChime(); }
      }, 1000);
    }
    paintTimerDOM();
  }
  function playGentleChime() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      var c = audio.ctx || new Ctx();
      var o = c.createOscillator(), g = c.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(528, c.currentTime);
      g.gain.setValueAtTime(0.08, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.9);
      o.connect(g); g.connect(c.destination);
      o.start(); o.stop(c.currentTime + 0.95);
    } catch (e) {}
  }
  function startAmbient() {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      if (!audio.ctx) audio.ctx = new Ctx();
      if (audio.ctx.state === "suspended") audio.ctx.resume();
      /* Synthesize warm brown-noise rain using a 3-second looping AudioBuffer */
      var sr = audio.ctx.sampleRate, len = sr * 3;
      var buf = audio.ctx.createBuffer(1, len, sr);
      var data = buf.getChannelData(0), lastOut = 0;
      for (var i = 0; i < len; i++) {
        var white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 2.2;
      }
      var src = audio.ctx.createBufferSource();
      src.buffer = buf; src.loop = true;
      var lp = audio.ctx.createBiquadFilter();
      lp.type = "lowpass"; lp.frequency.value = 620;
      var g = audio.ctx.createGain();
      g.gain.value = 0.08;
      src.connect(lp); lp.connect(g); g.connect(audio.ctx.destination);
      src.start();
      audio.node = src; audio.gain = g; audio.on = true;
    } catch (e) { audio.on = false; }
    paintTimerDOM();
  }
  function stopAmbient() {
    if (audio.node) { try { audio.node.stop(); } catch (e) {} audio.node = null; }
    audio.on = false;
    paintTimerDOM();
  }
  function toggleAmbient() {
    if (audio.on) stopAmbient(); else startAmbient();
  }

  function focusBarHtml() {
    var pct = Math.round(((timer.totalSec - timer.leftSec) / Math.max(1, timer.totalSec)) * 100);
    return '<div class="ft-bar-wrap" aria-label="Focus study timer">' +
      '<div class="ft-row">' +
        '<span class="ft-title">⏱ Focus Timer</span>' +
        '<strong class="ft-clock">' + fmtTime(timer.leftSec) + "</strong>" +
        '<div class="ft-presets">' +
          '<button type="button" class="ft-chip' + (timer.mode === "15" ? " on" : "") + '" data-ft-preset="15">15m</button>' +
          '<button type="button" class="ft-chip' + (timer.mode === "25" ? " on" : "") + '" data-ft-preset="25">25m</button>' +
          '<button type="button" class="ft-chip' + (timer.mode === "5" ? " on" : "") + '" data-ft-preset="5">5m Break</button>' +
        "</div>" +
        '<div class="ft-ctrls">' +
          '<button type="button" class="ft-btn pri" data-ft="toggle">' + (timer.running ? "⏸ Pause" : "▶ Start") + "</button>" +
          '<button type="button" class="ft-btn" data-ft="reset">Reset</button>' +
          '<button type="button" class="ft-btn' + (audio.on ? " on" : "") + '" data-ft="ambient" aria-pressed="' + (audio.on ? "true" : "false") + '">' + (audio.on ? "🌧 Rain: On" : "🌧 Soft Rain") + "</button>" +
        "</div>" +
      "</div>" +
      '<div class="ft-bar" aria-hidden="true"><i style="width:' + pct + '%"></i></div>' +
    "</div>";
  }

  document.addEventListener("click", function (e) {
    if (!e.target || !e.target.closest) return;
    var pre = e.target.closest("[data-ft-preset]");
    if (pre) { setTimerPreset(pre.getAttribute("data-ft-preset")); return; }
    var act = e.target.closest("[data-ft]");
    if (act) {
      var k = act.getAttribute("data-ft");
      if (k === "toggle") toggleTimer();
      else if (k === "reset") setTimerPreset(timer.mode);
      else if (k === "ambient") toggleAmbient();
    }
  });

  /* =========================================================================
     4. SAVED CER WRITING PORTFOLIO STORE
     ========================================================================= */
  function getCerEntries(kid) {
    var all = loadJ(CER_KEY);
    return (all[kid || activeKid()] || []).slice();
  }
  function saveCer(entry) {
    var all = loadJ(CER_KEY), kid = activeKid();
    var list = all[kid] || [];
    list.unshift({
      ts: Date.now(),
      q: entry.q || "CER Argument",
      c: entry.c || "",
      e: entry.e || "",
      r: entry.r || "",
      score: entry.score || 3
    });
    all[kid] = list.slice(0, 40);
    saveJ(CER_KEY, all);
  }

  /* =========================================================================
     5. GRADE 7 READING & WRITING LAB (Tap-to-Define Inline Vocabulary)
     ========================================================================= */
  var LAB_PASSAGES = [
    {
      id: "rl-oysters", tag: "Science · NY Ecosystem", mins: "2 min read",
      title: "How One Billion Oysters Are Cleaning New York Harbor",
      body: [
        "Four hundred years ago, New York Harbor held half of the world's oyster reefs. A single adult oyster can ",
        { w: "filter", d: "remove dirt, algae, and pollution from water by passing it through its gills" },
        " up to 50 gallons of harbor water every day. Centuries of overharvesting and industrial pollution nearly wiped them out.",
        " Today, thousands of New York middle-schoolers partner with marine scientists to restore oyster reefs using recycled restaurant shells. As ",
        { w: "reef", d: "a ridge of shells, coral, or rock underwater that creates shelter for marine life" },
        " habitats grow back, water clarity improves and native fish, crabs, and seahorses return — proving that small biological ",
        { w: "producers", d: "organisms or habitats that anchor and support the base of a local food web" },
        " and filter-feeders can transform an entire urban estuary."
      ],
      jumpId: "e7-cer-coach",
      jumpLesson: "Argument writing: CER coach"
    },
    {
      id: "rl-erie", tag: "NY History · 7.6", mins: "2 min read",
      title: "The Ditch That Built the Empire State (1825)",
      body: [
        "When Governor DeWitt Clinton proposed digging a 363-mile canal across New York wilderness, critics mocked it as \"Clinton's Folly.\" Before 1825, hauling a ton of flour from Buffalo to Manhattan took three weeks and cost $100.",
        " After the Erie Canal opened, shipping costs ",
        { w: "plummeted", d: "dropped sharply and suddenly by a huge amount" },
        " by 90%, and travel time fell to eight days. Boomtowns like Syracuse, Rochester, and Buffalo sprang up along the waterway, turning New York City into America's busiest ",
        { w: "commerce", d: "the large-scale buying, selling, and transport of goods" },
        " hub and earning New York its nickname: the Empire State."
      ],
      jumpId: "e7-central-idea",
      jumpLesson: "Central idea"
    },
    {
      id: "rl-sleep", tag: "Health & Research · 7R8", mins: "2 min read",
      title: "Why Sleep Actually Rewires a 12-Year-Old Brain",
      body: [
        "During middle school, your brain is doing heavy construction — strengthening pathways you practice and pruning ones you ignore. While you sleep, the hippocampus replays memories from math and reading class and ",
        { w: "consolidates", d: "locks short-term memories into organized, durable long-term storage" },
        " them into long-term knowledge.",
        " In controlled district studies, teens who gained just 40 extra minutes of sleep showed measurable gains in ",
        { w: "attention", d: "sustained mental focus without drifting off task" },
        " and problem-solving accuracy — showing that rest isn't wasted time, it's part of studying."
      ],
      jumpId: "e7-evidence",
      jumpLesson: "Inferences & citing evidence"
    }
  ];

  function readingLabHtml() {
    var cards = LAB_PASSAGES.map(function (p) {
      var textHtml = p.body.map(function (part) {
        if (typeof part === "string") return esc(part);
        return '<button type="button" class="rl-word" data-rl-word="' + esc(part.w) + '" data-rl-def="' + esc(part.d) + '">' + esc(part.w) + "</button>";
      }).join("");
      return '<article class="rl-card" data-rl-id="' + p.id + '">' +
        '<div class="rl-top"><span class="rl-tag">' + esc(p.tag) + '</span><span class="rl-min">⏱ ' + esc(p.mins) + "</span></div>" +
        '<h3>' + esc(p.title) + "</h3>" +
        '<p class="rl-body">' + textHtml + "</p>" +
        '<div class="rl-def" hidden aria-live="polite"></div>' +
        '<div class="rl-acts"><button type="button" class="ll-btn sm pri" data-rl-open-id="' + esc(p.jumpId) + '" data-rl-open="' + esc(p.jumpLesson) + '">✍️ Practice skill: ' + esc(p.jumpLesson) + "</button></div>" +
      "</article>";
    }).join("");
    return '<section class="rl-wrap">' +
      '<div class="rl-head"><h2>📖 Grade 7 Reading &amp; Writing Lab</h2><p>Tap any underlined vocabulary word for an instant definition, then jump straight into an ELA skill.</p></div>' +
      '<div class="rl-grid">' + cards + "</div></section>";
  }

  document.addEventListener("click", function (e) {
    if (!e.target || !e.target.closest) return;
    var w = e.target.closest("[data-rl-word]");
    if (w) {
      var card = w.closest(".rl-card");
      var box = card && card.querySelector(".rl-def");
      if (box) {
        card.querySelectorAll(".rl-word.on").forEach(function (x) { if (x !== w) x.classList.remove("on"); });
        var already = w.classList.contains("on");
        w.classList.toggle("on", !already);
        if (already) { box.hidden = true; }
        else {
          box.innerHTML = "<b>" + esc(w.getAttribute("data-rl-word")) + ":</b> " + esc(w.getAttribute("data-rl-def"));
          box.hidden = false;
        }
      }
    }
  });

  /* =========================================================================
     6. NY GRADE 7 MASTERY TRANSCRIPT, HEATMAP & PRINTABLE QUARTERLY REPORT
     ========================================================================= */
  function ringSvg(pct, color) {
    var r = 26, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
    return '<svg viewBox="0 0 64 64" width="64" height="64" class="pf-ring" aria-hidden="true">' +
      '<circle cx="32" cy="32" r="' + r + '" fill="none" stroke="currentColor" stroke-opacity="0.14" stroke-width="6"/>' +
      '<circle cx="32" cy="32" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="6" stroke-linecap="round" ' +
      'stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 32 32)"/>' +
      '<text x="32" y="36" text-anchor="middle" font-size="13" font-weight="800" fill="currentColor">' + pct + "%</text></svg>";
  }

  function renderPortfolioHtml(profile, helpers) {
    var courses = [
      { id: "math7", label: "Grade 7 Math", emo: "📐", color: "#10B981" },
      { id: "ela7", label: "Grade 7 ELA", emo: "📚", color: "#A855F7" },
      { id: "sci7", label: "Grade 7 Science", emo: "🔬", color: "#0EA5E9" },
      { id: "ss7", label: "NY History", emo: "🗽", color: "#F97316" }
    ];
    var totalDone = 0, totalAll = 0;
    var ringsHtml = courses.map(function (c) {
      var ls = helpers.lessonsFor(c.id) || [];
      var dn = ls.filter(function (l) { return helpers.isDone(l.title); }).length;
      totalDone += dn; totalAll += ls.length;
      var pct = Math.round((dn / Math.max(1, ls.length)) * 100);
      return '<button type="button" class="pf-subj" data-path="' + c.id + '">' +
        ringSvg(pct, c.color) +
        '<div><b>' + c.emo + " " + esc(c.label) + "</b><small>" + dn + " of " + ls.length + " mastered</small></div></button>";
    }).join("");

    /* NY Standards Mastery Matrix */
    var stdChips = [];
    if (window.HootStudy && window.HootStudy.lessons) {
      window.HootStudy.lessons.forEach(function (l) {
        if (!l.std || l.id.indexOf("-review") >= 0) return;
        var done = helpers.isDone(l.title);
        stdChips.push('<button type="button" class="pf-std' + (done ? " done" : "") + '" data-rl-open-id="' + esc(l.id) + '" data-pf-lesson="' + esc(l.title) + '" title="' + esc(l.title) + '">' +
          (done ? "✓ " : "") + esc(l.std.split(",")[0]) + " <small>" + esc(l.title) + "</small></button>");
      });
    }

    /* 4-Week (28-day) Activity Heatmap from log events */
    var dayCounts = {}, totalMins = 0, sessions = 0;
    (helpers.logs || []).forEach(function (ev) {
      if (!ev || !ev.t) return;
      var d = new Date(ev.t);
      var key = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      dayCounts[key] = (dayCounts[key] || 0) + 1;
      sessions++;
      if (ev.ms > 0) totalMins += Math.round(Math.min(ev.ms, 3 * 3600000) / 60000);
    });
    var cells = [];
    var now = new Date(); now.setHours(12, 0, 0, 0);
    for (var d = 27; d >= 0; d--) {
      var dt = new Date(now.getTime() - d * 86400000);
      var k = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
      var cnt = dayCounts[k] || 0;
      var lvl = cnt === 0 ? 0 : cnt === 1 ? 1 : cnt <= 3 ? 2 : 3;
      var lbl = dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      cells.push('<span class="pf-day l' + lvl + '" title="' + esc(lbl + ": " + cnt + " activities") + '"></span>');
    }

    /* Saved CER Writing Portfolio */
    var cerList = getCerEntries(profile.id);
    var cerHtml = cerList.length
      ? cerList.slice(0, 6).map(function (it) {
          var when = new Date(it.ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
          return '<article class="pf-cer"><div class="pf-cer-h"><b>' + esc(it.q) + '</b><span>' + esc(when) + " · " + it.score + "/3 CER</span></div>" +
            '<p><b>Claim:</b> ' + esc(it.c) + "</p>" +
            '<p><b>Evidence:</b> ' + esc(it.e) + "</p>" +
            '<p><b>Reasoning:</b> ' + esc(it.r) + "</p></article>";
        }).join("")
      : '<p class="hoot-line" style="margin:0">No saved essays yet — write a paragraph in <b>Argument writing: CER coach</b> and it will appear here automatically.</p>';

    var vaultN = window.HootStudy && window.HootStudy.getVault ? window.HootStudy.getVault().length : 0;
    var cardsMastered = FLASHCARDS.concat(getCustomCards(profile.id)).filter(function (c) { return (cardBoxMap()[c.id] || 0) >= 2; }).length;
    var todayStr = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

    /* Sleek Teen Mastery Badges (earned purely from real Grade 7 skill mastery!) */
    var labsDone = window.HootStudyLabs && window.HootStudyLabs.getLabsDone ? window.HootStudyLabs.getLabsDone(profile.id) : {};
    var mapDone = window.HootStudyLabs && window.HootStudyLabs.getMapDone ? Object.keys(window.HootStudyLabs.getMapDone(profile.id)).length : 0;
    var exams = window.HootStudyExam && window.HootStudyExam.getExams ? window.HootStudyExam.getExams(profile.id) : [];
    var daily = window.HootStudyExam && window.HootStudyExam.dailyInfo ? window.HootStudyExam.dailyInfo(profile.id) : { totalDays: 0 };
    var matchBests = Object.keys(loadJ(MATCH_BEST_KEY)[profile.id] || {}).length;
    var badges = [
      { ico: "⚖️", name: "Algebra Architect", sub: "Solve an equation in Balance Lab", on: !!(labsDone.balance) },
      { ico: "🧪", name: "STEM Lab Explorer", sub: "Explore 2+ interactive labs", on: Object.keys(labsDone).length >= 2 },
      { ico: "✍️", name: "CER Persuader", sub: "Save a 3/3 CER essay", on: cerList.some(function (c) { return c.score >= 3; }) },
      { ico: "🗺️", name: "NY Historian", sub: "Master 3+ NY Map landmarks", on: mapDone >= 3 },
      { ico: "🏛️", name: "Exam Ready", sub: "Complete a 2-session NY CBT", on: exams.length >= 1 },
      { ico: "⚡", name: "Match Sprinter", sub: "Finish a Match Sprint round", on: matchBests >= 1 },
      { ico: "🔥", name: "Daily Scholar", sub: "Complete a Daily 90s Warm-Up", on: daily.totalDays >= 1 },
      { ico: "🃏", name: "Card Sharp", sub: "Master 5+ flashcards", on: cardsMastered >= 5 }
    ];
    var badgesHtml = badges.map(function (b) {
      return '<div class="pf-badge' + (b.on ? " on" : "") + '"><span class="pf-bico">' + b.ico + '</span><div><b>' + esc(b.name) + '</b><small>' + (b.on ? "✓ Earned" : esc(b.sub)) + "</small></div></div>";
    }).join("");

    return '<section class="ll-card pf-hero">' +
        '<div><h2>📊 ' + esc(profile.label) + "'s NY Grade 7 Transcript</h2>" +
        '<p class="hoot-line">' + totalDone + " of " + totalAll + " lessons mastered · " + cardsMastered + "/" + FLASHCARDS.length + " flashcards mastered · " + mapDone + "/6 NY landmarks · Generated " + esc(todayStr) + "</p></div>" +
        '<button type="button" class="ll-btn pri pf-print" data-pf-print="1">🖨️ Print / PDF Report</button>' +
      "</section>" +
      '<div class="pf-rings">' + ringsHtml + "</div>" +
      '<section class="ll-card">' +
        '<h3 style="margin:0 0 10px">🏅 Grade 7 Mastery Badges (' + badges.filter(function (b) { return b.on; }).length + " / " + badges.length + ")</h3>" +
        '<div class="pf-badges">' + badgesHtml + "</div>" +
      "</section>" +
      '<section class="ll-card pf-heat-card">' +
        '<div class="pf-heat-top"><h3>📅 Last 28 Days of Study</h3><span>' + sessions + " completed sessions · " + (totalMins || 0) + " min logged</span></div>" +
        '<div class="pf-heat" aria-label="28-day study activity heatmap">' + cells.join("") + "</div>" +
      "</section>" +
      '<section class="ll-card">' +
        '<h3 style="margin:0 0 10px">🎯 NY Grade 7 Standards Matrix</h3>' +
        '<div class="pf-stds">' + stdChips.join("") + "</div>" +
      "</section>" +
      '<section class="ll-card">' +
        '<h3 style="margin:0 0 10px">✍️ Saved CER Argument Essays (' + cerList.length + ")</h3>" +
        '<div class="pf-cer-list">' + cerHtml + "</div>" +
      "</section>";
  }

  window.HootStudyPro = {
    mountCalculator: mountCalculator,
    isCalcLocked: isCalcLocked,
    openFlashcards: openFlashcards,
    focusBarHtml: focusBarHtml,
    stopAmbient: stopAmbient,
    saveCer: saveCer,
    getCerEntries: getCerEntries,
    readingLabHtml: readingLabHtml,
    renderPortfolioHtml: renderPortfolioHtml,
    getPins: getPins,
    isPinned: isPinned,
    togglePin: togglePin,
    pinnedStripHtml: pinnedStripHtml,
    getCustomCards: getCustomCards,
    FLASHCARDS: FLASHCARDS
  };
})();
