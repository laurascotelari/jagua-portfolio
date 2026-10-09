import { Gallery } from "@/components/Gallery";
import type { Artwork } from "@/lib/art";

export function GallerySection({ artworks }: { artworks: Artwork[] }) {
  return (
    <section id="gallery" aria-label="Gallery" className="bg-cream">
      {artworks.length === 0 ? (
        <p className="px-8 py-16 text-[22px] md:px-[66px]">Nothing on the wall yet.</p>
      ) : (
        <Gallery artworks={artworks} />
      )}
    </section>
  );
}
