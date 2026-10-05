import { describe, expect, it } from "vitest";
import { isDateKey, pickForDate, toDateKey } from "@/lib/daily";

function addDays(key: string, days: number): string {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
}

describe("toDateKey", () => {
  it("formats the local calendar date", () => {
    expect(toDateKey(new Date(2026, 0, 5, 23, 59))).toBe("2026-01-05");
  });
});

describe("isDateKey", () => {
  it("accepts real dates and rejects malformed or impossible ones", () => {
    expect(isDateKey("2026-10-05")).toBe(true);
    expect(isDateKey("2024-02-29")).toBe(true);
    expect(isDateKey("2026-02-30")).toBe(false);
    expect(isDateKey("2026-1-5")).toBe(false);
    expect(isDateKey("hello")).toBe(false);
  });
});

describe("pickForDate", () => {
  it("is deterministic", () => {
    expect(pickForDate("2026-10-05", 12)).toBe(pickForDate("2026-10-05", 12));
  });

  it("always returns 0 for a single artwork", () => {
    expect(pickForDate("2026-10-05", 1)).toBe(0);
  });

  it("stays in range and never repeats on consecutive days", () => {
    for (let count = 2; count <= 13; count++) {
      let previous = -1;
      for (let i = 0; i < 400; i++) {
        const pick = pickForDate(addDays("2026-01-01", i), count);
        expect(pick).toBeGreaterThanOrEqual(0);
        expect(pick).toBeLessThan(count);
        expect(pick).not.toBe(previous);
        previous = pick;
      }
    }
  });

  it("shows every artwork once per cycle", () => {
    const count = 7;
    // Find the start of a cycle: day number divisible by count.
    let start = "2026-01-01";
    while ((Date.parse(start) / 86_400_000) % count !== 0) start = addDays(start, 1);
    const picks = Array.from({ length: count }, (_, i) => pickForDate(addDays(start, i), count));
    expect(new Set(picks).size).toBe(count);
  });

  it("rejects bad input", () => {
    expect(() => pickForDate("2026-10-05", 0)).toThrow(RangeError);
    expect(() => pickForDate("not-a-date", 3)).toThrow(RangeError);
  });
});
