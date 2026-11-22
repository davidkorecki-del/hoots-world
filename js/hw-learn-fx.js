/* Hoot's World — Learn & Party Games FX v2:
   Full-screen animated worlds, giant 3D arcade cards, and star/confetti bursts
   for little-kid Learn lessons (.lsn, .hl) AND Hoot's Party Games (.pg).
   Visual-only; never alters lesson/game logic, audio, progress, or family data.
   Never active on Kaitlyn (kidc), .ny-lsn, Hoot Study (.hs), or books. */
(function () {
  "use strict";
  if (window.__hwLearnFx) return;
  window.__hwLearnFx = true;

  var REDUCED = false;
  try { REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  var ov = null, body = null, scene = null, fx = null, raf = 0;
  var COLORS = ["#ff5d5d", "#ffa94d", "#ffd43b", "#69db7c", "#4dabf7", "#9775fa", "#f783ac", "#38d9a9"];

  function isLittle() {
    try { return typeof window.__llIsLittleKid === "function" && !!window.__llIsLittleKid(); } catch (e) { return false; }
  }

  function themeFor(txt) {
    var t = (txt || "").toLowerCase();
    if (/pg-bubbles/.test(t)) return "rainbow";
    if (/pg-garden/.test(t)) return "orchard";
    if (/pg-train/.test(t)) return "storybook";
    if (/pg-dance/.test(t)) return "candy";
    if (/pg-helpers/.test(t)) return "breezy";
    if (/pg-sayit/.test(t)) return "sunset";
    if (/animal|farm|moo|quack/.test(t)) return "meadow";
    if (/colou?r/.test(t)) return "rainbow";
    if (/feeling|face|kind|share|manner|friend|happy|sad/.test(t)) return "sunset";
    if (/shape|star and heart|pattern|same|different|sort|together/.test(t)) return "candy";
    if (/count|number|more and less|how many|dots|\b\d+\b/.test(t)) return "orchard";
    if (/letter|sound|abc|blend|rhym|word|read|a–z|a-z/.test(t)) return "storybook";
    if (/up and down|big and small|weather|sky|wind/.test(t)) return "breezy";
    return "meadow";
  }

  var HILLS =
    '<svg class="lfx-hills" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">' +
      '<path class="h1" d="M0,170 C180,90 360,80 560,140 C760,200 920,110 1120,100 C1280,92 1380,130 1440,150 L1440,320 L0,320 Z"/>' +
      '<g class="trees"><rect class="tk" x="1186" y="96" width="10" height="34" rx="4"/><circle class="tr" cx="1191" cy="88" r="26"/>' +
      '<rect class="tk" x="246" y="104" width="9" height="30" rx="4"/><circle class="tr" cx="250" cy="98" r="22"/></g>' +
      '<path class="h2" d="M0,230 C200,170 380,190 600,230 C820,270 1000,190 1220,200 C1330,205 1400,220 1440,230 L1440,320 L0,320 Z"/>' +
      '<path class="h3" d="M0,290 C240,250 520,262 760,286 C1000,310 1220,268 1440,280 L1440,320 L0,320 Z"/>' +
      '<g><circle class="fl" cx="140" cy="262" r="6"/><circle class="fl2" cx="140" cy="262" r="2.5"/>' +
      '<circle class="fl" cx="420" cy="250" r="6"/><circle class="fl2" cx="420" cy="250" r="2.5"/>' +
      '<circle class="fl" cx="900" cy="248" r="6"/><circle class="fl2" cx="900" cy="248" r="2.5"/>' +
      '<circle class="fl" cx="1300" cy="236" r="6"/><circle class="fl2" cx="1300" cy="236" r="2.5"/></g>' +
    "</svg>";

  function buildScene() {
    var s = document.createElement("div");
    s.className = "lfx-scene";
    s.setAttribute("aria-hidden", "true");
    var parts = "";
    if (!REDUCED) {
      for (var i = 0; i < 11; i++) {
        var spark = i % 3 === 2;
        var size = spark ? 0 : 16 + Math.round(Math.random() * 28);
        var left = Math.round(4 + Math.random() * 92);
        var dur = (13 + Math.random() * 11).toFixed(1);
        var delay = (-Math.random() * 24).toFixed(1);
        parts += '<span class="lfx-p' + (spark ? " spark" : "") + '" style="left:' + left + "%;" +
          (size ? "width:" + size + "px;height:" + size + "px;" : "") +
          "animation-duration:" + dur + "s;animation-delay:" + delay + 's"></span>';
      }
    }
    s.innerHTML =
      '<div class="lfx-rainbow"></div><div class="lfx-sun"></div>' +
      '<div class="lfx-cloud c1"></div><div class="lfx-cloud c2"></div><div class="lfx-cloud c3"></div>' +
      '<div class="lfx-bird"></div><div class="lfx-bird b2"></div>' +
      HILLS + '<div class="lfx-parts">' + parts + "</div>";
    return s;
  }

  function ensureLayers() {
    if (!scene || !scene.isConnected) { scene = buildScene(); ov.insertBefore(scene, ov.firstChild); }
    if (!fx || !fx.isConnected) { fx = document.createElement("div"); fx.className = "lfx-fx"; fx.setAttribute("aria-hidden", "true"); ov.appendChild(fx); }
  }

  function titleText() { var t = document.getElementById("ll-otitle"); return t ? t.textContent : ""; }

  function lessonContext() {
    if (!body) return null;
    if (document.body.classList.contains("lib-book-open") || document.body.classList.contains("game-open")) return null;
    if (body.querySelector(".hs, .ny-lsn.ll-lesson-focus")) return null;
    var pg = body.querySelector(".pg");
    if (pg) return { key: "pg-" + (pg.getAttribute("data-pg") || "") + " " + titleText(), focus: true, isPg: true };
    var hl = body.querySelector(".hl:not(.hs)");
    if (hl) return { key: (hl.getAttribute("data-hl") || "") + " " + titleText(), focus: !hl.classList.contains("hl-pathview") };
    var pl = body.querySelector("#panel-little, #panel-early, #panel-quest");
    if (pl) {
      var f = pl.querySelector(".lsn.ll-lesson-focus:not(.ny-lsn)");
      return { key: (f ? (f.getAttribute("data-lsn-id") || "") : "") + " " + titleText(), focus: !!f };
    }
    return null;
  }

  function syncTeachingFlag() {
    if (!body) return;
    var f = body.querySelector("#panel-little .lsn.ll-lesson-focus");
    if (!f) return;
    var rb = f.querySelector(".lsn-replay");
    f.classList.toggle("lfx-teaching", !!(rb && rb.disabled));
  }

  function evaluate() {
    raf = 0;
    if (!ov) return;
    var open = !ov.hidden;
    var ctx = open && isLittle() ? lessonContext() : null;
    if (!ctx) {
      if (ov.classList.contains("lfx-on")) { ov.classList.remove("lfx-on", "lfx-plain"); ov.removeAttribute("data-lfx"); }
      return;
    }
    ensureLayers();
    syncTeachingFlag();
    var th = ctx.focus ? themeFor(ctx.key) : "meadow";
    if (ov.getAttribute("data-lfx") !== th) ov.setAttribute("data-lfx", th);
    ov.classList.toggle("lfx-plain", th === "rainbow" && !ctx.isPg);
    if (!ov.classList.contains("lfx-on")) ov.classList.add("lfx-on");
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(evaluate); }

  /* ---------- effects ---------- */
  function burstAt(el) {
    if (REDUCED || !fx || !ov.classList.contains("lfx-on")) return;
    var r = el.getBoundingClientRect(), o = ov.getBoundingClientRect();
    var cx = r.left + r.width / 2 - o.left, cy = r.top + r.height / 2 - o.top;
    for (var i = 0; i < 20; i++) {
      var c = document.createElement("span");
      var star = i % 4 === 0;
      c.className = "lfx-c" + (star ? " star" : "");
      var ang = (Math.PI * 2 * i) / 20 + Math.random() * 0.35;
      var dist = 75 + Math.random() * 95;
      c.style.left = cx + "px"; c.style.top = cy + "px";
      c.style.setProperty("--dx", Math.round(Math.cos(ang) * dist) + "px");
      c.style.setProperty("--dy", Math.round(Math.sin(ang) * dist - 44) + "px");
      c.style.setProperty("--rot", Math.round(Math.random() * 540 - 270) + "deg");
      if (!star) c.style.background = COLORS[i % COLORS.length];
      fx.appendChild(c);
      setTimeout((function (n) { return function () { n.remove(); }; })(c), 1100);
    }
  }
  function rain() {
    if (REDUCED || !fx || !ov.classList.contains("lfx-on")) return;
    var w = ov.clientWidth || window.innerWidth;
    for (var i = 0; i < 44; i++) {
      var c = document.createElement("span");
      c.className = "lfx-r";
      c.style.left = Math.round(Math.random() * w) + "px";
      c.style.background = COLORS[i % COLORS.length];
      c.style.animationDuration = (1.8 + Math.random() * 1.4).toFixed(2) + "s";
      c.style.animationDelay = (Math.random() * 0.6).toFixed(2) + "s";
      c.style.setProperty("--sway", Math.round(Math.random() * 120 - 60) + "px");
      c.style.setProperty("--rot", Math.round(Math.random() * 900 - 450) + "deg");
      if (i % 3 === 0) c.style.borderRadius = "50%";
      fx.appendChild(c);
      setTimeout((function (n) { return function () { n.remove(); }; })(c), 3800);
    }
  }
  function pop(el) {
    if (REDUCED || !el) return;
    el.classList.remove("lfx-pop"); void el.offsetWidth; el.classList.add("lfx-pop");
    clearTimeout(el._lfxPopT);
    el._lfxPopT = setTimeout(function () { el.classList.remove("lfx-pop"); }, 500);
  }
  function deal(opts) {
    if (REDUCED || !opts) return;
    opts.classList.remove("lfx-deal"); void opts.offsetWidth; opts.classList.add("lfx-deal");
    clearTimeout(opts._lfxDealT);
    opts._lfxDealT = setTimeout(function () { opts.classList.remove("lfx-deal"); }, 1000);
  }

  function onMutations(list) {
    schedule();
    if (!ov || !ov.classList.contains("lfx-on")) return;
    for (var i = 0; i < list.length; i++) {
      var m = list[i], t = m.target;
      if (t.nodeType === 3) t = t.parentNode;
      if (!t || t.nodeType !== 1) continue;
      if (m.type === "attributes" && m.attributeName === "disabled") {
        if (t.classList && t.classList.contains("lsn-replay")) syncTeachingFlag();
      } else if (m.type === "attributes" && m.attributeName === "class") {
        var cl = t.classList;
        if ((cl.contains("lsn-opt") || cl.contains("hl-opt")) && cl.contains("right") && !t._lfxRight) {
          t._lfxRight = true; burstAt(t);
        } else if ((cl.contains("lsn-opt") || cl.contains("hl-opt")) && !cl.contains("right")) {
          t._lfxRight = false;
        }
        /* Party games right tap celebration */
        if ((cl.contains("pg-yay") || cl.contains("pg-popped") || cl.contains("pg-bloomed")) && !t._lfxPgHit) {
          t._lfxPgHit = true; burstAt(t);
        }
        if (cl.contains("lsn") && cl.contains("lsn-finished") && !t._lfxFin) {
          t._lfxFin = true; if (cl.contains("ll-lesson-focus")) rain();
        } else if (cl.contains("lsn") && !cl.contains("lsn-finished")) {
          t._lfxFin = false;
        }
      } else if (m.type === "attributes" && m.attributeName === "hidden") {
        if ((t.classList.contains("hl-end") || t.classList.contains("pg-end")) && !t.hidden) rain();
      } else if (m.type === "childList" || m.type === "characterData") {
        var bub = t.closest && t.closest(".hl-bubble, .lt-bubble, .lsn-q, .pg-bubble");
        if (bub && bub.closest("#ll-obody")) {
          pop(bub);
          if (bub.classList.contains("lsn-q")) {
            var card = bub.closest(".lsn");
            if (card) deal(card.querySelector(".lsn-opts"));
          }
        }
      }
    }
  }

  function boot() {
    ov = document.getElementById("ll-overlay");
    body = document.getElementById("ll-obody");
    if (!ov || !body) return false;
    var mo = new MutationObserver(onMutations);
    mo.observe(ov, { attributes: true, attributeFilter: ["class", "hidden", "disabled"], childList: true, subtree: true, characterData: true });
    new MutationObserver(schedule).observe(document.body, { attributes: true, attributeFilter: ["class"] });
    schedule();
    return true;
  }
  if (!boot()) {
    var tries = 0;
    var iv = setInterval(function () { if (boot() || ++tries > 120) clearInterval(iv); }, 500);
  }

  window.__hwLearnFxState = function () {
    return { on: !!(ov && ov.classList.contains("lfx-on")), theme: ov && ov.getAttribute("data-lfx"), little: isLittle() };
  };
})();
