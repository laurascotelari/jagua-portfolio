import { describe, expect, it } from "vitest";
import { CARD_BACKS, DESK_SRC, TITLE_SRC, cardBackSrc, darkVariant } from "@/lib/theme";

describe("darkVariant", () => {
  it("inserts -dark before the extension", () => {
    expect(darkVariant(TITLE_SRC)).toBe("/illustrations/title-dark.png");
    expect(darkVariant(DESK_SRC)).toBe("/illustrations/desenho_escrivaninha_digital_v8-dark.png");
  });
});

describe("card backs", () => {
  it("assigns a fixed illustration to each seat", () => {
    expect(CARD_BACKS.map((src) => src.match(/back-([a-z]+)-m\.png$/)?.[1])).toEqual([
      "caveira",
      "cat",
      "borboleta",
      "coracao",
      "pote",
    ]);
  });

  it("uses the dark file for the same seat", () => {
    expect(cardBackSrc(0, false)).toBe("/illustrations/back-caveira-m.png");
    expect(cardBackSrc(0, true)).toBe("/illustrations/back-caveira-m-dark.png");
    expect(cardBackSrc(1, true)).toBe("/illustrations/back-cat-m-dark.png");
    expect(cardBackSrc(4, true)).toBe("/illustrations/back-pote-m-dark.png");
  });
});
