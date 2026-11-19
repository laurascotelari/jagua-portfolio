"use client";

import { useDictionary } from "@/i18n/LocaleProvider";

export function AboutSection() {
  const dictionary = useDictionary();

  return (
    // Full-screen and centered on desktop only; on mobile the section is as tall as its content.
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-pink md:flex md:min-h-[calc(100svh-var(--header-h))] md:items-center md:justify-center"
    >
      <div className="px-4 py-12 md:px-8 md:py-24 md:pl-[108px]">
        <h2 id="about-title" className="mb-6 px-4 text-[40px] leading-[1.2] tracking-[0.02em] md:mb-0 md:px-0">
          {dictionary.about.title}
        </h2>

        <div className="mx-auto w-full md:max-w-[70%]">
          <img src="/illustrations/aboutme-v5.png" alt={dictionary.about.notebookAlt} className="h-auto w-full" />
        </div>

        {/* The handwriting in the notebook is too small to read on a phone; on desktop the text stays for screen readers. */}
        <div className="mx-auto mt-8 max-w-[480px] space-y-4 px-4 text-[18px] leading-[1.5] md:sr-only">
          {dictionary.about.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="text-right">{dictionary.about.signature}</p>
        </div>
      </div>
    </section>
  );
}
