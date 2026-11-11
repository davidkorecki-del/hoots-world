# Feature Explainer Reels — 1.2 Feature Set · FINAL QA report (v4, real-footage rebuild)
Built 2026-11-10/11 ET · Agency gate · Nothing posted to Instagram.

## ⚠️ What changed and why (read first — three superseded sets)
- **v1 (original brief, 3 Reels: Verse Maker / Kids' Bible / Reading Road)** — built from Grok's two example videos, QA-passed, then SUPERSEDED. Files in `v1-superseded/` (+ captions/covers in `v2-dropped/`).
- **v2 (story-first steer)** — AI-person scenes; killed mid-build by the 1.2 correction. Partials in `v2-dropped/`.
- **v3 (Grok's official 1.2 package)** — the FOUR true 1.2 features, but the human scenes were AI-generated people. Dawid's standing rule (2026-11-10 verdict: both short-Reel versions rejected) bans AI people as visible subjects — so v3 was archived to `v3-aipeople/` and is NOT the deliverable.
- **v4 (THIS set, root of this folder)** — same 4 features, scripts, narration and screens as v3; every human moment is now REAL licensed stock footage (Pexels, free license) or a real tracked phone-in-hands shot. **CORRECTIONS APPLIED from feature-list.md:** Verse Maker and Lock Screen dropped (already live in 1.0 — not new; never pitch as new); Reading Road dropped as a "new feature" Reel; 1.2 is NOT submitted to Apple and NOT awaiting approval — no such language anywhere; public wording is exactly "Coming soon", no dates, no launch/available language.

## The four Reels
Narration: adult voice avocado_v2:qvd_03858, sentence-by-sentence TTS. Persistent "LONG ROAD · COMING SOON" footer (ink ends y≈1509 ≤1516) + end card (app icon, "The road is long. You don't walk it alone.", "COMING SOON TO THE APP STORE"). No Bella anywhere (the F2 girl-playing screen's Bella/Michael voice-picker area is cropped out — the Reel uses lrk-playing-safe / the Genesis top crop). @iwishhewood never tagged.

### Narration scripts (verbatim)
- **F1 Bible Stories:** "Bedtime used to be a battle. / Now she picks the story, presses play, and hears it told in a kid's own voice. / Fifty Bible stories, read or listened to, in a girl's voice or a boy's. / Bible Stories. In Long Road. Coming soon." — Claims discipline: never claims all 50 play in both voices (Boy stories 17 & 27 are text-only; copy avoids the claim).
- **F2 Long Road Kids:** "Kids hear the words, but they don't always get them. / So the whole Bible is retold here, every book, in words kids can understand. / And when they're ready, one tap shows the Bible wording itself. / Long Road Kids. Coming soon." — Claims discipline: the retold TEXT is the whole Bible (66 books); never claims the whole kids Bible is kid-voice narrated (only part has audio so far).
- **F3 Friend Groups:** "Reading the Bible alone is hard. Reading it together isn't. / Start a private group, up to twelve friends, and walk the year side by side. / You see each other's days and streaks, and there's a chat to cheer each other on. / Friend Groups. In Long Road. Coming soon." — Demo screens only; no real names in copy/captions.
- **F4 Daily Verse:** "Some verses you read three times, and they still don't land. / Now every day's verse opens up: what it means, the story behind it, / and what it looks like in real life, today. / The Daily Verse, explained. In Long Road. Coming soon."

## QA gate — all four PASS (measured on the delivered v4 files, qaR/qa_numbers.json)
| Check | Spec | F1 Stories | F2 LR Kids | F3 Groups | F4 Verse |
|---|---|---|---|---|---|
| Duration | 15–25s | 20.43s ✅ | 20.27s ✅ | 22.47s ✅ | 20.93s ✅ |
| Audio gap beyond total | <0.1s | 0.061 ✅ | 0.031 ✅ | 0.063 ✅ | 0.053 ✅ |
| Voice coverage | ≥85% (target ~99%) | 98.3% ✅ | 98.3% ✅ | 98.5% ✅ | 98.3% ✅ |
| Silence −60 dB pre-card | no gap ≥0.3s | none at all ✅ | none ✅ | none ✅ | none ✅ |
| Loudness | −16 LUFS ±0.5 | −15.67 ✅ | −15.83 ✅ | −16.23 ✅ | −15.83 ✅ |
| True peak | ≤ −1.5 dBTP | −1.99 ✅ | −2.00 ✅ | −2.00 ✅ | −1.99 ✅ |
| Specs | 1080×1920 H.264 yuv420p faststart | ✅ | ✅ | ✅ | ✅ |
| Size | <20 MB | 2.63 MB ✅ | 3.04 MB ✅ | 3.70 MB ✅ | 4.06 MB ✅ |
| STT diff (faster-whisper base.en) | report | 97.7% — heard "listen" for "listened" | 100.0%, 0 diffs | 97.9% — heard "12" for "twelve" (same word) | 100.0%, 0 diffs |
| Frames hook/25/50/75/end | inspected | ✅ | ✅ | ✅ | ✅ |

## Per-Reel shot provenance (Dawid's no-AI-people rule)
- **F1 Bible Stories:** REAL stock footage of a real mother reading to her daughter in warm lamplight (Pexels 12750784, Mizuno K, free license) → then a REAL in-hand shot: real hands holding a real phone (Pexels 6278955, Artem Podrez), with the official story screen (stories-playing-crop, bottom tab-bar cropped) composited onto the phone's screen, tracked frame-by-frame to the phone's real movement (screen-drift measured from the footage itself). Composited screens: 1. AI people: 0.
- **F2 Long Road Kids:** REAL stock footage of the same real mother & daughter reading together (Pexels 12761062, Mizuno K) → then the Genesis screen (lrk-genesis-top: Day 1 art, "BOOK 1 OF 66", Genesis 1–3, "Show Bible wording (WEB)" toggle) full-frame over its own blurred backdrop, tour-style as Grok's tour presents screens.
- **F3 Friend Groups:** REAL stock footage, café table close — real hands and coffee cups (Pexels 4828603, cottonbro studio; cropped to the hands/table region) → the two official DEMO screens full-frame (friend-groups-main "Tuesday Study · 4 of 12 people", friend-groups-members with streaks) — the only place people appear is real hands/real coffee.
- **F4 Daily Verse:** REAL stock footage of two real friends talking over coffee (Pexels 6944312, George Milton) → the full-explanation screen crop ("What it means" region) full-frame.
- End cards, footer, captions: graphic overlays (no people). Stock attributions: Pexels free license, no attribution required; IDs recorded here for the gate.

## Side-by-side feel vs Grok's two reference videos (the story-first bar, honest)
Grok's references: warm natural grade, gentle pacing, ONE human moment carried through, the app screen physically in the scene in a hand.
- **F1 — MATCHES.** One bedtime arc (battle → story playing), one scene change, and the screen is literally in real hands, moving with them. Closest of the four to Grok's hospital-break shot.
- **F2 — MATCHES on feel, with one honest gap:** the screen is NOT physically in the scene — the real footage is a picture-book moment (no phone in it), so the Genesis screen arrives as a tour-style full-frame cut, exactly as Grok's own tour presents screens. The warmth and single-arc pacing match; the in-hand physicality does not.
- **F3 — PARTIAL.** The café opening is hands/coffee only (no faces — deliberate, per the rule's fallback) and the screens carry the middle. Warm and calm, but it reads more "tour with a real intro" than Grok's carried human moment.
- **F4 — PARTIAL, and the weakest of the four.** The café footage loops (10s clip stretched over ~18s of narration), so the same two shots repeat before the screen arrives; the repetition is visible if you watch for it. One arc, real people, warm grade — but the loop is a real flaw, stated plainly. If the gate wants one fix from this set, it is F4: a longer café clip (or a second angle) kills the loop.

## Known minor items (flagged, not hidden)
1. F1's composited screen keeps a thin white sliver of the phone's original blank screen at its right edge, and the caption sits above the phone (top band) so nothing covers the story text. The sliver reads as the phone's own bezel/glow in motion.
2. F2/F4: bottom-band captions pass over the footer line during fade moments (the known house caption/footer overlap) — legible in every inspected frame, never on the end card.
3. The stock mother/daughter pair is the same family across F1 and F2 (two clips of one shoot) — reads as intentional continuity across the two kids Reels.
4. End-card wording "COMING SOON TO THE APP STORE" is the house end card inherited from the tour's own brand close; 1.2 itself is not submitted/awaiting approval — no such claim is made anywhere in the set.

## Covers / grid tones (measured, grid-plan cycle LIGHT-WARM → COOL → DARK-WARM)
- cover-stories.png — DARK-WARM (lum 57): story screen in real hands.
- cover-lrk.png — DARK-WARM (lum ~70): Genesis, Book 1 of 66.
- cover-groups.png — LIGHT-WARM (lum 117): Friend Groups demo screen.
- cover-verse.png — LIGHT-WARM (lum 96): friends over coffee.
Note for the calendar: the set is warm-heavy (2× dark-warm, 2× light-warm, no cool cell) — slot them against the slate's cool cells (e.g. Ps 46 rapids) to keep the checkerboard.
