"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatMessage } from "@/i18n/dictionaries";
import { useDictionary } from "@/i18n/LocaleProvider";
import type { Artwork } from "@/lib/art";
import { isDateKey, pickCardsForDate, toDateKey } from "@/lib/daily";

const HAND_SIZE = 5;
const EASE_FLIP = [0.4, 0, 0.2, 1] as const;
const FLIP = { duration: 0.6, ease: EASE_FLIP };
const FADE = { duration: 0.25 };

/** Today's local date, or `?date=YYYY-MM-DD` for previewing other days. */
function getDateKey(): string {
  const override = new URLSearchParams(window.location.search).get("date");
  return override && isDateKey(override) ? override : toDateKey(new Date());
}

// Re-check the date when the tab comes back, so a tab left open overnight deals a new hand.
function subscribe(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function paragraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

function CardBack() {
  return (
    <div className="card-face p-2">
      <div className="relative h-full w-full overflow-hidden bg-cream">
        {/* Swap for the real card-back print (navy on cream). */}
        <Image src="/illustrations/card-back.svg" alt="" fill className="object-fill" />
      </div>
    </div>
  );
}

function CardFront({ art }: { art: Artwork }) {
  return (
    <div className="card-face card-face-front rounded-[16px] px-[4.2%] pb-[10%] pt-[5.4%]">
      <div className="relative h-full w-full">
        <Image src={art.src} alt={art.title} fill sizes="(min-width: 768px) 522px, 90vw" className="object-cover" />
      </div>
    </div>
  );
}

export function TarotCards({ artworks }: { artworks: Artwork[] }) {
  const dictionary = useDictionary();
  // null on the server and during hydration; the real date is only known in the browser.
  const dateKey = useSyncExternalStore(subscribe, getDateKey, () => null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showArtwork, setShowArtwork] = useState(false);

  const hand = dateKey
    ? pickCardsForDate(dateKey, artworks.length, HAND_SIZE).map((i) => artworks[i])
    : [];
  const art = hand.find((a) => a.slug === selected) ?? null;
  const canToggle = Boolean(art?.meaning && art.description);
  const showDescription = Boolean(art?.description && (showArtwork || !art.meaning));
  const body = showDescription ? art?.description : art?.meaning;

  if (artworks.length === 0) {
    return (
      <section className="px-8 py-28 md:pl-[104px]">
        <h1 className="text-[40px] leading-[1.2] tracking-[0.02em]">{dictionary.cards.emptyTitle}</h1>
        <p className="font-script mt-2 text-[28px] leading-[1.2]">{dictionary.cards.emptySubtitle}</p>
      </section>
    );
  }

  return (
    <div className="relative flex-1">
      <AnimatePresence mode="popLayout" initial={false}>
        {art ? (
          <motion.section
            key="reveal"
            aria-label={art.title}
            className="grid gap-12 px-6 pb-20 pt-[60px] md:grid-cols-[minmax(0,522px)_1fr] md:pl-[89px] md:pr-[70px]"
          >
            <motion.div
              layoutId={`card-${art.slug}`}
              transition={FLIP}
              className="card-3d mx-auto aspect-[522/785] w-full max-w-[522px] md:mx-0"
            >
              <motion.div
                className="card-flipper"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={FLIP}
              >
                <CardBack />
                <CardFront art={art} />
              </motion.div>
            </motion.div>

            <motion.div
              className="max-w-[710px] mt-60 md:pt-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: FADE }}
              transition={{ duration: 0.4, delay: 0.45 }}
            >
              <h1 className="text-[40px] leading-[1.2] tracking-[0.04em]">{art.title}</h1>
              {art.year && <p className="font-script mt-3 text-[20px] leading-[1.2]">{art.year}</p>}
              {body && (
                <div className="mt-5 space-y-[35px] text-[clamp(18px,1.6vw,22px)] leading-[1.6] tracking-[0.01em]">
                  {paragraphs(body).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {canToggle && (
                <button
                  type="button"
                  onClick={() => setShowArtwork((open) => !open)}
                  className="nav-link mt-16 cursor-pointer text-[22px]"
                >
                  {showArtwork ? dictionary.cards.meaningToday : dictionary.cards.discoverMore}
                </button>
              )}
            </motion.div>
          </motion.section>
        ) : (
          <motion.section key="pick" aria-label={dictionary.cards.pickAria} className="pb-20">
            <motion.div
              className="px-6 pt-[clamp(48px,7vw,112px)] md:pl-[104px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE}
            >
              <h1 className="text-[clamp(28px,2.8vw,40px)] leading-[1.2] tracking-[0.02em]">
                {dictionary.cards.pickTitle}
              </h1>
              <p className="font-script mt-2 -ml-1.5 text-[clamp(22px,2vw,28px)] leading-[1.2]">
                {dictionary.cards.pickSubtitle}
              </p>
            </motion.div>

            <ul className="mt-[clamp(48px,10vw,150px)] flex flex-wrap justify-center gap-6 px-6 md:flex-nowrap md:justify-between md:gap-[clamp(16px,3.75vw,54px)] md:px-[clamp(24px,4vw,57px)]">
              {dateKey
                ? hand.map((card, i) => (
                    <motion.li
                      key={card.slug}
                      className="w-[clamp(120px,40vw,222px)] md:w-auto md:flex-1 md:max-w-[222px]"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: FADE }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <motion.button
                        type="button"
                        layoutId={`card-${card.slug}`}
                        transition={FLIP}
                        onClick={() => {
                          setShowArtwork(false);
                          setSelected(card.slug);
                        }}
                        aria-label={formatMessage(dictionary.cards.cardAria, {
                          n: i + 1,
                          total: hand.length,
                        })}
                        className="card-3d group block aspect-[222/348] w-full cursor-pointer"
                      >
                        <motion.div
                          className="card-flipper transition-transform duration-200 group-hover:-translate-y-2 [&>.card-face]:transition-shadow [&>.card-face]:duration-200 group-hover:[&>.card-face]:shadow-card-hover"
                          initial={false}
                          animate={{ rotateY: 0 }}
                          transition={FLIP}
                        >
                          <CardBack />
                          <CardFront art={card} />
                        </motion.div>
                      </motion.button>
                    </motion.li>
                  ))
                : // Same-size invisible slots so the page doesn't jump once the date is known.
                  Array.from({ length: Math.min(HAND_SIZE, artworks.length) }, (_, i) => (
                    <li
                      key={i}
                      aria-hidden
                      className="aspect-[222/348] w-[clamp(120px,40vw,222px)] md:w-auto md:flex-1 md:max-w-[222px]"
                    />
                  ))}
            </ul>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
