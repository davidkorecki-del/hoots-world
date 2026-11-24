/* Hoot — Grade 7 English (3e31, expanded 3e32). Runs on the study engine
   (hoot-study.js): Learn → Watch → Together (hints) → Your turn (5) → Recap,
   4 of 5 right first try = learned, spaced review afterwards.
   Aligned to the New York Next Generation ELA standards for grade 7
   (7R = reading, 7L = language). Every question has exactly one right
   answer; wrong answers are written to similar lengths so the longest choice
   is not a giveaway. American spelling throughout. */
(function () {
  "use strict";
  var TYPES = ["Simple", "Compound", "Complex", "Compound-complex"];
  var FIG = ["Simile", "Metaphor", "Personification", "Hyperbole"];
  var POV = ["First person", "Third person limited", "Third person omniscient"];
  var CL3 = ["phrase", "dependent clause", "independent clause"];
  var L = [];
  function lesson(o) { L.push(o); }

  /* ---------- Language: grammar & usage ---------- */
  lesson({ id: "e7-clauses", title: "Phrases & clauses", std: "7L1a", emo: "🧩", topic: /clause|phrase|grammar/,
    learn: ["A CLAUSE has a subject AND a verb: \"the bus was late.\" A PHRASE is missing one of them: \"after the long game.\"",
            "An INDEPENDENT clause can stand alone as a sentence. A DEPENDENT clause can't — it starts with a word like because, when, if, although or until."],
    vocab: "clause = subject + verb · phrase = no subject-verb pair",
    method: "Look for a subject (who or what) and a verb (what it does or is).",
    hints: ["Find the subject and the verb. No pair means it's a phrase.", "Does it start with because, when, if, although or until? Then it can't stand alone.", "Read it by itself. Does it sound like a complete thought?"],
    items: [
      { q: "Which group of words is a CLAUSE?", a: "because the bus was late", w: ["after the long and boring game", "in the back of the room", "running down the hall"], why: "\"Bus\" is the subject and \"was\" is the verb. The others have no subject-verb pair." },
      { q: "Which group of words is a PHRASE?", a: "under the old wooden bridge", w: ["when the storm ended", "she laughed", "if you finish your work early"], why: "\"Under the old wooden bridge\" has no subject and no verb. Each of the others has both." },
      { q: "Which is an INDEPENDENT clause (it can stand alone as a sentence)?", a: "the dog barked at the mail carrier", w: ["although the dog barked", "because the mail came early", "when the mail carrier finally arrived"], why: "It has a subject and verb and doesn't start with a word like although, because or when, so it's a complete thought." },
      { q: "Which is a DEPENDENT clause?", a: "until the movie ends", w: ["the movie ends at nine", "we watched the whole movie", "at the end of the movie"], why: "It has a subject (movie) and a verb (ends), but \"until\" makes it an unfinished thought." },
      { q: "In \"When the bell rang, the students rushed outside,\" which part is the DEPENDENT clause?", a: "When the bell rang", w: ["the students rushed outside", "rushed outside", "the bell"], why: "\"When the bell rang\" has a subject and verb but can't stand alone. \"The students rushed outside\" is the independent clause." },
      { q: "In \"Maya practiced every day because she wanted to make the team,\" which part is the INDEPENDENT clause?", a: "Maya practiced every day", w: ["because she wanted to make the team", "to make the team", "every day"], why: "\"Maya practiced every day\" is a complete thought on its own." },
      { q: "Which group of words is a prepositional PHRASE?", a: "across the busy street", w: ["she crossed the street", "while the light was green", "they waited"], why: "\"Across\" is a preposition, and there's no subject-verb pair." },
      { q: "Which group of words is a CLAUSE?", a: "the river flooded", w: ["after the heavy rain", "flooding the low fields", "near the old mill"], why: "\"River\" is the subject and \"flooded\" is the verb." },
      { q: "Which group of words is a CLAUSE?", a: "while the soup was cooling", w: ["during the long winter break", "with a smile on her face", "to finish the puzzle before lunch"], why: "\"Soup\" is the subject and \"was cooling\" is the verb. The others have no subject-verb pair." },
      { q: "Which group of words is a PHRASE?", a: "after the final whistle of the game", w: ["after the whistle blew", "the crowd cheered loudly", "since we won the game last night"], why: "There's no verb, only nouns and prepositions. The others each have a subject and a verb." },
      { q: "Which is an INDEPENDENT clause?", a: "the class planted a garden", w: ["because the class planted a garden", "when the class planted a garden", "if the class plants a garden"], why: "Without a word like because, when or if in front, it's a complete thought." },
      { q: "In \"Although she was tired, Rosa finished her essay,\" which part is the INDEPENDENT clause?", a: "Rosa finished her essay", w: ["Although she was tired", "her essay", "Although"], why: "\"Rosa finished her essay\" can stand alone. \"Although she was tired\" can't." },
      { q: "\"If it snows tomorrow\" is a…", a: "dependent clause", fixed: CL3, why: "It has a subject (it) and a verb (snows), but \"if\" means it can't stand alone." },
      { q: "\"Through the dark tunnel\" is a…", a: "phrase", fixed: CL3, why: "There's no subject and no verb, so it's a phrase." },
      { q: "\"Since the game was canceled\" is a…", a: "dependent clause", fixed: CL3, why: "Subject (game) and verb (was canceled), but \"since\" makes it unable to stand alone." },
      { q: "\"The game was canceled\" is a…", a: "independent clause", fixed: CL3, why: "Subject and verb, and it's a complete thought by itself." },
      { q: "\"On the top shelf of the closet\" is a…", a: "phrase", fixed: CL3, why: "No subject and no verb — just prepositions and nouns." }
    ] });

  lesson({ id: "e7-sentence-types", title: "Simple, compound & complex sentences", std: "7L1b", emo: "🔗", topic: /sentence|compound|complex|grammar/,
    learn: ["SIMPLE = one independent clause. COMPOUND = two independent clauses joined by a comma + and, but, or, so (or a semicolon).",
            "COMPLEX = one independent clause + at least one dependent clause. COMPOUND-COMPLEX = two independent clauses + a dependent clause."],
    vocab: "count the clauses, then ask which kind they are",
    method: "Mark each subject-verb pair, then check whether each clause can stand alone.",
    hints: ["How many subject-verb pairs are there?", "A word like because, when, although, if or that starts a dependent clause.", "Two complete thoughts joined by and/but/or/so = compound."],
    items: [
      { q: "\"The rain stopped, and the sun came out.\" What kind of sentence is this?", a: "Compound", fixed: TYPES, why: "Two independent clauses (the rain stopped / the sun came out) joined by \", and\"." },
      { q: "\"Although the rain stopped, the field was still muddy.\" What kind of sentence is this?", a: "Complex", fixed: TYPES, why: "\"Although the rain stopped\" is dependent; \"the field was still muddy\" is independent." },
      { q: "\"The players and the coach celebrated after the game.\" What kind of sentence is this?", a: "Simple", fixed: TYPES, why: "One clause. \"The players and the coach\" is a compound subject, but there's only one subject-verb pair." },
      { q: "\"When the power went out, we lit candles, and Dad told stories.\" What kind of sentence is this?", a: "Compound-complex", fixed: TYPES, why: "Two independent clauses (we lit candles / Dad told stories) plus a dependent one (when the power went out)." },
      { q: "\"Sam finished his homework before dinner.\" What kind of sentence is this?", a: "Simple", fixed: TYPES, why: "One subject (Sam) and one verb (finished), so one independent clause." },
      { q: "\"We can take the train, or we can ride our bikes.\" What kind of sentence is this?", a: "Compound", fixed: TYPES, why: "Two independent clauses joined by \", or\"." },
      { q: "\"The library closes early on Fridays because the staff has a meeting.\" What kind of sentence is this?", a: "Complex", fixed: TYPES, why: "\"The library closes early on Fridays\" is independent; \"because the staff has a meeting\" is dependent." },
      { q: "\"Lena read the book, and she wrote a review that her teacher posted online.\" What kind of sentence is this?", a: "Compound-complex", fixed: TYPES, why: "Two independent clauses joined by \", and\", plus the dependent clause \"that her teacher posted online\"." },
      { q: "\"My cousin lives in Buffalo, but she visits us every summer.\" What kind of sentence is this?", a: "Compound", fixed: TYPES, why: "Two independent clauses joined by \", but\"." },
      { q: "\"The museum that we visited had a real dinosaur skeleton.\" What kind of sentence is this?", a: "Complex", fixed: TYPES, why: "\"That we visited\" is a dependent clause inside the independent clause \"The museum had a real dinosaur skeleton.\"" },
      { q: "\"After the concert ended, we waited for the bus, but it never came.\" What kind of sentence is this?", a: "Compound-complex", fixed: TYPES, why: "Two independent clauses (we waited… / it never came) plus a dependent one (after the concert ended)." },
      { q: "\"Dogs and cats can be wonderful pets.\" What kind of sentence is this?", a: "Simple", fixed: TYPES, why: "One clause with a compound subject." },
      { q: "\"If you finish early, you may read quietly.\" What kind of sentence is this?", a: "Complex", fixed: TYPES, why: "\"If you finish early\" is dependent; \"you may read quietly\" is independent." },
      { q: "\"I studied hard; the test was still difficult.\" What kind of sentence is this?", a: "Compound", fixed: TYPES, why: "Two independent clauses joined by a semicolon." },
      { q: "Which sentence is COMPLEX?", a: "Because it was cold, we wore our heavy coats.", w: ["It was cold, so we wore our heavy coats.", "It was cold and windy all week long.", "We wore our coats, hats and warm mittens."], why: "\"Because it was cold\" is a dependent clause attached to an independent clause." },
      { q: "Which sentence is COMPOUND?", a: "The bus was late, so we walked to school.", w: ["Since the bus was late, we walked to school.", "We walked to school in the rain together.", "We walked and talked all the way to school."], why: "Two complete thoughts joined by \", so\". The \"since\" sentence is complex; the others are simple." },
      { q: "Which sentence is SIMPLE?", a: "The tired runners crossed the finish line together.", w: ["The runners were tired, but they finished.", "Because they were so tired, the runners walked home.", "The runners crossed, and the crowd cheered."], why: "One subject (runners) and one verb (crossed). Each of the others has two clauses." }
    ] });

  lesson({ id: "e7-modifiers", title: "Misplaced & dangling modifiers", std: "7L1c", emo: "🎯", topic: /modifier|dangling|misplaced/,
    learn: ["A MODIFIER is a word or phrase that describes something. It should sit right next to the thing it describes.",
            "MISPLACED: \"I saw a deer driving down the road\" (the deer was driving?). DANGLING: \"Walking home, a dog followed me\" (who was walking? not the dog!)."],
    vocab: "put the describing phrase next to what it describes",
    method: "Ask: who or what is the describing phrase really about? Is that word right next to it?",
    hints: ["Read the describing phrase, then the word right after it. Do they belong together?", "Picture each sentence literally. Which one doesn't sound silly?", "The correct sentence names the person doing the action right after the opening phrase."],
    items: [
      { q: "Which sentence is written correctly?", a: "I found a gold ring that was buried in the sand.", w: ["Buried in the sand, I found a shiny gold ring.", "I, buried in the sand, found a gold ring there."], why: "The ring was buried, not you. \"That was buried in the sand\" sits right next to \"ring\"." },
      { q: "Which sentence is written correctly?", a: "She served pancakes on paper plates to the hungry campers.", w: ["She served pancakes to the hungry campers on paper plates.", "She served the hungry campers on paper plates some pancakes."], why: "The pancakes were on the plates, not the campers. \"On paper plates\" belongs next to \"pancakes\"." },
      { q: "Which sentence is written correctly?", a: "After finishing the test, Jordan felt relieved.", w: ["After finishing the test, relief washed over Jordan.", "After finishing the test, the room felt quiet to Jordan."], why: "Jordan finished the test, so \"Jordan\" must come right after the opening phrase." },
      { q: "Which sentence is written correctly?", a: "While we were driving down the road, we saw a deer.", w: ["Driving down the road, a deer with huge antlers appeared.", "We saw a deer driving down the road with huge antlers."], why: "We were driving, not the deer. The correct version says who was driving." },
      { q: "Which sentence is written correctly?", a: "The boy with the red backpack ran to catch the bus.", w: ["The boy ran to catch the bus with the red backpack.", "With the red backpack, the bus was caught by the boy."], why: "The backpack belongs to the boy, so \"with the red backpack\" goes next to \"boy\"." },
      { q: "Which sentence is written correctly?", a: "To win the race, you must train every day.", w: ["To win the race, training every day is a must.", "To win the race, every day must be spent training."], why: "A person wins the race, so \"you\" must come right after \"To win the race\"." },
      { q: "Which sentence is written correctly?", a: "Excited about the trip, the students packed their bags early.", w: ["Excited about the trip, the bags were packed very early.", "Excited about the trip, packing started early that morning."], why: "The students were excited, not the bags." },
      { q: "Which sentence is written correctly?", a: "Grandma gave the baby a cookie that was still warm.", w: ["Grandma gave the baby that was still warm a cookie.", "Still warm from the oven, the baby got a cookie from Grandma."], why: "The cookie was warm, not the baby." },
      { q: "Which sentence is written correctly?", a: "Looking out the window, Ava saw snow falling.", w: ["Looking out the window, snow was falling on the yard.", "Ava saw snow looking out the window as it was falling."], why: "Ava was looking out the window, so \"Ava\" comes right after that phrase." },
      { q: "Which sentence is written correctly?", a: "Tired from the long hike, we rested by the stream.", w: ["Tired from the long hike, the stream looked inviting.", "The stream, tired from the long hike, looked inviting to us."], why: "We were tired, not the stream." },
      { q: "Which sentence is written correctly?", a: "While I was eating dinner, the phone rang.", w: ["Eating dinner, the phone rang.", "The phone rang while eating dinner at the kitchen table."], why: "I was eating, not the phone. The correct version says who was eating." },
      { q: "Which sentence is written correctly?", a: "Hoping for a good grade, Carlos studied all weekend.", w: ["Hoping for a good grade, the weekend was spent studying.", "Hoping for a good grade, studying took up Carlos's weekend."], why: "Carlos was hoping, so \"Carlos\" comes right after the opening phrase." },
      { q: "Which sentence is written correctly?", a: "Jada wore a necklace that her grandmother had made.", w: ["Made by her grandmother, Jada wore a pretty necklace.", "Jada, made by her grandmother, wore a necklace to school."], why: "The grandmother made the necklace, not Jada." },
      { q: "Which sentence is written correctly?", a: "We gave the bone to the dog with the wagging tail.", w: ["We gave the bone with the wagging tail to the dog.", "With a wagging tail, we gave the hungry dog a bone."], why: "The dog has the wagging tail, so that phrase goes right after \"dog\"." },
      { q: "Which sentence is written correctly?", a: "Nervous about the speech, Omar practiced in front of a mirror.", w: ["Nervous about the speech, the mirror was where Omar practiced.", "Nervous about the speech, practicing in a mirror helped a lot."], why: "Omar was nervous, so \"Omar\" must come right after the opening phrase." }
    ] });

  lesson({ id: "e7-commas", title: "Commas between adjectives", std: "7L2a", emo: "✏️", topic: /comma|punctuat|adjective/,
    learn: ["Use a comma between two adjectives when each one describes the noun on its own: \"a long, boring meeting.\"",
            "Two tests: can you put AND between them (long and boring)? Can you swap them (boring, long)? If yes, use a comma. Never put a comma between the last adjective and the noun."],
    vocab: "coordinate adjectives = swappable → comma",
    method: "Try putting \"and\" between the adjectives, and try swapping their order.",
    hints: ["Say it with \"and\" between the adjectives. Does it still sound right?", "Number words (two, first) and words like several don't take a comma after them.", "A comma never goes between the last adjective and the noun."],
    items: [
      { q: "Which sentence uses commas correctly?", a: "It was a long, boring meeting.", w: ["It was a long boring, meeting.", "It was a, long boring meeting."], why: "\"Long and boring\" works and they can swap, so a comma goes between them — not before the noun." },
      { q: "Which sentence uses commas correctly?", a: "She adopted two small puppies.", w: ["She adopted two, small puppies.", "She adopted two small, puppies."], why: "\"Two and small puppies\" doesn't work, so no comma." },
      { q: "Which sentence uses commas correctly?", a: "The cold, dark night made us shiver.", w: ["The cold dark, night made us shiver.", "The, cold dark night made us shiver."], why: "\"Cold and dark\" works and they can swap, so a comma goes between them." },
      { q: "Which sentence uses commas correctly?", a: "He told a funny, clever story.", w: ["He told a funny clever, story.", "He told a funny, clever, story."], why: "Comma between the two swappable adjectives, but never between the last one and the noun." },
      { q: "Which sentence uses commas correctly?", a: "We hiked up the steep, rocky trail.", w: ["We hiked up the steep rocky, trail.", "We hiked up the, steep rocky trail."], why: "\"Steep and rocky\" works, so a comma goes between them." },
      { q: "Which sentence uses commas correctly?", a: "It was the first warm day of spring.", w: ["It was the first, warm day of spring.", "It was the first warm, day of spring."], why: "\"Warm first day\" sounds wrong, so the adjectives can't swap — no comma." },
      { q: "Which sentence uses commas correctly?", a: "Several tall trees shaded the yard.", w: ["Several, tall trees shaded the yard.", "Several tall, trees shaded the yard."], why: "\"Several and tall trees\" doesn't work, so no comma." },
      { q: "Which sentence uses commas correctly?", a: "The loud, cheerful crowd filled the stadium.", w: ["The loud cheerful, crowd filled the stadium.", "The loud, cheerful, crowd filled the stadium."], why: "Comma between \"loud\" and \"cheerful\", none before \"crowd\"." },
      { q: "Which sentence uses commas correctly?", a: "The tiny, fluffy kitten slept in the sun.", w: ["The tiny fluffy, kitten slept in the sun.", "The tiny, fluffy, kitten slept in the sun."], why: "\"Tiny and fluffy\" works, so one comma between them and none before the noun." },
      { q: "Which sentence uses commas correctly?", a: "We visited three old castles in Scotland.", w: ["We visited three, old castles in Scotland.", "We visited three old, castles in Scotland."], why: "\"Three and old castles\" doesn't work, so no comma." },
      { q: "Which sentence uses commas correctly?", a: "It was a calm, clear evening.", w: ["It was a calm clear, evening.", "It was a, calm clear evening."], why: "\"Calm and clear\" works and swaps, so a comma goes between them." },
      { q: "Which sentence uses commas correctly?", a: "Grandma baked a rich, delicious cake.", w: ["Grandma baked a rich delicious, cake.", "Grandma baked a, rich delicious cake."], why: "\"Rich and delicious\" works, so a comma goes between them." },
      { q: "Which phrase NEEDS a comma between its adjectives?", a: "a bright sunny morning", w: ["two little kittens", "my first school dance", "those three blue pens"], why: "\"Bright and sunny\" works and swaps, so it's \"a bright, sunny morning\". The others don't swap." },
      { q: "Which phrase NEEDS a comma between its adjectives?", a: "a quiet peaceful lake", w: ["the second big storm", "four shiny coins", "our new science teacher"], why: "\"Quiet and peaceful\" works and swaps, so it's \"a quiet, peaceful lake\"." },
      { q: "Which phrase NEEDS a comma between its adjectives?", a: "a smart funny friend", w: ["our two older cousins", "the last school bus", "five red apples"], why: "\"Smart and funny\" works and swaps, so it's \"a smart, funny friend\"." },
      { q: "Which phrase NEEDS a comma between its adjectives?", a: "a warm cozy blanket", w: ["my first soccer game", "the three tall towers", "several old photos"], why: "\"Warm and cozy\" works and swaps, so it's \"a warm, cozy blanket\"." }
    ] });

  /* ---------- Language: vocabulary ---------- */
  lesson({ id: "e7-context", title: "Context clues", std: "7L4a", emo: "🔍", topic: /context|vocab|word meaning|unknown word/,
    learn: ["When you meet a word you don't know, look at the words around it — the CONTEXT. Writers often leave clues.",
            "Clue types: a definition or example nearby, a cause and effect (\"so…\", \"because…\"), or a contrast (\"unlike…\", \"rather than…\") that tells you the opposite."],
    vocab: "context clue = a hint in the nearby words",
    method: "Find the clue words around the unknown word.",
    hints: ["Cover the word and guess what would make sense in its place.", "Look for signal words: so, because, unlike, rather than, a dash, a semicolon.", "Plug each answer into the sentence. Which one makes sense?"],
    items: [
      { q: "\"The hikers were famished after the long trek, so they ate every crumb of food they had brought.\" What does FAMISHED mean?", a: "extremely hungry", w: ["tired from walking so far", "lost", "cold and soaked from rain"], why: "Cause and effect: they ate every crumb, so they must have been very hungry." },
      { q: "\"Unlike his gregarious sister, who loved parties, Malik preferred to stay home with a book.\" What does GREGARIOUS mean?", a: "sociable and outgoing", w: ["shy and quiet around people", "older than her brother", "bossy toward everyone"], why: "\"Unlike\" signals a contrast. Malik stays home, and his sister loves parties, so she is sociable.", hint: "\"Unlike\" means the sister is the OPPOSITE of Malik." },
      { q: "\"The scientist was meticulous; she checked every measurement three times.\" What does METICULOUS mean?", a: "very careful about details", w: ["forgetful about small things", "fast but sloppy", "famous in her field"], why: "The example after the semicolon (checking three times) shows great care." },
      { q: "\"The old bridge was so precarious that the town closed it before it could collapse.\" What does PRECARIOUS mean?", a: "unsafe; likely to fall", w: ["beautiful and very old", "too expensive to cross", "crowded with traffic"], why: "It was closed before it could collapse, so it must have been unsafe." },
      { q: "\"Ella was elated when she won the contest — she jumped up and down and hugged everyone.\" What does ELATED mean?", a: "extremely happy", w: ["embarrassed in front of others", "worried", "disappointed with the prize"], why: "The example after the dash (jumping, hugging) shows great happiness." },
      { q: "\"The instructions were so ambiguous that half the class did the project one way and half did it another.\" What does AMBIGUOUS mean?", a: "unclear; open to more than one meaning", w: ["very long and full of steps", "strict about every detail and due date", "boring and hard to read"], why: "People understood them in two different ways, so they were unclear." },
      { q: "\"After the drought, the once-lush garden was arid and cracked.\" What does ARID mean?", a: "very dry", w: ["crowded with weeds and bugs", "colorful with spring flowers", "flooded"], why: "A drought means no rain, and the ground cracked, so it's very dry." },
      { q: "\"The coach commended the team for their hard work, praising each player by name.\" What does COMMENDED mean?", a: "praised", w: ["punished for mistakes", "ignored completely", "questioned about the game"], why: "The definition clue is right there: \"praising each player.\"" },
      { q: "\"Because the medicine was so potent, the doctor told him to take only half a pill.\" What does POTENT mean?", a: "strong", w: ["cheap at the store", "weak", "sweet like candy"], why: "He only needed half a pill because it was so strong." },
      { q: "\"Rather than being frugal, Dev spent his whole allowance on the first day.\" What does FRUGAL mean?", a: "careful with money", w: ["generous with his friends", "wasteful and careless", "honest"], why: "\"Rather than\" signals the opposite. Dev was wasteful, so frugal means careful with money.", hint: "\"Rather than\" means Dev did the OPPOSITE of being frugal." },
      { q: "\"The audience was captivated by the magician; no one looked away for a second.\" What does CAPTIVATED mean?", a: "held fully interested", w: ["bored and restless", "frightened by the tricks", "confused about what happened"], why: "No one looked away, so their attention was completely held." },
      { q: "\"The rumor spread rapidly; by lunch, the entire school had heard it.\" What does RAPIDLY mean?", a: "very quickly", w: ["quietly and in secret", "slowly", "in a confusing way"], why: "Everyone knew by lunch, so it spread fast." },
      { q: "\"Lucas was reluctant to jump into the cold lake, so he stood on the dock for ten minutes.\" What does RELUCTANT mean?", a: "unwilling or hesitant", w: ["excited and ready to go", "too cold to move his feet", "not able to swim at all"], why: "He waited ten minutes instead of jumping, so he didn't want to." },
      { q: "\"The scratch was so insignificant that no one could see it once the car was washed.\" What does INSIGNIFICANT mean?", a: "too small to matter", w: ["very deep and noticeable", "freshly painted over", "hard to clean off"], why: "No one could even see it, so it didn't matter." },
      { q: "\"Unlike the tranquil lake, the ocean crashed and roared against the rocks.\" What does TRANQUIL mean?", a: "calm and peaceful", w: ["deep and very cold", "loud and stormy", "crowded with boats"], why: "\"Unlike\" signals the opposite of crashing and roaring: calm.", hint: "The lake is the OPPOSITE of the crashing ocean." },
      { q: "\"Maya was so diligent that she finished every assignment early and checked it twice.\" What does DILIGENT mean?", a: "hardworking and careful", w: ["nervous about her grades", "quick but careless with work", "always late to class"], why: "Finishing early and checking twice shows hard, careful work." },
      { q: "\"The cookies were so delectable that everyone asked for the recipe.\" What does DELECTABLE mean?", a: "delicious", w: ["burnt around the edges", "very expensive to make", "shaped like animals"], why: "People want a recipe for food that tastes great." }
    ] });

  lesson({ id: "e7-roots", title: "Greek & Latin roots", std: "7L4b", emo: "🌳", topic: /root|prefix|suffix|greek|latin|affix/,
    learn: ["Many English words are built from Greek and Latin parts. Knowing a root unlocks dozens of words.",
            "Examples: bio = life, tele = far, port = carry, aud = hear, graph = write, chron = time, spect = look, micro = small."],
    vocab: "root = the core part of a word that carries its meaning",
    method: "Split the word into parts and use the meaning of each part.",
    hints: ["Use the root's meaning given in the question.", "Think of another word you know with the same root.", "Which answer includes the root's meaning?"],
    items: [
      { q: "The root BIO means \"life.\" What does BIOLOGY mean?", a: "the study of living things", w: ["the study of rocks and minerals", "the study of stars and planets", "a list of famous people's names"], why: "bio (life) + logy (study of) = the study of life." },
      { q: "The root TELE means \"far.\" What is a TELESCOPE?", a: "a tool for seeing far away", w: ["a machine that records music", "a tool for measuring rainfall", "a small map of the stars"], why: "tele (far) + scope (look at) = a tool for looking at faraway things." },
      { q: "The root PORT means \"carry.\" What does PORTABLE mean?", a: "able to be carried", w: ["able to be opened with a key", "made of metal", "very old and worn out"], why: "port (carry) + able = able to be carried." },
      { q: "The root AUD means \"hear.\" What does AUDIBLE mean?", a: "loud enough to be heard", w: ["bright enough to be seen easily", "hard to read or understand", "able to fly or float"], why: "aud (hear) + ible (able to be) = able to be heard." },
      { q: "AUTO means \"self\" and GRAPH means \"write.\" What is an AUTOGRAPH?", a: "a person's own signature", w: ["the engine inside a car", "a photo you take of yourself", "a map you draw of your town"], why: "auto (self) + graph (write) = something you write yourself: your signature." },
      { q: "The root CHRON means \"time.\" What does CHRONOLOGICAL ORDER mean?", a: "in time order", w: ["in order from smallest to largest", "in alphabetical order by name", "mixed up"], why: "chron (time) — events arranged by when they happened." },
      { q: "PRE means \"before\" and DICT means \"say.\" What does PREDICT mean?", a: "to say what will happen", w: ["to say something again and again", "to argue", "to write something down neatly"], why: "pre (before) + dict (say) = to say beforehand." },
      { q: "The root SPECT means \"look.\" What is a SPECTATOR?", a: "a person who watches", w: ["a person who plays on the team", "a person who sells the tickets", "a person who coaches the players"], why: "spect (look) + ator (a person who) = someone who looks on." },
      { q: "The root AQUA means \"water.\" What does AQUATIC mean?", a: "living in water", w: ["living in hot, dry deserts", "able to fly long distances", "very heavy"], why: "aqua (water) — aquatic animals live in water." },
      { q: "The root MICRO means \"small.\" What is a MICROSCOPE?", a: "a tool for seeing tiny things", w: ["a tool for measuring time exactly", "a tool for seeing distant planets", "a very small cell phone"], why: "micro (small) + scope (look at) = a tool for looking at tiny things." },
      { q: "E means \"out\" and RUPT means \"break.\" What does ERUPT mean?", a: "to break out suddenly", w: ["to fix something that is broken", "to build up slowly over time", "to fall asleep very quickly"], why: "e (out) + rupt (break) = to break out, like a volcano." },
      { q: "The root BENE means \"good.\" What is a BENEFIT?", a: "something helpful", w: ["something harmful or dangerous", "a bill that you still owe", "a tree"], why: "bene (good) — a benefit is something good you get." },
      { q: "The root GEO means \"earth.\" What does GEOLOGY mean?", a: "the study of the earth", w: ["the study of ocean animals", "the study of human history", "the study of weather and clouds"], why: "geo (earth) + logy (study of) = the study of the earth." },
      { q: "The root PHON means \"sound.\" What is a MICROPHONE?", a: "a device that picks up sound", w: ["a device that takes pictures", "a device that measures heat", "a device that stores files"], why: "phon (sound) — a microphone picks up sound." },
      { q: "TRANS means \"across.\" What does TRANSPORT mean?", a: "to carry across", w: ["to break", "to look at very closely", "to write down in a list"], why: "trans (across) + port (carry) = to carry from one place to another." },
      { q: "The root THERM means \"heat.\" What does a THERMOMETER measure?", a: "temperature", w: ["how heavy something is", "loudness", "how fast the wind blows"], why: "therm (heat) + meter (measure) = it measures heat." },
      { q: "The root STRUCT means \"build.\" What does CONSTRUCT mean?", a: "to build", w: ["to tear down", "to sell", "to paint a bright color"], why: "struct (build) — to construct is to build." }
    ] });

  lesson({ id: "e7-figurative", title: "Figurative language", std: "7L5a", emo: "🎨", topic: /figurative|simile|metaphor|personif|hyperbole|poem|poetry/,
    learn: ["SIMILE: compares using like or as (\"as quiet as a library\"). METAPHOR: says one thing IS another (\"my brother is a tornado\").",
            "PERSONIFICATION: gives human actions to a thing (\"the wind whispered\"). HYPERBOLE: a huge exaggeration (\"I've told you a million times\")."],
    vocab: "figurative = not meant literally",
    method: "Check for like/as, an \"is\" comparison, a human action, or an exaggeration.",
    hints: ["Do you see the word like or as? That's a simile.", "Is a non-human thing doing something only people do? That's personification.", "Is it an impossible exaggeration? That's hyperbole. A direct \"is\" comparison is a metaphor."],
    items: [
      { q: "\"The classroom was as quiet as a library at midnight.\"", a: "Simile", fixed: FIG, why: "It compares using \"as… as\"." },
      { q: "\"My little brother is a tornado when he gets home from school.\"", a: "Metaphor", fixed: FIG, why: "It says he IS a tornado, with no like or as." },
      { q: "\"The wind whispered through the trees.\"", a: "Personification", fixed: FIG, why: "Wind can't really whisper; that's a human action." },
      { q: "\"I've told you a million times to clean your room!\"", a: "Hyperbole", fixed: FIG, why: "A million times is a huge exaggeration." },
      { q: "\"Her smile was sunshine on a gray day.\"", a: "Metaphor", fixed: FIG, why: "It says her smile WAS sunshine, with no like or as." },
      { q: "\"The old car groaned as it climbed the hill.\"", a: "Personification", fixed: FIG, why: "Groaning is a human action given to a car." },
      { q: "\"He ran like a cheetah to catch the bus.\"", a: "Simile", fixed: FIG, why: "It compares using \"like\"." },
      { q: "\"This backpack weighs a ton!\"", a: "Hyperbole", fixed: FIG, why: "A backpack can't weigh a ton; it's an exaggeration." },
      { q: "\"The stars danced in the night sky.\"", a: "Personification", fixed: FIG, why: "Dancing is a human action given to stars." },
      { q: "\"The snow was a white blanket over the town.\"", a: "Metaphor", fixed: FIG, why: "It says the snow WAS a blanket, with no like or as." },
      { q: "\"Her voice was as smooth as silk.\"", a: "Simile", fixed: FIG, why: "It compares using \"as… as\"." },
      { q: "\"I'm so hungry I could eat a horse!\"", a: "Hyperbole", fixed: FIG, why: "Nobody could really eat a horse; it's an exaggeration." },
      { q: "\"The lighthouse winked at the passing ships.\"", a: "Personification", fixed: FIG, why: "Winking is a human action given to a lighthouse." },
      { q: "\"My bedroom is a zoo.\"", a: "Metaphor", fixed: FIG, why: "It says the room IS a zoo, with no like or as." },
      { q: "\"Her eyes sparkled like diamonds.\"", a: "Simile", fixed: FIG, why: "It compares using \"like\"." },
      { q: "\"We waited in that line forever!\"", a: "Hyperbole", fixed: FIG, why: "Nobody waits forever; it's an exaggeration." },
      { q: "\"The baby slept like a log.\"", a: "Simile", fixed: FIG, why: "It compares using \"like\"." },
      { q: "\"The leaves raced each other down the street.\"", a: "Personification", fixed: FIG, why: "Racing each other is a human action given to leaves." }
    ] });

  lesson({ id: "e7-connotation", title: "Connotation & word choice", std: "7L5c", emo: "💬", topic: /connotation|denotation|word choice|tone/,
    learn: ["DENOTATION is a word's dictionary meaning. CONNOTATION is the feeling it carries — positive, negative or neutral.",
            "\"Determined\" and \"stubborn\" mean almost the same thing, but \"determined\" sounds good and \"stubborn\" sounds bad. Writers choose words for their feeling."],
    vocab: "connotation = the feeling a word gives",
    method: "Imagine someone describing YOU with each word. Which would you like, and which would bother you?",
    hints: ["All the choices mean something similar. Focus on the feeling.", "Would you want this word used about you? That's a clue to positive or negative.", "Negative words often suggest too much of something."],
    items: [
      { q: "Which word has the most NEGATIVE connotation?", a: "stubborn", w: ["determined", "persistent", "dedicated"], why: "All mean \"won't give up,\" but \"stubborn\" suggests being unreasonable." },
      { q: "Which word has the most POSITIVE connotation?", a: "slender", w: ["skinny", "scrawny", "bony"], why: "All mean \"thin,\" but \"slender\" sounds graceful; the others sound unhealthy." },
      { q: "Which word has the most NEGATIVE connotation?", a: "nosy", w: ["curious", "interested", "inquisitive"], why: "\"Nosy\" suggests poking into other people's business." },
      { q: "Which word has the most POSITIVE connotation?", a: "thrifty", w: ["cheap", "stingy", "tight-fisted"], why: "All mean \"careful with money,\" but \"thrifty\" sounds wise; the others sound selfish." },
      { q: "Which word has the most NEGATIVE connotation?", a: "smirk", w: ["smile", "grin", "beam"], why: "A smirk is a smug, mean smile." },
      { q: "Which word makes a small house sound most WELCOMING?", a: "cozy", w: ["cramped", "tiny", "crowded"], why: "\"Cozy\" suggests warm and comfortable; \"cramped\" and \"crowded\" sound uncomfortable." },
      { q: "Which word has the most NEGATIVE connotation?", a: "reckless", w: ["brave", "bold", "daring"], why: "\"Reckless\" means taking risks without thinking." },
      { q: "Which word has the most POSITIVE connotation?", a: "confident", w: ["arrogant", "cocky", "conceited"], why: "All describe someone sure of themselves, but only \"confident\" isn't insulting." },
      { q: "Which word suggests the person was being SNEAKY?", a: "lurked", w: ["waited", "stood", "paused"], why: "\"Lurked\" means waited in hiding, often up to no good." },
      { q: "Which word has the most NEGATIVE connotation?", a: "mob", w: ["crowd", "audience", "group"], why: "\"Mob\" suggests a wild or dangerous crowd." },
      { q: "Which word has the most POSITIVE connotation?", a: "aroma", w: ["stench", "odor", "reek"], why: "All mean \"smell,\" but \"aroma\" is a pleasant one." },
      { q: "Which word has the most NEGATIVE connotation?", a: "gaudy", w: ["colorful", "bright", "vivid"], why: "\"Gaudy\" means too bright or showy in a tasteless way." },
      { q: "Which word has the most POSITIVE connotation?", a: "youthful", w: ["childish", "immature", "babyish"], why: "All mean \"young,\" but \"youthful\" sounds fresh and lively; the others are insults." },
      { q: "Which word has the most NEGATIVE connotation?", a: "bossy", w: ["assertive", "confident", "decisive"], why: "\"Bossy\" suggests ordering people around rudely." },
      { q: "Which word has the most POSITIVE connotation?", a: "chuckled", w: ["snickered", "smirked", "sneered"], why: "A chuckle is a friendly laugh; the others suggest making fun of someone." },
      { q: "Which word makes a dog sound most FRIGHTENING?", a: "snarled", w: ["barked", "yipped", "woofed"], why: "\"Snarled\" suggests bared teeth and anger." },
      { q: "Which word has the most POSITIVE connotation?", a: "relaxed", w: ["lazy", "idle", "sluggish"], why: "All describe not doing much, but \"relaxed\" sounds calm and healthy." }
    ] });

  /* ---------- Reading ---------- */
  lesson({ id: "e7-central-idea", title: "Central idea", std: "7R2", emo: "🎯", topic: /central idea|main idea|summar/, again: "new passages",
    learn: ["The CENTRAL IDEA is the most important point the whole passage makes, not just one detail.",
            "Test it: does every sentence in the passage support it? A detail answers \"what else?\"; the central idea answers \"what is this mostly about, and why does it matter?\""],
    vocab: "central idea = the point all the details support",
    method: "Ask what the passage is MOSTLY about, then check that the details support it.",
    hints: ["A choice that's true but covers only one sentence is a detail, not the central idea.", "Watch out for choices that go beyond what the passage says.", "Which choice would make a good one-sentence summary?"],
    items: [
      { pass: "Honeybees do much more than make honey. As they fly from flower to flower, they carry pollen that plants need to make seeds and fruit. About one-third of the food people eat depends on pollinators like bees. Without them, many crops would fail.", q: "What is the central idea?", a: "Bees matter because many of our crops depend on them.", w: ["Honeybees spend most of their day making honey in their hives.", "Bees carry pollen as they fly from one flower to another.", "Farmers should stop growing crops that need bees."], why: "Every sentence builds the point that bees matter for our food. The others are single details or go beyond the passage." },
      { pass: "Many people think sharks are mindless killers, but scientists disagree. Sharks rarely attack humans, and most bites happen when a shark mistakes a person for its usual prey. In fact, people kill millions of sharks every year, far more than sharks harm people.", q: "What is the central idea?", a: "Sharks are far less dangerous to people than many believe.", w: ["Sharks often mistake swimmers for the animals they hunt.", "Scientists have studied sharks for many years in the ocean.", "People should never swim in the ocean where sharks live."], why: "The passage argues the fear of sharks is overblown. \"Never swim\" goes against the passage." },
      { pass: "When Maria Mitchell was a girl in the 1820s, her father taught her to use a telescope. In 1847 she discovered a new comet, and she became the first woman in America to work as a professional astronomer. Later, as a college professor, she encouraged young women to study science.", q: "What is the central idea?", a: "Mitchell was a pioneering astronomer who helped other women.", w: ["Maria Mitchell's father taught her how to use his telescope.", "A new comet was discovered by an astronomer in 1847.", "College professors in the 1800s taught many young students."], why: "The details all show her achievements and her help for other women. The others are small details." },
      { pass: "Getting enough sleep helps students do better in school. During sleep, the brain sorts and stores what you learned during the day. Students who get enough rest tend to remember more and pay attention better. Even one late night can make it harder to focus the next morning.", q: "What is the central idea?", a: "Sleep plays a big role in how well students learn.", w: ["Every student should be in bed by nine o'clock each night.", "The brain sorts and stores information while we are sleeping.", "Mornings are hard for most students no matter how they sleep."], why: "Each sentence connects sleep to learning. \"Bed by nine\" isn't in the passage." },
      { pass: "Before 1825, shipping goods from New York City to the Great Lakes was slow and expensive. The Erie Canal changed that. Boats could now carry goods across New York State for a fraction of the cost, and towns along the canal grew quickly. New York City became the busiest port in the country.", q: "What is the central idea?", a: "The Erie Canal cut shipping costs and helped New York grow.", w: ["Before 1825, shipping goods across New York was slow.", "Towns along rivers and canals usually grow very quickly.", "New York City has always been the busiest port in America."], why: "The passage shows how the canal cut costs and led to growth. \"Always\" goes against the passage." },
      { pass: "Recycling one aluminum can saves enough energy to run a TV for about three hours. Aluminum can be recycled again and again without losing quality. Yet millions of cans still end up in landfills each year.", q: "What is the central idea?", a: "Recycling cans saves energy, yet many are still thrown away.", w: ["Watching TV for three hours straight uses a great deal of electricity.", "Aluminum can be melted down and reused many times over.", "Landfills are running out of room for all of our trash."], why: "It covers both the benefit and the problem. The others are side details or not in the passage." },
      { pass: "The Great Wall of China wasn't built all at once. Different dynasties built and rebuilt sections over about 2,000 years, using whatever materials were nearby: packed earth, stone or brick. Most of what visitors see today was built during the Ming dynasty.", q: "What is the central idea?", a: "The Great Wall was built in pieces over many centuries.", w: ["The Great Wall of China is made almost entirely of red brick.", "The Ming dynasty ruled China for about 2,000 years.", "Long walls were the best way to keep enemies out."], why: "Every detail explains how the wall grew over time. The others are wrong or not in the passage." },
      { pass: "Octopuses are surprisingly smart. They can unscrew jars to reach food, escape from tanks, and even tell individual people apart. When scientists give them puzzles, octopuses often solve them quickly.", q: "What is the central idea?", a: "Octopuses are intelligent animals.", w: ["Octopuses can unscrew the lids of jars to reach food inside.", "Scientists enjoy giving puzzles to the animals they study.", "Octopuses are happiest when they live in large tanks."], why: "Every example shows how smart octopuses are. The first wrong choice is just one example." },
      { pass: "A single bolt of lightning can heat the air around it to about 50,000 degrees Fahrenheit, hotter than the surface of the sun. Lightning can strike as far as ten miles from a storm, even when the sky overhead looks clear. That's why experts say that when thunder roars, you should go indoors.", q: "What is the central idea?", a: "Lightning is dangerous even far from a storm, so go indoors.", w: ["Lightning is hotter than the surface of the sun.", "Thunderstorms usually happen on hot summer afternoons.", "Clear skies always mean a storm is too far away to be dangerous."], why: "The facts all lead to the safety advice. The last choice is the opposite of what the passage says." },
      { pass: "Harriet Tubman escaped from slavery in Maryland in 1849. Instead of staying safe in the North, she returned south again and again to lead others to freedom, guiding about 70 people along the Underground Railroad. Later, during the Civil War, she served as a scout and spy for the Union Army.", q: "What is the central idea?", a: "Harriet Tubman risked her own freedom to help others escape.", w: ["Harriet Tubman escaped from slavery in Maryland in 1849.", "The Underground Railroad was a train that ran through the South.", "The Union Army used many scouts and spies during the war."], why: "Each detail shows her courage on behalf of others. The Underground Railroad wasn't a real train." },
      { pass: "Food scraps make up a large part of what families throw away. In a landfill, those scraps break down without air and give off methane, a gas that traps heat in the atmosphere. Composting the same scraps turns them into rich soil for gardens instead.", q: "What is the central idea?", a: "Composting food scraps is better than sending them to a landfill.", w: ["Families throw away more food than anything else.", "Methane is one of the gases found in the atmosphere.", "Gardens need rich, dark soil to grow healthy vegetables and fruits."], why: "The passage compares the two and favors composting. The others are details or overstatements." },
      { pass: "The Statue of Liberty was a gift from the people of France to the United States. It was shipped across the ocean in 1885, packed in more than 200 crates, and dedicated in New York Harbor in 1886. For millions of immigrants arriving by ship, it was the first sight of their new home, and it became a symbol of freedom and welcome.", q: "What is the central idea?", a: "A gift from France, the statue became a symbol of welcome.", w: ["The statue was shipped across the ocean in more than 200 crates.", "Millions of immigrants came to America by ship in the 1800s.", "France and the United States have always agreed with each other."], why: "The passage builds to what the statue came to mean. The others are details or not in the passage." }
    ] });

  lesson({ id: "e7-evidence", title: "Inferences & citing evidence", std: "7R1", emo: "🕵️", topic: /infer|evidence|cite|citing/, again: "new passages",
    learn: ["An INFERENCE is a smart guess based on clues in the text plus what you already know. The text doesn't say it outright.",
            "Strong readers back up an inference with EVIDENCE: the exact detail from the text that best supports it."],
    vocab: "inference = clues + what you know",
    method: "Find the clues in the passage, then pick the answer they point to most directly.",
    hints: ["What do the characters DO? Actions are the best clues.", "Eliminate answers the passage doesn't support at all.", "The best evidence is the detail that points most directly to the idea."],
    items: [
      { pass: "Jamal stared at the clock and tapped his pencil. He had read the same question four times. When the bell finally rang, he let out a long breath and slumped in his chair.", q: "What can you infer about how Jamal felt during the test?", a: "nervous or stressed", w: ["proud of his answers", "excited and cheerful", "angry at his teacher"], why: "Tapping, rereading and the long breath at the end all point to stress." },
      { pass: "Grandpa keeps a small notebook in his shirt pocket. He writes down the name of every bird he sees, along with the date and place. On weekends he drives to the marsh at sunrise, binoculars around his neck.", q: "Which detail BEST supports the inference that Grandpa is serious about bird-watching?", a: "He writes down every bird he sees, with the date and place.", w: ["Grandpa keeps a small notebook in his shirt pocket.", "On weekends Grandpa likes to drive to different places.", "Grandpa likes shirts that have a pocket on the front."], why: "Keeping a careful record of every bird shows real dedication. A notebook alone doesn't." },
      { pass: "The store's shelves were nearly empty. People pushed carts piled with bread, water and batteries. Outside, the sky had turned a heavy gray, and the radio repeated its warning every fifteen minutes.", q: "What can you infer?", a: "People are preparing for a big storm.", w: ["The store is going out of business soon.", "The store is having a big holiday sale.", "The radio in the store is broken."], why: "Supplies, a gray sky and repeated warnings all point to an approaching storm." },
      { pass: "Priya's soccer cleats were caked with dried mud. A trophy sat on her desk next to a team photo, and her calendar was filled with practice times.", q: "Which inference is BEST supported?", a: "Priya plays soccer often and takes it seriously.", w: ["Priya just bought brand-new cleats for the season.", "Priya would rather read than play any sport.", "Priya is the coach of her soccer team."], why: "Muddy cleats, a trophy and a full practice calendar show she plays a lot. The cleats are used, not new." },
      { pass: "Ben rushed into the kitchen with his coat half on, grabbed a piece of toast and ran out the door. A moment later, he ran back in for his backpack.", q: "What can you infer?", a: "Ben is running late.", w: ["Ben is not hungry this morning.", "Ben doesn't like eating toast.", "Ben is staying home today."], why: "Rushing, eating on the run and forgetting his backpack all suggest he's late." },
      { pass: "The snow began at noon. By evening, cars were stuck on every main road because only two plows were working. Schools sent students home without warning, and many buses never arrived.", q: "Which detail BEST supports the idea that the city was unprepared for the storm?", a: "Only two plows were working.", w: ["The snow began at noon and kept falling.", "Many students enjoy having snow days off.", "Snowstorms are common in many cities in winter."], why: "Only two working plows directly shows the city wasn't ready." },
      { pass: "When Ms. Ortiz walked in, the class went silent. Students who had been chatting slid into their seats and opened their notebooks without being told.", q: "Which inference is BEST supported?", a: "The students respect Ms. Ortiz.", w: ["The students are afraid of the dark.", "Ms. Ortiz is a substitute teacher.", "The class was already over for the day."], why: "They get ready on their own as soon as she arrives, which shows respect." },
      { pass: "The puppy's tail thumped against the floor. It dropped a tennis ball at Leo's feet, backed up and barked twice.", q: "What does the puppy most likely want?", a: "to play fetch", w: ["to go to sleep", "to eat dinner", "to be left alone"], why: "Dropping the ball and backing up is a clear invitation to throw it." },
      { pass: "The library was so quiet that Nia could hear the clock ticking. She tiptoed between the shelves and whispered her question to the librarian.", q: "What can you infer about the library?", a: "Visitors are expected to stay quiet.", w: ["Visitors may not borrow any books.", "Only adults are allowed to use it.", "It is closing for the rest of the day."], why: "Tiptoeing and whispering show that quiet is expected." },
      { pass: "Marcus checked the weather app for the third time that morning. He laid out his rain boots, packed an umbrella and moved the picnic basket back into the closet.", q: "What can you infer?", a: "Marcus expects rain and is changing his picnic plans.", w: ["Marcus is going on a trip to the beach today.", "Marcus lost his umbrella and is looking for it.", "Marcus is cleaning out the hall closet today."], why: "Rain boots, an umbrella and putting the picnic basket away all point to rain." },
      { pass: "Ana's room had one window that faced the street. Her hands were covered in paint, and drawings were taped to every wall. Her sketchbook, almost full, lay open on her bed.", q: "Which detail BEST supports the inference that Ana loves to make art?", a: "Drawings were taped to every wall of her room.", w: ["Ana's room had four walls and a bed.", "Her room had one window that faced the street.", "Ana washed her hands before dinner that night."], why: "Drawings covering every wall show how much art she makes." },
      { pass: "Every morning, Mr. Patel opens his shop at six, sweeps the sidewalk and greets each customer by name. Many of his customers have been coming for twenty years.", q: "Which inference is BEST supported?", a: "Mr. Patel's customers are loyal to his shop.", w: ["Mr. Patel opened his shop this year.", "Mr. Patel's shop is usually empty.", "Mr. Patel dislikes talking to the people who visit."], why: "Customers who keep coming for twenty years are loyal." }
    ] });

  lesson({ id: "e7-pov", title: "Point of view", std: "7R6", emo: "👁️", topic: /point of view|narrator|perspective/, again: "new passages",
    learn: ["FIRST PERSON: the narrator is a character and says I or we. THIRD PERSON: the narrator is outside the story and says he, she or they.",
            "THIRD PERSON LIMITED shows only one character's thoughts. THIRD PERSON OMNISCIENT (all-knowing) shows several characters' thoughts or things no character knows."],
    vocab: "omniscient = all-knowing",
    method: "Check the pronouns, then ask whose thoughts the narrator can see.",
    hints: ["I or we outside of dialogue → first person.", "Can the narrator see inside more than one character's head?", "Does the narrator reveal something no character knows? That's omniscient."],
    items: [
      { pass: "I couldn't believe my eyes when I opened the box. Inside was the puppy I'd wanted for years.", q: "What point of view is this?", a: "First person", fixed: POV, why: "The narrator is in the story and says I." },
      { pass: "Leo hoped no one would notice his shaking hands. He didn't know that, across the room, Ava was just as nervous.", q: "What point of view is this?", a: "Third person omniscient", fixed: POV, why: "The narrator knows both Leo's and Ava's feelings, including something Leo doesn't know." },
      { pass: "Mara walked slowly to the front of the room. She wondered if everyone could hear her heart pounding.", q: "What point of view is this?", a: "Third person limited", fixed: POV, why: "\"She\" is used, and only Mara's thoughts are shown." },
      { pass: "We raced down the hill, laughing, our sleds bumping over every rock.", q: "What point of view is this?", a: "First person", fixed: POV, why: "The narrator is part of the action and says we." },
      { pass: "The coach believed the team was ready. The players, though, were each secretly worried, and none of them guessed how close the final score would be.", q: "What point of view is this?", a: "Third person omniscient", fixed: POV, why: "We see the coach's AND the players' private thoughts, plus what's coming." },
      { pass: "Jayden stared at the test. He knew the first answer but wasn't sure about the second.", q: "What point of view is this?", a: "Third person limited", fixed: POV, why: "\"He\" is used, and we only see inside Jayden's head." },
      { pass: "My grandmother told me stories every night, and I still remember each one.", q: "What point of view is this?", a: "First person", fixed: POV, why: "The narrator says my, me and I." },
      { pass: "Nobody in the village knew the old woman's secret. Long ago she had been a famous singer, and each night she still sang quietly to her cat.", q: "What point of view is this?", a: "Third person omniscient", fixed: POV, why: "The narrator reveals a secret no one in the village knows." },
      { pass: "Sofia opened the envelope with trembling fingers. She hoped it was good news from the school.", q: "What point of view is this?", a: "Third person limited", fixed: POV, why: "\"She\" is used, and only Sofia's hopes are shown." },
      { pass: "As I stepped onto the stage, my knees shook, and I forgot the first line of my poem.", q: "What point of view is this?", a: "First person", fixed: POV, why: "The narrator tells their own story with I and my." },
      { pass: "Kai couldn't wait for the field trip. He had packed his bag the night before and checked it twice.", q: "What point of view is this?", a: "Third person limited", fixed: POV, why: "\"He\" is used, and only Kai's feelings are shown." },
      { pass: "The twins argued about the last slice of pizza. Mia thought she deserved it for doing her chores, while Max believed it was his turn. Their mother, listening from the hallway, already had a plan.", q: "What point of view is this?", a: "Third person omniscient", fixed: POV, why: "We see inside Mia's, Max's AND their mother's heads." },
      { pass: "Our team huddled together before the final inning, and we promised to play our best.", q: "What point of view is this?", a: "First person", fixed: POV, why: "The narrator is part of the team and says our and we." },
      { pass: "Elena searched the attic for the old photo album. She was sure her grandmother had left it up there somewhere.", q: "What point of view is this?", a: "Third person limited", fixed: POV, why: "\"She\" is used, and only Elena's thoughts are shown." }
    ] });

  lesson({ id: "e7-claims", title: "Claims & evidence", std: "7R8", emo: "⚖️", topic: /argument|claim|persuasive|opinion|evidence/,
    learn: ["A CLAIM is what an author argues; people could disagree with it. EVIDENCE is facts, numbers, examples or expert findings that support the claim.",
            "Strong evidence is RELEVANT (it's about the claim) and SPECIFIC. A personal feeling (\"it's my favorite\") is weak evidence."],
    vocab: "claim = arguable point · evidence = checkable support",
    method: "Ask: could someone disagree (claim), or could you check it (evidence)? Does it really support this claim?",
    hints: ["Words like should, best and worst usually signal a claim.", "Evidence can be checked: numbers, studies, facts.", "Relevant evidence is about the exact claim, not the general topic."],
    items: [
      { q: "Which sentence is a CLAIM, not evidence?", a: "Our school should start later in the morning.", w: ["A study found teens slept more when school started later.", "Our school starts at 7:30 a.m.", "Last year 40 students were late on Mondays."], why: "\"Should\" signals an opinion someone could argue against. The others are checkable facts." },
      { q: "Claim: \"Schools should have longer recess.\" Which is the BEST evidence?", a: "Studies show students focus better after active breaks.", w: ["Recess is my favorite part of the day because it's fun.", "Some schools in our district have recess at noon.", "Many kids like to play tag and kickball outside."], why: "It's specific and directly supports the claim. Personal feelings are weak evidence." },
      { q: "Claim: \"Our town needs a new public library.\" Which is the BEST evidence?", a: "The library holds 30 people, but over 200 visit each Saturday.", w: ["Libraries are quiet, comfortable places to read and study.", "Books are fun to read, especially adventure stories.", "The town also has a large park next to city hall."], why: "Specific numbers show the library is too small." },
      { q: "Claim: \"Students should wear helmets when biking to school.\" Which is the BEST evidence?", a: "Helmets greatly lower the risk of serious head injury in a crash.", w: ["Helmets come in many bright colors and fun designs.", "Many students ride their bikes to school when it's sunny.", "Biking is good exercise for kids of all ages."], why: "It directly shows why helmets matter." },
      { q: "Which sentence is EVIDENCE (a fact you could check), not a claim?", a: "The cafeteria sold 300 salads last month.", w: ["The cafeteria food is the best in the whole state.", "Everyone should eat more salads at lunch.", "Our lunch period is far too short."], why: "Sales numbers can be checked. The others are opinions." },
      { q: "Claim: \"Reading every day makes you a better writer.\" Which detail does NOT support the claim?", a: "Many popular books are made into movies.", w: ["Readers see many examples of strong sentences.", "Reading builds the vocabulary writers use.", "Daily readers often score higher on writing tests."], why: "Movies have nothing to do with becoming a better writer. That evidence is irrelevant." },
      { q: "Claim: \"Cities should plant more trees.\" Which is the BEST evidence?", a: "Tree-lined streets can be several degrees cooler in summer.", w: ["Trees have leaves that change color in the fall.", "Some people say oak trees are the most beautiful trees.", "Our city has many busy streets and sidewalks."], why: "It gives a specific benefit of planting trees." },
      { q: "Claim: \"Phones should be put away during class.\" Which detail does NOT support the claim?", a: "Some phones have very good cameras.", w: ["Notifications pull attention away from the lesson.", "Teachers report fewer distractions without phones.", "Students remember more when they aren't multitasking."], why: "Camera quality doesn't relate to the claim, so it's irrelevant evidence." },
      { q: "Which sentence is a CLAIM?", a: "Every student should learn to cook.", w: ["Cooking club meets on Tuesdays after school.", "Twelve students signed up for cooking club.", "The recipe takes about 20 minutes to make."], why: "\"Should\" signals an arguable opinion. The others are facts." },
      { q: "Claim: \"School lunches should include more fresh fruit.\" Which is the BEST evidence?", a: "Fresh fruit gives growing bodies vitamins and fiber.", w: ["Some students prefer apples, and others like bananas.", "The cafeteria is painted a bright shade of yellow.", "Lunch is served from 11:30 until 12:15 each day."], why: "It explains a real benefit of the claim. The others don't support it." },
      { q: "Which sentence is a CLAIM?", a: "Homework should be banned on weekends.", w: ["Students had three homework assignments this weekend.", "The math homework took about forty minutes.", "Our teacher posts homework on the class website."], why: "\"Should\" signals an arguable opinion. The others are facts you could check." },
      { q: "Claim: \"Our town should build a skate park.\" Which detail does NOT support the claim?", a: "Skateboards were first made in California in the 1950s.", w: ["Kids now skate in parking lots, where cars can hit them.", "A skate park would give teens a safe place to exercise.", "Over 300 residents signed a petition asking for a park."], why: "The history of skateboards doesn't show why this town needs a park." },
      { q: "Which sentence is EVIDENCE, not a claim?", a: "Our school recycled 2 tons of paper last year.", w: ["Recycling is the most important thing a school can do.", "Every class should have its own recycling bin.", "Our school does not care enough about the planet."], why: "A measured amount can be checked. The others are opinions." }
    ] });

  /* Interactive text-highlighting items appended at the end so existing std-why-* indices stay intact */
  var RICH = {
    "e7-clauses": [
      { __noClip: true, type: "highlight", q: "Tap the DEPENDENT clause in this sentence:",
        segments: [
          { text: "Although the storm knocked out the lights," , hit: true },
          { text: "our family finished the board game" },
          { text: "by flashlight." }
        ],
        why: "\"Although the storm knocked out the lights\" has a subject (storm) and verb (knocked), but \"Although\" makes it dependent." },
      { __noClip: true, type: "highlight", q: "Tap the INDEPENDENT clause in this sentence:",
        segments: [
          { text: "After the soccer tournament ended," },
          { text: "the whole team celebrated with pizza" , hit: true },
          { text: "before heading home." }
        ],
        why: "\"The whole team celebrated with pizza\" has a subject and verb and stands alone as a complete thought." }
    ],
    "e7-evidence": [
      { __noClip: true, type: "highlight", q: "Tap the sentence that BEST proves Maya prepared carefully for her speech:",
        segments: [
          { text: "The auditorium filled quickly before first period." },
          { text: "Maya's index cards were color-coded and worn soft at the corners from a week of practice.", hit: true },
          { text: "The principal adjusted the microphone on stage." }
        ],
        why: "Color-coded cards worn soft from a week of practice directly show careful preparation." },
      { __noClip: true, type: "highlight", q: "Tap the sentence that BEST supports the inference that the old library is very popular:",
        segments: [
          { text: "The brick building has stood on Main Street since 1912." },
          { text: "Every afternoon, all forty reading tables fill up within ten minutes of school letting out.", hit: true },
          { text: "Its tall windows look out over the town square." }
        ],
        why: "All forty tables filling up within ten minutes directly proves high demand and popularity." }
    ]
  };
  L.forEach(function (l) { if (RICH[l.id]) l.items = l.items.concat(RICH[l.id]); });

  /* Dedicated NY 7W1 Argument Writing: Claim → Evidence → Reasoning (CER) Coach */
  lesson({ id: "e7-cer-coach", title: "Argument writing: CER coach", std: "7W1", emo: "✍️", isWorkshop: true,
    topic: /cer|essay|writing|paragraph|argument|reasoning/, again: "new prompts",
    learn: ["Strong Grade 7 arguments use CER: a clear CLAIM (your arguable answer), specific EVIDENCE from the text, and REASONING that explains HOW your evidence proves your claim.",
            "In reasoning, use bridge words like \"because,\" \"this shows,\" or \"therefore\" so the reader clearly sees why your evidence matters."],
    vocab: "CER = Claim (answer) + Evidence (text proof) + Reasoning (how it proves it)",
    method: "1) State your claim clearly. 2) Cite a specific fact or detail from the passage. 3) Explain how that detail proves your claim.",
    hints: ["Keep your claim to one clear sentence answering the question.", "Pull a concrete detail, number, or quote from the passage for your evidence.", "Start your reasoning with \"This shows that...\" or \"Because...\" to connect evidence back to your claim."],
    items: [
      { __noClip: true, type: "cer",
        pass: "A 2024 district study followed 600 middle-schoolers after their school moved start time from 7:30 a.m. to 8:30 a.m. Students averaged 43 more minutes of sleep per night, morning tardies dropped by 38%, and first-period math averages rose by 6 points.",
        q: "Should middle schools start later in the morning? Write a short CER paragraph using evidence from the study.",
        model: "Claim: Middle schools should move to a later start time because it helps students succeed. Evidence: In a study of 600 students who started at 8:30 a.m., students got 43 extra minutes of sleep, tardies fell by 38%, and first-period math averages increased by 6 points. Reasoning: This shows that extra sleep directly improves both attendance and focus in challenging classes." },
      { __noClip: true, type: "cer",
        pass: "In many cities, tree-lined neighborhoods are up to 9°F cooler during summer heat waves than paved blocks without trees. Trees also absorb stormwater during heavy rains and filter dust from the air.",
        q: "Should cities invest money in planting more street trees? Build your CER response from the passage.",
        model: "Claim: Cities should invest in planting more street trees to protect residents and neighborhoods. Evidence: According to the passage, tree-lined blocks can be up to 9°F cooler in summer heat waves, while also absorbing stormwater and filtering dust. Reasoning: Because trees lower dangerous heat and reduce flooding at the same time, planting them solves several city problems at once." },
      { __noClip: true, type: "cer",
        pass: "When Riverside Middle School started a 15-minute daily independent reading block, students were allowed to pick any book they wanted. By the end of the year, library checkouts tripled and reading comprehension scores grew twice as fast as the year before.",
        q: "Does giving students choice in independent reading pay off? Support your claim with evidence and reasoning.",
        model: "Claim: Giving students time to read books they choose significantly improves reading growth. Evidence: After Riverside Middle School added a 15-minute choice reading block, library checkouts tripled and comprehension scores grew twice as fast. Reasoning: This proves that when students feel excited about what they read, they practice more and become stronger readers." },
      { __noClip: true, type: "cer",
        pass: "Before the Erie Canal opened in 1825, shipping a ton of grain from Buffalo to New York City took three weeks and cost $100. After the canal opened, the same trip took eight days and cost less than $10, causing towns along the route to boom.",
        q: "Was the Erie Canal a major turning point for New York's economy? Write a CER paragraph explaining why.",
        model: "Claim: The Erie Canal was a major economic turning point for New York State. Evidence: Shipping a ton of grain dropped from three weeks and $100 to just eight days and under $10, and towns along the canal boomed. Reasoning: Therefore, by making trade dramatically faster and cheaper, the canal unlocked rapid business and population growth across New York." }
    ] });

  if (window.HootStudy && window.HootStudy.addBankCourse) {
    window.HootStudy.addBankCourse({ id: "ela7", title: "Grade 7 English · full course", emo: "📚", color: "#7A2E8E", subject: "Grade 7 English", again: "new questions", review: "English review: mixed practice" }, L);
  }
})();
