/* Hoot — Grade 7 science (3e32). Same study engine and flow as Grade 7 math
   and English. Aligned to the New York State P-12 Science Learning Standards
   (NYSSLS) for middle school: MS-LS (life), MS-PS (physical), MS-ESS (earth &
   space) and the science practices. One right answer per question; wrong
   answers written to similar lengths. */
(function () {
  "use strict";
  var L = [];
  function lesson(o) { L.push(o); }

  lesson({ id: "s7-cells", title: "Cells: the building blocks of life", std: "MS-LS1-1, LS1-2", emo: "🦠", topic: /cell|organelle|nucleus|mitochond|microscope/,
    learn: ["Every living thing is made of one or more CELLS, the smallest unit of life. Bacteria are one cell; you are trillions.",
            "Inside a cell, parts called ORGANELLES do different jobs: the NUCLEUS holds DNA, MITOCHONDRIA release energy from food, the CELL MEMBRANE controls what goes in and out. Plant cells also have a CELL WALL and CHLOROPLASTS."],
    vocab: "organelle = a tiny part of a cell with its own job",
    method: "Match the job in the question to the organelle (or idea) that does it.",
    hints: ["Think of the cell as a factory: who's the boss, who makes power, who guards the door?", "Plant cells have three things animal cells don't: a cell wall, chloroplasts and a large vacuole.", "Cell theory: all living things are made of cells, and new cells come from existing cells."],
    items: [
      { q: "What is the smallest unit that can carry out all the processes of life?", a: "the cell", w: ["the organ", "the tissue", "the organ system"], why: "A cell is the smallest living unit. Tissues, organs and systems are made of many cells." },
      { q: "Which organelle holds the cell's DNA and controls its activities?", a: "the nucleus", w: ["the cell membrane", "the cytoplasm", "the vacuole"], why: "The nucleus contains DNA, the instructions for the cell." },
      { q: "Which structure is found in plant cells but NOT in animal cells?", a: "the cell wall", w: ["the cell membrane", "the nucleus", "the mitochondria"], why: "Plant cells have a stiff cell wall outside the membrane. Animal cells don't." },
      { q: "Which organelle releases energy from food for the cell to use?", a: "mitochondria", w: ["chloroplasts", "ribosomes", "the vacuole"], why: "Mitochondria carry out cellular respiration, releasing energy stored in sugar." },
      { q: "In which organelle does photosynthesis take place?", a: "the chloroplast", w: ["the mitochondrion", "the nucleus", "the cell membrane"], why: "Chloroplasts contain chlorophyll, which captures light energy to make sugar." },
      { q: "Which part of the cell controls what enters and leaves?", a: "the cell membrane", w: ["the nucleus", "the cytoplasm", "the chloroplast"], why: "The membrane is a thin barrier that lets some materials through and blocks others." },
      { q: "What is the jelly-like fluid that fills the cell and holds the organelles?", a: "cytoplasm", w: ["the nucleus", "the vacuole", "the cell wall"], why: "Cytoplasm fills the cell; organelles float in it." },
      { q: "Which organelle stores water and is especially large in plant cells?", a: "the vacuole", w: ["the ribosome", "the nucleus", "the mitochondrion"], why: "A plant cell's large central vacuole stores water and helps keep the plant firm." },
      { q: "Which organelles build proteins?", a: "ribosomes", w: ["vacuoles", "chloroplasts", "cell walls"], why: "Ribosomes put together proteins using instructions from DNA." },
      { q: "Which statement is part of the cell theory?", a: "All living things are made of one or more cells.", w: ["All cells contain chloroplasts and a cell wall.", "Cells can form on their own from nonliving material.", "Only animals and plants are made of cells."], why: "Cell theory: living things are made of cells, cells are the basic unit of life, and cells come from existing cells." },
      { q: "Which living thing is made of only ONE cell?", a: "a bacterium", w: ["a mushroom", "an oak tree", "a frog"], why: "Bacteria are single-celled. Mushrooms, trees and frogs are made of many cells." },
      { q: "Which list shows the levels of organization from smallest to largest?", a: "cell → tissue → organ → organ system", w: ["tissue → cell → organ → organ system", "cell → organ → tissue → organ system", "organ → tissue → cell → organ system"], why: "Cells form tissues, tissues form organs, and organs work together in organ systems." },
      { q: "Which tool do scientists need to see most cells?", a: "a microscope", w: ["a telescope", "a thermometer", "a balance scale"], why: "Most cells are far too small to see without a microscope." }
    ] });

  lesson({ id: "s7-body", title: "Body systems working together", std: "MS-LS1-3", emo: "🫀", topic: /body|organ|system|heart|lung|digest|nervous|skelet|muscle/,
    learn: ["Your body is a set of ORGAN SYSTEMS, each with a job: the circulatory system moves blood, the respiratory system brings in oxygen, the digestive system breaks down food, the nervous system sends signals.",
            "The systems depend on each other. When you run, your nervous system signals your muscles, your lungs breathe faster, and your heart pumps faster to deliver more oxygen."],
    vocab: "organ system = organs working together on one job",
    method: "Name the job in the question, then pick the system (or organ) that does that job.",
    hints: ["Blood and the heart → circulatory. Lungs → respiratory. Stomach and intestines → digestive.", "Signals and the brain → nervous. Bones → skeletal. Hormones → endocrine.", "Ask what the body needs more of during the activity."],
    items: [
      { q: "Which system carries oxygen and nutrients to every cell in the body?", a: "the circulatory system", w: ["the respiratory system", "the digestive system", "the nervous system"], why: "The heart pumps blood through blood vessels to every cell." },
      { q: "Where does oxygen pass from the air into the blood?", a: "the lungs", w: ["the heart", "the stomach", "the kidneys"], why: "Tiny air sacs in the lungs (alveoli) let oxygen into the blood and carbon dioxide out." },
      { q: "Which system breaks food down into nutrients the body can use?", a: "the digestive system", w: ["the excretory system", "the skeletal system", "the immune system"], why: "The mouth, stomach and intestines break food down so nutrients can be absorbed." },
      { q: "Which system uses the brain, spinal cord and nerves to send signals?", a: "the nervous system", w: ["the muscular system", "the circulatory system", "the endocrine system"], why: "Nerves carry electrical signals to and from the brain." },
      { q: "Which system supports the body, protects organs and makes blood cells?", a: "the skeletal system", w: ["the muscular system", "the digestive system", "the respiratory system"], why: "Bones hold you up, protect organs like the brain, and marrow inside bones makes blood cells." },
      { q: "Which two systems work together to move your bones?", a: "muscular and skeletal", w: ["digestive and excretory", "respiratory and immune", "endocrine and digestive"], why: "Muscles pull on bones to move them." },
      { q: "Where are most nutrients absorbed into the blood?", a: "the small intestine", w: ["the stomach", "the large intestine", "the esophagus"], why: "The small intestine's lining absorbs most nutrients. The large intestine mostly absorbs water." },
      { q: "Which organs filter wastes out of the blood to make urine?", a: "the kidneys", w: ["the lungs", "the liver and heart", "the small intestine"], why: "The kidneys, part of the excretory system, filter the blood." },
      { q: "Why does your heart beat faster when you run?", a: "to deliver more oxygen to working muscles", w: ["to help the stomach digest food faster", "to cool down the brain and spinal cord", "to build new bone cells in the legs"], why: "Working muscles use more oxygen, so the heart and lungs speed up to supply it." },
      { q: "Which system sends chemical messages called hormones through the blood?", a: "the endocrine system", w: ["the nervous system", "the skeletal system", "the respiratory system"], why: "Glands of the endocrine system release hormones that control growth and other processes." },
      { q: "Which system fights germs that cause disease?", a: "the immune system", w: ["the digestive system", "the skeletal system", "the muscular system"], why: "White blood cells and other defenses of the immune system attack germs." },
      { q: "How many chambers does the human heart have?", a: "four", w: ["two", "three", "six"], why: "Two atria on top and two ventricles below." }
    ] });

  lesson({ id: "s7-photo", title: "Photosynthesis & cellular respiration", std: "MS-LS1-6, LS1-7", emo: "🌿", topic: /photosynth|respiration|chlorophyll|glucose|plant/,
    learn: ["PHOTOSYNTHESIS: plants use light energy to turn carbon dioxide and water into sugar (glucose) and oxygen. It happens in chloroplasts.",
            "CELLULAR RESPIRATION: cells in plants AND animals use oxygen to break down sugar, releasing energy plus carbon dioxide and water. The products of one process are the starting materials of the other."],
    vocab: "photosynthesis stores energy in sugar · respiration releases it",
    method: "Ask: is the process building sugar with light (photosynthesis) or breaking it down for energy (respiration)?",
    hints: ["Photosynthesis needs light, carbon dioxide and water.", "Respiration happens in plants and animals, day and night.", "The two processes are mirror images: what one makes, the other uses."],
    items: [
      { q: "What do plants need for photosynthesis?", a: "carbon dioxide, water and light", w: ["oxygen, sugar and total darkness", "soil, nitrogen and heat", "oxygen, water and carbon"], why: "Plants take in CO₂ from the air, water from the soil, and energy from light." },
      { q: "What does photosynthesis produce?", a: "sugar and oxygen", w: ["carbon dioxide and water", "soil and minerals", "heat and nitrogen"], why: "Plants store energy in sugar (glucose) and release oxygen." },
      { q: "Where does the energy in the food you eat originally come from?", a: "the sun", w: ["the soil", "the ocean", "the air"], why: "Plants capture the sun's energy in sugar; animals get it by eating plants or other animals." },
      { q: "What does cellular respiration release from sugar?", a: "energy the cell can use", w: ["light for the leaves", "new soil for roots", "chlorophyll for growth"], why: "Respiration breaks down glucose with oxygen to release usable energy." },
      { q: "Which living things carry out cellular respiration?", a: "both plants and animals", w: ["only animals", "only plants", "only animals that live in water"], why: "Every living cell needs energy, so plants and animals both do respiration." },
      { q: "Which gas do plants release into the air during photosynthesis?", a: "oxygen", w: ["carbon dioxide", "nitrogen", "hydrogen"], why: "Oxygen is a product of photosynthesis." },
      { q: "What green pigment captures light energy in leaves?", a: "chlorophyll", w: ["glucose", "cytoplasm", "keratin"], why: "Chlorophyll in chloroplasts absorbs light, and it's what makes leaves green." },
      { q: "A plant is kept in a dark closet for three weeks. What will most likely happen?", a: "It stops making food and weakens.", w: ["It grows faster than ever.", "It makes extra oxygen in the dark.", "It turns bright green from the rest."], why: "Without light, photosynthesis stops, so the plant can't make sugar." },
      { q: "How are photosynthesis and cellular respiration related?", a: "What one makes, the other uses.", w: ["They both happen only at night.", "They are two names for one process.", "Only animals do either of them."], why: "Photosynthesis makes sugar and oxygen; respiration uses them and makes CO₂ and water, which photosynthesis uses." },
      { q: "What gas do YOU breathe out as a product of cellular respiration?", a: "carbon dioxide", w: ["oxygen", "water vapor only", "helium"], why: "Respiration produces carbon dioxide, which you exhale." },
      { q: "In the photosynthesis equation, what is C₆H₁₂O₆?", a: "glucose, a sugar", w: ["oxygen gas", "carbon dioxide", "chlorophyll"], why: "C₆H₁₂O₆ is glucose, the sugar plants make." },
      { q: "Why are plants important to animals?", a: "They make food and oxygen animals need.", w: ["They make water from soil and rocks.", "They remove all oxygen from the air.", "They keep animals warm at night."], why: "Plants are producers: they make food energy and release oxygen." }
    ] });

  lesson({ id: "s7-ecosystems", title: "Ecosystems & food webs", std: "MS-LS2-1, LS2-2, LS2-3", emo: "🐟", topic: /ecosystem|food (web|chain)|producer|consumer|predator|habitat|population/,
    learn: ["In an ECOSYSTEM, PRODUCERS (plants, algae) make food, CONSUMERS eat other living things, and DECOMPOSERS (fungi, bacteria) break down dead matter and return nutrients to the soil.",
            "In a food chain, arrows show the flow of ENERGY from what is eaten to what eats it. Only about 10% of the energy passes to each next level, so there are always fewer animals at the top."],
    vocab: "arrow in a food web = energy goes this way",
    method: "Find each organism's role (producer, consumer, decomposer), then follow the energy.",
    hints: ["Producers make their own food from sunlight.", "If a predator disappears, its prey usually increases at first.", "Living things are biotic; sunlight, water, temperature and rocks are abiotic."],
    items: [
      { q: "In the food chain algae → zooplankton → small fish → striped bass, which is the PRODUCER?", a: "algae", w: ["zooplankton", "small fish", "striped bass"], why: "Algae make their own food from sunlight." },
      { q: "Which organism is a DECOMPOSER?", a: "a mushroom", w: ["a rabbit", "an oak tree", "a hawk"], why: "Mushrooms (fungi) break down dead material." },
      { q: "What do the arrows in a food chain show?", a: "the direction energy flows", w: ["which animal is the biggest", "which animal moves fastest", "where each animal sleeps"], why: "Arrows point from the food to the eater, showing energy flow." },
      { q: "In a meadow, snakes eat mice. If the snakes disappear, what will most likely happen to the mice at first?", a: "Their population will grow.", w: ["Their population will shrink.", "They will start eating snakes.", "Nothing about them will change."], why: "With fewer predators, more mice survive, so their numbers rise." },
      { q: "About how much of the energy at one level of a food chain passes to the next level?", a: "about 10%", w: ["about 50%", "about 90%", "all of it"], why: "Most energy is used for life processes or lost as heat; only about 10% passes on." },
      { q: "Which is an ABIOTIC (nonliving) part of an ecosystem?", a: "sunlight", w: ["grass", "bacteria", "a beetle"], why: "Sunlight, water, temperature and rocks are nonliving factors." },
      { q: "Bees get nectar from flowers and carry pollen between them. Both benefit. What kind of relationship is this?", a: "mutualism", w: ["parasitism", "predation", "competition"], why: "In mutualism, both organisms benefit." },
      { q: "A tick feeds on a dog's blood, and the dog is harmed. What kind of relationship is this?", a: "parasitism", w: ["mutualism", "commensalism", "producer and consumer"], why: "In parasitism, one organism benefits and the other is harmed." },
      { q: "What is the main job of decomposers?", a: "to return nutrients to the soil", w: ["to make food from sunlight", "to hunt the top predators", "to pollinate the flowers in a meadow"], why: "Decomposers break down dead matter, recycling nutrients for producers." },
      { q: "Which is a LIMITING FACTOR for a deer population?", a: "the amount of food available", w: ["the color of the deer's fur", "the number of stars at night", "the deer's favorite season"], why: "Food, water, space and predators limit how large a population can grow." },
      { q: "Where in an energy pyramid is the MOST energy?", a: "at the producer level", w: ["at the top predator level", "at the decomposer level", "evenly at every level"], why: "Producers capture the energy; each level up has less." },
      { q: "Zebra mussels, brought from another part of the world, spread quickly in the Hudson River and crowded out native species. What are they?", a: "an invasive species", w: ["a native producer", "an extinct species", "a kind of decomposer"], why: "An invasive species comes from elsewhere and harms the new ecosystem." }
    ] });

  lesson({ id: "s7-matter", title: "Atoms, molecules & changes in matter", std: "MS-PS1-1, PS1-2, PS1-4", emo: "⚛️", topic: /atom|molecule|element|compound|matter|chemical|physical change|solid|liquid|gas/,
    learn: ["Everything is made of ATOMS. An ELEMENT has only one kind of atom (gold, oxygen). A COMPOUND is two or more elements chemically joined (water, H₂O). Atoms join to form MOLECULES.",
            "A PHYSICAL change alters shape or state but not the substance (melting ice). A CHEMICAL change makes a NEW substance (burning, rusting). Signs: gas bubbles, color change, new smell, heat or light."],
    vocab: "chemical change = a new substance forms",
    method: "Ask: is it still the same substance afterward? If not, it's a chemical change.",
    hints: ["Melting, freezing, cutting and dissolving are physical changes.", "Burning, rusting, cooking and rotting make new substances.", "Heat makes particles move faster; cooling slows them down."],
    items: [
      { q: "Which is a CHEMICAL change?", a: "wood burning in a campfire", w: ["ice melting into water", "paper being torn in half", "sugar dissolving in tea"], why: "Burning makes new substances (ash, smoke, gases). The others don't change what the substance is." },
      { q: "Which is a PHYSICAL change?", a: "water freezing into ice", w: ["an iron nail rusting", "a cake baking in the oven", "a banana rotting"], why: "Frozen water is still water. The others make new substances." },
      { q: "Which is a sign that a chemical reaction may have happened?", a: "bubbles of a new gas form", w: ["the object is cut smaller", "the liquid is poured out", "the solid is moved to a shelf"], why: "A new gas forming suggests a new substance was made." },
      { q: "How many atoms are in one molecule of water (H₂O)?", a: "three", w: ["two", "one", "four"], why: "Two hydrogen atoms plus one oxygen atom." },
      { q: "Which is an ELEMENT?", a: "oxygen", w: ["water", "table salt", "carbon dioxide"], why: "Oxygen has only one kind of atom. The others are compounds of two elements." },
      { q: "Which is a COMPOUND?", a: "water", w: ["gold", "helium", "iron"], why: "Water is hydrogen and oxygen chemically joined." },
      { q: "How do particles in a SOLID behave?", a: "They vibrate in place, packed tightly.", w: ["They move freely and spread far apart.", "They slide past each other loosely.", "They stop moving completely forever."], why: "Solid particles are packed closely and can only vibrate." },
      { q: "What happens to particles when a substance is heated?", a: "They move faster.", w: ["They move slower.", "They get smaller.", "They stop moving."], why: "Adding energy makes particles move faster, which can melt or boil a substance." },
      { q: "Vinegar and baking soda react in a sealed bag. How does the total mass afterward compare to before?", a: "It stays the same.", w: ["It doubles.", "It drops to zero.", "It goes down by half."], why: "In a closed system, atoms are rearranged, not created or destroyed, so mass is conserved." },
      { q: "What is the smallest particle of an element that still has its properties?", a: "an atom", w: ["a cell", "a compound", "a mixture"], why: "Atoms are the building blocks of elements." },
      { q: "When water boils, what kind of change happens?", a: "a physical change from liquid to gas", w: ["a chemical change that makes oxygen", "a chemical change that makes salt", "no change at all"], why: "Steam is still water (H₂O), just in a different state." },
      { q: "Which of these is evidence of a chemical change when cooking an egg?", a: "the clear egg white turns solid white", w: ["the egg is moved into a pan", "the shell is cracked open", "the egg is stirred with a fork in a bowl"], why: "The proteins change into a new form that can't change back." }
    ] });

  lesson({ id: "s7-earth", title: "Plate tectonics & the rock cycle", std: "MS-ESS2-1, ESS2-2, ESS2-3", emo: "🌋", topic: /plate|tectonic|earthquake|volcano|rock|fossil|erosion|weathering|continent/,
    learn: ["Earth's outer layer is broken into giant TECTONIC PLATES that move a few centimeters a year. Earthquakes, volcanoes and mountains are found mostly where plates meet.",
            "Rocks change through the ROCK CYCLE: IGNEOUS rock forms when melted rock cools, SEDIMENTARY rock forms from layers of pressed sediment, and METAMORPHIC rock forms under heat and pressure."],
    vocab: "weathering breaks rock · erosion carries it away",
    method: "Match the clue (heat, layers, cooling, plates moving) to the process.",
    hints: ["Cooled magma or lava → igneous. Layers and fossils → sedimentary. Heat and pressure → metamorphic.", "Plates pulling apart make new crust; plates colliding make mountains.", "Weathering breaks; erosion moves."],
    items: [
      { q: "How does igneous rock form?", a: "when melted rock cools and hardens", w: ["when layers of sand are pressed", "when heat and pressure change rock", "when water dissolves old rock"], why: "Igneous rock forms from cooled magma or lava." },
      { q: "In which type of rock are fossils MOST often found?", a: "sedimentary", w: ["igneous", "metamorphic", "volcanic glass"], why: "Sediment buries plants and animals in layers, preserving fossils." },
      { q: "How does metamorphic rock form?", a: "existing rock is changed by heat and pressure", w: ["lava cools quickly on the surface", "sand settles in layers at the bottom of a lake", "minerals dissolve in rainwater"], why: "Metamorphic means \"changed form\": heat and pressure deep underground transform rock." },
      { q: "Where do most earthquakes and volcanoes happen?", a: "along the edges of tectonic plates", w: ["in the middle of each continent", "only near the North Pole", "anywhere, with no pattern at all"], why: "Plates grinding, colliding or separating cause most earthquakes and volcanoes." },
      { q: "Fossils of the same reptile are found in both South America and Africa. What does this support?", a: "The continents were once joined.", w: ["The reptile could swim across oceans.", "Fossils move between continents.", "The two continents have the same weather."], why: "It's evidence for continental drift: the land was once connected." },
      { q: "What forms when two continental plates collide?", a: "tall mountain ranges", w: ["deep ocean trenches only", "new islands in the sea", "flat, wide plains"], why: "Colliding plates crumple and push up, as with the Himalayas." },
      { q: "What is the difference between weathering and erosion?", a: "Weathering breaks rock; erosion moves it.", w: ["Weathering moves rock; erosion breaks it.", "They are two names for the same thing.", "Only erosion is caused by water."], why: "Weathering breaks rock into pieces; erosion carries those pieces away." },
      { q: "What happens at a mid-ocean ridge?", a: "Plates move apart and new crust forms.", w: ["Plates collide and form mountains.", "Plates stop moving completely.", "Old crust melts in the middle."], why: "Magma rises between separating plates and cools into new ocean floor." },
      { q: "About how fast do tectonic plates move?", a: "a few centimeters per year", w: ["a few meters per day", "a few kilometers per hour", "they never move at all"], why: "About as fast as your fingernails grow." },
      { q: "New York's Finger Lakes are long, narrow and deep. What mainly carved them?", a: "glaciers during the Ice Age", w: ["volcanoes erupting underground", "ocean waves over many years", "earthquakes along a plate edge"], why: "Moving glaciers gouged out the valleys that filled with water." },
      { q: "Which is an example of weathering?", a: "ice expanding in a crack and splitting a rock", w: ["a river carrying sand to the ocean", "wind blowing sand into a dune", "a glacier slowly pushing loose rocks downhill"], why: "Freezing water breaks rock in place, which is weathering. The others move material: erosion." },
      { q: "Pumice is a light rock full of holes, formed from lava that cooled quickly. What type of rock is it?", a: "igneous", w: ["sedimentary", "metamorphic", "a fossil"], why: "It formed from cooled lava, so it's igneous." }
    ] });

  lesson({ id: "s7-weather", title: "Weather & the water cycle", std: "MS-ESS2-4, ESS2-5, ESS2-6", emo: "🌦️", topic: /weather|water cycle|evapor|condens|precipit|cloud|front|air pressure|climate/,
    learn: ["The sun powers the WATER CYCLE: water EVAPORATES, rises, CONDENSES into clouds, and falls as PRECIPITATION. Plants add water vapor too (transpiration).",
            "WEATHER is the day-to-day condition of the air. Where air masses meet, FRONTS form; falling air pressure often brings clouds and storms, while rising pressure brings clear skies. CLIMATE is the average weather over many years."],
    vocab: "weather = today · climate = the long-term pattern",
    method: "Name the step or condition the question describes, then match it.",
    hints: ["Liquid to gas = evaporation. Gas to liquid = condensation.", "Wind blows from high pressure toward low pressure.", "Air from over water is humid; air from the north is cold."],
    items: [
      { q: "What drives the water cycle?", a: "energy from the sun", w: ["the pull of the moon", "wind from the oceans", "heat from Earth's core"], why: "Sunlight heats water so it evaporates, keeping the cycle going." },
      { q: "Water vapor cools high in the air and forms clouds. What is this step called?", a: "condensation", w: ["evaporation", "precipitation", "runoff"], why: "Condensation turns water vapor (gas) into tiny liquid droplets." },
      { q: "A puddle dries up on a sunny day. What happened to the water?", a: "It evaporated into the air.", w: ["It condensed into the ground.", "It turned into solid ice.", "It was absorbed by the sun."], why: "Heat turned the liquid water into water vapor." },
      { q: "Rain, snow, sleet and hail are all forms of what?", a: "precipitation", w: ["condensation", "transpiration", "evaporation"], why: "Precipitation is water falling from clouds." },
      { q: "Plants release water vapor through their leaves. What is this called?", a: "transpiration", w: ["precipitation", "condensation", "erosion"], why: "Transpiration adds water vapor from plants to the air." },
      { q: "Air pressure is falling quickly. What weather is most likely coming?", a: "clouds and stormy weather", w: ["clear and sunny skies", "a sudden heat wave", "no change in the weather"], why: "Low pressure lets air rise and cool, forming clouds and storms." },
      { q: "Which way does wind blow?", a: "from high pressure to low pressure", w: ["from low pressure to high pressure", "always from east to west", "only from the ocean to the land"], why: "Air moves from areas of high pressure toward low pressure." },
      { q: "What is the difference between weather and climate?", a: "Weather is short-term; climate is the long-term average.", w: ["Weather is the long-term average; climate is just today.", "They mean exactly the same thing.", "Climate only describes rain and snow."], why: "Weather changes day to day; climate is the pattern over many years." },
      { q: "An air mass forms over the warm Gulf of Mexico. What will it be like?", a: "warm and humid", w: ["cold and dry", "cold and humid", "warm and dry"], why: "Air takes on the conditions where it forms: warm water makes warm, moist air." },
      { q: "Cold air moves across the warmer Great Lakes and dumps heavy snow on Buffalo. What is this called?", a: "lake-effect snow", w: ["a heat wave", "a drought", "a sea breeze"], why: "The air picks up moisture from the warmer lake, then drops it as snow downwind." },
      { q: "A cold front pushes into warm, moist air. What often happens?", a: "Thunderstorms form as warm air is forced up.", w: ["The sky stays clear for a week.", "The temperature suddenly rises a lot for days.", "The air pressure stays the same."], why: "Rising warm air cools and condenses quickly, often making storms." },
      { q: "What does humidity measure?", a: "the amount of water vapor in the air", w: ["the speed of the wind", "the temperature of the ground in the morning", "the air's weight on a scale"], why: "Humidity is how much water vapor the air holds." }
    ] });

  lesson({ id: "s7-experiments", title: "Designing a fair experiment", std: "Science practices", emo: "🧪", topic: /experiment|variable|hypothes|scientific method|control|data|graph/,
    learn: ["In a fair test you change ONE thing — the INDEPENDENT variable — and measure what happens — the DEPENDENT variable. Everything else stays the same: the CONTROLLED variables.",
            "A HYPOTHESIS is a testable prediction (\"If… then…\"). Repeating trials makes results more reliable, and a CONTROL GROUP gives you something to compare against."],
    vocab: "change one thing, measure one thing, keep the rest the same",
    method: "Ask: what does the scientist change, what do they measure, and what must stay the same?",
    hints: ["The independent variable is what YOU change on purpose.", "The dependent variable is what you measure or observe.", "Anything that could also affect the result must be kept the same."],
    items: [
      { q: "Maya tests whether the amount of fertilizer affects how tall bean plants grow. What is the INDEPENDENT variable?", a: "the amount of fertilizer", w: ["the height of the plants", "the type of pot used", "the amount of sunlight"], why: "It's the one thing she changes on purpose." },
      { q: "In Maya's fertilizer experiment, what is the DEPENDENT variable?", a: "the height of the plants", w: ["the amount of fertilizer", "the brand of the seeds", "the size of the pots"], why: "Plant height is what she measures." },
      { q: "In Maya's experiment, which should be a CONTROLLED variable?", a: "the amount of water each plant gets", w: ["the amount of fertilizer", "the height of each plant", "the final results of the whole test"], why: "Water also affects growth, so it must be the same for every plant." },
      { q: "Which is a testable hypothesis?", a: "If plants get more light, then they will grow taller.", w: ["Plants are the most beautiful living things on the planet.", "Tall plants are better than short plants.", "I wonder why some plants are green."], why: "It's a prediction you can test by changing light and measuring height." },
      { q: "Why do scientists repeat an experiment several times?", a: "to make the results more reliable", w: ["to make the experiment take longer", "to change the hypothesis each time", "to use up all of the materials"], why: "Repeating trials shows whether a result happens consistently or by chance." },
      { q: "In a test of a new plant food, one group of plants gets no plant food at all. What is this group called?", a: "the control group", w: ["the dependent group", "the hypothesis group", "the variable group"], why: "The control group gets no treatment, so you can compare." },
      { q: "Which graph is best for showing how temperature changed over a week?", a: "a line graph", w: ["a pie chart", "a pictograph", "a Venn diagram"], why: "Line graphs show change over time." },
      { q: "Which statement is an OBSERVATION, not an inference?", a: "The leaf is yellow with brown spots.", w: ["The plant is sick from too much water.", "Someone forgot to water this plant.", "The plant will probably die soon."], why: "An observation is what you directly see. The others are explanations or guesses." },
      { q: "Jon tests paper towel brands by how much water they absorb, but he uses a different amount of water for each. What's the problem?", a: "He changed more than one variable.", w: ["He used too many brands.", "He didn't write a hypothesis first.", "He measured the results."], why: "The amount of water must stay the same, or the test isn't fair." },
      { q: "After collecting data, what should a scientist do next?", a: "analyze it and draw a conclusion", w: ["throw it away and start over", "change the data to match the guess", "keep it secret from everyone"], why: "Analyzing data shows whether it supports the hypothesis." },
      { q: "An experiment's results don't support the hypothesis. What does a good scientist do?", a: "report it honestly and rethink the idea", w: ["change the numbers so they match", "hide the results from others", "stop doing science entirely and quit"], why: "Results that disagree with a hypothesis are still useful evidence." },
      { q: "Ava tests whether the height a ball is dropped from affects how high it bounces. What is the DEPENDENT variable?", a: "how high the ball bounces", w: ["the height it is dropped from", "the type of ball used", "the floor it bounces on"], why: "Bounce height is what she measures." }
    ] });

  lesson({ id: "s7-heredity", title: "Heredity & genes", std: "MS-LS3-2, LS4-4", emo: "🧬", topic: /heredity|gene|dna|trait|inherit|chromosome|punnett|mutation|selection/,
    learn: ["Traits like eye color are passed from parents to offspring through GENES, which are sections of DNA on CHROMOSOMES. In sexual reproduction, offspring get half their genes from each parent.",
            "A DOMINANT allele hides a RECESSIVE one: if purple (P) is dominant over white (p), a Pp plant is purple. A Punnett square predicts the chances for offspring. Over generations, helpful traits become more common through natural selection."],
    vocab: "inherited trait = passed down in genes · learned trait = picked up during life",
    method: "Decide whether the trait comes from genes, then use dominant and recessive to predict.",
    hints: ["Capital letter = dominant. It shows whenever it's present.", "A recessive trait shows only with two recessive alleles (pp).", "Skills and injuries are not inherited; eye color and blood type are."],
    items: [
      { q: "What are genes made of?", a: "DNA", w: ["protein fibers", "sugar and starch", "minerals from soil"], why: "Genes are sections of DNA that carry instructions for traits." },
      { q: "Where are chromosomes found in a plant or animal cell?", a: "in the nucleus", w: ["in the cell wall", "in the vacuole", "in the chloroplasts"], why: "Chromosomes, made of DNA, are kept in the nucleus." },
      { q: "How many chromosomes does a typical human body cell have?", a: "46", w: ["23", "12", "100"], why: "46 chromosomes in 23 pairs: one of each pair from each parent." },
      { q: "In sexual reproduction, where does an offspring get its genes?", a: "half from each parent", w: ["all from the mother only", "all from the father only", "from neither parent at all"], why: "Each parent passes on half of its chromosomes." },
      { q: "What is true of offspring made by asexual reproduction?", a: "They are genetically identical to the parent.", w: ["They are a mix of genes from two parents.", "They are always a brand-new species.", "They can never reproduce themselves."], why: "With only one parent, the offspring get an exact copy of its genes." },
      { q: "In pea plants, purple flowers (P) are dominant over white flowers (p). What color is a Pp plant?", a: "purple", w: ["white", "pink", "half purple, half white"], why: "The dominant P allele hides the recessive p allele." },
      { q: "Two Pp pea plants are crossed. What fraction of their offspring would you expect to have white flowers (pp)?", a: "1/4", w: ["1/2", "3/4", "none"], why: "The Punnett square gives PP, Pp, Pp, pp: one of four is pp." },
      { q: "Which trait is INHERITED?", a: "natural eye color", w: ["a scar from falling off a bike", "knowing how to ride a bike", "a short haircut"], why: "Eye color comes from genes. The others happen during a person's life." },
      { q: "Which trait is LEARNED, not inherited?", a: "speaking Spanish", w: ["having dimples", "your blood type", "natural hair color"], why: "Language is learned. The others are set by genes." },
      { q: "What is a mutation?", a: "a change in an organism's DNA", w: ["a new cell wall forming around a cell", "a skill learned from a parent", "a kind of asexual reproduction"], why: "Mutations change the DNA code; some are harmful, some helpful, most have little effect." },
      { q: "Farmers breed only the cows that give the most milk. What is this called?", a: "artificial selection", w: ["natural selection", "photosynthesis", "a mutation"], why: "People choosing which animals reproduce is artificial (selective) breeding." },
      { q: "In natural selection, individuals with helpful traits are more likely to do what?", a: "survive and reproduce", w: ["change their DNA on purpose", "stop having offspring", "become a new species overnight"], why: "They pass those helpful traits on, so the traits become more common over generations." },
      { q: "Who is known as the father of genetics for his experiments with pea plants?", a: "Gregor Mendel", w: ["Charles Darwin", "Isaac Newton", "Louis Pasteur"], why: "Mendel's pea experiments in the 1860s revealed dominant and recessive traits." }
    ] });

  lesson({ id: "s7-forces", title: "Forces & motion", std: "MS-PS2-1, PS2-2, PS2-4", emo: "🚀", topic: /force|motion|newton|friction|gravity|speed|inertia|accelerat/,
    learn: ["A FORCE is a push or a pull. BALANCED forces cancel out, so motion doesn't change. UNBALANCED forces change an object's speed or direction.",
            "Newton's laws: (1) objects keep doing what they're doing unless a force acts (INERTIA); (2) force = mass × acceleration, so more mass needs more force; (3) every action has an equal and opposite reaction."],
    vocab: "net force = all the forces added together",
    method: "Identify the forces, decide whether they're balanced, then apply the right law.",
    hints: ["Balanced forces → no change in motion. Unbalanced → speeding up, slowing down or turning.", "F = m × a: same force, more mass → less acceleration.", "Speed = distance ÷ time."],
    items: [
      { q: "What is a force?", a: "a push or a pull", w: ["a kind of energy stored in food", "the amount of matter in an object", "the speed of an object over time"], why: "Forces are pushes or pulls that can change motion." },
      { q: "What do unbalanced forces do to an object?", a: "change its motion", w: ["keep it perfectly still", "make it lose all its mass", "turn it into pure energy"], why: "An unbalanced (net) force makes an object speed up, slow down or change direction." },
      { q: "A book sits still on a table. Gravity pulls it down and the table pushes it up. What are these forces?", a: "balanced", w: ["unbalanced", "only gravity", "frictionless"], why: "The forces are equal and opposite, so the book doesn't move." },
      { q: "Why do passengers lurch forward when a car stops suddenly?", a: "Their bodies keep moving forward because of inertia.", w: ["The brakes push their bodies forward toward the windshield.", "Gravity pulls them toward the front.", "The seat belts push them forward."], why: "Newton's first law: a moving object keeps moving unless a force stops it." },
      { q: "You push an empty shopping cart and a full one with the same force. Which speeds up more?", a: "the empty cart", w: ["the full cart", "both exactly the same", "neither one moves"], why: "Less mass means more acceleration for the same force (F = m × a)." },
      { q: "A 2 kg ball accelerates at 3 m/s². What is the net force on it?", a: "6 N", w: ["1.5 N", "5 N", "9 N"], why: "F = m × a = 2 × 3 = 6 newtons." },
      { q: "On roller skates, you push against a wall and roll backward. What explains this?", a: "The wall pushes back on you with an equal force.", w: ["The wall pulls you toward it.", "Friction pushes you away from it.", "Gravity changes direction near walls and pushes you."], why: "Newton's third law: every action has an equal and opposite reaction." },
      { q: "Which surface creates the MOST friction for a box sliding across it?", a: "thick carpet", w: ["smooth ice", "a polished wood floor", "a sheet of wet glass"], why: "Rough surfaces create more friction than smooth or slippery ones." },
      { q: "What two things affect the strength of gravity between two objects?", a: "their masses and the distance between them", w: ["their colors and their temperatures", "their speeds and their shapes", "their ages and what kinds of material they're made of"], why: "More mass means more pull; more distance means less pull." },
      { q: "A cyclist rides 30 km in 2 hours. What is her average speed?", a: "15 km/h", w: ["60 km/h", "32 km/h", "28 km/h"], why: "Speed = distance ÷ time = 30 ÷ 2 = 15 km/h." },
      { q: "How does an astronaut's MASS on the Moon compare to her mass on Earth?", a: "It's the same.", w: ["It's less.", "It's greater.", "It's zero."], why: "Mass is the amount of matter and doesn't change. Her WEIGHT is less on the Moon." },
      { q: "What is the unit used to measure force?", a: "the newton", w: ["the gram", "the meter", "the liter"], why: "Force is measured in newtons (N), named for Isaac Newton." }
    ] });

  lesson({ id: "s7-energy", title: "Energy & heat", std: "MS-PS3-1, PS3-3, PS3-5", emo: "⚡", topic: /energy|kinetic|potential|heat|conduct|convect|radiat|insulat|thermal/,
    learn: ["KINETIC energy is the energy of motion; more mass or more speed means more kinetic energy. POTENTIAL energy is stored energy, like a ball held up high.",
            "Energy is never created or destroyed; it changes form (light, heat, electrical, chemical). Heat moves from warmer things to cooler things by CONDUCTION (touching), CONVECTION (moving liquids or gases) and RADIATION (waves, like sunlight)."],
    vocab: "energy changes form but the total stays the same",
    method: "Name the kind of energy or heat transfer, then follow how it changes.",
    hints: ["Moving = kinetic. High up or stretched = potential.", "Touching → conduction. Rising warm air or water → convection. Sunlight → radiation.", "Heat always flows from warmer to cooler."],
    items: [
      { q: "Kinetic energy is the energy of what?", a: "motion", w: ["position high above the ground", "chemical bonds in food", "a stretched rubber band"], why: "Anything moving has kinetic energy." },
      { q: "A ball is held still high above the ground. What kind of energy does it mostly have?", a: "gravitational potential energy", w: ["kinetic energy", "sound energy", "stored electrical energy"], why: "Its height gives it stored (potential) energy that turns into motion if it falls." },
      { q: "Where on a roller coaster does the car have the MOST kinetic energy?", a: "at the bottom of the biggest hill", w: ["at the top of the biggest hill", "while it is stopped at the station", "halfway up the first climb"], why: "Potential energy from the top has turned into motion by the bottom, where it's fastest." },
      { q: "A truck and a bicycle travel at the same speed. Which has more kinetic energy?", a: "the truck, because it has more mass", w: ["the bicycle, because it's smaller", "both have exactly the same", "neither, since they're at the same speed"], why: "Kinetic energy depends on mass and speed; same speed, more mass → more energy." },
      { q: "What does the law of conservation of energy say?", a: "Energy can't be created or destroyed, only changed.", w: ["Energy gets used up and slowly disappears over time.", "Energy can only be created by machines.", "Energy always stays in the same form."], why: "Energy changes form, but the total amount stays the same." },
      { q: "In a battery-powered flashlight, what is the energy change?", a: "chemical → electrical → light", w: ["light → chemical → sound", "electrical → chemical → heat", "sound → light → chemical"], why: "The battery's chemical energy becomes electrical energy, then light (and some heat)." },
      { q: "What energy change happens in a solar panel?", a: "light → electrical", w: ["electrical → light", "chemical → sound", "heat → chemical"], why: "Solar panels turn sunlight into electricity." },
      { q: "A metal spoon in hot soup gets hot all the way up the handle. How did the heat move?", a: "conduction", w: ["convection", "radiation", "evaporation"], why: "Heat passed through the touching metal particles." },
      { q: "Warm air rises from a heater and cooler air sinks to take its place. What is this?", a: "convection", w: ["conduction", "radiation", "insulation"], why: "Convection is heat carried by moving liquids or gases." },
      { q: "You feel the sun's warmth on your face. How does that heat reach you?", a: "radiation", w: ["conduction", "convection", "friction"], why: "The sun's energy travels through space as waves; nothing has to touch you." },
      { q: "Which material is the best insulator (slows heat the most)?", a: "wool", w: ["copper", "aluminum", "iron"], why: "Wool traps air and slows heat flow; metals conduct heat well." },
      { q: "Which way does thermal energy flow?", a: "from warmer objects to cooler ones", w: ["from cooler objects to warmer ones", "only from solids to liquids", "only upward, never sideways"], why: "That's why a cold drink warms up and a hot drink cools down." }
    ] });

  lesson({ id: "s7-space", title: "Earth, Moon & space", std: "MS-ESS1-1, ESS1-2, ESS1-3", emo: "🌙", topic: /space|planet|moon|sun|season|eclipse|orbit|solar system|tide|star|galaxy/,
    learn: ["Earth SPINS on its axis once a day (day and night) and ORBITS the sun once a year. Because the axis is TILTED, sunlight hits each hemisphere more directly in its summer: that causes the SEASONS.",
            "The Moon orbits Earth about once a month. We see PHASES because we view different amounts of its sunlit half. GRAVITY holds the Moon and planets in their orbits and, with the Moon's pull, causes ocean TIDES."],
    vocab: "rotation = spinning · revolution = orbiting",
    method: "Picture the sun, Earth and Moon in space, then ask what is moving or blocking what.",
    hints: ["Spinning → day and night. Orbiting + tilt → seasons.", "Eclipses: whatever is in the middle casts the shadow.", "Seasons are NOT caused by Earth's distance from the sun."],
    items: [
      { q: "What causes day and night?", a: "Earth spinning on its axis", w: ["Earth orbiting around the sun", "the Moon blocking the sun", "the sun moving around Earth"], why: "As Earth rotates, each side faces the sun (day), then turns away (night)." },
      { q: "What causes Earth's seasons?", a: "the tilt of Earth's axis", w: ["Earth's distance from the sun", "the phases of the Moon", "changes in the sun's brightness"], why: "The tilt makes sunlight more direct in summer and more spread out in winter. Earth is actually closest to the sun in January." },
      { q: "How long does it take Earth to orbit the sun once?", a: "about 365 days", w: ["about 24 hours", "about 30 days", "about 7 days"], why: "One revolution around the sun is one year." },
      { q: "Why does the Moon seem to change shape during the month?", a: "We see different amounts of its sunlit half.", w: ["Earth's shadow covers part of it each night.", "Clouds block different parts of it.", "The Moon actually changes its shape."], why: "Half the Moon is always lit; as it orbits, we see more or less of that half." },
      { q: "What happens during a LUNAR eclipse?", a: "Earth's shadow falls on the Moon.", w: ["The Moon blocks the sun from Earth.", "The sun passes behind Earth for a day.", "The Moon stops reflecting light forever."], why: "Earth is between the sun and the Moon." },
      { q: "What happens during a SOLAR eclipse?", a: "The Moon blocks the sun from Earth.", w: ["Earth's shadow falls on the Moon.", "The sun moves behind another planet.", "Clouds cover the sun for a whole day."], why: "The Moon is between the sun and Earth." },
      { q: "What force keeps the planets in orbit around the sun?", a: "gravity", w: ["magnetism", "friction", "wind"], why: "The sun's gravity pulls on the planets and holds them in orbit." },
      { q: "Which is the largest planet in our solar system?", a: "Jupiter", w: ["Saturn", "Earth", "Neptune"], why: "Jupiter is more than 11 times wider than Earth." },
      { q: "What is the sun?", a: "a star", w: ["a planet", "a moon", "a comet"], why: "The sun is a medium-sized star, the closest one to Earth." },
      { q: "What mainly causes ocean tides?", a: "the Moon's gravity", w: ["strong ocean winds", "Earth's hot core", "the phases of Mars"], why: "The Moon's pull raises bulges of ocean water as Earth turns." },
      { q: "Which planet is closest to the sun?", a: "Mercury", w: ["Venus", "Mars", "Earth"], why: "Order from the sun: Mercury, Venus, Earth, Mars…" },
      { q: "In New York, around which date is the sun highest in the sky at noon?", a: "around June 21", w: ["around December 21", "around March 1", "around October 1"], why: "The summer solstice, when the Northern Hemisphere is tilted most toward the sun." },
      { q: "What is the name of the galaxy our solar system is in?", a: "the Milky Way", w: ["Andromeda", "the Big Dipper", "Orion"], why: "Our sun is one of billions of stars in the Milky Way." }
    ] });

  /* 3e33: more questions for the first eight lessons */
  var MORE = {
    "s7-cells": [
      { q: "Which two structures do BOTH plant and animal cells have?", a: "a nucleus and a cell membrane", w: ["a cell wall and chloroplasts", "chloroplasts and a nucleus", "a cell wall and a cell membrane"], why: "Both kinds of cells have a nucleus, a membrane, cytoplasm and mitochondria." },
      { q: "According to the cell theory, where do new cells come from?", a: "existing cells dividing", w: ["nonliving dust and water mixing", "sunlight hitting the soil", "the food an organism eats"], why: "All cells come from other cells." },
      { q: "The heart is made of several kinds of tissue working together. What is it?", a: "an organ", w: ["a molecule", "an atom", "a single cell"], why: "Tissues working together form an organ." }
    ],
    "s7-body": [
      { q: "Which muscle pumps blood through the body?", a: "the heart", w: ["the lungs", "the stomach", "the diaphragm"], why: "The heart is a muscle that pumps blood through the circulatory system." },
      { q: "Which organ is the control center of the nervous system?", a: "the brain", w: ["the heart", "the liver", "the skin"], why: "The brain processes signals and sends instructions." },
      { q: "You shiver when you're cold. Which two systems are working together?", a: "nervous and muscular", w: ["digestive and skeletal", "excretory and immune", "respiratory and digestive"], why: "Nerves sense the cold and signal muscles to shiver, which makes heat." }
    ],
    "s7-photo": [
      { q: "Which part of a plant takes in most of the water used in photosynthesis?", a: "the roots", w: ["the flowers", "the seeds", "the bark"], why: "Roots absorb water from the soil." },
      { q: "Through tiny openings in leaves called stomata, plants take in what?", a: "carbon dioxide", w: ["sunlight and heat", "soil", "sugar from the roots"], why: "Stomata let carbon dioxide in and oxygen and water vapor out." },
      { q: "Where in the cell does cellular respiration take place?", a: "in the mitochondria", w: ["in the chloroplasts only", "in the cell wall", "in the vacuole"], why: "Mitochondria release energy from sugar." }
    ],
    "s7-ecosystems": [
      { q: "Mice eat seeds, and owls eat mice. What is the owl?", a: "a secondary consumer", w: ["a producer", "a primary consumer", "a decomposer"], why: "It eats a consumer (the mouse), so it's a secondary consumer." },
      { q: "Two kinds of birds eat the same seeds in the same small area. What is this?", a: "competition", w: ["mutualism", "parasitism", "photosynthesis"], why: "They compete for a limited resource." },
      { q: "A barnacle rides on a whale. The barnacle benefits and the whale is not affected. What relationship is this?", a: "commensalism", w: ["mutualism", "parasitism", "predation"], why: "One benefits and the other is neither helped nor harmed." }
    ],
    "s7-matter": [
      { q: "Which of these is a MIXTURE?", a: "trail mix", w: ["pure gold", "oxygen gas", "distilled water"], why: "Trail mix is several substances mixed together that keep their own properties." },
      { q: "Baking soda and vinegar make lots of bubbles when mixed. What kind of change is this?", a: "a chemical change", w: ["a physical change", "no change at all", "a change of state only"], why: "A new gas (carbon dioxide) forms, which is a sign of a chemical change." },
      { q: "Which state of matter has a definite volume but takes the shape of its container?", a: "liquid", w: ["solid", "gas", "none of them"], why: "Liquids keep their volume but flow to fit their container." }
    ],
    "s7-earth": [
      { q: "What is melted rock beneath Earth's surface called?", a: "magma", w: ["lava", "sediment", "granite"], why: "Underground it's magma; when it reaches the surface it's called lava." },
      { q: "Which layer of Earth is the thinnest?", a: "the crust", w: ["the mantle", "the outer core", "the inner core"], why: "The crust is a thin outer shell, like the skin of an apple." },
      { q: "At the San Andreas Fault, two plates slide past each other. What kind of boundary is this?", a: "a transform boundary", w: ["a divergent boundary", "a convergent boundary", "a mid-ocean ridge"], why: "At transform boundaries, plates grind sideways past each other." }
    ],
    "s7-weather": [
      { q: "Which instrument measures air pressure?", a: "a barometer", w: ["a thermometer", "an anemometer", "a rain gauge"], why: "Barometers measure air pressure; anemometers measure wind speed." },
      { q: "Which clouds are tall and towering and often bring thunderstorms?", a: "cumulonimbus clouds", w: ["cirrus clouds", "thin, flat stratus clouds", "contrails"], why: "Cumulonimbus clouds can grow miles high and produce storms." },
      { q: "Where is most of Earth's water found?", a: "the oceans", w: ["lakes and rivers", "underground", "the atmosphere"], why: "About 97% of Earth's water is salt water in the oceans." }
    ],
    "s7-experiments": [
      { q: "Which unit would you use to measure a plant's height?", a: "centimeters", w: ["grams", "liters", "degrees Celsius"], why: "Height is a length, measured in centimeters or meters." },
      { q: "A student thinks plants grow faster with music. Which is a fair test?", a: "Grow identical plants, with and without music.", w: ["Play music for one plant and guess.", "Ask friends whether they agree.", "Play music for one plant for a single day and compare."], why: "A fair test compares groups that differ only in the music." },
      { q: "Why is testing many plants better than testing just one?", a: "Results are less likely to be due to chance.", w: ["It makes the experiment more colorful.", "It means you don't need a control.", "One plant always gives the right answer."], why: "A larger sample reduces the effect of one unusual plant." }
    ]
  };
  L.forEach(function (l) { if (MORE[l.id]) l.items = l.items.concat(MORE[l.id]); });

  /* Interactive sequencing items appended after MORE so existing std-why-* indices stay intact */
  var RICH = {
    "s7-cells": [
      { __noClip: true, type: "order", q: "Put the levels of biological organization in order from SMALLEST to LARGEST:",
        orderItems: ["Cell", "Tissue", "Organ", "Organ system"],
        why: "Cells build tissues, tissues build organs, and organs work together in organ systems." }
    ],
    "s7-experiments": [
      { __noClip: true, type: "order", q: "Put the steps of a fair scientific investigation in order from FIRST to LAST:",
        orderItems: ["Ask a testable question", "Write a hypothesis", "Run controlled trials & collect data", "Analyze data & draw a conclusion"],
        why: "Scientists start with a question and testable prediction, collect fair data, then analyze it for a conclusion." }
    ]
  };
  L.forEach(function (l) { if (RICH[l.id]) l.items = l.items.concat(RICH[l.id]); });

  if (window.HootStudy && window.HootStudy.addBankCourse) {
    window.HootStudy.addBankCourse({ id: "sci7", title: "Grade 7 science · full course", emo: "🔬", color: "#0E6E8C", subject: "Grade 7 science", again: "new questions", review: "Science review: mixed practice" }, L);
  }
})();
