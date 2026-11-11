# QA Report — Long Road Instagram gate-delivery package: Nov 18 + Nov 24 photo replacements

Prepared 2026-11-11 (prep + QA only — nothing posted to Slack, GitHub, or Instagram).
Sources: v1 Top 10 renders `photo-ideas-v1/02-threshold.png` and `10-light-that-stays.png` (agency-approved set), captions/queue in `photo-ideas-v1/`, gate style per `gate-nov11/`.

## Verdicts

| Item | Verdict |
|---|---|
| Nov 18 · #2 THE THRESHOLD (Psalm 121:8) | **PASS after correction** — 2 defects found in the source render and fixed (below) |
| Nov 24 · #10 THE LIGHT THAT STAYS (John 1:5) | **PASS after correction** — 1 defect found and fixed; fallback #1 Chalkboard Menu NOT needed |

## Answer to CoS's open question — the Nov 17 "Library Window" verse

**Library Window is Proverbs 3:5–6 — NOT Psalm 121:8. There is no clash with Nov 18 Threshold.**

Evidence:
- Local files define it unambiguously: `photo-ideas-v3-college/captions.md`, item C4 — THE LIBRARY WINDOW: "Trust in the LORD with all your heart, and don't lean on your own understanding. In all your ways acknowledge him, and he will make your paths straight." — Proverbs 3:5–6 (WEB, "Yahweh" rendered "the LORD"). In-scene card: "Trust in the LORD with all your heart." `photo-ideas-v2-women/queue-v2.md` lists the same: "C4 Library Window (Prov 3:5–6, college) — rainy-day or finals-week swap-in." Grid plan §3 also treats C4 Library Window as the readable-verse swap for Nov 17's original Laundry Room cell (the swap itself is recorded in `gate-nov11/gate-decisions-nov10.md`).
- The Notion content board (page "Long Road — Instagram content board", id 414991ca-ed49-811c-a2c9-fbda1ca8d275, fetched 2026-11-11) does **not** assign Library Window a verse: its approved-plan Update Nov 11 says "Nov 17 remains Library Window" and, for the Nov 18/24 replacements, "C1 and C4 were not picked; no verse, tone, or file for them is on this board."
- Likely source of the confusion: the same Notion page's **superseded** draft slate (explicitly marked superseded) lists Nov 17 as an entryway/coming-home Reel on Psalm 121:8, and `comparison.md` (line 116) floats the same entryway Psalm 121:8 Reel idea. That was a different, superseded concept for Nov 17 — not the Library Window photo item. The Psalm 121:8 association belongs to the Threshold/entryway concept, which is exactly the Nov 18 replacement.

## WEB verification (checked 2026-11-11 against Bible Gateway WEB, wd.bible, StudyLight, eBible)

- **Psalm 121:8 (WEB, raw):** "Yahweh will keep your going out and your coming in, from this time forward, and forever more."
  House rendering applied (CoS requirement + merged standard): "Yahweh" → "the LORD", everything else letter-for-letter, including the comma after "in" and "forever more" as two words. Caption credit notes the rendering: (WEB — "Yahweh" rendered "the LORD"), matching the v2/v3 caption pattern. Scope is v.8 only, per CoS (the v1 draft caption quoted vv.7–8; this gate item is 121:8 alone, as on the Notion board).
- **John 1:5 (WEB):** "The light shines in the darkness, and the darkness hasn't overcome it." — on-image text and caption match word-for-word, including "hasn't". No divine name; no substitution.

## Defects found in the source renders (by inspecting the actual images) and fixes applied

1. **Threshold — divine-name defect (gate-blocking).** The source render's lintel reads "**Yahweh** will keep your going out and your coming in." — violates the standing rule ("the LORD", never "Yahweh"). **Fix:** lintel repainted; it now reads "The LORD will keep your going out and your coming in." Same doorway/dawn art, same fragment, same two-line layout.
2. **Threshold — verse clipped by the grid crop.** In the source's 1:1 centre crop, the first line's cap tops are shaved by the crop edge. **Fix:** the repainted lintel text sits lower, fully inside the centre-square safe zone (verified on the delivered grid-square file: both lines complete and legible). Method note: old lettering was removed with a clone/min composite of the board's own wood; removal verified numerically — 0 bright remnant pixels in the cleared band, and high-pass (texture) energy in the cleared band tiles (3.1–9.1) matches clean-wood baseline tiles (5.2–8.2), vs 17–61 for the original lettering. Re-set in the house serif (Cormorant Garamond SemiBold) at 64px — slightly smaller than the source render's lettering, because the longer "The LORD" line must fit the board inside the safe zone. CoS/Skeptic should eyeball the lintel at full size with this note in hand.
3. **Light That Stays — verse cut by the grid crop.** In the source's 1:1 centre crop, the third line "overcome it." is cut at the bottom edge (only letter tops visible). **Fix:** gentle vertical reframe of the same art (×0.895 vertical recomposition, edge-stretch bands at the very top/bottom, seams blended; both bands fall outside the grid square). All lettering is the original render's — nothing re-typed. Verified on the delivered grid-square file: all three lines plus the gold reference line fully inside and legible. First reframe attempt used mirror-fill and produced mirrored footer text at the bottom edge — caught on inspection and replaced with the edge-stretch version.
4. Not a defect: the chalk "reflection" glyphs under the Light verse are the source render's own mirrored-reflection artwork, unchanged.

## Checks performed (both items)

- Opened/viewed: both source renders, both corrected finals (full frame), and both delivered square crops. Verse read letter-by-letter off the images.
- Dimensions/format: finals 1080×1350 PNG (4:5, same as source set); grid squares 1080×1080 PNG, exact centre crops of the corrected finals (y 135–1215).
- Tone (by eye + measured square-crop luminance): Threshold = bright golden dawn through the door, warm-dominant — **LIGHT-WARM** ✓ (square mean lum 89.4; the dark timber frame pulls the mean down, the scene centre is bright dawn — alternates with Nov 19 Kitchen DARK-WARM as required). Light That Stays = near-black rainy street lit by one warm lamp — **DARK-WARM** ✓ (square mean lum 32.5; sits between Nov 23 Ticket Stub COOL and Nov 25 Grocery LIGHT-WARM as required).
- "Coming soon": footer "Long Road · Coming soon" present on both finals (v1 design element, retained through both corrections); captions use the exact words "Coming soon", no dates, no availability claims. ✓
- Captions: hook-first, short, one save/send ask each, hashtags carried from the items' own v1 caption sets. No Bella, no @iwishhewood tag/mention, no family details. ✓
- Scope held: no Slack posts, no GitHub uploads, no Instagram posting in this step. Source renders untouched; corrections are new files in this folder. Working scripts and inspection crops are in `work/` for audit.

## Files delivered

- `nov18-threshold-final.png` — corrected final (LORD wording + crop-safe lintel)
- `nov18-threshold-grid-square.png` — 1:1 grid crop of the final
- `nov18-caption.md` — paste-ready caption + gate checks
- `nov24-light-that-stays-final.png` — corrected final (crop-safe reframe)
- `nov24-light-that-stays-grid-square.png` — 1:1 grid crop of the final
- `nov24-caption.md` — paste-ready caption + gate checks
- `qa-report.md` — this report

---

## Gate fix — 2026-11-11

Rework after the CoS QA gate FAIL on the first delivery. Gate-failed versions are preserved in `work/gate-failed-v1/` (finals, squares, captions, and the pre-fix qa-report). All work was local to this folder — no Slack, GitHub, or Instagram activity. Finals keep the same filenames; both grid squares were regenerated from the fixed finals and verified pixel-exact as centre crops (y 135–1215).

### Nov 18 · Threshold — gate items 1–3

**1. Ghost text on the lintel (dark remnants of the removed "Yahweh" lettering) — FIXED.**
Root cause of the first fix's failure: the old lettering was removed with a per-pixel *minimum* composite across shifted copies, which preferentially selects dark pixels — i.e. it preserved the letters' dark drop-shadow/halo — and the verification only counted *bright* remnants, so the dark letterforms passed undetected.
Rebuild method (from the untouched source render, script `work/fix_threshold_gate10.py`): the panel face (x 96–974, y 100–296) was reconstructed as a diffusion low-frequency surface plus detail composited from geometric transforms (flips/rolls) of the panel itself, under a strict halo-free donor rule — no texture was sampled within 9 px of any old letter pixel, so neither the bright letterforms nor their dark shadow halo can be copied in; the panel's edge bevels and bottom ledge were additionally excluded as donors after they were caught importing vertical wear strips. The cream verse was then re-set in the same house style (Cormorant Garamond SemiBold, 64 px, cream 246/240/226 with dark offset shadow): "The LORD will keep your going out and your coming in." — letter-for-letter, house rendering of Psalm 121:8 WEB.
Evidence (inspected, not just measured):
- 100% crops of the rebuilt panel before text (`work/gatefix10-lintel-cleaned.png`) and of the final (`work/gatefix-final-lintel-100pct.png`), plus inverted views (`gatefix10-lintel-cleaned-inverted.png`, `gatefix-final-lintel-inverted.png`) and a high-pass view (`gatefix-final-lintel-highpass.png`): no glyph shapes, bright or dark, anywhere on the panel — only wood grain, knots and the board's natural horizontal streaks.
- Bright-neutral remnant pixels in the panel after rebuild: **0**. Mean luminance deviation sampled on the old letterforms' exact pixel positions: **−0.15** (panel mean ≈ 0) — i.e. zero correlation with the old letter template, where the failed version showed readable dark text. High-pass (texture) energy in the rebuilt area is the same order as genuine clean wood (3.4–5.8 vs 5.3 mean |HP|, varying by sub-band).

**2. Reference below the grid crop — FIXED.**
"PSALM 121:8 — WEB" sat at y1243–1261 on the doormat, below the square (bottom y1215). The old line was erased and the reference re-set higher on the doormat: drawn-ink bbox **x 347–735, y 1165–1187** — fully inside the square with a **28 px margin** to the square's bottom edge, in the original gold tracked style (Montserrat SemiBold, gold 224/178/94, width matched to the original 390 px). Erase method: organic (glyph-shaped) mask composite erase, a vertical clone-stamp for the small floorboard sliver, and a wide organic low-frequency blend so no rectangular patch boundary remains (scripts `work/fix_threshold_gate11.py` + gate14/gate17 passes in-line). The "Long Road · Coming soon" footer is unchanged and stays in the 4:5-only band (y1299–1317), as permitted. Evidence: `work/gatefix17-nov18-bottom-final.png` (100% bottom crop — old line gone, no patch edges, mat fibre and floor sheen continuous) and the delivered square, where the reference is fully visible on the mat.

**3. Caption credit line — FIXED.**
`nov18-caption.md` now credits "— Psalm 121:8 (WEB)", matching Nov 24's format. The divine-name word was removed from the caption file entirely (verified: 0 occurrences in either caption file); the gate-check notes were rewritten accordingly, including the grid-crop note, which now records the reference inside the square.

### Nov 24 · Light That Stays — gate item

**Mirrored puddle reflection of the verse — REMOVED; footer relocated onto clean pavement inside the square.**
The whole reflection zone below the verse (y1176–1350, x120–960) was rebuilt as clean dark pavement: diffusion low-frequency surface + fine grain matched to nearby genuine pavement (σ ≈ 3 luminance units) + sparse wet-stone glints + the lamp's warm streak re-added at the strength measured from glyph-free rows above the verse (median deviation 9.3, decayed with depth). Two earlier attempts were rejected on inspection: a per-pixel glyph mask missed the reflections' soft low-contrast strokes, and transplanted detail from the bright lamp pool produced visible speckle (bright-pixel counts and crops in the run log). The verse itself and the gold "JOHN 1:5 — WEB" line are **pixel-identical** to the gate-failed version (max abs diff 0 across y700–1172) — the verse still reads exactly "The light shines in the darkness, and the darkness hasn't overcome it." (John 1:5 WEB).
The footer "Long Road · Coming soon" was redrawn on the clean pavement at ink **y1182–1201** (Montserrat Regular, width 271 px, matching the Nov 18 footer's measure), so it is fully legible in **both** the 4:5 final and the grid square (14 px margin to the square's bottom edge), with no reflection text behind or below it. Evidence: `work/gatefix5-nov24-bottom-final.png` and `work/gatefix5-nov24-square-bottom.png` (100% crops — no letterforms under the verse in either; footer crisp on plain dark pavement), plus inverted crop `gatefix3-nov24-bottom-inverted.png` from the same rebuild. Residual bright pixels >45 luminance in the zone (excluding the footer) are 1,899 sparse single glints vs ~12–14k glyph pixels before.

### Tone / format re-verification (both items)

- Finals 1080×1350 PNG; squares 1080×1080 PNG, pixel-verified exact centre crops of the fixed finals.
- Nov 18 square mean luminance **87.5** (pre-fix 89.4) — **LIGHT-WARM** unchanged. Nov 24 square mean luminance **33.0** (pre-fix 32.5) — **DARK-WARM** unchanged.
- Nov 18 doorway scene below the lintel is pixel-identical to the source render (max abs diff 0, y400–1000); Nov 24 verse band pixel-identical as noted above. "Coming soon" wording exact in both images and captions; no dates or availability claims.
- Both finals and both squares were viewed full-frame after the fix, in addition to the 100% crops listed above.

---

## Skeptic round 1 fix — 2026-11-11

Rework after Skeptic's FAIL on Nov 18 / PASS-with-fixes on Nov 24 (r2 = commit 757d502 on lab-audio). The r2 finals are preserved in `work/gate-failed-r2/`. All work local — no GitHub upload, no Slack/Instagram posts. Finals and grid squares keep the same filenames; both squares regenerated and re-verified pixel-exact as centre crops (y 135–1215). Scripts: `work/fix_threshold_skeptic1.py`, `work/fix_light_skeptic1.py`. Lintel, crops and Nov 18 caption credit were already PASS and are untouched (Nov 18 lintel band y0–1000 max diff vs r2 = 0.0; verse wording unchanged on both items).

### Nov 18 · Threshold — Skeptic items 1–3

**1. Cloned floorboard patch right of the mat (hard edges, sun streak cut, fringe chopped) — FIXED by source restoration.**
The whole changed band (r2 diff vs source: x298–783, y1210–1301) was rebuilt from the untouched source render and spliced into the r2 final with a 16 px feather lying entirely where r2 == source, extended down to y1332 after a faint footer-ghost in r2's clone feather (a ≤10-level echo of "soon" at y1290–1310, traced to the r2 clone donor rows) was caught on a contrast-stretched crop and verified gone (amplified ×6 diff vs source below the fill zone is pure black). Floor, sun streak and mat fringe in the final are now source pixels verbatim, except where the old reference's glyphs sat.

**2. Grey smeared rectangle on the lower mat — FIXED by glyph-shaped erase from source (no rectangle anywhere).**
The old reference was removed from the source with an organic, letterform-shaped mask only: bright-deviation cores (lum − local bg > 16; two earlier colour/flatness masks failed — sunlit coir is itself gold-coloured and flat, and produced a 38k-pixel blob fill; both attempts were rejected on sight and are not in the final), plus a dark-deviation halo within 3 px, filled by LF diffusion + local small-roll (6–30 px) detail composite, with a second pass at threshold > 9 for the dimmer letter bottoms. Residual bright-core pixels in the zone fell from 10,918 (source, incl. natural coir specks) to 1,926, and the 100% crops show continuous coir with no seam, no smear and no letterforms. Evidence: `work/skeptic1-nov18-lower-mat-before.png` / `-after.png` (x240–720, y1190–1290, 100%), `work/skeptic1-nov18-mat-edge-before.png` / `-after.png` (x600–880, y1180–1330, 100%), `work/skeptic1-nov18-source-cleaned-bottom.png`.

**3. SHOULD — reference shadow strengthened — DONE.**
The reference was erased (diff-isolated mask vs the cleaned source) and re-set in the same font/size/tracking (Montserrat SemiBold 27 px, tracking 7, gold 224/178/94, same position) with a two-layer shadow: a blurred (1.3 px) near-black layer at offset (1,3) plus a crisp 60% dark pass at (1,2), replacing r2's single (1,2) offset. Drawn bbox x347–736, ink y1165–1189 — fully inside the square with a 26 px margin to its bottom edge. At phone size (360 px-wide square) "PSALM 121:8 — WEB" is now clearly legible against the tan mat. Evidence: `work/skeptic1-nov18-ref-shadow-before.png` / `-after.png` (100%).

Total Nov 18 change vs r2 is confined to rows 1167–1301, cols 280–783 (the ref redraw + the rebuilt band). Square mean luminance 87.4 — LIGHT-WARM unchanged.

### Nov 24 · Light That Stays — Skeptic items 1–2

**1. MUST — pavement block edges feathered — DONE (all three edges).**
- Left (~x120) and right (~x940) vertical edges: cosine cross-fade between the block and the v1 original over 108 px bands (left x76–184, right x896–1004, from y1150 down; above y1176 the two versions are identical so the verse is untouched). The v1 bands were verified glyph-free first (only sparse natural wet-stone glints, ≤66 px > 45 luminance, no letterforms).
- Top edge (~y1176; its top ~40 px are inside the square): the block's LF (already row-mean continuous at the seam: 15.17 → 15.16) is kept, and its detail layer cross-fades over y1176–1300 from natural-pavement composite detail — the lintel-proven method: detail composited from geometric transforms of v1 under a strict validity mask (glyphs, reflections, lamp and footer excluded, eroded 5 px) — to the block's own detail at y1300. Two earlier attempts were rejected on inspection and are NOT in the final: mirroring a wide donor strip mirrored the chalk letters' dark outlines as letter-shaped shadows under the verse, and mirror-tiling the 8 ink-free rows above the seam produced visible vertical drip stripes.
- Evidence (100%): `work/skeptic1-nov24-pavement-left-before.png` / `-after.png`, `work/skeptic1-nov24-pavement-right-before.png` / `-after.png`, `work/skeptic1-nov24-pavement-top-before.png` / `-after.png`. No hard edge remains visible at 100% on any of the three sides; texture character now transitions gradually into the surrounding wet pavement.

**2. SHOULD — footer spacing — DONE via the 4:5-only band.**
Measured r2 gap: verse ink bottom y1167 → footer ink top y1183 = 16 px. A 30–40 px gap cannot fit inside the square (footer height 19 px: ink would end at 1167 + 35 + 19 = 1221 > square bottom 1215, i.e. clipped in the grid), so per Skeptic's alternative the footer moved into the 4:5-only band: old footer erased (glyph-mask LF + grain fill on the clean pavement), redrawn at ink **y1225–1244** (same font/size/width, 271 px) — a **58 px gap** below "overcome it.", starting 10 px below the square's bottom edge, fully legible in the 4:5 final on clean pavement. `nov24-caption.md`'s grid-crop note was updated to match. The grid square now ends on clean pavement below the verse (verified: all three verse lines + "JOHN 1:5 — WEB" fully inside, no footer, no reflection, no seam).

Verse integrity: the verse band is pixel-identical to r2 (max abs diff 0 for y0–1149; all changes are at y ≥ 1176). Total Nov 24 change vs r2: rows 1176–1339. Square mean luminance 32.8 — DARK-WARM unchanged. Verse wording untouched: "The light shines in the darkness, and the darkness hasn't overcome it." — JOHN 1:5 — WEB.

### Full-res sweep (both items)

Both finals were viewed full-frame and at 100% across every changed region after the fix; amplified-diff checks were run against the source (Nov 18) and r2 (Nov 24) to confirm changes are confined to the intended regions listed above and that no new letterforms, ghosts or seams were introduced. Files ready for re-delivery to lab-audio: `nov18-threshold-final.png`, `nov18-threshold-grid-square.png`, `nov18-caption.md`, `nov24-light-that-stays-final.png`, `nov24-light-that-stays-grid-square.png`, `nov24-caption.md`, `qa-report.md` (this report).

---

## CoS gate round 2 fix — 2026-11-11 (Nov 18 only)

Rework after CoS's gate on r3 (lab-audio commit 754edbf): **Nov 24 PASSED and is untouched** (files unmodified this round). Nov 18 FAILED on two doormat defects, both in the 4:5-only band below the grid square. The r3 Nov 18 files are preserved in `work/gate-failed-r3/`. All work local — no GitHub upload, no Slack/Instagram posts. Script: `work/fix_threshold_cosgate2.py` (reads r3 from the backup, so it is rerun-safe). Finals keep the same filenames; the grid square was regenerated and verified pixel-exact as the centre crop (y 135–1215) — and is in fact **pixel-identical to the r3 square**, because every change sits below the square's bottom edge.

### Diagnosis (before any edit)

- The defective zone in r3 is **pixel-identical to Skeptic round 1's cleaned source** (mean |diff| 0.0006 over x240–700, y1225–1300): both defects live in that round's glyph-erase fill, whose footprint in r3 is x280–725, y1229–1291 (16,700 px at |diff vs source| > 8).
- **Ghost text:** in the r3 100% crops the word "soon" is readable as a faint embossed row at x575–670, y1283–1292 — the mat's bottom edge, just above the footer (footer ink y1299–1317, "soon" at x575–672) — in normal, high-pass and inverted views (`work/cosgate2-nov18-ghost-before.png`, `-ghost-tight-before*.png`). High-pass correlation of the ghost zone against the footer's high-pass peaks at a 13 px shift (0.236, vs ≈0 at other shifts): a faint shifted echo of the footer, consistent with the Skeptic fill's detail stage, which **averaged 22 small rolls (6–30 px) of neighbourhood high-pass** — rolled copies sampled the footer's letter detail below the fill and averaged its echo into the fill.
- **Lower-mat smear / dissolved edge:** high-pass energy in r3's lower mat (x240–700, y1225–1300) is **9.00** vs **18.00** for the same box in the untouched source and 17.89 for the clean top mat; the right-edge box (x680–720, y1240–1300) is **4.48** vs 21.43 in the source. The same 22-roll averaging that imported the ghost destroys coir loop sharpness (each roll's loops average out), and it blurred the mat's right edge/fringe into the floor. The untouched source has clean, crisp coir and fringe for these zones — except where the old reference's own glyphs sit (in the source the reference spans x≈285–758, y≈1240–1290, and "WEB" straddles the mat's right edge onto the floorboards).

### Fix method (source restoration, lintel-proven — no roll-averaging)

1. **Cleaned source rebuilt.** Old-reference glyphs in the source masked organically: bright-deviation cores (>14 over a σ10 background) + gold mask + dark halo within 3 px, plus a >9 second pass for dim letter bottoms; fill mask = core dilated 2 (32,291 px; covers 95.8% of the source's gold pixels in the band, the rest being natural coir specks). Fill = diffusion low-frequency surface + **one coherent donor offset per letter patch** (75 patches built from the bright letter cores, fill pixels assigned to the nearest core): donors are glyph-free source pixels only, preferring the clean coir just above the fill (same perspective scale/lighting), each patch's detail rescaled to the local genuine high-pass std. The fallback never imports an invalid donor pixel (273 px, 0.8%, received LF only).
2. **Floor territory handled as floor.** Patches with target HP std < 7 (floor-class) received LF + matched fine grain only. The merged "— WEB" patch straddles the mat edge, so its floor-side detail is attenuated ~55% under a feathered ramp (x 682–696, LF 92–112) plus grain; and for **61 floor columns** the LF is a per-column vertical interpolation between the genuine floor anchors above and below the fill, because 2D diffusion flattened the sun streak's diagonal shadow step into a pale wash bounded by the territory shape.
3. **Splice into r3 only over the defect footprint** (|r3 − source| > 8 in y1215–1298 / x260–730, dilated 3) + the ghost box (x560–690, y1272–1297) + the mat right-edge box (x672–729, y1232–1297), feathered, hard-capped to y ≤ 1296 and x ≤ 728. Everything else is r3 verbatim.
4. **Rejected during this fix (inspected, not in the final):** per-pixel donor switching from the upper mat (sliced loops into horizontal streaks; also wrong texture scale — upper-mat loops are finer); labelling the dilated fill as patches (the whole word line merges into one patch whose fallback donor was a horizontal shift that could sample neighbouring letters); floor detail transplanted from below (plank-seam streaks); full-RGB floor transplant from below (donor sits in the door frame's shadow — dark rectangle with a two-offset seam).

### QA evidence (fixed final inspected full-frame and at 100% / 200%)

- **Ghost gone:** 100% crops of the ghost zone in normal, high-pass and inverted views (`work/cosgate2-nov18-ghost-after.png`, `-ghost-tight-after.png`, `-ghost-tight-after-highpass.png`, `-ghost-tight-after-inverted.png`) show continuous coir loops to the mat's bottom edge and **no glyph shapes in any view**; the only "Coming soon" is the real footer below. Ghost-zone high-pass vs footer high-pass correlation: max |corr| **0.127** (at a non-footer shift of 31; no peak at the footer shifts 13–17 where r3 peaked at 0.236).
- **Coir texture restored:** high-pass energy, final vs r3 (genuine reference): lower mat **15.37** (r3: 9.00; source: 18.00, letter-inflated; clean top mat: 17.89); ghost-tight box **14.40** (r3: 8.57). At 100% (`work/cosgate2-nov18-lowermat-after.png`) the lower third shows the same chunky loop character as the top half, with a defined bottom edge and shadow line across the full width.
- **Right edge/fringe defined:** at 100% and 200% (`work/cosgate2-nov18-matedge-after.png`, `work/cosgate2-diag-edge200-final.png`) the mat's right edge has visible coir loops and loose fringe strands against the floor, the "WEB" spill territory reads as sunlit floorboards with the plank seam running through, and no letterforms remain. The edge box's high-pass number (final 4.33) is not the evidence here — most of that box is smooth floor once the letters are gone, so it sits in the letter-free baseline class (source left-edge box: 4.72; r3 was 4.48 with the edge visually dissolved); the evidence is the inspected fringe/edge definition in the crops.
- **Changes confined:** amplified ×6 diff vs r3 (`work/cosgate2-nov18-diff-amp-full.png`, `-diff-amp.png`) is a single organic band over the old fill footprint — changed bbox **x275–728, y1224–1295**, 18,725 px > 8. **Max diff 0.0** for y < 1215 (lintel, verse and reference "PSALM 121:8 — WEB" with its strengthened shadow, ink y1165–1189, are pixel-identical to r3), **0.0** for y ≥ 1297 (footer "Long Road · Coming soon" untouched, still in the 4:5-only band), **0.0** for x ≥ 729 (floor patch / sun streak pixel-identical) and x < 260.
- **Format/tone:** final 1080×1350 PNG; square 1080×1080 PNG, pixel-verified exact centre crop of the fixed final (max diff 0) and pixel-identical to the r3 square; square mean luminance **87.4** — **LIGHT-WARM** unchanged; the square still shows the verse fragment's mat + reference fully with margins (26 px to the square's bottom edge, as set in Skeptic round 1). Verse wording unchanged; `nov18-caption.md` needed no update and is unmodified.

Files ready for re-delivery to lab-audio: `nov18-threshold-final.png`, `nov18-threshold-grid-square.png`, `qa-report.md` (this report). Nov 24 files are not part of this re-delivery (already passed at r3).
