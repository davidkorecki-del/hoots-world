# QA Report — Short-Format Test Reels (Long Road Instagram trial)

Ordered by DK 2026-11-10 ~22:31 EST: the Nov 27/29 long Reels land after the Nov 26
scorecard, so the short format is tested INSIDE the Nov 12–26 window with two
purpose-built short Reels. Voice (both): adult storytelling avocado_v2:qvd_03858,
speed 100 — same as Reel 1. Built on the gate pipeline (sentence-unit synth,
duck+bed mix, house loudnorm chain, brand end card, persistent footer).

## Texts — verified WEB (BibleGateway WEB + YouVersion WEB, fetched 2026-11-11)

- **Reel A — Romans 8:28 (complete verse):** "We know that all things work together
  for good for those who love God, for those who are called according to his purpose."
  (BibleGateway WEB reads "for those who are called"; an older WEB printing at
  studylight reads "to those who are called" — the house reference, BibleGateway
  WEB, was followed.)
- **Reel B — Isaiah 43:2 (selected, first half):** "When you pass through the
  waters, I will be with you, and through the rivers, they will not overflow you."
  No words skipped inside the used portion; the fire half is not used. The Reel's
  on-screen credit and the caption both present it as SELECTED.
- **Divine name:** neither used text contains "Yahweh" (verified in both sources) →
  no substitution; credit lines are plain "ROMANS 8:28 — WEB" / "ISAIAH 43:2 — WEB
  (SELECTED)". The "(name rendered as the LORD)" credit is NOT used, per standard.
- **Spoken openers** (house style, outside the quoted verse): "Romans chapter 8,
  verse 28." / "Isaiah chapter 43, verse 2." — phrased in words because this TTS
  voice mangles bare numerals (see Production notes). Narration starts at 0.30s,
  no intro pad, no logo-first.

## Reel A — Romans 8:28 · Wed Nov 18 · `reelA-nov18-romans828.mp4`

md5 f9003bf5d4bd976b30f3f6eb492d75f4 · 1.98 MB

**Beat map (re-hook every ≤ ~2.5s of picture):**
| Time | Beat |
|---|---|
| 0.00–2.30 | HOOK: dawn hills (slow push-in) + huge italic hook line "All things work together for good" (verbatim verse phrase) on screen from frame 1 |
| 0.30–1.61 | Opener card 1 "Romans chapter 8" |
| 1.61–2.98 | Opener card 2 "Romans 8:28." |
| 3.20 | CUT to misty forest road |
| 3.20–7.71 | Verse card (POP: type grows 84→104pt) "We know that all things work together for good for those who love God," |
| 5.20 | CUT back to dawn hills (new angle on the scene) |
| 7.71 | CUT to sunlit clear road + slow push-in |
| 7.71–10.94 | Final card "for those who are called according to his purpose." + credit ROMANS 8:28 — WEB |
| 10.94–13.47 | End card (2.5s) |

**Measured QA (final encoded file):**
| Check | Result | Gate |
|---|---|---|
| File duration | 13.47s (narration to 10.94s + 2.5s card) | short-format; see duration note |
| Audio stream duration | 13.39s (gap 0.08s) | <0.1s ✅ |
| Voice coverage | voice span 97.3% of narration window; per-1s RMS min −34.6 dB, median −20.0 dB, zero seconds below −50 dB | ≥85%, target ~99% ✅ (span metric; RMS shows no dead second) |
| Silence scan −60 dB | **zero gaps ≥0.1s anywhere pre-card** | no gap ≥0.3s ✅ |
| Loudness | **−16.01 LUFS** | −16 ±0.5 ✅ |
| True peak | **−2.0 dBTP** | ≤ −1.5 ✅ |
| Video spec | 1080×1920 H.264 yuv420p, faststart probed | ✅ |
| STT diff (faster-whisper base.en) | 28 spec words, similarity **0.9455**. Diffs are confined to the spoken opener: STT drops "chapter" and mishears the verse number as "20" (it heard the same opener correctly at unit level; a known base.en numeral weakness). Every verse word heard verbatim; heard span 0.0–10.5s | verse text certified ✅ / opener flagged |

**Frame inspection:** hook (dawn push-in, hook line large, footer present) PASS ·
25%/50% (verse card, clean, timed to the words) PASS · 75% (final card + gold credit,
fully legible) PASS · end card PASS. No garbled text in any settled frame.
**Cover:** `cover-A-nov18.png` — 4:5 centre-band crop at 4.6s (dawn hills + the full
first-half verse card). **Tone: COOL** (blue-purple pre-dawn; luminance is mid-dark,
so it does NOT read light-warm despite the sunrise subject). Note: the hook-window
frames (0–2.3s) carry both the hook line and the opener card mid-crossfade and are
not cover-clean; the 4.6s frame is the strongest clean moment.
**Known quirk (inherent to the format):** during 0.3–2.3s the hook line and the
opener card are both on screen; inside their crossfades (~0.25s each) the two texts
briefly overlap. Settled frames are clean and the effect reads as a deliberate
stack, but CoS should know it is there.

## Reel B — Isaiah 43:2 (selected) · Tue Nov 24 · `reelB-nov24-isaiah432.mp4`

md5 c212a05f7ab098250852ea82c641b81e · 3.98 MB

**Beat map:**
| Time | Beat |
|---|---|
| 0.00–2.30 | HOOK: woman wading through sunlit shallows (new generated clip) + huge hook line "I will be with you" from frame 1 |
| 0.30–1.59 | Opener card 1 "Isaiah chapter 43" |
| 1.59–3.11 | Opener card 2 "Isaiah 43:2." |
| 3.33 | CUT to meadow stream, slow push-in |
| 3.28–4.71 | Card "When you pass through the waters," |
| 4.71–6.43 | Card "I will be with you," (POP 84→104pt) |
| 5.08 | CUT back to the wading shallows + slow push-in |
| 6.71 | CUT to wide river with strong current (new generated clip) |
| 6.71–8.34 | Card "and through the rivers," |
| 8.34 | CUT back to the meadow stream |
| 8.34–10.29 | Final card "they will not overflow you." + credit ISAIAH 43:2 — WEB (SELECTED) |
| 10.29–12.80 | End card (2.5s) |

**Measured QA (final encoded file):**
| Check | Result | Gate |
|---|---|---|
| File duration | 12.80s (narration to 10.29s + 2.5s card) | short-format; see duration note |
| Audio stream duration | 12.79s (gap 0.01s) | <0.1s ✅ |
| Voice coverage | voice span 97.1%; per-1s RMS min −29.8 dB, median −21.2 dB, zero seconds below −50 dB | ≥85% ✅ |
| Silence scan −60 dB | **zero gaps ≥0.1s anywhere pre-card** | no gap ≥0.3s ✅ |
| Loudness | **−15.80 LUFS** | −16 ±0.5 ✅ |
| True peak | **−2.0 dBTP** | ≤ −1.5 ✅ |
| Video spec | 1080×1920 H.264 yuv420p, faststart probed | ✅ |
| STT diff (faster-whisper base.en) | **25/25 words, similarity 1.0000, zero diffs**; heard span 0.0–9.98s | ✅ |

**Frame inspection:** hook (wading shallows, hook line large, footer present) PASS ·
25% ("When you pass through the waters," over the stream) PASS · 50% (POP card
"I will be with you,") PASS · 75% ("and through the rivers," — sampled inside its
window) PASS · end card PASS.
**Cover:** `cover-B-nov24.png` — 4:5 centre-band crop at 8.0s: sunlit shallows and
grass, no text (deliberately text-free: the grid cell sells the scene; the hook line
overlaps the opener cards in the early window, as in Reel A). **Tone: DARK-WARM**
(golden-green, warm-dominant; luminance ≤ ~130 per the grid plan's class bounds).
**Known quirk:** same hook/opener crossfade stack as Reel A (0.3–2.3s).

## Duration note (both reels — read before the gate)

The brief targeted 20–30s total. Both reels came in shorter — **13.5s and 12.8s** —
and that is a property of the source texts, not a build error: a single verse read
at this voice's natural pace is ~7.7s (Romans) / ~6.9s (Isaiah used portion), plus a
~2.8s spoken opener and the 2.5s end card. Reaching 20s+ would have required padding
( slower delivery, long holds, a second verse) — all of which work against the
hook-first short-format test these reels exist to run. They are delivered at their
honest length; if CoS prefers, the pair can be re-cut as ~20s versions with the
verse read over a longer scenic hold, but that is a different (weaker) test.

## Production notes

1. **TTS numeral handling:** the opener was first synthesized as "Romans 8, verse 28."
   — the voice emitted a degenerate take (rambling "The The The…" tail) on one and a
   ~0.9s internal dead pause on the Isaiah opener. Both openers were re-synthesized
   in words ("Romans chapter 8, verse 28."), after which unit-level STT is clean:
   "Romans 8, verse 28." / "Isaiah, chapter 43, verse 2." Every unit in both reels
   was STT-verified individually before assembly.
2. **Unit repairs (documented, text-preserving):** (a) Romans opener take contained
   ~0.45s of trailing click artifacts after "28." (word timestamps end 2.70s) —
   trimmed at 2.68s. (b) The Isaiah rivers unit was synthesized with an internal
   ~0.44s mid-phrase pause (TTS artefacts at other cut points clipped the word
   "not"); it was repaired by re-joining the phrase's own audio segments at the
   natural comma pause (0.25s) — no words added, removed or reordered; unit STT
   after repair: "And through the rivers, they will not overflow you." (28-word
   final-file STT on Reel B is a perfect 1.0000.)
3. **Bed/duck tuning:** the music bed runs at 0.52 base with gentler ducking
   (threshold 0.02, ratio 4) vs Reel 1 (0.55 / 0.012 / 8) — result: zero −60 dB
   silence gaps in either file, same as the gate Reel.
4. **New footage:** two clips generated for Reel B (wading shallows; wide river
   current) under work/gen/. Reel A reuses the established dawn/foggy-road/
   clear-road clips in a new edit with push-in moves. All clips 10s, 720×1280,
   upscaled + graded with the house chain.
5. **Not attempted:** GitHub upload (per instructions — parent agent web-uploads;
   files are in ~/workspace/long-road-instagram/short-reels/).

## Grid slotting (for the parent / CoS)

- Reel A, Nov 18, cover tone **COOL** — sits between Nov 17 Laundry (C) and Nov 19
  Kitchen (DW) in posting order; two COOL cells in one row area is the only pattern
  tension. If CoS wants the cycle strict, Reel A's cell wants a warm cover moment —
  none exists in this edit (the whole reel is the blue dawn grade); accept the
  double-COOL or swap dates with Reel B is NOT possible (B is the 24th by verse
  fit). Flagged, not hidden.
- Reel B, Nov 24, cover tone **DARK-WARM** — slots cleanly between Nov 23 Ticket
  Stub (C) and Nov 25 Grocery (LW).
