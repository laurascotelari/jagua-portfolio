import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";
import { TarotCards } from "@/components/TarotCards";
import { loadArtworks } from "@/lib/art";

export const metadata: Metadata = { title: "Check the Cards" };

export default function CardsPage() {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-cream">
      <header className="px-8 pt-6">
        <SiteNav />
      </header>
      <TarotCards artworks={loadArtworks()} />
    </main>
  );
}
