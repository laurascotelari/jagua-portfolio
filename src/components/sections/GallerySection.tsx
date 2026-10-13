"use client";

import { Gallery } from "@/components/Gallery";
import { useDictionary } from "@/i18n/LocaleProvider";
import type { Artwork } from "@/lib/art";

export function GallerySection({ artworks }: { artworks: Artwork[] }) {
  const dictionary = useDictionary();

  return (
    <section id="gallery" aria-label={dictionary.gallery.ariaLabel} className="bg-cream">
      {artworks.length === 0 ? (
        <p className="px-8 py-16 text-[22px] md:px-[66px]">{dictionary.gallery.empty}</p>
      ) : (
        <Gallery artworks={artworks} />
      )}
    </section>
  );
}
