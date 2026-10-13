import type { Locale } from "./config";

/** Path under a locale, optionally with a section hash (e.g. `gallery` → `/pt/#gallery`). */
export function localePath(locale: Locale, hash?: string): string {
  if (!hash || hash === "home") return `/${locale}`;
  return `/${locale}/#${hash}`;
}

/** Stable link that opens one day's hand with a card already turned over. */
export function cardSharePath(locale: Locale, dateKey: string, slug: string): string {
  const params = new URLSearchParams({ date: dateKey, card: slug });
  return `/${locale}?${params.toString()}#cards`;
}
