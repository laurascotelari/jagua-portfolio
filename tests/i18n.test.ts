import { describe, expect, it } from "vitest";
import {
  isLocale,
  localeFromAcceptLanguage,
  navSections,
  otherLocale,
  sectionRoutes,
} from "@/i18n/config";
import { formatMessage, getDictionary } from "@/i18n/dictionaries";
import { localePath } from "@/i18n/locale-path";

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
    expect(Object.keys(pt)).toEqual(Object.keys(en));
    expect(Object.keys(pt.nav)).toEqual(Object.keys(en.nav));
    expect(Object.keys(pt.hero)).toEqual(Object.keys(en.hero));
    expect(Object.keys(pt.cards)).toEqual(Object.keys(en.cards));
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
    expect(sectionRoutes).toEqual(["cards", "gallery", "about"]);
    expect(navSections[0]).toBe("home");
  });
});
