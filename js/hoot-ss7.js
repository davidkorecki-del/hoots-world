/* Hoot — Grade 7 social studies (3e32). Same study engine and flow as Grade 7
   math, English and science. Follows the New York State K-8 Social Studies
   Framework for grade 7, "History of the United States and New York I"
   (7.1 Native Americans through 7.8 A Nation Divided). One right answer per
   question; wrong answers written to similar lengths. */
(function () {
  "use strict";
  var L = [];
  function lesson(o) { L.push(o); }

  lesson({ id: "ss7-native", title: "Native Americans of New York", std: "7.1", emo: "🏹", topic: /native|haudenosaunee|iroquois|lenape|algonqui|longhouse/,
    learn: ["The HAUDENOSAUNEE (also called the Iroquois Confederacy) united five nations in what is now New York: the Mohawk, Oneida, Onondaga, Cayuga and Seneca. The Tuscarora joined in the 1700s, making six.",
            "They lived in villages of LONGHOUSES, grew the \"Three Sisters\" (corn, beans and squash), and governed by the Great Law of Peace. Clan mothers chose the leaders. Algonquian peoples such as the Lenape lived along the lower Hudson and on Long Island."],
    vocab: "confederacy = a group of nations joined for a shared purpose",
    method: "Connect the clue in the question to the people, place or idea it describes.",
    hints: ["Haudenosaunee means \"People of the Longhouse.\"", "The Three Sisters were grown together and helped each other grow.", "Think about how geography (rivers, forests, soil) shaped daily life."],
    items: [
      { q: "Which group united five nations in what is now New York State?", a: "the Haudenosaunee", w: ["the Aztec Empire", "the Sioux Nation", "the Inca Empire"], why: "The Haudenosaunee (Iroquois) Confederacy joined the Mohawk, Oneida, Onondaga, Cayuga and Seneca." },
      { q: "What were the \"Three Sisters\"?", a: "corn, beans and squash", w: ["three leaders of the council", "three rivers in New York", "wheat, rice and potatoes"], why: "These crops were planted together and helped each other grow." },
      { q: "What kind of home did Haudenosaunee families live in?", a: "longhouses", w: ["adobe pueblos", "igloos", "tipis made of buffalo hide"], why: "Several related families shared a long wooden house covered in bark." },
      { q: "What important role did Haudenosaunee clan mothers have?", a: "They chose the chiefs and could remove them.", w: ["They led every army into battle.", "They traded only with European settlers.", "They had no role in government."], why: "Clan mothers chose leaders and could remove them if they failed the people." },
      { q: "What was the Great Law of Peace?", a: "the set of rules uniting the Haudenosaunee nations", w: ["a treaty with the Dutch about trading furs on the Hudson", "a law that ended the Revolution", "a rule about planting corn"], why: "It created the confederacy and how it would make decisions together." },
      { q: "Which nation joined the Haudenosaunee in the 1700s, making it the Six Nations?", a: "the Tuscarora", w: ["the Cherokee", "the Lenape", "the Apache"], why: "The Tuscarora moved north and joined around 1722." },
      { q: "Which Algonquian-speaking people lived along the lower Hudson River and in the New York City area?", a: "the Lenape", w: ["the Seneca", "the Navajo", "the Mohawk"], why: "The Lenape (Delaware) lived in the area that became New York City." },
      { q: "What were wampum belts made from, and what were they used for?", a: "shell beads, to record agreements", w: ["gold coins, to buy land", "clay tiles, to build homes", "animal bones, to make hunting tools"], why: "Wampum belts of shell beads recorded treaties and important events." },
      { q: "How did New York's forests and rivers shape Native American life?", a: "They provided food, travel routes and materials.", w: ["They made farming completely impossible.", "They had no effect on how people lived.", "They were only used for sports, games and contests."], why: "People hunted and fished, traveled by canoe, and built with wood and bark." },
      { q: "Which is one of the five original Haudenosaunee nations?", a: "the Onondaga", w: ["the Lenape", "the Cherokee", "the Shawnee"], why: "The five: Mohawk, Oneida, Onondaga, Cayuga and Seneca." }
    ] });

  lesson({ id: "ss7-colonies", title: "Colonial America & New Netherland", std: "7.2", emo: "⛵", topic: /colon|new netherland|new amsterdam|jamestown|plymouth|pilgrim|mayflower/,
    learn: ["Europeans built colonies in North America in the 1600s. The English founded JAMESTOWN in 1607; the Pilgrims came to PLYMOUTH in 1620. The Dutch founded NEW NETHERLAND, with its capital NEW AMSTERDAM on Manhattan.",
            "In 1664 the English took New Netherland and renamed it NEW YORK. The New England, Middle and Southern colonies had different economies, and the Southern economy came to depend on the labor of enslaved Africans."],
    vocab: "colony = land ruled by a faraway country",
    method: "Match the colony, date or idea to what the question describes.",
    hints: ["New Amsterdam became New York City.", "New England: fishing and shipbuilding. Middle: grain and trade. Southern: large plantations.", "The House of Burgesses and Mayflower Compact were early steps toward self-government."],
    items: [
      { q: "What was New York City called when it was a Dutch colony?", a: "New Amsterdam", w: ["New Plymouth", "Fort Orange", "New Sweden"], why: "The Dutch capital of New Netherland was New Amsterdam, on Manhattan." },
      { q: "In what year did the English take over New Netherland and rename it New York?", a: "1664", w: ["1492", "1776", "1825"], why: "An English fleet took the colony in 1664 without a battle." },
      { q: "What was the first permanent English settlement in North America?", a: "Jamestown", w: ["Plymouth", "Boston", "New Amsterdam"], why: "Jamestown, Virginia, was founded in 1607." },
      { q: "What was the Mayflower Compact?", a: "an agreement by the Pilgrims to govern themselves", w: ["a trade deal between England and Spain", "a treaty that ended a war with France", "a list of rules for ship captains crossing the ocean"], why: "In 1620 the Pilgrims agreed to make and follow their own laws." },
      { q: "Which was the first elected representative assembly in the English colonies?", a: "the Virginia House of Burgesses", w: ["the Continental Congress", "the United States Senate", "the New York State Assembly"], why: "It first met in Jamestown in 1619." },
      { q: "Which colonial region was known for large farms called plantations?", a: "the Southern colonies", w: ["the New England colonies", "the Middle colonies", "New Netherland"], why: "The warm climate and long growing season supported plantation crops like tobacco and rice." },
      { q: "The Middle colonies, including New York, were called the \"breadbasket colonies.\" Why?", a: "They grew large amounts of wheat and grain.", w: ["They had the most bakeries in America.", "They traded only in bread with England.", "They had no farms, only cities."], why: "Rich soil and good weather made them big grain producers." },
      { q: "What was the triangular trade?", a: "trade routes among Europe, Africa and the Americas", w: ["a trade deal among three colonies", "a game played by colonial children", "a tax on goods traded between the three largest colonies"], why: "Goods, raw materials and enslaved Africans moved across the Atlantic on these routes." },
      { q: "Why was the 1735 trial of John Peter Zenger in New York important?", a: "It helped establish freedom of the press.", w: ["It ended slavery in New York.", "It started the American Revolution.", "It made New York a Dutch colony again."], why: "Zenger was found not guilty of printing criticism of the governor because what he printed was true." },
      { q: "Which group's labor did the Southern colonial economy come to depend on?", a: "enslaved Africans", w: ["Dutch soldiers", "English lords", "French traders"], why: "Plantations relied on the forced labor of enslaved Africans." },
      { q: "What economic idea said colonies existed to make the home country rich?", a: "mercantilism", w: ["democracy", "federalism", "abolition"], why: "Under mercantilism, colonies supplied raw materials and bought the home country's goods." }
    ] });

  lesson({ id: "ss7-road-rev", title: "The road to revolution", std: "7.3", emo: "🔔", topic: /revolution|stamp act|tea party|taxation|declaration of independence|boston|lexington/,
    learn: ["After the French and Indian War (1754–1763), Britain was in debt and taxed the colonies with laws like the STAMP ACT (1765). Colonists protested \"no taxation without representation.\"",
            "Tension grew through the Boston Massacre (1770) and Boston Tea Party (1773). Fighting began at LEXINGTON AND CONCORD in 1775, and on July 4, 1776, the DECLARATION OF INDEPENDENCE announced the colonies were free."],
    vocab: "representation = having your own voice in the government that makes the laws",
    method: "Put events in order (cause → effect) and match each to its result.",
    hints: ["War debt → new taxes → protests → fighting → independence.", "Colonists had no representatives in Parliament.", "Jefferson wrote that people have rights to life, liberty and the pursuit of happiness."],
    items: [
      { q: "Why did Britain begin taxing the colonies after 1763?", a: "to pay debts from the French and Indian War", w: ["to pay for building the Erie Canal across New York", "to fund the colonies' new schools", "to buy Louisiana from France"], why: "The war was expensive, and Britain wanted the colonies to help pay for it." },
      { q: "What did \"No taxation without representation\" mean?", a: "Colonists shouldn't be taxed without a voice in Parliament.", w: ["Colonists should never pay any taxes to anyone at all, ever.", "Only the king should be allowed to vote.", "Taxes should be paid in tea, not money."], why: "Colonists had no elected representatives in Parliament, the body that taxed them." },
      { q: "What did the Stamp Act of 1765 tax?", a: "printed paper like newspapers and legal documents", w: ["tea shipped from India", "land owned by farmers", "enslaved people brought to the colonies from Africa"], why: "Printed materials needed an official stamp, which cost money." },
      { q: "What happened at the Boston Tea Party in 1773?", a: "Colonists dumped British tea into the harbor.", w: ["Colonists held a party to thank the king.", "British soldiers fired on a crowd.", "Delegates signed the Declaration."], why: "Protesters threw 342 chests of tea into Boston Harbor to protest the tea tax." },
      { q: "Where were the first shots of the American Revolution fired in 1775?", a: "Lexington and Concord", w: ["Yorktown", "Saratoga", "Philadelphia and New York"], why: "Fighting between militia and British troops began in Massachusetts in April 1775." },
      { q: "Who was the main author of the Declaration of Independence?", a: "Thomas Jefferson", w: ["George Washington", "Benjamin Franklin", "Alexander Hamilton"], why: "Jefferson wrote the draft; Congress approved it on July 4, 1776." },
      { q: "Which rights does the Declaration of Independence say all people have?", a: "life, liberty and the pursuit of happiness", w: ["land, gold and a seat in the British Parliament", "free food, housing and schooling", "the right to be king or queen"], why: "These are the \"unalienable rights\" Jefferson listed." },
      { q: "What was Thomas Paine's pamphlet Common Sense (1776) arguing for?", a: "independence from Britain", w: ["peace with the British king", "a new tax on tea", "returning New York to the Dutch"], why: "It persuaded many colonists that breaking away from Britain made sense." },
      { q: "In the Boston Massacre of 1770, what happened?", a: "British soldiers shot and killed five colonists.", w: ["Colonists destroyed a British fort.", "The king visited Boston for the first time.", "Boston declared itself a free city."], why: "Soldiers fired into a crowd; patriots used the event to rally support." },
      { q: "Which event came FIRST?", a: "the Stamp Act", w: ["the Boston Tea Party", "Lexington and Concord", "the Declaration of Independence"], why: "Order: Stamp Act (1765), Tea Party (1773), Lexington and Concord (1775), Declaration (1776)." },
      { q: "What were the Intolerable Acts of 1774?", a: "laws punishing Massachusetts for the Tea Party", w: ["laws that ended all taxes on the colonies", "laws giving colonists seats in Parliament", "rules for the new United States Congress"], why: "Britain closed Boston Harbor and limited self-government in Massachusetts." }
    ] });

  lesson({ id: "ss7-rev-war", title: "Winning the Revolution", std: "7.3", emo: "⚔️", topic: /saratoga|valley forge|yorktown|treaty of paris|loyalist|patriot|washington/,
    learn: ["The Continental Army, led by GEORGE WASHINGTON, fought the much stronger British army. Many colonists were PATRIOTS; others, called LOYALISTS, stayed loyal to the king.",
            "The American victory at SARATOGA, New York (1777) was the turning point: it convinced France to join the war on the American side. The British surrendered at YORKTOWN in 1781, and the TREATY OF PARIS (1783) recognized American independence."],
    vocab: "turning point = the moment things began to change for good",
    method: "Connect each battle or event to its result.",
    hints: ["Saratoga → France joins. Yorktown → British surrender.", "Loyalists supported the king; Patriots supported independence.", "Valley Forge was a hard winter, not a battle."],
    items: [
      { q: "Why is the Battle of Saratoga (1777) called the turning point of the Revolution?", a: "It convinced France to join on the American side.", w: ["It was the last battle of the war.", "It was where the war first began.", "It was where Washington was captured by the British."], why: "The win showed the Americans could beat the British, so France became an ally." },
      { q: "In which state was the Battle of Saratoga fought?", a: "New York", w: ["Virginia", "Massachusetts", "Pennsylvania"], why: "Saratoga is north of Albany, in New York." },
      { q: "Who commanded the Continental Army?", a: "George Washington", w: ["Thomas Jefferson", "Benedict Arnold", "John Adams"], why: "The Continental Congress chose Washington in 1775." },
      { q: "What were Loyalists?", a: "colonists who stayed loyal to the British king", w: ["soldiers in the Continental Army", "French sailors who helped the Americans win at sea", "members of the Haudenosaunee"], why: "Loyalists (Tories) opposed independence." },
      { q: "What happened at Valley Forge in the winter of 1777–1778?", a: "Washington's army suffered but trained and grew stronger.", w: ["The British surrendered to the Americans.", "The Declaration of Independence was signed by Congress.", "The war's first shots were fired."], why: "Soldiers faced cold, hunger and disease, but drilling made them a better army." },
      { q: "Where did the British army surrender in 1781, effectively ending the fighting?", a: "Yorktown, Virginia", w: ["Saratoga, New York", "Boston, Massachusetts", "Trenton, New Jersey"], why: "American and French forces trapped the British at Yorktown." },
      { q: "What did the Treaty of Paris of 1783 do?", a: "Britain recognized American independence.", w: ["The colonies rejoined Britain.", "France took over New York.", "It created the U.S. Constitution and Bill of Rights."], why: "The treaty officially ended the war and set the new nation's borders." },
      { q: "Which country became America's most important ally in the Revolution?", a: "France", w: ["Spain", "Russia", "the Netherlands"], why: "France sent money, soldiers and a navy, which helped win at Yorktown." },
      { q: "Which city did the British hold for most of the war, until 1783?", a: "New York City", w: ["Albany", "Philadelphia", "Boston"], why: "The British captured New York City in 1776 and stayed until 1783." },
      { q: "Why was it surprising that the Americans won?", a: "Britain had a larger, better-trained army and navy.", w: ["The Americans had a much bigger, better-trained army.", "Britain had no soldiers in America.", "The war lasted only a few weeks."], why: "Britain was a world power; the Americans relied on determination, allies and knowledge of the land." }
    ] });

  lesson({ id: "ss7-constitution", title: "Articles of Confederation & the Constitution", std: "7.4", emo: "📜", topic: /constitution|articles|convention|compromise|federalist|bill of rights/,
    learn: ["The first plan of government, the ARTICLES OF CONFEDERATION, made Congress too weak: it couldn't tax, had no president and no national courts. SHAYS' REBELLION (1786–87) showed the danger.",
            "In 1787 delegates wrote the CONSTITUTION in Philadelphia. The GREAT COMPROMISE created two houses of Congress. Federalists supported it; Anti-Federalists wanted a BILL OF RIGHTS, which was added in 1791."],
    vocab: "compromise = each side gives up something to reach agreement",
    method: "Match each problem or idea to the solution it led to.",
    hints: ["Articles' big weakness: Congress couldn't collect taxes.", "Great Compromise: Senate = equal votes per state; House = based on population.", "The Federalist Papers were written to get New York to ratify."],
    items: [
      { q: "What was a major weakness of the Articles of Confederation?", a: "Congress could not collect taxes.", w: ["The president had too much power.", "The national courts were too strong.", "States had no power at all."], why: "Without taxes, the national government couldn't pay its debts or an army." },
      { q: "What did Shays' Rebellion (1786–87) show many leaders?", a: "The national government was too weak.", w: ["The king should return to power.", "The states needed fewer farmers.", "The Constitution was already working."], why: "Congress couldn't raise an army to stop the farmers' uprising, which alarmed leaders." },
      { q: "Where was the Constitution written in 1787?", a: "Philadelphia", w: ["New York City", "Boston", "Washington, D.C."], why: "The Constitutional Convention met at Independence Hall." },
      { q: "What did the Great Compromise create?", a: "a Senate with equal votes and a House based on population", w: ["a single house of Congress where each state has one vote", "a king who shares power with Congress", "a Congress chosen by the Supreme Court"], why: "It satisfied both small states (equal Senate) and large states (House by population)." },
      { q: "What did Anti-Federalists want added to the Constitution?", a: "a bill of rights", w: ["a king", "more taxes", "a national church"], why: "They feared a strong government would take away people's rights." },
      { q: "What is the Bill of Rights?", a: "the first ten amendments to the Constitution", w: ["the list of the first ten presidents", "the rules for the House of Representatives", "the Declaration of Independence"], why: "Ratified in 1791, it protects freedoms like speech and religion." },
      { q: "Who wrote the Federalist Papers to persuade New Yorkers to ratify the Constitution?", a: "Hamilton, Madison and Jay", w: ["Jefferson, Adams and Paine", "Washington, Franklin and Henry", "Lincoln, Douglass and Grant"], why: "The essays were published in New York newspapers in 1787–88." },
      { q: "How did the Three-Fifths Compromise count enslaved people?", a: "as three-fifths of a person for representation", w: ["as full citizens who could vote in every election", "as not counted at all", "as two people for taxes"], why: "Southern and Northern delegates compromised on how to count enslaved people for seats in the House." },
      { q: "Under the Articles of Confederation, how many votes did each state have in Congress?", a: "one", w: ["two", "one per 30,000 people", "as many as it wanted"], why: "Every state had one vote, no matter its size." },
      { q: "What was a Federalist?", a: "someone who supported the new Constitution", w: ["someone who wanted to keep the Articles", "someone loyal to the British king", "someone who opposed any government"], why: "Federalists supported a stronger national government under the Constitution." },
      { q: "In what year did New York ratify the Constitution?", a: "1788", w: ["1776", "1791", "1812"], why: "New York ratified in July 1788, after a close debate." }
    ] });

  lesson({ id: "ss7-government", title: "The Constitution in action", std: "7.5", emo: "🏛️", topic: /branch|checks and balances|veto|amendment|first amendment|federalism|supreme court|congress|president/,
    learn: ["The Constitution splits power among three BRANCHES: the LEGISLATIVE (Congress) makes laws, the EXECUTIVE (President) carries them out, and the JUDICIAL (courts) decides what laws mean.",
            "CHECKS AND BALANCES let each branch limit the others: the President can veto a bill, Congress can override a veto with two-thirds of each house, and courts can rule a law unconstitutional. FEDERALISM splits power between the national and state governments."],
    vocab: "checks and balances = no branch gets too much power",
    method: "Name the branch involved, then what power it is using.",
    hints: ["Congress = laws. President = carries them out. Courts = interpret them.", "Veto and override are checks between Congress and the President.", "The First Amendment protects speech, religion, press, assembly and petition."],
    items: [
      { q: "Which branch of government makes laws?", a: "the legislative branch", w: ["the executive branch", "the judicial branch", "the military"], why: "Congress, the legislative branch, writes and passes laws." },
      { q: "Which branch interprets laws and decides if they follow the Constitution?", a: "the judicial branch", w: ["the legislative branch", "the executive branch", "the state governors"], why: "The courts, led by the Supreme Court, interpret laws." },
      { q: "The President vetoes a bill passed by Congress. What is this an example of?", a: "checks and balances", w: ["federalism", "the Bill of Rights", "popular sovereignty"], why: "The executive branch is checking the legislative branch." },
      { q: "How can Congress pass a law after the President vetoes it?", a: "with a two-thirds vote in both houses", w: ["with a simple majority in the Senate", "by asking the Supreme Court to sign it", "by waiting one year and trying again"], why: "A two-thirds vote in the House and Senate overrides a veto." },
      { q: "Which freedom does the First Amendment protect?", a: "freedom of speech", w: ["the right to bear arms", "the right to a jury trial", "freedom from unfair searches"], why: "The First Amendment covers speech, religion, press, assembly and petition." },
      { q: "What is federalism?", a: "sharing power between national and state governments", w: ["giving all power to the President", "letting the courts make every law for the whole country", "having no government at all"], why: "Some powers belong to the nation, some to the states, and some are shared." },
      { q: "Where was George Washington inaugurated as the first President in 1789?", a: "New York City", w: ["Washington, D.C.", "Philadelphia", "Boston"], why: "New York City was the nation's first capital; he took the oath at Federal Hall." },
      { q: "What did the Supreme Court case Marbury v. Madison (1803) establish?", a: "the power of courts to strike down laws", w: ["the right of women to vote", "the end of slavery in the Northern states", "the purchase of Louisiana"], why: "It established judicial review." },
      { q: "Who must approve a treaty the President makes with another country?", a: "the Senate", w: ["the Supreme Court", "the House only", "the state governors"], why: "Two-thirds of the Senate must approve treaties, another check on the President." },
      { q: "How can the Constitution be changed?", a: "through the amendment process", w: ["by a decision of the President alone", "by a vote of one state legislature", "it can never be changed"], why: "Amendments need approval from Congress and three-fourths of the states." },
      { q: "Which branch is headed by the President?", a: "the executive branch", w: ["the legislative branch", "the judicial branch", "the state branch"], why: "The President leads the executive branch, which carries out laws." }
    ] });

  lesson({ id: "ss7-expansion", title: "Westward expansion & reform", std: "7.6, 7.7", emo: "🗺️", topic: /louisiana|lewis and clark|manifest destiny|erie canal|trail of tears|seneca falls|abolition|reform|westward/,
    learn: ["The United States grew fast: the LOUISIANA PURCHASE (1803) doubled its size, the ERIE CANAL (1825) linked the Great Lakes to New York City, and \"MANIFEST DESTINY\" pushed settlers west. Expansion came at a terrible cost to Native Americans, including the TRAIL OF TEARS.",
            "Reformers worked to improve society. New York was a center of reform: the SENECA FALLS CONVENTION (1848) launched the women's rights movement, and abolitionists like Frederick Douglass, Sojourner Truth and Harriet Tubman fought slavery."],
    vocab: "reform = changing society to make it better",
    method: "Match each event or person to what it changed.",
    hints: ["Louisiana Purchase = bought from France in 1803.", "Seneca Falls = women's rights. Abolition = ending slavery.", "Manifest Destiny = the belief the U.S. should stretch to the Pacific."],
    items: [
      { q: "From which country did the United States buy the Louisiana Territory in 1803?", a: "France", w: ["Spain", "Britain", "Mexico"], why: "President Jefferson bought it from Napoleon's France." },
      { q: "What effect did the Louisiana Purchase have on the United States?", a: "It roughly doubled the nation's size.", w: ["It gave the nation its first coastline.", "It ended the War of 1812.", "It made New York the capital."], why: "The territory stretched from the Mississippi River to the Rocky Mountains." },
      { q: "Who explored the Louisiana Territory from 1804 to 1806?", a: "Lewis and Clark", w: ["Hamilton and Burr", "Douglass and Tubman", "Stanton and Anthony"], why: "Meriwether Lewis and William Clark led the Corps of Discovery to the Pacific." },
      { q: "What was Manifest Destiny?", a: "the belief that the U.S. should expand to the Pacific", w: ["a law that ended slavery in the West", "a treaty that gave land back to Native American nations", "a plan to return land to Britain"], why: "Many Americans believed it was the nation's destiny to spread across the continent." },
      { q: "What was the Trail of Tears?", a: "the forced removal of the Cherokee from their lands", w: ["a canal from Albany to Buffalo", "a route used by gold miners", "a railroad built across the whole country to the Pacific"], why: "Under the Indian Removal Act, thousands of Cherokee died on the forced march west in 1838–39." },
      { q: "Which two places did the Erie Canal connect?", a: "the Hudson River and Lake Erie", w: ["Boston and Philadelphia", "the Pacific and the Atlantic", "the Mississippi and the Ohio"], why: "It ran from Albany to Buffalo, linking the Great Lakes to New York City." },
      { q: "What was the main goal of the 1848 Seneca Falls Convention in New York?", a: "women's rights, including the right to vote", w: ["ending the war with Mexico", "building the Erie Canal", "moving the state capital from New York City to Albany"], why: "Elizabeth Cady Stanton and others wrote the Declaration of Sentiments there." },
      { q: "What did abolitionists want?", a: "to end slavery", w: ["to end all taxes", "to expand to the Pacific", "to bring back the king"], why: "Abolition means ending slavery." },
      { q: "Frederick Douglass published his antislavery newspaper, The North Star, in which New York city?", a: "Rochester", w: ["Albany", "Buffalo", "Syracuse"], why: "Douglass lived and worked in Rochester for many years." },
      { q: "Sojourner Truth, a famous speaker for abolition and women's rights, was born into slavery in which state?", a: "New York", w: ["Georgia", "Virginia", "Alabama"], why: "She was born enslaved in Ulster County, New York, and gained her freedom in the 1820s." },
      { q: "What did the United States gain after the Mexican-American War (1846–1848)?", a: "a large area of land including California", w: ["the Louisiana Territory", "the colony of New Netherland from the Dutch", "control of Canada"], why: "The Mexican Cession included California and much of the Southwest." }
    ] });

  lesson({ id: "ss7-civil-war", title: "A nation divided: the Civil War", std: "7.8", emo: "🇺🇸", topic: /civil war|lincoln|emancipation|gettysburg|secession|confedera|union|slavery|reconstruction/,
    learn: ["The North and South argued for decades over SLAVERY and whether it could spread into new territories. After Abraham Lincoln was elected in 1860, Southern states SECEDED and formed the Confederacy. The war began at FORT SUMTER in 1861.",
            "Lincoln's EMANCIPATION PROCLAMATION (1863) declared enslaved people in the rebelling states free. GETTYSBURG (1863) was a turning point, the war ended at APPOMATTOX in 1865, and the 13TH AMENDMENT abolished slavery."],
    vocab: "secede = to formally leave a nation",
    method: "Place each event in the timeline and connect it to its cause or effect.",
    hints: ["The central cause: slavery and its spread west.", "1861 Fort Sumter → 1863 Emancipation & Gettysburg → 1865 Appomattox & 13th Amendment.", "The Union was the North; the Confederacy was the South."],
    items: [
      { q: "What was the central issue that divided the North and South before the Civil War?", a: "slavery and whether it could spread west", w: ["the location of the nation's capital", "trade with France and Spain", "the building of the Erie Canal"], why: "Conflicts over slavery in new territories pushed the nation toward war." },
      { q: "What event led Southern states to secede in 1860–61?", a: "the election of Abraham Lincoln", w: ["the Louisiana Purchase", "the Seneca Falls Convention", "the Battle of Saratoga"], why: "Southern leaders believed Lincoln would act against slavery." },
      { q: "Where were the first shots of the Civil War fired in April 1861?", a: "Fort Sumter, South Carolina", w: ["Gettysburg, Pennsylvania", "Appomattox, Virginia", "Saratoga, New York"], why: "Confederate forces fired on the Union fort in Charleston Harbor." },
      { q: "What did the Emancipation Proclamation (1863) do?", a: "declared enslaved people in rebelling states free", w: ["ended the Civil War right away", "gave women the right to vote", "made Lincoln president for life after the war"], why: "It freed enslaved people in Confederate states and allowed Black men to join the Union Army." },
      { q: "Which 1863 battle is considered a major turning point of the war?", a: "Gettysburg", w: ["Fort Sumter", "Yorktown", "Lexington"], why: "The Union victory ended the Confederacy's last major invasion of the North." },
      { q: "Where did Robert E. Lee surrender to Ulysses S. Grant in 1865?", a: "Appomattox Court House, Virginia", w: ["Fort Sumter in Charleston, South Carolina", "Gettysburg, Pennsylvania", "Washington, D.C."], why: "Lee's surrender in April 1865 effectively ended the war." },
      { q: "Which amendment abolished slavery in the United States?", a: "the 13th Amendment", w: ["the 1st Amendment", "the 10th Amendment", "the 19th Amendment"], why: "Ratified in 1865, it ended slavery everywhere in the country." },
      { q: "What did the Fugitive Slave Act of 1850 require?", a: "returning people who escaped slavery to enslavers", w: ["freeing every enslaved person in the North", "paying formerly enslaved people for their work", "ending the slave trade with Africa"], why: "It required Northerners to help capture people who had escaped, angering many." },
      { q: "In 1863, angry crowds protested the military draft in which city, in one of the worst riots in U.S. history?", a: "New York City", w: ["Albany", "Atlanta", "Richmond, Virginia"], why: "The New York City Draft Riots turned violent, and many Black New Yorkers were attacked." },
      { q: "Which side was called the Union?", a: "the Northern states", w: ["the Southern states", "the Western territories", "Britain and France"], why: "The Union was the United States government and the states that stayed loyal; the South formed the Confederacy." },
      { q: "What did the Dred Scott decision (1857) rule?", a: "Enslaved people were not citizens and couldn't sue.", w: ["Slavery was banned in every state.", "Women could vote in every national election from then on.", "The South could leave the Union."], why: "The Supreme Court ruling deepened the conflict over slavery." }
    ] });

  /* 3e33: more questions for every lesson */
  var MORE = {
    "ss7-native": [
      { q: "Which Haudenosaunee nation kept the central council fire, where the Grand Council met?", a: "the Onondaga", w: ["the Mohawk", "the Seneca", "the Lenape"], why: "The Onondaga, in the middle of Haudenosaunee lands, were the \"Keepers of the Central Fire.\"" },
      { q: "Which nation, living farthest west, was called the \"Keepers of the Western Door\"?", a: "the Seneca", w: ["the Mohawk", "the Oneida", "the Cayuga"], why: "The Seneca guarded the western edge of Haudenosaunee lands; the Mohawk guarded the eastern door." },
      { q: "How do many scientists think the first people reached the Americas?", a: "by crossing a land bridge from Asia", w: ["by sailing across from Europe", "by walking all the way from Africa", "by rafting from Australia"], why: "During the Ice Age, a land bridge (Beringia) linked Asia and Alaska. Many Native nations also have their own origin stories." }
    ],
    "ss7-colonies": [
      { q: "Who was the Dutch leader of New Netherland when the English took it in 1664?", a: "Peter Stuyvesant", w: ["Henry Hudson", "John Smith", "William Penn"], why: "Stuyvesant surrendered New Amsterdam to the English without a fight." },
      { q: "Why did the Pilgrims settle at Plymouth?", a: "to practice their religion freely", w: ["to search for gold and silver", "to trade furs with the Dutch", "to build a new port for England"], why: "They left England to worship in their own way." },
      { q: "Henry Hudson explored the river that now bears his name in 1609. Which country was he sailing for?", a: "the Netherlands", w: ["England", "Spain", "the Kingdom of France"], why: "His voyage for the Dutch led to the colony of New Netherland." }
    ],
    "ss7-road-rev": [
      { q: "What did the Proclamation of 1763 do?", a: "It banned settling west of the Appalachians.", w: ["It ended taxes on tea and paper.", "It declared the thirteen colonies independent.", "It gave land to every colonist."], why: "Britain wanted to avoid more wars with Native nations; colonists were angry." },
      { q: "Where did the First Continental Congress meet in 1774?", a: "Philadelphia", w: ["New York City", "Boston", "Albany"], why: "Delegates from 12 colonies met to respond to the Intolerable Acts." },
      { q: "Who were the Sons of Liberty?", a: "a group that organized protests against British taxes", w: ["soldiers who fought for the British king", "the first members of the U.S. Senate", "Dutch settlers who ran the colony of New Amsterdam"], why: "They led protests such as the Boston Tea Party." }
    ],
    "ss7-rev-war": [
      { q: "Which American general plotted to hand the fort at West Point, New York, to the British?", a: "Benedict Arnold", w: ["Nathanael Greene", "Henry Knox", "John Paul Jones"], why: "Arnold's plot was discovered in 1780, and his name came to mean \"traitor.\"" },
      { q: "Why did the British want to control the Hudson River?", a: "to cut New England off from the other colonies", w: ["to reach the gold and silver mines of Canada", "to build the Erie Canal faster", "to stop trade with the Dutch"], why: "Holding the river would split the colonies in two." },
      { q: "Who wrote \"These are the times that try men's souls\" to encourage American soldiers?", a: "Thomas Paine", w: ["Thomas Jefferson", "Patrick Henry", "John Hancock"], why: "It opens The American Crisis, written in December 1776." }
    ],
    "ss7-constitution": [
      { q: "Who is called the \"Father of the Constitution\"?", a: "James Madison", w: ["George Washington", "Benjamin Franklin", "John Jay"], why: "Madison drafted much of the plan and took careful notes at the Convention." },
      { q: "How many states had to ratify the Constitution before it took effect?", a: "nine", w: ["all thirteen", "seven", "five"], why: "Nine of the thirteen states had to approve it." },
      { q: "Which New Yorker co-wrote the Federalist Papers and became the first Secretary of the Treasury?", a: "Alexander Hamilton", w: ["John Adams", "Aaron Burr", "DeWitt Clinton"], why: "Hamilton argued for a strong national government." }
    ],
    "ss7-government": [
      { q: "How many senators does each state have?", a: "two", w: ["one", "it depends on population", "four"], why: "Every state has two senators, no matter its size." },
      { q: "How old must a person be to become President?", a: "at least 35", w: ["at least 18", "at least 25", "at least 50"], why: "The Constitution sets the minimum age at 35." },
      { q: "Which amendment protects people from unreasonable searches by the government?", a: "the 4th Amendment", w: ["the 1st Amendment", "the 13th Amendment", "the 19th Amendment"], why: "The 4th Amendment generally requires a warrant for searches." }
    ],
    "ss7-expansion": [
      { q: "In what year did the Erie Canal open?", a: "1825", w: ["1776", "1803", "1861"], why: "It opened in 1825, linking Albany and Buffalo." },
      { q: "Who organized the Seneca Falls Convention with Lucretia Mott?", a: "Elizabeth Cady Stanton", w: ["Susan B. Anthony", "Harriet Tubman", "Dolley Payne Todd Madison"], why: "Stanton wrote the Declaration of Sentiments. Susan B. Anthony joined the movement a few years later." },
      { q: "What was the Underground Railroad?", a: "a secret network helping people escape slavery", w: ["a subway built under New York City", "a railroad that carried gold from the West", "a tunnel under the Erie Canal"], why: "It was a network of people and safe houses, not a real railroad." }
    ],
    "ss7-civil-war": [
      { q: "Who was President of the Confederacy?", a: "Jefferson Davis", w: ["Robert E. Lee", "Andrew Johnson", "Stonewall Jackson"], why: "Davis led the Confederate government; Lee commanded its main army." },
      { q: "What did Lincoln's Gettysburg Address (1863) do?", a: "honored the fallen and the ideal of equality", w: ["announced the end of the Civil War", "declared war on the Confederacy", "freed all enslaved people across the country right away"], why: "Lincoln spoke of a nation \"dedicated to the proposition that all men are created equal.\"" },
      { q: "Which was an advantage the North had in the Civil War?", a: "more factories, railroads and people", w: ["more experienced generals at first", "fighting mostly on its own land", "a much warmer climate"], why: "The North's industry and population helped it outlast the South." }
    ]
  };
  L.forEach(function (l) { if (MORE[l.id]) l.items = l.items.concat(MORE[l.id]); });

  /* Interactive chronological timeline items appended after MORE so existing std-why-* indices stay intact */
  var RICH = {
    "ss7-road-rev": [
      { __noClip: true, type: "order", q: "Put these causes of the American Revolution in CHRONOLOGICAL order (earliest → latest):",
        orderItems: ["Stamp Act (1765)", "Boston Tea Party (1773)", "Lexington & Concord (1775)", "Declaration of Independence (1776)"],
        why: "Taxes (1765) led to protests (1773), fighting (1775), and then formal independence (1776)." }
    ],
    "ss7-rev-war": [
      { __noClip: true, type: "order", q: "Put these Revolutionary War turning points in CHRONOLOGICAL order (earliest → latest):",
        orderItems: ["Battle of Saratoga (1777)", "Winter at Valley Forge (1777–78)", "British surrender at Yorktown (1781)", "Treaty of Paris (1783)"],
        why: "Saratoga brought France into the war (1777), followed by Valley Forge, Yorktown (1781), and the Treaty of Paris (1783)." }
    ],
    "ss7-civil-war": [
      { __noClip: true, type: "order", q: "Put these Civil War events in CHRONOLOGICAL order (earliest → latest):",
        orderItems: ["Fort Sumter (1861)", "Emancipation Proclamation (1863)", "Surrender at Appomattox (1865)", "13th Amendment ratified (Dec 1865)"],
        why: "Fighting began at Fort Sumter (1861), Emancipation came in 1863, Lee surrendered in April 1865, and the 13th Amendment followed in December 1865." }
    ]
  };
  L.forEach(function (l) { if (RICH[l.id]) l.items = l.items.concat(RICH[l.id]); });

  if (window.HootStudy && window.HootStudy.addBankCourse) {
    window.HootStudy.addBankCourse({ id: "ss7", title: "Grade 7 social studies · full course", emo: "🗽", color: "#9A3412", subject: "Grade 7 social studies", again: "new questions", review: "Social studies review: mixed practice" }, L);
  }
})();
