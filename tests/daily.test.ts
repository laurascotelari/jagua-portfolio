import { describe, expect, it } from "vitest";
import { isDateKey, pickCardsForDate, toDateKey } from "@/lib/daily";

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

describe("pickCardsForDate", () => {
  it("is deterministic", () => {
    expect(pickCardsForDate("2026-10-05", 12)).toEqual(pickCardsForDate("2026-10-05", 12));
  });

  it("deals up to five distinct, in-range cards", () => {
    for (let count = 0; count <= 13; count++) {
      for (let i = 0; i < 100; i++) {
        const cards = pickCardsForDate(addDays("2026-01-01", i), count);
        expect(cards).toHaveLength(Math.min(5, count));
        expect(new Set(cards).size).toBe(cards.length);
        for (const card of cards) {
          expect(card).toBeGreaterThanOrEqual(0);
          expect(card).toBeLessThan(count);
        }
      }
    }
  });

  it("honours a custom hand size", () => {
    expect(pickCardsForDate("2026-10-05", 12, 3)).toHaveLength(3);
  });

  it("changes the deal from day to day", () => {
    const deals = Array.from({ length: 30 }, (_, i) =>
      pickCardsForDate(addDays("2026-01-01", i), 20).join(","),
    );
    let changes = 0;
    for (let i = 1; i < deals.length; i++) if (deals[i] !== deals[i - 1]) changes++;
    expect(changes).toBe(deals.length - 1);
  });

  it("rejects bad input", () => {
    expect(() => pickCardsForDate("2026-10-05", -1)).toThrow(RangeError);
    expect(() => pickCardsForDate("2026-10-05", 3, 0)).toThrow(RangeError);
    expect(() => pickCardsForDate("not-a-date", 3)).toThrow(RangeError);
  });
});
