# QA Report — Nov 18 FINAL · Concept A · THE DAWN LANE (Psalm 121:8)

Built 2026-11-11 · **LOCAL ONLY** — nothing uploaded, posted, or sent anywhere.
Final: `nov18-dawn-lane-final.png` · 1080×1350 PNG (4:5), re-rendered from the concept A scene art
(`nov18-new-concepts/work/media-generation-nov18-scene-dawn-lane-…png`, generated text-free).
All lettering typeset programmatically (PIL) — no AI-generated text anywhere.
Build script: `work/build_final.py`. Slot tone: **LIGHT-WARM** (sits next to Nov 19 Kitchen, DARK-WARM).
Nov 24 files were not touched (verified: mtimes 15:14–15:16, before this run).

## Verdict: PASS — all CoS fixes applied and verified on the delivered pixels

---

## 1. Verse wording — WEB, word-for-word ✓

On-image verse (read letter-by-letter off the delivered final, and asserted in the build script
against the joined string):

> "The LORD will keep your going out and your coming in, **from this time forward, and forever more.**"
> Reference line: **PSALM 121:8 — WEB**

- This is the CoS-corrected WEB wording ("forward" / "forever more" as two words), **superseding**
  the thumbnail wording in `nov18-new-concepts/concepts.md` ("from this time forth" / "forevermore"),
  which concepts.md itself flagged as differing from raw WEB.
- It matches the Nov 18 caption verbatim (`replacements-nov18-24/nov18-caption.md`):
  "The LORD will keep your going out and your coming in, from this time forward, and forever more." ✓
- Typesetting: Cormorant Garamond SemiBold 60px, deep warm brown (59/36/19) on the pale sky —
  same house treatment as the concept; reference Montserrat SemiBold 30px tracked, bronze-gold (146/98/20).
- **Measured ink bounds (alpha bbox of the typeset layer): verse+reference x187–893, y237–552** —
  fully inside the 1:1 square (y135–1215) with 102px margin at top and 663px at bottom. ✓

## 2. Footer + boots clearance ✓

- Boots moved **up 85px** (final scale; 111px at source scale) and re-grounded with a soft synthetic
  cast shadow (two blurred layers, no cut edges — see §4). Boots after move: **top y1080, soles y1244**.
- Footer "Long Road · Coming soon" (Montserrat Regular 30px, cream on the footer-band gradient):
  **measured ink x350–732, y1307–1338** — fully inside the 4:5-only band (y1215–1350), 12px above the bottom edge.
- **Clearance: footer ink top (1307) − boot soles (1244) = 63px; − shadow = 42px** (shadow bottom
  measured empirically on the final: lowest row where the centre strip under the boots runs >12
  luminance below the side strips is y1265; 1307 − 1265 = 42px). Requirement was ≥15px. ✓✓
- The concept's defect (footer grazing/crossing the boots) is gone; the footer now sits on clean
  gravel below the boots and reads crisply at full size and at 360px.

## 3. Cottages — no doors, no doorframes, no garbled windows/roofs, no AI lettering ✓

Inspected at 100% (delivered scale), 200–400% (source scale), plus numeric luminance profiles.
One crop per cottage is delivered (`nov18-dawn-lane-cottage-1..4-*.png`, 100% crops of the final).

| Cottage | Finding |
|---|---|
| 1 · Left foreground (crop 1) | Two clean stone-framed windows, sound roof tiles, downpipe. No door. PASS as-is. |
| 2 · Mid-left gable (crop 2) | Gable window clean and straight. Ground floor is occluded by hedge + deep shade: row/column luminance profiles show **no opening contrast** (band x386–404 at y790–812 = 108–112, uniform with neighbouring wall/hedge 89–118; no jambs, lintel, or ground-reaching rectangle at 400%). No door/doorframe present — deliberately **not** painted (a first-pass paint attempt on this spot in an earlier iteration produced a visible flat rectangle; with no door present, painting would only add a defect). PASS. |
| 3 · Centre distant (crop 3) | Roof only, above the hedges in haze; no walls, openings, or lettering exist in frame. PASS as-is. |
| 4 · Right (crop 4) | **DEFECT FOUND & FIXED.** The source art had two tall, ground-reaching doorways on the facade (column-luminance dips: x1165–1181 mean 134.1, deepest column 127.5; x1192–1204 mean 140.6 — vs plain wall x1208–1236 mean 155.2). Both were painted out (method §4). After: door zones mean **149.8 / 153.6**, deepest columns **148.1 / 152.3** vs wall reference **155.0 / 152.7** — the dips are eliminated; facade now shows plain hazy wall + one clean window pair + dormer. No door, doorframe, or ghost remains in normal, inverted, or edge views (`work/qa-right-fill-inverted.png`, `work/qa-right-fill-edges.png`, `work/qa-right-facade-before/after-300.png`). PASS. |

No AI lettering anywhere in the scene (art was generated text-free; verified across all crops). ✓

## 4. Edit methods (both edits confined — see §6)

- **Doors:** LF (low-frequency) surface diffused from the surrounding facade at 1/8 scale +
  procedural two-octave grain matched to the verified clean wall strip's texture level
  (HP std 3.8), composited through a rounded, 9px-feathered mask over source rect x1158–1224, y816–890.
  Two earlier attempts were rejected on inspection and are **not** in the final: a straight donor
  copy (donor strip contained foreground foliage — pasted leaves onto the facade) and a mirror-tiled
  donor (printed a visible kaleidoscope motif). The delivered fill at final scale reads as continuous
  hazy wall at 100%, 200%, and 300%.
- **Boots:** tight polygon mask (both boots incl. collars/tongues, laces, and the inter-boot saddle)
  pasted −111 source px; vacated footprint clone-filled with a coherent gravel donor from 300px
  above, LF-corrected by the diffused surface, composited with a 16px-feathered mask; new soft
  shadow drawn fresh (cast polygon α105 blur 14 + contact ellipse α165 blur 8). Two earlier attempts
  rejected on inspection: v1 pasted the *cut* shadow wedge, leaving a hard straight edge mid-path;
  v2 left a bright gravel strip between the collars (mask gap + clipped right-boot tongue) — both
  fixed in the delivered build and re-inspected at 200% (`work/qa-boots-final-200.png`): boots
  complete, shadow soft, vacated gravel indistinguishable from the surrounding path.

## 5. Grid / tone / legibility ✓

- **Square crop** `nov18-dawn-lane-square.png` (1080×1080) verified **pixel-exact** centre crop of
  the final (y135–1215, max abs diff 0). Verse + reference fully inside; footer correctly absent
  from the square (it lives in the 4:5 band only).
- **Tone:** square mean luminance **143.8**, warm-pixel share **1.00** → **LIGHT-WARM** ✓
  (grid-plan LIGHT-WARM ≈ ≥140; clear contrast against Nov 19 Kitchen DARK-WARM). Same as the
  concept's measured 144.7 within edit noise.
- **360px legibility:** `nov18-dawn-lane-360.png` (360×450) inspected — every verse word and the
  reference line read clearly at grid size; footer also legible. A 360×360 square downscale is in
  `work/nov18-dawn-lane-square360.png` and also reads fully.

## 6. Scope / compliance ✓

- Scene changes vs the raw scene art are confined to two zones (diff >20: bbox x519–1222,
  y816–1759 at source scale = the right-facade fill + the boots move/fill/shadow). Nothing else
  in the scene was altered.
- Footer text is exactly "Long Road · Coming soon" — no dates, no availability claims, no other
  claims. No Bella. No @iwishhewood tag or mention. No family details.
- LOCAL ONLY: no uploads, no Slack posts, no Instagram actions. Nov 24 (approved/locked) untouched.

## Files delivered (this folder)

- `nov18-dawn-lane-final.png` — 1080×1350 final
- `nov18-dawn-lane-square.png` — 1080×1080 grid crop (exact centre crop)
- `nov18-dawn-lane-360.png` — 360×450 downscale (grid-size check)
- `nov18-dawn-lane-cottage-1-left.png` · `-2-midleft.png` · `-3-centre.png` · `-4-right.png` — 100% cottage crops of the final
- `qa-report.md` — this report
- `work/` — build script, fixed scene, and QA evidence crops (facade before/after, fill inverted/edges, boots 200%, square-360)
