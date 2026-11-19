"use client";

import Image from "next/image";
import Link from "next/link";
import { toggleTheme, useDarkMode } from "@/components/ThemeProvider";
import { localePath } from "@/i18n/locale-path";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";
import { DESK_SRC, darkVariant } from "@/lib/theme";

export function Hero() {
  const locale = useLocale();
  const dictionary = useDictionary();
  const dark = useDarkMode();

  // Clickable spots on the desk drawing, as percentages of the image box so they scale with it.
  const hotspots = [
    {
      href: localePath(locale, "gallery"),
      label: dictionary.hero.hotspotGallery,
      box: { left: 19, top: 3, width: 62, height: 34 },
      centered: true,
    },
    {
      href: localePath(locale, "about"),
      label: dictionary.hero.hotspotAbout,
      box: { left: 62, top: 37.5, width: 14, height: 15 },
    },
    {
      href: localePath(locale, "cards"),
      label: dictionary.hero.hotspotCards,
      box: { left: 62.5, top: 54.5, width: 11.5, height: 7.5 },
    },
  ];

  const lightLabel = dark ? dictionary.hero.hotspotLightsOn : dictionary.hero.hotspotLightsOff;
  const lightSwitch = { left: 14.9, top: 38.9, width: 5.8, height: 9.8 };

  return (
    // Fills the first screen below the sticky header; the desk drawing spills down into the cards section.
    <section
      id="home"
      aria-label={dictionary.hero.ariaLabel}
      className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-x-clip bg-pink"
    >
      <div className="relative z-10 items-center px-8 py-16 md:absolute md:top-[calc(42svh-var(--header-h))] md:left-[clamp(32px,7.5vw,108px)] md:-translate-y-1/2 md:p-0">
        <h1 className="w-[min(100%,800px)] md:w-[min(35vw,800px)]">
          <Link href={localePath(locale, "home")} className="block">
            <Image
              src="/illustrations/jagua_logo_1500px.png"
              alt="Jagua"
              width={1500}
              height={1022}
              priority
              sizes="(min-width: 768px) 30vw, 420px"
              className="h-auto w-full"
            />
          </Link>
        </h1>
        <div className="-mt-8 flex flex-col justify-center items-center">
          <span className="text-[100px] leading-none tracking-[0.02em]">Jagua.jpg</span>
          <span className="mt-2 text-[24px] leading-none tracking-[0.05em]">Portfolio and silly art projects</span>
        </div>
      </div>
      {/* Desktop: drawing bleeds off the right edge, up over the sticky header, and 18vw into the cards section, which stays
          just above the card row. Width is capped so its height (aspect 2692/2500) fits from the top of the viewport to that
          bleed line. z-40 puts it over the header (z-30); pointer-events-none keeps it from blocking clicks underneath,
          except on the hotspots. */}
      <div className="relative flex flex-1 items-end justify-center md:pointer-events-none md:absolute md:-bottom-[18vw] md:left-[40vw] md:z-40 md:w-[min(70vw,calc((100svh+18vw)*2500/2692))]">
        <div className="relative w-full max-w-[680px] md:max-w-none">
          <Image
            src={DESK_SRC}
            alt={dictionary.hero.deskAlt}
            width={2500}
            height={2692}
            priority
            sizes="(min-width: 768px) 70vw, 100vw"
            className="theme-light h-auto w-full mix-blend-darken"
          />
          <Image
            src={darkVariant(DESK_SRC)}
            alt={dictionary.hero.deskAlt}
            width={2500}
            height={2692}
            priority
            sizes="(min-width: 768px) 70vw, 100vw"
            unoptimized
            className="theme-dark h-auto w-full"
          />
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={dark}
            aria-label={lightLabel}
            className="group pointer-events-auto absolute cursor-pointer rounded-lg"
            style={{
              left: `${lightSwitch.left}%`,
              top: `${lightSwitch.top}%`,
              width: `${lightSwitch.width}%`,
              height: `${lightSwitch.height}%`,
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 translate-y-1 rounded-md bg-cream px-3 py-1.5 text-sm whitespace-nowrap opacity-0 shadow-card transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              {lightLabel}
            </span>
          </button>
          {hotspots.map(({ href, label, box, centered }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="group pointer-events-auto absolute rounded-lg"
              style={{ left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%`, height: `${box.height}%` }}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute left-1/2 -translate-x-1/2 translate-y-1 ${centered ? "top-1/2 -mt-4" : "bottom-full mb-2"} rounded-md bg-cream px-3 py-1.5 text-sm whitespace-nowrap opacity-0 shadow-card transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100`}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
