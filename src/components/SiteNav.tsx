import Link from "next/link";

const links = [
  { href: "/", label: "Today", rotate: "-rotate-3" },
  { href: "/gallery", label: "Gallery", rotate: "rotate-2" },
];

export function SiteNav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between p-4 sm:p-6">
      <Link
        href="/"
        className="sticker pointer-events-auto -rotate-2 px-4 py-1 font-display text-2xl text-tomato transition-transform hover:rotate-2"
      >
        Jaguá
      </Link>
      <nav aria-label="Main" className="pointer-events-auto flex gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`sticker ${link.rotate} px-3 py-1 font-hand text-2xl transition-transform hover:-translate-y-1 hover:rotate-0`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
