import type { Locale } from "./config";

/** Path under a locale, optionally with a section hash (e.g. `gallery` → `/pt/#gallery`). */
export function localePath(locale: Locale, hash?: string): string {
  if (!hash || hash === "home") return `/${locale}`;
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  return `/${locale}/#${id}`;
}
