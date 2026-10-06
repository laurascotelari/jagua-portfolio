import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { SiteNav } from "@/components/SiteNav";
import { loadArtworks } from "@/lib/art";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  const artworks = loadArtworks();

  return (
    <main className="flex-1 bg-cream">
      <header className="sticky top-0 z-10 flex min-h-[130px] flex-wrap items-center justify-between gap-x-12 gap-y-3 bg-pink px-8 py-6 md:px-[66px]">
        <h1 className="text-[40px] leading-[1.2] tracking-[0.06em]">All Art</h1>
        <SiteNav />
      </header>
      {artworks.length === 0 ? (
        <p className="px-8 py-16 text-[22px] md:px-[66px]">Nothing on the wall yet.</p>
      ) : (
        <Gallery artworks={artworks} />
      )}
    </main>
  );
}
