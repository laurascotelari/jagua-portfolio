"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { id: "home", label: "Home" },
  { id: "cards", label: "Check the Cards" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About me" },
];

export function SiteNav({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  // Highlight whichever section crosses the middle of the viewport.
  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);
    // Don't touch the URL until the page has scrolled, so a deep link like /#gallery isn't wiped before it's applied.
    let scrolled = false;
    const onScroll = () => {
      scrolled = true;
    };
    window.addEventListener("scroll", onScroll, { once: true, passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(id);
          // Keep the hash in sync with the visible section; otherwise a nav link to the section we scrolled away from
          // points at the current hash and the browser does nothing.
          if (!scrolled) continue;
          const hash = id === "home" ? "" : `#${id}`;
          if (window.location.hash !== hash) {
            window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav aria-label="Main" className={`flex flex-wrap gap-x-[clamp(24px,5vw,75px)] gap-y-2 ${className}`}>
      {links.map((link) => (
        <Link
          key={link.id}
          href={`/#${link.id}`}
          aria-current={active === link.id ? "location" : undefined}
          className="nav-link text-[clamp(20px,2vw,28px)] leading-[1.2] tracking-[0.02em]"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
