"use client";

import { useCallback, useState } from "react";
import type { Artwork } from "@/lib/art";
import { Lightbox } from "./Lightbox";
import { MasonryGrid } from "./MasonryGrid";

export function Gallery({ artworks }: { artworks: Artwork[] }) {
  const [selected, setSelected] = useState<Artwork | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <MasonryGrid artworks={artworks} onSelect={setSelected} />
      <Lightbox artwork={selected} onClose={close} />
    </>
  );
}
