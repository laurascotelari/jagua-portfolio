export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookie = "jagua-locale";

/** Nav / hash section ids in display order. */
export const navSections = ["home", "cards", "gallery", "about"] as const;
export type NavSection = (typeof navSections)[number];

/** Section hash routes (excludes `home`). Shared by redirects and legacy URL handling. */
export const sectionRoutes = navSections.filter(
  (id): id is Exclude<NavSection, "home"> => id !== "home",
);

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Prefer Portuguese when the browser/region language is `pt*`; otherwise English. */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  for (const part of header.split(",")) {
    const tag = part.trim().split(";")[0]?.toLowerCase();
    if (!tag) continue;
    if (tag === "pt" || tag.startsWith("pt-")) return "pt";
    if (tag === "en" || tag.startsWith("en-")) return "en";
  }
  return defaultLocale;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "pt" ? "en" : "pt";
}
