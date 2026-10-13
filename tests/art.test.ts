import path from "node:path";
import { describe, expect, it } from "vitest";
import { cleanText, loadArtworks } from "@/lib/art";

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

describe("loadArtworks", () => {
  const artworks = loadArtworks({
    catalogPath: CATALOG,
    artDir: FIXTURES,
    urlBase: "/art",
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
    expect(wide.date).toBeUndefined();
    expect(wide.card).toBe(false);
  });

  it("uses catalog metadata, normalizes year, and reads the date prefix", () => {
    const tall = artworks[0];
    expect(tall).toMatchObject({
      title: "The Tall One",
      year: 2026,
      description: "A fixture.",
      meaning: "A fixture day.",
      date: "2026-03-01",
      width: 10,
      height: 30,
      card: true,
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
      }),
    ).toEqual([]);
  });
});
