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
  /** "What does it mean for your day?" text shown when the card is revealed. */
  meaning?: string;
  /** When true, eligible for the daily card deal. */
  isCard: boolean;
};

type CatalogEntry = {
  file: string;
  title?: string;
  year?: number | string;
  description?: string;
  meaning?: string;
  isCard?: boolean;
};

const IMAGE_EXT = /\.(jpe?g|png|webp|avif|gif)$/i;
const DATE_PREFIX = /^(\d{4}-\d{2}-\d{2})[-_ ]+/;
const PLACEHOLDER_TEXT = new Set(["example 1", "descrição", "descricao"]);

export type LoadArtworksOptions = {
  catalogPath?: string;
  artDir?: string;
  urlBase?: string;
};

function titleFromSlug(slug: string): string {
  const words = slug.replace(DATE_PREFIX, "").replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Drops unfinished stub copy so the UI omits the field. */
export function cleanText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (PLACEHOLDER_TEXT.has(trimmed.toLowerCase())) return undefined;
  return value;
}

function parseYear(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function resolveCatalogPath(override?: string): string {
  if (override) return override;
  return path.join(process.cwd(), "content", "artworks.json");
}

function resolveImagePath(file: string, artDir?: string): string {
  if (artDir) return path.join(/*turbopackIgnore: true*/ artDir, file);
  return path.join(process.cwd(), "public", "art", file);
}

function readCatalog(catalogPath: string): CatalogEntry[] {
  if (!fs.existsSync(/*turbopackIgnore: true*/ catalogPath)) return [];
  const raw = JSON.parse(
    fs.readFileSync(/*turbopackIgnore: true*/ catalogPath, "utf8"),
  ) as unknown;
  if (!Array.isArray(raw)) {
    throw new TypeError(`art catalog must be an array: ${catalogPath}`);
  }
  return raw as CatalogEntry[];
}

/**
 * Loads artworks from `content/artworks.json` (or `catalogPath`), resolving each
 * entry's `file` against `public/art` (or `artDir`). Catalog order is preserved.
 * Entries whose image file is missing are skipped.
 */
export function loadArtworks(options: LoadArtworksOptions = {}): Artwork[] {
  const catalogPath = resolveCatalogPath(options.catalogPath);
  const urlBase = options.urlBase ?? "/art";

  return readCatalog(catalogPath).flatMap((entry): Artwork[] => {
    if (!entry?.file || typeof entry.file !== "string") return [];
    if (!IMAGE_EXT.test(entry.file)) return [];

    const imagePath = resolveImagePath(entry.file, options.artDir);
    if (!fs.existsSync(/*turbopackIgnore: true*/ imagePath)) return [];

    const slug = entry.file.replace(IMAGE_EXT, "");
    const size = imageSize(fs.readFileSync(/*turbopackIgnore: true*/ imagePath));
    // EXIF orientations 5–8 are rotated 90°, so the displayed size is swapped.
    const rotated = (size.orientation ?? 1) >= 5;

    return [
      {
        slug,
        src: `${urlBase}/${encodeURIComponent(entry.file)}`,
        title: entry.title?.trim() || titleFromSlug(slug),
        width: rotated ? size.height : size.width,
        height: rotated ? size.width : size.height,
        date: DATE_PREFIX.exec(slug)?.[1],
        year: parseYear(entry.year),
        description: cleanText(entry.description),
        meaning: cleanText(entry.meaning),
        isCard: entry.isCard === true,
      },
    ];
  });
}
