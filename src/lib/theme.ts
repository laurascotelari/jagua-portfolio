/** Card backs are fixed by seat: 1 skull, 2 cat, 3 butterfly, 4 heart, 5 potion. */
export const CARD_BACKS = [
  "/illustrations/back-caveira-m2.png",
  "/illustrations/back-cat-m2.png",
  "/illustrations/back-borboleta-m2.png",
  "/illustrations/back-coracao-m2.png",
  "/illustrations/back-pote-m2.png",
] as const;

export const TITLE_SRC = "/illustrations/title.png";
export const DESK_SRC = "/illustrations/desenho_escrivaninha_digital_v9.png";

/** Pair `file.png` with `file-dark.png`. */
export function darkVariant(src: string): string {
  return src.replace(/(\.[a-z0-9]+)$/i, "-dark$1");
}

/** Pair `file.png` with `file-lights-off.png`. */
export function lightsOffVariant(src: string): string {
  return src.replace(/(\.[a-z0-9]+)$/i, "-lights-off$1");
}

export function cardBackSrc(index: number, dark = false): string {
  const base = CARD_BACKS[index] ?? CARD_BACKS[0];
  return dark ? darkVariant(base) : base;
}
