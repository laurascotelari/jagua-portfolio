import { describe, expect, it } from "vitest";
import { CARD_BACKS, DESK_SRC, TITLE_SRC, cardBackSrc, darkVariant, lightsOffVariant } from "@/lib/theme";

describe("darkVariant", () => {
  it("inserts -dark before the extension", () => {
    expect(darkVariant(TITLE_SRC)).toBe("/illustrations/title-dark.png");
    expect(darkVariant(DESK_SRC)).toBe("/illustrations/desenho_escrivaninha_digital_v8-dark.png");
  });
});

describe("lightsOffVariant", () => {
  it("inserts -lights-off before the extension", () => {
    expect(lightsOffVariant(DESK_SRC)).toBe("/illustrations/desenho_escrivaninha_digital_v8-lights-off.png");
    expect(darkVariant(lightsOffVariant(DESK_SRC))).toBe(
      "/illustrations/desenho_escrivaninha_digital_v8-lights-off-dark.png",
    );
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
    expect(cardBackSrc(0, false)).toBe("/illustrations/back-caveira-m2.png");
    expect(cardBackSrc(0, true)).toBe("/illustrations/back-caveira-m2-dark.png");
    expect(cardBackSrc(1, true)).toBe("/illustrations/back-cat-m2-dark.png");
    expect(cardBackSrc(4, true)).toBe("/illustrations/back-pote-m2-dark.png");
  });
});
