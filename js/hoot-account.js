/* Hoot family accounts (3e40).
   A parent signs in with email and password. The family's saved progress then
   lives under that account, where only the family's adults can read or change
   it. Children never get a login.

   Talks to Supabase Auth and its REST API with plain fetch, so there is no
   library to load. Everything is off unless js/hoot-config.js is filled in.

   window.HootAccount = { configured, active, familyId, fetch, pullState,
     pushState, cardHtml, ... } */
(function () {
  "use strict";
  var CFG = window.HOOT_BACKEND || {};
  var URL0 = String(CFG.url || "").replace(/\/+$/, ""), KEY = String(CFG.anonKey || "");
  var STORE = "hootworld.account.v1", MARK_KEY = "hootworld.familysync.v1";
  var CONSENT_VERSION = "child-data-2026-11";
  var MIN_PASSWORD = 10;

  function configured() { return /^https?:\/\//.test(URL0) && KEY.length > 20; }
  function load() { try { var s = JSON.parse(localStorage.getItem(STORE) || "null"); return s && typeof s === "object" ? s : null; } catch (e) { return null; } }
  var sess = configured() ? load() : null;
  function save() { try { if (sess) localStorage.setItem(STORE, JSON.stringify(sess)); else localStorage.removeItem(STORE); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function changed() { try { document.dispatchEvent(new CustomEvent("hoot-account-changed")); } catch (e) {} }

  function active() { return !!(sess && sess.refresh_token && sess.familyId); }
  function familyId() { return sess ? sess.familyId : ""; }

  /* ---------- auth ---------- */
  function authCall(path, body, token) {
    var h = { "apikey": KEY, "Content-Type": "application/json" };
    if (token) h.Authorization = "Bearer " + token;
    return fetch(URL0 + "/auth/v1/" + path, { method: "POST", headers: h, body: JSON.stringify(body || {}) }).then(function (res) {
      return res.text().then(function (t) {
        var j = {}; try { j = t ? JSON.parse(t) : {}; } catch (e) {}
        if (!res.ok) { var err = new Error(j.msg || j.error_description || j.message || j.error || ("Error " + res.status)); err.status = res.status; err.code = j.error_code || j.code || ""; throw err; }
        return j;
      });
    });
  }
  function takeSession(j) {
    if (!j || !j.access_token || !j.refresh_token) return false;
    sess = sess || {};
    sess.access_token = j.access_token; sess.refresh_token = j.refresh_token;
    sess.expires_at = Date.now() + Math.max(30, (j.expires_in || 3600)) * 1000;
    if (j.user) { sess.userId = j.user.id; sess.email = j.user.email; }
    save(); return true;
  }
  var refreshing = null;
  function refresh() {
    if (refreshing) return refreshing;
    if (!sess || !sess.refresh_token) return Promise.reject(new Error("signed out"));
    refreshing = authCall("token?grant_type=refresh_token", { refresh_token: sess.refresh_token }).then(function (j) {
      refreshing = null; if (!takeSession(j)) throw new Error("no session"); return sess.access_token;
    }, function (e) {
      refreshing = null;
      /* the login was ended somewhere else: sign this device out, keep its saved progress */
      if (e.status === 400 || e.status === 401 || e.status === 403) { localSignOut(); changed(); }
      throw e;
    });
    return refreshing;
  }
  var leaving = false;
  window.addEventListener("pagehide", function () { leaving = true; });
  window.addEventListener("pageshow", function () { leaving = false; });
  function token(noRenew) {
    if (!sess || !sess.access_token) return Promise.reject(new Error("signed out"));
    if (sess.expires_at - Date.now() >= 60000) return Promise.resolve(sess.access_token);
    /* Never renew the login while the page is closing: the new login would be
       lost with the page and the old one is already used up. The save simply
       waits for the next time the app opens. */
    if (noRenew || leaving) return Promise.reject(new Error("login needs renewing; skipped while closing"));
    return refresh();
  }
  function localSignOut() { sess = null; save(); try { localStorage.removeItem(MARK_KEY); } catch (e) {} }

  /* fetch against the project with the parent's login; refreshes once on 401 */
  function afetch(path, opts) {
    opts = opts || {};
    function go(tok) {
      var h = { "apikey": KEY, "Authorization": "Bearer " + tok };
      if (opts.headers) for (var k in opts.headers) h[k] = opts.headers[k];
      return fetch(URL0 + path, { method: opts.method || "GET", headers: h, body: opts.body, keepalive: !!opts.keepalive });
    }
    return token(!!opts.keepalive).then(go).then(function (res) {
      if (res.status !== 401 || opts.keepalive || leaving) return res;
      return refresh().then(go);
    });
  }
  function rpc(name, args) {
    return afetch("/rest/v1/rpc/" + name, { method: "POST", headers: { "Content-Type": "application/json", "Content-Profile": "app", "Accept-Profile": "app" }, body: JSON.stringify(args || {}) })
      .then(function (res) { return res.text().then(function (t) { var j = null; try { j = t ? JSON.parse(t) : null; } catch (e) {} if (!res.ok) { var err = new Error((j && (j.message || j.hint)) || ("Error " + res.status)); err.status = res.status; throw err; } return j; }); });
  }

  /* ---------- the family document (used by Family Sync) ---------- */
  function pullState() {
    return afetch("/rest/v1/family_state?family_id=eq." + encodeURIComponent(sess.familyId) + "&select=state,updated_at,rev", { headers: { "Accept-Profile": "app" } })
      .then(function (res) { if (!res.ok) throw new Error("pull " + res.status); return res.json(); })
      .then(function (rows) { return rows && rows.length ? rows[0] : null; });
  }
  /* Save only if nobody else saved since `basedOn` (the row this device last
     read). If someone did, nothing is written and the error is marked
     `conflict`, so the sync engine merges again and retries. */
  function conflict() { var e = new Error("someone else saved first"); e.conflict = true; return e; }
  function pushState(state, keepalive, basedOn) {
    var body = JSON.stringify({ family_id: sess.familyId, state: state, updated_at: state.updated_at });
    if (!basedOn || basedOn.rev == null) {
      return afetch("/rest/v1/family_state", { method: "POST", keepalive: !!keepalive, headers: { "Content-Type": "application/json", "Content-Profile": "app", "Prefer": "return=minimal" }, body: body })
        .then(function (res) { if (res.status === 409) throw conflict(); if (!res.ok) throw new Error("push " + res.status); });
    }
    return afetch("/rest/v1/family_state?family_id=eq." + encodeURIComponent(sess.familyId) + "&rev=eq." + encodeURIComponent(basedOn.rev) + "&select=rev", {
      method: "PATCH", keepalive: !!keepalive,
      headers: { "Content-Type": "application/json", "Content-Profile": "app", "Accept-Profile": "app", "Prefer": "return=representation" },
      body: JSON.stringify({ state: state, updated_at: state.updated_at })
    }).then(function (res) { if (!res.ok) throw new Error("push " + res.status); return res.json(); })
      .then(function (rows) { if (!rows || !rows.length) throw conflict(); });
  }

  /* ---------- sign up / in / out ---------- */
  function findFamily() {
    return rpc("my_family").then(function (rows) {
      var f = Array.isArray(rows) ? rows[0] : rows;
      if (f && f.family_id) { sess.familyId = f.family_id; sess.familyName = f.name; sess.role = f.role; save(); return true; }
      return false;
    });
  }
  function enter() {
    /* The sync engine reads the account at start-up. Mark this as the device's
       first sync with the account, so what is already on the device is
       COMBINED with the family's saved progress instead of replaced by it. */
    try {
      localStorage.setItem(MARK_KEY, JSON.stringify({ lastSync: "1970-01-01T00:00:00.000Z", hash: "first-sign-in", paths: {}, first: true }));
      sessionStorage.setItem("hoot.acct.flash", "in");
    } catch (e) {}
    try { location.reload(); } catch (e) {}
  }
  function signIn(email, password) {
    return authCall("token?grant_type=password", { email: email, password: password }).then(function (j) {
      if (!takeSession(j)) throw new Error("Could not sign in.");
      return findFamily();
    }).then(function (has) { if (has) enter(); else { ui.view = "family"; changed(); } });
  }
  function signUp(email, password, familyName) {
    return authCall("signup", { email: email, password: password }).then(function (j) {
      if (takeSession(j)) return startFamily(familyName);
      /* the project asks new parents to confirm their email first */
      ui.view = "in"; ui.email = email; ui.note = "Almost there. We sent a link to " + email + ". Open it to confirm your email, then sign in here."; ui.pendingFamily = familyName; changed();
    });
  }
  function startFamily(name) {
    return rpc("start_family", { family_name: name, consent_version: CONSENT_VERSION }).then(function (fid) {
      sess.familyId = typeof fid === "string" ? fid : (fid && fid.start_family) || ""; sess.familyName = name; sess.role = "owner"; save();
      if (!sess.familyId) throw new Error("Could not create the family.");
      enter();
    });
  }
  function signOut() {
    var t = sess && sess.access_token;
    localSignOut();
    if (t) authCall("logout", {}, t).catch(function () {});
    try { sessionStorage.setItem("hoot.acct.flash", "out"); location.reload(); } catch (e) {}
  }
  function recover(email) { return authCall("recover", { email: email }); }
  function deleteFamily() {
    return rpc("delete_family", { fid: sess.familyId }).then(function () { signOut(); });
  }
  /* a password-reset link lands back on the app with a one-time login in the address */
  var recovery = null;
  function readRecovery() {
    try {
      var h = new URLSearchParams(String(location.hash || "").replace(/^#/, ""));
      if (configured() && h.get("type") === "recovery" && h.get("access_token")) {
        recovery = { access_token: h.get("access_token"), refresh_token: h.get("refresh_token") || "" };
        /* take the one-time login out of the address bar and history */
        history.replaceState(null, "", location.pathname + location.search);
        return true;
      }
    } catch (e) {}
    return false;
  }
  readRecovery();
  /* the link can also land on a tab where the app is already open */
  window.addEventListener("hashchange", function () { if (readRecovery()) { ui.view = "in"; ui.err = ""; ui.note = ""; changed(); } });
  function setNewPassword(pw) {
    return fetch(URL0 + "/auth/v1/user", { method: "PUT", headers: { "apikey": KEY, "Content-Type": "application/json", "Authorization": "Bearer " + recovery.access_token }, body: JSON.stringify({ password: pw }) })
      .then(function (res) { if (!res.ok) throw new Error("That link has expired. Ask for a new one."); recovery = null; ui.view = "in"; ui.note = "Password changed. Sign in with the new one."; changed(); });
  }

  /* ---------- the card in Grown-ups ---------- */
  var ui = { view: "in", note: "", err: "", busy: false, pendingFamily: "", email: "" };
  function friendly(e) {
    var m = String((e && e.message) || e || "");
    if (/Failed to fetch|NetworkError|load failed/i.test(m)) return "Couldn't reach the account service. Check the connection and try again.";
    if (/invalid login|invalid_credentials|invalid grant/i.test(m)) return "That email and password don't match.";
    if (/already registered|already exists|user_already/i.test(m)) return "There is already an account for that email. Sign in instead.";
    if (/not confirmed/i.test(m)) return "Confirm your email first: open the link we sent, then sign in.";
    if (/rate limit|too many/i.test(m)) return "Too many tries. Wait a minute and try again.";
    if (/already belongs/i.test(m)) return "This account already has a family.";
    return m || "Something went wrong. Try again.";
  }
  function cardHtml() {
    if (!configured()) return "";
    var head = '<section class="ll-card ac-card" id="hoot-account"><h2 style="margin:0 0 4px">Family account</h2>';
    var note = (ui.note ? '<p class="ac-note" role="status">' + esc(ui.note) + "</p>" : "") + (ui.err ? '<p class="ac-err" role="alert">' + esc(ui.err) + "</p>" : "");
    var dis = ui.busy ? " disabled" : "";
    if (recovery) {
      return head + '<p class="hoot-line">Choose a new password.</p>' + note +
        '<form class="ac-form" data-acct="newpw"><label>New password<input name="p" type="password" minlength="' + MIN_PASSWORD + '" autocomplete="new-password" required></label>' +
        '<button type="submit" class="ll-btn pri"' + dis + ">Save password</button></form></section>";
    }
    if (active()) {
      return head + '<p class="hoot-line" style="margin:0 0 8px">Signed in as <b>' + esc(sess.email || "") + "</b> · " + esc(sess.familyName || "Your family") + ". This device saves to your family account. Only the adults of your family can open it.</p>" + note +
        '<p class="ac-row"><button type="button" class="ll-btn pri" data-acct="sync"' + dis + '>Sync now</button><button type="button" class="ll-btn" data-acct="out"' + dis + ">Sign out on this device</button></p>" +
        '<p class="ac-small">Signing out keeps everything that is saved on this device. The old family code is not used while you are signed in.</p>' +
        (sess.role === "owner" ? '<details class="ac-danger"' + (ui.openDelete ? " open" : "") + '><summary>Delete the family account data</summary><p>This deletes everything stored in your family account for every child. It cannot be undone. What is saved on this device stays. Type the family name to confirm.</p>' +
          '<form class="ac-form" data-acct="delete"><label>Family name<input name="n" autocomplete="off" required></label><button type="submit" class="ll-btn"' + dis + ">Delete account data</button></form></details>" : "") + "</section>";
    }
    if (sess && sess.access_token && !sess.familyId) { /* signed in, no family yet */
      return head + '<p class="hoot-line">One more step: name your family.</p>' + note + familyFields(dis, ui.pendingFamily) + "</section>";
    }
    var tabs = '<p class="ac-tabs"><button type="button" class="ll-btn sm' + (ui.view === "in" ? " pri" : "") + '" data-acct="view-in">Sign in</button><button type="button" class="ll-btn sm' + (ui.view === "up" ? " pri" : "") + '" data-acct="view-up">Create account</button></p>';
    var intro = '<p class="hoot-line" style="margin:0 0 8px">One login for the grown-ups. Your children\'s progress is then saved under your account and follows you to every device. Children never get a login.</p>';
    if (ui.view === "up") {
      return head + intro + tabs + note +
        '<form class="ac-form" data-acct="up"><label>Your email<input name="e" type="email" autocomplete="email" required></label>' +
        '<label>Password (at least ' + MIN_PASSWORD + ' characters)<input name="p" type="password" minlength="' + MIN_PASSWORD + '" autocomplete="new-password" required></label>' +
        '<label>Family name<input name="n" maxlength="60" placeholder="e.g. The Owl family" required></label>' +
        '<label class="ac-check"><input name="c" type="checkbox" required> <span>I am the parent or guardian of the children using this app, and I agree to their learning progress being stored in my family account.</span></label>' +
        '<button type="submit" class="ll-btn pri"' + dis + ">Create account</button></form></section>";
    }
    if (ui.view === "forgot") {
      return head + intro + note + '<form class="ac-form" data-acct="forgot"><label>Your email<input name="e" type="email" autocomplete="email" value="' + esc(ui.email || "") + '" required></label>' +
        '<button type="submit" class="ll-btn pri"' + dis + '>Email me a reset link</button> <button type="button" class="ll-btn sm" data-acct="view-in">Back</button></form></section>';
    }
    return head + intro + tabs + note +
      '<form class="ac-form" data-acct="in"><label>Email<input name="e" type="email" autocomplete="email" value="' + esc(ui.email || "") + '" required></label>' +
      '<label>Password<input name="p" type="password" autocomplete="current-password" required></label>' +
      '<button type="submit" class="ll-btn pri"' + dis + '>Sign in</button> <button type="button" class="ll-btn sm" data-acct="view-forgot">Forgot password?</button></form></section>';
  }
  function familyFields(dis, name) {
    return '<form class="ac-form" data-acct="family"><label>Family name<input name="n" maxlength="60" value="' + esc(name || "") + '" required></label>' +
      '<label class="ac-check"><input name="c" type="checkbox" required> <span>I am the parent or guardian of the children using this app, and I agree to their learning progress being stored in my family account.</span></label>' +
      '<button type="submit" class="ll-btn pri"' + dis + '>Finish</button> <button type="button" class="ll-btn sm" data-acct="out">Sign out</button></form>';
  }
  function run(p) {
    ui.busy = true; ui.err = ""; changed();
    return Promise.resolve().then(p).catch(function (e) { ui.err = friendly(e); }).then(function () { ui.busy = false; changed(); });
  }
  function val(f, n) { var x = f.querySelector('[name="' + n + '"]'); return x ? String(x.value || "") : ""; }
  document.addEventListener("submit", function (e) {
    var f = e.target, k = f && f.getAttribute && f.getAttribute("data-acct"); if (!k) return;
    e.preventDefault(); if (ui.busy) return;
    var email = val(f, "e").trim().toLowerCase(), pw = val(f, "p"), name = val(f, "n").replace(/\s+/g, " ").trim().slice(0, 60);
    if (email) ui.email = email;
    ui.note = "";
    if (k === "in") run(function () { return signIn(email, pw); });
    else if (k === "up") run(function () { if (pw.length < MIN_PASSWORD) throw new Error("Use at least " + MIN_PASSWORD + " characters for the password."); return signUp(email, pw, name); });
    else if (k === "family") run(function () { return startFamily(name); });
    else if (k === "forgot") run(function () { return recover(email).then(function () { ui.view = "in"; ui.note = "If there is an account for " + email + ", a reset link is on its way."; }); });
    else if (k === "newpw") run(function () { if (pw.length < MIN_PASSWORD) throw new Error("Use at least " + MIN_PASSWORD + " characters for the password."); return setNewPassword(pw); });
    else if (k === "delete") run(function () { ui.openDelete = true; if (name.toLowerCase() !== String(sess.familyName || "").toLowerCase()) throw new Error("That doesn't match the family name. Nothing was deleted."); return deleteFamily(); });
  });
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("button[data-acct]"); if (!t) return;
    var k = t.getAttribute("data-acct");
    if (k.indexOf("view-") === 0) { ui.view = k.slice(5); ui.err = ""; ui.note = ""; changed(); }
    else if (k === "out") signOut();
    else if (k === "sync") run(function () {
      if (typeof window.__hootSyncNow !== "function") throw new Error("Sync is not ready yet. Try again in a moment.");
      return window.__hootSyncNow().then(function (ok) { if (!ok) throw new Error("Couldn't reach the account service. Everything keeps saving on this device and will sync later."); ui.note = "Synced with your family account."; });
    });
  });
  try { var fl = sessionStorage.getItem("hoot.acct.flash"); if (fl) { sessionStorage.removeItem("hoot.acct.flash"); ui.note = fl === "in" ? "You're signed in. This device now saves to your family account." : "Signed out. Everything saved on this device is still here."; } } catch (e) {}

  window.HootAccount = {
    configured: configured, active: active, familyId: familyId, fetch: afetch, pullState: pullState, pushState: pushState,
    cardHtml: cardHtml, storeKey: STORE, needsAttention: function () { return !!recovery; },
    photos: function () { return !!CFG.photos; }, host: function () { try { return new URL(URL0).host; } catch (e) { return ""; } }
  };
})();
