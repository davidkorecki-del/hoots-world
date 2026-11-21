/* Hoot study engine (3e28) — Grade 7 math with generated practice; 3e31 adds
   more courses through HootStudy.addCourse (Grade 7 English: hoot-ela7.js).
   Every problem is generated with fresh numbers and checked by code, so a
   child never runs out of practice and can't memorise answers.
   Flow per lesson (one step at a time):
     Learn → Watch (worked example, one step per tap) → Together (2 problems,
     hint ladder: nudge → another way → first step) → Your turn (5 problems)
     → Recap (4 of 5 right first try = learned; misses shown with solutions).
   Aligned to the grade 7 math standards used by New York (Next Generation)
   and Connecticut (Core Standards); codes shown are the shared 7.XX.n codes.
   Tutor-voiced with pre-recorded std-* clips (never device TTS). */
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
  function lin(a, b, v) { /* ax + b, tidy signs */
    var s = (a === 1 ? "" : a === -1 ? "−" : sgn(a)) + (v || "x");
    if (b > 0) s += " + " + b; else if (b < 0) s += " − " + Math.abs(b);
    return s;
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = b; b = a % b; a = t; } return a; }
  function frac(n, d) { var g = gcd(n, d); return (n / g) + "/" + (d / g); }

  /* ---------- the course ---------- */
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
          steps: ["Unit rate = total miles ÷ hours", d + " ÷ " + h + " = " + k, "Answer: " + k + " miles per hour"],
          hints: ["How many miles in just ONE hour?", "Share the " + d + " miles equally across " + h + " hours.", "Start with " + d + " ÷ " + h + "."] };
      }
      var n = ri(3, 9), each = r2(ri(50, 600) / 100), tot = r2(each * n);
      return { q: n + " notebooks cost " + money(tot) + ". What is the price of ONE notebook (in dollars)?", type: "num", ans: each, unit: "dollars",
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
        steps: ["Divide y by x for each pair", ratios, prop ? "All the same (k = " + k + ") → proportional" : "Not all the same → not proportional"],
        hints: ["Work out y ÷ x for every pair.", "Proportional means the same multiplier turns every x into its y.", "First pair: " + ys[0] + " ÷ " + xs[0] + " = " + r2(ys[0] / xs[0]) + ". Now the others."] };
    } });

  lesson({ id: "m7-percent-of", title: "Percent of a number", std: "7.RP.3", emo: "💯", topic: /percent|%/,
    learn: ["Percent means 'out of 100'. 25% is 25/100, which is 0.25.", "To find a percent of a number, change the percent to a decimal and multiply: 25% of 80 = 0.25 × 80 = 20."],
    vocab: "percent = per hundred",
    gen: function () {
      var p = pick([5, 10, 15, 20, 25, 30, 40, 50, 75]), n = pick([20, 40, 60, 80, 120, 160, 200, 240]), a = r2(p * n / 100);
      return { q: "What is " + p + "% of " + n + "?", type: "num", ans: a,
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
        steps: [pct + "% of " + money(P) + " = " + (pct / 100) + " × " + P + " = " + money(part), (kind === "discount" ? money(P) + " − " + money(part) : money(P) + " + " + money(part)) + " = " + money(tot), "Answer: " + money(tot)],
        hints: [kind === "discount" ? "Find how much comes OFF, then subtract." : "Find how much gets ADDED, then add it on.", "Another way: the " + (kind === "discount" ? "sale price is " + (100 - pct) : "total is " + (100 + pct)) + "% of the price.", "First: " + (pct / 100) + " × " + P + " = " + part.toFixed(2) + "."] };
    } });

  lesson({ id: "m7-percent-change", title: "Percent increase & decrease", std: "7.RP.3", emo: "📊", topic: /percent (change|increase|decrease)|increase|decrease/,
    learn: ["Percent change = (how much it changed ÷ the ORIGINAL amount) × 100.", "Always divide by where you STARTED, not where you ended."],
    vocab: "original = the starting amount",
    gen: function () {
      var a = pick([20, 40, 50, 80, 100, 200, 250]), p = pick([10, 20, 25, 50]), up = Math.random() < 0.5, b = up ? a + a * p / 100 : a - a * p / 100;
      var bs = b % 1 ? b.toFixed(2) : String(b);
      return { q: "A price goes from $" + a + " to $" + bs + ". By what percent did it " + (up ? "increase" : "decrease") + "?", type: "num", ans: p, unit: "percent",
        steps: ["Change = " + (up ? bs + " − " + a : a + " − " + bs) + " = " + r2(Math.abs(b - a)), Math.abs(b - a) + " ÷ " + a + " = " + (p / 100), (p / 100) + " × 100 = " + p + "%"],
        hints: ["How much did it change? Then compare that to the ORIGINAL price.", "Ask: the change is what fraction of $" + a + "?", "The change is " + Math.abs(b - a) + ". Now " + Math.abs(b - a) + " ÷ " + a + "."] };
    } });

  lesson({ id: "m7-int-add", title: "Adding & subtracting integers", std: "7.NS.1", emo: "➖", topic: /integer|negative|number line|add.*negative/,
    learn: ["On a number line, adding a positive moves right; adding a negative moves left.", "Subtracting is adding the opposite: 3 − (−5) = 3 + 5 = 8."],
    vocab: "opposite: the opposite of −5 is 5",
    gen: function () {
      var a = nz(-12, 12), b = nz(-12, 12), plus = Math.random() < 0.5, v = plus ? a + b : a - b;
      return { q: "What is " + sgn(a) + (plus ? " + " : " − ") + paren(b) + "?", type: "num", ans: v,
        steps: plus ? ["Start at " + sgn(a) + ", move " + Math.abs(b) + (b > 0 ? " right" : " left"), "= " + sgn(v)] : ["Subtract = add the opposite: " + sgn(a) + " + " + paren(-b), "= " + sgn(v)],
        hints: [plus ? "Picture a number line: start at " + sgn(a) + "." : "Turn the subtraction into adding the opposite.", "Think money: " + (a >= 0 ? "you have $" + a : "you owe $" + Math.abs(a)) + ", then " + (plus ? (b > 0 ? "get $" + b : "spend $" + Math.abs(b)) : (b > 0 ? "spend $" + b : "a $" + Math.abs(b) + " debt is cancelled")) + ".", plus ? "Start at " + sgn(a) + " and move " + Math.abs(b) + (b > 0 ? " right." : " left.") : sgn(a) + " − " + paren(b) + " = " + sgn(a) + " + " + paren(-b) + "."] };
    } });

  lesson({ id: "m7-int-mul", title: "Multiplying & dividing integers", std: "7.NS.2", emo: "✖️", topic: /multipl|divid|integer|negative/,
    learn: ["Same signs → positive answer. Different signs → negative answer.", "Multiply or divide the numbers as usual, then decide the sign."],
    vocab: "(−)(−) = +,  (−)(+) = −",
    gen: function () {
      var a = nz(-9, 9), b = nz(-9, 9), mul = Math.random() < 0.5;
      if (mul) { var v = a * b; return { q: "What is " + paren(a) + " × " + paren(b) + "?", type: "num", ans: v, steps: [Math.abs(a) + " × " + Math.abs(b) + " = " + Math.abs(v), (a < 0) === (b < 0) ? "Same signs → positive" : "Different signs → negative", "Answer: " + sgn(v)],
        hints: ["Multiply the numbers first, sign later.", "Count the negatives: 0 or 2 → positive, 1 → negative.", Math.abs(a) + " × " + Math.abs(b) + " = " + Math.abs(v) + ". Now the sign?"] }; }
      var p = a * b; return { q: "What is " + sgn(p) + " ÷ " + paren(a) + "?", type: "num", ans: b, steps: [Math.abs(p) + " ÷ " + Math.abs(a) + " = " + Math.abs(b), (p < 0) === (a < 0) ? "Same signs → positive" : "Different signs → negative", "Answer: " + sgn(b)],
        hints: ["Divide the numbers, then decide the sign.", "Check by multiplying back: your answer × " + paren(a) + " should give " + sgn(p) + ".", Math.abs(p) + " ÷ " + Math.abs(a) + " = " + Math.abs(b) + ". Now the sign?"] };
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
        steps: [(q > 0 ? "Subtract " + q : "Add " + Math.abs(q)) + ": " + lin(p, 0) + " " + (gt ? ">" : "<") + " " + sgn(r - q), "Divide by " + sgn(p) + (flip ? " — negative, so FLIP the sign" : ""), "Answer: " + right],
        hints: ["Do the same steps as an equation.", flip ? "You'll divide by a negative — what happens to the sign then?" : "Dividing by a positive keeps the sign the same.", (q > 0 ? "Subtract " + q : "Add " + Math.abs(q)) + " first: " + lin(p, 0) + " " + (gt ? ">" : "<") + " " + sgn(r - q) + "."] };
    } });

  lesson({ id: "m7-circles", title: "Circles: circumference & area", std: "7.G.4", emo: "⭕", topic: /circle|circumference|radius|diameter|pi/,
    learn: ["Circumference (distance around) = 2 × π × r.  Area (space inside) = π × r × r.", "Use π ≈ 3.14 and round to the nearest tenth. The radius is half the diameter."],
    vocab: "radius r = centre to edge; diameter = 2r",
    gen: function () {
      var r = ri(2, 12), useD = Math.random() < 0.35, area = Math.random() < 0.5, v = area ? r1(3.14 * r * r) : r1(2 * 3.14 * r);
      var given = useD ? "diameter " + (2 * r) + " cm" : "radius " + r + " cm";
      return { q: "A circle has a " + given + ". Find its " + (area ? "AREA (cm²)" : "CIRCUMFERENCE (cm)") + ". Use π ≈ 3.14, round to the nearest tenth.", type: "num", ans: v, tol: 0.06,
        steps: [useD ? "Radius = " + (2 * r) + " ÷ 2 = " + r : "Radius = " + r, area ? "Area = 3.14 × " + r + " × " + r + " = " + r2(3.14 * r * r) : "C = 2 × 3.14 × " + r + " = " + r2(2 * 3.14 * r), "Rounded: " + v],
        hints: [area ? "Area uses r × r." : "Circumference uses 2 × r.", useD ? "Careful: you were given the DIAMETER. Halve it first." : "Plug r = " + r + " into the formula.", area ? "Start: 3.14 × " + r + " × " + r + "." : "Start: 2 × 3.14 × " + r + "."] };
    } });

  lesson({ id: "m7-scale", title: "Scale drawings", std: "7.G.1", emo: "🗺️", topic: /scale|map|drawing/,
    learn: ["A scale like 1 cm : 5 km means every 1 cm on the map is 5 km in real life.", "Real distance = map distance × the scale number."],
    vocab: "scale = map size : real size",
    gen: function () {
      var s = pick([2, 4, 5, 10, 20, 25]), d = r1(ri(3, 18) / 2), v = r1(d * s);
      return { q: "On a map, 1 cm = " + s + " km. Two towns are " + d + " cm apart on the map. How far apart are they really (km)?", type: "num", ans: v, tol: 0.01,
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
        steps: [t === "vert" ? "Vertical angles are equal" : name + " → they add to " + (t === "comp" ? 90 : 180) + "°", t === "vert" ? "Other = " + a + "°" : (t === "comp" ? 90 : 180) + " − " + a + " = " + v, "Answer: " + v + "°"],
        hints: ["What do " + name + " angles add up to" + (t === "vert" ? " — or are they equal?" : "?"), t === "comp" ? "Think of a corner of a square: 90°." : t === "supp" ? "Think of a straight line: 180°." : "Vertical angles are mirror images across the crossing point.", t === "vert" ? "They're equal." : "Start: " + (t === "comp" ? 90 : 180) + " − " + a + "."] };
    } });

  lesson({ id: "m7-probability", title: "Probability", std: "7.SP.5", emo: "🎲", topic: /probab|chance|likely|odds/,
    learn: ["Probability = number of ways it can happen ÷ total number of outcomes.", "It's between 0 (impossible) and 1 (certain). Write it as a fraction, decimal or percent."],
    vocab: "outcome = one possible result",
    gen: function () {
      var r = ri(1, 8), b = ri(1, 8), g = ri(1, 8), tot = r + b + g, col = pick(["red", "blue", "green"]), n = col === "red" ? r : col === "blue" ? b : g;
      return { q: "A bag has " + r + " red, " + b + " blue and " + g + " green marbles. You pick one without looking. What is P(" + col + ")? (fraction, decimal or %)", type: "prob", ans: n / tot,
        steps: ["Ways to get " + col + ": " + n, "Total marbles: " + r + " + " + b + " + " + g + " = " + tot, "P(" + col + ") = " + n + "/" + tot + (gcd(n, tot) > 1 ? " = " + frac(n, tot) : "")],
        hints: ["Count the " + col + " marbles, then all the marbles.", "If you did this many times, what fraction of picks would be " + col + "?", "Total = " + tot + ". So P = (" + col + " count)/" + tot + "."] };
    } });

  /* ---------- answer checking ---------- */
  function parseAns(s, type) {
    s = String(s || "").trim().replace(/[−–]/g, "-").replace(/[$,\s]|dollars?|cm²?|km|°|degrees|miles( per hour)?|mph|percent/gi, "");
    if (!s) return null;
    var pct = /%$/.test(s); if (pct) s = s.slice(0, -1);
    var m = /^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(s), v;
    if (m) v = +m[1] / +m[2]; else if (/^-?\d*\.?\d+$/.test(s)) v = +s; else return null;
    if (pct && type === "prob") v = v / 100;
    return v;
  }
  function correct(p, input) {
    if (p.type === "mc") return +input === p.ans;
    var v = parseAns(input, p.type); if (v == null) return null;
    return Math.abs(v - p.ans) <= (p.tol || (p.type === "prob" ? 0.005 : 1e-6));
  }

  /* ---------- tutor voice (fix pass 10) ----------
     Her tutor explains every step in the study engine too (Dawid's rule).
     Clips are pre-recorded (std-* in assets/voice). Bank lessons (English,
     science, social studies) have fixed items, so every item's explanation
     (why), the lesson method and the lesson hints are spoken. Math problems
     are generated with fresh numbers each run, so their worked steps stay
     on-screen text; the tutor voices the math concepts, vocabulary and
     feedback. No device TTS anywhere. */
  var stdEl = null, stdQueue = [], stdBusy = false, stdGen = 0;
  function stdNext() {
    if (stdBusy || !stdQueue.length) return;
    var f = stdQueue.shift(), gen = stdGen;
    stdBusy = true;
    try {
      var a = new Audio("assets/voice/" + f);
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

  /* ---------- UI ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  /* a reading passage (English) shows above its question */
  function qHtml(p) { return (p.passage ? '<blockquote class="hs-pass">' + esc(p.passage) + "</blockquote>" : "") + '<p class="hs-q">' + esc(p.q) + "</p>"; }
  var STEPS = ["Learn", "Watch", "Together", "Your turn", "Recap"];
  var cur = null;
  function play(lesson, body) {
    stdStop();
    var S = cur = { lesson: lesson, step: 0, wrongFirst: 0, misses: [], t0: Date.now() };
    if (lesson.newRun) lesson.newRun();
    var ex = lesson.gen();
    var together = [lesson.gen(), lesson.gen()], quiz = [0, 1, 2, 3, 4].map(function () { return lesson.gen(); });
    function bar() {
      return '<ol class="hs-steps">' + STEPS.map(function (s, i) { return '<li class="' + (i < S.step ? "done" : i === S.step ? "now" : "") + '">' + (i < S.step ? "✓ " : "") + s + "</li>"; }).join("") + "</ol>";
    }
    function shell(inner) {
      if (cur !== S) return;
      body.innerHTML = '<div class="hs"><p class="hs-std">' + esc(lesson.std) + " · " + esc(lesson.subject || "Grade 7 math") + "</p>" + bar() + inner + "</div>";
      body.scrollTop = 0;
    }
    function learn() {
      S.step = 0;
      shell('<section class="hs-card"><h3>' + esc(lesson.title) + "</h3>" + lesson.learn.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
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
        shell('<section class="hs-card">' + qHtml(ex) + '<ol class="hs-sol">' + ex.steps.slice(0, shown).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>" +
          (shown < ex.steps.length ? '<button type="button" class="hs-btn" data-hs="more">Next step ▼</button>' : '<button type="button" class="hs-btn pri" data-hs="next">Try one together ▶</button>') + "</section>");
      }
      S.more = function () { shown++; draw(); };
      draw();
    }
    function problemHtml(p, idx, mode) {
      var input = p.type === "mc"
        ? '<div class="hs-mc">' + p.choices.map(function (c, i) { return '<button type="button" class="hs-choice" data-hs-pick="' + i + '">' + esc(c) + "</button>"; }).join("") + "</div>"
        : '<form class="hs-form" data-hs-form="1"><input class="hs-in" inputmode="decimal" autocomplete="off" aria-label="Your answer" placeholder="Your answer' + (p.unit ? " (" + esc(p.unit) + ")" : "") + '"><button type="submit" class="hs-btn pri">Check</button></form>';
      return '<section class="hs-card"><p class="hs-count">' + (mode === "quiz" ? "Question " + (idx + 1) + " of " + quiz.length : "Together " + (idx + 1) + " of " + together.length) + "</p>" +
        qHtml(p) + input + '<p class="hs-fb" aria-live="polite"></p>' +
        (mode === "together" ? '<div class="hs-hints"><button type="button" class="hs-btn sm" data-hs-hint="0">💡 Hint</button><button type="button" class="hs-btn sm" data-hs-hint="1">🔄 Another way</button><button type="button" class="hs-btn sm" data-hs-hint="2">👣 First step</button></div><p class="hs-hint"></p>' : '<p class="hs-hint"></p>') +
        '<div class="hs-after"></div></section>';
    }
    function run(list, mode, done) {
      var i = 0;
      function show() {
        S.step = mode === "quiz" ? 3 : 2;
        var p = list[i]; S.p = p; S.tries = 0; S.mode = mode; S.locked = false;
        if (i === 0) stdSay([mode === "quiz" ? "std-yourturn.mp3" : "std-together.mp3"]);
        shell(problemHtml(p, i, mode));
        var f = body.querySelector(".hs-in"); if (f) try { f.focus({ preventScroll: true }); } catch (e) {}
      }
      S.answer = function (val) {
        if (S.locked) return;
        var p = S.p, fb = body.querySelector(".hs-fb"), hint = body.querySelector(".hs-hint"), ok = correct(p, val);
        if (ok === null) { fb.textContent = "Type a number (fractions like 3/8 are fine)."; fb.className = "hs-fb warn"; return; }
        S.tries++;
        if (ok) {
          S.locked = true;
          fb.textContent = "✓ Correct!" + (S.tries === 1 ? " First try." : "");
          fb.className = "hs-fb ok";
          stdSay([S.tries === 1 ? "std-correct-first.mp3" : "std-correct.mp3"]);
          finishItem(true);
        } else if (S.tries === 1) {
          fb.textContent = "Not yet — try again.";
          fb.className = "hs-fb no";
          hint.textContent = "💡 " + p.hints[mode === "quiz" ? 0 : 1];
          var hClip = mode === "quiz" ? (p.hintClips && p.hintClips[0]) : (p.hintClip || (p.hintClips && p.hintClips[1]));
          if (hClip) stdSay(["std-notyet.mp3", hClip]);
          else stdSay(["std-notyet.mp3"]);
          if (mode === "quiz") { S.wrongFirst++; S.misses.push(p); }
        } else {
          S.locked = true;
          fb.textContent = "Here's how it works:";
          fb.className = "hs-fb no";
          stdSay(["std-heres-how.mp3", p.methodClip, p.whyClip].filter(Boolean));
          finishItem(false);
        }
        if (p.type === "mc") {
          var pickBtn = body.querySelector('[data-hs-pick="' + String(val).replace(/"/g, "") + '"]');
          if (pickBtn) pickBtn.classList.add(ok ? "right" : "wrong");
        }
      };
      function finishItem(ok) {
        var p = S.p, after = body.querySelector(".hs-after");
        after.innerHTML = (ok ? "" : '<ol class="hs-sol">' + p.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>") +
          '<button type="button" class="hs-btn pri" data-hs="item">' + (i < list.length - 1 ? "Next ▶" : mode === "quiz" ? "See my results ▶" : "Your turn ▶") + "</button>";
        $$(".hs-choice", body).forEach(function (b) { b.disabled = true; });
        var inp = body.querySelector(".hs-in"); if (inp) inp.disabled = true;
      }
      S.nextItem = function () { i++; if (i < list.length) show(); else done(); };
      S.hint = function (k) { var h = body.querySelector(".hs-hint"); if (h && S.p) { h.textContent = ["💡 ", "🔄 ", "👣 "][k] + S.p.hints[k]; var hc = k === 1 && S.p.hintClip ? S.p.hintClip : (S.p.hintClips ? S.p.hintClips[k] : null); if (hc) stdSay([hc]); } };
      show();
    }
    function recap() {
      S.step = 4;
      var right = quiz.length - S.wrongFirst, learned = S.wrongFirst <= 1;
      stdSay([learned ? "std-learned.mp3" : "std-almost.mp3"]);
      if (window.HootLessons && window.HootLessons.recordResult) window.HootLessons.recordResult(lesson.id, S.wrongFirst, quiz.length, Date.now() - S.t0);
      shell('<section class="hs-card"><h3>' + right + " of " + quiz.length + " right first try</h3>" +
        '<p class="hs-verdict ' + (learned ? "ok" : "no") + '">' + (learned ? "✓ Learned! I'll bring this back for a quick review in a few days." : "Almost — this goes on your Practice list so I can show it again tomorrow.") + "</p>" +
        (S.misses.length ? "<h4>Look again</h4>" + S.misses.map(function (p) { return '<div class="hs-miss">' + qHtml(p) + '<ol class="hs-sol">' + p.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol></div>"; }).join("") : "") +
        '<div class="hs-end"><button type="button" class="hs-btn" data-hs="again">↻ Practice again (' + esc(lesson.again || "new numbers") + ')</button>' + (nextOf(lesson) ? '<button type="button" class="hs-btn pri" data-hs="nextlesson">Next lesson ▶</button>' : "") + "</div></section>");
    }
    S.go = function (what) {
      if (what === "next") { if (S.step === 0) watch(); else if (S.step === 1) run(together, "together", function () { run(quiz, "quiz", recap); }); }
      else if (what === "more") S.more();
      else if (what === "item") S.nextItem();
      else if (what === "again") play(lesson, body);
      else if (what === "nextlesson") { var n = nextOf(lesson); if (!n) return; var t = document.querySelector("#ll-otitle"); if (t) t.textContent = n.title; play(n, body); }
    };
    learn();
  }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  /* next lesson inside the same course (math7, ela7, …) */
  function nextOf(l) { var c = L.filter(function (x) { return (x.course || "math7") === (l.course || "math7"); }), i = c.indexOf(l); return i >= 0 && i < c.length - 1 ? c[i + 1] : null; }

  document.addEventListener("click", function (e) {
    if (!cur || !e.target.closest) return;
    var t = e.target.closest("[data-hs],[data-hs-pick],[data-hs-hint]");
    if (!t || !t.closest("#ll-obody .hs")) return;
    if (t.hasAttribute("data-hs")) cur.go(t.getAttribute("data-hs"));
    else if (t.hasAttribute("data-hs-pick")) cur.answer(t.getAttribute("data-hs-pick"));
    else cur.hint(+t.getAttribute("data-hs-hint"));
  });
  document.addEventListener("submit", function (e) {
    var f = e.target; if (!cur || !f.getAttribute || f.getAttribute("data-hs-form") !== "1") return;
    e.preventDefault(); cur.answer(f.querySelector(".hs-in").value);
  });

  var api = { lessons: L, play: play, stop: function () { cur = null; stdStop(); }, parseAns: parseAns, correct: correct,
    current: function () { return cur && cur.p ? { type: cur.p.type, ans: cur.p.ans, choices: cur.p.choices } : null; } /* used by the QA playthrough */ };
  window.HootStudy = api;
  /* 3e31: courses register here — Grade 7 math below, Grade 7 English from
     hoot-ela7.js. Each lesson carries its course id, subject line and colour. */
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
  /* 3e32: question-bank lessons (English, science, social studies). Each item:
     { q, a (right answer), w (wrong answers), why, hint?, pass? (reading
     passage), fixed? (a set choice list such as the 4 sentence types) }.
     Every run deals a full fresh pile with the previous run's questions at the
     bottom, so one run never repeats a question. */
  function shuf(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function bank(lesson) {
    lesson.items.forEach(function (it, i) {
      if (!it.__whyClip) it.__whyClip = "std-why-" + lesson.id + "-" + i + ".mp3";
      if (it.hint && !it.__hintClip) it.__hintClip = "std-hint-" + lesson.id + "-" + i + ".mp3";
    });
    var deck = [], last = [];
    lesson.newRun = function () { deck = shuf(last).concat(shuf(lesson.items.filter(function (x) { return last.indexOf(x) < 0; }))); last = []; };
    lesson.gen = function () {
      if (!deck.length) lesson.newRun();
      var it = deck.pop(); last.push(it);
      var choices = it.fixed ? it.fixed.slice() : shuf([it.a].concat(it.w));
      return { q: it.q, passage: it.pass || "", type: "mc", choices: choices, ans: choices.indexOf(it.a),
        steps: [lesson.method, it.why, "Answer: " + it.a], hints: [lesson.hints[0], it.hint || lesson.hints[1], lesson.hints[2]],
        whyClip: it.__whyClip || null, hintClip: it.__hintClip || null, methodClip: "std-" + lesson.id + "-method.mp3",
        hintClips: ["std-hint1-" + lesson.id + ".mp3", "std-hint2-" + lesson.id + ".mp3", "std-hint3-" + lesson.id + ".mp3"] };
    };
    return lesson;
  }
  /* 3e33: each bank course ends with a mixed review that draws from every
     lesson, so older material keeps coming back like a unit test */
  api.addBankCourse = function (meta, list) {
    if (meta.review) {
      var all = []; list.forEach(function (l) { l.items.forEach(function (it, j) { all.push(Object.assign({ why: "" }, it, { why: it.why + " (From: " + l.title + ")", __whyClip: "std-why-" + l.id + "-" + j + ".mp3", __hintClip: it.hint ? "std-hint-" + l.id + "-" + j + ".mp3" : null })); }); });
      list = list.concat([{ id: meta.id + "-review", title: meta.review, std: "All lessons", emo: "🏁",
        learn: ["This review mixes questions from every lesson in the course, like a unit test.", "Take your time. If one stumps you, the explanation tells you which lesson to go back to."],
        vocab: "mixed practice = the best way to make learning stick",
        method: "Figure out which lesson the question comes from, then use what you learned there.",
        hints: ["Which lesson does this question come from? Think back to its key idea.", "Rule out the choices you know are wrong first.", "Read the question again slowly, word by word."],
        items: all }]);
    }
    addCourse(meta, list.map(bank));
  };
  var MATH = L.splice(0, L.length).map(function (l) {
    /* Wave 2: wire Grade 7 math method + 3 hint clips per lesson (Muse records
       std-m7-<lesson>-method.mp3 and std-hint{1,2,3}-m7-<lesson>.mp3). */
    var rawGen = l.gen;
    l.gen = function () {
      var p = rawGen();
      if (!p.methodClip) p.methodClip = "std-" + l.id + "-method.mp3";
      if (!p.hintClips) p.hintClips = ["std-hint1-" + l.id + ".mp3", "std-hint2-" + l.id + ".mp3", "std-hint3-" + l.id + ".mp3"];
      return p;
    };
    return l;
  });
  addCourse({ id: "math7", title: "Grade 7 math · full course", emo: "📐", color: "#0B5E43", subject: "Grade 7 math", again: "new numbers" }, MATH);
})();
