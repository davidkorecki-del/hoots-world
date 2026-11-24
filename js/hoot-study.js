/* Hoot study engine (3e28, upgraded for Grade 7 NY Tutor Suite):
   - 19 dynamic Grade 7 NY Math lessons + Mixed Math Review + NY Grade 7 State Practice Test
   - Live problem-matched SVG diagrams (via HootStudyVisuals), collapsible iPad Scratchpad,
     one-tap NY Reference Sheet drawer, and Focus Dark/Light mode toggle
   - Smart Math Mistake Diagnostics (detects specific Grade 7 misconceptions like diameter vs.
     radius, sign errors, adding vs. subtracting discounts, dividing by ending vs. original price)
   - Rich question types: num, prob, mc, highlight (tap clause/evidence in passage),
     order (chronological/process sequencing), and cer (Claim-Evidence-Reasoning writing coach)
   - Per-profile Mistake Vault ("Review my misses") that clears items when answered right!
   - Preserves all pre-recorded std-* tutor voice clips (never device TTS). */
(function () {
  "use strict";
  function ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function nz(a, b) { var v; do { v = ri(a, b); } while (v === 0); return v; }
  function money(x) { return "$" + x.toFixed(2); }
  function r2(x) { return Math.round(x * 100) / 100; }
  function r1(x) { return Math.round(x * 10) / 10; }
  function sgn(n) { return n < 0 ? "−" + Math.abs(n) : String(n); }
  function paren(n) { return n < 0 ? "(" + sgn(n) + ")" : String(n); }
  function lin(a, b, v) {
    var s = (a === 1 ? "" : a === -1 ? "−" : sgn(a)) + (v || "x");
    if (b > 0) s += " + " + b; else if (b < 0) s += " − " + Math.abs(b);
    return s;
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }
  function frac(n, d) { var g = gcd(n, d); return (n / g) + "/" + (d / g); }
  function shuf(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------- Focus Dark Mode (kidc only, persisted cleanly) ---------- */
  var DARK_KEY = "hootworld.hs.dark.v1";
  function isDarkPref() { try { return localStorage.getItem(DARK_KEY) === "1"; } catch (e) { return false; } }
  function setDarkPref(on) {
    try { localStorage.setItem(DARK_KEY, on ? "1" : "0"); } catch (e) {}
    document.body.classList.toggle("hs-dark", !!on);
  }
  function syncDarkForProfile(pid) {
    var isTeen = pid === "kidc";
    document.body.classList.toggle("hs-dark", isTeen && isDarkPref());
  }

  /* ---------- Mistake Vault (per-profile missed quiz questions) ---------- */
  var VAULT_KEY = "hootworld.hs.vault.v1";
  function activeKid() {
    try { return (window.__llState && window.__llState()) || document.body.getAttribute("data-profile") || "kidc"; } catch (e) { return "kidc"; }
  }
  function loadVaultAll() { try { return JSON.parse(localStorage.getItem(VAULT_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function saveVaultAll(d) { try { localStorage.setItem(VAULT_KEY, JSON.stringify(d)); } catch (e) {} }
  function getVault(kid) {
    var d = loadVaultAll();
    return Array.isArray(d[kid || activeKid()]) ? d[kid || activeKid()] : [];
  }
  function addToVault(lesson, p) {
    if (!p || !p.q || p.type === "cer") return;
    var k = activeKid(), d = loadVaultAll(), arr = Array.isArray(d[k]) ? d[k] : [];
    var snap = {
      id: (lesson && lesson.id ? lesson.id : "m7") + ":" + p.q.slice(0, 64),
      lessonId: lesson ? lesson.id : "m7-unit-rate",
      lessonTitle: lesson ? lesson.title : "Review",
      std: lesson ? (lesson.std || "") : "",
      course: lesson ? (lesson.course || "math7") : "math7",
      q: p.q, passage: p.passage || "", type: p.type,
      choices: p.choices || null, ans: p.ans, unit: p.unit || "", tol: p.tol || 0,
      steps: p.steps || [], hints: p.hints || [], vis: p.vis || null,
      segments: p.segments || null, orderItems: p.orderItems || null,
      at: Date.now()
    };
    arr = arr.filter(function (x) { return x.q !== snap.q; });
    arr.unshift(snap);
    if (arr.length > 24) arr = arr.slice(0, 24);
    d[k] = arr;
    saveVaultAll(d);
    try { document.dispatchEvent(new CustomEvent("hoot-vault-change", { detail: { kid: k, count: arr.length } })); } catch (e) {}
  }
  function removeFromVault(qText) {
    var k = activeKid(), d = loadVaultAll(), arr = Array.isArray(d[k]) ? d[k] : [];
    var next = arr.filter(function (x) { return x.q !== qText; });
    if (next.length !== arr.length) {
      d[k] = next;
      saveVaultAll(d);
      try { document.dispatchEvent(new CustomEvent("hoot-vault-change", { detail: { kid: k, count: next.length } })); } catch (e) {}
    }
  }

  /* ---------- Grade 7 NY Math Course (19 lessons + Mixed Math Review) ---------- */
  var L = [];
  function lesson(o) { L.push(o); }

  lesson({ id: "m7-unit-rate", title: "Unit rates", std: "7.RP.1", emo: "🚗", topic: /rate|per |speed|unit price/,
    learn: ["A rate compares two different things, like miles and hours. A UNIT rate tells you how much for ONE: miles per 1 hour, dollars per 1 item.",
            "To find a unit rate, divide the first amount by the second: total ÷ how many."],
    vocab: "unit rate = amount for exactly one",
    gen: function () {
      if (Math.random() < 0.5) {
        var k = ri(30, 65), h = ri(2, 6), d = k * h;
        return { q: "A car travels " + d + " miles in " + h + " hours at a steady speed. How many miles per hour?", type: "num", ans: k, unit: "miles per hour",
          diag: function (v) { if (Math.abs(v - d * h) < 0.01) return "You multiplied miles × hours instead of dividing total miles ÷ hours."; },
          steps: ["Unit rate = total miles ÷ hours", d + " ÷ " + h + " = " + k, "Answer: " + k + " miles per hour"],
          hints: ["How many miles in just ONE hour?", "Share the " + d + " miles equally across " + h + " hours.", "Start with " + d + " ÷ " + h + "."] };
      }
      var n = ri(3, 9), each = r2(ri(50, 600) / 100), tot = r2(each * n);
      return { q: n + " notebooks cost " + money(tot) + ". What is the price of ONE notebook (in dollars)?", type: "num", ans: each, unit: "dollars",
        diag: function (v) { if (Math.abs(v - tot * n) < 0.05) return "You multiplied instead of dividing the total cost by " + n + " notebooks."; },
        steps: ["Price of one = total ÷ number of notebooks", money(tot) + " ÷ " + n + " = " + money(each), "Answer: " + money(each)],
        hints: ["You want the cost for exactly one notebook.", "If " + n + " friends split " + money(tot) + " equally, what does each pay?", "Start with " + tot.toFixed(2) + " ÷ " + n + "."] };
    } });

  lesson({ id: "m7-proportional", title: "Proportional or not?", std: "7.RP.2", emo: "📈", topic: /proportion|constant of|table|graph/,
    learn: ["Two amounts are PROPORTIONAL when y ÷ x is the same number every time. That number is the constant of proportionality, k, and y = kx.",
            "Check each pair: divide y by x. If every answer matches, it's proportional. If even one is different, it's not."],
    vocab: "constant of proportionality (k) = y ÷ x, the same for every pair",
    gen: function () {
      var k = ri(2, 9), xs = [ri(1, 3), ri(4, 6), ri(7, 10)], prop = Math.random() < 0.5, c = prop ? 0 : nz(1, 5);
      var ys = xs.map(function (x) { return k * x + c; });
      var table = xs.map(function (x, i) { return "(" + x + ", " + ys[i] + ")"; }).join("  ");
      var ratios = xs.map(function (x, i) { return ys[i] + " ÷ " + x + " = " + r2(ys[i] / x); }).join(";  ");
      return { q: "Is this table proportional? x, y pairs: " + table, type: "mc", choices: ["Yes — y ÷ x is always the same", "No — y ÷ x changes"], ans: prop ? 0 : 1,
        vis: { kind: "coord", xs: xs, ys: ys, prop: prop },
        steps: ["Divide y by x for each pair", ratios, prop ? "All the same (k = " + k + ") → proportional" : "Not all the same → not proportional"],
        hints: ["Work out y ÷ x for every pair.", "Proportional means the same multiplier turns every x into its y.", "First pair: " + ys[0] + " ÷ " + xs[0] + " = " + r2(ys[0] / xs[0]) + ". Now the others."] };
    } });

  lesson({ id: "m7-percent-of", title: "Percent of a number", std: "7.RP.3", emo: "💯", topic: /percent|%/,
    learn: ["Percent means 'out of 100'. 25% is 25/100, which is 0.25.", "To find a percent of a number, change the percent to a decimal and multiply: 25% of 80 = 0.25 × 80 = 20."],
    vocab: "percent = per hundred",
    gen: function () {
      var p = pick([5, 10, 15, 20, 25, 30, 40, 50, 75]), n = pick([20, 40, 60, 80, 120, 160, 200, 240]), a = r2(p * n / 100);
      return { q: "What is " + p + "% of " + n + "?", type: "num", ans: a,
        vis: { kind: "percent-bar", pct: p, whole: String(n), title: p + "% of " + n },
        diag: function (v) { if (Math.abs(v - p * n) < 0.01) return "Remember to divide by 100 — " + p + "% is " + (p / 100) + ", not " + p + "!"; },
        steps: [p + "% = " + (p / 100), (p / 100) + " × " + n + " = " + a, "Answer: " + a],
        hints: ["Change " + p + "% into a decimal first.", "10% of " + n + " is " + (n / 10) + ". How many 10%s (or halves of 10%) make " + p + "%?", p + "% = " + (p / 100) + ", so multiply " + (p / 100) + " × " + n + "."] };
    } });

  lesson({ id: "m7-tax-tip-discount", title: "Tax, tip & discount", std: "7.RP.3", emo: "🏷️", topic: /tax|tip|discount|sale|markup/,
    learn: ["A DISCOUNT takes a percent OFF the price. TAX and TIP ADD a percent ON.", "Find the percent of the price, then subtract it (discount) or add it (tax, tip). Round money to the cent."],
    vocab: "discount = less; tax and tip = more",
    gen: function () {
      var kind = pick(["discount", "tax", "tip"]), P = ri(12, 80);
      var pct = kind === "discount" ? pick([10, 20, 25, 30, 40, 50]) : kind === "tax" ? 8 : pick([15, 18, 20]);
      var part = r2(P * pct / 100), tot = kind === "discount" ? r2(P - part) : r2(P + part);
      var q = kind === "discount" ? "A jacket costs " + money(P) + ". It is " + pct + "% off. What is the sale price?"
        : kind === "tax" ? "A game costs " + money(P) + ". Sales tax is " + pct + "%. What is the total?"
        : "A meal costs " + money(P) + ". You leave a " + pct + "% tip. What is the total with tip?";
      return { q: q, type: "num", ans: tot, unit: "dollars", tol: 0.011,
        vis: { kind: "percent-bar", pct: pct, whole: money(P), mode: kind, title: (kind === "discount" ? "Discount (" + pct + "% OFF)" : kind === "tax" ? "Sales Tax (+" + pct + "%)" : "Tip (+" + pct + "%)") + " on " + money(P) },
        diag: function (v) {
          if (Math.abs(v - part) < 0.02) return "Nice first step — " + money(part) + " is the " + kind + " amount! Now " + (kind === "discount" ? "subtract it from " : "add it to ") + money(P) + ".";
          if (kind === "discount" && Math.abs(v - (P + part)) < 0.02) return "Careful: a discount takes money OFF, so subtract " + money(part) + " instead of adding.";
          if (kind !== "discount" && Math.abs(v - (P - part)) < 0.02) return "Careful: " + kind + " adds ON to the price, so add " + money(part) + " instead of subtracting.";
        },
        steps: [pct + "% of " + money(P) + " = " + (pct / 100) + " × " + P + " = " + money(part), (kind === "discount" ? money(P) + " − " + money(part) : money(P) + " + " + money(part)) + " = " + money(tot), "Answer: " + money(tot)],
        hints: [kind === "discount" ? "Find how much comes OFF, then subtract." : "Find how much gets ADDED, then add it on.", "Another way: the " + (kind === "discount" ? "sale price is " + (100 - pct) : "total is " + (100 + pct)) + "% of the price.", "First: " + (pct / 100) + " × " + P + " = " + part.toFixed(2) + "."] };
    } });

  lesson({ id: "m7-percent-change", title: "Percent increase & decrease", std: "7.RP.3", emo: "📊", topic: /percent (change|increase|decrease)|increase|decrease/,
    learn: ["Percent change = (how much it changed ÷ the ORIGINAL amount) × 100.", "Always divide by where you STARTED, not where you ended."],
    vocab: "original = the starting amount",
    gen: function () {
      var a = pick([20, 40, 50, 80, 100, 200, 250]), p = pick([10, 20, 25, 50]), up = Math.random() < 0.5, b = up ? a + a * p / 100 : a - a * p / 100;
      var bs = b % 1 ? b.toFixed(2) : String(b), diff = r2(Math.abs(b - a));
      return { q: "A price goes from $" + a + " to $" + bs + ". By what percent did it " + (up ? "increase" : "decrease") + "?", type: "num", ans: p, unit: "percent",
        vis: { kind: "percent-bar", pct: p, whole: "$" + a + " (original)", mode: up ? "tax" : "discount", title: "Change of $" + diff + " compared to original $" + a },
        diag: function (v) {
          if (Math.abs(v - p / 100) < 0.005) return "You found the decimal (" + (p / 100) + ")! Multiply by 100 to turn it into a percent.";
          if (Math.abs(v - diff) < 0.01 && diff !== p) return "$" + diff + " is the dollar change — now divide by the ORIGINAL ($" + a + ") and multiply by 100.";
          var wrongDen = r1((diff / b) * 100);
          if (Math.abs(v - wrongDen) < 0.6) return "Looks like you divided by the NEW price ($" + bs + "). Always divide by the ORIGINAL ($" + a + ")!";
        },
        steps: ["Change = " + (up ? bs + " − " + a : a + " − " + bs) + " = " + diff, diff + " ÷ " + a + " = " + (p / 100), (p / 100) + " × 100 = " + p + "%"],
        hints: ["How much did it change? Then compare that to the ORIGINAL price.", "Ask: the change is what fraction of $" + a + "?", "The change is " + diff + ". Now " + diff + " ÷ " + a + "."] };
    } });

  lesson({ id: "m7-int-add", title: "Adding & subtracting integers", std: "7.NS.1", emo: "➖", topic: /integer|negative|number line|add.*negative/,
    learn: ["On a number line, adding a positive moves right; adding a negative moves left.", "Subtracting is adding the opposite: 3 − (−5) = 3 + 5 = 8."],
    vocab: "opposite: the opposite of −5 is 5",
    gen: function () {
      var a = nz(-12, 12), b = nz(-12, 12), plus = Math.random() < 0.5, v = plus ? a + b : a - b;
      return { q: "What is " + sgn(a) + (plus ? " + " : " − ") + paren(b) + "?", type: "num", ans: v,
        vis: { kind: "numberline", a: a, b: b, ans: v },
        diag: function (val) {
          if (val === -v && v !== 0) return "Close — check the sign! Your number has the right size, just the opposite sign.";
          if (!plus && b < 0 && val === a + b) return "Subtracting a negative is ADDING a positive: " + sgn(a) + " − (" + sgn(b) + ") = " + sgn(a) + " + " + Math.abs(b) + ".";
        },
        steps: plus ? ["Start at " + sgn(a) + ", move " + Math.abs(b) + (b > 0 ? " right" : " left"), "= " + sgn(v)] : ["Subtract = add the opposite: " + sgn(a) + " + " + paren(-b), "= " + sgn(v)],
        hints: [plus ? "Picture a number line: start at " + sgn(a) + "." : "Turn the subtraction into adding the opposite.", "Think money: " + (a >= 0 ? "you have $" + a : "you owe $" + Math.abs(a)) + ", then " + (plus ? (b > 0 ? "get $" + b : "spend $" + Math.abs(b)) : (b > 0 ? "spend $" + b : "a $" + Math.abs(b) + " debt is cancelled")) + ".", plus ? "Start at " + sgn(a) + " and move " + Math.abs(b) + (b > 0 ? " right." : " left.") : sgn(a) + " − " + paren(b) + " = " + sgn(a) + " + " + paren(-b) + "."] };
    } });

  lesson({ id: "m7-int-mul", title: "Multiplying & dividing integers", std: "7.NS.2", emo: "✖️", topic: /multipl|divid|integer|negative/,
    learn: ["Same signs → positive answer. Different signs → negative answer.", "Multiply or divide the numbers as usual, then decide the sign."],
    vocab: "(−)(−) = +,  (−)(+) = −",
    gen: function () {
      var a = nz(-9, 9), b = nz(-9, 9), mul = Math.random() < 0.5;
      if (mul) {
        var v = a * b;
        return { q: "What is " + paren(a) + " × " + paren(b) + "?", type: "num", ans: v,
          diag: function (val) { if (val === -v) return "Right multiplication, wrong sign! " + ((a < 0) === (b < 0) ? "Same signs always make a POSITIVE." : "Different signs always make a NEGATIVE."); },
          steps: [Math.abs(a) + " × " + Math.abs(b) + " = " + Math.abs(v), (a < 0) === (b < 0) ? "Same signs → positive" : "Different signs → negative", "Answer: " + sgn(v)],
          hints: ["Multiply the numbers first, sign later.", "Count the negatives: 0 or 2 → positive, 1 → negative.", Math.abs(a) + " × " + Math.abs(b) + " = " + Math.abs(v) + ". Now the sign?"] };
      }
      var p = a * b;
      return { q: "What is " + sgn(p) + " ÷ " + paren(a) + "?", type: "num", ans: b,
        diag: function (val) { if (val === -b) return "Right division, wrong sign! " + ((p < 0) === (a < 0) ? "Same signs → POSITIVE." : "Different signs → NEGATIVE."); },
        steps: [Math.abs(p) + " ÷ " + Math.abs(a) + " = " + Math.abs(b), (p < 0) === (a < 0) ? "Same signs → positive" : "Different signs → negative", "Answer: " + sgn(b)],
        hints: ["Divide the numbers, then decide the sign.", "Check by multiplying back: your answer × " + paren(a) + " should give " + sgn(p) + ".", Math.abs(p) + " ÷ " + Math.abs(a) + " = " + Math.abs(b) + ". Now the sign?"] };
    } });

  /* NEW NY 7.NS.1–3 LESSON: Rational numbers (signed fractions & decimals) */
  lesson({ id: "m7-rationals", title: "Rational numbers: fractions & decimals", std: "7.NS.1, 7.NS.2", emo: "🍕", topic: /rational|fraction|decimal|negative fraction/,
    learn: ["Rational numbers include positive and negative fractions and decimals, like −1.5 or −3/4.",
            "The exact same integer sign rules apply! Line up decimal points to add/subtract, or use a common denominator for fractions."],
    vocab: "rational number = any number that can be written as a fraction a/b",
    gen: function () {
      if (Math.random() < 0.55) {
        var a = r1(nz(-45, 45) / 10), b = r1(nz(-45, 45) / 10), plus = Math.random() < 0.5;
        var v = r1(plus ? a + b : a - b);
        return { q: "Evaluate:  " + sgn(a) + (plus ? " + " : " − ") + paren(b), type: "num", ans: v, tol: 0.011,
          vis: { kind: "numberline", a: a, b: b, ans: v },
          diag: function (val) { if (Math.abs(val + v) < 0.02 && v !== 0) return "Almost! Right digits, opposite sign — double-check which number is farther from zero."; },
          steps: [plus ? "Combine " + sgn(a) + " and " + sgn(b) : "Add the opposite: " + sgn(a) + " + " + paren(-b), "= " + sgn(v)],
          hints: ["Line up the decimal points and watch the signs.", plus ? "Same signs add and keep the sign; different signs subtract and keep the larger size's sign." : "Turn subtraction into adding the opposite first.", plus ? "Start at " + sgn(a) + " on the number line." : "Rewrite as " + sgn(a) + " + " + paren(-b) + "."] };
      }
      var d = pick([4, 5, 8, 10]), n1 = nz(-7, 7), n2 = nz(-7, 7), vF = (n1 + n2) / d;
      return { q: "Add the fractions:  " + sgn(n1) + "/" + d + " + " + paren(n2) + "/" + d + "  (fraction or decimal)", type: "num", ans: vF, tol: 0.006,
        steps: ["Same denominator (" + d + "), so add the numerators: " + sgn(n1) + " + " + paren(n2) + " = " + sgn(n1 + n2), "Answer: " + sgn(n1 + n2) + "/" + d + " = " + r2(vF)],
        hints: ["The denominators already match (" + d + ")!", "Just add the top numbers (numerators) using integer rules.", "Compute " + sgn(n1) + " + " + paren(n2) + ", then put it over " + d + "."] };
    } });

  lesson({ id: "m7-like-terms", title: "Combining like terms", std: "7.EE.1", emo: "🧮", topic: /like terms|simplif|expression/,
    learn: ["Like terms have the same variable part: 3x and 5x are like terms; 3x and 5 are not.", "Add the x-terms together and the plain numbers together."],
    vocab: "term = one piece of an expression, like 4x or −7",
    gen: function () {
      var a = nz(2, 9), b = nz(-9, 9), c = nz(-6, 6), d = nz(-9, 9);
      if (a + c === 0) c = c + 1 === 0 ? 2 : c + 1;
      var right = lin(a + c, b + d), w1 = lin(a + c, b - d), w2 = lin(a + b + c + d, 0), w3 = lin(a - c, b + d);
      var choices = [right, w1, w2, w3].filter(function (x, i, arr) { return arr.indexOf(x) === i; });
      while (choices.length < 3) choices.push(lin(a + c + 1, b + d));
      var shuffled = shuf(choices);
      return { q: "Simplify:  " + lin(a, b) + (c > 0 ? " + " : " − ") + Math.abs(c) + "x" + (d > 0 ? " + " : " − ") + Math.abs(d), type: "mc", choices: shuffled, ans: shuffled.indexOf(right),
        steps: ["x-terms: " + a + "x " + (c > 0 ? "+ " : "− ") + Math.abs(c) + "x = " + (a + c) + "x", "numbers: " + sgn(b) + (d > 0 ? " + " : " − ") + Math.abs(d) + " = " + sgn(b + d), "Answer: " + right],
        hints: ["Group the x-terms, then the numbers.", "Imagine x is a box: " + a + " boxes and " + (c > 0 ? c + " more boxes" : Math.abs(c) + " boxes taken away") + ".", "x-terms first: " + a + " " + (c > 0 ? "+ " : "− ") + Math.abs(c) + " = " + (a + c) + "."] };
    } });

  lesson({ id: "m7-distribute", title: "The distributive property", std: "7.EE.1", emo: "🎁", topic: /distribut|expand|brackets|parenthes/,
    learn: ["a(x + b) means a groups of (x + b). Multiply a by EVERY term inside the brackets.", "3(x + 4) = 3·x + 3·4 = 3x + 12."],
    vocab: "distribute = share the multiplier with every term",
    gen: function () {
      var a = nz(2, 9) * (Math.random() < 0.25 ? -1 : 1), b = nz(-9, 9);
      var right = lin(a, a * b), w = [lin(a, b), lin(1, a * b), lin(a, a + b)];
      var all = [right].concat(w).filter(function (x, i, arr) { return arr.indexOf(x) === i; });
      var sh = shuf(all);
      return { q: "Expand:  " + (a === -1 ? "−" : sgn(a)) + "(x " + (b > 0 ? "+ " : "− ") + Math.abs(b) + ")", type: "mc", choices: sh, ans: sh.indexOf(right),
        steps: [sgn(a) + " × x = " + lin(a, 0), sgn(a) + " × " + paren(b) + " = " + sgn(a * b), "Answer: " + right],
        hints: ["Multiply " + sgn(a) + " by BOTH terms inside.", "Think of " + Math.abs(a) + " copies of (x " + (b > 0 ? "+ " : "− ") + Math.abs(b) + ") added together" + (a < 0 ? ", then take the opposite." : "."), "First term: " + sgn(a) + " × x = " + lin(a, 0) + "."] };
    } });

  lesson({ id: "m7-two-step", title: "Solving two-step equations", std: "7.EE.4", emo: "⚖️", topic: /equation|solve|variable/,
    learn: ["Undo the operations in reverse order: first undo the + or −, then undo the × or ÷.", "Whatever you do to one side, do to the other side, so it stays balanced."],
    vocab: "solve = find the value of x that makes it true",
    gen: function () {
      var x = nz(-10, 10), p = ri(2, 9), q = nz(-15, 15), r = p * x + q;
      return { q: "Solve for x:  " + lin(p, q) + " = " + sgn(r), type: "num", ans: x,
        vis: { kind: "balance", left: lin(p, q), op: "=", right: sgn(r), solved: "x = " + sgn(x) },
        diag: function (val) {
          if (val === r - q) return "Great first step! " + p + "x = " + sgn(r - q) + " — now divide both sides by " + p + ".";
          if (Math.abs(val - (r + q) / p) < 0.01) return "Watch the opposite operation: to undo " + (q > 0 ? "+ " + q : "− " + Math.abs(q)) + ", " + (q > 0 ? "subtract " + q : "add " + Math.abs(q)) + " on both sides.";
          if (val === -x) return "Almost! Check the sign when dividing " + sgn(r - q) + " ÷ " + p + ".";
        },
        steps: [(q > 0 ? "Subtract " + q + " from" : "Add " + Math.abs(q) + " to") + " both sides: " + p + "x = " + sgn(r - q), "Divide both sides by " + p + ": x = " + sgn(r - q) + " ÷ " + p, "x = " + sgn(x) + "   (check: " + p + "·" + paren(x) + " " + (q > 0 ? "+ " : "− ") + Math.abs(q) + " = " + sgn(r) + ")"],
        hints: ["Get the x-term alone first: deal with the " + sgn(q) + ".", "Think backwards: something times " + p + ", then " + (q > 0 ? "plus " + q : "minus " + Math.abs(q)) + ", gave " + sgn(r) + ".", (q > 0 ? "Subtract " + q + " from" : "Add " + Math.abs(q) + " to") + " both sides: " + p + "x = " + sgn(r - q) + "."] };
    } });

  lesson({ id: "m7-inequality", title: "Two-step inequalities", std: "7.EE.4", emo: "↔️", topic: /inequalit|greater than|less than/,
    learn: ["Solve an inequality like an equation: undo + or −, then × or ÷.", "One new rule: if you multiply or divide by a NEGATIVE number, flip the inequality sign."],
    vocab: "> greater than,  < less than",
    gen: function () {
      var x = nz(-8, 8), p = nz(-6, 6), q = nz(-12, 12); if (Math.abs(p) === 1) p = p * 2;
      var gt = Math.random() < 0.5, r = p * x + q, flip = p < 0, sym = (gt !== flip) ? ">" : "<";
      var right = "x " + sym + " " + sgn(x), wrongSym = sym === ">" ? "<" : ">";
      var choices = [right, "x " + wrongSym + " " + sgn(x), "x " + sym + " " + sgn(-x), "x " + sym + " " + sgn(r)].filter(function (c, i, a) { return a.indexOf(c) === i; });
      var sh = shuf(choices);
      return { q: "Solve:  " + lin(p, q) + " " + (gt ? ">" : "<") + " " + sgn(r), type: "mc", choices: sh, ans: sh.indexOf(right),
        vis: { kind: "balance", left: lin(p, q), op: gt ? ">" : "<", right: sgn(r), solved: right },
        steps: [(q > 0 ? "Subtract " + q : "Add " + Math.abs(q)) + ": " + lin(p, 0) + " " + (gt ? ">" : "<") + " " + sgn(r - q), "Divide by " + sgn(p) + (flip ? " — negative, so FLIP the sign" : ""), "Answer: " + right],
        hints: ["Do the same steps as an equation.", flip ? "You'll divide by a negative — what happens to the sign then?" : "Dividing by a positive keeps the sign the same.", (q > 0 ? "Subtract " + q : "Add " + Math.abs(q)) + " first: " + lin(p, 0) + " " + (gt ? ">" : "<") + " " + sgn(r - q) + "."] };
    } });

  lesson({ id: "m7-circles", title: "Circles: circumference & area", std: "7.G.4", emo: "⭕", topic: /circle|circumference|radius|diameter|pi/,
    learn: ["Circumference (distance around) = 2 × π × r.  Area (space inside) = π × r × r.", "Use π ≈ 3.14 and round to the nearest tenth. The radius is half the diameter."],
    vocab: "radius r = centre to edge; diameter = 2r",
    gen: function () {
      var r = ri(2, 12), useD = Math.random() < 0.35, area = Math.random() < 0.5, v = area ? r1(3.14 * r * r) : r1(2 * 3.14 * r);
      var given = useD ? "diameter " + (2 * r) + " cm" : "radius " + r + " cm";
      var otherFormula = area ? r1(2 * 3.14 * r) : r1(3.14 * r * r);
      var usedDiamAsR = area ? r1(3.14 * (2 * r) * (2 * r)) : r1(2 * 3.14 * (2 * r));
      return { q: "A circle has a " + given + ". Find its " + (area ? "AREA (cm²)" : "CIRCUMFERENCE (cm)") + ". Use π ≈ 3.14, round to the nearest tenth.", type: "num", ans: v, tol: 0.06,
        vis: { kind: "circle", r: r, useD: useD, area: area },
        diag: function (val) {
          if (useD && Math.abs(val - usedDiamAsR) < 0.2) return "Aha! You plugged the DIAMETER (" + (2 * r) + ") in for r — cut it in half first so r = " + r + "!";
          if (Math.abs(val - otherFormula) < 0.2) return "That's the " + (area ? "circumference (2πr)" : "area (πr²)") + " — this question asks for " + (area ? "AREA (π × r × r)" : "CIRCUMFERENCE (2 × π × r)") + ".";
        },
        steps: [useD ? "Radius = " + (2 * r) + " ÷ 2 = " + r : "Radius = " + r, area ? "Area = 3.14 × " + r + " × " + r + " = " + r2(3.14 * r * r) : "C = 2 × 3.14 × " + r + " = " + r2(2 * 3.14 * r), "Rounded: " + v],
        hints: [area ? "Area uses r × r." : "Circumference uses 2 × r.", useD ? "Careful: you were given the DIAMETER. Halve it first." : "Plug r = " + r + " into the formula.", area ? "Start: 3.14 × " + r + " × " + r + "." : "Start: 2 × 3.14 × " + r + "."] };
    } });

  lesson({ id: "m7-scale", title: "Scale drawings", std: "7.G.1", emo: "🗺️", topic: /scale|map|drawing/,
    learn: ["A scale like 1 cm : 5 km means every 1 cm on the map is 5 km in real life.", "Real distance = map distance × the scale number."],
    vocab: "scale = map size : real size",
    gen: function () {
      var s = pick([2, 4, 5, 10, 20, 25]), d = r1(ri(3, 18) / 2), v = r1(d * s);
      return { q: "On a map, 1 cm = " + s + " km. Two towns are " + d + " cm apart on the map. How far apart are they really (km)?", type: "num", ans: v, tol: 0.01,
        vis: { kind: "scale", s: s, d: d },
        steps: ["Real = map × scale", d + " × " + s + " = " + v, "Answer: " + v + " km"],
        hints: ["Every 1 cm stands for " + s + " km.", "How many centimetres? That many lots of " + s + " km.", "Multiply " + d + " × " + s + "."] };
    } });

  lesson({ id: "m7-angles", title: "Angle pairs", std: "7.G.5", emo: "📐", topic: /angle|complementary|supplementary|vertical/,
    learn: ["Complementary angles add to 90°. Supplementary angles add to 180°.", "Vertical angles (opposite each other where two lines cross) are equal."],
    vocab: "complementary = 90°, supplementary = 180°",
    gen: function () {
      var t = pick(["comp", "supp", "vert"]), a = t === "comp" ? ri(12, 78) : ri(20, 160), v = t === "comp" ? 90 - a : t === "supp" ? 180 - a : a;
      var name = t === "comp" ? "complementary" : t === "supp" ? "supplementary" : "vertical";
      return { q: "Two angles are " + name + ". One is " + a + "°. What is the other angle (degrees)?", type: "num", ans: v,
        vis: { kind: "angle", sub: t, a: a },
        diag: function (val) {
          if (t === "comp" && val === 180 - a) return "180° is supplementary! Complementary angles form a 90° corner: 90 − " + a + ".";
          if (t === "supp" && val === 90 - a) return "90° is complementary! Supplementary angles make a straight 180° line: 180 − " + a + ".";
          if (t === "vert" && (val === 180 - a || val === 90 - a)) return "No subtraction needed — vertical angles across an X are EQUAL!";
        },
        steps: [t === "vert" ? "Vertical angles are equal" : name + " → they add to " + (t === "comp" ? 90 : 180) + "°", t === "vert" ? "Other = " + a + "°" : (t === "comp" ? 90 : 180) + " − " + a + " = " + v, "Answer: " + v + "°"],
        hints: ["What do " + name + " angles add up to" + (t === "vert" ? " — or are they equal?" : "?"), t === "comp" ? "Think of a corner of a square: 90°." : t === "supp" ? "Think of a straight line: 180°." : "Vertical angles are mirror images across the crossing point.", t === "vert" ? "They're equal." : "Start: " + (t === "comp" ? 90 : 180) + " − " + a + "."] };
    } });

  /* NEW NY 7.G.6 LESSON: Volume & surface area of rectangular prisms */
  lesson({ id: "m7-prism-volume", title: "Prisms: volume & surface area", std: "7.G.6", emo: "📦", topic: /volume|surface area|prism|cube|box/,
    learn: ["VOLUME measures space INSIDE a 3D box: V = length × width × height (cubic units).",
            "SURFACE AREA measures the OUTSIDE wrapping of all 6 faces: SA = 2(lw + lh + wh) (square units)."],
    vocab: "volume = inside (l × w × h) · surface area = outside (all 6 faces)",
    gen: function () {
      var l = ri(3, 9), w = ri(2, 7), h = ri(2, 6), doSA = Math.random() < 0.45;
      var vol = l * w * h, halfSA = l * w + l * h + w * h, sa = 2 * halfSA;
      return {
        q: "A rectangular prism is " + l + " cm long, " + w + " cm wide, and " + h + " cm tall. Find its " + (doSA ? "SURFACE AREA (cm²)." : "VOLUME (cm³)."),
        type: "num", ans: doSA ? sa : vol,
        vis: { kind: "prism", l: l, w: w, h: h, mode: doSA ? "sa" : "vol" },
        diag: function (val) {
          if (!doSA && val === l + w + h) return "You added the sides! Volume multiplies: " + l + " × " + w + " × " + h + ".";
          if (doSA && val === halfSA) return "That's 3 of the 6 faces! Multiply by 2 to cover front+back, top+bottom, left+right.";
          if (doSA && val === vol) return "That's the VOLUME! Surface area adds the areas of all 6 outside faces: 2(lw + lh + wh).";
        },
        steps: doSA
          ? ["Find 3 face areas: lw = " + (l * w) + ", lh = " + (l * h) + ", wh = " + (w * h), "Add them: " + (l * w) + " + " + (l * h) + " + " + (w * h) + " = " + halfSA, "Double for all 6 faces: 2 × " + halfSA + " = " + sa + " cm²"]
          : ["Volume = length × width × height", l + " × " + w + " × " + h + " = " + vol, "Answer: " + vol + " cm³"],
        hints: [doSA ? "A box has 6 faces in 3 matching pairs." : "Multiply all three dimensions together.", doSA ? "Find top (lw), front (lh), and side (wh), then double the sum." : "First find the base area (" + l + " × " + w + "), then multiply by height (" + h + ").", doSA ? "Start: 2 × (" + (l * w) + " + " + (l * h) + " + " + (w * h) + ")." : "Start: " + l + " × " + w + " = " + (l * w) + ", then × " + h + "."]
      };
    } });

  lesson({ id: "m7-probability", title: "Probability", std: "7.SP.5", emo: "🎲", topic: /probab|chance|likely|odds/,
    learn: ["Probability = number of ways it can happen ÷ total number of outcomes.", "It's between 0 (impossible) and 1 (certain). Write it as a fraction, decimal or percent."],
    vocab: "outcome = one possible result",
    gen: function () {
      var r = ri(1, 6), b = ri(1, 6), g = ri(1, 6), tot = r + b + g, col = pick(["red", "blue", "green"]), n = col === "red" ? r : col === "blue" ? b : g;
      return { q: "A bag has " + r + " red, " + b + " blue and " + g + " green marbles. You pick one without looking. What is P(" + col + ")? (fraction, decimal or %)", type: "prob", ans: n / tot,
        vis: { kind: "marbles", r: r, b: b, g: g },
        steps: ["Ways to get " + col + ": " + n, "Total marbles: " + r + " + " + b + " + " + g + " = " + tot, "P(" + col + ") = " + n + "/" + tot + (gcd(n, tot) > 1 ? " = " + frac(n, tot) : "")],
        hints: ["Count the " + col + " marbles, then all the marbles.", "If you did this many times, what fraction of picks would be " + col + "?", "Total = " + tot + ". So P = (" + col + " count)/" + tot + "."] };
    } });

  /* NEW NY 7.SP.8 LESSON: Compound probability & tree diagrams */
  lesson({ id: "m7-compound-prob", title: "Compound probability", std: "7.SP.8", emo: "🌳", topic: /compound|tree diagram|coin|die|dice|two events/,
    learn: ["A COMPOUND event combines two or more independent events, like flipping a coin AND rolling a die.",
            "Multiply the probabilities of each step: P(A and B) = P(A) × P(B)."],
    vocab: "independent events = one result doesn't change the next",
    gen: function () {
      var sc = pick([
        { q: "You flip a fair coin and roll a 6-sided die. What is P(Heads AND rolling a 6)? (fraction or decimal)", s1: "Heads (1/2)", s2: "Roll 6 (1/6)", p1: "1/2", p2: "1/6", ans: 1 / 12, f: "1/12" },
        { q: "You flip a fair coin and roll a 6-sided die. What is P(Tails AND an even number)? (fraction or decimal)", s1: "Tails (1/2)", s2: "Even (3/6)", p1: "1/2", p2: "1/2", ans: 1 / 4, f: "1/4" },
        { q: "You flip two fair coins. What is P(Heads on BOTH coins)? (fraction or decimal)", s1: "Heads (1/2)", s2: "Heads (1/2)", p1: "1/2", p2: "1/2", ans: 1 / 4, f: "1/4" },
        { q: "A spinner has 4 equal sections (red, blue, green, yellow). You spin it AND flip a coin. What is P(Blue AND Heads)? (fraction or decimal)", s1: "Blue (1/4)", s2: "Heads (1/2)", p1: "1/4", p2: "1/2", ans: 1 / 8, f: "1/8" },
        { q: "You roll a 6-sided die and spin a 3-color equal spinner. What is P(rolling > 4 AND landing on red)? (fraction or decimal)", s1: ">4 (2/6 = 1/3)", s2: "Red (1/3)", p1: "1/3", p2: "1/3", ans: 1 / 9, f: "1/9" }
      ]);
      return { q: sc.q, type: "prob", ans: sc.ans,
        vis: { kind: "tree", s1: sc.s1, s2: sc.s2 },
        steps: ["Step 1 probability: " + sc.p1, "Step 2 probability: " + sc.p2, "Multiply: " + sc.p1 + " × " + sc.p2 + " = " + sc.f],
        hints: ["Find the probability of the first event, then the second.", "For 'A AND B' with independent events, MULTIPLY the two fractions.", "Multiply " + sc.p1 + " × " + sc.p2 + "."] };
    } });

  /* NEW NY 7.SP.3–4 LESSON: Mean, median, range & MAD */
  lesson({ id: "m7-data-stats", title: "Mean, median & MAD", std: "7.SP.3, 7.SP.4", emo: "📉", topic: /mean|median|range|mad|average|spread|data/,
    learn: ["MEAN (average) = sum of values ÷ how many values. MEDIAN = middle value when sorted in order.",
            "MAD (Mean Absolute Deviation) measures spread: find how far each value is from the mean, then average those distances."],
    vocab: "MAD = average distance from the mean",
    gen: function () {
      var mode = pick(["mean", "median", "mad"]);
      if (mode === "median") {
        var base = [ri(4, 14), ri(4, 14), ri(4, 14), ri(4, 14), ri(4, 14)];
        var sorted = base.slice().sort(function (a, b) { return a - b; });
        return { q: "Find the MEDIAN of this data set: " + base.join(", "), type: "num", ans: sorted[2],
          vis: { kind: "dotplot", nums: base },
          steps: ["Sort from least to greatest: " + sorted.join(", "), "The middle value (3rd of 5) is " + sorted[2]],
          hints: ["Always sort the numbers from smallest to largest first!", "With 5 numbers, the median is right in the middle (3rd).", "Sorted: " + sorted.join(", ") + "."] };
      }
      var m = ri(5, 12), d1 = ri(1, 3), d2 = ri(1, 4);
      var nums = shuf([m - d2, m - d1, m, m + d1, m + d2]);
      if (mode === "mean") {
        return { q: "Find the MEAN (average) of: " + nums.join(", "), type: "num", ans: m,
          vis: { kind: "dotplot", nums: nums },
          steps: ["Add all 5 numbers: " + nums.join(" + ") + " = " + (m * 5), "Divide by 5: " + (m * 5) + " ÷ 5 = " + m],
          hints: ["Mean = sum of all values ÷ count.", "Add all five numbers first, then divide by 5.", "Sum = " + (m * 5) + ". Now " + (m * 5) + " ÷ 5."] };
      }
      var dists = nums.map(function (x) { return Math.abs(x - m); });
      var mad = r1((dists[0] + dists[1] + dists[2] + dists[3] + dists[4]) / 5);
      return { q: "The mean of [" + nums.join(", ") + "] is " + m + ". What is the MAD (Mean Absolute Deviation)?", type: "num", ans: mad, tol: 0.06,
        vis: { kind: "dotplot", nums: nums },
        steps: ["Distance of each number from mean " + m + ": " + dists.join(", "), "Sum of distances = " + (dists[0] + dists[1] + dists[2] + dists[3] + dists[4]), "Divide by 5: MAD = " + mad],
        hints: ["Find how far each number is from " + m + " (always positive).", "Average those 5 distances together.", "Distances from " + m + ": " + dists.join(", ") + ". Add them and divide by 5."] };
    } });

  /* ---------- Answer checking ---------- */
  function parseAns(s, type) {
    s = String(s || "").trim().replace(/[−–]/g, "-").replace(/[$,\s]|dollars?|cm[²³]?|km|°|degrees|miles( per hour)?|mph|percent/gi, "");
    if (!s) return null;
    var pct = /%$/.test(s); if (pct) s = s.slice(0, -1);
    var m = /^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(s), v;
    if (m) v = +m[1] / +m[2]; else if (/^-?\d*\.?\d+$/.test(s)) v = +s; else return null;
    if (pct && type === "prob") v = v / 100;
    return v;
  }
  function correct(p, input) {
    if (p.type === "mc" || p.type === "highlight") return +input === p.ans;
    if (p.type === "order") return String(input) === p.orderItems.join("|");
    if (p.type === "cer") return true;
    var v = parseAns(input, p.type); if (v == null) return null;
    return Math.abs(v - p.ans) <= (p.tol || (p.type === "prob" ? 0.005 : 1e-6));
  }

  /* ---------- Tutor voice (pre-recorded std-* clips only, never device TTS) ---------- */
  var stdEl = null, stdPoolEl = null, stdQueue = [], stdBusy = false, stdGen = 0;
  function stdNext() {
    if (stdBusy || !stdQueue.length) return;
    var f = stdQueue.shift(), gen = stdGen;
    stdBusy = true;
    try {
      if (!stdPoolEl) stdPoolEl = new Audio();
      var a = stdPoolEl;
      a.__govWait = false; a.__govNext = null; a.onended = a.onerror = null;
      try { a.pause(); } catch (e) {}
      a.src = "assets/voice/" + f;
      stdEl = a;
      a.onended = a.onerror = function () { if (gen === stdGen) { stdBusy = false; stdNext(); } };
      var p = a.play(); if (p && p.catch) p.catch(function () { if (gen === stdGen) { stdBusy = false; stdNext(); } });
    } catch (e) { stdBusy = false; }
  }
  function stdSay(files, append) {
    if (!append) stdStop();
    (files || []).forEach(function (f) { if (f) stdQueue.push(f); });
    stdNext();
  }
  function stdStop() {
    stdGen++; stdQueue.length = 0; stdBusy = false;
    if (stdEl) { stdEl.__govWait = false; stdEl.__govNext = null; stdEl.onended = stdEl.onerror = null; try { stdEl.pause(); } catch (e) {} stdEl = null; }
  }

  /* ---------- UI Helpers ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function qHtml(p) { return (p.passage ? '<blockquote class="hs-pass">' + esc(p.passage) + "</blockquote>" : "") + '<p class="hs-q">' + esc(p.q) + "</p>"; }
  function visHtml(lesson, p, reveal) {
    if (!window.HootStudyVisuals) return "";
    if (p && p.type === "order" && !reveal) return "";
    return window.HootStudyVisuals.render(lesson, p, { reveal: !!reveal });
  }
  function toolbarHtml(courseId, lessonId) {
    var dark = document.body.classList.contains("hs-dark");
    var showCalc = courseId === "math7" || courseId === "sci7";
    var calcLocked = showCalc && window.HootStudyPro && window.HootStudyPro.isCalcLocked && window.HootStudyPro.isCalcLocked(lessonId);
    return '<div class="hs-tools">' +
      '<button type="button" class="hs-tool" data-hs-tool="pad" aria-expanded="false">✏️ Scratchpad</button>' +
      (showCalc ? '<button type="button" class="hs-tool" data-hs-tool="calc" aria-expanded="false">' + (calcLocked ? "🧠 No Calc" : "🧮 Calculator") + "</button>" : "") +
      '<button type="button" class="hs-tool" data-hs-tool="ref" aria-expanded="false">📖 Reference</button>' +
      '<button type="button" class="hs-tool" data-hs-tool="dark">' + (dark ? "☀️ Light" : "🌙 Focus Dark") + "</button>" +
      '</div><div class="hs-drawer" id="hs-ref-drawer" hidden>' +
      (window.HootStudyVisuals ? window.HootStudyVisuals.referenceHtml(courseId) : "") +
      '</div><div class="hs-drawer" id="hs-pad-drawer" hidden></div>' +
      (showCalc ? '<div class="hs-drawer" id="hs-calc-drawer" hidden></div>' : "");
  }

  function interactiveInputHtml(p) {
    if (p.type === "mc") {
      return '<div class="hs-mc">' + p.choices.map(function (c, i) {
        return '<button type="button" class="hs-choice" data-hs-pick="' + i + '">' + esc(c) + "</button>";
      }).join("") + "</div>";
    }
    if (p.type === "highlight") {
      return '<div class="hs-hl-box" role="group" aria-label="Tap the matching part of the passage">' +
        '<p class="hs-hl-tip">👆 Tap the exact highlighted segment that answers the question:</p><div class="hs-hl-text">' +
        p.segments.map(function (seg, i) {
          return '<button type="button" class="hs-seg" data-hs-pick="' + i + '">' + esc(seg.text) + "</button> ";
        }).join("") + "</div></div>";
    }
    if (p.type === "order") {
      var shuffled = p._shuf || (p._shuf = shuf(p.orderItems));
      return '<div class="hs-ord" data-hs-ord="1">' +
        '<p class="hs-hl-tip">Tap items in order from FIRST to LAST (tap an item in your list to remove it):</p>' +
        '<div class="hs-ord-picked" id="hs-ord-picked"></div>' +
        '<div class="hs-ord-pool">' + shuffled.map(function (txt, idx) {
          return '<button type="button" class="hs-ord-chip" data-hs-ord-add="' + idx + '">' + esc(txt) + "</button>";
        }).join("") + "</div>" +
        '<div class="hs-ord-acts"><button type="button" class="hs-btn sm" data-hs-ord-clear="1">Reset</button>' +
        '<button type="button" class="hs-btn pri sm" data-hs-ord-check="1" disabled>Check order</button></div></div>';
    }
    if (p.type === "cer") {
      return '<form class="hs-cer" data-hs-cer="1">' +
        '<label class="hs-cer-lbl">1. Claim (your clear position)<textarea class="hs-cer-in" name="c" rows="2" placeholder="State your claim clearly…"></textarea></label>' +
        '<label class="hs-cer-lbl">2. Evidence (specific fact or quote from the passage)<textarea class="hs-cer-in" name="e" rows="2" placeholder="According to the passage, …"></textarea></label>' +
        '<label class="hs-cer-lbl">3. Reasoning (explain how your evidence proves your claim)<textarea class="hs-cer-in" name="r" rows="2" placeholder="This shows that … because …"></textarea></label>' +
        '<button type="submit" class="hs-btn pri">Check my CER draft ▶</button></form>';
    }
    return '<form class="hs-form" data-hs-form="1"><input class="hs-in" inputmode="decimal" autocomplete="off" aria-label="Your answer" placeholder="Your answer' +
      (p.unit ? " (" + esc(p.unit) + ")" : "") + '"><button type="submit" class="hs-btn pri">Check</button>' +
      '<div class="hs-qbar" aria-label="Quick math symbols">' +
        '<button type="button" class="hs-sym" data-hs-sym="-" title="Negative sign">−</button>' +
        '<button type="button" class="hs-sym" data-hs-sym="/" title="Fraction slash">/</button>' +
        '<button type="button" class="hs-sym" data-hs-sym="." title="Decimal point">.</button>' +
      "</div></form>";
  }

  var STEPS = ["Learn", "Watch", "Together", "Your turn", "Recap"];
  var cur = null;

  function play(lesson, body, opts) {
    opts = opts || {};
    stdStop();
    syncDarkForProfile(activeKid());
    var S = cur = { lesson: lesson, step: 0, wrongFirst: 0, misses: [], t0: Date.now(), ordPicked: [], modeTag: opts.modeTag || "lesson" };
    if (lesson.newRun) lesson.newRun();

    var ex = opts.problems ? null : lesson.gen();
    var together = opts.problems ? [] : [lesson.gen(), lesson.gen()];
    var quiz = opts.problems ? opts.problems.slice() : [0, 1, 2, 3, 4].map(function () { return lesson.gen(); });

    function bar() {
      if (opts.stepsLabel) {
        return '<p class="hs-mode-pill">' + esc(opts.stepsLabel) + "</p>";
      }
      return '<ol class="hs-steps">' + STEPS.map(function (s, i) {
        return '<li class="' + (i < S.step ? "done" : i === S.step ? "now" : "") + '">' + (i < S.step ? "✓ " : "") + s + "</li>";
      }).join("") + "</ol>";
    }
    function shell(inner) {
      if (cur !== S) return;
      body.innerHTML = '<div class="hs"><div class="hs-toprow"><p class="hs-std">' + esc(lesson.std) + " · " + esc(lesson.subject || "Grade 7 math") + "</p>" +
        toolbarHtml(lesson.course || "math7", (S.p && S.p._lesson && S.p._lesson.id) || lesson.id) + "</div>" + bar() + inner + "</div>";
      body.scrollTop = 0;
    }
    function learn() {
      S.step = 0;
      shell('<section class="hs-card"><h3>' + esc(lesson.title) + "</h3>" +
        visHtml(lesson, null, false) +
        lesson.learn.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
        '<p class="hs-vocab"><b>Key idea:</b> ' + esc(lesson.vocab) + '</p><button type="button" class="hs-btn pri" data-hs="next">Watch an example ▶</button></section>');
      stdSay(["std-" + lesson.id + "-learn1.mp3", "std-" + lesson.id + "-learn2.mp3", "std-" + lesson.id + "-vocab.mp3"]);
    }
    function watch() {
      S.step = 1; var shown = 1;
      S._wSpoken = 0;
      stdSay(["std-watch.mp3"]);
      function draw() {
        while (S._wSpoken < shown) {
          var wi = S._wSpoken++;
          var wc = wi === 0 ? ex.methodClip : wi === 1 ? ex.whyClip : null;
          if (wc) stdSay([wc], true);
        }
        shell('<section class="hs-card">' + qHtml(ex) + visHtml(lesson, ex, shown >= ex.steps.length) +
          '<ol class="hs-sol">' + ex.steps.slice(0, shown).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" +
          (shown < ex.steps.length ? '<button type="button" class="hs-btn" data-hs="more">Next step ▼</button>' : '<button type="button" class="hs-btn pri" data-hs="next">Try one together ▶</button>') + "</section>");
      }
      S.more = function () { shown++; draw(); };
      draw();
    }
    function problemHtml(p, idx, mode, total) {
      var label = opts.modeTag === "test"
        ? "Practice Test · Question " + (idx + 1) + " of " + total + (p._std ? " (" + p._std + ")" : "")
        : opts.modeTag === "vault"
          ? "Mistake Vault · Item " + (idx + 1) + " of " + total + (p._lessonTitle ? " · " + p._lessonTitle : "")
          : (mode === "quiz" ? "Question " + (idx + 1) + " of " + total : "Together " + (idx + 1) + " of " + total);
      return '<section class="hs-card"><p class="hs-count">' + esc(label) + "</p>" +
        qHtml(p) + visHtml(lesson, p, false) + interactiveInputHtml(p) +
        '<p class="hs-fb" aria-live="polite"></p>' +
        (mode === "together" ? '<div class="hs-hints"><button type="button" class="hs-btn sm" data-hs-hint="0">💡 Hint</button><button type="button" class="hs-btn sm" data-hs-hint="1">🔄 Another way</button><button type="button" class="hs-btn sm" data-hs-hint="2">👣 First step</button></div><p class="hs-hint"></p>' : '<p class="hs-hint"></p>') +
        '<div class="hs-after"></div></section>';
    }
    function run(list, mode, done) {
      var i = 0;
      function show() {
        S.step = mode === "quiz" ? 3 : 2;
        var p = list[i]; S.p = p; S.tries = 0; S.mode = mode; S.locked = false; S.ordPicked = [];
        if (i === 0 && !opts.silentIntro) stdSay([mode === "quiz" ? "std-yourturn.mp3" : "std-together.mp3"]);
        shell(problemHtml(p, i, mode, list.length));
        var f = body.querySelector(".hs-in"); if (f) try { f.focus({ preventScroll: true }); } catch (e) {}
      }
      S.answer = function (val) {
        if (S.locked) return;
        var p = S.p, fb = body.querySelector(".hs-fb"), hint = body.querySelector(".hs-hint");
        if (p.type === "cer") {
          var cTxt = (val.c || "").trim(), eTxt = (val.e || "").trim(), rTxt = (val.r || "").trim();
          if (cTxt.length < 6 || eTxt.length < 6 || rTxt.length < 6) {
            fb.textContent = "Fill in all three parts (Claim, Evidence, and Reasoning) with at least a short sentence each.";
            fb.className = "hs-fb warn";
            return;
          }
          S.locked = true;
          var hasReasonWord = /\b(because|shows|proves|means|therefore|since|supports|connects)\b/i.test(rTxt);
          var hasEvCue = /\b(passage|text|states|says|according|for example|data|study|shows|percent|%|\d)\b/i.test(eTxt) || /["“”]/.test(eTxt);
          if (window.HootStudyPro && window.HootStudyPro.saveCer) {
            window.HootStudyPro.saveCer({ q: p.q, c: cTxt, e: eTxt, r: rTxt, score: 1 + (hasEvCue ? 1 : 0) + (hasReasonWord ? 1 : 0) });
          }
          fb.innerHTML = "✓ Draft checked! Compare your CER against the rubric &amp; Grade 7 model below.";
          fb.className = "hs-fb ok";
          stdSay(["std-correct-first.mp3"]);
          var afterC = body.querySelector(".hs-after");
          afterC.innerHTML =
            '<div class="hs-cer-rubric">' +
            '<p><b>Self-Check Rubric:</b></p><ul>' +
            '<li>✅ <b>Claim:</b> Clear position stated (' + cTxt.split(/\s+/).length + ' words)</li>' +
            '<li>' + (hasEvCue ? "✅" : "💡") + ' <b>Evidence:</b> ' + (hasEvCue ? "References specific evidence from the passage" : "Tip: cite a direct quote or fact using \"According to the passage…\"") + '</li>' +
            '<li>' + (hasReasonWord ? "✅" : "💡") + ' <b>Reasoning:</b> ' + (hasReasonWord ? "Uses connecting reasoning language" : "Tip: link evidence to claim with words like \"This shows that… because…\"") + '</li>' +
            '</ul><div class="hs-cer-model"><b>Model Grade 7 CER Response:</b><p>' + esc(p.model) + '</p></div></div>' +
            '<button type="button" class="hs-btn pri" data-hs="item">' + (i < list.length - 1 ? "Next ▶" : "See my results ▶") + "</button>";
          $$(".hs-cer-in", body).forEach(function (el) { el.disabled = true; });
          return;
        }

        var ok = correct(p, val);
        if (ok === null) { fb.textContent = "Type a number (fractions like 3/8 are fine)."; fb.className = "hs-fb warn"; return; }
        S.tries++;
        if (ok) {
          S.locked = true;
          fb.textContent = "✓ Correct!" + (S.tries === 1 ? " First try." : "");
          fb.className = "hs-fb ok";
          stdSay([S.tries === 1 ? "std-correct-first.mp3" : "std-correct.mp3"]);
          if (opts.modeTag === "vault" && S.tries === 1) {
            removeFromVault(p.q);
            fb.textContent = "✓ Cleared from your Mistake Vault!";
            if (getVault().length === 0 && window.HootStudyPro && window.HootStudyPro.celebrate) window.HootStudyPro.celebrate();
          }
          if (p._std) { S.stdResults = S.stdResults || {}; S.stdResults[p._std] = S.stdResults[p._std] || { ok: 0, tot: 0 }; S.stdResults[p._std].tot++; if (S.tries === 1) S.stdResults[p._std].ok++; }
          finishItem(true);
        } else if (S.tries === 1) {
          /* Smart Math Mistake Diagnostic! */
          var diagMsg = "";
          if (typeof p.diag === "function") {
            var numVal = parseAns(val, p.type);
            if (numVal != null) { try { diagMsg = p.diag(numVal) || ""; } catch (e) {} }
          }
          fb.textContent = diagMsg ? ("🔍 " + diagMsg) : "Not yet — try again.";
          fb.className = "hs-fb no";
          if (p.hints && p.hints.length) {
            hint.textContent = "💡 " + (p.hints[mode === "quiz" ? 0 : 1] || p.hints[0]);
          }
          var hClip = mode === "quiz" ? (p.hintClips && p.hintClips[0]) : (p.hintClip || (p.hintClips && p.hintClips[1]));
          if (hClip) stdSay(["std-notyet.mp3", hClip]);
          else stdSay(["std-notyet.mp3"]);
          if (mode === "quiz") {
            S.wrongFirst++;
            S.misses.push(p);
            if (opts.modeTag !== "vault") addToVault(p._lesson || lesson, p);
          }
        } else {
          S.locked = true;
          fb.textContent = "Here's how it works:";
          fb.className = "hs-fb no";
          stdSay(["std-heres-how.mp3", p.methodClip, p.whyClip].filter(Boolean));
          if (p._std) { S.stdResults = S.stdResults || {}; S.stdResults[p._std] = S.stdResults[p._std] || { ok: 0, tot: 0 }; S.stdResults[p._std].tot++; }
          finishItem(false);
        }
        if (p.type === "mc" || p.type === "highlight") {
          var pickBtn = body.querySelector('[data-hs-pick="' + String(val).replace(/"/g, "") + '"]');
          if (pickBtn) pickBtn.classList.add(ok ? "right" : "wrong");
        }
      };
      function finishItem(ok) {
        var p = S.p, after = body.querySelector(".hs-after");
        var revVis = !ok && p.vis ? visHtml(lesson, p, true) : "";
        after.innerHTML = revVis + (ok ? "" : '<ol class="hs-sol">' + (p.steps || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>") +
          '<button type="button" class="hs-btn pri" data-hs="item">' + (i < list.length - 1 ? "Next ▶" : mode === "quiz" ? "See my results ▶" : "Your turn ▶") + "</button>";
        $$(".hs-choice, .hs-seg, .hs-ord-chip", body).forEach(function (b) { b.disabled = true; });
        var inp = body.querySelector(".hs-in"); if (inp) inp.disabled = true;
      }
      S.nextItem = function () { i++; if (i < list.length) show(); else done(); };
      S.hint = function (k) {
        var h = body.querySelector(".hs-hint");
        if (h && S.p && S.p.hints) {
          h.textContent = ["💡 ", "🔄 ", "👣 "][k] + (S.p.hints[k] || S.p.hints[0] || "");
          var hc = k === 1 && S.p.hintClip ? S.p.hintClip : (S.p.hintClips ? S.p.hintClips[k] : null);
          if (hc) stdSay([hc]);
        }
      };
      show();
    }
    function recap() {
      S.step = 4;
      var right = quiz.length - S.wrongFirst, learned = S.wrongFirst <= Math.max(1, Math.floor(quiz.length * 0.2));
      stdSay([learned ? "std-learned.mp3" : "std-almost.mp3"]);
      if (!opts.skipRecord && window.HootLessons && window.HootLessons.recordResult) {
        window.HootLessons.recordResult(lesson.id, S.wrongFirst, quiz.length, Date.now() - S.t0);
      }
      var stdTable = "";
      if (opts.modeTag === "test" && S.stdResults) {
        var rows = Object.keys(S.stdResults).map(function (st) {
          var r = S.stdResults[st], pct = Math.round((r.ok / Math.max(1, r.tot)) * 100);
          return '<div class="hs-stdr"><span><b>' + esc(st) + '</b></span><span class="hs-stdbar"><i style="width:' + pct + '%;background:' + (pct >= 80 ? "#16A34A" : pct >= 50 ? "#F59E0B" : "#DC2626") + '"></i></span><span>' + r.ok + "/" + r.tot + "</span></div>";
        }).join("");
        stdTable = '<div class="hs-std-grid"><h4>NY Grade 7 Standards Breakdown</h4>' + rows + "</div>";
      }
      var vaultLeft = getVault().length;
      shell('<section class="hs-card"><h3>' + right + " of " + quiz.length + " right first try</h3>" +
        '<p class="hs-verdict ' + (learned ? "ok" : "no") + '">' +
        (opts.modeTag === "vault"
          ? (vaultLeft === 0 ? "🎉 Mistake Vault completely cleared! Awesome mastery!" : "Nice work! " + vaultLeft + " item" + (vaultLeft === 1 ? "" : "s") + " left in your Mistake Vault.")
          : opts.modeTag === "test"
            ? (learned ? "🏆 NY Grade 7 Practice Test ready! Strong mastery across standards." : "Good practice run — missed items were saved to your Mistake Vault so you can drill them next.")
            : (learned ? "✓ Learned! I'll bring this back for a quick review in a few days." : "Almost — this goes on your Practice list &amp; Mistake Vault so we can nail it.")) + "</p>" +
        stdTable +
        (S.misses.length ? "<h4>Look again</h4>" + S.misses.map(function (p) { return '<div class="hs-miss">' + qHtml(p) + '<ol class="hs-sol">' + (p.steps || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div>"; }).join("") : "") +
        '<div class="hs-end"><button type="button" class="hs-btn" data-hs="again">↻ Practice again (' + esc(lesson.again || "new numbers") + ')</button>' +
        (opts.modeTag === "lesson" && nextOf(lesson) ? '<button type="button" class="hs-btn pri" data-hs="nextlesson">Next lesson ▶</button>' : "") + "</div></section>");
    }
    S.go = function (what) {
      if (what === "next") { if (S.step === 0) watch(); else if (S.step === 1) run(together, "together", function () { run(quiz, "quiz", recap); }); }
      else if (what === "more") S.more();
      else if (what === "item") S.nextItem();
      else if (what === "again") {
        if (opts.modeTag === "test") startPracticeTest(body, opts.testKind);
        else if (opts.modeTag === "vault") playVault(body);
        else play(lesson, body);
      }
      else if (what === "nextlesson") { var n = nextOf(lesson); if (!n) return; var t = document.querySelector("#ll-otitle"); if (t) t.textContent = n.title; play(n, body); }
    };
    if (opts.problems) run(quiz, "quiz", recap);
    else learn();
  }

  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function nextOf(l) { var c = L.filter(function (x) { return (x.course || "math7") === (l.course || "math7"); }), i = c.indexOf(l); return i >= 0 && i < c.length - 1 ? c[i + 1] : null; }

  /* ---------- NY Grade 7 Practice Test & Mistake Vault Launchers ---------- */
  function startPracticeTest(body, kind) {
    var k = kind || "math7";
    var pool = L.filter(function (l) {
      if (l.id.indexOf("-review") >= 0 || l.isWorkshop) return false;
      return k === "all" ? true : (l.course || "math7") === k;
    });
    if (!pool.length) pool = L.slice();
    var chosen = shuf(pool), probs = [];
    for (var i = 0; i < 10; i++) {
      var l = chosen[i % chosen.length];
      if (l.newRun && i < chosen.length) l.newRun();
      var p = l.gen();
      p._std = (l.std || "NY 7").split(",")[0].trim();
      p._lesson = l;
      probs.push(p);
    }
    play({
      id: "ny7-practice-test", title: k === "all" ? "NY Grade 7 All-Subjects Mock Exam" : "NY Grade 7 Math Practice Test",
      std: "NY Grade 7 Exam Prep", subject: k === "all" ? "Math · ELA · Science · SS" : "Grade 7 NY Math", course: k === "all" ? "math7" : k, again: "new exam"
    }, body, { problems: probs, modeTag: "test", testKind: k, stepsLabel: "📝 10-Question NY Grade 7 Practice Test", skipRecord: true, silentIntro: true });
  }

  function playVault(body) {
    var items = getVault();
    if (!items.length) {
      body.innerHTML = '<div class="hs"><section class="hs-card"><h3>✨ Your Mistake Vault is empty!</h3><p>Whenever you miss a quiz question, it lands here so you can come back and clear it.</p></section></div>';
      return;
    }
    var probs = items.slice(0, 8).map(function (x) {
      return Object.assign({}, x, { _lessonTitle: x.lessonTitle, _std: x.std });
    });
    play({
      id: "hs-vault", title: "Mistake Vault", std: "Targeted Review", subject: "Review your misses",
      course: probs[0].course || "math7", again: "remaining misses"
    }, body, { problems: probs, modeTag: "vault", stepsLabel: "🎯 Mistake Vault · Answer right first try to clear!", skipRecord: true, silentIntro: true });
  }

  /* ---------- Delegated Event Handlers (Tools, Choices, Highlight, Order, CER) ---------- */
  function refreshOrderUI(body) {
    if (!cur || !cur.p || cur.p.type !== "order") return;
    var pickedBox = body.querySelector("#hs-ord-picked");
    var checkBtn = body.querySelector("[data-hs-ord-check]");
    if (!pickedBox) return;
    pickedBox.innerHTML = cur.ordPicked.length
      ? cur.ordPicked.map(function (idx, pos) {
          return '<button type="button" class="hs-ord-slot" data-hs-ord-rem="' + pos + '"><b>' + (pos + 1) + ".</b> " + esc(cur.p._shuf[idx]) + " ✕</button>";
        }).join("")
      : '<span class="hs-ord-empty">Tap the cards below in order…</span>';
    $$(".hs-ord-chip", body).forEach(function (btn) {
      var idx = +btn.getAttribute("data-hs-ord-add");
      btn.disabled = cur.ordPicked.indexOf(idx) >= 0;
    });
    if (checkBtn) checkBtn.disabled = cur.ordPicked.length !== cur.p.orderItems.length;
  }

  document.addEventListener("click", function (e) {
    if (!e.target || !e.target.closest) return;
    var body = document.getElementById("ll-obody");
    if (!body) return;

    /* Workspace toolbar buttons (Scratchpad, Reference, Focus Dark Mode) */
    var tool = e.target.closest("[data-hs-tool]");
    if (tool && tool.closest("#ll-obody .hs")) {
      var tk = tool.getAttribute("data-hs-tool");
      if (tk === "dark") {
        var nextDark = !document.body.classList.contains("hs-dark");
        setDarkPref(nextDark);
        tool.textContent = nextDark ? "☀️ Light" : "🌙 Focus Dark";
        var padD = body.querySelector("#hs-pad-drawer");
        if (padD && !padD.hidden && window.HootStudyVisuals) window.HootStudyVisuals.mountScratchpad(padD);
      } else if (tk === "ref") {
        var dr = body.querySelector("#hs-ref-drawer");
        if (dr) { dr.hidden = !dr.hidden; tool.setAttribute("aria-expanded", String(!dr.hidden)); tool.classList.toggle("on", !dr.hidden); }
      } else if (tk === "calc") {
        var cd = body.querySelector("#hs-calc-drawer");
        if (cd) {
          cd.hidden = !cd.hidden;
          tool.setAttribute("aria-expanded", String(!cd.hidden));
          tool.classList.toggle("on", !cd.hidden);
          if (!cd.hidden && !cd.firstElementChild && window.HootStudyPro) {
            var lid = (cur && cur.p && cur.p._lesson && cur.p._lesson.id) || (cur && cur.lesson && cur.lesson.id) || "";
            window.HootStudyPro.mountCalculator(cd, { lessonId: lid });
          }
        }
      } else if (tk === "pad") {
        var pd = body.querySelector("#hs-pad-drawer");
        if (pd) {
          pd.hidden = !pd.hidden;
          tool.setAttribute("aria-expanded", String(!pd.hidden));
          tool.classList.toggle("on", !pd.hidden);
          if (!pd.hidden && !pd.querySelector("canvas") && window.HootStudyVisuals) window.HootStudyVisuals.mountScratchpad(pd);
        }
      }
      return;
    }

    /* Quick Math Symbol Bar (− / .) */
    var symBtn = e.target.closest("[data-hs-sym]");
    if (symBtn && symBtn.closest("#ll-obody .hs")) {
      var inp = body.querySelector(".hs-in");
      if (inp && !inp.disabled) {
        var sym = symBtn.getAttribute("data-hs-sym");
        if (sym === "-") {
          inp.value = inp.value.indexOf("-") === 0 ? inp.value.slice(1) : "-" + inp.value;
        } else {
          inp.value += sym;
        }
        inp.focus();
      }
      return;
    }

    if (!cur) return;

    /* Order-builder interactions */
    var ordAdd = e.target.closest("[data-hs-ord-add]");
    if (ordAdd && ordAdd.closest("#ll-obody .hs")) {
      var idx = +ordAdd.getAttribute("data-hs-ord-add");
      if (cur.ordPicked.indexOf(idx) < 0) { cur.ordPicked.push(idx); refreshOrderUI(body); }
      return;
    }
    var ordRem = e.target.closest("[data-hs-ord-rem]");
    if (ordRem && ordRem.closest("#ll-obody .hs")) {
      cur.ordPicked.splice(+ordRem.getAttribute("data-hs-ord-rem"), 1);
      refreshOrderUI(body);
      return;
    }
    if (e.target.closest("[data-hs-ord-clear]") && e.target.closest("#ll-obody .hs")) {
      cur.ordPicked = []; refreshOrderUI(body); return;
    }
    if (e.target.closest("[data-hs-ord-check]") && e.target.closest("#ll-obody .hs")) {
      var seq = cur.ordPicked.map(function (i) { return cur.p._shuf[i]; }).join("|");
      cur.answer(seq);
      return;
    }

    var t = e.target.closest("[data-hs],[data-hs-pick],[data-hs-hint]");
    if (!t || !t.closest("#ll-obody .hs")) return;
    if (t.hasAttribute("data-hs")) cur.go(t.getAttribute("data-hs"));
    else if (t.hasAttribute("data-hs-pick")) cur.answer(t.getAttribute("data-hs-pick"));
    else cur.hint(+t.getAttribute("data-hs-hint"));
  });

  document.addEventListener("keydown", function (e) {
    if (!cur || e.metaKey || e.ctrlKey || e.altKey) return;
    var ov = document.getElementById("ll-overlay");
    if (!ov || ov.hidden) return;
    var tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea") return;
    var body = document.getElementById("ll-obody");
    if (!body) return;
    var k = e.key;
    if (k >= "1" && k <= "4") {
      var b = body.querySelector('[data-hs-pick="' + (+k - 1) + '"]');
      if (b && !b.disabled) { e.preventDefault(); b.click(); }
    } else if (k === "Enter") {
      var adv = body.querySelector('[data-hs="item"], [data-hs="more"], [data-hs="next"]');
      if (adv && !adv.disabled) { e.preventDefault(); adv.click(); }
    } else if (k === "h" || k === "H") {
      var hb = body.querySelector("[data-hs-hint]");
      if (hb) { e.preventDefault(); hb.click(); }
    } else if (k === "s" || k === "S") {
      var sb = body.querySelector('[data-hs-tool="pad"]');
      if (sb) { e.preventDefault(); sb.click(); }
    } else if (k === "r" || k === "R") {
      var rb = body.querySelector('[data-hs-tool="ref"]');
      if (rb) { e.preventDefault(); rb.click(); }
    } else if (k === "c" || k === "C") {
      var cb = body.querySelector('[data-hs-tool="calc"]');
      if (cb) { e.preventDefault(); cb.click(); }
    }
  });

  document.addEventListener("submit", function (e) {
    var f = e.target;
    if (!cur || !f.getAttribute) return;
    if (f.getAttribute("data-hs-form") === "1") {
      e.preventDefault(); cur.answer(f.querySelector(".hs-in").value);
    } else if (f.getAttribute("data-hs-cer") === "1") {
      e.preventDefault();
      cur.answer({
        c: f.querySelector('[name="c"]').value,
        e: f.querySelector('[name="e"]').value,
        r: f.querySelector('[name="r"]').value
      });
    }
  });

  var api = {
    lessons: L, play: play, stop: function () { cur = null; stdStop(); },
    parseAns: parseAns, correct: correct,
    startPracticeTest: startPracticeTest,
    playVault: playVault,
    getVault: getVault,
    isDark: isDarkPref, setDark: setDarkPref, syncDark: syncDarkForProfile,
    current: function () { return cur && cur.p ? { type: cur.p.type, ans: cur.p.ans, choices: cur.p.choices } : null; }
  };
  window.HootStudy = api;

  function addCourse(meta, list) {
    list.forEach(function (l) { l.course = meta.id; l.subject = l.subject || meta.subject; l.again = l.again || meta.again; L.push(l); });
    (function reg() {
      if (!window.HootLessons || !window.HootLessons.register) return setTimeout(reg, 50);
      window.HootLessons.register({ id: meta.id, title: meta.title, emo: meta.emo },
        list.map(function (l) { return { id: l.id, title: l.title, emo: l.emo, color: meta.color, study: true, topic: l.topic, std: l.std }; }),
        function (m, body) { var l = L.filter(function (x) { return x.id === m.id; })[0]; if (l) play(l, body); });
    })();
  }
  api.addCourse = addCourse;

  /* Question-bank course adapter (now supports rich highlight, order, and cer items alongside mc!) */
  function bank(lesson) {
    lesson.items.forEach(function (it, i) {
      if (!it.__noClip && !it.__whyClip) it.__whyClip = "std-why-" + lesson.id + "-" + i + ".mp3";
      if (!it.__noClip && it.hint && !it.__hintClip) it.__hintClip = "std-hint-" + lesson.id + "-" + i + ".mp3";
    });
    var deck = [], last = [];
    lesson.newRun = function () { deck = shuf(last).concat(shuf(lesson.items.filter(function (x) { return last.indexOf(x) < 0; }))); last = []; };
    lesson.gen = function () {
      if (!deck.length) lesson.newRun();
      var it = deck.pop(); last.push(it);
      if (it.type === "highlight") {
        var ansIdx = 0;
        it.segments.forEach(function (sg, k) { if (sg.hit) ansIdx = k; });
        return { q: it.q, passage: it.pass || "", type: "highlight", segments: it.segments, ans: ansIdx,
          steps: [lesson.method, it.why, "Answer: \"" + it.segments[ansIdx].text + "\""],
          hints: [lesson.hints[0], it.hint || lesson.hints[1], lesson.hints[2]],
          whyClip: null, hintClip: null, methodClip: "std-" + lesson.id + "-method.mp3",
          hintClips: ["std-hint1-" + lesson.id + ".mp3", "std-hint2-" + lesson.id + ".mp3", "std-hint3-" + lesson.id + ".mp3"] };
      }
      if (it.type === "order") {
        return { q: it.q, passage: it.pass || "", type: "order", orderItems: it.orderItems.slice(),
          steps: [lesson.method, it.why, "Correct order: " + it.orderItems.join(" → ")],
          hints: [lesson.hints[0], it.hint || lesson.hints[1], lesson.hints[2]],
          whyClip: null, hintClip: null, methodClip: "std-" + lesson.id + "-method.mp3",
          hintClips: ["std-hint1-" + lesson.id + ".mp3", "std-hint2-" + lesson.id + ".mp3", "std-hint3-" + lesson.id + ".mp3"] };
      }
      if (it.type === "cer") {
        return { q: it.q, passage: it.pass || "", type: "cer", model: it.model,
          steps: [lesson.method, it.model], hints: [lesson.hints[0], lesson.hints[1], lesson.hints[2]] };
      }
      var choices = it.fixed ? it.fixed.slice() : shuf([it.a].concat(it.w));
      return { q: it.q, passage: it.pass || "", type: "mc", choices: choices, ans: choices.indexOf(it.a),
        steps: [lesson.method, it.why, "Answer: " + it.a], hints: [lesson.hints[0], it.hint || lesson.hints[1], lesson.hints[2]],
        whyClip: it.__whyClip || null, hintClip: it.__hintClip || null, methodClip: "std-" + lesson.id + "-method.mp3",
        hintClips: ["std-hint1-" + lesson.id + ".mp3", "std-hint2-" + lesson.id + ".mp3", "std-hint3-" + lesson.id + ".mp3"] };
    };
    return lesson;
  }

  api.addBankCourse = function (meta, list) {
    if (meta.review) {
      var all = [];
      list.forEach(function (l) {
        l.items.forEach(function (it, j) {
          if (it.type === "cer") return;
          all.push(Object.assign({ why: "" }, it, {
            why: (it.why || "") + " (From: " + l.title + ")",
            __whyClip: it.__noClip ? null : ("std-why-" + l.id + "-" + j + ".mp3"),
            __hintClip: (!it.__noClip && it.hint) ? ("std-hint-" + l.id + "-" + j + ".mp3") : null
          }));
        });
      });
      list = list.concat([{ id: meta.id + "-review", title: meta.review, std: "All lessons", emo: "🏁",
        learn: ["This review mixes questions from every lesson in the course, like a unit test.", "Take your time. If one stumps you, the explanation tells you which lesson to go back to."],
        vocab: "mixed practice = the best way to make learning stick",
        method: "Figure out which lesson the question comes from, then use what you learned there.",
        hints: ["Which lesson does this question come from? Think back to its key idea.", "Rule out the choices you know are wrong first.", "Read the question again slowly, word by word."],
        items: all }]);
    }
    addCourse(meta, list.map(bank));
  };

  /* Wire Grade 7 Math lessons + add Mixed Grade 7 Math Review (math7-review)! */
  var MATH_BASE = L.splice(0, L.length).map(function (l) {
    var rawGen = l.gen;
    l.gen = function () {
      var p = rawGen();
      if (!p.methodClip) p.methodClip = "std-" + l.id + "-method.mp3";
      if (!p.hintClips) p.hintClips = ["std-hint1-" + l.id + ".mp3", "std-hint2-" + l.id + ".mp3", "std-hint3-" + l.id + ".mp3"];
      return p;
    };
    return l;
  });
  var mathReview = {
    id: "math7-review", title: "Grade 7 math mixed review", std: "All NY 7 Math", emo: "🏁",
    learn: ["This mixed review pulls fresh dynamically generated problems from every Grade 7 NY math topic — just like a real unit test!",
            "Use the ✏️ Scratchpad and 📖 Reference button any time you want to sketch out your work."],
    vocab: "mixed review = switching between topics builds real exam confidence",
    gen: function () {
      var l = pick(MATH_BASE);
      var p = l.gen();
      p._std = l.std;
      p._lesson = l;
      return p;
    }
  };
  addCourse({ id: "math7", title: "Grade 7 math · full course", emo: "📐", color: "#0B5E43", subject: "Grade 7 math", again: "new numbers" }, MATH_BASE.concat([mathReview]));
})();
