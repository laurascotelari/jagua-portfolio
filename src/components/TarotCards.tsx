"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatMessage } from "@/i18n/dictionaries";
import { cardSharePath } from "@/i18n/locale-path";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";
import type { Artwork } from "@/lib/art";
import { HAND_SIZE, pickCardsForDate } from "@/lib/daily";
import type { Draw } from "@/lib/grimoire";
import { paragraphs } from "@/lib/paragraphs";
import { showCardQuery, useCardQuery } from "@/lib/use-card-query";
import { useGrimoire } from "@/lib/use-grimoire";

const EASE_FLIP = [0.4, 0, 0.2, 1] as const;
const FLIP = { duration: 0.6, ease: EASE_FLIP };
const FADE = { duration: 0.25 };

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
  const locale = useLocale();
  const dictionary = useDictionary();
  const query = useCardQuery();
  const dateKey = query?.dateKey ?? null;
  const queryCard = query?.card ?? null;
  const { draws, record, saveNote } = useGrimoire();
  const [picked, setPicked] = useState<string | null>(null);
  const [ignoredCard, setIgnoredCard] = useState<string | null>(null);
  // The card that was just put back, so it flips face-down on its way home.
  const [returning, setReturning] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const backRef = useRef<HTMLButtonElement>(null);

  const hand = dateKey
    ? pickCardsForDate(dateKey, artworks.length, HAND_SIZE).map((i) => artworks[i])
    : [];
  const handKey = hand.map((card) => card.slug).join("|");
  const token = `${dateKey ?? ""}:${queryCard ?? ""}`;
  const [seenToken, setSeenToken] = useState(token);
  let activePicked = picked;
  let activeIgnored = ignoredCard;
  // A new share link should open its card, not keep the one the visitor just closed.
  if (dateKey && token !== seenToken) {
    activePicked = null;
    activeIgnored = null;
    setSeenToken(token);
    setPicked(null);
    setIgnoredCard(null);
  }
  const fromQuery =
    queryCard && queryCard !== activeIgnored && handKey.split("|").includes(queryCard) ? queryCard : null;
  const selected = activePicked ?? fromQuery;
  const art = hand.find((a) => a.slug === selected) ?? null;
  const note =
    art && dateKey ? (draws.find((draw) => draw.date === dateKey && draw.slug === art.slug)?.note ?? "") : "";

  const close = useCallback(() => {
    setReturning(selected);
    setPicked(null);
    setIgnoredCard(queryCard);
    setCopied(false);
  }, [selected, queryCard]);

  function openDraw(draw: Draw) {
    showCardQuery(draw.date, draw.slug);
    setReturning(null);
    document.getElementById("cards")?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (!dateKey || !selected || !handKey.split("|").includes(selected)) return;
    record(dateKey, selected);
  }, [dateKey, selected, handKey, record]);

  async function copyShare() {
    if (!art || !dateKey) return;
    const path = cardSharePath(locale, dateKey, art.slug);
    const url = new URL(path, window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  useEffect(() => {
    if (!art) return;
    backRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [art, close]);

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
              {art.description && (
                <div className="mt-[60px] space-y-[35px] text-[clamp(18px,1.6vw,22px)] leading-[1.6] tracking-[0.01em]">
                  {paragraphs(art.description).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}
              {art.meaning && (
                <>
                  <h2 className="mt-20 text-[30px] leading-[1.3] tracking-[0.02em]">
                    {dictionary.cards.meaningHeading}
                  </h2>
                  <div className="mt-5 space-y-[35px] text-[clamp(18px,1.6vw,22px)] leading-[1.6] tracking-[0.01em]">
                    {paragraphs(art.meaning).map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </>
              )}
              <label className="mt-12 block max-w-[32rem]">
                <span className="font-script text-[22px] leading-[1.2]">{dictionary.cards.grimoireNote}</span>
                <input
                  type="text"
                  value={note}
                  maxLength={280}
                  onChange={(e) => {
                    if (!dateKey) return;
                    saveNote(dateKey, art.slug, e.target.value);
                  }}
                  aria-label={dictionary.cards.grimoireNoteLabel}
                  className="mt-2 w-full border-b-2 border-navy bg-transparent py-2 text-[18px] leading-[1.4] outline-none"
                />
              </label>
              <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4">
                <button
                  ref={backRef}
                  type="button"
                  onClick={close}
                  className="nav-link cursor-pointer text-[22px]"
                >
                  {dictionary.cards.back}
                </button>
                <button
                  type="button"
                  onClick={copyShare}
                  className="nav-link cursor-pointer text-[22px]"
                  aria-label={dictionary.cards.shareLabel}
                >
                  {copied ? dictionary.cards.shared : dictionary.cards.share}
                </button>
              </div>
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
                      initial={returning ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: FADE }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                    >
                      <motion.button
                        type="button"
                        layoutId={`card-${card.slug}`}
                        transition={FLIP}
                        onClick={() => {
                          setPicked(card.slug);
                          if (dateKey) record(dateKey, card.slug);
                        }}
                        onLayoutAnimationComplete={() => setReturning(null)}
                        aria-label={formatMessage(dictionary.cards.cardAria, {
                          n: i + 1,
                          total: hand.length,
                        })}
                        className="card-3d group block aspect-[222/348] w-full cursor-pointer"
                      >
                        <motion.div
                          className="card-flipper transition-transform duration-200 group-hover:-translate-y-2 [&>.card-face]:transition-shadow [&>.card-face]:duration-200 group-hover:[&>.card-face]:shadow-card-hover"
                          initial={returning === card.slug ? { rotateY: 180 } : false}
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
            {draws.length > 0 && (
              <aside className="mt-16 px-6 md:pl-[104px]">
                <h2 className="text-[30px] leading-[1.3] tracking-[0.02em]">{dictionary.cards.grimoireTitle}</h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {draws.map((draw) => {
                    const piece = artworks.find((item) => item.slug === draw.slug);
                    if (!piece) return null;
                    return (
                      <li key={`${draw.date}-${draw.slug}`}>
                        <button
                          type="button"
                          onClick={() => openDraw(draw)}
                          className="nav-link cursor-pointer text-left text-[22px]"
                          aria-label={formatMessage(dictionary.cards.grimoireOpen, {
                            title: piece.title,
                            date: draw.date,
                          })}
                        >
                          <span className="font-script text-[20px]">{draw.date}</span>
                          <span className="ml-3">{piece.title}</span>
                        </button>
                        {draw.note && <p className="font-script mt-1 text-[20px] leading-[1.2]">{draw.note}</p>}
                      </li>
                    );
                  })}
                </ul>
              </aside>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
