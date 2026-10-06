# jagua-portfolio

# Main Idea 
Art portfolio for an illustrator. Should allow the user to easily add new images to the protfolio. The website must have a section with multiple Art works in a simmilar design to pinterest. The landing page should have a big image (fills the whole page) and be a kind of 'Art of the Day', so there's a new image everyday (pseudo-random). The design should be creative and quirky.

## How to add art

1. Put the image in `public/art/` (`.jpg`, `.png`, `.webp`, `.avif` or `.gif`).
2. Commit and push. The site rebuilds and the image appears in the gallery and can be dealt as one of the day's 5 cards on **Check the Cards**.

**Naming**
- The title comes from the filename: `sleepy-fox.jpg` → "Sleepy fox".
- Start the name with a date to sort newest first: `2026-10-05-sleepy-fox.jpg`. The date isn't part of the title.

**Optional details:** add a JSON file with the same name next to the image, for example `sleepy-fox.json`:

```json
{
  "title": "The Sleepy Fox",
  "year": 2026,
  "description": "Gouache on paper.\n\nA blank line starts a new paragraph.",
  "meaning": "Shown under \"What does it mean for your day?\" when the card is turned over."
}
```

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
- `src/lib/art.ts`: reads `public/art/`
- `src/lib/daily.ts`: picks the day's 5 cards
- `src/components/`: UI and animations (Motion)
- `src/app/globals.css`: design tokens (colours, fonts); full specs in `docs/DESIGN.md`
