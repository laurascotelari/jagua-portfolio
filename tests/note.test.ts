import { describe, expect, it } from "vitest";
import { composeNote, noteMailto } from "@/lib/note";
import { paragraphs } from "@/lib/paragraphs";

describe("paragraphs", () => {
  it("splits on blank lines and keeps a single block intact", () => {
    expect(paragraphs("One.\n\nTwo.")).toEqual(["One.", "Two."]);
    expect(paragraphs("Only one.")).toEqual(["Only one."]);
  });
});

describe("composeNote", () => {
  it("skips blank lines", () => {
    expect(composeNote({ name: "Ana", about: "", message: "Hello" })).toBe("Ana\n\nHello");
  });
});

describe("noteMailto", () => {
  it("builds a mailto link with an encoded subject and body", () => {
    const href = noteMailto("studio@example.com", {
      name: "Ana",
      about: "A commission",
      message: "Hello & goodbye",
    });
    expect(href.startsWith("mailto:studio@example.com?")).toBe(true);
    expect(href).toContain(encodeURIComponent("A commission"));
    expect(href).toContain(encodeURIComponent("Hello & goodbye"));
  });
});
