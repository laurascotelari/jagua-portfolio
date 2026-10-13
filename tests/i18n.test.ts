import { describe, expect, it } from "vitest";
import {
  isLocale,
  localeFromAcceptLanguage,
  navSections,
  otherLocale,
  sectionRoutes,
} from "@/i18n/config";
import { formatMessage, getDictionary } from "@/i18n/dictionaries";
import { cardSharePath, localePath } from "@/i18n/locale-path";

function leafKeys(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return prefix ? [prefix] : [];
  return Object.entries(value).flatMap(([key, child]) =>
    leafKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe("localeFromAcceptLanguage", () => {
  it("picks Portuguese for pt* tags", () => {
    expect(localeFromAcceptLanguage("pt-BR,pt;q=0.9,en;q=0.8")).toBe("pt");
    expect(localeFromAcceptLanguage("pt")).toBe("pt");
  });

  it("picks English for en* tags and unknown headers", () => {
    expect(localeFromAcceptLanguage("en-US,en;q=0.9")).toBe("en");
    expect(localeFromAcceptLanguage("de-DE,de;q=0.9")).toBe("en");
    expect(localeFromAcceptLanguage(null)).toBe("en");
  });
});

describe("dictionaries", () => {
  it("exposes the same keys in pt and en", () => {
    const pt = getDictionary("pt");
    const en = getDictionary("en");
    expect(leafKeys(pt)).toEqual(leafKeys(en));
  });

  it("formats card aria labels", () => {
    expect(formatMessage(getDictionary("en").cards.cardAria, { n: 2, total: 5 })).toBe(
      "Card 2 of 5: turn it over",
    );
  });
});

describe("locale helpers", () => {
  it("validates locales and builds paths", () => {
    expect(isLocale("pt")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(otherLocale("pt")).toBe("en");
    expect(localePath("pt")).toBe("/pt");
    expect(localePath("en", "gallery")).toBe("/en/#gallery");
    expect(cardSharePath("en", "2026-10-13", "desenho_corvo_800px")).toBe(
      "/en?date=2026-10-13&card=desenho_corvo_800px#cards",
    );
    expect(sectionRoutes).toEqual(["cards", "gallery", "about"]);
    expect(navSections[0]).toBe("home");
  });
});
