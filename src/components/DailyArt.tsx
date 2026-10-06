"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Artwork } from "@/lib/art";
import { isDateKey, pickForDate, toDateKey } from "@/lib/daily";

/** Today's local date, or `?date=YYYY-MM-DD` for previewing other days. */
function getDateKey(): string {
  const override = new URLSearchParams(window.location.search).get("date");
  return override && isDateKey(override) ? override : toDateKey(new Date());
}

// Re-check the date when the tab comes back, so a tab left open overnight rolls over.
function subscribe(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

function formatDay(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function DailyArt({ artworks }: { artworks: Artwork[] }) {
  // null on the server and during hydration; the real date is only known in the browser.
  const dateKey = useSyncExternalStore(subscribe, getDateKey, () => null);

  if (artworks.length === 0) {
    return (
      <section className="flex flex-1 items-center justify-center p-8 text-center">
        <p className="sticker rotate-1 p-6 font-hand text-3xl">
          No art yet. Drop images into <code className="font-sans text-xl">public/art/</code>.
        </p>
      </section>
    );
  }

  const art = dateKey ? artworks[pickForDate(dateKey, artworks.length)] : null;

  return (
    <section className="relative flex-1 overflow-hidden bg-ink" aria-label="Art of the Day">
      <AnimatePresence mode="wait">
        {art && dateKey ? (
          <motion.div
            key={`${dateKey}-${art.slug}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={art.src}
              alt={art.title}
              fill
              // object-cover on a portrait screen renders wider than the viewport.
              sizes={`max(100vw, ${Math.ceil((art.width / art.height) * 100)}vh)`}
              loading="eager"
              className="object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            className="absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0 }}
          >
            <motion.div
              aria-hidden
              className="size-24 bg-sun"
              animate={{
                borderRadius: ["42% 58% 63% 37%", "60% 40% 35% 65%", "42% 58% 63% 37%"],
                rotate: [0, 90, 0],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {art && dateKey && (
        <motion.div
          key={`label-${dateKey}`}
          className="absolute bottom-6 left-4 right-4 z-10 flex flex-wrap items-end justify-between gap-4 sm:bottom-10 sm:left-10 sm:right-10"
          initial={{ y: 40, opacity: 0, rotate: -6 }}
          animate={{ y: 0, opacity: 1, rotate: -2 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 180, damping: 14 }}
        >
          <div className="sticker max-w-md px-5 py-3">
            <p className="font-hand text-2xl text-grape">Art of the Day · {formatDay(dateKey)}</p>
            <h1 className="font-display text-3xl leading-tight sm:text-4xl">{art.title}</h1>
            {art.description && <p className="mt-1 text-sm">{art.description}</p>}
          </div>
          <Link
            href="/gallery"
            className="sticker rotate-3 bg-sun px-4 py-2 font-hand text-2xl transition-transform hover:rotate-0 hover:scale-105"
          >
            See all the art →
          </Link>
        </motion.div>
      )}
    </section>
  );
}
