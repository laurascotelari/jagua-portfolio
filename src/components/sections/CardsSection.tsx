"use client";

import { TarotCards } from "@/components/TarotCards";
import { useDictionary } from "@/i18n/LocaleProvider";
import type { Artwork } from "@/lib/art";

export function CardsSection({ artworks }: { artworks: Artwork[] }) {
  const dictionary = useDictionary();

  return (
    <section
      id="cards"
      aria-label={dictionary.cards.ariaLabel}
      className="flex min-h-[calc(100svh-var(--header-h))] flex-col bg-cream"
    >
      <TarotCards artworks={artworks} />
    </section>
  );
}
