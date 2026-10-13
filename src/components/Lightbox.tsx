"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatMessage } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/locale-path";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";
import type { Artwork } from "@/lib/art";
import { paragraphs } from "@/lib/paragraphs";

type Props = {
  artwork: Artwork | null;
  onClose: () => void;
  previous?: Artwork | null;
  next?: Artwork | null;
  onSelect?: (artwork: Artwork) => void;
  inTodaysHand?: boolean;
};

export function Lightbox({ artwork, onClose, previous, next, onSelect, inTodaysHand = false }: Props) {
  const locale = useLocale();
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
      if (e.key === "ArrowLeft" && previous && onSelect) {
        e.preventDefault();
        onSelect(previous);
      }
      if (e.key === "ArrowRight" && next && onSelect) {
        e.preventDefault();
        onSelect(next);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [artwork, onClose, previous, next, onSelect]);

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={artwork.title}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-10"
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-cream/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 my-auto grid w-full max-w-[1100px] items-start gap-8 md:grid-cols-[minmax(0,480px)_minmax(0,1fr)]"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.figure
              layoutId={`art-${artwork.slug}`}
              className="cursor-zoom-out rounded-[16px] bg-pink px-[22px] pb-6 pt-[22px] shadow-card"
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              onClick={onClose}
            >
              <span className="relative block" style={{ aspectRatio: `${artwork.width} / ${artwork.height}` }}>
                <Image src={artwork.src} alt={artwork.title} fill sizes="(min-width: 768px) 480px, 92vw" className="object-contain" />
              </span>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="text-[24px] leading-[1.2] tracking-[0.04em]">{artwork.title}</span>
                {artwork.year && <span className="font-script text-[20px]">{artwork.year}</span>}
              </figcaption>
            </motion.figure>

            <div className="md:max-h-[70vh] md:overflow-y-auto">
              {artwork.description && (
                <div className="space-y-[35px] text-[clamp(18px,1.6vw,22px)] leading-[1.6] tracking-[0.01em]">
                  {paragraphs(artwork.description).map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}
              {inTodaysHand && (
                <p className={artwork.description ? "mt-10" : ""}>
                  <Link
                    href={localePath(locale, "cards")}
                    onClick={onClose}
                    className="nav-link font-script text-[22px] leading-[1.2]"
                  >
                    {dictionary.lightbox.inTodaysHand}
                  </Link>
                </p>
              )}
              {(previous || next) && onSelect && (
                <div className="mt-10 flex flex-wrap gap-8">
                  {previous && (
                    <button
                      type="button"
                      onClick={() => onSelect(previous)}
                      className="nav-link cursor-pointer text-[22px]"
                      aria-label={formatMessage(dictionary.lightbox.previousLabel, { title: previous.title })}
                    >
                      {dictionary.lightbox.previous}
                    </button>
                  )}
                  {next && (
                    <button
                      type="button"
                      onClick={() => onSelect(next)}
                      className="nav-link cursor-pointer text-[22px]"
                      aria-label={formatMessage(dictionary.lightbox.nextLabel, { title: next.title })}
                    >
                      {dictionary.lightbox.next}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
          <motion.button
            ref={closeRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="nav-link fixed right-4 top-4 z-10 cursor-pointer text-[22px] sm:right-8 sm:top-8"
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
