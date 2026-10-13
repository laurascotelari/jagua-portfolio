import { SiteNav } from "@/components/SiteNav";
import { AboutSection } from "@/components/sections/AboutSection";
import { CardsSection } from "@/components/sections/CardsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Hero } from "@/components/sections/Hero";
import { loadArtworks } from "@/lib/art";

export default function Home() {
  const artworks = loadArtworks();
  const cardArtworks = artworks.filter((a) => a.isCard);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-(--header-h) items-center bg-pink px-8">
        <SiteNav />
      </header>
      <main className="flex flex-1 flex-col">
        <Hero />
        <CardsSection artworks={cardArtworks} />
        <GallerySection artworks={artworks} />
        <AboutSection />
      </main>
    </>
  );
}
