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
