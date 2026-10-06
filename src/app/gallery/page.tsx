import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { loadArtworks } from "@/lib/art";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  const artworks = loadArtworks();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-20 pt-28 sm:px-8">
      <h1 className="mb-12 text-center font-display text-5xl text-tomato sm:text-6xl">
        <span className="inline-block -rotate-2">The</span>{" "}
        <span className="inline-block rotate-1 text-grape">Wall</span>
      </h1>
      {artworks.length === 0 ? (
        <p className="text-center font-hand text-3xl">Nothing pinned yet.</p>
      ) : (
        <Gallery artworks={artworks} />
      )}
    </main>
  );
}
