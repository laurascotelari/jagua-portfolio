import { DailyArt } from "@/components/DailyArt";
import { loadArtworks } from "@/lib/art";

export default function Home() {
  return (
    <main className="flex flex-1">
      <DailyArt artworks={loadArtworks()} />
    </main>
  );
}
