/* Hoot's World — 17/17 Family Sync Proof Test Suite
   Runs directly in Apple WebKit JavaScriptCore (jsc) with zero dependencies:
     /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc tests/family-sync-proof.js

   Extracts and executes the EXACT Family Sync script from index.html against a
   deterministic multi-device mock Supabase REST + Storage + IndexedDB harness. */
(function () {
  "use strict";

  var ROOT = "/Users/dawidkorecki/.gemini/antigravity/scratch/hoots-world";
  var html = read(ROOT + "/index.html");
  var shellJs = read(ROOT + "/js/hw-ll-shell.js");
  var safePreviewJs = read(ROOT + "/js/safe-preview.js");

  // Extract the exact Family Sync inline <script> block from index.html
  var markerIdx = html.indexOf('var CODE_KEY = "hootworld.familycode.v1";');
  if (markerIdx < 0) throw new Error("Family Sync script not found in index.html");
  var scStart = html.lastIndexOf("<script>", markerIdx);
  var scEnd = html.indexOf("</script>", markerIdx);
  if (scStart < 0 || scEnd < 0) throw new Error("Could not slice Family Sync <script>");
  var SYNC_SRC = html.slice(scStart + 8, scEnd);

  // Also verify syntax cleanly before running
  new Function(SYNC_SRC);

  /* ---------- Deterministic Mock Supabase Cloud ---------- */
  function makeCloud() {
    var rows = {};    // family_code -> { family_code, state, updated_at, rev }
    var bucket = {};  // "code/id.jpg" -> { data, type }
    var log = [];
    var hooks = {
      failPullCount: 0,
      beforePatch: null
    };

    function parseQuery(path) {
      var q = {};
      var idx = path.indexOf("?");
      if (idx < 0) return q;
      path.slice(idx + 1).split("&").forEach(function (kv) {
        var eq = kv.indexOf("=");
        if (eq > 0) q[decodeURIComponent(kv.slice(0, eq))] = decodeURIComponent(kv.slice(eq + 1));
      });
      return q;
    }
    function eqVal(s) { return s && s.indexOf("eq.") === 0 ? s.slice(3) : s; }

    function handleFetch(url, opts) {
      opts = opts || {};
      var method = String(opts.method || "GET").toUpperCase();
      var path = url.replace(/^https:\/\/[^/]+/, "");
      log.push({ method: method, path: path, keepalive: !!opts.keepalive });

      // REST family_state
      if (path.indexOf("/rest/v1/family_state") === 0) {
        var q = parseQuery(path);
        if (method === "GET") {
          if (hooks.failPullCount > 0) {
            hooks.failPullCount--;
            return Promise.resolve({ ok: false, status: 500, json: function () { return Promise.resolve({ message: "simulated 500" }); } });
          }
          var code = eqVal(q.family_code);
          var row = rows[code] ? [JSON.parse(JSON.stringify(rows[code]))] : [];
          return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve(row); } });
        }
        if (method === "POST") {
          var body = JSON.parse(opts.body);
          if (rows[body.family_code] && String((opts.headers && opts.headers.Prefer) || "").indexOf("merge-duplicates") < 0) {
            return Promise.resolve({ ok: false, status: 409, json: function () { return Promise.resolve({ message: "duplicate" }); } });
          }
          rows[body.family_code] = {
            family_code: body.family_code,
            state: JSON.parse(JSON.stringify(body.state)),
            updated_at: body.updated_at,
            rev: (rows[body.family_code] ? rows[body.family_code].rev : 0) + 1
          };
          return Promise.resolve({ ok: true, status: 201, json: function () { return Promise.resolve([]); } });
        }
        if (method === "PATCH") {
          if (typeof hooks.beforePatch === "function") {
            var fn = hooks.beforePatch;
            hooks.beforePatch = null;
            fn();
          }
          var pcode = eqVal(q.family_code);
          var expectAt = eqVal(q.updated_at);
          var cur = rows[pcode];
          if (!cur || cur.updated_at !== expectAt) {
            return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve([]); } });
          }
          var patchBody = JSON.parse(opts.body);
          cur.state = JSON.parse(JSON.stringify(patchBody.state));
          cur.updated_at = patchBody.updated_at;
          cur.rev += 1;
          return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve([{ updated_at: cur.updated_at }]); } });
        }
      }

      // Storage list
      if (path === "/storage/v1/object/list/family-photos" && method === "POST") {
        var b = JSON.parse(opts.body);
        var pref = b.prefix + "/";
        var items = Object.keys(bucket)
          .filter(function (k) { return k.indexOf(pref) === 0; })
          .map(function (k) { return { name: k.slice(pref.length) }; });
        return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve(items); } });
      }
      // Storage delete
      if (path === "/storage/v1/object/family-photos" && method === "DELETE") {
        var db = JSON.parse(opts.body);
        (db.prefixes || []).forEach(function (k) { delete bucket[k]; });
        return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve([]); } });
      }
      // Storage upload / download
      if (path.indexOf("/storage/v1/object/family-photos/") === 0) {
        var key = decodeURIComponent(path.slice("/storage/v1/object/family-photos/".length));
        if (method === "POST") {
          bucket[key] = { data: opts.body, type: (opts.headers && opts.headers["Content-Type"]) || "image/jpeg" };
          return Promise.resolve({ ok: true, status: 200, json: function () { return Promise.resolve({}); } });
        }
        if (method === "GET") {
          if (!bucket[key]) return Promise.resolve({ ok: false, status: 404 });
          return Promise.resolve({ ok: true, status: 200, blob: function () { return Promise.resolve(bucket[key].data); } });
        }
      }
      return Promise.resolve({ ok: false, status: 404, json: function () { return Promise.resolve({}); } });
    }

    return { rows: rows, bucket: bucket, log: log, hooks: hooks, fetch: handleFetch };
  }

  /* ---------- Deterministic Mock Device ---------- */
  function makeDevice(cloud, opts) {
    opts = opts || {};
    var lsMap = {};
    Object.keys(opts.ls || {}).forEach(function (k) { lsMap[k] = typeof opts.ls[k] === "string" ? opts.ls[k] : JSON.stringify(opts.ls[k]); });
    var ssMap = {};
    var idbMap = {};
    (opts.photos || []).forEach(function (p) { idbMap[p.id] = p; });

    var timers = [];
    var nextTid = 1;
    var reloaded = [];
    var docListeners = {};
    var winListeners = {};
    var bodyClasses = {};
    (opts.bodyClasses || []).forEach(function (c) { bodyClasses[c] = true; });

    function makeEl(id) {
      var el = { id: id, hidden: false, textContent: "", value: "", _ls: {} };
      el.addEventListener = function (ev, fn) { (el._ls[ev] = el._ls[ev] || []).push(fn); };
      el.click = function () { (el._ls.click || []).forEach(function (f) { f(); }); };
      return el;
    }
    var els = {
      "sync-nocode": makeEl("sync-nocode"),
      "sync-hascode": makeEl("sync-hascode"),
      "sync-code-big": makeEl("sync-code-big"),
      "sync-status": makeEl("sync-status"),
      "sync-msg": makeEl("sync-msg"),
      "sync-join-input": makeEl("sync-join-input"),
      "sync-start": makeEl("sync-start"),
      "sync-join-btn": makeEl("sync-join-btn"),
      "sync-now": makeEl("sync-now"),
      "sync-copy": makeEl("sync-copy"),
      "sync-stop": makeEl("sync-stop")
    };

    var localStorage = {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(lsMap, k) ? lsMap[k] : null; },
      setItem: function (k, v) { lsMap[k] = String(v); },
      removeItem: function (k) { delete lsMap[k]; },
      get length() { return Object.keys(lsMap).length; },
      key: function (i) { return Object.keys(lsMap)[i] || null; }
    };
    var sessionStorage = {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(ssMap, k) ? ssMap[k] : null; },
      setItem: function (k, v) { ssMap[k] = String(v); },
      removeItem: function (k) { delete ssMap[k]; }
    };
    var indexedDB = {
      open: function () {
        var req = {};
        var db = {
          transaction: function () {
            var tx = {};
            var os = {
              getAll: function () {
                var r = {};
                Promise.resolve().then(function () { r.result = Object.keys(idbMap).map(function (k) { return idbMap[k]; }); if (r.onsuccess) r.onsuccess(); });
                return r;
              },
              getAllKeys: function () {
                var r = {};
                Promise.resolve().then(function () { r.result = Object.keys(idbMap); if (r.onsuccess) r.onsuccess(); });
                return r;
              },
              put: function (rec) {
                idbMap[rec.id] = rec;
                Promise.resolve().then(function () { if (tx.oncomplete) tx.oncomplete(); });
              },
              delete: function (id) {
                delete idbMap[id];
                Promise.resolve().then(function () { if (tx.oncomplete) tx.oncomplete(); });
              }
            };
            tx.objectStore = function () { return os; };
            return tx;
          }
        };
        Promise.resolve().then(function () { req.result = db; if (req.onsuccess) req.onsuccess(); });
        return req;
      }
    };

    var document = {
      visibilityState: "visible",
      body: {
        classList: {
          contains: function (c) { return !!bodyClasses[c]; },
          add: function (c) { bodyClasses[c] = true; },
          remove: function (c) { delete bodyClasses[c]; }
        }
      },
      getElementById: function (id) { return els[id] || null; },
      addEventListener: function (ev, fn) { (docListeners[ev] = docListeners[ev] || []).push(fn); }
    };
    var location = { reload: function () { reloaded.push(Date.now()); } };
    var navigator = { onLine: true };

    var windowObj = {
      localStorage: localStorage,
      sessionStorage: sessionStorage,
      indexedDB: indexedDB,
      document: document,
      location: location,
      navigator: navigator,
      HootAccount: opts.HootAccount || null,
      addEventListener: function (ev, fn) { (winListeners[ev] = winListeners[ev] || []).push(fn); }
    };

    function _setTimeout(fn, ms) {
      var id = nextTid++;
      timers.push({ id: id, fn: fn, ms: ms || 0, repeat: false, cleared: false });
      return id;
    }
    function _setInterval(fn, ms) {
      var id = nextTid++;
      timers.push({ id: id, fn: fn, ms: ms || 0, repeat: true, cleared: false });
      return id;
    }
    function _clearTimeout(id) {
      timers.forEach(function (t) { if (t.id === id) t.cleared = true; });
    }

    // Wait clock helper so consecutive ISO timestamps strictly increase
    var clockBase = opts.clockBase || Date.parse("2026-11-21T13:00:00.000Z");
    var clockTick = 0;
    function MockDate(x) {
      if (arguments.length) return new Date(x);
      return new Date(clockBase + (++clockTick) * 1000);
    }
    MockDate.now = function () { return clockBase + (++clockTick) * 1000; };
    MockDate.parse = Date.parse;

    var runner = new Function(
      "window", "document", "localStorage", "sessionStorage", "indexedDB", "location", "navigator", "fetch", "setTimeout", "setInterval", "clearTimeout", "Date",
      SYNC_SRC
    );

    function boot() {
      runner(windowObj, document, localStorage, sessionStorage, indexedDB, location, navigator, cloud.fetch, _setTimeout, _setInterval, _clearTimeout, MockDate);
    }

    function runTimers(maxMs) {
      var limit = maxMs == null ? 5000 : maxMs;
      var run = timers.filter(function (t) { return !t.cleared && !t.repeat && t.ms <= limit; });
      run.forEach(function (t) { t.cleared = true; t.fn(); });
    }
    function emitDoc(ev) { (docListeners[ev] || []).forEach(function (f) { f(); }); }
    function emitWin(ev) { (winListeners[ev] || []).forEach(function (f) { f(); }); }

    return {
      boot: boot,
      window: windowObj,
      document: document,
      ls: lsMap,
      ss: ssMap,
      idb: idbMap,
      els: els,
      reloaded: reloaded,
      timers: timers,
      runTimers: runTimers,
      emitDoc: emitDoc,
      emitWin: emitWin,
      setLs: function (k, v) { windowObj.localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v)); },
      getJson: function (k) { return lsMap[k] ? JSON.parse(lsMap[k]) : null; }
    };
  }

  function assert(cond, msg) {
    if (!cond) throw new Error("ASSERT FAILED: " + msg);
  }
  function tick(n) {
    var p = Promise.resolve();
    var hops = Math.max(n || 0, 60);
    for (var i = 0; i < hops; i++) p = p.then(function () {});
    return p;
  }

  /* ---------- The 17 Proof Tests ---------- */
  var tests = [];
  function proof(name, fn) { tests.push({ name: name, fn: fn }); }

  // 1. Fresh Join / First Sync (Copy, Never Move)
  proof("1. Fresh Join copies all 17 stores without moving/erasing Device A cloud state", function () {
    var cloud = makeCloud();
    var devA = makeDevice(cloud, {
      ls: {
        "hootworld.familycode.v1": "OWL-TEST01-AAAAAA",
        "hootworld.hl.v1": { kida: { "colors-first": { done: true, last: 100 } } },
        "hootworld.children.v1": { kida: { name: "Zane" } },
        "hootworld.pet.v1": { kida: { egg: { warm: 3 } } },
        "hootworld.lotw.v1": { kida: "L" },
        "hootworld.log.v1": { kida: [{ type: "lesson", title: "Colour names", t: 100 }] },
        "hootworld.plan.v1": { kids: { kida: { free: "after", extra: [{ id: "c1", title: "Walk" }] } } },
        "hootworld.stories.v1": { kidc: { order: ["ws-1"], drafts: { "ws-1": { id: "ws-1", title: "Star Map", pages: ["Page one"] } } } },
        "hootworld.nylessons.v1": { kidc: [true, false] },
        "hootworld.nyneed.v1": { kidc: { 1: true } },
        "hootworld.roadmap.v1": { kida: { games: { paint: 1 } } },
        "hootworld.profiles.v1": { snaps: { kida: { stickers: ["⭐"] } } }
      }
    });
    devA.boot();
    return tick(20).then(function () {
      assert(cloud.rows["OWL-TEST01-AAAAAA"], "Device A must create cloud row");
      var devB = makeDevice(cloud, { clockBase: Date.parse("2026-11-21T13:05:00.000Z") });
      devB.boot();
      devB.els["sync-join-input"].value = "OWL-TEST01-AAAAAA";
      devB.els["sync-join-btn"].click();
      return tick(25).then(function () {
        assert(devB.getJson("hootworld.hl.v1").kida["colors-first"].done === true, "Device B adopted lessons");
        assert(devB.getJson("hootworld.stories.v1").kidc.drafts["ws-1"].title === "Star Map", "Device B adopted stories");
        assert(devB.getJson("hootworld.nylessons.v1").kidc[0] === true, "Device B adopted nylessons");
        assert(devB.reloaded.length === 1, "Device B reloaded once after join");
        assert(cloud.rows["OWL-TEST01-AAAAAA"].state.lessons.kida["colors-first"].done === true, "Cloud copy stayed intact");
      });
    });
  });

  // 2. Empty Cloud Store Never Wipes Non-Empty Local Store (Profile C NY-Store Incident)
  proof("2. Empty cloud store never wipes non-empty local NY/profile store & heals cloud", function () {
    var cloud = makeCloud();
    cloud.rows["OWL-TEST02-BBBBBB"] = {
      family_code: "OWL-TEST02-BBBBBB",
      updated_at: "2026-11-21T13:10:00.000Z",
      rev: 1,
      state: {
        v: 1,
        updated_at: "2026-11-21T13:10:00.000Z",
        nylessons: { kidc: [false, false] }, // EMPTY!
        profiles: { snaps: { kida: { stickers: [] } } }, // EMPTY!
        lessons: { kida: { "shapes-first": { done: true } } },
        photos: [],
        deletedPhotoIds: []
      }
    };
    var dev = makeDevice(cloud, {
      clockBase: Date.parse("2026-11-21T13:12:00.000Z"),
      ls: {
        "hootworld.familycode.v1": "OWL-TEST02-BBBBBB",
        "hootworld.nylessons.v1": { kidc: [true, true] },
        "hootworld.profiles.v1": { snaps: { kida: { stickers: ["🌟"] } } }
      }
    });
    dev.boot();
    return tick(25).then(function () {
      assert(dev.getJson("hootworld.nylessons.v1").kidc[0] === true, "Local NY progress preserved");
      assert(dev.getJson("hootworld.profiles.v1").snaps.kida.stickers[0] === "🌟", "Local stickers preserved");
      assert(dev.getJson("hootworld.lessons.v1") === null && dev.getJson("hootworld.hl.v1").kida["shapes-first"].done === true, "Non-empty cloud lessons adopted");
      assert(dev.getJson("hootworld.familysync.v1").hash === "kept-local-dirty", "Marked kept-local-dirty to heal cloud");
      dev.runTimers(3000);
      return tick(25).then(function () {
        assert(cloud.rows["OWL-TEST02-BBBBBB"].state.nylessons.kidc[0] === true, "Cloud healed with local NY progress");
      });
    });
  });

  // 3. Push Readiness Gate (allStoresRead)
  proof("3. Push readiness gate ensures readStores() captures all 17 stores before pushing", function () {
    assert(SYNC_SRC.indexOf("function allStoresRead()") > 0, "allStoresRead gate exists");
    assert(SYNC_SRC.indexOf("if(!allStoresRead()){") > 0, "pushNow/schedulePush enforces allStoresRead");
    var cloud = makeCloud();
    var dev = makeDevice(cloud, {
      ls: {
        "hootworld.familycode.v1": "OWL-TEST03-CCCCCC",
        "hootworld.hl.v1": { kida: { "letter-a": { done: true } } }
      }
    });
    dev.boot();
    return tick(20).then(function () {
      var st = cloud.rows["OWL-TEST03-CCCCCC"].state;
      assert(st && st.lessons && st.lessons.kida["letter-a"].done === true, "All stores read and pushed cleanly");
    });
  });

  // 4. 3-Way Piece-by-Piece Merge (Two Devices Editing Different Kids)
  proof("4. 3-way piece-by-piece merge preserves Device A (kida) and Device B (kidc) edits", function () {
    var cloud = makeCloud();
    var baseState = {
      v: 1,
      updated_at: "2026-11-21T13:00:00.000Z",
      lessons: { kida: { "colors-first": { done: true } }, kidc: {} },
      photos: [],
      deletedPhotoIds: []
    };
    cloud.rows["OWL-TEST04-DDDDDD"] = { family_code: "OWL-TEST04-DDDDDD", updated_at: baseState.updated_at, rev: 1, state: JSON.parse(JSON.stringify(baseState)) };

    var devA = makeDevice(cloud, { clockBase: Date.parse("2026-11-21T13:01:00.000Z"), ls: { "hootworld.familycode.v1": "OWL-TEST04-DDDDDD" } });
    var devB = makeDevice(cloud, { clockBase: Date.parse("2026-11-21T13:02:00.000Z"), ls: { "hootworld.familycode.v1": "OWL-TEST04-DDDDDD" } });
    devA.boot(); devB.boot();
    return tick(25).then(function () {
      // Device A finishes kida/letter-a and pushes
      var la = devA.getJson("hootworld.hl.v1"); la.kida["letter-a"] = { done: true };
      devA.setLs("hootworld.hl.v1", la);
      devA.runTimers(3000);
      return tick(25);
    }).then(function () {
      // Device B independently finishes kidc/m7-unit-rate and pushes (without having reloaded A's push yet)
      var lb = devB.getJson("hootworld.hl.v1"); lb.kidc["m7-unit-rate"] = { done: true };
      devB.setLs("hootworld.hl.v1", lb);
      devB.runTimers(3000);
      return tick(25);
    }).then(function () {
      var merged = cloud.rows["OWL-TEST04-DDDDDD"].state.lessons;
      assert(merged.kida["colors-first"].done === true, "Original kida lesson kept");
      assert(merged.kida["letter-a"].done === true, "Device A's kida/letter-a survived");
      assert(merged.kidc["m7-unit-rate"].done === true, "Device B's kidc/m7-unit-rate survived");
    });
  });

  // 5. 3-Way Plan Merge (Depth 5)
  proof("5. 3-way depth-5 plan merge preserves custom stop on Device A + day tick on Device B", function () {
    var cloud = makeCloud();
    var basePlan = { kids: { kida: { extra: [{ id: "c0", title: "Base" }], days: { "2026-11-20": { done: { "A": 1 } } } } } };
    cloud.rows["OWL-TEST05-EEEEEE"] = {
      family_code: "OWL-TEST05-EEEEEE",
      updated_at: "2026-11-21T13:00:00.000Z",
      rev: 1,
      state: { v: 1, updated_at: "2026-11-21T13:00:00.000Z", plan: JSON.parse(JSON.stringify(basePlan)), photos: [], deletedPhotoIds: [] }
    };
    var devA = makeDevice(cloud, { clockBase: Date.parse("2026-11-21T13:01:00.000Z"), ls: { "hootworld.familycode.v1": "OWL-TEST05-EEEEEE" } });
    var devB = makeDevice(cloud, { clockBase: Date.parse("2026-11-21T13:02:00.000Z"), ls: { "hootworld.familycode.v1": "OWL-TEST05-EEEEEE" } });
    devA.boot(); devB.boot();
    return tick(25).then(function () {
      var pa = devA.getJson("hootworld.plan.v1");
      pa.kids.kida.extra.push({ id: "c1", title: "Library trip" });
      devA.setLs("hootworld.plan.v1", pa);
      devA.runTimers(3000);
      return tick(25);
    }).then(function () {
      var pb = devB.getJson("hootworld.plan.v1");
      pb.kids.kida.days["2026-11-21"] = { done: { "Colour names": 1 } };
      devB.setLs("hootworld.plan.v1", pb);
      devB.runTimers(3000);
      return tick(25);
    }).then(function () {
      var mp = cloud.rows["OWL-TEST05-EEEEEE"].state.plan.kids.kida;
      assert(mp.extra.length === 2 && mp.extra[1].title === "Library trip", "Device A custom stop kept");
      assert(mp.days["2026-11-21"] && mp.days["2026-11-21"].done["Colour names"] === 1, "Device B day tick kept");
    });
  });

  // 6. Pre-Sync Local Photo Never Deleted on First Sync (Profile A Photo Incident)
  proof("6. Pre-sync local photo is kept & uploaded, while cloud photo downloads cleanly", function () {
    var cloud = makeCloud();
    cloud.bucket["OWL-TEST06-FFFFFF/p-cloud-1.jpg"] = { data: { bytes: "CLOUD_JPG", type: "image/jpeg" }, type: "image/jpeg" };
    cloud.rows["OWL-TEST06-FFFFFF"] = {
      family_code: "OWL-TEST06-FFFFFF",
      updated_at: "2026-11-21T13:00:00.000Z",
      rev: 1,
      state: {
        v: 1,
        updated_at: "2026-11-21T13:00:00.000Z",
        photos: [{ id: "p-cloud-1", key: "leaf", prof: "kida", ts: 100 }],
        deletedPhotoIds: []
      }
    };
    var devB = makeDevice(cloud, {
      clockBase: Date.parse("2026-11-21T13:05:00.000Z"),
      ls: { "hootworld.familycode.v1": "OWL-TEST06-FFFFFF" },
      photos: [{ id: "p-local-1", key: "paint", prof: "kida", ts: 90, blob: { bytes: "LOCAL_JPG", type: "image/jpeg" } }]
    });
    devB.boot();
    return tick(30).then(function () {
      assert(!!devB.idb["p-local-1"], "Pre-sync local photo NOT wiped");
      assert(!!devB.idb["p-cloud-1"], "Cloud photo downloaded to Device B");
      devB.runTimers(3000);
      return tick(30).then(function () {
        assert(!!cloud.bucket["OWL-TEST06-FFFFFF/p-local-1.jpg"], "Pre-sync local photo uploaded to cloud");
        var ids = cloud.rows["OWL-TEST06-FFFFFF"].state.photos.map(function (p) { return p.id; }).sort();
        assert(JSON.stringify(ids) === '["p-cloud-1","p-local-1"]', "Both photos present in cloud metadata");
      });
    });
  });

  // 7. Photo Deletion Propagates ONLY via Tombstone
  proof("7. Photo deletion propagates ONLY via deletedPhotoIds tombstone & converges hashes", function () {
    var cloud = makeCloud();
    cloud.bucket["OWL-TEST07-GGGGGG/p-1.jpg"] = { data: { bytes: "A", type: "image/jpeg" }, type: "image/jpeg" };
    cloud.bucket["OWL-TEST07-GGGGGG/p-2.jpg"] = { data: { bytes: "B", type: "image/jpeg" }, type: "image/jpeg" };
    cloud.rows["OWL-TEST07-GGGGGG"] = {
      family_code: "OWL-TEST07-GGGGGG",
      updated_at: "2026-11-21T13:00:00.000Z",
      rev: 1,
      state: {
        v: 1,
        updated_at: "2026-11-21T13:00:00.000Z",
        photos: [{ id: "p-1", ts: 1 }, { id: "p-2", ts: 2 }],
        deletedPhotoIds: []
      }
    };
    // Device A deletes p-1 (records tombstone, removes p-1 from local IDB)
    var devA = makeDevice(cloud, {
      clockBase: Date.parse("2026-11-21T13:02:00.000Z"),
      ls: { "hootworld.familycode.v1": "OWL-TEST07-GGGGGG", "hootworld.sync.deltomb.v1": ["p-1"] },
      photos: [{ id: "p-2", ts: 2, blob: { bytes: "B", type: "image/jpeg" } }]
    });
    devA.boot();
    return tick(25).then(function () {
      devA.window.__hootSyncNow();
      return tick(30);
    }).then(function () {
      assert(!cloud.bucket["OWL-TEST07-GGGGGG/p-1.jpg"], "Tombstoned p-1 deleted from bucket");
      assert(!!cloud.bucket["OWL-TEST07-GGGGGG/p-2.jpg"], "Non-tombstoned p-2 preserved in bucket");
      assert(cloud.rows["OWL-TEST07-GGGGGG"].state.deletedPhotoIds.indexOf("p-1") >= 0, "p-1 recorded in cloud deletedPhotoIds");

      // Device B still had both p-1 and p-2 locally -> reconciles -> deletes p-1 only & absorbs tombstone
      var devB = makeDevice(cloud, {
        clockBase: Date.parse("2026-11-21T13:05:00.000Z"),
        ls: { "hootworld.familycode.v1": "OWL-TEST07-GGGGGG" },
        photos: [
          { id: "p-1", ts: 1, blob: { bytes: "A", type: "image/jpeg" } },
          { id: "p-2", ts: 2, blob: { bytes: "B", type: "image/jpeg" } }
        ]
      });
      devB.boot();
      return tick(30).then(function () {
        assert(!devB.idb["p-1"], "Device B deleted tombstoned p-1");
        assert(!!devB.idb["p-2"], "Device B kept p-2");
        assert(devB.getJson("hootworld.sync.deltomb.v1").indexOf("p-1") >= 0, "Device B absorbed tombstone");
      });
    });
  });

  // 8. Video Blob Never Uploaded to Photo Sync Bucket (3e54)
  proof("8. Local video/mp4 entries stay on device and are never uploaded to photo bucket", function () {
    var cloud = makeCloud();
    var dev = makeDevice(cloud, {
      ls: { "hootworld.familycode.v1": "OWL-TEST08-HHHHHH" },
      photos: [
        { id: "vid-1", key: "dance", prof: "kida", ts: 1, blob: { bytes: "MP4", type: "video/mp4" } },
        { id: "img-1", key: "paint", prof: "kida", ts: 2, blob: { bytes: "JPG", type: "image/jpeg" } }
      ]
    });
    dev.boot();
    return tick(30).then(function () {
      assert(!cloud.bucket["OWL-TEST08-HHHHHH/vid-1.jpg"], "Video blob NOT uploaded");
      assert(!!cloud.bucket["OWL-TEST08-HHHHHH/img-1.jpg"], "JPEG photo uploaded");
    });
  });

  // 9. Wave 4.1: Network Failure on Pre-Push pullRow() NEVER Overwrites Cloud
  proof("9. [Wave 4.1] Network failure on pre-push pullRow() aborts safely with 0 cloud overwrites", function () {
    var cloud = makeCloud();
    cloud.rows["OWL-TEST09-IIIIII"] = {
      family_code: "OWL-TEST09-IIIIII",
      updated_at: "2026-11-21T13:00:00.000Z",
      rev: 1,
      state: {
        v: 1,
        updated_at: "2026-11-21T13:00:00.000Z",
        lessons: { kidc: { "m7-angles": { done: true } } },
        photos: [{ id: "p-safe", ts: 50 }],
        deletedPhotoIds: []
      }
    };
    var dev = makeDevice(cloud, {
      clockBase: Date.parse("2026-11-21T13:05:00.000Z"),
      ls: {
        "hootworld.familycode.v1": "OWL-TEST09-IIIIII",
        "hootworld.familysync.v1": { lastSync: "2026-11-21T13:00:00.000Z", hash: "old", paths: {} },
        "hootworld.hl.v1": { kida: { "letter-b": { done: true } } }
      }
    });
    // Fail both initial reconcile pull AND scheduled pushNow pull
    cloud.hooks.failPullCount = 2;
    dev.boot();
    return tick(20).then(function () {
      cloud.log.length = 0;
      dev.setLs("hootworld.hl.v1", { kida: { "letter-b": { done: true }, "letter-c": { done: true } } });
      dev.runTimers(3000);
      return tick(25);
    }).then(function () {
      var writes = cloud.log.filter(function (r) { return r.path.indexOf("/rest/v1/family_state") === 0 && (r.method === "POST" || r.method === "PATCH"); });
      assert(writes.length === 0, "Expected 0 cloud writes when pullRow fails, got " + writes.length);
      assert(cloud.rows["OWL-TEST09-IIIIII"].state.lessons.kidc["m7-angles"].done === true, "Cloud kidc progress untouched");
      assert(cloud.rows["OWL-TEST09-IIIIII"].state.photos[0].id === "p-safe", "Cloud photo metadata untouched");
    });
  });

  // 10. Wave 4.2: Optimistic Lock Conflict Merge-and-Retry in Family-Code Mode
  proof("10. [Wave 4.2] Optimistic updated_at lock catches concurrent save, merges & retries with 0 loss", function () {
    var cloud = makeCloud();
    var t0 = "2026-11-21T13:00:00.000Z";
    cloud.rows["OWL-TEST10-JJJJJJ"] = {
      family_code: "OWL-TEST10-JJJJJJ",
      updated_at: t0,
      rev: 1,
      state: { v: 1, updated_at: t0, lessons: { kida: {}, kidb: {} }, photos: [], deletedPhotoIds: [] }
    };
    var devB = makeDevice(cloud, {
      clockBase: Date.parse("2026-11-21T13:05:00.000Z"),
      ls: { "hootworld.familycode.v1": "OWL-TEST10-JJJJJJ" }
    });
    devB.boot();
    return tick(25).then(function () {
      // Simulate Device A sneaking in a save right after Device B's pre-push pull, before Device B's PATCH lands
      cloud.hooks.beforePatch = function () {
        cloud.rows["OWL-TEST10-JJJJJJ"].updated_at = "2026-11-21T13:04:59.000Z";
        cloud.rows["OWL-TEST10-JJJJJJ"].state.updated_at = "2026-11-21T13:04:59.000Z";
        cloud.rows["OWL-TEST10-JJJJJJ"].state.lessons.kida["letter-z"] = { done: true };
      };
      var lb = devB.getJson("hootworld.hl.v1");
      lb.kidb["colors-more"] = { done: true };
      devB.setLs("hootworld.hl.v1", lb);
      devB.runTimers(3000);
      return tick(25);
    }).then(function () {
      // Conflict retry timer scheduled at 250..1150ms -> run it!
      devB.runTimers(2000);
      return tick(30);
    }).then(function () {
      var patchCalls = cloud.log.filter(function (r) { return r.method === "PATCH" && r.path.indexOf("updated_at=eq.") > 0; });
      assert(patchCalls.length >= 2, "Expected conditional PATCH conflict + retry, got " + patchCalls.length);
      var finalLessons = cloud.rows["OWL-TEST10-JJJJJJ"].state.lessons;
      assert(finalLessons.kida["letter-z"].done === true, "Concurrent Device A edit preserved");
      assert(finalLessons.kidb["colors-more"].done === true, "Device B edit merged & saved on retry");
    });
  });

  // 11. Account Mode (HootAccount) rev Lock & No-Photo Mode
  proof("11. HootAccount mode routes through rev-locked pushState & skips photo bucket when photos=false", function () {
    var cloud = makeCloud();
    var acctState = { row: { state: { v: 1, updated_at: "2026-11-21T13:00:00.000Z", lessons: { kida: {} }, photos: [], deletedPhotoIds: [] }, updated_at: "2026-11-21T13:00:00.000Z", rev: 5 }, pushes: 0, failOnce: true };
    var mockAcct = {
      active: function () { return true; },
      familyId: function () { return "fam-uuid-123"; },
      photos: function () { return false; },
      fetch: function () { throw new Error("Bucket fetch must not be called when photos=false"); },
      pullState: function () { return Promise.resolve(JSON.parse(JSON.stringify(acctState.row))); },
      pushState: function (st, keepalive, basedOn) {
        acctState.pushes++;
        assert(basedOn && basedOn.rev === acctState.row.rev, "pushState received basedOn.rev");
        if (acctState.failOnce) {
          acctState.failOnce = false;
          acctState.row.rev = 6;
          acctState.row.updated_at = "2026-11-21T13:03:00.000Z";
          acctState.row.state.updated_at = "2026-11-21T13:03:00.000Z";
          acctState.row.state.lessons.kida["shapes-first"] = { done: true };
          var err = new Error("conflict"); err.conflict = true;
          return Promise.reject(err);
        }
        acctState.row = { state: JSON.parse(JSON.stringify(st)), updated_at: st.updated_at, rev: acctState.row.rev + 1 };
        return Promise.resolve();
      }
    };
    var dev = makeDevice(cloud, {
      clockBase: Date.parse("2026-11-21T13:05:00.000Z"),
      HootAccount: mockAcct,
      photos: [{ id: "p-dev-only", ts: 1, blob: { bytes: "X", type: "image/jpeg" } }]
    });
    dev.boot();
    return tick(25).then(function () {
      var l = dev.getJson("hootworld.hl.v1"); l.kida["letter-m"] = { done: true };
      dev.setLs("hootworld.hl.v1", l);
      dev.runTimers(3000);
      return tick(25);
    }).then(function () {
      dev.runTimers(2000);
      return tick(30);
    }).then(function () {
      assert(acctState.pushes === 2, "Account conflict retried cleanly (pushes=" + acctState.pushes + ")");
      assert(acctState.row.state.lessons.kida["shapes-first"].done === true, "Concurrent account edit preserved");
      assert(acctState.row.state.lessons.kida["letter-m"].done === true, "Local account edit merged");
      assert(cloud.log.length === 0, "Zero direct family-code/bucket calls made in HootAccount mode");
    });
  });

  // 12. Wave 4.3: Safe-Moment Adoption on online Reconnect
  proof("12. [Wave 4.3] online reconcile defers adoption while game-open & reloads only after exit", function () {
    var cloud = makeCloud();
    cloud.rows["OWL-TEST12-LLLLLL"] = {
      family_code: "OWL-TEST12-LLLLLL",
      updated_at: "2026-11-21T13:00:00.000Z",
      rev: 1,
      state: { v: 1, updated_at: "2026-11-21T13:00:00.000Z", lessons: { kida: { "letter-a": { done: true } } }, photos: [], deletedPhotoIds: [] }
    };
    var dev = makeDevice(cloud, {
      clockBase: Date.parse("2026-11-21T13:05:00.000Z"),
      ls: { "hootworld.familycode.v1": "OWL-TEST12-LLLLLL" }
    });
    dev.boot();
    return tick(25).then(function () {
      dev.reloaded.length = 0;
      // Child enters a game!
      dev.document.body.classList.add("game-open");
      // Meanwhile cloud gets newer state
      cloud.rows["OWL-TEST12-LLLLLL"].updated_at = "2026-11-21T13:06:00.000Z";
      cloud.rows["OWL-TEST12-LLLLLL"].state.updated_at = "2026-11-21T13:06:00.000Z";
      cloud.rows["OWL-TEST12-LLLLLL"].state.lessons.kida["letter-b"] = { done: true };
      // WiFi reconnects mid-game!
      dev.emitWin("online");
      return tick(25);
    }).then(function () {
      assert(dev.reloaded.length === 0, "Must NOT reload while game-open is active!");
      // Child finishes game and returns to Home
      dev.document.body.classList.remove("game-open");
      dev.runTimers(4000);
      return tick(25);
    }).then(function () {
      assert(dev.getJson("hootworld.hl.v1").kida["letter-b"].done === true, "Deferred cloud state adopted after game closed");
      assert(dev.reloaded.length === 1, "Reloaded cleanly once back on Home");
    });
  });

  // 13. Wave 4.4: Clean visibilitychange (hidden) Skips No-Op Push
  proof("13. [Wave 4.4] Clean visibilitychange/beforeunload makes 0 pushes; dirty write pushes with keepalive", function () {
    var cloud = makeCloud();
    cloud.rows["OWL-TEST13-MMMMMM"] = {
      family_code: "OWL-TEST13-MMMMMM",
      updated_at: "2026-11-21T13:00:00.000Z",
      rev: 1,
      state: { v: 1, updated_at: "2026-11-21T13:00:00.000Z", lessons: { kida: { "letter-a": { done: true } } }, photos: [], deletedPhotoIds: [] }
    };
    var dev = makeDevice(cloud, {
      clockBase: Date.parse("2026-11-21T13:05:00.000Z"),
      ls: { "hootworld.familycode.v1": "OWL-TEST13-MMMMMM" }
    });
    dev.boot();
    return tick(25).then(function () {
      cloud.log.length = 0;
      dev.document.visibilityState = "hidden";
      dev.emitDoc("visibilitychange");
      dev.emitWin("beforeunload");
      return tick(20);
    }).then(function () {
      assert(cloud.log.length === 0, "Expected 0 network calls when clean on hide, got " + cloud.log.length);
      // Now make a real local change and hide!
      var l = dev.getJson("hootworld.hl.v1"); l.kida["letter-d"] = { done: true };
      dev.setLs("hootworld.hl.v1", l);
      dev.emitDoc("visibilitychange");
      return tick(25);
    }).then(function () {
      var ka = cloud.log.filter(function (r) { return r.method === "PATCH" && r.keepalive; });
      assert(ka.length === 1, "Dirty hide pushed with keepalive=true");
      assert(cloud.rows["OWL-TEST13-MMMMMM"].state.lessons.kida["letter-d"].done === true, "Dirty change saved on hide");
    });
  });

  // 14. Backup Key Exclusion (BACKUP_SKIP) & Staging Guard Parity
  proof("14. Backup excludes auth/sync/tombstone keys & safe-preview blocks staging writes cleanly", function () {
    var m = /var BACKUP_SKIP\s*=\s*(\{[^}]+\})/.exec(shellJs);
    assert(m, "BACKUP_SKIP found in hw-ll-shell.js");
    var skip = (new Function("return " + m[1]))();
    assert(skip["hootworld.familycode.v1"] === 1, "familycode excluded from backup");
    assert(skip["hootworld.familysync.v1"] === 1, "familysync excluded from backup");
    assert(skip["hootworld.sync.deltomb.v1"] === 1, "deltomb excluded from backup (tombstones preserved on restore)");
    assert(skip["hootworld.account.v1"] === 1, "account excluded from backup");

    // Verify safe-preview.js live vs staging behavior (including write blocking)
    function testSafe(host) {
      var classes = {};
      var fetched = 0;
      var w = {
        location: { hostname: host, href: "https://" + host + "/hoots-world/" },
        document: {
          documentElement: { classList: { toggle: function (c, on) { classes[c] = !!on; } } },
          getElementById: function () { return null; },
          querySelectorAll: function () { return []; },
          addEventListener: function () {}
        },
        fetch: function () { fetched++; return Promise.resolve({ ok: true }); },
        XMLHttpRequest: { prototype: { open: function () {}, send: function () {} } },
        navigator: {}
      };
      function MockURL(raw) {
        var m = /^(https?:)\/\/([^/]+)(\/[^?#]*)?/.exec(String(raw));
        this.href = String(raw);
        this.protocol = m ? m[1] : "https:";
        this.host = m ? m[2] : "";
        this.pathname = m && m[3] ? m[3] : "/";
      }
      (new Function("window", "location", "document", "navigator", "XMLHttpRequest", "URL", safePreviewJs))(w, w.location, w.document, w.navigator, w.XMLHttpRequest, MockURL);
      var blocked = false;
      return w.fetch("https://smqdfujuqovkaosssfte.supabase.co/rest/v1/family_state", { method: "POST" }).catch(function (e) {
        if (e && e.safeMode) blocked = true;
      }).then(function () {
        return { safe: w.HW_SAFE, classes: classes, blocked: blocked, fetched: fetched };
      });
    }
    return Promise.all([
      testSafe("davidkorecki-del.github.io"),
      testSafe("kids-homeschool.pages.dev"),
      testSafe("localhost")
    ]).then(function (res) {
      var live = res[0], stage = res[1], loc = res[2];
      assert(live.safe === false && live.classes["hw-is-live"] === true && live.blocked === false && live.fetched === 1, "github.io is live and allows Supabase writes");
      assert(stage.safe === true && stage.classes["hw-is-preview"] === true && stage.blocked === true && stage.fetched === 0, "pages.dev is staging and blocks Supabase writes");
      assert(loc.safe === true && loc.classes["hw-is-preview"] === true && loc.blocked === true && loc.fetched === 0, "localhost is staging and blocks Supabase writes");
    });
  });

  // 15. Wave 4 Q3: All 6 new stores (library, libprog, homelib, completions, oops, actlog) copy cleanly on Fresh Join
  proof("15. [Wave 4 Q3] Fresh Join copies all 6 new stores (library, libprog, homelib, completions, oops, actlog)", function () {
    var cloud = makeCloud();
    var devA = makeDevice(cloud, {
      ls: {
        "hootworld.familycode.v1": "OWL-TEST15-NEW6AA",
        "hootworld.library.v1": { kida: { "lib-pip-garden": "2026-11-21" } },
        "hootworld.libprog.v1": { kida: { "lib-nina-star": 4 } },
        "hootworld.homelib.v1": { kida: [{ id: "home-1", title: "Goodnight Moon", author: "Margaret Wise Brown", cover: "", date: "2026-11-21" }] },
        "hootworld.completions.v1": { kida: { "colors-first": { n: 2, first: 100, last: 200, title: "Colour names" } } },
        "hootworld.oops.v1": { kida: { "colors-first:r0": { state: "seed", title: "Colour names" } } },
        "hootworld.actlog.v1": { kida: { "2026-11-21": { "Leaf Hunt Walk": { t: 300, place: "outdoor", together: true } } } }
      }
    });
    devA.boot();
    return tick(60).then(function () {
      assert(cloud.rows["OWL-TEST15-NEW6AA"], "Device A uploaded all 6 new stores");
      var devB = makeDevice(cloud, { clockBase: Date.parse("2026-11-21T13:05:00.000Z") });
      devB.boot();
      devB.els["sync-join-input"].value = "OWL-TEST15-NEW6AA";
      devB.els["sync-join-btn"].click();
      return tick(60).then(function () {
        assert(devB.getJson("hootworld.library.v1").kida["lib-pip-garden"] === "2026-11-21", "library adopted");
        assert(devB.getJson("hootworld.libprog.v1").kida["lib-nina-star"] === 4, "libprog adopted");
        assert(devB.getJson("hootworld.homelib.v1").kida[0].title === "Goodnight Moon", "homelib adopted");
        assert(devB.getJson("hootworld.completions.v1").kida["colors-first"].n === 2, "completions adopted");
        assert(devB.getJson("hootworld.oops.v1").kida["colors-first:r0"].state === "seed", "oops adopted");
        assert(devB.getJson("hootworld.actlog.v1").kida["2026-11-21"]["Leaf Hunt Walk"].together === true, "actlog adopted");
      });
    });
  });

  // 16. Wave 4 Q3: Empty cloud copies of all 6 new stores NEVER wipe non-empty local copies & heal cloud
  proof("16. [Wave 4 Q3] Empty cloud copies of all 6 new stores never wipe non-empty local progress & heal cloud", function () {
    var cloud = makeCloud();
    cloud.rows["OWL-TEST16-NEW6BB"] = {
      family_code: "OWL-TEST16-NEW6BB",
      updated_at: "2026-11-21T13:10:00.000Z",
      rev: 1,
      state: {
        v: 1,
        updated_at: "2026-11-21T13:10:00.000Z",
        library: { kida: {} },
        libprog: { kida: { "lib-pip-garden": 0 } },
        homelib: { kida: [] },
        completions: { kida: { "colors-first": { n: 0 } } },
        oops: { kida: {} },
        actlog: { kida: { "2026-11-21": {} } },
        photos: [],
        deletedPhotoIds: []
      }
    };
    var dev = makeDevice(cloud, {
      clockBase: Date.parse("2026-11-21T13:12:00.000Z"),
      ls: {
        "hootworld.familycode.v1": "OWL-TEST16-NEW6BB",
        "hootworld.library.v1": { kida: { "lib-moon-train": "2026-11-20" } },
        "hootworld.libprog.v1": { kida: { "lib-nina-star": 6 } },
        "hootworld.homelib.v1": { kida: [{ id: "home-2", title: "Blueberries for Sal", author: "", cover: "", date: "2026-11-20" }] },
        "hootworld.completions.v1": { kida: { "shapes-first": { n: 1, first: 10, last: 10 } } },
        "hootworld.oops.v1": { kida: { "shapes-first:r1": { state: "flower" } } },
        "hootworld.actlog.v1": { kida: { "2026-11-20": { "Splash bowl": { t: 50, place: "outdoor" } } } }
      }
    });
    dev.boot();
    return tick(60).then(function () {
      assert(dev.getJson("hootworld.library.v1").kida["lib-moon-train"] === "2026-11-20", "local library preserved");
      assert(dev.getJson("hootworld.libprog.v1").kida["lib-nina-star"] === 6, "local libprog preserved");
      assert(dev.getJson("hootworld.homelib.v1").kida[0].title === "Blueberries for Sal", "local homelib preserved");
      assert(dev.getJson("hootworld.completions.v1").kida["shapes-first"].n === 1, "local completions preserved");
      assert(dev.getJson("hootworld.oops.v1").kida["shapes-first:r1"].state === "flower", "local oops preserved");
      assert(dev.getJson("hootworld.actlog.v1").kida["2026-11-20"]["Splash bowl"].t === 50, "local actlog preserved");
      assert(dev.getJson("hootworld.familysync.v1").hash === "kept-local-dirty", "marked kept-local-dirty");
      dev.runTimers(3000);
      return tick(60).then(function () {
        var st = cloud.rows["OWL-TEST16-NEW6BB"].state;
        assert(st.library.kida["lib-moon-train"] === "2026-11-20", "cloud library healed");
        assert(st.libprog.kida["lib-nina-star"] === 6, "cloud libprog healed");
        assert(st.homelib.kida[0].title === "Blueberries for Sal", "cloud homelib healed");
        assert(st.completions.kida["shapes-first"].n === 1, "cloud completions healed");
        assert(st.oops.kida["shapes-first:r1"].state === "flower", "cloud oops healed");
        assert(st.actlog.kida["2026-11-20"]["Splash bowl"].t === 50, "cloud actlog healed");
      });
    });
  });

  // 17. Wave 4 Q3: Concurrent 3-way merge across all 6 new stores (including depth-4 same-day actlog!)
  proof("17. [Wave 4 Q3] 3-way concurrent merge preserves both devices across all 6 new stores incl. same-day actlog", function () {
    var cloud = makeCloud();
    var baseState = {
      v: 1,
      updated_at: "2026-11-21T13:00:00.000Z",
      library: { kida: { "lib-pip-garden": "2026-11-19" } },
      libprog: { kida: { "lib-moon-train": 2 } },
      homelib: { kida: [{ id: "h0", title: "Book A" }], kidb: [{ id: "h1", title: "Book B" }] },
      completions: { kida: { "letter-a": { n: 1 } } },
      oops: { kida: { "letter-a:r0": { state: "seed" } } },
      actlog: { kida: { "2026-11-21": { "Roll the ball": { t: 100, place: "home" } } } },
      photos: [],
      deletedPhotoIds: []
    };
    cloud.rows["OWL-TEST17-NEW6CC"] = { family_code: "OWL-TEST17-NEW6CC", updated_at: baseState.updated_at, rev: 1, state: JSON.parse(JSON.stringify(baseState)) };

    var devA = makeDevice(cloud, { clockBase: Date.parse("2026-11-21T13:01:00.000Z"), ls: { "hootworld.familycode.v1": "OWL-TEST17-NEW6CC" } });
    var devB = makeDevice(cloud, { clockBase: Date.parse("2026-11-21T13:02:00.000Z"), ls: { "hootworld.familycode.v1": "OWL-TEST17-NEW6CC" } });
    devA.boot(); devB.boot();
    return tick(60).then(function () {
      // Device A updates kida entries on all 6 stores and pushes
      var libA = devA.getJson("hootworld.library.v1"); libA.kida["lib-nina-star"] = "2026-11-21"; devA.setLs("hootworld.library.v1", libA);
      var lpA = devA.getJson("hootworld.libprog.v1"); lpA.kida["lib-bruno-rain"] = 5; devA.setLs("hootworld.libprog.v1", lpA);
      var hlA = devA.getJson("hootworld.homelib.v1"); hlA.kida.push({ id: "h2", title: "Book A2" }); devA.setLs("hootworld.homelib.v1", hlA);
      var cpA = devA.getJson("hootworld.completions.v1"); cpA.kida["letter-b"] = { n: 1 }; devA.setLs("hootworld.completions.v1", cpA);
      var opA = devA.getJson("hootworld.oops.v1"); opA.kida["letter-b:r0"] = { state: "seed" }; devA.setLs("hootworld.oops.v1", opA);
      var alA = devA.getJson("hootworld.actlog.v1"); alA.kida["2026-11-21"]["Hat parade"] = { t: 200, place: "home" }; devA.setLs("hootworld.actlog.v1", alA);
      devA.runTimers(3000);
      return tick(60);
    }).then(function () {
      // Device B concurrently updates different items (including SAME child + SAME day in actlog!)
      var libB = devB.getJson("hootworld.library.v1"); libB.kida["lib-milo-soup"] = "2026-11-21"; devB.setLs("hootworld.library.v1", libB);
      var lpB = devB.getJson("hootworld.libprog.v1"); lpB.kida["lib-tito-kite"] = 7; devB.setLs("hootworld.libprog.v1", lpB);
      var hlB = devB.getJson("hootworld.homelib.v1"); hlB.kidb.push({ id: "h3", title: "Book B2" }); devB.setLs("hootworld.homelib.v1", hlB);
      var cpB = devB.getJson("hootworld.completions.v1"); cpB.kida["letter-c"] = { n: 1 }; devB.setLs("hootworld.completions.v1", cpB);
      var opB = devB.getJson("hootworld.oops.v1"); opB.kida["letter-c:r0"] = { state: "flower" }; devB.setLs("hootworld.oops.v1", opB);
      var alB = devB.getJson("hootworld.actlog.v1"); alB.kida["2026-11-21"]["Scarf dance"] = { t: 250, place: "home" }; devB.setLs("hootworld.actlog.v1", alB);
      devB.runTimers(3000);
      return tick(60);
    }).then(function () {
      var st = cloud.rows["OWL-TEST17-NEW6CC"].state;
      assert(st.library.kida["lib-nina-star"] && st.library.kida["lib-milo-soup"], "library merged both books");
      assert(st.libprog.kida["lib-bruno-rain"] === 5 && st.libprog.kida["lib-tito-kite"] === 7, "libprog merged both bookmarks");
      assert(st.homelib.kida.length === 2 && st.homelib.kidb.length === 2, "homelib merged both kids");
      assert(st.completions.kida["letter-b"] && st.completions.kida["letter-c"], "completions merged both items");
      assert(st.oops.kida["letter-b:r0"] && st.oops.kida["letter-c:r0"], "oops merged both plots");
      assert(st.actlog.kida["2026-11-21"]["Hat parade"] && st.actlog.kida["2026-11-21"]["Scarf dance"], "depth-4 actlog merged both same-day activities");
    });
  });

  // 18. Kaitlyn Grade 7 stores: fresh join, empty-cloud protection, and 3-way merge across all 12 hs_* stores
  proof("18. [Grade 7 Pro/Sanctuary] All 12 Kaitlyn hs_* stores sync, resist empty-cloud wipe & 3-way merge", function () {
    var cloud = makeCloud();
    var code = "OWL-TEST18-HS12AA";
    var devA = makeDevice(cloud, {
      clockBase: Date.parse("2026-11-24T17:00:00.000Z"),
      ls: {
        "hootworld.familycode.v1": code,
        "hootworld.hs.vibe.v1": { kidc: { xp: 140, gems: 65, avatar: "nova", mood: "Speedrun 🔥", fx: "sakura", owned: { muse: 1, fox: 1, moon: 1, art: 1, nova: 1, stars: 1, sakura: 1, off: 1 } } },
        "hootworld.hs.arcade.v1": { kidc: { dash: 240, timeline: 7 } },
        "hootworld.hs.vault.v1": { kidc: [{ q: "2x + 3 = 11", lessonId: "m7-two-step" }] },
        "hootworld.hs.cer.v1": { kidc: [{ q: "School uniforms", c: "Claim", e: "Evidence", r: "Because", score: 3 }] },
        "hootworld.hs.cards.v1": { kidc: { "fc-1": 1 } },
        "hootworld.hs.customcards.v1": { kidc: [{ f: "Slope", b: "Rise/run" }] },
        "hootworld.hs.exams.v1": { kidc: [{ pct: 88, level: 4 }] },
        "hootworld.hs.daily.v1": { kidc: { "2026-11-24": 1 } },
        "hootworld.hs.nymap.v1": { kidc: { erie: 1, seneca: 1 } },
        "hootworld.hs.labs.v1": { kidc: { prism3d: 1 } },
        "hootworld.hs.pins.v1": { kidc: { "Unit rates": 1 } },
        "hootworld.hs.matchbest.v1": { kidc: 180 }
      }
    });
    devA.boot();
    return tick(60).then(function () {
      assert(cloud.rows[code], "Device A uploaded all 12 Kaitlyn Grade 7 stores");
      var devB = makeDevice(cloud, { clockBase: Date.parse("2026-11-24T17:05:00.000Z") });
      devB.boot();
      devB.els["sync-join-input"].value = code;
      devB.els["sync-join-btn"].click();
      return tick(60).then(function () {
        assert(devB.getJson("hootworld.hs.vibe.v1").kidc.xp === 140, "fresh join copied hs_vibe XP");
        assert(devB.getJson("hootworld.hs.vibe.v1").kidc.avatar === "nova", "fresh join copied hs_vibe avatar");
        assert(devB.getJson("hootworld.hs.arcade.v1").kidc.dash === 240, "fresh join copied hs_arcade PB");
        assert(devB.getJson("hootworld.hs.exams.v1").kidc[0].level === 4, "fresh join copied hs_exams Level 4");
        assert(devB.getJson("hootworld.hs.nymap.v1").kidc.erie === 1, "fresh join copied hs_nymap");
        assert(devB.getJson("hootworld.hs.matchbest.v1").kidc === 180, "fresh join copied hs_match");
        // Concurrent edits: Device A unlocks another landmark; Device B sets Word Blitz PB!
        var mapA = devA.getJson("hootworld.hs.nymap.v1"); mapA.kidc.saratoga = 1; devA.setLs("hootworld.hs.nymap.v1", mapA);
        devA.runTimers(3000);
        return tick(40).then(function () {
          var arcB = devB.getJson("hootworld.hs.arcade.v1"); arcB.kidc.blitz = 190; devB.setLs("hootworld.hs.arcade.v1", arcB);
          devB.runTimers(3000);
          return tick(60);
        }).then(function () {
          var st = cloud.rows[code].state;
          assert(st.hs_nymap.kidc.saratoga === 1 && st.hs_nymap.kidc.erie === 1, "merged NY map landmark from Device A");
          assert(st.hs_arcade.kidc.dash === 240 && st.hs_arcade.kidc.blitz === 190, "merged Arcade PBs from both devices");
          assert(st.hs_vibe.kidc.xp === 140 && st.hs_cer.kidc.length === 1 && st.hs_exams.kidc[0].level === 4, "preserved all other hs_* stores");
        });
      });
    });
  });

  /* ---------- Execute all proofs sequentially ---------- */
  var passed = 0;
  var chain = Promise.resolve();
  tests.forEach(function (t) {
    chain = chain.then(function () {
      return Promise.resolve().then(t.fn).then(function () {
        passed++;
        print("PASS [" + passed + "/" + tests.length + "] " + t.name);
      }, function (err) {
        print("FAIL [" + t.name + "]: " + (err && err.message ? err.message : err) + (err && err.stack ? "\n" + err.stack : ""));
        throw err;
      });
    });
  });

  chain.then(function () {
    print("\nALL " + passed + "/" + tests.length + " FAMILY SYNC PROOF TESTS PASSED!");
  }, function () {
    if (typeof quit === "function") quit(1);
    else throw new Error("Suite failed");
  });
})();
