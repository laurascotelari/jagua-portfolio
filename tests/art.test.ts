import path from "node:path";
import { describe, expect, it } from "vitest";
import { loadArtworks } from "@/lib/art";

const FIXTURES = path.join(__dirname, "fixtures", "art");

describe("loadArtworks", () => {
  const artworks = loadArtworks(FIXTURES, "/art");

  it("finds images and ignores other files", () => {
    expect(artworks.map((a) => a.slug)).toEqual(["2026-03-01-tall_thing", "wide-thing"]);
  });

  it("reads real dimensions", () => {
    const wide = artworks.find((a) => a.slug === "wide-thing")!;
    expect([wide.width, wide.height]).toEqual([40, 20]);
  });

  it("derives a title from the filename when there is no sidecar", () => {
    const wide = artworks.find((a) => a.slug === "wide-thing")!;
    expect(wide.title).toBe("Wide thing");
    expect(wide.src).toBe("/art/wide-thing.png");
    expect(wide.date).toBeUndefined();
  });

  it("uses sidecar metadata and the date prefix", () => {
    const tall = artworks[0];
    expect(tall).toMatchObject({
      title: "The Tall One",
      year: 2026,
      description: "A fixture.",
      date: "2026-03-01",
      width: 10,
      height: 30,
    });
  });

  it("returns an empty list for a missing folder", () => {
    expect(loadArtworks(path.join(FIXTURES, "nope"))).toEqual([]);
  });
});
