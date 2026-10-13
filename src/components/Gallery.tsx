"use client";

import { useCallback, useState } from "react";
import type { Artwork } from "@/lib/art";
import { HAND_SIZE, pickCardsForDate } from "@/lib/daily";
import { useCardQuery } from "@/lib/use-card-query";
import { Lightbox } from "./Lightbox";
import { MasonryGrid } from "./MasonryGrid";

export function Gallery({ artworks }: { artworks: Artwork[] }) {
  const [selected, setSelected] = useState<Artwork | null>(null);
  const close = useCallback(() => setSelected(null), []);
  const query = useCardQuery();

  const index = selected ? artworks.findIndex((art) => art.slug === selected.slug) : -1;
  const previous = index >= 0 && artworks.length > 1 ? artworks[(index - 1 + artworks.length) % artworks.length] : null;
  const next = index >= 0 && artworks.length > 1 ? artworks[(index + 1) % artworks.length] : null;

  const deck = artworks.filter((art) => art.isCard);
  const inTodaysHand = Boolean(
    selected &&
      query &&
      pickCardsForDate(query.dateKey, deck.length, HAND_SIZE).some((i) => deck[i]?.slug === selected.slug),
  );

  return (
    <>
      <MasonryGrid artworks={artworks} onSelect={setSelected} />
      <Lightbox
        artwork={selected}
        onClose={close}
        previous={previous}
        next={next}
        onSelect={setSelected}
        inTodaysHand={inTodaysHand}
      />
    </>
  );
}
