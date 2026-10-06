"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About me" },
  { href: "/cards", label: "Check the Cards" },
];

export function SiteNav({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={`flex flex-wrap gap-x-[clamp(24px,5vw,75px)] gap-y-2 ${className}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={pathname === link.href ? "page" : undefined}
          className="nav-link text-[clamp(20px,2vw,28px)] leading-[1.2] tracking-[0.02em]"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
