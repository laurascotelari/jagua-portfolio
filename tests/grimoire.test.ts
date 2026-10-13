import { describe, expect, it } from "vitest";
import { parseDraws, rememberDraw, upsertDraw } from "@/lib/grimoire";

describe("parseDraws", () => {
  it("drops malformed journals and entries", () => {
    expect(parseDraws(null)).toEqual([]);
    expect(parseDraws("not json")).toEqual([]);
    expect(parseDraws("{}")).toEqual([]);
    expect(
      parseDraws(
        JSON.stringify([
          { date: "2026-02-30", slug: "bad-day", note: "no" },
          { date: "2026-10-13", slug: "sleepy-fox", note: "  a line  " },
        ]),
      ),
    ).toEqual([{ date: "2026-10-13", slug: "sleepy-fox", note: "  a line  " }]);
  });
});

describe("upsertDraw", () => {
  it("puts the latest draw first and replaces the same day and card", () => {
    const first = upsertDraw([], { date: "2026-10-13", slug: "fox", note: "one" });
    const second = upsertDraw(first, { date: "2026-10-14", slug: "bird", note: "" });
    const revised = upsertDraw(second, { date: "2026-10-13", slug: "fox", note: "two" });
    expect(revised).toEqual([
      { date: "2026-10-13", slug: "fox", note: "two" },
      { date: "2026-10-14", slug: "bird", note: "" },
    ]);
  });
});

describe("rememberDraw", () => {
  it("keeps an existing note instead of writing a blank one", () => {
    const draws = [{ date: "2026-10-13", slug: "fox", note: "kept" }];
    expect(rememberDraw(draws, "2026-10-13", "fox")).toBe(draws);
    expect(rememberDraw(draws, "2026-10-14", "bird")).toEqual([
      { date: "2026-10-14", slug: "bird", note: "" },
      { date: "2026-10-13", slug: "fox", note: "kept" },
    ]);
  });
});
