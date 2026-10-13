import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SiteNav } from "@/components/SiteNav";
import { AboutSection } from "@/components/sections/AboutSection";
import { CardsSection } from "@/components/sections/CardsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Hero } from "@/components/sections/Hero";
import { isLocale } from "@/i18n/config";
import { loadArtworks } from "@/lib/art";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const artworks = loadArtworks({ locale: raw });
  const cardArtworks = artworks.filter((a) => a.isCard);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-(--header-h) items-center justify-between gap-6 bg-pink px-8">
        <SiteNav />
        <Suspense fallback={null}>
          <LanguageSwitcher />
        </Suspense>
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
