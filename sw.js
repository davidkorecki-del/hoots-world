const C='hw-hootv2-wave5-media';
const PRECACHE=[
  'assets/lesson-art/creator-budget-the-project.svg',
  'assets/lesson-art/creator-debug-change-one-thing.svg',
  'assets/lesson-art/creator-make-a-claim-bring-evidence.svg',
  'assets/lesson-art/creator-percentages-parts-of-100.svg',
  'assets/lesson-art/creator-present-hook-build-land.svg',
  'assets/lesson-art/creator-ratios-scale-both-sides.svg',
  'assets/lesson-art/creator-research-you-can-trust.svg',
  'assets/lesson-art/creator-the-design-loop-test-fix-retest.svg',
  'assets/lesson-art/early-answer-questions-about-a-story.svg',
  'assets/lesson-art/early-blend-sounds-into-words.svg',
  'assets/lesson-art/early-counting-on-to-add.svg',
  'assets/lesson-art/early-letter-sounds.svg',
  'assets/lesson-art/early-read-a-line-and-understand-it.svg',
  'assets/lesson-art/early-rhyming-words.svg',
  'assets/lesson-art/early-taking-away.svg',
  'assets/lesson-art/early-tens-and-ones.svg',
  'assets/lesson-art/hl-body-more.svg',
  'assets/lesson-art/hl-colors-all.svg',
  'assets/lesson-art/hl-colors-new.svg',
  'assets/lesson-art/hl-dots-count.svg',
  'assets/lesson-art/hl-letter-a.svg',
  'assets/lesson-art/hl-letter-b.svg',
  'assets/lesson-art/hl-letter-c.svg',
  'assets/lesson-art/hl-letter-d.svg',
  'assets/lesson-art/hl-letter-e.svg',
  'assets/lesson-art/hl-letter-f.svg',
  'assets/lesson-art/hl-letter-g.svg',
  'assets/lesson-art/hl-letter-h.svg',
  'assets/lesson-art/hl-letter-i.svg',
  'assets/lesson-art/hl-letter-j.svg',
  'assets/lesson-art/hl-letter-k.svg',
  'assets/lesson-art/hl-letter-l.svg',
  'assets/lesson-art/hl-letter-m.svg',
  'assets/lesson-art/hl-letter-n.svg',
  'assets/lesson-art/hl-letter-o.svg',
  'assets/lesson-art/hl-letter-p.svg',
  'assets/lesson-art/hl-letter-q.svg',
  'assets/lesson-art/hl-letter-r.svg',
  'assets/lesson-art/hl-letter-s.svg',
  'assets/lesson-art/hl-letter-t.svg',
  'assets/lesson-art/hl-letter-u.svg',
  'assets/lesson-art/hl-letter-v.svg',
  'assets/lesson-art/hl-letter-w.svg',
  'assets/lesson-art/hl-letter-x.svg',
  'assets/lesson-art/hl-letter-y.svg',
  'assets/lesson-art/hl-letter-z.svg',
  'assets/lesson-art/hl-more-less.svg',
  'assets/lesson-art/hl-numbers-1-5.svg',
  'assets/lesson-art/hl-numbers-6-10.svg',
  'assets/lesson-art/hl-pos-in-on-under.svg',
  'assets/lesson-art/hl-same-different.svg',
  'assets/lesson-art/hl-shapes-all.svg',
  'assets/lesson-art/hl-shapes-new.svg',
  'assets/lesson-art/hl-world-helpers.svg',
  'assets/lesson-art/hl-world-home.svg',
  'assets/lesson-art/little-animal-sounds.svg',
  'assets/lesson-art/little-big-and-small.svg',
  'assets/lesson-art/little-colour-names.svg',
  'assets/lesson-art/little-counting-back-from-5.svg',
  'assets/lesson-art/little-counting-to-10.svg',
  'assets/lesson-art/little-counting-to-5.svg',
  'assets/lesson-art/little-feelings-faces.svg',
  'assets/lesson-art/little-first-letter-sounds.svg',
  'assets/lesson-art/little-more-colours-green-orange-purple.svg',
  'assets/lesson-art/little-more-letter-sounds.svg',
  'assets/lesson-art/little-my-body-eyes-ears-nose.svg',
  'assets/lesson-art/little-patterns-what-comes-next.svg',
  'assets/lesson-art/little-shape-names.svg',
  'assets/lesson-art/little-sorting-things-that-go-together.svg',
  'assets/lesson-art/little-star-and-heart-shapes.svg',
  'assets/lesson-art/little-up-and-down.svg',
  'assets/lesson-art/ny-argument-writing-claim-evidence-reasoning.svg',
  'assets/lesson-art/ny-ecosystems-the-hudson-river-food-web.svg',
  'assets/lesson-art/ny-from-the-articles-to-the-constitution.svg',
  'assets/lesson-art/ny-main-idea-citing-evidence.svg',
  'assets/lesson-art/ny-negative-numbers-on-the-number-line.svg',
  'assets/lesson-art/ny-photosynthesis-matter-energy-in-plants.svg',
  'assets/lesson-art/ny-two-step-equations-unwrap-x.svg',
  'assets/lesson-art/ny-unit-rates-the-price-of-one.svg',
  'assets/lesson-art/quest-area-length-width.svg',
  'assets/lesson-art/quest-coding-order-matters.svg',
  'assets/lesson-art/quest-division-is-sharing-equally.svg',
  'assets/lesson-art/quest-find-the-main-idea.svg',
  'assets/lesson-art/quest-fractions-equal-parts.svg',
  'assets/lesson-art/quest-how-plants-make-food.svg',
  'assets/lesson-art/quest-times-tables-are-groups.svg',
  'assets/lesson-art/quest-topic-sentences.svg',
  'assets/lesson-art/teen-algebra-ii-keep-the-balance.svg',
  'assets/lesson-art/teen-algebra-ii-two-step-equations.svg',
  'assets/lesson-art/teen-biology-dna-to-protein.svg',
  'assets/lesson-art/teen-biology-where-energy-comes-from.svg',
  'assets/lesson-art/teen-history-a-thesis-is-a-claim.svg',
  'assets/lesson-art/teen-history-primary-vs-secondary-sources.svg',
  'assets/lesson-art/teen-spanish-ii-ar-verb-endings.svg',
  'assets/lesson-art/teen-study-science-test-don-t-re-read.svg',
  'assets/voice/fish-teach-e.mp3',
  'assets/voice/coach/animals-idle.mp3',
  'assets/voice/coach/animals-intro.mp3',
  'assets/voice/coach/animals-praise.mp3',
  'assets/voice/coach/animals-wrong.mp3',
  'assets/voice/coach/balloon-idle.mp3',
  'assets/voice/coach/balloon-intro.mp3',
  'assets/voice/coach/balloon-praise.mp3',
  'assets/voice/coach/balloon-wrong.mp3',
  'assets/voice/coach/band-idle.mp3',
  'assets/voice/coach/band-intro.mp3',
  'assets/voice/coach/band-praise.mp3',
  'assets/voice/coach/band-wrong.mp3',
  'assets/voice/coach/bubblepop-idle.mp3',
  'assets/voice/coach/bubblepop-intro.mp3',
  'assets/voice/coach/bubblepop-praise.mp3',
  'assets/voice/coach/bubblepop-wrong.mp3',
  'assets/voice/coach/dance-idle.mp3',
  'assets/voice/coach/dance-intro.mp3',
  'assets/voice/coach/dance-praise.mp3',
  'assets/voice/coach/dance-wrong.mp3',
  'assets/voice/coach/dress-idle.mp3',
  'assets/voice/coach/dress-intro.mp3',
  'assets/voice/coach/dress-praise.mp3',
  'assets/voice/coach/dress-wrong.mp3',
  'assets/voice/coach/feed-idle.mp3',
  'assets/voice/coach/feed-intro.mp3',
  'assets/voice/coach/feed-praise.mp3',
  'assets/voice/coach/feed-wrong.mp3',
  'assets/voice/coach/find-idle.mp3',
  'assets/voice/coach/find-intro.mp3',
  'assets/voice/coach/find-praise.mp3',
  'assets/voice/coach/find-wrong.mp3',
  'assets/voice/coach/fishing-idle.mp3',
  'assets/voice/coach/fishing-intro.mp3',
  'assets/voice/coach/fishing-praise.mp3',
  'assets/voice/coach/fishing-wrong.mp3',
  'assets/voice/coach/friends-idle.mp3',
  'assets/voice/coach/friends-intro.mp3',
  'assets/voice/coach/friends-praise.mp3',
  'assets/voice/coach/friends-wrong.mp3',
  'assets/voice/coach/magic-idle.mp3',
  'assets/voice/coach/magic-intro.mp3',
  'assets/voice/coach/magic-praise.mp3',
  'assets/voice/coach/magic-wrong.mp3',
  'assets/voice/coach/memory-idle.mp3',
  'assets/voice/coach/memory-intro.mp3',
  'assets/voice/coach/memory-praise.mp3',
  'assets/voice/coach/memory-wrong.mp3',
  'assets/voice/coach/paint-idle.mp3',
  'assets/voice/coach/paint-intro.mp3',
  'assets/voice/coach/paint-praise.mp3',
  'assets/voice/coach/paint-wrong.mp3',
  'assets/voice/coach/peek-idle.mp3',
  'assets/voice/coach/peek-intro.mp3',
  'assets/voice/coach/peek-praise.mp3',
  'assets/voice/coach/peek-wrong.mp3',
  'assets/voice/coach/phonics-a.mp3',
  'assets/voice/coach/phonics-b.mp3',
  'assets/voice/coach/phonics-c.mp3',
  'assets/voice/coach/phonics-d.mp3',
  'assets/voice/coach/phonics-e.mp3',
  'assets/voice/coach/phonics-f.mp3',
  'assets/voice/coach/phonics-g.mp3',
  'assets/voice/coach/phonics-h.mp3',
  'assets/voice/coach/phonics-i.mp3',
  'assets/voice/coach/phonics-j.mp3',
  'assets/voice/coach/phonics-k.mp3',
  'assets/voice/coach/phonics-l.mp3',
  'assets/voice/coach/phonics-m.mp3',
  'assets/voice/coach/phonics-n.mp3',
  'assets/voice/coach/phonics-o.mp3',
  'assets/voice/coach/phonics-p.mp3',
  'assets/voice/coach/phonics-q.mp3',
  'assets/voice/coach/phonics-r.mp3',
  'assets/voice/coach/phonics-s.mp3',
  'assets/voice/coach/phonics-t.mp3',
  'assets/voice/coach/phonics-u.mp3',
  'assets/voice/coach/phonics-v.mp3',
  'assets/voice/coach/phonics-w.mp3',
  'assets/voice/coach/phonics-x.mp3',
  'assets/voice/coach/phonics-y.mp3',
  'assets/voice/coach/phonics-z.mp3',
  'assets/voice/coach/piano-idle.mp3',
  'assets/voice/coach/piano-intro.mp3',
  'assets/voice/coach/piano-praise.mp3',
  'assets/voice/coach/piano-wrong.mp3',
  'assets/voice/coach/real-idle.mp3',
  'assets/voice/coach/real-intro.mp3',
  'assets/voice/coach/real-praise.mp3',
  'assets/voice/coach/real-wrong.mp3',
  'assets/voice/coach/rocket-idle.mp3',
  'assets/voice/coach/rocket-intro.mp3',
  'assets/voice/coach/rocket-praise.mp3',
  'assets/voice/coach/rocket-wrong.mp3',
  'assets/voice/coach/shapes-idle.mp3',
  'assets/voice/coach/shapes-intro.mp3',
  'assets/voice/coach/shapes-praise.mp3',
  'assets/voice/coach/shapes-wrong.mp3',
  'assets/voice/coach/splash-idle.mp3',
  'assets/voice/coach/splash-intro.mp3',
  'assets/voice/coach/splash-praise.mp3',
  'assets/voice/coach/splash-wrong.mp3',
  'assets/voice/coach/twinkle-idle.mp3',
  'assets/voice/coach/twinkle-intro.mp3',
  'assets/voice/coach/twinkle-praise.mp3',
  'assets/voice/coach/twinkle-wrong.mp3'
];
/* Wave 3: strictly media-only cache (never HTML, CSS, or JS).
   Resilient batched precache (one failed file never aborts install) +
   bounded runtime media cache so iOS Safari CacheStorage stays healthy. */
var MAX_MEDIA = 260;
function isMediaUrl(u){
  return u.indexOf('/assets/voice/') !== -1
    || u.indexOf('/assets/lesson-art/') !== -1
    || u.indexOf('/assets/book-art/') !== -1
    || u.indexOf('/assets/thumbs/') !== -1;
}
function trimCache(c){
  return c.keys().then(function(keys){
    if(keys.length <= MAX_MEDIA) return;
    var extra = keys.slice(0, keys.length - MAX_MEDIA);
    return Promise.all(extra.map(function(k){ return c.delete(k); }));
  }).catch(function(){});
}
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(C).then(function(c){
    var i = 0, batch = 12;
    function next(){
      if(i >= PRECACHE.length) return Promise.resolve();
      var slice = PRECACHE.slice(i, i + batch); i += batch;
      return Promise.all(slice.map(function(u){ return c.add(u).catch(function(){}); })).then(next);
    }
    return next();
  }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k!==C; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;
  var u=e.request.url;
  if(!isMediaUrl(u)) return;
  e.respondWith(caches.open(C).then(function(c){
    return c.match(e.request).then(function(hit){
      if(hit) return hit;
      return fetch(e.request).then(function(res){
        if(res && res.ok){
          c.put(e.request, res.clone()).then(function(){ return trimCache(c); }).catch(function(){});
        }
        return res;
      });
    });
  }));
});
