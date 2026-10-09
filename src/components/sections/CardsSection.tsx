import { TarotCards } from "@/components/TarotCards";
import type { Artwork } from "@/lib/art";

export function CardsSection({ artworks }: { artworks: Artwork[] }) {
  return (
    <section
      id="cards"
      aria-label="Check the Cards"
      className="flex min-h-[calc(100svh-var(--header-h))] flex-col bg-cream"
    >
      <TarotCards artworks={artworks} />
    </section>
  );
}
