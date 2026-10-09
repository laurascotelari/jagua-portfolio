import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    // Fills the first screen below the sticky header, so the desk drawing is still cropped at the fold.
    <section
      id="home"
      aria-label="Home"
      className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-hidden bg-pink"
    >
      {/* Keeps the wordmark at 42% of the viewport, as when the nav sat inside the hero. */}
      <div className="relative z-10 flex items-center px-8 py-16 md:absolute md:top-[calc(42svh-var(--header-h))] md:left-[clamp(32px,7.5vw,108px)] md:-translate-y-1/2 md:p-0">
        <h1 className="text-[clamp(56px,6.6vw,110px)] leading-none [word-spacing:-0.45em]">
          <Link href="/#home">Jagua jpg</Link>
        </h1>
      </div>
      {/* Desktop: drawing bleeds off the right and bottom edges, as in the Figma frame. */}
      <div className="relative flex flex-1 items-end justify-center md:absolute md:top-0 md:left-[27.5vw] md:w-[76.5vw]">
        <Image
          src="/illustrations/desk.png"
          alt="Line drawing of an artist's desk under a wall covered in framed pictures"
          width={1486}
          height={1600}
          priority
          sizes="(min-width: 768px) 77vw, 100vw"
          className="h-auto w-full max-w-[680px] mix-blend-darken md:max-w-none"
        />
      </div>
    </section>
  );
}
