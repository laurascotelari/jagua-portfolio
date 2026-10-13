"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDictionary } from "@/i18n/LocaleProvider";
import type { Artwork } from "@/lib/art";

type Props = {
  artwork: Artwork | null;
  onClose: () => void;
};

export function Lightbox({ artwork, onClose }: Props) {
  const dictionary = useDictionary();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!artwork) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [artwork, onClose]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={artwork.title}
          className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-10"
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-cream/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.figure
            layoutId={`art-${artwork.slug}`}
            className="relative cursor-zoom-out rounded-[16px] bg-pink px-[22px] pb-6 pt-[22px] shadow-card"
            style={{ width: `min(92vw, calc(78vh * ${artwork.width / artwork.height}))` }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            <span className="relative block" style={{ aspectRatio: `${artwork.width} / ${artwork.height}` }}>
              <Image src={artwork.src} alt={artwork.title} fill sizes="92vw" className="object-contain" />
            </span>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4">
              <span className="text-[24px] leading-[1.2] tracking-[0.04em]">{artwork.title}</span>
              {artwork.year && <span className="font-script text-[20px]">{artwork.year}</span>}
            </figcaption>
          </motion.figure>
          <motion.button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="nav-link absolute right-4 top-4 z-10 cursor-pointer text-[22px] sm:right-8 sm:top-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            aria-label={dictionary.lightbox.closeLabel}
          >
            {dictionary.lightbox.close}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
