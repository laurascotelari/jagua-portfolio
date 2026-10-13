import { isDateKey } from "@/lib/daily";

export const GRIMOIRE_KEY = "jagua-grimoire";
const MAX_DRAWS = 40;
const MAX_NOTE = 280;

export type Draw = {
  date: string;
  slug: string;
  note: string;
};

function normalize(value: unknown): Draw | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if (typeof record.date !== "string" || !isDateKey(record.date)) return null;
  if (typeof record.slug !== "string" || !record.slug.trim()) return null;
  const note = typeof record.note === "string" ? record.note.slice(0, MAX_NOTE) : "";
  return { date: record.date, slug: record.slug.trim(), note };
}

/** Read a stored journal. Bad entries are dropped. */
export function parseDraws(raw: string | null): Draw[] {
  if (!raw) return [];
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    const draws: Draw[] = [];
    for (const item of data) {
      const draw = normalize(item);
      if (draw) draws.push(draw);
      if (draws.length >= MAX_DRAWS) break;
    }
    return draws;
  } catch {
    return [];
  }
}

/** Insert a draw if this day and card are not already in the journal. */
export function rememberDraw(draws: Draw[], date: string, slug: string): Draw[] {
  if (draws.some((item) => item.date === date && item.slug === slug)) return draws;
  return upsertDraw(draws, { date, slug, note: "" });
}

/** Put a draw first, replacing any earlier note for the same day and card. */
export function upsertDraw(draws: Draw[], draw: Draw): Draw[] {
  const next = normalize(draw);
  if (!next) return draws.slice(0, MAX_DRAWS);
  return [next, ...draws.filter((item) => item.date !== next.date || item.slug !== next.slug)].slice(
    0,
    MAX_DRAWS,
  );
}
