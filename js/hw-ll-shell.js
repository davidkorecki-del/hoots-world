/* 3e53: game thumbnails inlined so the preview stays under the hosting file limit */
var HW_THUMBS = {
  splash: "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d4ed8"/><stop offset=".55" stop-color="#38bdf8"/><stop offset="1" stop-color="#fef08a"/></linearGradient></defs><rect width="320" height="320" rx="44" fill="url(#g)"/><circle cx="255" cy="70" r="36" fill="#ffd43b"/><path d="M30 245 Q160 190 290 245 L320 320 L0 320 Z" fill="#4ade80"/><rect x="55" y="195" width="52" height="44" rx="6" fill="#fff3bf" stroke="#17263b" stroke-width="5"/><polygon points="48,195 81,166 114,195" fill="#f03e3e" stroke="#17263b" stroke-width="5"/><circle cx="220" cy="222" r="20" fill="#fff" stroke="#17263b" stroke-width="4"/><circle cx="220" cy="194" r="14" fill="#fff" stroke="#17263b" stroke-width="4"/><path d="M55 78 a32 32 0 0 1 58 -12 a36 36 0 0 1 64 8 a28 28 0 0 1 12 52 H55 a26 26 0 0 1 0 -48 Z" fill="#312e81" stroke="#17263b" stroke-width="5"/><polygon points="122,122 98,166 120,166 106,204 148,154 124,154 140,122" fill="#ffd43b" stroke="#17263b" stroke-width="4"/></svg>'),
  shapes: "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><defs><linearGradient id="n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070b1e"/><stop offset=".6" stop-color="#1e1b4b"/><stop offset="1" stop-color="#3b0764"/></linearGradient></defs><rect width="320" height="320" rx="44" fill="url(#n)"/><g stroke="#ffd43b" stroke-width="5" stroke-linecap="round"><line x1="160" y1="44" x2="160" y2="18"/><line x1="160" y1="186" x2="160" y2="212"/><line x1="88" y1="115" x2="62" y2="115"/><line x1="232" y1="115" x2="258" y2="115"/><line x1="108" y1="64" x2="88" y2="44"/><line x1="212" y1="64" x2="232" y2="44"/><line x1="108" y1="166" x2="88" y2="186"/><line x1="212" y1="166" x2="232" y2="186"/></g><circle cx="160" cy="115" r="52" fill="none" stroke="#ff4d6d" stroke-width="6" stroke-dasharray="10 12"/><circle cx="160" cy="115" r="78" fill="none" stroke="#38bdf8" stroke-width="5" stroke-dasharray="8 14"/><circle cx="72" cy="70" r="6" fill="#ffd43b"/><circle cx="248" cy="76" r="7" fill="#ff7eb6"/><circle cx="80" cy="160" r="6" fill="#4ade80"/><circle cx="244" cy="156" r="6" fill="#38bdf8"/><text x="160" y="132" font-size="56" text-anchor="middle">🦁</text><rect x="0" y="256" width="320" height="64" fill="#0f172a"/></svg>'),
  real: "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><defs><linearGradient id="r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0284c7"/><stop offset="1" stop-color="#bae6fd"/></linearGradient></defs><rect width="320" height="320" rx="44" fill="url(#r)"/><rect x="0" y="220" width="320" height="100" fill="#334155"/><g stroke="#141e30" stroke-width="6" stroke-linejoin="round"><rect x="34" y="128" width="150" height="86" rx="14" fill="#ef4444"/><rect x="174" y="146" width="76" height="68" rx="14" fill="#dc2626"/><rect x="188" y="156" width="44" height="30" rx="6" fill="#bae6fd"/><rect x="46" y="106" width="118" height="16" rx="7" fill="#fde047"/><circle cx="192" cy="132" r="11" fill="#38bdf8"/><circle cx="86" cy="216" r="24" fill="#1e293b"/><circle cx="86" cy="216" r="10" fill="#fde047"/><circle cx="206" cy="216" r="24" fill="#1e293b"/><circle cx="206" cy="216" r="10" fill="#fde047"/><path d="M235 120 Q268 86 290 66" fill="none" stroke="#38bdf8" stroke-width="10" stroke-linecap="round"/></g></svg>'),
  rocket: "assets/rocket3d/thumb_rocket.jpg?v=llprev3e105",
  pizza: "assets/pizza_cartoon/thumb_pizza.jpg?v=llprev3e118",
  twinkle: "assets/twinkle3d/thumb_twinkle.jpg?v=llprev3e116"
}; /* Wave 3: thumbs load lazily from assets/thumbs/<key>.webp (-212 KB cold load) */
/* Hoot's World layout preview 2 — v63 shell routing + data-to-card mapping.
   Does not rewrite Muse game, tutor, or lesson internals. */
(function () {
  "use strict";

  var TABS = [
    { id: "today", label: "Today", icon: "☀️" },
    { id: "games", label: "Hoot's Games", icon: "🦉" },
    { id: "learn", label: "Learn", icon: "🌱" },
    { id: "activities", label: "Activities", icon: "🧺" },
    { id: "reading", label: "Reading", icon: "📚" },
    { id: "memories", label: "Memories", icon: "📸" },
    { id: "days", label: "Days", icon: "🗓️" },
    { id: "grownups", label: "Grown-ups", icon: "🔒" }
  ];

  var PROFILES = [
    { id: "kida", label: "Profile A", age: "Ages 2–4", emoji: "🌟", color: "#C3185B", band: "little", hourGoal: 4 },
    { id: "kidb", label: "Profile B", age: "Ages 2–4", emoji: "🚀", color: "#3A56D4", band: "little", hourGoal: 4 },
    { id: "kidc", label: "Profile C", age: "Ages 11–13", emoji: "🎯", color: "#0A7E57", band: "teen", hourGoal: 4 }
  ];

  var GAMES = [
    { key: "balloon", title: "Balloon ABC Pop", cat: "Letters", emo: "🎈", color: "#E0457B" },
    { key: "dress", title: "Dress Up Friends", cat: "Pretend", emo: "👗", color: "#3A56D4" },
    { key: "real", title: "Town Rescue Patrol", cat: "Rescue", emo: "🚒", color: "#EF4444" },
    { key: "pizza", title: "Hoot's Pizza Shop", cat: "Kitchen", emo: "🍕", color: "#EA580C" },
    { key: "rocket", title: "3D Rocket Count-Up", cat: "3D Space", emo: "🚀", color: "#F5A623" },
    { key: "twinkle", title: "Catch the Twinkle Stars", cat: "Counting", emo: "⭐", color: "#E0457B" },
    { key: "magic", title: "Magic Hat Surprises", cat: "Surprise", emo: "🎩", color: "#3A56D4" },
    { key: "paint", title: "Finger Paint Studio", cat: "Art", emo: "🎨", color: "#0B8A5F" },
    { key: "dance", title: "Dance Party", cat: "Music", emo: "💃", color: "#F5A623" },
    { key: "animals", title: "Animal Homes", cat: "Nature", emo: "🏠", color: "#E0457B" },
    { key: "piano", title: "Rainbow Piano", cat: "Music", emo: "🎹", color: "#3A56D4" },
    { key: "splash", title: "Thunder Weather Machine", cat: "Weather", emo: "⛈️", color: "#0096C7" },
    { key: "shapes", title: "Fireworks Night", cat: "Fireworks", emo: "🎆", color: "#7209B7" },
    { key: "feed", title: "Feed Hoot", cat: "Play", emo: "😋", color: "#E0457B" },
    { key: "peek", title: "Peekaboo Forest", cat: "Play", emo: "🌳", color: "#3A56D4" },
    { key: "find", title: "Find It!", cat: "Looking", emo: "🔎", color: "#0B8A5F" },
    { key: "friends", title: "Animal Friends", cat: "Animals", emo: "🐾", color: "#F5A623" },
    { key: "memory", title: "Memory Match Meadow", cat: "Memory", emo: "🌸", color: "#E0457B" },
    { key: "bubblepop", title: "Bubble Number Pop", cat: "Numbers", emo: "🫧", color: "#3A56D4" },
    { key: "fishing", title: "Letter Fishing", cat: "Letters", emo: "🎣", color: "#0B8A5F" },
    { key: "band", title: "Copy the Beat", cat: "Music", emo: "🥁", color: "#F5A623" }
  ];

  var LESSONS = {
    little: [
      { id: "little-colour-names", title: "Colour names", emo: "🎨", tags: ["Colours", "Listen"], color: "#E0457B" , blurb: "Hoot names the colours — red, yellow, blue — then you tap the one Hoot calls." },
      { id: "little-shape-names", title: "Shape names", emo: "🔷", tags: ["Shapes"], color: "#3A56D4" , blurb: "Meet circle, square and triangle — hear each name, then tap the shape Hoot calls." },
      { id: "little-counting-to-5", title: "Counting to 5", emo: "✋", tags: ["Numbers"], color: "#0B8A5F" , blurb: "Count along with Hoot to 5, one tap for each thing." },
      { id: "little-first-letter-sounds", title: "First letter sounds", emo: "🔤", tags: ["Letters", "Phonics"], color: "#F5A623", reading: true , blurb: "The first sounds letters make — hear them, then find the letter Hoot calls." },
      { id: "little-big-and-small", title: "Big and small", emo: "🐘", tags: ["Size"], color: "#E0457B" , blurb: "Which one is BIG and which is small? Compare sizes and tap with Hoot." },
      { id: "little-counting-back-from-5", title: "Counting back from 5", emo: "5️⃣", tags: ["Numbers"], color: "#3A56D4" , blurb: "Count backwards from 5 to 0 — like a rocket countdown." },
      { id: "little-more-letter-sounds", title: "More letter sounds", emo: "🔡", tags: ["Letters"], color: "#0B8A5F", reading: true , blurb: "More letter sounds to hear and find — the next letters of the alphabet." },
      { id: "little-sorting-things-that-go-together", title: "Sorting: things that go together", emo: "🧩", tags: ["Sorting"], color: "#F5A623" , blurb: "Sort things into the groups they belong to." },
      { id: "little-counting-to-10", title: "Counting to 10", emo: "🔟", tags: ["Numbers"], color: "#E0457B" , blurb: "Count all the way to 10 with Hoot, one tap at a time." },
      { id: "little-more-colours-green-orange-purple", title: "More colours: green, orange, purple", emo: "🌈", tags: ["Colours"], color: "#3A56D4" , blurb: "Three new colours to name and spot: green, orange and purple." },
      { id: "little-animal-sounds", title: "Animal sounds", emo: "🐮", tags: ["Animals", "Listen"], color: "#0B8A5F", reading: true , blurb: "Hear the animal, say its sound, and find who makes it." },
      { id: "little-feelings-faces", title: "Feelings faces", emo: "😊", tags: ["Feelings"], color: "#F5A623" , blurb: "Happy, sad, surprised — name the feeling on each face." },
      { id: "little-up-and-down", title: "Up and down", emo: "↕️", tags: ["Words"], color: "#E0457B" , blurb: "Words for where things are: up, down, and more." },
      { id: "little-patterns-what-comes-next", title: "Patterns: what comes next?", emo: "⬛", tags: ["Patterns"], color: "#3A56D4" , blurb: "Apple, banana, apple... what comes next? Finish the pattern." },
      { id: "little-my-body-eyes-ears-nose", title: "My body: eyes, ears, nose", emo: "🙌", tags: ["Body"], color: "#0B8A5F" , blurb: "Point to eyes, ears and nose as Hoot calls them." },
      { id: "little-star-and-heart-shapes", title: "Star and heart shapes", emo: "⭐", tags: ["Shapes"], color: "#F5A623" , blurb: "Two special shapes to spot and name: the star and the heart." }
    ],
    early: [
      { id: "early-letter-sounds", title: "Letter sounds", emo: "🔤", tags: ["Phonics"], color: "#E0457B" , blurb: "Every letter's sound, then quick practice finding them." },
      { id: "early-blend-sounds-into-words", title: "Blend sounds into words", emo: "🪄", tags: ["Phonics"], color: "#3A56D4", reading: true , blurb: "Push sounds together — c-a-t becomes cat." },
      { id: "early-counting-on-to-add", title: "Counting on to add", emo: "➕", tags: ["Maths"], color: "#0B8A5F" , blurb: "Start from the bigger number and count on to add." },
      { id: "early-read-a-line-and-understand-it", title: "Read a line — and understand it", emo: "📖", tags: ["Reading"], color: "#F5A623", reading: true , blurb: "Read a short line, then answer what it was about." },
      { id: "early-rhyming-words", title: "Rhyming words", emo: "🎵", tags: ["Reading"], color: "#E0457B", reading: true , blurb: "Rhyming words end with the same sound — find the rhyming pair." },
      { id: "early-taking-away", title: "Taking away", emo: "➖", tags: ["Maths"], color: "#3A56D4" , blurb: "Taking away makes less — count what is left." },
      { id: "early-tens-and-ones", title: "Tens and ones", emo: "🔟", tags: ["Maths"], color: "#0B8A5F" , blurb: "What the digits mean: tens and ones in two-digit numbers." },
      { id: "early-answer-questions-about-a-story", title: "Answer questions about a story", emo: "❓", tags: ["Reading"], color: "#F5A623", reading: true , blurb: "Read a tiny story, then answer questions about it." }
    ],
    quest: [
      { id: "quest-times-tables-are-groups", title: "Times tables are groups", emo: "✖️", tags: ["Maths"], color: "#E0457B" , blurb: "Times tables are just equal groups — see it, then use it." },
      { id: "quest-fractions-equal-parts", title: "Fractions: equal parts", emo: "🍕", tags: ["Maths"], color: "#3A56D4" , blurb: "Fractions are equal parts of a whole — halves, thirds, quarters." },
      { id: "quest-find-the-main-idea", title: "Find the main idea", emo: "💡", tags: ["Reading"], color: "#0B8A5F", reading: true , blurb: "What is the whole text mostly about? Find its main idea." },
      { id: "quest-coding-order-matters", title: "Coding: order matters", emo: "🤖", tags: ["Logic"], color: "#F5A623" , blurb: "Instructions run in order — one swap changes everything." },
      { id: "quest-division-is-sharing-equally", title: "Division is sharing equally", emo: "➗", tags: ["Maths"], color: "#E0457B" , blurb: "Division shares things equally — split, share, check." },
      { id: "quest-how-plants-make-food", title: "How plants make food", emo: "🌱", tags: ["Science"], color: "#3A56D4" , blurb: "How a leaf turns light, water and air into food." },
      { id: "quest-topic-sentences", title: "Topic sentences", emo: "🧾", tags: ["Writing"], color: "#0B8A5F", reading: true , blurb: "The one sentence that tells what a paragraph is about." },
      { id: "quest-area-length-width", title: "Area: length × width", emo: "📏", tags: ["Maths"], color: "#F5A623" , blurb: "Measure a rectangle's area: length times width." }
    ],
    teen: [
      { id: "teen-biology-where-energy-comes-from", title: "Biology: where energy comes from", emo: "🌿", tags: ["Science"], color: "#E0457B" , blurb: "Where the energy in food really comes from, cell by cell." },
      { id: "teen-algebra-ii-keep-the-balance", title: "Algebra II: keep the balance", emo: "𝑥", tags: ["Maths"], color: "#3A56D4" , blurb: "Keep both sides balanced while you isolate the variable." },
      { id: "teen-history-a-thesis-is-a-claim", title: "History: a thesis is a claim", emo: "📜", tags: ["History"], color: "#0B8A5F", reading: true , blurb: "A thesis is a claim you must defend with evidence." },
      { id: "teen-study-science-test-don-t-re-read", title: "Study science: test, don't re-read", emo: "📅", tags: ["Study"], color: "#F5A623" , blurb: "Study by testing yourself, not re-reading — and why it works." },
      { id: "teen-biology-dna-to-protein", title: "Biology: DNA to protein", emo: "🧬", tags: ["Science"], color: "#E0457B" , blurb: "From DNA code to a finished protein, step by step." },
      { id: "teen-algebra-ii-two-step-equations", title: "Algebra II: two-step equations", emo: "➗", tags: ["Maths"], color: "#3A56D4" , blurb: "Unwrap two-step equations in reverse order." },
      { id: "teen-history-primary-vs-secondary-sources", title: "History: primary vs secondary sources", emo: "🗂️", tags: ["History"], color: "#0B8A5F", reading: true , blurb: "Tell first-hand sources from later accounts — and why it matters." },
      { id: "teen-spanish-ii-ar-verb-endings", title: "Spanish II: -ar verb endings", emo: "🇪🇸", tags: ["Language"], color: "#F5A623" , blurb: "How -ar verbs change their endings for each person." }
    ],
    creator: [
      { id: "creator-ratios-scale-both-sides", title: "Ratios: scale both sides", emo: "⚖️", tags: ["Maths"], color: "#E0457B" , blurb: "Scale a ratio by changing both sides the same way." },
      { id: "creator-research-you-can-trust", title: "Research you can trust", emo: "🔍", tags: ["Research"], color: "#3A56D4", reading: true , blurb: "Judge a source before you trust it — a quick checklist." },
      { id: "creator-debug-change-one-thing", title: "Debug: change ONE thing", emo: "🐛", tags: ["Logic"], color: "#0B8A5F" , blurb: "Fix code the calm way: change one thing, test, repeat." },
      { id: "creator-present-hook-build-land", title: "Present: hook, build, land", emo: "🎤", tags: ["Speak"], color: "#F5A623" , blurb: "Structure a talk: hook them, build it, land the ending." },
      { id: "creator-percentages-parts-of-100", title: "Percentages: parts of 100", emo: "%", tags: ["Maths"], color: "#E0457B" , blurb: "Percentages are parts of 100 — find them fast." },
      { id: "creator-the-design-loop-test-fix-retest", title: "The design loop: test, fix, retest", emo: "🔁", tags: ["Design"], color: "#3A56D4" , blurb: "Make it, test it, fix it, test again — the design loop." },
      { id: "creator-make-a-claim-bring-evidence", title: "Make a claim — bring evidence", emo: "💬", tags: ["Writing"], color: "#0B8A5F", reading: true , blurb: "State a claim and back it with real evidence." },
      { id: "creator-budget-the-project", title: "Budget the project", emo: "🧁", tags: ["Maths"], color: "#F5A623" , blurb: "Plan a project's money: costs, totals, and what is left." }
    ],
    ny: [
      { id: "ny-main-idea-citing-evidence", title: "Main idea & citing evidence", emo: "📌", tags: ["ELA", "Reading"], color: "#E0457B", reading: true , blurb: "Find the main idea, then prove it with a sentence from the text." },
      { id: "ny-argument-writing-claim-evidence-reasoning", title: "Argument writing: claim, evidence, reasoning", emo: "🗣️", tags: ["ELA", "Writing"], color: "#3A56D4", reading: true , blurb: "Build an argument: a claim, checkable evidence, and reasoning that connects them." },
      { id: "ny-unit-rates-the-price-of-one", title: "Unit rates: the price of ONE", emo: "📊", tags: ["Maths"], color: "#0B8A5F" , blurb: "Find what ONE costs by dividing — then scale up." },
      { id: "ny-negative-numbers-on-the-number-line", title: "Negative numbers on the number line", emo: "➖", tags: ["Maths"], color: "#F5A623" , blurb: "Walk the number line with negatives — adding, subtracting, flipping signs." },
      { id: "ny-two-step-equations-unwrap-x", title: "Two-step equations: unwrap x", emo: "𝑥", tags: ["Maths"], color: "#E0457B" , blurb: "Unwrap x in reverse order, keeping both sides balanced." },
      { id: "ny-photosynthesis-matter-energy-in-plants", title: "Photosynthesis: matter & energy in plants", emo: "🌱", tags: ["Science"], color: "#3A56D4" , blurb: "What a plant takes in, what it builds, and what it releases." },
      { id: "ny-ecosystems-the-hudson-river-food-web", title: "Ecosystems: the Hudson River food web", emo: "🐟", tags: ["Science"], color: "#0B8A5F" , blurb: "Who eats whom in the Hudson — and what changes when one species goes." },
      { id: "ny-from-the-articles-to-the-constitution", title: "From the Articles to the Constitution", emo: "🗽", tags: ["Social studies"], color: "#F5A623", reading: true , blurb: "Why the Articles failed, and how the Constitution rebalanced power." },
      { id: "ny-percents-tax-tip-and-discounts", title: "Percents: tax, tip & discounts", emo: "💵", tags: ["Maths"], color: "#0B8A5F" , blurb: "The 1% stepping stone: build any percent — tax, tips and discounts." },
      { id: "ny-circles-area-and-circumference", title: "Circles: around & inside", emo: "⭕", tags: ["Maths"], color: "#3A56D4" , blurb: "Circumference and area — one special number, pi, does both jobs." },
      { id: "ny-summarizing-just-the-facts", title: "Summarizing: just the facts", emo: "📝", tags: ["ELA", "Reading"], color: "#E0457B", reading: true , blurb: "Shrink a whole text to its key points with the five-finger trick." },
      { id: "ny-context-clues-and-word-roots", title: "Context clues & word roots", emo: "🔍", tags: ["ELA", "Reading"], color: "#F5A623", reading: true , blurb: "Crack unknown words with the clues around them and their roots." },
      { id: "ny-the-water-cycle", title: "The water cycle", emo: "💧", tags: ["Science"], color: "#3A56D4" , blurb: "One drop's whole loop: evaporate, condense, precipitate, collect." },
      { id: "ny-cells-the-building-blocks-of-life", title: "Cells: building blocks of life", emo: "🦠", tags: ["Science"], color: "#0B8A5F" , blurb: "The parts of a cell and what each one does — plus plant extras." },
      { id: "ny-the-american-revolution", title: "The American Revolution", emo: "🔔", tags: ["Social studies"], color: "#E0457B", reading: true , blurb: "Taxes with no say, a declaration, a war — how a new country was born." },
      { id: "ny-the-erie-canal-and-a-growing-new-york", title: "The Erie Canal & a growing New York", emo: "🚢", tags: ["Social studies"], color: "#F5A623", reading: true , blurb: "A water highway across New York that changed what everything cost." }
    ]
  };

  /* Stable lesson IDs (Fix 11 port): each LESSONS entry carries an id
     that is also stamped on its hub lesson card as data-lsn-id in
     index.html. The id - never the display title - is the binding:
     titles can be renamed and lists reordered without breaking an open
     route. Title matching (findLessonNode) survives only as a fallback. */
  var LESSON_BY_ID = {};
  var LESSON_BY_TITLE = {};
  Object.keys(LESSONS).forEach(function (k) {
    LESSONS[k].forEach(function (l) {
      if (l.id && !LESSON_BY_ID[l.id]) LESSON_BY_ID[l.id] = { path: k, lesson: l };
      if (!LESSON_BY_TITLE[l.title]) LESSON_BY_TITLE[l.title] = l;
    });
  });
  function lessonIdForTitle(title) {
    var l = LESSON_BY_TITLE[title];
    return l && l.id ? l.id : null;
  }

  var TODAY_PLAN = {
    little: [
      { kind: "lesson", title: "Colour names", emo: "🎨", tags: ["Colours", "Listen"], color: "#E0457B", blurb: "Hoot's pick for today — name red, yellow and blue with the owl tutor." },
      { kind: "game", title: "Thunder Weather Machine", key: "splash", emo: "⛈️", tags: ["Game", "Weather"], color: "#0096C7", blurb: "Pull levers to make thunder storms, snow, kites and rainbow sunshine!" },
      { kind: "shelf", title: "Colour Bead Sorting", emo: "📿", tags: ["Work shelf", "Colours"], color: "#0B8A5F", blurb: "A quiet shelf work: sort beads by colour." },
      { kind: "outdoor", title: "Leaf Hunt Walk", emo: "🍃", tags: ["Outdoor", "Nature"], color: "#F5A623", blurb: "An Indoor / Outdoor adventure: collect three different leaves." }
    ],
    teen: [
      { kind: "lesson", title: "Main idea & citing evidence", emo: "📌", tags: ["ELA", "Reading"], color: "#E0457B", blurb: "Tutor's pick for today — find the main idea and cite evidence." },
      { kind: "lesson", title: "Unit rates: the price of ONE", emo: "📊", tags: ["Maths"], color: "#3A56D4", blurb: "Find the price of one, then scale it." },
      { kind: "lesson", title: "Photosynthesis: matter & energy in plants", emo: "🌱", tags: ["Science"], color: "#0B8A5F", blurb: "How plants make food from light, water and air." },
      { kind: "lesson", title: "Ratios: scale both sides", emo: "⚖️", tags: ["Maths"], color: "#F5A623", blurb: "Scale a recipe up and down — keep both sides in step." }
    ]
  };

  var IDEA_POOL = {
    little: [
      { kind: "lesson", title: "Counting to 5", emo: "✋", tags: ["Numbers"], color: "#0B8A5F", blurb: "A fresh idea: count five things together." },
      { kind: "game", title: "Balloon ABC Pop", key: "balloon", emo: "🎈", tags: ["Game", "Letters"], color: "#E0457B", blurb: "Pop the letter balloons." },
      { kind: "outdoor", title: "Tallest Tower", emo: "🏗️", tags: ["Indoor", "Build"], color: "#3A56D4", blurb: "Build the tallest tower you can with blocks." },
      { kind: "shelf", title: "Pink Tower stacking", emo: "🟪", tags: ["Work shelf"], color: "#F5A623", blurb: "A classic shelf work: stack largest to smallest." }
    ],
    teen: [
      { kind: "lesson", title: "Argument writing: claim, evidence, reasoning", emo: "🗣️", tags: ["ELA"], color: "#E0457B", blurb: "A fresh idea: draft a short argument." },
      { kind: "lesson", title: "Negative numbers on the number line", emo: "➖", tags: ["Maths"], color: "#3A56D4", blurb: "Place a negative number on the line." },
      { kind: "lesson", title: "Research you can trust", emo: "🔍", tags: ["Research"], color: "#0B8A5F", blurb: "Check a source before you believe it." },
      { kind: "lesson", title: "Make a claim — bring evidence", emo: "💬", tags: ["Writing"], color: "#F5A623", blurb: "Back up a claim with evidence and reasoning." }
    ]
  };

  /* 3e21: each child has their own settings — birth month, state and mode
     (homeschool / attends school / extra practice). The age group comes from
     the birth month, so a child moves up on their own; a grown-up can pin it.
     Saved on this device only (staging never writes family data elsewhere). */
  var BAND_FOR = { kida: "little", kidb: "little", kidc: "teen" }; /* defaults until a birth month is set */
  var KIDS_KEY = "hootworld.children.v1";
  var CHILD_DEFAULTS = {
    kida: { state: "Connecticut", mode: "homeschool" },
    kidb: { state: "Connecticut", mode: "homeschool" },
    kidc: { state: "New York", mode: "school" }
  };
  var BANDS = [
    { id: "little", label: "Ages 2–4 · Little Explorers", min: 0 },
    { id: "early", label: "Ages 5–7 · Early Readers", min: 5 },
    { id: "quest", label: "Ages 8–10 · Quest Kids", min: 8 },
    { id: "teen", label: "Ages 11–13", min: 11 },
    { id: "high", label: "Ages 14–18 · High school", min: 14 }
  ];
  var MODES = { homeschool: "Homeschool", school: "Goes to school — Hoot helps with class", extra: "Extra practice" };
  var kidStore = {};
  try { kidStore = JSON.parse(localStorage.getItem(KIDS_KEY) || "{}") || {}; } catch (e) { kidStore = {}; }
  function saveKids() { try { localStorage.setItem(KIDS_KEY, JSON.stringify(kidStore)); } catch (e) {} }
  /* 3e34: each child's first name (Hoot greets them by name). A grown-up sets
     it under Each child; saved on this device only. 3e56: no names in the code:
     until a name is set the cards show Profile A / Profile B. */
  var DEFAULT_NAMES = {};
  function applyNames() {
    PROFILES.forEach(function (p) {
      if (!p.baseLabel) p.baseLabel = p.label;
      var n = ((kidStore[p.id] && kidStore[p.id].name) || DEFAULT_NAMES[p.id] || p.baseLabel).trim() || p.baseLabel;
      p.label = n;
      /* The name <b> is a direct child on the A/B gate cards but sits inside
         .prof-card-main on the C card, so the old "> b" selector silently
         skipped C (Dawid 2026-11-19: welcome screen said "Profile C" while
         the in-app pills said Kaitlyn). Paint the first <b> in each card. */
      Array.prototype.forEach.call(document.querySelectorAll(".prof-card-" + p.id), function (card) { var b = card.querySelector("b"); if (b) b.textContent = n; });
      Array.prototype.forEach.call(document.querySelectorAll(".prof-card-" + p.id + " .prof-play"), function (b) { b.textContent = "▶ Play as " + n; });
      /* Same name on the Grown-ups profile rows. */
      Array.prototype.forEach.call(document.querySelectorAll("[data-profile-row=\"" + p.id + "\"]"), function (row) {
        var rb = row.querySelector(".prof-row-main > b"); if (rb) rb.textContent = n;
        var btn = row.querySelector("[data-profile-pick]"); if (btn) btn.textContent = "▶ Play as " + n;
      });
    });
  }
  applyNames();
  function childCfg(id) {
    var d = CHILD_DEFAULTS[id] || CHILD_DEFAULTS.kida, s = kidStore[id] || {};
    return { state: s.state || d.state, mode: s.mode || d.mode, birth: s.birth || "", pin: s.pin || "auto" };
  }
  function ageFrom(birth) {
    var m = /^(\d{4})-(\d{2})$/.exec(birth || "");
    if (!m) return null;
    var now = new Date(), a = now.getFullYear() - (+m[1]);
    if (now.getMonth() + 1 < +m[2]) a--;
    return a >= 0 && a < 25 ? a : null;
  }
  function bandForAge(a) { var b = "little"; BANDS.forEach(function (x) { if (a >= x.min) b = x.id; }); return b; }
  function bandOf(id) {
    var c = childCfg(id);
    if (c.pin && c.pin !== "auto") return c.pin;
    var a = ageFrom(c.birth);
    return a == null ? (BAND_FOR[id] || "little") : bandForAge(a);
  }
  function curBand() { return state.profile ? bandOf(state.profile.id) : "little"; }
  function bandLabel(b) { var l = ""; BANDS.forEach(function (x) { if (x.id === b) l = x.label; }); return l; }
  /* games are for the little ones only (2–7); older kids are learning-focused */
  function hasGames() { var b = curBand(); return b === "little" || b === "early"; }
  /* the calm study look is for 11+ */
  function isTeenBand(b) { return b === "teen" || b === "high"; }
  function pathsFor(id) {
    var b = bandOf(id), st = childCfg(id).state;
    if (b === "teen") {
      var cnt = function (id, n) { return HL() && HL().paths[id] ? HL().paths[id].lessons.length : n; };
      var m7 = { id: "math7", title: "Grade 7 math · full course", count: cnt("math7", 20), emo: "📐" };
      var e7 = { id: "ela7", title: "Grade 7 English · full course", count: cnt("ela7", 13), emo: "📚" };
      var s7 = { id: "sci7", title: "Grade 7 science · full course", count: cnt("sci7", 12), emo: "🔬" };
      var ss7 = { id: "ss7", title: "Grade 7 social studies · full course", count: cnt("ss7", 9), emo: "🗽" };
      return st === "New York"
        ? [{ id: "ny", title: "Grade 7 · NY standards", count: 16, emo: "🗽" }, m7, e7, s7, ss7, { id: "creator", title: "Creator skills · ages 11–13", count: 8, emo: "✨" }]
        : [m7, e7, s7, ss7, { id: "creator", title: "Creator skills · ages 11–13", count: 8, emo: "✨" }];
    }
    return LEARN_PATHS[b] || LEARN_PATHS.little;
  }
  function applyChildState(id) {
    var want = childCfg(id).state;
    var sel = document.querySelector(".state-select");
    if (sel && sel.value !== want && typeof window.__hootSetState === "function") {
      try { window.__hootSetState(want); } catch (e) {}
    }
    if (typeof window.__hootSyncNyState === "function") { try { window.__hootSyncNyState(); } catch (e) {} }
  }
  /* 3e19: the teen band gets its own look and words (body.ll-teen), not the
     preschool shell with harder text dropped in. */
  window.__llState = function () { return state.profile ? state.profile.id : null; };
  function HL() { return window.HootLessons || null; }
  function lessonDone(title) {
    var h = HL();
    if (h && h.byTitle(title) && h.isDone(title, state.profile && state.profile.id)) return true; /* 3e45: a card finished before it moved to the new engine stays finished */
    var node = findLessonNode(title);
    return !!(node && node.classList && node.classList.contains("done"));
  }
  /* LESSONS entries for engine paths, so Today / Practice / Reading see them */
  function hlLessons(pathId) {
    var h = HL(); if (!h || !h.paths[pathId]) return [];
    return h.paths[pathId].lessons.map(function (id) { var l = h.byId[id]; return { title: l.title, emo: l.emo, tags: [pathId === "letters" ? "Letters" : pathId === "world" ? "My world" : pathId === "math7" ? "Math " + (l.std || "") : pathId === "ela7" ? "English " + (l.std || "") : pathId === "sci7" ? "Science " + (l.std || "") : pathId === "ss7" ? "Social studies " + (l.std || "") : "Basics"], color: l.color, hl: true, reading: pathId === "letters" }; });
  }
  /* 3e23: letter of the WEEK — the same letter all week (little ones learn by
     repetition); the stone counts as done once it's been played today. A new
     week moves on to the next letter not learned yet. */
  var LOTW_KEY = "hootworld.lotw.v1";
  function weekKey(at) {
    var d = at ? new Date(at) : new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    var w1 = new Date(d.getFullYear(), 0, 4);
    return d.getFullYear() + "-W" + (1 + Math.round(((d - w1) / 864e5 - 3 + ((w1.getDay() + 6) % 7)) / 7));
  }
  function letterOfWeek() {
    var kid = state.profile && state.profile.id; if (!kid || !HL()) return null;
    var store = {}; try { store = JSON.parse(localStorage.getItem(LOTW_KEY) || "{}") || {}; } catch (e) {}
    var wk = weekKey(), cur = store[kid];
    var list = hlLessons("letters");
    if (!cur || cur.week !== wk) {
      /* 3e42: a new week ALWAYS moves on to the next letter (skipping ones
         already learned), even if last week's lesson wasn't finished. Before,
         a child who played games but skipped the lesson stayed on A forever. */
      var at = cur ? list.map(function (l) { return l.title; }).indexOf(cur.title) : -1, nxt = null;
      for (var s = 1; s <= list.length && !nxt; s++) { var c = list[(at + s + list.length) % list.length]; if (!lessonDone(c.title)) nxt = c; }
      if (!nxt) nxt = list[(at + 1 + list.length) % list.length] || list[0];
      cur = { week: wk, title: nxt.title };
      store[kid] = cur;
      try { localStorage.setItem(LOTW_KEY, JSON.stringify(store)); } catch (e) {}
    }
    return list.filter(function (l) { return l.title === cur.title; })[0] || null;
  }
  window.__llLetterOfWeek = function () { var lw = letterOfWeek(); return lw ? lw.title.slice(-1).toLowerCase() : "a"; };
  /* the grown-up can choose this week's letter in the planner */
  function setLetterOfWeek(kid, letter) {
    var store = {}; try { store = JSON.parse(localStorage.getItem(LOTW_KEY) || "{}") || {}; } catch (e) {}
    store[kid] = { week: weekKey(), title: "Letter " + String(letter).toUpperCase(), picked: true };
    try { localStorage.setItem(LOTW_KEY, JSON.stringify(store)); } catch (e) {}
  }
  window.__llLettersLearned = function () { return hlLessons("letters").filter(function (l) { return lessonDone(l.title); }).map(function (l) { return l.title.slice(-1).toLowerCase(); }); };
  function playedToday(title) {
    var h = HL(), l = h && h.byTitle(title); if (!l) return false;
    var r = h.results(state.profile.id)[l.id]; if (!r || !r.last) return false;
    var d0 = new Date(); d0.setHours(0, 0, 0, 0);
    return r.last >= d0.getTime();
  }
  /* ===== 3e24: per-child activity log (device only) ===== */
  var LOG_KEY = "hootworld.log.v1";
  function logLoad() { try { return JSON.parse(localStorage.getItem(LOG_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function logAdd(kid, ev) {
    if (!kid) return;
    var d = logLoad(); d[kid] = d[kid] || [];
    ev.t = ev.t || Date.now();
    var last = d[kid][d[kid].length - 1];
    if (last && last.type === ev.type && last.title === ev.title && ev.t - last.t < 60000) return; /* same thing twice in a minute */
    d[kid].push(ev);
    if (d[kid].length > 600) d[kid] = d[kid].slice(-600);
    try { localStorage.setItem(LOG_KEY, JSON.stringify(d)); } catch (e) {}
  }
  document.addEventListener("hoot-lesson-done", function (e) {
    var x = e.detail || {}; logAdd(x.kid, { type: "lesson", title: x.title, wrong: x.wrong, rounds: x.rounds, ms: x.ms, mastered: x.mastered });
    recordCompletion(x.kid, x.title); /* Wave C1: Then & Now history */
  });
  /* Muse-engine lessons (Little Explorers, NY, Creator…): log when the open lesson turns done */
  function watchMuseDone() {
    if (!window.MutationObserver) return;
    var wcTutorWasOpen = false, wcSess = 0;
    var mo = new MutationObserver(function (list) {
      var tutorOpen = document.body.classList.contains("ll-tutor-open");
      if (tutorOpen && !wcTutorWasOpen) wcSess++;
      wcTutorWasOpen = tutorOpen;
      if (!tutorOpen) return;
      /* Wave C1: replay finishes are invisible to the .done watch (a generic
         card keeps .done forever), but the engine's own finish class
         .lsn-finished is removed by Play again / teach mode and re-added by
         its onRight on EVERY genuine finish. Arm a card when it is seen
         without the class in this overlay session; count when it gains it.
         The build-time restore add is never armed, so merely opening an
         already-done lesson counts nothing. recordCompletion's own guard
         dedupes the fresh-card case where .done fires in the same moment. */
      var fcards = document.querySelectorAll("#ll-obody .lsn, #ll-obody .ny-lsn");
      for (var ci = 0; ci < fcards.length; ci++) {
        var fc = fcards[ci];
        if (fc.hasAttribute("data-hl-moved")) continue;
        if (!fc.classList.contains("lsn-finished")) { fc._wcArm = wcSess; continue; }
        if (fc._wcArm === wcSess && state.profile) {
          fc._wcArm = -1;
          var fh = fc.querySelector("h4");
          if (fh) recordCompletion(state.profile.id, fh.textContent.trim());
        }
      }
      /* Wave C1: the generic teach-back family never touches lsn-finished —
         its replay contract is the _again flag: startTeach / Play again set
         it true for the fresh run, and every completion branch (plain,
         teach-back, rounds) sets it false in the same moment it completes.
         Mark cards seen replaying this session; count the true→false flip
         on a done card. Fresh cards never arm (their .done transition is
         counted by the watcher below), and recordCompletion's guard
         dedupes any overlap with the lsn-finished signal. */
      for (var ri = 0; ri < fcards.length; ri++) {
        var rc = fcards[ri];
        if (rc.hasAttribute("data-hl-moved")) continue;
        if (rc._again === true) { rc._wcReplay = wcSess; continue; }
        if (rc._again === false && rc._wcReplay === wcSess && rc.classList.contains("done") && state.profile) {
          rc._wcReplay = -1;
          var rh = rc.querySelector("h4");
          if (rh) recordCompletion(state.profile.id, rh.textContent.trim());
        }
      }
      list.forEach(function (m) {
        var el = m.target;
        if (!el.classList || !el.classList.contains("done") || (m.oldValue || "").indexOf("done") !== -1) return;
        if (!el.matches(".lsn, .ny-lsn") || !el.closest("#ll-obody")) return;
        if (el.hasAttribute("data-hl-moved")) return; /* 3e49: already logged by the new lesson engine */
        var h = el.querySelector("h4"); if (!h || !state.profile) return;
        logAdd(state.profile.id, { type: "lesson", title: h.textContent.trim(), wrong: null });
        recordCompletion(state.profile.id, h.textContent.trim()); /* Wave C1: Then & Now history */
      });
    });
    mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"], attributeOldValue: true });
  }
  function isTeen() { return !!(state.profile && isTeenBand(bandOf(state.profile.id))); }
  var TEEN_GAMES = ["memory", "band", "piano"];
  var TEEN_TAB_LABEL = { activities: "Activities", today: "Today", games: "Practice", learn: "Learn", reading: "Reading", memories: "Portfolio", days: "Days", grownups: "Grown-ups" };
  var TEEN_TAB_ICON = { activities: "🧺", today: "📋", games: "🎯", learn: "📘", reading: "📖", memories: "🗂️", days: "🗓️", grownups: "🔒" };
  var LEARN_PATHS = {
    little: [{ id: "letters", title: "Letters A–Z", count: 26, emo: "🔤" }, { id: "little", title: "Little Explorers", count: 16, emo: "🐣" }, { id: "basics", title: "Colours, shapes & numbers", count: 11, emo: "🎨" }, { id: "world", title: "My world", count: 2, emo: "🌍" }],
    early: [{ id: "early", title: "Early Readers · ages 5–7", count: 8, emo: "📚" }, { id: "letters", title: "Letters A–Z", count: 26, emo: "🔤" }, { id: "world", title: "My world", count: 2, emo: "🌍" }],
    quest: [{ id: "quest", title: "Quest Kids · ages 8–10", count: 8, emo: "🗺️" }],
    high: [{ id: "teen", title: "High school · ages 14–18", count: 8, emo: "🎓" }],
    teen: [
      { id: "ny", title: "Grade 7 · NY standards", count: 16, emo: "🗽" },
      { id: "creator", title: "Creator skills · ages 11–13", count: 8, emo: "✨" }
    ]
  };

  var state = {
    profile: null,
    tab: "today",
    stars: 0,
    done: {},
    ideaShift: 0,
    hours: { kida: 0, kidb: 0, kidc: 0 }
  };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(html) {
    var d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstChild;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }
  function doneKey(pid, title) { return pid + "::" + title; }
  function isDone(title) { return !!state.done[doneKey(state.profile && state.profile.id, title)] || dayDone(title); }
  function markDone(title, on) {
    if (on && state.profile) logAdd(state.profile.id, { type: "activity", title: title });
    var k = doneKey(state.profile.id, title);
    if (on) state.done[k] = 1; else delete state.done[k];
    try { sessionStorage.setItem("hw-ll-done", JSON.stringify(state.done)); } catch (e) {}
    setDayDone(title, on); /* 3e38: a tick lasts the whole day, not just until the app closes */
    bumpStars();
  }
  function bumpStars() {
    /* 3e64: count today's saved ticks too: the header showed ⭐ 0 after the app was closed and reopened,
       while the ticks themselves were still there */
    var id = state.profile && state.profile.id, seen = {};
    Object.keys(state.done).forEach(function (k) { if (k.indexOf(id + "::") === 0) seen[k.slice(id.length + 2)] = 1; });
    if (id) Object.keys(planDay(id).d.done || {}).forEach(function (t) { seen[t] = 1; });
    var n = Object.keys(seen).length;
    state.stars = n;
    var s = $(".ll-shell-header .stars");
    if (s) s.textContent = "⭐ " + n;
  }

  /* Today for bands without a hand-made plan: the next unfinished lessons
     on this child's own paths (+ one game for 5–7). */
  function autoPlan(band, skip) {
    var out = [];
    pathsFor(state.profile.id).forEach(function (p) {
      (LESSONS[p.id] || hlLessons(p.id)).forEach(function (l) {
        var done = lessonDone(l.title);
        if (!done) out.push({ kind: "lesson", title: l.title, emo: l.emo, tags: l.tags, color: l.color, blurb: "Next on your path." });
      });
    });
    if (skip) out = out.slice(skip).concat(out.slice(0, skip));
    out = out.slice(0, band === "early" ? 3 : 4);
    if (band === "early") out.push({ kind: "game", title: "Letter Fishing", key: "fishing", emo: "🎣", tags: ["Game", "Letters"], color: "#0B8A5F", blurb: "Catch the letter Hoot calls." });
    return out;
  }

  /* ===== 3e38: the grown-up's plan =====
     Hoot still picks the next lessons. A grown-up can add their own stops
     (library, piano…), skip a stop for today, and change the order. Saved on
     the device and through Family Sync as hootworld.plan.v1. Kept small:
     only today and the last two weeks of day notes are stored. */
  var PLAN_KEY = "hootworld.plan.v1", MAX_STOPS = 7;
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function dayKeyOf(d) { d = d || new Date(); return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate()); }
  function planAll() { var s = {}; try { s = JSON.parse(localStorage.getItem(PLAN_KEY) || "{}") || {}; } catch (e) { s = {}; } if (!s.kids || typeof s.kids !== "object") s.kids = {}; return s; }
  function kidPlan(s, pid) {
    var k = s.kids[pid]; if (!k || typeof k !== "object") k = s.kids[pid] = {};
    if (!Array.isArray(k.extra)) k.extra = [];
    if (!k.days || typeof k.days !== "object") k.days = {};
    return k;
  }
  function planSave(s) {
    var cut = dayKeyOf(new Date(Date.now() - 14 * 864e5));
    Object.keys(s.kids).forEach(function (pid) {
      var k = s.kids[pid]; if (!k || !k.days) return;
      Object.keys(k.days).forEach(function (d) { if (d < cut) delete k.days[d]; });
      if (Array.isArray(k.extra)) k.extra = k.extra.filter(function (x) { return !x.date || x.date >= cut; });
    });
    try { localStorage.setItem(PLAN_KEY, JSON.stringify(s)); } catch (e) {}
  }
  function planDay(pid, make) {
    var s = planAll(), k = kidPlan(s, pid), dk = dayKeyOf(), d = k.days[dk];
    if (!d && make) d = k.days[dk] = {};
    return { s: s, k: k, d: d || {} };
  }
  function dayDone(title) { var pid = state.profile && state.profile.id; if (!pid) return false; var d = planDay(pid).d; return !!(d.done && d.done[title]); }
  function setDayDone(title, on) {
    var pid = state.profile && state.profile.id; if (!pid) return;
    var x = planDay(pid, true); x.d.done = x.d.done || {};
    if (on) x.d.done[title] = 1; else delete x.d.done[title];
    planSave(x.s);
  }
  function extrasOn(k, date) {
    var dk = dayKeyOf(date), dow = date.getDay();
    return k.extra.filter(function (x) { return x && x.title && (x.date ? x.date === dk : Array.isArray(x.dow) && x.dow.indexOf(dow) >= 0); });
  }
  var STORY_STOP = "Story time";
  function applyParentPlan(base) {
    var pid = state.profile && state.profile.id; if (!pid) return base;
    var x = planDay(pid), hide = x.d.hide || [], order = x.d.order || [];
    var out = base.filter(function (it) { return hide.indexOf(it.title) < 0; });
    var has = function (t) { return out.some(function (it) { return it.title === t; }); };
    var room = MAX_STOPS;
    extrasOn(x.k, new Date()).forEach(function (e) {
      if (out.length >= room || has(e.title) || hide.indexOf(e.title) >= 0) return;
      out.push({ kind: "custom", cid: e.id, title: e.title, emo: e.emo || "⭐", tags: ["Your plan"], color: "#7C3AED", blurb: "Planned by your grown-up. Tick it when it's done." });
    });
    /* Story time is a free choice on Kid Home (storyBtnHtml), never a required
       step blocking Play games (Dawid/Muse 2026-11-21). */
    if (order.length) {
      var pos = function (it, i) { var n = order.indexOf(it.title); return n < 0 ? 500 + i : n; };
      out = out.map(function (it, i) { return { it: it, p: pos(it, i) }; }).sort(function (a, b) { return a.p - b.p; }).map(function (o) { return o.it; });
    }
    return out;
  }
  /* 3e39: keep "done of planned" for each day, so the planner can show the last week */
  function rememberDay(plan) {
    var pid = state.profile && state.profile.id; if (!pid) return;
    var dn = plan.filter(stoneDone).length, x = planDay(pid), cur = x.d.n;
    if (cur && cur[0] === dn && cur[1] === plan.length) return;
    x = planDay(pid, true); x.d.n = [dn, plan.length]; planSave(x.s);
  }
  function hiddenToday() { var pid = state.profile && state.profile.id; return pid ? (planDay(pid).d.hide || []).slice() : []; }
  /* free play for ages 2–7: "after" the path is done (default), "always", or "off" */
  function freeMode(pid) { var m = kidPlan(planAll(), pid).free; return m === "always" || m === "off" ? m : "after"; }
  /* Passive/offline stops (story, outdoor) are fun optional cards and NEVER block
     or count toward unlocking Play games (Dawid/Muse 2026-11-21). Grown-up custom
     stops stay required when explicitly scheduled in Parents -> Planner. */
  function isRequiredStop(it) {
    return !!(it && it.kind !== "story" && it.title !== STORY_STOP && it.kind !== "outdoor");
  }
  function pathDone() {
    var req = currentPlan().filter(isRequiredStop);
    return req.every(stoneDone);
  }
  function playUnlocked() {
    if (!state.profile || !isKidBand()) return true;
    var m = freeMode(state.profile.id);
    /* 3e44: a grown-up can open Learn and Play for 30 minutes from Grown-ups without changing the child's setting */
    if (window.__llGrownupOpen && Date.now() < window.__llGrownupOpen) return true;
    return m === "always" ? true : m === "off" ? false : pathDone();
  }
  window.__llPlan = { key: PLAN_KEY, dayKey: dayKeyOf };

  function currentPlan() { return applyParentPlan(basePlan()); }
  function basePlan() {
    var band = curBand();
    var plan = TODAY_PLAN[band] && (band !== "teen" || childCfg(state.profile.id).state === "New York") ? TODAY_PLAN[band] : autoPlan(band);
    var base = plan.slice();
    if (band === "teen" && HL() && HL().paths.math7) {
      var firstWord = function (t) { return t.toLowerCase().split(/[ :&]/)[0]; };
      var nm = hlLessons("math7").filter(function (l) { return !lessonDone(l.title) && !base.some(function (x) { return (x.tags || []).indexOf("Maths") < 0 && firstWord(x.title) === firstWord(l.title); }); })[0];
      var extra = [];
      if (nm && !base.some(function (x) { return x.title === nm.title; })) extra.push({ kind: "lesson", title: nm.title, emo: nm.emo, tags: ["Math"], color: "#0B5E43", blurb: "Fresh problems every time — 4 of 5 right first try and it's learned." });
      /* 3e31: the next Grade 7 English lesson joins Today too; still 4 stones max */
      var ne = HL().paths.ela7 ? hlLessons("ela7").filter(function (l) { return !lessonDone(l.title); })[0] : null;
      if (ne && !base.some(function (x) { return x.title === ne.title; })) extra.push({ kind: "lesson", title: ne.title, emo: ne.emo, tags: ["English"], color: "#7A2E8E", blurb: "Grammar, vocabulary and reading — 4 of 5 right first try and it's learned." });
      /* 3e32: science and social studies take turns day by day */
      var dayC = new Date().getDate() % 2 ? "sci7" : "ss7", otherC = dayC === "sci7" ? "ss7" : "sci7";
      var pickC = function (cid) { return HL().paths[cid] ? hlLessons(cid).filter(function (l) { return !lessonDone(l.title); })[0] : null; };
      var nc = pickC(dayC) || pickC(otherC), ncId = nc ? (pickC(dayC) ? dayC : otherC) : null;
      if (nc && !base.some(function (x) { return x.title === nc.title; })) extra.push({ kind: "lesson", title: nc.title, emo: nc.emo, tags: [ncId === "sci7" ? "Science" : "Social studies"], color: ncId === "sci7" ? "#0E6E8C" : "#9A3412", blurb: (ncId === "sci7" ? "Science" : "Social studies") + " — 4 of 5 right first try and it's learned." });
      /* the course lessons replace the sample stones of the same subject, so Today stays balanced: reading, math, English, science or social studies */
      if (extra.length) base = base.filter(function (x) { var t = x.tags || []; return !(nm && t.indexOf("Maths") >= 0) && !(nc && (t.indexOf("Science") >= 0 || t.indexOf("Social studies") >= 0)); }).slice(0, Math.max(0, 4 - extra.length)).concat(extra);
    }
    /* 3e22: letter of the week — the next letter not learned yet leads Today for ages 2–7 */
    if ((band === "little" || band === "early") && HL()) {
      var lw = letterOfWeek();
      if (lw) base.unshift({ kind: "lesson", lotw: true, title: lw.title, emo: lw.emo, tags: ["Letter of the week"], color: lw.color, blurb: "Hoot teaches the letter's name and sound, then you find it." });
      /* one review that is due (struggles first) — spaced review keeps old skills */
      var due = HL().dueReviews ? HL().dueReviews(state.profile.id).filter(function (r) { return !lw || r.title !== lw.title; })[0] : null;
      if (due) {
        var dl = HL().byId[due.id];
        base.splice(1, 0, { kind: "lesson", review: true, title: dl.title, emo: dl.emo, tags: [due.struggle ? "Try again" : "Review"], color: dl.color, blurb: due.struggle ? "This one was tricky — Hoot shows it again." : "A quick review so it sticks." });
      }
      base = base.map(function (it) { return it.kind === "game" ? { kind: "pgame", title: "Letter Bubble Parade", key: "bubbles", emo: "🫧", tags: ["Game", "Letters"], color: "#E0457B", blurb: "Pop the bubbles with this week's letter sound." } : it; });
      base = base.slice(0, 4);
    }
    /* 3e62: "Swap Hoot's picks" is saved for this child and today (it was kept in memory only, so reopening
       the app brought the old picks back, and one child's swap also reshuffled the other children) */
    var shift = planDay(state.profile.id).d.shift || 0;
    if (shift) {
      var pool = (TODAY_PLAN[band] && IDEA_POOL[band]) ? IDEA_POOL[band] : autoPlan(band, 4);
      base = pool.slice(shift % pool.length).concat(pool.slice(0, shift % pool.length)).slice(0, 4);
    }
    return base;
  }

  function tagsHtml(tags) {
    var pal = ["#3A56D4", "#0B8A5F", "#F5A623", "#E0457B"];
    return (tags || []).map(function (t, i) {
      return '<span class="ll-tag" style="--c:' + pal[i % pal.length] + '">' + esc(t) + "</span>";
    }).join("");
  }

  function gameThumb(key, emo) {
    return (
      '<span class="gthumb">' +
      '<img src="' + ((HW_THUMBS && HW_THUMBS[key]) || ('assets/thumbs/' + key + '.webp')) + '" alt="" width="320" height="320" loading="lazy" decoding="async" onerror="this.style.display=\'none\'">' +
      (emo ? '<span class="gbadge" aria-hidden="true">' + emo + "</span>" : "") +
      "</span>"
    );
  }

  /* Wave B (B6): per-lesson illustrations live in assets/lesson-art/<id>.svg.
     Only ids in this set have art; other lessons keep the emoji tile. */
var LESSON_ART = {"creator-budget-the-project":1,"creator-debug-change-one-thing":1,"creator-make-a-claim-bring-evidence":1,"creator-percentages-parts-of-100":1,"creator-present-hook-build-land":1,"creator-ratios-scale-both-sides":1,"creator-research-you-can-trust":1,"creator-the-design-loop-test-fix-retest":1,"early-answer-questions-about-a-story":1,"early-blend-sounds-into-words":1,"early-counting-on-to-add":1,"early-letter-sounds":1,"early-read-a-line-and-understand-it":1,"early-rhyming-words":1,"early-taking-away":1,"early-tens-and-ones":1,"little-animal-sounds":1,"little-big-and-small":1,"little-colour-names":1,"little-counting-back-from-5":1,"little-counting-to-10":1,"little-counting-to-5":1,"little-feelings-faces":1,"little-first-letter-sounds":1,"little-more-colours-green-orange-purple":1,"little-more-letter-sounds":1,"little-my-body-eyes-ears-nose":1,"little-patterns-what-comes-next":1,"little-shape-names":1,"little-sorting-things-that-go-together":1,"little-star-and-heart-shapes":1,"little-up-and-down":1,"ny-argument-writing-claim-evidence-reasoning":1,"ny-ecosystems-the-hudson-river-food-web":1,"ny-from-the-articles-to-the-constitution":1,"ny-main-idea-citing-evidence":1,"ny-negative-numbers-on-the-number-line":1,"ny-photosynthesis-matter-energy-in-plants":1,"ny-two-step-equations-unwrap-x":1,"ny-unit-rates-the-price-of-one":1,"quest-area-length-width":1,"quest-coding-order-matters":1,"quest-division-is-sharing-equally":1,"quest-find-the-main-idea":1,"quest-fractions-equal-parts":1,"quest-how-plants-make-food":1,"quest-times-tables-are-groups":1,"quest-topic-sentences":1,"teen-algebra-ii-keep-the-balance":1,"teen-algebra-ii-two-step-equations":1,"teen-biology-dna-to-protein":1,"teen-biology-where-energy-comes-from":1,"teen-history-a-thesis-is-a-claim":1,"teen-history-primary-vs-secondary-sources":1,"teen-spanish-ii-ar-verb-endings":1,"teen-study-science-test-don-t-re-read":1};

  function actCard(item) {
    var done = isDone(item.title);
    var isGame = item.kind === "game" && item.key && !isTeen();
    var lessonId = item.kind === "lesson" ? (item.id || lessonIdForTitle(item.title)) : null;
    var hasArt = !!lessonId && !!LESSON_ART[lessonId];
    var artBanner = hasArt && !isTeen();
    var media = isGame
      ? gameThumb(item.key, item.emo)
      : artBanner
        ? '<span class="lthumb"><img src="assets/lesson-art/' + lessonId + '.svg" alt="" loading="lazy" decoding="async">' + (item.emo ? '<span class="gbadge" aria-hidden="true">' + item.emo + "</span>" : "") + "</span>"
        : hasArt
          ? '<img class="ll-art-sm" src="assets/lesson-art/' + lessonId + '.svg" alt="" loading="lazy" decoding="async">'
          : '<div class="emo">' + (item.emo || "⭐") + "</div>";
    var html =
      '<article class="ll-card ll-act' + (isGame ? " ll-act-game" : "") + (done ? " done" : "") + '" style="--dc:' + (item.color || "#E0457B") + '" data-title="' + esc(item.title) + '"' + (isGame ? ' data-game-key="' + esc(item.key) + '"' : "") + (lessonId ? ' data-lesson-id="' + esc(lessonId) + '"' : "") + '>' +
      (isGame || artBanner ? media : "") +
      '<div class="row">' +
      (isGame || artBanner ? "" : media) +
      '<div class="atxt"><h3>' + esc(item.title) + "</h3>" + tagsHtml(item.tags) + "</div>" +
      '<button type="button" class="ll-chk" aria-label="Mark done">' + (done ? "✓" : "") + "</button>" +
      "</div>" +
      "<p>" + esc(item.blurb || "A short activity for today.") + "</p>" +
      (isTeen()
        ? '<div class="ll-actions"><button type="button" class="ll-btn pri" data-act="play">' + (item.kind === "game" ? "Take a break" : "Start lesson") + "</button></div></article>"
        : (bothKids().length === 2 ? '<button type="button" class="ll-tw" data-act="both">Done for both</button>' : "") +
          '<div class="ll-actions">' +
          '<button type="button" class="ll-btn pri" data-act="play">▶ Play now</button>' +
          "</div>" +
          /* 3e54: photos only for things done away from the screen (outdoor, hands-on,
             grown-up's own activity) — never for a game or a lesson */
          (item.kind === "outdoor" || item.kind === "custom"
            ? '<div class="ll-phbtns">' +
              '<button type="button" class="ll-btn sm" data-act="photo">📷 Add a photo</button>' +
              '<button type="button" class="ll-btn sm" data-act="lib">🖼 From library</button>' +
              "</div>"
            : "") +
          "</article>");
    return html;
  }

  /* ===== 3e23: home for ages 2–7 — no reading needed =====
     Big Hoot, today's stepping stones (tap the glowing one), and three big
     picture buttons. Done-checks, "Done for both" and photo buttons are
     grown-up controls; they live in Grown-ups → "Today for each child". */
  function isKidBand() { var b = curBand(); return b === "little" || b === "early"; }
  var STICKERS = ["🦉", "🌟", "🚀", "🦋", "🐢", "🍓", "🌈", "🐳", "🦊", "🌻", "🐝", "🍉", "🦄", "🐞", "🌙", "🐙", "🦖", "🎈", "🐧", "🍦", "🐸", "🌵", "🐬", "🦒"];
  function stickerFor(id) { var h = 0; for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0; return STICKERS[h % STICKERS.length]; }
  window.__llStickerFor = stickerFor;
  function stoneDone(it) {
    if (it.kind === "custom" || it.kind === "story") return dayDone(it.title);
    if (isDone(it.title)) return true;
    if (it.lotw || it.review) return playedToday(it.title);
    if (it.kind === "lesson") return lessonDone(it.title);
    return false;
  }
  /* ===== 3e34: magic for the little ones =====
     Everything here only ADDS: no streaks to break, no timers, nothing lost
     if a day is skipped. Saved on this device only. */
  var PET_KEY = "hootworld.pet.v1", GARDEN_KEY = "hootworld.garden.v1", PARTY_KEY = "hootworld.party.v1";
  function loadJ(k) { try { return JSON.parse(localStorage.getItem(k) || "{}") || {}; } catch (e) { return {}; } }
  function saveJ(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function isLittleBand() { var b = curBand(); return b === "little" || b === "early"; }
  /* 3e35: Hoot's recorded lines that say each child's name (3e56: the clips are
     named by profile, e.g. hi-kida.mp3, never by the child's name). They play only
     once a grown-up has set that child's name on this device; until then Hoot uses
     the general lines. */
  var NAMED = { kida: 1, kidb: 1 };
  function nameKeyOf(p) { if (!p || !NAMED[p.id]) return null; var s = kidStore[p.id]; return s && String(s.name || "").trim() ? p.id : null; }
  window.__llNameKey = function () { return nameKeyOf(state.profile); };
  window.__llGreetClip = function (id) {
    var p = PROFILES.filter(function (x) { return x.id === id; })[0], k = nameKeyOf(p); if (!k) return null;
    var b = bandOf(id); if (b !== "little" && b !== "early") return null;
    if (isBirthdayMonth(id)) return "birthday-" + k + ".mp3";
    var sk = skyOf(); return (sk === "night" ? "sleepy-" : sk === "dawn" ? "good-morning-" : "hi-") + k + ".mp3";
  };

  /* --- the pet egg: each new stone finished today warms it; it hatches, then grows --- */
  var PETS = {
    chick: { name: "Pip", word: "chick", look: ["🐣", "🐥", "🐓"] },
    bunny: { name: "Clover", word: "bunny", look: ["🐰", "🐰", "🐇"] },
    dragon: { name: "Ember", word: "baby dragon", look: ["🐲", "🐲", "🐉"] },
    puppy: { name: "Biscuit", word: "puppy", look: ["🐶", "🐶", "🐕"] },
    kitten: { name: "Mittens", word: "kitten", look: ["🐱", "🐱", "🐈"] },
    turtle: { name: "Shelly", word: "turtle", look: ["🐢", "🐢", "🐢"] }
  };
  var HATCH = 10, GROWN = 30; /* warmth to hatch (~3–4 days of stones); points for a baby to grow up */
  function newEggKind(friends) {
    var left = Object.keys(PETS).filter(function (k) { return friends.indexOf(k) < 0; });
    if (!left.length) left = Object.keys(PETS);
    return left[Math.floor(Math.random() * left.length)];
  }
  function petStage(xp) { return xp < 10 ? 0 : xp < 20 ? 1 : 2; }
  /* call with the titles of today's stones that are done; returns the pet state and what just happened */
  function updatePet(pid, doneTitles) {
    var all = loadJ(PET_KEY), s = all[pid] || { friends: [], seen: {} };
    if (!s.egg && !s.pet) s.egg = { kind: newEggKind(s.friends), warm: 0 };
    var firstEgg = !s.helloed; s.helloed = true;
    var day = new Date().toDateString(), seen = (s.seen && s.seen.day === day) ? s.seen.titles : [];
    var fresh = doneTitles.filter(function (t) { return seen.indexOf(t) < 0; });
    s.seen = { day: day, titles: seen.concat(fresh) };
    var ev = null;
    fresh.forEach(function () {
      if (s.egg) {
        s.egg.warm++;
        if (s.egg.warm >= HATCH) { s.pet = { kind: s.egg.kind, xp: 0 }; s.egg = null; ev = "hatch"; }
      } else if (s.pet) {
        var before = petStage(s.pet.xp); s.pet.xp++;
        if (s.pet.xp >= GROWN) { s.friends.push(s.pet.kind); s.pet = null; s.egg = { kind: newEggKind(s.friends), warm: 0 }; ev = "grown"; }
        else if (petStage(s.pet.xp) > before && ev !== "hatch") ev = "grew";
      }
    });
    /* Home can redraw several times in a row (closing a lesson does), so a
       hatch stays on screen for 8 seconds and its sound plays only once */
    var now = Date.now(), isNew = !!ev;
    if (ev) s.lastEv = { ev: ev, at: now };
    else if (s.lastEv && now - s.lastEv.at < 8000) ev = s.lastEv.ev;
    all[pid] = s; saveJ(PET_KEY, all);
    return { s: s, ev: ev, isNew: isNew, gained: fresh.length, firstEgg: firstEgg };
  }
  function nestHtml(p, ps) {
    var s = ps.s, body, line;
    if (s.pet) {
      var P = PETS[s.pet.kind], st = petStage(s.pet.xp);
      body = '<button type="button" class="kh-pet st' + st + (ps.ev === "hatch" ? " hatching" : ps.ev === "grew" ? " grewup" : "") + '" data-kh="pet" aria-label="Pet ' + esc(P.name) + '"><span class="kh-petface" aria-hidden="true">' + P.look[st] + "</span></button>";
      line = ps.ev === "hatch" ? "Your egg hatched! Say hi to " + P.name + " the " + P.word + "!" : ps.ev === "grew" ? P.name + " is growing bigger!" : P.name + " grows when you learn. Tap to say hi!";
    } else {
      var w = s.egg.warm, crack = w >= HATCH * 0.8 ? " crack2" : w >= HATCH * 0.5 ? " crack1" : "";
      body = '<button type="button" class="kh-egg' + crack + (ps.gained ? " warmed" : "") + '" data-kh="pet" aria-label="Your egg">' +
        '<svg viewBox="0 0 100 120" aria-hidden="true"><ellipse cx="50" cy="66" rx="40" ry="50" fill="#FFF6E5" stroke="#17263b" stroke-width="4"/>' +
        '<circle cx="34" cy="50" r="7" fill="#F9A8D4"/><circle cx="64" cy="80" r="9" fill="#93C5FD"/><circle cx="62" cy="40" r="5" fill="#FCD34D"/><circle cx="36" cy="88" r="5" fill="#86EFAC"/>' +
        (crack ? '<path class="ck" d="M30 60 L40 52 L47 62 L56 50 L64 60 L71 54" fill="none" stroke="#17263b" stroke-width="3" stroke-linejoin="round"/>' : "") +
        (crack === " crack2" ? '<path class="ck" d="M44 30 L50 38 L46 44" fill="none" stroke="#17263b" stroke-width="3"/>' : "") + "</svg></button>";
      line = ps.ev === "grown" ? "Your friend is all grown up! And look — a new egg!" : w === 0 ? "A magic egg! Finish stones to keep it warm." : w >= HATCH * 0.8 ? "Crack, crack! It's almost ready to hatch!" : "Your egg is getting warm. Keep going!";
    }
    var dots = s.egg ? '<span class="kh-warm" aria-label="' + s.egg.warm + " of " + HATCH + ' warm">' + new Array(HATCH + 1).join("·").split("").map(function (_, i) { return '<i class="' + (i < s.egg.warm ? "on" : "") + '">♥</i>'; }).join("") + "</span>" : "";
    var friends = s.friends.length ? '<span class="kh-friends" aria-label="Grown-up friends">' + s.friends.map(function (k) { return '<span title="' + esc(PETS[k].name) + '">' + PETS[k].look[2] + "</span>"; }).join("") + "</span>" : "";
    return '<section class="kh-nest' + (ps.ev ? " ev-" + ps.ev : "") + '" aria-label="Your pet">' + body + '<div class="kh-nesttxt"><p>' + esc(line) + "</p>" + dots + friends + "</div>" +
      (ps.ev === "hatch" || ps.ev === "grown" ? confettiHtml(18) : "") + "</section>";
  }

  /* --- the garden: one plant for every lesson learned --- */
  var PLANTS = ["🌷", "🌻", "🌼", "🌱", "🌸", "🍄", "🦋", "🌺", "🐞", "🌳", "🐝", "🌹", "🐌", "🪻", "🌿", "🐿️"];
  function learnedCount() {
    var n = 0;
    (LESSONS.little || []).forEach(function (l) { if (lessonDone(l.title)) n++; });
    ["letters", "basics", "world"].forEach(function (pid) { hlLessons(pid).forEach(function (l) { if (lessonDone(l.title)) n++; }); });
    return n;
  }
  var gardenJustGrew = false;
  function gardenHtml(p) {
    var n = learnedCount(), g = loadJ(GARDEN_KEY), e = g[p.id], now = Date.now();
    if (typeof e !== "object" || e === null) e = { n: n, prev: n, at: 0 };
    if (n !== e.n) e = { n: n, prev: Math.min(e.n, n), at: now };
    g[p.id] = e; saveJ(GARDEN_KEY, g);
    var last = now - e.at < 8000 ? e.prev : n; /* new plants sprout for 8 s, even across redraws */
    gardenJustGrew = e.at === now && n > e.prev;
    var items = [];
    for (var i = 0; i < n; i++) items.push('<span class="' + (i >= last ? "sprout" : "") + '" style="--d:' + ((i - last) * 0.25) + 's">' + PLANTS[i % PLANTS.length] + "</span>");
    return '<section class="kh-garden" aria-label="' + esc(p.label) + "'s garden: " + n + ' plants"><h3>🌱 ' + esc(p.label) + "'s garden</h3>" +
      (n ? '<div class="kh-bed">' + items.join("") + "</div>" : '<p class="kh-seed">Finish a lesson and Hoot plants your first flower!</p>') + "</section>";
  }

  /* --- Hoot's world follows real life: time of day, season, birthday month --- */
  function skyOf() { var h = new Date().getHours() + new Date().getMinutes() / 60; return h < 6 || h >= 19.5 ? "night" : h < 9 ? "dawn" : h >= 17 ? "dusk" : "day"; }
  function seasonOf() { var m = new Date().getMonth(); return m === 11 || m < 2 ? "winter" : m < 5 ? "spring" : m < 8 ? "summer" : "fall"; }
  function isBirthdayMonth(pid) { var b = childCfg(pid).birth, m = /^\d{4}-(\d{2})$/.exec(b || ""); return !!m && +m[1] === new Date().getMonth() + 1; }
  var FALL = { winter: "❄️", spring: "🌸", summer: "✨", fall: "🍂" };
  function decorHtml(season) {
    var out = ""; for (var i = 0; i < 7; i++) out += '<span style="left:' + (6 + i * 14) + "%;--d:" + (i * 1.3) + "s;--t:" + (7 + (i % 3) * 2) + 's">' + FALL[season] + "</span>";
    return '<div class="kh-fall" aria-hidden="true">' + out + "</div>";
  }
  var PARTY_HAT = '<svg class="kh-hat party" viewBox="0 0 60 70" aria-hidden="true"><path d="M30 4 L52 64 L8 64 Z" fill="#F472B6" stroke="#17263b" stroke-width="3" stroke-linejoin="round"/><path d="M19 34 L41 34 M14 49 L46 49" stroke="#FDE047" stroke-width="5"/><circle cx="30" cy="6" r="6" fill="#FDE047" stroke="#17263b" stroke-width="2"/></svg>';
  var NIGHT_CAP = '<svg class="kh-hat night" viewBox="0 0 80 60" aria-hidden="true"><path d="M8 52 Q20 10 58 8 Q74 10 70 30 Q60 18 46 24 Q40 40 72 52 Z" fill="#60A5FA" stroke="#17263b" stroke-width="3" stroke-linejoin="round"/><circle cx="70" cy="30" r="7" fill="#fff" stroke="#17263b" stroke-width="2"/><rect x="4" y="48" width="70" height="10" rx="5" fill="#fff" stroke="#17263b" stroke-width="2"/></svg>';
  function confettiHtml(n) {
    var c = ["#F472B6", "#FDE047", "#60A5FA", "#4ADE80", "#FB923C", "#A78BFA"], out = "";
    for (var i = 0; i < n; i++) out += '<i style="left:' + Math.round(Math.random() * 100) + "%;background:" + c[i % c.length] + ";--d:" + (Math.random() * 0.6).toFixed(2) + "s;--r:" + Math.round(Math.random() * 360) + 'deg"></i>';
    return '<div class="kh-confetti" aria-hidden="true">' + out + "</div>";
  }
  /* the all-done party: confetti and Hoot flying across, once a day */
  function partyOnce(pid) {
    /* once a day, but it stays on screen for its 4 seconds even if Home redraws */
    var d = loadJ(PARTY_KEY), today = new Date().toDateString(), now = Date.now(), e = d[pid];
    if (e && e.day === today) return now - e.at < 4000;
    d[pid] = { day: today, at: now }; saveJ(PARTY_KEY, d); return "new";
  }
  /* tapping Hoot: sometimes a little trick */
  function hootTrick(btn) {
    var tricks = ["wiggle", "wiggle", "trick-spin", "trick-wink", "trick-feathers"], t = tricks[Math.floor(Math.random() * tricks.length)];
    btn.classList.remove("wiggle", "trick-spin", "trick-wink", "trick-feathers"); void btn.offsetWidth; btn.classList.add(t);
    if (t === "trick-feathers") {
      var f = document.createElement("span"); f.className = "kh-feathers"; f.setAttribute("aria-hidden", "true");
      f.innerHTML = "<i>🪶</i><i>🪶</i><i>🪶</i><i>🪶</i>"; btn.appendChild(f); setTimeout(function () { f.remove(); }, 1600);
    }
    return t;
  }
  function petTap(btn) {
    btn.classList.remove("boing"); void btn.offsetWidth; btn.classList.add("boing");
    var h = document.createElement("span"); h.className = "kh-hearts"; h.setAttribute("aria-hidden", "true");
    h.innerHTML = "<i>💗</i><i>💛</i><i>💙</i>"; btn.appendChild(h); setTimeout(function () { h.remove(); }, 1300);
  }

  /* --- Morning Show (2026-11-17, Dawid approved): Hoot's Morning Show
     lives in the app. Today's show big on the kid home, past shows under
     it. The morning-show-daily job prepends each new show to MORNING_SHOWS
     and drops its mp3 at assets/voice/show-<date>.mp3. Little profiles
     only (this renders inside renderKidHome). --- */
  var MORNING_SHOWS = [
    { d: "2026-11-23", letter: "O", note: "O is for Owl" },
    { d: "2026-11-22", letter: "S", note: "S is for Sunday" },
    { d: "2026-11-21", letter: "N", note: "N is for Nex" },
    { d: "2026-11-20", letter: "L", note: "L is for Lion" },
    { d: "2026-11-19", letter: "K", note: "K is for Kite" },
    { d: "2026-11-18", letter: "M", note: "M is for Mama" },
    { d: "2026-11-17", letter: "S", note: "S is for Sun" },
    { d: "2026-11-16", letter: "F", note: "F is for Frost" }
  ];
  var msEl = null, msKey = null;
  function msStop() {
    if (msEl) { try { msEl.pause(); } catch (e) {} }
    msKey = null;
    msUi();
  }
  window.__msStop = msStop;
  function msUi() {
    var btns = document.querySelectorAll("[data-ms-play]");
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i], on = msKey === b.getAttribute("data-ms-play") && msEl && !msEl.paused && !msEl.ended;
      b.classList.toggle("playing", !!on);
      var ic = b.querySelector(".ms-ic"); if (ic) ic.textContent = on ? "\u23F8" : "\u25B6";
    }
    var card = document.getElementById("ms-card");
    if (card) card.classList.toggle("playing", !!(msKey && msEl && !msEl.paused && !msEl.ended));
  }
  function msToggle(d) {
    if (!msEl) {
      msEl = new Audio(); msEl.__govVoice = 1; msEl.preload = "auto";
      msEl.onended = function () { msKey = null; msUi(); };
      msEl.onplaying = function () { msUi(); };
      msEl.onpause = function () { msUi(); };
      window.__msEl = msEl;
      msEl.onerror = function () { msKey = null; msUi(); };
    }
    if (msKey === d && !msEl.paused && !msEl.ended) { msEl.pause(); msUi(); return; }
    if (msKey !== d) {
      try { stopAllVoices(); } catch (e) {}
      try { if (window.__hootStopClip) window.__hootStopClip(); } catch (e) {}
      msEl.src = "assets/voice/show-" + d + ".mp3";
      msKey = d;
    }
    var pr = msEl.play(); if (pr && pr.catch) pr.catch(function () { msUi(); });
    msUi();
  }
  function msDayLabel(d) {
    var dt = new Date(d + "T12:00:00");
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var mons = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return days[dt.getDay()] + ", " + mons[dt.getMonth()] + " " + dt.getDate();
  }
  function msShowHtml() {
    if (!MORNING_SHOWS.length) return "";
    var today = dayKeyOf(new Date());
    var feat = MORNING_SHOWS[0];
    var featLabel = feat.d === today ? "Today's show" : "Latest show";
    var h = '<section class="ll-card ms-card" id="ms-card" aria-label="Hoot\'s Morning Show">' +
      '<button type="button" class="ms-go" data-ms-play="' + feat.d + '" aria-label="Play ' + featLabel + ': Hoot\'s Morning Show">' +
      '<span class="ms-goemo" aria-hidden="true">\u2600\uFE0F</span>' +
      '<span class="ms-gotx"><b>Morning Show</b><small>' + featLabel + " \u00B7 Letter " + esc(feat.letter) + " \u2014 " + esc(feat.note) + "</small></span>" +
      '<i class="ms-ic" aria-hidden="true">\u25B6</i></button>';
    if (MORNING_SHOWS.length > 1) {
      h += '<div class="ms-past"><span class="ms-pastlabel">Past shows</span>' + MORNING_SHOWS.slice(1).map(function (s) {
        return '<button type="button" class="ms-row" data-ms-play="' + s.d + '"><span class="ms-ic" aria-hidden="true">\u25B6</span><span class="ms-rowtx"><b>Letter ' + esc(s.letter) + "</b><small>" + msDayLabel(s.d) + " \u00B7 " + esc(s.note) + "</small></span></button>";
      }).join("") + "</div>";
    }
    return h + "</section>";
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-ms-play]") : null;
    if (!t) return;
    msToggle(t.getAttribute("data-ms-play"));
  });
  /* Wave 1 (Exit rule §6.2): hiding or closing the app stops EVERY voice/audio player
     immediately (Car Mode keeps playing screen-off only when actively open on Car Mode). */
  function stopOnBackground() {
    var keepCar = !!(we2Car && we2Car.playing && document.getElementById("we2-car"));
    stopAllVoices({ keepCar: keepCar });
  }
  document.addEventListener("visibilitychange", function () { if (document.hidden) stopOnBackground(); });
  window.addEventListener("pagehide", function () { stopAllVoices(); });

  function renderKidHome() {
    var p = state.profile, plan = currentPlan();
    rememberDay(plan);
    var nextIdx = -1;
    plan.forEach(function (it, i) { if (nextIdx < 0 && isRequiredStop(it) && !stoneDone(it)) nextIdx = i; });
    var doneN = plan.filter(stoneDone).length;
    var sky = skyOf(), season = seasonOf(), bday = isBirthdayMonth(p.id), magic = isLittleBand();
    var line = nextIdx < 0 ? "You did ALL your stones today, " + p.label + "! Hoo hoo — you're a star!"
      : bday ? "Happy birthday month, " + p.label + "! 🎂 Tap the big button!"
      : sky === "night" ? "It's almost sleepy time, " + p.label + ". One more stone?"
      : sky === "dawn" ? "Good morning, " + p.label + "! Tap the big button — let's go!"
      : "Hi " + p.label + "! Tap the big button — let's go!";
    var doneTitles = plan.filter(stoneDone).map(function (it) { return it.title; });
    var ps = magic ? updatePet(p.id, doneTitles) : null;
    var party = magic && nextIdx < 0 && plan.length && partyOnce(p.id);
    var HG = window.HootGames, bye = nextIdx < 0 && plan.length && HG && HG.songs.some(function (x) { return x.key === "song-goodbye"; });
    /* on party day Hoot says "You did all your stones today" with the child's name first, then the goodbye song */
    if (bye) setTimeout(function () { maybeGoodbye(p.id); }, party ? 5200 : 900); /* any redraw during the party waits too */
    /* 3e38: home is ONE path for today and ONE big button. The nest and the
       garden sit under the path as things that grow along the way; Learn and
       Play open when the path is done (a grown-up can change that). */
    var open = playUnlocked(), nx0 = nextIdx >= 0 ? plan[nextIdx] : null;
    var stones = plan.map(function (it, i) {
      var d = stoneDone(it), nx = i === nextIdx;
      return '<li data-title="' + esc(it.title) + '" data-stop="' + esc(it.kind || "") + '"><button type="button" class="kh-stone' + (d ? " done" : "") + (nx ? " next" : "") + '" data-act="play" aria-label="Stop ' + (i + 1) + ": " + esc(it.title) + (d ? " — done" : "") + '">' +
        (nx ? '<span class="kh-here" aria-hidden="true">🦉</span>' : "") +
        '<span class="kh-emo" aria-hidden="true">' + (d ? stickerFor(it.title) : esc(it.emo || "⭐")) + "</span>" +
        '<b class="kh-t">' + esc(it.title) + "</b>" + (d ? '<span class="kh-tick" aria-hidden="true">✓</span>' : "") + "</button></li>";
    }).join("");
    var goHtml = nx0
      ? '<div class="kh-gowrap" data-title="' + esc(nx0.title) + '" data-stop="' + esc(nx0.kind || "") + '"><button type="button" class="kh-gobtn" data-act="play" aria-label="Go: ' + esc(nx0.title) + '"><span class="kh-goemo" aria-hidden="true">' + esc(nx0.emo || "⭐") + '</span><b>Go!</b><i aria-hidden="true">▶</i></button></div>'
      : '<div class="kh-alldone" role="status"><span aria-hidden="true">🎉</span><b>All done for today!</b></div>';
    var lockBtn = function (emo, label, color) { return '<button type="button" class="kh-big locked" data-kh="locked" style="--b:' + color + '" aria-label="' + label + ' opens when today\'s path is done"><span aria-hidden="true">' + emo + '</span><b>' + label + '</b><i class="kh-lock" aria-hidden="true">🔒</i></button>'; };
    var html = '<div class="ll-kidbar" id="ll-kidbar">' + kidbarHtml() + "</div>" +
      '<section class="kh-hero' + (magic ? " sky-" + sky + " season-" + season : "") + '">' + (magic ? decorHtml(season) + (sky === "night" ? '<span class="kh-moon" aria-hidden="true">🌙</span>' : "") + (bday ? '<span class="kh-balloons" aria-hidden="true">🎈🎈</span>' : "") : "") +
      '<button type="button" class="kh-hoot' + (sky === "night" && magic ? " sleepy" : "") + '" data-kh="hoot" aria-label="Say hello to Hoot">' + brownHootFace() + (magic ? (bday ? PARTY_HAT : sky === "night" ? NIGHT_CAP : "") : "") + "</button>" +
      '<p class="kh-bubble">' + esc(line) + "</p>" + (bye ? HG.songBtn({ key: "song-goodbye", title: "Goodbye song", emo: "👋" }, "pg-songbtn kh-bye") : "") + "</section>" +
      (party ? '<div class="kh-party" aria-hidden="true">' + confettiHtml(28) + '<span class="kh-fly">🦉</span></div>' : "") +
      '<div class="kh-pathwrap"><ol class="kh-path kh-trail' + (plan.length > 5 ? " kh-wrap" : "") + '" style="--n:' + plan.length + '" aria-label="Today\'s path: ' + doneN + " of " + plan.length + ' stops done">' + stones + "</ol>" +
      goHtml + "</div>" +
      (magic ? '<div class="kh-along">' + nestHtml(p, ps) + gardenHtml(p) + "</div>" : "") +
      '<div class="kh-big3' + (open ? "" : " is-locked") + '">' +
        (open ? '<button type="button" class="kh-big" data-kh-go="learn" style="--b:#1B7A34"><span aria-hidden="true">🌱</span><b>Learn</b></button>' : lockBtn("🌱", "Learn", "#1B7A34")) +
        (open ? '<button type="button" class="kh-big" data-kh-go="games" style="--b:#1D4ED8"><span aria-hidden="true">🎮</span><b>Play</b></button>' : lockBtn("🎮", "Play", "#1D4ED8")) +
        '<button type="button" class="kh-big" data-kh-go="stickers" style="--b:#BE185D"><span aria-hidden="true">📒</span><b>Stickers</b></button>' +
      "</div>" +
      (magic ? storyBtnHtml(sky) : "");
    html += msShowHtml(); /* Morning Show (2026-11-17): today's show + past shows */
    var extrasHtml = waveTodayHtml() + wc2TodayHtml() + we1TodayHtml() + we2TodayHtml();
    if (magic) {
      /* Wave 2 (Finding 1): tuck grown-up / secondary cards behind one toggle on 2-4 Kid Home
         so the pulsing Go! button remains the ONE unmistakable focal action. */
      html += '<details class="kh-morewrap"><summary class="kh-morebtn">✨ More for grown-ups &amp; extras</summary><div class="kh-morebody">' + extrasHtml + "</div></details>";
      magicSound(p, ps, party, nextIdx >= 0);
    } else {
      html += extrasHtml;
    }
    return html;
  }
  /* --- 3e35: bedtime stories (Muse recorded A–E). Any time from Home; the
     button glows in the evening. Letter of the week picks the story. --- */
  var STORIES = {
    a: { title: "Annie the Ant's Apple", pic: "🐜🍎" },
    b: { title: "Benny the Bear's Blanket", pic: "🐻🛏️" },
    c: { title: "Coco the Cat and the Moon", pic: "🐱🌙" },
    d: { title: "Daisy the Duck by the Pond", pic: "🦆✨" },
    e: { title: "Eli the Elephant's Echo", pic: "🐘🌄" }
  };
  function storyBtnHtml(sky) {
    var ev = sky === "night" || sky === "dusk";
    return '<button type="button" class="kh-story' + (ev ? " glow" : "") + '" data-kh="story"><span aria-hidden="true">🌙</span><b>Story time</b></button>';
  }
  function storyPick() {
    var w = ""; try { w = window.__llLetterOfWeek ? window.__llLetterOfWeek() : ""; } catch (e) {}
    if (STORIES[w]) return w;
    var keys = Object.keys(STORIES); return keys[new Date().getDate() % keys.length];
  }
  var storyA = null, storyPoolEl = null;
  function stopStory() { if (storyA) { storyA.__govWait = false; storyA.__govNext = null; try { storyA.pause(); } catch (e) {} storyA.onended = null; storyA = null; } var b = document.querySelector(".st-play"); if (b) { b.textContent = "▶ Play the story"; b.classList.remove("on"); } var st = document.querySelector(".st-stage"); if (st) st.classList.remove("playing"); }
  function playStory(k, withIntro) {
    stopStory();
    var b = document.querySelector(".st-play"), st = document.querySelector(".st-stage");
    if (b) { b.textContent = "⏸ Pause"; b.classList.add("on"); } if (st) st.classList.add("playing");
    var list = (withIntro ? ["story-intro"] : []).concat(["story-" + k]), i = 0;
    (function next() {
      if (i >= list.length) { stopStory(); return; }
      if (!storyPoolEl) storyPoolEl = new Audio();
      var a = storyA = storyPoolEl; a.__govWait = false; a.__govNext = null; a.onended = null;
      try { a.pause(); } catch (e) {}
      a.src = "assets/voice/" + list[i++] + ".mp3";
      a.onended = function () { if (storyA === a) next(); };
      var pr = a.play(); if (pr && pr.catch) pr.catch(function () { if (storyA === a) stopStory(); });
    })();
  }
  function storyHtml(k) {
    var S = STORIES[k];
    return '<div class="st" data-story-on="' + k + '"><div class="st-stage"><span class="st-pic" aria-hidden="true">' + S.pic + '</span><span class="st-stars" aria-hidden="true">✦ ✧ ✦</span></div>' +
      '<h3 class="st-title">' + esc(S.title) + "</h3>" +
      '<button type="button" class="st-play" data-st="toggle">▶ Play the story</button>' +
      '<p class="st-more">More stories</p><div class="st-chips">' + Object.keys(STORIES).map(function (x) {
        return '<button type="button" class="st-chip' + (x === k ? " on" : "") + '" data-story="' + x + '"><span aria-hidden="true">' + STORIES[x].pic.slice(0, 2) + "</span><b>" + x.toUpperCase() + "</b></button>";
      }).join("") + "</div></div>";
  }
  /* Wave B (B7): sticker slots are real buttons — a tap pops the slot and
     Hoot reacts: a giggle for an earned sticker, "keep going" for a ?. */
  document.addEventListener("click", function (e) {
    var s = e.target.closest && e.target.closest(".kh-slot");
    if (!s || !s.closest("#ll-obody")) return;
    s.classList.remove("kh-pop"); void s.offsetWidth; s.classList.add("kh-pop");
    sayClip(s.classList.contains("got") ? "hoot-giggle" : "hoot-keep-going");
  });
  /* the story screen lives in the overlay, outside #ll-app, so it listens on its own */
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-story],[data-st]");
    if (!t || !t.closest("#ll-obody")) return;
    if (t.getAttribute("data-story")) { openStory(t.getAttribute("data-story")); return; }
    if (storyA) stopStory(); else { var on = document.querySelector("[data-story-on]"); if (on) playStory(on.getAttribute("data-story-on"), false); }
  });
  function openStory(k) {
    k = STORIES[k] ? k : storyPick();
    nextView = { kind: "story", key: k, title: "Story time" };
    stopStory(); try { if (window.HootGames) window.HootGames.stopSing(); } catch (e) {}
    openShellOverlay("Story time", storyHtml(k));
    playStory(k, true);
  }
  /* one Hoot line per Home visit for the magic (never on a plain redraw) */
  function magicSound(p, ps, party, hasNext) {
    var nk = nameKeyOf(p), clip = null;
    if (party === "new") clip = nk ? "all-done-" + nk : "party-time";
    else if (ps && ps.isNew) clip = { hatch: "egg-hatch", grown: "pet-grown", grew: "pet-grew" }[ps.ev];
    else if (ps && ps.gained && ps.s.egg) clip = ps.s.egg.warm >= HATCH * 0.8 ? "egg-almost" : "egg-warm";
    if (!clip && gardenJustGrew) clip = "garden-new";
    if (!clip && ps && ps.firstEgg) clip = "egg-hello";
    if (!clip && hasNext && !state._saidTapBig && !(window.__hwLastGreetAt && Date.now() - window.__hwLastGreetAt < 8000) && window.HOOT_HAVE && window.HOOT_HAVE["hoot-tap-big-btn"]) {
      state._saidTapBig = true;
      clip = "hoot-tap-big-btn";
    }
    if (clip) setTimeout(function () { if (state.tab === "today") sayClip(clip); }, 700);
    return clip;
  }
  function stickerBook() {
    var all = [];
    (LESSONS.little || []).forEach(function (l) { all.push({ title: l.title, done: lessonDone(l.title) }); });
    ["letters", "basics", "world"].forEach(function (pid) { hlLessons(pid).forEach(function (l) { all.push({ title: l.title, done: lessonDone(l.title) }); }); });
    var got = all.filter(function (x) { return x.done; }).length;
    return '<div class="kh-book"><p class="kh-booklead">' + got + " of " + all.length + " stickers — finish a lesson to win its sticker!</p>" +
      '<p class="wc-progmap"><button type="button" class="ll-btn sm" data-wc-map="1">🗺️ World map — see your whole journey</button> <button type="button" class="ll-btn sm" data-we2-garden="1">🌸 Oops Garden</button></p>' +
      '<div class="kh-slots">' + all.map(function (x) {
        return '<button type="button" class="kh-slot' + (x.done ? " got" : "") + '"><span aria-hidden="true">' + (x.done ? stickerFor(x.title) : "?") + "</span><small>" + esc(x.title) + "</small></button>";
      }).join("") + "</div></div>";
  }
  var BYE_KEY = "hootworld.bye.v1";
  function maybeGoodbye(pid) {
    if (state.tab !== "today" || !state.profile || state.profile.id !== pid || document.body.classList.contains("ll-overlay-open")) return;
    var d = {}, today = new Date().toDateString();
    try { d = JSON.parse(localStorage.getItem(BYE_KEY) || "{}") || {}; } catch (e) {}
    if (d[pid] === today) return;
    d[pid] = today; try { localStorage.setItem(BYE_KEY, JSON.stringify(d)); } catch (e) {}
    var b = document.querySelector(".kh-bye"); if (window.HootGames) window.HootGames.sing("song-goodbye", b);
  }
  var sayClipEl = null, sayClipPoolEl = null;
  function stopSayClip() { if (sayClipEl) { sayClipEl.__govWait = false; sayClipEl.__govNext = null; sayClipEl.onended = sayClipEl.onerror = null; try { sayClipEl.pause(); } catch (e) {} sayClipEl = null; } }
  function sayClip(k) { try { stopSayClip(); if (!sayClipPoolEl) sayClipPoolEl = new Audio(); var a = sayClipEl = sayClipPoolEl; a.__govWait = false; a.__govNext = null; a.src = "assets/voice/" + k + ".mp3"; a.onended = a.onerror = function () { if (sayClipEl === a) sayClipEl = null; }; var pr = a.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {} }
  /* a game / shelf / outdoor stone counts as done once the child has been in it and comes back */
  function finishPendingStone() {
    var t = state.pendingStone; state.pendingStone = null;
    if (!t) return;
    var it = null; currentPlan().forEach(function (x) { if (x.title === t) it = x; });
    if (it && it.kind !== "lesson" && it.kind !== "custom") markDone(t, true);
    if (state.tab === "today") render();
  }

  var CLASS_KEY = "hootworld.class.v1";
  var TOPIC_WORDS = [
    [/ratio|rate|per |unit price|proportion/, ["Unit rates: the price of ONE", "Ratios: scale both sides"]],
    [/percent|%|tax|tip|discount/, ["Percentages: parts of 100"]],
    [/negative|integer|number line|rational/, ["Negative numbers on the number line"]],
    [/equation|solve|variable|algebra|inequal/, ["Two-step equations: unwrap x"]],
    [/main idea|central idea|summar|evidence|cite/, ["Main idea & citing evidence"]],
    [/argument|claim|essay|persuasive|reason/, ["Argument writing: claim, evidence, reasoning", "Make a claim — bring evidence"]],
    [/photosynth|plant|energy|matter|cell/, ["Photosynthesis: matter & energy in plants"]],
    [/ecosystem|food web|food chain|hudson|habitat/, ["Ecosystems: the Hudson River food web"]],
    [/constitution|articles|government|founding|revolution|colon/, ["From the Articles to the Constitution"]],
    [/research|source|internet|fact.?check/, ["Research you can trust"]],
    [/present|speech|slides/, ["Present: hook, build, land"]],
    [/budget|money|cost/, ["Budget the project"]]
  ];
  function classTopic() { try { var d = JSON.parse(localStorage.getItem(CLASS_KEY) || "{}") || {}; var e = d[state.profile.id]; return e && e.week === weekKey() ? e.text : ""; } catch (e) { return ""; } }
  function setClassTopic(t) { try { var d = JSON.parse(localStorage.getItem(CLASS_KEY) || "{}") || {}; d[state.profile.id] = { week: weekKey(), text: t }; localStorage.setItem(CLASS_KEY, JSON.stringify(d)); } catch (e) {} }
  function matchTopic(text) {
    var t = (text || "").toLowerCase(), out = [];
    var mine = {}; pathsFor(state.profile.id).forEach(function (p) { (LESSONS[p.id] || []).forEach(function (l) { mine[l.title] = l; }); });
    TOPIC_WORDS.forEach(function (row) { if (row[0].test(t)) row[1].forEach(function (title) { if (mine[title] && out.indexOf(title) < 0) out.push(title); }); });
    var h = HL();
    ["math7", "ela7", "sci7", "ss7"].forEach(function (cid) { if (h && h.paths[cid] && pathsFor(state.profile.id).some(function (p) { return p.id === cid; })) {
      h.paths[cid].lessons.forEach(function (id) { var x = h.byId[id]; if (x.topic && x.topic.test(t) && out.indexOf(x.title) < 0) { out.push(x.title); mine[x.title] = { title: x.title, emo: x.emo, color: x.color }; } });
    } });
    return out.slice(0, 6).map(function (x) { return mine[x]; });
  }
  function classBoxHtml() {
    var cur = classTopic(), m = cur ? matchTopic(cur) : [];
    var chips = ["equations", "circles", "percent", "probability", "CER", "cells", "Constitution", "Revolution"];
    return '<section class="ll-card ll-classbox"><h2 class="cb-h">This week in class</h2>' +
      '<form class="cb-form" data-cb="1"><label class="cb-lab" for="cb-in">What is your class working on? Pick a topic or type one — your tutor lines up practice for it.</label>' +
      '<div class="cb-row"><input id="cb-in" name="t" maxlength="80" placeholder="e.g. ratios, the Constitution, writing an argument" value="' + esc(cur) + '"><button type="submit" class="ll-btn pri">Save</button></div>' +
      '<div class="cb-chips">' + chips.map(function (c) { return '<button type="button" class="cb-chip' + (cur.toLowerCase() === c.toLowerCase() ? " on" : "") + '" data-cb-chip="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + "</div></form>" +
      (cur ? (m.length
        ? '<p class="cb-res">Your tutor\'s practice for <b>' + esc(cur) + "</b>:</p><div class=\"ll-grid\">" + m.map(function (l) { return actCard({ kind: "lesson", title: l.title, emo: l.emo, tags: ["This week"], color: l.color, blurb: "Matches what your class is covering." }); }).join("") + "</div>"
        : '<p class="cb-res">No lesson matches <b>' + esc(cur) + "</b> yet. Try one of the topic chips above or browse Learn.</p>") : "") +
      "</section>";
  }

  function renderToday() {
    if (isKidBand()) return renderKidHome();
    if (isTeen()) return renderTeenToday();
    var p = state.profile;
    var plan = currentPlan();
    var doneN = plan.filter(function (it) { return isDone(it.title); }).length;
    var pct = Math.round((doneN / Math.max(plan.length, 1)) * 100);
    /* 3e60: this meter always said "0 of 4 h" — nothing ever added to it. It now adds up the
       time today's finished lessons and played games took (from the activity log). */
    var todayMs = 0;
    try { var d0 = new Date(); d0.setHours(0, 0, 0, 0); (logLoad()[p.id] || []).forEach(function (e) { if (e.t >= d0.getTime() && e.ms > 0) todayMs += Math.min(e.ms, 3 * 3600000); }); } catch (err) {}
    var mins = Math.round(todayMs / 60000);
    var hours = mins < 60 ? mins + " min" : (Math.round(mins / 6) / 10) + " h";
    var pHours = Math.min(100, Math.round((todayMs / ((p.hourGoal || 1) * 3600000)) * 100));
    var cfgNow = childCfg(p.id);
    var greet = isTeen()
      ? (cfgNow.mode === "school" ? "Practice what you're covering in class. Stuck on homework? Your tutor explains it a different way." : "Here's your plan for today. Stuck on something? Your tutor explains it a different way.")
      : "Hoo hoo! Ready to play, " + p.label + "?";
    return (
      '<div class="ll-kidbar" id="ll-kidbar">' + kidbarHtml() + "</div>" +
      '<section class="ll-card ll-hero" style="--k:' + p.color + '">' +
      '<div class="big" aria-hidden="true">' + brownHootFace() + "</div>" +
      '<div class="htxt">' +
      "<h2>Hi " + esc(p.label) + "!</h2>" +
      '<p class="hoot-line">' + esc(greet) + "</p>" +
      '<div class="ll-prog" aria-label="Today\'s progress"><i style="width:' + pct + '%"></i></div>' +
      "<small>" + doneN + " of " + plan.length + " done</small>" +
      '<div class="ll-d4" role="img" aria-label="Time on Hoot today: ' + hours + " of a " + (p.hourGoal || 1) + ' hour day" style="--p:' + pHours + '%">' +
      '<span class="tl">Today: ' + hours + " of " + (p.hourGoal || 1) + " h</span>" +  /* e.g. "Today: 12 min of 4 h" */
      '<span class="split">' + (isTeen() ? "Learn · Practice · Break" : "Learn · Play · Rest") + '</span>' +
      "</div></div></section>" +
      '<div class="todoh-row">' +
      (isTeen()
        ? '<h2 class="todoh">Today\'s plan <span class="muted">' + doneN + " of " + plan.length + " done</span></h2>" +
          '<button type="button" class="ni-top" id="ll-newideas">Shuffle plan</button>'
        : '<h2 class="todoh">Let\'s play! <span class="muted">' + plan.length + " to do</span></h2>" +
          '<button type="button" class="ni-top" id="ll-newideas">🔀 New ideas</button>') +
      "</div>" +
      '<div class="ll-grid">' + plan.map(actCard).join("") + "</div>" +
      (isTeen() && cfgNow.mode === "school" ? classBoxHtml() : "") +
      waveTodayHtml() + wc2TodayHtml() + /* Wave C1: daily pick, Right Now chips, world map entry; Wave C2: missions entry */
      we1TodayHtml() + /* Wave E1: Morning Hello + photo quest */
      we2TodayHtml() /* Wave E2: Oops Garden + Car mode entries */
    );
  }

  function teenStudyHubHtml() {
    if (!isTeen()) return "";
    var hs = window.HootStudy, hsp = window.HootStudyPro;
    var vCount = hs && hs.getVault ? hs.getVault().length : 0;
    var isDark = document.body.classList.contains("hs-dark") || (hs && hs.isDark && hs.isDark());
    return '<section class="tc-hub" aria-label="Grade 7 Study Tools">' +
      '<div class="tc-hub-head"><b>⚡ Grade 7 NY Study Hub</b><button type="button" class="tc-hub-dark" data-teen-act="dark" aria-pressed="' + (isDark ? "true" : "false") + '">' + (isDark ? "☀️ Light Mode" : "🌙 Focus Dark") + "</button></div>" +
      '<div class="tc-hub-grid tc-hub-4">' +
        '<button type="button" class="tc-hub-btn pri" data-teen-act="test-math"><span class="th-ic" aria-hidden="true">📝</span><span><b>NY Math Practice Test</b><small>10 problems · Standards breakdown</small></span></button>' +
        '<button type="button" class="tc-hub-btn" data-teen-act="test-all"><span class="th-ic" aria-hidden="true">🌐</span><span><b>All-Subjects Mock Exam</b><small>Math · ELA · Science · SS</small></span></button>' +
        '<button type="button" class="tc-hub-btn" data-teen-act="flashcards"><span class="th-ic" aria-hidden="true">⚡</span><span><b>Quick Flip Flashcards</b><small>32 NY Grade 7 3D study cards</small></span></button>' +
        '<button type="button" class="tc-hub-btn vault" data-teen-act="vault"><span class="th-ic" aria-hidden="true">🎯</span><span><b>Mistake Vault <span class="tc-vbadge"' + (vCount ? "" : ' data-zero="1"') + ">" + vCount + '</span></b><small>' + (vCount ? "Clear missed quiz items" : "All clear right now!") + "</small></span></button>" +
      "</div>" +
      (hsp && hsp.focusBarHtml ? hsp.focusBarHtml() : "") +
      "</section>";
  }

  /* 3e38: ages 11+ get a plain checklist for today and progress per course.
     Same plan underneath; a different skin, with Hoot as a small mark. */
  function renderTeenToday() {
    var p = state.profile, plan = currentPlan(), cfgNow = childCfg(p.id);
    rememberDay(plan);
    var doneN = plan.filter(stoneDone).length, pct = Math.round((doneN / Math.max(plan.length, 1)) * 100);
    var when = ""; try { when = new Date().toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" }); } catch (e) {}
    var nextIdx = -1; plan.forEach(function (it, i) { if (nextIdx < 0 && !stoneDone(it)) nextIdx = i; });
    var rows = plan.map(function (it, i) {
      var d = stoneDone(it), tag = (it.tags || [])[0] || (it.kind === "game" ? "Break" : "Lesson");
      return '<li class="tc-row' + (d ? " done" : "") + (i === nextIdx ? " next" : "") + '" data-title="' + esc(it.title) + '" data-stop="' + esc(it.kind || "") + '" style="--dc:' + (it.color || "#0B5E43") + '">' +
        '<button type="button" class="ll-chk tc-chk' + (d ? " on" : "") + '" aria-pressed="' + d + '" aria-label="Mark ' + esc(it.title) + ' done">' + (d ? "✓" : "") + "</button>" +
        '<div class="tc-main"><span class="tc-tag">' + esc(tag) + "</span><b>" + esc(it.title) + "</b><small>" + esc(it.blurb || "") + "</small></div>" +
        (it.kind === "custom" ? "" : '<button type="button" class="ll-btn ' + (i === nextIdx ? "pri" : "") + ' tc-go" data-act="play">' + (d ? "Again" : it.kind === "game" ? "Take a break" : "Start") + "</button>") + "</li>";
    }).join("");
    var courses = pathsFor(p.id).map(function (c) {
      var ls = LESSONS[c.id] || hlLessons(c.id); if (!ls.length) return "";
      var dn = ls.filter(function (l) { return lessonDone(l.title); }).length, w = Math.round(dn / ls.length * 100);
      return '<button type="button" class="tc-course" data-path="' + esc(c.id) + '"><span class="tc-cemo" aria-hidden="true">' + esc(c.emo || "📘") + '</span><span class="tc-cname">' + esc(c.title) + '</span><span class="tc-bar" aria-hidden="true"><i style="width:' + w + '%"></i></span><span class="tc-cnum">' + dn + " of " + ls.length + "</span></button>";
    }).join("");
    return '<div class="ll-kidbar" id="ll-kidbar">' + kidbarHtml() + "</div>" +
      '<section class="tc-head"><span class="tc-mark" aria-hidden="true">' + brownHootFace() + '</span>' +
      '<div class="tc-htxt"><h2>Today</h2><p>' + esc(when) + " · " + (doneN === plan.length && plan.length ? "all done" : doneN + " of " + plan.length + " done") + "</p></div>" +
      '<div class="tc-ring" style="--p:' + pct + '" role="img" aria-label="' + pct + ' percent of today done"><b>' + pct + "%</b></div></section>" +
      teenStudyHubHtml() +
      tutExpTodayHtml() + /* Fix pass 10: Today's 15 minutes sits at the TOP of her Today, not the bottom */
      '<ol class="tc-list" aria-label="Today\'s checklist">' + rows + "</ol>" +
      '<p class="tc-tools"><button type="button" class="ni-top" id="ll-newideas">Shuffle plan</button><span>' + esc(cfgNow.mode === "school" ? "Practice what you're covering in class." : "Stuck? Open the lesson and your tutor explains it another way.") + "</span></p>" +
      (courses ? '<h3 class="tc-h">Courses</h3><div class="tc-courses">' + courses + "</div>" : "") +
      classBoxHtml();
  }

  function kidbarHtml() {
    return PROFILES.map(function (p) {
      var on = state.profile && state.profile.id === p.id ? " on" : "";
      return '<button type="button" data-kid="' + p.id + '" class="' + on + '" style="--k:' + p.color + '"><span class="av">' + p.emoji + "</span> " + esc(p.label) + "</button>";
    }).join("");
  }

  function brownHootFace() {
    /* Muse's Animal Homes / Learn-tutor owl. One Hoot for the whole app (3e17). */
    return '<svg viewBox="0 0 200 210" width="100%" height="100%" aria-hidden="true"><path d="M82 178 L100 205 L118 178 Z" fill="#8a5a33"/><ellipse class="wing-l" cx="34" cy="128" rx="17" ry="40" fill="#8a5a33" transform="rotate(14 34 128)"/><ellipse class="wing-r" cx="166" cy="128" rx="17" ry="40" fill="#8a5a33" transform="rotate(-14 166 128)"/><ellipse cx="100" cy="118" rx="66" ry="72" fill="#a06a3b"/><ellipse cx="100" cy="140" rx="44" ry="46" fill="#fdeed3"/><path d="M52 44 Q40 14 62 22 Q74 27 70 48 Z" fill="#8a5a33"/><path d="M148 44 Q160 14 138 22 Q126 27 130 48 Z" fill="#8a5a33"/><circle cx="100" cy="72" r="52" fill="#a06a3b"/><ellipse cx="78" cy="74" rx="24" ry="26" fill="#fdeed3"/><ellipse cx="122" cy="74" rx="24" ry="26" fill="#fdeed3"/><g class="eyes"><circle cx="78" cy="72" r="11" fill="#17324f"/><circle cx="122" cy="72" r="11" fill="#17324f"/><circle cx="82" cy="68" r="4" fill="#fff"/><circle cx="126" cy="68" r="4" fill="#fff"/></g><circle cx="56" cy="94" r="8" fill="#ffb59d" opacity=".85"/><circle cx="144" cy="94" r="8" fill="#ffb59d" opacity=".85"/><path class="beak" d="M90 88 Q100 84 110 88 Q106 102 100 104 Q94 102 90 88 Z" fill="#ff9f1c" stroke="#e07f00" stroke-width="1.5"/><path d="M84 132 q6 6 12 0 M104 132 q6 6 12 0 M94 148 q6 6 12 0" stroke="#d9b98a" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M76 190 q-8 8 -14 6 M76 190 q-2 10 -8 12 M124 190 q8 8 14 6 M124 190 q2 10 8 12" stroke="#ff9f1c" stroke-width="5" fill="none" stroke-linecap="round"/></svg>';
  }


  /* 3e25: Hoot's picks first (one strong game per skill); the rest under "More games". */
  var PICKS = ["pizza", "rocket", "balloon", "fishing", "bubblepop", "splash", "shapes", "memory", "animals", "feed", "peek", "piano", "paint"];
  function renderGames() {
    if (!hasGames()) return renderPractice();
    var card = function (g) {
      return '<button type="button" class="gcard" data-game="' + g.key + '" style="--k:' + (g.color || "#ffe08a") + '">' + gameThumb(g.key, g.emo) + "<b>" + esc(g.title) + "</b><small>" + esc(g.cat) + "</small></button>";
    };
    var picks = PICKS.map(function (k) { return GAMES.filter(function (g) { return g.key === k; })[0]; }).filter(Boolean);
    var more = GAMES.filter(function (g) { return PICKS.indexOf(g.key) === -1; });
    var party = (window.HootGames ? window.HootGames.list : []).map(function (g) {
      return '<button type="button" class="gcard pgcard" data-pgame="' + g.key + '"><span class="pg-ico" aria-hidden="true">' + g.emo + "</span><b>" + esc(g.title) + "</b><small>New · with Hoot</small></button>";
    }).join("");
    var songs = ""; /* Dawid ruling: remove Sing with Hoot */
    var cards = (party ? '<h2 class="pg-rowh">🎉 Hoot\'s Party Games</h2><div class="pg-row">' + party + "</div>" + songs + '<h2 class="pg-rowh">Hoot\'s picks</h2><div id="gameGridPicks" class="pg-grid">' : "") + picks.map(card).join("") + (party ? "</div>" : "") +
      '<details class="ll-moregames"' + (state.moreGames ? " open" : "") + '><summary>More games (' + more.length + ')</summary><div id="gameGridMore">' + more.map(card).join("") + "</div></details>";
    return '<div class="ll-kidbar">' + kidbarHtml() + '</div><section class="ll-card ll-hero" style="--k:' + state.profile.color + '"><div class="big">' + brownHootFace() + '</div><div class="htxt"><h2>Hoot\'s Games</h2><p class="hoot-line">Pick a game — they all open here, inside Hoot\'s World.</p></div></section><div id="gameGrid">' + cards + "</div>" + wc2MissionsEntryHtml() + we2CarEntryHtml(); /* Wave E2: car mode entry */
  }

  function renderLearn() {
    var paths = pathsFor(state.profile.id);
    /* engine paths (Letters, Basics) are opened from their path card */
    var lessons = [];
    paths.forEach(function (p) { (LESSONS[p.id] || (/^(math7|ela7|sci7|ss7)$/.test(p.id) ? hlLessons(p.id) : [])).forEach(function (l) { lessons.push(Object.assign({ path: p.title, pathId: p.id, kind: "lesson" }, l)); }); });
    var pathHtml = paths.map(function (p) {
      return '<button type="button" class="ll-pathcard" data-path="' + esc(p.id) + '"><span class="emo" aria-hidden="true">' + p.emo + '</span><b>' + esc(p.title) + "</b><small>" + p.count + " lessons · " + (isTeen() ? "Open" : "Play") + "</small></button>";
    }).join("");
    var cards = lessons.map(function (l) {
      var raw = actCard({ kind: "lesson", title: l.title, emo: l.emo, tags: (l.tags || []).concat([l.path]), color: l.color, blurb: l.blurb || (isTeen() ? "Your tutor explains it, shows a worked example, you practise, then a short quiz." : "Open this lesson with the owl tutor.") });
      if (!isTeen()) return raw;
      return raw.replace("<article ", '<article data-lsubj="' + esc(l.pathId || "") + '" data-lq="' + esc((l.title + " " + (l.tags || []).join(" ") + " " + (l.path || "")).toLowerCase()) + '" ');
    }).join("");
    var filterBar = isTeen()
      ? '<div class="ln-tools" role="search">' +
          '<input type="search" id="ll-learn-search" class="ln-search" placeholder="🔍 Search Grade 7 lessons, standards, or topics (e.g. circles, 7.EE, CER, cells)…">' +
          '<div class="ln-pills" role="tablist" aria-label="Filter lessons by subject">' +
            '<button type="button" class="ln-pill on" data-learn-f="all">All (' + lessons.length + ")</button>" +
            '<button type="button" class="ln-pill" data-learn-f="math7">📐 Math</button>' +
            '<button type="button" class="ln-pill" data-learn-f="ela7">📚 English</button>' +
            '<button type="button" class="ln-pill" data-learn-f="sci7">🔬 Science</button>' +
            '<button type="button" class="ln-pill" data-learn-f="ss7">🗽 History</button>' +
            '<button type="button" class="ln-pill" data-learn-f="todo">✨ Not done yet</button>' +
          "</div></div>"
      : "";
    return '<div class="ll-kidbar">' + kidbarHtml() + "</div>" +
      (isTeen()
        ? '<section class="ll-card ll-hero"><div class="htxt"><h2>Your courses</h2><p class="hoot-line">' + esc(bandLabel(curBand())) + " · " + esc(childCfg(state.profile.id).state) + '. Each lesson: explanation, live visuals, guided practice, and mastery quiz.</p></div></section>'
        : '<section class="ll-card ll-hero" style="--k:#0A7E57"><div class="big" aria-hidden="true">🌱</div><div class="htxt"><h2>Learn</h2><p class="hoot-line">Pick a path — Hoot teaches out loud, then you try.</p></div></section>') +
      '<div id="learnGrid">' + pathHtml + "</div>" +
      filterBar +
      '<div class="todoh-row"><h2 class="todoh">' + (isTeen() ? "All lessons" : "Lessons") + '</h2></div><div class="ll-grid" id="ll-learn-list">' + cards + "</div>";
  }

  /* 3e20: older kids are learning-focused — no games. Practice is built from
     what this child actually did: topics Hoot had to re-teach come first,
     then finished lessons to review so they stick. */
  function practiceData() {
    var need = {};
    try { need = (JSON.parse(localStorage.getItem("hootworld.nyneed.v1") || "{}") || {})[state.profile.id] || {}; } catch (e) {}
    var nyIdx = {};
    $$("#ny-creator-wrap .ny-lsn").forEach(function (c, i) { var h = c.querySelector("h4"); if (h) nyIdx[h.textContent.trim()] = i; });
    var needs = [], fresh = [], todo = [];
    pathsFor(state.profile.id).forEach(function (p) {
      (LESSONS[p.id] || hlLessons(p.id)).forEach(function (l) {
        var done = lessonDone(l.title);
        if (p.id === "ny" && need[nyIdx[l.title]]) needs.push(l.title);
        else if (done) fresh.push(l.title);
        else todo.push(l.title);
      });
    });
    return { needs: needs, fresh: fresh, todo: todo };
  }
  function practiceItem(t, note, emo, color) {
    return actCard({ kind: "lesson", title: t, emo: emo, tags: [note], color: color, blurb: note === "Re-teach" ? (isTeen() ? "Your tutor had to explain this a second way. Run it again until it feels easy." : "Hoot had to explain this a second way. Run it again until it feels easy.") : note === "Review" ? "Done once — a quick second pass makes it stick." : "Next up on your path." });
  }
  function renderPractice() {
    var d = practiceData();
    var sec = function (title, items, note, emo, color) {
      if (!items.length) return "";
      return '<div class="todoh-row"><h2 class="todoh">' + title + ' <span class="muted">' + items.length + "</span></h2></div>" +
        '<div class="ll-grid">' + items.slice(0, 6).map(function (t) { return practiceItem(t, note, emo, color); }).join("") + "</div>";
    };
    var body = sec("Needs another look", d.needs, "Re-teach", "🔁", "#B4232C") +
      sec("Keep it fresh", d.fresh, "Review", "✅", "#0B5E43");
    if (!d.needs.length && !d.fresh.length) {
      body = '<section class="ll-card"><p style="margin:0">Nothing to review yet. Finish a lesson and it shows up here — anything Hoot had to re-teach goes to the top.</p></section>' +
        sec("Start here", d.todo.slice(0, 2), "Next", "▶", "#3A56D4");
    }
    var prog = pathsFor(state.profile.id).map(function (p) {
      var ls = LESSONS[p.id] || hlLessons(p.id), dn = ls.filter(function (l) { return lessonDone(l.title); }).length, pc = Math.round(100 * dn / Math.max(1, ls.length));
      return '<div class="pp-row"><span class="pp-t">' + esc(p.title) + '</span><span class="pp-bar" role="progressbar" aria-valuenow="' + pc + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + pc + '%"></i></span><span class="pp-n">' + dn + " / " + ls.length + "</span></div>";
    }).join("");
    body = '<section class="ll-card ll-progress"><h2 class="cb-h">Your progress</h2>' + prog + (isTeen() ? "" : '<p class="wc-progmap"><button type="button" class="ll-btn sm" data-wc-map="1">🗺️ See it on the world map</button> <button type="button" class="ll-btn sm" data-we2-garden="1">🌸 Oops Garden</button></p>') + "</section>" + body;
    return '<div class="ll-kidbar">' + kidbarHtml() + '</div>' +
      '<section class="ll-card ll-hero"><div class="htxt"><h2>Practice</h2><p class="hoot-line">Built from your own lessons: tricky topics first, then quick reviews so it sticks.</p></div></section>' + teenStudyHubHtml() + body + (isTeen() ? "" : wc2MissionsEntryHtml() + we2CarEntryHtml()); /* Wave E2: car mode entry */
  }

  function renderReading() {
    /* 3e20: only reading lessons from this child's own paths — a 2-year-old
       was being shown ages 5–18 reading (thesis, research, the Constitution). */
    var band = curBand();
    var prefer = [];
    pathsFor(state.profile.id).forEach(function (p) {
      (LESSONS[p.id] || hlLessons(p.id).slice(0, 6)).forEach(function (l) { if (l.reading || (isTeen() && p.id === "ela7")) prefer.push(Object.assign({ kind: "lesson" }, l)); });
    });
    var cards = prefer.map(function (l) {
      return actCard({ kind: "lesson", title: l.title, emo: l.emo, tags: l.tags, color: l.color, blurb: l.blurb || (isTeen() ? "A Grade 7 reading or writing lesson. Start lesson opens it with your tutor." : "A reading or story lesson. Play now opens the tutor.") });
    }).join("");
    if (isTeen()) {
      var lab = window.HootStudyPro && window.HootStudyPro.readingLabHtml ? window.HootStudyPro.readingLabHtml() : "";
      return '<div class="ll-kidbar">' + kidbarHtml() + "</div>" + lab +
        '<div class="todoh-row"><h2 class="todoh">Grade 7 ELA Reading &amp; Writing Lessons</h2></div><div class="ll-grid">' + cards + "</div>";
    }
    return '<div class="ll-kidbar">' + kidbarHtml() + '</div>' + libSectionHtml() + '<section class="ll-card ll-hero" style="--k:' + state.profile.color + '"><div class="big">📚</div><div class="htxt"><h2>Reading</h2><p class="hoot-line">Letter sounds and listening — Hoot says every word out loud.</p></div></section><div class="ll-grid">' + cards + "</div>";
  }

  function renderMemories() {
    var p = state.profile;
    /* 3e59: this page used to show only photos from an old in-session list, so photos and
       videos saved in Activities (kept on this device) never appeared here, although the
       page said they would. Now it shows the saved Activities media for this child. */
    var css = "width:100%;border-radius:16px;aspect-ratio:1;object-fit:cover;display:block";
    var seen = [], items = [];
    if (!isTeen()) {
      try {
        (activityGroups() || []).forEach(function (g) {
          actMedia(g).forEach(function (fig) {
            if (seen.indexOf(fig) >= 0) return; seen.push(fig);
            items.push({ ts: fig._hwTs || 0, html: fig._hwVideo
              ? '<video src="' + fig._hwUrl + '" muted playsinline preload="metadata" controls style="' + css + '" aria-label="Video of ' + esc(g.title) + '"></video>'
              : '<img src="' + fig._hwUrl + '" alt="Photo of ' + esc(g.title) + '" style="' + css + '">' });
          });
        });
      } catch (err) {}
    }
    items.sort(function (a, b) { return b.ts - a.ts; });
    var grid = items.map(function (x) { return x.html; }).concat(getPhotos(p.id).map(function (u) { return '<img src="' + u + '" alt="" style="' + css + '">'; })).join("");
    var photos = grid
      ? '<div class="ll-grid" style="grid-template-columns:1fr 1fr;gap:10px">' + grid + "</div>"
      : '<p class="hoot-line" style="margin:0">No photos yet. Add a photo or video to an activity in Activities and it shows up here.</p>';
    if (isTeen()) {
      if (window.HootStudyPro && window.HootStudyPro.renderPortfolioHtml) {
        var logs = [];
        try { logs = logLoad()[p.id] || []; } catch (err) {}
        return '<div class="ll-kidbar">' + kidbarHtml() + "</div>" +
          window.HootStudyPro.renderPortfolioHtml(p, {
            lessonsFor: function (cid) { return LESSONS[cid] || hlLessons(cid); },
            isDone: function (title) { return lessonDone(title); },
            logs: logs
          });
      }
      /* fallback if HootStudyPro isn't loaded */
      var fin = [], got = {};
      pathsFor(p.id).forEach(function (pt) {
        (LESSONS[pt.id] || hlLessons(pt.id)).forEach(function (l) { if (!got[l.title] && lessonDone(l.title)) { got[l.title] = 1; fin.push('<li>' + esc(l.title) + ' <small>· ' + esc(pt.title) + "</small></li>"); } });
      });
      return '<div class="ll-kidbar">' + kidbarHtml() + "</div>" +
        '<section class="ll-card ll-hero" style="--k:' + p.color + '"><div class="big">🗂️</div><div class="htxt"><h2>' + esc(p.label) + "'s portfolio</h2><p class='hoot-line'>Every lesson you have finished.</p></div></section>" +
        '<section class="ll-card"><h3 style="margin:0 0 8px">Finished lessons (' + fin.length + ")</h3>" +
        (fin.length ? '<ul style="margin:0;padding-left:20px;line-height:1.6">' + fin.join("") + "</ul>" : '<p class="hoot-line" style="margin:0">Nothing yet. Finish a lesson in Learn and it is listed here.</p>') + "</section>";
    }
    return '<div class="ll-kidbar">' + kidbarHtml() + "</div>" +
      '<section class="ll-card ll-hero" style="--k:' + p.color + '"><div class="big">📸</div><div class="htxt"><h2>' + esc(p.label) + "'s memories</h2><p class='hoot-line'>Photos and stickers from the day\'s play.</p></div></section>" +
      '<section class="ll-card"><h3 style="margin:0 0 10px">Photo memories</h3>' + photos + "</section>" +
      '<section class="ll-card"><h3 style="margin:0 0 8px">My Sticker Book</h3><p>Earn stickers by finishing Today cards. Stars so far: ⭐ ' + state.stars + "</p></section>";
  }

  /* ===== 3e54: Activities — real things to do together, away from the screen.
     This is the one place for "Add a photo or video". Games and lessons have none.
     The list and the photos come from the day plans' photo spots (same on-device
     store and the same Photo memories album), so nothing saved before is lost. */
  var ACT_FOR = { little: ["little", "adv", "ideas"], early: ["early", "adv", "ideas"], quest: ["quest", "adv"], teen: ["teen"], high: ["teen"] };
  function actSlug(t) { return String(t || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
  var _actReg = false;
  function actRegisterAll() {
    var api = window.__hwPhotoAPI, all = window.HW_ACTIVITIES;
    if (_actReg || !api || !api.register || !all) return;
    _actReg = true;
    var seen = {};
    Object.keys(all).forEach(function (bd) {
      all[bd].forEach(function (a) {
        var key = "act:" + actSlug(a.title);
        if (seen[key]) return; seen[key] = 1;
        api.register(key, a.title, a.title + " · Activities", { _age: "pool", _place: a.place, _desc: a.desc, _emo: a.emo, _screen: false });
      });
    });
  }
  /* every activity for this child's age: the big daily pool plus the day-plan ones */
  function activityGroups() {
    var api = window.__hwPhotoAPI;
    if (!api) return [];
    actRegisterAll();
    var band = curBand(), want = ACT_FOR[band] || ["little", "ideas"], byTitle = {}, order = [];
    var spots = {}; api.spots().forEach(function (sp) { spots[sp._key] = sp; });
    var add = function (t, sp, place, desc, emo) {
      if (!byTitle[t]) { byTitle[t] = { title: t, key: sp._key, place: place, desc: desc, emo: emo, spots: [] }; order.push(t); }
      byTitle[t].spots.push(sp);
      if (place === "outdoor") byTitle[t].place = "outdoor";
    };
    var season = window.HW_SEASON ? window.HW_SEASON() : null;
    ((window.HW_ACTIVITIES || {})[band] || []).forEach(function (a) {
      if (a.season && season && a.season !== season) return; /* snow in winter, leaves in autumn */
      var sp = spots["act:" + actSlug(a.title)];
      if (sp) add(a.title, sp, a.place, a.desc, a.emo);
    });
    api.spots().forEach(function (sp) {
      if (sp._screen || want.indexOf(sp._age) < 0) return;
      var t = (sp._title || "").trim();
      if (!t) return;
      var ages = t.match(/·\s*Ages\s*(\d+)\s*[–-]\s*(\d+)/);
      if (ages && band !== "little" && +ages[2] <= 4) return;
      t = t.replace(/\s*·\s*Ages\s*\d+\s*[–-]\s*\d+\s*$/, "");
      add(t, sp, sp._place, sp._desc, null);
    });
    return order.map(function (t) { return byTitle[t]; });
  }
  /* the same 3 outside + 3 at home all day, new ones tomorrow; nothing repeats until
     every activity of that kind has had its turn */
  function actDayIndex() { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
  function actShuffle(list, seed) {
    var a = list.slice(), x = seed >>> 0 || 1;
    for (var i = a.length - 1; i > 0; i--) { x = (x * 1103515245 + 12345) >>> 0; var j = x % (i + 1); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function actToday(groups) {
    var day = actDayIndex(), seed = 0, b = curBand();
    for (var i = 0; i < b.length; i++) seed = seed * 31 + b.charCodeAt(i);
    var pick = function (list, s) {
      if (!list.length) return [];
      /* one fixed order, walked 3 a day: nothing repeats until the whole list has had its turn */
      var h = function (t) { var x = 2166136261 ^ (seed + s); for (var i = 0; i < t.length; i++) { x ^= t.charCodeAt(i); x = Math.imul(x, 16777619) >>> 0; } return x >>> 0; };
      var sh = list.slice().sort(function (a, b) { return h(a.title) - h(b.title); }), n = Math.min(3, sh.length), out = [];
      for (var k = 0; k < n; k++) out.push(sh[(day * n + k) % sh.length]);
      return out;
    };
    return pick(groups.filter(function (g) { return g.place === "outdoor"; }), 11)
      .concat(pick(groups.filter(function (g) { return g.place !== "outdoor"; }), 23));
  }
  function actMedia(g) {
    var out = [];
    g.spots.forEach(function (sp) {
      Array.prototype.forEach.call(sp._strip ? sp._strip.children : [], function (fig) {
        var pr = fig.getAttribute("data-prof") || "";
        if (fig._hwUrl && (!state.profile || pr === "shared" || pr.split(",").indexOf(state.profile.id) >= 0)) out.push(fig);
      });
    });
    return out;
  }
  var ACT_EMO = [[/leaf|leaves/i, "🍂"], [/puddle|rain/i, "🌧️"], [/cloud/i, "☁️"], [/bug|bird|beetle/i, "🐞"], [/stone|rock/i, "🪨"],
    [/paint/i, "🖌️"], [/fort|blanket/i, "⛺"], [/chef|snack|cook|kitchen|bak/i, "🥪"], [/dig|sand/i, "🏖️"], [/puppet|sock/i, "🧦"],
    [/obstacle|cushion|climb/i, "🤸"], [/bean|grow|plant|garden/i, "🌱"], [/wash|fruit/i, "🍎"], [/water|pour/i, "💧"],
    [/colou?r/i, "🎨"], [/shape/i, "🔺"], [/count|number|stairs|tower|pieces/i, "🔢"], [/letter|word|write/i, "🔤"],
    [/read|book|story/i, "📚"], [/animal|says that|zoo|farm/i, "🐮"], [/home|build|block|make/i, "🧱"], [/star/i, "⭐"],
    [/basket|treasure/i, "🧺"], [/music|song|sing|dance/i, "🎵"], [/photo|walk|quest|hunt|safari|outing/i, "🔎"]];
  /* Fix pass: every activity has its own illustration at
     assets/activity-art/<slug>.svg — slug rule must match the generator. */
  function actSlug(t) {
    return String(t || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function actEmo(g) {
    var t = g.title + " " + (g.desc || "").slice(0, 60);
    for (var i = 0; i < ACT_EMO.length; i++) if (ACT_EMO[i][0].test(g.title)) return ACT_EMO[i][1];
    for (var j = 0; j < ACT_EMO.length; j++) if (ACT_EMO[j][0].test(t)) return ACT_EMO[j][1];
    return g.place === "outdoor" ? "🌳" : "🏠";
  }
  /* 3e54b: "We did it together" — the young children (2–7) did an activity together:
     it is ticked for each of them, and photos/videos added to it that day belong to both. */
  var TOGETHER_KEY = "hootworld.together.v1";
  /* the two young children "Done for both" ticks: only when this child is one of exactly two aged 2–7 */
  function bothKids() { var k = kidPartners(); return state.profile && k.length === 2 && k.some(function (q) { return q.id === state.profile.id; }) ? k : []; }
  function kidPartners() { return PROFILES.filter(function (q) { var b = bandOf(q.id); return b === "little" || b === "early"; }); }
  function togetherAll() { try { return JSON.parse(localStorage.getItem(TOGETHER_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function isTogether(title) { var t = togetherAll()[dayKeyOf()]; return !!(t && t[title]); }
  function setTogether(title, on) {
    var all = togetherAll(), dk = dayKeyOf();
    Object.keys(all).forEach(function (k) { if (k < dayKeyOf(new Date(Date.now() - 40 * 86400000))) delete all[k]; }); /* keep ~40 days */
    all[dk] = all[dk] || {};
    if (on) all[dk][title] = 1; else delete all[dk][title];
    try { localStorage.setItem(TOGETHER_KEY, JSON.stringify(all)); } catch (e) {}
  }
  /* the activity log: which activity each child did on which day (kept ~13 months, this device) */
  var ACTLOG_KEY = "hootworld.actlog.v1";
  function actLogAll() { try { return JSON.parse(localStorage.getItem(ACTLOG_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function actLogSet(pid, title, on, extra) {
    var all = actLogAll(), dk = dayKeyOf(), cut = dayKeyOf(new Date(Date.now() - 400 * 864e5));
    all[pid] = all[pid] || {};
    Object.keys(all[pid]).forEach(function (d) { if (d < cut) delete all[pid][d]; });
    all[pid][dk] = all[pid][dk] || {};
    if (on) all[pid][dk][title] = { t: Date.now(), place: extra && extra.place, together: !!(extra && extra.together) };
    else delete all[pid][dk][title];
    if (!Object.keys(all[pid][dk]).length) delete all[pid][dk];
    try { localStorage.setItem(ACTLOG_KEY, JSON.stringify(all)); } catch (e) {}
  }
  function doneFor(pid, title, on) {
    var g0 = (state._actGroups || []).filter(function (x) { return x.title === title; })[0];
    actLogSet(pid, title, on, { place: g0 ? g0.place : null, together: isTogether(title) });
    if (on) logAdd(pid, { type: "activity", title: title, together: isTogether(title) || undefined });
    var k = doneKey(pid, title);
    if (on) state.done[k] = 1; else delete state.done[k];
    try { sessionStorage.setItem("hw-ll-done", JSON.stringify(state.done)); } catch (e) {}
    var x = planDay(pid, true); x.d.done = x.d.done || {};
    if (on) x.d.done[title] = 1; else delete x.d.done[title];
    planSave(x.s);
  }
  function isDoneFor(pid, title) { return !!state.done[doneKey(pid, title)] || !!(planDay(pid).d.done || {})[title]; }
  function actPhotoOwners(title) {
    var kids = kidPartners();
    return (isTogether(title) && kids.length > 1) ? kids.map(function (q) { return q.id; }).join(",") : null;
  }
  function actDoneRow(g, gi) {
    var me = state.profile, kids = kidPartners(), together = isTogether(g.title) && kids.length > 1;
    var mine = me && isDoneFor(me.id, g.title);
    var names = kids.map(function (q) { return q.label; }).join(" & ");
    var out = '<div class="ll-actdone">';
    if (together) {
      out += '<span class="ll-actdone-msg">👫 Done together — ' + esc(names) + ' ✓</span>' +
        '<button type="button" class="ll-actdone-undo" data-act-together="' + gi + '" data-on="0">Undo</button>';
    } else {
      out += '<button type="button" class="ll-btn sm ll-actdone-me' + (mine ? " on" : "") + '" data-act-done="' + gi + '" aria-pressed="' + (mine ? "true" : "false") + '">' + (mine ? "✓ Done" : "✓ Mark done") + "</button>";
      if (kids.length > 1 && me && kids.some(function (q) { return q.id === me.id; }))
        out += '<button type="button" class="ll-btn sm ll-actdone-both" data-act-together="' + gi + '" data-on="1">👫 We did it together</button>';
    }
    return out + "</div>";
  }
  function actLogHtml() {
    var me = state.profile; if (!me) return "";
    var log = actLogAll()[me.id] || {}, days = Object.keys(log).sort().reverse();
    var now = new Date(), wk = new Date(now); wk.setDate(now.getDate() - ((now.getDay() + 6) % 7)); /* week starts Monday */
    var wkKey = dayKeyOf(wk), moKey = dayKeyOf(new Date(now.getFullYear(), now.getMonth(), 1));
    var c = { week: 0, month: 0, out: 0, home: 0, both: 0 };
    days.forEach(function (d) {
      Object.keys(log[d]).forEach(function (t) {
        var e = log[d][t] || {};
        if (d >= wkKey) c.week++;
        if (d >= moKey) { c.month++; if (e.place === "outdoor") c.out++; else c.home++; if (e.together) c.both++; }
      });
    });
    var fmt = function (d) { var x = new Date(d + "T12:00:00"); return x.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }); };
    var media = {}; (state._actGroups || []).forEach(function (g) { actMedia(g).forEach(function (f) { var k = dayKeyOf(new Date(f._hwTs || 0)) + "|" + g.title; media[k] = (media[k] || 0) + 1; }); });
    var list = days.slice(0, 45).map(function (d) {
      return '<li><b>' + esc(fmt(d)) + "</b><ul>" + Object.keys(log[d]).map(function (t) {
        var e = log[d][t] || {}, m = media[d + "|" + t];
        return "<li>" + (e.place === "outdoor" ? "🌳 " : "🏠 ") + esc(t) + (e.together ? ' <span class="ll-actlog-tag">👫 together</span>' : "") + (m ? ' <span class="ll-actlog-tag">📸 ' + m + "</span>" : "") + "</li>";
      }).join("") + "</ul></li>";
    }).join("");
    return '<section class="ll-card ll-actlog"><h3>📒 ' + esc(me.label) + "'s activity log</h3>" +
      '<div class="ll-actlog-stats"><span><b>' + c.week + "</b> this week</span><span><b>" + c.month + "</b> this month</span><span>🌳 <b>" + c.out + "</b> outside</span><span>🏠 <b>" + c.home + "</b> at home</span><span>👫 <b>" + c.both + "</b> together</span></div>" +
      (list ? '<details class="ll-actlog-days"' + (state._actLogOpen ? " open" : "") + "><summary>Day by day</summary><ul>" + list + "</ul></details>"
            : '<p class="hoot-line">Tick ✓ on an activity when you\'ve done it — it shows up here.</p>') + "</section>";
  }
  function renderActivities() {
    var p = state.profile, groups = activityGroups(), today = actToday(groups);
    state._actGroups = groups;
    var idx = function (g) { return groups.indexOf(g); };
    var card = function (g, small) {
      var gi = idx(g), media = actMedia(g);
      var thumbs = media.map(function (fig, i) {
        var m = fig._hwVideo
          ? '<video src="' + fig._hwUrl + '" muted playsinline preload="metadata" controls aria-label="Video of ' + esc(g.title) + '"></video>'
          : '<img src="' + fig._hwUrl + '" alt="Photo of ' + esc(g.title) + '">';
        return '<figure class="ll-actm">' + m + '<button type="button" class="ll-actm-rm" data-act-rm="' + gi + ":" + i + '" aria-label="Remove this ' + (fig._hwVideo ? "video" : "photo") + '">×</button></figure>';
      }).join("");
      return '<article class="ll-card ll-actv' + (small ? " sm" : "") + '" data-act-i="' + gi + '">' +
        '<img class="ll-actv-art" src="assets/activity-art/' + actSlug(g.title) + '.svg" alt="" loading="lazy" onerror="this.remove()">' +
        '<div class="ll-actv-top"><span class="ll-actv-emo" aria-hidden="true">' + esc(g.emo || actEmo(g)) + '</span>' +
        '<div><h3>' + esc(g.title) + '</h3><span class="ll-tag" style="--c:' + (g.place === "outdoor" ? "#0B8A5F" : "#3A56D4") + '">' + (g.place === "outdoor" ? "Outside" : "At home") + "</span></div></div>" +
        (g.desc ? "<p>" + esc(g.desc) + "</p>" : "") +
        (thumbs ? '<div class="ll-actm-row">' + thumbs + "</div>" : "") +
        actDoneRow(g, gi) +
        '<div class="wc2-actbtns"><button type="button" class="ll-btn sm" data-wc2-printact="' + esc(g.title) + '">🖨 Print card</button></div>' +
        '<button type="button" class="ll-btn ' + (small ? "" : "pri ") + 'll-actv-add" data-act-add="' + gi + '">📷 Add a photo or video' + (actPhotoOwners(g.title) ? " for both" : "") + "</button>" +
        "</article>";
    };
    var withMedia = groups.filter(function (g) { return today.indexOf(g) < 0 && actMedia(g).length; });
    var rest = groups.filter(function (g) { return today.indexOf(g) < 0 && withMedia.indexOf(g) < 0; });
    var dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];
    return '<div class="ll-kidbar">' + kidbarHtml() + "</div>" +
      '<section class="ll-card ll-hero" style="--k:' + p.color + '"><div class="big">🧺</div><div class="htxt"><h2>Activities</h2>' +
      "<p class='hoot-line'>Real things to do together, away from the screen. New ones every day. Take a photo or a short video — it's saved on this device and collects in Grown-ups → Photo memories.</p></div></section>" +
      (groups.length ? "" : '<section class="ll-card"><p class="hoot-line">Loading activities…</p></section>') +
      wc2IhaveEntryHtml() + actLogHtml() +
      (today.length ? '<h2 class="todoh">✨ ' + dayName + "'s activities <span class=\"muted\">new ones tomorrow</span></h2><div class=\"ll-grid\">" + today.map(function (g) { return card(g, false); }).join("") + "</div>" : "") +
      (withMedia.length ? '<h2 class="todoh">📸 Your photos and videos</h2><div class="ll-grid">' + withMedia.map(function (g) { return card(g, true); }).join("") + "</div>" : "") +
      (rest.length ? '<details class="ll-actall"' + (state._actAllOpen ? " open" : "") + '><summary>All activities (' + groups.length + ")</summary>" +
        '<div class="ll-grid">' + rest.map(function (g) { return card(g, true); }).join("") + "</div></details>" : "");
  }
  document.addEventListener("toggle", function (e) {
    if (e.target && e.target.classList && e.target.classList.contains("ll-actall")) state._actAllOpen = e.target.open;
    if (e.target && e.target.classList && e.target.classList.contains("ll-actlog-days")) state._actLogOpen = e.target.open;
  }, true);
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-act-add]");
    if (a && state.tab === "activities") {
      var g = (state._actGroups || [])[+a.getAttribute("data-act-add")];
      if (g && window.__hwPhotoAPI) window.__hwPhotoAPI.add(g.key, actPhotoOwners(g.title));
      return;
    }
    var dn = e.target.closest && e.target.closest("[data-act-done]");
    if (dn && state.tab === "activities" && state.profile) {
      var gd = (state._actGroups || [])[+dn.getAttribute("data-act-done")];
      if (gd) { doneFor(state.profile.id, gd.title, !isDoneFor(state.profile.id, gd.title)); bumpStars(); var yd = window.scrollY; render(); window.scrollTo(0, yd); }
      return;
    }
    var tg = e.target.closest && e.target.closest("[data-act-together]");
    if (tg && state.tab === "activities") {
      var gt = (state._actGroups || [])[+tg.getAttribute("data-act-together")], on = tg.getAttribute("data-on") === "1";
      if (gt) {
        var both = kidPartners().map(function (q) { return q.id; }).join(","), me = state.profile ? state.profile.id : "";
        var midnight = new Date(); midnight.setHours(0, 0, 0, 0);
        if (window.__hwPhotoAPI && window.__hwPhotoAPI.retag && me)
          window.__hwPhotoAPI.retag(gt.spots.map(function (sp) { return sp._key; }), on ? me : both, on ? both : null, midnight.getTime());
        setTogether(gt.title, on);
        kidPartners().forEach(function (q) { doneFor(q.id, gt.title, on); });
        bumpStars(); var yt = window.scrollY; render(); window.scrollTo(0, yt);
      }
      return;
    }
    var r = e.target.closest && e.target.closest("[data-act-rm]");
    if (r && state.tab === "activities") {
      var ij = r.getAttribute("data-act-rm").split(":"), g2 = (state._actGroups || [])[+ij[0]];
      var fig = g2 ? actMedia(g2)[+ij[1]] : null;
      if (fig && fig._hwRm) fig._hwRm.click();
    }
  });
  var _actT = 0;
  document.addEventListener("hw-photos-changed", function () {
    if (state.tab !== "activities") return;
    clearTimeout(_actT);
    _actT = setTimeout(function () { var y = window.scrollY; render(); window.scrollTo(0, y); }, 120);
  });

  function renderDays() {
    /* 3e59: the Adventure Map is the Little Explorers journey (ages 2–7: Balloon ABC Pop,
       Colour Splash…). Older children were shown it too. They now get their own days:
       what they finished on each of the last two weeks. */
    var own = !isKidBand();
    document.body.classList.toggle("ll-days-own", own);
    if (own) {
      var p = state.profile, ev = [];
      try { ev = (logLoad()[p.id] || []).slice(); } catch (err) {}
      var byDay = {}, order = [];
      ev.sort(function (a, b) { return b.t - a.t; }).forEach(function (e) {
        if (!e.t || !e.title) return;
        var d = new Date(e.t), k = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        if (!byDay[k]) { byDay[k] = { d: d, items: [] }; order.push(k); }
        if (byDay[k].items.indexOf(e.title) < 0) byDay[k].items.push(e.title);
      });
      var rows = order.slice(0, 14).map(function (k) {
        var x = byDay[k];
        return "<li><b>" + esc(x.d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })) + "</b>" +
          '<ul style="margin:4px 0 10px;padding-left:20px">' + x.items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></li>";
      }).join("");
      return '<div class="ll-kidbar">' + kidbarHtml() + "</div>" +
        '<section class="ll-card ll-hero" style="--k:' + p.color + '"><div class="big">🗓️</div><div class="htxt"><h2>' + esc(p.label) + "'s days</h2><p class='hoot-line'>What you finished on each day, newest first.</p></div></section>" +
        '<section class="ll-card ll-mydays">' + (rows ? '<ul style="list-style:none;margin:0;padding:0;line-height:1.5">' + rows + "</ul>"
          : '<p class="hoot-line" style="margin:0">Nothing yet. Finish a lesson or a game and the day shows up here.</p>') + "</section>" + wc2DaysHtml();
    }
    return '<div class="ll-kidbar" style="padding-left:14px;padding-right:14px">' + kidbarHtml() + "</div>" +
      '<section class="ll-card" style="margin:14px"><h2 style="margin:0 0 6px">Days</h2><p class="hoot-line" style="margin:0">The Adventure Map: follow the stops to the Star Castle. The glowing stop is next.</p></section>' +
      '<div id="ll-days-host"></div>' + wc2DaysHtml();
  }

  function renderGrownups() {
    if (state.parentUnlocked) {
      return '<div class="ll-kidbar">' + kidbarHtml() + "</div>" +
        '<section class="ll-card"><h2 style="margin:0 0 8px">Grown-ups</h2><p>Settings, progress and the Kids 2–4 button for each child.</p>' +
        '<p><button type="button" class="ll-btn pri" id="ll-kidmode">Kids 2–4: bigger buttons</button></p>' +
        '<p class="hoot-line">' + (window.HW_SAFE ? 'Everything for each child is below. This is a preview, so nothing here changes your family\'s data.' : 'Everything for each child is below — settings, progress, and Family Sync.') + '</p></section>' +
        (window.HootAccount ? window.HootAccount.cardHtml() : "") + safeCardHtml() + dashboardHtml() + grownupTodayHtml() + childrenSettingsHtml() + we1NotesHtml() + we2ReportHtml(); /* Wave E2: monthly growth report */
    }
    return '<div class="ll-kidbar">' + kidbarHtml() + "</div>" +
      '<section class="ll-card ll-parent-gate" id="ll-parent-gate" aria-label="Grown-up question">' +
      '<h2 style="margin:0 0 8px">Parent view — a grown-up question</h2>' +
      '<p class="hoot-line">This page is just for grown-ups. There is no PIN to remember: answer a quick times question to open it.</p>' +
      '<p id="ll-gate-q" class="ll-gate-q"></p>' +
      '<p id="ll-gate-typed" class="ll-gate-typed" aria-live="polite">·</p>' +
      '<div class="ll-gate-pad" id="ll-gate-pad"></div>' +
      '<p id="ll-gate-msg" class="ll-gate-msg" role="status" aria-live="polite"></p>' +
      '</section>';
  }

  /* ===== 3e24: real dashboard for the selected child ===== */
  var CT_SUBJECTS = ["Reading", "Writing", "Spelling", "English grammar", "Geography", "Arithmetic", "US history", "Citizenship"];
  function subjectsFor(title) {
    var t = title.toLowerCase();
    if (/^letter [a-z]$|letter sound|phonics|blend|read a line|sight word/.test(t)) return ["Reading", "Spelling"];
    if (/count|number|dots|add|subtract|times|fraction|pattern|shape|rectangle|big and small|more and less|ratio|percent|unit rate|equation|negative/.test(t)) return ["Arithmetic"];
    if (/writ|claim|thesis|argument|main idea|evidence/.test(t)) return ["Writing", "Reading"];
    if (/grammar|sentence/.test(t)) return ["English grammar"];
    if (/my home, my town/.test(t)) return ["Geography", "US history", "Citizenship"];
    if (/community helpers/.test(t)) return ["Citizenship"];
    if (/in, on & under/.test(t)) return ["Geography"];
    if (/more and less/.test(t)) return ["Arithmetic"];
    if (/map|town|state|geograph|hudson/.test(t)) return ["Geography"];
    if (/constitution|articles|history/.test(t)) return ["US history", "Citizenship"];
    return [];
  }
  function fmtMin(ms) { var m = Math.round((ms || 0) / 60000); return m < 1 ? "<1 min" : m + " min"; }
  function dashboardHtml() {
    var p = state.profile, kid = p.id, cfg = childCfg(kid), now = Date.now(), wk = now - 7 * 864e5;
    var log = (logLoad()[kid] || []).filter(function (e) { return e.t >= wk; });
    var lessons = log.filter(function (e) { return e.type === "lesson"; });
    var games = log.filter(function (e) { return e.type === "game"; });
    var acts = log.filter(function (e) { return e.type === "activity"; });
    var lessonMs = lessons.reduce(function (a, e) { return a + (e.ms || 3 * 60000); }, 0);
    var gameMs = games.reduce(function (a, e) { return a + (e.ms || 0); }, 0);
    var h = HL(), res = h ? h.results(kid) : {}, learned = [], tricky = [], soon = [];
    Object.keys(res).forEach(function (id) {
      var r = res[id], l = h.byId[id]; if (!l) return;
      if (r.struggle) tricky.push(l.title); else if (r.mastered) learned.push(l.title);
      if (r.due) soon.push({ title: l.title, due: r.due });
    });
    soon.sort(function (a, b) { return a.due - b.due; });
    var dayName = function (t) { var d = new Date(t); return t <= now ? "today" : d.toLocaleDateString(undefined, { weekday: "short" }); };
    var recent = lessons.slice(-6).reverse().map(function (e) {
      var how = e.wrong == null ? "" : e.wrong <= 1 ? ' <span class="db-ok">✓ got it</span>' : ' <span class="db-help">needed help</span>';
      return "<li>" + esc(e.title) + how + ' <small>' + new Date(e.t).toLocaleDateString(undefined, { weekday: "short" }) + "</small></li>";
    }).join("");
    var block = '<section class="ll-card ll-dash"><h2 style="margin:0 0 2px">' + esc(p.label) + "'s week</h2>" +
      '<p class="hoot-line" style="margin:0 0 10px">' + esc(bandLabel(bandOf(kid))) + " · " + esc(cfg.state) + " · " + esc(MODES[cfg.mode]) + "</p>" +
      '<div class="db-stats"><div><b>' + lessons.length + "</b><span>lessons</span></div><div><b>" + fmtMin(lessonMs) + "</b><span>learning</span></div>" +
      (hasGames() ? "<div><b>" + fmtMin(gameMs) + "</b><span>games</span></div>" : "") + "<div><b>" + acts.length + "</b><span>activities</span></div></div>" +
      (recent ? '<h3 class="db-h">Recent lessons</h3><ul class="db-list">' + recent + "</ul>" : '<p class="db-empty">No lessons yet this week — Today\'s plan is ready when they are.</p>') +
      (tricky.length ? '<h3 class="db-h">Needs another look</h3><p class="db-chips">' + tricky.map(function (t) { return '<span class="db-chip help">' + esc(t) + "</span>"; }).join("") + "</p>" : "") +
      (learned.length ? '<h3 class="db-h">Learned (' + learned.length + ')</h3><p class="db-chips">' + learned.slice(0, 12).map(function (t) { return '<span class="db-chip ok">' + esc(t) + "</span>"; }).join("") + "</p>" : "") +
      (soon.length ? '<h3 class="db-h">Coming back for review</h3><p class="db-chips">' + soon.slice(0, 6).map(function (s) { return '<span class="db-chip">' + esc(s.title) + " · " + dayName(s.due) + "</span>"; }).join("") + "</p>" : "");
    if (cfg.mode === "homeschool" && cfg.state === "Connecticut") {
      var month = now - 31 * 864e5, cover = {};
      (logLoad()[kid] || []).forEach(function (e) { if (e.t >= month && e.type === "lesson") subjectsFor(e.title).forEach(function (s) { cover[s] = (cover[s] || 0) + 1; }); });
      block += '<h3 class="db-h">Connecticut subjects — last 30 days</h3><ul class="db-ct">' + CT_SUBJECTS.map(function (s) {
        return '<li class="' + (cover[s] ? "ok" : "gap") + '"><span aria-hidden="true">' + (cover[s] ? "✓" : "○") + "</span> " + s + (cover[s] ? " <small>" + cover[s] + " lesson" + (cover[s] > 1 ? "s" : "") + "</small>" : " <small>not yet</small>") + "</li>";
      }).join("") + '</ul><p class="db-note">CT asks for equivalent instruction in these subjects (§10-184). Geography, US history and citizenship lessons for young children are next on the build list; until then, count your own outings and talks by ticking activities below.</p>';
    }
    if (cfg.mode === "school" && cfg.state === "New York") {
      var ny = $$("#ny-creator-wrap .ny-lsn"), nyDone = ny.filter(function (c) { return c.classList.contains("done"); }).length;
      var need = {}; try { need = (JSON.parse(localStorage.getItem("hootworld.nyneed.v1") || "{}") || {})[kid] || {}; } catch (e) {}
      var needN = Object.keys(need).filter(function (k) { return need[k]; }).length;
      block += '<h3 class="db-h">New York grade 7 lessons</h3><p class="db-ny">' + nyDone + " of " + ny.length + " done" + (needN ? " · " + needN + " needed re-teaching (in Practice)" : "") + "</p>";
    }
    return block + "</section>";
  }
  var PL_EMO = ["📚", "🎹", "🌳", "🎨", "🧁", "🏊", "🧩", "🚲", "✏️", "🛒", "⚽", "🧪"];
  var DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function whenLabel(x) {
    if (x.date) return x.date === dayKeyOf() ? "Today only" : x.date;
    var d = (x.dow || []).slice().sort();
    if (d.length === 7) return "Every day";
    if (d.join("") === "12345") return "Weekdays";
    return d.map(function (n) { return DOW[n]; }).join(", ");
  }
  /* 3e39: how each stop went today, from the activity log */
  function todayLog(pid) { var d0 = new Date(); d0.setHours(0, 0, 0, 0); return (logLoad()[pid] || []).filter(function (e) { return e.t >= d0.getTime(); }); }
  function stopOutcome(it, log) {
    var ev = log.filter(function (e) { return e.title === it.title; }), ms = ev.reduce(function (a, e) { return a + (e.ms || 0); }, 0);
    var les = ev.filter(function (e) { return e.type === "lesson" && e.wrong != null; }), last = les[les.length - 1];
    var how = last ? (last.wrong <= 1 ? '<span class="db-ok">✓ got it</span>' : '<span class="db-help">needed help</span>') : "";
    return how + (ms >= 30000 ? " <small>" + fmtMin(ms) + "</small>" : "") + (les.length > 1 ? " <small>" + les.length + " tries</small>" : "");
  }
  /* Hoot's likely lessons for the coming days: the next unfinished lesson on
     each path, a day at a time. A guess — it moves as lessons get finished. */
  function likelyAhead(days) {
    var pid = state.profile.id, today = {}; currentPlan().forEach(function (it) { today[it.title] = 1; });
    var qs = pathsFor(pid).map(function (c) { return (LESSONS[c.id] || hlLessons(c.id)).filter(function (l) { return !today[l.title] && !lessonDone(l.title); }); }).filter(function (q) { return q.length; });
    /* 3e60: the same lesson can sit on two paths ("Shape names" is on Little Explorers and on
       Colours, shapes & numbers, and both open the one lesson) — list it once */
    var seenT = {}; qs = qs.map(function (q) { return q.filter(function (l) { if (seenT[l.title]) return false; seenT[l.title] = 1; return true; }); }).filter(function (q) { return q.length; });
    var per = isKidBand() ? 2 : 3, out = [], turn = 0;
    /* little ones keep ONE letter all week; the next letter starts on Monday */
    var lw = isKidBand() && HL() ? letterOfWeek() : null, nextLetter = null, shownNew = false;
    if (lw) {
      qs = qs.map(function (q) { return q.filter(function (l) { return !/^Letter [A-Z]$/.test(l.title); }); }).filter(function (q) { return q.length; });
      /* 3e62: same rule as letterOfWeek() uses on Monday: the next unfinished letter AFTER this week's
         (it used to show the first unfinished letter from A, so after a grown-up picked C it said "A" while Monday brought D) */
      var LL = hlLessons("letters"), at = LL.map(function (l) { return l.title; }).indexOf(lw.title);
      for (var sN = 1; sN <= LL.length && !nextLetter; sN++) { var cN = LL[(at + sN + LL.length) % LL.length]; if (!lessonDone(cN.title)) nextLetter = cN; }
      if (!nextLetter) nextLetter = LL[(at + 1 + LL.length) % LL.length] || null;
    }
    for (var d = 0; d < days; d++) {
      var pick = [], guard = 0;
      if (lw) {
        var dt = new Date(); dt.setDate(dt.getDate() + d + 1);
        var same = weekKey(dt) === weekKey(), L = same ? lw : nextLetter;
        /* 3e59: only the first day of the new week says "(new letter)"; the rest of that week say "again" */
        if (L) { pick.push({ emo: L.emo, title: L.title + (same || shownNew ? " again" : " (new letter)") }); if (!same) shownNew = true; }
      }
      while (pick.length < per && qs.length && guard++ < 40) {
        var q = qs[turn % qs.length]; turn++;
        if (q.length) pick.push(q.shift());
        qs = qs.filter(function (x) { return x.length; });
      }
      out.push(pick);
    }
    return out;
  }
  /* 3e38: the planner. Today's path as the child sees it (tick, reorder, skip),
     the grown-up's own stops, the week ahead, and the free-play rule. */
  function grownupTodayHtml() {
    var p = state.profile, plan = currentPlan(), hid = hiddenToday(), k = kidPlan(planAll(), p.id), doneN = plan.filter(stoneDone).length;
    rememberDay(plan);
    var tlog = todayLog(p.id);
    var learnMs = tlog.filter(function (e) { return e.type === "lesson"; }).reduce(function (a, e) { return a + (e.ms || 0); }, 0);
    var gameMs = tlog.filter(function (e) { return e.type === "game"; }).reduce(function (a, e) { return a + (e.ms || 0); }, 0);
    var hh = HL(), res = hh ? hh.results(p.id) : {}, tmr = Date.now() + 36 * 36e5, back = [];
    Object.keys(res).forEach(function (id) { var r = res[id], l = hh.byId[id]; if (l && r.due && r.due <= tmr && r.last && r.last >= Date.now() - 864e5) back.push({ t: l.title, hard: !!r.struggle }); });
    var recap = '<p class="pl-recap"><b>' + doneN + " of " + plan.length + " done</b>" + (learnMs >= 30000 ? " · " + fmtMin(learnMs) + " learning" : "") + (gameMs >= 30000 ? " · " + fmtMin(gameMs) + " games" : "") + "</p>" +
      (back.length ? '<p class="pl-back">Back tomorrow: ' + back.map(function (b) { return '<span class="db-chip' + (b.hard ? " help" : "") + '">' + esc(b.t) + (b.hard ? " · was tricky" : " · quick review") + "</span>"; }).join(" ") + "</p>" : "");
    var past = ""; for (var pi = 6; pi >= 1; pi--) {
      var pd = new Date(); pd.setDate(pd.getDate() - pi); var rec = (k.days[dayKeyOf(pd)] || {}).n;
      past += '<div class="pl-pday' + (rec ? "" : " none") + '"><b>' + DOW[pd.getDay()] + "</b>" + (rec ? '<span class="pl-pbar" aria-hidden="true"><i style="height:' + Math.round(rec[0] / Math.max(rec[1], 1) * 100) + '%"></i></span><small>' + rec[0] + " of " + rec[1] + "</small>" : '<span class="pl-pbar" aria-hidden="true"></span><small>not opened</small>') + "</div>";
    }
    var ahead = likelyAhead(6);
    var rows = plan.map(function (it, i) {
      var d = stoneDone(it), oc = stopOutcome(it, tlog);
      return '<div class="ll-gt-row pl-row' + (d ? " done" : "") + '" data-title="' + esc(it.title) + '"><button type="button" class="ll-chk' + (d ? " on" : "") + '" aria-pressed="' + d + '" aria-label="Mark ' + esc(it.title) + ' done">' + (d ? "✓" : "") + "</button>" +
        '<span class="pl-t">' + esc(it.emo || "") + " " + esc(it.title) + ' <small>' + (it.kind === "custom" ? "your stop" : it.kind === "story" ? "story" : "Hoot's pick") + "</small>" + (oc ? ' <span class="pl-oc">' + oc + "</span>" : "") + "</span>" +
        '<span class="pl-btns"><button type="button" class="ll-btn sm" data-pl="up" aria-label="Move ' + esc(it.title) + ' earlier"' + (i === 0 ? " disabled" : "") + '>↑</button>' +
        '<button type="button" class="ll-btn sm" data-pl="down" aria-label="Move ' + esc(it.title) + ' later"' + (i === plan.length - 1 ? " disabled" : "") + '>↓</button>' +
        '<button type="button" class="ll-btn sm" data-pl="skip">Skip today</button></span></div>';
    }).join("");
    var skipped = hid.length ? '<p class="pl-skipped">Skipped today: ' + hid.map(function (t) { return '<span data-title="' + esc(t) + '">' + esc(t) + ' <button type="button" class="ll-btn sm" data-pl="unskip">Put back</button></span>'; }).join(" ") + "</p>" : "";
    var mine = k.extra.length ? '<div class="pl-mine">' + k.extra.map(function (x) {
      return '<div class="pl-minerow" data-cid="' + esc(x.id) + '"><span>' + esc(x.emo || "⭐") + " " + esc(x.title) + " <small>" + esc(whenLabel(x)) + '</small></span><button type="button" class="ll-btn sm" data-pl="rm">Remove</button></div>';
    }).join("") + "</div>" : '<p class="pl-none">None yet. Add things that happen away from the screen, so the plan holds the whole day.</p>';
    var week = ""; for (var i = 0; i < 7; i++) {
      var dt = new Date(); dt.setDate(dt.getDate() + i);
      var ex = extrasOn(k, dt);
      week += '<div class="pl-day' + (i === 0 ? " today" : "") + '"><b>' + (i === 0 ? "Today" : DOW[dt.getDay()]) + "</b><small>" + (dt.getMonth() + 1) + "/" + dt.getDate() + "</small>" +
        (i === 0 ? '<span class="pl-auto">See today\'s path above</span>' : (ahead[i - 1] || []).map(function (l) { return '<span class="pl-auto">' + esc(l.emo || "") + " " + esc(l.title) + "</span>"; }).join("") || '<span class="pl-auto">Reviews and free choice</span>') + ex.map(function (x) { return '<span class="pl-chip">' + esc(x.emo || "⭐") + " " + esc(x.title) + "</span>"; }).join("") + "</div>";
    }
    var fm = freeMode(p.id);
    return '<section class="ll-card pl-card"><h2 style="margin:0 0 4px">Plan for ' + esc(p.label) + "</h2>" +
      '<p class="hoot-line" style="margin:0 0 10px">This is the path ' + esc(p.label) + " sees on Home, top to bottom, with how each stop went. Switch child with the buttons at the top.</p>" +
      '<h3 class="pl-h">Today\'s path</h3>' + recap + '<div class="ll-gtoday">' + rows + "</div>" + skipped +
      '<h3 class="pl-h">The last six days</h3><div class="pl-past">' + past + "</div>" +
      '<h3 class="pl-h">Add your own stop</h3>' +
      '<form class="pl-form" data-pl-form="1"><label>What<input name="t" maxlength="40" placeholder="e.g. Library trip" required></label>' +
      '<label>Picture<select name="e">' + PL_EMO.map(function (e) { return "<option>" + e + "</option>"; }).join("") + "</select></label>" +
      '<label>When<select name="w"><option value="today">Just today</option><option value="all">Every day</option><option value="wk">Weekdays</option>' + DOW.map(function (d, n) { return '<option value="d' + n + '">Every ' + d + "</option>"; }).join("") + "</select></label>" +
      '<button type="submit" class="ll-btn pri">Add stop</button></form>' +
      '<h3 class="pl-h">Your stops</h3>' + mine +
      '<h3 class="pl-h">The week ahead</h3><p class="pl-note">Grey lines are Hoot\'s likely lessons. They move as lessons get finished. Purple ones are yours.</p><div class="pl-week">' + week + "</div>" +
      (isKidBand() && HL() ? (function () { var lw = letterOfWeek(), cur = lw ? lw.title.slice(-1) : "A", opts = ""; for (var c = 65; c <= 90; c++) { var L = String.fromCharCode(c); opts += '<option value="' + L + '"' + (L === cur ? " selected" : "") + ">" + L + (lessonDone("Letter " + L) ? " (learned)" : "") + "</option>"; }
        return '<h3 class="pl-h">Letter of the week</h3><label class="pl-free">This week ' + esc(p.label) + '\'s letter is <select data-pl-lotw="1" aria-label="Letter of the week">' + opts + "</select></label>" +
          '<p class="pl-note">It moves on to the next letter every Monday. Letter games use it about one time in three and mix in other letters.</p>'; })() : "") +
      (isKidBand() ? '<h3 class="pl-h">Free play</h3><label class="pl-free">Learn and Play on ' + esc(p.label) + '\'s Home open <select data-pl-free="1">' +
        '<option value="after"' + (fm === "after" ? " selected" : "") + ">after today's path is done</option>" +
        '<option value="always"' + (fm === "always" ? " selected" : "") + ">any time</option>" +
        '<option value="off"' + (fm === "off" ? " selected" : "") + ">never (path only)</option></select></label>" : "") +
      (isKidBand() && !playUnlocked() ? '<p style="margin:10px 0 0"><button type="button" class="ll-btn pri" id="ll-openplay">🎮 Open Learn &amp; Play now (30 min)</button></p>' : "") +
      '<p style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 0"><button type="button" class="ll-btn" id="ll-newideas">🔀 Swap Hoot\'s picks</button>' +
      '<button type="button" class="ll-btn" data-gp-tab="memories">📸 Memories & photos</button>' +
      '<button type="button" class="ll-btn" data-gp-tab="reading">📚 Reading list</button></p></section>';
  }
  function plannerClick(t) {
    var act = t.getAttribute("data-pl"), pid = state.profile.id, x = planDay(pid, true);
    var row = t.closest("[data-title]"), title = row && row.getAttribute("data-title");
    if (act === "rm") {
      var cid = t.closest("[data-cid]").getAttribute("data-cid");
      x.k.extra = x.k.extra.filter(function (e) { return e.id !== cid; });
    } else if (act === "skip" && title) {
      x.d.hide = (x.d.hide || []).filter(function (h) { return h !== title; }).concat([title]);
    } else if (act === "unskip" && title) {
      x.d.hide = (x.d.hide || []).filter(function (h) { return h !== title; });
    } else if ((act === "up" || act === "down") && title) {
      var order = currentPlan().map(function (it) { return it.title; }), i = order.indexOf(title), j = act === "up" ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= order.length) return;
      order[i] = order[j]; order[j] = title; x.d.order = order;
    } else return;
    planSave(x.s); render();
  }
  function plannerAdd(f) {
    var title = (f.querySelector("[name=t]").value || "").replace(/\s+/g, " ").trim().slice(0, 40);
    if (!title) return;
    var w = f.querySelector("[name=w]").value, pid = state.profile.id, s = planAll(), k = kidPlan(s, pid);
    if (k.extra.length >= 20) return;
    var e = { id: "c" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36), title: title, emo: f.querySelector("[name=e]").value };
    if (w === "today") e.date = dayKeyOf(); else e.dow = w === "all" ? [0, 1, 2, 3, 4, 5, 6] : w === "wk" ? [1, 2, 3, 4, 5] : [+w.slice(1)];
    k.extra.push(e); planSave(s); render();
  }
  /* a grown-up's own stop, as the child meets it: a big picture and one button */
  function openCustomStop(title) {
    var it = null; currentPlan().forEach(function (x) { if (x.title === title) it = x; });
    if (!it) return;
    nextView = { kind: "custom", title: title };
    openShellOverlay(it.title, '<div class="cs" data-cs-title="' + esc(it.title) + '"><span class="cs-pic" aria-hidden="true">' + esc(it.emo || "⭐") + '</span><h2>' + esc(it.title) + '</h2><p>Do this one with your grown-up.</p><button type="button" class="cs-done" data-cs="done"><span aria-hidden="true">✓</span> We did it!</button></div>');
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-cs]"); if (!t) return;
    var box = t.closest("[data-cs-title]"); if (box) setDayDone(box.getAttribute("data-cs-title"), true);
    closeOverlay(); if (state.tab === "today") render();
  });
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t && t.getAttribute && t.getAttribute("data-pl-lotw") === "1" && state.profile) { setLetterOfWeek(state.profile.id, t.value); render(); return; }
    if (!t || !t.getAttribute || t.getAttribute("data-pl-free") !== "1" || !state.profile) return;
    var s = planAll(); kidPlan(s, state.profile.id).free = t.value; planSave(s); render();
  });

  function stateOptions(cur) {
    var sel = document.querySelector("#state-select-main");
    var names = sel ? Array.prototype.map.call(sel.options, function (o) { return o.value || o.textContent; }) : ["Connecticut", "New York"];
    return names.map(function (n) { return '<option' + (n === cur ? " selected" : "") + ">" + esc(n) + "</option>"; }).join("");
  }
  /* ===== 3e36: keep the kids' progress safe =====
     Three layers: (1) family sync to the cloud (index.html — now covers every
     save slot), (2) a backup file a grown-up can save and restore, (3) asking
     the browser to keep this site's data, plus the Home Screen install that
     stops Safari deleting it after 7 days without a visit. */
  /* 3e40: the parent's login never goes into a backup file */
  var BACKUP_SKIP = { "hootworld.familycode.v1": 1, "hootworld.familysync.v1": 1, "hootworld.sync.deltomb.v1": 1, "hootworld.account.v1": 1 };
  /* redraw only the account card, so a half-typed form elsewhere is not lost */
  document.addEventListener("hoot-account-changed", function () {
    var c = document.getElementById("hoot-account"); if (!c || !window.HootAccount || !state.parentUnlocked) return;
    var keep = {}; $$("input", c).forEach(function (i) { if (i.name) keep[i.name] = i.type === "checkbox" ? i.checked : i.value; });
    var form = c.querySelector("form"), was = form && form.getAttribute("data-acct");
    var box = document.createElement("div"); box.innerHTML = window.HootAccount.cardHtml();
    c.replaceWith(box.firstChild);
    var nf = document.querySelector("#hoot-account form");
    if (nf && nf.getAttribute("data-acct") === was) $$("input", nf).forEach(function (i) { if (i.name in keep) { if (i.type === "checkbox") i.checked = keep[i.name]; else i.value = keep[i.name]; } });
  });
  function backupKeys() {
    var out = [];
    try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (/^hootworld\./.test(k) && !BACKUP_SKIP[k]) out.push(k); } } catch (e) {}
    return out.sort();
  }
  function isInstalled() { try { return !!(window.navigator.standalone || (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches)); } catch (e) { return false; } }
  function safeCardHtml() {
    var code = ""; try { code = localStorage.getItem("hootworld.familycode.v1") || ""; } catch (e) {}
    var A = window.HootAccount, acctOn = !!(A && A.active && A.active());
    var inst = isInstalled(), last = ""; try { last = localStorage.getItem("hootworld.lastbackup.v1") || ""; } catch (e) {}
    var row = function (ok, title, text) { return '<li class="' + (ok ? "ok" : "todo") + '"><span aria-hidden="true">' + (ok ? "✅" : "⚠️") + "</span><div><b>" + title + "</b><small>" + text + "</small></div></li>"; };
    return '<section class="ll-card ll-safe" id="ll-safe"><h2 style="margin:0 0 4px">🛡️ Keep progress safe</h2>' +
      '<p class="hoot-line" style="margin:0 0 10px">Lessons, stickers, each child\'s egg and every course are saved on this device. Do these so nothing is ever lost.</p><ul class="ll-safelist">' +
      (acctOn ? row(true, "Saved to your family account", "Everything except photos is saved to your account and to every device you sign in on.") :
      row(!!code, "Family Sync " + (code ? "is on" : "is off"), code ? "Everything is copied to the cloud and to your other devices, including all courses, names, pets and the dashboard." : (window.HW_SAFE ? "Family Sync can't be turned on in this preview, so progress stays on this device only. Save a backup file (below) now and then so nothing is lost." : "Turn on Family Sync below to share progress across your family's phones and iPad. You can also save a backup file (below) any time."))) +
      row(inst, inst ? "Opened from the Home Screen" : "Add Hoot to the Home Screen", inst ? "Safari won't clear this app's saved progress." : "Safari clears a website's saved data after 7 days without a visit. On the iPad: tap Share (□↑), then \"Add to Home Screen\", and open Hoot from that icon from now on.") +
      row(!!last, "Backup file", last ? "Last saved " + esc(new Date(+last).toLocaleDateString()) + ". Save one now and then, and keep it in Files or iCloud Drive." : "Save a copy of all three kids' progress to a file. Restore it any time, or on a new iPad.") +
      '</ul><div class="ll-safebtns"><button type="button" class="ll-btn pri" id="ll-backup">💾 Save a backup file</button><button type="button" class="ll-btn" id="ll-restore">📂 Restore from a backup</button></div>' +
      '<p class="ll-safemsg" id="ll-safemsg" role="status" aria-live="polite"></p><p class="ll-safenote">' + (acctOn ? "Photos stay on each device while you are signed in — but they ARE in the backup file below, so save one now and then." : "Photos and videos are in the backup file too, so the file can be big. They also stay on this device.") + "</p></section>";
  }
  function safeMsg(t) { var m = document.getElementById("ll-safemsg"); if (m) m.textContent = t; }
  /* ===== Wave D: photos ride along in the backup file =====
     The photo store is IndexedDB "hootworld-photos" / "photos" (records:
     { id, key, caption, title, prof, ts, blob } — or { ..., buf, type } on
     browsers that refuse Blob storage). Export embeds each photo as a data
     URL with a manifest count; restore writes them back MERGED BY ID
     (put overwrites the same id, device-only photos are never deleted) —
     deliberately unlike the localStorage stores above, which restore
     replace-per-key. A photo a family deleted on purpose stays deleted
     under Family Sync because the tombstone list is not part of the
     backup and restore never clears it. */
  function photoDb() {
    return new Promise(function (resolve) {
      if (!("indexedDB" in window)) { resolve(null); return; }
      var req;
      try { req = indexedDB.open("hootworld-photos", 1); } catch (e) { resolve(null); return; }
      req.onupgradeneeded = function () { try { req.result.createObjectStore("photos", { keyPath: "id" }); } catch (e) {} };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { resolve(null); };
    });
  }
  function photoAll() {
    return photoDb().then(function (db) {
      return new Promise(function (resolve) {
        if (!db) { resolve([]); return; }
        try {
          var rq = db.transaction("photos", "readonly").objectStore("photos").getAll();
          rq.onsuccess = function () { resolve(rq.result || []); };
          rq.onerror = function () { resolve([]); };
        } catch (e) { resolve([]); }
      });
    });
  }
  function photoPut(rec) {
    return photoDb().then(function (db) {
      return new Promise(function (resolve) {
        if (!db) { resolve(); return; }
        try {
          var tx = db.transaction("photos", "readwrite");
          tx.objectStore("photos").put(rec);
          tx.oncomplete = function () { resolve(); };
          tx.onerror = function () { resolve(); };
        } catch (e) { resolve(); }
      });
    });
  }
  function blobToDataUrl(blob) {
    return new Promise(function (resolve) {
      try {
        var r = new FileReader();
        r.onload = function () { resolve(String(r.result || "")); };
        r.onerror = function () { resolve(""); };
        r.readAsDataURL(blob);
      } catch (e) { resolve(""); }
    });
  }
  function collectPhotosForBackup() {
    return photoAll().then(function (recs) {
      var items = [], bytes = 0;
      var chain = Promise.resolve();
      recs.forEach(function (rec) {
        chain = chain.then(function () {
          var blob = rec.blob || (rec.buf ? new Blob([rec.buf], { type: rec.type || "image/jpeg" }) : null);
          if (!blob) return;
          return blobToDataUrl(blob).then(function (url) {
            if (!url) return;
            var item = {};
            Object.keys(rec).forEach(function (k) { if (k !== "blob" && k !== "buf") item[k] = rec[k]; });
            item.type = blob.type || item.type || "image/jpeg";
            item.dataUrl = url;
            bytes += url.length;
            items.push(item);
          });
        });
      });
      return chain.then(function () { return { count: items.length, approxBytes: bytes, items: items }; });
    }).catch(function () { return { count: 0, approxBytes: 0, items: [] }; });
  }
  function fmtSize(n) { return n >= 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round(n / 1024)) + " KB"; }
  function saveBackup() {
    safeMsg("Saving backup…");
    collectPhotosForBackup().then(function (photos) {
      return collectNotesForBackup().then(function (notes) { return { photos: photos, notes: notes }; });
    }).then(function (both) {
      var photos = both.photos, notes = both.notes;
      var data = {}; backupKeys().forEach(function (k) { data[k] = localStorage.getItem(k); });
      var d = new Date(), stamp = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
      var file = { app: "hoots-world", version: 2, savedAt: d.toISOString(), keys: Object.keys(data).length, data: data, photos: photos, audionotes: notes };
      var blob = new Blob([JSON.stringify(file)], { type: "application/json" }), a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "hoot-backup-" + stamp + ".json"; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
      try { localStorage.setItem("hootworld.lastbackup.v1", String(Date.now())); } catch (e) {}
      safeMsg("Saved hoot-backup-" + stamp + ".json (" + file.keys + " parts + " + photos.count + " photo" + (photos.count === 1 ? "" : "s") + " + " + notes.count + " voice note" + (notes.count === 1 ? "" : "s") + (photos.count ? ", ~" + fmtSize(photos.approxBytes) : "") + "). On the iPad, choose \"Save to Files\".");
      window.__llLastBackup = file;
    });
  }
  var pendingRestore = null;
  function pickRestore() {
    var inp = document.createElement("input"); inp.type = "file"; inp.accept = "application/json,.json";
    inp.onchange = function () {
      var f = inp.files && inp.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () { checkRestore(String(r.result || "")); };
      r.readAsText(f);
    };
    inp.click();
  }
  function checkRestore(text) {
    var file = null; try { file = JSON.parse(text); } catch (e) {}
    if (!file || file.app !== "hoots-world" || !file.data || typeof file.data !== "object") { safeMsg("That file isn't a Hoot backup. Nothing was changed."); return false; }
    var keys = Object.keys(file.data).filter(function (k) { return /^hootworld\./.test(k) && !BACKUP_SKIP[k] && typeof file.data[k] === "string"; });
    /* Wave D: photos are optional in the file — backups saved before they
       were included have no photos field and restore exactly as before. */
    var photoItems = null;
    if (file.photos && Array.isArray(file.photos.items)) {
      photoItems = file.photos.items.filter(function (it) { return it && typeof it.id === "string" && typeof it.dataUrl === "string" && it.dataUrl.indexOf("data:") === 0; });
    }
    /* Wave E1: voice notes are optional too, same rule as photos. */
    var noteItems = null;
    if (file.audionotes && Array.isArray(file.audionotes.items)) {
      noteItems = file.audionotes.items.filter(function (it) { return it && typeof it.id === "string" && typeof it.dataUrl === "string" && it.dataUrl.indexOf("data:") === 0; });
    }
    pendingRestore = { keys: keys, data: file.data, photos: photoItems, notes: noteItems };
    var box = document.getElementById("ll-safemsg");
    if (box) box.innerHTML = 'Backup from <b>' + esc(new Date(file.savedAt).toLocaleString()) + "</b> (" + keys.length + " parts" + (photoItems ? " + " + photoItems.length + " photo" + (photoItems.length === 1 ? "" : "s") : "") + (noteItems ? " + " + noteItems.length + " voice note" + (noteItems.length === 1 ? "" : "s") : "") + '). This replaces the progress on this device.' + (photoItems && photoItems.length ? " The photos are added to this device's photos — photos already here are kept." : "") + (noteItems && noteItems.length ? " Voice notes are added the same way — notes already here are kept." : "") + ' <button type="button" class="ll-btn pri" id="ll-restore-yes">Yes, restore it</button> <button type="button" class="ll-btn" id="ll-restore-no">Cancel</button>';
    return true;
  }
  function doRestore() {
    if (!pendingRestore) return;
    var job = pendingRestore;
    pendingRestore = null;
    job.keys.forEach(function (k) { try { localStorage.setItem(k, job.data[k]); } catch (e) {} });
    var finish = function () {
      safeMsg("Restored. Reloading…");
      setTimeout(function () { try { location.reload(); } catch (e) {} }, 600);
    };
    var chain = Promise.resolve();
    if (job.photos && job.photos.length) {
      safeMsg("Restoring… (" + job.photos.length + " photos)");
      job.photos.forEach(function (item) {
        chain = chain.then(function () {
          return fetch(item.dataUrl).then(function (r) { return r.blob(); }).then(function (blob) {
            var rec = {};
            Object.keys(item).forEach(function (k) { if (k !== "dataUrl") rec[k] = item[k]; });
            rec.blob = blob;
            return photoPut(rec);
          }).catch(function () {});
        });
      });
    }
    if (job.notes && job.notes.length) {
      chain = chain.then(function () { return restoreNotesFromBackup(job.notes); });
    }
    if ((job.photos && job.photos.length) || (job.notes && job.notes.length)) chain.then(finish);
    else finish();
  }
  window.__llBackup = { keys: backupKeys, check: checkRestore, restore: doRestore };
  /* ask the browser to keep this site's data (helps on Chrome/Android; Safari mainly needs the Home Screen install) */
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then(function (p) { if (!p) navigator.storage.persist(); }); } catch (e) {}
  function childrenSettingsHtml() {
    var rows = PROFILES.map(function (p) {
      var c = childCfg(p.id), a = ageFrom(c.birth), b = bandOf(p.id);
      var modeOpts = Object.keys(MODES).map(function (k) { return '<option value="' + k + '"' + (k === c.mode ? " selected" : "") + ">" + esc(MODES[k]) + "</option>"; }).join("");
      var pinOpts = '<option value="auto"' + (c.pin === "auto" ? " selected" : "") + ">Automatic from age</option>" +
        BANDS.map(function (x) { return '<option value="' + x.id + '"' + (c.pin === x.id ? " selected" : "") + ">" + esc(x.label) + "</option>"; }).join("");
      return '<div class="ll-kidset" data-kidset="' + p.id + '">' +
        '<h3><span aria-hidden="true">' + p.emoji + "</span> " + esc(p.label) + '<small>' + esc(bandLabel(b)) + (a != null ? " · age " + a : "") + "</small></h3>" +
        '<label>First name<input type="text" data-k="name" maxlength="20" autocomplete="off" value="' + esc(p.label) + '"></label>' +
        '<label>Birth month<input type="month" data-k="birth" value="' + esc(c.birth) + '"></label>' +
        '<label>State<select data-k="state">' + stateOptions(c.state) + "</select></label>" +
        '<label>Learning<select data-k="mode">' + modeOpts + "</select></label>" +
        '<label>Age group<select data-k="pin">' + pinOpts + "</select></label>" +
        "</div>";
    }).join("");
    return '<section class="ll-card ll-kidsettings"><h2 style="margin:0 0 4px">Each child</h2>' +
      '<p class="hoot-line" style="margin:0 0 10px">Hoot picks lessons, reading and games from each child\'s age, state and learning setup. Saved on this device only.</p>' + rows + "</section>";
  }
  function onKidSetting(e) {
    var el = e.target, box = el.closest && el.closest("[data-kidset]");
    if (!box) return;
    var id = box.getAttribute("data-kidset"), k = el.getAttribute("data-k");
    if (!kidStore[id]) kidStore[id] = {};
    kidStore[id][k] = el.value;
    saveKids();
    if (k === "name") applyNames();
    if (state.profile && state.profile.id === id && k === "state") applyChildState(id);
    render();
  }

  function newGateQuestion() {
    var a = 3 + Math.floor(Math.random() * 7);
    var b = 3 + Math.floor(Math.random() * 7);
    state.gateA = a;
    state.gateB = b;
    state.gateAns = a * b;
    state.gateTyped = "";
  }

  function paintGateQuestion() {
    var q = $("#ll-gate-q");
    var typed = $("#ll-gate-typed");
    if (q) q.textContent = "What is " + state.gateA + " × " + state.gateB + "?";
    if (typed) typed.textContent = state.gateTyped ? String(state.gateTyped) : "·";
  }

  function setupParentGate() {
    var par = $("#panel-parent");
    if (state.parentUnlocked) {
      document.body.classList.add("ll-parent-unlocked");
      if (par) {
        par.hidden = false;
        par.classList.add("active");
        var h2 = par.querySelector(".stage-head h2, h2");
        if (h2) h2.textContent = "Parent view — a grown-up question";
      }
      return;
    }
    document.body.classList.remove("ll-parent-unlocked");
    if (par) {
      par.hidden = true;
      par.classList.remove("active");
    }
    if (state.gateAns == null) newGateQuestion();
    var pad = $("#ll-gate-pad");
    if (pad && !pad.dataset.ready) {
      pad.dataset.ready = "1";
      function addKey(label, id, cls) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "ll-btn" + (cls ? " " + cls : "");
        b.textContent = label;
        if (id) b.id = id;
        pad.appendChild(b);
        return b;
      }
      for (var n = 1; n <= 9; n++) addKey(String(n), "ll-gate-k" + n, "sm");
      addKey("Clear", "ll-gate-clear", "sm");
      addKey("0", "ll-gate-k0", "sm");
      addKey("Check", "ll-gate-check", "pri sm");
      pad.addEventListener("click", function (e) {
        var t = e.target.closest("button");
        if (!t || state.parentUnlocked) return;
        if (t.id === "ll-gate-clear") {
          state.gateTyped = "";
          paintGateQuestion();
          return;
        }
        if (t.id === "ll-gate-check") {
          checkParentGate();
          return;
        }
        var digit = t.textContent;
        if (/^[0-9]$/.test(digit) && String(state.gateTyped || "").length < 3) {
          state.gateTyped = String(state.gateTyped || "") + digit;
          paintGateQuestion();
        }
      });
    }
    paintGateQuestion();
  }

  function checkParentGate() {
    var msg = $("#ll-gate-msg");
    var got = parseInt(state.gateTyped, 10);
    if (got === state.gateAns) {
      state.parentUnlocked = true;
      document.body.classList.add("ll-parent-unlocked");
      if (msg) msg.textContent = "That's right — welcome in.";
      render();
      return true;
    }
    if (msg) msg.textContent = "That's not it. Here's a new question.";
    newGateQuestion();
    paintGateQuestion();
    var gate = $("#ll-parent-gate");
    if (gate) {
      gate.classList.remove("ll-gate-shake");
      void gate.offsetWidth;
      gate.classList.add("ll-gate-shake");
    }
    return false;
  }

  var photoStore = { kida: [], kidb: [], kidc: [] };
  function getPhotos(id) { return photoStore[id] || []; }

  function logGameClose() {
    var g = state.gameOpen; state.gameOpen = null;
    if (g && state.profile) logAdd(state.profile.id, { type: "game", title: g.title, ms: Date.now() - g.t0 });
  }
  document.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("#game-close")) { logGameClose(); setTimeout(finishPendingStone, 60); } }, true);
  document.addEventListener("hoot-lesson-done", function () { if (state.tab === "today" && !document.body.classList.contains("ll-overlay-open")) render(); });

  function render() {
    try { if (window.HootGames && !document.querySelector(".pg-singing.kh-bye")) window.HootGames.stopSing(); } catch (e) {}
    var app = $("#ll-app");
    if (!app || !state.profile) return;
    var html = "";
    if (state.tab === "today") html = renderToday();
    else if (state.tab === "games") html = renderGames();
    else if (state.tab === "learn") html = renderLearn();
    else if (state.tab === "reading") html = renderReading();
    else if (state.tab === "memories") html = renderMemories();
    else if (state.tab === "activities") html = renderActivities();
    else if (state.tab === "days") html = renderDays();
    else html = renderGrownups();
    app.innerHTML = html;
    applyBand();
    document.body.classList.remove("ll-tab-days", "ll-tab-grownups", "ll-tab-learn");
    if (state.tab === "days") document.body.classList.add("ll-tab-days");
    if (state.tab === "grownups") document.body.classList.add("ll-tab-grownups");
    if (state.tab === "learn") document.body.classList.add("ll-tab-learn");
    $$("#ll-tabs button").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-tab") === state.tab); });
    bumpStars();
    afterRender();
  }

  var _watching = false;
  function applyBand() {
    if (!_watching) { _watching = true; watchMuseDone(); }
    var exChart = document.querySelector("#parent-chart"); if (exChart && exChart.closest(".pcard")) exChart.closest(".pcard").hidden = true;
    var teen = isTeen();
    document.body.classList.toggle("ll-kidband", isKidBand());
    document.body.classList.toggle("ll-pathlock", !playUnlocked());
    document.body.classList.toggle("ll-teen", teen);
    if (window.HootStudy && window.HootStudy.syncDark) window.HootStudy.syncDark(state.profile ? state.profile.id : "");
    if (!teen && window.HootStudyPro && window.HootStudyPro.stopAmbient) window.HootStudyPro.stopAmbient();
    var h1 = $(".ll-shell-header h1");
    if (h1) h1.textContent = teen ? "Hoot · Study" : "🌈 Hoot's World";
    $$("#ll-tabs button").forEach(function (b) {
      var id = b.getAttribute("data-tab");
      var t = TABS.filter(function (x) { return x.id === id; })[0];
      if (!t) return;
      var lb = b.querySelector(".lb"), ic = b.querySelector(".ic");
      var lab = teen ? TEEN_TAB_LABEL[id] : t.label, icn = teen ? TEEN_TAB_ICON[id] : t.icon;
      if (id === "games" && !hasGames()) { lab = "Practice"; icn = "🎯"; }
      if (isKidBand()) { if (id === "today") { lab = "Home"; icn = "🏠"; } if (id === "games") { lab = "Play"; icn = "🎮"; } }
      if (lb) lb.textContent = lab;
      if (ic) ic.textContent = icn;
    });
  }

  function afterRender() {
    if (state.tab === "days") {
      var map = $("#roadmap");
      if (map) map.hidden = false;
      /* Roadmap render (and placeAvoid) runs ~50ms after ll-tab-days.
         Scroll the child's token into the visible band so they can see
         it on their current stop. */
      setTimeout(scrollDaysMarkerIntoView, 80);
      setTimeout(scrollDaysMarkerIntoView, 200);
    }
    if (state.tab === "grownups") {
      setupParentGate();
    } else {
      document.body.classList.remove("ll-parent-unlocked");
      /* 3e21: leaving Grown-ups locks it again with a NEW question and an
         empty box — before, the last correct answer stayed typed in, so a
         child could just press Check. */
      if (state.parentUnlocked || state.gateTyped) { state.gateAns = null; state.gateTyped = ""; }
      state.parentUnlocked = false;
    }
  }

  function setTab(id) {
    closeOverlay();
    if ((id === "games" || id === "learn") && !playUnlocked()) id = "today"; /* 3e38: path first */
    state.tab = id;
    render();
    window.scrollTo(0, 0);
    /* body is the real scroller in this shell; reset it too so a new tab
       opens at its top. Days re-centres its marker after this (80/200 ms). */
    try { document.body.scrollTop = 0; document.documentElement.scrollTop = 0; } catch (e) {}
  }

  function syncMuseProfile(id) {
    if (!id) return;
    /* Muse curProf() and the Days #rm-marker both read body[data-profile].
       LL ids are already Muse ids (kida, kidb, kidc). Hand the pick to
       Muse's own selectProfile so that child's saved journey is restored;
       do not invent a second source of truth. */
    document.body.setAttribute("data-profile", id);
    if (typeof window.__hootSelectProfile === "function") {
      window.__hootSelectProfile(id, { silent: true });
    }
    if (typeof window.__hootRoadmapRender === "function") {
      try { window.__hootRoadmapRender(); } catch (err) {}
    }
  }

  function scrollDaysMarkerIntoView() {
    var marker = document.getElementById("rm-marker");
    if (!marker) return;
    var st = window.getComputedStyle(marker);
    if (st.display === "none" || st.visibility === "hidden") return;
    var r = marker.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    var tabs = document.getElementById("ll-tabs");
    var tabTop = tabs ? tabs.getBoundingClientRect().top : window.innerHeight;
    var head = 0;
    ["#preview-banner", "#ll-banner", ".ll-shell-header"].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      var cs = window.getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      var hr = el.getBoundingClientRect();
      if (hr.height > 0 && hr.bottom > head) head = hr.bottom;
    });
    var mid = (head + tabTop) / 2;
    var delta = (r.top + r.height / 2) - mid;
    if (Math.abs(delta) < 8) return;
    document.body.scrollTop = (document.body.scrollTop || 0) + delta;
  }

  function setProfile(id, opts) {
    stopAllVoices(opts && opts.keepGreet ? { keepGreet: true } : undefined);
    var p = PROFILES.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    state.profile = p;
    syncMuseProfile(id);
    applyChildState(id);
    document.body.classList.add("ll-shell-on");
    var gate = $("#profile-gate");
    if (gate) { gate.hidden = true; gate.style.display = "none"; }
    var welcome = $("#welcome");
    if (welcome) welcome.hidden = true;
    $("#ll-app").hidden = false;
    $("#ll-tabs").hidden = false;
    state.tab = "today";
    render();
  }

  function stopReadAudio() {
    var audio = $("#ll-read-audio");
    if (audio) { audio.__govWait = false; audio.__govNext = null; try { audio.pause(); } catch (e) {} }
  }
  function playRead(title) {
    var a = document.querySelector("audio, #dock-audio");
    var clips = document.body.classList.contains("ll-teen")
      ? ["assets/voice/tut-owl-hello.mp3"]
      : ["assets/voice/hoot-welcome.mp3", "assets/voice/owl-hello.mp3"];
    var audio = $("#ll-read-audio");
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = "ll-read-audio";
      document.body.appendChild(audio);
    }
    audio.src = clips[0];
    audio.play().catch(function () {});
  }

  function addPhoto(title) {
    var inp = document.createElement("input");
    inp.type = "file";
    inp.accept = "image/*";
    inp.setAttribute("aria-label", "Add a photo of " + (title || "this activity"));
    inp.onchange = function () {
      var f = inp.files && inp.files[0];
      if (!f) return;
      var url = URL.createObjectURL(f);
      if (!photoStore[state.profile.id]) photoStore[state.profile.id] = [];
      photoStore[state.profile.id].push(url);
      var box = $("#ll-photo-preview");
      if (box) {
        box.hidden = false;
        box.innerHTML = "";
        var img = document.createElement("img");
        img.alt = "Your photo of " + (title || "the activity");
        img.src = url;
        box.appendChild(img);
        var cap = document.createElement("p");
        cap.textContent = "Photo added — Hoot can see your " + (title || "adventure") + "!";
        box.appendChild(cap);
      }
    };
    inp.click();
  }

  function openGame(key) {
    var g = GAMES.filter(function (x) { return x.key === key; })[0];
    state.gameOpen = { title: g ? g.title : key, t0: Date.now() };
    var keepToday = !!window.__hwFromTodayPath;
    var keepStone = state.pendingStone;
    /* A lesson overlay left open would cover the game. closeOverlay
       also cancels any pending startTeach from the lesson just closed. */
    if (document.body.classList.contains("ll-overlay-open") || document.body.classList.contains("ll-tutor-open") || document.body.classList.contains("ll-muse-card-open")) {
      closeOverlay();
      if (keepToday) window.__hwFromTodayPath = true;
      if (keepStone) state.pendingStone = keepStone;
    } else {
      stopAllVoices();
    }
    if (typeof window.__hootOpenGame === "function") {
      window.__hootOpenGame(key);
      document.body.classList.add("game-open");
      var t = $("#game-title");
      if (t && g) t.textContent = g.title;
      var close = $("#game-close");
      if (close) close.textContent = "← Back";
    } else {
      nextView = { kind: "none" };
      openShellOverlay(g ? g.title : "Game", "<p style='padding:20px'>The game player is still loading. Try again in a moment.</p>");
    }
  }

  function parkNode(node) {
    restoreParked();
    if (!node) return;
    state._parked = { node: node, parent: node.parentNode, next: node.nextSibling };
    var host = $("#ll-obody");
    if (host) {
      host.appendChild(node);
      host.classList.remove("ll-one-lesson");
    }
    node.hidden = false;
    node.style.display = "";
    /* Do not mutate .panel / #ny-creator-wrap classList: Muse's Little
       Explorers tutor watches those class changes and calls stopTutor(). */
    var isPath = !!(node.classList && node.classList.contains("panel")) || node.id === "ny-creator-wrap" || (node.id && node.id.indexOf("panel-") === 0);
    if (!isPath) node.classList.add("ll-lesson-host", "active");
    if (host && isPath) host.classList.add("ll-path-open");
  }
  function restoreParked() {
    var p = state._parked;
    if (!p || !p.node || !p.parent) { state._parked = null; return; }
    clearLessonFocus(p.node);
    if (p.next && p.next.parentNode === p.parent) p.parent.insertBefore(p.node, p.next);
    else p.parent.appendChild(p.node);
    p.node.classList.remove("ll-lesson-host", "ll-muse-host", "ll-path-host");
    var ob = $("#ll-obody");
    if (ob) ob.classList.remove("ll-path-open", "ll-one-lesson", "ll-little-one");
    state._parked = null;
  }
  /* Keep Muse lessons inside their path panel so the spoken-tutor
     handlers, clip channel and #panel-* CSS still apply. Parking the
     bare .lsn node was why Hoot went silent and the tutor looked unstyled. */
  var PATH_PANEL = {
    little: "panel-little",
    early: "panel-early",
    quest: "panel-quest",
    creator: "panel-creator",
    teen: "panel-teen",
    ny: "ny-creator-wrap"
  };
  var PATH_TITLE = {
    little: "Little Explorers",
    early: "Early Readers",
    quest: "Quest Kids",
    creator: "Creator path",
    teen: "Teen path",
    ny: "NY Tutor"
  };
  function pathIdForTitle(title) {
    var id = null;
    Object.keys(LESSONS).forEach(function (k) {
      LESSONS[k].forEach(function (l) { if (l.title === title) id = k; });
    });
    return id;
  }
  function pathHostFor(titleOrId) {
    var defId = isTeen() ? "ny" : "little";
    var id = PATH_PANEL[titleOrId] ? titleOrId : (pathIdForTitle(titleOrId) || defId);
    var el = document.getElementById(PATH_PANEL[id] || PATH_PANEL[defId]);
    return el || document.getElementById(PATH_PANEL[defId] || "panel-little");
  }
  function clearLessonFocus(root) {
    if (!root) return;
    $$(".ny-past, .ny-now", root).forEach(function (el) { el.classList.remove("ny-past", "ny-now"); });
    root.classList.remove("ll-path-host");
    if (root.id === "ny-creator-wrap") root.style.display = "";
    $$(".ll-lesson-hidden, .ll-lesson-focus", root).forEach(function (el) {
      el.classList.remove("ll-lesson-hidden", "ll-lesson-focus");
    });
  }
  var teachGen = 0;
  function startTeach(card) {
    if (!card) return;
    /* 3e55: a finished lesson opened again starts fresh (no answer showing, taps work).
       The Little Explorers cards do this themselves (Play again); the other engines get
       their replay flag and clean answers here. The star stays. */
    if (card.classList.contains("done") && !card._cfg) {
      card._again = true;
      Array.prototype.forEach.call(card.querySelectorAll(".lsn-opt"), function (o) { o.disabled = false; o.classList.remove("right", "wrong", "lt-gold"); });
      var fb0 = card.querySelector(".lsn-fb"); if (fb0) fb0.textContent = "";
      card.classList.remove("lsn-finished");
      /* Wave C1: "starts fresh" must include the stage flags — with _solo /
         _tibDone left over from the first run, the first right tap fell
         through to the plain completion branch and the guided → solo →
         teach-back flow never re-ran (so a replay produced no completion
         signal at all). Reset them and the teach-back block too. */
      card._solo = false; card._tib = false; card._tibDone = false;
      if (card._tibBlock) {
        card._tibBlock.hidden = true;
        Array.prototype.forEach.call(card._tibBlock.querySelectorAll(".lsn-tib-opt"), function (o) { o.disabled = false; o.classList.remove("right", "wrong"); });
      }
    }
    /* Moved lessons (3e48): the old card is only a launcher — its player UI
       (question, answers, teach stage) is hidden by design, so auto-running
       its teach sequence plays a spoken question the child can see no
       answers for and cannot tap ("can't press anything", confirmed on
       Dawid's phone 2026-11-15 for Colour names + Shape names). Start the
       real lesson instead, hands-free like teach mode intends. */
    if (card.hasAttribute && card.hasAttribute("data-hl-moved")) {
      var goBtn = card.querySelector(".ll-hl-go");
      var mgen = ++teachGen;
      try { window.__startTeach = { moved: true, hasGo: !!goBtn, gen: mgen }; } catch (e) {}
      if (!goBtn) return;
      setTimeout(function () {
        if (mgen !== teachGen) return;
        try {
          goBtn.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
        } catch (e) {
          try { goBtn.click(); } catch (e2) {}
        }
      }, 60);
      return;
    }
    var btn = card.querySelector(".lsn-replay, .tutor-replay");
    var gen = ++teachGen;
    try { window.__startTeach = { hasCard: !!card, hasBtn: !!btn, disabled: !!(btn && btn.disabled), text: btn && btn.textContent, gen: gen }; } catch (e) {}
    /* Little Explorers lessons: ask Round 1 immediately on open (no multi-second intro/teach wait);
       "Show me again, Hoot!" remains available for the full walkthrough. */
    if (card._cfg && typeof window.__hwStartLittleAsk === "function") {
      setTimeout(function () {
        if (gen !== teachGen) return;
        try { window.__hwStartLittleAsk(card); } catch (e) {}
      }, 20);
      return;
    }
    /* Nested click during Play now is swallowed by Muse's capture-phase
       listener. Start teaching once that turn has finished. teachGen
       makes a pending click a no-op after closeOverlay or a new open. */
    setTimeout(function () {
      if (gen !== teachGen) return;
      if (!btn || btn.disabled) return;
      try {
        btn.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
      } catch (e) {
        try { btn.click(); } catch (e2) {}
      }
    }, 60);
  }
  /* 3e48: Colour names, Shape names, More colours and Star and heart now run in the
     one-question-at-a-time lesson engine. The Little Explorers path list still showed
     the old cards for them (the ones that said "find red, find blue, find yellow").
     Those cards now show one big button that opens the new lesson instead. */
  function markMovedLessons(host) {
    var h = HL(); if (!h || !host) return;
    var lsns = $$(".lsn", host);
    lsns.forEach(function (el) {
      var t = el.querySelector("h4"); var title = t && t.textContent.trim();
      if (!title || !h.byTitle(title)) return;
      el.setAttribute("data-hl-moved", "1");
      /* finished in the new engine counts as finished on the path list too */
      var kid = state.profile && state.profile.id;
      if (kid && h.isDone(title, kid) && !el.classList.contains("done")) el.classList.add("done");
      if (el.querySelector(".ll-hl-go")) return;
      var b = document.createElement("button");
      b.type = "button"; b.className = "ll-hl-go";
      b.innerHTML = "▶ Start with Hoot";
      b.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); openLesson(title); });
      var top = el.querySelector(".lsn-top");
      if (top && top.parentNode === el) top.insertAdjacentElement("afterend", b); else el.appendChild(b);
    });
    var pill = host.querySelector("[data-lsn-progress]");
    if (pill && lsns.length) {
      var dn = lsns.filter(function (x) { return x.classList.contains("done"); }).length;
      pill.textContent = dn === lsns.length ? "🏆 All " + dn + " lessons done — path complete!" : "⭐ " + dn + " of " + lsns.length + " lessons done";
    }
  }
  function openPathHost(host, title, focus) {
    if (!host) return false;
    nextView = focus ? { kind: "lessonFocus", hostId: host.id, title: title, focusTitle: title } : { kind: "path", hostId: host.id, title: title };
    restoreParked();
    clearLessonFocus(host);
    var body = $("#ll-obody");
    if (body) body.innerHTML = "";
    openShellOverlay(title, "");
    document.body.classList.add("ll-tutor-open");
    parkNode(host);
    markMovedLessons(host);
    if (host.id === "ny-creator-wrap") host.style.display = "block";
    if (body) body.classList.toggle("ll-little-one", host.id === "panel-little" && !!focus);
    if (focus) {
      if (body) body.classList.add("ll-one-lesson");
      $$(".lsn, .ny-lsn", host).forEach(function (el) {
        if (el === focus) el.classList.add("ll-lesson-focus");
        else el.classList.add("ll-lesson-hidden");
      });
      try {
        if (body) {
          body.scrollTop = 0;
          /* Scroll only the overlay. scrollIntoView would also move
             document.body, leaving Today Play now buttons under the tab bar. */
          var y = window.scrollY, b = document.body.scrollTop;
          var top = focus.offsetTop || 0;
          var n = focus.parentElement;
          while (n && n !== body) { top += n.offsetTop || 0; n = n.parentElement; }
          body.scrollTop = Math.max(0, top - 8);
          window.scrollTo(0, y);
          document.body.scrollTop = b;
        }
      } catch (e) {}
      startTeach(focus);
      if (focus.classList.contains("ny-lsn")) nyStepper(focus);
      wcThenInsert(focus.getAttribute ? focus.getAttribute("data-lsn-id") : null, title); /* Wave C1: Then & Now strip */
      wc2PrintBtnInsert(focus.getAttribute ? focus.getAttribute("data-lsn-id") : null, title); /* Wave C2: Print card */
    } else {
      try { if (body) body.scrollTop = 0; } catch (e) {}
    }
    return true;
  }
  /* ===== 3e26: one step at a time for older-kid lessons =====
     A step bar shows where she is; finished steps fold away (one tap shows
     them again) and the overlay scrolls to the step she's on. */
  var NY_STEPS = [
    { sel: ".ny-warmup", label: "Warm-up" },
    { sel: ".ny-phase:nth-of-type(1)", label: "Watch" },
    { sel: ".ny-check", label: "Check" },
    { sel: ".ny-phase:nth-of-type(2)", label: "Together" },
    { sel: ".ny-phase:nth-of-type(3)", label: "Your turn" },
    { sel: ".ny-teachback", label: "Teach back" },
    { sel: ".ny-recap", label: "Recap" }
  ];
  function nySections(card) {
    var phases = $$(".ny-phase", card);
    return [card.querySelector(".ny-warmup"), phases[0], card.querySelector(".ny-check"), phases[1], phases[2], card.querySelector(".ny-teachback"), card.querySelector(".ny-recap")];
  }
  function nyStepper(card) {
    if (card._nyStep) { card._nyStep(); return; }
    var bar = document.createElement("ol");
    bar.className = "ny-stepper";
    bar.setAttribute("aria-label", "Lesson steps");
    var more = document.createElement("button");
    more.type = "button"; more.className = "ny-showall"; more.textContent = "Show earlier steps";
    more.addEventListener("click", function () { card.classList.toggle("ny-all"); more.textContent = card.classList.contains("ny-all") ? "Hide earlier steps" : "Show earlier steps"; });
    var top = card.querySelector(".lsn-top");
    if (top && top.nextSibling) card.insertBefore(bar, top.nextSibling); else card.insertBefore(bar, card.firstChild);
    var last = -1;
    function update() {
      var secs = nySections(card), cur = -1;
      secs.forEach(function (s, i) { if (s && !s.hidden && s.offsetParent !== null) cur = i; });
      var warmOpen = secs[0] && !secs[0].querySelector(".right, .ny-right, [data-right].on, .ok");
      if (warmOpen && cur > 0 && secs[0].querySelector("[data-right]")) cur = Math.max(cur, 1);
      secs.forEach(function (s, i) {
        if (!s) return;
        s.classList.toggle("ny-past", i < cur && !(i === 0 && warmOpen));
        s.classList.toggle("ny-now", i === cur);
      });
      $$(".ny-hoot, .ny-vocab", card).forEach(function (n) { n.classList.toggle("ny-past", cur >= 2); });
      bar.innerHTML = NY_STEPS.map(function (st, i) {
        var has = !!secs[i];
        if (!has) return "";
        return '<li class="' + (i < cur ? "done" : i === cur ? "now" : "") + '"><span>' + (i < cur ? "✓" : "") + "</span>" + st.label + "</li>";
      }).join("");
      if (cur >= 1 && !more.parentNode) bar.parentNode.insertBefore(more, bar.nextSibling);
      if (cur !== last && cur > 0) {
        var el = secs[cur], body = $("#ll-obody");
        if (el && body) { var y = 0, n = el; while (n && n !== body) { y += n.offsetTop || 0; n = n.offsetParent; } body.scrollTop = Math.max(0, y - 90); }
      }
      last = cur;
    }
    card._nyStep = update;
    var mo = new MutationObserver(function () { clearTimeout(card._nyT); card._nyT = setTimeout(update, 60); });
    mo.observe(card, { subtree: true, attributes: true, attributeFilter: ["hidden", "class"] });
    update();
  }

  function openPath(id) {
    window.__hwFromTodayPath = false;
    var h = HL();
    if (h && h.paths[id]) {
      nextView = { kind: "hlpath", id: id, title: h.paths[id].title };
      openShellOverlay(h.paths[id].title, "");
      document.body.classList.add("ll-tutor-open");
      h.renderPath(id, $("#ll-obody"));
      return;
    }
    var host = pathHostFor(id);
    openPathHost(host, PATH_TITLE[id] || "Learn", null);
  }
  function openLesson(title) {
    var h = HL();
    if (h && h.byTitle(title)) {
      nextView = { kind: "hl", title: title };
      openShellOverlay(title, "");
      document.body.classList.add("ll-tutor-open");
      h.play(h.byTitle(title).id, $("#ll-obody"));
      wcThenInsert(null, title); /* Wave C1: Then & Now strip */
      wc2PrintBtnInsert(null, title); /* Wave C2: Print card */
      return;
    }
    openLessonRoute(title, false);
  }

  /* ID-primary lesson open (Fix 11 port + Wave 2 route fix): check HL() FIRST so
     moved lessons (Colour names, Shape names, More colours, Star and heart) and
     registered courses open directly without double-parking a hidden launcher card. */
  function openLessonById(id) {
    var h = HL();
    if (h && h.byId && h.byId[id]) { openLesson(h.byId[id].title); return true; }
    var rec = LESSON_BY_ID[id];
    if (!rec) return false;
    if (h && h.byTitle && h.byTitle(rec.lesson.title)) { openLesson(rec.lesson.title); return true; }
    restoreParked();
    wipeOverlayHtml();
    var found = findLessonNodeById(id);
    if (!found) { openLessonRoute(rec.lesson.title, true); return true; }
    var host = (found.closest && (found.closest(".panel") || found.closest("#ny-creator-wrap") || found.closest(".lsn-wrap"))) || pathHostFor(rec.lesson.title) || found;
    openPathHost(host, rec.lesson.title, found);
    return true;
  }

  function openLessonRoute(title, legacyOnly) {
    if (!legacyOnly) {
      var id = lessonIdForTitle(title);
      if (id && openLessonById(id)) return;
    }
    restoreParked();
    wipeOverlayHtml();
    var found = findLessonNode(title);
    var host = (found && found.closest && (found.closest(".panel") || found.closest("#ny-creator-wrap") || found.closest(".lsn-wrap"))) || pathHostFor(title) || found;
    if (!found && host) found = host.querySelector(".lsn, .ny-lsn") || null;
    if (!host) return;
    openPathHost(host, title, found);
  }

  function findLessonNodeById(id) {
    if (!id) return null;
    var nodes = $$('[data-lsn-id="' + id + '"]');
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].closest("#ll-app, #ll-overlay, #ll-tabs")) continue;
      return nodes[i];
    }
    return nodes.length ? nodes[0] : null;
  }

  /* 3e19: a lesson's "Next lesson" button opens the next card in the same overlay. */
  window.__llOpenLesson = function (title) {
    var ttl = $("#ll-otitle");
    openLesson(title);
    if (ttl) ttl.textContent = title;
  };
  /* Wave 2 (Finding 2 — Hybrid Option A): when a 2-4 lesson launched from Today's
     Path finishes, auto-advance to the next uncompleted stone on Today's Path (or
     return to Kid Home to celebrate & warm the pet egg when all stones are done). */
  window.__llAdvanceTodayPath = function () {
    if (!state.profile || !isLittleBand()) { window.__hwFromTodayPath = false; closeOverlay(); return; }
    if (document.body.classList.contains("game-open")) {
      var cg = $("#game-close");
      if (cg) cg.click();
    }
    if (state.pendingStone) finishPendingStone();
    var plan = currentPlan(), nxt = null;
    for (var i = 0; i < plan.length; i++) {
      if (isRequiredStop(plan[i]) && !stoneDone(plan[i])) { nxt = plan[i]; break; }
    }
    if (!nxt) {
      window.__hwFromTodayPath = false;
      closeOverlay();
      if (state.tab === "today") render();
      return;
    }
    state.pendingStone = nxt.title;
    if (nxt.kind === "custom") { window.__hwFromTodayPath = false; openCustomStop(nxt.title); return; }
    if (nxt.kind === "story") { window.__hwFromTodayPath = false; state.pendingStone = STORY_STOP; openStory(); return; }
    if (nxt.kind === "game" && nxt.key) { window.__hwFromTodayPath = true; openGame(nxt.key); return; }
    if (nxt.kind === "pgame" && nxt.key) { window.__hwFromTodayPath = true; openPartyGame(nxt.key); return; }
    if (nxt.kind === "shelf") {
      window.__hwFromTodayPath = false;
      var sh = findShelfNode(nxt.title);
      if (sh) { openMuseCard(nxt.title, sh); return; }
    }
    if (nxt.kind === "outdoor") {
      window.__hwFromTodayPath = false;
      var hb = findHubIdeaNode(nxt.title);
      if (hb) { openMuseCard(nxt.title, hb); return; }
    }
    window.__hwFromTodayPath = true;
    openLesson(nxt.title);
  };

  function findLessonNode(title) {
    var t = title.toLowerCase();
    function matchHead(node) {
      var h = node.querySelector("h2,h3,h4,h5");
      return h && h.textContent.trim().toLowerCase() === t;
    }
    var preferred = $$(".lsn[data-lsn], .ny-lsn, .lsn");
    for (var i = 0; i < preferred.length; i++) {
      if (preferred[i].closest("#ll-app, #ll-overlay, #ll-tabs")) continue;
      if (matchHead(preferred[i])) return preferred[i];
    }
    var heads = $$("h2,h3,h4,h5");
    for (var j = 0; j < heads.length; j++) {
      if (heads[j].closest("#ll-app, #ll-overlay, #ll-tabs, #profile-gate")) continue;
      if (heads[j].textContent.trim().toLowerCase() === t) {
        return heads[j].closest(".lsn, .ny-lsn, .lesson") || heads[j].parentNode;
      }
    }
    return null;
  }

  function guessPathButton(title) {
    var all = [];
    Object.keys(LESSONS).forEach(function (k) {
      LESSONS[k].forEach(function (l) { if (l.title === title) all.push(k); });
    });
    var band = all[0] || "little";
    return document.querySelector('[data-open-tab="' + band + '"]');
  }

  function wipeOverlayHtml() {
    var body = $("#ll-obody");
    if (body) body.innerHTML = "";
    var ttl = $("#ll-otitle");
    if (ttl) ttl.textContent = "";
  }

  /* ===== Wave B (B5): overlay view-history stack for the back bar =====
     Every overlay opener records the view it is opening in nextView just
     before it calls openShellOverlay. Opening a view pushes the view it
     replaces (the tab beneath, with its body scroll, or the overlay view
     beneath, with its list scroll). Back pops and restores that exact
     view; Home leaves the overlay for Today. closeOverlay (a full exit)
     clears the stack, so the bar never resurrects a stale view. */
  var viewStack = [];
  var curView = null;
  var nextView = null;
  var navRestoring = false;
  function bodyScrollY() { return window.scrollY || document.body.scrollTop || document.documentElement.scrollTop || 0; }
  function setBodyScrollY(y) { try { window.scrollTo(0, y); } catch (e) {} try { document.body.scrollTop = y; } catch (e) {} try { document.documentElement.scrollTop = y; } catch (e) {} }
  function sameView(a, b) {
    if (!a || !b) return false;
    return [a.kind, a.id || "", a.title || "", a.hostId || "", a.key || ""].join("|") === [b.kind, b.id || "", b.title || "", b.hostId || "", b.key || ""].join("|");
  }
  function findCardInHost(host, title) {
    if (!host || !title) return null;
    var t = String(title).replace(/\s+/g, " ").trim().toLowerCase();
    var cards = $$(".lsn, .ny-lsn", host);
    for (var i = 0; i < cards.length; i++) {
      var h = cards[i].querySelector("h4, h3, h2");
      if (h && h.textContent.replace(/\s+/g, " ").trim().toLowerCase() === t) return cards[i];
    }
    return null;
  }

  function openShellOverlay(title, inner) {
    /* Wave B: remember the view this one replaces, so Back restores it. */
    if (!navRestoring) {
      var ov0 = $("#ll-overlay");
      if (!ov0 || ov0.hidden) {
        viewStack.push({ kind: "tab", tab: state.tab, y: bodyScrollY() });
      } else if (curView && curView.kind !== "none" && !sameView(curView, nextView)) {
        var ob0 = $("#ll-obody");
        viewStack.push(Object.assign({}, curView, { oy: ob0 ? ob0.scrollTop : 0 }));
      }
    }
    if (nextView) { curView = nextView; nextView = null; }
    /* Restore parked Muse nodes first so a later innerHTML wipe cannot destroy them. */
    restoreParked();
    var ov = $("#ll-overlay");
    var ttl = $("#ll-otitle");
    var body = $("#ll-obody");
    if (ttl) ttl.textContent = title || "";
    if (body) body.innerHTML = (inner == null ? "" : String(inner));
    if (ov) { ov.hidden = false; ov.setAttribute("aria-hidden", "false"); }
    document.body.classList.add("ll-overlay-open");
    /* Library 2: a book on screen switches the overlay to full-screen mode. */
    document.body.classList.toggle("lib-book-open", !!(body && body.querySelector(".lib-reader, .lib-stage")));
    scheduleFitLearn(); setTimeout(fitLearn, 700);
  }

  /* 3e46: on a computer (mouse, wide window) lessons, Learn & Play games and shelf
     works were drawn at tablet size in a corner of a big empty screen. Their content
     is zoomed up to use the space; percentage widths still fill the window, so only
     the pictures, buttons and text get bigger. If the zoom would push a lesson off
     the bottom, it steps down until it fits. Phones and iPads are never zoomed. */
  function fitLearn() {
    var body = $("#ll-obody"), ov = $("#ll-overlay"); if (!body) return;
    var kids = Array.prototype.slice.call(body.children);
    kids.forEach(function (k) { k.style.zoom = ""; k.style.minHeight = ""; });
    body.removeAttribute("data-dz");
    if (!ov || ov.hidden || !kids.length) return;
    var fine = false; try { fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches; } catch (e) {}
    var W = body.clientWidth, H = body.clientHeight;
    if (!fine || W < 1100 || H < 500) return;
    /* a list to scroll through (a learning path) only gets a little bigger; a single
       lesson, game or shelf work gets the full size */
    var single = !!body.querySelector(".hl, .pg, .ll-lesson-focus") || kids.some(function (k) { return k.classList.contains("ll-muse-host"); });
    var z = Math.min(W / 820, single ? 1.8 : 1.3); if (z < 1.06) return;
    var over0 = body.scrollHeight > H + 4;
    /* 3e52: something already taller than the window (an older lesson card) is not
       zoomed: bigger would only push the answers further down the page */
    if (over0 && single) return;
    kids.forEach(function (k) { k.__hwH0 = k.getBoundingClientRect().height; });
    for (; z >= 1.06; z -= 0.1) {
      kids.forEach(function (k) {
        k.style.zoom = z.toFixed(2);
        /* a full-height card (Learn & Play) keeps filling the window, not z times it */
        if (k.classList.contains("pg")) k.style.minHeight = Math.floor(k.__hwH0 / z) + "px";
      });
      if (over0 || body.scrollHeight <= H + 4) break;
    }
    if (z < 1.06) { kids.forEach(function (k) { k.style.zoom = ""; k.style.minHeight = ""; }); return; }
    body.setAttribute("data-dz", z.toFixed(2));
  }
  /* while a game runs, its stage can grow (the round appears after Hoot's intro):
     only ever step the zoom DOWN then, so nothing jumps bigger mid-round */
  function shrinkLearn() {
    var body = $("#ll-obody"); if (!body) return;
    var z = parseFloat(body.getAttribute("data-dz") || "0"); if (!z) return;
    var H = body.clientHeight, kids = Array.prototype.slice.call(body.children), changed = false;
    while (body.scrollHeight > H + 4 && z > 1.06) {
      var nz = Math.max(1, z - 0.1);
      kids.forEach(function (k) {
        var h0 = k.__hwH0 || 0;
        k.style.zoom = nz.toFixed(2);
        if (k.classList.contains("pg") && h0) k.style.minHeight = Math.floor(h0 / nz) + "px";
      });
      z = nz; changed = true;
    }
    if (changed) body.setAttribute("data-dz", z.toFixed(2));
  }
  var shrinkT = null;
  var fitLearnT = null;
  function scheduleFitLearn() { if (fitLearnT) clearTimeout(fitLearnT); fitLearnT = setTimeout(fitLearn, 120); }
  window.__llFitLearn = fitLearn;
  window.addEventListener("resize", scheduleFitLearn);
  (function () {
    function watch() {
      var body = $("#ll-obody"); if (!body || body.__dzWatch || !window.MutationObserver) return;
      body.__dzWatch = 1;
      new MutationObserver(function (list) {
        var top = list.some(function (m) { return m.target === body; });
        if (top) scheduleFitLearn();
        else { if (shrinkT) clearTimeout(shrinkT); shrinkT = setTimeout(shrinkLearn, 200); }
      }).observe(body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "hidden", "style"] }); /* 3e52: a round can also appear by un-hiding, not only by adding nodes */
    }
    document.addEventListener("click", function (e) {
      setTimeout(watch, 0);
      /* the play screen of a Learn & Play game is shorter than its start screen: fit again */
      var t = e.target && e.target.closest && e.target.closest("#ll-obody .pg-play, #ll-obody .pg-again, #ll-obody .hl-again, #ll-obody .hl-next");
      if (t) { setTimeout(fitLearn, 450); setTimeout(fitLearn, 1500); }
    }, true);
    setTimeout(watch, 500);
  })();

  function openPartyGame(key) {
    var G = window.HootGames; if (!G) return;
    var g = G.list.filter(function (x) { return x.key === key; })[0]; if (!g) return;
    var keepToday = !!window.__hwFromTodayPath;
    var keepStone = state.pendingStone;
    if (document.body.classList.contains("ll-overlay-open")) closeOverlay();
    if (keepToday) window.__hwFromTodayPath = true;
    if (keepStone) state.pendingStone = keepStone;
    nextView = { kind: "party", key: key, title: g.title };
    openShellOverlay(g.title, "");
    document.body.classList.add("ll-tutor-open");
    state.partyOpen = { title: g.title, t0: Date.now() };
    G.play(key, $("#ll-obody"));
  }
  document.addEventListener("hoot-party-done", function (e) {
    var d = e.detail || {}; if (state.profile) logAdd(state.profile.id, { type: "game", title: d.title, ms: d.ms });
    state.partyOpen = null;
    if (state.pendingStone) finishPendingStone();
  });
  /* Wave 1 (Exit rule §6.2): leaving ANY lesson/player silences EVERY voice channel
     AND clears the Voice Governor's pending queue immediately, mid-sentence. */
  function stopAllVoices(opts) {
    if (!(opts && opts.keepGreet)) {
      try { if (window.__govStopAll) window.__govStopAll(); } catch (e) {}
      try { if (window.__hwStop) window.__hwStop(); } catch (e) {}
    }
    try { if (window.__hwStopIntro) window.__hwStopIntro(); } catch (e) {}
    try { if (window.__hwStopLittleTutor) window.__hwStopLittleTutor(); } catch (e) {}
    try { if (window.__hwStopOlderTutor) window.__hwStopOlderTutor(); } catch (e) {}
    try { if (window.__hootKidcVoice) window.__hootKidcVoice.stop(); } catch (e) {}
    try { if (window.HootStudy) window.HootStudy.stop(); } catch (e) {}
    try { if (HL()) HL().stop(); } catch (e) {}
    try { if (window.HootGames) window.HootGames.stop(); } catch (e) {}
    try { if (window.__we1StopHello) window.__we1StopHello(); } catch (e) {}
    try { if (window.__msStop) window.__msStop(); } catch (e) {}
    try { stopStory(); } catch (e) {}
    try { stopSayClip(); } catch (e) {}
    try { stopReadAudio(); } catch (e) {}
    try { we1StopNote(); } catch (e) {}
    try { libStopTimers(); } catch (e) {}
    if (!(opts && opts.keepCar)) { try { we2CarFullStop(); } catch (e) {} }
    try { if (window.__ecCleanup) window.__ecCleanup(); } catch (e) {}
  }
  window.__llStopAllVoices = stopAllVoices;
  function closeOverlay() {
    /* Wave B: a full exit clears the back stack (a restore in flight keeps it). */
    if (!navRestoring) { viewStack.length = 0; curView = null; nextView = null; libState = null; libFind = null; window.__hwFromTodayPath = false; }
    stopAllVoices();
    if (state.partyOpen && state.profile) { logAdd(state.profile.id, { type: "game", title: state.partyOpen.title, ms: Date.now() - state.partyOpen.t0 }); state.partyOpen = null; }
    var stoneToFinish = state.pendingStone;
    if (stoneToFinish) setTimeout(function () { if (state.pendingStone === stoneToFinish) finishPendingStone(); }, 0);
    /* Return parked Muse nodes, then wipe leftover overlay HTML so the next
       open (lesson, game, work, outdoor) cannot show the previous card's text. */
    teachGen++;
    restoreParked();
    wipeOverlayHtml();
    document.body.classList.remove("ll-overlay-open", "ll-tutor-open", "ll-muse-card-open", "game-open", "lib-book-open");
    var ov = $("#ll-overlay");
    if (ov) { ov.hidden = true; ov.setAttribute("aria-hidden", "true"); }
    $$(".ll-lesson-host").forEach(function (n) { n.classList.remove("ll-lesson-host"); });
    var closeGame = $("#game-close");
    if (closeGame && $("#game-overlay") && !$("#game-overlay").hidden) {
      closeGame.click();
    }
    var go = $("#game-overlay");
    if (go) go.hidden = true;
    var gt = $("#game-title");
    if (gt) gt.textContent = "";
  }

  /* ===== Wave B (B5): Back / Home for the overlay back bar ===== */
  function restoreView(e) {
    navRestoring = true;
    try {
      if (e.kind === "path") { var h1 = document.getElementById(e.hostId); if (h1) openPathHost(h1, e.title, null); }
      else if (e.kind === "lessonFocus") { var h2 = document.getElementById(e.hostId); if (h2) openPathHost(h2, e.title, findCardInHost(h2, e.focusTitle || e.title)); }
      else if (e.kind === "hlpath") openPath(e.id);
      else if (e.kind === "hl") openLesson(e.title);
      else if (e.kind === "party") openPartyGame(e.key);
      else if (e.kind === "muse") { var n = findShelfNode(e.title) || findHubIdeaNode(e.title); if (n) openMuseCard(e.title, n); }
      else if (e.kind === "story") openStory(e.key);
      else if (e.kind === "custom") openCustomStop(e.title);
      else if (e.kind === "stickers") { nextView = { kind: "stickers", title: "My stickers" }; openShellOverlay("My stickers", stickerBook()); }
      else if (e.kind === "rightnow") openRightNow(e.key);
      else if (e.kind === "worldmap") openWorldMap();
      else if (e.kind === "wc2missions") openMissions();
      else if (e.kind === "wc2mission") openMission(e.key);
      else if (e.kind === "wc2ihave") openIhave();
      else if (e.kind === "wc2quest") openQuestDay(e.key);
      else if (e.kind === "we2garden") openOopsGarden();
      else if (e.kind === "we2car") openCarMode();
      else if (e.kind === "book") openBook(e.key, e.page || 0);
    } catch (err) {}
    navRestoring = false;
    if (e.oy != null) {
      var oy = e.oy;
      setTimeout(function () { var ob = $("#ll-obody"); if (ob) ob.scrollTop = oy; }, 60);
      setTimeout(function () { var ob = $("#ll-obody"); if (ob) ob.scrollTop = oy; }, 350);
    }
  }
  function goBack() {
    stopAllVoices();
    var e = viewStack.pop();
    /* Fix pass 2: an HL lesson opened through a parked path host (Today's
       Pick, the Learn grid) sits on top of a lessonFocus/path entry that is
       a funnel, not a screen — restoring it auto-starts the same lesson
       again, so Back looped the lesson forever and only Home escaped.
       Skip the funnel entry and land on the real view beneath it. A real
       HL path list (hlpath) is a browsable screen and is still restored. */
    if (curView && curView.kind === "hl") {
      while (e && (e.kind === "lessonFocus" || e.kind === "path")) e = viewStack.pop();
    }
    if (!e || e.kind === "tab") {
      var y = e ? e.y : 0;
      closeOverlay();
      if (e) { setTimeout(function () { setBodyScrollY(y); }, 0); setTimeout(function () { setBodyScrollY(y); }, 90); }
      return;
    }
    restoreView(e);
  }
  window.__llCloseOverlay = closeOverlay;
  window.__llGoBack = goBack;
  window.__llIsLittleKid = function () { return isLittleBand(); };
  function goHome() {
    window.__hwFromTodayPath = false;
    viewStack.length = 0; curView = null; nextView = null;
    setTab("today");
  }

  function filterLearnGrid() {
    var list = document.getElementById("ll-learn-list");
    if (!list) return;
    var q = ((document.getElementById("ll-learn-search") || {}).value || "").trim().toLowerCase();
    var pill = document.querySelector(".ln-pill.on");
    var f = pill ? pill.getAttribute("data-learn-f") : "all";
    $$(".ll-act", list).forEach(function (card) {
      var subj = card.getAttribute("data-lsubj") || "";
      var hay = card.getAttribute("data-lq") || "";
      var done = card.classList.contains("done");
      var okF = f === "all" || (f === "todo" ? !done : subj === f);
      var okQ = !q || hay.indexOf(q) >= 0;
      card.hidden = !(okF && okQ);
    });
  }
  document.addEventListener("input", function (e) {
    if (e.target && e.target.id === "ll-learn-search") filterLearnGrid();
  });

  document.addEventListener("change", function (e) { if (e.target && e.target.closest && e.target.closest("#ll-app .ll-kidsettings")) onKidSetting(e); });
  window.addEventListener("hoot-vault-change", function () {
    if (!window.HootStudy || !window.HootStudy.getVault) return;
    var n = window.HootStudy.getVault().length;
    $$(".tc-vbadge").forEach(function (b) { b.textContent = String(n); if (n) b.removeAttribute("data-zero"); else b.setAttribute("data-zero", "1"); });
  });

  document.addEventListener("submit", function (e) {
    var f = e.target; if (f && f.getAttribute && f.getAttribute("data-pl-form") === "1") { e.preventDefault(); plannerAdd(f); return; }
    if (!f || !f.getAttribute || f.getAttribute("data-cb") !== "1") return;
    e.preventDefault();
    setClassTopic((f.querySelector("input").value || "").trim().slice(0, 80));
    render();
    var box = document.querySelector(".ll-classbox"); if (box) box.scrollIntoView({ block: "start" });
  });

  function onAppClick(e) {
    var t = e.target.closest("button, .gcard, .ll-chk, .ll-act-game, .ll-act");
    if (!t) return;
    if (t.id === "ll-openplay") {
      window.__llGrownupOpen = Date.now() + 30 * 60e3;
      applyBand(); render();
      setTimeout(function () { window.__llGrownupOpen = 0; applyBand(); render(); }, 30 * 60e3 + 500);
      try { setTab("games"); } catch (x) {}
      return;
    }
    if (t.id === "ll-newideas") {
      if (state.profile) { var xs = planDay(state.profile.id, true); xs.d.shift = (xs.d.shift || 0) + 1; planSave(xs.s); }
      render();
      return;
    }
    if (t.id === "ll-kidmode") {
      var k = document.querySelector("#kid-toggle, [data-goto='kid'], .kid-toggle");
      if (k) k.click();
      document.body.classList.toggle("kid-mode");
      t.textContent = document.body.classList.contains("kid-mode") ? "Kids 2–4: on" : "Kids 2–4: bigger buttons";
      return;
    }
    var kid = t.getAttribute("data-kid");
    if (kid) { setProfile(kid); return; }
    if (t.getAttribute("data-kh") === "hoot") {
      var nk2 = nameKeyOf(state.profile), pool = nk2 && isLittleBand() ? ["hi-" + nk2, "hoot-giggle", "hoot-welcome", "hoot-giggle"] : ["hoot-welcome"];
      sayClip(pool[Math.floor(Math.random() * pool.length)]); hootTrick(t); return;
    }
    if (t.getAttribute("data-kh") === "pet") { petTap(t); return; }
    if (t.getAttribute("data-kh") === "story") { openStory(); return; }
    if (t.getAttribute("data-kh") === "locked") { var gb = document.querySelector(".kh-gobtn"); if (gb) { gb.classList.remove("nudge"); void gb.offsetWidth; gb.classList.add("nudge"); gb.scrollIntoView({ block: "center", behavior: "smooth" }); } return; }
    if (t.getAttribute("data-pl")) { plannerClick(t); return; }
    /* 3e38: a grown-up's stop and the story stop are not lessons */
    var stopEl = t.closest("[data-stop]"), stopKind = stopEl && stopEl.getAttribute("data-stop");
    if (t.getAttribute("data-act") === "play" && stopKind === "custom") { openCustomStop(stopEl.getAttribute("data-title")); return; }
    if (t.getAttribute("data-act") === "play" && stopKind === "story") { state.pendingStone = STORY_STOP; openStory(); return; }
    if (t.id === "ll-backup") { saveBackup(); return; }
    if (t.id === "ll-restore") { pickRestore(); return; }
    if (t.id === "ll-restore-yes") { doRestore(); return; }
    if (t.id === "ll-restore-no") { pendingRestore = null; safeMsg("Restore cancelled. Nothing was changed."); return; }
    var go = t.getAttribute("data-kh-go");
    if (go === "stickers") { nextView = { kind: "stickers", title: "My stickers" }; openShellOverlay("My stickers", stickerBook()); return; }
    if (go) { setTab(go); return; }
    if (t.classList.contains("kh-stone") || t.classList.contains("kh-gobtn")) { var li = t.closest("[data-title]"); state.pendingStone = li && li.getAttribute("data-title"); window.__hwFromTodayPath = isLittleBand(); }
    else if (t.getAttribute("data-act") === "play") { window.__hwFromTodayPath = false; }
    if (t.getAttribute("data-gp-tab")) { setTab(t.getAttribute("data-gp-tab")); return; }
    var teenAct = t.getAttribute("data-teen-act");
    if (teenAct && window.HootStudy) {
      if (teenAct === "dark") {
        window.HootStudy.setDark(!document.body.classList.contains("hs-dark"));
        render();
        return;
      }
      if (teenAct === "test-math" || teenAct === "test-all") {
        var titleT = teenAct === "test-all" ? "NY Grade 7 All-Subjects Exam" : "NY Grade 7 Math Practice Test";
        openShellOverlay(titleT, "");
        document.body.classList.add("ll-tutor-open");
        window.HootStudy.startPracticeTest($("#ll-obody"), teenAct === "test-all" ? "all" : "math7");
        return;
      }
      if (teenAct === "flashcards" && window.HootStudyPro) {
        openShellOverlay("⚡ Quick Flip Flashcards", "");
        document.body.classList.add("ll-tutor-open");
        window.HootStudyPro.openFlashcards($("#ll-obody"), "all");
        return;
      }
      if (teenAct === "vault") {
        openShellOverlay("Mistake Vault", "");
        document.body.classList.add("ll-tutor-open");
        window.HootStudy.playVault($("#ll-obody"));
        return;
      }
    }
    var cbChip = t.getAttribute("data-cb-chip");
    if (cbChip) { setClassTopic(cbChip); render(); return; }
    var rlOpenId = t.getAttribute("data-rl-open-id");
    var rlOpen = t.getAttribute("data-rl-open") || t.getAttribute("data-pf-lesson");
    if (rlOpenId || rlOpen) {
      if (rlOpenId && openLessonById(rlOpenId)) return;
      if (rlOpenId && window.HootStudy && window.HootStudy.lessons) {
        var foundL = window.HootStudy.lessons.filter(function (x) { return x.id === rlOpenId; })[0];
        if (foundL) {
          openShellOverlay(foundL.title, "");
          document.body.classList.add("ll-tutor-open");
          window.HootStudy.play(foundL, $("#ll-obody"));
          return;
        }
      }
      if (rlOpen) openLesson(rlOpen);
      return;
    }
    if (t.getAttribute("data-pf-print") === "1") { try { window.print(); } catch (e) {} return; }
    var learnF = t.getAttribute("data-learn-f");
    if (learnF) {
      $$(".ln-pill").forEach(function (b) { b.classList.toggle("on", b === t); });
      filterLearnGrid();
      return;
    }
    var pathId = t.getAttribute("data-path");
    if (pathId) { openPath(pathId); return; }
    if (t.classList.contains("pg-songbtn") && window.HootGames) { window.HootGames.sing(t.getAttribute("data-song"), t); return; }
    var pgame = t.getAttribute("data-pgame");
    if (pgame) { openPartyGame(pgame); return; }
    var game = t.getAttribute("data-game");
    if (game) { openGame(game); return; }
    var act = t.getAttribute("data-act");
    var card = t.closest("[data-title]");
    var title = card && card.getAttribute("data-title");
    if (t.classList.contains("ll-chk") && title) {
      var now = !isDone(title);
      markDone(title, now);
      render();
      return;
    }
    if (act === "both" && title) {
      /* 3e63: "both" = the two young children (as "We did it together"), not every profile, and the tick
         lasts the whole day like a single tick (it used to tick all three children, only until the app closed) */
      bothKids().forEach(function (q) {
        logAdd(q.id, { type: "activity", title: title, together: true });
        state.done[doneKey(q.id, title)] = 1;
        var xb = planDay(q.id, true); xb.d.done = xb.d.done || {}; xb.d.done[title] = 1; planSave(xb.s);
      });
      try { sessionStorage.setItem("hw-ll-done", JSON.stringify(state.done)); } catch (err) {}
      bumpStars();
      render();
      return;
    }
    if (act === "read") { playRead(title); return; }
    if (act === "play") { playNow(card); return; }
    if (act === "photo" || act === "lib") { addPhoto(title); return; }
    /* A tap on the Color Splash (or any Today game) picture should open
       the game — the article itself is not a button, so this is the
       path after a previous overlay has just closed. */
    if (!act && card && card.classList.contains("ll-act")) { playNow(card); return; }
  }

  /* Map Today / New ideas shelf + outdoor titles to Muse's live nodes.
     Play moves the real node into the overlay (not a clone) so handlers stay on it. */
  var SHELF_BY_TITLE = {
    "Colour Bead Sorting": "monti-sort",
    "Pink Tower stacking": "monti-tower",
    "The Pink Tower": "monti-tower",
    "Pouring Practice": "monti-pour",
    "Spoon Transfer — Pom-Poms": "monti-spoon",
    "Spoon Transfer - Pom-Poms": "monti-spoon",
    "Water the Flowers": "monti-flowers",
    "Shape Sorter": "monti-shapes",
    "Hang the Washing": "monti-washing",
    "Sound Cylinders": "monti-sound",
    "Thread the Pattern": "monti-thread"
  };

  function headingText(node) {
    var h = node && node.querySelector("h3, h2, h4");
    if (!h) return "";
    var clone = h.cloneNode(true);
    var extras = clone.querySelectorAll(".work-tag, span");
    for (var i = 0; i < extras.length; i++) extras[i].parentNode.removeChild(extras[i]);
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  function findShelfNode(title) {
    var id = SHELF_BY_TITLE[title];
    if (id) {
      var byId = document.getElementById(id);
      if (byId) return byId;
    }
    var want = (title || "").replace(/\s+/g, " ").trim().toLowerCase();
    var cards = $$(".work-card");
    var fuzzy = null;
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].closest("#ll-app, #ll-overlay")) continue;
      var ht = headingText(cards[i]).toLowerCase();
      if (ht === want) return cards[i];
      if (!fuzzy && ht && (ht.indexOf(want) === 0 || want.indexOf(ht) === 0 || ht.indexOf(want) !== -1 || want.indexOf(ht) !== -1)) {
        fuzzy = cards[i];
      }
    }
    return fuzzy;
  }

  function findHubIdeaNode(title) {
    var want = (title || "").replace(/\s+/g, " ").trim().toLowerCase();
    var cards = $$(".hub-card[data-place]");
    var fuzzy = null;
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].closest("#ll-app, #ll-overlay")) continue;
      var ht = headingText(cards[i]).toLowerCase();
      if (ht === want) return cards[i];
      if (!fuzzy && ht && (ht.indexOf(want) !== -1 || want.indexOf(ht) !== -1)) fuzzy = cards[i];
    }
    return fuzzy;
  }

  var OUTDOOR_STEPS = {
    "Leaf Hunt Walk": [
      "Take a little basket or bag outside and hunt for 3 different leaves — one big, one small, and one that has changed colour.",
      "Carry them home carefully in two hands, then line them up on the table."
    ]
  };

  function decorateOutdoorCard(title, node) {
    var body = $("#ll-obody");
    if (!body || body.querySelector(".ll-outdoor-extra")) return;
    var isOutdoor = !!(node && node.getAttribute && node.getAttribute("data-place") === "outdoor");
    if (!isOutdoor && !(OUTDOOR_STEPS[title])) return;
    var steps = OUTDOOR_STEPS[title];
    if (!steps || !steps.length) {
      var p = node && node.querySelector("p");
      var raw = p ? (p.textContent || "").replace(/\s+/g, " ").trim() : "";
      steps = raw ? raw.split(/(?<=[.!?])\s+/).filter(function (s) { return s.length > 12; }).slice(0, 3) : [];
    }
    if (steps.length < 2) {
      steps = steps.concat(["Follow the card, then come back and add a photo of what you found."]).slice(0, 3);
    }
    if (steps.length < 2) return;
    var wrap = document.createElement("div");
    wrap.className = "ll-outdoor-extra";
    var h = document.createElement("h3");
    h.textContent = "Your steps";
    wrap.appendChild(h);
    var ol = document.createElement("ol");
    ol.className = "ll-outdoor-steps";
    steps.forEach(function (s) {
      var li = document.createElement("li");
      li.textContent = s;
      ol.appendChild(li);
    });
    wrap.appendChild(ol);
    /* Muse already ships an Add a photo control on these outdoor cards
       (.photo-add). We only add the missing step list, and leave that
       working camera button in place. */
    body.appendChild(wrap);
  }

  function openMuseCard(title, node) {
    if (!node) return false;
    nextView = { kind: "muse", title: title };
    restoreParked();
    wipeOverlayHtml();
    openShellOverlay(title, "");
    document.body.classList.add("ll-muse-card-open");
    parkNode(node);
    node.classList.add("ll-muse-host");
    try { document.dispatchEvent(new CustomEvent("hw-work-open", { detail: node.id })); } catch (e) {}
    decorateOutdoorCard(title, node);
    var body = $("#ll-obody");
    try { if (body) body.scrollTop = 0; } catch (e) {}
    return true;
  }

  function playNow(card) {
    if (!card) return;
    /* ID-primary (Fix 11 port): game cards carry their DATA key and
       lesson cards carry the lesson id - neither needs a title lookup.
       The title flow below remains for shelf/outdoor cards (which carry
       neither) and as the fallback for anything unstamped. */
    var gameKey = card.getAttribute("data-game-key");
    if (gameKey) { openGame(gameKey); return; }
    var lessonId = card.getAttribute("data-lesson-id");
    if (lessonId && openLessonById(lessonId)) return;
    var title = card.getAttribute("data-title");
    var plan = currentPlan().concat(IDEA_POOL.little).concat(IDEA_POOL.teen).concat([{ kind: "game", title: "Letter Fishing", key: "fishing" }]);
    var item = null;
    plan.forEach(function (it) { if (it.title === title) item = it; });
    GAMES.forEach(function (g) { if (g.title === title) item = item || { kind: "game", key: g.key, title: g.title }; });
    if (item && item.kind === "game" && item.key) { openGame(item.key); return; }
    if (item && item.kind === "pgame" && item.key) { openPartyGame(item.key); return; }
    if (window.HootGames) { var pgm = window.HootGames.list.filter(function (x) { return x.title === title; })[0]; if (pgm) { openPartyGame(pgm.key); return; } }
    if (item && item.kind === "shelf") {
      var shelf = findShelfNode(title);
      if (shelf) openMuseCard(title, shelf);
      return;
    }
    if (item && item.kind === "outdoor") {
      var hub = findHubIdeaNode(title);
      if (hub) openMuseCard(title, hub);
      return;
    }
    openLesson(title);
  }

  function buildChrome() {
    if (!$("#ll-app")) {
      var app = document.createElement("div");
      app.id = "ll-app";
      app.hidden = true;
      var header = document.querySelector(".ll-shell-header") || document.querySelector("body");
      if (header && header.nextSibling) header.parentNode.insertBefore(app, header.nextSibling);
      else document.body.appendChild(app);
    }
    if (!$("#ll-tabs")) {
      var nav = document.createElement("nav");
      nav.id = "ll-tabs";
      nav.setAttribute("aria-label", "Main");
      nav.hidden = true;
      nav.innerHTML = TABS.map(function (t) {
        return '<button type="button" data-tab="' + t.id + '"><span class="ic">' + t.icon + '</span><span class="lb">' + esc(t.label) + "</span></button>";
      }).join("");
      document.body.appendChild(nav);
      nav.addEventListener("click", function (e) {
        var b = e.target.closest("[data-tab]");
        if (b) setTab(b.getAttribute("data-tab"));
      });
    }
    if (!$("#ll-overlay")) {
      var ov = document.createElement("div");
      ov.id = "ll-overlay";
      ov.hidden = true;
      ov.setAttribute("role", "dialog");
      ov.setAttribute("aria-modal", "true");
      ov.innerHTML = '<div class="ll-obar"><button type="button" id="ll-oclose">← Back</button><h2 id="ll-otitle"></h2><button type="button" id="ll-homebtn" aria-label="Home">🏠</button></div><div id="ll-obody"></div>';
      document.body.appendChild(ov);
      /* Wave B: the bar's left button is Back (pops the view stack); the
         #ll-oclose id stays because hub code clicks it to finish a work. */
      $("#ll-oclose").addEventListener("click", goBack);
      $("#ll-homebtn").addEventListener("click", goHome);
    }
    var appEl = $("#ll-app");
    if (appEl && !appEl._bound) {
      appEl.addEventListener("click", onAppClick);
      appEl._bound = true;
    }
    // Restyle the existing Muse game close to "Close"
    var gc = $("#game-close");
    if (gc && !gc._ll) {
      gc.addEventListener("click", function () { document.body.classList.remove("game-open"); });
      gc._ll = true;
    }
    polishGate();
  }

  function polishGate() {
    var gate = $("#profile-gate");
    if (!gate) return;
    var panel = gate.querySelector(".gate-panel");
    if (panel && !$("#sayHiLl")) {
      var h2 = panel.querySelector("h2");
      if (h2) h2.textContent = "Hoo hoo! Who's playing today?";
      if (!$(".gate-title-ll", panel)) {
        var tit = document.createElement("h1");
        tit.className = "gate-title-ll";
        tit.textContent = "Hoot's World";
        if (h2) panel.insertBefore(tit, h2);
        else panel.insertBefore(tit, panel.firstChild);
      }
      var ages = { kida: "Ages 2–4", kidb: "Ages 2–4", kidc: "Ages 11–13" };
      $$("[data-profile-pick]", panel).forEach(function (card) {
        var sm = card.querySelector("small");
        var id = card.getAttribute("data-profile-pick");
        if (sm && ages[id]) sm.textContent = ages[id];
      });
      var btn = document.createElement("button");
      btn.type = "button";
      btn.id = "sayHiLl";
      btn.textContent = "Tap to say hi to Hoot";
      btn.addEventListener("click", function () {
        /* Wave 5B (Device Report #3 Case #1): trigger ONE greeting via #gate-hoot
           instead of also calling playRead("hi"), which queued a duplicate hoot-welcome.mp3. */
        var h = $("#gate-hoot");
        if (h) h.click();
        else playRead("hi");
      });
      var cards = panel.querySelector(".prof-cards") || panel.querySelector("[class*='prof']");
      if (cards) panel.insertBefore(btn, cards);
      else panel.appendChild(btn);
    }
    // After Muse picks a profile, show our Today
    $$("[data-profile-pick]").forEach(function (b) {
      if (b._ll) return;
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-profile-pick");
        setTimeout(function () { setProfile(id, { keepGreet: true }); }, 0);
      });
      b._ll = true;
    });
  }


  /* Map lesson stops call Muse's __hootShowView("learn"), which only
     flips data-view. In the Little Learners shell, open the lesson in
     the overlay so a kid tapping a Lesson pin lands in the lesson. */
  function hookMapLessonStops() {
    if (document.body.dataset.llMapLessonHook) return;
    document.body.dataset.llMapLessonHook = "1";
    document.addEventListener("click", function (e) {
      var b = e.target && e.target.closest && e.target.closest("#rm-stops .rm-stop");
      if (!b) return;
      var label = b.getAttribute("aria-label") || "";
      var m = label.match(/^Lesson\s+(\d+)/i);
      if (!m) return;
      var i = parseInt(m[1], 10) - 1;
      var cards = document.querySelectorAll("#panel-little .lsn");
      var card = cards[i];
      var title = "Lesson " + (i + 1);
      if (card) {
        var h = card.querySelector(".lsn-top h4, h4, h3");
        if (h && h.textContent.trim()) title = h.textContent.trim();
      }
      setTimeout(function () { openLesson(title); }, 180);
    }, true);
  }

  function boot() {
    try {
      var raw = sessionStorage.getItem("hw-ll-done");
      if (raw) state.done = JSON.parse(raw) || {};
    } catch (e) {}
    buildChrome();
    hookMapLessonStops();
    // If Muse already hid the gate (refresh mid-session), still wait for a pick.
    var gate = $("#profile-gate");
    if (gate && gate.hidden) {
      // stay on gate unless we have a remembered pick — preview always starts at pick
      gate.hidden = false;
      gate.style.display = "";
    }
    /* Muse may already have restored a saved profile (body[data-profile]).
       Keep that attribute; do not auto-enter the shell — the child still
       taps their picture. setProfile will re-sync on that tap. */
    var already = document.body.getAttribute("data-profile");
    if (already && typeof window.__hootSelectProfile === "function" && !state.profile) {
      document.body.setAttribute("data-profile", already);
    }
  }

  /* 3e40: a password-reset link needs the grown-up, not a child's Home */
  function accountAttention() {
    var A = window.HootAccount; if (!A || !A.needsAttention || !A.needsAttention()) return;
    if (state.profile) { if (state.tab !== "grownups") setTab("grownups"); return; }
    var gate = $("#profile-gate"); if (!gate || $("#ll-acct-note")) return;
    var n = document.createElement("p"); n.id = "ll-acct-note"; n.className = "ll-acct-note"; n.setAttribute("role", "status");
    n.textContent = "Resetting your password? Tap any picture, then answer the grown-up question to choose a new one.";
    gate.insertBefore(n, gate.firstChild);
  }
  document.addEventListener("hoot-account-changed", accountAttention);
  var _setProfileForAcct = setProfile;
  setProfile = function () { var r = _setProfileForAcct.apply(this, arguments); setTimeout(accountAttention, 0); return r; };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { boot(); accountAttention(); });
  else { boot(); accountAttention(); }

  /* ===== Wave C1: Hoot's pick of the day + Tomorrow, Right Now chips,
     the progress world map, and Then & Now (ported from The Idea Jar) =====
     All counts and picks read the app's own state (lessonDone, the paths
     for the active child, the activity groups) — nothing is invented.
     Picks/stats are computed for the ACTIVE profile, because lessonDone
     itself reads the active child's state. */

  /* --- Then & Now data: a real completion log, one record per
     child+lesson { n, first, last }. Written only where the shell already
     observes a completion (the hoot-lesson-done event and the done-class
     watcher beside the activity log), so it is exactly as complete as the
     app's own activity log. Existing done stores are never touched. --- */
  var COMP_KEY = "hootworld.completions.v1";
  function compLoad() { try { return JSON.parse(localStorage.getItem(COMP_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function compSave(d) { try { localStorage.setItem(COMP_KEY, JSON.stringify(d)); } catch (e) {} }
  function recordCompletion(kid, title) {
    if (!kid || !title) return;
    var id = lessonIdForTitle(title);
    var key = id || ("t:" + title);
    var d = compLoad(), k = d[kid] || (d[kid] = {});
    var now = Date.now(), r = k[key];
    if (r && now - (r.last || 0) < 8000) return; /* one completion can be seen by two watchers */
    if (!r) { r = { n: 0, first: now, last: now, title: title }; k[key] = r; }
    r.n += 1; r.last = now; r.title = title;
    compSave(d);
    try { we1OnLessonComplete(kid, id, title); } catch (e) {} /* Wave E1: photo quest + parent praise note */
  }
  function wcCompletion(pid, id, title) {
    var k = compLoad()[pid] || {};
    if (id && k[id]) return k[id];
    if (title) {
      if (k["t:" + title]) return k["t:" + title];
      var lid = lessonIdForTitle(title);
      if (lid && k[lid]) return k[lid];
    }
    return null;
  }
  function wcThenHtml(pid, id, title) {
    var r = wcCompletion(pid, id, title);
    if (!r || !r.n) return "";
    var when = "";
    try { when = new Date(r.first).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); } catch (e) { when = ""; }
    return '<div class="wc-then" role="note">↩ <b>Then &amp; Now</b> · First finished: ' + esc(when) + " · You've done this " + r.n + (r.n === 1 ? " time" : " times") + "</div>";
  }
  function wcThenInsert(id, title) {
    var body = $("#ll-obody");
    if (!body || !state.profile) return;
    var old = body.querySelector(".wc-then");
    if (old) old.remove();
    var html = wcThenHtml(state.profile.id, id, title);
    if (!html) return;
    var d = document.createElement("div");
    d.innerHTML = html;
    body.insertBefore(d.firstChild, body.firstChild);
  }

  /* --- shared helpers --- */
  function wcHash(s) { var h = 2166136261; s = String(s); for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return h >>> 0; }
  function wcDayIndex(d) { return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); }
  function wcSeasonOf(d) { var m = d.getMonth(); return m === 11 || m < 2 ? "winter" : m < 5 ? "spring" : m < 8 ? "summer" : "fall"; }
  var WC_SUMMER_RX = /plant|photosynthesis|garden|grow|beach|swim|picnic|ice cream/i;
  var WC_COZY_RX = /colour|color|sort|pattern|story|read|rhyme|letter|count|shape|code|music|feelings|fractions|sharing|body/i;
  function wcText(l) { return (l.title + " " + (l.blurb || "") + " " + (l.tags || []).join(" ")); }
  function wcIsSummer(l) { return WC_SUMMER_RX.test(wcText(l)); }
  function wcIsCozy(l) { return WC_COZY_RX.test(wcText(l)); }
  /* the child's own lessons that carry a stable shell id, in path order */
  function wcPool(pid) {
    var out = [], seen = {};
    pathsFor(pid).forEach(function (p) {
      (LESSONS[p.id] || []).forEach(function (l) {
        if (l.id && !seen[l.id]) { seen[l.id] = 1; out.push({ id: l.id, title: l.title, emo: l.emo, tags: l.tags || [], color: l.color, blurb: l.blurb || "", path: p.id, pathTitle: p.title }); }
      });
    });
    return out;
  }
  function wcDoneToday(pid, title, date) {
    var dk = dayKeyOf(date);
    var rec = wcCompletion(pid, null, title);
    if (rec && rec.last && dayKeyOf(new Date(rec.last)) === dk) return true;
    var evs = logLoad()[pid] || [];
    for (var i = 0; i < evs.length; i++) {
      if (evs[i].type === "lesson" && evs[i].title === title && dayKeyOf(new Date(evs[i].t)) === dk) return true;
    }
    return false;
  }

  /* --- Feature 1: the daily pick (deterministic per child + date) --- */
  function wcDailyPick(pid, date) {
    date = date || new Date();
    var pool = wcPool(pid);
    if (!pool.length) return null;
    var season = wcSeasonOf(date);
    var fresh = pool.filter(function (l) { return !lessonDone(l.title); });
    var base = fresh.length ? fresh.slice() : pool.slice();
    if (season === "winter") {
      var ns = base.filter(function (l) { return !wcIsSummer(l); });
      if (ns.length) base = ns; /* never a summer-only topic in winter */
    } else if (season === "fall") {
      base = base.filter(function (l) { return !wcIsSummer(l); }).concat(base.filter(wcIsSummer));
    } else if (season === "spring") {
      base = base.filter(wcIsSummer).concat(base.filter(function (l) { return !wcIsSummer(l); }));
    }
    var notToday = base.filter(function (l) { return !wcDoneToday(pid, l.title, date); });
    if (notToday.length) base = notToday;
    /* start at the child's current path position, then step forward a
       little each day (0–2) so consecutive days differ but the pick
       stays near where the child actually is on the path */
    var step = base.length > 1 ? (wcDayIndex(date) + wcHash(pid)) % Math.min(3, base.length) : 0;
    var pick = base[step % base.length];
    return { lesson: pick, season: season, current: !!(fresh.length && pick.id === fresh[0].id) };
  }
  var WC_TOPIC_WORD = { numbers: "counting", colours: "colours", colors: "colours", letters: "letters", phonics: "letter sounds", shapes: "shapes", maths: "maths", math: "maths", reading: "reading", science: "science", sorting: "sorting", patterns: "patterns", feelings: "feelings", animals: "animals" };
  function wcWhy(pick, date, when) {
    var l = pick.lesson, season = pick.season;
    var topic = WC_TOPIC_WORD[String((l.tags && l.tags[0]) || "").toLowerCase()] || String((l.tags && l.tags[0]) || "learning").toLowerCase();
    var cold = season === "winter" || (season === "fall" && date.getMonth() === 10); /* a Connecticut November is a cold day */
    var s;
    if (wcIsSummer(l) && (season === "summer" || season === "spring")) s = "A sunny " + topic + " pick while the days are warm.";
    else if (cold && wcIsCozy(l)) s = "A cozy " + topic + " pick for a cold day — good indoors.";
    else if (cold) s = "An indoor " + topic + " pick for a cold day.";
    else if (pick.current) s = "The very next step on the path — keep going!";
    else s = "A fresh " + topic + " pick for " + (when === "tomorrow" ? "tomorrow" : "today") + ".";
    if (pick.current && when !== "tomorrow" && s.indexOf("next step") === -1) s = "Next step on the path — " + s.charAt(0).toLowerCase() + s.slice(1);
    return s;
  }
  function wcPickCard(pick, date, when) {
    var l = pick.lesson;
    var art = LESSON_ART[l.id]
      ? '<img class="wc-pickart" src="assets/lesson-art/' + l.id + '.svg" alt="" loading="lazy" decoding="async">'
      : '<span class="wc-pickemo" aria-hidden="true">' + (l.emo || "⭐") + "</span>";
    return '<button type="button" class="wc-pickcard' + (when === "tomorrow" ? " wc-tomorrow" : "") + '" data-wc-open="lesson:' + l.id + '" aria-label="' + (when === "tomorrow" ? "Tomorrow's pick" : "Today's pick") + ": " + esc(l.title) + '">' +
      art +
      '<span class="wc-picktxt"><span class="wc-pickkicker">' + (when === "tomorrow" ? "🌙 Tomorrow" : "⭐ Today's pick") + "</span><b>" + esc(l.title) + '</b><small class="wc-why">' + esc(wcWhy(pick, date, when)) + "</small></span>" +
      '<span class="wc-pickgo" aria-hidden="true">▶</span></button>';
  }

  /* --- Feature 3 data: real per-child lesson stats --- */
  function wcStats(pid) {
    var seen = {}, total = 0, done = 0, perPath = [];
    pathsFor(pid).forEach(function (p) {
      var ls = LESSONS[p.id] || hlLessons(p.id), pd = 0;
      ls.forEach(function (l) {
        var d = lessonDone(l.title);
        if (d) pd++;
        if (!seen[l.title]) { seen[l.title] = 1; total++; if (d) done++; }
      });
      perPath.push({ id: p.id, title: p.title, emo: p.emo || "⭐", total: ls.length, done: pd, lessons: ls });
    });
    return { total: total, done: done, pct: total ? Math.round(100 * done / total) : 0, perPath: perPath };
  }

  function waveTodayHtml() {
    var p = state.profile;
    if (!p) return "";
    var now = new Date();
    var today = wcDailyPick(p.id, now);
    if (!today) return "";
    var tmrDate = new Date(now.getTime() + 86400000);
    var tmr = wcDailyPick(p.id, tmrDate);
    var stats = wcStats(p.id);
    var chips = '<div class="wc-chips" role="group" aria-label="Right now"><span class="wc-chipslabel">Right now:</span>' +
      WC_CHIPS.map(function (c) { return '<button type="button" class="wc-chip" data-wc-chip="' + c.id + '">' + c.emo + " " + esc(c.label) + "</button>"; }).join("") + "</div>";
    var teenPick = isTeen();
  return '<section class="ll-card wc-today" aria-label="' + (teenPick ? "Tutor's picks" : "Hoot\'s picks") + '">' +
      '<h2 class="todoh">' + (teenPick ? "🎓 Tutor\'s pick" : "🦉 Hoot\'s pick") + ' <span class="muted">for ' + esc(p.label) + "</span></h2>" +
      wcPickCard(today, now, "today") +
      (tmr ? wcPickCard(tmr, tmrDate, "tomorrow") : "") +
      chips +
      '<button type="button" class="wc-mapbtn" data-wc-map="1">🗺️ <b>World map</b><span>' + stats.done + " of " + stats.total + " lessons · " + stats.pct + "%</span></button>" +
      "</section>";
  }

  /* --- Feature 2: Right Now chips --- */
  var WC_CHIPS = [
    { id: "burn", label: "Burn energy", emo: "🏃", lead: "Wiggles to burn? These will do it — big movement first." },
    { id: "calm", label: "Calm them down", emo: "🌙", lead: "Slowing down — gentle things only, nothing timed." },
    { id: "ten", label: "10 minutes before dinner", emo: "⏱️", lead: "Only a few minutes? Everything here is short." },
    { id: "grandma", label: "Show Mama!", emo: "💛", lead: "Things to show off to Mama, and things to do together." }
  ];
  function wcGamesFor(pid) {
    var b = bandOf(pid);
    if (b === "little" || b === "early") return GAMES.slice();
    if (isTeenBand(b)) return GAMES.filter(function (g) { return TEEN_GAMES.indexOf(g.key) >= 0; });
    return [];
  }
  function wcActs() { try { return activityGroups() || []; } catch (e) { return []; } }
  function wcRightNowItems(pid, chip) {
    var pool = wcPool(pid), games = wcGamesFor(pid), acts = wcActs();
    var items = [], used = {};
    function add(it) { if (it && !used[it.open] && items.length < 6) { used[it.open] = 1; items.push(it); } }
    function game(key, why) {
      var g = null;
      games.forEach(function (x) { if (x.key === key) g = x; });
      if (g) add({ open: "game:" + key, title: g.title, emo: g.emo, color: g.color, why: why, gameKey: key });
    }
    function lesson(l, why) { if (l) add({ open: "lesson:" + l.id, title: l.title, emo: l.emo, color: l.color, why: why, art: l.id }); }
    function lessonsMatching(rx, why, max) { var n = 0; pool.forEach(function (l) { if (n < max && rx.test(l.title + " " + l.tags.join(" "))) { lesson(l, why); n++; } }); }
    function actsWhere(fn, why, max) { var n = 0; acts.forEach(function (g) { if (n < max && fn(g)) { add({ open: "activity:" + g.title, title: g.title, emo: g.emo || "🧺", color: "#0B8A5F", why: why }); n++; } }); }
    function pad(why) {
      pool.forEach(function (l) { if (items.length < 4 && !lessonDone(l.title)) lesson(l, why); });
      pool.forEach(function (l) { if (items.length < 4) lesson(l, why); });
    }
    if (chip === "burn") {
      game("dance", "Dance it out — wiggle, jump, spin");
      game("twinkle", "Chase and catch the twinkling stars");
      game("band", "Stomp, clap and copy the beat");
      game("rocket", "Count up and blast off");
      actsWhere(function (g) { return g.place === "outdoor"; }, "Fresh air and room to move", 2);
      lessonsMatching(/up and down|animal sounds|counting back/i, "Learn it with your whole body", 2);
      pad("A lively pick from the path");
    } else if (chip === "calm") {
      game("paint", "Quiet drawing — no timers, no rushing");
      game("splash", "Gentle colours at your own pace");
      game("memory", "Slow looking and remembering");
      game("peek", "A soft, gentle hide-and-seek");
      lessonsMatching(/sort|colour|color|pattern|feelings|shape/i, "Quiet and focused", 2);
      actsWhere(function (g) { return g.place !== "outdoor"; }, "A calm hands-on activity", 2);
      pad("A gentle pick from the path");
    } else if (chip === "ten") {
      var band = bandOf(pid);
      var shortPool = isTeenBand(band) ? pool.filter(function (l) { return l.path === "creator"; }).concat(pool.filter(function (l) { return l.path !== "creator"; })) : pool;
      var freshShort = shortPool.filter(function (l) { return !lessonDone(l.title); });
      (freshShort.length ? freshShort : shortPool).slice(0, 2).forEach(function (l) { lesson(l, isTeenBand(band) ? "A short lesson — just a few minutes" : "One short lesson — just a few minutes"); });
      game("find", "One quick looking round");
      game("peek", "A quick round of hide-and-seek");
      game("feed", "A quick, silly round");
      game("piano", "One quick tune");
      game("band", "One quick rhythm round");
      game("memory", "One quick matching round");
      actsWhere(function (g) { return g.place !== "outdoor"; }, "Quick to start, quick to tidy", 1);
      pad("Short and sweet");
    } else if (chip === "grandma") {
      var doneLs = pool.filter(function (l) { return lessonDone(l.title); });
      doneLs.slice(0, 3).forEach(function (l) { lesson(l, "Already learned it — perfect for showing off"); });
      if (!doneLs.length && pool.length) lesson(pool[0], "The newest lesson — show Mama what's new");
      game("dress", "Take turns dressing the friends");
      game("paint", "Make a picture together");
      game("memory", "The classic matching game — Mama knows it");
      game("band", "Clap a beat together");
      actsWhere(function (g) { return g.place !== "outdoor"; }, "Something lovely to make together", 1);
      pad("Fun to share together");
    }
    return items;
  }
  function rightNowHtml(chip) {
    var def = WC_CHIPS.filter(function (c) { return c.id === chip; })[0];
    var items = wcRightNowItems(state.profile.id, chip);
    return '<div class="wc-rn"><p class="wc-rnlead">' + esc(def.lead) + '</p><div class="wc-rnlist">' +
      items.map(function (it) {
        var media = it.art && LESSON_ART[it.art]
          ? '<img class="wc-rnart" src="assets/lesson-art/' + it.art + '.svg" alt="" loading="lazy" decoding="async">'
          : it.gameKey ? gameThumb(it.gameKey, it.emo)
          : '<span class="wc-rnemo" aria-hidden="true">' + (it.emo || "⭐") + "</span>";
        return '<button type="button" class="wc-rnitem" data-wc-open="' + esc(it.open) + '" style="--dc:' + (it.color || "#E0457B") + '">' + media +
          '<span class="wc-rntxt"><b>' + esc(it.title) + "</b><small>" + esc(it.why) + '</small></span><span class="wc-rngo" aria-hidden="true">▶</span></button>';
      }).join("") + "</div></div>";
  }
  function openRightNow(chip) {
    var def = WC_CHIPS.filter(function (c) { return c.id === chip; })[0];
    if (!def || !state.profile) return;
    nextView = { kind: "rightnow", key: chip, title: def.label };
    openShellOverlay(def.emo + " " + def.label, rightNowHtml(chip));
  }

  /* --- Feature 3: the world map --- */
  var WC_MILESTONES = [
    { pct: 25, name: "Pathfinder" },
    { pct: 50, name: "Explorer" },
    { pct: 75, name: "Trailblazer" },
    { pct: 100, name: "World Master" }
  ];
  function wcMapSvg(stats) {
    var W = 360, topH = 116, rowH = 78, H = topH + stats.perPath.length * rowH + 14;
    var pal = ["#E0457B", "#3A56D4", "#0B8A5F", "#F5A623", "#7A2E8E", "#0E6E8C"];
    var s = [];
    s.push('<svg viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="World map: ' + stats.done + " of " + stats.total + ' lessons finished">');
    s.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="16" fill="#E8F4FD"/>');
    s.push('<ellipse cx="46" cy="' + (H + 26) + '" rx="150" ry="86" fill="#CDEBC0"/>');
    s.push('<ellipse cx="330" cy="' + (H + 34) + '" rx="170" ry="96" fill="#B7E2A8"/>');
    s.push('<circle cx="324" cy="30" r="16" fill="#FFD93C"/>');
    s.push('<g fill="#FFFFFF" opacity="0.95"><ellipse cx="48" cy="26" rx="25" ry="9"/><ellipse cx="70" cy="20" rx="18" ry="8"/></g>');
    s.push('<text x="18" y="30" font-size="16" font-weight="800" fill="#21324A">Your world</text>');
    s.push('<text x="18" y="50" font-size="12" fill="#5A6B84">' + stats.done + " of " + stats.total + " lessons finished · " + stats.pct + "%</text>");
    var x0 = 24, x1 = 336, yT = 84;
    var ty = function (t) { return yT - Math.sin(t * Math.PI) * 12; };
    var d = "";
    for (var i = 0; i <= 40; i++) { var t = i / 40; d += (i ? "L" : "M") + (x0 + (x1 - x0) * t).toFixed(1) + " " + ty(t).toFixed(1) + " "; }
    s.push('<path d="' + d + '" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>');
    s.push('<path d="' + d + '" fill="none" stroke="#D8B25C" stroke-width="2.6" stroke-dasharray="0.1 7" stroke-linecap="round"/>');
    WC_MILESTONES.forEach(function (m) {
      var t = m.pct / 100, fx = x0 + (x1 - x0) * t, fy = ty(t), earned = stats.pct >= m.pct;
      s.push('<line x1="' + fx.toFixed(1) + '" y1="' + fy.toFixed(1) + '" x2="' + fx.toFixed(1) + '" y2="' + (fy - 17).toFixed(1) + '" stroke="#7A6A53" stroke-width="2"/>');
      s.push('<path d="M' + fx.toFixed(1) + " " + (fy - 17).toFixed(1) + ' l11 3.4 -11 3.4 z" fill="' + (earned ? "#E0457B" : "#C4CBD4") + '"/>');
      s.push('<text x="' + fx.toFixed(1) + '" y="' + (fy + 13).toFixed(1) + '" font-size="8.5" text-anchor="middle" fill="#5A6B84">' + m.pct + "%</text>");
    });
    var hp = Math.max(0, Math.min(100, stats.pct)) / 100;
    s.push('<text x="' + (x0 + (x1 - x0) * hp).toFixed(1) + '" y="' + (ty(hp) - 4).toFixed(1) + '" font-size="15" text-anchor="middle">🦉</text>');
    stats.perPath.forEach(function (pp, i) {
      var y = topH + i * rowH, col = pal[i % pal.length];
      s.push('<g data-wc-open="path:' + pp.id + '" style="cursor:pointer">');
      s.push('<rect x="8" y="' + (y + 2) + '" width="344" height="' + (rowH - 8) + '" rx="12" fill="#FFFFFF" opacity="0.72"/>');
      s.push('<circle cx="36" cy="' + (y + 26) + '" r="16" fill="' + col + '"/>');
      s.push('<text x="36" y="' + (y + 32) + '" font-size="15" text-anchor="middle">' + pp.emo + "</text>");
      s.push('<text x="60" y="' + (y + 22) + '" font-size="12.5" font-weight="700" fill="#21324A">' + esc(pp.title) + "</text>");
      s.push('<text x="60" y="' + (y + 38) + '" font-size="10.5" fill="#5A6B84">' + pp.done + " of " + pp.total + " done — tap to open</text>");
      var n = pp.lessons.length;
      for (var j = 0; j < n; j++) {
        var cx = n === 1 ? 60 : 60 + j * (284 / (n - 1));
        var dn = lessonDone(pp.lessons[j].title);
        s.push('<circle cx="' + cx.toFixed(1) + '" cy="' + (y + 56) + '" r="' + (n > 20 ? 3.2 : 4.2) + '" fill="' + (dn ? col : "#FFFFFF") + '" stroke="' + col + '" stroke-width="1.6"/>');
      }
      s.push("</g>");
    });
    s.push("</svg>");
    return s.join("");
  }
  function wcBadgesHtml(stats) {
    return '<div class="wc-badges" aria-label="Milestone badges">' + WC_MILESTONES.map(function (m) {
      var earned = stats.pct >= m.pct;
      return '<span class="wc-badge' + (earned ? "" : " locked") + '">' + (earned ? "🏅 " : "🔒 ") + m.pct + "% · " + m.name + (earned ? " — earned!" : " — " + (m.pct - stats.pct) + "% to go") + "</span>";
    }).join("") + "</div>";
  }
  function openWorldMap() {
    var p = state.profile;
    if (!p) return;
    var stats = wcStats(p.id);
    nextView = { kind: "worldmap", title: "World map" };
    openShellOverlay("🗺️ World map", '<div class="wc-map"><p class="wc-maplead">' + esc(p.label) + "'s journey — every finished lesson lights a stop on its trail.</p>" + wcMapSvg(stats) + wcBadgesHtml(stats) + "</div>");
  }

  /* --- opening Wave C targets + click delegation (Today lives in
     #ll-app, the chip list and map live in #ll-overlay; one document
     listener covers both. The attrs are Wave C's own, so the shell's
     onAppClick ignores them.) --- */
  function wcOpen(spec) {
    window.__hwFromTodayPath = false;
    var cut = spec.indexOf(":");
    if (cut < 0) return;
    var kind = spec.slice(0, cut), arg = spec.slice(cut + 1);
    if (kind === "lesson") { if (!openLessonById(arg)) { var r = LESSON_BY_ID[arg]; if (r) openLesson(r.lesson.title); } }
    else if (kind === "game") openGame(arg);
    else if (kind === "path") openPath(arg);
    else if (kind === "activity") {
      var n = findHubIdeaNode(arg);
      if (n) openMuseCard(arg, n);
      else { closeOverlay(); setTab("activities"); }
    }
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-wc-open], [data-wc-chip], [data-wc-map]") : null;
    if (!t) return;
    if (t.hasAttribute("data-wc-chip")) { openRightNow(t.getAttribute("data-wc-chip")); return; }
    if (t.hasAttribute("data-wc-map")) { openWorldMap(); return; }
    var spec = t.getAttribute("data-wc-open");
    if (spec) wcOpen(spec);
  });


  /* ===== Wave C2: "I Have…" supplies mode, co-op learning missions,
     Quest Days, and printable cards (ported from The Idea Jar) =====
     Everything here reads the app's own signals — the completions store,
     the per-child activity log, the day-plan done state — and persists
     only small family stores of its own. No new audio is recorded and
     device text-to-speech is never used. */

  /* ---------- small family stores ---------- */
  var WC2_BADGE_KEY = "hootworld.wc2badges.v1"; /* { missions:{id:ts}, quests:{id:ts} } */
  var WC2_IHAVE_KEY = "hootworld.ihave.v1";     /* [supplyId, ...] — the whole family's shelf */
  var WC2_QUEST_KEY = "hootworld.quests.v1";    /* { dayId: { resetAt: ts } } */
  function wc2Store(key, dflt) { try { var v = JSON.parse(localStorage.getItem(key) || "null"); return v == null ? dflt : v; } catch (e) { return dflt; } }
  function wc2Save(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {} }
  function wc2Badges() { var b = wc2Store(WC2_BADGE_KEY, {}); b.missions = b.missions || {}; b.quests = b.quests || {}; return b; }
  function wc2Award(kind, id) {
    var b = wc2Badges();
    if (!b[kind][id]) { b[kind][id] = Date.now(); wc2Save(WC2_BADGE_KEY, b); }
    return b;
  }
  function wc2FmtDate(ts) { try { return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" }); } catch (e) { return ""; } }

  /* ---------- completion signals, family-wide ----------
     A mission or quest step counts when ANY child in the family has
     really done the thing: the completions store (Wave C1), the HL
     engine's own results, the shared activity log, or the day-plan
     done state. Timestamps are returned so Quest Days can restart. */
  function wc2LessonDoneAt(id, title) {
    var best = 0, d = compLoad(), pid, k;
    for (pid in d) {
      k = d[pid];
      if (id && k[id] && k[id].n) best = Math.max(best, k[id].last || 1);
      if (title && k["t:" + title] && k["t:" + title].n) best = Math.max(best, k["t:" + title].last || 1);
    }
    var h = HL();
    if (h && title && h.byTitle(title)) {
      var lid = h.byTitle(title).id;
      PROFILES.forEach(function (p) {
        try { var r = h.results(p.id)[lid]; if (r && (r.mastered || r.done || r.last)) best = Math.max(best, r.last || 1); } catch (e) {}
        try { if (h.isDone(title, p.id)) best = Math.max(best, 1); } catch (e) {}
      });
    }
    var logs = logLoad();
    for (pid in logs) (logs[pid] || []).forEach(function (ev) { if (ev.type === "lesson" && ev.title === title) best = Math.max(best, ev.t || 1); });
    if (!best && title && state.profile && lessonDone(title)) best = 1;
    return best;
  }
  function wc2GameTitle(key) { var g = GAMES.filter(function (x) { return x.key === key; })[0]; return g ? g.title : key; }
  function wc2GameDoneAt(key) {
    var title = wc2GameTitle(key), best = 0, logs = logLoad(), pid;
    for (pid in logs) (logs[pid] || []).forEach(function (ev) { if (ev.type === "game" && ev.title === title) best = Math.max(best, ev.t || 1); });
    return best;
  }
  function wc2ActDoneAt(title) {
    var best = 0, log = actLogAll(), pid, day;
    for (pid in log) for (day in log[pid]) { var e = log[pid][day][title]; if (e) best = Math.max(best, e.t || 1); }
    if (!best) { for (var i = 0; i < PROFILES.length; i++) if (isDoneFor(PROFILES[i].id, title)) { best = 1; break; } }
    return best;
  }

  /* ---------- band-aware target resolution ---------- */
  function wc2BandKey() { var b = curBand(); return b === "high" ? "teen" : b; }
  function wc2ResolveLessonId(map) {
    if (!map) return null;
    var order = [wc2BandKey(), "early", "quest", "little", "teen"];
    for (var i = 0; i < order.length; i++) { var id = map[order[i]]; if (id && LESSON_BY_ID[id]) return id; }
    for (var k in map) if (LESSON_BY_ID[map[k]]) return map[k];
    return null;
  }
  function wc2ResolveGameKey(step) {
    var b = curBand();
    if (isTeenBand(b)) {
      if (step.gameTeen) return step.gameTeen;
      return TEEN_GAMES.indexOf(step.game) >= 0 ? step.game : "memory";
    }
    return step.game;
  }
  function wc2ResolveActivity(step) {
    var groups = wcActs();
    if (!groups.length) return null;
    if (step.actTitle) { var ex = groups.filter(function (g) { return g.title === step.actTitle; })[0]; if (ex) return ex; }
    if (step.actRx) { var m = groups.filter(function (g) { return step.actRx.test(g.title + " " + (g.desc || "")); })[0]; if (m) return m; }
    return groups[0];
  }
  function wc2GoActivity(title) {
    closeOverlay();
    setTab("activities");
    setTimeout(function () {
      var groups = state._actGroups || [], gi = -1;
      groups.forEach(function (g, i) { if (g.title === title) gi = i; });
      if (gi < 0) return;
      var det = document.querySelector(".ll-actall"); if (det && !det.open) det.open = true;
      setTimeout(function () {
        var card = document.querySelector('[data-act-i="' + gi + '"]');
        if (card) { card.scrollIntoView({ block: "center" }); card.classList.add("wc2-flash"); setTimeout(function () { card.classList.remove("wc2-flash"); }, 2400); }
      }, 60);
    }, 80);
  }
  function wc2OpenStepTarget(step) {
    window.__hwFromTodayPath = false;
    if (step.kind === "lesson" || step.kind === "teach") {
      var id = wc2ResolveLessonId(step.lesson);
      if (id) { if (!openLessonById(id)) { var r = LESSON_BY_ID[id]; if (r) openLesson(r.lesson.title); } }
    } else if (step.kind === "game") openGame(wc2ResolveGameKey(step));
    else if (step.kind === "activity") { var g = wc2ResolveActivity(step); if (g) wc2GoActivity(g.title); }
  }
  function wc2StepDone(step) {
    if (step.kind === "lesson" || step.kind === "teach") {
      var id = wc2ResolveLessonId(step.lesson), rec = id ? LESSON_BY_ID[id] : null;
      return wc2LessonDoneAt(id, rec ? rec.lesson.title : null) > 0;
    }
    if (step.kind === "game") return wc2GameDoneAt(wc2ResolveGameKey(step)) > 0;
    if (step.kind === "activity") { var g = wc2ResolveActivity(step); return !!g && wc2ActDoneAt(g.title) > 0; }
    return false;
  }
  function wc2StepDoneAt(step, since) {
    var t = 0;
    if (step.kind === "lesson" || step.kind === "teach") { var id = wc2ResolveLessonId(step.lesson), rec = id ? LESSON_BY_ID[id] : null; t = wc2LessonDoneAt(id, rec ? rec.lesson.title : null); }
    else if (step.kind === "game") t = wc2GameDoneAt(wc2ResolveGameKey(step));
    else if (step.kind === "activity") { var g = wc2ResolveActivity(step); t = g ? wc2ActDoneAt(g.title) : 0; }
    return t > 0 && t >= (since || 0);
  }
  function wc2StepTarget(step) {
    if (step.kind === "lesson" || step.kind === "teach") {
      var id = wc2ResolveLessonId(step.lesson), rec = id ? LESSON_BY_ID[id] : null;
      return rec ? { title: rec.lesson.title, emo: rec.lesson.emo, art: id } : { title: "Lesson", emo: "📚" };
    }
    if (step.kind === "game") {
      var key = wc2ResolveGameKey(step), g = GAMES.filter(function (x) { return x.key === key; })[0];
      return { title: g ? g.title : key, emo: g ? g.emo : "🎮", gameKey: key };
    }
    var a = wc2ResolveActivity(step);
    return a ? { title: a.title, emo: a.emo || actEmo(a) } : { title: "Activity", emo: "🧺" };
  }

  /* ================= Feature 1: "I Have…" supplies mode =================
     The activities carry no supplies field — what they need is written
     in their own descriptions ("put paper on top and rub a crayon…").
     The vocabulary below is matched against each activity's title +
     description, so the lists are derived from the app's own data. */
  var WC2_SUPPLIES = [
    { id: "paper", label: "Paper", emo: "📄", rx: /paper/i },
    { id: "crayons", label: "Crayons", emo: "🖍️", rx: /crayon/i },
    { id: "pencil", label: "Pencil or pen", emo: "✏️", rx: /pencil|\bpen\b/i },
    { id: "paint", label: "Paints", emo: "🎨", rx: /paint/i },
    { id: "brush", label: "Big brush", emo: "🖌️", rx: /brush/i },
    { id: "glue", label: "Glue", emo: "🧴", rx: /glue/i },
    { id: "scissors", label: "Scissors", emo: "✂️", rx: /scissors/i },
    { id: "tape", label: "Tape", emo: "🩹", rx: /tape/i },
    { id: "box", label: "Cardboard box", emo: "📦", rx: /cardboard|\bbox\b/i },
    { id: "string", label: "String or ribbon", emo: "🧵", rx: /string|ribbon/i },
    { id: "cups", label: "Cups", emo: "🥤", rx: /\bcups?\b/i },
    { id: "water", label: "Water", emo: "💧", rx: /water/i },
    { id: "bowl", label: "Bowl", emo: "🥣", rx: /bowl/i },
    { id: "spoon", label: "Spoon", emo: "🥄", rx: /spoon/i },
    { id: "jug", label: "Jug", emo: "🏺", rx: /jug/i },
    { id: "bucket", label: "Bucket", emo: "🪣", rx: /bucket/i },
    { id: "plate", label: "Plates", emo: "🍽️", rx: /plate/i },
    { id: "pasta", label: "Dry pasta", emo: "🍝", rx: /pasta/i },
    { id: "stickers", label: "Stickers", emo: "⭐", rx: /sticker/i },
    { id: "ball", label: "Ball", emo: "⚽", rx: /\bball\b/i },
    { id: "blanket", label: "Blanket", emo: "🛏️", rx: /blanket/i },
    { id: "pillows", label: "Pillows or cushions", emo: "🛋️", rx: /pillow|cushion/i },
    { id: "torch", label: "Torch", emo: "🔦", rx: /torch|flashlight/i },
    { id: "chalk", label: "Chalk", emo: "⬜", rx: /chalk/i },
    { id: "bubbles", label: "Bubbles", emo: "🫧", rx: /bubbles/i, not: /bubble wrap/i },
    { id: "sponge", label: "Sponge", emo: "🧽", rx: /sponge/i },
    { id: "towel", label: "Towel", emo: "🏖️", rx: /towel/i },
    { id: "book", label: "A book", emo: "📖", rx: /\bbooks?\b/i },
    { id: "socks", label: "Socks", emo: "🧦", rx: /sock/i },
    { id: "hats", label: "Hats", emo: "🎩", rx: /\bhats?\b/i },
    { id: "music", label: "Music player", emo: "🎵", rx: /music/i },
    { id: "playdough", label: "Play dough", emo: "🟠", rx: /play-dough|play dough/i },
    { id: "fruit", label: "Fruit", emo: "🍓", rx: /fruit/i },
    { id: "toycars", label: "Toy cars", emo: "🚗", rx: /toy car/i }
  ];
  var WC2_SUPPLY_BY_ID = {};
  WC2_SUPPLIES.forEach(function (s) { WC2_SUPPLY_BY_ID[s.id] = s; });
  function wc2SuppliesFor(groupOrTitle) {
    var g = groupOrTitle;
    if (typeof g === "string") g = wcActs().filter(function (x) { return x.title === groupOrTitle; })[0];
    if (!g) return null;
    var text = g.title + " " + (g.desc || "");
    return WC2_SUPPLIES.filter(function (s) { return s.rx.test(text) && !(s.not && s.not.test(text)); }).map(function (s) { return s.id; });
  }
  function wc2IhaveLoad() { return wc2Store(WC2_IHAVE_KEY, []); }
  function wc2IhaveSave(list) { wc2Save(WC2_IHAVE_KEY, list); }
  function wc2IhaveData() {
    var groups = wcActs(), have = wc2IhaveLoad(), haveSet = {};
    have.forEach(function (id) { haveSet[id] = 1; });
    var freq = {};
    var rows = groups.map(function (g) {
      var sup = wc2SuppliesFor(g) || [];
      sup.forEach(function (id) { freq[id] = (freq[id] || 0) + 1; });
      var missing = sup.filter(function (id) { return !haveSet[id]; });
      return { g: g, sup: sup, missing: missing };
    });
    var picker = WC2_SUPPLIES.filter(function (s) { return (freq[s.id] || 0) >= 3; })
      .sort(function (a, b) { return (freq[b.id] || 0) - (freq[a.id] || 0); }).slice(0, 20);
    var can = rows.filter(function (r) { return r.missing.length === 0; });
    var nearBy = {};
    rows.filter(function (r) { return r.missing.length === 1; }).forEach(function (r) {
      var m = r.missing[0]; (nearBy[m] = nearBy[m] || []).push(r);
    });
    var near = Object.keys(nearBy).map(function (id) { return { supply: WC2_SUPPLY_BY_ID[id], rows: nearBy[id] }; })
      .sort(function (a, b) { return b.rows.length - a.rows.length; });
    return { groups: groups, have: have, picker: picker, freq: freq, can: can, near: near };
  }
  function wc2ActRowHtml(r, showSup) {
    var g = r.g;
    var sup = r.sup.length
      ? '<span class="wc2-supchips">' + r.sup.map(function (id) { var s = WC2_SUPPLY_BY_ID[id]; return '<span class="wc2-supchip">' + s.emo + " " + esc(s.label) + "</span>"; }).join("") + "</span>"
      : '<span class="wc2-supchips"><span class="wc2-supchip free">✋ Just yourselves — nothing to fetch</span></span>';
    return '<button type="button" class="wc-rnitem wc2-actrow" data-wc2-act="' + esc(g.title) + '" style="--dc:#0B8A5F">' +
      '<span class="wc-rnemo" aria-hidden="true">' + esc(g.emo || actEmo(g)) + '</span>' +
      '<span class="wc-rntxt"><b>' + esc(g.title) + "</b><small>" + (g.place === "outdoor" ? "🌳 Outside" : "🏠 At home") + "</small>" + (showSup ? sup : "") + '</span><span class="wc-rngo" aria-hidden="true">▶</span></button>';
  }
  function ihaveHtml() {
    var d = wc2IhaveData(), haveSet = {};
    d.have.forEach(function (id) { haveSet[id] = 1; });
    var chips = d.picker.map(function (s) {
      var on = !!haveSet[s.id];
      return '<button type="button" class="wc2-supply' + (on ? " on" : "") + '" data-wc2-supply="' + s.id + '" aria-pressed="' + on + '">' + s.emo + " " + esc(s.label) + ' <span class="wc2-supn">' + (d.freq[s.id] || 0) + "</span></button>";
    }).join("");
    var canHtml = d.can.slice(0, 24).map(function (r) { return wc2ActRowHtml(r, true); }).join("");
    var nearHtml = d.near.map(function (n) {
      return '<div class="wc2-near"><h3 class="wc2-nearh">One more thing — ' + n.supply.emo + " " + esc(n.supply.label) + " — unlocks " + n.rows.length + " more</h3>" +
        n.rows.slice(0, 8).map(function (r) { return wc2ActRowHtml(r, false); }).join("") + "</div>";
    }).join("");
    return '<div class="wc2-ihave"><p class="wc-rnlead">Tap everything you have at home. Hoot checks it against what each activity needs — the needs come from the activities themselves.</p>' +
      (d.picker.length ? '<div class="wc2-supplies" role="group" aria-label="What we have">' + chips + "</div>"
        : '<p class="hoot-line">Nothing to gather for this band — every activity here is a just-yourselves one, so the whole list below is ready right now.</p>') +
      '<h3 class="wc2-sech">✅ You can make these now (' + d.can.length + ")</h3>" +
      (d.can.length ? '<div class="wc-rnlist">' + canHtml + "</div>" + (d.can.length > 24 ? '<p class="wc2-more">…and ' + (d.can.length - 24) + " more — the full list is in Activities.</p>" : "")
        : '<p class="hoot-line">Nothing yet — tap a few things you have and watch this list grow.</p>') +
      (nearHtml ? '<h3 class="wc2-sech">🔓 Nearly there</h3>' + nearHtml : "") + "</div>";
  }
  function openIhave() {
    nextView = { kind: "wc2ihave", title: "I Have…" };
    openShellOverlay("🧺 I Have…", ihaveHtml());
  }
  function wc2IhaveEntryHtml() {
    return '<section class="ll-card wc2-entry"><div class="wc2-entrytxt"><h3>🧺 I Have…</h3><p>Tap what you\'ve got at home — paper, crayons, a box — and see what you can make right now.</p></div>' +
      '<button type="button" class="ll-btn pri" data-wc2-ihave="1">What we have →</button></section>';
  }

  /* ================= Feature 2: co-op learning missions =================
     Roles are written for a family: a bigger Reader/Teacher and little
     Finders and Matchers. Steps resolve to the ACTIVE child's band, so
     the same mission works whoever is signed in. Teach-back sentences
     are the lessons' own, from the hub's TEACHBACK table (Wave A) —
     except the little-band one: the teach-back stage never runs on the
     little panel by design, so that sentence is written for this
     feature and says so in the log. */
  var WC2_TIB = {
    "early-letter-sounds": "Every letter makes its own sound — S says “sss” like a snake.",
    "quest-topic-sentences": "A topic sentence opens a paragraph by announcing its one main idea as a claim — and every sentence after it works to prove that claim.",
    "teen-algebra-ii-two-step-equations": "A two-step equation is solved by undoing the operations in reverse order — the addition or subtraction first, then the multiplication or division — applying each step to both sides.",
    "little-first-letter-sounds": "Every letter makes its own sound — S says “sss” like a snake, and M hums “mmm”."
  };
  var WC2_MISSIONS = [
    { id: "story-detectives", title: "Story Detectives", emo: "🔍", color: "#3A56D4",
      intro: "Read it, find it, make one up — a story hunt for the whole crew.",
      steps: [
        { role: "Reader", roleEmo: "📖", kind: "lesson", text: "Read the lesson out loud for everyone, the way Hoot does.",
          lesson: { little: "little-animal-sounds", early: "early-read-a-line-and-understand-it", quest: "quest-find-the-main-idea", teen: "ny-main-idea-citing-evidence" } },
        { role: "Finder", roleEmo: "🔎", kind: "game", game: "find", text: "Hunt down every hidden thing in Find It!" },
        { role: "Matcher", roleEmo: "🧩", kind: "activity", actRx: /story|book|read/i, actTitle: "Story stones", text: "Make up a tiny story together, one sentence each." }
      ] },
    { id: "number-chefs", title: "Number Chefs", emo: "🧑‍🍳", color: "#0B8A5F",
      intro: "Cook up some numbers, then cook up a snack.",
      steps: [
        { role: "Counter", roleEmo: "🔢", kind: "lesson", text: "Do the counting lesson together — everyone counts out loud.",
          lesson: { little: "little-counting-to-5", early: "early-counting-on-to-add", quest: "quest-division-is-sharing-equally", teen: "ny-unit-rates-the-price-of-one" } },
        { role: "Matcher", roleEmo: "🧩", kind: "game", game: "bubblepop", gameTeen: "band", text: "Pop the right numbers — call them out before you pop." },
        { role: "Helper", roleEmo: "🤲", kind: "activity", actRx: /fruit|cook|bak|kitchen|snack|salad/i, actTitle: "Fruit salad helper", text: "Help with a real snack, or set up a pretend feast for the toys." }
      ] },
    { id: "letter-fishing-trip", title: "Letter Fishing Trip", emo: "🎣", color: "#0E6E8C",
      intro: "Learn the sounds, catch the letters, then the big kid teaches them back.",
      steps: [
        { role: "Reader", roleEmo: "📖", kind: "lesson", text: "Learn the letter sounds together first.",
          lesson: { little: "little-first-letter-sounds", early: "early-letter-sounds", quest: "quest-topic-sentences", teen: "teen-spanish-ii-ar-verb-endings" } },
        { role: "Finder", roleEmo: "🔎", kind: "game", game: "fishing", text: "Catch the letters in Letter Fishing — shout the sound of each one you reel in." },
        { role: "Teacher", roleEmo: "🦉", kind: "teach", text: "Teacher: read Hoot's sentence out loud. Finder: say it back in your own words. That's teaching!",
          lesson: { little: "little-first-letter-sounds", early: "early-letter-sounds", quest: "quest-topic-sentences", teen: "teen-algebra-ii-two-step-equations" } }
      ] },
    { id: "animal-rescuers", title: "Animal Rescuers", emo: "🐾", color: "#F5A623",
      intro: "Meet the animals, spot them in the game, then look after the real ones.",
      steps: [
        { role: "Reader", roleEmo: "📖", kind: "lesson", text: "Do the lesson together — make every animal sound out loud.",
          lesson: { little: "little-animal-sounds", early: "early-rhyming-words", quest: "quest-how-plants-make-food", teen: "teen-biology-where-energy-comes-from" } },
        { role: "Finder", roleEmo: "🔎", kind: "game", game: "animals", text: "Find all the animals hiding in the game." },
        { role: "Helper", roleEmo: "🤲", kind: "activity", actRx: /bird|duck|bug|animal|snail|worm/i, actTitle: "Bird feeder watch", text: "Do something kind for a real animal." }
      ] },
    { id: "builders-workshop", title: "Builders' Workshop", emo: "🧱", color: "#E0457B",
      intro: "Plan it, match it, build it — taller than yesterday.",
      steps: [
        { role: "Counter", roleEmo: "🔢", kind: "lesson", text: "Warm up with the building-brain lesson.",
          lesson: { little: "little-patterns-what-comes-next", early: "early-tens-and-ones", quest: "quest-area-length-width", teen: "creator-budget-the-project" } },
        { role: "Matcher", roleEmo: "🧩", kind: "game", game: "shapes", gameTeen: "piano", text: "Match the shapes — name each one before it lands." },
        { role: "Helper", roleEmo: "🤲", kind: "activity", actRx: /tower|box|build|fort|block/i, actTitle: "Tower of cups", text: "Build the real thing together. Photo for Memories!" }
      ] },
    { id: "music-makers", title: "Music Makers", emo: "🎵", color: "#7A2E8E",
      intro: "Feel the beat in words, in the game, and in the kitchen band.",
      steps: [
        { role: "Reader", roleEmo: "📖", kind: "lesson", text: "Start with the word-rhythm lesson — clap the beats as you go.",
          lesson: { little: "little-animal-sounds", early: "early-rhyming-words", quest: "quest-coding-order-matters", teen: "creator-present-hook-build-land" } },
        { role: "Matcher", roleEmo: "🧩", kind: "game", game: "band", text: "Copy the beat in Copy the Beat — little ones copy the big ones." },
        { role: "Helper", roleEmo: "🤲", kind: "activity", actRx: /dance|music|song|sing|band/i, actTitle: "Kitchen band", text: "Make real music together — pots count as drums." }
      ] },
    { id: "kindness-crew", title: "Kindness Crew", emo: "💛", color: "#B4761B",
      intro: "Feelings first, then sharing, then helping at home.",
      steps: [
        { role: "Reader", roleEmo: "📖", kind: "lesson", text: "Talk through the lesson together — everyone gets a turn to answer.",
          lesson: { little: "little-feelings-faces", early: "early-answer-questions-about-a-story", quest: "quest-fractions-equal-parts", teen: "ny-argument-writing-claim-evidence-reasoning" } },
        { role: "Matcher", roleEmo: "🧩", kind: "game", game: "memory", text: "Play Memory Match together — help each other remember." },
        { role: "Helper", roleEmo: "🤲", kind: "activity", actRx: /sort|wash|laundry|scrub|tidy|help/i, actTitle: "Laundry sort", text: "Do one real helping job at home, together." }
      ] }
  ];
  function wc2MissionState(m) {
    var steps = m.steps.map(wc2StepDone);
    return { mission: m, steps: steps, doneCount: steps.filter(Boolean).length, complete: steps.every(Boolean) };
  }
  function wc2MissionStates() { return WC2_MISSIONS.map(wc2MissionState); }
  function wc2BadgeShelfHtml() {
    var b = wc2Badges(), chips = [];
    WC2_MISSIONS.forEach(function (m) {
      var ts = b.missions[m.id];
      chips.push('<span class="wc-badge' + (ts ? "" : " locked") + '">' + (ts ? "🏅 " : "🔒 ") + m.emo + " " + esc(m.title) + (ts ? " · " + wc2FmtDate(ts) : "") + "</span>");
    });
    if (!isTeenBand(curBand())) WC2_QUESTS.forEach(function (q) {
      var ts = b.quests[q.id];
      chips.push('<span class="wc-badge' + (ts ? "" : " locked") + '">' + (ts ? "🏅 " : "🔒 ") + q.emo + " " + esc(q.title) + (ts ? " · " + wc2FmtDate(ts) : "") + "</span>");
    });
    return '<div class="wc-badges" aria-label="Badge shelf">' + chips.join("") + "</div>";
  }
  function missionsHtml() {
    var states = wc2MissionStates();
    states.forEach(function (s) { if (s.complete) wc2Award("missions", s.mission.id); });
    var cards = states.map(function (s) {
      var m = s.mission, earned = !!wc2Badges().missions[m.id];
      return '<button type="button" class="wc-rnitem wc2-mission" data-wc2-mission="' + m.id + '" style="--dc:' + m.color + '">' +
        '<span class="wc-rnemo" aria-hidden="true">' + m.emo + '</span>' +
        '<span class="wc-rntxt"><b>' + esc(m.title) + (earned ? ' <span class="wc2-earned">🏅 badge earned</span>' : "") + "</b><small>" + esc(m.intro) + '</small></span>' +
        '<span class="wc2-prog" aria-label="' + s.doneCount + " of 3 steps done\">" + s.doneCount + "/3</span></button>";
    }).join("");
    return '<div class="wc2-missions"><p class="wc-rnlead">Missions are for the whole family together. The <b>Reader</b> and <b>Teacher</b> are the big kid or a grown-up; the little ones are the <b>Finder</b>, <b>Matcher</b>, <b>Counter</b> and <b>Helper</b>. Finish all 3 steps to earn the badge.</p>' +
      "<h3 class=\"wc2-sech\">🏆 Badge shelf</h3>" + wc2BadgeShelfHtml() +
      '<h3 class="wc2-sech">Missions</h3><div class="wc-rnlist">' + cards + "</div></div>";
  }
  function openMissions() {
    nextView = { kind: "wc2missions", title: "Co-op missions" };
    openShellOverlay("🎖️ Co-op missions", missionsHtml());
  }
  function missionHtml(id) {
    var m = WC2_MISSIONS.filter(function (x) { return x.id === id; })[0];
    if (!m) return '<p class="hoot-line">That mission has flown away.</p>';
    var s = wc2MissionState(m);
    if (s.complete) wc2Award("missions", m.id);
    var earned = !!wc2Badges().missions[m.id];
    var steps = m.steps.map(function (step, i) {
      var t = wc2StepTarget(step), done = s.steps[i];
      var tib = "";
      if (step.kind === "teach") {
        var tid = wc2ResolveLessonId(step.lesson);
        var sent = tid && WC2_TIB[tid];
        if (sent) tib = '<blockquote class="wc2-tib">“' + esc(sent) + "”</blockquote>";
      }
      return '<div class="wc2-step' + (done ? " done" : "") + '">' +
        '<span class="wc2-stepn" aria-hidden="true">' + (done ? "✓" : (i + 1)) + "</span>" +
        '<div class="wc2-stepmain"><span class="wc2-role">' + step.roleEmo + " " + esc(step.role) + '</span>' +
        "<b>" + esc(t.title) + "</b><p>" + esc(step.text) + "</p>" + tib +
        (done ? '<span class="wc2-done">✓ Done</span>'
              : '<button type="button" class="ll-btn pri sm" data-wc2-step="' + m.id + ":" + i + '">▶ Go</button>') +
        "</div></div>";
    }).join("");
    return '<div class="wc2-missionview"><p class="wc-rnlead">' + m.emo + " " + esc(m.intro) + (earned ? ' <b>🏅 Badge earned ' + wc2FmtDate(wc2Badges().missions[m.id]) + ".</b>" : "") + '</p><div class="wc2-steps">' + steps + "</div></div>";
  }
  function openMission(id) {
    var m = WC2_MISSIONS.filter(function (x) { return x.id === id; })[0];
    if (!m) return;
    nextView = { kind: "wc2mission", key: id, title: m.title };
    openShellOverlay(m.emo + " " + m.title, missionHtml(id));
  }
  function wc2MissionsEntryHtml() {
    var b = wc2Badges(), n = Object.keys(b.missions).length + Object.keys(b.quests).length;
    return '<section class="ll-card wc2-entry"><div class="wc2-entrytxt"><h3>🎖️ Co-op missions</h3><p>Three steps, the whole family, roles for everyone — ' + (n ? n + " badge" + (n === 1 ? "" : "s") + " earned so far." : "badges to earn together.") + '</p></div>' +
      '<button type="button" class="ll-btn pri" data-wc2-missions="1">Open missions →</button></section>';
  }

  /* ================= Feature 3: Quest Days (in the Days tab) ================= */
  var WC2_QUESTS = [
    { id: "pirate", title: "Pirate Day", emo: "🏴‍☠️", color: "#0E6E8C", intro: "A whole day of treasure, tides and tall ships.",
      stops: [
        { kind: "lesson", label: "Count the treasure", lesson: { little: "little-counting-to-10", early: "early-counting-on-to-add", quest: "quest-times-tables-are-groups", teen: "creator-percentages-parts-of-100" } },
        { kind: "activity", label: "Treasure trail", actRx: /treasure|trail|hunt|map/i, actTitle: "Treasure trail" },
        { kind: "game", label: "Fish for gold", game: "fishing" },
        { kind: "activity", label: "Sail the seven seas", actRx: /water|pour|splash|boat/i, actTitle: "Water pouring" }
      ] },
    { id: "space", title: "Space Day", emo: "🚀", color: "#3A56D4", intro: "Countdown, blast off, and school among the stars.",
      stops: [
        { kind: "game", label: "Blast off", game: "rocket", gameTeen: "band" },
        { kind: "lesson", label: "Launch sequence", lesson: { little: "little-counting-back-from-5", early: "early-taking-away", quest: "quest-coding-order-matters", teen: "creator-the-design-loop-test-fix-retest" } },
        { kind: "activity", label: "Build a rocket", actRx: /box|rocket|car/i, actTitle: "Cardboard box car" },
        { kind: "lesson", label: "Star school", lesson: { little: "little-star-and-heart-shapes", early: "early-rhyming-words", quest: "quest-how-plants-make-food", teen: "creator-research-you-can-trust" } }
      ] },
    { id: "dino", title: "Dinosaur Day", emo: "🦕", color: "#0B8A5F", intro: "Stomp, dig, and find out how big big really was.",
      stops: [
        { kind: "lesson", label: "Dino sizes", lesson: { little: "little-big-and-small", early: "early-tens-and-ones", quest: "quest-division-is-sharing-equally", teen: "teen-history-primary-vs-secondary-sources" } },
        { kind: "activity", label: "Dino dig", actRx: /dig|sand|rock|stone/i, actTitle: "Rock family" },
        { kind: "game", label: "Dino safari", game: "animals" },
        { kind: "activity", label: "Dino stomp", actRx: /stomp|walk|track|foot/i, actTitle: "Sound walk" }
      ] },
    { id: "cozy", title: "Cozy Winter Day", emo: "🧣", color: "#B4761B", intro: "Blankets, stories and warm drinks — a slow day on purpose.",
      stops: [
        { kind: "lesson", label: "Cozy story time", lesson: { little: "little-colour-names", early: "early-read-a-line-and-understand-it", quest: "quest-find-the-main-idea", teen: "teen-history-a-thesis-is-a-claim" } },
        { kind: "activity", label: "Build a cozy fort", actRx: /blanket|fort|sock|cushion|pillow/i, actTitle: "Sock match" },
        { kind: "game", label: "Draw a winter picture", game: "paint", gameTeen: "piano" },
        { kind: "activity", label: "One more story", actRx: /story|book|read/i, actTitle: "Story stones" }
      ] }
  ];
  function wc2QuestResetAt(id) { var q = wc2Store(WC2_QUEST_KEY, {}); return (q[id] && q[id].resetAt) || 0; }
  function wc2QuestState(q) {
    var since = wc2QuestResetAt(q.id);
    var stops = q.stops.map(function (s) { return wc2StepDoneAt(s, since); });
    return { quest: q, stops: stops, doneCount: stops.filter(Boolean).length, complete: stops.every(Boolean), since: since };
  }
  function wc2QuestStates() { return WC2_QUESTS.map(wc2QuestState); }
  function wc2DaysHtml() {
    if (isTeenBand(curBand())) return ""; /* Fix pass 5: Quest Days (Pirate/Dinosaur/Space/Cozy) are little-kid themed days — not on the teen side */
    var states = wc2QuestStates(), b = wc2Badges();
    states.forEach(function (s) { if (s.complete) wc2Award("quests", s.quest.id); });
    var cards = states.map(function (s) {
      var q = s.quest, earned = !!b.quests[q.id];
      var dots = s.stops.map(function (dn) { return '<span class="wc2-qdot' + (dn ? " on" : "") + '">' + (dn ? "✓" : "·") + "</span>"; }).join('<span class="wc2-qline"></span>');
      return '<button type="button" class="wc2-qcard" data-wc2-quest="' + q.id + '" style="--dc:' + q.color + '">' +
        '<span class="wc2-qemo" aria-hidden="true">' + q.emo + '</span>' +
        '<span class="wc2-qtxt"><b>' + esc(q.title) + (earned ? ' <span class="wc2-earned">🏅</span>' : "") + "</b><small>" + esc(q.intro) + '</small></span>' +
        '<span class="wc2-qdots" aria-label="' + s.doneCount + " of 4 stops done\">" + dots + "</span>" +
        '<span class="wc2-qn">' + s.doneCount + "/4</span></button>";
    }).join("");
    return '<section class="ll-card wc2-quests"><h2 style="margin:0 0 4px">🗺️ Quest Days</h2>' +
      '<p class="hoot-line" style="margin:0 0 10px">A themed day in four stops — some on screen, some out in the real world. Finish all four stops to earn the day\'s badge.</p>' +
      '<div class="wc2-qgrid">' + cards + "</div></section>";
  }
  function questDayHtml(id) {
    var q = WC2_QUESTS.filter(function (x) { return x.id === id; })[0];
    if (!q) return '<p class="hoot-line">That quest has sailed away.</p>';
    var s = wc2QuestState(q);
    if (s.complete) wc2Award("quests", q.id);
    var earned = !!wc2Badges().quests[q.id];
    var stops = q.stops.map(function (stop, i) {
      var t = wc2StepTarget(stop), done = s.stops[i];
      return '<div class="wc2-step' + (done ? " done" : "") + '">' +
        '<span class="wc2-stepn" aria-hidden="true">' + (done ? "✓" : (i + 1)) + "</span>" +
        '<div class="wc2-stepmain"><span class="wc2-role">' + (stop.kind === "lesson" ? "📚 Lesson" : stop.kind === "game" ? "🎮 Game" : "🧺 Real world") + '</span>' +
        "<b>" + esc(stop.label) + "</b><p>" + esc(t.title) + "</p>" +
        (done ? '<span class="wc2-done">✓ Done</span>' : '<button type="button" class="ll-btn pri sm" data-wc2-qstep="' + q.id + ":" + i + '">▶ Go</button>') +
        "</div></div>";
    }).join("");
    return '<div class="wc2-missionview"><p class="wc-rnlead">' + q.emo + " " + esc(q.intro) + (earned ? ' <b>🏅 Badge earned ' + wc2FmtDate(wc2Badges().quests[q.id]) + ".</b>" : "") + '</p>' +
      '<div class="wc2-journey" aria-hidden="true">' + q.stops.map(function (_, i) { return '<span class="wc2-jnode' + (s.stops[i] ? " on" : "") + '">' + (s.stops[i] ? "✓" : (i + 1)) + "</span>" + (i < 3 ? '<span class="wc2-jline' + (s.stops[i] && s.stops[i + 1] ? " on" : "") + '"></span>' : ""); }).join("") + "</div>" +
      '<div class="wc2-steps">' + stops + "</div>" +
      '<p class="wc2-restartrow"><button type="button" class="ll-btn sm" data-wc2-qrestart="' + q.id + '">↺ Start this day again</button> <span class="wc2-more">The badge stays earned — the journey starts fresh.</span></p></div>';
  }
  function openQuestDay(id) {
    if (isTeenBand(curBand())) return; /* Fix pass 5: teen side has no Quest Days, even via a restored view */
    var q = WC2_QUESTS.filter(function (x) { return x.id === id; })[0];
    if (!q) return;
    nextView = { kind: "wc2quest", key: id, title: q.title };
    openShellOverlay(q.emo + " " + q.title, questDayHtml(id));
  }

  /* ================= Feature 4: printable cards ================= */
  function wc2PrintRoot() {
    var r = document.getElementById("wc2-print-root");
    if (!r) { r = document.createElement("div"); r.id = "wc2-print-root"; document.body.appendChild(r); }
    return r;
  }
  function wc2LessonSteps(id, title) {
    var steps = [];
    var card = id ? document.querySelector('.lsn[data-lsn-id="' + id + '"], .ny-lsn[data-lsn-id="' + id + '"]') : null;
    if (!card && title) card = findLessonNode(title);
    if (card) {
      card.querySelectorAll(".tutor-step").forEach(function (n) { var t = n.textContent.replace(/\s+/g, " ").trim(); if (t) steps.push(t); });
      if (!steps.length && card.classList.contains("ny-lsn")) {
        var secs = nySections(card);
        NY_STEPS.forEach(function (st, i) { if (secs[i]) steps.push(st.label); });
      }
      if (!steps.length) {
        var teach = card.querySelector(".lsn-teach");
        if (teach) teach.textContent.replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+/).forEach(function (s) { if (s && steps.length < 4) steps.push(s); });
      }
    }
    if (!steps.length) {
      var h = HL(), hl = h && title ? h.byTitle(title) : null;
      if (hl) {
        if (hl.intro) steps.push(hl.intro);
        if (hl.rounds && hl.rounds.length) steps.push("Practise " + hl.rounds.length + " quick rounds with Hoot.");
        if (hl.recap) steps.push(hl.recap);
      }
    }
    return steps.slice(0, 6);
  }
  function wc2PrintCardHtml(o) {
    var steps = o.steps.length ? "<ol>" + o.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ol>"
      : "<p>" + esc(o.blurb || "") + "</p>";
    return '<div class="wc2-pcard">' +
      '<div class="wc2-phead"><span class="wc2-pemo" aria-hidden="true">' + (o.emo || "🦉") + "</span><div><h1>" + esc(o.title) + '</h1><p class="wc2-pkind">' + esc(o.kindLabel) + " · Hoot's World</p></div></div>" +
      (o.art ? '<img class="wc2-part" src="assets/lesson-art/' + o.art + '.svg" alt="">' : "") +
      (o.blurb ? '<p class="wc2-pblurb">' + esc(o.blurb) + "</p>" : "") +
      '<h2>Your steps</h2>' + steps +
      '<div class="wc2-pdone"><span class="wc2-pbox" aria-hidden="true"></span><span>We did it! &nbsp; Date: ____________</span></div>' +
      '<p class="wc2-pfoot">Stick me on the fridge 🧲</p></div>';
  }
  function wc2DoPrint(html) {
    var r = wc2PrintRoot();
    r.innerHTML = html;
    setTimeout(function () { try { window.print(); } catch (e) {} }, 60);
  }
  function wc2PrintLesson(id, title) {
    var rec = id ? LESSON_BY_ID[id] : null, l = rec ? rec.lesson : (title ? LESSON_BY_TITLE[title] : null);
    var hl = !l && title && HL() ? HL().byTitle(title) : null;
    var t = l ? l.title : (hl ? hl.title : title);
    if (!t) return;
    var lid = l ? l.id : (id || lessonIdForTitle(t));
    wc2DoPrint(wc2PrintCardHtml({
      title: t, emo: l ? l.emo : (hl ? hl.emo : "🦉"), art: lid && LESSON_ART[lid] ? lid : null,
      blurb: l ? (l.blurb || "") : "", kindLabel: "Lesson card", steps: wc2LessonSteps(lid, t)
    }));
  }
  function wc2PrintActivity(title) {
    var g = wcActs().filter(function (x) { return x.title === title; })[0];
    if (!g) return;
    var steps = (g.desc || "").split(/(?<=[.!?])\s+/).filter(Boolean).slice(0, 5);
    wc2DoPrint(wc2PrintCardHtml({
      title: g.title, emo: g.emo || actEmo(g), art: null,
      blurb: g.place === "outdoor" ? "A real-world activity — outside." : "A real-world activity — at home.",
      kindLabel: "Activity card", steps: steps
    }));
  }
  function wc2PrintBtnInsert(id, title) {
    var body = $("#ll-obody");
    if (!body || body.querySelector(".wc2-printrow")) return;
    var row = document.createElement("div");
    row.className = "wc2-printrow";
    row.innerHTML = '<button type="button" class="ll-btn sm" data-wc2-printlesson="' + esc(id || "") + "|" + esc(title || "") + '">🖨 Print card</button>';
    body.insertBefore(row, body.firstChild);
  }

  /* ---------- Today / Play entries ---------- */
  function wc2TodayHtml() {
    if (!state.profile) return "";
    return '<section class="ll-card wc2-today"><h2 class="todoh">🎖️ Together time</h2>' +
      '<button type="button" class="wc2-entrybtn" data-wc2-missions="1"><span class="wc2-eemo" aria-hidden="true">🎖️</span><span class="wc2-etxt"><b>Co-op missions</b><span class="wc2-esub">Family missions with roles for everyone</span></span><span class="wc2-echev" aria-hidden="true">›</span></button>' +
      "</section>";
  }

  /* ---------- clicks (Wave C2's own attrs; the shell's and Wave C1's
     listeners ignore them) ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-wc2-missions],[data-wc2-mission],[data-wc2-step],[data-wc2-ihave],[data-wc2-supply],[data-wc2-act],[data-wc2-quest],[data-wc2-qstep],[data-wc2-qrestart],[data-wc2-printlesson],[data-wc2-printact]") : null;
    if (!t) return;
    if (t.hasAttribute("data-wc2-missions")) { openMissions(); return; }
    if (t.hasAttribute("data-wc2-mission")) { openMission(t.getAttribute("data-wc2-mission")); return; }
    if (t.hasAttribute("data-wc2-step")) {
      var parts = t.getAttribute("data-wc2-step").split(":"), m = WC2_MISSIONS.filter(function (x) { return x.id === parts[0]; })[0];
      if (m) wc2OpenStepTarget(m.steps[+parts[1]]);
      return;
    }
    if (t.hasAttribute("data-wc2-ihave")) { openIhave(); return; }
    if (t.hasAttribute("data-wc2-supply")) {
      var sid = t.getAttribute("data-wc2-supply"), have = wc2IhaveLoad(), i = have.indexOf(sid);
      if (i >= 0) have.splice(i, 1); else have.push(sid);
      wc2IhaveSave(have);
      nextView = { kind: "wc2ihave", title: "I Have…" };
      openShellOverlay("🧺 I Have…", ihaveHtml());
      return;
    }
    if (t.hasAttribute("data-wc2-act")) { wc2GoActivity(t.getAttribute("data-wc2-act")); return; }
    if (t.hasAttribute("data-wc2-quest")) { openQuestDay(t.getAttribute("data-wc2-quest")); return; }
    if (t.hasAttribute("data-wc2-qstep")) {
      var qp = t.getAttribute("data-wc2-qstep").split(":"), q = WC2_QUESTS.filter(function (x) { return x.id === qp[0]; })[0];
      if (q) wc2OpenStepTarget(q.stops[+qp[1]]);
      return;
    }
    if (t.hasAttribute("data-wc2-qrestart")) {
      var qid = t.getAttribute("data-wc2-qrestart"), qs = wc2Store(WC2_QUEST_KEY, {});
      qs[qid] = { resetAt: Date.now() };
      wc2Save(WC2_QUEST_KEY, qs);
      nextView = { kind: "wc2quest", key: qid, title: (WC2_QUESTS.filter(function (x) { return x.id === qid; })[0] || {}).title || "Quest Day" };
      var qq = WC2_QUESTS.filter(function (x) { return x.id === qid; })[0];
      openShellOverlay(qq.emo + " " + qq.title, questDayHtml(qid));
      return;
    }
    if (t.hasAttribute("data-wc2-printlesson")) {
      var lp = t.getAttribute("data-wc2-printlesson").split("|");
      wc2PrintLesson(lp[0] || null, lp.slice(1).join("|") || null);
      return;
    }
    if (t.hasAttribute("data-wc2-printact")) { wc2PrintActivity(t.getAttribute("data-wc2-printact")); return; }
  });

  /* ================= Wave E1: Morning Hello (21), parent voice notes (22),
     lesson photo quests (24) — Dawid's own additions =================
     All state is new keys; existing stores untouched. New localStorage keys
     ride family backups via the hootworld. pattern, like C1's completions.
     Spoken sequences and the parent's own recorded note play through Audio
     elements flagged __govVoice, so the app-wide voice governor serialises
     them behind whatever is speaking — never two voices at once. (The one
     single-clip praise line still uses window.__hwSay.) No device TTS. */

  var WE1_HELLO_KEY = "hootworld.hello.v1";        /* { pid: { day, at } } */
  var WE1_NOTES_CFG_KEY = "hootworld.vnotes.cfg.v1"; /* { enabled: 1|0 } */
  var WE1_QUEST_KEY = "hootworld.pquests.v1";      /* { pid: { active, total, doneCount, lastDone } } */
  function we1Store(k, dflt) { try { var v = JSON.parse(localStorage.getItem(k) || "null"); return v == null ? dflt : v; } catch (e) { return dflt; } }
  function we1Save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  /* ---------- Feature 21: Hoot's Morning Hello ---------- */
  var WE1_MISSIONS = [
    { clip: "hello-mission-1", text: "Find something round in the kitchen!" },
    { clip: "hello-mission-2", text: "Count the stairs — every single one!" },
    { clip: "hello-mission-3", text: "Spot something red outside!" },
    { clip: "hello-mission-4", text: "Find something that starts with the letter B!" },
    { clip: "hello-mission-5", text: "Hug somebody you love!" },
    { clip: "hello-mission-6", text: "Find the biggest leaf you can!" },
    { clip: "hello-mission-7", text: "Listen for a bird and copy its song!" },
    { clip: "hello-mission-8", text: "Build the tallest tower you can — then knock it down!" },
    { clip: "hello-mission-9", text: "Find something soft and give it a squeeze!" },
    { clip: "hello-mission-10", text: "Count all the windows in your home!" },
    { clip: "hello-mission-11", text: "Find something that can float in water!" },
    { clip: "hello-mission-12", text: "Draw a picture of your family!" }
  ];
  var WE1_CHALLENGES = [
    { clip: "hello-challenge-1", text: "Find something round in the kitchen." },
    { clip: "hello-challenge-2", text: "Count the stairs in your home, every one." },
    { clip: "hello-challenge-3", text: "Spot something red outside." },
    { clip: "hello-challenge-4", text: "Find something that starts with the letter B." },
    { clip: "hello-challenge-5", text: "Do one kind thing for somebody at home." },
    { clip: "hello-challenge-6", text: "Find the biggest leaf you can." },
    { clip: "hello-challenge-7", text: "Listen for a bird and try to copy its song." },
    { clip: "hello-challenge-8", text: "Build the tallest tower you can, then knock it down." },
    { clip: "hello-challenge-9", text: "Find something soft and describe how it feels." },
    { clip: "hello-challenge-10", text: "Count all the windows in your home." },
    { clip: "hello-challenge-11", text: "Find something that floats in water and test it." },
    { clip: "hello-challenge-12", text: "Sketch a quick picture of your family." }
  ];
  /* The day's hello is deterministic per child + date (same FNV/day-index
     machinery as the C1 daily pick): stable across reloads, rotates daily.
     Greeting reuses the app's own by-name greeting clips where they exist
     (__llGreetClip: good-morning-/hi-/sleepy-<profile>, recorded in the base
     build); the teen band's tutor voice has no by-name clips in the library
     (the base build makes the same choice — Profile C is never greeted by a
     Hoot name clip), so she gets the recorded tutor greeting instead. */
  function we1HelloPlan(pid, date) {
    var teen = isTeenBand(bandOf(pid));
    var di = wcDayIndex(date || new Date());
    var letter = "abcdefghijklmnopqrstuvwxyz"[((di + wcHash(pid)) % 26 + 26) % 26];
    var m = (teen ? WE1_CHALLENGES : WE1_MISSIONS)[((di * 7 + wcHash(pid)) % 12 + 12) % 12];
    var greet;
    if (teen) greet = "hello-greet-tutor";
    else {
      var gc = null; try { gc = window.__llGreetClip && window.__llGreetClip(pid); } catch (e) {}
      greet = gc ? String(gc).replace(/\.mp3$/, "") : "hoot-welcome";
    }
    /* Fix pass 10: the letter of the day is a little-kid segment — the
       teen Morning brief is greeting + challenge only, and the challenge
       plays in her tutor's voice (tut-hello-challenge-*), never Hoot's. */
    return { teen: teen, letter: letter, mission: m,
             clips: teen ? [greet, "tut-" + m.clip] : [greet, "hello-letter-hoot", "name-letter-" + letter, m.clip] };
  }
  function we1HelloDone(pid) { var d = we1Store(WE1_HELLO_KEY, {}); return !!(d[pid] && d[pid].day === dayKeyOf(new Date())); }
  /* Sequence player: a single governed element chained on real 'ended'
     events. (The hub queue chain inside __hwSay intermittently stalls
     behind the governor's src-deferral when other voices are in flight —
     drive-verified in .work-wavee/debug-replay.js: the last clip of the
     sequence sometimes never started. This player has no queue to desync:
     it sets src only while paused/ended, advances on ended/error, and a
     watchdog re-checks every few seconds without ever interrupting a
     clip that is genuinely still playing.) */
  var we1SeqEl = null, we1SeqTimer = null;
  function we1PlaySequence(clips) {
    try { if (window.__hootStopClip) window.__hootStopClip(); } catch (e) {}
    if (!we1SeqEl) { we1SeqEl = new Audio(); we1SeqEl.__govVoice = 1; we1SeqEl.preload = "auto"; }
    var el = we1SeqEl, i = 0;
    try { el.pause(); } catch (e) {}
    if (we1SeqTimer) { clearTimeout(we1SeqTimer); we1SeqTimer = null; }
    function arm() {
      if (we1SeqTimer) clearTimeout(we1SeqTimer);
      we1SeqTimer = setTimeout(function () {
        if (!el.paused && !el.ended) { arm(); return; } /* still playing: keep waiting */
        step();
      }, 6000);
    }
    function step() {
      if (we1SeqTimer) { clearTimeout(we1SeqTimer); we1SeqTimer = null; }
      if (i >= clips.length) { el.onended = null; el.onerror = null; (window.__we1SeqLog = window.__we1SeqLog || []).push({ clip: "(done)", at: Date.now() }); return; }
      var name = clips[i++];
      (window.__we1SeqLog = window.__we1SeqLog || []).push({ clip: name, at: Date.now() });
      el.src = "assets/voice/" + name + ".mp3";
      var pr = el.play(); if (pr && pr.catch) pr.catch(function () {});
      arm();
    }
    el.onended = step; el.onerror = step;
    step();
  }
  function we1PlayHello() {
    var p = state.profile; if (!p) return;
    var plan = we1HelloPlan(p.id, new Date());
    we1PlaySequence(plan.clips);
    var d = we1Store(WE1_HELLO_KEY, {});
    d[p.id] = { day: dayKeyOf(new Date()), at: Date.now() };
    we1Save(WE1_HELLO_KEY, d);
    var card = document.getElementById("we1-hello");
    if (card) { var t = document.createElement("div"); t.innerHTML = we1HelloChipHtml(); var n = t.firstChild; if (n) card.replaceWith(n); }
  }
  function we1HelloChipHtml() {
    return '<section class="ll-card we1-hellochip" id="we1-hello" aria-label="Morning Hello"><span aria-hidden="true">☀️</span><b>Morning Hello ✓</b>' +
      '<button type="button" class="ll-btn sm" data-we1-hello="replay">🔁 Hear it again</button></section>';
  }
  function we1HelloHtml() {
    var p = state.profile; if (!p) return "";
    if (we1HelloDone(p.id)) return we1HelloChipHtml();
    var plan = we1HelloPlan(p.id, new Date());
    return '<section class="ll-card we1-hello" id="we1-hello" aria-label="Morning Hello">' +
      '<div class="we1-hellotop"><span class="we1-helloemo" aria-hidden="true">☀️</span><div>' +
      "<h2 class=\"todoh\" style=\"margin:0\">" + (plan.teen ? "Morning brief" : "Morning Hello") + '</h2>' +
      '<p class="hoot-line" style="margin:2px 0 0">' + (plan.teen ? "Your tutor has a hello and a challenge for you." : "Hoot has a hello, today's letter and a tiny mission for " + esc(p.label) + ".") + "</p></div></div>" +
      '<p class="we1-helloline">' + (plan.teen ? "" : "Today's letter: <b>" + plan.letter.toUpperCase() + "</b> · ") + (plan.teen ? "Challenge" : "Mission") + ": " + esc(plan.mission.text) + "</p>" +
      '<button type="button" class="we1-bigplay" data-we1-hello="play">▶ ' + (plan.teen ? "Hear your morning brief" : "Hear your Morning Hello") + "</button></section>";
  }

  /* ---------- Feature 24: lesson photo quests ---------- */
  var WE1_QUESTS = [
    { id: "round-things", emo: "⭕", text: "Photograph 3 round things" },
    { id: "big-leaf", emo: "🍃", text: "Find a leaf bigger than your hand and photograph it" },
    { id: "starts-with-b", emo: "🅱️", text: "Take a picture of something that starts with B" },
    { id: "something-red", emo: "🔴", text: "Photograph something red" },
    { id: "favourite-snack", emo: "🍎", text: "Take a picture of your favourite snack" },
    { id: "a-shadow", emo: "🌤️", text: "Photograph a shadow" },
    { id: "it-floats", emo: "🎈", text: "Find something that floats and photograph it" },
    { id: "tallest-tower", emo: "🗼", text: "Build the tallest tower you can and photograph it" },
    { id: "something-soft", emo: "🧸", text: "Photograph something soft" },
    { id: "bug-or-bird", emo: "🐞", text: "Take a picture of a bug or a bird — from far away!" },
    { id: "water", emo: "💧", text: "Photograph water — in a cup, a puddle or the bath" },
    { id: "wheels", emo: "🚗", text: "Take a picture of something with wheels" }
  ];
  function we1QuestDef(qid) { return WE1_QUESTS.filter(function (x) { return x.id === qid; })[0] || null; }
  function we1QuestState(pid) { var d = we1Store(WE1_QUEST_KEY, {}); return d[pid] || { active: null, total: 0, doneCount: 0, lastDone: null }; }
  function we1QuestSave(pid, s) { var d = we1Store(WE1_QUEST_KEY, {}); d[pid] = s; we1Save(WE1_QUEST_KEY, d); }
  /* One active quest per child; a new one is assigned only when none is
     active, rotating through the authored set in order. */
  function we1AssignQuest(pid, lessonId, title) {
    var s = we1QuestState(pid);
    if (s.active) return { active: s.active, fresh: false };
    var q = WE1_QUESTS[(s.total || 0) % WE1_QUESTS.length];
    s.active = { qid: q.id, lessonId: lessonId || null, lessonTitle: title || "", at: Date.now(), dismissedDay: "" };
    s.total = (s.total || 0) + 1;
    we1QuestSave(pid, s);
    return { active: s.active, fresh: true };
  }
  function we1QuestSpotKey(pid, a) { return "pq:" + pid + ":" + a.qid + ":" + (a.lessonId || "lesson"); }
  function we1QuestCaption(a) {
    var q = we1QuestDef(a.qid);
    return "📸 Photo quest: " + (q ? q.text : "Photo quest") + (a.lessonTitle ? " · ⭐ " + a.lessonTitle : "");
  }
  function we1RegisterQuestSpot(pid, a) {
    if (!window.__hwPhotoAPI || !window.__hwPhotoAPI.register || !a) return null;
    var q = we1QuestDef(a.qid);
    return window.__hwPhotoAPI.register(we1QuestSpotKey(pid, a), q ? q.text : "Photo quest", we1QuestCaption(a), {});
  }
  /* Restored quest photos must find their spot again so the album figure
     carries the quest caption (the badge) after a reload: register a spot
     for every pq: record already in the store. */
  setTimeout(function () {
    photoAll().then(function (recs) {
      var seen = {};
      (recs || []).forEach(function (r) {
        if (r && typeof r.key === "string" && r.key.indexOf("pq:") === 0 && !seen[r.key]) {
          seen[r.key] = 1;
          if (window.__hwPhotoAPI && window.__hwPhotoAPI.register) window.__hwPhotoAPI.register(r.key, r.title || "Photo quest", r.caption || "📸 Photo quest", {});
        }
      });
    }).catch(function () {});
  }, 1500);
  function we1ShowQuestToast(a) {
    we1HideQuestToast();
    var ov = document.getElementById("ll-overlay");
    if (!ov || ov.hidden) return;
    var q = we1QuestDef(a.qid); if (!q) return;
    var d = document.createElement("div");
    d.className = "we1-toast"; d.id = "we1-quest-toast"; d.setAttribute("role", "note");
    d.innerHTML = '<span class="we1-toastemo" aria-hidden="true">📸</span><div class="we1-toasttxt"><b>Photo quest unlocked!</b><span>' + esc(q.text) + (a.lessonTitle ? " · from ⭐ " + esc(a.lessonTitle) : "") + "</span></div>" +
      '<button type="button" class="ll-btn pri sm" data-we1-quest="photo">📷 Take the photo</button>' +
      '<button type="button" class="ll-btn sm" data-we1-quest="notnow">Not now</button>';
    /* Fix pass 4: in-flow card at the end of the lesson view — the old
       position:fixed toast dropped over the top of the end screen and
       covered the celebration (Dawid's iPhone report, 2026-11-15). */
    var host = document.getElementById("ll-obody") || ov;
    host.appendChild(d);
    try { d.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {}
  }
  function we1HideQuestToast() { var t = document.getElementById("we1-quest-toast"); if (t) t.remove(); }
  var we1PendingPhoto = null;
  function we1TakeQuestPhoto() {
    var p = state.profile; if (!p) return;
    var s = we1QuestState(p.id); if (!s.active) return;
    we1RegisterQuestSpot(p.id, s.active);
    we1PendingPhoto = { pid: p.id, spotKey: we1QuestSpotKey(p.id, s.active), since: Date.now(), tries: 0 };
    we1WatchQuestPhoto();
    /* the hub's own photo input — on a phone this opens the camera /
       photo picker; nothing about the camera is faked in-app */
    if (window.__hwPhotoAPI) window.__hwPhotoAPI.add(we1PendingPhoto.spotKey, p.id);
  }
  function we1WatchQuestPhoto() {
    var pend = we1PendingPhoto; if (!pend) return;
    var iv = setInterval(function () {
      if (we1PendingPhoto !== pend) { clearInterval(iv); return; }
      pend.tries++;
      if (pend.tries > 45) { clearInterval(iv); we1PendingPhoto = null; return; }
      photoAll().then(function (recs) {
        var hit = null;
        (recs || []).forEach(function (r) { if (r && r.key === pend.spotKey && (r.ts || 0) >= pend.since - 5000 && !r.quest) hit = hit || r; });
        if (hit) { clearInterval(iv); we1CompleteQuestPhoto(pend, hit); }
      }).catch(function () {});
    }, 700);
  }
  function we1CompleteQuestPhoto(pend, rec) {
    we1PendingPhoto = null;
    var s = we1QuestState(pend.pid);
    var a = s.active;
    /* the quest + lesson ride ON the photo record, so Wave D's backup
       export carries them with the photo like every other record field */
    var upd = {}; Object.keys(rec).forEach(function (k) { upd[k] = rec[k]; });
    upd.quest = a ? a.qid : null; upd.lessonId = a ? a.lessonId : null; upd.lessonTitle = a ? a.lessonTitle : "";
    photoPut(upd).catch(function () {});
    if (a) {
      s.lastDone = { qid: a.qid, lessonId: a.lessonId, at: Date.now() };
      s.doneCount = (s.doneCount || 0) + 1;
      s.active = null;
      we1QuestSave(pend.pid, s);
    }
    we1HideQuestToast();
    try { if (window.__hwSay) window.__hwSay(["hoot-great-job"]); } catch (e) {}
    if (document.getElementById("we1-quest")) render();
  }
  function we1QuestHtml() {
    var p = state.profile; if (!p) return "";
    var s = we1QuestState(p.id);
    if (!s.active) return "";
    if (s.active.dismissedDay === dayKeyOf(new Date())) return "";
    var q = we1QuestDef(s.active.qid); if (!q) return "";
    we1RegisterQuestSpot(p.id, s.active);
    return '<section class="ll-card we1-quest" id="we1-quest" aria-label="Photo quest">' +
      '<div class="we1-questtop"><span class="we1-questemo" aria-hidden="true">' + q.emo + '</span><div>' +
      '<h2 class="todoh" style="margin:0">📸 Photo quest</h2>' +
      '<p class="we1-questtxt">' + esc(q.text) + "</p>" +
      (s.active.lessonTitle ? '<p class="hoot-line" style="margin:2px 0 0">Unlocked by ⭐ ' + esc(s.active.lessonTitle) + "</p>" : "") +
      '</div></div><div class="we1-questbtns">' +
      '<button type="button" class="ll-btn pri" data-we1-quest="photo">📷 Take or choose a photo</button>' +
      '<button type="button" class="ll-btn" data-we1-quest="notnow-today">Not now</button></div></section>';
  }
  function we1TodayHtml() { return we1HelloHtml() + we1QuestHtml(); }

  /* ---------- Feature 22: parent voice notes ---------- */
  /* Own IndexedDB database in the photo store's pattern (the photos DB is
     opened at version 1 by the hub, so a second store there would force a
     version bump under it — a sibling database is the safe shape). Records:
     { id, pid, label, type, ts, blob } with the same { buf, type } fallback
     as photos when a browser refuses Blob storage. */
  var we1NotesDbP = null;
  function we1NotesDb() {
    if (we1NotesDbP) return we1NotesDbP;
    we1NotesDbP = new Promise(function (resolve) {
      if (!("indexedDB" in window)) { resolve(null); return; }
      var req;
      try { req = indexedDB.open("hootworld-audionotes", 1); } catch (e) { resolve(null); return; }
      req.onupgradeneeded = function () { try { req.result.createObjectStore("notes", { keyPath: "id" }); } catch (e) {} };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { resolve(null); };
    });
    return we1NotesDbP;
  }
  function we1NotesAll() {
    return we1NotesDb().then(function (db) {
      return new Promise(function (resolve) {
        if (!db) { resolve([]); return; }
        try {
          var rq = db.transaction("notes", "readonly").objectStore("notes").getAll();
          rq.onsuccess = function () { resolve(rq.result || []); };
          rq.onerror = function () { resolve([]); };
        } catch (e) { resolve([]); }
      });
    });
  }
  function we1NotePutRaw(db, rec, onFail) {
    var tx;
    try { tx = db.transaction("notes", "readwrite"); tx.objectStore("notes").put(rec); } catch (e) { onFail(); return; }
    tx.onerror = function (ev) { try { ev.preventDefault(); } catch (e) {} onFail(); };
    tx.onabort = function () { onFail(); };
    tx.oncomplete = function () {};
  }
  function we1NotePut(rec) {
    return we1NotesDb().then(function (db) {
      return new Promise(function (resolve) {
        if (!db) { resolve(); return; }
        var done = false;
        var finish = function () { if (!done) { done = true; resolve(); } };
        try {
          var tx = db.transaction("notes", "readwrite");
          tx.objectStore("notes").put(rec);
          tx.oncomplete = finish; tx.onerror = function () { fallback(); }; tx.onabort = function () { fallback(); };
        } catch (e) { fallback(); }
        function fallback() {
          if (done || !rec.blob) { finish(); return; }
          (rec.blob.arrayBuffer ? rec.blob.arrayBuffer() : new Promise(function (ok, no) { var fr = new FileReader(); fr.onload = function () { ok(fr.result); }; fr.onerror = no; fr.readAsArrayBuffer(rec.blob); })).then(function (buf) {
            var r2 = {}; Object.keys(rec).forEach(function (k) { if (k !== "blob") r2[k] = rec[k]; });
            r2.buf = buf; r2.type = rec.blob.type || "audio/webm";
            we1NotePutRaw(db, r2, finish);
            setTimeout(finish, 300);
          }).catch(finish);
        }
      });
    });
  }
  function we1NoteDelete(id) {
    return we1NotesDb().then(function (db) {
      return new Promise(function (resolve) {
        if (!db) { resolve(); return; }
        try { var tx = db.transaction("notes", "readwrite"); tx.objectStore("notes").delete(id); tx.oncomplete = function () { resolve(); }; tx.onerror = function () { resolve(); }; }
        catch (e) { resolve(); }
      });
    });
  }
  /* The one save path — the recorder and any other caller land here. */
  function we1SaveNote(pid, label, blob) {
    var rec = { id: "n" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
                pid: pid, label: label || "Praise note", type: (blob && blob.type) || "audio/webm", ts: Date.now(), blob: blob };
    return we1NotePut(rec).then(function () { return rec; });
  }
  function we1NoteBlob(n) { return n ? (n.blob || (n.buf ? new Blob([n.buf], { type: n.type || "audio/webm" }) : null)) : null; }
  function we1NotesEnabled() { var c = we1Store(WE1_NOTES_CFG_KEY, { enabled: 1 }); return !(c.enabled === 0 || c.enabled === false); }
  window.__we1NoteLog = []; /* drive evidence: one entry per note playback */
  var we1NoteAudio = null, we1NoteUrl = null;
  function we1StopNote() {
    if (we1NoteAudio) { we1NoteAudio.__govWait = false; we1NoteAudio.__govNext = null; try { we1NoteAudio.pause(); } catch (e) {} we1NoteAudio = null; }
    if (we1NoteUrl) { try { URL.revokeObjectURL(we1NoteUrl); } catch (e) {} we1NoteUrl = null; }
  }
  function we1PlayNoteBlob(blob, pid, label) {
    if (!blob) return;
    we1StopNote();
    var url = we1NoteUrl = URL.createObjectURL(blob);
    var a = new Audio(url);
    a.__govVoice = 1; /* through the voice governor: waits its turn behind
                         any clip still speaking, then plays alone */
    we1NoteAudio = a;
    var rec = { pid: pid, label: label, at: Date.now(), startedAt: 0, waited: false };
    window.__we1NoteLog.push(rec);
    a.addEventListener("playing", function () { rec.startedAt = Date.now(); rec.waited = rec.startedAt - rec.at > 250; });
    a.addEventListener("ended", function () { try { URL.revokeObjectURL(url); } catch (e) {} if (we1NoteAudio === a) we1NoteAudio = null; });
    var pr = a.play(); if (pr && pr.catch) pr.catch(function () {});
  }
  function we1PlayNoteById(id) {
    we1NotesAll().then(function (ns) {
      var n = ns.filter(function (x) { return x.id === id; })[0];
      if (n) we1PlayNoteBlob(we1NoteBlob(n), n.pid, n.label);
    }).catch(function () {});
  }
  function we1NotesSupported() { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder); }
  function we1NoteMsg(t) { var m = document.getElementById("we1-notemsg"); if (m) m.textContent = t; }
  function we1NotesHtml() {
    var supported = we1NotesSupported();
    var rows = PROFILES.map(function (p) {
      return '<div class="we1-notechild"><h3><span aria-hidden="true">' + p.emoji + "</span> " + esc(p.label) + '</h3>' +
        '<div class="we1-notelist" data-we1-list="' + p.id + '"><p class="hoot-line" style="margin:0">Loading…</p></div>' +
        '<div class="we1-recrow"><input type="text" data-we1-label="' + p.id + '" maxlength="40" autocomplete="off" placeholder="Name it — e.g. Dad — great job"' + (supported ? "" : " disabled") + ">" +
        '<button type="button" class="ll-btn" data-we1-rec="' + p.id + '"' + (supported ? "" : " disabled") + ">● Record praise</button></div></div>";
    }).join("");
    setTimeout(we1FillNoteLists, 40);
    return '<section class="ll-card we1-notes" id="we1-notes"><h2 style="margin:0 0 4px">🎙️ Praise voice notes</h2>' +
      '<p class="hoot-line" style="margin:0 0 10px">Record a short praise clip for each child, in your own voice. When they finish a lesson, your note plays right after Hoot\'s celebration. Notes live on this device and ride along in backup files, like the photos.</p>' +
      '<label class="we1-toggle"><input type="checkbox" id="we1-notes-toggle"' + (we1NotesEnabled() ? " checked" : "") + '> Play my note when a lesson is finished</label>' +
      (supported ? "" : '<p class="we1-nosupport" role="note">🎙️ This browser can\'t record audio, so new voice notes can\'t be recorded here. Notes you already have still play — and you can record on another browser or device.</p>') +
      rows + '<p class="ll-safemsg" id="we1-notemsg" role="status" aria-live="polite"></p></section>';
  }
  function we1FillNoteLists() {
    if (!document.getElementById("we1-notes")) return;
    we1NotesAll().then(function (ns) {
      PROFILES.forEach(function (p) {
        var box = document.querySelector('[data-we1-list="' + p.id + '"]'); if (!box) return;
        var mine = ns.filter(function (n) { return n.pid === p.id; }).sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); });
        box.innerHTML = mine.length ? mine.map(function (n) {
          return '<div class="we1-note"><span class="we1-notelabel">🎙️ ' + esc(n.label || "Praise note") + "</span><small>" + esc(new Date(n.ts || Date.now()).toLocaleDateString()) + '</small>' +
            '<button type="button" class="ll-btn sm" data-we1-play="' + n.id + '">▶ Play</button>' +
            '<button type="button" class="ll-btn sm" data-we1-del="' + n.id + '">🗑 Delete</button></div>';
        }).join("") : '<p class="hoot-line" style="margin:0">No notes yet for ' + esc(p.label) + ".</p>";
      });
    }).catch(function () {});
  }
  var we1Rec = null;
  function we1ToggleRecord(pid, btn) {
    if (we1Rec) { try { we1Rec.mr.stop(); } catch (e) {} return; }
    if (!we1NotesSupported()) { we1NoteMsg("This browser can't record audio here."); return; }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var mr;
      try { mr = new MediaRecorder(stream); } catch (e) { stream.getTracks().forEach(function (t) { t.stop(); }); we1NoteMsg("This browser can't record audio here."); return; }
      var chunks = [];
      mr.ondataavailable = function (ev) { if (ev.data && ev.data.size) chunks.push(ev.data); };
      mr.onstop = function () {
        stream.getTracks().forEach(function (t) { t.stop(); });
        var blob = new Blob(chunks, { type: mr.mimeType || "audio/webm" });
        var inp = document.querySelector('[data-we1-label="' + pid + '"]');
        var label = inp && inp.value.trim() ? inp.value.trim() : "Praise note";
        we1Rec = null;
        $$("[data-we1-rec]").forEach(function (b) { b.textContent = "● Record praise"; b.classList.remove("rec"); });
        if (!blob.size) { we1NoteMsg("That recording came out empty — nothing was saved."); return; }
        we1SaveNote(pid, label, blob).then(function () { we1NoteMsg("Saved your note — it will play when a lesson is finished."); we1FillNoteLists(); });
      };
      we1Rec = { mr: mr, pid: pid };
      mr.start();
      if (btn) { btn.textContent = "■ Stop"; btn.classList.add("rec"); }
      we1NoteMsg("Recording… tap Stop when you're done.");
    }).catch(function () { we1NoteMsg("The microphone wasn't allowed, so nothing was recorded."); });
  }
  /* Backup: voice notes ride the backup file exactly like Wave D photos —
     embedded as data URLs with a manifest, restored merged by id. */
  function collectNotesForBackup() {
    return we1NotesAll().then(function (recs) {
      var items = [], bytes = 0, chain = Promise.resolve();
      (recs || []).forEach(function (rec) {
        chain = chain.then(function () {
          var blob = we1NoteBlob(rec);
          if (!blob) return;
          return blobToDataUrl(blob).then(function (url) {
            if (!url) return;
            var item = {};
            Object.keys(rec).forEach(function (k) { if (k !== "blob" && k !== "buf") item[k] = rec[k]; });
            item.type = blob.type || item.type || "audio/webm";
            item.dataUrl = url;
            bytes += url.length;
            items.push(item);
          });
        });
      });
      return chain.then(function () { return { count: items.length, approxBytes: bytes, items: items }; });
    }).catch(function () { return { count: 0, approxBytes: 0, items: [] }; });
  }
  function restoreNotesFromBackup(items) {
    var chain = Promise.resolve();
    (items || []).forEach(function (item) {
      chain = chain.then(function () {
        return fetch(item.dataUrl).then(function (r) { return r.blob(); }).then(function (blob) {
          var rec = {};
          Object.keys(item).forEach(function (k) { if (k !== "dataUrl") rec[k] = item[k]; });
          rec.blob = blob;
          return we1NotePut(rec);
        }).catch(function () {});
      });
    });
    return chain;
  }

  /* ---------- the completion funnel: quests + praise notes ---------- */
  /* recordCompletion is the one funnel every engine's real completion
     signal already flows through (C1). Called from there, once per genuine
     completion (recordCompletion's own 8s guard has already passed). */
  function we1OnLessonComplete(kid, lessonId, title) {
    var got = we1AssignQuest(kid, lessonId, title);
    if (got.fresh && state.profile && state.profile.id === kid) {
      we1RegisterQuestSpot(kid, got.active);
      we1ShowQuestToast(got.active);
    }
    if (we1NotesEnabled()) {
      we1NotesAll().then(function (ns) {
        var mine = ns.filter(function (n) { return n.pid === kid; }).sort(function (a, b) { return (b.ts || 0) - (a.ts || 0); });
        if (!mine.length) return;
        we1PlayNoteBlob(we1NoteBlob(mine[0]), kid, mine[0].label);
      }).catch(function () {});
    }
  }

  /* ---------- clicks + toggle (Wave E1's own attrs) ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-we1-hello],[data-we1-quest],[data-we1-rec],[data-we1-play],[data-we1-del]") : null;
    if (!t) return;
    if (t.hasAttribute("data-we1-hello")) { we1PlayHello(); return; }
    if (t.hasAttribute("data-we1-quest")) {
      var act = t.getAttribute("data-we1-quest");
      if (act === "photo") we1TakeQuestPhoto();
      else if (act === "notnow") we1HideQuestToast();
      else if (act === "notnow-today") {
        var p = state.profile;
        if (p) { var s = we1QuestState(p.id); if (s.active) { s.active.dismissedDay = dayKeyOf(new Date()); we1QuestSave(p.id, s); } }
        var card = document.getElementById("we1-quest"); if (card) card.remove();
      }
      return;
    }
    if (t.hasAttribute("data-we1-rec")) { we1ToggleRecord(t.getAttribute("data-we1-rec"), t); return; }
    if (t.hasAttribute("data-we1-play")) { we1PlayNoteById(t.getAttribute("data-we1-play")); return; }
    if (t.hasAttribute("data-we1-del")) { we1NoteDelete(t.getAttribute("data-we1-del")).then(function () { we1FillNoteLists(); }); return; }
  });
  document.addEventListener("change", function (e) {
    if (e.target && e.target.id === "we1-notes-toggle") {
      var c = we1Store(WE1_NOTES_CFG_KEY, { enabled: 1 });
      c.enabled = e.target.checked ? 1 : 0;
      we1Save(WE1_NOTES_CFG_KEY, c);
    }
  });



  /* ================= Wave E2 (2026-11-15): Oops Garden (23), Car mode (25),
     Monthly growth report (26) =================
     Oops Garden: the four lesson engines report every answer through
     window.__oopsAnswer (one defensive call inside each engine's own answer
     handler — HL player, little rounds engine, generic player, NY engine).
     A wrong answer plants (or re-plants) a seed for that lesson+item; a right
     answer blooms it ONLY in a later session or on a later day, so the win is
     genuinely spaced. Seeds never wilt and nothing is ever taken away.
     Store: hootworld.oops.v1 — rides backups like the other hootworld.*.v1
     stores. Granularity: per question round where the engine exposes rounds
     (HL + little rounds lessons), per guided step / warm-up / teach-back in
     the NY engine, lesson level (one question per card) in the generic
     player, plus its teach-back.
     Car mode: mixes are built ONLY from clips already in the library
     (inventoried 2026-11-15 — nothing new recorded). Playback chains on real
     'ended' events through one governor-serialised Audio element (the Wave
     E1 pattern), so two voices can never overlap. "Get ready for offline"
     writes every mix clip into the service worker's cache and verifies each
     one with cache.match before a mix is called ready.
     Growth report: computed live from hootworld.completions.v1 plus the HL
     results store ("another look" lessons). An empty month says so plainly;
     nothing is ever invented. Prints through the Wave C2 print system. */
  function we2Sess() {
    try {
      var s = sessionStorage.getItem("hootworld.sess.v1");
      if (!s) { s = "s" + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36); sessionStorage.setItem("hootworld.sess.v1", s); }
      return s;
    } catch (e) { return "s-shared"; }
  }
  function we2FmtDate(ts) { try { return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); } catch (e) { return ""; } }

  /* ---------- 23 · Oops Garden ---------- */
  var WE2_OOPS_KEY = "hootworld.oops.v1", WE2_GARDEN_CAP = 24;
  function we2OopsLoad() { try { return JSON.parse(localStorage.getItem(WE2_OOPS_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function we2OopsSave(d) { try { localStorage.setItem(WE2_OOPS_KEY, JSON.stringify(d)); } catch (e) {} }
  function we2OopsMine(pid) { var d = we2OopsLoad(); return (pid && d[pid]) || {}; }
  function we2GardenCounts(pid) { var m = we2OopsMine(pid), s = 0, f = 0; Object.keys(m).forEach(function (k) { if (m[k].state === "flower") f++; else s++; }); return { seeds: s, flowers: f, total: s + f }; }
  function we2ItemLabel(title, item) {
    var t = title || "A lesson";
    if (item === "tib") return t + " — teach it back";
    if (item === "warm") return t + " — warm-up";
    if (item && item.indexOf("try") === 0) return t + " — guided step " + (parseInt(item.slice(3), 10) + 1);
    if (item && item.charAt(0) === "r" && item.length > 1 && !isNaN(parseInt(item.slice(1), 10))) return t + " — question " + (parseInt(item.slice(1), 10) + 1);
    return t;
  }
  function we2BloomCelebrate(rec) {
    try { if (window.__hwSay) window.__hwSay(["hoot-great-job"]); } catch (e) {}
    try {
      var host = document.getElementById("ll-obody") || document.getElementById("ll-overlay"); if (!host) return;
      var old = document.getElementById("we2-bloom-toast"); if (old) old.remove();
      var t = document.createElement("div"); t.id = "we2-bloom-toast"; t.className = "we2-bloom-toast";
      t.innerHTML = "🌸 <b>A flower bloomed in your Oops Garden!</b><br><small>" + esc(rec.label || rec.title || "") + " — you got it right today!</small>";
      host.appendChild(t);
      try { t.scrollIntoView({ behavior: "smooth", block: "nearest" }); } catch (e) {}
      setTimeout(function () { try { t.remove(); } catch (e) {} }, 7000);
    } catch (e) {}
  }
  function we2OopsAnswer(info) {
    if (!info) return;
    var card = info.card || null;
    var pid = info.pid || (state.profile && state.profile.id);
    if (!pid) return;
    var lid = info.lessonId || (card && card.getAttribute ? card.getAttribute("data-lsn-id") : null) || null;
    var title = info.title || "";
    if (!title && card && card.querySelector) { var h4 = card.querySelector("h4"); if (h4) title = h4.textContent.replace(/\s+/g, " ").trim(); }
    if (!lid && title) lid = lessonIdForTitle(title);
    if (!lid && !title) return;
    var item = info.item || "q";
    var key = (lid || ("t:" + title)) + "|" + item;
    var d = we2OopsLoad(); var mine = d[pid] || (d[pid] = {});
    var rec = mine[key]; var now = Date.now(); var day = dayKeyOf(new Date()); var sess = we2Sess();
    if (!info.right) {
      if (!rec) { rec = { lesson: lid || "", title: title, label: we2ItemLabel(title, item), state: "seed", plantedAt: now, plantedDay: day, plantedSess: sess, wrongs: 0, blooms: 0, lastBloom: 0 }; mine[key] = rec; }
      else { rec.state = "seed"; rec.plantedAt = now; rec.plantedDay = day; rec.plantedSess = sess; if (title) rec.title = title; rec.label = we2ItemLabel(title || rec.title, item); }
      rec.wrongs = (rec.wrongs || 0) + 1;
      we2OopsSave(d);
      return;
    }
    if (rec && rec.state === "seed" && (sess !== rec.plantedSess || day !== rec.plantedDay)) {
      rec.state = "flower"; rec.blooms = (rec.blooms || 0) + 1; rec.lastBloom = now;
      we2OopsSave(d);
      we2BloomCelebrate(rec);
    }
  }
  window.__oopsAnswer = we2OopsAnswer;
  function we2GardenHtml() {
    var p = state.profile; if (!p) return "";
    var mine = we2OopsMine(p.id);
    var rows = Object.keys(mine).map(function (k) { return mine[k]; });
    rows.sort(function (a, b) { return Math.max(b.lastBloom || 0, b.plantedAt || 0) - Math.max(a.lastBloom || 0, a.plantedAt || 0); });
    var counts = we2GardenCounts(p.id);
    var h = '<div class="we2-garden"><p class="we2-lead">Every tricky question plants a seed here. Answer it right on another day and it blooms into a flower. Seeds just wait — they never wilt, and nothing here is ever taken away. 🌱</p>';
    if (!rows.length) return h + '<p class="we2-empty">No seeds yet. When a question is tricky, its seed will appear here — that is how learning grows!</p></div>';
    var shown = rows.slice(0, WE2_GARDEN_CAP);
    var flowers = shown.filter(function (r) { return r.state === "flower"; });
    var seeds = shown.filter(function (r) { return r.state !== "flower"; });
    h += '<p class="we2-counts">' + counts.flowers + (counts.flowers === 1 ? " flower" : " flowers") + " bloomed · " + counts.seeds + (counts.seeds === 1 ? " seed" : " seeds") + " waiting</p>";
    if (flowers.length) h += '<h3 class="we2-h">🌸 Bloomed</h3><div class="we2-grid">' + flowers.map(function (r) {
      return '<div class="we2-plot flower"><span aria-hidden="true">🌸</span><b>' + esc(r.label || r.title || "") + '</b><small>Bloomed ' + we2FmtDate(r.lastBloom) + (r.blooms > 1 ? " · bloomed " + r.blooms + " times" : "") + '</small></div>';
    }).join("") + "</div>";
    if (seeds.length) h += '<h3 class="we2-h">🌱 Still growing</h3><div class="we2-grid">' + seeds.map(function (r) {
      return '<div class="we2-plot seed"><span aria-hidden="true">🌱</span><b>' + esc(r.label || r.title || "") + '</b><small>Planted ' + we2FmtDate(r.plantedAt) + " · waiting for another day</small></div>";
    }).join("") + "</div>";
    if (rows.length > shown.length) h += '<p class="we2-more">Showing the ' + shown.length + " most recent — " + (rows.length - shown.length) + " more are kept safe in the garden diary.</p>";
    return h + "</div>";
  }
  function openOopsGarden() { nextView = { kind: "we2garden", title: "Oops Garden" }; openShellOverlay("🌸 Oops Garden", we2GardenHtml()); }

  /* ---------- Today / Play entries ---------- */

  /* ===== Tutor-experience pass (Dawid's picks 1 + 2, 2026-11-15) =====
     Today's 15 minutes: a 3-step study plan on the teen Today tab —
     warm-up/review, one new NY lesson, Second Look — plus the Second
     Look card itself, which resurfaces questions she missed about two
     days later until she answers them right here. Miss capture lives
     in the NY engine (index.html); this module only reads its store. */
  var TUTEXP_SL_KEY = "hootworld.secondlook.v1";
  function tutExpTodayStr() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function tutExpSL() { try { var d = JSON.parse(localStorage.getItem(TUTEXP_SL_KEY) || "{}"); if (!d || !Array.isArray(d.items)) d = { items: [] }; return d; } catch (e) { return { items: [] }; } }
  function tutExpSLDue(it) { var a = Date.parse((it.firstMiss || "") + "T00:00:00"), b = Date.parse(tutExpTodayStr() + "T00:00:00"); return isFinite(a) && isFinite(b) && (b - a) >= 2 * 86400000; }
  var TUTEXP_NY_KEYS = ["Unit rates", "Negative numbers", "Two-step equations", "Main idea", "Argument writing", "Photosynthesis", "Ecosystems", "Constitution", "Percents", "Circles", "Summarizing", "Context clues", "water cycle", "Cells", "American Revolution", "Erie Canal"];
  function tutExpNyData() {
    var pid = state.profile && state.profile.id;
    /* Titles in ENGINE card order (the NY engine's indices — dones,
       dates and Second Look items are all keyed by it). LESSONS.ny is
       grouped for the Learn tab, so map by distinctive substring. */
    var pool = (LESSONS.ny || []).map(function (l) { return l.title; });
    var titles = TUTEXP_NY_KEYS.map(function (k) {
      var hit = pool.filter(function (t) { return t.toLowerCase().indexOf(k.toLowerCase()) > -1; })[0];
      return hit || k;
    });
    /* Prefer the cards' own headings — the single source of truth,
       already in engine order in the DOM. */
    var domTitles = Array.prototype.map.call(document.querySelectorAll("#ny-creator-wrap .ny-lsn .lsn-top h4"), function (h) { return h.textContent.trim(); });
    if (domTitles.length === titles.length) titles = domTitles;
    var dones = []; try { dones = (JSON.parse(localStorage.getItem("hootworld.nylessons.v1") || "{}") || {})[pid] || []; } catch (e) {}
    var dates = {}; try { dates = (JSON.parse(localStorage.getItem("hootworld.nydates.v1") || "{}") || {})[pid] || {}; } catch (e) {}
    return { titles: titles, dones: dones, dates: dates };
  }
  function tutExpPlan() {
    try { var d = JSON.parse(localStorage.getItem("hootworld.plan15.v1") || "null"); if (d && d.date === tutExpTodayStr() && d.checks) return d; } catch (e) {}
    return { date: tutExpTodayStr(), checks: {} };
  }
  function tutExpPlanSave(p) { try { localStorage.setItem("hootworld.plan15.v1", JSON.stringify(p)); } catch (e) {} }
  function tutExpSteps() {
    var ny = tutExpNyData(), sl = tutExpSL();
    var due = sl.items.filter(function (it) { return !it.resolved && tutExpSLDue(it); });
    var resting = sl.items.filter(function (it) { return !it.resolved && !tutExpSLDue(it); }).length;
    var nextIdx = -1, reviewIdx = -1, reviewDate = "";
    ny.titles.forEach(function (t, i) { if (nextIdx < 0 && !ny.dones[i]) nextIdx = i; });
    ny.titles.forEach(function (t, i) { if (ny.dones[i]) { var dt = ny.dates[i] || ""; if (reviewIdx < 0 || dt >= reviewDate) { reviewIdx = i; reviewDate = dt; } } });
    var steps = [];
    if (due.length) steps.push({ label: "Second Look", sub: due.length + (due.length === 1 ? " question" : " questions") + " from earlier lessons — nail them now", act: "scrollsl" });
    else if (reviewIdx >= 0) steps.push({ label: "Warm up — replay", sub: ny.titles[reviewIdx], act: "open", arg: ny.titles[reviewIdx] });
    else if (nextIdx >= 0) steps.push({ label: "Warm up", sub: "The first lesson starts with one built in", act: "open", arg: ny.titles[nextIdx] });
    /* Fix pass 10: the day's new-lesson target is snapshotted in the plan
       store, so completing it checks the step itself instead of silently
       swapping in the next lesson (Dawid: a completed lesson should check
       itself as completed). */
    var plan0 = tutExpPlan();
    if (!plan0.targets) { plan0.targets = { newIdx: nextIdx }; tutExpPlanSave(plan0); }
    var snapNew = plan0.targets.newIdx;
    if (snapNew != null && snapNew >= 0 && ny.dones[snapNew]) steps.push({ label: "New lesson", sub: ny.titles[snapNew], act: "open", arg: ny.titles[snapNew], autoIdx: snapNew, autoDone: true });
    else if (nextIdx >= 0) steps.push({ label: "New lesson", sub: ny.titles[nextIdx], act: "open", arg: ny.titles[nextIdx], autoIdx: nextIdx });
    else steps.push({ label: "New lesson", sub: "All " + ny.titles.length + " NY lessons mastered 🎉", act: "" });
    if (due.length && steps[0].act !== "scrollsl") steps.push({ label: "Second Look", sub: due.length + " waiting below", act: "scrollsl" });
    else if (resting) steps.push({ label: "Second Look", sub: resting + (resting === 1 ? " question" : " questions") + " resting — back in a day or two", act: "scrollsl" });
    else if (!due.length) steps.push({ label: "Finish strong", sub: "Every lesson ends with teach-it-back — that's the finish line", act: "" });
    return steps;
  }
  function tutExpTodayHtml() {
    var steps = tutExpSteps(), plan = tutExpPlan(), ny = tutExpNyData();
    var rows = steps.map(function (st, i) {
      var auto = !!st.autoDone;
      var on = !!plan.checks[i] || auto;
      return '<li class="tutexp-step' + (on ? " done" : "") + '"><button type="button" class="tutexp-chk" data-tutexp-check="' + i + '" aria-pressed="' + on + '">' + (on ? "✓" : "") + "</button>" +
        '<div class="tutexp-main"><b>' + esc(st.label) + "</b><small>" + esc(st.sub) + "</small></div>" +
        (st.act ? '<button type="button" class="ll-btn tutexp-go" data-tutexp-act="' + i + '">Start</button>' : "") + "</li>";
    }).join("");
    return '<section class="tutexp"><h3 class="tc-h">🎓 Today\'s 15 minutes</h3>' +
      '<p class="tutexp-sub">Your tutor built today\'s session: a warm-up, one new lesson, one look back. About 15 minutes, in order.</p>' +
      '<ol class="tutexp-list">' + rows + "</ol>" +
      '<button type="button" class="ll-btn pri tutexp-start" data-tutexp-start>▶ Start my 15 minutes</button></section>' +
      tutExpSLHtml();
  }
  function tutExpSLHtml() {
    var sl = tutExpSL(), ny = tutExpNyData();
    var due = sl.items.filter(function (it) { return !it.resolved && tutExpSLDue(it); });
    var resting = sl.items.filter(function (it) { return !it.resolved && !tutExpSLDue(it); }).length;
    if (!due.length && !resting) return "";
    var blocks = due.map(function (it) {
      var title = ny.titles[it.lesson] || ("NY lesson " + (it.lesson + 1));
      var opts = it.opts.map(function (o, oi) { return '<button type="button" class="tutexp-opt" data-tutexp-opt="' + esc(it.key) + "|" + oi + '">' + esc(o.t) + "</button>"; }).join("");
      return '<div class="tutexp-q" data-tutexp-item="' + esc(it.key) + '"><p class="tutexp-from">From: ' + esc(title) + '</p><p class="tutexp-qq">' + esc(it.q) + '</p><div class="tutexp-opts">' + opts + '</div><p class="tutexp-fb" hidden></p></div>';
    }).join("");
    return '<section class="tutexp" id="tutexp-sl"><h3 class="tc-h">👀 Second Look</h3>' +
      '<p class="tutexp-sub">Questions from a couple of days ago come back until they\'re easy. No timers, no penalties.</p>' + blocks +
      (resting ? '<p class="tutexp-sub">' + resting + (resting === 1 ? " question is" : " questions are") + " resting — they\'ll pop up here in a day or two.</p>" : "") + "</section>";
  }
  function tutExpAct(i) {
    var st = tutExpSteps()[i]; if (!st) return;
    if (st.act === "open" && st.arg) openLesson(st.arg);
    else if (st.act === "scrollsl") { var el = document.getElementById("tutexp-sl"); if (el) el.scrollIntoView({ block: "start" }); }
  }
  document.addEventListener("click", function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var start = t.closest("[data-tutexp-start]");
    if (start) { var steps = tutExpSteps(), plan = tutExpPlan(), ny = tutExpNyData(); for (var i = 0; i < steps.length; i++) { var auto = !!steps[i].autoDone; if (!plan.checks[i] && !auto && steps[i].act) { tutExpAct(i); break; } } return; }
    var go = t.closest("[data-tutexp-act]");
    if (go) { tutExpAct(parseInt(go.getAttribute("data-tutexp-act"), 10)); return; }
    var chk = t.closest("[data-tutexp-check]");
    if (chk) { var p2 = tutExpPlan(), k = chk.getAttribute("data-tutexp-check"); p2.checks[k] = !p2.checks[k]; tutExpPlanSave(p2); var li = chk.closest(".tutexp-step"); if (li) { li.classList.toggle("done", !!p2.checks[k]); chk.textContent = p2.checks[k] ? "✓" : ""; chk.setAttribute("aria-pressed", String(!!p2.checks[k])); } return; }
    var opt = t.closest("[data-tutexp-opt]");
    if (opt) {
      var parts = opt.getAttribute("data-tutexp-opt").split("|"), key = parts.slice(0, -1).join("|"), oi = parseInt(parts[parts.length - 1], 10);
      var d = tutExpSL(), item = null;
      d.items.forEach(function (it) { if (it.key === key) item = it; });
      if (!item || item.resolved) return;
      var block = opt.closest("[data-tutexp-item]"), fb = block ? block.querySelector(".tutexp-fb") : null;
      var chosen = item.opts[oi];
      if (chosen && chosen.right) {
        item.resolved = true; item.resolvedDate = tutExpTodayStr();
        try { localStorage.setItem(TUTEXP_SL_KEY, JSON.stringify(d)); } catch (err) {}
        if (block) { block.classList.add("cleared"); block.querySelectorAll(".tutexp-opt").forEach(function (o) { o.disabled = true; }); opt.classList.add("right"); }
        if (fb) { fb.hidden = false; fb.textContent = "✔️ Nailed it — that one's cleared from your Second Look list."; }
      } else {
        opt.classList.add("wrong"); setTimeout(function () { opt.classList.remove("wrong"); }, 650);
        if (fb) { fb.hidden = false; fb.textContent = "Not yet — " + (item.fix || "have another look at the lesson and try again.") + " It stays on the list until it clicks."; }
      }
    }
  });

  function we2TodayHtml() {
    if (!state.profile) return "";
    var c = we2GardenCounts(state.profile.id);
    return '<section class="ll-card we2-today"><h2 class="todoh">🌸 Garden &amp; car</h2>' +
      '<button type="button" class="wc2-entrybtn" data-we2-garden="1"><span class="wc2-eemo" aria-hidden="true">🌸</span><span class="wc2-etxt"><b>Oops Garden</b><span class="wc2-esub">' + (c.total ? (c.flowers + (c.flowers === 1 ? " flower" : " flowers") + " bloomed · " + c.seeds + (c.seeds === 1 ? " seed" : " seeds") + " waiting") : "See your seeds and flowers") + '</span></span><span class="wc2-echev" aria-hidden="true">›</span></button>' +
      '<button type="button" class="wc2-entrybtn" data-we2-car="1"><span class="wc2-eemo" aria-hidden="true">🚗</span><span class="wc2-etxt"><b>Car mode</b><span class="wc2-esub">Big-button listening for drives — set it up before you go</span></span><span class="wc2-echev" aria-hidden="true">›</span></button></section>';
  }
  function we2CarEntryHtml() {
    if (isTeenBand(curBand())) return ""; /* Fix pass 5: car-mode mixes are little-kid clips — not on the teen side */
    return '<section class="ll-card we2-games"><button type="button" class="wc2-entrybtn" data-we2-car="1"><span class="wc2-eemo" aria-hidden="true">🚗</span><span class="wc2-etxt"><b>Car mode</b><span class="wc2-esub">Listening mixes for drives — set it up before you go</span></span><span class="wc2-echev" aria-hidden="true">›</span></button></section>';
  }

  /* ---------- 25 · Car mode ---------- */
  var WE2_MIXES = [
    { id: "letters", emo: "🔤", title: "Letters & sounds", clips: ["step-early-letter-sounds-1", "step-early-letter-sounds-2", "step-early-letter-sounds-3", "step-early-letter-sounds-4", "coach/phonics-a", "coach/phonics-b", "coach/phonics-c", "coach/phonics-d", "coach/phonics-e", "coach/phonics-f", "coach/phonics-g", "coach/phonics-h", "coach/phonics-i", "coach/phonics-j", "coach/phonics-k", "coach/phonics-l", "coach/phonics-m", "coach/phonics-n", "coach/phonics-o", "coach/phonics-p", "coach/phonics-q", "coach/phonics-r", "coach/phonics-s", "coach/phonics-t", "coach/phonics-u", "coach/phonics-v", "coach/phonics-w", "coach/phonics-x", "coach/phonics-y", "coach/phonics-z"] },
    { id: "numbers", emo: "🔢", title: "Numbers", clips: ["step-little-counting-to-5-1", "step-little-counting-to-5-3", "step-little-counting-to-5-4", "step-early-counting-on-to-add-1", "step-early-counting-on-to-add-2", "step-early-counting-on-to-add-3", "step-early-counting-on-to-add-4", "name-number-1", "name-number-2", "name-number-3", "name-number-4", "name-number-5", "name-number-6", "name-number-7", "name-number-8", "name-number-9", "name-number-10", "song-counting"] },
    { id: "stories", emo: "📖", title: "Stories & songs", clips: ["story-intro", "story-a", "song-abc", "story-b", "song-hoot-party", "story-c", "song-goodbye"] },
    { id: "calm", emo: "🌙", title: "Calm down", clips: ["story-intro", "story-d", "story-e", "owl-sleepy", "song-goodbye"] }
  ];
  function we2MixById(id) { for (var i = 0; i < WE2_MIXES.length; i++) if (WE2_MIXES[i].id === id) return WE2_MIXES[i]; return null; }
  function we2ClipUrl(c) { return new URL("assets/voice/" + c + ".mp3", document.baseURI).href; }
  var we2Wake = null;
  function we2GrabWake() { try { if (navigator.wakeLock && navigator.wakeLock.request) { var p = navigator.wakeLock.request("screen"); if (p && p.then) p.then(function (w) { we2Wake = w; }, function () {}); } } catch (e) {} }
  function we2DropWake() { try { if (we2Wake && we2Wake.release) we2Wake.release(); } catch (e) {} we2Wake = null; }
  var we2Car = { audio: null, mixId: null, idx: 0, playing: false, timer: 0 };
  function we2CarUi() {
    var now = document.getElementById("we2-car-now"), cnt = document.getElementById("we2-car-count"), tg = document.getElementById("we2-car-toggle");
    if (!now) return;
    var mix = we2MixById(we2Car.mixId);
    if (!mix) { now.textContent = "Pick a mix below 👇"; if (cnt) cnt.textContent = ""; if (tg) tg.textContent = "▶"; return; }
    now.textContent = mix.emo + " " + mix.title;
    if (cnt) cnt.textContent = (we2Car.playing || we2Car.audio) ? ("Clip " + (we2Car.idx + 1) + " of " + mix.clips.length) : "";
    if (tg) tg.textContent = we2Car.playing ? "⏸" : "▶";
    $$(".we2-mix").forEach(function (row) { row.classList.toggle("on", row.getAttribute("data-we2-mixrow") === we2Car.mixId); });
  }
  function we2CarStopAudio() {
    if (we2Car.audio) { try { we2Car.audio.onended = null; we2Car.audio.onerror = null; we2Car.audio.pause(); we2Car.audio.removeAttribute("src"); we2Car.audio.load(); } catch (e) {} we2Car.audio = null; }
  }
  function we2CarFullStop() {
    if (we2Car.timer) { clearInterval(we2Car.timer); we2Car.timer = 0; }
    we2CarStopAudio(); we2Car.playing = false; we2DropWake();
  }
  function we2CarPlayAt(mixId, idx) {
    var mix = we2MixById(mixId); if (!mix || !mix.clips.length) return;
    we2CarStopAudio();
    we2Car.mixId = mixId; we2Car.idx = Math.max(0, Math.min(idx || 0, mix.clips.length - 1)); we2Car.playing = true;
    var a = new Audio(); a.preload = "auto"; a.__govVoice = true;
    a.src = "assets/voice/" + mix.clips[we2Car.idx] + ".mp3";
    a.onended = function () { we2CarAdvance(1); };
    a.onerror = function () { we2CarAdvance(1); };
    we2Car.audio = a;
    try { var pr = a.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {}
    we2GrabWake();
    if (!we2Car.timer) we2Car.timer = setInterval(we2CarWatch, 1000);
    we2CarUi();
  }
  function we2CarAdvance(d) {
    var mix = we2MixById(we2Car.mixId); if (!mix) return;
    var n = we2Car.idx + d;
    if (n < 0) n = 0;
    if (n >= mix.clips.length) {
      we2CarStopAudio(); we2Car.playing = false; we2Car.idx = 0; we2DropWake();
      var now = document.getElementById("we2-car-now"); if (now) now.textContent = "🏁 " + mix.title + " finished — tap ▶ to hear it again";
      var cnt = document.getElementById("we2-car-count"); if (cnt) cnt.textContent = "";
      var tg = document.getElementById("we2-car-toggle"); if (tg) tg.textContent = "▶";
      $$(".we2-mix").forEach(function (row) { row.classList.remove("on"); });
      return;
    }
    we2CarPlayAt(we2Car.mixId, n);
  }
  function we2CarToggle() {
    if (!we2Car.mixId) { if (WE2_MIXES.length) we2CarPlayAt(WE2_MIXES[0].id, 0); return; }
    if (we2Car.playing) { we2Car.playing = false; if (we2Car.audio) { try { we2Car.audio.pause(); } catch (e) {} } we2DropWake(); we2CarUi(); return; }
    if (we2Car.audio && !we2Car.audio.ended) { we2Car.playing = true; try { var pr = we2Car.audio.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {} we2GrabWake(); we2CarUi(); return; }
    we2CarPlayAt(we2Car.mixId, we2Car.idx);
  }
  function we2CarWatch() {
    if (!document.getElementById("we2-car")) { we2CarFullStop(); return; }
    var a = we2Car.audio;
    if (we2Car.playing && a && a.ended) we2CarAdvance(1);
    else if (we2Car.playing && a && a.paused && a.readyState >= 2) { try { var pr = a.play(); if (pr && pr.catch) pr.catch(function () {}); } catch (e) {} }
  }
  function we2CacheName() {
    if (!("caches" in window)) return Promise.resolve("hw-hootv2-waveE2");
    return caches.keys().then(function (ks) {
      var m = ks.filter(function (k) { return k.indexOf("hw-hootv2") === 0; });
      if (m.indexOf("hw-hootv2-waveE2") >= 0) return "hw-hootv2-waveE2";
      return m.length ? m[m.length - 1] : "hw-hootv2-waveE2";
    }).catch(function () { return "hw-hootv2-waveE2"; });
  }
  function we2MixReady(mix) {
    if (!("caches" in window)) return Promise.resolve(false);
    return we2CacheName().then(function (n) { return caches.open(n); }).then(function (cache) {
      return Promise.all(mix.clips.map(function (c) { return cache.match(we2ClipUrl(c)); })).then(function (rs) { return rs.every(function (r) { return !!r; }); });
    }).catch(function () { return false; });
  }
  function we2CarRefreshReady() {
    WE2_MIXES.forEach(function (mix) {
      var el = document.querySelector('[data-we2-ready="' + mix.id + '"]'); if (!el) return;
      we2MixReady(mix).then(function (ok) { el.textContent = ok ? "✓ Ready offline" : "Not downloaded yet"; el.classList.toggle("ok", ok); });
    });
  }
  function we2CarPrepare(btn) {
    var stat = document.getElementById("we2-prepstat");
    if (!("caches" in window)) { if (stat) stat.textContent = "This browser cannot save clips for offline."; return; }
    var seen = {}, urls = [];
    WE2_MIXES.forEach(function (m) { m.clips.forEach(function (c) { if (!seen[c]) { seen[c] = 1; urls.push(c); } }); });
    if (btn) { btn.disabled = true; btn.textContent = "Saving…"; }
    we2CacheName().then(function (n) { return caches.open(n); }).then(function (cache) {
      var done = 0, fails = 0;
      var chain = Promise.resolve();
      urls.forEach(function (c) {
        chain = chain.then(function () {
          return cache.match(we2ClipUrl(c)).then(function (hit) {
            if (hit) { done++; return null; }
            return cache.add(we2ClipUrl(c)).then(function () { done++; }, function () { fails++; });
          }).then(function () { if (stat) stat.textContent = "Saving clips for the car… " + (done + fails) + " of " + urls.length; });
        });
      });
      return chain.then(function () { return { done: done, fails: fails }; });
    }).then(function (r) {
      if (btn) { btn.disabled = false; btn.textContent = "⬇ Get ready for offline — download every mix"; }
      if (stat) stat.textContent = r.fails ? ("Saved " + r.done + " clips, but " + r.fails + " could not be saved — check the connection and try again.") : "✓ All mixes are ready offline — they will play with no signal.";
      we2CarRefreshReady();
    }).catch(function () {
      if (btn) { btn.disabled = false; btn.textContent = "⬇ Get ready for offline — download every mix"; }
      if (stat) stat.textContent = "Offline saving did not work here — the mixes will still play when you have signal.";
    });
  }
  function we2CarHtml() {
    var rows = WE2_MIXES.map(function (m) {
      return '<div class="we2-mix" data-we2-mixrow="' + m.id + '"><button type="button" class="we2-mix-play" data-we2-mix="' + m.id + '">' + m.emo + " <b>" + esc(m.title) + '</b><span>' + m.clips.length + ' clips</span></button><span class="we2-ready" data-we2-ready="' + m.id + '">Checking offline…</span></div>';
    }).join("");
    return '<div class="we2-car" id="we2-car">' +
      '<p class="we2-car-note">Set it up before you drive — then just listen. Hoot reads, teaches and sings; nobody needs to look at the screen on the road. 🚗</p>' +
      '<div class="we2-player"><div class="we2-now" id="we2-car-now">Pick a mix below 👇</div><div class="we2-count" id="we2-car-count"></div>' +
      '<div class="we2-btns"><button type="button" class="we2-big" data-we2-carctl="prev" aria-label="Back a clip">⏮</button>' +
      '<button type="button" class="we2-big main" data-we2-carctl="toggle" id="we2-car-toggle" aria-label="Play or pause">▶</button>' +
      '<button type="button" class="we2-big" data-we2-carctl="next" aria-label="Next clip">⏭</button></div></div>' +
      '<div class="we2-mixes">' + rows + '</div>' +
      '<button type="button" class="ll-btn pri we2-prep" data-we2-prep="1">⬇ Get ready for offline — download every mix</button>' +
      '<p class="we2-prepstat" id="we2-prepstat" role="status"></p></div>';
  }
  function openCarMode() { nextView = { kind: "we2car", title: "Car mode" }; openShellOverlay("🚗 Car mode", we2CarHtml()); we2CarRefreshReady(); we2CarUi(); }

  /* ---------- 26 · Monthly growth report ---------- */
  var WE2_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function we2YmOf(ts) { var d = new Date(ts); return d.getFullYear() + "-" + pad2(d.getMonth() + 1); }
  function we2YmLabel(ym) { var p = String(ym).split("-"); return (WE2_MONTHS[parseInt(p[1], 10) - 1] || "") + " " + p[0]; }
  function we2MonthsAvailable() {
    var set = {}, d = compLoad();
    Object.keys(d).forEach(function (pid) { Object.keys(d[pid] || {}).forEach(function (k) { var r = d[pid][k]; if (r && r.first) set[we2YmOf(r.first)] = 1; if (r && r.last) set[we2YmOf(r.last)] = 1; }); });
    set[we2YmOf(Date.now())] = 1;
    return Object.keys(set).sort().reverse().slice(0, 12);
  }
  function we2ReportData(pid, ym) {
    var p = String(ym).split("-"), y = parseInt(p[0], 10), m = parseInt(p[1], 10) - 1;
    var start = new Date(y, m, 1).getTime(), end = new Date(y, m + 1, 1).getTime();
    var d = compLoad(), mine = d[pid] || {};
    var mastered = [], revisited = [];
    Object.keys(mine).forEach(function (k) { var r = mine[k]; if (!r || !r.n) return;
      if (r.first >= start && r.first < end) mastered.push(r);
      else if (r.first < start && r.last >= start && r.last < end) revisited.push(r);
    });
    mastered.sort(function (a, b) { return a.first - b.first; });
    revisited.sort(function (a, b) { return b.last - a.last; });
    var working = [];
    try {
      var hl = JSON.parse(localStorage.getItem("hootworld.hl.v1") || "{}") || {};
      var titles = {}; ["letters", "basics", "world"].forEach(function (pp) { hlLessons(pp).forEach(function (l) { titles[l.id] = l.title; }); });
      var res = hl[pid] || {};
      Object.keys(res).forEach(function (id) { var r = res[id];
        if (r && r.struggle && r.last >= start && r.last < end) {
          var t = titles[id] || (mine[id] && mine[id].title) || id;
          var dup = mastered.some(function (x) { return x.title === t; }) || revisited.some(function (x) { return x.title === t; });
          if (!dup) working.push({ title: t, last: r.last });
        } });
    } catch (e) {}
    working.sort(function (a, b) { return b.last - a.last; });
    var next = [];
    try { wcPool(pid).forEach(function (l) { if (next.length >= 5) return; if (!lessonDone(l.title) && !(l.id && mine[l.id])) next.push(l.title); }); } catch (e) {}
    return { mastered: mastered, revisited: revisited, working: working, next: next, empty: !mastered.length && !revisited.length && !working.length };
  }
  function we2ReportCardHtml(pid, ym) {
    var prof = null; PROFILES.forEach(function (x) { if (x.id === pid) prof = x; }); if (!prof) return "";
    var data = we2ReportData(pid, ym);
    var h = '<div class="we2-pcard"><div class="we2-phead"><span class="we2-pemo">' + prof.emoji + '</span><div><h1>' + esc(prof.label) + " — " + we2YmLabel(ym) + '</h1><p class="we2-pkind">Hoot\'s World growth report · ' + esc(bandLabel(bandOf(pid))) + "</p></div></div>";
    if (data.empty) {
      h += '<p class="we2-pnone">No lessons were finished or practised again in ' + we2YmLabel(ym) + " in Hoot's diary yet — nothing is made up here; this report fills in as " + esc(prof.label) + " plays and learns.</p>";
    } else {
      if (data.mastered.length) h += "<h2>⭐ Mastered this month</h2><ul>" + data.mastered.map(function (r) { return "<li><b>" + esc(r.title) + "</b> — finished " + r.n + (r.n === 1 ? " time" : " times") + ", first on " + we2FmtDate(r.first) + "</li>"; }).join("") + "</ul>";
      var work = data.revisited.map(function (r) { return { title: r.title, note: "first finished " + we2FmtDate(r.first) + ", practised again " + we2FmtDate(r.last) }; })
        .concat(data.working.map(function (r) { return { title: r.title, note: "Hoot is giving this one another look — practised " + we2FmtDate(r.last) }; }));
      if (work.length) h += "<h2>🌱 Working on</h2><ul>" + work.map(function (w) { return "<li><b>" + esc(w.title) + "</b> — " + esc(w.note) + "</li>"; }).join("") + "</ul>";
    }
    if (data.next.length) h += "<h2>➡️ Next up on the path</h2><ul>" + data.next.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
    return h + '<p class="we2-pfoot">Made with Hoot\'s World 🦉</p></div>';
  }
  function we2ReportHtml() {
    var months = we2MonthsAvailable();
    var cur = we2YmOf(Date.now());
    var kidOpts = PROFILES.map(function (p) { return '<option value="' + p.id + '"' + (state.profile && p.id === state.profile.id ? " selected" : "") + ">" + esc(p.label) + "</option>"; }).join("");
    var monthOpts = months.map(function (ym) { return '<option value="' + ym + '"' + (ym === cur ? " selected" : "") + ">" + we2YmLabel(ym) + "</option>"; }).join("");
    var pid = state.profile ? state.profile.id : PROFILES[0].id;
    return '<section class="ll-card we2-report" id="we2-report"><h2 style="margin:0 0 6px">📈 Monthly growth report</h2>' +
      '<p class="hoot-line" style="margin:0 0 10px">One printable page per child, written from Hoot\'s own diary of finished lessons — print it or save it as a PDF for grandparents.</p>' +
      '<div class="we2-reportrow"><label>Child <select id="we2-report-kid">' + kidOpts + '</select></label><label>Month <select id="we2-report-month">' + monthOpts + '</select></label>' +
      '<button type="button" class="ll-btn pri" data-we2-report="print">🖨 Print report</button></div>' +
      '<div id="we2-report-preview">' + we2ReportCardHtml(pid, cur) + "</div></section>";
  }
  function we2ReportSelection() {
    var k = document.getElementById("we2-report-kid"), m = document.getElementById("we2-report-month");
    return { pid: k ? k.value : (state.profile ? state.profile.id : "kida"), ym: m ? m.value : we2YmOf(Date.now()) };
  }
  function we2ReportRefresh() { var pv = document.getElementById("we2-report-preview"); if (!pv) return; var s = we2ReportSelection(); pv.innerHTML = we2ReportCardHtml(s.pid, s.ym); }
  function we2ReportPrint() { var s = we2ReportSelection(); wc2DoPrint(we2ReportCardHtml(s.pid, s.ym)); }

  /* ---------- Delegated controls ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-we2-garden],[data-we2-car],[data-we2-mix],[data-we2-carctl],[data-we2-prep],[data-we2-report]") : null;
    if (!t) return;
    if (t.hasAttribute("data-we2-garden")) { openOopsGarden(); return; }
    if (t.hasAttribute("data-we2-car")) { openCarMode(); return; }
    if (t.hasAttribute("data-we2-mix")) { we2CarPlayAt(t.getAttribute("data-we2-mix"), 0); return; }
    if (t.hasAttribute("data-we2-carctl")) { var c = t.getAttribute("data-we2-carctl"); if (c === "toggle") we2CarToggle(); else we2CarAdvance(c === "next" ? 1 : -1); return; }
    if (t.hasAttribute("data-we2-prep")) { we2CarPrepare(t); return; }
    if (t.hasAttribute("data-we2-report")) { we2ReportPrint(); return; }
  });
  document.addEventListener("change", function (e) {
    if (e.target && (e.target.id === "we2-report-kid" || e.target.id === "we2-report-month")) we2ReportRefresh();
  });


  /* ---------- Book library (fix pass 10, Dawid's ask 2026-11-15) ----------
     A real library for every child: two bookcases — Our Storybooks (the
     app's originals) and Classic Books (public-domain classics with their
     real authors and covers) — plus a "Books We Read at Home" shelf where
     the family logs hard-copy books and the app finds the real cover
     (Open Library). Tapping a book pulls it out of the case: it floats,
     sparkles, the cover swings open to a title page, then pages turn like
     a real book. Little-kid books carry an illustration on every page and
     Hoot reads them aloud (pre-recorded clips); Kaitlyn's books are clean
     text pages with a cover, no illustrations inside (her level).
     Stores: hootworld.library.v1 {pid:{bookId:date}} (finished),
             hootworld.libprog.v1 {pid:{bookId:page}} (where you stopped),
             hootworld.homelib.v1 {pid:[{id,title,author,cover,date}]}. */
  var LIB_BOOKS = [{"author": "Mabel Finch", "band": "little", "color": "#7CB342", "cover": null, "emo": "🌱", "find": [{"ask": "Can you find the seed?", "label": "the seed", "p": 1, "x": 386, "y": 837}, {"ask": "Can you find the tiny green sprout?", "label": "the tiny green sprout", "p": 4, "x": 768, "y": 690}, {"ask": "Can you find the butterfly?", "label": "the butterfly", "p": 9, "x": 719, "y": 282}, {"ask": "Can you find the bee?", "label": "the bee", "p": 10, "x": 760, "y": 476}, {"ask": "Can you find the big red tomato?", "label": "the big red tomato", "p": 12, "x": 795, "y": 318}], "id": "lib-pip-garden", "pages": ["Pip was a very small mouse. One day, Pip found a very small seed.", "Pip dug a tiny hole in the soft dirt. Plop! In went the seed.", "Pip gave the seed a drink of water. Then Pip waited... and waited.", "One sunny morning, Pip saw a tiny green sprout. Hello, little sprout!", "Every morning, Pip ran to the garden. The sprout was a little bit taller.", "Pip gave the sprout a drink of water. Sip, sip, sip went the sprout.", "Two green leaves opened wide. They waved hello to the warm, sunny sun.", "A soft rain came. Pitter, patter! The sprout danced in the rain.", "A butterfly fluttered by. It landed on a leaf and said hello.", "Soon a tiny yellow flower opened. A bee buzzed by to visit.", "Under the flower, Pip saw something round and green. A baby tomato was growing!", "The sprout grew and grew into a big, red tomato. Pip smiled. Yummy!"], "shelf": "ours", "title": "Pip and the Tiny Garden"}, {"author": "Theo Marchetti", "band": "little", "color": "#5C6BC0", "cover": null, "emo": "🚂", "find": [{"ask": "Can you find the moon?", "label": "the moon", "p": 1, "x": 482, "y": 152}, {"ask": "Can you find Bunny?", "label": "Bunny", "p": 2, "x": 706, "y": 612}, {"ask": "Can you find Little Owl?", "label": "Little Owl", "p": 4, "x": 803, "y": 282}, {"ask": "Can you find the twinkling stars?", "label": "the twinkling stars", "p": 5, "r": 200, "x": 565, "y": 355}, {"ask": "Can you find the bridge?", "label": "the bridge", "p": 9, "x": 524, "y": 697}], "id": "lib-moon-train", "pages": ["The moon came up, and the little train woke up. Choo, choo! Time to go home.", "First stop! Bunny hopped on board. The train went clickety-clack under the moon.", "Next stop! Fox climbed on board, sleepy and slow. Choo, choo, clickety-clack.", "Last stop! Little Owl fluttered down and found a cozy seat. Everyone was on the train.", "The train chugged past the twinkling stars. Clickety-clack, clickety-clack, sang the wheels.", "Bunny's long ears flopped in the soft night wind. Bunny wiggled his nose.", "Fox yawned a big, sleepy yawn. His tail curled around him like a blanket.", "Little Owl looked out the window. The moon followed the train all the way.", "The train crossed a bridge over the quiet river. Splish, splash went the water below.", "Up the hill went the train. Choo, choo! Down the hill it rolled, slow and gentle.", "Now the houses were close. Everyone sat up. Almost home, almost home.", "The train rolled home through the quiet night. Good night, Bunny. Good night, Fox. Good night, Owl."], "shelf": "ours", "title": "The Moon Train"}, {"author": "June Okafor", "band": "little", "color": "#26A6C9", "cover": null, "emo": "☂️", "find": [{"ask": "Can you find the big red umbrella?", "label": "the big red umbrella", "p": 1, "x": 386, "y": 342}, {"ask": "Can you find Duck?", "label": "Duck", "p": 3, "x": 684, "y": 695}, {"ask": "Can you find Frog?", "label": "Frog", "p": 4, "x": 605, "y": 660}, {"ask": "Can you find the big puddle?", "label": "the big puddle", "p": 6, "x": 505, "y": 825}, {"ask": "Can you find the sun?", "label": "the sun", "p": 12, "x": 735, "y": 158}], "id": "lib-bruno-rain", "pages": ["Bruno the bear had a big, red umbrella. One morning, the rain began to fall. Pit, pat, pit, pat.", "Bruno opened his umbrella and walked down the path. Pit, pat, pit, pat.", "A little duck was getting wet. \"Come under my umbrella,\" said Bruno. Now they were dry together.", "A small frog was getting wet, too. \"Come under my umbrella,\" said Bruno. Hop! Now there were three.", "They walked together under the big, red umbrella. Pit, pat, pit, pat sang the rain.", "A big puddle sat on the path. Splash! Bruno helped Duck hop over it.", "Frog hopped beside them. Plip, plop! His feet danced in the little puddles.", "Whoosh! A wind tried to blow the umbrella away. Bruno held on tight. Everyone was safe.", "\"Sing with me,\" said Bruno. They sang a rainy song together. La, la, la!", "Duck shook her wet feathers. One, two, three! Little raindrops flew everywhere. Everyone laughed.", "Soon the rain grew soft and slow. Pit... pat... The friends walked on, cozy and dry.", "The rain stopped, and the sun came out. \"Thank you, Bruno!\" said Duck and Frog. Sharing is warm and dry."], "shelf": "ours", "title": "Bruno the Bear Shares His Umbrella"}, {"author": "Wren Halloway", "band": "little", "color": "#7E57C2", "cover": null, "emo": "⭐", "find": [{"ask": "Can you find Mama?", "label": "Mama", "p": 1, "x": 473, "y": 551}, {"ask": "Can you find the bright star?", "label": "the bright star", "p": 2, "x": 792, "y": 103}, {"ask": "Can you find the shooting star?", "label": "the shooting star", "p": 9, "x": 695, "y": 156}, {"ask": "Can you find the moon?", "label": "the moon", "p": 10, "x": 711, "y": 152}, {"ask": "Can you find Nina?", "label": "Nina", "p": 12, "x": 332, "y": 572}], "id": "lib-nina-star", "pages": ["Nina was a little owl. At bedtime, she sat with Mama under the big, dark sky.", "\"Look, Nina,\" said Mama. \"One star!\" One twinkly star, shining bright.", "Then two stars twinkled. One, two! Nina counted with Mama.", "Three stars, four stars, five stars! One, two, three, four, five. So many stars!", "Then six stars twinkled in the sky. Six little lights, shining just for Nina.", "Seven stars! One, two, three, four, five, six, seven. Nina counted every one.", "Eight stars, nine stars! They twinkled and winked at Nina and Mama.", "Ten stars! One, two, three... all the way to ten. Nina clapped her wings softly.", "Whoosh! A shooting star flew across the sky. \"Make a wish,\" whispered Mama.", "The moon came up, round and soft. Now the sky was full of stars.", "Nina counted in a tiny whisper. Her eyes felt heavy. Counting stars was sleepy work.", "Nina yawned a big, sleepy yawn. \"Good night, stars,\" she said. Mama tucked her in tight."], "shelf": "ours", "title": "Nina Counts the Stars"}, {"author": "Mabel Finch", "band": "little", "color": "#F6C445", "cover": null, "emo": "🦆", "find": [{"ask": "Can you find the sun?", "label": "the sun", "p": 3, "x": 372, "y": 133}, {"ask": "Can you find the big shiny puddle?", "label": "the big shiny puddle", "p": 4, "x": 520, "y": 710}, {"ask": "Can you find the green leaf?", "label": "the green leaf", "p": 7, "x": 654, "y": 757}, {"ask": "Can you find the fluffy clouds?", "label": "the fluffy clouds", "p": 11, "r": 200, "x": 540, "y": 320}, {"ask": "Can you find Daisy?", "label": "Daisy", "p": 12, "x": 550, "y": 472}], "id": "lib-duck-puddle", "pages": ["Daisy Duck wakes up. Drip, drop! It is raining.", "Rain, rain, rain. Daisy splashes in the wet grass.", "Then the rain stops. The sun peeks out. Hello, sun!", "Look! A big, shiny puddle. It is just right for Daisy.", "Daisy steps in slowly. One foot, then two feet. Ooh! The water tickles her toes.", "Round and round she paddles, making a little circle. The puddle hugs Daisy like a tiny pond.", "A green leaf floats by. Daisy pushes it gently. Sail away, little leaf boat!", "Plink! One last raindrop falls. Rings grow bigger and bigger on the shiny water.", "Daisy flaps her wings. Splash, splash! Tiny drops sparkle and shine in the warm sun.", "Kick, kick, kick! Daisy's feet make little waves. The waves rock the leaf boat, up and down.", "Daisy floats on her back and looks up. Fluffy clouds smile down at her.", "Splash, splash, splash! Daisy swims and giggles. What a happy puddle day!"], "shelf": "ours", "title": "Daisy Duck's Big Puddle"}, {"author": "Pablo Reyes", "band": "little", "color": "#4FA8E0", "cover": null, "emo": "🪁", "find": [{"ask": "Can you find the red kite?", "label": "the red kite", "p": 1, "x": 619, "y": 195}, {"ask": "Can you find the flowers?", "label": "the flowers", "p": 6, "r": 200, "x": 539, "y": 946}, {"ask": "Can you find the little stream?", "label": "the little stream", "p": 7, "x": 500, "y": 830}, {"ask": "Can you find the big tree?", "label": "the big tree", "p": 8, "x": 671, "y": 485}, {"ask": "Can you find Biscuit?", "label": "Biscuit", "p": 9, "x": 365, "y": 738}], "id": "lib-tito-kite", "pages": ["Tito holds his red kite. His dog, Biscuit, wags his tail.", "Whoosh! The wind blows. Up, up goes the kite!", "Oh no! The string slips. The kite flies away!", "Run, Tito, run! Run, Biscuit, run! They chase the kite up the hill.", "Up, up the hill they run. The tall grass tickles Tito's legs as he runs.", "The kite dances over the flowers. It dips and swirls, high above the hill.", "A little stream sparkles below. Hop! Tito jumps over. Hop! Biscuit jumps too.", "The kite swirls around the big tree. Round and round, its long tail twirls.", "Biscuit barks up at the kite. Woof, woof! The kite dips down, down, down.", "Now the wind grows soft and slow. The kite floats down like a sleepy butterfly.", "Tiptoe, tiptoe, Tito comes closer. The string dangles down, right above his hands.", "Got it! Tito holds the kite tight. Now they fly it together. Hooray!"], "shelf": "ours", "title": "Tito and the Runaway Kite"}, {"author": "June Okafor", "band": "little", "color": "#E8823A", "cover": null, "emo": "🍲", "find": [{"ask": "Can you find the chef hat?", "label": "the chef hat", "p": 1, "x": 421, "y": 247}, {"ask": "Can you find the carrots?", "label": "the carrots", "p": 2, "x": 788, "y": 674}, {"ask": "Can you find the pot?", "label": "the pot", "p": 6, "x": 353, "y": 773}, {"ask": "Can you find the spoon?", "label": "the spoon", "p": 9, "x": 401, "y": 876}, {"ask": "Can you find the basket of bread?", "label": "the basket of bread", "p": 10, "x": 393, "y": 721}], "id": "lib-milo-soup", "pages": ["Milo puts on his chef hat. Today, Milo makes soup!", "In go the carrots. Chop, chop, plop!", "In go the potatoes and the corn. Plop, plop, plop!", "In go the green beans. Stir, stir, stir. The soup smells yummy.", "In go the little peas. Plop, plop, plop! They roll round and round.", "The soup begins to bubble. Pop, pop, pop! Little bubbles dance in the pot.", "Steam curls up, up, up. Milo sniffs the warm air. Mmm, so yummy!", "Milo blows on a spoonful to cool it. Sip! He smiles. Just right!", "Now Milo sets the table. A bowl and a spoon for everyone he loves.", "He puts warm bread in a basket. Bread and soup are yummy together.", "Milo calls out, nice and loud. Soup is ready! Come and eat, everyone!", "Milo serves the soup. His family takes a bite. Yum, yum! Thank you, Chef Milo!"], "shelf": "ours", "title": "Milo Makes Soup"}, {"author": "Sam Whitaker", "band": "little", "color": "#D95D5D", "cover": null, "emo": "🗼", "find": [{"ask": "Can you find Lulu?", "label": "Lulu", "p": 1, "x": 423, "y": 533}, {"ask": "Can you find the big lamp?", "label": "the big lamp", "p": 3, "x": 548, "y": 285}, {"ask": "Can you find the big boat?", "label": "the big boat", "p": 6, "x": 775, "y": 685}, {"ask": "Can you find the little boat?", "label": "the little boat", "p": 7, "x": 792, "y": 879}, {"ask": "Can you find the big rocks?", "label": "the big rocks", "p": 8, "r": 200, "x": 719, "y": 619}], "id": "lib-lulu-lighthouse", "pages": ["Lulu climbs the tall lighthouse. Up, up, up she goes.", "The sky gets dark. The sea gets dark too.", "Lulu turns on the big lamp. Shine, lamp, shine!", "The boats see the light. The light shows them the way home.", "Round and round, the bright light turns. It sweeps over the dark, wavy sea.", "The big boat follows the light. Slow and steady, it sails through the waves.", "A little boat follows close behind. It stays safe in the bright light.", "The light shines on the big, dark rocks. The boats sail safely around them.", "The waves grow soft and small now. The boats are getting closer to home.", "Look! The harbor lights are twinkling. The boats can see their way home.", "Lulu waves from the top of the lighthouse. Almost home now, boats. Almost home.", "Safe and sound, the boats are home. Good night, boats. Good night, Lulu."], "shelf": "ours", "title": "Lulu the Lighthouse Keeper"}, {"author": "Wren Halloway", "band": "teen", "color": "#D97706", "cover": null, "emo": "📡", "id": "lib-signal-hill", "narrate": true, "pages": ["Maya spotted it first. From her bedroom window, past the dark line of the pines, the old fire tower on Miller's Hill blinked twice, paused, then blinked three times more. The tower had been empty for thirty years. Everybody in town said so. 'Ben,' she whispered, knocking on her brother's door at ten o'clock at night, 'somebody is up there. And whoever it is, they're not just shining a flashlight. That light is talking.' Ben rubbed his eyes. Then the tower blinked again: two short, one long. He stopped rubbing.", "The next morning, Maya spread a notebook on the kitchen table and drew columns. 'If it's a code, it repeats,' she said. 'Codes always repeat. That's the whole point of a code.' Ben, still in his pajamas, pointed at her notes from the night before. 'Two short, one long. Then one long, two short. Then a bunch of quick ones.' Maya tapped her pencil. 'Morse code has short and long blinks. Dots and dashes. But these don't fit the letters I know.' Ben grinned. 'Then we learn more letters.'", "At the library, Mrs. Chen pulled down a dusty handbook about the forest fire service. 'That tower watched for smoke from 1928 to 1991,' she said. 'Rangers lived in the little cabin at its base all summer.' Maya flipped to a chapter about signal lamps. Her heart thumped. 'Rangers had their own shorthand,' Mrs. Chen said. 'Too slow to spell every word up a mountain. So they flashed numbers for whole phrases. Two blinks might mean all clear. Three might mean send supplies.' She smiled. 'Someone up there knows the old system.'", "That evening they climbed Miller's Hill with a thermos, a blanket, and the handbook. The tower stairs creaked. Halfway up, Ben froze. 'Look,' he said. Below the top platform sat a brand-new solar panel, a battery box, and a small gray device with a lens pointed at town. It blinked as they watched. Nobody was there at all. Maya laughed with relief and a little disappointment. 'It's a machine,' she said. 'A weather station, maybe. The light is just its status signal.' Then the pattern changed: slow, slow, quick, quick. Ben frowned. 'That's new.'", "Maya opened the handbook to the page Mrs. Chen had marked. The old rangers' number code filled the margin in faded pencil. She counted the new pattern out loud while Ben wrote. 'Four slow means... test. Two quick means... listen.' Her voice dropped. 'It's testing whether anyone answers.' Ben was already digging in his backpack. 'Grandpa's emergency flashlight,' he said. 'It has a signal button.' Maya looked at the blinking device, then at the whole dark valley below them. 'If we answer,' she said slowly, 'we should answer honestly. We say who we are, and that we are friendly.'", "They waited until the device flashed its test pattern again. Then Ben pressed the button the way the handbook showed: two short blinks for friendly, one long for listening. His hands shook a little. The hill went dark. One second. Two. Maya counted her own heartbeats. Then the device answered with a pattern neither of them had seen, long and complicated, and at the end, unmistakably, it flashed their own friendly signal back at them. 'It's learning,' Maya whispered. 'Somebody programmed it to respond. Somebody is checking whether this valley still answers.'", "Back at the kitchen table, with the handbook open between two mugs of cocoa, Maya read the pattern out of her notebook one blink at a time. 'The phrases are numbered,' she said. 'Here — group one means signal received.' Her pencil moved faster. 'Group two means... identify yourself.' Ben stopped stirring his cocoa. 'It asked who we are?' 'It's a test program,' Maya said. 'Whoever built it wants to know if the answerer is a person, or just another machine blinking back.' She looked up. 'Machines don't have names. We do.'", "Mrs. Chen kept a second ranger handbook behind the desk, the one with the full phrase list, and she let them borrow it overnight. 'Number forty-one is the one you want,' she said. 'Use it when a stranger asks who is calling.' At home, Maya practiced on the kitchen table with Grandpa's flashlight until her thumb knew the rhythm by heart: friendly first, then their names spelled slowly in the letter code, one letter at a time, the way you would knock on a door before opening it.", "The next clear evening, they climbed again and waited, cold to their bones, until the test pattern flashed. Ben answered: friendly, then M, A, Y, A, slow and careful, then B, E, N. The dark that followed felt longer than any dark yet. Then the device lit up, quick and bright: received. Received again. And then a pattern from the new handbook's last page, one they had not practiced: report the sky. Maya laughed out loud. 'It's a weather test. It wants a weather report.' Ben flashed clear sky, and the hill answered: friendly.", "On the third night, the tower stayed dark. Rain needled sideways through the pines, and though they waited an hour, not one blink came. 'Maybe it broke,' Ben said. 'Maybe whoever runs it saw kids answering and switched it off.' Maya thought about the solar panel they had found beside the battery box. 'Or maybe it is out of sunlight,' she said. 'Two gray days in a row. A machine that runs on sunshine has to sleep through weather like this.' They climbed down in the rain, and Maya wrote in the notebook: Night three. No signal. Still waiting.", "Gray weather lasted two more days, and Maya kept the notebook anyway. Monday: no signal. Tuesday: no signal. She wrote the entries in the same careful columns as the real answers, because Mrs. Chen had told her something at the library that she could not stop thinking about. 'Real field scientists record the nothing days too,' Mrs. Chen had said. 'An empty page is still data. It tells you the shape of the silence.' So Maya recorded the silence, and underlined the lesson twice: anybody can pay attention when something is happening. Science is paying attention when nothing is.", "When the sun came back, they climbed at dusk and found the tower awake, blinking its test pattern like nothing had happened. They answered friendly. The reply was the oldest signal in the whole handbook, the first one Mrs. Chen had ever told them about: two blinks. All clear. Then friendly, then dark. 'It is not really learning,' Maya said slowly, 'and it is not really a person, either. Somebody wrote a program that answers politely. Somebody careful.' Ben nodded toward the dark valley. 'Somebody who wanted the valley to answer back.'", "They settled into a routine. On clear evenings they climbed the hill; on wet ones, Maya watched from her window and wrote the weather in the log. Signal received. Sky reported. Names exchanged with a machine that answered politely and kept its secrets. Ben wanted to leave a note in the tower cabin. Maya shook her head. 'The signals are our note,' she said. 'Whoever built it is logging every answer. One day they will tell us who they are — people who build careful machines explain themselves eventually.' So they kept answering, and waited to find out.", "The answer came three days later, in an envelope from the state university. A graduate student named Priya was testing whether old fire towers could relay weather data across the valley, and her device logged every signal it received. 'You are the only people who ever answered,' she wrote. 'And you answered correctly.' She invited Maya and Ben to help run the summer tests. Maya pinned the letter above her desk, right next to her notebook of columns. Some mysteries, she decided, are just questions waiting for someone patient enough to learn the language."], "shelf": "ours", "title": "The Signal on Miller's Hill"}, {"author": "Sam Whitaker", "band": "teen", "color": "#0E7C86", "cover": null, "emo": "🌊", "id": "lib-hudson-book", "narrate": true, "pages": ["The Hudson River flows about 315 miles from a small lake high in the Adirondack Mountains all the way down to New York Harbor. It looks like one river, but it behaves like two. The northern stretch is a true freshwater river, tumbling over rocks. The southern half, from Troy to the ocean, is a tidal estuary, where ocean tides push salty water far inland twice a day. Native peoples called it Muhheakantuck, a name often translated as 'the river that flows both ways,' and for thousands of years, they were exactly right.", "Long before highways, the river was the region's main road. The Lenape and Mohican peoples lived along its banks, fishing, farming, and trading by canoe. In 1609, Henry Hudson sailed up the river searching for a shortcut to Asia. He never found one, but his reports brought Dutch traders, then settlers, then busy ports. Towns grew wherever boats could land: Albany near the top of the tide, Kingston, Poughkeepsie, and Hudson along the way. Whoever controlled the river, people understood early, controlled the movement of goods, news, and armies through the young nation.", "During the American Revolution, the Hudson became a prize both sides fought to hold. If British forces controlled the whole river, they could split the colonies in two. American engineers stretched a massive iron chain across the water at West Point, each link weighing over a hundred pounds, to stop British ships from passing. The plan to capture that fortress led to one of the war's most famous betrayals, when Benedict Arnold plotted to hand West Point over. The plot failed, the chain held, and the river stayed in American hands until independence was won.", "In 1825, the river got a partner that changed the whole country. The Erie Canal, dug across New York State, connected the Hudson at Albany to Lake Erie and the Great Lakes beyond. Suddenly, wheat, lumber, and iron from the middle of the continent could travel by canal boat to the Hudson, then float down to New York City and out to the world. Shipping costs collapsed. New York City boomed into the nation's busiest port, and canal towns flourished. People called the canal an impossible ditch before it was built. Afterward, everyone wanted one.", "The 1800s filled the river with steamboats, sloops, brickyards, and ice houses. Crews even harvested the river itself, cutting huge blocks of winter ice to ship to warm cities. Industry brought jobs, but it also brought trouble. By the mid-1900s, factories and towns were dumping waste straight into the water. Some stretches were so polluted that swimmers stayed away and many fish were unsafe to eat. The river that had carried a revolution and a canal boom now carried a warning: a highway of water can carry a community's carelessness just as efficiently as its cargo.", "The good news is that the river fought back, with help. After new clean-water laws in the 1970s, towns built treatment plants, factories were held responsible, and volunteers began testing the water. Slowly, the Hudson cleared. Today it shelters striped bass, blue crabs, and tiny glass eels that migrate from the ocean. Bald eagles nest along its cliffs again, and Atlantic sturgeon, fish as long as a small car, still swim its deep channels. Scientists call the Hudson a living laboratory, because its recovery shows exactly what protection can accomplish.", "Scientists study the Hudson the way doctors study a patient, by taking its pulse again and again. Measuring stations record the water's temperature, salt, and oxygen every few minutes, all year long. Each spring, volunteers and students kneel beside the river's tributary streams with nets and buckets, counting glass eels — baby American eels, clear as little glass noodles, arriving from the Sargasso Sea after a journey of thousands of miles. Every eel counted and released upstream is one line in a notebook the whole valley is writing together.", "The river is also a nursery and a highway for fish. Each spring, river herring push upstream in silver crowds to lay their eggs, and striped bass spawn in the Hudson in such numbers that the river is one of the species' most important birthplaces on the whole Atlantic coast. Researchers catch Atlantic sturgeon, fit them with small transmitters, and listen for their pings at receivers strung along the riverbed, mapping journeys no human eye could follow. Ospreys and eagles time their own nesting to the fish runs, so the whole food web moves to the river's calendar.", "One famous helper arrived under sail. In 1969, folk singer Pete Seeger helped launch a wooden sloop called the Clearwater, built to do something laws had not yet managed: make people love the river enough to save it. The sloop sailed from town to town with music on deck and a simple argument below it — a river this beautiful was worth fighting for. The Clearwater still sails today as a floating classroom, where students haul nets, test water, and steer a tall ship on the same tide their grandparents polluted and their parents helped clean.", "The recovery is real, but it is not finished. For thirty years, factories upriver discharged PCBs, industrial chemicals that sank into the mud and climbed the food chain, building up in fish. Fishing bans and health warnings followed, and a huge cleanup eventually dredged millions of tons of contaminated sediment from the upper river. Scientists still monitor what remains buried, because a river's memory is stored in its mud. The Hudson's story teaches a hard arithmetic: pollution can take a single generation to make and several generations to unmake.", "A highway carries stowaways, too. In 1991, zebra mussels — thumbnail-sized shellfish from distant lakes, carried in on ships — appeared in the Hudson and multiplied into the billions. They filtered the water so thoroughly that it grew clearer, which sounds like a gift, until scientists saw the cost: the mussels were eating the tiny floating food that native young fish and shellfish needed. Water chestnut, an invasive plant, spreads green mats that shade out native grasses. Every new arrival rewrites the river's recipe, and scientists watch each one the way a town watches weather coming.", "Now the river faces a slower challenge. As the ocean rises, the estuary's salt front — the invisible line where salty water meets fresh — creeps farther north in dry summers, toward the intakes where river towns draw their drinking water. Stronger storms shove floodwater into streets and marshes alike. The river's defenders answer with the river's own tools: protecting wetlands that sponge up floods, and keeping shorelines soft and planted instead of walled in concrete. The marshes that shelter young fish turn out to shelter towns as well.", "Much of the river's fate is decided far from its banks. Rain that falls on Catskill forests, farm fields, and small-town roofs gathers into the creeks that feed the Hudson, carrying whatever it picked up along the way. That is why watershed groups plant trees along streams, why farmers fence cattle out of creeks, and why a town miles from the river can still be a river town. Each generation inherits the Hudson from the one before it, muddy or clear, and hands it on the same way. Which raises the oldest question on the river.", "So why does the Hudson still matter? Ask the kayakers launching at dawn, the farmers whose fields drink from its valley, and the millions of people whose drinking water comes from its watershed. Freight still moves on its current, trains race along its eastern shore, and its tides set the rhythm for dozens of towns. More than that, the river is a reminder written in water: what a region builds, dumps, protects, and repairs all flows downstream to somebody else. The highway of water is still open. What travels on it is up to us."], "shelf": "ours", "title": "The Hudson River: A Highway of Water"}, {"author": "Theo Marchetti", "band": "teen", "color": "#7C3AED", "cover": null, "emo": "🚀", "id": "lib-juno-mars", "narrate": true, "pages": ["Juno Alvarez was not the best science student in her class, and she wanted that in the letter. 'Dear Mars,' she wrote at the kitchen table, erasing twice. 'I am twelve, I live in Ohio, and I am not sending you this because I am good at science. I am sending it because I have questions nobody here can answer yet.' Her teacher, Ms. Oduya, had announced the project that morning: every student would write a letter, and scanned copies would ride with the next rover mission's data archive to Mars.", "The trouble was the questions. Juno's first draft asked Mars what its weather felt like and whether it was lonely, and it sounded, she thought, like a birthday card. So she did what Ms. Oduya always advised: she went to the library and read about the real rovers. She learned that Mars is rusty with iron dust, that its sunsets glow blue, and that a rover's wheels can wear down on sharp rocks. Her questions changed. 'What breaks first?' she wrote. 'And what do your engineers wish they had known before they sent you?'", "Then came the hard part, which was waiting. The launch was still fourteen months away. Fourteen months felt like forever, and Juno said so, loudly, at dinner. Her grandfather, who had repaired radios in the Navy, shrugged. 'Everything that goes far takes time to get there,' he said. 'Your letter is traveling the whole way already. It's just traveling slowly, through other people's careful work.' Juno started a countdown notebook. On each page she wrote one thing she had learned that week about Mars, rockets, or the people who build them.", "The notebook filled faster than she expected. She learned that signals from Mars can take up to twenty-two minutes to reach Earth, so rovers must handle problems alone. She learned that engineers test wheels in a Mars yard full of punishing rocks, and that one famous rover, planned for ninety days, worked for nearly fifteen years. 'Patience isn't just waiting,' she wrote in the notebook's margin. 'It's building things that can keep going after you stop watching.' She underlined it twice, because it felt like the truest sentence she had ever written.", "Launch day finally came during summer break. Juno watched from the community center with her class on video call, everyone wearing the mission T-shirts Ms. Oduya had ordered in October. The rocket rose on a column of fire and noise, shrank to a bright dot, and vanished. It was over in nine minutes. 'That's it?' someone said. Juno shook her head. 'That's the beginning,' she said. 'Now it cruises for seven months. My letter is on a very long bus ride.' She opened the countdown notebook to a fresh page and wrote: Day 1.", "The cruise months were quiet, which Juno decided was its own lesson. Nothing dramatic happened, and the mission still needed people checking numbers every single day. She started checking things too: her grades, her little brother's fish tank filter, the seedlings on the windowsill. 'Small checks, done on time,' she told her grandfather, 'so big problems never get the chance.' He laughed and said NASA could put that on a poster. In her notebook she tracked the spacecraft's distance the way other kids tracked game scores, one patient line at a time.", "The scare came in the fourth month, over breakfast. A headline on her grandfather's tablet read: SPACECRAFT QUIET — TEAM INVESTIGATING. Overnight, the spacecraft had stopped answering and slipped into safe mode, a protective crouch engineers had programmed long before launch. Juno read the article three times. Her letter, her whole class's letters, were riding on a machine that had gone silent in the dark. 'Radios went quiet at sea, too,' her grandfather said, pouring more coffee. 'Quiet never meant gone. It meant the crew was busy fixing something.'", "Ms. Oduya turned the silence into a science lesson. 'Safe mode is not failure,' she said, drawing the spacecraft on the board. 'It is a plan, written in advance. When something feels wrong, the spacecraft turns toward the sun, keeps its power safe, and waits for instructions — because instructions take twenty minutes to arrive.' For three days, Juno checked the mission page before she checked anything else. On the fourth morning, the update was one line long: SIGNAL FOUND. SPACECRAFT HEALTHY. In her notebook she wrote: Being prepared is a message you send to your future self.", "That week, Juno started a second letter — the one that would never be sent. 'Dear Mars,' she wrote, 'things have changed since my first letter, so here is the update.' She told Mars about orange sunsets and rain that falls sideways, about her brother's goldfish, which had survived two filter failures and one dropped bowl. She told it that Earth was not a quiet planet, whatever it looked like from far away. 'You are mostly questions,' she wrote at the end. 'We are mostly noise and weather. Maybe that is why we write to each other.'", "Her little brother, Mateo, decided he wanted to send a letter too, even though the mission archive was closed. Juno did not tell him he was too late. She helped him write it at the kitchen table, one careful sentence at a time, and when he asked whether the rover would read it, she gave him the truest answer she had. 'The rover can't read,' she said. 'But asking is not really for the rover.' She put his letter in the back of her countdown notebook, where, she decided, it would travel just as far.", "In the last month, Ms. Oduya taught them how the landing would work, and Juno filled three notebook pages with diagrams. First the heat shield, glowing like a meteor. Then a parachute, then rockets, then a crane on cables lowering the rover to the ground. 'The landing takes seven minutes,' Ms. Oduya said, 'and the spacecraft must do every step alone, in order, with no help. By the time we hear that it started, it will already be finished — landed, or not.' Juno wrote under the diagram: Everything important, we learn late. We just have to be listening.", "The night before landing, her grandfather took the countdown notebook from the table and turned its pages slowly, back to the beginning. 'I waited for a lot of signals in the Navy,' he said. 'Storms, mostly. You would listen to static for hours, and your whole job was not to give up on the listening.' He closed the notebook and handed it back like something breakable. 'Whatever happens tomorrow, Juno, the letter already did its work. It made you into somebody who pays attention.' She wrote that down too, word for word, so she would not lose it.", "They gathered the way they had on launch day — a room full of her class, mission T-shirts, and a screen that would tell them everything twenty minutes late. Juno sat with her notebook open to its last countdown page and a fresh page waiting beside it. Ms. Oduya read the timeline out loud one final time — entry, parachute, rockets, touchdown — the way you read a story whose ending nobody knows. Then she set the timer for the seven minutes, dimmed the lights, and said the only thing left to say. 'Here we go. Listen.'", "Landing day, the whole class held its breath through the seven minutes when the spacecraft was on its own, too far away for anyone to help. Then the signal arrived, twenty minutes old and perfect: the rover was down, safe, on Mars. Juno's letter had arrived on another planet. In her notebook she wrote the last entry of the countdown, then turned the page and started a new list. 'Questions for the next letter,' it said. Because the best thing about asking a planet a question, she had learned, is that you never run out."], "shelf": "ours", "title": "Juno's Letter to Mars"}, {"author": "June Okafor", "band": "teen", "color": "#F2B705", "cover": null, "emo": "🐝", "id": "lib-bee-season", "narrate": true, "pages": ["On a gray morning in early March, beekeeper Ana Reyes zipped up her white suit and walked out to the four hives behind her barn. All winter, she had worried. A honeybee colony that runs out of food, or loses too many bees to the cold, simply does not wake up in spring. Ana pressed her ear against the first hive and knocked gently. From inside came a low, steady hum. She smiled. The colony had made it through the hardest season of the year, and now the real work could begin.", "Inside a winter hive, bees survive by forming a tight ball called a cluster, with the queen safe in the warm center. The bees shiver their flight muscles to make heat, keeping the middle of the cluster toasty even when the air outside drops below freezing. They slowly eat through the honey they stored in the fall. By March, the queen has already started laying eggs again, sometimes a thousand a day, because the colony needs thousands of young bees ready when the first flowers open.", "April is the season of first blooms, and the hive explodes with activity. Scout bees return from early flowers like maple and willow, dancing on the honeycomb to tell their sisters where the food is. In the waggle dance, a bee wiggles in a figure eight; the angle of her dance points the way, and the length of the wiggle tells the distance. Ana opened each hive on a calm, sunny day to check that the queen was laying and the bees had room to grow.", "A growing colony can do something dramatic in late spring: swarm. If the hive gets too crowded, the old queen leaves with about half the bees to found a new home, while the bees left behind raise a new queen from a special cell shaped like a peanut. Ana watched for those queen cells on every visit. Catching a swarm is not a disaster for a prepared beekeeper. It is the colony reproducing, and a caught swarm, settled into an empty hive, becomes next year's honey makers.", "By July, the hive was at full strength, nearly sixty thousand bees, and the honey supers, the shallow boxes Ana stacked on top, were filling fast. Forager bees visited hundreds of flowers a day, sipping nectar and carrying pollen in yellow baskets on their legs. Back home, worker bees fanned their wings over the nectar to dry it into thick, golden honey, then sealed each cell with a wax cap. On hot evenings, Ana could smell the honey from the farmhouse porch, warm and sweet.", "In September, Ana harvested only what the bees could spare, leaving each hive plenty of honey for winter. Then she checked for the colony's biggest enemy, a tiny mite called varroa that weakens bees and spreads disease. Healthy bees going into winter mean live bees in spring. As the days shortened, the colony raised its last, plumpest generation of bees, the winter bees, whose bodies are built to live for months instead of weeks. The queen slowed her laying, and the hive grew quiet.", "October brought the season's last big jobs. Ana fitted each hive entrance with a mouse guard, a strip of metal with bee-sized holes, because a warm hive makes a tempting winter home for mice. She tilted every hive slightly forward so rain and melting snow would run out instead of pooling inside, and she stacked the empty honey supers in the barn, where the smell of wax and summer still clung to them. A hive going into winter should feel heavy, she reminded herself. Heavy meant food. Heavy meant a chance.", "By November the last drones were gone, pushed out by their sisters weeks earlier, since a winter colony cannot feed mouths that do not work. On calm afternoons a few bees still flew out and back, but mostly the hives sat quiet under a skin of frost. Ana walked the row every Sunday with her ear pressed to the wood, listening. A soft, steady hum meant the cluster was alive and calm. Silence, or a frantic buzzing, would have meant trouble. Week after week, hive after hive, she heard the hum.", "Then came the December storm. Wind tore across the fields all night, and in the morning Ana found the third hive tipped forward, its outer cover blown halfway off, snow sifting into the crack. Her heart pounded. Bees can survive deep cold, but cold plus wet can kill them. Wading through drifts, she heaved the cover straight, strapped the hive tight, and cleared snow from the entrance so air could move. She could not open the hive to check. She could only knock, listen for the hum, and trust.", "A January thaw fooled everyone. For three days the sun felt almost warm, and bees from three hives poured out for cleansing flights, their first bathroom trips in weeks. But the fourth hive, the storm hive, stayed silent. Ana knocked and heard only a faint, faraway murmur. She knew the danger: in deep cold the cluster cannot move sideways, so bees can starve beside full frames of honey they cannot reach. A colony can die of hunger in a house full of food, simply because the cold will not let them walk to dinner.", "On the mildest afternoon she dared, Ana worked fast. She lifted the storm hive's cover just long enough to lay sheets of fondant, a firm sugar paste, directly above the cluster, then closed everything within a minute. Liquid syrup would have been a mistake; in winter it adds moisture and can chill the bees. Fondant is bee candy they can eat without leaving the warmth. All the while the cluster stayed sealed and still. 'Hold on, girls,' Ana whispered, strapping the lid. 'Spring is coming. You just have to reach it.'", "February is the colony's hardest month, and its most hopeful. Deep inside the cluster, the queen was laying again, fooled by the lengthening days, and the bees raised the temperature around the new babies to a steady ninety-five degrees, burning honey fast to do it. Ana hefted each hive from behind every week; a hive growing lighter was eating its savings right on schedule. Then, on a bright cold morning, she saw it: a forager landing at the entrance with pale gold pollen packed on her legs. Somewhere, a maple had bloomed.", "March again, one full turn of the year. On the first truly warm day, all four colonies burst out together, thousands of bees circling the hives in joyful orientation flights, learning the shape of home. Workers hauled out the winter's dead, tidying the hive the way they tidy everything. The storm colony was smaller than the others, but alive, with fondant crumbs gone and fresh brood below. Ana stood in the muddy grass and laughed out loud. The bees had carried each other through. Now it was spring's turn, and hers.", "Why do bees matter so much? About one out of every three bites of food you eat depends on pollinators like honeybees, from apples and almonds to berries and pumpkins. When a bee moves pollen between flowers, she helps plants make seeds and fruit, and whole ecosystems eat because of her work. That is why Ana keeps bees, and why anyone can help: plant flowers, skip the sprays, and let a few dandelions bloom. A single season with the bees teaches you that small workers can feed the world."], "shelf": "ours", "title": "One Season with the Bees"}, {"author": "Mabel Finch", "band": "teen", "color": "#2E7FA8", "cover": null, "emo": "⛵", "id": "lib-canal-girl", "narrate": true, "pages": ["Albany, New York, October 1825. Twelve-year-old Eliza Hart stood on the deck of the canal boat Seneca Maiden while crowds cheered along the shore. After eight years of digging, Governor DeWitt Clinton's great canal was finished at last: 363 miles of water stretching from Albany to Buffalo, joining the Hudson River to Lake Erie. Eliza's father had signed on as captain for the boat's very first trip west, carrying barrels of flour and salt. Eliza's job was the best one aboard. She would walk the towpath and lead the mules.", "A canal boat has no engine and no sails. Instead, two mules, hitched to a long rope, walked the packed-earth towpath beside the water and pulled the boat along at a steady three miles an hour. Eliza led the lead mule, a patient gray named Biscuit, while her older brother handled the spare team. Every three or four hours they swapped mules at a stable along the route. 'A boat that never stops needs legs that do,' her father liked to say, checking the harness knots one more time.", "The canal was only four feet deep, but the land it crossed was anything but flat. To climb hills, the boat entered a lock, a stone chamber with heavy wooden gates at both ends. Eliza watched the lock tender swing the gates shut behind them. Then water rushed in through hidden channels, and the whole boat, mules watching calmly from the bank, floated upward like a toy in a bathtub. Eighty-three locks stood between Albany and Buffalo, and each one lifted or lowered them about as high as a house.", "Where the canal crossed a river, it did not stop. It flew. Near Rochester, engineers had built a great stone aqueduct, a bridge that carried water instead of road, straight across the Genesee River. Eliza held Biscuit's lead rope a little tighter as the boat glided out over the river far below. Gulls wheeled under them. Passengers on deck went quiet, then laughed at their own nerves. 'Folks said a ditch through the wilderness couldn't be done,' her father said. 'Seems the ditch didn't hear them.'", "Not everything on the canal was grand. The bridges built for farm roads crossed so low that anyone standing on deck had to duck, and the cry of 'Low bridge!' sent passengers scrambling flat. Rain turned the towpath to mud that sucked at Eliza's boots. But the canal towns made up for it: lockside stores sold hot corn and gingerbread, blacksmiths rang their hammers at every stop, and at night the boat tied up among dozens of others, lanterns bobbing, crews trading news from both ends of New York.", "West of Rochester the digging crews had carved the canal straight through a towering wall of rock near Lockport, blasting a channel with black powder and hauling away the rubble stone by stone. Five pairs of locks, stacked like a staircase, lifted boats up the escarpment. Eliza counted each gate and each rise, thinking of the thousands of workers, many of them immigrants far from home, whose hands had built this road of water. The Maiden climbed the staircase one chamber at a time, higher than the treetops.", "Beyond the locks the canal ran through the Deep Cut, a channel blasted straight through solid rock, so narrow that two boats could not pass side by side. When a horn sounded ahead, Father called, 'Eastbound has the right of way!' Eliza walked Biscuit onto a widening shelf cut into the rock while the other boat's crew dropped their towline into the water, letting the Maiden's mules step over the sunken rope and her hull slide past above it. Inches apart, the two boats whispered by, and Eliza held her breath the whole time.", "West of the cut, the canal borrowed the Tonawanda Creek itself, and for miles the boat traveled in a wide, slow river between wooded banks. Herons stalked the shallows. Once, a deer swam ahead of the bow, ears flat, while every passenger held still and silent until it climbed out and shook itself dry. The towpath here was a shelf along the bank, and the mules' hooves struck sparks off wet stone. 'Creek's doing half our work today,' Father said, as the gentle current nudged them west.", "Then, near dusk, the Maiden slowed, wallowed, and settled with a sigh into the mud. Up ahead, the bank had given way: a breach. Water poured through a gap in the towpath, draining the creek pound by the hour. There was nothing to do but tie up and wait while the repair crew, farmers, and passengers together dragged planks, straw, and clay to plug the hole. Eliza carried hot coffee down the line of workers until her arms ached. 'The canal,' Father said, 'is only ever borrowed from the land. Sometimes the land asks for it back.'", "Tied up for the night, the Maiden shared the bank with a line boat crowded with an emigrant family, the O'Donnells, bound for new farmland in Ohio. Their daughter Brigid was Eliza's age, and everything they owned, a table, a plow, a cage of chickens, rode in forty feet of boat. 'At home we rented land we could never own,' Brigid said. 'Here, Father says, a family can buy its own acres.' Eliza looked at the dark water carrying a thousand such hopes west, and understood the canal was more than a ditch. It was a door.", "In the morning Eliza found Biscuit favoring his left foreleg, and her stomach knotted. A thrown shoe is a small thing on a farm; on the canal, a lame mule stops everything. Her brother brought the spare team forward while Eliza walked Biscuit slowly, watching each step, the way Father had taught her: short stride, head bobbing, meant pain up front. At the next settlement a blacksmith lifted the gray hoof, found the loose shoe, and reset it with six bright nails. 'Soft feet, honest worker,' he said. 'Same as people, miss.'", "To win back the hours the breach had stolen, Father ran the Maiden through the night. Lanterns glowed at bow and stern, and the canal belonged to frogs, stars, and the soft splash of the towline. Halfway through the dark hours, Father waved Eliza up to the stern. 'Take the tiller,' he said. 'Feel her.' The great wooden arm trembled against her palms, alive with the water's push. Steering forty tons with a touch of her wrist, Eliza grinned into the dark. Walking was her job. Tonight, for a mile, she sailed.", "The last day's travel felt different from the first. Boats now crowded the water in both directions, packets flying past with passengers on their roofs, freight boats low under wheat, timber, and barrels of salt pork. Warehouses shouldered along the banks, and the smell of the lake, cold, wide, and faintly of fish, reached them long before the water did. Eliza's boots were worn thin as paper. Her brother counted the final mile markers aloud, and each number felt like a drumbeat. Behind them lay Albany. Ahead of them, everything else.", "On the ninth morning, the water widened, the air smelled different, and Father pointed ahead. 'Buffalo,' he said, 'and Lake Erie beyond it.' Governor Clinton himself had opened the canal by pouring a keg of Lake Erie water into the Hudson, calling it the wedding of the waters. Now the Maiden slid into Buffalo's harbor among masts and shouting crowds. Eliza scratched Biscuit behind the ears. A trip that once took six weeks by wagon had taken nine days, and she had walked every mile of it."], "shelf": "ours", "title": "The Girl Who Walked the Canal"}, {"author": "Pablo Reyes", "band": "teen", "color": "#7A4FA3", "cover": null, "emo": "🎤", "id": "lib-debate-club", "narrate": true, "pages": ["Nora Kim could write a brilliant argument on paper. Speaking one out loud, in front of actual people, was a different story. So when her best friend dragged her to the first meeting of the Jefferson Middle School debate club, Nora planned to sit in the back and say nothing until June. Coach Alvarez had other plans. 'Everyone debates here,' she said cheerfully, handing Nora a topic card. 'That's the whole point of the club.' Nora looked at the card, and her stomach dropped straight through the floor.", "Her first practice round was a disaster she would remember forever. The topic was whether school should start later in the morning, and Nora had opinions. Strong ones. But standing at the podium, she mostly said 'um,' read her notes in a whisper, and finished ninety seconds early, which in debate is an eternity of silence. Her opponent, a seventh grader named Marcus, spoke slowly and clearly and won without breaking a sweat. Nora wanted to quit that same afternoon. Coach Alvarez asked her to stay for one more week.", "'Your ideas are good,' Coach Alvarez told her, drawing three boxes on the whiteboard. 'They're just not built yet. Every strong argument is a claim, evidence, and reasoning.' She tapped each box. 'The claim is what you believe. The evidence is your proof: facts, numbers, examples. And the reasoning is the part everyone forgets, the bridge that explains why your evidence proves your claim.' Nora copied the three boxes into her notebook and drew a small bridge over the last one, just to make herself remember.", "That week, Nora rebuilt her school-start-time argument like an engineer. Claim: school should start at nine o'clock. Evidence: she found a study showing that teenagers' brains release sleep chemicals later at night, so early classes fight biology, and schools that switched saw grades and attendance rise. Reasoning: if tired students learn less, then a schedule that ignores sleep is a schedule that ignores learning. For the first time, her argument felt like a building instead of a pile of bricks. She practiced saying it to her mirror, then to her very patient cat.", "The rematch with Marcus came at the winter tournament, and this time Nora was ready for his best point. He argued that later starts would wreck sports practices and bus schedules. Nora had heard it before, so she answered it head-on: that is a real cost, she admitted, but districts that moved practices and shared buses solved it within a year, while students kept the learning gains. Conceding the small point made her big point stronger. The judge was scribbling notes the whole time Nora spoke. She noticed, and stood a little straighter.", "The final round of the spring tournament put Nora's team up against the undefeated champions from Roosevelt Middle School, and the topic was one she had never seen before: whether students should be allowed to grade their teachers. Twenty minutes to prepare. Old Nora would have panicked. New Nora opened her notebook to the three boxes and started building: claim, evidence from student-survey research, reasoning that feedback only works when it flows both directions. Her hands shook a little. Her argument did not.", "The prep room was a borrowed classroom that smelled of whiteboard markers. Coach Alvarez wrote the topic on the board and set a timer. 'Twenty minutes. Build first, panic never.' Nora split the work the way they had practiced: her best friend Maya dug through the research binder for survey studies, their second speaker listed the arguments Roosevelt would probably run, and Nora built the case itself, three boxes marching down her page. Claim. Evidence. Reasoning. When the timer buzzed, her hands had stopped shaking entirely. Her notes were ready.", "Roosevelt's captain spoke first, and she was everything the trophies promised: fast, polished, and utterly certain. She argued that students grading teachers would turn classrooms into popularity contests, where easy graders win and honest ones get punished. It was a strong point, and Nora felt the old familiar wobble rise in her chest. But her pen was already moving. Debaters call it flowing: writing the other side's arguments in columns, so nothing gets lost and every claim waits its turn to be answered. Nora's pen did not stop.", "Then came cross-examination, and the captain came for Nora directly. 'Would you let students grade you?' she asked sweetly. 'On what you'd call fair evidence?' The room went very quiet. Nora took one breath and answered the question instead of dodging it. 'Yes, with a rubric, the same way teachers grade us,' she said. 'Fair criteria, specific comments, no anonymous insults. If grading is good enough to shape our futures, a careful version of it can shape a classroom too.' The captain blinked. The judge wrote something down.", "Maya spoke next, and if Nora was the builder, Maya was the storyteller. She walked the judges through a real survey program where students rated their teachers twice a year: classes grew calmer, assignments grew clearer, and the teachers themselves asked for the results each term. Then Roosevelt's second speaker rose with the argument Nora had feared most. Student surveys, he said, were proven to punish strict teachers and reward entertaining ones. Nora underlined it twice on her flow. That one, she would have to answer herself, in the rebuttal, with everything she had.", "Nora's rebuttal started strong. She answered the popularity-contest point, rebuilt Maya's survey story, and turned toward the strict-teacher argument, the big one. And then, halfway down her flow, the ink blurred. Two columns ran together in her head. She could not find the line she needed, and the silence stretched one second, two, three, exactly like the bad old days. Nora looked down at her notebook, at the little bridge she had drawn months ago. Claim. Evidence. Reasoning. She skipped the lost line and built the bridge from memory.", "What came out was not the sentence she had written. It was better. 'A survey with fair criteria does not punish strict teachers,' she said. 'It punishes unclear ones, and it tells them exactly what to fix. That is not a popularity contest. That is feedback doing its job.' Roosevelt's captain closed last, smooth as glass, and slipped in one brand-new argument at the very end, about grading making students lazy. There was no speech left to answer it with. Nora wrote it at the bottom of her flow, underlined once, and added two words: next time.", "While the judges added up their ballots, the team waited in the hallway, where somebody's forgotten lunch was perfuming a locker. 'Whatever that envelope says,' Coach Alvarez told them, 'I want you to notice something. Roosevelt has been doing this for years. You kept a final close against the champions, and you did it with arguments you built yourselves.' Nora looked at her flow, three columns of ink, every fear answered somewhere on the page. The judges' door opened. Nora stood up, smoothed her notes, and walked in ready to hear anything.", "Jefferson did not win the trophy that day. Roosevelt took the final by a single point. But when the judges announced the award for most improved speaker of the season, the name they called was Nora Kim, and her team lifted her onto their shoulders in the hallway like she had won everything. Walking home, she thought about the girl who once read her notes in a whisper. She still got nervous. She probably always would. But now she knew how to build an argument, and a voice, one box at a time."], "shelf": "ours", "title": "The Great Debate Club Comeback"}, {"author": "Beatrix Potter", "band": "little", "color": "#7FB069", "cover": "https://covers.openlibrary.org/b/id/2557658-L.jpg", "emo": "🐰", "find": [{"ask": "Can you find Mrs. Rabbit?", "label": "Mrs. Rabbit", "p": 2, "x": 322, "y": 472}, {"ask": "Can you find the rake?", "label": "the rake", "p": 5, "x": 492, "y": 210}, {"ask": "Can you find the watering can?", "label": "the watering can", "p": 9, "x": 670, "y": 785}, {"ask": "Can you find the white cat?", "label": "the white cat", "p": 15, "x": 740, "y": 410}, {"ask": "Can you find the gate?", "label": "the gate", "p": 17, "x": 756, "y": 424}], "id": "cls-peter-rabbit", "pages": ["Once upon a time there were four little Rabbits, and their names were-- Flopsy, Mopsy, Cotton-tail, and Peter. They lived with their Mother in a sand-bank, underneath the root of a very big fir-tree.", "'Now my dears,' said old Mrs. Rabbit one morning, 'you may go into the fields or down the lane, but don't go into Mr. McGregor's garden: your Father had an accident there; he was put in a pie by Mrs. McGregor.' 'Now run along, and don't get into mischief. I am going out.'", "Then old Mrs. Rabbit took a basket and her umbrella, and went through the wood to the baker's. She bought a loaf of brown bread and five currant buns. Flopsy, Mopsy, and Cottontail, who were good little bunnies, went down the lane to gather blackberries:", "But Peter, who was very naughty, ran straight away to Mr. McGregor's garden, and squeezed under the gate! First he ate some lettuces and some French beans; and then he ate some radishes; And then, feeling rather sick, he went to look for some parsley. But round the end of a cucumber frame, whom should he meet but Mr. McGregor!", "Mr. McGregor was on his hands and knees planting out young cabbages, but he jumped up and ran after Peter, waving a rake and calling out, 'Stop thief!' Peter was most dreadfully frightened; he rushed all over the garden, for he had forgotten the way back to the gate.", "He lost one of his shoes among the cabbages, and the other shoe amongst the potatoes.", "After losing them, he ran on four legs and went faster, so that I think he might have got away altogether if he had not unfortunately run into a gooseberry net, and got caught by the large buttons on his jacket. It was a blue jacket with brass buttons, quite new.", "Peter gave himself up for lost, and shed big tears; but his sobs were overheard by some friendly sparrows, who flew to him in great excitement, and implored him to exert himself.", "Mr. McGregor came up with a sieve, which he intended to pop upon the top of Peter; but Peter wriggled out just in time, leaving his jacket behind him. And rushed into the tool-shed, and jumped into a can. It would have been a beautiful thing to hide in, if it had not had so much water in it.", "Mr. McGregor was quite sure that Peter was somewhere in the tool-shed, perhaps hidden underneath a flower-pot. He began to turn them over carefully, looking under each. Presently Peter sneezed--'Kertyschoo!' Mr. McGregor was after him in no time.", "And tried to put his foot upon Peter, who jumped out of a window, upsetting three plants. The window was too small for Mr. McGregor, and he was tired of running after Peter. He went back to his work.", "Peter sat down to rest; he was out of breath and trembling with fright, and he had not the least idea which way to go. Also he was very damp with sitting in that can. After a time he began to wander about, going lippity--lippity--not very fast, and looking all round.", "He found a door in a wall; but it was locked, and there was no room for a fat little rabbit to squeeze underneath.", "An old mouse was running in and out over the stone doorstep, carrying peas and beans to her family in the wood. Peter asked her the way to the gate, but she had such a large pea in her mouth that she could not answer. She only shook her head at him. Peter began to cry.", "Then he tried to find his way straight across the garden, but he became more and more puzzled. Presently, he came to a pond where Mr. McGregor filled his water-cans. A white cat was staring at some gold-fish, she sat very, very still, but now and then the tip of her tail twitched as if it were alive. Peter thought it best to go away without speaking to her; he had heard about cats from his cousin, little Benjamin Bunny.", "He went back towards the tool-shed, but suddenly, quite close to him, he heard the noise of a hoe--scr-r-ritch, scratch, scratch, scritch. Peter scuttered underneath the bushes. But presently, as nothing happened, he came out, and climbed upon a wheelbarrow and peeped over. The first thing he saw was Mr. McGregor hoeing onions. His back was turned towards Peter, and beyond him was the gate!", "Peter got down very quietly off the wheelbarrow; and started running as fast as he could go, along a straight walk behind some black-currant bushes. Mr. McGregor caught sight of him at the corner, but Peter did not care. He slipped underneath the gate, and was safe at last in the wood outside the garden.", "Mr. McGregor hung up the little jacket and the shoes for a scare-crow to frighten the blackbirds. Peter never stopped running or looked behind him till he got home to the big fir-tree.", "He was so tired that he flopped down upon the nice soft sand on the floor of the rabbit-hole and shut his eyes. His mother was busy cooking; she wondered what he had done with his clothes. It was the second little jacket and pair of shoes that Peter had lost in a fortnight!", "I am sorry to say that Peter was not very well during the evening. His mother put him to bed, and made some camomile tea; and she gave a dose of it to Peter! 'One table-spoonful to be taken at bed-time.' But Flopsy, Mopsy, and Cotton-tail had bread and milk and blackberries for supper. THE END"], "shelf": "classic", "title": "The Tale of Peter Rabbit"}, {"author": "Aesop", "band": "little", "color": "#E07A5F", "cover": "https://covers.openlibrary.org/b/id/3043711-L.jpg", "emo": "🦊", "find": [{"ask": "Can you find the grapes?", "label": "the grapes", "p": 1, "x": 746, "y": 265}, {"ask": "Can you find the Lion?", "label": "the Lion", "p": 5, "x": 665, "y": 485}, {"ask": "Can you find the Wolf?", "label": "the Wolf", "p": 9, "x": 783, "y": 522}, {"ask": "Can you find the Hare?", "label": "the Hare", "p": 12, "x": 505, "y": 635}, {"ask": "Can you find the cheese?", "label": "the cheese", "p": 17, "x": 488, "y": 469}], "id": "cls-aesop-fables", "pages": ["The Fox and The Grapes. THE FOX AND THE GRAPES A Fox one day spied a beautiful bunch of ripe grapes hanging from a vine trained along the branches of a tree. The grapes seemed ready to burst with juice, and the Fox's mouth watered as he gazed longingly at them.", "The bunch hung from a high branch, and the Fox had to jump for it. The first time he jumped he missed it by a long way. So he walked off a short distance and took a running leap at it, only to fall short once more. Again and again he tried, but in vain. Now he sat down and looked at the grapes in disgust. \"What a fool I am,\" he said. \"Here I am wearing myself out to get a bunch of sour grapes that are not worth gaping for.\"", "And off he walked very, very scornfully. There are many who pretend to despise and belittle that which is beyond their reach.", "The Lion and The Mouse. THE LION AND THE MOUSE A Lion lay asleep in the forest, his great head resting on his paws. A timid little Mouse came upon him unexpectedly, and in her fright and haste to get away, ran across the Lion's nose. Roused from his nap, the Lion laid his huge paw angrily on the tiny creature to kill her. \"Spare me!\" begged the poor Mouse. \"Please let me go and some day I will surely repay you.\"", "The Lion was much amused to think that a Mouse could ever help him. But he was generous and finally let the Mouse go. Some days later, while stalking his prey in the forest, the Lion was caught in the toils of a hunter's net. Unable to free himself, he filled the forest with his angry roaring. The Mouse knew the voice and quickly found the Lion struggling in the net. Running to one of the great ropes that bound him, she gnawed it until it parted, and soon the Lion was free.", "\"You laughed when I said I would repay you,\" said the Mouse. \"Now you see that even a Mouse can help a Lion.\" A kindness is never wasted.", "The Shepherd Boy and The Wolf. THE SHEPHERD BOY AND THE WOLF A Shepherd Boy tended his master's Sheep near a dark forest not far from the village. Soon he found life in the pasture very dull. All he could do to amuse himself was to talk to his dog or play on his shepherd's pipe. One day as he sat watching the Sheep and the quiet forest, and thinking what he would do should he see a Wolf, he thought of a plan to amuse himself.", "His Master had told him to call for help should a Wolf attack the flock, and the Villagers would drive it away. So now, though he had not seen anything that even looked like a Wolf, he ran toward the village shouting at the top of his voice, \"Wolf! Wolf!\" As he expected, the Villagers who heard the cry dropped their work and ran in great excitement to the pasture. But when they got there they found the Boy doubled up with laughter at the trick he had played on them.", "A few days later the Shepherd Boy again shouted, \"Wolf! Wolf!\" Again the Villagers ran to help him, only to be laughed at again. Then one evening as the sun was setting behind the forest and the shadows were creeping out over the pasture, a Wolf really did spring from the underbrush and fall upon the Sheep. In terror the Boy ran toward the village shouting \"Wolf! Wolf!\" But though the Villagers heard the cry, they did not run to help him as they had before. \"He cannot fool us again,\" they said.", "The Wolf killed a great many of the Boy's sheep and then slipped away into the forest. Liars are not believed even when they speak the truth.", "The Hare and The Tortoise. THE HARE AND THE TORTOISE A Hare was making fun of the Tortoise one day for being so slow. \"Do you ever get anywhere?\" he asked with a mocking laugh. \"Yes,\" replied the Tortoise, \"and I get there sooner than you think. I'll run you a race and prove it.\" The Hare was much amused at the idea of running a race with the Tortoise, but for the fun of the thing he agreed. So the Fox, who had consented to act as judge, marked the distance and started the runners off.", "The Hare was soon far out of sight, and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare, he lay down beside the course to take a nap until the Tortoise should catch up.", "The Tortoise meanwhile kept going slowly but steadily, and, after a time, passed the place where the Hare was sleeping. But the Hare slept on very peacefully; and when at last he did wake up, the Tortoise was near the goal. The Hare now ran his swiftest, but he could not overtake the Tortoise in time. The race is not always to the swift.", "The Fox and The Crow. THE FOX AND THE CROW One bright morning as the Fox was following his sharp nose through the wood in search of a bite to eat, he saw a Crow on the limb of a tree overhead. This was by no means the first Crow the Fox had ever seen. What caught his attention this time and made him stop for a second look, was that the lucky Crow held a bit of cheese in her beak. \"No need to search any farther,\" thought sly Master Fox. \"Here is a dainty bite for my breakfast.\"", "Up he trotted to the foot of the tree in which the Crow was sitting, and looking up admiringly, he cried, \"Good-morning, beautiful creature!\" The Crow, her head cocked on one side, watched the Fox suspiciously. But she kept her beak tightly closed on the cheese and did not return his greeting.", "\"What a charming creature she is!\" said the Fox. \"How her feathers shine! What a beautiful form and what splendid wings! Such a wonderful Bird should have a very lovely voice, since everything else about her is so perfect. Could she sing just one song, I know I should hail her Queen of Birds.\" Listening to these flattering words, the Crow forgot all her suspicion, and also her breakfast. She wanted very much to be called Queen of Birds.", "So she opened her beak wide to utter her loudest caw, and down fell the cheese straight into the Fox's open mouth. \"Thank you,\" said Master Fox sweetly, as he walked off. \"Though it is cracked, you have a voice sure enough. But where are your wits?\" The flatterer lives at the expense of those who will listen to him.", "The Ants and the Grasshopper. One bright day in late autumn a family of Ants were bustling about in the warm sunshine, drying out the grain they had stored up during the summer, when a starving Grasshopper, his fiddle under his arm, came up and humbly begged for a bite to eat. \"What!\" cried the Ants in surprise, \"haven't you stored anything away for the winter? What in the world were you doing all last summer?\"", "\"I didn't have time to store up any food,\" whined the Grasshopper; \"I was so busy making music that before I knew it the summer was gone.\" The Ants shrugged their shoulders in disgust. \"Making music, were you?\" they cried. \"Very well; now dance!\" And they turned their backs on the Grasshopper and went on with their work. There's a time for work and a time for play."], "shelf": "classic", "title": "Aesop's Fables"}, {"author": "Margery Williams", "band": "little", "color": "#C08497", "cover": "https://covers.openlibrary.org/b/id/11738076-L.jpg", "emo": "🐇", "find": [{"ask": "Can you find the Velveteen Rabbit?", "label": "the Velveteen Rabbit", "p": 1, "x": 503, "y": 319}, {"ask": "Can you find the Skin Horse?", "label": "the Skin Horse", "p": 6, "x": 753, "y": 562}, {"ask": "Can you find the wheelbarrow?", "label": "the wheelbarrow", "p": 14, "x": 575, "y": 708}, {"ask": "Can you find the Fairy?", "label": "the Fairy", "p": 35, "x": 615, "y": 540}, {"ask": "Can you find the wild rabbits?", "label": "the wild rabbits", "p": 37, "r": 200, "x": 773, "y": 389}], "id": "cls-velveteen-rabbit", "pages": ["THERE was once a velveteen rabbit, and in the beginning he was really splendid. He was fat and bunchy, as a rabbit should be; his coat was spotted brown and white, he had real thread whiskers, and his ears were lined with pink sateen. On Christmas morning, when he sat wedged in the top of the Boy's stocking, with a sprig of holly between his paws, the effect was charming.", "There were other things in the stocking, nuts and oranges and a toy engine, and chocolate almonds and a clockwork mouse, but the Rabbit was quite the best of all. For at least two hours the Boy loved him, and then Aunts and Uncles came to dinner, and there was a great rustling of tissue paper and unwrapping of parcels, and in the excitement of looking at all the new presents the Velveteen Rabbit was forgotten. Christmas Morning For a long time he lived in the toy cupboard or on the nursery floor, and no one thought very much about him.", "He was naturally shy, and being only made of velveteen, some of the more expensive toys quite snubbed him. The mechanical toys were very superior, and looked down upon every one else; they were full of modern ideas, and pretended they were real. The model boat, who had lived through two seasons and lost most of his paint, caught the tone from them and never missed an opportunity of referring to his rigging in technical terms.", "The Rabbit could not claim to be a model of anything, for he didn't know that real rabbits existed; he thought they were all stuffed with sawdust like himself, and he understood that sawdust was quite out-of-date and should never be mentioned in modern circles. Even Timothy, the jointed wooden lion, who was made by the disabled soldiers, and should have had broader views, put on airs and pretended he was connected with Government. Between them all the poor little Rabbit was made to feel himself very insignificant and commonplace, and the only person who was kind to him at all was the Skin Horse.", "The Skin Horse had lived longer in the nursery than any of the others. He was so old that his brown coat was bald in patches and showed the seams underneath, and most of the hairs in his tail had been pulled out to string bead necklaces. He was wise, for he had seen a long succession of mechanical toys arrive to boast and swagger, and by-and-by break their mainsprings and pass away, and he knew that they were only toys, and would never turn into anything else. For nursery magic is very strange and wonderful, and only those playthings that are old and wise and experienced like the Skin Horse understand all about it.", "\"What is REAL?\" asked the Rabbit one day, when they were lying side by side near the nursery fender, before Nana came to tidy the room. \"Does it mean having things that buzz inside you and a stick-out handle?\" \"Real isn't how you are made,\" said the Skin Horse. \"It's a thing that happens to you. When a child loves you for a long, long time, not just to play with, but REALLY loves you, then you become Real.\" \"Does it hurt?\" asked the Rabbit. \"Sometimes,\" said the Skin Horse, for he was always truthful. \"When you are Real you don't mind being hurt.\"", "\"Does it happen all at once, like being wound up,\" he asked, \"or bit by bit?\" \"It doesn't happen all at once,\" said the Skin Horse. \"You become. It takes a long time. That's why it doesn't happen often to people who break easily, or have sharp edges, or who have to be carefully kept. Generally, by the time you are Real, most of your hair has been loved off, and your eyes drop out and you get loose in the joints and very shabby. But these things don't matter at all, because once you are Real you can't be ugly, except to people who don't understand.\"", "\"I suppose you are real?\" said the Rabbit. And then he wished he had not said it, for he thought the Skin Horse might be sensitive. But the Skin Horse only smiled. The Skin Horse Tells His Story \"The Boy's Uncle made me Real,\" he said. \"That was a great many years ago; but once you are Real you can't become unreal again. It lasts for always.\"", "The Rabbit sighed. He thought it would be a long time before this magic called Real happened to him. He longed to become Real, to know what it felt like; and yet the idea of growing shabby and losing his eyes and whiskers was rather sad. He wished that he could become it without these uncomfortable things happening to him.", "There was a person called Nana who ruled the nursery. Sometimes she took no notice of the playthings lying about, and sometimes, for no reason whatever, she went swooping about like a great wind and hustled them away in cupboards. She called this \"tidying up,\" and the playthings all hated it, especially the tin ones. The Rabbit didn't mind it so much, for wherever he was thrown he came down soft.", "One evening, when the Boy was going to bed, he couldn't find the china dog that always slept with him. Nana was in a hurry, and it was too much trouble to hunt for china dogs at bedtime, so she simply looked about her, and seeing that the toy cupboard door stood open, she made a swoop. \"Here,\" she said, \"take your old Bunny! He'll do to sleep with you!\" And she dragged the Rabbit out by one ear, and put him into the Boy's arms.", "That night, and for many nights after, the Velveteen Rabbit slept in the Boy's bed. At first he found it rather uncomfortable, for the Boy hugged him very tight, and sometimes he rolled over on him, and sometimes he pushed him so far under the pillow that the Rabbit could scarcely breathe. And he missed, too, those long moonlight hours in the nursery, when all the house was silent, and his talks with the Skin Horse. But very soon he grew to like it, for the Boy used to talk to him, and made nice tunnels for him under the bedclothes that he said were like the burrows the real rabbits lived in. And they had splendid games together, in whispers, when Nana had gone away to her supper and left the night-light burning on the mantelpiece. And when the Boy dropped off to sleep, the Rabbit would snuggle down close under his little warm chin and dream, with the Boy's hands clasped close round him all night long.", "And so time went on, and the little Rabbit was very happy-so happy that he never noticed how his beautiful velveteen fur was getting shabbier and shabbier, and his tail becoming unsewn, and all the pink rubbed off his nose where the Boy had kissed him.", "Spring came, and they had long days in the garden, for wherever the Boy went the Rabbit went too. He had rides in the wheelbarrow, and picnics on the grass, and lovely fairy huts built for him under the raspberry canes behind the flower border. And once, when the Boy was called away suddenly to go out to tea, the Rabbit was left out on the lawn until long after dusk, and Nana had to come and look for him with the candle because the Boy couldn't go to sleep unless he was there. He was wet through with the dew and quite earthy from diving into the burrows the Boy had made for him in the flower bed, and Nana grumbled as she rubbed him off with a corner of her apron.", "Spring Time \"You must have your old Bunny!\" she said. \"Fancy all that fuss for a toy!\" The Boy sat up in bed and stretched out his hands. \"Give me my Bunny!\" he said. \"You mustn't say that. He isn't a toy. He's REAL!\" When the little Rabbit heard that he was happy, for he knew that what the Skin Horse had said was true at last. The nursery magic had happened to him, and he was a toy no longer. He was Real. The Boy himself had said it.", "That night he was almost too happy to sleep, and so much love stirred in his little sawdust heart that it almost burst. And into his boot-button eyes, that had long ago lost their polish, there came a look of wisdom and beauty, so that even Nana noticed it next morning when she picked him up, and said, \"I declare if that old Bunny hasn't got quite a knowing expression!\" That was a wonderful Summer!", "Near the house where they lived there was a wood, and in the long June evenings the Boy liked to go there after tea to play. He took the Velveteen Rabbit with him, and before he wandered off to pick flowers, or play at brigands among the trees, he always made the Rabbit a little nest somewhere among the bracken, where he would be quite cosy, for he was a kind-hearted little boy and he liked Bunny to be comfortable. One evening, while the Rabbit was lying there alone, watching the ants that ran to and fro between his velvet paws in the grass, he saw two strange beings creep out of the tall bracken near him.", "They were rabbits like himself, but quite furry and brand-new. They must have been very well made, for their seams didn't show at all, and they changed shape in a queer way when they moved; one minute they were long and thin and the next minute fat and bunchy, instead of always staying the same like he did. Their feet padded softly on the ground, and they crept quite close to him, twitching their noses, while the Rabbit stared hard to see which side the clockwork stuck out, for he knew that people who jump generally have something to wind them up. But he couldn't see it. They were evidently a new kind of rabbit altogether.", "Summer Days They stared at him, and the little Rabbit stared back. And all the time their noses twitched. \"Why don't you get up and play with us?\" one of them asked. \"I don't feel like it,\" said the Rabbit, for he didn't want to explain that he had no clockwork. \"Ho!\" said the furry rabbit. \"It's as easy as anything,\" And he gave a big hop sideways and stood on his hind legs. \"I don't believe you can!\" he said. \"I can!\" said the little Rabbit. \"I can jump higher than anything!\" He meant when the Boy threw him, but of course he didn't want to say so.", "\"Can you hop on your hind legs?\" asked the furry rabbit. That was a dreadful question, for the Velveteen Rabbit had no hind legs at all! The back of him was made all in one piece, like a pincushion. He sat still in the bracken, and hoped that the other rabbits wouldn't notice. \"I don't want to!\" he said again. But the wild rabbits have very sharp eyes. And this one stretched out his neck and looked. \"He hasn't got any hind legs!\" he called out. \"Fancy a rabbit without any hind legs!\" And he began to laugh.", "\"I have!\" cried the little Rabbit. \"I have got hind legs! I am sitting on them!\" \"Then stretch them out and show me, like this!\" said the wild rabbit. And he began to whirl round and dance, till the little Rabbit got quite dizzy. \"I don't like dancing,\" he said. \"I'd rather sit still!\" But all the while he was longing to dance, for a funny new tickly feeling ran through him, and he felt he would give anything in the world to be able to jump about like these rabbits did.", "The strange rabbit stopped dancing, and came quite close. He came so close this time that his long whiskers brushed the Velveteen Rabbit's ear, and then he wrinkled his nose suddenly and flattened his ears and jumped backwards. \"He doesn't smell right!\" he exclaimed. \"He isn't a rabbit at all! He isn't real!\" \"I am Real!\" said the little Rabbit. \"I am Real! The Boy said so!\" And he nearly began to cry. Just then there was a sound of footsteps, and the Boy ran past near them, and with a stamp of feet and a flash of white tails the two strange rabbits disappeared.", "\"Come back and play with me!\" called the little Rabbit. \"Oh, do come back! I know I am Real!\" But there was no answer, only the little ants ran to and fro, and the bracken swayed gently where the two strangers had passed. The Velveteen Rabbit was all alone. \"Oh, dear!\" he thought. \"Why did they run away like that? Why couldn't they stop and talk to me?\"", "For a long time he lay very still, watching the bracken, and hoping that they would come back. But they never returned, and presently the sun sank lower and the little white moths fluttered out, and the Boy came and carried him home.", "Weeks passed, and the little Rabbit grew very old and shabby, but the Boy loved him just as much. He loved him so hard that he loved all his whiskers off, and the pink lining to his ears turned grey, and his brown spots faded. He even began to lose his shape, and he scarcely looked like a rabbit any more, except to the Boy. To him he was always beautiful, and that was all that the little Rabbit cared about. He didn't mind how he looked to other people, because the nursery magic had made him Real, and when you are Real shabbiness doesn't matter.", "And then, one day, the Boy was ill. His face grew very flushed, and he talked in his sleep, and his little body was so hot that it burned the Rabbit when he held him close. Strange people came and went in the nursery, and a light burned all night and through it all the little Velveteen Rabbit lay there, hidden from sight under the bedclothes, and he never stirred, for he was afraid that if they found him some one might take him away, and he knew that the Boy needed him.", "It was a long weary time, for the Boy was too ill to play, and the little Rabbit found it rather dull with nothing to do all day long. But he snuggled down patiently, and looked forward to the time when the Boy should be well again, and they would go out in the garden amongst the flowers and the butterflies and play splendid games in the raspberry thicket like they used to. All sorts of delightful things he planned, and while the Boy lay half asleep he crept up close to the pillow and whispered them in his ear. And presently the fever turned, and the Boy got better. He was able to sit up in bed and look at picture-books, while the little Rabbit cuddled close at his side. And one day, they let him get up and dress.", "It was a bright, sunny morning, and the windows stood wide open. They had carried the Boy out on to the balcony, wrapped in a shawl, and the little Rabbit lay tangled up among the bedclothes, thinking. The Boy was going to the seaside to-morrow. Everything was arranged, and now it only remained to carry out the doctor's orders. They talked about it all, while the little Rabbit lay under the bedclothes, with just his head peeping out, and listened. The room was to be disinfected, and all the books and toys that the Boy had played with in bed must be burnt.", "\"Hurrah!\" thought the little Rabbit. \"To-morrow we shall go to the seaside!\" For the boy had often talked of the seaside, and he wanted very much to see the big waves coming in, and the tiny crabs, and the sand castles. Just then Nana caught sight of him. \"How about his old Bunny?\" she asked. \"That?\" said the doctor. \"Why, it's a mass of scarlet fever germs!-Burn it at once. What? Nonsense! Get him a new one. He mustn't have that any more!\" Anxious Times", "And so the little Rabbit was put into a sack with the old picture-books and a lot of rubbish, and carried out to the end of the garden behind the fowl-house. That was a fine place to make a bonfire, only the gardener was too busy just then to attend to it. He had the potatoes to dig and the green peas to gather, but next morning he promised to come quite early and burn the whole lot.", "That night the Boy slept in a different bedroom, and he had a new bunny to sleep with him. It was a splendid bunny, all white plush with real glass eyes, but the Boy was too excited to care very much about it. For to-morrow he was going to the seaside, and that in itself was such a wonderful thing that he could think of nothing else. And while the Boy was asleep, dreaming of the seaside, the little Rabbit lay among the old picture-books in the corner behind the fowl-house, and he felt very lonely.", "The sack had been left untied, and so by wriggling a bit he was able to get his head through the opening and look out. He was shivering a little, for he had always been used to sleeping in a proper bed, and by this time his coat had worn so thin and threadbare from hugging that it was no longer any protection to him. Near by he could see the thicket of raspberry canes, growing tall and close like a tropical jungle, in whose shadow he had played with the Boy on bygone mornings.", "He thought of those long sunlit hours in the garden-how happy they were-and a great sadness came over him. He seemed to see them all pass before him, each more beautiful than the other, the fairy huts in the flower-bed, the quiet evenings in the wood when he lay in the bracken and the little ants ran over his paws; the wonderful day when he first knew that he was Real. He thought of the Skin Horse, so wise and gentle, and all that he had told him. Of what use was it to be loved and lose one's beauty and become Real if it all ended like this?", "And a tear, a real tear, trickled down his little shabby velvet nose and fell to the ground. And then a strange thing happened. For where the tear had fallen a flower grew out of the ground, a mysterious flower, not at all like any that grew in the garden. It had slender green leaves the colour of emeralds, and in the centre of the leaves a blossom like a golden cup. It was so beautiful that the little Rabbit forgot to cry, and just lay there watching it. And presently the blossom opened, and out of it there stepped a fairy.", "She was quite the loveliest fairy in the whole world. Her dress was of pearl and dew-drops, and there were flowers round her neck and in her hair, and her face was like the most perfect flower of all. And she came close to the little Rabbit and gathered him up in her arms and kissed him on his velveteen nose that was all damp from crying. \"Little Rabbit,\" she said, \"don't you know who I am?\" The Rabbit looked up at her, and it seemed to him that he had seen her face before, but he couldn't think where.", "\"I am the nursery magic Fairy,\" she said. \"I take care of all the playthings that the children have loved. When they are old and worn out and the children don't need them any more, then I come and take them away with me and turn them into Real.\" \"Wasn't I Real before?\" asked the little Rabbit. \"You were Real to the Boy,\" the Fairy said, \"because he loved you. Now you shall be Real to every one.\" The Fairy Flower And she held the little Rabbit close in her arms and flew with him into the wood.", "It was light now, for the moon had risen. All the forest was beautiful, and the fronds of the bracken shone like frosted silver. In the open glade between the tree-trunks the wild rabbits danced with their shadows on the velvet grass, but when they saw the Fairy they all stopped dancing and stood round in a ring to stare at her. \"I've brought you a new playfellow,\" the Fairy said. \"You must be very kind to him and teach him all he needs to know in Rabbit-land, for he is going to live with you for ever and ever!\"", "And she kissed the little Rabbit again and put him down on the grass. \"Run and play, little Rabbit!\" she said.", "But the little Rabbit sat quite still for a moment and never moved. For when he saw all the wild rabbits dancing around him he suddenly remembered about his hind legs, and he didn't want them to see that he was made all in one piece. He did not know that when the Fairy kissed him that last time she had changed him altogether. And he might have sat there a long time, too shy to move, if just then something hadn't tickled his nose, and before he thought what he was doing he lifted his hind toe to scratch it.", "And he found that he actually had hind legs! Instead of dingy velveteen he had brown fur, soft and shiny, his ears twitched by themselves, and his whiskers were so long that they brushed the grass. He gave one leap and the joy of using those hind legs was so great that he went springing about the turf on them, jumping sideways and whirling round as the others did, and he grew so excited that when at last he did stop to look for the Fairy she had gone. He was a Real Rabbit at last, at home with the other rabbits. At Last! At Last!", "Autumn passed and Winter, and in the Spring, when the days grew warm and sunny, the Boy went out to play in the wood behind the house. And while he was playing, two rabbits crept out from the bracken and peeped at him. One of them was brown all over, but the other had strange markings under his fur, as though long ago he had been spotted, and the spots still showed through. And about his little soft nose and his round black eyes there was something familiar, so that the Boy thought to himself:", "\"Why, he looks just like my old Bunny that was lost when I had scarlet fever!\" But he never knew that it really was his own Bunny, come back to look at the child who had first helped him to be Real."], "shelf": "classic", "title": "The Velveteen Rabbit"}, {"author": "Joseph Jacobs", "band": "little", "color": "#F2CC8F", "cover": "https://covers.openlibrary.org/b/id/13007868-L.jpg", "emo": "🐷", "find": [{"ask": "Can you find the bundle of straw?", "label": "the bundle of straw", "p": 2, "x": 832, "y": 585}, {"ask": "Can you find the brick house?", "label": "the brick house", "p": 7, "x": 518, "y": 459}, {"ask": "Can you find the apple tree?", "label": "the apple tree", "p": 13, "x": 512, "y": 376}, {"ask": "Can you find the butter churn?", "label": "the butter churn", "p": 17, "x": 672, "y": 360}, {"ask": "Can you find the big pot?", "label": "the big pot", "p": 20, "x": 795, "y": 579}], "id": "cls-three-pigs", "pages": ["Once upon a time when pigs spoke rhyme And monkeys chewed tobacco, And hens took snuff to make them tough, And ducks went quack, quack, quack, O!", "There was an old sow with three little pigs, and as she had not enough to keep them, she sent them out to seek their fortune. The first that went off met a man with a bundle of straw, and said to him: “Please, man, give me that straw to build me a house.”", "Which the man did, and the little pig built a house with it. Presently came along a wolf, and knocked at the door, and said: “Little pig, little pig, let me come in.” To which the pig answered: “No, no, by the hair of my chiny chin chin.” The wolf then answered to that:", "“Then I'll huff, and I'll puff, and I'll blow your house in.” So he huffed, and he puffed, and he blew his house in, and ate up the little pig. The second little pig met a man with a bundle of furze, and said: “Please, man, give me that furze to build a house.”", "Which the man did, and the pig built his house. Then along came the wolf, and said: “Little pig, little pig, let me come in.” “No, no, by the hair of my chiny chin chin.” “Then I'll puff, and I'll huff, and I'll blow your house in.”", "So he huffed, and he puffed, and he puffed, and he huffed, and at last he blew the house down, and he ate up the little pig. The third little pig met a man with a load of bricks, and said: “Please, man, give me those bricks to build a house with.”", "So the man gave him the bricks, and he built his house with them. So the wolf came, as he did to the other little pigs, and said: “Little pig, little pig, let me come in.” “No, no, by the hair of my chiny chin chin.” “Then I'll huff, and I'll puff, and I'll blow your house in.”", "Well, he huffed, and he puffed, and he huffed and he puffed, and he puffed and huffed; but he could not get the house down. When he found that he could not, with all his huffing and puffing, blow the house down, he said: “Little pig, I know where there is a nice field of turnips.”", "“Where?” said the little pig. “Oh, in Mr. Smith's Home-field, and if you will be ready tomorrow morning I will call for you, and we will go together, and get some for dinner.” “Very well,” said the little pig, “I will be ready. What time do you mean to go?” “Oh, at six o'clock.”", "Well, the little pig got up at five, and got the turnips before the wolf came (which he did about six) and who said: “Little Pig, are you ready?” The little pig said: “Ready! I have been and come back again, and got a nice potful for dinner.”", "The wolf felt very angry at this, but thought that he would be up to the little pig somehow or other, so he said: “Little pig, I know where there is a nice apple-tree.” “Where?” said the pig.", "“Down at Merry-garden,” replied the wolf, “and if you will not deceive me I will come for you, at five o'clock tomorrow and get some apples.”", "Well, the little pig bustled up the next morning at four o'clock, and went off for the apples, hoping to get back before the wolf came; but he had further to go, and had to climb the tree, so that just as he was coming down from it, he saw the wolf coming, which, as you may suppose, frightened him very much. When the wolf came up he said:", "“Little pig, what! are you here before me? Are they nice apples?” “Yes, very,” said the little pig. “I will throw you down one.”", "And he threw it so far, that, while the wolf was gone to pick it up, the little pig jumped down and ran home. The next day the wolf came again, and said to the little pig: “Little pig, there is a fair at Shanklin this afternoon, will you go?”", "“Oh yes,” said the pig, “I will go; what time shall you be ready?” “At three,” said the wolf. So the little pig went off before the time as usual, and got to the fair, and bought a butter-churn, which he was going home with, when he saw the wolf coming. Then he could not tell what to do.", "So he got into the churn to hide, and by so doing turned it round, and it rolled down the hill with the pig in it, which frightened the wolf so much, that he ran home without going to the fair.", "He went to the little pig's house, and told him how frightened he had been by a great round thing which came down the hill past him. Then the little pig said:", "“Hah, I frightened you, then. I had been to the fair and bought a butter-churn, and when I saw you, I got into it, and rolled down the hill.”", "Then the wolf was very angry indeed, and declared he would eat up the little pig, and that he would get down the chimney after him. When the little pig saw what he was about, he hung on the pot full of water, and made up a blazing fire, and, just as the wolf was coming down, took off the cover, and in fell the wolf; so the little pig put on the cover again in an instant, boiled him up, and ate him for supper, and lived happy ever afterwards."], "shelf": "classic", "title": "The Three Little Pigs"}, {"author": "Hans Christian Andersen", "band": "teen", "color": "#9B5DE5", "cover": "https://covers.openlibrary.org/b/id/1363457-L.jpg", "emo": "👑", "id": "cls-emperors-clothes", "narrate": true, "pages": ["Many years ago, there was an Emperor, who was so excessively fond of new clothes, that he spent all his money in dress. He did not trouble himself in the least about his soldiers; nor did he care to go either to the theatre or the chase, except for the opportunities then afforded him for displaying his new clothes. He had a different suit for each hour of the day; and as of any other king or emperor, one is accustomed to say, “he is sitting in council,” it was always said of him, “The Emperor is sitting in his wardrobe.”", "Time passed merrily in the large town which was his capital; strangers arrived every day at the court. One day, two rogues, calling themselves weavers, made their appearance. They gave out that they knew how to weave stuffs of the most beautiful colors and elaborate patterns, the clothes manufactured from which should have the wonderful property of remaining invisible to everyone who was unfit for the office he held, or who was extraordinarily simple in character. “These must, indeed, be splendid clothes!” thought the Emperor. “Had I such a suit, I might at once find out what men in my realms are unfit for their office, and also be able to distinguish the wise from the foolish! This stuff must be woven for me immediately.” And he caused large sums of money to be given to both the weavers in order that they might begin their work directly.", "So the two pretended weavers set up two looms, and affected to work very busily, though in reality they did nothing at all. They asked for the most delicate silk and the purest gold thread; put both into their own knapsacks; and then continued their pretended work at the empty looms until late at night.", "“I should like to know how the weavers are getting on with my cloth,” said the Emperor to himself, after some little time had elapsed; he was, however, rather embarrassed, when he remembered that a simpleton, or one unfit for his office, would be unable to see the manufacture. To be sure, he thought he had nothing to risk in his own person; but yet, he would prefer sending somebody else, to bring him intelligence about the weavers, and their work, before he troubled himself in the affair. All the people throughout the city had heard of the wonderful property the cloth was to possess; and all were anxious to learn how wise, or how ignorant, their neighbors might prove to be.", "“I will send my faithful old minister to the weavers,” said the Emperor at last, after some deliberation, “he will be best able to see how the cloth looks; for he is a man of sense, and no one can be more suitable for his office than he is.” So the faithful old minister went into the hall, where the knaves were working with all their might, at their empty looms. “What can be the meaning of this?” thought the old man, opening his eyes very wide. “I cannot discover the least bit of thread on the looms.” However, he did not express his thoughts aloud.", "The impostors requested him very courteously to be so good as to come nearer their looms; and then asked him whether the design pleased him, and whether the colors were not very beautiful; at the same time pointing to the empty frames. The poor old minister looked and looked, he could not discover anything on the looms, for a very good reason, viz: there was nothing there. “What!” thought he again. “Is it possible that I am a simpleton? I have never thought so myself; and no one must know it now if I am so. Can it be, that I am unfit for my office? No, that must not be said either. I will never confess that I could not see the stuff.” “Well, Sir Minister!” said one of the knaves, still pretending to work. “You do not say whether the stuff pleases you.”", "“Oh, it is excellent!” replied the old minister, looking at the loom through his spectacles. “This pattern, and the colors, yes, I will tell the Emperor without delay, how very beautiful I think them.” “We shall be much obliged to you,” said the impostors, and then they named the different colors and described the pattern of the pretended stuff. The old minister listened attentively to their words, in order that he might repeat them to the Emperor; and then the knaves asked for more silk and gold, saying that it was necessary to complete what they had begun. However, they put all that was given them into their knapsacks; and continued to work with as much apparent diligence as before at their empty looms.", "The Emperor now sent another officer of his court to see how the men were getting on, and to ascertain whether the cloth would soon be ready. It was just the same with this gentleman as with the minister; he surveyed the looms on all sides, but could see nothing at all but the empty frames. “Does not the stuff appear as beautiful to you, as it did to my lord the minister?” asked the impostors of the Emperor's second ambassador; at the same time making the same gestures as before, and talking of the design and colors which were not there.", "“I certainly am not stupid!” thought the messenger. “It must be, that I am not fit for my good, profitable office! That is very odd; however, no one shall know anything about it.” And accordingly he praised the stuff he could not see, and declared that he was delighted with both colors and patterns. “Indeed, please your Imperial Majesty,” said he to his sovereign when he returned, “the cloth which the weavers are preparing is extraordinarily magnificent.” The whole city was talking of the splendid cloth which the Emperor had ordered to be woven at his own expense.", "And now the Emperor himself wished to see the costly manufacture, while it was still in the loom. Accompanied by a select number of officers of the court, among whom were the two honest men who had already admired the cloth, he went to the crafty impostors, who, as soon as they were aware of the Emperor's approach, went on working more diligently than ever; although they still did not pass a single thread through the looms. “Is not the work absolutely magnificent?” said the two officers of the crown, already mentioned. “If your Majesty will only be pleased to look at it! What a splendid design! What glorious colors!” and at the same time they pointed to the empty frames; for they imagined that everyone else could see this exquisite piece of workmanship.", "“How is this?” said the Emperor to himself. “I can see nothing! This is indeed a terrible affair! Am I a simpleton, or am I unfit to be an Emperor? That would be the worst thing that could happen--Oh! the cloth is charming,” said he, aloud. “It has my complete approbation.” And he smiled most graciously, and looked closely at the empty looms; for on no account would he say that he could not see what two of the officers of his court had praised so much. All his retinue now strained their eyes, hoping to discover something on the looms, but they could see no more than the others; nevertheless, they all exclaimed, “Oh, how beautiful!” and advised his majesty to have some new clothes made from this splendid material, for the approaching procession. “Magnificent! Charming! Excellent!” resounded on all sides; and everyone was uncommonly gay. The Emperor shared in the general satisfaction; and presented the impostors with the riband of an order of knighthood, to be worn in their button-holes, and the title of “Gentlemen Weavers.”", "The rogues sat up the whole of the night before the day on which the procession was to take place, and had sixteen lights burning, so that everyone might see how anxious they were to finish the Emperor's new suit. They pretended to roll the cloth off the looms; cut the air with their scissors; and sewed with needles without any thread in them. “See!” cried they, at last. “The Emperor's new clothes are ready!”", "And now the Emperor, with all the grandees of his court, came to the weavers; and the rogues raised their arms, as if in the act of holding something up, saying, “Here are your Majesty's trousers! Here is the scarf! Here is the mantle! The whole suit is as light as a cobweb; one might fancy one has nothing at all on, when dressed in it; that, however, is the great virtue of this delicate cloth.” “Yes indeed!” said all the courtiers, although not one of them could see anything of this exquisite manufacture. “If your Imperial Majesty will be graciously pleased to take off your clothes, we will fit on the new suit, in front of the looking glass.” The Emperor was accordingly undressed, and the rogues pretended to array him in his new suit; the Emperor turning round, from side to side, before the looking glass.", "“How splendid his Majesty looks in his new clothes, and how well they fit!” everyone cried out. “What a design! What colors! These are indeed royal robes!” “The canopy which is to be borne over your Majesty, in the procession, is waiting,” announced the chief master of the ceremonies. “I am quite ready,” answered the Emperor. “Do my new clothes fit well?” asked he, turning himself round again before the looking glass, in order that he might appear to be examining his handsome suit. The lords of the bedchamber, who were to carry his Majesty's train felt about on the ground, as if they were lifting up the ends of the mantle; and pretended to be carrying something; for they would by no means betray anything like simplicity, or unfitness for their office.", "So now the Emperor walked under his high canopy in the midst of the procession, through the streets of his capital; and all the people standing by, and those at the windows, cried out, “Oh! How beautiful are our Emperor's new clothes! What a magnificent train there is to the mantle; and how gracefully the scarf hangs!” in short, no one would allow that he could not see these much-admired clothes; because, in doing so, he would have declared himself either a simpleton or unfit for his office. Certainly, none of the Emperor's various suits, had ever made so great an impression, as these invisible ones. “But the Emperor has nothing at all on!” said a little child. “Listen to the voice of innocence!” exclaimed his father; and what the child had said was whispered from one to another.", "“But he has nothing at all on!” at last cried out all the people. The Emperor was vexed, for he knew that the people were right; but he thought the procession must go on now! And the lords of the bedchamber took greater pains than ever, to appear holding up a train, although, in reality, there was no train to hold."], "shelf": "classic", "title": "The Emperor's New Clothes"}, {"author": "Brothers Grimm", "band": "teen", "color": "#606C38", "cover": "https://covers.openlibrary.org/b/id/1957864-L.jpg", "emo": "🐸", "id": "cls-frog-prince", "narrate": true, "pages": ["One fine evening a young princess put on her bonnet and clogs, and went out to take a walk by herself in a wood; and when she came to a cool spring of water, that rose in the midst of it, she sat herself down to rest a while. Now she had a golden ball in her hand, which was her favourite plaything; and she was always tossing it up into the air, and catching it again as it fell. After a time she threw it up so high that she missed catching it as it fell; and the ball bounded away, and rolled along upon the ground, till at last it fell down into the spring. The princess looked into the spring after her ball, but it was very deep, so deep that she could not see the bottom of it. Then she began to bewail her loss, and said, ‘Alas! if I could only get my ball again, I would give all my fine clothes and jewels, and everything that I have in the world.’", "Whilst she was speaking, a frog put its head out of the water, and said, ‘Princess, why do you weep so bitterly?’ ‘Alas!’ said she, ‘what can you do for me, you nasty frog? My golden ball has fallen into the spring.’ The frog said, ‘I want not your pearls, and jewels, and fine clothes; but if you will love me, and let me live with you and eat from off your golden plate, and sleep upon your bed, I will bring you your ball again.’ ‘What nonsense,’ thought the princess, ‘this silly frog is talking!", "He can never even get out of the spring to visit me, though he may be able to get my ball for me, and therefore I will tell him he shall have what he asks.’ So she said to the frog, ‘Well, if you will bring me my ball, I will do all you ask.’ Then the frog put his head down, and dived deep under the water; and after a little while he came up again, with the ball in his mouth, and threw it on the edge of the spring. As soon as the young princess saw her ball, she ran to pick it up; and she was so overjoyed to have it in her hand again, that she never thought of the frog, but ran home with it as fast as she could.", "The frog called after her, ‘Stay, princess, and take me with you as you said,’ But she did not stop to hear a word. The next day, just as the princess had sat down to dinner, she heard a strange noise--tap, tap--plash, plash--as if something was coming up the marble staircase: and soon afterwards there was a gentle knock at the door, and a little voice cried out and said: ‘Open the door, my princess dear, Open the door to thy true love here! And mind the words that thou and I said By the fountain cool, in the greenwood shade.’", "Then the princess ran to the door and opened it, and there she saw the frog, whom she had quite forgotten. At this sight she was sadly frightened, and shutting the door as fast as she could came back to her seat. The king, her father, seeing that something had frightened her, asked her what was the matter. ‘There is a nasty frog,’ said she, ‘at the door, that lifted my ball for me out of the spring this morning: I told him that he should live with me here, thinking that he could never get out of the spring; but there he is at the door, and he wants to come in.’ While she was speaking the frog knocked again at the door, and said:", "‘Open the door, my princess dear, Open the door to thy true love here! And mind the words that thou and I said By the fountain cool, in the greenwood shade.’", "Then the king said to the young princess, ‘As you have given your word you must keep it; so go and let him in.’ She did so, and the frog hopped into the room, and then straight on--tap, tap--plash, plash--from the bottom of the room to the top, till he came up close to the table where the princess sat. ‘Pray lift me upon chair,’ said he to the princess, ‘and let me sit next to you.’ As soon as she had done this, the frog said, ‘Put your plate nearer to me, that I may eat out of it.’ This she did, and when he had eaten as much as he could, he said, ‘Now I am tired; carry me upstairs, and put me into your bed.’ And the princess, though very unwilling, took him up in her hand, and put him upon the pillow of her own bed, where he slept all night long. As soon as it was light he jumped up, hopped downstairs, and went out of the house. ‘Now, then,’ thought the princess, ‘at last he is gone, and I shall be troubled with him no more.’", "But she was mistaken; for when night came again she heard the same tapping at the door; and the frog came once more, and said: ‘Open the door, my princess dear, Open the door to thy true love here! And mind the words that thou and I said By the fountain cool, in the greenwood shade.’ And when the princess opened the door the frog came in, and slept upon her pillow as before, till the morning broke. And the third night he did the same. But when the princess awoke on the following morning she was astonished to see, instead of the frog, a handsome prince, gazing on her with the most beautiful eyes she had ever seen, and standing at the head of her bed.", "He told her that he had been enchanted by a spiteful fairy, who had changed him into a frog; and that he had been fated so to abide till some princess should take him out of the spring, and let him eat from her plate, and sleep upon her bed for three nights. ‘You,’ said the prince, ‘have broken his cruel charm, and now I have nothing to wish for but that you should go with me into my father’s kingdom, where I will marry you, and love you as long as you live.’", "The young princess, you may be sure, was not long in saying ‘Yes’ to all this; and as they spoke a gay coach drove up, with eight beautiful horses, decked with plumes of feathers and a golden harness; and behind the coach rode the prince’s servant, faithful Heinrich, who had bewailed the misfortunes of his dear master during his enchantment so long and so bitterly, that his heart had well-nigh burst. They then took leave of the king, and got into the coach with eight horses, and all set out, full of joy and merriment, for the prince’s kingdom, which they reached safely; and there they lived happily a great many years."], "shelf": "classic", "title": "The Frog Prince"}, {"author": "Oscar Wilde", "band": "teen", "color": "#3D405B", "cover": "https://covers.openlibrary.org/b/id/10608467-L.jpg", "emo": "🕊️", "id": "cls-happy-prince", "narrate": true, "pages": ["High above the city, on a tall column, stood the statue of the Happy Prince. He was gilded all over with thin leaves of fine gold, for eyes he had two bright sapphires, and a large red ruby glowed on his sword-hilt. He was very much admired indeed. “He is as beautiful as a weathercock,” remarked one of the Town Councillors who wished to gain a reputation for having artistic tastes; “only not quite so useful,” he added, fearing lest people should think him unpractical, which he really was not. “Why can’t you be like the Happy Prince?” asked a sensible mother of her little boy who was crying for the moon. “The Happy Prince never dreams of crying for anything.” “I am glad there is some one in the world who is quite happy,” muttered a disappointed man as he gazed at the wonderful statue.", "“He looks just like an angel,” said the Charity Children as they came out of the cathedral in their bright scarlet cloaks and their clean white pinafores. “How do you know?” said the Mathematical Master, “you have never seen one.” “Ah! but we have, in our dreams,” answered the children; and the Mathematical Master frowned and looked very severe, for he did not approve of children dreaming. One night there flew over the city a little Swallow. His friends had gone away to Egypt six weeks before, but he had stayed behind, for he was in love with the most beautiful Reed. He had met her early in the spring as he was flying down the river after a big yellow moth, and had been so attracted by her slender waist that he had stopped to talk to her.", "“Shall I love you?” said the Swallow, who liked to come to the point at once, and the Reed made him a low bow. So he flew round and round her, touching the water with his wings, and making silver ripples. This was his courtship, and it lasted all through the summer. “It is a ridiculous attachment,” twittered the other Swallows; “she has no money, and far too many relations”; and indeed the river was quite full of Reeds. Then, when the autumn came they all flew away.", "After they had gone he felt lonely, and began to tire of his lady-love. “She has no conversation,” he said, “and I am afraid that she is a coquette, for she is always flirting with the wind.” And certainly, whenever the wind blew, the Reed made the most graceful curtseys. “I admit that she is domestic,” he continued, “but I love travelling, and my wife, consequently, should love travelling also.” “Will you come away with me?” he said finally to her; but the Reed shook her head, she was so attached to her home. “You have been trifling with me,” he cried. “I am off to the Pyramids. Good-bye!” and he flew away. All day long he flew, and at night-time he arrived at the city. “Where shall I put up?” he said; “I hope the town has made preparations.” Then he saw the statue on the tall column.", "“I will put up there,” he cried; “it is a fine position, with plenty of fresh air.” So he alighted just between the feet of the Happy Prince. “I have a golden bedroom,” he said softly to himself as he looked round, and he prepared to go to sleep; but just as he was putting his head under his wing a large drop of water fell on him. “What a curious thing!” he cried; “there is not a single cloud in the sky, the stars are quite clear and bright, and yet it is raining. The climate in the north of Europe is really dreadful. The Reed used to like the rain, but that was merely her selfishness.” Then another drop fell.", "“What is the use of a statue if it cannot keep the rain off?” he said; “I must look for a good chimney-pot,” and he determined to fly away. But before he had opened his wings, a third drop fell, and he looked up, and saw—Ah! what did he see? The eyes of the Happy Prince were filled with tears, and tears were running down his golden cheeks. His face was so beautiful in the moonlight that the little Swallow was filled with pity. “Who are you?” he said. “I am the Happy Prince.” “Why are you weeping then?” asked the Swallow; “you have quite drenched me.”", "“When I was alive and had a human heart,” answered the statue, “I did not know what tears were, for I lived in the Palace of Sans-Souci, where sorrow is not allowed to enter. In the daytime I played with my companions in the garden, and in the evening I led the dance in the Great Hall. Round the garden ran a very lofty wall, but I never cared to ask what lay beyond it, everything about me was so beautiful. My courtiers called me the Happy Prince, and happy indeed I was, if pleasure be happiness. So I lived, and so I died. And now that I am dead they have set me up here so high that I can see all the ugliness and all the misery of my city, and though my heart is made of lead yet I cannot chose but weep.”", "“What! is he not solid gold?” said the Swallow to himself. He was too polite to make any personal remarks out loud.", "“Far away,” continued the statue in a low musical voice, “far away in a little street there is a poor house. One of the windows is open, and through it I can see a woman seated at a table. Her face is thin and worn, and she has coarse, red hands, all pricked by the needle, for she is a seamstress. She is embroidering passion-flowers on a satin gown for the loveliest of the Queen’s maids-of-honour to wear at the next Court-ball. In a bed in the corner of the room her little boy is lying ill. He has a fever, and is asking for oranges. His mother has nothing to give him but river water, so he is crying. Swallow, Swallow, little Swallow, will you not bring her the ruby out of my sword-hilt? My feet are fastened to this pedestal and I cannot move.”", "“I am waited for in Egypt,” said the Swallow. “My friends are flying up and down the Nile, and talking to the large lotus-flowers. Soon they will go to sleep in the tomb of the great King. The King is there himself in his painted coffin. He is wrapped in yellow linen, and embalmed with spices. Round his neck is a chain of pale green jade, and his hands are like withered leaves.” “Swallow, Swallow, little Swallow,” said the Prince, “will you not stay with me for one night, and be my messenger? The boy is so thirsty, and the mother so sad.”", "“I don’t think I like boys,” answered the Swallow. “Last summer, when I was staying on the river, there were two rude boys, the miller’s sons, who were always throwing stones at me. They never hit me, of course; we swallows fly far too well for that, and besides, I come of a family famous for its agility; but still, it was a mark of disrespect.” But the Happy Prince looked so sad that the little Swallow was sorry. “It is very cold here,” he said; “but I will stay with you for one night, and be your messenger.” “Thank you, little Swallow,” said the Prince. So the Swallow picked out the great ruby from the Prince’s sword, and flew away with it in his beak over the roofs of the town.", "He passed by the cathedral tower, where the white marble angels were sculptured. He passed by the palace and heard the sound of dancing. A beautiful girl came out on the balcony with her lover. “How wonderful the stars are,” he said to her, “and how wonderful is the power of love!” “I hope my dress will be ready in time for the State-ball,” she answered; “I have ordered passion-flowers to be embroidered on it; but the seamstresses are so lazy.”", "He passed over the river, and saw the lanterns hanging to the masts of the ships. He passed over the Ghetto, and saw the old Jews bargaining with each other, and weighing out money in copper scales. At last he came to the poor house and looked in. The boy was tossing feverishly on his bed, and the mother had fallen asleep, she was so tired. In he hopped, and laid the great ruby on the table beside the woman’s thimble. Then he flew gently round the bed, fanning the boy’s forehead with his wings. “How cool I feel,” said the boy, “I must be getting better”; and he sank into a delicious slumber. Then the Swallow flew back to the Happy Prince, and told him what he had done. “It is curious,” he remarked, “but I feel quite warm now, although it is so cold.”", "“That is because you have done a good action,” said the Prince. And the little Swallow began to think, and then he fell asleep. Thinking always made him sleepy. When day broke he flew down to the river and had a bath. “What a remarkable phenomenon,” said the Professor of Ornithology as he was passing over the bridge. “A swallow in winter!” And he wrote a long letter about it to the local newspaper. Every one quoted it, it was full of so many words that they could not understand. “To-night I go to Egypt,” said the Swallow, and he was in high spirits at the prospect. He visited all the public monuments, and sat a long time on top of the church steeple. Wherever he went the Sparrows chirruped, and said to each other, “What a distinguished stranger!” so he enjoyed himself very much.", "When the moon rose he flew back to the Happy Prince. “Have you any commissions for Egypt?” he cried; “I am just starting.” “Swallow, Swallow, little Swallow,” said the Prince, “will you not stay with me one night longer?” “I am waited for in Egypt,” answered the Swallow. “To-morrow my friends will fly up to the Second Cataract. The river-horse couches there among the bulrushes, and on a great granite throne sits the God Memnon. All night long he watches the stars, and when the morning star shines he utters one cry of joy, and then he is silent. At noon the yellow lions come down to the water’s edge to drink. They have eyes like green beryls, and their roar is louder than the roar of the cataract.”", "“Swallow, Swallow, little Swallow,” said the Prince, “far away across the city I see a young man in a garret. He is leaning over a desk covered with papers, and in a tumbler by his side there is a bunch of withered violets. His hair is brown and crisp, and his lips are red as a pomegranate, and he has large and dreamy eyes. He is trying to finish a play for the Director of the Theatre, but he is too cold to write any more. There is no fire in the grate, and hunger has made him faint.” “I will wait with you one night longer,” said the Swallow, who really had a good heart. “Shall I take him another ruby?”", "“Alas! I have no ruby now,” said the Prince; “my eyes are all that I have left. They are made of rare sapphires, which were brought out of India a thousand years ago. Pluck out one of them and take it to him. He will sell it to the jeweller, and buy food and firewood, and finish his play.” “Dear Prince,” said the Swallow, “I cannot do that”; and he began to weep. “Swallow, Swallow, little Swallow,” said the Prince, “do as I command you.”", "So the Swallow plucked out the Prince’s eye, and flew away to the student’s garret. It was easy enough to get in, as there was a hole in the roof. Through this he darted, and came into the room. The young man had his head buried in his hands, so he did not hear the flutter of the bird’s wings, and when he looked up he found the beautiful sapphire lying on the withered violets. “I am beginning to be appreciated,” he cried; “this is from some great admirer. Now I can finish my play,” and he looked quite happy.", "The next day the Swallow flew down to the harbour. He sat on the mast of a large vessel and watched the sailors hauling big chests out of the hold with ropes. “Heave a-hoy!” they shouted as each chest came up. “I am going to Egypt”! cried the Swallow, but nobody minded, and when the moon rose he flew back to the Happy Prince. “I am come to bid you good-bye,” he cried. “Swallow, Swallow, little Swallow,” said the Prince, “will you not stay with me one night longer?”", "“It is winter,” answered the Swallow, “and the chill snow will soon be here. In Egypt the sun is warm on the green palm-trees, and the crocodiles lie in the mud and look lazily about them. My companions are building a nest in the Temple of Baalbec, and the pink and white doves are watching them, and cooing to each other. Dear Prince, I must leave you, but I will never forget you, and next spring I will bring you back two beautiful jewels in place of those you have given away. The ruby shall be redder than a red rose, and the sapphire shall be as blue as the great sea.”", "“In the square below,” said the Happy Prince, “there stands a little match-girl. She has let her matches fall in the gutter, and they are all spoiled. Her father will beat her if she does not bring home some money, and she is crying. She has no shoes or stockings, and her little head is bare. Pluck out my other eye, and give it to her, and her father will not beat her.” “I will stay with you one night longer,” said the Swallow, “but I cannot pluck out your eye. You would be quite blind then.” “Swallow, Swallow, little Swallow,” said the Prince, “do as I command you.”", "So he plucked out the Prince’s other eye, and darted down with it. He swooped past the match-girl, and slipped the jewel into the palm of her hand. “What a lovely bit of glass,” cried the little girl; and she ran home, laughing. Then the Swallow came back to the Prince. “You are blind now,” he said, “so I will stay with you always.” “No, little Swallow,” said the poor Prince, “you must go away to Egypt.” “I will stay with you always,” said the Swallow, and he slept at the Prince’s feet.", "All the next day he sat on the Prince’s shoulder, and told him stories of what he had seen in strange lands. He told him of the red ibises, who stand in long rows on the banks of the Nile, and catch gold-fish in their beaks; of the Sphinx, who is as old as the world itself, and lives in the desert, and knows everything; of the merchants, who walk slowly by the side of their camels, and carry amber beads in their hands; of the King of the Mountains of the Moon, who is as black as ebony, and worships a large crystal; of the great green snake that sleeps in a palm-tree, and has twenty priests to feed it with honey-cakes; and of the pygmies who sail over a big lake on large flat leaves, and are always at war with the butterflies.", "“Dear little Swallow,” said the Prince, “you tell me of marvellous things, but more marvellous than anything is the suffering of men and of women. There is no Mystery so great as Misery. Fly over my city, little Swallow, and tell me what you see there.” So the Swallow flew over the great city, and saw the rich making merry in their beautiful houses, while the beggars were sitting at the gates. He flew into dark lanes, and saw the white faces of starving children looking out listlessly at the black streets. Under the archway of a bridge two little boys were lying in one another’s arms to try and keep themselves warm. “How hungry we are!” they said. “You must not lie here,” shouted the Watchman, and they wandered out into the rain. Then he flew back and told the Prince what he had seen.", "“I am covered with fine gold,” said the Prince, “you must take it off, leaf by leaf, and give it to my poor; the living always think that gold can make them happy.” Leaf after leaf of the fine gold the Swallow picked off, till the Happy Prince looked quite dull and grey. Leaf after leaf of the fine gold he brought to the poor, and the children’s faces grew rosier, and they laughed and played games in the street. “We have bread now!” they cried. Then the snow came, and after the snow came the frost. The streets looked as if they were made of silver, they were so bright and glistening; long icicles like crystal daggers hung down from the eaves of the houses, everybody went about in furs, and the little boys wore scarlet caps and skated on the ice.", "The poor little Swallow grew colder and colder, but he would not leave the Prince, he loved him too well. He picked up crumbs outside the baker’s door when the baker was not looking and tried to keep himself warm by flapping his wings. But at last he knew that he was going to die. He had just strength to fly up to the Prince’s shoulder once more. “Good-bye, dear Prince!” he murmured, “will you let me kiss your hand?” “I am glad that you are going to Egypt at last, little Swallow,” said the Prince, “you have stayed too long here; but you must kiss me on the lips, for I love you.” “It is not to Egypt that I am going,” said the Swallow. “I am going to the House of Death. Death is the brother of Sleep, is he not?”", "And he kissed the Happy Prince on the lips, and fell down dead at his feet. At that moment a curious crack sounded inside the statue, as if something had broken. The fact is that the leaden heart had snapped right in two. It certainly was a dreadfully hard frost. Early the next morning the Mayor was walking in the square below in company with the Town Councillors. As they passed the column he looked up at the statue: “Dear me! how shabby the Happy Prince looks!” he said. “How shabby indeed!” cried the Town Councillors, who always agreed with the Mayor; and they went up to look at it. “The ruby has fallen out of his sword, his eyes are gone, and he is golden no longer,” said the Mayor in fact, “he is little better than a beggar!” “Little better than a beggar,” said the Town Councillors.", "“And here is actually a dead bird at his feet!” continued the Mayor. “We must really issue a proclamation that birds are not to be allowed to die here.” And the Town Clerk made a note of the suggestion. So they pulled down the statue of the Happy Prince. “As he is no longer beautiful he is no longer useful,” said the Art Professor at the University. Then they melted the statue in a furnace, and the Mayor held a meeting of the Corporation to decide what was to be done with the metal. “We must have another statue, of course,” he said, “and it shall be a statue of myself.” “Of myself,” said each of the Town Councillors, and they quarrelled. When I last heard of them they were quarrelling still.", "“What a strange thing!” said the overseer of the workmen at the foundry. “This broken lead heart will not melt in the furnace. We must throw it away.” So they threw it on a dust-heap where the dead Swallow was also lying. “Bring me the two most precious things in the city,” said God to one of His Angels; and the Angel brought Him the leaden heart and the dead bird. “You have rightly chosen,” said God, “for in my garden of Paradise this little bird shall sing for evermore, and in my city of gold the Happy Prince shall praise me.”"], "shelf": "classic", "title": "The Happy Prince"}, {"author": "Beatrix Potter", "band": "little", "color": "#8A9A5B", "cover": "https://covers.openlibrary.org/b/id/10447931-L.jpg", "emo": "🐰", "find": [{"ask": "Can you find the pony?", "label": "the pony", "p": 1, "x": 591, "y": 523}, {"ask": "Can you find the scarecrow?", "label": "the scarecrow", "p": 8, "x": 527, "y": 668}, {"ask": "Can you find the mice?", "label": "the mice", "p": 15, "r": 200, "x": 349, "y": 375}, {"ask": "Can you find the cat?", "label": "the cat", "p": 17, "x": 610, "y": 505}, {"ask": "Can you find the basket?", "label": "the basket", "p": 21, "x": 119, "y": 642}], "id": "cls-benjamin-bunny", "pages": ["One morning a little rabbit sat on a bank. He pricked his ears and listened to the trit-trot, trit-trot of a pony. A gig was coming along the road; it was driven by Mr. McGregor, and beside him sat Mrs. McGregor in her best bonnet.", "As soon as they had passed, little Benjamin Bunny slid down into the road, and set off—with a hop, skip, and a jump—to call upon his relations, who lived in the wood at the back of Mr. McGregor's garden.", "That wood was full of rabbit holes; and in the neatest, sandiest hole of all lived Benjamin's aunt and his cousins—Flopsy, Mopsy, Cotton-tail, and Peter.", "Old Mrs. Rabbit was a widow; she earned her living by knitting rabbit-wool mittens and muffatees (I once bought a pair at a bazaar). She also sold herbs, and rosemary tea, and rabbit-tobacco (which is what we call lavender). Little Benjamin did not very much want to see his Aunt.", "He came round the back of the fir- tree, and nearly tumbled upon the top of his Cousin Peter. Peter was sitting by himself. He looked poorly, and was dressed in a red cotton pocket-handkerchief. \"Peter,\" said little Benjamin, in a whisper, \"who has got your clothes?\"", "Peter replied, \"The scarecrow in Mr. McGregor's garden,\" and described how he had been chased about the garden, and had dropped his shoes and coat. Little Benjamin sat down beside his cousin and assured him that Mr. McGregor had gone out in a gig, and Mrs. McGregor also; and certainly for the day, because she was wearing her best bonnet.", "Peter said he hoped that it would rain. At this point old Mrs. Rabbit's voice was heard inside the rabbit hole, calling: \"Cotton-tail! Cotton-tail! fetch some more camomile!\" Peter said he thought he might feel better if he went for a walk.", "They went away hand in hand, and got upon the flat top of the wall at the bottom of the wood. From here they looked down into Mr. McGregor's garden. Peter's coat and shoes were plainly to be seen upon the scarecrow, topped with an old tam-o'-shanter of Mr. McGregor's.", "Little Benjamin said: \"It spoils people's clothes to squeeze under a gate; the proper way to get in is to climb down a pear-tree.\" Peter fell down head first; but it was of no consequence, as the bed below was newly raked and quite soft. It had been sown with lettuces.", "They left a great many odd little footmarks all over the bed, especially little Benjamin, who was wearing clogs. Little Benjamin said that the first thing to be done was to get back Peter's clothes, in order that they might be able to use the pocket- handkerchief.", "They took them off the scarecrow. There had been rain during the night; there was water in the shoes, and the coat was somewhat shrunk. Benjamin tried on the tam-o'- shanter, but it was too big for him. Then he suggested that they should fill the pocket-handkerchief with onions, as a little present for his Aunt.", "Peter did not seem to be enjoying himself; he kept hearing noises. Benjamin, on the contrary, was perfectly at home, and ate a lettuce leaf. He said that he was in the habit of coming to the garden with his father to get lettuces for their Sunday dinner. (The name of little Benjamin's papa was old Mr. Benjamin Bunny.)", "The lettuces certainly were very fine. Peter did not eat anything; he said he should like to go home. Presently he dropped half the onions.", "Little Benjamin said that it was not possible to get back up the pear-tree with a load of vegetables. He led the way boldly towards the other end of the garden. They went along a little walk on planks, under a sunny, red brick wall.", "The mice sat on their doorsteps cracking cherry-stones; they winked at Peter Rabbit and little Benjamin Bunny. Presently Peter let the pocket- handkerchief go again. They got amongst flower-pots, and frames, and tubs. Peter heard noises worse than ever; his eyes were as big as lolly-pops!", "He was a step or two in front of his cousin when he suddenly stopped. This is what those little rabbits saw round that corner! Little Benjamin took one look, and then, in half a minute less than no time, he hid himself and Peter and the onions underneath a large basket. . . .", "The cat got up and stretched herself, and came and sniffed at the basket. Perhaps she liked the smell of onions! Anyway, she sat down upon the top of the basket. She sat there for FIVE HOURS.", "I cannot draw you a picture of Peter and Benjamin underneath the basket, because it was quite dark, and because the smell of onions was fearful; it made Peter Rabbit and little Benjamin cry. The sun got round behind the wood, and it was quite late in the afternoon; but still the cat sat upon the basket.", "At length there was a pitter-patter, pitter-patter, and some bits of mortar fell from the wall above. The cat looked up and saw old Mr. Benjamin Bunny prancing along the top of the wall of the upper terrace. He was smoking a pipe of rabbit- tobacco, and had a little switch in his hand. He was looking for his son.", "Old Mr. Bunny had no opinion whatever of cats. He took a tremendous jump off the top of the wall on to the top of the cat, and cuffed it off the basket, and kicked it into the greenhouse, scratching off a handful of fur. The cat was too much surprised to scratch back.", "When old Mr. Bunny had driven the cat into the greenhouse, he locked the door. Then he came back to the basket and took out his son Benjamin by the ears, and whipped him with the little switch. Then he took out his nephew Peter. Then he took out the handkerchief of onions, and marched out of the garden.", "When Mr. McGregor returned about half an hour later he observed several things which perplexed him. It looked as though some person had been walking all over the garden in a pair of clogs—only the footmarks were too ridiculously little!", "Also he could not understand how the cat could have managed to shut herself up INSIDE the greenhouse, locking the door upon the OUTSIDE.", "When Peter got home his mother forgave him, because she was so glad to see that he had found his shoes and coat. Cotton-tail and Peter folded up the pocket-handkerchief, and old Mrs. Rabbit strung up the onions and hung them from the kitchen ceiling, with the bunches of herbs and the rabbit- tobacco."], "shelf": "classic", "title": "The Tale of Benjamin Bunny"}, {"author": "Beatrix Potter", "band": "little", "color": "#B5651D", "cover": "https://covers.openlibrary.org/b/id/10028056-L.jpg", "emo": "🐿️", "find": [{"ask": "Can you find Old Brown?", "label": "Old Brown", "p": 2, "x": 606, "y": 338}, {"ask": "Can you find the three mice?", "label": "the three mice", "p": 4, "x": 648, "y": 546}, {"ask": "Can you find the beech stump?", "label": "the beech stump", "p": 10, "x": 675, "y": 630}, {"ask": "Can you find the honeycomb?", "label": "the honeycomb", "p": 16, "x": 432, "y": 695}, {"ask": "Can you find the crab apple?", "label": "the crab apple", "p": 18, "x": 325, "y": 698}], "id": "cls-squirrel-nutkin", "pages": ["This is a Tale about a tail—a tail that belonged to a little red squirrel, and his name was Nutkin. He had a brother called Twinkleberry, and a great many cousins: they lived in a wood at the edge of a lake.", "In the middle of the lake there is an island covered with trees and nut bushes; and amongst those trees stands a hollow oak-tree, which is the house of an owl who is called Old Brown.", "One autumn when the nuts were ripe, and the leaves on the hazel bushes were golden and green— Nutkin and Twinkleberry and all the other little squirrels came out of the wood, and down to the edge of the lake. They made little rafts out of twigs, and they paddled away over the water to Owl Island to gather nuts.", "Each squirrel had a little sack and a large oar, and spread out his tail for a sail. They also took with them an offering of three fat mice as a present for Old Brown, and put them down upon his door-step. Then Twinkleberry and the other little squirrels each made a low bow, and said politely—", "\"Old Mr. Brown, will you favour us with permission to gather nuts upon your island?\" But Nutkin was excessively impertinent in his manners. He bobbed up and down like a little red CHERRY, singing—", "\"Riddle me, riddle me, rot-tot-tote! A little wee man, in a red red coat! A staff in his hand, and a stone in his throat; If you'll tell me this riddle, I'll give you a groat.\" Now this riddle is as old as the hills; Mr. Brown paid no attention whatever to Nutkin.", "He shut his eyes obstinately and went to sleep. The squirrels filled their little sacks with nuts, and sailed away home in the evening. But next morning they all came back again to Owl Island; and Twinkleberry and the others brought a fine fat mole, and laid it on the stone in front of Old Brown's doorway, and said—", "\"Mr. Brown, will you favour us with your gracious permission to gather some more nuts?\" But Nutkin, who had no respect, began to dance up and down, tickling old Mr. Brown with a NETTLE and singing— \"Old Mr. B! Riddle-me-ree! Hitty Pitty within the wall, Hitty Pitty without the wall; If you touch Hitty Pitty, Hitty Pitty will bite you!\"", "Mr. Brown woke up suddenly and carried the mole into his house. He shut the door in Nutkin's face. Presently a little thread of blue SMOKE from a wood fire came up from the top of the tree, and Nutkin peeped through the key-hole and sang— \"A house full, a hole full! And you cannot gather a bowl-full!\"", "The squirrels searched for nuts all over the island and filled their little sacks. But Nutkin gathered oak-apples— yellow and scarlet—and sat upon a beech-stump playing marbles, and watching the door of old Mr. Brown. On the third day the squirrels got up very early and went fishing; they caught seven fat minnows as a present for Old Brown.", "They paddled over the lake and landed under a crooked chestnut tree on Owl Island. Twinkleberry and six other little squirrels each carried a fat minnow; but Nutkin, who had no nice manners, brought no present at all. He ran in front, singing—", "\"The man in the wilderness said to me, `How may strawberries grow in the sea?' I answered him as I thought good— `As many red herrings as grow in the wood.\"' But old Mr. Brown took no interest in riddles—not even when the answer was provided for him.", "On the fourth day the squirrels brought a present of six fat beetles, which were as good as plums in PLUM-PUDDING for Old Brown. Each beetle was wrapped up carefully in a dockleaf, fastened with a pine-needle- pin. But Nutkin sang as rudely as ever—", "\"Old Mr. B! riddle-me-ree! Flour of England, fruit of Spain, Met together in a shower of rain; Put in a bag tied round with a string, If you'll tell me this riddle, I'll give you a ring!\" Which was ridiculous of Nutkin, because he had not got any ring to give to Old Brown.", "The other squirrels hunted up and down the nut bushes; but Nutkin gathered robin's pin-cushions off a briar bush, and stuck them full of pine-needle-pins.", "On the fifth day the squirrels brought a present of wild honey; it was so sweet and sticky that they licked their fingers as they put it down upon the stone. They had stolen it out of a bumble BEES' nest on the tippity top of the hill. But Nutkin skipped up and down, singing—", "\"Hum-a-bum! buzz! buzz! Hum-a-bum buzz! As I went over Tipple-tine I met a flock of bonny swine; Some yellow-nacked, some yellow backed! They were the very bonniest swine That e'er went over the Tipple-tine.\" Old Mr. Brown turned up his eyes in disgust at the impertinence of Nutkin. But he ate up the honey!", "The squirrels filled their little sacks with nuts. But Nutkin sat upon a big flat rock, and played ninepins with a crab apple and green fir-cones. On the sixth day, which was Saturday, the squirrels came again for the last time; they brought a new-laid EGG in a little rush basket as a last parting present for Old Brown.", "But Nutkin ran in front laughing, and shouting— \"Humpty Dumpty lies in the beck, With a white counterpane round his neck, Forty doctors and forty wrights, Cannot put Humpty Dumpty to rights!\" Now old Mr. Brown took an interest in eggs; he opened one eye and shut it again. But still he did not speak.", "Nutkin became more and more impertinent— \"Old Mr. B! Old Mr. B! Hickamore, Hackamore, on the King's kitchen door; All the King's horses, and all the King's men, Couldn't drive Hickamore, Hackamore, Off the King's kitchen door!\" Nutkin danced up and down like a SUNBEAM; but still Old Brown said nothing at all. Nutkin began again—", "\"Authur O'Bower has broken his band, He comes roaring up the land! The King of Scots with all his power, Cannot turn Arthur of the Bower!\" Nutkin made a whirring noise to sound like the WIND, and he took a running jump right onto the head of Old Brown! . . .", "Then all at once there was a flutterment and a scufflement and a loud \"Squeak!\" The other squirrels scuttered away into the bushes. When they came back very cautiously, peeping round the tree— there was Old Brown sitting on his door-step, quite still, with his eyes closed, as if nothing had happened. * * * * * * * *", "BUT NUTKIN WAS IN HIS WAISTCOAT POCKET! This looks like the end of the story; but it isn't.", "Old Brown carried Nutkin into his house, and held him up by the tail, intending to skin him; but Nutkin pulled so very hard that his tail broke in two, and he dashed up the staircase, and escaped out of the attic window.", "And to this day, if you meet Nutkin up a tree and ask him a riddle, he will throw sticks at you, and stamp his feet and scold, and shout— \"Cuck-cuck-cuck-cur-r-r-cuck-k!\""], "shelf": "classic", "title": "The Tale of Squirrel Nutkin"}, {"author": "Beatrix Potter", "band": "little", "color": "#6A994E", "cover": "https://covers.openlibrary.org/b/id/12990361-L.jpg", "emo": "🐸", "find": [{"ask": "Can you find the fishing rod?", "label": "the fishing rod", "p": 4, "x": 497, "y": 281}, {"ask": "Can you find the little red float?", "label": "the little red float", "p": 6, "x": 527, "y": 634}, {"ask": "Can you find Jack Sharp?", "label": "Jack Sharp", "p": 10, "x": 587, "y": 487}, {"ask": "Can you find the big trout?", "label": "the big trout", "p": 13, "x": 632, "y": 432}, {"ask": "Can you find the tortoise?", "label": "the tortoise", "p": 17, "x": 770, "y": 630}], "id": "cls-jeremy-fisher", "pages": ["Once upon a time there was a frog called Mr. Jeremy Fisher; he lived in a little damp house amongst the buttercups at the edge of a pond. The water was all slippy-sloppy in the larder and in the back passage.", "But Mr. Jeremy liked getting his feet wet; nobody ever scolded him, and he never caught a cold! He was quite pleased when he looked out and saw large drops of rain, splashing in the pond—", "\"I will get some worms and go fishing and catch a dish of minnows for my dinner,\" said Mr. Jeremy Fisher. \"If I catch more than five fish, I will invite my friends Mr. Alderman Ptolemy Tortoise and Sir Isaac Newton. The Alderman, however, eats salad.\"", "Mr. Jeremy put on a mackintosh, and a pair of shiny galoshes; he took his rod and basket, and set off with enormous hops to the place where he kept his boat. The boat was round and green, and very like the other lily-leaves. It was tied to a water-plant in the middle of the pond.", "Mr. Jeremy took a reed pole, and pushed the boat out into open water. \"I know a good place for minnows,\" said Mr. Jeremy Fisher. Mr. Jeremy stuck his pole into the mud and fastened the boat to it.", "Then he settled himself cross- legged and arranged his fishing tackle. He had the dearest little red float. His rod was a tough stalk of grass, his line was a fine long white horse-hair, and he tied a little wriggling worm at the end. The rain trickled down his back, and for nearly an hour he stared at the float.", "\"This is getting tiresome, I think I should like some lunch,\" said Mr. Jeremy Fisher. He punted back again amongst the water-plants, and took some lunch out of his basket. \"I will eat a butterfly sandwich, and wait till the shower is over,\" said Mr. Jeremy Fisher.", "A great big water-beetle came up underneath the lily leaf and tweaked the toe of one of his galoshes. Mr. Jeremy crossed his legs up shorter, out of reach, and went on eating his sandwich. Once or twice something moved about with a rustle and a splash amongst the rushes at the side of the pond.", "\"I trust that is not a rat,\" said Mr. Jeremy Fisher; \"I think I had better get away from here.\" Mr. Jeremy shoved the boat out again a little way, and dropped in the bait. There was a bite almost directly; the float gave a tremendous bobbit!", "\"A minnow! a minnow! I have him by the nose!\" cried Mr. Jeremy Fisher, jerking up his rod. But what a horrible surprise! Instead of a smooth fat minnow, Mr. Jeremy landed little Jack Sharp, the stickleback, covered with spines!", "The stickleback floundered about the boat, pricking and snapping until he was quite out of breath. Then he jumped back into the water. And a shoal of other little fishes put their heads out, and laughed at Mr. Jeremy Fisher.", "And while Mr. Jeremy sat disconsolately on the edge of his boat—sucking his sore fingers and peering down into the water—a MUCH worse thing happened; a really FRIGHTFUL thing it would have been, if Mr. Jeremy had not been wearing a mackintosh!", "A great big enormous trout came up—ker-pflop-p-p-p! with a splash— and it seized Mr. Jeremy with a snap, \"Ow! Ow! Ow!\"—and then it turned and dived down to the bottom of the pond!", "But the trout was so displeased with the taste of the mackintosh, that in less than half a minute it spat him out again; and the only thing it swallowed was Mr. Jeremy's galoshes.", "Mr. Jeremy bounced up to the surface of the water, like a cork and the bubbles out of a soda water bottle; and he swam with all his might to the edge of the pond. He scrambled out on the first bank he came to, and he hopped home across the meadow with his mackintosh all in tatters.", "\"What a mercy that was not a pike!\" said Mr. Jeremy Fisher. \"I have lost my rod and basket; but it does not much matter, for I am sure I should never have dared to go fishing again!\"", "He put some sticking plaster on his fingers, and his friends both came to dinner. He could not offer them fish, but he had something else in his larder. Sir Isaac Newton wore his black and gold waistcoat. And Mr. Alderman Ptolemy Tortoise brought a salad with him in a string bag.", "And instead of a nice dish of minnows, they had a roasted grasshopper with lady-bird sauce, which frogs consider a beautiful treat; but I think it must have been nasty!"], "shelf": "classic", "title": "The Tale of Mr. Jeremy Fisher"}, {"author": "Beatrix Potter", "band": "little", "color": "#F4A259", "cover": "https://covers.openlibrary.org/b/id/7347371-L.jpg", "emo": "🦆", "find": [{"ask": "Can you find the poke bonnet?", "label": "the poke bonnet", "p": 4, "x": 513, "y": 462}, {"ask": "Can you find the newspaper?", "label": "the newspaper", "p": 7, "x": 606, "y": 441}, {"ask": "Can you find the eggs?", "label": "the eggs", "p": 15, "x": 492, "y": 763}, {"ask": "Can you find Kep the dog?", "label": "Kep the dog", "p": 20, "x": 540, "y": 645}, {"ask": "Can you find the puppies?", "label": "the puppies", "p": 25, "r": 200, "x": 684, "y": 688}], "id": "cls-jemima-puddle-duck", "pages": ["What a funny sight it is to see a brood of ducklings with a hen! Listen to the story of Jemima Puddle-duck, who was annoyed because the farmer's wife would not let her hatch her own eggs.", "Her sister-in-law, Mrs. Rebeccah Puddle-duck, was perfectly willing to leave the hatching to someone else— \"I have not the patience to sit on a nest for twenty-eight days; and no more have you, Jemima. You would let them go cold; you know you would!\"", "\"I wish to hatch my own eggs; I will hatch them all by myself,\" quacked Jemima Puddle-duck. She tried to hide her eggs; but they were always found and carried off. Jemima Puddle-duck became quite desperate. She determined to make a nest right away from the farm.", "She set off on a fine spring afternoon along the cart road that leads over the hill. She was wearing a shawl and a poke bonnet. When she reached the top of the hill, she saw a wood in the distance. She thought that it looked a safe quiet spot.", "Jemima Puddle-duck was not much in the habit of flying. She ran downhill a few yards flapping her shawl, and then she jumped off into the air. She flew beautifully when she had got a good start.", "She skimmed along over the treetops until she saw an open place in the middle of the wood, where the trees and brushwood had been cleared. Jemima alighted rather heavily and began to waddle about in search of a convenient dry nesting place. She rather fancied a tree stump amongst some tall foxgloves.", "But—seated upon the stump, she was startled to find an elegantly dressed gentleman reading a newspaper. He had black prick ears and sandy colored whiskers. \"Quack?\" said Jemima Puddle- duck, with her head and her bonnet on the one side—\"Quack?\" The gentleman raised his eyes above his newspaper and looked curiously at Jemima—", "\"Madam, have you lost your way?\" said he. He had a long bushy tail which he was sitting upon, as the stump was somewhat damp. Jemima thought him mighty civil and handsome. She explained that she had not lost her way, but that she was trying to find a convenient dry nesting place.", "\"Ah! is that so? Indeed!\" said the gentleman with sandy whiskers, looking curiously at Jemima. He folded up the newspaper and put it in his coattail pocket. Jemima complained of the superfluous hen. \"Indeed! How interesting! I wish I could meet with that fowl. I would teach it to mind its own business!", "\"But as to a nest—there is no difficulty: I have a sackful of feathers in my woodshed. No, my dear madam, you will be in nobody's way. You may sit there as long as you like,\" said the bushy long-tailed gentleman. He led the way to a very retired, dismal-looking house amongst the foxgloves.", "It was built of faggots and turf, and there were two broken pails, one on top of another, by way of a chimney. \"This is my summer residence; you would not find my earth—my winter house—so convenient,\" said the hospitable gentleman.", "There was a tumbledown shed at the back of the house, made of old soap boxes. The gentleman opened the door and showed Jemima in. The shed was almost quite full of feathers—it was almost suffocating; but it was comfortable and very soft.", "Jemima Puddle-duck was rather surprised to find such a vast quantity of feathers. But it was very comfortable; and she made a nest without any trouble at all. When she came out, the sandy- whiskered gentleman was sitting on a log reading the newspaper—at least he had it spread out, but he was looking over the top of it.", "He was so polite that he seemed almost sorry to let Jemima go home for the night. He promised to take great care of her nest until she came back again the next day. He said he loved eggs and ducklings; he should be proud to see a fine nestful in his woodshed.", "Jemima Puddle-duck came every afternoon; she laid nine eggs in the nest. They were greeny white and very large. The foxy gentleman admired them immensely. He used to turn them over and count them when Jemima was not there.", "At last Jemima told him that she intended to begin to sit next day—\"and I will bring a bag of corn with me, so that I need never leave my nest until the eggs are hatched. They might catch cold,\" said the conscientious Jemima.", "\"Madam, I beg you not to trouble yourself with a bag; I will provide oats. But before you commence your tedious sitting, I intend to give you a treat. Let us have a dinner party all to ourselves!", "\"May I ask you to bring up some herbs from the farm garden to make a savory omelet? Sage and thyme, and mint and two onions, and some parsley. I will provide lard for the stuff—lard for the omelet,\" said the hospitable gentleman with sandy whiskers.", "Jemima Puddle-duck was a simpleton: not even the mention of sage and onions made her suspicious. She went round the farm garden, nibbling off snippets of all the different sorts of herbs that are used for stuffing roast duck. And she waddled into the kitchen and got two onions out of a basket.", "The collie dog Kep met her coming out, \"What are you doing with those onions? Where do you go every afternoon by yourself, Jemima Puddle-duck?\" Jemima was rather in awe of the collie; she told him the whole story. The collie listened, with his wise head on one side; he grinned when she described the polite gentleman with sandy whiskers.", "He asked several questions about the wood and about the exact position of the house and shed. Then he went out, and trotted down the village. He went to look for two foxhound puppies who were out at walk with the butcher.", "Jemima Puddle-duck went up the cart road for the last time, on a sunny afternoon. She was rather burdened with bunches of herbs and two onions in a bag. She flew over the wood, and alighted opposite the house of the bushy long-tailed gentleman.", "He was sitting on a log; he sniffed the air and kept glancing uneasily round the wood. When Jemima alighted he quite jumped. \"Come into the house as soon as you have looked at your eggs. Give me the herbs for the omelet. Be sharp!\" He was rather abrupt. Jemima Puddle-duck had never heard him speak like that.", "She felt surprised and uncomfortable. While she was inside she heard pattering feet round the back of the shed. Someone with a black nose sniffed at the bottom of the door, and them locked it. Jemima became much alarmed. A moment afterward there were most awful noises—barking, baying, growls and howls, squealing and groans.", "And nothing more was ever seen of that foxy-whiskered gentleman. Presently Kep opened the door of the shed and let out Jemima Puddle- duck. Unfortunately the puppies rushed in and gobbled up all the eggs before he could stop them. He had a bite on his ear, and both the puppies were limping.", "Jemima Puddle-duck was escorted home in tears on account of those eggs. She laid some more in June, and she was permitted to keep them herself: but only four of them hatched. Jemima Puddle-duck said that it was because of her nerves; but she had always been a bad sitter."], "shelf": "classic", "title": "The Tale of Jemima Puddle-Duck"}, {"author": "Beatrix Potter", "band": "little", "color": "#BC6C25", "cover": "https://covers.openlibrary.org/b/id/6604329-L.jpg", "emo": "🐭", "find": [{"ask": "Can you find the doll's-house?", "label": "the doll's-house", "p": 1, "x": 476, "y": 465}, {"ask": "Can you find the ham?", "label": "the ham", "p": 2, "x": 390, "y": 835}, {"ask": "Can you find the fire?", "label": "the fire", "p": 11, "x": 193, "y": 708}, {"ask": "Can you find the feather bed?", "label": "the feather bed", "p": 14, "x": 418, "y": 646}, {"ask": "Can you find the broom?", "label": "the broom", "p": 19, "x": 490, "y": 683}], "id": "cls-two-bad-mice", "pages": ["Once upon a time there was a very beautiful doll's-house; it was red brick with white windows, and it had real muslin curtains and a front door and a chimney. It belonged to two Dolls called Lucinda and Jane; at least it belonged to Lucinda, but she never ordered meals.", "Jane was the Cook; but she never did any cooking, because the dinner had been bought ready-made, in a box full of shavings. There were two red lobsters and a ham, a fish, a pudding, and some pears and oranges. They would not come off the plates, but they were extremely beautiful.", "One morning Lucinda and Jane had gone out for a drive in the doll's perambulator. There was no one in the nursery, and it was very quiet. Presently there was a little scuffling, scratching noise in a corner near the fireplace, where there was a hole under the skirting-board.", "Tom Thumb put out his head for a moment, and then popped it in again. Tom Thumb was a mouse. A minute afterwards, Hunca Munca, his wife, put her head out, too; and when she saw that there was no one in the nursery, she ventured out on the oilcloth under the coal-box.", "The doll's-house stood at the other side of the fire-place. Tom Thumb and Hunca Munca went cautiously across the hearthrug. They pushed the front door—it was not fast. Tom Thumb and Hunca Munca went upstairs and peeped into the dining-room. Then they squeaked with joy!", "Such a lovely dinner was laid out upon the table! There were tin spoons, and lead knives and forks, and two dolly-chairs—all SO convenient! Tom Thumb set to work at once to carve the ham. It was a beautiful shiny yellow, streaked with red. The knife crumpled up and hurt him; he put his finger in his mouth.", "\"It is not boiled enough; it is hard. You have a try, Hunca Munca.\" Hunca Munca stood up in her chair, and chopped at the ham with another lead knife. \"It's as hard as the hams at the cheesemonger's,\" said Hunca Munca. The ham broke off the plate with a jerk, and rolled under the table.", "\"Let it alone,\" said Tom Thumb; \"give me some fish, Hunca Munca!\" Hunca Munca tried every tin spoon in turn; the fish was glued to the dish. Then Tom Thumb lost his temper. He put the ham in the middle of the floor, and hit it with the tongs and with the shovel—bang, bang, smash, smash!", "The ham flew all into pieces, for underneath the shiny paint it was made of nothing but plaster! Then there was no end to the rage and disappointment of Tom Thumb and Hunca Munca. They broke up the pudding, the lobsters, the pears and the oranges.", "As the fish would not come off the plate, they put it into the red-hot crinkly paper fire in the kitchen; but it would not burn either. Tom Thumb went up the kitchen chimney and looked out at the top— there was no soot.", "While Tom Thumb was up the chimney, Hunca Munca had another disappointment. She found some tiny canisters upon the dresser, labelled— Rice—Coffee—Sago—but when she turned them upside down, there was nothing inside except red and blue beads.", "Then those mice set to work to do all the mischief they could—especially Tom Thumb! He took Jane's clothes out of the chest of drawers in her bedroom, and he threw them out of the top floor window.", "But Hunca Munca had a frugal mind. After pulling half the feathers out of Lucinda's bolster, she remembered that she herself was in want of a feather bed. With Tom Thumbs's assistance she carried the bolster downstairs, and across the hearth-rug. It was difficult to squeeze the bolster into the mouse- hole; but they managed it somehow.", "Then Hunca Munca went back and fetched a chair, a book-case, a bird- cage, and several small odds and ends. The book-case and the bird- cage refused to go into the mousehole. Hunca Munca left them behind the coal-box, and went to fetch a cradle.", "Hunca Munca was just returning with another chair, when suddenly there was a noise of talking outside upon the landing. The mice rushed back to their hole, and the dolls came into the nursery.", "What a sight met the eyes of Jane and Lucinda! Lucinda sat upon the upset kitchen stove and stared; and Jane leant against the kitchen dresser and smiled—but neither of them made any remark. The book-case and the bird-cage were rescued from under the coal- box—but Hunca Munca has got the cradle, and some of Lucinda's clothes.", "She also has some useful pots and pans, and several other things. The little girl that the doll's-house belonged to, said,—\"I will get a doll dressed like a policeman!\" But the nurse said,—\"I will set a mouse-trap!\"", "So that is the story of the two Bad Mice,—but they were not so very very naughty after all, because Tom Thumb paid for everything he broke. He found a crooked sixpence under the hearth-rug; and upon Christmas Eve, he and Hunca Munca stuffed it into one of the stockings of Lucinda and Jane.", "And very early every morning— before anybody is awake—Hunca Munca comes with her dust-pan and her broom to sweep the Dollies' house!"], "shelf": "classic", "title": "The Tale of Two Bad Mice"}, {"author": "Beatrix Potter", "band": "little", "color": "#606C38", "cover": "https://covers.openlibrary.org/b/id/4574774-L.jpg", "emo": "🐱", "find": [{"ask": "Can you find Tom Kitten?", "label": "Tom Kitten", "p": 1, "x": 500, "y": 669}, {"ask": "Can you find the garden wall?", "label": "the garden wall", "p": 6, "x": 361, "y": 496}, {"ask": "Can you find the Puddle-ducks?", "label": "the Puddle-ducks", "p": 9, "r": 200, "x": 484, "y": 766}, {"ask": "Can you find Mr. Drake?", "label": "Mr. Drake", "p": 11, "x": 717, "y": 595}, {"ask": "Can you find the teapot?", "label": "the teapot", "p": 13, "x": 678, "y": 682}], "id": "cls-tom-kitten", "pages": ["Once upon a time there were three little kittens, and their names were Mittens, Tom Kitten, and Moppet. They had dear little fur coats of their own; and they tumbled about the doorstep and played in the dust.", "But one day their mother—Mrs. Tabitha Twitchit—expected friends to tea; so she fetched the kittens indoors, to wash and dress them, before the fine company arrived. First she scrubbed their faces (this one is Moppet). Then she brushed their fur (this one is Mittens). Then she combed their tails and whiskers (this is Tom Kitten).", "Tom was very naughty, and he scratched. Mrs. Tabitha dressed Moppet and Mittens in clean pinafores and tuckers; and then she took all sorts of elegant uncomfortable clothes out of a chest of drawers, in order to dress up her son Thomas.", "Tom Kitten was very fat, and he had grown; several buttons burst off. His mother sewed them on again. When the three kittens were ready, Mrs. Tabitha unwisely turned them out into the garden, to be out of the way while she made hot buttered toast.", "\"Now keep your frocks clean, children! You must walk on your hind legs. Keep away from the dirty ash- pit, and from Sally Henny Penny, and from the pigsty and the Puddle- ducks.\" Moppet and Mittens walked down the garden path unsteadily. Presently they trod upon their pinafores and fell on their noses.", "When they stood up there were several green smears! \"Let us climb up the rockery and sit on the garden wall,\" said Moppet. They turned their pinafores back to front and went up with a skip and a jump; Moppet's white tucker fell down into the road.", "Tom Kitten was quite unable to jump when walking upon his hind legs in trousers. He came up the rockery by degrees, breaking the ferns and shedding buttons right and left. He was all in pieces when he reached the top of the wall.", "Moppet and Mittens tried to pull him together; his hat fell off, and the rest of his buttons burst. While they were in difficulties, there was a pit pat, paddle pat! and the three Puddle-ducks came along the hard high road, marching one behind the other and doing the goose step— pit pat, paddle pat! pit pat, waddle pat!", "They stopped and stood in a row and stared up at the kittens. They had very small eyes and looked surprised. Then the two duck-birds, Rebeccah and Jemima Puddle-duck, picked up the hat and tucker and put them on.", "Mittens laughed so that she fell off the wall. Moppet and Tom descended after her; the pinafores and all the rest of Tom's clothes came off on the way down. \"Come! Mr. Drake Puddle-duck,\" said Moppet. \"Come and help us to dress him! Come and button up Tom!\"", "Mr. Drake Puddle-duck advanced in a slow sideways manner and picked up the various articles. But he put them on HIMSELF! They fitted him even worse than Tom Kitten. \"It's a very fine morning!\" said Mr. Drake Puddle-duck. And he and Jemima and Rebeccah Puddle-duck set off up the road, keeping step—pit pat, paddle pat! pit pat, waddle pat!", "Then Tabitha Twitchit came down the garden and found her kittens on the wall with no clothes on. She pulled them off the wall, smacked them, and took them back to the house. \"My friends will arrive in a minute, and you are not fit to be seen; I am affronted,\" said Mrs. Tabitha Twitchit.", "She sent them upstairs; and I am sorry to say she told her friends that they were in bed with the measles— which was not true. Quite the contrary; they were not in bed: NOT in the least. Somehow there were very extra— ordinary noises overhead, which disturbed the dignity and repose of the tea party.", "And I think that some day I shall have to make another, larger book, to tell you more about Tom Kitten! As for the Puddle-ducks—they went into a pond. The clothes all came off directly, because there were no buttons. And Mr. Drake Puddle-duck, and Jemima and Rebeccah, have been looking for them ever since."], "shelf": "classic", "title": "The Tale of Tom Kitten"}, {"author": "Beatrix Potter", "band": "little", "color": "#9C6644", "cover": "https://covers.openlibrary.org/b/id/6567894-L.jpg", "emo": "🦔", "find": [{"ask": "Can you find the tin can?", "label": "the tin can", "p": 5, "x": 353, "y": 624}, {"ask": "Can you find the iron?", "label": "the iron", "p": 9, "x": 559, "y": 536}, {"ask": "Can you find the pocket-handkerchief?", "label": "the pocket-handkerchief", "p": 14, "x": 398, "y": 588}, {"ask": "Can you find the red coat?", "label": "the red coat", "p": 19, "x": 234, "y": 297}, {"ask": "Can you find Mrs. Tiggy-Winkle?", "label": "Mrs. Tiggy-Winkle", "p": 25, "x": 448, "y": 700}], "id": "cls-mrs-tiggy-winkle", "pages": ["Once upon a time there was a little girl called Lucie, who lived at a farm called Little-town. She was a good little girl—only she was always losing her pocket-handkerchiefs!", "One day little Lucie came into the farm-yard crying—oh, she did cry so! \"I've lost my pocket-handkin! Three handkins and a pinny! Have YOU seen them, Tabby Kitten?\" The Kitten went on washing her white paws; so Lucie asked a speckled hen— \"Sally Henny-penny, have YOU found three pocket-handkins?\" But the speckled hen ran into a barn, clucking—", "\"I go barefoot, barefoot, barefoot!\" And then Lucie asked Cock Robin sitting on a twig. Cock Robin looked sideways at Lucie with his bright black eye, and he flew over a stile and away. Lucie climbed upon the stile and looked up at the hill behind Little- town—a hill that goes up—up—into the clouds as though it had no top!", "And a great way up the hillside she thought she saw some white things spread upon the grass. Lucie scrambled up the hill as fast as her short legs would carry her; she ran along a steep path-way—up and up—until Little-town was right away down below—she could have dropped a pebble down the chimney!", "Presently she came to a spring, bubbling out from the hillside. Some one had stood a tin can upon a stone to catch the water—but the water was already running over, for the can was no bigger than an egg- cup! And where the sand upon the path was wet—there were footmarks of a VERY small person.", "Lucie ran on, and on. The path ended under a big rock. The grass was short and green, and there were clothes-props cut from bracken stems, with lines of plaited rushes, and a heap of tiny clothes pins—but no pocket-handkerchiefs! But there was something else—a door! straight into the hill; and inside it some one was singing—", "\"Lily-white and clean, oh! With little frills between, oh! Smooth and hot-red rusty spot Never here be seen, oh!\" Lucie knocked-once-twice, and interrupted the song. A little frightened voice called out \"Who's that?\"", "Lucie opened the door: and what do you think there was inside the hill?—a nice clean kitchen with a flagged floor and wooden beams— just like any other farm kitchen. Only the ceiling was so low that Lucie's head nearly touched it; and the pots and pans were small, and so was everything there.", "There was a nice hot singey smell; and at the table, with an iron in her hand, stood a very stout short person staring anxiously at Lucie.", "Her print gown was tucked up, and she was wearing a large apron over her striped petticoat. Her little black nose went sniffle, sniffle, snuffle, and her eyes went twinkle, twinkle; and underneath her cap-where Lucie had yellow curls-that little person had PRICKLES! \"Who are you?\" said Lucie. \"Have you seen my pocket-handkins?\"", "The little person made a bob- curtsey—\"Oh yes, if you please'm; my name is Mrs. Tiggy-winkle; oh yes if you please'm, I'm an excellent clear- starcher!\" And she took something out of the clothesbasket, and spread it on the ironing-blanket. \"What's that thing?\" said Lucie- \"that's not my pocket-handkin?\"", "\"Oh no, if you please'm; that's a little scarlet waist-coat belonging to Cock Robin!\" And she ironed it and folded it, and put it on one side. Then she took something else off a clothes-horse—\"That isn't my pinny?\" said Lucie.", "\"Oh no, if you please'm; that's a damask table-cloth belonging to Jenny Wren; look how it's stained with currant wine! It's very bad to wash!\" said Mrs. Tiggy-winkle. Mrs. Tiggy-winkle's nose went sniffle sniffle snuffle, and her eyes went twinkle twinkle; and she fetched another hot iron from the fire.", "\"There's one of my pocket- handkins!\" cried Lucie—\"and there's my pinny!\" Mrs. Tiggy-winkle ironed it, and goffered it, and shook out the frills. \"Oh that IS lovely!\" said Lucie. \"And what are those long yellow things with fingers like gloves?\"", "\"Oh that's a pair of stockings belonging to Sally Henny-penny—look how she's worn the heels out with scratching in the yard! She'll very soon go barefoot!\" said Mrs. Tiggy-winkle. \"Why, there's another hankersniff— but it isn't mine; it's red?\"", "\"Oh no, if you please'm; that one belongs to old Mrs. Rabbit; and it DID so smell of onions! I've had to wash it separately, I can't get out that smell.\" \"There's another one of mine,\" said Lucie. \"What are those funny little white things?\"", "\"That's a pair of mittens belonging to Tabby Kitten; I only have to iron them; she washes them herself.\" \"There's my last pocket-handkin!\" said Lucie. \"And what are you dipping into the basin of starch?\" \"They're little dicky shirt-fronts belonging to Tom Titmouse—most terrible particular!\" said Mrs. Tiggy- winkle. \"Now I've finished my ironing; I'm going to air some clothes.\"", "\"What are these dear soft fluffy things?\" said Lucie. \"Oh those are woolly coats belonging to the little lambs at Skelghyl.\" \"Will their jackets take off?\" asked Lucie. \"Oh yes, if you please'm; look at the sheep-mark on the shoulder. And here's one marked for Gatesgarth, and three that come from Little-town. They're ALWAYS marked at washing!\" said Mrs. Tiggy-winkle.", "And she hung up all sorts and sizes of clothes—small brown coats of mice; and one velvety black moleskin waist-coat; and a red tail-coat with no tail belonging to Squirrel Nutkin; and a very much shrunk blue jacket belonging to Peter Rabbit; and a petticoat, not marked, that had gone lost in the washing—and at last the basket was empty!", "Then Mrs. Tiggy-winkle made tea—a cup for herself and a cup for Lucie. They sat before the fire on a bench and looked sideways at one another. Mrs. Tiggy-winkle's hand, holding the tea-cup, was very very brown, and very very wrinkly with the soap-suds; and all through her gown and her cap, there were HAIRPINS sticking wrong end out; so that Lucie didn't like to sit too near her.", "When they had finished tea, they tied up the clothes in bundles; and Lucie's pocket-handkerchiefs were folded up inside her clean pinny, and fastened with a silver safety-pin. And then they made up the fire with turf, and came out and locked the door, and hid the key under the door-sill.", "Then away down the hill trotted Lucie and Mrs. Tiggy-winkle with the bundles of clothes! All the way down the path little animals came out of the fern to meet them; the very first that they met were Peter Rabbit and Benjamin Bunny!", "And she gave them their nice clean clothes; and all the little animals and birds were so very much obliged to dear Mrs. Tiggy-winkle. So that at the bottom of the hill when they came to the stile, there was nothing left to carry except Lucie's one little bundle.", "Lucie scrambled up the stile with the bundle in her hand; and then she turned to say \"Good-night,\" and to thank the washer-woman.—But what a VERY odd thing! Mrs. Tiggy-winkle had not waited either for thanks or for the washing bill!", "She was running running running up the hill—and where was her white frilled cap? and her shawl? and her gown-and her petticoat? And HOW small she had grown— and HOW brown—and covered with PRICKLES! Why! Mrs. Tiggy-winkle was nothing but a HEDGEHOG! * * * * * *", "(Now some people say that little Lucie had been asleep upon the stile—but then how could she have found three clean pocket-handkins and a pinny, pinned with a silver safety-pin? And besides—I have seen that door into the back of the hill called Cat Bells—and besides I am very well acquainted with dear Mrs. Tiggy-winkle!)"], "shelf": "classic", "title": "The Tale of Mrs. Tiggy-Winkle"}, {"author": "Beatrix Potter", "band": "little", "color": "#7FB069", "cover": "https://covers.openlibrary.org/b/id/5327052-L.jpg", "emo": "🐇", "find": [{"ask": "Can you find the jam pots?", "label": "the jam pots", "p": 4, "r": 200, "x": 548, "y": 719}, {"ask": "Can you find the sleeping bunnies?", "label": "the sleeping bunnies", "p": 6, "x": 358, "y": 728}, {"ask": "Can you find Mrs. Tittlemouse?", "label": "Mrs. Tittlemouse", "p": 7, "x": 400, "y": 485}, {"ask": "Can you find the sack?", "label": "the sack", "p": 11, "x": 593, "y": 703}, {"ask": "Can you find the marrow?", "label": "the marrow", "p": 19, "x": 268, "y": 412}], "id": "cls-flopsy-bunnies", "pages": ["It is said that the effect of eating too much lettuce is \"soporific.\" I have never felt sleepy after eating lettuces; but then I am not a rabbit. They certainly had a very soporific effect upon the Flopsy Bunnies!", "When Benjamin Bunny grew up, he married his Cousin Flopsy. They had a large family, and they were very improvident and cheerful. I do not remember the separate names of their children; they were generally called the \"Flopsy Bunnies.\"", "As there was not always quite enough to eat,—Benjamin used to borrow cabbages from Flopsy's brother, Peter Rabbit, who kept a nursery garden. Sometimes Peter Rabbit had no cabbages to spare. When this happened, the Flopsy Bunnies went across the field to a rubbish heap, in the ditch outside Mr. McGregor's garden.", "Mr. McGregor's rubbish heap was a mixture. There were jam pots and paper bags, and mountains of chopped grass from the mowing machine (which always tasted oily), and some rotten vegetable marrows and an old boot or two. One day—oh joy!—there were a quantity of overgrown lettuces, which had \"shot\" into flower.", "The Flopsy Bunnies simply stuffed themselves with lettuces. By degrees, one after another, they were overcome with slumber, and lay down in the mown grass. Benjamin was not so much overcome as his children. Before going to sleep he was sufficiently wide awake to put a paper bag over his head to keep off the flies.", "The little Flopsy Bunnies slept delightfully in the warm sun. From the lawn beyond the garden came the distant clacketty sound of the mowing machine. The blue- bottles buzzed about the wall, and a little old mouse picked over the rubbish among the jam pots.", "(I can tell you her name, she was called Thomasina Tittle- mouse, a woodmouse with a long tail.) She rustled across the paper bag, and awakened Benjamin Bunny. The mouse apologized profusely, and said that she knew Peter Rabbit.", "While she and Benjamin were talking, close under the wall, they heard a heavy tread above their heads; and suddenly Mr. McGregor emptied out a sackful of lawn mowings right upon the top of the sleeping Flopsy Bunnies! Benjamin shrank down under his paper bag. The mouse hid in a jam pot.", "The little rabbits smiled sweetly in their sleep under the shower of grass; they did not awake because the lettuces had been so soporific. They dreamt that their mother Flopsy was tucking them up in a hay bed.", "Mr. McGregor looked down after emptying his sack. He saw some funny little brown tips of ears sticking up through the lawn mowings. He stared at them for some time. Presently a fly settled on one of them and it moved. Mr. McGregor climbed down on to the rubbish heap—", "\"One, two, three, four! five! six leetle rabbits!\" said he as he dropped them into his sack. The Flopsy Bunnies dreamt that their mother was turning them over in bed. They stirred a little in their sleep, but still they did not wake up. Mr. McGregor tied up the sack and left it on the wall.", "He went to put away the mowing machine. While he was gone, Mrs. Flopsy Bunny (who had remained at home) came across the field. She looked suspiciously at the sack and wondered where everybody was? Then the mouse came out of her jam pot, and Benjamin took the paper bag off his head, and they told the doleful tale.", "Benjamin and Flopsy were in despair, they could not undo the string. But Mrs. Tittlemouse was a resourceful person. She nibbled a hole in the bottom corner of the sack. The little rabbits were pulled out and pinched to wake them. Their parents stuffed the empty sack with three rotten vegetable marrows, an old blackingbrush and two decayed turnips.", "Then they all hid under a bush and watched for Mr. McGregor. Mr. McGregor came back and picked up the sack, and carried it off. He carried it hanging down, as if it were rather heavy. The Flopsy Bunnies followed at a safe distance. They watched him go into his house.", "And then they crept up to the window to listen. Mr. McGregor threw down the sack on the stone floor in a way that would have been extremely painful to the Flopsy Bunnies, if they had happened to have been inside it. They could hear him drag his chair on the flags, and chuckle—", "\"One, two, three, four, five, six leetle rabbits!\" said Mr. McGregor. \"Eh? What's that? What have they been spoiling now?\" enquired Mrs. McGregor. \"One, two, three, four, five, six leetle fat rabbits!\" repeated Mr. McGregor, counting on his fingers —\"one, two, three—\" \"Don't you be silly: what do you mean, you silly old man?\"", "\"In the sack! one, two, three, four, five, six!\" replied Mr. McGregor. (The youngest Flopsy Bunny got upon the windowsill.) Mrs. McGregor took hold of the sack and felt it. She said she could feel six, but they must be OLD rabbits, because they were so hard and all different shapes.", "\"Not fit to eat; but the skins will do fine to line my old cloak.\" \"Line your old cloak?\" shouted Mr. McGregor—\"I shall sell them and buy myself baccy!\" \"Rabbit tobacco! I shall skin them and cut off their heads.\" Mrs. McGregor untied the sack and put her hand inside.", "When she felt the vegetables she became very very angry. She said that Mr. McGregor had \"done it a purpose.\" And Mr. McGregor was very angry too. One of the rotten marrows came flying through the kitchen window, and hit the youngest Flopsy Bunny. It was rather hurt. Then Benjamin and Flopsy thought that it was time to go home.", "So Mr. McGregor did not get his tobacco, and Mrs. McGregor did not get her rabbit skins. But next Christmas Thomasina Tittlemouse got a present of enough rabbit wool to make herself a cloak and a hood, and a handsome muff and a pair of warm mittens."], "shelf": "classic", "title": "The Tale of the Flopsy Bunnies"}, {"author": "Henry Alder", "band": "little", "color": "#5DA85F", "cover": null, "emo": "🦫", "find": [{"ask": "Can you find the red berries?", "label": "the red berries", "p": 2, "r": 200, "x": 798, "y": 190}, {"ask": "Can you find the big stick?", "label": "the big stick", "p": 4, "x": 505, "y": 775}, {"ask": "Can you find Duck?", "label": "Duck", "p": 6, "x": 731, "y": 609}, {"ask": "Can you find Mouse?", "label": "Mouse", "p": 8, "x": 518, "y": 579}, {"ask": "Can you find the bridge?", "label": "the bridge", "p": 11, "x": 504, "y": 549}], "id": "lib-benny-beaver", "pages": ["Benny was a young beaver. He lived by a stream that went splash, splash, splash.", "On the other side of the stream grew sweet, red berries. Yum, yum, yum!", "\"Let's have a berry picnic!\" said Benny. But the water was too deep to cross.", "\"I will build a bridge,\" said Benny. He found a big, strong stick. Heave!", "Benny laid the stick across the stream. Then he found one more. One, two!", "Duck waddled up. \"Can I help?\" Duck brought a flat stone. Plop! In it went.", "Frog hopped up. \"Me too!\" Frog pushed a round stone. Roll, roll, plop!", "Mouse squeaked, \"Me too, me too!\" Mouse carried a tiny stick. Pat, pat, pat.", "Stick by stick and stone by stone, the little bridge grew and grew strong.", "Benny tapped the bridge with his tail. Thump, thump! \"It is ready!\" he said.", "Tip, tap, tip, tap! Duck, Frog and Mouse crossed the stream. Hooray for the bridge!", "They ate sweet berries together in the sun. \"Thank you, Benny!\" What a happy picnic."], "shelf": "ours", "title": "Benny the Beaver Builds a Bridge"}, {"author": "Elsie Marlowe", "band": "little", "color": "#7FB2E5", "cover": null, "emo": "🌧️", "find": [{"ask": "Can you find Cleo?", "label": "Cleo", "p": 1, "x": 427, "y": 171}, {"ask": "Can you find the big clouds?", "label": "the big clouds", "p": 2, "x": 695, "y": 235}, {"ask": "Can you find the roses?", "label": "the roses", "p": 7, "r": 200, "x": 345, "y": 511}, {"ask": "Can you find the flowers?", "label": "the flowers", "p": 10, "r": 200, "x": 349, "y": 698}, {"ask": "Can you find the sun?", "label": "the sun", "p": 12, "x": 192, "y": 606}], "id": "lib-cleo-cloud", "pages": ["Cleo was a little white cloud. She floated high up in the soft, blue sky.", "The big clouds made rain. Drip, drop, drip! Cleo tried too. But no rain came.", "\"I am too little to rain,\" said Cleo. She felt very, very small.", "Then the friendly wind came by. Whoosh! \"I can help you grow,\" said the wind.", "The wind blew soft and slow. Puff, puff! Cleo grew a little bit bigger.", "The wind blew round and round. Puff, puff, puff! Cleo grew big and fluffy.", "Down below, the flowers were thirsty. \"We need rain,\" said the roses. \"Please, Cleo!\"", "Cleo looked at the dry garden. \"I will try,\" she said. She took a deep breath.", "Drip... drop... Drip, drop, drip! Little drops of rain fell from Cleo!", "The rain fell soft and gentle. Pitter, patter! The flowers lifted up their heads.", "\"Thank you, Cleo! Thank you!\" sang the flowers. They were happy and bright again.", "Cleo smiled and floated home. The sun said good night. Good night, little Cleo."], "shelf": "ours", "title": "Cleo the Little Cloud"}, {"author": "Willa Grant", "band": "little", "color": "#F0A840", "cover": null, "emo": "✨", "find": [{"ask": "Can you find Mia?", "label": "Mia", "p": 1, "x": 485, "y": 320}, {"ask": "Can you find the moth?", "label": "the moth", "p": 3, "x": 473, "y": 583}, {"ask": "Can you find the baby bird?", "label": "the baby bird", "p": 5, "x": 275, "y": 718}, {"ask": "Can you find the nest?", "label": "the nest", "p": 6, "x": 597, "y": 552}, {"ask": "Can you find the tiny mouse?", "label": "the tiny mouse", "p": 7, "x": 619, "y": 734}], "id": "lib-mia-firefly", "pages": ["Mia was a very small firefly. When the sky turned dusky, her tiny light blinked on. Blink, blink!", "Mia flew over the quiet garden. Her light went blink, blink, blink, soft and gold.", "Under a leaf, Mia found a little moth. 'I am lost,' said the moth. 'I cannot find my tree.'", "'Follow my light,' said Mia. Blink, blink! She led the moth up, up to his tall tree home.", "In the soft grass, a baby bird peeped. Peep, peep! 'Where is my nest?' she cried.", "'Follow my light,' said Mia. Blink, blink! She led the baby bird to her cozy nest in the bush.", "By the garden wall, a tiny mouse sniffled. 'It is too dark,' he said. 'I want my home.'", "'Follow my light,' said Mia. Blink, blink! She led the mouse to his hole under the roses.", "The moth waved from his tree. The baby bird waved from her nest. The mouse waved from his door.", "'Thank you, Mia!' they called. 'Your little light is big and kind.' Mia glowed warm and happy.", "Now Mia flew home to her leaf. She curled up small under the quiet, starry sky.", "Blink... blink... went Mia's light, slower and sleepier. All her friends were safe. Good night, little light. Good night."], "shelf": "ours", "title": "Mia the Firefly Lights the Way"}, {"author": "Rosie Hartley", "band": "little", "color": "#2E86AB", "cover": null, "emo": "🦦", "find": [{"ask": "Can you find Otto?", "label": "Otto", "p": 1, "x": 482, "y": 606}, {"ask": "Can you find Mum?", "label": "Mum", "p": 3, "x": 322, "y": 476}, {"ask": "Can you find the bubbles?", "label": "the bubbles", "p": 6, "r": 200, "x": 590, "y": 595}, {"ask": "Can you find Otto's friends?", "label": "Otto's friends", "p": 8, "x": 732, "y": 363}, {"ask": "Can you find Frog?", "label": "Frog", "p": 11, "x": 582, "y": 603}], "id": "lib-otto-otter", "pages": ["Otto was a little otter pup. He loved to swim in the shallow water. Splish, splash!", "But the deep water looked dark and far away. Otto held on to Mum. \"Not yet,\" he said.", "\"We will practice together,\" said Mum. She held Otto's paws. Kick, kick, kick!", "Otto kicked his little feet. Kick, kick! The water tickled his toes.", "Otto floated on his back. Mum stayed close by. \"You are doing it, Otto!\"", "Otto blew bubbles in the water. Blub, blub, blub! The bubbles popped in the sun.", "Every day, Otto swam a little bit farther. A little bit, and a little bit more.", "One sunny morning, Otto's friends called out. \"Come and play, Otto! Come and splash!\"", "Otto looked at the deep water. He took a deep breath. \"I can try,\" he said.", "Otto swam and swam. Kick, kick, kick! Now he was in the deep water!", "Splash! Splash! Otto and his friends splashed and laughed. The deep water was fun!", "That night, Otto snuggled close to Mum. \"I did it,\" he whispered. Good night, Otto."], "shelf": "ours", "title": "Otto the Otter's Big Splash"}, {"author": "Marco Silva", "band": "little", "color": "#4FB0C6", "cover": null, "emo": "🐧", "find": [{"ask": "Can you find Pablo?", "label": "Pablo", "p": 1, "x": 515, "y": 640}, {"ask": "Can you find the small slide?", "label": "the small slide", "p": 3, "x": 440, "y": 600}, {"ask": "Can you find the tall, tall slide?", "label": "the tall, tall slide", "p": 5, "x": 588, "y": 319}, {"ask": "Can you find the smooth, shiny slide?", "label": "the smooth, shiny slide", "p": 7, "x": 612, "y": 570}, {"ask": "Can you find Pippa and Nico?", "label": "Pippa and Nico", "p": 10, "x": 371, "y": 514}], "id": "lib-pablo-penguin", "pages": ["Pablo was a little penguin with a round, soft tummy. He loved to slide on the ice. Whee!", "One sunny morning, Pablo waddled out to find the best slide. Waddle, waddle went Pablo.", "First, Pablo found a small slide. He sat at the top. 'Ready, set, go!' he said.", "Down went Pablo. Bump, bump, bump! The slide was too bumpy. 'Not this one,' laughed Pablo.", "Next, Pablo found a tall, tall slide. It went up, up, up into the sky.", "Pablo slid down. Whoosh! Too fast, too fast! 'Not this one either,' said Pablo, giggling.", "Then Pablo saw a smooth, shiny slide. It sparkled in the sun. 'Maybe this one,' said Pablo.", "Pablo sat at the top. He took a deep breath. One, two, three... go!", "Down went Pablo. Swoosh! Smooth and slow, fast and fun. 'Wheee! This slide is just right!'", "Pippa and Nico came running. 'Can we slide too?' they asked. 'Yes!' said Pablo. 'Come and see!'", "One at a time, they slid. First Pippa. Whee! Then Nico. Whee! Then Pablo again. Taking turns is fun.", "The friends slid until the sun went down. 'Best slide ever,' said Pablo. 'Best friends ever,' they all said."], "shelf": "ours", "title": "Pablo the Penguin Finds His Slide"}, {"author": "Mina Hartley", "band": "little", "color": "#7FB069", "cover": null, "emo": "🐌", "find": [{"ask": "Can you find the swirly shell?", "label": "the swirly shell", "p": 1, "x": 372, "y": 719}, {"ask": "Can you find the tall pink flowers?", "label": "the tall pink flowers", "p": 5, "r": 200, "x": 435, "y": 277}, {"ask": "Can you find the leaf boat?", "label": "the leaf boat", "p": 7, "x": 650, "y": 656}, {"ask": "Can you find Turtle?", "label": "Turtle", "p": 8, "x": 783, "y": 497}, {"ask": "Can you find Mum?", "label": "Mum", "p": 11, "x": 772, "y": 518}], "id": "lib-suki-snail", "pages": ["Suki was a tiny snail with a shiny, swirly shell. She lived with Mum under the big green leaves.", "One morning, Suki slid far, far across the garden. Slide, slide, slide went Suki, slow and happy.", "Suki munched a soft leaf. Munch, munch, munch. Then she looked around. Oh! The garden was very big.", "The sun went down, down, down. 'Time to go home,' said Suki. 'Mum is waiting for me.'", "Suki slid past the tall flowers. Slide, slide. The flowers waved. 'Good night, Suki,' they whispered.", "Soon Suki came to a wide, wet stream. Splish, splash! How would little Suki cross the water?", "A big leaf floated by. Plop! Suki climbed on. The leaf boat carried her across. Float, float, float.", "On the other side, Suki met her friend Turtle. 'Climb on my back,' said Turtle. 'I will help you.'", "Clip, clop, clip, clop went Turtle's feet. Suki rode high on his shell. 'Thank you, Turtle,' said Suki.", "Turtle stopped by the soft grass. 'Your home is close now,' he said. Suki slid down. Slide, slide.", "The sky turned pink and gold. Suki slid and slid. Then she saw home, under the big green leaves!", "'You made it, my slow, brave Suki,' said Mum. Suki smiled big. 'I took the long way home.'"], "shelf": "ours", "title": "Suki the Snail's Long Way Home"}, {"author": "Owen Hartley", "band": "little", "color": "#4E8098", "cover": null, "emo": "🦊", "find": [{"ask": "Can you find the red mitten?", "label": "the red mitten", "p": 3, "x": 452, "y": 807}, {"ask": "Can you find Bunny?", "label": "Bunny", "p": 4, "x": 755, "y": 575}, {"ask": "Can you find the blue mitten?", "label": "the blue mitten", "p": 6, "x": 687, "y": 347}, {"ask": "Can you find the stripy mitten?", "label": "the stripy mitten", "p": 9, "x": 727, "y": 786}, {"ask": "Can you find the bowl of soup?", "label": "the bowl of soup", "p": 12, "x": 414, "y": 496}], "id": "lib-finn-fox", "pages": ["Finn was a little fox cub. He lived with Mama in a den under the snowy hill.", "One cold morning, Finn went out to play. Crunch, crunch went his paws in the snow.", "Look! A red mitten lay in the snow. \"Someone has a cold paw,\" said Finn.", "Finn picked up the red mitten. He trotted to Bunny's burrow. Knock, knock, knock!", "\"My mitten!\" said Bunny. \"Thank you, Finn!\" Bunny's paw was warm again. Hop, hop, hooray!", "Finn played on. Look! A blue mitten hung on a twig. \"Someone has a cold paw,\" said Finn.", "Finn carried the blue mitten to Mouse's house. Tap, tap, tap on the tiny door!", "\"My mitten!\" squeaked Mouse. \"Thank you, Finn!\" Mouse wiggled her warm paw. Squeak, squeak, hooray!", "Finn slid down the hill. Whee! Look! A stripy mitten sat on a stone.", "Finn took the stripy mitten to Owl's tree. \"Whoo is there?\" hooted Owl, waking up.", "\"My mitten!\" said Owl. \"Thank you, Finn!\" Owl fluffed her feathers. \"You are a kind, kind cub.\"", "Finn trotted home through the snow. Mama had hot soup waiting. \"Good night, my warm-hearted Finn.\""], "shelf": "ours", "title": "Finn the Fox and the Lost Mittens"}, {"author": "Poppy Linden", "band": "little", "color": "#A9713B", "cover": null, "emo": "🦔", "find": [{"ask": "Can you find the white feather?", "label": "the white feather", "p": 4, "x": 537, "y": 757}, {"ask": "Can you find the big red leaf?", "label": "the big red leaf", "p": 6, "x": 548, "y": 786}, {"ask": "Can you find the tuft of wool?", "label": "the tuft of wool", "p": 8, "x": 695, "y": 382}, {"ask": "Can you find the pink petal?", "label": "the pink petal", "p": 10, "x": 554, "y": 624}, {"ask": "Can you find the tiny mouse?", "label": "the tiny mouse", "p": 11, "x": 723, "y": 672}], "id": "lib-hazel-hedgehog", "pages": ["Hazel was a little hedgehog. She lived in a snug nest under the big, green hedge.", "The days were warm, but the nights turned chilly. Brr! Hazel hugged her little paws tight.", "\"I will make my nest soft and cosy,\" said Hazel. Off she went. Pat, pat, pat!", "First, Hazel found a feather. It was white and fluffy, and soft as a cloud.", "She tucked the feather into her nest. Soft, soft, soft! One soft thing.", "Next, Hazel found a big, red leaf. It was smooth and soft, like a tiny blanket.", "She tucked the leaf into her nest. Soft, soft, soft! Two soft things.", "Then Hazel found a tuft of wool. A sheep had left it on the fence. Fluffy, fluffy wool!", "She tucked the wool into her nest. Soft, soft, soft! Three soft things.", "Last, Hazel found a pink flower petal. It was the softest thing of all.", "Just then, a tiny mouse came by. The mouse was shivering. Brr, brr! \"I am so cold.\"", "\"Here, take my petal,\" said Hazel. The mouse snuggled in tight. \"Thank you, Hazel!\" Good night, little friends."], "shelf": "ours", "title": "Hazel the Hedgehog's Cosy Coat"}, {"author": "Rosa Delaney", "band": "little", "color": "#EF8FB5", "cover": null, "emo": "🐑", "find": [{"ask": "Can you find the picnic basket?", "label": "the picnic basket", "p": 2, "x": 550, "y": 693}, {"ask": "Can you find the log?", "label": "the log", "p": 4, "x": 495, "y": 721}, {"ask": "Can you find the shiny puddle?", "label": "the shiny puddle", "p": 5, "x": 427, "y": 790}, {"ask": "Can you find the hay bale?", "label": "the hay bale", "p": 6, "x": 718, "y": 443}, {"ask": "Can you find the red apple?", "label": "the red apple", "p": 12, "x": 334, "y": 536}], "id": "lib-lola-lamb", "pages": ["Lola was a fluffy little lamb. Her wool was soft and white like a cloud. Lola loved the green field.", "On the other side of the fence was a picnic. Yummy apples and sweet grass! All Lola's friends were there.", "Lola tried to jump the fence. Boing... thud. She landed in the soft grass. \"Oh,\" said Lola. \"Too high.\"", "\"I will practice,\" said Lola. First, she found a small log. \"One, two, three... jump!\" Over she went!", "Next, Lola found a shiny puddle. Splish, splash! She jumped right over it. \"I did it!\" she said.", "Then Lola saw a round hay bale. It was bigger. Lola took a deep breath. \"I can try.\"", "Run, run, run... BOING! Lola bounced over the hay bale. Her wool wiggled and jiggled. Whee!", "\"Hooray for Lola!\" cheered Goat. \"Baa, baa!\" cheered the other lambs. Lola smiled a big, woolly smile.", "Now it was time. Lola looked at the fence. The fence looked back. Lola wiggled her woolly bottom.", "Run, run, run! Lola ran fast. Her little legs went pat, pat, pat. \"One, two, three... JUMP!\"", "Up, up, up went Lola! Over the fence she flew. Boing! She landed soft and safe on the other side.", "\"You did it, Lola!\" cheered her friends. Together they munched sweet apples under the tree. What a happy picnic."], "shelf": "ours", "title": "Lola the Lamb's Woolly Jump"}, {"author": "Felix Marlowe", "band": "little", "color": "#5E6FA3", "cover": null, "emo": "🦉", "find": [{"ask": "Can you find the moon?", "label": "the moon", "p": 3, "x": 229, "y": 203}, {"ask": "Can you find the bat?", "label": "the bat", "p": 6, "x": 407, "y": 467}, {"ask": "Can you find the little fish?", "label": "the little fish", "p": 7, "x": 735, "y": 739}, {"ask": "Can you find the beehive?", "label": "the beehive", "p": 8, "x": 133, "y": 564}, {"ask": "Can you find the leaf blanket?", "label": "the leaf blanket", "p": 11, "x": 368, "y": 634}], "id": "lib-omar-owl", "pages": ["Omar was a young owl. Tonight was special. Tonight, Omar would stay up all night for the very first time!", "The sun went down. The sky turned soft and dark. Omar opened his big eyes wide. \"Hello, night!\"", "Up came the moon, round and silver. \"Hello, Omar,\" said the moon. Omar hooted softly. Hoo, hoo.", "The stars twinkled on, one by one. Twinkle, twinkle! Omar counted five. \"So many friends in the sky!\"", "In the grass, the crickets sang. Chirp, chirp, chirp! Omar bobbed his head to their tiny night music.", "Flap, flap! A friendly bat swooped by. \"Hello, Omar! Isn't the night lovely?\" \"Oh, yes!\" said Omar.", "Bat showed Omar the quiet pond. The moon danced on the water. Splash! A tiny fish jumped. Plip!", "Omar flew over the sleeping garden. The flowers were closed. The bees were dreaming. Shhh, whispered the wind.", "\"Hoo, hoo,\" yawned Omar. His eyes felt heavy. But he wanted to see the morning come.", "Slowly, slowly, the sky turned pink. Pink, then gold. \"Good morning, sun,\" whispered Omar. \"Good night, moon.\"", "Omar flew home to his cozy hollow tree. Mama Owl tucked a soft leaf blanket around him.", "\"I stayed up all night,\" said Omar, proud and sleepy. He closed his eyes tight. Good day, little Omar."], "shelf": "ours", "title": "Omar the Owl Stays Up"}, {"author": "Nell Ashford", "band": "little", "color": "#E2725B", "cover": null, "emo": "🐦", "find": [{"ask": "Can you find the nest?", "label": "the nest", "p": 1, "x": 500, "y": 278}, {"ask": "Can you find the little worm?", "label": "the little worm", "p": 6, "x": 556, "y": 758}, {"ask": "Can you find the bee?", "label": "the bee", "p": 7, "x": 726, "y": 288}, {"ask": "Can you find the blossom?", "label": "the blossom", "p": 9, "r": 200, "x": 470, "y": 150}, {"ask": "Can you find the bees?", "label": "the bees", "p": 12, "r": 200, "x": 670, "y": 556}], "id": "lib-ruby-robin", "pages": ["Ruby was a young robin with a round, red tummy. She lived in the old apple tree.", "Every morning, the big birds sang. Tweet, tweet, tweedle-dee! The whole garden woke up singing.", "But Ruby was too shy to sing. Her song hid deep inside her tummy.", "\"Just one little note,\" said Mama. \"One note is a fine place to start.\"", "Ruby took a deep breath. Tweet! One tiny note. It was small, but it was hers.", "The next day, Ruby sang two notes. Tweet, tweet! A little worm popped up to listen.", "The next day, Ruby sang three notes. Tweet, tweet, tweet! A bee buzzed along. Hum, hum.", "Day by day, Ruby's song grew. Four notes! Five notes! Six happy notes!", "Then one morning, the air smelled sweet. Blossom opened on the apple tree. Spring was here!", "Ruby took a deep, deep breath. She opened her beak wide, wide, wide.", "Out came her whole song! Tweet, tweet, tweedle-dee! It tumbled and twirled through the garden.", "The flowers opened. The bees hummed. The worms wiggled. \"Hooray for Ruby!\" sang the whole, happy garden."], "shelf": "ours", "title": "Ruby the Robin Sings Spring"}, {"author": "Margaret Ellery", "band": "teen", "color": "#0F4C81", "cover": null, "emo": "🔦", "id": "lib-teen-harbour-light", "narrate": true, "pages": ["Mara arrived at Gull Point with a duffel bag, a sketchbook, and instructions from her mother to 'actually go outside.' Grandpa kept the lighthouse on the point, as his father had, and he met her at the gate with a hug that smelled of salt and kerosene. 'You've grown,' he said. 'The light hasn't.' Below the tower, the little harbour town spread along the bay, and on the old stone pier stood a second, smaller light — dark, rusted, and, Grandpa said, retired longer than Mara had been alive.", "Sleep came slowly in the narrow tower room, with the great light sweeping past the window every twenty seconds. Mara was counting sweeps when she saw something else: a blink from down on the pier. The old harbour light. She sat up. It blinked again — long, long, short — then darkness. She grabbed her sketchbook and wrote the time: 9:04. 'Grandpa,' she called down the stairs, 'the pier light is on.' His voice floated up, sleepy and certain. 'Can't be, love. That lamp's been cold since before you were born.'", "Mara kept a log. Night two: the pier light woke at nine o'clock sharp, blinked its pattern, and went dark at nine-eleven. Night three: exactly the same, flash for flash. 'A boat's lamp?' she suggested at breakfast. Grandpa shook his head over his tea. 'A boat moves. This sits still and repeats itself, word for word, if lights have words.' That was the thing, Mara thought, and wrote it in block letters on a fresh page. It did look like words. Long. Long. Short. A pause. Then short, short, long. The same sentence, said every night, to nobody.", "The answer started in the lamp room's back cupboard, in a tin box of logbooks going back sixty years. Grandpa lifted one out with both hands. 'Before radios, keepers talked with light,' he said. 'Shutters on the lamp. Long flash, short flash, every letter has its pair.' He showed her a chart, printed when he was a boy: A was short-long, B was long-short-short-short, and so on, a whole alphabet made of light. 'Fishermen used it too, ship to shore.' Mara copied the chart into her sketchbook, her pencil racing. 'Then the pier light is spelling something.'", "It took three more nights and a great deal of crossing out. Mara sat at the window with the chart, whispering letters as the flashes came. Long, short-short-short... no, wait. She learned to wait for the pauses; the pauses were the spaces between letters, and the long pauses were the spaces between words. On Friday night, the whole message assembled itself on her page, and she read it twice before she believed it. THANK YOU. Then, again: THANK YOU. Then the pier light went dark, as if it had said all it came to say.", "'Thank you,' Mara said at breakfast, sliding the sketchbook across. 'Every night at nine. Who thanks a light, Grandpa?' She expected him to laugh. Instead he went very still, the way the harbour does before weather. He looked at the page a long time. 'Fifty years ago this week,' he said at last, 'there was a storm here that the town still talks about. I was twenty-two, and keeping this light for my father, who was ill. And out in that storm, in a boat far too small for it, was my friend Elias Hart.'", "The story came out slowly, with the tea going cold. Elias and his father had been bringing their fishing boat in when the engine died, and the storm pushed them toward the black rocks at the harbour mouth. 'The big light told them where the coast was,' Grandpa said. 'But the little pier light marked the channel — the one safe line of water between the rocks. I climbed down and lit it myself, in the rain, and trimmed it twice through the night, though the rules said one keeper stays at the main light.'", "'They came through the channel like a thread through a needle,' Grandpa said. 'Elias jumped off that boat, soaked to the skin, and grabbed my hands. He said: every year, on this night, I will thank the light. And he did. For years he rowed out on the anniversary and flashed it from his boat — thank you, in the old code. Then his family moved inland. The letters slowed, then stopped.' Grandpa turned the sketchbook page with one finger. 'I thought the promise had faded. Old men forget. It's allowed.' 'Apparently,' Mara said, 'it isn't.'", "Mara investigated the way Grandpa investigated weather: by asking everyone. The harbourmaster, Mrs. Adeyemi, checked her ledger and laughed. 'That old lamp? A family paid to have a little solar light fitted inside it last spring. Private arrangement. It runs a timed programme, one week a year.' 'Which family?' Mara asked, though her heart was already answering. 'Hart,' said Mrs. Adeyemi. 'Old Mr. Elias Hart, across the bay. His granddaughter did the paperwork. Sweet girl. Said it was for an anniversary.' Mara wrote it all down, underlining anniversary three times.", "Back at the tower, Mara opened the oldest logbook to the storm. Grandpa's young handwriting, blurred by damp, filled the page: Wind NW, violent. Pier light lit by hand, 8 p.m. Hart boat through channel, 11:40. All safe. And the date at the top made her sit down slowly. The storm had happened exactly fifty years ago — tonight. 'The solar lamp runs one week,' she said. 'Tonight is its last night. Tonight is the actual anniversary, Grandpa. The real thank-you is tonight.' Outside, the evening was coming down clear and calm.", "Grandpa was quiet a long time. 'A man doesn't need thanking for doing his job,' he said. 'No,' said Mara. 'But a friend might need to finish saying it.' She watched him decide. Then he stood, took his old keeper's coat from its hook — the heavy one, with the brass buttons — and put it on like he was reporting for duty. They took the little boat across the bay as the light began to fail, Grandpa rowing with the slow, even strokes of a man who had crossed this water ten thousand times.", "Kate, the granddaughter, answered the door, looked at the coat, and called over her shoulder: 'Grandad! It's him.' Elias Hart was eighty-nine, folded into a wheelchair by the window with a blanket over his knees and a telescope aimed at Gull Point. He stared at Grandpa. Then he said, in a voice like gravel and honey: 'You kept the light burning all night. Fifty years I've been trying to thank it properly.' 'You thanked it every year,' Grandpa said gruffly. 'From a boat, Tom. A man should say some things to a face.'", "There was tea, and cake, and fifty years of news traded across a small table. Kate explained the solar lamp: when Elias could no longer row out, he had asked her to find a way for the light itself to say it. 'He made me promise it would be the real code,' she said. 'His code. Letter by letter.' Elias waved a hand at the window. 'Nine o'clock,' he said. 'Both of you. Out on the point of the garden. If a thing has been said for fifty years, it should be heard properly at least once.'", "At nine o'clock, across the dark water, the old pier light woke and began, letter by letter: THANK YOU. Elias watched with his hands folded, saying the letters aloud like a prayer. Beside Mara, Grandpa lifted the storm lantern Kate had lit for him and answered in the same old code, slow and sure: ALL SAFE. The pier light flashed once more — a single long, contented blink — and went dark for another year. In her sketchbook, Mara wrote the last line of the log: Message received. Fifty years in the sending. Worth every one."], "shelf": "ours", "title": "The Harbour Light"}, {"author": "Ruth Callahan", "band": "teen", "color": "#2B3A67", "cover": null, "emo": "🌙", "id": "lib-teen-night-train", "narrate": true, "pages": ["The night train north left at eight-forty, and Willa's mother checked her ticket four times before the platform clock reached eight. 'Aunt Bea will be at the other end,' she said. 'Mr. Halloran, the conductor, knows you're travelling alone. Twelve is plenty old enough, whatever your grandmother says.' Willa hugged her hard, climbed up with her blue suitcase, and found her seat by the window. The carriage smelled of warm dust and tea. Outside, the platform lights slid away, and the journey began the way journeys do: quietly, then all at once.", "Willa liked a carriage the way she liked a library: everyone in it was mid-story. Across the aisle, an elderly woman was knitting something long, red, and apparently endless. Two seats up, a young man cradled a guitar case like a sleeping child. A nurse in uniform slept with her shoes neatly paired beneath her seat and a paperback face-down on her lap, losing her page and not minding. And the conductor, Mr. Halloran, moved down the aisle punching tickets with the air of a man shelving books he loved.", "By the second stop, something was wrong. Mr. Halloran came through the carriage three times: once for tickets, once for the heating, and once simply patting his pockets, slower each time. At Willa's seat he stopped. 'You haven't seen a book, have you? Brown leather, this size.' He held his hands apart. 'My logbook. Every night run, I write the journey down — times, weather, passengers, everything. Forty years of nights in that book, and tonight's page is waiting.' He patted his pockets again. 'And I have put it down somewhere between here and the engine.'", "Willa was not a detective, but she was a noticer, and a train is only so long. She started a page in her notebook: LOG BOOK — LAST SEEN. The knitting woman, whose name was Mrs. Dove, said Mr. Halloran had been writing in it in the dining car before the first stop. The young man with the guitar had seen him carrying it near the luggage van, under one arm, with a torch in his teeth. 'So it travelled,' Willa wrote, 'the whole length of the train. Like everybody else. It just hasn't arrived.'", "In the dining car, the attendant was polishing glasses that were already clean. 'Halloran?' she said. 'He was in and out like weather tonight. A passenger felt faint at the last stop — an old gentleman — and your conductor carried his bags and sat with him till the colour came back. Left in a hurry after.' Willa looked at the tables: cups, a folded newspaper, a baby asleep against its mother's shoulder while the mother ate one-handed, heroically. No brown book. But she wrote in her notebook: He put it down to help somebody. That's where it will be.", "Past midnight the train changed its mind about being awake. The guitarist, asked nicely by nobody at all, played three songs so quietly they were mostly fingertips, and one by one the carriage surrendered. Mrs. Dove's knitting slowed, then stitched itself into her dreams. The nurse slept on. Willa, wide awake in the middle of all this sleeping, did the only thing that felt right: she opened her notebook and wrote the journey down. Times. Weather. Passengers, everything. She did not notice she was keeping a logbook. She only noticed that writing people down made her fonder of them.", "At the two o'clock stop, in a town Willa had never heard of, the old gentleman who had felt faint got carefully down from the train carrying a bunch of white flowers wrapped in newspaper. 'My daughter runs the night café at the next station,' he told Willa, who had come to stretch her legs. 'Thirty years she's worked nights. Somebody should arrive with flowers occasionally, even at two in the morning. Especially at two in the morning.' Mr. Halloran, passing with his lamp, touched his cap to the flowers like they were a passenger too.", "Back in the carriage, Willa walked the aisle slowly, looking the way you look for a dropped earring: low, and at an angle. Beside the seat where the old gentleman had sat — seat fourteen, she had written it down — something showed under the heater grille. She knelt. It was a page corner, torn soft with age, covered in pencil handwriting: ...flowers for the night café. Delivered safely. Her heart went like the train wheels. A page from the logbook. Which meant the logbook itself was somewhere close, and had been opened here, and had lost a page here.", "Mr. Halloran came at her call, lamp in hand, and together they searched seat fourteen the way archaeologists search: everything lifted, everything shaken. The blanket. The timetable rack. The gap behind the seat-back, where lost things go to wait. His hand stopped. 'Well,' he said softly, and drew out a brown leather book, dusty and entirely unharmed. 'I put it somewhere safe,' he said, 'while I lifted the gentleman's bags. Somewhere so safe I outwitted myself.' He held it like a caught fish. 'Forty years, and it's the passengers who find it for me.'", "He showed her the book properly then, at the little fold-down table, while the train ran on through the dark. Every page was a night; every night was a list of small, exact kindnesses of attention. Parcel for the signalman — delivered. Girl asleep, blanket tucked. Violinist, nervous: played beautifully. 'And here,' he said, turning back twenty-five years of pages, 'is my favourite passenger.' Willa read the entry, and her breath caught. Girl, twelve, blue suitcase, travelling alone to her aunt. Brave as a lighthouse. Name: E. Hartley. Her mother's name was Ellen Hartley.", "Dawn came up the way it does in the north: slowly, then everywhere. The windows filled with pale gold, with pine forest, with a lake lying still as a held breath. Passengers surfaced one by one — the nurse folding her paperback away, her stop next; Mrs. Dove holding up the endless red knitting, which had become, in the night, most of a scarf. 'For my grandson,' she said. 'He works nights too. Everyone I love works nights or travels them.' Willa wrote that down too, word for word, because it felt like the whole journey in one sentence.", "Before the last stop, Mr. Halloran did something conductors do not do. He opened the logbook to tonight's page — times, weather, and one line already written: Logbook lost. Logbook found by a passenger who notices things — and held out his pencil. 'Finish it,' he said. 'You kept the better record tonight.' So Willa wrote the carriage, one line each, the way he had taught her without knowing: Flowers delivered at two in the morning. Scarf: nearly finished. Guitarist: played us all to sleep. Nurse: shoes paired, page lost, unbothered. Girl with blue suitcase: arrived.", "The train sighed into the last station in full morning, and there was Aunt Bea on the platform in a yellow coat, holding a thermos like a lantern and looking exactly like Willa's mother would in thirty years. Mr. Halloran handed Willa down himself. 'Oh — ' she said, and dug in her pocket. 'Your page.' The torn corner, kept safe all night. He took it gravely and pressed it between the logbook's covers. 'It'll go back in with a stitch of tape,' he said. 'All the best logbooks have one page that's been on an adventure.'", "They watched the train pull out together, the carriage windows already emptying of stories. Mrs. Dove waved her scarf. The guitarist lifted his case in salute. Then the platform was just Willa and Aunt Bea and the smell of coffee from the thermos, and the whole north morning bright around them. 'Good trip?' Aunt Bea asked. Willa thought of the logbook, riding on without her, filling with new names. 'Everyone arrived,' she said. That night, in a fresh notebook Aunt Bea gave her, she wrote the first line: Keep the record. Notice everybody. It counts as arriving too."], "shelf": "ours", "title": "The Night Train North"}, {"author": "Henry Corder", "band": "teen", "color": "#4C7C34", "cover": null, "emo": "🍎", "id": "lib-teen-orchard-map", "narrate": true, "pages": ["Jonah arrived at the farm on the first Saturday of March with a backpack, a bicycle with a wobbly wheel, and a whole growing season ahead of him. While his parents rebuilt their kitchen back in the city, he was Grandma Rosa's. She met him at the orchard gate holding a clothbound notebook soft with age. 'Your grandfather drew maps of everything,' she said, 'but this one is mine.' Inside the cover, in ink faded to the colour of weak tea, was the orchard — every tree drawn, dated, and named.", "'Every tree in this orchard was planted for something,' Grandma Rosa said, turning pages. 'We never planted just a tree. We planted a year.' There were forty-one trees on the map, each with a date and a few words in her small, square handwriting. Some Jonah knew — the big apple by the gate. Others were mysteries at the far end of the rows. 'Your job this season,' she said, 'is to find every one and tell me if my map is honest.' She handed him a pencil. 'Orchards change. Maps should keep up.'", "He started with the oldest. In the map's first row, in the steadiest handwriting: Wedding apple, planted the spring I married your grandfather. The tree stood at the top of the orchard, broad and unhurried, its branches just breaking into blossom. 'He wanted to plant roses,' Rosa said, coming up behind him with two mugs. 'I said roses last a week. Plant something that feeds people.' She touched the trunk the way you'd pat an old friend's shoulder. 'Sixty harvests we've had off this tree. He ate the first apple. I ate the second.'", "The pear tree by the well had two trunks growing from one root, curving apart and then, higher up, leaning back together. The map said: For the twins, who arrived together and have been arguing about direction ever since. 'Your mother and your Uncle Marek,' Rosa said. 'Born twenty minutes apart, opposite about everything since. So I planted a tree that couldn't decide either.' Jonah climbed into the fork where the trunks divided and sat there eating last year's stored pears, while Rosa told him which twin had once fallen out of it. Both, it turned out. Twice.", "His own tree stood in the middle rows: a walnut, planted the week he was born. The note under it made him grin and groan at the same time: For Jonah. Walnuts are patient. So is he, mostly. 'You planted a tree for me before I could even sit up?' 'I planted it the day your mother telephoned,' Rosa said. 'A walnut takes its time. Fifteen years to a real harvest. I thought you two could grow up together and race.' Jonah measured himself against the trunk. The tree was winning by about four feet.", "Not every mark on the map was a tree. In the bottom row, Jonah found a stump, grey and hollow, with a ring of new shoots around its base. The map called it The storm ash, and under the name Rosa had written only: Grieve. Then plant again. 'That ash was planted the year the well ran dry and we nearly lost the farm,' she said. 'Lightning took it the summer your mother turned ten.' She nodded at a plum tree flourishing two paces away. 'So we grieved. Then we planted again. Both things. In that order.'", "The quince tree stood by itself near the garden fence, smaller than the others, and the map gave it the longest note: For Tomas, who planted half this orchard and taught the rest of it to be kind. Jonah knew his grandfather only from photographs and from the way Rosa's voice changed. 'Quince is no good raw,' she said, picking a fallen fruit from the grass. 'Sour as a Monday. But cook it, and it turns sweet and pink and patient. Like grief, your grandfather would have said. It just needs time and heat.'", "One tree on the map had no words at all — a cherry in the far corner marked with an ink star. Rosa only smiled and said, 'Ask around. Some stories aren't mine to write down.' So Jonah asked Mr. Osei at the fence, and the man's face opened like a gate. 'That cherry is my Abena's,' he said. 'Your grandmother's goddaughter. When we moved to Canada, the child cried for this orchard. Rosa planted the cherry the week we left, so Abena would always own one tree in this country. She sends photographs of it to her every spring.'", "Summer made the map into a work list. In the dry weeks, Jonah hauled buckets from the well to the young trees, two at a time, until his arms ached pleasantly. He propped the wedding apple's lowest branch with a forked stick so its fruit wouldn't drag. He learned which trees the wasps favoured and which the birds had already claimed. 'People think an orchard is planting,' Rosa said, watching him tie a label straight. 'Planting is one afternoon. An orchard is the ten thousand mornings after.' Jonah wrote that in the notebook's margin.", "Near the back of the notebook, after the last drawn tree, Jonah found a page Rosa had left almost empty. One line, in the small square handwriting: The next tree is yours to choose. 'Mine?' he said. 'To plant, or just to pick?' 'To plant,' said Rosa. 'Choosing is planting, done slowly.' All through September, while the apples reddened and the pears turned gold, Jonah thought about it the way you carry a stone in your pocket. What did a twelve-year-old have that was worth a tree? What year was this, in his life, that the orchard should remember?", "Harvest weekend, the family came: his parents with paint still on their sleeves, Uncle Marek, cousins, neighbours. Jonah walked them down the rows with the notebook like a tour guide in a museum where everything was edible. The wedding apple. The twins' pear, where his mother stood quietly a moment, one hand on each trunk. The storm ash. Abena's cherry, photographed for Canada. At the long table, Rosa set out one dish from every marked tree. 'Eat carefully,' she said. 'You are eating sixty years of this family, and most of it is pudding.'", "Jonah made his choice the way Rosa had taught him: slowly, then all at once. Every tree in the orchard, he had noticed, was planted by Rosa for somebody else. Nobody had ever planted one for her. So on the last Saturday of October, with the family still there to help dig, he planted a fig tree in the sunny corner by the garden fence, where she took her morning tea. 'What's this one for?' Rosa asked, though her eyes were already shining. 'Read the map,' Jonah said. 'You're in it now.'", "That evening, Jonah drew the fig tree onto the map, in the corner by the fence, in his own rounder handwriting. Under it he wrote the note, the way she had written all the others: For Rosa, who planted everybody. Rosa read it twice. Then she took the pencil — the first time she had touched the map all season, Jonah realised — and underneath, in the small square letters, she added one word: Received. 'There,' she said. 'Now the map is honest. An orchard should include the gardener. Even she forgets that.'", "Jonah went home when the kitchen was finished and the first frost silvered the orchard grass. The notebook stayed on Rosa's shelf, where it belonged, but it was different now: it had his handwriting in it, and one new tree, and a pencil mark beside the fig that said Received. On the last page, before he left, he had drawn one more thing — an empty circle at the end of the rows, with no name and no date. 'What's that for?' Rosa asked. 'Next year,' Jonah said. 'Something will happen. It always does.'"], "shelf": "ours", "title": "The Orchard Map"}, {"author": "Ingrid Sorensen", "band": "teen", "color": "#C75B39", "cover": null, "emo": "🐢", "id": "lib-teen-reef-keepers", "narrate": true, "pages": ["Tessa and Leo arrived at the marine station with matching sunburns from the ferry and a letter from their school that called them 'junior volunteers,' which Leo said sounded like a promotion and Tessa said sounded like a warning. Dr. Iversen, who ran the station, led them straight past the aquariums to the big map of the bay. 'Twenty years ago this reef was rubble,' she said, tapping a blue patch the size of a thumbprint. 'Now it's coming back. Your job this summer: prove it, species by species.'", "Training took three days and most of it was rules. Swim the line. Count everything inside the tape. Write it on the slate, even the boring things — especially the boring things. 'A survey is a promise,' Dr. Iversen said. 'You write what is there, not what you hope is there.' On the fourth morning they snorkelled the reef edge for the first time, and Tessa understood: recovery did not look like a coral palace. It looked like patches. Living coral the size of dinner plates. Sea grass holding the sand like green hair. Small fish, everywhere, like sparks.", "Their first full survey took all morning and four slates each. Back at the station, dripping on the concrete, they read their counts aloud while Dr. Iversen entered them beside the old records. Parrotfish: up. Sea fans: up. Urchins — the good kind, the grazers that keep the coral clean: way up. Then Leo stopped at the bottom of his slate. 'What's this one?' he asked. 'I wrote \"orange slug, extremely fancy.\"' Dr. Iversen looked, and went quiet, and then smiled like sunrise. 'A Spanish shawl nudibranch,' she said. 'Not recorded on this reef for fifteen years.'", "The seahorse found Tessa, really. She was hovering over the sea grass in square H-4, counting shrimp, when the grass in front of her nose turned out to have eyes. It was the colour of weak tea and exactly the size of her thumb, curled around a grass stem, swaying like it was listening to music only it could hear. Tessa forgot every rule about staying calm and shot to the surface so fast she swallowed seawater. 'H-4!' she spluttered. 'There's a horse in H-4!' Leo wrote it on the slate in capital letters: SEAHORSE. ONE. ALIVE. UNDERLINED TWICE.", "Then the storm came, the way summer storms do: all at once and from nowhere. For two days the bay boiled grey-white, the boats stayed in, and the survey boat never left its mooring. Tessa stood at the station window watching the rain hammer the harbour and thought about a seahorse the size of her thumb, holding on to a grass stem in all that. 'Write it down,' Dr. Iversen said, handing her the log. 'No survey. Storm. Worried.' 'Worried is data?' 'Worried is honest,' she said. 'Science can use honest. It can't use pretending.'", "The first calm morning, they surveyed like doctors after an accident: gently, and telling the truth. Two coral heads had cracked. Sand had buried one corner of the transect. But the sea grass meadow — the reef's soft green bodyguard — had bent and held, and behind it the main reef stood scuffed and living. In H-4 the grass was flattened like a slept-in bed, and there was no seahorse anywhere. 'Not seen,' Leo wrote on the slate, firmly, before Tessa could say anything sad. 'Not seen is not the same as gone. You taught us that.'", "The turtle arrived on a Tuesday, unannounced, the size of a coffee table. A green turtle, grazing the sea grass meadow with the slow seriousness of a cow in a field, tearing up whole mouthfuls and letting the scraps drift. Green turtles only graze where the grass is rich enough to be worth the trip. The station's oldest logbook had a photograph of the last one, dated eleven years before. Dr. Iversen sent Tessa for the camera and Leo for the log, and the three of them floated at a respectful distance, grinning through their masks like idiots.", "Old Mr. Calloway mended nets outside the station most afternoons, and had opinions about everything, including them. 'When the reserve was drawn up, I fought it,' he told Leo, not looking up from his net. 'Twenty years I called that reef finished. Rubble and ghosts.' His hands never stopped. 'My grandfather fished it when it was a city down there. Parrotfish like dogs. Groupers you could saddle.' He nodded toward the water. 'Your turtle says the city is rebuilding. I am too old to say sorry to a reef. So I say it to you two instead.'", "Evenings belonged to the data. In the station's back room, with fans turning and geckos on the ceiling, the cousins turned a summer of wet slates into one clean chart: every species, every count, this year against the old years. The line climbed like stairs. Thirty-eight species in the first survey, the year the reserve began. Fifty-one five years later. And this summer — Leo added the column twice, then a third time, because some numbers you check like a knot — seventy-four. 'That's not a reef recovering,' Dr. Iversen said. 'That's a reef insisting.'", "The harbour festival gave the station a booth between the boat races and the cake stall, and the cousins had three days to fill it. They built the display around the chart, with photographs pinned like windows: the nudibranch, the turtle, the meadow in flat rows. Over the top, in Leo's lettering, went Mr. Calloway's words: THE CITY IS REBUILDING. 'You talk,' Leo said. 'You have the voice. I'll stand by the turtle photo and answer questions.' 'What if they ask something I don't know?' 'Then say the truest sentence,' he said. 'We didn't see it — yet.'", "The day before the festival, they made one more survey, and Tessa made Leo save H-4 for the end. The grass had lifted after the storm, stem by stem. She counted shrimp. She counted snails. And then the grass in front of her nose had eyes — the same seahorse, or its twin, tea-coloured and swaying. Beside it, smaller and paler, hung a second. And the first one's belly was round with a brood pouch full of eggs. Tessa surfaced slowly this time, holding the news carefully, like a full cup. 'Two,' she said. 'And one of them is expecting.'", "Festival day smelled of grilled corn and rope and sunscreen. The booth stayed busy from the first boat race: children wanted the turtle, fishermen wanted the chart, and everybody wanted the orange slug. At noon, on the harbour stage, Tessa told the whole summer in four minutes — rubble, rules, storm, turtle — with her voice only shaking at the start. In the front row, Mr. Calloway listened with his net folded on his knees like a newspaper. 'Seventy-four species,' Tessa finished. 'The highest count in twenty years. The reef is not finished. Neither are we.'", "Afterwards, when the bunting sagged and the cake stall was down to crumbs, Dr. Iversen called the cousins into the back room. Their logbooks lay on the table, entered, checked, and complete. She signed the last page of each, and under her signature she wrote two words in the green ink the station had used for fifty years. 'The station has a name for volunteers who finish a survey honestly,' she said. 'Keepers.' Tessa looked at the words until they blurred. Reef Keepers. 'It isn't a prize,' Dr. Iversen added. 'It's a job description. It means: come back.'", "On their last evening, the cousins sat on the jetty with their feet in the water and the logbooks shut beside them, which felt strange after a summer of writing everything down. Below them, invisible in the darkening bay, the reef went on with its own evening: fish settling, fans swaying, a turtle asleep in the grass, two seahorses holding on like tiny anchors. 'Next summer,' Leo said, 'H-4 first.' 'Next summer,' Tessa agreed, 'we count what the eggs became.' The ferry would come at dawn. The reef, they knew now, would be there to be counted."], "shelf": "ours", "title": "The Reef Keepers"}, {"author": "Hattie Bloom", "band": "little", "color": "#66BB6A", "cover": null, "emo": "🐢", "find": [{"ask": "Can you find the drum?", "label": "the drum", "p": 2, "x": 436, "y": 638}, {"ask": "Can you find the red flowers?", "label": "the red flowers", "p": 6, "r": 200, "x": 385, "y": 590}, {"ask": "Can you find the butterfly?", "label": "the butterfly", "p": 8, "x": 650, "y": 230}, {"ask": "Can you find the ducks?", "label": "the ducks", "p": 10, "r": 200, "x": 705, "y": 600}, {"ask": "Can you find the berries?", "label": "the berries", "p": 11, "x": 588, "y": 818}], "id": "lib-tilly-turtle", "pages": ["Tilly was a little turtle. Today was parade day in the garden. Tilly smiled. \"I will lead the parade!\"", "Rabbit thumped his drum. Boom, boom, boom! Frog shook his bells. Tinkle, tinkle! The parade was ready.", "\"Let's go!\" said Tilly. Step... step... step. Tilly walked slow, slow, slow.", "Whoosh! Rabbit raced ahead. Zoom! Frog hopped ahead. \"Hurry, Tilly, hurry!\" they called.", "But Tilly kept her slow pace. Step... step... step. \"Wait,\" said Tilly. \"Look at the flowers!\"", "Rabbit stopped. Frog stopped. Red flowers, yellow flowers, pink flowers! They smelled so sweet.", "\"Listen!\" said Tilly. The bees hummed a soft song. Hum, hum, hum. The parade hummed along.", "A butterfly danced over the path. \"Oh!\" said Frog. \"So pretty!\" Everyone watched her flutter by.", "Now the friends walked slow, too. Step... step... step. Rabbit played his drum soft and slow. Boom... boom...", "They passed the pond. The ducks waved. Quack, quack! \"What a lovely parade!\" called the ducks.", "At the big tree, the parade stopped for a rest. Everyone shared cool water and sweet berries. Yum!", "\"Thank you, Tilly,\" said Rabbit. \"Slow is happy.\" The friends snuggled under the big tree. What a wonderful parade."], "shelf": "ours", "title": "Tilly the Turtle's Slow Parade"}, {"author": "Nell Ashford", "band": "little", "color": "#C77DBB", "cover": null, "emo": "🦋", "find": [{"ask": "Can you find Bella?", "label": "Bella", "p": 1, "x": 452, "y": 525}, {"ask": "Can you find the butterflies?", "label": "the butterflies", "p": 2, "r": 200, "x": 541, "y": 222}, {"ask": "Can you find the bee?", "label": "the bee", "p": 5, "x": 415, "y": 354}, {"ask": "Can you find the roses?", "label": "the roses", "p": 10, "r": 200, "x": 632, "y": 607}, {"ask": "Can you find the flower?", "label": "the flower", "p": 12, "x": 595, "y": 685}], "id": "lib-bella-butterfly", "pages": ["Bella was a little butterfly. Her wings were purple and pink, soft as flower petals.", "All the other butterflies flew up high. Flap, flap, flap! They danced in the warm sun.", "Bella looked down at the ground far below. 'Oh my,' she said. 'It is so high.'", "Bella held on tight to her flower. Her little wings went tremble, tremble, tremble.", "A friendly bee buzzed by. 'Hello, Bella! Come and fly with me to the roses.'", "'I am scared,' said Bella. 'What if my wings are not strong enough to fly?'", "Bee smiled. 'Start with a little hop. Just one, two, three, and up you go!'", "Bella took a deep breath. One, two, three... Hop! She lifted up off the flower!", "Flap, flap! Bella's wings carried her up, up into the soft blue sky. 'I am flying!'", "Bella flew over the garden with Bee. The roses waved below. Hello, roses! Hello, sun!", "Bella did a little loop in the air. Loop-de-loop! 'Look at me!' she laughed with joy.", "When the sun went down, Bella landed on her flower. 'Good night, wings,' she whispered. 'Tomorrow we fly again.'"], "shelf": "ours", "title": "Bella the Butterfly's First Flight"}, {"author": "Tom Ellery", "band": "little", "color": "#B08968", "cover": null, "emo": "🐻", "find": [{"ask": "Can you find the honey pot?", "label": "the honey pot", "p": 3, "x": 448, "y": 624}, {"ask": "Can you find the red blanket?", "label": "the red blanket", "p": 4, "x": 515, "y": 668}, {"ask": "Can you find Rabbit?", "label": "Rabbit", "p": 6, "x": 688, "y": 634}, {"ask": "Can you find Duck?", "label": "Duck", "p": 8, "x": 724, "y": 619}, {"ask": "Can you find the red berries?", "label": "the red berries", "p": 9, "x": 447, "y": 687}, {"ask": "Can you find the bees?", "label": "the bees", "p": 10, "r": 200, "x": 485, "y": 121}], "id": "lib-bruno-bear", "pages": ["Bruno was a little bear cub. He lived in a cosy cave under the tall pine trees.", "One sunny morning, Bruno woke up hungry. His tummy went rumble, rumble, rumble! 'Time for breakfast,' he said.", "Bruno found a pot of golden honey. 'Yum!' he said. 'Honey is best when I share it.'", "'I will have a picnic!' said Bruno. He put the honey pot on a soft, red blanket.", "Bruno carried the blanket to the sunny meadow. He laid it flat under a big, leafy tree.", "Rabbit hopped by. Hop, hop, hop! 'Hello, Bruno,' said Rabbit. 'Can I sit with you?'", "'Yes!' said Bruno. 'Have some honey.' Rabbit took a tiny taste. 'Sweet and yummy!' said Rabbit.", "Duck waddled up. Waddle, waddle! 'Can I join the picnic too?' asked Duck. 'Yes, come and sit!'", "Mouse came too, with three red berries. 'For the picnic,' squeaked Mouse. Bruno smiled a big smile.", "They ate honey and berries in the warm sun. Buzz, buzz went the happy bees above.", "When the pot was empty, Bruno licked his paws. 'That was the best picnic ever,' he said.", "The friends waved goodbye. Bruno folded his blanket and walked home. Good night, little Bruno. Sleep tight."], "shelf": "ours", "title": "Bruno the Bear Cub's Honey Picnic"}, {"author": "Henry Corder", "band": "little", "color": "#C08552", "cover": null, "emo": "🐶", "find": [{"ask": "Can you find the wriggly worm?", "label": "the wriggly worm", "p": 4, "x": 559, "y": 628}, {"ask": "Can you find the shiny pebble?", "label": "the shiny pebble", "p": 5, "x": 368, "y": 797}, {"ask": "Can you find the pile of dirt?", "label": "the pile of dirt", "p": 7, "x": 686, "y": 407}, {"ask": "Can you find the heart stone?", "label": "the heart stone", "p": 8, "x": 575, "y": 783}, {"ask": "Can you find the front door?", "label": "the front door", "p": 11, "x": 772, "y": 415}], "id": "lib-buster-puppy", "pages": ["Buster was a little puppy with floppy ears. He loved to dig in the garden. Dig, dig, dig!", "One sunny morning, Buster sniffed the soft dirt. Sniff, sniff! \"Something is down there,\" he barked.", "Buster dug with his front paws. Dig, dig, dig! Dirt flew up, up, up into the air.", "Out popped a wriggly worm. \"Hello, little worm,\" said Buster. The worm wiggled and slid away.", "Buster dug some more. Dig, dig, dig! He found a shiny pebble, smooth and round.", "\"That is pretty, but it is not treasure,\" said Buster. \"I will keep digging. Dig, dig, dig!\"", "The hole grew bigger and bigger. A pile of dirt grew taller and taller behind Buster.", "Then Buster saw something sparkle in the dirt. It was smooth and round and shaped like a heart!", "A heart stone! This was the treasure. Buster picked it up gently in his mouth.", "Buster ran across the garden, tail wagging fast. \"Look what I found for you!\" he barked.", "His family smiled and patted his head. They put the heart stone by the front door.", "That night, Buster curled up in his soft bed. Digging for treasure was the best day ever. Good night, Buster."], "shelf": "ours", "title": "Buster the Puppy Digs for Treasure"}, {"author": "Ingrid Sorensen", "band": "little", "color": "#D96C4F", "cover": null, "emo": "🦀", "find": [{"ask": "Can you find the tall tower?", "label": "the tall tower", "p": 4, "x": 584, "y": 264}, {"ask": "Can you find Star?", "label": "Star", "p": 5, "x": 418, "y": 777}, {"ask": "Can you find the pretty shells?", "label": "the pretty shells", "p": 6, "r": 200, "x": 634, "y": 558}, {"ask": "Can you find the white feather?", "label": "the white feather", "p": 7, "x": 480, "y": 180}, {"ask": "Can you find the moat?", "label": "the moat", "p": 10, "x": 685, "y": 665}], "id": "lib-coco-crab", "pages": ["Coco was a little red crab. She lived by the sea, where the sand was soft and warm.", "\"Today I will build a sandy castle,\" said Coco. Click, click went her happy claws.", "Coco scooped up sand with her big claws. Scoop, scoop, scoop! A little sand hill grew.", "She patted the sand into a tall tower. Pat, pat, pat! \"What a fine tower,\" said Coco.", "A little starfish wriggled over to watch. \"Can I help?\" asked Star. \"Yes, please!\" said Coco.", "Star found pretty shells on the sand. They put the shells all around the castle walls.", "A seagull dropped a soft white feather. \"A flag for the top!\" laughed Coco. She pushed it in.", "A tiny wave rolled in. Whoosh! It washed one wall smooth. \"Oh no,\" said Coco.", "Star and Coco patted the wall back up. Pat, pat, pat! Soon the castle was strong again.", "They dug a little moat all around the castle. Dig, dig, dig! The water sparkled in the sun.", "The sun went down, soft and orange. \"Our castle is the best on the beach,\" said Star.", "Coco scuttled home under the sand to sleep. She dreamed of castles. Good night, Coco. Click, click."], "shelf": "ours", "title": "Coco the Crab's Sandy Castle"}, {"author": "Poppy Linden", "band": "little", "color": "#8A6D4B", "cover": null, "emo": "🦌", "find": [{"ask": "Can you find the robin?", "label": "the robin", "p": 3, "x": 678, "y": 188}, {"ask": "Can you find the frog?", "label": "the frog", "p": 4, "x": 676, "y": 426}, {"ask": "Can you find the big mushroom?", "label": "the big mushroom", "p": 6, "x": 732, "y": 533}, {"ask": "Can you find the butterfly?", "label": "the butterfly", "p": 9, "x": 602, "y": 230}, {"ask": "Can you find Mum?", "label": "Mum", "p": 12, "x": 482, "y": 508}], "id": "lib-danny-deer", "pages": ["Danny was a little fawn. One morning, he saw a leafy path. \"Where does it go?\"", "Danny stepped onto the path. His hooves went tap, tap, tap on the soft ground.", "A robin sang in a tree. \"Good morning, Danny!\" Danny smiled and waved his tail.", "By the stream, Danny met a frog. \"Hello!\" said the frog. Splish, splash, hop!", "Danny took a cool drink. The water was sweet and clear. Yum, yum, yum!", "Under a mushroom, a hedgehog was sleeping. \"Shh,\" whispered Danny, tiptoeing past very quietly.", "The path went up a little hill. Danny climbed and climbed. Huff, puff, puff!", "At the top, Danny saw the whole forest. \"Wow!\" he said. \"It is so big!\"", "A butterfly danced around his ears. Danny laughed and danced a little dance too.", "Then Danny heard Mum calling. \"Danny! Danny!\" He turned and followed the path back.", "Tap, tap, tap went his hooves. Past the stream, past the tree, all the way home.", "Mum nuzzled Danny gently. \"You made friends today,\" she said. Danny snuggled close. Good night."], "shelf": "ours", "title": "Danny the Deer's Forest Path"}, {"author": "Marco Silva", "band": "little", "color": "#9AA5B1", "cover": null, "emo": "🐘", "find": [{"ask": "Can you find Eddie?", "label": "Eddie", "p": 1, "x": 537, "y": 568}, {"ask": "Can you find Eddie's big ears?", "label": "Eddie's big ears", "p": 2, "r": 200, "x": 637, "y": 351}, {"ask": "Can you find Monkey?", "label": "Monkey", "p": 5, "x": 693, "y": 579}, {"ask": "Can you find Chick?", "label": "Chick", "p": 9, "x": 338, "y": 648}, {"ask": "Can you find the evening sky?", "label": "the evening sky", "p": 12, "x": 658, "y": 152}], "id": "lib-eddie-elephant", "pages": ["Eddie was a little elephant. He had big, round ears and a short, wiggly trunk.", "Eddie's ears were the biggest ears of all. Flap, flap went his ears in the breeze.", "Some days, Eddie wished his ears were small. 'They are too big,' he said with a sigh.", "One hot day, Eddie flapped his big ears. Flap, flap, flap! 'Ooh, a cool breeze!' laughed Eddie.", "His friend Monkey felt hot too. 'Come close,' said Eddie. He flapped his ears. 'Cool now, Monkey?'", "Then Eddie heard a tiny sound. His big ears turned. Listen, listen! What could it be?", "It was a small, faraway call. 'Help,' called a little voice. 'Help, please. I am stuck.'", "Eddie followed the sound with his big listening ears. Step, step, step through the soft grass.", "Behind a bush sat little Chick. Her foot was tangled in long grass. 'I found you!' said Eddie.", "Eddie used his trunk to lift the grass. Gently, gently. Soon Chick's foot was free. 'Free!' she peeped.", "'Your big ears saved me,' peeped Chick. Eddie smiled a big smile. 'My ears are just right!'", "Eddie walked Chick home under the evening sky. Flap, flap went his ears. Good night, kind Eddie."], "shelf": "ours", "title": "Eddie the Elephant's Big Ears"}, {"author": "Owen Hartley", "band": "little", "color": "#58A05C", "cover": null, "emo": "🐸", "find": [{"ask": "Can you find Freddie?", "label": "Freddie", "p": 1, "x": 503, "y": 526}, {"ask": "Can you find the dragonfly?", "label": "the dragonfly", "p": 6, "x": 730, "y": 220}, {"ask": "Can you find the big lily pad?", "label": "the big lily pad", "p": 8, "x": 504, "y": 601}, {"ask": "Can you find the pink flower?", "label": "the pink flower", "p": 11, "x": 511, "y": 687}, {"ask": "Can you find the lily leaf?", "label": "the lily leaf", "p": 12, "x": 283, "y": 437}], "id": "lib-freddie-frog", "pages": ["Freddie was a little green frog. He lived in a pond full of round lily pads.", "Freddie wanted to jump from pad to pad, all the way across the pond. Boing, boing!", "He bent his strong back legs. One, two, three... jump! Freddie landed on the first pad.", "The pad wobbled under his feet. Wobble, wobble! Freddie held very still until it stopped.", "Freddie jumped again. Jump! This time his toes went splash in the water. Splish, splash!", "A friendly dragonfly flew by. \"You can do it, Freddie!\" she buzzed. Freddie smiled and tried again.", "Jump, jump, jump! Freddie jumped from pad to pad. Each jump was a little bit bigger.", "In the middle of the pond, Freddie sat on a big pad and rested in the sun.", "One more jump to go. It was the biggest jump of all. Freddie took a deep breath.", "He bent his legs down low. One, two, three... BIG JUMP! Freddie flew over the water!", "Freddie landed safe on the last pad, right by a pink flower. \"I did it!\" he croaked.", "That night, Freddie slept under a lily leaf. He dreamed of jumping. Good night, Freddie. Boing!"], "shelf": "ours", "title": "Freddie the Frog's Big Jump"}, {"author": "Nell Ashford", "band": "little", "color": "#E8B04B", "cover": null, "emo": "🪿", "find": [{"ask": "Can you find the red barn?", "label": "the red barn", "p": 1, "x": 681, "y": 315}, {"ask": "Can you find the pig?", "label": "the pig", "p": 4, "x": 693, "y": 572}, {"ask": "Can you find the apple tree?", "label": "the apple tree", "p": 7, "x": 730, "y": 330}, {"ask": "Can you find the golden haystack?", "label": "the golden haystack", "p": 8, "x": 665, "y": 440}, {"ask": "Can you find the nest?", "label": "the nest", "p": 10, "x": 575, "y": 695}], "id": "lib-gracie-goose", "pages": ["Gracie was a soft white goose. She lived on a farm with a red barn and green fields.", "One morning, a little feather came loose. It wiggled, it tickled, and then it floated away!", "\"Come back, little feather!\" honked Gracie. She waddled after it, flap, flap, across the farmyard.", "The feather floated over the pig pen. \"It went that way!\" oinked the pig, pointing with her snout.", "The feather landed on the pond and floated like a tiny boat. Gracie paddled after it, splash, splash.", "Just then, a soft breeze lifted the feather up, up, up into the blue sky.", "The feather danced over the apple tree. \"I see it!\" chirped a little bird in the branches.", "The feather twirled down, down, down. It landed softly on the big golden haystack.", "Gracie stretched her long neck up high. The feather slipped away one more time. \"So close!\" she honked.", "Then the feather floated home to Gracie's nest and settled in the soft straw. Home at last!", "Gracie tucked the little feather into her nest. \"You can stay here with me,\" she said softly.", "That night, Gracie slept in her nest, warm and cozy on her feather. Good night, Gracie."], "shelf": "ours", "title": "Gracie the Goose's Lost Feather"}, {"author": "Henry Alder", "band": "little", "color": "#8A9A5B", "cover": null, "emo": "🐐", "find": [{"ask": "Can you find the hill?", "label": "the hill", "p": 1, "r": 200, "x": 368, "y": 241}, {"ask": "Can you find the apple tree?", "label": "the apple tree", "p": 2, "x": 630, "y": 145}, {"ask": "Can you find the bird?", "label": "the bird", "p": 9, "x": 634, "y": 295}, {"ask": "Can you find the river?", "label": "the river", "p": 11, "x": 760, "y": 690}, {"ask": "Can you find the red apple?", "label": "the red apple", "p": 12, "x": 554, "y": 557}], "id": "lib-gus-goat", "pages": ["Gus was a little goat. He lived in a green field at the foot of a hill.", "The hill was tall and round. At the top grew one sweet, red apple tree. Yum!", "'I want to climb to the top,' said Gus. 'I want to see the whole wide valley.'", "Gus took one step up. Clip, clop! Then one more step. Clip, clop, clip, clop!", "The hill was steep. Gus slipped on the grass. Whoops! He sat down with a bump.", "'I will try again,' said Gus. He stood up tall and shook his little head. Try, try!", "Step by step, Gus climbed higher. Clip, clop, clip, clop went his small, brave feet.", "Halfway up, Gus stopped for a rest. He munched some sweet grass. Munch, munch, munch. Yummy!", "A bird flew by. 'You can do it, Gus!' chirped the bird. Gus smiled and climbed on.", "At last, Gus reached the very top! 'I did it!' he called. 'I climbed the tall hill!'", "Gus looked at the whole wide valley. He saw fields, a river, and his little home below.", "Gus munched a sweet red apple under the tree. Then he trotted home. Good night, brave Gus."], "shelf": "ours", "title": "Gus the Goat Climbs the Hill"}, {"author": "Felix Marlowe", "band": "little", "color": "#7E7FB8", "cover": null, "emo": "🦛", "find": [{"ask": "Can you find the mud puddle?", "label": "the mud puddle", "p": 2, "x": 610, "y": 783}, {"ask": "Can you find the little bird?", "label": "the little bird", "p": 6, "x": 730, "y": 577}, {"ask": "Can you find the frog?", "label": "the frog", "p": 8, "x": 660, "y": 645}, {"ask": "Can you find the turtle?", "label": "the turtle", "p": 9, "x": 687, "y": 606}, {"ask": "Can you find the river?", "label": "the river", "p": 11, "x": 314, "y": 401}], "id": "lib-hugo-hippo", "pages": ["Hugo was a big, round hippo. He lived by a river where the sun shone warm.", "Every morning, Hugo walked to his mud puddle. Squish, squash! The mud was soft and cool.", "Hugo stepped in with one foot. Plop! He stepped in with two feet. Plop, plop!", "Then Hugo sat down in the mud. Squelch! Mud covered his round tummy. 'Ahh,' he sighed.", "Hugo rolled to the left. Hugo rolled to the right. Now he was muddy all over!", "Little Bird landed nearby. 'Hugo, you look funny!' she chirped. 'Come and try the mud.'", "Bird hopped in. Splish! 'It is cool and squishy!' she said. She splashed her tiny wings.", "Frog jumped in too. Plop! 'Me too, me too!' Frog kicked up muddy drops. Splash, splash!", "Turtle came slowly. 'Room for me?' she asked. 'Always room for friends!' laughed Hugo happily.", "They all splished and splashed in the mud. What a merry, muddy, happy bath time!", "Then they rinsed in the river. Swish, swash! Clean and cool, they sat in the sun.", "Hugo smiled at his friends. 'Good night, mud puddle,' he said. 'See you in the morning.'"], "shelf": "ours", "title": "Hugo the Hippo's Mud Bath"}, {"author": "Felix Marlowe", "band": "little", "color": "#D9A441", "cover": null, "emo": "🦁", "find": [{"ask": "Can you find the bush?", "label": "the bush", "p": 3, "x": 645, "y": 560}, {"ask": "Can you find Coco the monkey?", "label": "Coco the monkey", "p": 4, "x": 650, "y": 285}, {"ask": "Can you find the dark clouds?", "label": "the dark clouds", "p": 5, "r": 200, "x": 498, "y": 163}, {"ask": "Can you find the sun?", "label": "the sun", "p": 10, "x": 795, "y": 250}, {"ask": "Can you find Mum?", "label": "Mum", "p": 12, "x": 671, "y": 609}], "id": "lib-leo-lion", "pages": ["Leo was a little lion cub. His roar was very small. It sounded like a tiny squeak.", "The big lions roared loudly. Rooooar! Leo tried too. But out came only a squeak.", "Leo hid behind a bush. \"My roar is too small,\" he said sadly.", "His friend Coco the monkey swung down. \"I like your soft voice, Leo,\" she said.", "One day, dark clouds rolled in. Thunder rumbled far away. Coco began to cry.", "\"Do not cry,\" said Leo. He sat close beside her in the soft grass.", "Leo took a deep breath. He let out his quiet roar. Rrr, rrr, rrr.", "His quiet roar was soft and warm. It sounded like a cozy purr.", "Coco stopped crying. She smiled. \"Your roar makes me feel safe,\" she said.", "The rain fell softly. Leo purred his quiet roar until the sun came out.", "All the animals came to listen. \"What a lovely roar!\" they said. Leo smiled proudly.", "That night, Leo curled up with Mum. \"Small can be just right,\" he whispered."], "shelf": "ours", "title": "Leo the Lion's Quiet Roar"}, {"author": "Poppy Linden", "band": "little", "color": "#E8A0BF", "cover": null, "emo": "🐱", "find": [{"ask": "Can you find the pink ribbon?", "label": "the pink ribbon", "p": 2, "x": 438, "y": 407}, {"ask": "Can you find the flower pot?", "label": "the flower pot", "p": 5, "x": 229, "y": 544}, {"ask": "Can you find Hedgehog?", "label": "Hedgehog", "p": 7, "x": 643, "y": 639}, {"ask": "Can you find the big tree?", "label": "the big tree", "p": 9, "x": 730, "y": 475}, {"ask": "Can you find the nest?", "label": "the nest", "p": 10, "x": 735, "y": 235}], "id": "lib-milo-kitten", "pages": ["Milo was a tiny kitten. He had soft orange stripes and four little white paws.", "Milo loved his pink ribbon. It sat in a bow on his tail. Swish, swish, swish!", "One morning, Milo woke up and gasped. His ribbon was gone! 'Oh no,' said Milo. 'Where is it?'", "'I will find it,' said Milo. He looked under his soft bed. No ribbon there. Peek, peek!", "Milo looked behind the flower pot. No ribbon there. But look, a pink thread! A clue!", "Milo followed the pink thread across the garden path. Pat, pat, pat went his little paws.", "The thread led under the rose bush. Milo peeped in. Two eyes peeped back! It was Hedgehog.", "'Hello, Hedgehog,' said Milo. 'Have you seen my ribbon?' Hedgehog shook his head. 'Not here, Milo.'", "Milo followed the thread to the big tree. Up, up he looked. A bird sat in her nest.", "In the nest lay something pink and silky. 'My ribbon!' cried Milo. 'It blew up here!'", "The kind bird carried the ribbon down. 'Thank you, Bird!' said Milo. He tied his bow. Ta-da!", "Milo danced home with his ribbon swishing. Swish, swish! 'I found it,' he purred. Good night, Milo."], "shelf": "ours", "title": "Milo the Kitten's Lost Ribbon"}, {"author": "Elsie Marlowe", "band": "little", "color": "#6C5B7B", "cover": null, "emo": "🐙", "find": [{"ask": "Can you find the shell house?", "label": "the shell house", "p": 1, "x": 432, "y": 445}, {"ask": "Can you find Crab?", "label": "Crab", "p": 3, "x": 612, "y": 680}, {"ask": "Can you find the big rock?", "label": "the big rock", "p": 6, "x": 557, "y": 486}, {"ask": "Can you find the fish?", "label": "the fish", "p": 7, "x": 665, "y": 555}, {"ask": "Can you find the baby seahorse?", "label": "the baby seahorse", "p": 9, "x": 647, "y": 485}], "id": "lib-ollie-octopus", "pages": ["Ollie was a purple octopus. He lived under the sea in a cosy shell house.", "Ollie had eight arms. One, two, three, four, five, six, seven, eight! Count them all!", "One morning, Crab could not open his shell door. 'Help!' called Crab. Ollie came swimming fast.", "Ollie pushed with one arm. He pulled with another arm. Creak! The door opened wide.", "Fish had tangled her ribbon in the seaweed. 'Oh no!' she cried. Ollie untangled it gently.", "Turtle's ball rolled under a rock. Ollie reached with a long arm and rolled it back.", "Then all the little fish wanted a story. Ollie held the book with two arms. 'Once upon a time...'", "At lunch, everyone needed a shell plate. Ollie passed plates with arm after arm. One for you!", "Baby seahorse was sleepy. Ollie rocked her gently in one soft arm. Rock, rock, rock.", "Eight arms can hug, help, hold and wave. Ollie used every arm to help his friends.", "'Thank you, Ollie!' sang all his friends. Ollie waved back with all eight arms. Wave, wave!", "At bedtime, Ollie curled all eight arms around himself. 'Good night, arms,' he said. 'You helped everyone today.'"], "shelf": "ours", "title": "Ollie the Octopus Lends a Hand"}, {"author": "Mina Hartley", "band": "little", "color": "#4A6572", "cover": null, "emo": "🐼", "find": [{"ask": "Can you find the bamboo?", "label": "the bamboo", "p": 2, "r": 200, "x": 380, "y": 570}, {"ask": "Can you find the little bird?", "label": "the little bird", "p": 3, "x": 691, "y": 368}, {"ask": "Can you find the bunny?", "label": "the bunny", "p": 5, "x": 342, "y": 617}, {"ask": "Can you find the monkey?", "label": "the monkey", "p": 7, "x": 645, "y": 239}, {"ask": "Can you find the bamboo grove?", "label": "the bamboo grove", "p": 11, "r": 200, "x": 515, "y": 430}], "id": "lib-ping-panda", "pages": ["Ping was a round little panda. Every morning, he ate bamboo for breakfast. Crunch, crunch!", "One morning, Ping picked a big pile of bamboo. \"This is all for me!\" he said.", "A tiny bird landed nearby. \"Tweet, tweet,\" she sang. Her tummy rumbled. She was hungry.", "\"Would you like some?\" asked Ping. He shared a tender shoot. The bird nibbled happily.", "A bunny hopped up the hill. \"My tummy is rumbly too,\" said the bunny softly.", "Ping gave the bunny a sweet green stalk. Munch, munch! The bunny smiled big.", "A little monkey swung down from a tree. \"Breakfast smells yummy,\" he said, rubbing his tummy.", "Ping shared another stalk. Soon, all his friends were munching together in the sunshine.", "Ping looked at his pile. It was small now. But his heart felt big and warm.", "\"Sharing is the best breakfast,\" said Ping. Everyone nodded and munched. Crunch, crunch, crunch!", "After breakfast, they all played in the bamboo grove. Hide and seek! Peekaboo! What fun!", "That night, Ping dreamed of bamboo and friends. \"Tomorrow, we share again,\" he whispered happily."], "shelf": "ours", "title": "Ping the Panda's Bamboo Breakfast"}, {"author": "Rosa Delaney", "band": "little", "color": "#8C6A3F", "cover": null, "emo": "🐴", "find": [{"ask": "Can you find the barn?", "label": "the barn", "p": 1, "x": 306, "y": 395}, {"ask": "Can you find the shiny shoe?", "label": "the shiny shoe", "p": 4, "x": 462, "y": 724}, {"ask": "Can you find the dog?", "label": "the dog", "p": 10, "x": 790, "y": 740}, {"ask": "Can you find the gate?", "label": "the gate", "p": 11, "x": 750, "y": 580}, {"ask": "Can you find the soft hay?", "label": "the soft hay", "p": 12, "x": 447, "y": 739}], "id": "lib-polly-pony", "pages": ["Polly was a little brown pony. She lived in a cosy barn by the meadow.", "Polly loved to run in the field. Trot, trot, trot! But the stones made her hooves sore.", "'Today you get new shoes,' said Farmer Rose. 'Shiny shoes to keep your hooves safe.'", "Tap, tap, tap! Farmer Rose fitted the first shoe. It shone bright like a silver star.", "One shoe, two shoes, three shoes, four! Polly counted. Now she had four shiny new shoes.", "Polly lifted one hoof. Shine, shine! She lifted another hoof. Twinkle, twinkle! How pretty they were!", "'Try a little walk,' said Farmer Rose. Polly stepped out into the sunny farmyard.", "Clip, clop! Clip, clop! Polly's new shoes sang on the path. What a happy sound!", "The stones did not hurt now. Polly trotted fast. Clip-clop, clip-clop, all the way round!", "The hens clucked. The dog barked. 'Look at Polly!' they said. 'What fine shiny shoes!'", "Polly pranced proudly past the gate. Head up high, shoes shining. Clip, clop, hooray for Polly!", "At bedtime, Polly lay in her soft hay. 'Good night, new shoes,' she said. Clip, clop, sleep."], "shelf": "ours", "title": "Polly the Pony's New Shoes"}, {"author": "Willa Grant", "band": "little", "color": "#7A6C5D", "cover": null, "emo": "🦝", "find": [{"ask": "Can you find the little basket?", "label": "the little basket", "p": 3, "x": 683, "y": 782}, {"ask": "Can you find the stream?", "label": "the stream", "p": 4, "x": 620, "y": 570}, {"ask": "Can you find the red berries?", "label": "the red berries", "p": 7, "r": 200, "x": 764, "y": 445}, {"ask": "Can you find the little bird?", "label": "the little bird", "p": 9, "x": 684, "y": 389}, {"ask": "Can you find baby brother?", "label": "baby brother", "p": 11, "x": 596, "y": 723}], "id": "lib-rosie-raccoon", "pages": ["Rosie was a little raccoon. She lived in a hollow tree with her family. Cosy and warm!", "One morning, Rosie woke up early. 'Today I will find berries for breakfast,' she said. Yum, yum!", "Rosie took her little basket. She waved to Mama. 'I will be back soon,' she called.", "First, Rosie looked by the stream. Plip, plop! The water sparkled. No berries here. Not yet.", "Next, Rosie looked under the tall fern leaves. Rustle, rustle! Only green leaves. No berries here.", "Then Rosie smelled something sweet. Sniff, sniff! 'Berries!' she said. 'They are close now. I can smell them!'", "Behind the old log, Rosie found a bush full of red berries. 'Hooray!' she cried. 'So many!'", "Rosie picked berries, one by one. Pluck, pluck, pluck! She filled her basket to the top.", "A little bird watched her. 'One for you,' said Rosie. She shared a berry with her friend.", "Rosie carried the basket home. It was heavy and full. Step, step, step went brave little Rosie.", "'Berries for breakfast!' called Rosie. Mama, Papa and baby brother clapped. 'Well done, Rosie!' they said.", "They ate sweet berries together in the sunshine. Rosie smiled with berry-red lips. What a happy breakfast!"], "shelf": "ours", "title": "Rosie the Raccoon's Berry Hunt"}, {"author": "Owen Hartley", "band": "little", "color": "#6FA8A0", "cover": null, "emo": "🦭", "find": [{"ask": "Can you find the sun?", "label": "the sun", "p": 2, "x": 684, "y": 318}, {"ask": "Can you find the pink shell?", "label": "the pink shell", "p": 5, "x": 301, "y": 832}, {"ask": "Can you find the crab?", "label": "the crab", "p": 6, "x": 574, "y": 683}, {"ask": "Can you find Mum?", "label": "Mum", "p": 11, "x": 750, "y": 280}, {"ask": "Can you find the warm rock?", "label": "the warm rock", "p": 12, "x": 547, "y": 790}], "id": "lib-sammy-seal", "pages": ["Sammy was a little seal pup. He lived by the sea with his kind mum.", "The sun came up warm and gold. 'Time to play on the sand!' barked Sammy happily.", "Sammy wiggled down to the beach. Wiggle, wiggle, flop! The sand was soft and warm.", "He rolled in the sand. Roll, roll, roll! Now Sammy was a sandy, twinkly pup.", "Sammy found a pink shell. He found a smooth stone. He found a tickly feather!", "A little crab clicked by. Click, clack! 'Hello, Crab!' said Sammy. They played chase together.", "Then the waves called. Splash, splash! 'Come and swim,' sang the sea to Sammy.", "Sammy put one flipper in the water. Brrr, it was cold! He put in two flippers.", "Sammy slid into the sea. Whoosh! He kicked his flippers. Kick, kick! He could swim!", "Sammy swam round and round in the cool blue water. Swim, Sammy, swim! What fun!", "Mum called from the rocks. 'Sammy, Sammy!' Sammy swam back to her, strong and splashy.", "Sammy snuggled close to Mum on the warm rock. 'Good night, sea,' he yawned. Sleep tight."], "shelf": "ours", "title": "Sammy the Seal's Sandy Day"}, {"author": "Willa Grant", "band": "little", "color": "#B5651D", "cover": null, "emo": "🐿️", "find": [{"ask": "Can you find the oak tree?", "label": "the oak tree", "p": 2, "x": 724, "y": 285}, {"ask": "Can you find the fence?", "label": "the fence", "p": 3, "x": 665, "y": 615}, {"ask": "Can you find the hollow tree?", "label": "the hollow tree", "p": 4, "x": 420, "y": 470}, {"ask": "Can you find the birds?", "label": "the birds", "p": 8, "r": 200, "x": 505, "y": 732}, {"ask": "Can you find the little mouse?", "label": "the little mouse", "p": 9, "x": 387, "y": 761}], "id": "lib-sophie-squirrel", "pages": ["Sophie was a busy little squirrel. All autumn, she gathered nuts. One, two, three, four!", "She found acorns under the oak tree. Plip, plop! She tucked them in her cheeks.", "She found hazelnuts by the fence. Sophie carried them home, one by one. Trip, trap!", "Sophie hid her nuts in a hollow tree. \"My store is full,\" she said proudly.", "One cold morning, Sophie heard a sound. Cheep, cheep! The birds were calling outside.", "The birds had no food. The ground was frosty and bare. Their tummies were empty.", "\"I have plenty to share,\" said Sophie. She opened her hollow tree wide.", "Sophie gave the birds nuts, one by one. Peck, peck! The birds sang happily.", "A little mouse came too. Sophie shared with him. \"Thank you, Sophie!\" everyone said.", "Her store was smaller now. But the garden was full of happy songs and friends.", "All winter, Sophie and her friends shared snacks. The cold days felt warm and cozy.", "Sophie curled up in her tree. \"Sharing makes my heart full,\" she whispered. Good night."], "shelf": "ours", "title": "Sophie the Squirrel's Nut Hunt"}, {"author": "Clara Whitfield", "band": "little", "color": "#5E8BCE", "cover": null, "emo": "🐳", "find": [{"ask": "Can you find the tiny fish?", "label": "the tiny fish", "p": 5, "x": 386, "y": 597}, {"ask": "Can you find the crab?", "label": "the crab", "p": 6, "x": 686, "y": 585}, {"ask": "Can you find the turtles?", "label": "the turtles", "p": 7, "r": 200, "x": 731, "y": 438}, {"ask": "Can you find the baby seal?", "label": "the baby seal", "p": 8, "x": 684, "y": 627}, {"ask": "Can you find Mother?", "label": "Mother", "p": 12, "x": 548, "y": 474}], "id": "lib-wanda-whale", "pages": ["Wanda was a little whale. She swam in the big, blue sea with her kind mother.", "Wanda loved to sing. Her song went up and down. La, la, la, sang little Wanda.", "Her mother smiled. 'Your song is soft and sweet,' she said. 'The whole sea can hear you.'", "One morning, Wanda sang all alone. La, la, la! Who would hear her little song today?", "A tiny fish popped up. 'What a pretty song!' said the fish. 'Sing it again, Wanda!'", "Wanda sang again, a little bit louder. La, la, la! A crab waved his claws. Clap, clap!", "Two turtles swam near to listen. 'Lovely,' said the turtles. They swayed slow and gentle. Sway, sway.", "A baby seal splashed closer. Splash, splash! 'Your song makes me happy,' said the seal pup.", "Soon many sea friends floated around Wanda. Fish, crab, turtles and seal, all listening together.", "Wanda sang her happiest song. La, la, la! The waves danced soft and slow below her.", "When the song ended, everyone clapped and splashed. 'Hooray for Wanda!' called all her new friends.", "Wanda swam home with Mother as the sun set. 'Good night, sea,' she sang. Good night, Wanda."], "shelf": "ours", "title": "Wanda the Whale Sings to the Sea"}, {"author": "Mina Hartley", "band": "little", "color": "#5D6D7E", "cover": null, "emo": "🦓", "find": [{"ask": "Can you find Giraffe?", "label": "Giraffe", "p": 4, "x": 662, "y": 333}, {"ask": "Can you find Elephant?", "label": "Elephant", "p": 5, "x": 680, "y": 425}, {"ask": "Can you find Lion?", "label": "Lion", "p": 6, "x": 608, "y": 533}, {"ask": "Can you find Little Mouse?", "label": "Little Mouse", "p": 8, "x": 268, "y": 728}, {"ask": "Can you find the river?", "label": "the river", "p": 10, "x": 665, "y": 837}], "id": "lib-zara-zebra", "pages": ["Zara was a young zebra. Her stripes were black and white, bold and bright in the sun.", "'Today I will lead a parade!' said Zara. She held her head up high and proud.", "Zara marched down the path. One, two! One, two! Her hooves went tap, tap, tap.", "Giraffe came first. 'May I join?' she asked. 'Yes!' said Zara. 'March behind me, tall friend.'", "Elephant came next. Boom, boom went her big feet. The ground went thump, thump with joy.", "Lion marched along too, shaking his mane. 'Roar!' he said softly, so nobody felt scared.", "Monkey swung down from a tree. 'Me too, me too!' He marched and clapped his hands.", "Little Mouse ran up. 'May I march too?' he squeaked. 'Of course!' said kind Zara.", "Now the parade was long and happy. Tall and small, big and little, all marching together.", "They marched past the river. They marched past the trees. The birds sang a parade song.", "At the big tree, Zara stopped. 'Hooray for my friends!' she called. Everyone cheered and cheered.", "The sun set soft and orange. Zara lay down to rest. 'Good night, parade,' she whispered."], "shelf": "ours", "title": "Zara the Zebra's Stripe Parade"}, {"author": "Hoot's Bedtime Stories", "band": "little", "color": "#2B3A67", "cover": null, "emo": "🌙", "find": [{"ask": "Can you find the ball pit?", "label": "the ball pit", "p": 3, "r": 200, "x": 732, "y": 678}, {"ask": "Can you find the big slide?", "label": "the big slide", "p": 4, "x": 775, "y": 475}, {"ask": "Can you find Hoot?", "label": "Hoot", "p": 8, "x": 468, "y": 646}, {"ask": "Can you find the teddy?", "label": "the teddy", "p": 11, "x": 604, "y": 675}, {"ask": "Can you find the sleepy train?", "label": "the sleepy train", "p": 16, "x": 407, "y": 617}], "id": "bed-2026-11-16", "pages": ["Hoot and the Sleepy Train. A bedtime story for Zane and Riley. One quiet evening in Norwalk, just as the moon peeked over the rooftops, Hoot the owl flew down to the garden gate.", "\"Tell me,\" said Hoot, fluffing his feathers. \"What did my two friends do today?\" \"We played at the mall!\" said Zane. \"We played and played and played!\"", "Oh, what a day it had been. Zane and Riley went to the big play place at the mall, where the slides went whoosh, and the ball pit was full of soft, bouncy balls.", "Red ones, blue ones, yellow ones, green ones. Zane jumped into the ball pit. Splash! went the balls. Riley slid down the big slide. Whoosh! Down she went, laughing all the way.", "And best of all, there were other children to play with. New friends to splash with. New friends to slide with. \"Again!\" said Zane. \"Again!\" said Riley. And they played again, and again, and again.", "But even the busiest playing makes little legs tired. Now Zane yawned a great big yawn, and Riley rubbed her sleepy eyes. \"Listen,\" Hoot whispered. \"Do you hear that soft sound?\"", "Zane listened. Riley listened. Far away came a gentle chug, chug, chug, and a tiny whistle, soft as a yawn. \"It is the sleepy train,\" said Hoot.", "\"Every night it carries tired toys home to their shelves. But tonight its lantern is dim, and it needs two kind helpers to guide it.\"", "\"We will help!\" said Zane, brave and strong. \"We will help,\" said Riley, kind and gentle. In warm pajamas and cozy socks, Zane and Riley followed Hoot down the quiet path.", "The little train waited at the bottom of the hill, small and round and friendly, puffing tiny clouds that smelled like warm cocoa. Zane held Hoot's lantern up high, so its golden light shone on the track ahead.", "Riley waved to the tired toys in each carriage. There was a teddy who needed his shelf, a wooden duck who needed her box, and a tiny red ball who needed his basket.", "\"All aboard for home,\" Riley sang softly. \"Almost home, almost home.\" Chug, chug, chug went the little train, slow and steady. Zane counted the sleepy puffs.", "One puff, two puffs, three soft puffs, floating up to the moon. At the teddy's house, the train stopped with a happy sigh. At the duck's house, it stopped again.", "At the little red ball's house, it rolled him gently right into his basket. \"Thank you,\" whispered the train, and its whistle gave the smallest, sleepiest toot. Now the carriages were empty.", "Now the track was quiet. Hoot spread his soft wings and smiled. \"There is just one last ride,\" said Hoot. \"Two wonderful helpers need carrying home to bed.\"", "So Zane climbed up, and Riley climbed up, and the sleepy train carried them chug, chug, chug, all the way back to their own front door.", "Inside, everything was warm and still. Zane climbed into his bed. Riley climbed into hers. Their blankets were pulled up soft and snug.", "Hoot perched nearby and sang in his softest voice, \"The train is resting, the night is deep, the toys are home and fast asleep.\" Zane's eyes grew heavy. Riley's eyes grew heavy, too.", "Somewhere in their dreams, soft balls were bouncing, and a slide was waiting for tomorrow. Goodnight, Zane. Goodnight, Riley. Sleep well, my friends. Hoot loves you."], "shelf": "bedtime", "title": "Hoot and the Sleepy Train"}, {"author": "Hoot's Bedtime Stories", "band": "little", "color": "#2B3A67", "cover": null, "emo": "🌙", "find": [{"ask": "Can you find the flowers?", "label": "the flowers", "p": 2, "r": 200, "x": 890, "y": 656}, {"ask": "Can you find the firefly?", "label": "the firefly", "p": 3, "x": 723, "y": 840}, {"ask": "Can you find the garden gate?", "label": "the garden gate", "p": 9, "x": 134, "y": 804}, {"ask": "Can you find the big oak tree?", "label": "the big oak tree", "p": 10, "r": 200, "x": 935, "y": 400}, {"ask": "Can you find the front door?", "label": "the front door", "p": 14, "x": 788, "y": 389}], "id": "bed-2026-11-17", "pages": ["Hoot and the Friendly Firefly. A bedtime story for Zane and Riley. One quiet evening in Norwalk, just as the sky turned soft and blue, Hoot the owl landed softly in the garden.", "\"Hello, Zane. Hello, Riley,\" said Hoot. \"Come and see. Something tiny is glowing by the flowers.\" Zane tiptoed over, big and brave. Riley tiptoed too, holding Zane's hand.", "Blink, blink went a tiny golden light among the leaves. \"It is Fern the firefly,\" whispered Hoot. \"But Fern is lost. Her glow is too sleepy to find the way home.\"", "\"We will help you, Fern!\" said Zane, brave and strong. \"We will help,\" said Riley, kind and gentle. Fern blinked once, soft and slow. Blink.", "\"Thank you,\" she peeped. \"My home is by the big oak tree, past the garden gate.\"", "So Hoot spread his soft wings, and Zane and Riley followed the tiny light down the quiet garden path. Fern blinked twice. Blink, blink.", "Two soft lights to light the way. Riley counted softly. \"One glow, two glows.\" Past the flowers they went. Past the smooth stones.", "The night was calm, and the air smelled sweet, like warm grass. Fern blinked three times now, a little braver. Blink, blink, blink.", "\"I can see the oak tree!\" she peeped. Zane held the garden gate open wide. Riley waved Fern on with both little hands. \"Almost home, Fern. Almost home.\"", "Under the big oak tree, all of Fern's firefly family was waiting. Their lights rose together, soft and golden, like tiny lanterns in the leaves.", "Fern flew up to join them, and her glow shone soft and bright. \"Thank you, Zane. Thank you, Riley,\" she blinked. Blink, blink, blink, blink.", "Hoot smiled and fluffed his feathers. \"You helped a small friend find her way home. Now there is just one more journey tonight.\"", "\"Our beds?\" yawned Zane, with a great big sleepy yawn. \"Our beds,\" whispered Riley, rubbing her sleepy eyes.", "So Hoot flew ahead, and the fireflies lit the path back to the front door, blink by blink. Inside, everything was warm and still.", "Zane climbed into his bed. Riley climbed into hers. Their blankets were pulled up soft and snug.", "Hoot perched nearby and sang in his softest voice, \"The fireflies are glowing, the night is deep, Fern is home and fast asleep.\"", "Zane's eyes grew heavy. Riley's eyes grew heavy, too. Outside, one last tiny light blinked once, soft and sleepy, then went dark.", "Goodnight, Zane. Goodnight, Riley. Sleep well, my friends. Hoot loves you."], "shelf": "bedtime", "title": "Hoot and the Friendly Firefly"}, {"author": "Hoot's Bedtime Stories", "band": "little", "color": "#2B3A67", "cover": null, "emo": "🌙", "find": [{"ask": "Can you find the moon?", "label": "the moon", "p": 1, "x": 741, "y": 101}, {"ask": "Can you find the pillow?", "label": "the pillow", "p": 5, "x": 510, "y": 420}, {"ask": "Can you find the chair?", "label": "the chair", "p": 6, "x": 438, "y": 472}, {"ask": "Can you find the red ribbon?", "label": "the red ribbon", "p": 8, "x": 525, "y": 610}, {"ask": "Can you find the teddy bear?", "label": "the teddy bear", "p": 13, "x": 645, "y": 645}], "id": "bed-2026-11-18", "pages": ["Hoot and the Lost Teddy. A bedtime story for Zane and Riley. One quiet evening in Norwalk, just as the moon rose soft and round, Hoot the owl landed gently by the window.", "\"Hello, Zane. Hello, Riley,\" said Hoot. \"The stars are waking up. It is time to get cozy and slow.\" Zane put on his green dinosaur pyjamas. Riley put on her pink star pyjamas.", "Then Riley looked all around her bed. \"Where is Berry?\" she whispered. \"Where is my teddy?\" Berry was Riley's small, soft teddy bear. Riley hugged Berry every night, all the way to sleep.", "Zane, who is big and brave, took Riley's hand. \"We will find Berry,\" he said. \"We will look together.\" \"Let us look slowly,\" said Hoot, \"the way owls listen. One soft look here, and one soft look there.\"", "First, they looked on the bed. Zane lifted the blanket, up and down. Riley lifted her pillow, up and down. No Berry.", "Next, they looked by the reading chair. Zane peeked behind the chair. Riley peeked under it, on her tummy. No Berry. Then Hoot blinked his big, kind eyes.", "\"Shh,\" he said. \"Teddy bears are very quiet. But sometimes, a tiny ribbon can peek out and say hello.\" Riley looked again, slow and careful. Zane looked again, slow and careful too.", "There, beside the bookshelf, a tiny red ribbon was peeking out from behind a big, soft cushion! \"Berry!\" cried Riley, and she hugged her teddy tight, tight, tight.", "\"You found me,\" Riley whispered to Berry, as if Berry could hear. \"You were hiding by the books.\" Zane smiled his wide, happy smile. \"We found Berry together,\" he said.", "Hoot fluffed his feathers, soft and pleased. \"You looked slowly. You looked kindly. And you did not give up.\" Now the room felt warm and still again.", "Mama came in quietly and pulled the blankets up, soft and snug. Zane climbed into his bed. Riley climbed into hers, with Berry tucked safe in her arms.", "Hoot sang in his softest voice, \"The moon is round, the stars are light, Berry is found, so sleep tonight.\" Zane's eyes grew heavy. Riley's eyes grew heavy too.", "Berry's button eyes shone in the soft moonlight. Goodnight, Zane. Goodnight, Riley. Sleep well, my friends. Hoot loves you, and Mama loves you too."], "shelf": "bedtime", "title": "Hoot and the Lost Teddy"}, {"author": "Hoot's Bedtime Stories", "band": "little", "color": "#2B3A67", "cover": null, "emo": "🌙", "find": [{"ask": "Can you find the white shell?", "label": "the white shell", "p": 4, "x": 292, "y": 334}, {"ask": "Can you find the boat?", "label": "the boat", "p": 8, "x": 826, "y": 528}, {"ask": "Can you find the moon?", "label": "the moon", "p": 9, "x": 765, "y": 126}, {"ask": "Can you find the star?", "label": "the star", "p": 10, "x": 426, "y": 107}, {"ask": "Can you find the pink shell?", "label": "the pink shell", "p": 13, "x": 808, "y": 700}], "id": "bed-2026-11-19", "pages": ["Hoot and the Sleepy Ocean. A bedtime story for Zane and Riley. One quiet evening in Norwalk, just as the sky turned soft and pink, Hoot the owl landed on the garden fence.", "\"Hello, Zane. Hello, Riley,\" said Hoot. \"Tonight the ocean is getting sleepy. Shall we go and say goodnight to the waves?\" \"Yes!\" said Zane, brave and strong. \"Yes,\" said Riley, kind and gentle.", "Zane and Riley followed Hoot down the quiet path to the soft, sandy shore. The water was calm and slow. Whoosh, hush. Whoosh, hush.", "The little waves rolled in and out, like the ocean breathing in its sleep. Zane found a smooth white shell in the sand. He held it to his ear.", "\"I can hear the ocean singing,\" he whispered. Riley found a tiny pink shell beside a smooth stone. \"This one is singing too,\" she said. \"A tiny, sleepy song.\"", "Hoot fluffed his soft feathers. \"The shells keep the ocean's lullaby safe all night,\" he said. \"Shall we sing it back, soft and slow?\"", "So Zane sang, soft and slow. \"Sleep, little waves, sleep.\" Riley sang too, soft and slow. \"Sleep, little waves, sleep.\" Whoosh, hush. Whoosh, hush.", "The waves rolled in slower, and out softer. A small boat bobbed on the water, up and down, rocking like a cradle. \"Goodnight, little boat,\" called Zane.", "\"Goodnight, little boat,\" whispered Riley, waving with both little hands. High above the water, the moon rose big and round, and silver light shone across the sea.", "One by one, the stars woke up and twinkled over the waves. \"Look,\" said Hoot. \"The ocean is almost asleep now. There is just one last goodnight to say.\"", "Zane yawned a great big yawn. Riley rubbed her sleepy eyes. \"Our beds?\" whispered Riley. \"Your beds,\" smiled Hoot. \"Two wonderful helpers.\" Inside, everything was warm and still.", "Mama came in quietly and pulled the blankets up, soft and snug. Zane climbed into his bed, with his smooth white shell on the shelf nearby.", "Riley climbed into hers, with her tiny pink shell safe beside her pillow. Hoot perched nearby and sang in his softest voice, \"The waves are resting, the night is deep, the shells are singing you to sleep.\"", "Zane's eyes grew heavy. Riley's eyes grew heavy too. Far away, the sleepy ocean kept singing, whoosh, hush, whoosh, hush, all night long. Goodnight, Zane. Goodnight, Riley. Sleep well, my friends. Hoot loves you, and Mama loves you too."], "shelf": "bedtime", "title": "Hoot and the Sleepy Ocean"}, {"author": "Hoot's Bedtime Stories", "band": "little", "color": "#2B3A67", "cover": null, "emo": "🌙", "find": [{"ask": "Can you find the sunflower?", "label": "the sunflower", "p": 4, "x": 882, "y": 71}, {"ask": "Can you find the tomato?", "label": "the tomato", "p": 5, "x": 544, "y": 870}, {"ask": "Can you find the stone?", "label": "the stone", "p": 6, "x": 431, "y": 825}, {"ask": "Can you find the pink flower?", "label": "the pink flower", "p": 7, "x": 126, "y": 845}, {"ask": "Can you find the moon?", "label": "the moon", "p": 13, "x": 325, "y": 126}], "id": "bed-2026-11-20", "pages": ["Hoot and the Sleepy Garden. A bedtime story for Zane and Riley. One quiet evening in Norwalk, just as the sky turned soft and gold, Hoot the owl landed on the garden gate.", "\"Hello, Zane. Hello, Riley,\" said Hoot. \"Tonight the garden is getting sleepy. Shall we say goodnight to the flowers?\" \"Yes!\" said Zane, brave and strong. \"Yes,\" said Riley, kind and gentle.", "Zane and Riley followed Hoot down the soft grass path, between the tall sunflowers and the round green bushes. They tiptoed very quietly, so they would not wake the sleepy grass under their feet.", "The sunflowers stood tall and still. Their big yellow faces turned down, slow and sleepy, like they were bowing goodnight. \"Goodnight, sunflowers,\" said Zane, waving up high.", "\"Goodnight,\" whispered Riley, waving too. Next came the little red tomatoes, round and cozy on their vines. Riley counted them softly. \"One, two, three sleepy tomatoes.\"", "Zane found a smooth stone by the path and placed it like a tiny pillow beside the flowers. \"There,\" he said. \"Now they can rest.\"", "Hoot fluffed his soft feathers. \"Flowers rest at night too,\" he said. \"They close their petals, and dream of sunshine.\" The pink flowers folded their petals, one by one.", "The white flowers folded theirs too. The whole garden smelled sweet and calm. A tiny breeze moved through the leaves. Shhh, shhh, said the leaves.", "Shhh, shhh, like a soft garden lullaby. \"Listen,\" whispered Hoot. \"The garden is singing itself to sleep.\" Zane yawned a great big yawn. Riley rubbed her sleepy eyes.", "\"Is there one last goodnight?\" asked Riley. \"Your beds,\" smiled Hoot. \"Two wonderful helpers.\" Inside, everything was warm and still.", "Mama came in quietly and pulled the blankets up, soft and snug. Zane climbed into his bed. Riley climbed into hers, holding her soft blanket close.", "Hoot perched nearby and sang in his softest voice, \"The flowers are folded, the night is deep, the sleepy garden is fast asleep.\"", "Zane's eyes grew heavy. Riley's eyes grew heavy too. Outside, the garden rested under the moon, quiet and cozy all night long.", "Goodnight, Zane. Goodnight, Riley. Sleep well, my friends. Hoot loves you, and Mama loves you too."], "shelf": "bedtime", "title": "Hoot and the Sleepy Garden"}, {"author": "Hoot's Bedtime Stories", "band": "little", "color": "#2B3A67", "cover": null, "emo": "🌙", "id": "bed-2026-11-21", "find": [{"ask": "Can you find the fence?", "label": "the fence", "p": 1, "x": 237, "y": 462}, {"ask": "Can you find the moon?", "label": "the moon", "p": 4, "x": 495, "y": 116}, {"ask": "Can you find the stone?", "label": "the stone", "p": 7, "x": 122, "y": 913, "r": 200}, {"ask": "Can you find the moth?", "label": "the moth", "p": 8, "x": 664, "y": 127}, {"ask": "Can you find the window?", "label": "the window", "p": 12, "x": 369, "y": 239}], "pages": ["Hoot and the Moonlight Blanket. A bedtime story for Zane and Riley. One quiet evening in Norwalk, just as the sky turned soft and deep blue, Hoot the owl landed gently on the fence.", "\"Hello, Zane. Hello, Riley,\" said Hoot. \"Tonight the moon is making a blanket. Shall we help her spread it over the town?\" \"Yes!\" said Zane, brave and strong. \"Yes,\" said Riley, kind and gentle.", "Zane put on his green dinosaur pyjamas. Riley put on her pink star pyjamas. Then they followed Hoot outside, where the grass was cool and soft.", "High above, the moon glowed big and round. Silver light spilled down, slow and gentle, like warm milk poured from a cup.", "\"The moonlight blanket covers everything it touches,\" said Hoot. \"First, it covers the rooftops, so the houses can rest.\" Zane waved up high. \"Goodnight, rooftops,\" he said.", "Riley waved too. \"Goodnight,\" she whispered. Next, the soft light covered the tall trees. Their leaves shimmered silver and green, and swayed, shhh, shhh, in the tiny breeze.", "Then the light covered the quiet street, the little garden, and the smooth stones by the path. Everything looked calm and cozy, tucked under moonlight.", "One small moth fluttered through the silver light, round and round, slow and sleepy. \"Goodnight, little moth,\" said Zane. \"Goodnight,\" whispered Riley, holding Zane's hand.", "Hoot fluffed his soft feathers. \"There is just one more place for the blanket to reach,\" he said. \"Where?\" asked Zane, with a great big sleepy yawn.", "\"Our beds?\" whispered Riley, rubbing her sleepy eyes. Hoot smiled. \"Your beds. Two wonderful helpers.\" Inside, everything was warm and still.", "Mama came in quietly and pulled the blankets up, soft and snug. Zane climbed into his bed. Riley climbed into hers.", "Through the window, the moonlight lay across their blankets like a second, silver blanket, soft and kind. Hoot perched nearby and sang in his softest voice,", "\"The moon is glowing, the night is deep, the blanket is spread, now go to sleep.\" Zane's eyes grew heavy. Riley's eyes grew heavy too.", "Outside, all of Norwalk rested under the moonlight, quiet and cozy all night long. Goodnight, Zane. Goodnight, Riley. Sleep well, my friends. Hoot loves you, and Mama loves you too."], "shelf": "bedtime", "title": "Hoot and the Moonlight Blanket"}, {"author": "Hoot's Bedtime Stories", "band": "little", "color": "#2B3A67", "cover": null, "emo": "🌙", "id": "bed-2026-11-22", "find": [{"ask": "Can you find the sofa?", "label": "the sofa", "p": 1, "x": 600, "y": 300}, {"ask": "Can you find the window?", "label": "the window", "p": 4, "x": 665, "y": 380}, {"ask": "Can you find the snowflake?", "label": "the snowflake", "p": 10, "x": 771, "y": 443}, {"ask": "Can you find the reindeer?", "label": "the reindeer", "p": 11, "x": 767, "y": 487, "r": 200}, {"ask": "Can you find the star?", "label": "the star", "p": 14, "x": 514, "y": 66}], "pages": ["Hoot and the Santa Dream. A bedtime story for Zane and Riley. Zane was still wiggling on the sofa cushions when the video ended. \"Santa said my name!\" he said. Riley clapped her hands. \"And mine!\"", "Today, a special video had come from the North Pole. Santa had smiled at Zane and Riley by name, and told them Christmas was coming soon.", "He said kind children listen to Mommy and Daddy, share, and are gentle with each other. \"I shared today,\" said Zane, thinking hard. \"Me too,\" said Riley, and she leaned her head on Zane's arm.", "Just then there was a soft tap, tap at the window. Hoot the owl was perched outside, his blue nightcap crooked, his amber eyes bright.", "Mama opened the window a crack, and in he fluttered, landing on the sofa arm. \"You heard Santa too?\" whispered Zane. \"I heard every word,\" said Hoot.", "\"And now those kind words can ride with you into a dream, if you let your eyes get heavy.\" So Zane put on his navy pyjamas with little rockets and stars.", "Riley put on her lavender pyjamas with soft butterflies. They brushed their teeth, slow and foamy, and climbed the stairs one step at a time, holding the rail.", "In bed, Hoot tucked the blankets with his wing. \"Close your eyes,\" he said softly, \"and picture the snow at the North Pole, soft as feathers.\"", "In their dream, Zane and Riley floated over quiet, snowy hills. Below them, tiny lights twinkled in cosy windows. A small sleigh bell rang far away, ding, ding, very gentle and slow.", "Riley reached out and caught a snowflake on her mitten. It did not melt. It sparkled, then turned into a tiny star and drifted up.", "Zane waved to the sleepy reindeer resting in their warm stable. \"Rest now,\" he whispered. \"You have big dreams to fly in soon.\"", "The dream grew slower and softer. The snow turned into their blankets. The twinkling lights turned into the night light by the door.", "\"You were kind today,\" he sang. \"You listened, and you shared. Now sleep can do the rest.\" Zane's eyes grew heavy. Riley's eyes grew heavy too,", "and her hand found Zane's sleeve and held it gently. Outside the real window, Norwalk was quiet under a clear, cold sky, and one bright star shone over their house.", "Goodnight, Zane. Goodnight, Riley. Sleep well, my friends. Hoot loves you, and Mama loves you too."], "shelf": "bedtime", "title": "Hoot and the Santa Dream"}, {"author": "Hoot's Bedtime Stories", "band": "little", "color": "#2B3A67", "cover": null, "emo": "🌙", "id": "bed-2026-11-23", "find": [{"ask": "Can you find the screen?", "label": "the screen", "p": 1, "x": 668, "y": 243}, {"ask": "Can you find the cube?", "label": "the cube", "p": 2, "x": 732, "y": 716}, {"ask": "Can you find the armchair?", "label": "the armchair", "p": 5, "x": 830, "y": 695}, {"ask": "Can you find the sofa?", "label": "the sofa", "p": 10, "x": 810, "y": 575}, {"ask": "Can you find the blankets?", "label": "the blankets", "p": 14, "x": 400, "y": 842, "r": 200}], "pages": ["Hoot and the Big Jump Day. A bedtime story for Zane and Riley. \"Jump, jump!\" cried Zane, bouncing up and down in front of the big screen. Riley bounced beside him, giggling, her arms reaching high.", "Today, Zane and Riley opened the Nex Playground. The little cube sat under the screen, and when it woke up, the living room felt like a playground.", "Zane jumped and clapped and stomped like a happy dinosaur. Riley jumped too, smaller jumps, round and round, laughing every time she landed.", "They waved their arms, and the game waved back. Their feet went tap, tap, tap on the rug. \"You played with your whole bodies today,\" said a soft voice.", "Hoot was on the armchair, watching, his blue nightcap crooked. \"I jumped so high!\" said Zane, and he did one more big jump, just to show Hoot.", "\"Me too!\" said Riley, and she jumped too, then plopped down soft on the rug, all giggly and tired.", "Hoot flapped down. \"Let us take one last, slow journey,\" he said, \"and carry that jumping home to bed.\"", "So they began at the screen, where the game was sleeping, dark and quiet. They tiptoed across the rug, slow, like walking through soft grass.", "Zane took big, slow steps. Riley took small, slow steps. Hoot took tiny hops between them, and nobody hurried at all.", "They passed the sofa, where they had cheered. Their arms, which had waved so fast, now swung slow and sleepy.", "In the hall, Zane put on his red pyjamas with little fire trucks. Riley put on her mint-green pyjamas with soft bunnies. The jumping clothes were folded away, all done for today.", "They brushed their teeth, slow and foamy. Up the stairs they went, one quiet step, then another, holding the rail, leaving the playground far below.", "Back in their room, the journey was done. They had gone from jumping to sleepy, home to their cozy beds.", "Mama tucked the blankets up, soft and snug. Hoot perched nearby and hummed a slow, low tune, like a game winding down to rest.", "\"Today you opened something new,\" Hoot whispered, \"and you jumped and laughed together. Now your legs can rest, and your dreams can do the jumping.\"", "Zane's eyes grew heavy. Riley's eyes grew heavy too, and her hand rested gently on her blanket. Goodnight, Zane. Goodnight, Riley. Sleep well, my friends. Hoot loves you, and Mama loves you too."], "shelf": "bedtime", "title": "Hoot and the Big Jump Day"}];;
  var LIB_KEY = "hootworld.library.v1", LIBPROG_KEY = "hootworld.libprog.v1", LIBHOME_KEY = "hootworld.homelib.v1";
  var libState = null; /* { id, page, stage } while a book is open */
  var libSpeakT = null, libFindT = null, libPulseT = null;
  function libStopTimers() {
    if (libSpeakT) { clearTimeout(libSpeakT); libSpeakT = null; }
    if (libFindT) { clearTimeout(libFindT); libFindT = null; }
    if (libPulseT) { clearTimeout(libPulseT); libPulseT = null; }
  }
  function libArmTurnPulse() {
    /* Device Report #5 (Dawid absolute ruling 2026-11-21): NEVER speak a turn-page command
       in the book reader — not mid-page, not between pages, not ever. Keep ONLY a silent,
       gentle visual arrow glow that never touches or interrupts narration audio. */
    if (libPulseT) clearTimeout(libPulseT);
    var st = libState;
    if (!st || st.stage !== "page") return;
    var book = libBook(st.id);
    if (!book || book.band !== "little") return;
    var pg0 = st.page;
    libPulseT = setTimeout(function () {
      libPulseT = null;
      if (!libState || libState.id !== st.id || libState.page !== pg0 || libFind) return;
      var btn = document.querySelector("#ll-obody .lib-little .lib-nav [data-lib-page='1'], #ll-obody .lib-little .lib-nav [data-lib-finish]");
      if (btn) btn.classList.add("hw-next-pulse");
    }, 6000);
  }
  /* Find it! (Dawid, 2026-11-17): picture hunts on little-book pages. Hoot
     asks, the child taps the picture; a miss only ever says "look again",
     and after 3 misses a hint ring pulses on the target. No fail state. */
  var libFind = null; /* { page, misses, found } while a hunt is open */
  var libFindDone = {}; /* session only: "<bookId>:<page>" -> true */
  function libFindTarget(book, page) {
    if (!book || !book.find) return null;
    for (var i = 0; i < book.find.length; i++) if (book.find[i].p === page + 1) return book.find[i];
    return null;
  }
  function libFindSlug(book) { return book.id.replace(/^(lib|cls)-/, ""); }
  function libFindSay(name) { try { if (window.__hwSay) window.__hwSay([name]); } catch (e) {} }
  function libFindRender() {
    if (!libState) return;
    var book = libBook(libState.id); if (!book) return;
    var body = $("#ll-obody"); if (body) body.innerHTML = libPageHtml(book, libState.page);
    libFindLayout();
  }
  function libFindStart() {
    if (!libState || libState.stage !== "page") return;
    var book = libBook(libState.id); if (!book) return;
    if (!libFindTarget(book, libState.page)) return;
    libFind = { page: libState.page, misses: 0, found: false };
    libFindRender();
    libFindSay("libfind-" + libFindSlug(book) + "-p" + (libState.page + 1));
  }
  function libFindExit() {
    libFind = null;
    if (!libState) return;
    var book = libBook(libState.id); if (!book) return;
    var body = $("#ll-obody"); if (body) body.innerHTML = libPageHtml(book, libState.page);
  }
  /* Cover-fit mapping: the art fills its wrap with object-fit: cover, so a
     target's 0-1000 image coords land through the same crop transform. */
  function libFindPoint(ft) {
    var wrap = document.querySelector(".lib-reader .lib-artwrap");
    if (!wrap) return null;
    var img = wrap.querySelector("img.lib-art");
    var r = wrap.getBoundingClientRect();
    var iw = (img && img.naturalWidth) || 1920, ih = (img && img.naturalHeight) || 1280;
    var scale = Math.max(r.width / iw, r.height / ih), dw = iw * scale, dh = ih * scale;
    return { x: (r.width - dw) / 2 + ft.x / 1000 * dw, y: (r.height - dh) / 2 + ft.y / 1000 * dh,
             dw: dw, dh: dh, ox: (r.width - dw) / 2, oy: (r.height - dh) / 2, r: r };
  }
  function libFindLayout() {
    if (!libFind || !libState) return;
    var book = libBook(libState.id); if (!book) return;
    var ft = libFindTarget(book, libFind.page); if (!ft) return;
    var pt = libFindPoint(ft); if (!pt) return;
    var hint = document.querySelector(".lib-findhint"), star = document.querySelector(".lib-findstar");
    if (hint) { hint.style.left = pt.x + "px"; hint.style.top = pt.y + "px"; }
    if (star) { star.style.left = pt.x + "px"; star.style.top = pt.y + "px"; }
  }
  function libFindTap(e) {
    if (!libFind || libFind.found || !libState) return;
    var book = libBook(libState.id); if (!book) return;
    var ft = libFindTarget(book, libFind.page); if (!ft) return;
    var pt = libFindPoint(ft); if (!pt) return;
    var nx = (e.clientX - pt.r.left - pt.ox) / pt.dw * 1000;
    var ny = (e.clientY - pt.r.top - pt.oy) / pt.dh * 1000;
    var dist = Math.sqrt(Math.pow(nx - ft.x, 2) + Math.pow(ny - ft.y, 2));
    if (dist <= (ft.r || 170)) {
      libFind.found = true;
      libFindDone[book.id + ":" + libFind.page] = true;
      libFindRender();
      libFindSay("libfind-" + libFindSlug(book) + "-p" + (libFind.page + 1) + "f");
      if (libFindT) clearTimeout(libFindT);
      libFindT = setTimeout(function () { libFindT = null; if (libFind && libFind.found && libState) libFindExit(); }, 2400);
    } else {
      libFind.misses++;
      libFindRender();
      libFindSay("libfind-miss-" + (((libFind.misses - 1) % 3) + 1));
    }
  }
  function libStore() { try { return JSON.parse(localStorage.getItem(LIB_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function libReadMap(pid) { return libStore()[pid] || {}; }
  function libProgMap(pid) { try { return (JSON.parse(localStorage.getItem(LIBPROG_KEY) || "{}") || {})[pid] || {}; } catch (e) { return {}; } }
  function libHomeList(pid) { try { return (JSON.parse(localStorage.getItem(LIBHOME_KEY) || "{}") || {})[pid] || []; } catch (e) { return []; } }
  function libBand() { return state.profile && isTeenBand(bandOf(state.profile.id)) ? "teen" : "little"; }
  function libCatalog(shelf) { var b = libBand(); return LIB_BOOKS.filter(function (x) { return x.band === b && x.shelf === shelf; }); }
  function libBook(id) { return LIB_BOOKS.filter(function (x) { return x.id === id; })[0] || null; }
  function libLittlePids() { return PROFILES.filter(function (p) { return !isTeenBand(bandOf(p.id)); }).map(function (p) { return p.id; }); }
  function libCoverHtml(b, cls) {
    if (b.cover) return '<img class="' + cls + ' lib-coverimg" src="' + esc(b.cover) + '" alt="" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span class="' + cls + ' lib-gencover" style="display:none;--lc:' + b.color + '"><span class="lib-gc-emo" aria-hidden="true">' + b.emo + '</span><b>' + esc(b.title) + '</b><small>' + esc(b.author) + '</small></span>';
    /* Library 2: originals show their generated watercolour cover art with a
       title/author band along the bottom (the art itself carries no text).
       If the art ever fails to load, the generated emoji cover takes over. */
    return '<span class="' + cls + ' lib-artcover"><img class="lib-coverart" src="assets/book-art/' + b.id + '-cover.webp" alt="" loading="lazy" onerror="var p=this.parentNode;this.style.display=\'none\';var bd=p.querySelector(\'.lib-band\');if(bd)bd.style.display=\'none\';var fb=p.querySelector(\'.lib-gc-fb\');if(fb)fb.style.display=\'flex\'">' +
      '<span class="lib-band"><b>' + esc(b.title) + '</b><small>' + esc(b.author) + '</small></span>' +
      '<span class="lib-gencover lib-gc-fb" style="display:none;--lc:' + b.color + '"><span class="lib-gc-emo" aria-hidden="true">' + b.emo + '</span><b>' + esc(b.title) + '</b><small>' + esc(b.author) + '</small></span></span>';
  }
  function libCaseHtml(title, books, read) {
    if (!books.length) return "";
    var rows = [];
    for (var i = 0; i < books.length; i += 4) {
      var cells = books.slice(i, i + 4).map(function (b) {
        var done = !!read[b.id];
        return '<button type="button" class="lib-book' + (done ? " done" : "") + '" data-lib-open="' + b.id + '" data-lib-search="' + esc((b.title + " " + b.author).toLowerCase()) + '" aria-label="' + esc(b.title) + ' by ' + esc(b.author) + '">' +
          libCoverHtml(b, "lib-spine") + (done ? '<span class="lib-readmark">✓ Read</span>' : '') + "</button>";
      }).join("");
      rows.push('<div class="lib-row">' + cells + '</div><div class="lib-board" aria-hidden="true"></div>');
    }
    return '<div class="lib-case"><h4 class="lib-caseh">' + title + '</h4>' + rows.join("") + "</div>";
  }
  var libReadOpen = false;
  function libSectionHtml() {
    var p = state.profile; if (!p) return "";
    var read = libReadMap(p.id);
    var readBooks = LIB_BOOKS.filter(function (b) { return b.band === libBand() && read[b.id]; });
    var shelf = readBooks.length
      ? '<div class="lib-shelf">' + readBooks.map(function (b) { return '<button type="button" class="lib-chip" data-lib-open="' + b.id + '"><span aria-hidden="true">' + b.emo + '</span> ' + esc(b.title) + ' <span class="lib-done">✓</span></button>'; }).join("") + "</div>"
      : '<p class="lib-none">No books finished yet — pick one from a bookcase and read it to the end!</p>';
    /* Dawid (2026-11-17): the read shelf sat open at the top and pushed the
       whole library down as it grew. Now it starts tucked away behind a
       button with the count; tap to open it. */
    var readSection = !readBooks.length
      ? '<h4 class="lib-sh">Books I\'ve read</h4>' + shelf
      : '<button type="button" class="lib-readtoggle" data-lib-read-toggle aria-expanded="' + (libReadOpen ? "true" : "false") + '">' +
          '<span class="lib-readtitle">\uD83D\uDCDA Books I\'ve read</span>' +
          '<span class="lib-readcount">' + readBooks.length + (readBooks.length === 1 ? " book" : " books") + '</span>' +
          '<span class="lib-readchev" aria-hidden="true">' + (libReadOpen ? "\u25BE" : "\u25B8") + '</span></button>' +
        '<div class="lib-readshelf"' + (libReadOpen ? "" : " hidden") + '>' + shelf + '</div>';
    var home = libHomeList(p.id);
    var homeCards = home.map(function (h) {
      return '<div class="lib-homebook" data-lib-search="' + esc((h.title + " " + (h.author || "")).toLowerCase()) + '">' +
        (h.cover ? '<img class="lib-homecover" src="' + esc(h.cover) + '" alt="" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"><span class="lib-homecover lib-gencover" style="display:none;--lc:#8D6E63"><b>' + esc(h.title) + '</b><small>' + esc(h.author || "") + '</small></span>'
                 : '<span class="lib-homecover lib-gencover" style="--lc:#8D6E63"><b>' + esc(h.title) + '</b><small>' + esc(h.author || "") + '</small></span>') +
        '<span class="lib-homett"><b>' + esc(h.title) + '</b><small>' + esc(h.author || "") + '</small></span>' +
        '<button type="button" class="lib-homedel" data-lib-home-del="' + h.id + '" aria-label="Remove ' + esc(h.title) + '">✕</button></div>';
    }).join("");
    var together = libBand() === "little" && libLittlePids().length > 1
      ? '<label class="lib-tog"><input type="checkbox" data-lib-home-together> We read it together — shelve it for both kids</label>' : "";
    /* Bedtime shelf (wave 4): little profiles only — a featured Tonight's
       Story card for the newest bedtime book at the top of the library, plus
       a Bedtime Stories bookcase below the other shelves. Teen library is
       untouched (both strings stay empty there). */
    var tonightHtml = "", bedtimeCase = "";
    if (libBand() === "little") {
      var bed = libCatalog("bedtime").slice().sort(function (a, b) { return a.id < b.id ? 1 : a.id > b.id ? -1 : 0; });
      if (bed.length) {
        var tb = bed[0];
        tonightHtml = '<button type="button" class="lib-tonight" data-lib-open="' + tb.id + '" data-lib-search="' + esc((tb.title + " " + tb.author).toLowerCase()) + '" aria-label="Tonight\'s story: ' + esc(tb.title) + '">' +
          libCoverHtml(tb, "lib-tonightcover") +
          '<span class="lib-tonighttx"><span class="lib-tonightlabel">Tonight\'s Story 🌙</span>' +
          '<b class="lib-tonighttitle">' + esc(tb.title) + '</b>' +
          '<small class="lib-tonightsub">Tonight\'s bedtime story — tap to read together</small></span>' +
          '<span class="lib-tonightmoon" aria-hidden="true">🌙</span></button>';
        bedtimeCase = libCaseHtml("🌙 Bedtime Stories", bed, read);
      }
    }
    /* Author shelf (Kaitlyn): her published books on their own case, plus
       the Writing Studio entry card on her profile (kidc) only. The case is
       band-gated by libCatalog, so little profiles never see it. */
    var kaitlynCase = "", studioCard = "", echoCard = "";
    if (libBand() === "teen") {
      kaitlynCase = libCaseHtml("✍️ By Kaitlyn", libCatalog("kaitlyn"), read);
      if (p.id === "kidc") {
        var wsList = wsMineDrafts();
        var wsNOpen = wsList.filter(function (d) { return d.status === "draft"; }).length;
        var wsNSent = wsList.filter(function (d) { return d.status === "submitted" && !(d.bookId && libBook(d.bookId)); }).length;
        studioCard = '<div class="ws-card"><h4 class="ws-cardh">✒️ My Writing Studio</h4>' +
          '<p class="ws-cardline">Your stories begin here — your tutor helps with ideas, page by page.</p>' +
          '<p class="ws-cardstat">' + (wsList.length ? wsNOpen + " in progress" + (wsNSent ? " · " + wsNSent + " with your tutor 📮" : "") : "No drafts yet — start your first story!") + '</p>' +
          '<button type="button" class="ll-btn pri" data-ws-act="open">✒️ Open my writing studio</button></div>';
        echoCard = '<div class="ws-card"><h4 class="ws-cardh">🎧 Echo Practice</h4>' +
          '<p class="ws-cardline">Your tutor says a few words — you echo them back and hear yourself. No scores, ever. Just practice, at your pace.</p>' +
          '<button type="button" class="ll-btn pri" data-ec-act="open">🎧 Start echo practice</button></div>';
      }
    }
    var searchBar = '<label class="lib-searchwrap"><span aria-hidden="true">🔎</span><input type="search" class="lib-search" data-lib-search-input placeholder="Search by book name or author…" aria-label="Search books by name or author"></label>';
    var homeCase = '<div class="lib-case lib-homecase"><h4 class="lib-caseh">🏠 Books We Read at Home</h4>' +
      (homeCards ? '<div class="lib-homegrid">' + homeCards + '</div><div class="lib-board" aria-hidden="true"></div>' : '<p class="lib-none">No home books yet. Read a hard-copy book together, then add it here!</p>') +
      '<div class="lib-add"><input type="text" class="lib-addin" data-lib-home-title placeholder="Book name…" aria-label="Book name"><input type="text" class="lib-addin" data-lib-home-author placeholder="Author (if you know it)" aria-label="Author">' +
      '<button type="button" class="ll-btn pri" data-lib-home-find>Find the book</button>' + together +
      '<div class="lib-results" data-lib-results></div></div></div>';
    var isLittleLib = libBand() === "little";
    return '<section class="ll-card lib-wrap"><h3 class="lib-h">📚 The Library</h3>' +
      '<p class="lib-sub">' + (isLittleLib ? "Tap any book — it opens right away and Hoot reads it with you!" : "Tap a book — it comes off the shelf and opens. Finish it and it joins your read shelf.") + '</p>' +
      tonightHtml +
      (isLittleLib ? "" : searchBar) +
      readSection +
      libCaseHtml("📖 Our Storybooks", libCatalog("ours"), read) +
      libCaseHtml("🏛️ Classic Books", libCatalog("classic"), read) +
      kaitlynCase +
      studioCard +
      echoCard +
      bedtimeCase +
      (isLittleLib
        ? '<details class="lib-grownup-tools"><summary>🔎 Search &amp; home books (Grown-ups)</summary>' + searchBar + homeCase + "</details>"
        : homeCase) +
      '<p class="lib-nores" hidden>No books match that search yet.</p></section>';
  }
  function libSparkles(n) {
    var s = "";
    for (var i = 0; i < (n || 10); i++) s += '<span class="lib-spark" style="--sx:' + ((i * 37) % 100) + '%;--sy:' + ((i * 53) % 70) + '%;--sd:' + (i % 5) + '">✦</span>';
    return '<span class="lib-sparks" aria-hidden="true">' + s + "</span>";
  }
  function libStageHtml(book) {
    return '<section class="lib-stage">' + libSparkles(16) + '<div class="lib-halo" aria-hidden="true"></div>' +
      '<p class="lib-stagehint">Your book is coming off the shelf…</p>' +
      '<button type="button" class="lib-bigbook" data-lib-openbook aria-label="Open ' + esc(book.title) + '">' + libCoverHtml(book, "lib-bigcover") + '</button>' +
      '<p class="lib-stagehint2">Tap the book to open it ✨</p></section>';
  }
  function libTitleHtml(book) {
    var prog = state.profile ? (libProgMap(state.profile.id)[book.id] || 0) : 0;
    return '<section class="lib-stage lib-titlepage">' + libSparkles(8) +
      '<div class="lib-openbook"><div class="lib-opencover">' + libCoverHtml(book, "lib-bigcover") + '</div>' +
      '<div class="lib-titlecard"><p class="lib-tp-emo" aria-hidden="true">' + book.emo + '</p>' +
      '<h3 class="lib-rtitle">' + esc(book.title) + '</h3><p class="lib-rauthor">by ' + esc(book.author) + '</p>' +
      '<p class="lib-tp-pages">' + book.pages.length + ' pages' + (prog > 0 ? ' · you stopped on page ' + (prog + 1) : "") + '</p>' +
      (book.shelf === "kaitlyn" && book.note ? '<div class="lib-tutnote"><p class="lib-tutnoteh">🎓 From your tutor</p><p class="lib-tutnotetext">' + esc(book.note) + '</p><button type="button" class="ll-btn" data-lib-fb="overall">🔊 Hear it</button></div>' : "") +
      '<button type="button" class="ll-btn pri lib-begin" data-lib-begin>' + (prog > 0 ? "Continue reading ▶" : "Begin reading ▶") + '</button>' +
      (prog > 0 ? '<button type="button" class="ll-btn lib-restart" data-lib-restart>Start over</button>' : "") +
      "</div></div></section>";
  }
  function libPageHtml(book, page, turnCls) {
    var total = book.pages.length, last = page >= total - 1;
    var read = state.profile ? libReadMap(state.profile.id) : {};
    var dots = book.pages.length <= 24 ? book.pages.map(function (_, i) { return '<span class="lib-dot' + (i === page ? " on" : "") + '"></span>'; }).join("") : "";
    var togetherBtn = last && !read[book.id] && book.band === "little" && libLittlePids().length > 1
      ? '<button type="button" class="ll-btn" data-lib-together>👫 We read it together!</button>' : "";
    var nav = '<div class="lib-nav">' +
      (page > 0 ? '<button type="button" class="ll-btn" data-lib-page="-1">← Back</button>' : '<span></span>') +
      ((book.band === "little" || book.narrate) ? '<button type="button" class="ll-btn" data-lib-listen>🔊 Read to me</button>' : '<span></span>') +
      (last
        ? (read[book.id] ? '<span class="lib-alread">✓ You read this book!</span>'
                          : '<span class="lib-finishrow"><button type="button" class="ll-btn pri" data-lib-finish>Finished! 🎉</button>' + togetherBtn + "</span>")
        : '<button type="button" class="ll-btn pri" data-lib-page="1">Next page →</button>') +
      "</div>";
    if (book.band === "teen") {
      /* Library 2: teen books are a full-screen e-reader — cream page, ornament,
         clean text, no illustrations. */
      return '<section class="lib-reader lib-teen">' +
        '<div class="lib-pagecard ' + (turnCls || "") + '"><p class="lib-orn" aria-hidden="true">❦</p>' +
        '<p class="lib-page">' + esc(book.pages[page]) + '</p>' +
        '<p class="lib-pageno">Page ' + (page + 1) + ' of ' + total + '</p></div>' +
        (book.pnotes && book.pnotes[page] ? '<div class="lib-tutnote"><p class="lib-tutnoteh">🎓 Your tutor\'s note on this page</p><p class="lib-tutnotetext">' + esc(book.pnotes[page]) + '</p><button type="button" class="ll-btn" data-lib-fb="' + (page + 1) + '">🔊 Hear it</button></div>' : "") +
        (dots ? '<div class="lib-dots" aria-hidden="true">' + dots + '</div>' : "") + nav + "</section>";
    }
    /* Library 2: little books open full-screen — the watercolour fills the top
       of the screen, big type sits on the cream page below, and the screen
       edges are large invisible page-turn tap zones. Art is WebP, falling
       back to the v1 SVG, then hiding if neither exists. */
    var artBase = "assets/book-art/" + book.id + "-p" + (page + 1);
    var art = '<div class="lib-artwrap"><img class="lib-art" src="' + artBase + '.webp" alt="" onerror="if(!this.dataset.fb){this.dataset.fb=1;this.src=\'' + artBase + '.svg\'}else{this.style.display=\'none\'}"></div>';
    var ft = libFindTarget(book, page);
    var finding = !!(libFind && libFind.page === page && ft);
    if (finding) {
      var fb = libFind.found ? "🎉 You found " + ft.label + "!"
        : (libFind.misses > 0 ? "👀 Look again! " + ft.ask : "🔍 " + ft.ask);
      art = art.replace("</div>", '<div class="lib-findlayer" data-lib-findlayer></div>' +
        '<div class="lib-findbanner' + (libFind.misses > 0 && !libFind.found ? " wiggle" : "") + '">' + esc(fb) + "</div>" +
        (libFind.misses >= 3 && !libFind.found ? '<div class="lib-findhint" aria-hidden="true"></div>' : "") +
        (libFind.found ? '<div class="lib-findstar" aria-hidden="true">\u2B50</div>' : "") + "</div>");
    }
    var zones = finding ? "" : ((page > 0 ? '<button type="button" class="lib-zone lib-zone-prev" data-lib-page="-1" aria-label="Previous page"></button>' : "") +
      (!last ? '<button type="button" class="lib-zone lib-zone-next" data-lib-page="1" aria-label="Next page"></button>' : ""));
    var findNav = '<div class="lib-nav lib-findnav"><button type="button" class="ll-btn" data-lib-findback>\u2190 Back to the story</button>' +
      '<button type="button" class="ll-btn pri" data-lib-findask>🔊 Hear it again</button></div>';
    var findRow = ft ? '<div class="lib-findrow"><button type="button" class="ll-btn lib-findbtn' + (libFindDone[book.id + ":" + page] ? " done" : "") + '" data-lib-findit>' +
      "🔍 Find it!" + "</button></div>" : "";
    return '<section class="lib-reader lib-little">' +
      '<div class="lib-sheet ' + (turnCls || "") + '">' + art +
      '<div class="lib-textwrap"><p class="lib-page">' + esc(book.pages[page]) + '</p>' +
      '<p class="lib-pageno">Page ' + (page + 1) + ' of ' + total + '</p>' +
      (dots ? '<div class="lib-dots" aria-hidden="true">' + dots + '</div>' : "") + "</div></div>" +
      (finding ? findNav : zones + nav + findRow) + "</section>";
  }
  function libSpeakPage() {
    if (!libState || libState.stage !== "page") return;
    var book = libBook(libState.id);
    if (!book || (book.band !== "little" && !book.narrate)) return;
    try { if (window.__hwSay) window.__hwSay(["lib-" + book.id.replace(/^(lib|cls)-/, "") + "-p" + (libState.page + 1)]); } catch (e) {}
  }
  function libSaveProg() {
    if (!libState || !state.profile) return;
    try {
      var all = JSON.parse(localStorage.getItem(LIBPROG_KEY) || "{}") || {};
      var mine = all[state.profile.id] || {};
      mine[libState.id] = libState.page;
      all[state.profile.id] = mine;
      localStorage.setItem(LIBPROG_KEY, JSON.stringify(all));
    } catch (e) {}
  }
  function openBook(id, page) {
    bindLibSwipe();
    libFind = null;
    var book = libBook(id); if (!book) return;
    /* Wave 2 (Finding 1): little-kid books open in ONE tap directly to their saved page
       (or page 0) with immediate Hoot narration — no 3-tap cover/title-page hurdle.
       Teen books keep the cover & title page (with tutor overall notes). */
    var openDirect = typeof page === "number" || book.band === "little";
    if (openDirect) {
      var startPage = typeof page === "number" ? page : (state.profile ? (libProgMap(state.profile.id)[book.id] || 0) : 0);
      if (startPage < 0 || startPage >= book.pages.length) startPage = 0;
      libStopTimers();
      libState = { id: id, page: startPage, stage: "page" };
      nextView = { kind: "book", key: id, page: startPage, title: book.title };
      openShellOverlay(book.title, libPageHtml(book, startPage));
      libSaveProg();
      if (book.band === "little" || book.narrate) libSpeakT = setTimeout(function () { libSpeakT = null; libSpeakPage(); libArmTurnPulse(); }, 250);
      return;
    }
    libState = { id: id, page: 0, stage: "cover" };
    nextView = { kind: "book", key: id, title: book.title };
    openShellOverlay(book.title, libStageHtml(book));
  }
  function libOpenCover() {
    if (!libState) return;
    var book = libBook(libState.id); if (!book) return;
    libState.stage = "title";
    var body = $("#ll-obody"); if (body) body.innerHTML = libTitleHtml(book);
  }
  function libBegin(fromStart) {
    libFind = null;
    if (!libState || !state.profile) return;
    var book = libBook(libState.id); if (!book) return;
    libState.page = fromStart ? 0 : (libProgMap(state.profile.id)[book.id] || 0);
    libState.stage = "page";
    var body = $("#ll-obody"); if (body) body.innerHTML = libPageHtml(book, libState.page, "turn-next");
    if (curView && curView.kind === "book") curView.page = libState.page;
    libStopTimers();
    libSaveProg();
    if (book.band === "little" || book.narrate) libSpeakT = setTimeout(function () { libSpeakT = null; libSpeakPage(); }, 250);
  }
  function libTurn(delta) {
    if (!libState) return;
    if (libFind) return; /* a hunt is open: turns wait until it ends */
    var book = libBook(libState.id); if (!book) return;
    libStopTimers();
    libState.page = Math.max(0, Math.min(book.pages.length - 1, libState.page + delta));
    var body = $("#ll-obody"); if (body) body.innerHTML = libPageHtml(book, libState.page, delta > 0 ? "turn-next" : "turn-prev");
    if (curView && curView.kind === "book") curView.page = libState.page;
    libSaveProg();
    if (book.band === "little" || book.narrate) { libSpeakPage(); libArmTurnPulse(); }
  }
  function libFinish(together) {
    if (!libState || !state.profile) return;
    var book = libBook(libState.id); if (!book) return;
    var pids = together ? libLittlePids() : [state.profile.id];
    var starNow = false, starKey = "📖 " + book.title;
    try {
      var all = libStore(), prog = JSON.parse(localStorage.getItem(LIBPROG_KEY) || "{}") || {};
      pids.forEach(function (pid) {
        var mine = all[pid] || {};
        if (!mine[book.id]) mine[book.id] = tutExpTodayStr();
        all[pid] = mine;
        if (prog[pid]) delete prog[pid][book.id];
        try {
          var xp = planDay(pid, true); xp.d.done = xp.d.done || {};
          if (!xp.d.done[starKey]) { xp.d.done[starKey] = 1; if (pid === state.profile.id) starNow = true; }
          planSave(xp.s);
        } catch (e2) {}
      });
      localStorage.setItem(LIB_KEY, JSON.stringify(all));
      localStorage.setItem(LIBPROG_KEY, JSON.stringify(prog));
    } catch (e) {}
    try { bumpStars(); } catch (e) {}
    var body = $("#ll-obody");
    if (body) body.innerHTML = '<section class="lib-stage lib-done-stage">' + libSparkles(14) +
      '<p class="lib-done-emo" aria-hidden="true">🎉</p>' +
      '<h3 class="lib-rtitle">You finished a book!</h3>' +
      '<p class="lib-page">' + esc(book.title) + '<br><small>by ' + esc(book.author) + '</small></p>' +
      '<p class="lib-pageno">' + (together ? "It is on BOTH kids' read shelves now — reading together counts for everyone!" : "It is on your “Books I've read” shelf now.") + '</p>' +
      (starNow ? '<p class="lib-pageno">\u2B50 +1 star for finishing this book!</p>' : "") +
      '<div class="lib-nav"><span></span><button type="button" class="ll-btn pri" data-lib-back>Back to the library</button><span></span></div></section>';
    try { if (window.__hwSay) window.__hwSay(["hoot-star"]); } catch (e) {}
  }
  function libHomeSave(entry, together) {
    var pids = together ? libLittlePids() : [state.profile.id];
    try {
      var all = JSON.parse(localStorage.getItem(LIBHOME_KEY) || "{}") || {};
      pids.forEach(function (pid) {
        var list = all[pid] || [];
        list.unshift(Object.assign({}, entry));
        all[pid] = list.slice(0, 60);
      });
      localStorage.setItem(LIBHOME_KEY, JSON.stringify(all));
    } catch (e) {}
  }
  function libHomeFind(btn) {
    var wrap = btn.closest(".lib-add"); if (!wrap || !state.profile) return;
    var title = (wrap.querySelector("[data-lib-home-title]").value || "").trim();
    var author = (wrap.querySelector("[data-lib-home-author]").value || "").trim();
    var results = wrap.querySelector("[data-lib-results]");
    if (!title) { results.innerHTML = '<p class="lib-none">Type the book\'s name first.</p>'; return; }
    results.innerHTML = '<p class="lib-none">Looking for the book…</p>';
    var url = "https://openlibrary.org/search.json?limit=6&fields=title,author_name,cover_i&title=" + encodeURIComponent(title) + (author ? "&author=" + encodeURIComponent(author) : "");
    fetch(url).then(function (r) { return r.json(); }).then(function (d) {
      var docs = (d.docs || []).filter(function (x) { return x.title; });
      if (!docs.length) { results.innerHTML = '<p class="lib-none">No match found — <button type="button" class="ll-btn" data-lib-home-manual>Add it with the name I typed</button></p>'; return; }
      results.innerHTML = '<p class="lib-none">Tap the right book:</p><div class="lib-resgrid">' + docs.map(function (x, i) {
        var cov = x.cover_i ? "https://covers.openlibrary.org/b/id/" + x.cover_i + "-M.jpg" : "";
        return '<button type="button" class="lib-res" data-lib-home-pick="' + i + '">' +
          (cov ? '<img src="' + cov + '" alt="" loading="lazy">' : '<span class="lib-resgen"><b>' + esc(x.title) + '</b></span>') +
          '<span><b>' + esc(x.title) + '</b><small>' + esc((x.author_name || []).join(", ")) + '</small></span></button>';
      }).join("") + "</div>";
      results._docs = docs;
    }).catch(function () {
      results.innerHTML = '<p class="lib-none">The book finder could not connect — <button type="button" class="ll-btn" data-lib-home-manual>Add it with the name I typed</button></p>';
    });
  }
  /* Swipe to turn pages (Dawid, 2026-11-16): a clear horizontal swipe on a
     book page turns it — left for next, right for back. The synthetic click
     a touch can leave behind on an edge zone is swallowed for a beat so a
     swipe never turns two pages. Vertical scrolling (teen pages) is left
     alone: the swipe must dominate horizontally. */
  var libSwipe = null, libSwipeSwallowUntil = 0, libSwipeBound = false;
  function bindLibSwipe() {
    if (libSwipeBound) return;
    var ov = document.getElementById("ll-overlay");
    if (!ov) return;
    libSwipeBound = true;
    ov.addEventListener("touchstart", function (e) {
      libSwipe = null;
      if (!libState || libState.stage !== "page" || !e.touches || e.touches.length !== 1) return;
      var r = e.target && e.target.closest ? e.target.closest(".lib-reader") : null;
      if (!r) return;
      libSwipe = { x: e.touches[0].clientX, y: e.touches[0].clientY, at: Date.now() };
    }, { passive: true });
    ov.addEventListener("touchmove", function (e) {
      /* Scoped to #ll-overlay so Home/Learn/Games scrolling stays 100% passive on iPad. */
      if (!libSwipe || !e.touches || e.touches.length !== 1) return;
      var dx = e.touches[0].clientX - libSwipe.x, dy = e.touches[0].clientY - libSwipe.y;
      if (Math.abs(dx) > 12 && Math.abs(dx) > 1.6 * Math.abs(dy)) e.preventDefault();
    }, { passive: false });
    ov.addEventListener("touchend", function (e) {
      if (!libSwipe) return;
      var t = e.changedTouches && e.changedTouches[0];
      var dx = t ? t.clientX - libSwipe.x : 0, dy = t ? t.clientY - libSwipe.y : 0;
      var dt = Date.now() - libSwipe.at;
      libSwipe = null;
      if (!t || dt > 700 || Math.abs(dx) < 56 || Math.abs(dx) < 1.6 * Math.abs(dy)) return;
      libSwipeSwallowUntil = Date.now() + 450;
      libTurn(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
  setTimeout(bindLibSwipe, 0);
  document.addEventListener("DOMContentLoaded", bindLibSwipe);
  document.addEventListener("click", function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (Date.now() < libSwipeSwallowUntil && t.closest("[data-lib-page]")) return;
    var rt = t.closest("[data-lib-read-toggle]");
    if (rt) {
      libReadOpen = !libReadOpen;
      var rsh = rt.parentElement ? rt.parentElement.querySelector(".lib-readshelf") : null;
      if (rsh) rsh.hidden = !libReadOpen;
      rt.setAttribute("aria-expanded", libReadOpen ? "true" : "false");
      var rcv = rt.querySelector(".lib-readchev"); if (rcv) rcv.textContent = libReadOpen ? "\u25BE" : "\u25B8";
      return;
    }
    var open = t.closest("[data-lib-open]");
    if (open) { openBook(open.getAttribute("data-lib-open")); return; }
    var ob = t.closest("[data-lib-openbook]");
    if (ob) { libOpenCover(); return; }
    var bg = t.closest("[data-lib-begin]");
    if (bg) { libBegin(false); return; }
    var rs = t.closest("[data-lib-restart]");
    if (rs) { libBegin(true); return; }
    var pg = t.closest("[data-lib-page]");
    if (pg) { libTurn(parseInt(pg.getAttribute("data-lib-page"), 10)); return; }
    var ls = t.closest("[data-lib-listen]");
    if (ls) { libSpeakPage(); return; }
    var lfb = t.closest("[data-lib-fb]");
    if (lfb) { libPlayFb(lfb.getAttribute("data-lib-fb")); return; }
    var fin = t.closest("[data-lib-finish]");
    if (fin) { libFinish(false); return; }
    var tog = t.closest("[data-lib-together]");
    if (tog) { libFinish(true); return; }
    var bk = t.closest("[data-lib-back]");
    if (bk) { goBack(); setTimeout(function () { try { render(); } catch (e) {} }, 90); return; }
    var fit = t.closest("[data-lib-findit]");
    if (fit) { libFindStart(); return; }
    var fbk = t.closest("[data-lib-findback]");
    if (fbk) { libFindExit(); return; }
    var fask = t.closest("[data-lib-findask]");
    if (fask) { if (libState) { var bk2 = libBook(libState.id); if (bk2) libFindSay("libfind-" + libFindSlug(bk2) + "-p" + (libState.page + 1)); } return; }
    var flayer = t.closest("[data-lib-findlayer]");
    if (flayer) { libFindTap(e); return; }
    var find = t.closest("[data-lib-home-find]");
    if (find) { libHomeFind(find); return; }
    var pick = t.closest("[data-lib-home-pick]");
    if (pick) {
      var wrap = pick.closest(".lib-add"), results = wrap && wrap.querySelector("[data-lib-results]");
      var doc = results && results._docs && results._docs[parseInt(pick.getAttribute("data-lib-home-pick"), 10)];
      if (doc) {
        var togetherEl = wrap.querySelector("[data-lib-home-together]");
        libHomeSave({ id: "home-" + Date.now(), title: doc.title, author: (doc.author_name || []).join(", "), cover: doc.cover_i ? "https://covers.openlibrary.org/b/id/" + doc.cover_i + "-L.jpg" : "", date: tutExpTodayStr() }, !!(togetherEl && togetherEl.checked));
        render();
      }
      return;
    }
    var man = t.closest("[data-lib-home-manual]");
    if (man) {
      var wrap2 = man.closest(".lib-add");
      var title2 = (wrap2.querySelector("[data-lib-home-title]").value || "").trim();
      var author2 = (wrap2.querySelector("[data-lib-home-author]").value || "").trim();
      var togetherEl2 = wrap2.querySelector("[data-lib-home-together]");
      if (title2) { libHomeSave({ id: "home-" + Date.now(), title: title2, author: author2, cover: "", date: tutExpTodayStr() }, !!(togetherEl2 && togetherEl2.checked)); render(); }
      return;
    }
    var wsa = t.closest("[data-ws-act]");
    if (wsa) { wsAct(wsa.getAttribute("data-ws-act"), wsa); return; }
    var eca = t.closest("[data-ec-act]");
    if (eca) { ecAct(eca.getAttribute("data-ec-act"), eca); return; }
    var del = t.closest("[data-lib-home-del]");
    if (del && state.profile) {
      try {
        var all = JSON.parse(localStorage.getItem(LIBHOME_KEY) || "{}") || {};
        var list = (all[state.profile.id] || []).filter(function (h) { return h.id !== del.getAttribute("data-lib-home-del"); });
        all[state.profile.id] = list;
        localStorage.setItem(LIBHOME_KEY, JSON.stringify(all));
        render();
      } catch (e2) {}
      return;
    }
  });
  document.addEventListener("input", function (e) {
    var inp = e.target; if (!inp || !inp.matches || !inp.matches("[data-lib-search-input]")) return;
    var q = (inp.value || "").trim().toLowerCase(), wrap = inp.closest(".lib-wrap"), shown = 0;
    if (!wrap) return;
    wrap.querySelectorAll("[data-lib-search]").forEach(function (card) {
      var hit = !q || card.getAttribute("data-lib-search").indexOf(q) >= 0;
      card.style.display = hit ? "" : "none"; if (hit) shown++;
    });
    var nr = wrap.querySelector(".lib-nores"); if (nr) nr.hidden = shown > 0;
  });

  /* ================= Kaitlyn's Writing Studio (author shelf) ==========
     Drafts live in hootworld.stories.v1 (rides Family Sync). She writes
     page by page; her tutor (tut-ws-* clips, Lily's voice) guides with
     story sparks, tips and stuck-point help. Sending a story mints its
     bookId; the tutor's workshop publishes under that exact id, and the
     studio spots the finished book on her shelf via libBook(bookId).
     Her words are never edited by the studio. The studio is an overlay,
     so leaving it silences the tutor via closeOverlay/goBack like every
     other overlay (Dawid's exit rule). */
  var WS_KEY = "hootworld.stories.v1";
  var WS_MAX_DRAFTS = 12, WS_MAX_PAGES = 20, WS_MAX_CHARS = 900;
  var wsState = null;
  var WS_CATS = [
    { id: "animal", emo: "🐾", name: "Animal tales" },
    { id: "space", emo: "🚀", name: "Space stories" },
    { id: "mystery", emo: "🔎", name: "Mysteries" },
    { id: "friendship", emo: "💛", name: "Friendship" },
    { id: "magic", emo: "✨", name: "Magic" },
    { id: "ocean", emo: "🌊", name: "Ocean stories" }
  ];
  var WS_SEEDS = [
    { id: "animal-1", cat: "animal", title: "The Fox Who Lost His Tail", hook: "A young fox wakes up and his tail is gone — and a trail of feathers leads into the woods.", first: "When Finn the fox woke up, something felt wrong. His tail was gone." },
    { id: "animal-2", cat: "animal", title: "The Stray Cat's Secret", hook: "A stray cat follows one girl home every day — but she is the only one who can see her.", first: "The cat was waiting on the fence again, watching Maya with one green eye and one gold." },
    { id: "space-1", cat: "space", title: "The Last Star Map", hook: "A girl finds a star map in her grandmother's attic — and one star on it is blinking.", first: "The star on the map blinked. Elena held her breath and counted: blink, blink, blink — like a message." },
    { id: "space-2", cat: "space", title: "Luna Station's New Cook", hook: "The new cook on a space station has never cooked in zero gravity — and the captain hates surprises.", first: "The soup floated out of the pot in perfect silver bubbles, and Chef Marco knew he was in trouble." },
    { id: "mystery-1", cat: "mystery", title: "The Locked Garden Shed", hook: "Every night at nine, a light comes on in the shed nobody has opened in ten years.", first: "At nine o'clock, the light in the old shed flickered on — just like it had every night that week." },
    { id: "mystery-2", cat: "mystery", title: "The Missing Trophy", hook: "The school trophy vanished from a locked case. The only clue: one small, muddy footprint.", first: "By the time Nora reached the trophy case, the glass was clean, the lock was shut — and the cup was gone." },
    { id: "friendship-1", cat: "friendship", title: "The New Girl's Notebook", hook: "You find the new girl's lost notebook. Reading it feels wrong — returning it might change everything.", first: "The notebook was lying in the rain, its cover swelling with water, and Sam knew exactly whose it was." },
    { id: "friendship-2", cat: "friendship", title: "Two Captains", hook: "Best friends both get picked as team captain — of rival teams.", first: "Coach read out the names, and June's stomach dropped. Captain of the Hawks: her. Captain of the Wolves: Bea." },
    { id: "magic-1", cat: "magic", title: "The Clock That Runs Backward", hook: "A little shop sells a clock that runs backward — and someone keeps using it to undo their worst moments.", first: "The clock above the counter ticked backward, and nobody in the shop seemed to notice but Wren." },
    { id: "magic-2", cat: "magic", title: "One Wish, Carefully Worded", hook: "A fountain grants exactly one wish — but it takes every single word literally.", first: "\"I wish I could fly,\" said Petra, and the fountain's water went perfectly, dangerously still." },
    { id: "ocean-1", cat: "ocean", title: "The Lighthouse Keeper's Daughter", hook: "Every storm, something knocks three times on the lighthouse door — from the sea side.", first: "The knock came at midnight, three slow raps, and the sea was far too rough for any boat." },
    { id: "ocean-2", cat: "ocean", title: "The Tide Pool Map", hook: "At the lowest tide of the year, a pattern in the tide pools looks exactly like a treasure map.", first: "The tide had never gone out this far, and in the last pool, something gold was glinting." }
  ];
  var WS_TIPS = [
    "One gentle idea: give your character one line of dialogue on this page. Talking shows us who they are.",
    "Try the five senses: what does your character hear right now?",
    "End the page on a small question or a surprise — it pulls your reader to the next page.",
    "Show the feeling: instead of saying she was sad, what did her hands do?",
    "Give your character a want — something they are trying to get. That is the engine of every story.",
    "Short sentences speed things up. Long sentences slow things down. Mix them on purpose.",
    "Read your page in your head like a movie. If a scene is blurry, add one clear detail.",
    "Stuck on a name? Pick the first one that feels right and keep moving. Names can change later."
  ];
  var WS_ENC = [
    "I love where this is going. Keep building, one page at a time.",
    "That is a strong page. You are thinking like a real author now.",
    "You are building something real here, Kaitlyn. Your reader is going to feel this story."
  ];
  var WS_HELP = [
    { id: "beginning", title: "The beginning", moves: ["Start in the middle of a moment — your character already doing something.", "Let the reader catch up; explain the rest as you go.", "Give us one detail that makes us ask: what happens next?"] },
    { id: "middle", title: "The middle", moves: ["Ask: what does my character want?", "Now ask: what is standing in the way?", "Every new problem your character meets makes the story stronger."] },
    { id: "ending", title: "The ending", moves: ["Endings echo beginnings — look back at your first page.", "How has your character changed? Show that change in one small, clear moment.", "The last line should feel like a door closing softly, not a wall."] },
    { id: "dialogue", title: "Dialogue", moves: ["Real people interrupt, tease, and leave things unsaid.", "Read your lines in your head — if a line sounds like a speech, trim it.", "You do not need 'he said' on every line. Actions can carry the talking."] },
    { id: "describe", title: "Describing a place", moves: ["Pick three details only — the three that matter most.", "Use a sound and a smell, not just what things look like.", "Three sharp details paint a clearer picture than a long list."] }
  ];
  function wsStoreAll() { try { return JSON.parse(localStorage.getItem(WS_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function wsMineRaw() {
    var all = wsStoreAll(), m = all.kidc;
    if (!m || typeof m !== "object") m = { order: [], drafts: {} };
    if (!m.drafts || typeof m.drafts !== "object") m.drafts = {};
    if (!Array.isArray(m.order)) m.order = Object.keys(m.drafts);
    return m;
  }
  function wsSave(mine) { try { var all = wsStoreAll(); all.kidc = mine; localStorage.setItem(WS_KEY, JSON.stringify(all)); } catch (e) {} }
  function wsMineDrafts() { var m = wsMineRaw(); return m.order.map(function (id) { return m.drafts[id]; }).filter(Boolean); }
  function wsDraft(id) { var m = wsMineRaw(); return m.drafts[id] || null; }
  function wsSay(name) { try { if (window.__hwSay) window.__hwSay([name]); } catch (e) {} }
  function wsPublished(d) { return !!(d && d.status === "submitted" && d.bookId && libBook(d.bookId)); }
  function wsStatus(d) { if (wsPublished(d)) return "published"; return d.status === "submitted" ? "submitted" : "draft"; }
  function wsSlug(t) { var s = String(t || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/-+$/g, ""); return s || "story"; }
  function wsMintBookId(title) {
    var base = "kait-" + wsSlug(title), id = base, n = 2, taken = {};
    wsMineDrafts().forEach(function (d) { if (d.bookId) taken[d.bookId] = 1; });
    while (libBook(id) || taken[id]) { id = base + "-" + n; n++; }
    return id;
  }
  function wsWords(s) { var t = String(s || "").trim(); return t ? t.split(/\s+/).length : 0; }
  function wsRender() {
    var body = $("#ll-obody"); if (!body || !wsState) return;
    var html = "";
    if (wsState.stage === "home") html = wsHomeHtml();
    else if (wsState.stage === "seeds") html = wsSeedsHtml();
    else if (wsState.stage === "editor") html = wsEditorHtml();
    else if (wsState.stage === "help") html = wsHelpHtml();
    else if (wsState.stage === "path") html = wsPathHtml();
    else if (wsState.stage === "example") html = wsExampleHtml();
    else if (wsState.stage === "ending") html = wsEndingHtml();
    else if (wsState.stage === "titlehelp") html = wsTitleHelpHtml();
    else if (wsState.stage === "submit") html = wsSubmitHtml();
    else if (wsState.stage === "confirmdel") html = wsConfirmDelHtml();
    body.innerHTML = html;
    if (wsState.stage === "editor") {
      var d = wsDraft(wsState.draftId);
      wsState.pageStartWords = d ? wsWords(d.pages[wsState.page]) : 0;
    }
    if (wsState.stage === "home") {
      /* First studio visit after a book lands: celebrate it once. */
      var m = wsMineRaw(), changed = false;
      Object.keys(m.drafts).forEach(function (id) {
        var d = m.drafts[id];
        if (wsPublished(d) && !d.celebrated) { d.celebrated = 1; changed = true; }
      });
      if (changed) { wsSave(m); setTimeout(function () { wsSay("tut-ws-published"); }, 350); }
    }
  }
  function wsOpenStudio() {
    wsState = { stage: "home", draftId: null, page: 0, tipIdx: -1, encIdx: 0, helpId: null, banner: null, showTip: false, step: 0, expage: 0, stuck: false, exFrom: "home" };
    nextView = { kind: "studio", title: "My Writing Studio" };
    openShellOverlay("✒️ My Writing Studio", "");
    wsRender();
    wsSay("tut-ws-welcome");
  }
  function wsHomeHtml() {
    var list = wsMineDrafts();
    var rows = list.map(function (d) {
      var st = wsStatus(d);
      var chip = st === "published" ? '<span class="ws-chip pub">Published 🎉</span>'
        : st === "submitted" ? '<span class="ws-chip sent">With my tutor 📮</span>'
        : '<span class="ws-chip">Writing…</span>';
      var btns = "";
      if (st === "published") btns = '<button type="button" class="ll-btn pri" data-ws-act="read" data-draft="' + d.id + '">📖 Read my book</button>';
      else if (st === "submitted") btns = '<button type="button" class="ll-btn" data-ws-act="edit" data-draft="' + d.id + '">👀 Look at it</button><button type="button" class="ll-btn" data-ws-act="unsend" data-draft="' + d.id + '">↩ Unsend</button>';
      else btns = '<button type="button" class="ll-btn pri" data-ws-act="edit" data-draft="' + d.id + '">✏️ Keep writing</button>';
      btns += '<button type="button" class="ll-btn ws-del" data-ws-act="del" data-draft="' + d.id + '">🗑 Delete</button>';
      return '<div class="ws-draft"><div class="ws-draftmain"><b>' + esc(d.title || "Untitled story") + '</b>' +
        '<small>' + d.pages.length + (d.pages.length === 1 ? " page" : " pages") + " · " + d.pages.reduce(function (a, p) { return a + wsWords(p); }, 0) + " words</small></div>" +
        chip + '<div class="ws-draftbtns">' + btns + "</div></div>";
    }).join("");
    return '<section class="ws-wrap">' +
      (wsState.banner ? '<p class="ws-banner">' + esc(wsState.banner) + "</p>" : "") +
      '<p class="ws-intro">This is your studio, Kaitlyn. Write your own stories, one page at a time — your tutor is here with sparks, tips and help whenever you want them.</p>' +
      '<div class="ws-topbtns"><button type="button" class="ll-btn pri" data-ws-act="new">✨ Start a new story — guided</button>' +
      '<button type="button" class="ll-btn" data-ws-act="example">📖 Tutor\'s example book</button>' +
      '<button type="button" class="ll-btn" data-ws-act="seeds">🌱 Story sparks</button></div>' +
      (rows ? '<div class="ws-list">' + rows + "</div>" : '<p class="ws-none">No stories yet. Tap “Start a new story”, or pick a spark and let it pull you in.</p>') +
      '<div class="ws-foot"><button type="button" class="ll-btn" data-ws-act="done">✓ Done for now</button></div></section>';
  }
  function wsSeedsHtml() {
    var groups = WS_CATS.map(function (c) {
      var cards = WS_SEEDS.filter(function (s) { return s.cat === c.id; }).map(function (s) {
        return '<div class="ws-seed"><b>' + esc(s.title) + '</b><p>' + esc(s.hook) + '</p>' +
          '<p class="ws-seedfirst">“' + esc(s.first) + '”</p>' +
          '<button type="button" class="ll-btn pri" data-ws-act="useseed" data-seed="' + s.id + '">Use this spark</button></div>';
      }).join("");
      return '<div class="ws-cat"><button type="button" class="ws-cathead" data-ws-act="seedcat" data-cat="' + c.id + '">' + c.emo + " " + c.name + ' <span class="ws-cathear">🔊</span></button>' + cards + "</div>";
    }).join("");
    return '<section class="ws-wrap"><p class="ws-intro">Story sparks are beginnings, not rules. Pick one and make it yours — change the names, the place, anything.</p>' +
      groups +
      '<div class="ws-foot"><button type="button" class="ll-btn" data-ws-act="home">← Back to my studio</button></div></section>';
  }
  function wsNewDraft(seed) {
    var m = wsMineRaw();
    if (Object.keys(m.drafts).length >= WS_MAX_DRAFTS) {
      wsState.stage = "home"; wsState.banner = "Your studio shelf is full — finish or delete a draft to make room for a new story.";
      wsRender(); return;
    }
    var id = "ws-" + Date.now();
    var d = { id: id, title: seed ? seed.title : "", pages: [seed ? seed.first : ""], seedId: seed ? seed.id : null,
      status: "draft", bookId: null, createdAt: Date.now(), updatedAt: Date.now(), submittedAt: null, celebrated: 0 };
    m.drafts[id] = d; m.order.unshift(id); wsSave(m);
    wsState.draftId = id; wsState.page = 0; wsState.stage = "editor"; wsState.banner = null; wsState.showTip = false;
    wsRender();
    wsSay(seed ? "tut-ws-seed-picked" : "tut-ws-new");
  }
  function wsEditorHtml() {
    var d = wsDraft(wsState.draftId);
    if (!d) { wsState.stage = "home"; return wsHomeHtml(); }
    var st = wsStatus(d);
    var locked = st !== "draft";
    var page = Math.max(0, Math.min(wsState.page || 0, d.pages.length - 1));
    wsState.page = page;
    var dots = d.pages.length <= 24 ? d.pages.map(function (_, i) { return '<span class="lib-dot' + (i === page ? " on" : "") + '"></span>'; }).join("") : "";
    var tip = wsState.showTip && wsState.tipIdx >= 0 ? '<div class="ws-tip"><p class="ws-tiphead">💡 Tutor tip</p><p>' + esc(WS_TIPS[wsState.tipIdx]) + "</p></div>" : "";
    var head = "";
    if (st === "published") head = '<p class="ws-banner pub">🎉 This story is a real book on your shelf now! <button type="button" class="ll-btn pri" data-ws-act="read" data-draft="' + d.id + '">📖 Read my book</button></p>';
    else if (st === "submitted") head = '<p class="ws-banner">📮 This story is with your tutor. She is reading every page, writing your notes, painting your cover and recording it aloud. It is resting now — tap Unsend if you want to change it.</p>';
    return '<section class="ws-wrap ws-editor">' +
      (wsState.banner ? '<p class="ws-banner">' + esc(wsState.banner) + "</p>" : "") + head + tip +
      wsGuideHtml(d) +
      '<label class="ws-lab">Story title</label>' +
      '<input type="text" class="ws-title" data-ws-title maxlength="80" placeholder="Give your story a title…" value="' + esc(d.title || "") + '"' + (locked ? " disabled" : "") + ">" +
      (locked ? "" : '<button type="button" class="ll-btn ws2-titlebtn" data-ws-act="titlehelp">💡 Help me title it</button>') +
      '<div class="ws-pagestrip"><span>Page ' + (page + 1) + " of " + d.pages.length + '</span>' + (dots ? '<span class="lib-dots">' + dots + "</span>" : "") +
      '<span data-ws-count>' + String(d.pages[page] || "").length + " / " + WS_MAX_CHARS + " letters</span></div>" +
      wsJobHtml(d, page, locked) +
      '<textarea class="ws-page" data-ws-page rows="10" maxlength="' + WS_MAX_CHARS + '" placeholder="Write this page of your story…"' + (locked ? " disabled" : "") + ">" + esc(d.pages[page] || "") + "</textarea>" +
      '<div class="ws-nav">' +
      (page > 0 ? '<button type="button" class="ll-btn" data-ws-act="prev">← Prev page</button>' : "<span></span>") +
      '<span class="ws-words">' + wsWords(d.pages[page]) + " words on this page</span>" +
      (!locked && page < d.pages.length - 1 ? '<button type="button" class="ll-btn" data-ws-act="next">Next page →</button>' : (!locked ? '<button type="button" class="ll-btn pri" data-ws-act="newpage">＋ New page</button>' : "<span></span>")) +
      "</div>" +
      (locked ? "" : '<div class="ws-tools">' +
        '<button type="button" class="ll-btn" data-ws-act="seeds">🌱 Sparks</button>' +
        '<button type="button" class="ll-btn" data-ws-act="tip">💡 Tutor tip</button>' +
        '<button type="button" class="ll-btn" data-ws-act="help">🆘 Help me with this bit</button>' +
        (page < d.pages.length - 1 ? '<button type="button" class="ll-btn" data-ws-act="newpage">＋ New page</button>' : "") +
        (d.pages.length > 1 ? '<button type="button" class="ll-btn ws-del" data-ws-act="delpage">🗑 This page</button>' : "") +
        "</div>") +
      '<div class="ws-foot">' +
      '<button type="button" class="ll-btn" data-ws-act="home">← My studio</button>' +
      (st === "submitted" ? '<button type="button" class="ll-btn" data-ws-act="unsend" data-draft="' + d.id + '">↩ Unsend</button>' : "") +
      (st === "draft" ? '<button type="button" class="ll-btn pri" data-ws-act="presubmit">📮 Send to my tutor</button>' : "") +
      '<button type="button" class="ll-btn" data-ws-act="done">✓ Done for now</button></div></section>';
  }
  function wsHelpHtml() {
    var open = WS_HELP.filter(function (h) { return h.id === wsState.helpId; })[0];
    var secs = WS_HELP.map(function (h) {
      var isOpen = open && open.id === h.id;
      return '<div class="ws-helpsec"><button type="button" class="ws-helphead" data-ws-act="helpsec" data-help="' + h.id + '">' + esc(h.title) + "</button>" +
        (isOpen ? '<ul class="ws-moves">' + h.moves.map(function (mv) { return "<li>" + esc(mv) + "</li>"; }).join("") + "</ul>" : "") + "</div>";
    }).join("");
    return '<section class="ws-wrap"><p class="ws-intro">Every writer gets stuck. Pick where you are stuck, and try one of the moves — then go back and write.</p>' +
      secs +
      '<div class="ws-foot"><button type="button" class="ll-btn pri" data-ws-act="backedit">✏️ Back to my page</button>' +
      '<button type="button" class="ll-btn" data-ws-act="home">← My studio</button></div></section>';
  }
  function wsSubmitHtml() {
    var d = wsDraft(wsState.draftId);
    if (!d) { wsState.stage = "home"; return wsHomeHtml(); }
    var emptyPages = [];
    d.pages.forEach(function (p, i) { if (wsWords(p) < 3) emptyPages.push(i + 1); });
    var hasTitle = !!(d.title && d.title.trim());
    var li = function (ok, txt) { return '<li class="' + (ok ? "ok" : "no") + '">' + (ok ? "✓ " : "• ") + esc(txt) + "</li>"; };
    return '<section class="ws-wrap"><h4 class="ws-h">📮 Send “' + esc(d.title || "Untitled story") + '” to your tutor?</h4>' +
      '<ul class="ws-check">' + li(hasTitle, hasTitle ? "It has a title" : "It needs a title first") +
      li(!emptyPages.length, emptyPages.length ? "Pages " + emptyPages.join(", ") + " still need a few words" : "Every page has words") +
      li(true, d.pages.length + (d.pages.length === 1 ? " page" : " pages") + ", " + d.pages.reduce(function (a, p) { return a + wsWords(p); }, 0) + " words") + "</ul>" +
      '<p class="ws-intro">Your tutor reads every page, writes you notes, paints your cover, and reads your story aloud in her voice. Your words stay exactly as you wrote them — notes are suggestions, never changes. Your book appears on your shelf when it is ready; your story travels to your tutor next time the app syncs.</p>' +
      '<div class="ws-foot"><button type="button" class="ll-btn" data-ws-act="backedit">✏️ Keep writing</button>' +
      '<button type="button" class="ll-btn pri" data-ws-act="send">📮 Send it</button></div></section>';
  }
  function wsConfirmDelHtml() {
    var d = wsDraft(wsState.draftId);
    if (!d) { wsState.stage = "home"; return wsHomeHtml(); }
    return '<section class="ws-wrap"><h4 class="ws-h">🗑 Delete “' + esc(d.title || "Untitled story") + '”?</h4>' +
      '<p class="ws-intro">Only do this if you are really sure. This cannot be undone.</p>' +
      '<div class="ws-foot"><button type="button" class="ll-btn" data-ws-act="home">Keep it</button>' +
      '<button type="button" class="ll-btn ws-delbtn" data-ws-act="delyes">Yes, delete it</button></div></section>';
  }
  function wsEncourageIfGrew() {
    var d = wsDraft(wsState.draftId); if (!d) return;
    var now = wsWords(d.pages[wsState.page]);
    if (now >= (wsState.pageStartWords || 0) + 3) {
      wsState.encIdx = (wsState.encIdx || 0) % 3 + 1;
      wsState.banner = "🎓 " + WS_ENC[wsState.encIdx - 1];
      wsSay("tut-ws-enc-" + wsState.encIdx);
    }
  }
  function wsAct(act, el) {
    if (!wsState && act !== "open") return;
    var draftId = el && el.getAttribute ? el.getAttribute("data-draft") : null;
    if (act === "open") { wsOpenStudio(); return; }
    if (act === "done") { goBack(); return; }
    if (ws2Act(act, el)) return;
    if (act === "home") { wsState.stage = "home"; wsState.banner = null; wsRender(); return; }
    if (act === "new") { wsStartGuided(); return; }
    if (act === "seeds") { wsState.stage = "seeds"; wsRender(); wsSay("tut-ws-seeds"); return; }
    if (act === "seedcat") { wsSay("tut-ws-seed-" + el.getAttribute("data-cat")); return; }
    if (act === "useseed") {
      var seed = WS_SEEDS.filter(function (s) { return s.id === el.getAttribute("data-seed"); })[0];
      if (seed) wsNewDraft(seed);
      return;
    }
    if (act === "edit") { wsState.draftId = draftId; wsState.page = 0; wsState.banner = null; wsState.showTip = false; var ed0 = wsDraft(draftId); if (ed0 && ed0.guided && wsStatus(ed0) === "draft" && !(ws2Plan(ed0).hero && ws2Plan(ed0).place && ws2Plan(ed0).trouble)) { var pl0 = ws2Plan(ed0); wsState.step = !pl0.hero ? 1 : !pl0.place ? 2 : 3; wsState.stage = "path"; wsRender(); wsSay(wsState.step === 1 ? "tut-ws2-step-hero" : wsState.step === 2 ? "tut-ws2-step-place" : "tut-ws2-step-trouble"); return; } wsState.stage = "editor"; wsRender(); var ed = wsDraft(draftId); if (ed && wsStatus(ed) === "submitted") wsSay("tut-ws-locked"); return; }
    if (act === "read") { var rd = wsDraft(draftId); if (rd && rd.bookId) openBook(rd.bookId); return; }
    if (act === "del") { wsState.draftId = draftId; wsState.stage = "confirmdel"; wsRender(); wsSay("tut-ws-delete"); return; }
    if (act === "delyes") {
      var m = wsMineRaw(); delete m.drafts[wsState.draftId];
      m.order = m.order.filter(function (x) { return x !== wsState.draftId; });
      wsSave(m); wsState.stage = "home"; wsState.draftId = null; wsRender(); return;
    }
    if (act === "unsend") {
      var m2 = wsMineRaw(), ud = m2.drafts[draftId || wsState.draftId];
      if (ud) { ud.status = "draft"; ud.submittedAt = null; ud.updatedAt = Date.now(); wsSave(m2); }
      if (wsState.stage === "editor") wsRender(); else { wsState.stage = "home"; wsRender(); }
      return;
    }
    /* Editor-stage actions */
    var d = wsDraft(wsState.draftId); if (!d) return;
    if (act === "prev") { wsEncourageIfGrew(); wsState.page = Math.max(0, wsState.page - 1); wsRender(); return; }
    if (act === "next") { wsEncourageIfGrew(); wsState.page = Math.min(d.pages.length - 1, wsState.page + 1); wsRender(); return; }
    if (act === "newpage") {
      if (d.pages.length >= WS_MAX_PAGES) { wsSay("tut-ws-cap"); wsState.banner = "This story has " + WS_MAX_PAGES + " pages — that is a whole book! Send it to your tutor, then start the next one."; wsRender(); return; }
      wsEncourageIfGrew();
      var m3 = wsMineRaw(); m3.drafts[d.id].pages.push(""); m3.drafts[d.id].updatedAt = Date.now(); wsSave(m3);
      wsState.page = d.pages.length; wsRender(); wsSay("tut-ws-page-new"); return;
    }
    if (act === "delpage") {
      var m4 = wsMineRaw(); m4.drafts[d.id].pages.splice(wsState.page, 1);
      if (!m4.drafts[d.id].pages.length) m4.drafts[d.id].pages = [""];
      m4.drafts[d.id].updatedAt = Date.now(); wsSave(m4);
      wsState.page = Math.max(0, wsState.page - 1); wsRender(); return;
    }
    if (act === "tip") { wsState.tipIdx = ((typeof wsState.tipIdx === "number" ? wsState.tipIdx : -1) + 1) % WS_TIPS.length; wsState.showTip = true; wsRender(); wsSay("tut-ws-tip-" + (wsState.tipIdx + 1)); return; }
    if (act === "help") { wsState.stage = "help"; wsState.helpId = null; wsRender(); wsSay("tut-ws-help"); return; }
    if (act === "helpsec") { wsState.helpId = el.getAttribute("data-help"); wsRender(); wsSay("tut-ws-help-" + wsState.helpId); return; }
    if (act === "backedit") { wsState.stage = "editor"; wsRender(); return; }
    if (act === "presubmit") { wsState.stage = "submit"; wsRender(); wsSay("tut-ws-submit"); return; }
    if (act === "send") {
      var empty = d.pages.some(function (p) { return wsWords(p) < 3; });
      if (!d.title || !d.title.trim() || empty) {
        wsState.stage = "editor";
        wsState.page = Math.max(0, d.pages.findIndex(function (p) { return wsWords(p) < 3; }));
        wsState.banner = !d.title || !d.title.trim() ? "Your story needs a title before it goes to your tutor." : "One page still needs a few words before your story can go.";
        wsRender(); wsSay("tut-ws-empty"); return;
      }
      var m5 = wsMineRaw(), sd = m5.drafts[d.id];
      sd.bookId = wsMintBookId(sd.title); sd.status = "submitted"; sd.submittedAt = Date.now(); sd.updatedAt = Date.now();
      wsSave(m5); wsState.stage = "home"; wsState.banner = "📮 Sent! Your story is with your tutor now."; wsRender(); wsSay("tut-ws-submitted"); return;
    }
  }
  document.addEventListener("input", function (e) {
    var inp = e.target; if (!inp || !inp.matches || !wsState) return;
    var isTitle = inp.matches("[data-ws-title]"), isPage = inp.matches("[data-ws-page]"), isPlan = inp.matches("[data-ws-plan]");
    if (!isTitle && !isPage && !isPlan) return;
    if (isPlan) return;
    var d = wsDraft(wsState.draftId); if (!d || wsStatus(d) !== "draft") return;
    var m = wsMineRaw(), md = m.drafts[d.id]; if (!md) return;
    if (isTitle) md.title = inp.value.slice(0, 80);
    else {
      md.pages[wsState.page] = inp.value.slice(0, WS_MAX_CHARS);
      var wrap = inp.closest(".ws-editor");
      var cnt = wrap && wrap.querySelector("[data-ws-count]");
      if (cnt) cnt.textContent = inp.value.length + " / " + WS_MAX_CHARS + " letters";
      var wspan = wrap && wrap.querySelector(".ws-words");
      if (wspan) wspan.textContent = wsWords(inp.value) + " words on this page";
    }
    md.updatedAt = Date.now(); wsSave(m);
  });
  /* ═══ ECHO PRACTICE (Kaitlyn, kidc only) ═══
     Approved by Dawid 2026-11-17 after he shared that Kaitlyn hears words
     clearly in her head but struggles to say them aloud. Design rules: tiny
     chunks, unlimited replays, private record-and-listen-back, encouragement
     only — NOTHING is scored, timed, graded, saved or sent anywhere.
     Recordings live in memory only and are destroyed on exit
     (window.__ecCleanup, wired into closeOverlay beside stopAllVoices).
     Tutor voice only; clips tut-echo-* recorded from echo-content.json. */
  var EC_SETS = [
    { id: "everyday", title: "Everyday phrases", sub: "Useful things to say at school and at home", lines: [
      { t: "Could I have a glass of water, please?", c: ["Could I have", "a glass of water,", "please?"] },
      { t: "I don't understand this part yet.", c: ["I don't understand", "this part yet."] },
      { t: "Can you show me one more time?", c: ["Can you show me", "one more time?"] },
      { t: "I need a little more time.", c: ["I need", "a little more time."] },
      { t: "My favorite subject is art.", c: ["My favorite subject", "is art."] },
      { t: "Thank you for helping me.", c: ["Thank you", "for helping me."] },
      { t: "I would like to try again.", c: ["I would like", "to try again."] },
      { t: "That makes sense to me now.", c: ["That makes sense", "to me now."] }
    ] },
    { id: "books", title: "From my books", sub: "Short lines from the stories on your shelf", lines: [
      { t: "Maya spotted it first.", c: [] },
      { t: "The tower had been empty for thirty years.", c: ["The tower had been empty", "for thirty years."] },
      { t: "That light is talking.", c: [] },
      { t: "The tower stairs creaked.", c: [] },
      { t: "His hands shook a little.", c: ["His hands shook", "a little."] },
      { t: "The hill went dark.", c: [] },
      { t: "Slowly, the Hudson cleared.", c: [] },
      { t: "The highway of water is still open.", c: ["The highway of water", "is still open."] }
    ] },
    { id: "twisters", title: "Silly tongue twisters", sub: "Just for fun — these are tricky for everyone", lines: [
      { t: "Toy boat, toy boat, toy boat.", c: ["Toy boat,", "toy boat,", "toy boat."] },
      { t: "She sees cheese.", c: [] },
      { t: "Three free throws.", c: [] },
      { t: "Red leather, yellow leather.", c: ["Red leather,", "yellow leather."] },
      { t: "She sells seashells by the seashore.", c: ["She sells seashells", "by the seashore."] },
      { t: "Peter Piper picked a pepper.", c: ["Peter Piper", "picked a pepper."] }
    ] },
    { id: "hard-words-1", kind: "words", title: "Hard words: everyday", sub: "One word at a time — hear it in pieces, then whole", lines: [
      { t: "Paparazzi.", c: ["Papa", "Paparazzi"] },
      { t: "Definitely.", c: [] },
      { t: "Library.", c: ["Li", "Library"] },
      { t: "February.", c: ["Feb", "February"] },
      { t: "Wednesday.", c: ["Wednes", "day"] },
      { t: "Comfortable.", c: ["Comfort", "able"] },
      { t: "Chocolate.", c: ["Choco", "late"] },
      { t: "Vegetable.", c: [] }
    ] },
    { id: "hard-words-2", kind: "words", title: "Hard words: school", sub: "School words, one piece at a time", lines: [
      { t: "Photosynthesis.", c: ["Photo", "synthesis"] },
      { t: "Ecosystem.", c: [] },
      { t: "Constitution.", c: ["Consti", "Constitution"] },
      { t: "Multiplication.", c: ["Multi", "Multiplication"] },
      { t: "Denominator.", c: [] },
      { t: "Equivalent.", c: ["Equiv", "Equivalent"] },
      { t: "Temperature.", c: ["Temper", "ature"] },
      { t: "Experiment.", c: [] }
    ] },
    { id: "hard-words-3", kind: "words", title: "Hard words: long ones", sub: "Long words that tangle everyone's tongue", lines: [
      { t: "Unfortunately.", c: ["Un", "fortunately"] },
      { t: "Particularly.", c: ["Partic", "Particularly"] },
      { t: "Embarrassed.", c: [] },
      { t: "Necessary.", c: [] },
      { t: "Occasionally.", c: ["Occasion", "ally"] },
      { t: "Specific.", c: [] },
      { t: "Statistics.", c: [] },
      { t: "Rhinoceros.", c: ["Rhino", "Rhinoceros"] }
    ] }
  ];
  var ecState = null, ecRec = null, ecRecUrl = null, ecAudio = null, ecRecTimer = null, ecMicPending = false;
  function ecSay(name) { try { if (window.__hwSay) window.__hwSay([name]); } catch (e) {} }
  function ecLine() { return EC_SETS[ecState.set].lines[ecState.line]; }
  function ecTargetText() { var L = ecLine(); return ecState.mode === "chunk" ? L.c[ecState.chunk] : L.t; }
  function ecTargetClip() {
    return ecState.mode === "chunk"
      ? "tut-echo-l" + ecState.set + "-" + ecState.line + "c" + ecState.chunk
      : "tut-echo-l" + ecState.set + "-" + ecState.line;
  }
  function ecSupported() { return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder); }
  function ecDropRecUrl() {
    if (ecAudio) { try { ecAudio.pause(); } catch (e) {} }
    if (ecRecUrl) { try { URL.revokeObjectURL(ecRecUrl); } catch (e) {} ecRecUrl = null; }
  }
  function ecCleanup() {
    ecMicPending = false;
    if (ecRecTimer) { clearTimeout(ecRecTimer); ecRecTimer = null; }
    if (ecRec) {
      var r = ecRec; ecRec = null; r.dead = true;
      try { r.mr.stop(); } catch (e) {}
      try { r.stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
    }
    ecDropRecUrl();
  }
  window.__ecCleanup = ecCleanup;
  function ecOpen() {
    ecCleanup();
    ecState = { stage: "home", set: 0, line: 0, mode: "line", chunk: 0, hasRec: false, note: null, banner: null, encIdx: 0 };
    nextView = { kind: "echo", title: "Echo Practice" };
    openShellOverlay("🎧 Echo Practice", "");
    ecRender();
    ecSay("tut-echo-welcome");
  }
  function ecRender() {
    var b = $("#ll-obody"); if (!b || !ecState) return;
    b.innerHTML = ecState.stage === "home" ? ecHomeHtml() : ecPlayHtml();
  }
  function ecHomeHtml() {
    var cards = EC_SETS.map(function (s, i) {
      return '<div class="ws-seed"><b>' + esc(s.title) + "</b><p>" + esc(s.sub) + "</p>" +
        '<p class="ws-seedfirst">' + s.lines.length + (s.kind === "words" ? " words" : " lines") + "</p>" +
        '<button type="button" class="ll-btn pri" data-ec-act="set" data-set="' + i + '">Start</button></div>';
    }).join("");
    return '<section class="ws-wrap ec-wrap">' +
      (ecState.banner ? '<p class="ws-banner">' + esc(ecState.banner) + "</p>" : "") +
      '<p class="ws-intro">Echo Practice is just you and your tutor. She says a few words, you echo them back, and you can hear yourself. Hear her as many times as you want. Nothing is scored, nothing is timed, and your recordings never leave this device.</p>' +
      '<div class="ws-list">' + cards + "</div>" +
      '<div class="ws-foot"><button type="button" class="ll-btn" data-ec-act="done">✓ Done for now</button></div></section>';
  }
  function ecPlayHtml() {
    var set = EC_SETS[ecState.set], L = ecLine();
    var inChunk = ecState.mode === "chunk";
    var h = '<section class="ws-wrap ec-wrap">' +
      '<p class="ec-crumb">' + esc(set.title) + (set.kind === "words" ? " · Word " : " · Line ") + (ecState.line + 1) + " of " + set.lines.length +
      (inChunk ? " · Piece " + (ecState.chunk + 1) + " of " + L.c.length : "") + "</p>" +
      '<div class="ec-linebox"><p class="ec-line">' + esc(ecTargetText()) + "</p>" +
      (inChunk ? '<p class="ec-fullline">' + (set.kind === "words" ? "The whole word: " : "The whole line: ") + "“" + esc(L.t) + "”</p>" : "") + "</div>";
    if (ecState.note) h += '<p class="ws-banner">' + esc(ecState.note) + "</p>";
    h += '<div class="ec-btnrow">' +
      '<button type="button" class="ll-btn pri" data-ec-act="hear">🔊 Hear your tutor</button>' +
      (!inChunk && L.c.length ? '<button type="button" class="ll-btn" data-ec-act="chunks">🐌 Piece by piece</button>' : "") +
      (inChunk ? '<button type="button" class="ll-btn" data-ec-act="whole">' + (set.kind === "words" ? "Whole word" : "Whole line") + "</button>" : "") +
      "</div>" +
      '<div class="ec-btnrow">' +
      (ecRec
        ? '<button type="button" class="ll-btn ec-rec on" data-ec-act="rec">■ Stop — I\'m listening…</button>'
        : '<button type="button" class="ll-btn ec-rec" data-ec-act="rec">🎙️ Record my echo</button>') +
      (ecState.hasRec ? '<button type="button" class="ll-btn" data-ec-act="mine">▶️ Hear myself</button>' : "") +
      "</div>";
    if (ecState.hasRec) h += '<p class="ec-compare">Listen to yourself, then hear your tutor once more — notice how close you are. Try again as many times as you like.</p>';
    var nav = "";
    if (inChunk && ecState.chunk < L.c.length - 1) nav = '<button type="button" class="ll-btn pri" data-ec-act="nextchunk">Next piece →</button>';
    else if (inChunk) nav = '<button type="button" class="ll-btn pri" data-ec-act="whole">Now the whole ' + (set.kind === "words" ? "word" : "line") + ' →</button>';
    else if (ecState.line < set.lines.length - 1) nav = '<button type="button" class="ll-btn pri" data-ec-act="next">Next ' + (set.kind === "words" ? "word" : "line") + ' →</button>';
    else nav = '<button type="button" class="ll-btn pri" data-ec-act="finish">✓ Finish</button>';
    h += '<div class="ec-btnrow ec-nav">' + nav +
      '<button type="button" class="ll-btn" data-ec-act="sets">↩ All practice sets</button>' +
      '<button type="button" class="ll-btn" data-ec-act="done">✓ Done for now</button></div>' +
      '<p class="ec-privacy">Your recordings stay on this device and are never saved or sent anywhere.</p></section>';
    return h;
  }
  function ecStartSet(i) {
    ecCleanup();
    ecState.set = i; ecState.line = 0; ecState.mode = "line"; ecState.chunk = 0;
    ecState.hasRec = false; ecState.note = null; ecState.stage = "play";
    ecRender(); ecSay(ecTargetClip());
  }
  function ecSetTarget(mode, chunk) {
    ecCleanup();
    ecState.mode = mode; ecState.chunk = chunk || 0; ecState.hasRec = false; ecState.note = null;
    ecRender(); ecSay(ecTargetClip());
  }
  function ecToggleRec() {
    if (ecMicPending) return;
    if (ecRec) { try { ecRec.mr.stop(); } catch (e) {} return; }
    if (!ecState) return;
    if (!ecSupported()) { ecState.note = "This browser can't record here — you can still listen and practice out loud."; ecRender(); return; }
    ecMicPending = true;
    stopAllVoices();
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      ecMicPending = false;
      if (!ecState) { stream.getTracks().forEach(function (t) { t.stop(); }); return; }
      var mr;
      try { mr = new MediaRecorder(stream); } catch (e) { stream.getTracks().forEach(function (t) { t.stop(); }); if (ecState) { ecState.note = "This browser can't record here — you can still listen and practice out loud."; ecRender(); } return; }
      var chunks = [];
      var rec = { mr: mr, stream: stream, dead: false };
      mr.ondataavailable = function (ev) { if (ev.data && ev.data.size) chunks.push(ev.data); };
      mr.onstop = function () {
        stream.getTracks().forEach(function (t) { t.stop(); });
        if (rec.dead) return;
        if (ecRecTimer) { clearTimeout(ecRecTimer); ecRecTimer = null; }
        ecRec = null;
        var blob = mr.mimeType ? new Blob(chunks, { type: mr.mimeType }) : new Blob(chunks);
        if (!ecState) return;
        if (!blob.size) { ecState.note = "That recording came out empty — try again when you're ready."; ecRender(); return; }
        ecDropRecUrl();
        ecRecUrl = URL.createObjectURL(blob);
        ecState.hasRec = true; ecState.note = null;
        ecRender();
        ecState.encIdx = (ecState.encIdx % 5) + 1;
        ecSay("tut-echo-enc-" + ecState.encIdx);
      };
      ecRec = rec;
      mr.start();
      ecRecTimer = setTimeout(function () { if (ecRec) { try { ecRec.mr.stop(); } catch (e) {} } }, 12000);
      ecRender();
    }).catch(function () {
      ecMicPending = false;
      if (!ecState) return;
      ecState.note = "The microphone wasn't allowed, so nothing was recorded. You can still listen and practice out loud.";
      ecRender();
    });
  }
  function ecPlayMine() {
    if (!ecRecUrl) return;
    stopAllVoices();
    if (!ecAudio) ecAudio = new Audio();
    ecAudio.src = ecRecUrl;
    var p = ecAudio.play(); if (p && p.catch) p.catch(function () {});
  }
  function ecAct(act, el) {
    if (act === "open") { ecOpen(); return; }
    if (!ecState) return;
    if (act === "set") ecStartSet(parseInt(el.getAttribute("data-set"), 10) || 0);
    else if (act === "hear") ecSay(ecTargetClip());
    else if (act === "chunks") { ecCleanup(); ecState.mode = "chunk"; ecState.chunk = 0; ecState.hasRec = false; ecState.note = null; ecRender(); ecSay("tut-echo-chunks"); }
    else if (act === "whole") ecSetTarget("line", 0);
    else if (act === "nextchunk") ecSetTarget("chunk", ecState.chunk + 1);
    else if (act === "rec") ecToggleRec();
    else if (act === "mine") ecPlayMine();
    else if (act === "next") { ecState.line++; ecSetTarget("line", 0); }
    else if (act === "finish") { ecCleanup(); ecState.stage = "home"; ecState.banner = "Great practicing today 🎉"; ecRender(); ecSay("tut-echo-done"); }
    else if (act === "sets") { ecCleanup(); ecState.stage = "home"; ecState.banner = null; ecRender(); }
    else if (act === "done") closeOverlay();
  }

  /* Tutor feedback clips for her published books (workshop-recorded):
     tut-ws-fb-<slug>-overall / tut-ws-fb-<slug>-p<N>. */
  function libPlayFb(kind) {
    if (!libState) return;
    var book = libBook(libState.id); if (!book || book.shelf !== "kaitlyn") return;
    var slug = book.id.replace(/^kait-/, "");
    wsSay("tut-ws-fb-" + slug + (kind === "overall" ? "-overall" : "-p" + kind));
  }
  /* ================= Guided Story Path (author shelf, pass 2) ==========
     Dawid 2026-11-18: Kaitlyn has never written a book, so the tutor must
     guide and explain all along — not just sparks and tips. New stories
     now start on a Story Path: (0) the tutor's own tiny example book,
     shown page by page with the secret of how each page was made;
     (1) pick a hero, (2) pick a place, (3) pick the trouble — choosing,
     not inventing from nothing, with a "my own idea" card at each step;
     (4) a story map (Beginning / Middle / End) filled with her picks.
     In the editor, every page carries a JOB (meet / trouble / try / big /
     end) explained by the tutor before she writes, tappable sentence
     starters, and an "I'm stuck" panel with three insertable rescue
     lines for that job. The last page offers an ending helper (two ways
     to finish) and the title field a title helper (three patterns built
     from her picks). All guidance is spoken in the tutor voice
     (tut-ws2-* clips, avocado_v2:Lily). Her words are never edited. */
  var WS2_EXAMPLE = {
    title: "Pip and the Moon Kite",
    pages: [
      "Pip was a small fox who loved the moon. Every night, she climbed the little hill behind her den to say goodnight to it.",
      "One night, a big cloud covered the moon, and Pip's goodnight had nowhere to go. “I have to bring the moon back,” she said.",
      "Pip found an old kite with a long silver string. She flew it up, up, up, until it tickled the cloud, and the cloud sneezed, and drifted away.",
      "“Goodnight, Moon,” said Pip, and the moon shone down on her like a smile. The end."
    ],
    notes: [
      "Page one secret: I only did two things. I said who my hero is, and what she loves. That is all a first page has to do.",
      "Page two secret: I started the trouble. Something my hero loved went wrong. Trouble is what makes a story move.",
      "Middle page secret: my hero tried something. Middle pages are for trying. Your hero can try, and fail, and try again. Failing is allowed. It makes the story better.",
      "Last page secret: I fixed the trouble, and ended with one warm, quiet moment. That is a whole book: beginning, trouble, trying, ending."
    ]
  };
  var WS2_HEROES = [
    { id: "dragon", emo: "🐉", name: "The Shy Dragon", short: "The Dragon", clip: "tut-ws2-hero-dragon", line: "He wants a friend more than anything, but his fire keeps scaring everyone away." },
    { id: "bakercat", emo: "🐱", name: "The Bakery Cat", short: "The Bakery Cat", clip: "tut-ws2-hero-bakercat", line: "She wants to bake a cake that nobody will ever forget." },
    { id: "inventor", emo: "🔧", name: "The Kid Inventor", short: "The Inventor", clip: "tut-ws2-hero-inventor", line: "He builds wild machines, and he wants to win the school science fair." },
    { id: "twins", emo: "🧭", name: "The Twin Explorers", short: "The Twins", clip: "tut-ws2-hero-twins", line: "They want to be the first to map the woods behind their house." },
    { id: "robotdog", emo: "🤖", name: "Mia and Her Robot Dog", short: "Mia", clip: "tut-ws2-hero-robotdog", line: "She built her best friend out of spare parts, and now she wants to teach him to play fetch like a real dog." }
  ];
  var WS2_PLACES = [
    { id: "lighthouse", emo: "🌊", name: "A Lighthouse by the Sea", noun: "Lighthouse", clip: "tut-ws2-place-lighthouse", line: "Storms, secrets, and something always knocking at the door." },
    { id: "treehouse", emo: "🌳", name: "A Treehouse Village", noun: "Treehouse", clip: "tut-ws2-place-treehouse", line: "High in the branches, where the kids make all the rules." },
    { id: "library", emo: "📚", name: "A Magical Library", noun: "Library", clip: "tut-ws2-place-library", line: "Some of the books whisper, and one shelf is always locked." },
    { id: "snowtown", emo: "🏔️", name: "A Snowy Mountain Town", noun: "Snow Town", clip: "tut-ws2-place-snowtown", line: "Winter lasts half the year, and everyone knows everyone." }
  ];
  var WS2_TROUBLES = [
    { id: "lost", emo: "🔍", name: "Something Precious Gets Lost", titleWord: "Great Search", dayWord: "Search", clip: "tut-ws2-trouble-lost", line: "Your hero has to find it before it's too late." },
    { id: "storm", emo: "⛈️", name: "A Big Storm Is Coming", titleWord: "Big Storm", dayWord: "Storm", clip: "tut-ws2-trouble-storm", line: "Your hero has to get ready, or get everyone safe." },
    { id: "newkid", emo: "🧒", name: "A New Kid Arrives", titleWord: "New Kid", dayWord: "Day", clip: "tut-ws2-trouble-newkid", line: "The new kid seems unfriendly. But things are not always what they seem." },
    { id: "bigday", emo: "🎪", name: "The Big Day Goes Wrong", titleWord: "Worst Day Ever", dayWord: "Day", clip: "tut-ws2-trouble-bigday", line: "The day your hero waited for all year suddenly falls apart." },
    { id: "door", emo: "🚪", name: "A Door That Was Never There", titleWord: "Door That Wasn't There", dayWord: "Night", clip: "tut-ws2-trouble-door", line: "A door appears that was never there before. Doors like that are never just doors." }
  ];
  var WS2_JOBS = {
    meet: { title: "Meet your hero", clip: "tut-ws2-job-meet",
      goal: "Tell us your hero's name, and show us one thing they love, or something they do every day. That's all this page has to do. Small and warm.",
      starters: ["___ loved ___ more than anything in the world.", "Every morning, ___ would ___ before the sun was even up.", "This is ___. ___ lived in ___, and today felt like no ordinary day."],
      stuck: ["Her favourite thing in the whole world was ___.", "___ woke up in ___ and smiled. Today was a ___ kind of day.", "In her pocket, ___ always carried a ___, just in case."] },
    trouble: { title: "The trouble starts", clip: "tut-ws2-job-trouble",
      goal: "Something goes wrong, or something strange happens. Use the trouble you picked, and let it walk right onto the page.",
      starters: ["But one day, something went wrong: ___.", "Suddenly, ___!", "When ___ saw ___, their heart went thump, thump, thump."],
      stuck: ["Then the weather turned, and ___ began to ___.", "Something was missing: the ___ was gone!", "There was a knock at the door. Nobody was supposed to knock today."] },
    try: { title: "Trying", clip: "tut-ws2-job-try",
      goal: "Your hero tries something to fix the trouble. It can work a little, or fail completely. Failing is fine here. It makes the story better.",
      starters: ["First, ___ tried ___.", "That did not work, so ___ decided to ___.", "Then ___ met ___, who said, “___!”"],
      stuck: ["First, ___ tried ___, but it only made things worse.", "Just then, ___ arrived, carrying exactly one useful thing: ___.", "___ decided to use the thing she loved most: ___. Maybe it could help."] },
    big: { title: "The biggest moment", clip: "tut-ws2-job-big",
      goal: "This is the hardest or most exciting part of your story. Everything has been leading here. Slow down, and give it your best details.",
      starters: ["Just then, the worst part happened: ___.", "___ took a deep breath. This was it. ___ had to ___.", "Everything depended on ___. ___ stepped forward and ___."],
      stuck: ["If ___ failed now, ___ would lose ___ forever.", "The ___ was right there, and it was in danger.", "Everything went quiet. ___ could hear her own heart: thump, thump, thump."] },
    end: { title: "The ending", clip: "tut-ws2-job-end",
      goal: "This is your last page, for now. Every story needs an ending. Use the ending helper below, and I'll show you the two ways writers finish a story. You can always add more pages later.",
      starters: ["At last, it was over, and ___ was safe and home.", "___ looked back once, smiled, and ___. The end.", "And that is how ___ learned that ___."],
      stuck: ["And so, back in ___, things felt right again.", "___ looked at ___ and smiled. Some things had changed forever.", "“We did it,” ___ whispered. The end."] }
  };
  var WS2_ENDINGS = [
    { id: "fix", emo: "🧩", name: "Fix the trouble", clip: "tut-ws2-ending-fix",
      text: "Your hero solves the problem, and things are set right again. Like Pip: the cloud drifted away, and she said goodnight to the moon." },
    { id: "changed", emo: "🌱", name: "Come home changed", clip: "tut-ws2-ending-changed",
      text: "The problem isn't perfectly fixed, but your hero has grown: braver, or kinder, or understanding something she didn't before." }
  ];
  function ws2Plan(d) { return (d && d.plan && typeof d.plan === "object") ? d.plan : {}; }
  function ws2SavePlanField(draftId, key, val) {
    var m = wsMineRaw(), md = m.drafts[draftId]; if (!md) return;
    if (!md.plan || typeof md.plan !== "object") md.plan = {};
    md.plan[key] = val; md.updatedAt = Date.now(); wsSave(m);
  }
  function ws2ById(list, id) { return list.filter(function (x) { return x.id === id; })[0] || null; }
  function ws2JobFor(d, idx) {
    var total = d.pages.length;
    if (idx === 0) return "meet";
    if (idx === total - 1 && total >= 2) return "end";
    if (idx === total - 2 && total >= 4) return "big";
    if (idx === 1) return "trouble";
    return "try";
  }
  function ws2JobClip(d, job) {
    if (job === "end") {
      var e = ws2Plan(d).ending;
      if (e === "fix") return "tut-ws2-job-end-fix";
      if (e === "changed") return "tut-ws2-job-end-changed";
    }
    return WS2_JOBS[job].clip;
  }
  function ws2JobGoal(d, job) {
    if (job === "end") {
      var e = ws2Plan(d).ending;
      if (e === "fix") return "Your ending fixes the trouble. Show us things set right, and finish with one warm, quiet line, like a door closing softly.";
      if (e === "changed") return "Your ending brings your hero home changed. The trouble may not be perfectly fixed, but your hero has learned something, or feels something new. Show us that change in one small moment.";
    }
    return WS2_JOBS[job].goal;
  }
  function wsStartGuided() {
    var m = wsMineRaw();
    if (Object.keys(m.drafts).length >= WS_MAX_DRAFTS) {
      wsState.stage = "home"; wsState.banner = "Your studio shelf is full — finish or delete a draft to make room for a new story.";
      wsRender(); return;
    }
    var id = "ws-" + Date.now();
    m.drafts[id] = { id: id, title: "", pages: [""], seedId: null, guided: 1, plan: {},
      status: "draft", bookId: null, createdAt: Date.now(), updatedAt: Date.now(), submittedAt: null, celebrated: 0 };
    m.order.unshift(id); wsSave(m);
    wsState.draftId = id; wsState.page = 0; wsState.step = 0; wsState.stage = "path"; wsState.banner = null; wsState.showTip = false; wsState.stuck = false;
    wsRender(); wsSay("tut-ws2-path-start");
  }
  var WS2_STEPS = ["Example", "Hero", "Place", "Trouble", "Story map"];
  function ws2TrailHtml(active, plan) {
    var doneTo = active;
    if (plan) { if (plan.hero) doneTo = Math.max(doneTo, 1); if (plan.place) doneTo = Math.max(doneTo, 2); if (plan.trouble) doneTo = Math.max(doneTo, 3); }
    var chips = WS2_STEPS.map(function (s, i) {
      var cls = i === active ? " on" : (i < doneTo || (plan && ((i === 1 && plan.hero) || (i === 2 && plan.place) || (i === 3 && plan.trouble))) ? " done" : "");
      var mark = cls.indexOf("done") >= 0 ? "✓ " : "";
      if (i <= doneTo || cls.indexOf("done") >= 0) return '<button type="button" class="ws2-step' + cls + '" data-ws-act="pathstep" data-step="' + i + '">' + mark + esc(s) + "</button>";
      return '<span class="ws2-step' + cls + '">' + esc(s) + "</span>";
    }).join('<span class="ws2-arrow">→</span>');
    return '<div class="ws2-trail">' + chips + "</div>";
  }
  function ws2CardHtml(kind, c) {
    return '<div class="ws2-card"><div class="ws2-cardtop"><span class="ws2-emo">' + c.emo + '</span><b>' + esc(c.name) + '</b>' +
      '<button type="button" class="ll-btn ws2-hear" data-ws-act="cardclip" data-clip="' + c.clip + '">🔊 Hear it</button></div>' +
      '<p>' + esc(c.line) + '</p>' +
      '<button type="button" class="ll-btn pri" data-ws-act="pick" data-kind="' + kind + '" data-id="' + c.id + '">Pick this one</button></div>';
  }
  function ws2OwnHtml(kind, clip, labelA, phA, labelB, phB) {
    return '<div class="ws2-card own"><div class="ws2-cardtop"><span class="ws2-emo">✏️</span><b>My own idea</b>' +
      '<button type="button" class="ll-btn ws2-hear" data-ws-act="cardclip" data-clip="' + clip + '">🔊 Hear it</button></div>' +
      '<label class="ws-lab">' + esc(labelA) + '</label>' +
      '<input type="text" class="ws2-in" data-ws-plan="' + kind + 'Name" maxlength="60" placeholder="' + esc(phA) + '">' +
      '<label class="ws-lab">' + esc(labelB) + '</label>' +
      '<input type="text" class="ws2-in" data-ws-plan="' + kind + 'Line" maxlength="120" placeholder="' + esc(phB) + '">' +
      '<button type="button" class="ll-btn pri" data-ws-act="planown" data-kind="' + kind + '">Use my idea</button></div>';
  }
  function wsPathHtml() {
    var d = wsDraft(wsState.draftId);
    if (!d) { wsState.stage = "home"; return wsHomeHtml(); }
    var plan = ws2Plan(d), step = wsState.step || 0, body = "";
    if (step === 0) {
      body = '<p class="ws-intro">We will build your story together, one small step at a time: pick a hero, pick a place, pick the trouble, and I will turn your picks into a story map. Then you write, page by page, and I will be right there with a job for every page.</p>' +
        '<div class="ws2-card"><div class="ws2-cardtop"><span class="ws2-emo">📖</span><b>First, watch me</b></div>' +
        '<p>I made a tiny book, only four pages, called “Pip and the Moon Kite”. Under every page I tell you the secret of how I made it. It takes about a minute, and it makes everything else easier.</p>' +
        '<div class="ws2-row"><button type="button" class="ll-btn pri" data-ws-act="example">📖 See my example book</button>' +
        '<button type="button" class="ll-btn" data-ws-act="pathstep" data-step="1">Skip it — start building →</button></div></div>';
    } else if (step === 1) {
      body = '<p class="ws-intro">Step one: your hero, the character we follow through the whole story. A good hero wants something. Tap 🔊 to hear about a hero, then pick the one that pulls you.</p>' +
        WS2_HEROES.map(function (c) { return ws2CardHtml("hero", c); }).join("") +
        ws2OwnHtml("hero", "tut-ws2-hero-own", "Your hero's name", "e.g. Kira the lighthouse keeper", "What do they love, or want most?", "e.g. She wants to sail past the reef");
    } else if (step === 2) {
      body = '<p class="ws-intro">Step two: the place. Where a story happens changes everything that can happen in it. Pick a place you would love to visit. You will spend your whole story there.</p>' +
        WS2_PLACES.map(function (c) { return ws2CardHtml("place", c); }).join("") +
        ws2OwnHtml("place", "tut-ws2-place-own", "Your place", "e.g. A floating market", "One thing about it", "e.g. The shops are all boats");
    } else if (step === 3) {
      body = '<p class="ws-intro">Step three: the trouble, the most important choice of all. Trouble is the engine of a story: it is what goes wrong, and makes your hero act. No trouble, no story, just a nice day.</p>' +
        WS2_TROUBLES.map(function (c) { return ws2CardHtml("trouble", c); }).join("") +
        ws2OwnHtml("trouble", "tut-ws2-trouble-own", "Your trouble", "e.g. The bridge washes away", "What goes wrong?", "e.g. Now nobody can cross the river");
    } else {
      var h = plan.hero || {}, p = plan.place || {}, t = plan.trouble || {};
      body = '<p class="ws-intro">Look at that, Kaitlyn. You have a story map. This is your whole book in three pieces:</p>' +
        '<div class="ws2-map">' +
        '<button type="button" class="ws2-mapcard" data-ws-act="mapchip" data-part="beginning"><b>🌅 Beginning</b><span>We meet <b>' + esc(h.name || "your hero") + '</b> in <b>' + esc(p.name || "your place") + '</b>, doing something they love.</span><small>🔊 Hear your tutor explain</small></button>' +
        '<button type="button" class="ws2-mapcard" data-ws-act="mapchip" data-part="middle"><b>⛈️ Middle</b><span>The trouble: <b>' + esc(t.name || "something goes wrong") + '</b>. Your hero tries to fix it, maybe more than once.</span><small>🔊 Hear your tutor explain</small></button>' +
        '<button type="button" class="ws2-mapcard" data-ws-act="mapchip" data-part="end"><b>🌙 Ending</b><span>The trouble is fixed, or your hero comes home changed. I will show you both ways when you reach your last page.</span><small>🔊 Hear your tutor explain</small></button>' +
        "</div>" +
        '<div class="ws2-row"><button type="button" class="ll-btn pri" data-ws-act="writestart">✏️ Start writing — page one</button>' +
        '<button type="button" class="ll-btn" data-ws-act="pathstep" data-step="1">✏️ Change my picks</button></div>';
    }
    return '<section class="ws-wrap">' + ws2TrailHtml(step, plan) +
      (wsState.banner ? '<p class="ws-banner">' + esc(wsState.banner) + "</p>" : "") + body +
      '<div class="ws-foot"><button type="button" class="ll-btn" data-ws-act="home">← My studio</button>' +
      '<button type="button" class="ll-btn" data-ws-act="done">✓ Done for now</button></div></section>';
  }
  function wsExampleHtml() {
    var pg = Math.max(0, Math.min(wsState.expage || 0, WS2_EXAMPLE.pages.length - 1));
    wsState.expage = pg;
    var last = pg === WS2_EXAMPLE.pages.length - 1;
    return '<section class="ws-wrap"><h4 class="ws-h">📖 ' + esc(WS2_EXAMPLE.title) + ' <small class="ws2-byline">— a tiny book by your tutor</small></h4>' +
      '<div class="ws2-expage"><p class="ws2-extext">' + esc(WS2_EXAMPLE.pages[pg]) + "</p>" +
      '<div class="ws2-row"><button type="button" class="ll-btn" data-ws-act="expage">🔊 Hear this page</button>' +
      '<button type="button" class="ll-btn" data-ws-act="exnote">🎓 Hear the secret</button></div></div>' +
      '<div class="ws2-secret"><p class="ws-tiphead">🎓 The secret of this page</p><p>' + esc(WS2_EXAMPLE.notes[pg]) + "</p></div>" +
      '<div class="ws-nav">' + (pg > 0 ? '<button type="button" class="ll-btn" data-ws-act="exprev">← Prev page</button>' : "<span></span>") +
      '<span class="ws-words">Page ' + (pg + 1) + " of " + WS2_EXAMPLE.pages.length + "</span>" +
      (last ? '<button type="button" class="ll-btn pri" data-ws-act="exdone">Now let\'s build yours →</button>' : '<button type="button" class="ll-btn pri" data-ws-act="exnext">Next page →</button>') + "</div>" +
      '<div class="ws-foot"><button type="button" class="ll-btn" data-ws-act="exback">← Back</button></div></section>';
  }
  function wsEndingHtml() {
    var cards = WS2_ENDINGS.map(function (e) {
      return '<div class="ws2-card"><div class="ws2-cardtop"><span class="ws2-emo">' + e.emo + '</span><b>' + esc(e.name) + '</b>' +
        '<button type="button" class="ll-btn ws2-hear" data-ws-act="cardclip" data-clip="' + e.clip + '">🔊 Hear it</button></div>' +
        '<p>' + esc(e.text) + '</p>' +
        '<button type="button" class="ll-btn pri" data-ws-act="endpick" data-style="' + e.id + '">End it this way</button></div>';
    }).join("");
    return '<section class="ws-wrap"><h4 class="ws-h">🌅 The ending helper</h4>' +
      '<p class="ws-intro">There are two ways writers finish a story. Neither is better. Hear both, then pick the one that feels right for yours.</p>' +
      cards +
      '<div class="ws-foot"><button type="button" class="ll-btn" data-ws-act="backedit">✏️ Back to my page</button></div></section>';
  }
  function ws2TitleIdeas(d) {
    var plan = ws2Plan(d), h = plan.hero || {}, p = plan.place || {}, t = plan.trouble || {};
    var heroName = h.name || "My Hero", heroShort = h.short || h.name || "My Hero";
    var tw = t.titleWord || "Big Adventure", dw = t.dayWord || "Day", noun = p.noun || "Secret Place";
    var sparkles = ["Silver", "Midnight", "Whispering", "Golden"];
    var sp = sparkles[(heroName.length + noun.length) % sparkles.length];
    return [heroName + " and the " + tw, "The " + sp + " " + noun, heroShort + "'s Big " + dw];
  }
  function wsTitleHelpHtml() {
    var d = wsDraft(wsState.draftId);
    if (!d) { wsState.stage = "home"; return wsHomeHtml(); }
    var ideas = ws2TitleIdeas(d);
    var clips = ["tut-ws2-title-p1", "tut-ws2-title-p2", "tut-ws2-title-p3"];
    var styles = ["Your hero, and the big thing", "The mysterious thing", "Your hero's big day"];
    var cards = ideas.map(function (idea, i) {
      return '<div class="ws2-card"><div class="ws2-cardtop"><span class="ws2-emo">🏷️</span><b>' + esc(styles[i]) + '</b>' +
        '<button type="button" class="ll-btn ws2-hear" data-ws-act="cardclip" data-clip="' + clips[i] + '">🔊 Hear it</button></div>' +
        '<p class="ws2-titleidea">“' + esc(idea) + '”</p>' +
        '<button type="button" class="ll-btn pri" data-ws-act="titlepick" data-i="' + i + '">Use this title</button></div>';
    }).join("");
    return '<section class="ws-wrap"><h4 class="ws-h">🏷️ Title helper</h4>' +
      '<p class="ws-intro">A title is a promise to your reader. Here are three ways writers build one, made from your hero and your story. Pick one, and you can still change the words after.</p>' +
      cards +
      '<div class="ws-foot"><button type="button" class="ll-btn" data-ws-act="backedit">✏️ Back to my page</button></div></section>';
  }
  function wsGuideHtml(d) {
    if (!d.guided) return "";
    var plan = ws2Plan(d), h = plan.hero || {}, p = plan.place || {}, t = plan.trouble || {};
    var endTxt = plan.ending === "fix" ? "Fix the trouble" : plan.ending === "changed" ? "Come home changed" : "Not picked yet — the ending helper will show you";
    return '<div class="ws2-map mini">' +
      '<button type="button" class="ws2-mapcard" data-ws-act="mapchip" data-part="beginning"><b>🌅 Beginning</b><span>' + esc(h.name || "Your hero") + " · " + esc(p.name || "your place") + '</span></button>' +
      '<button type="button" class="ws2-mapcard" data-ws-act="mapchip" data-part="middle"><b>⛈️ Middle</b><span>' + esc(t.name || "The trouble") + '</span></button>' +
      '<button type="button" class="ws2-mapcard" data-ws-act="mapchip" data-part="end"><b>🌙 Ending</b><span>' + esc(endTxt) + '</span></button></div>' +
      (wsStatus(d) === "draft" ? '<p class="ws2-change"><button type="button" class="ll-btn" data-ws-act="pathstep" data-step="1">✏️ Change my picks</button></p>' : "");
  }
  function wsJobHtml(d, page, locked) {
    if (locked) return "";
    var job = ws2JobFor(d, page), J = WS2_JOBS[job];
    var html = '<div class="ws2-job"><p class="ws2-jobhead">🎯 This page\'s job: ' + esc(J.title) +
      ' <button type="button" class="ll-btn ws2-hear" data-ws-act="jobclip">🔊 Hear it</button></p>' +
      '<p class="ws2-jobgoal">' + esc(ws2JobGoal(d, job)) + "</p>";
    if (job === "end" && !ws2Plan(d).ending) html += '<button type="button" class="ll-btn pri" data-ws-act="ending">🌅 Open the ending helper</button>';
    if (job === "end" && ws2Plan(d).ending) html += '<button type="button" class="ll-btn" data-ws-act="ending">🌅 Change my ending</button>';
    html += '<div class="ws2-starters"><span class="ws2-slab">Start a sentence:</span>' +
      J.starters.map(function (s, i) { return '<button type="button" class="ws2-starter" data-ws-act="insert" data-kind="starter" data-i="' + i + '">' + esc(s) + "</button>"; }).join("") + "</div>" +
      '<button type="button" class="ll-btn ws2-stuckbtn" data-ws-act="stuck">🆘 I\'m stuck</button>';
    if (wsState.stuck) {
      html += '<div class="ws2-stuckpanel"><p class="ws2-slab">Three rescue lines for this page. Tap one to drop it in, then make it yours:</p>' +
        J.stuck.map(function (s, i) { return '<button type="button" class="ws2-starter" data-ws-act="insert" data-kind="stuck" data-i="' + i + '">' + esc(s) + "</button>"; }).join("") + "</div>";
    }
    return html + "</div>";
  }
  function ws2Insert(d, text) {
    var m = wsMineRaw(), md = m.drafts[d.id]; if (!md) return;
    var cur = md.pages[wsState.page] || "";
    var add = (cur && !/\s$/.test(cur) ? " " : "") + text;
    if ((cur + add).length > WS_MAX_CHARS) { wsState.banner = "This page is full — that starter needs more room than is left. Try a new page for it."; wsRender(); return; }
    md.pages[wsState.page] = (cur + add).slice(0, WS_MAX_CHARS);
    md.updatedAt = Date.now(); wsSave(m);
    wsState.stuck = false; wsRender(); wsSay("tut-ws2-starter");
  }
  function ws2Act(act, el) {
    var d = wsState && wsState.draftId ? wsDraft(wsState.draftId) : null;
    if (act === "example") {
      wsState.exFrom = wsState.stage === "path" ? "path" : "home";
      wsState.stage = "example"; wsState.expage = 0; wsRender(); wsSay("tut-ws2-ex-intro"); return true;
    }
    if (act === "expage") { wsSay("tut-ws2-ex-p" + ((wsState.expage || 0) + 1)); return true; }
    if (act === "exnote") { wsSay("tut-ws2-ex-p" + ((wsState.expage || 0) + 1) + "-note"); return true; }
    if (act === "exprev") { wsState.expage = Math.max(0, (wsState.expage || 0) - 1); wsRender(); wsSay("tut-ws2-ex-p" + (wsState.expage + 1)); return true; }
    if (act === "exnext") { wsState.expage = Math.min(WS2_EXAMPLE.pages.length - 1, (wsState.expage || 0) + 1); wsRender(); wsSay("tut-ws2-ex-p" + (wsState.expage + 1)); return true; }
    if (act === "exback") {
      if (wsState.exFrom === "path" && d) { wsState.stage = "path"; wsState.step = 0; }
      else wsState.stage = "home";
      wsRender(); return true;
    }
    if (act === "exdone") {
      if (d) { wsState.stage = "path"; wsState.step = 1; wsRender(); wsSay("tut-ws2-step-hero"); }
      else { wsState.stage = "home"; wsRender(); }
      return true;
    }
    if (act === "pathstep") {
      if (!d) return false;
      wsState.step = parseInt(el.getAttribute("data-step"), 10) || 0;
      wsState.stage = "path"; wsState.banner = null; wsRender();
      wsSay(wsState.step === 1 ? "tut-ws2-step-hero" : wsState.step === 2 ? "tut-ws2-step-place" : wsState.step === 3 ? "tut-ws2-step-trouble" : wsState.step === 4 ? "tut-ws2-step-map" : "tut-ws2-path-start");
      return true;
    }
    if (act === "cardclip") { wsSay(el.getAttribute("data-clip")); return true; }
    if (act === "mapchip") { wsSay("tut-ws2-map-" + el.getAttribute("data-part")); return true; }
    if (act === "pick") {
      if (!d) return false;
      var kind = el.getAttribute("data-kind"), id = el.getAttribute("data-id");
      var src = kind === "hero" ? WS2_HEROES : kind === "place" ? WS2_PLACES : WS2_TROUBLES;
      var c = ws2ById(src, id); if (!c) return true;
      var val = { id: c.id, name: c.name, line: c.line };
      if (kind === "hero") val.short = c.short;
      if (kind === "place") val.noun = c.noun;
      if (kind === "trouble") { val.titleWord = c.titleWord; val.dayWord = c.dayWord; }
      ws2SavePlanField(d.id, kind, val);
      wsState.step = kind === "hero" ? 2 : kind === "place" ? 3 : 4;
      wsState.stage = "path"; wsRender();
      wsSay(wsState.step === 2 ? "tut-ws2-step-place" : wsState.step === 3 ? "tut-ws2-step-trouble" : "tut-ws2-step-map");
      return true;
    }
    if (act === "planown") {
      if (!d) return false;
      var kind2 = el.getAttribute("data-kind");
      var nameInp = document.querySelector('[data-ws-plan="' + kind2 + 'Name"]');
      var lineInp = document.querySelector('[data-ws-plan="' + kind2 + 'Line"]');
      var nm = nameInp ? nameInp.value.trim() : "", ln = lineInp ? lineInp.value.trim() : "";
      if (!nm || !ln) { wsState.banner = "Give your idea a name and one line about it, and then tap “Use my idea”. That's all the tutor needs."; wsRender(); return true; }
      var v = { id: "own", name: nm, line: ln };
      if (kind2 === "hero") v.short = nm;
      if (kind2 === "place") v.noun = nm;
      if (kind2 === "trouble") { v.titleWord = "Big Adventure"; v.dayWord = "Day"; }
      ws2SavePlanField(d.id, kind2, v);
      wsState.step = kind2 === "hero" ? 2 : kind2 === "place" ? 3 : 4;
      wsState.stage = "path"; wsState.banner = null; wsRender(); wsSay("tut-ws2-own-saved");
      return true;
    }
    if (act === "writestart") {
      if (!d) return false;
      wsState.stage = "editor"; wsState.page = 0; wsState.stuck = false; wsRender(); wsSay("tut-ws2-write-start");
      return true;
    }
    if (act === "jobclip") { if (d) wsSay(ws2JobClip(d, ws2JobFor(d, wsState.page || 0))); return true; }
    if (act === "stuck") {
      wsState.stuck = !wsState.stuck; wsRender();
      if (wsState.stuck) wsSay("tut-ws2-stuck");
      return true;
    }
    if (act === "insert") {
      if (!d || wsStatus(d) !== "draft") return true;
      var job = ws2JobFor(d, wsState.page || 0), J = WS2_JOBS[job];
      var arr = el.getAttribute("data-kind") === "stuck" ? J.stuck : J.starters;
      var txt = arr[parseInt(el.getAttribute("data-i"), 10) || 0];
      if (txt) ws2Insert(d, txt);
      return true;
    }
    if (act === "ending") {
      wsState.stage = "ending"; wsRender(); wsSay("tut-ws2-ending-intro"); return true;
    }
    if (act === "endpick") {
      if (!d) return false;
      ws2SavePlanField(d.id, "ending", el.getAttribute("data-style"));
      wsState.stage = "editor"; wsRender();
      wsSay(el.getAttribute("data-style") === "fix" ? "tut-ws2-job-end-fix" : "tut-ws2-job-end-changed");
      return true;
    }
    if (act === "titlehelp") {
      wsState.stage = "titlehelp"; wsRender(); wsSay("tut-ws2-title-intro"); return true;
    }
    if (act === "titlepick") {
      if (!d) return false;
      var ideas = ws2TitleIdeas(d);
      var pick = ideas[parseInt(el.getAttribute("data-i"), 10) || 0];
      if (pick) { var m = wsMineRaw(); if (m.drafts[d.id]) { m.drafts[d.id].title = pick.slice(0, 80); m.drafts[d.id].updatedAt = Date.now(); wsSave(m); } }
      wsState.stage = "editor"; wsRender();
      return true;
    }
    return false;
  }

  window.__llShell = { setTab: setTab, setProfile: setProfile, state: state, openGame: openGame, openLesson: openLesson, openPath: openPath, closeOverlay: closeOverlay, render: render, openMuseCard: openMuseCard, findShelfNode: findShelfNode, findHubIdeaNode: findHubIdeaNode, playNow: playNow, openLessonById: openLessonById, findLessonNodeById: findLessonNodeById, LESSON_BY_ID: LESSON_BY_ID, checkParentGate: checkParentGate, newGateQuestion: newGateQuestion, goBack: goBack, goHome: goHome, viewStack: viewStack, curView: function () { return curView; },
    waveC1: { dailyPick: function (pid, date) { var r = wcDailyPick(pid, date || new Date()); return r ? { id: r.lesson.id, title: r.lesson.title, current: r.current, season: r.season } : null; }, stats: wcStats, completions: compLoad, completionFor: wcCompletion, rightNowItems: wcRightNowItems, openRightNow: openRightNow, openWorldMap: openWorldMap, pool: wcPool },
    waveC2: { missions: wc2MissionStates, openMissions: openMissions, openMission: openMission, ihave: wc2IhaveData, ihaveLoad: wc2IhaveLoad, openIhave: openIhave, suppliesFor: wc2SuppliesFor, quests: wc2QuestStates, openQuestDay: openQuestDay, printLesson: wc2PrintLesson, printActivity: wc2PrintActivity, badges: wc2Badges, stepTarget: wc2StepTarget, stepDone: wc2StepDone },
    waveE1: { helloPlan: we1HelloPlan, helloDone: we1HelloDone, playHello: we1PlayHello, questState: we1QuestState, assignQuest: we1AssignQuest, takeQuestPhoto: we1TakeQuestPhoto, questDef: we1QuestDef, notesAll: we1NotesAll, saveNoteBlob: we1SaveNote, playNoteById: we1PlayNoteById, notesEnabled: we1NotesEnabled, notesSupported: we1NotesSupported, noteLog: window.__we1NoteLog, missions: WE1_MISSIONS, challenges: WE1_CHALLENGES, photoQuests: WE1_QUESTS },
    waveE2: { oopsState: function (pid) { return we2OopsMine(pid || (state.profile && state.profile.id)); }, oopsAnswer: we2OopsAnswer, gardenCounts: we2GardenCounts, mixes: WE2_MIXES, mixReady: function (id) { var m = we2MixById(id); return m ? we2MixReady(m) : Promise.resolve(false); }, reportData: we2ReportData, reportHtml: we2ReportCardHtml, carState: function () { return { mixId: we2Car.mixId, idx: we2Car.idx, playing: we2Car.playing, hasAudio: !!we2Car.audio, paused: we2Car.audio ? we2Car.audio.paused : null, ended: we2Car.audio ? we2Car.audio.ended : null, src: we2Car.audio ? we2Car.audio.src : "" }; }, carPlay: we2CarPlayAt, carToggle: we2CarToggle, openGarden: openOopsGarden, openCar: openCarMode } };
})();
