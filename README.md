# jagua-portfolio

# Main Idea
Art portfolio for an illustrator. Should allow the user to easily add new images to the protfolio. The website must have a section with multiple Art works in a simmilar design to pinterest. The landing page should have a big image (fills the whole page) and be a kind of 'Art of the Day', so there's a new image everyday (pseudo-random). The design should be creative and quirky.

## How to add art

1. Put the image in `public/art/` (`.jpg`, `.png`, `.webp`, `.avif` or `.gif`).
2. Add an entry to `content/artworks.json` (see below).
3. Commit and push. The site rebuilds; the image appears in the gallery, and if `"isCard": true` it can be dealt as one of the day's 5 cards on **Check the Cards**.

**Catalog** (`content/artworks.json`) is the source of truth. Gallery order follows the array order. Only listed files are shown — an image alone in `public/art/` will not appear until it has a catalog entry.

```json
{
  "file": "sleepy-fox.jpg",
  "title": "The Sleepy Fox",
  "year": 2026,
  "description": "Gouache on paper.\n\nA blank line starts a new paragraph.",
  "meaning": "Shown under \"What does it mean for your day?\" when the card is turned over.",
  "isCard": true
}
```

| Field | Required | Notes |
|---|---|---|
| `file` | yes | Filename inside `public/art/` |
| `title` | no | Defaults from the filename (`sleepy-fox.jpg` → "Sleepy fox") |
| `year` | no | Number or numeric string |
| `description` | no | Artist story; shown when a card is revealed |
| `meaning` | no | Daily reading; shown under "What does it mean for your day?" |
| `isCard` | no | `true` to include in the daily deal; default `false` |

Stub copy such as `"Example 1"` or `"Descrição"` is ignored (treated as empty). Prefer real text, or omit the field.

**Naming tip:** start the filename with a date to record when it was added: `2026-10-05-sleepy-fox.jpg`. The date is not part of the title.

Delete the `placeholder-*.jpg` files once real art is in. Also swap the placeholder drawings in `public/illustrations/` (`desk.svg` for the landing page, `card-back.svg` for the cards). Keep the same names, or update the paths in `src/app/page.tsx` and `src/components/TarotCards.tsx`.

**Preview another day's cards:** open `/cards?date=2026-12-25`.

## Development

Requires Node 20.9 or newer.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run build` | Production build (also type-checks) |

Code map:
- `content/artworks.json`: artwork metadata catalog
- `src/lib/art.ts`: reads the catalog and `public/art/`
- `src/lib/daily.ts`: picks the day's 5 cards
- `src/components/`: UI and animations (Motion)
- `src/app/globals.css`: design tokens (colours, fonts); full specs in `docs/DESIGN.md`
