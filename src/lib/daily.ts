const DATE_KEY = /^(\d{4})-(\d{2})-(\d{2})$/;
const MS_PER_DAY = 86_400_000;

/** Local calendar date as `YYYY-MM-DD`. */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isDateKey(value: string): boolean {
  const match = DATE_KEY.exec(value);
  if (!match) return false;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

/** Small seeded PRNG (mulberry32): same seed, same sequence. */
function random(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function shuffled(count: number, seed: number): number[] {
  const order = Array.from({ length: count }, (_, i) => i);
  const next = random(seed);
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/**
 * Picks the artworks dealt as cards on a given day: up to `n` distinct indices,
 * in card order. Each day is its own seeded shuffle, so the same date always
 * deals the same cards (for every visitor) and the set changes day to day.
 * Note: adding or removing artworks reshuffles the current (and future) deals.
 */
export function pickCardsForDate(dateKey: string, count: number, n = 5): number[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError(`count must be a non-negative integer, got ${count}`);
  }
  if (!Number.isInteger(n) || n < 1) {
    throw new RangeError(`n must be a positive integer, got ${n}`);
  }
  if (!isDateKey(dateKey)) {
    throw new RangeError(`invalid date key: ${dateKey}`);
  }
  const [y, m, d] = dateKey.split("-").map(Number);
  const day = Math.floor(Date.UTC(y, m - 1, d) / MS_PER_DAY);
  return shuffled(count, day).slice(0, n);
}
