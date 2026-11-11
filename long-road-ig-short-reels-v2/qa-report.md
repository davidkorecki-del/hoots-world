# QA Report — Short-Format Test Reels v2 (STORY-FIRST REBUILD)

**Why v2 exists:** DK rejected v1 outright on creative quality versus Grok's
reference videos ("honestly suck comparing to what grok made"). V1's failure in
one line: it was scenery cuts behind text cards — technically gated, emotionally
empty; nobody to follow, no story, no warmth building. V2 is a from-scratch
rebuild to the reference standard: ONE human moment carried through as a small
story per Reel. Nothing has been posted to Instagram.

**References studied:** Grok's 54s lifestyle Reel and 44s app tour (Dawid's
uploads). What makes them work, applied here: one person you follow; warm
natural grade that builds; gentle pacing (shots held 3–5s); emotion before
information; a glowing brand close ("The road is long. You don't walk it
alone.").

**Voice (both):** adult storytelling avocado_v2:qvd_03858, speed 100 — same as
v1 / Reel 1. Texts unchanged from v1 (WEB verified vs BibleGateway WEB +
YouVersion WEB): Romans 8:28 complete; Isaiah 43:2 waters/rivers half only,
labelled SELECTED on screen and in the caption. Neither text contains a divine
name → plain WEB credits, per standard. Spoken openers in words ("Romans
chapter 8, verse 28.") per the known TTS numeral weakness. New end card built
in the reference's closing style, using the app icon lifted from Grok's own
tour video, closing line "The road is long. You don't walk it alone." +
plain "Coming soon". Persistent footer "LONG ROAD · COMING SOON" throughout
the story (top edge ≤ y1516 safe zone).

---

## Reel A — Romans 8:28 · Wed Nov 18 · `reelA-nov18-romans828.mp4`

md5 c50c89723629069732584effefcffd8c · 6.04 MB · 16.00s total (13.5s story + 2.5s end card)

**The arc (3 shots, 0.6s crossfades):**
| Time | Beat |
|---|---|
| 0.0–3.2 | A man at the end of a brutal day, parked car, rain on the windshield, forehead in his hand. HOOK line over the hardest moment: "All things work together for good" (0.15–3.45). He slowly lifts his head and breathes. Narration opener runs over this shot. |
| 3.2–8.9 | Same man, same car: he opens the verse on his phone; warm light washes his face, shoulders drop. Lines: "We know that all things work together for good" (3.77–6.67), "for those who love God," (6.67–8.28). Slow push-in on a still — the quiet beat. |
| 8.9–13.5 | He drives home into warm sunset light as the words land: "for those who are called according to his purpose." (8.68–11.63) + credit ROMANS 8:28 — WEB. |
| 13.5–16.0 | End card. |

**Measured QA (final encoded file):**
| Check | Result | Gate |
|---|---|---|
| Audio gap beyond total | 0.00s | <0.1s ✅ |
| Voice coverage | 97.4% span; zero seconds below −50 dB RMS pre-card | ≥85% ✅ |
| Silence −60 dB | zero gaps ≥0.1s pre-card | no gap ≥0.3s ✅ |
| Loudness / peak | −16.35 LUFS / −1.99 dBTP | −16 ±0.5 / ≤ −1.5 ✅ |
| Spec | 1080×1920 H.264 yuv420p faststart | ✅ |
| STT diff (faster-whisper base.en) | similarity **0.9818**; every verse word heard verbatim — diffs confined to the spoken opener ("chapter" dropped by the recogniser, a known base.en weakness, same as v1) | ✅ |

**Cover:** `cover-A-nov18.png` — 4:5 crop of the 10.8s driving-home frame.
**Tone: DARK-WARM** (golden sunset, deep amber). This fixes v1's flagged
problem (v1's COOL sat beside Nov 17's COOL cell). Honest grid note: Nov 19
(W2 Kitchen Window) is also classed dark-warm, so one dark-warm/dark-warm
adjacency remains — judged the lesser clash, and the cover is the strongest
frame in the Reel.

## Reel B — Isaiah 43:2 (selected) · Tue Nov 24 · `reelB-nov24-isaiah432.mp4`

md5 d348e5d22bafad8e369757bc3865e71f · 7.69 MB · 14.80s total (12.3s story + 2.5s end card)

**The arc (3 shots, one street, 0.6s crossfades):**
| Time | Beat |
|---|---|
| 0.0–4.3 | A woman walks alone through a rain-flooded street at dusk, head bowed, water splashing at her steps. HOOK line: "I will be with you" (0.15–3.45). Narration opener over this shot. |
| 4.3–8.0 | The water is around her ankles; she stops and lifts her face to light breaking through the clouds — timed so the promise repeats as she looks up: "When you pass through the waters," (3.41–5.14), "I will be with you," (5.14–6.58), "and through the rivers," (6.98–8.49). |
| 8.0–12.3 | Storm gone: she walks calmly through shallow golden water, light shimmering on the ripples. "they will not overflow you." (8.49–10.38) + credit ISAIAH 43:2 — WEB (SELECTED). |
| 12.3–14.8 | End card. |

**Measured QA (final encoded file):**
| Check | Result | Gate |
|---|---|---|
| Audio gap beyond total | 0.00s | <0.1s ✅ |
| Voice coverage | 97.1% span; zero seconds below −50 dB RMS pre-card | ≥85% ✅ |
| Silence −60 dB | zero gaps ≥0.1s pre-card | no gap ≥0.3s ✅ |
| Loudness / peak | −16.48 LUFS / −1.99 dBTP (one corrective loudnorm pass applied — first encode measured −16.57, outside the band) | −16 ±0.5 / ≤ −1.5 ✅ |
| Spec | 1080×1920 H.264 yuv420p faststart | ✅ |
| STT diff | **1.0000 — 25/25 words, zero diffs** | ✅ |

**Cover:** `cover-B-nov24.png` — 4:5 crop of the 10.8s golden-walk frame.
**Tone: DARK-WARM** (sunlit shallows/street, deep gold). Slots cleanly between
Nov 23 (COOL) and Nov 25 (LIGHT-WARM), same as v1's B placement.

**Frame inspection (both Reels):** hook / 25% / 50% / 75% / end-card frames
extracted from the finals and visually inspected — all PASS: text elegant and
sparse (never more than two short lines), no garbled text in settled frames,
footer and credits legible and inside the safe zone, characters consistent.

---

## Feel comparison vs Grok's references (honest, per Reel)

Reference feel = one human moment carried as a small story; a person you
follow; warm natural grade; gentle pacing; emotion before information.

**Reel A — Romans 8:28**
- *Story arc:* MATCH. One man, one car, three beats — despair → the verse on
  his phone → driving home into warm light. It is the same emotional shape as
  the lifestyle reference's opening (a broken man, a quiet turn).
- *Human presence:* MATCH. Same actor, same grey hoodie, same car interior in
  all three shots; the despair clip even lifts his head on cue as the opener
  ends. You follow a person, not a place.
- *Warmth:* NEAR MATCH. The build is right (blue-grey → phone glow → full
  sunset), but the final beat runs hotter and more orange than Grok's softer
  grade, and the video model reframed the planned wide driving shot into a
  tight sunlit profile. Emotional and warm — one notch more saturated than
  the references.
- *Pacing:* MATCH. Three shots held ~3–5.5s with soft crossfades; no card
  montage, no rapid cuts. The phone beat is a slow push-in on a still — the
  one deliberate moment of stillness, and it reads as quiet, not frozen.
- *Verdict:* Matches the reference feel, with the grade caveat above.

**Reel B — Isaiah 43:2**
- *Story arc:* MATCH — the strongest of the two. Same woman, same street:
  bowed in the rain → water at her ankles, face lifted to breaking light →
  calm walk through golden shallows. Struggle to peace with no cutaway.
- *Human presence:* MATCH. One continuous character in one continuous place;
  her look-up lands exactly on the repeated promise "I will be with you," —
  the emotional peak is acted, not captioned.
- *Warmth:* MATCH. Grey-blue storm warms shot by shot to full gold, the same
  cold-to-warm journey the lifestyle reference takes.
- *Pacing:* MATCH. Three ~4s shots, gentle crossfades, verse lines sparse
  (four short lines across 12 seconds). Nothing hurries.
- *Verdict:* Matches the reference feel. One honest nit: her long teal dress
  reads slightly formal next to the references' everyday clothes — it also
  matches the wading imagery this account already approved in v1, so it is
  flagged, not fixed.

**Overall:** Both v2 Reels meet the standard v1 missed — they are stories
about people first and verse graphics second. If DK still prefers Grok's hand
on this format, the honest remaining gap is grade softness (Reel A's final
beat) and wardrobe everyday-ness (Reel B), not structure or pacing.
