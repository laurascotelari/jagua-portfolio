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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
