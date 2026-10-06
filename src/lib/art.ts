import "server-only";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export type Artwork = {
  slug: string;
  src: string;
  title: string;
  width: number;
  height: number;
  /** From a `YYYY-MM-DD-` filename prefix, if present. */
  date?: string;
  year?: number;
  description?: string;
};

type Sidecar = Partial<Pick<Artwork, "title" | "year" | "description">>;

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const DATE_PREFIX = /^(\d{4}-\d{2}-\d{2})[-_ ]+/;

const DEFAULT_DIR = path.join(process.cwd(), "public", "art");

function titleFromSlug(slug: string): string {
  const words = slug.replace(DATE_PREFIX, "").replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function readSidecar(file: string): Sidecar {
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8")) as Sidecar;
}

/**
 * Reads every image in `dir` (default `public/art`). Optional metadata lives in
 * a sidecar `<same-name>.json`. Dated files (`2026-10-05-name.jpg`) come first,
 * newest first; the rest follow alphabetically.
 */
export function loadArtworks(dir = DEFAULT_DIR, urlBase = "/art"): Artwork[] {
  if (!fs.existsSync(dir)) return [];

  const artworks = fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXT.test(file))
    .map((file): Artwork => {
      const slug = file.replace(IMAGE_EXT, "");
      const size = imageSize(fs.readFileSync(path.join(dir, file)));
      // EXIF orientations 5–8 are rotated 90°, so the displayed size is swapped.
      const rotated = (size.orientation ?? 1) >= 5;
      const sidecar = readSidecar(path.join(dir, `${slug}.json`));
      return {
        slug,
        src: `${urlBase}/${encodeURIComponent(file)}`,
        title: sidecar.title ?? titleFromSlug(slug),
        width: rotated ? size.height : size.width,
        height: rotated ? size.width : size.height,
        date: DATE_PREFIX.exec(slug)?.[1],
        year: sidecar.year,
        description: sidecar.description,
      };
    });

  return artworks.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return a.slug.localeCompare(b.slug);
  });
}
