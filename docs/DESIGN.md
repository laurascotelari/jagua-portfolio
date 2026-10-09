# Jagua jpg — Design Specs

Design details for every page of the portfolio. Each page has its own section with the same structure.
Values marked `~` are estimates taken from the reference mockup (1440 × 1024).

**Site structure:** the site is one long scrolling page at `/`, with sections in this order: Home (hero, `#home`), Check the Cards (`#cards`), Gallery (`#gallery`), About me (`#about`). A single sticky pink header holds the nav; its links smooth-scroll to each section and underline the one in view. `/gallery`, `/cards` and `/about` permanently redirect to their sections. The "pages" below describe each section.

## Pages

- [Global palette](#global-palette)
- [Landing Page](#landing-page)
- [Check the Cards](#check-the-cards)
- [Gallery](#gallery)

---

## Global palette

The whole site uses **only these three colors**. Every page's palette below maps onto them; no other hex values are used in the UI.

| Token | Hex | Name | Roles |
|---|---|---|---|
| `--color-pink` | `#FECBCC` | Pink | Landing background, Gallery header, card frames, tile placeholders |
| `--color-cream` | `#FBF3DD` | Cream | Check the Cards background, Gallery grid background, card-back inset |
| `--color-navy` | `#160066` | Navy | All text, illustration ink, card-back print, shadow tint |

Rules:
- **Text** is always `--color-navy`.
- **Shadows** use navy at low opacity (`rgba(22, 0, 102, 0.2)`). No other tints.
- **Artwork** (gallery images, revealed card drawings) keeps its own colors. The palette applies to the UI only.
- **Illustration assets** (Landing desk drawing, card-back print) should be recolored to `--color-navy`.

```css
:root {
  --color-pink: #FECBCC;
  --color-cream: #FBF3DD;
  --color-navy: #160066;
  --color-navy-shadow: rgba(22, 0, 102, 0.2);

  --font-pixel: "DotGothic16", "VT323", "Courier New", monospace;
  --font-script: "Nothing You Could Do", "Homemade Apple", "Caveat", cursive;
}
```

Page-level tokens below reference these variables instead of repeating hex values.

---

## Landing Page

### Overview

Flat, hand-made, retro-pixel artist portfolio. There are only two colors: navy ink line art on a solid pastel pink background. Pixel/bitmap type gives it a lo-fi, zine-like feel. **Light theme.**

### Layout

- **Canvas:** 1440 × 1024 viewport, full-bleed, no visible max-width container (if you want one, use `max-width: 1440px`).
- **Top to bottom:**
  1. **Nav row:** 3 text links, top-left, at `top: ~24px`, `left: ~32px`.
  2. **Hero:** split into two columns.
     - **Left (~40%, 0–580px):** the wordmark "Jagua jpg" at `left: ~108px`, vertically centred at `~430px` from the top (just above the viewport's centre).
     - **Right (~60%, ~600–1280px):** a large line illustration of a desk and gallery wall. Its top sits at `~45px`, and it bleeds off the bottom edge of the viewport.
- **Grid:** 2 columns, roughly `5fr 7fr`, with no gutter rules. The illustration ends `~160px` from the right edge, so the right side has generous empty pink space.
- **Section spacing:** only one section (the hero).
- **Alignment:** everything is left-aligned. The illustration is anchored bottom-right.

### Color palette

| Role | Hex | Where used |
|---|---|---|
| Background | `#FECBCC` (pink) | Full page |
| Surface | Not present (same as background) | — |
| Primary (ink) | `#160066` (navy) | Wordmark, nav links, all illustration lines and fills |
| Secondary | Not present (single navy ink) | — |
| Accent | Not present | — |
| Text primary | `#160066` (navy) | All text |
| Text secondary | Not present | — |
| Border | `#160066` (navy) | Illustration strokes only |
| Success / Error | Not present | — |

### Typography

- **Family:** a pixel/bitmap face with monospaced proportions. Closest Google Font is **DotGothic16**, with **VT323** and **Silkscreen** as alternatives.
- **Stack:** `var(--font-pixel)`

| Level | Size | Weight | Line-height | Letter-spacing | Case | Color |
|---|---|---|---|---|---|---|
| H1 (wordmark) | ~96px | 400 | 1.0 | ~0.02em | Sentence ("Jagua jpg") | `#160066` |
| H2 | Not present | — | — | — | — | — |
| H3 | Not present | — | — | — | — | — |
| Body | Not present (suggest 18px / 400 / 1.5) | — | — | — | — | — |
| Small | Not present | — | — | — | — | — |
| Button | Not present | — | — | — | — | — |
| Link (nav) | ~28px | 400 | 1.2 | ~0.02em | Sentence ("Gallery", "About me", "Check the Cards") | `#160066` |

### Navbar

- **Position:** static (it sits in the page flow, not overlaid on the illustration). It could also be absolute top-left.
- **Height:** ~80px.
- **Background:** transparent (the page pink shows through).
- **Border / shadow:** none.
- **Logo:** not in the nav. The H1 wordmark in the hero acts as the logo.
- **Links:** "Gallery", "About me", "Check the Cards". ~28px, weight 400, `#160066`. The gap between links is ~75px, and the first link starts at `left: ~32px`. No underline.
- **Active / hover state:** not visible in the mockup. Suggested: `text-decoration: underline; text-underline-offset: 6px; text-decoration-thickness: 2px`.
- **CTA button:** Not present.

### Buttons

| Variant | Background | Text | Border | Radius | Shadow | Padding | Font | Icon |
|---|---|---|---|---|---|---|---|---|
| Primary | Not present | — | — | — | — | — | — | — |
| Secondary | Not present | — | — | — | — | — | — | — |
| Ghost | Not present | — | — | — | — | — | — | — |
| Link | transparent | `#160066` | no | 0 | none | 0 | 28px pixel font, 400 | none |

If you need a button in this style, use: `background: transparent; border: 2px solid #160066; border-radius: 0; padding: 8px 20px; box-shadow: none`.

### Cards & containers

Not present as UI. The illustration contains drawn frames: rectangular, `~2px` navy stroke, `0` radius. Use these as the reference for any gallery cards: `background: transparent; border: 2px solid #160066; border-radius: 0; box-shadow: none; padding: ~8px`.

### Forms & inputs

Not present.

### Imagery & icons

- **Icons:** Not present.
- **Illustration:**
  - Hand-drawn navy pen line art on a transparent background (it sits directly on the pink, no box).
  - Strokes are uneven, ~2–3px, with solid navy fills and cross-hatching for shadows.
  - Roughly 680 × 1000px.
  - No radius, no overlay, cropped at the bottom edge.
  - Ink should be recolored to `#160066`.
- **Image treatment:** duotone, navy only on the pink background. Any gallery images should ideally be shown as duotone (`#160066` on `#FECBCC`) or in thin navy frames.

### Effects & details

- **Shadows:** none
- **Gradients:** none
- **Blur:** none
- **Opacity:** 100% everywhere
- **Dividers:** none
- **Recurring motifs:**
  - Pixel typography
  - Hand-drawn navy ink line work
  - Picture-frame rectangles (a "gallery wall" grid of small frames)
  - Strict two-color duotone
  - Sharp corners, `0` radius throughout

### Design tokens

```css
:root {
  /* Colors */
  --color-bg: var(--color-pink);
  --color-text: var(--color-navy);
  --color-border: var(--color-navy);

  /* Type scale */
  --fs-h1: 96px;
  --fs-nav: 28px;
  --fs-body: 18px;
  --fw-regular: 400;
  --lh-tight: 1.0;
  --lh-nav: 1.2;
  --lh-body: 1.5;
  --ls-pixel: 0.02em;

  /* Radii */
  --radius-none: 0;

  /* Borders */
  --border-ink: 2px solid var(--color-navy);

  /* Shadows */
  --shadow-none: none;

  /* Spacing / layout */
  --page-pad-x: 32px;
  --nav-top: 24px;
  --nav-height: 80px;
  --nav-gap: 75px;
  --hero-text-left: 108px;
  --hero-cols: 5fr 7fr;
  --illustration-right-gap: 160px;
  --frame-pad: 8px;
}
```

---

## Check the Cards

### Overview

Cozy, playful "tarot-style" page. Vintage playing-card backs sit on a warm cream background. Navy text mixes pixel type with a handwritten script, and the revealed card looks like a polaroid. **Light theme.**

The page has two states:
- **A (pick):** a row of 5 face-down cards.
- **B (reveal):** one card turns over and expands, showing the artwork on the left and its text on the right.

### Layout

#### State A: pick

- **Canvas:** 1440 × 1024, full-bleed, no visible container.
- **Top to bottom:**
  1. **Heading block** at `left: ~104px`, `top: ~112px`:
     - H1 on one line.
     - Script subtitle directly below, `~8px` gap, starting `~6px` further left (`~98px`).
  2. **Card row** at `top: ~318px`, `~150px` below the subtitle:
     - 5 cards, each `~222 × 348px` (ratio ~0.64, close to playing-card 5:7.5).
     - Gap between cards: `~54px`.
     - Row spans `~57px` to `~1383px`, so `~57px` side margins.
     - `display: flex; justify-content: space-between`.
- **Below the row:** empty cream space (`~360px`).
- **Alignment:** heading left-aligned. Cards evenly spread and top-aligned.

#### State B: reveal

- **Grid:** 2 columns, `grid-template-columns: ~522px 1fr`, with a `~48px` gap.
  - Left column starts at `~89px`.
  - Right column runs `~659px` to `~1370px` (`~710px` wide).
  - Top padding `~60px`.
- **Left column (expanded card):** `~522 × 785px` (ratio ~2:3), `top: ~60px`.
- **Right column (text, top to bottom):**

  | Element | Top position | Spacing |
  |---|---|---|
  | Title (H1) | `~72px` | — |
  | Year (script) | `~130px` | `~12px` below the title |
  | Description | `~210px` | `~60px` below the year; 2 paragraphs, `~35px` between them |
  | H2 "What does it mean for your day?" | `~600px` | `~80px` above it |
  | Meaning paragraph | — | `~20px` below the H2 |

- **Alignment:** everything left-aligned. Text column top-aligned with the card.

#### Interaction

The motion isn't visible in the mockups, so these values are suggested.

1. **Click a card back:** the card flips with `transform: rotateY(180deg)`, `perspective: 1200px`, `transform-style: preserve-3d`, `backface-visibility: hidden`, `~600ms cubic-bezier(0.4, 0, 0.2, 1)`.
2. **At the same time,** it moves and scales from its slot to the State B position (`~222×348` → `~522×785`, about ×2.3) over `~600ms`. A FLIP technique or a shared-layout animation works for this.
3. **The other 4 cards** fade out: `opacity: 0` over `~250ms`.
4. **Heading and subtitle** fade out over `~250ms`.
5. **Text column** fades in after the flip: `opacity 0→1`, `translateY(12px→0)`, `~400ms`, `~450ms` delay.
6. **Close / back control:** Not present. A way to return is needed; suggested: an `Esc` key handler plus a small text link.

### Color palette

| Role | Hex | Where used |
|---|---|---|
| Background | `#FBF3DD` (cream) | Full page, both states |
| Surface (card frame) | `#FECBCC` (pink) | Card frame, polaroid body |
| Card-back inset | `#FBF3DD` (cream) | Panel behind the card-back print |
| Primary (card-back print) | `#160066` (navy) | Card-back pattern lines and fills |
| Secondary | Not present | — |
| Accent | Not present in the UI (colors come from the artwork) | — |
| Text primary | `#160066` (navy) | H1, H2, body, script |
| Text secondary | Not present (all text is the same navy) | — |
| Border | Not present (cards use pink frames + shadow, no strokes) | — |
| Shadow tint | `rgba(22, 0, 102, 0.2)` (navy at 20%) | Shadow under cards |
| Success / Error | Not present | — |

### Typography

- **Pixel/gothic face (headings + body):** closest Google Font is **DotGothic16**.
  - Stack: `var(--font-pixel)`
- **Handwritten script (subtitle, year):** thin, monoline, slanted cursive. Closest Google Font is **Nothing You Could Do**.
  - Stack: `var(--font-script)`

| Level | Size | Weight | Line-height | Letter-spacing | Case | Color |
|---|---|---|---|---|---|---|
| H1, page heading ("What does the cards say…") | ~40px | 400 | 1.2 | ~0.02em | Sentence | `#160066` |
| H1, artwork title ("Artwork Title") | ~40px | 400 | 1.2 | ~0.04em | Title Case | `#160066` |
| H2 ("What does it mean for your day?") | ~30px | 400 | 1.3 | ~0.02em | Sentence | `#160066` |
| H3 | Not present | — | — | — | — | — |
| Script subtitle ("pick you and find out!") | ~28px | 400 | 1.2 | 0 | lowercase | `#160066` |
| Script small (year "2026") | ~20px | 400 | 1.2 | 0 | — | `#160066` |
| Body (description) | ~22px | 400 | ~35px (1.6) | ~0.01em | Sentence, wrapped in quotes | `#160066` |
| Small | Not present | — | — | — | — | — |
| Button | Not present | — | — | — | — | — |
| Link | Not present | — | — | — | — | — |

### Navbar

Not present in either state. For consistency, reuse the [Landing Page navbar](#navbar): static, top-left, pixel font ~28px, navy, `~75px` gaps.

### Buttons

| Variant | Background | Text | Border | Radius | Shadow | Padding | Font | Icon |
|---|---|---|---|---|---|---|---|---|
| Primary | Not present | — | — | — | — | — | — | — |
| Secondary | Not present | — | — | — | — | — | — | — |
| Ghost | Not present | — | — | — | — | — | — | — |
| Link | Not present | — | — | — | — | — | — | — |

The cards themselves are the clickable elements. Use `cursor: pointer`. Suggested hover: `transform: translateY(-8px)` over `~200ms`, with a deeper shadow.

### Cards & containers

| Container | Size | Background | Border | Radius | Shadow | Padding |
|---|---|---|---|---|---|---|
| Card (back, State A) | ~222 × 348px | `#FECBCC` frame, `#FBF3DD` inset holding the navy print | none | ~14px (inset corners: 0) | `0 4px 3px rgba(22, 0, 102, 0.2)` | ~8px all sides |
| Card (front, State B, polaroid) | ~522 × 785px | `#FECBCC` | none | ~16px | `0 4px 3px rgba(22, 0, 102, 0.2)` | top ~28px, sides ~22px, bottom ~80px |
| Text column | ~710px wide | none (sits on the page) | none | — | none | 0 |

### Forms & inputs

Not present.

### Imagery & icons

- **Icons:** Not present.
- **Card-back print:** classic ornate playing-card back.
  - Symmetric border scrolls, a diamond lattice, and a central round medallion.
  - Single color `#160066` on the `#FBF3DD` inset (the asset must be recolored from the mockup's pink).
  - Fills the inset, `0` radius.
  - The same back is used on all 5 cards.
- **Revealed artwork:**
  - Full-color painting inside the polaroid frame.
  - Roughly `~478 × 677px`, ratio ~0.7, `0` radius.
  - No overlay or filter.
  - One drawing per card.

### Effects & details

- **Shadows:** one tight, downward navy-tinted shadow on every card: `0 4px 3px rgba(22, 0, 102, 0.2)`. There is no blur halo, just a short "lip" under the bottom edge.
- **Gradients:** none
- **Blur:** none
- **Dividers:** none
- **Opacity:** 100% at rest. Changes only during the transition (see [Interaction](#interaction)).
- **Recurring motifs:**
  - Pixel type paired with a handwritten script line (subtitle under the H1, year under the title)
  - Pink-framed rounded cards (playing card → polaroid)
  - Warm cream paper background
  - Navy text, matching the Landing Page ink

### Design tokens

```css
:root {
  /* Colors */
  --color-bg: var(--color-cream);
  --color-card-frame: var(--color-pink);
  --color-card-inset: var(--color-cream);
  --color-card-print: var(--color-navy);
  --color-text: var(--color-navy);

  /* Type scale */
  --fs-h1: 40px;
  --fs-h2: 30px;
  --fs-body: 22px;
  --fs-script-lg: 28px;
  --fs-script-sm: 20px;
  --fw-regular: 400;
  --lh-heading: 1.2;
  --lh-body: 1.6;
  --ls-heading: 0.02em;
  --ls-title: 0.04em;

  /* Radii */
  --radius-card: 14px;
  --radius-card-lg: 16px;
  --radius-image: 0;

  /* Shadows */
  --shadow-card: 0 4px 3px var(--color-navy-shadow);
  --shadow-card-hover: 0 10px 12px var(--color-navy-shadow); /* suggested */

  /* Spacing: state A */
  --heading-left: 104px;
  --heading-top: 112px;
  --subtitle-gap: 8px;
  --cards-top: 318px;
  --cards-side: 57px;
  --cards-gap: 54px;
  --card-w: 222px;
  --card-h: 348px;
  --card-pad: 8px;

  /* Spacing: state B */
  --reveal-left: 89px;
  --reveal-top: 60px;
  --reveal-card-w: 522px;
  --reveal-card-h: 785px;
  --reveal-gap: 48px;
  --polaroid-pad-top: 28px;
  --polaroid-pad-x: 22px;
  --polaroid-pad-bottom: 80px;
  --title-year-gap: 12px;
  --year-body-gap: 60px;
  --paragraph-gap: 35px;
  --section-gap: 80px;
  --h2-body-gap: 20px;

  /* Motion (suggested) */
  --perspective: 1200px;
  --dur-flip: 600ms;
  --dur-fade: 250ms;
  --dur-text-in: 400ms;
  --delay-text-in: 450ms;
  --ease-flip: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Gallery

### Overview

A flat, image-first masonry wall in the style of Pinterest. A solid pink header sits above a dense cream grid of rounded image tiles. **Light theme.**

The reference's buttons and subtitles are intentionally left out: view/save counts, captions, star icons, corner badge icons and the floating "+" button. They are marked **Excluded** below.

### Layout

- **Canvas:** 1440 × 1024, full-bleed, no max-width container.
- **Top to bottom:**
  1. **Header band:** `0` to `~130px`, full width, pink. It holds the H1 "All Art" at `left: ~66px`, vertically centred (`~72px` from the top).
  2. **Masonry grid:**
     - Starts right under the header, at `~132px`, with no top margin.
     - The header is sticky, and the grid scrolls underneath it.
- **Columns:**
  - 7 columns at 1440px, `~195px` wide.
  - Column gutter `~14px`.
  - Grid padding `~14px` horizontally (the reference bleeds the outer columns off both edges; filling edge to edge is also fine).
- **Vertical gap between tiles:** `~14px`, matching the column gutter (the reference's `~40px` included the excluded caption row).
- **Tile height:** each tile keeps its image's natural aspect ratio (`height: auto`), which gives a staggered masonry flow.
- **Alignment:** all columns start at the same top. Items fill top to bottom per column (CSS `columns` layout).
- **Responsive (suggested):**

  | Viewport | Columns |
  |---|---|
  | ≥1440px | 7 |
  | ≥1200px | 6 |
  | ≥1000px | 5 |
  | ≥768px | 4 |
  | ≥560px | 3 |
  | Smaller | 2 |

### Color palette

| Role | Hex | Where used |
|---|---|---|
| Background (grid) | `#FBF3DD` (cream) | Area behind the masonry grid |
| Surface (header) | `#FECBCC` (pink) | Header band |
| Primary (ink) | `#160066` (navy) | H1 "All Art" |
| Secondary | Not present | — |
| Accent | Not present (colors come from the artworks) | — |
| Text primary | `#160066` (navy) | H1 |
| Text secondary | Excluded | — |
| Border | Not present | — |
| Tile placeholder | `#FECBCC` (pink) | Loading color behind each image |
| Success / Error | Not present | — |

### Typography

- **Family:** pixel/bitmap face, the same as the other pages. Closest Google Font is **DotGothic16**.
  - Stack: `var(--font-pixel)`

| Level | Size | Weight | Line-height | Letter-spacing | Case | Color |
|---|---|---|---|---|---|---|
| H1 ("All Art") | ~40px | 400 | 1.2 | ~0.06em | Title Case | `#160066` |
| H2 | Not present | — | — | — | — | — |
| H3 | Not present | — | — | — | — | — |
| Body | Not present | — | — | — | — | — |
| Small | Excluded (captions) | — | — | — | — | — |
| Button | Excluded | — | — | — | — | — |
| Link | Not present | — | — | — | — | — |

### Navbar

- **Position:** sticky top (`position: sticky; top: 0; z-index: 10`). The grid scrolls under it.
- **Height:** `~130px`.
- **Background:** `#FECBCC`, solid and opaque.
- **Border / shadow:** none.
- **Title placement:** the H1 is left-aligned at `~66px` and vertically centred.
- **Links:** Not present. The [Landing Page navbar](#navbar) links could go in this band.
- **CTA button:** Not present.

### Buttons

| Variant | Background | Text | Border | Radius | Shadow | Padding | Font | Icon |
|---|---|---|---|---|---|---|---|---|
| Primary | Excluded ("+" FAB) | — | — | — | — | — | — | — |
| Secondary | Not present | — | — | — | — | — | — | — |
| Ghost | Excluded (star/save icons) | — | — | — | — | — | — | — |
| Link | Not present | — | — | — | — | — | — | — |

### Cards & containers

| Container | Background | Border | Radius | Shadow | Padding |
|---|---|---|---|---|---|
| Image tile | `#FECBCC` (placeholder while loading) | none | ~12px, all 4 corners | none | 0 (image fills the tile edge to edge) |
| Grid container | `#FBF3DD` | none | 0 | none | `~14px` horizontal; `0` top |

### Forms & inputs

Not present.

### Imagery & icons

- **Icons:** Excluded (stars, counts, badges).
- **Image treatment:**
  - `width: 100%; height: auto; display: block; border-radius: ~12px; object-fit: cover`.
  - Natural aspect ratios, mostly portrait (~1:1 to ~1:1.7), some landscape (~1.6:1).
  - No overlay, filter or border.
- **Content:** a mix of illustrations, paintings and photos, all shown in full color.

### Effects & details

- **Shadows:** none on tiles or header.
- **Gradients:** none
- **Blur:** none
- **Dividers:** none. The header meets the grid with a hard color edge.
- **Opacity:** 100%.
- **Hover (suggested):** `filter: brightness(0.92)` or `transform: scale(1.01)` over `~200ms`, plus `cursor: zoom-in` (opens the Lightbox).
- **Recurring motifs:**
  - Pink band + navy pixel title (shared with the Landing Page)
  - `~12px` rounded tiles
  - Tight, even `~14px` spacing

### Design tokens

```css
:root {
  /* Colors */
  --color-bg: var(--color-cream);
  --color-header: var(--color-pink);
  --color-text: var(--color-navy);
  --color-tile-placeholder: var(--color-pink);

  /* Type */
  --fs-h1: 40px;
  --fw-regular: 400;
  --lh-heading: 1.2;
  --ls-title: 0.06em;

  /* Radii */
  --radius-tile: 12px;

  /* Shadows */
  --shadow-tile: none;

  /* Header */
  --header-height: 130px;
  --header-pad-x: 66px;

  /* Masonry grid */
  --grid-columns: 7;
  --grid-col-width: 195px;
  --grid-gap-x: 14px;
  --grid-gap-y: 14px;
  --grid-pad-x: 14px;
  --grid-pad-top: 0;

  /* Motion (suggested) */
  --dur-hover: 200ms;
}
```

Reference implementation:

```css
.gallery-grid {
  columns: var(--grid-columns) var(--grid-col-width);
  column-gap: var(--grid-gap-x);
  padding: var(--grid-pad-top) var(--grid-pad-x);
}
.gallery-grid > * {
  break-inside: avoid;
  margin-bottom: var(--grid-gap-y);
  border-radius: var(--radius-tile);
  overflow: hidden;
  background: var(--color-tile-placeholder);
}
.gallery-grid img {
  display: block;
  width: 100%;
  height: auto;
}
```
