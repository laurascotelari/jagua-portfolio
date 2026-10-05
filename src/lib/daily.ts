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
 * Picks the artwork index for a given day.
 *
 * Days are grouped into cycles of `count` days; each cycle is a seeded shuffle,
 * so every artwork appears once per cycle and the same date always gives the
 * same pick. Consecutive days never repeat (when there are 2+ artworks).
 * Note: adding or removing artworks reshuffles future (and current) picks.
 */
export function pickForDate(dateKey: string, count: number): number {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError(`count must be a positive integer, got ${count}`);
  }
  if (!isDateKey(dateKey)) {
    throw new RangeError(`invalid date key: ${dateKey}`);
  }
  const [y, m, d] = dateKey.split("-").map(Number);
  const day = Math.floor(Date.UTC(y, m - 1, d) / MS_PER_DAY);
  // With two pieces, strict alternation is the only order that never repeats.
  if (count <= 2) return day % count;

  const cycle = Math.floor(day / count);
  const position = day - cycle * count;

  const order = shuffled(count, cycle);
  // Avoid showing the same piece on the last day of one cycle and the first of the next.
  // (The swap only touches positions 0 and 1, so the previous cycle's last item is stable.)
  if (order[0] === shuffled(count, cycle - 1)[count - 1]) {
    [order[0], order[1]] = [order[1], order[0]];
  }
  return order[position];
}
