# QA Report — Gate Delivery Nov 11 (Long Road Instagram)

## Reel 1 re-render — Psalm 46 (Nov 13) · `reel1-nov13-psalm46.mp4`

Rebuilt from the Round 3 v3 pipeline (same generated clips, beats, grade, bed,
loudnorm chain) with the merged-standard fixes. Voice: adult storytelling
avocado_v2:qvd_03858, speed 100 (unchanged from v3).

**What changed vs v3**
- Selection unchanged: Psalm 46 vv.1–7, 10–11.
- "Yahweh of Armies" → **"the LORD of Armies"** in narration AND on-screen captions (both refrains, vv.7 and 11).
- **"Selah" restored at all three WEB positions** (after vv.3, 7, 11). v3 omitted all three; the task brief flagged only the v.11 occurrence — WEB verification (BibleGateway WEB, fetched 2026-11-11) showed Selah also closes vv.3 and 7, and the standard ("Selah kept wherever it occurs") was applied to all three.
- **Persistent footer** "LONG ROAD · COMING SOON" (tracked gold caps, house style) over the whole 63.29s main runtime; end card still carries "Coming soon".
- **Honest credit line** on the final phrase: PSALM 46 — WEB (NAME RENDERED AS "THE LORD").
- Posting caption (nov13-reel1-caption.md) updated the same way (v3's caption still read "Yahweh of Armies").

**Exact narration text used** (155 words; also in work/narration-text.txt):
"Psalm 46. God is our refuge and strength, a very present help in trouble. Therefore we won't be afraid, though the earth changes, though the mountains are shaken into the heart of the seas; though its waters roar and are troubled, though the mountains tremble with their swelling. Selah. There is a river, the streams of which make the city of God glad, the holy place of the tents of the Most High. God is within her. She shall not be moved. God will help her at dawn. The nations raged. The kingdoms were moved. He lifted his voice, and the earth melted. The LORD of Armies is with us. The God of Jacob is our refuge. Selah. Be still, and know that I am God. I will be exalted among the nations. I will be exalted in the earth. The LORD of Armies is with us. The God of Jacob is our refuge. Selah."
WEB cross-checks: v.6 reads "He lifted his voice, and the earth melted." (eBible/BibleGateway WEB, as confirmed in Round 3); v.10 has no quotation marks in WEB narration (quote marks exist only in the BibleGateway display) — read as plain sentences, as v3.

**Measured QA (final encoded file)**
| Check | Result | Gate |
|---|---|---|
| File duration | 65.80s | — |
| Audio stream duration | 65.77s (gap 0.03s) | <0.1s beyond end card ✅ |
| Narration / total | 63.29s narration + 2.5s end card | — |
| Voice coverage | **99.5%** of pre-end-card runtime (voice span 0.30s→63.29s); per-1s RMS: zero seconds below −50 dB pre-end-card, min −49.9 dB, median −18.7 dB | ≥85%, target ~99% ✅ |
| Silence scan −60 dB | **Zero gaps ≥0.1s anywhere in the file** (ducked bed bridges every inter-sentence pause) | no gap >0.3s ✅ |
| Loudness | **−16.05 LUFS** integrated | −16 ±0.5 ✅ |
| True peak | **−1.99 dBTP** | ≤ −1.5 dBTP ✅ |
| Video spec | 1080×1920 H.264 yuv420p, faststart (moov before mdat, probed) | ✅ |
| File size | 18.71 MB | <20 MB ✅ (headroom is thin — see notes) |
| STT transcript diff (faster-whisper base.en, same model as the Round 3 control) | **155/155 words, 98.1% similarity.** Only diffs: STT spells "Selah" as "Salah" ×3 — a proper-noun STT artifact; the word is audibly present at all three positions (segment timestamps 20.8s, ~50.3s, 62.4s). "The Lord of armies is with us" heard verbatim in both refrains. Heard span 0.0–63.04s. | transcript matches spec ✅ |

**Frame inspection** (qa/r1-hook, p25, p50, p75, finalphrase, endcard — all viewed):
- Hook (1.0s): rain-streaked traffic, "When everything shakes." + "Psalm 46." stacked, footer present — PASS.
- 25% (16.45s): roaring rapids + "though its waters roar and are troubled," timed to the words, footer present — PASS.
- 50% (32.9s): dawn river city, "God will help her at dawn." caught mid-fade-out inside its spoken window (phrase windows tile continuously; same behaviour verified in v3) — PASS.
- 75% (49.35s): sunlit clear road, "Be still, and know that I am God." lands on the calm, footer present — PASS.
- Final phrase (62.09s): "The God of Jacob is our refuge. Selah." + gold credit line PSALM 46 — WEB (NAME RENDERED AS "THE LORD") fully legible — PASS.
- End card (64.6s): LONG ROAD / "One verse a day, read aloud" / "Coming soon" — PASS.
- No black boxes, default fonts, or garbled text anywhere.

**Grid cover** — `cover-R1-nov13.png`: rapids frame at 15.82s (25% of main runtime), 4:5 centre-band crop, caption line inside the band. Blue-grey rushing water = COOL, Row 5 of the grid plan, exactly the moment §4 specifies. Matches the plan's verified crop (grid-plan/crops/cover-R1.png) in moment and tone. Set this cover at post time; do not use the hook frame.

**Production notes (honest flags)**
1. **Runtime grew: 65.8s vs v3's 53.6s.** Two causes: the restored text (3× Selah + refrains) and this voice's slower pace today — isolated single-sentence probes ran ~1.24× slower per word than v3's takes, and one full multi-sentence chunk take ran 1.7×. Pace probes of the other cast voices were normal, so this looks voice-specific. No gate sets a duration cap; the transcript diff (155/155) and coverage (99.5%) certify the content. If CoS wants ≤60s, the fix is a re-synth when the voice's pace normalizes, not a speed-up of this file.
2. **TTS degeneracy found and worked around:** the 3-sentence refrain as a single TTS input made this voice emit a 30.05s rambling take (twice, identical). All chunks were therefore synthesized sentence-by-sentence (each unit duration-sanity-checked) and joined with 0.28s pauses; chunk gaps match v3 (0.22s; 0.45s before "Be still"). Documented in work/synth_r1_v4.py.
3. The reel is 18.71 MB — under the 20 MB gate but with little headroom, because the noisy rapids/storm beats don't compress. If a future re-render needs room, drop CRF headroom on the calm beats first.

## Nov 12 opener — The Mirror Note · `nov12-mirror-note.png` + `nov12-mirror-note-caption.md`

- Final image copied from photo-ideas-v2-women/01-mirror-note.png; re-inspected here: sticky note reads "I am fearfully and wonderfully made." exactly, no person/reflection, footer "PSALM 139:14 — WEB" / "Long Road · Coming soon" — PASS.
- Caption carried over verbatim (W1 section) with gate checks appended in the file: save/send ask present; plain "Coming soon"; no Bella; @iwishhewood absent; Psalm 139:14 has no divine name, so the plain "(WEB)" credit is correct for this post.
- **Square grid crop: PASS** per grid plan §3 (verified crop grid-plan/crops/sq-01-mirror-note.png); tone LIGHT-WARM (lum 165), Row 5 centre beside the Psalm 46 cover (COOL).

## Gate items for CoS (also in the Slack post + Notion section)
- **P1 (proposal):** fill Nov 14 with W4 Night-Stand Card (Psalm 4:8, women-led, dark-warm, ~9 PM) — keeps 4 women-led posts in-window and completes the grid row (grid plan §5).
- **Gate decision:** Nov 17 Laundry Room verse is sub-legible at grid size — Muse recommends keeping it as the slate's one mood cell; alternative is swapping in Library Window.
