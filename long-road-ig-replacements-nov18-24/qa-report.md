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
