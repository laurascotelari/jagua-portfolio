import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookie,
  localeFromAcceptLanguage,
  sectionRoutes,
  type Locale,
} from "@/i18n/config";

const SECTION_REDIRECTS = new Set<string>(sectionRoutes);

function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(localeCookie)?.value;
  if (cookie && isLocale(cookie)) return cookie;
  return localeFromAcceptLanguage(request.headers.get("accept-language"));
}

function redirectTo(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocale(first)) {
    return NextResponse.next();
  }

  const locale = preferredLocale(request);

  if (pathname === "/" || pathname === "") {
    return redirectTo(request, `/${locale}`);
  }

  if (segments.length === 1 && SECTION_REDIRECTS.has(segments[0]!)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    url.hash = `#${segments[0]}`;
    return NextResponse.redirect(url);
  }

  if (first && !isLocale(first)) {
    return redirectTo(request, `/${defaultLocale}${pathname}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|art/|illustrations/|.*\\..*).*)"],
};
