"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { formatMessage } from "@/i18n/dictionaries";
import { useDictionary } from "@/i18n/LocaleProvider";
import type { Artwork } from "@/lib/art";

type Props = {
  artworks: Artwork[];
  onSelect: (artwork: Artwork) => void;
};

export function MasonryGrid({ artworks, onSelect }: Props) {
  const dictionary = useDictionary();

  return (
    <ul className="gallery-grid">
      {artworks.map((art) => (
        <motion.li
          key={art.slug}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            type="button"
            layoutId={`art-${art.slug}`}
            onClick={() => onSelect(art)}
            className="block w-full cursor-zoom-in overflow-hidden rounded-[12px] transition-[filter] duration-200 hover:brightness-[0.92]"
            aria-label={formatMessage(dictionary.gallery.openArtwork, { title: art.title })}
          >
            <span className="relative block" style={{ aspectRatio: `${art.width} / ${art.height}` }}>
              <Image
                src={art.src}
                alt={art.title}
                fill
                sizes="(min-width: 1440px) 14vw, (min-width: 1200px) 17vw, (min-width: 1000px) 20vw, (min-width: 768px) 25vw, (min-width: 560px) 33vw, 50vw"
                className="object-cover"
              />
            </span>
          </motion.button>
        </motion.li>
      ))}
    </ul>
  );
}
