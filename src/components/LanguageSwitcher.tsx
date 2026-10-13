"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { localeCookie, otherLocale } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/LocaleProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const dictionary = useDictionary();
  const router = useRouter();
  const pathname = usePathname() || `/${locale}`;
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ? `?${searchParams.toString()}` : "";
  const next = otherLocale(locale);
  const label = next === "pt" ? "PT" : "EN";

  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "pt" || segments[0] === "en") {
    segments[0] = next;
  } else {
    segments.unshift(next);
  }
  const href = `/${segments.join("/")}${search}`;

  return (
    <Link
      href={href}
      hrefLang={next}
      aria-label={`${dictionary.nav.language}: ${label}`}
      className={`nav-link text-[clamp(20px,2vw,28px)] leading-[1.2] tracking-[0.02em] ${className}`}
      onClick={(e) => {
        e.preventDefault();
        document.cookie = `${localeCookie}=${next};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
        // Read hash at click time — SiteNav updates it via replaceState, which does not fire hashchange.
        router.push(`${href}${window.location.hash}`);
      }}
    >
      {label}
    </Link>
  );
}
