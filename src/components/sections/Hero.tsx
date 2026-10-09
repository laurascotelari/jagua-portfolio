import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    // Fills the first screen below the sticky header; the desk drawing spills down into the cards section.
    <section
      id="home"
      aria-label="Home"
      className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-x-clip bg-pink"
    >
      {/* Keeps the wordmark at 42% of the viewport, as when the nav sat inside the hero. */}
      <div className="relative z-10 flex items-center px-8 py-16 md:absolute md:top-[calc(42svh-var(--header-h))] md:left-[clamp(32px,7.5vw,108px)] md:-translate-y-1/2 md:p-0">
        <h1 className="text-[clamp(56px,6.6vw,110px)] leading-none [word-spacing:-0.45em]">
          <Link href="/#home">Jagua.jpg</Link>
        </h1>
      </div>
      {/* Desktop: drawing bleeds off the right edge, up over the sticky header, and 18vw into the cards section, which stays
          just above the card row. Width is capped so its height (aspect 2692/2500) fits from the top of the viewport to that
          bleed line. z-40 puts it over the header (z-30); pointer-events-none keeps it from blocking clicks underneath. */}
      <div className="relative flex flex-1 items-end justify-center md:pointer-events-none md:absolute md:-bottom-[18vw] md:left-[40vw] md:z-40 md:w-[min(70vw,calc((100svh+18vw)*2500/2692))]">
        <Image
          src="/illustrations/desk2.png"
          alt="Line drawing of an artist's desk under a wall covered in framed pictures"
          width={2500}
          height={2692}
          priority
          sizes="(min-width: 768px) 70vw, 100vw"
          className="h-auto w-full max-w-[680px] mix-blend-darken md:max-w-none"
        />
      </div>
    </section>
  );
}
