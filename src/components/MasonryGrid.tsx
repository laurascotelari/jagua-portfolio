"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Artwork } from "@/lib/art";

// A repeating set of small tilts so the wall looks hand-pinned.
const TILTS = [-2.5, 1.5, -1, 2.2, -0.6, 1];

export const tiltFor = (index: number) => TILTS[index % TILTS.length];

type Props = {
  artworks: Artwork[];
  onSelect: (artwork: Artwork) => void;
};

export function MasonryGrid({ artworks, onSelect }: Props) {
  return (
    <ul className="columns-1 gap-10 sm:columns-2 lg:columns-3 xl:columns-4">
      {artworks.map((art, i) => (
        <motion.li
          key={art.slug}
          className="mb-12 break-inside-avoid"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ type: "spring", stiffness: 140, damping: 18, delay: (i % 4) * 0.06 }}
        >
          <motion.button
            type="button"
            layoutId={`art-${art.slug}`}
            onClick={() => onSelect(art)}
            className="pinned block w-full cursor-zoom-in text-left"
            style={{ rotate: tiltFor(i) }}
            whileHover={{ rotate: 0, scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 12 } }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Open ${art.title}`}
          >
            <span className="relative block" style={{ aspectRatio: `${art.width} / ${art.height}` }}>
              <Image
                src={art.src}
                alt={art.title}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </span>
            <span className="mt-2 block font-hand text-2xl leading-none">{art.title}</span>
          </motion.button>
        </motion.li>
      ))}
    </ul>
  );
}
