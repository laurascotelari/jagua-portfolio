import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { cleanText, loadArtworks, pickLocalized } from "@/lib/art";

const FIXTURES = path.join(__dirname, "fixtures", "art");
const CATALOG = path.join(FIXTURES, "artworks.json");

describe("cleanText", () => {
  it("drops unfinished placeholder copy", () => {
    expect(cleanText("Example 1")).toBeUndefined();
    expect(cleanText("Descrição")).toBeUndefined();
    expect(cleanText("  example 1  ")).toBeUndefined();
    expect(cleanText("A real description.")).toBe("A real description.");
  });
});

describe("pickLocalized", () => {
  it("picks the active locale and falls back to the other", () => {
    expect(pickLocalized({ pt: "Oi", en: "Hi" }, "pt")).toBe("Oi");
    expect(pickLocalized({ pt: "Oi", en: "Hi" }, "en")).toBe("Hi");
    expect(pickLocalized({ pt: "Só PT" }, "en")).toBe("Só PT");
    expect(pickLocalized("Plain", "pt")).toBe("Plain");
  });
});

describe("loadArtworks", () => {
  const artworks = loadArtworks({
    catalogPath: CATALOG,
    artDir: FIXTURES,
    urlBase: "/art",
    locale: "en",
  });

  it("loads catalog entries that have an image on disk, in catalog order", () => {
    expect(artworks.map((a) => a.slug)).toEqual(["2026-03-01-tall_thing", "wide-thing"]);
  });

  it("reads real dimensions", () => {
    const wide = artworks.find((a) => a.slug === "wide-thing")!;
    expect([wide.width, wide.height]).toEqual([40, 20]);
  });

  it("derives a title from the filename when the catalog omits one", () => {
    const wide = artworks.find((a) => a.slug === "wide-thing")!;
    expect(wide.title).toBe("Wide thing");
    expect(wide.src).toBe("/art/wide-thing.png");
    expect(wide.isCard).toBe(false);
  });

  it("uses catalog metadata and normalizes year", () => {
    const tall = artworks[0];
    expect(tall).toMatchObject({
      title: "The Tall One",
      year: 2026,
      description: "A fixture.",
      meaning: "A fixture day.",
      width: 10,
      height: 30,
      isCard: true,
    });
  });

  it("resolves Portuguese localized fields", () => {
    const [tall] = loadArtworks({
      catalogPath: CATALOG,
      artDir: FIXTURES,
      urlBase: "/art",
      locale: "pt",
    });
    expect(tall).toMatchObject({
      title: "A Alta",
      description: "Uma fixture.",
      meaning: "Um dia de fixture.",
    });
  });

  it("strips placeholder description and meaning", () => {
    const wide = artworks.find((a) => a.slug === "wide-thing")!;
    expect(wide.description).toBeUndefined();
    expect(wide.meaning).toBeUndefined();
  });

  it("returns an empty list for a missing catalog", () => {
    expect(
      loadArtworks({
        catalogPath: path.join(FIXTURES, "nope.json"),
        artDir: FIXTURES,
        locale: "en",
      }),
    ).toEqual([]);
  });
});

describe("daily card copy", () => {
  it("gives every card a meaning in both languages", () => {
    const catalog = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "content", "artworks.json"), "utf8"),
    ) as { isCard?: boolean; meaning?: { pt?: string; en?: string } }[];
    const cards = catalog.filter((entry) => entry.isCard);
    expect(cards.length).toBeGreaterThan(0);
    for (const card of cards) {
      expect(card.meaning?.pt?.trim().length).toBeGreaterThan(20);
      expect(card.meaning?.en?.trim().length).toBeGreaterThan(20);
    }
  });
});
