import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DotGothic16, Nothing_You_Could_Do } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import "../globals.css";

const pixel = DotGothic16({
  variable: "--font-dotgothic",
  weight: "400",
  subsets: ["latin"],
});

const script = Nothing_You_Could_Do({
  variable: "--font-nothing-you-could-do",
  weight: "400",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dictionary = getDictionary(raw);
  return {
    title: { default: dictionary.meta.title, template: `%s · Jagua jpg` },
    description: dictionary.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${pixel.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-pixel">
        <MotionProvider>
          <LocaleProvider locale={locale} dictionary={dictionary}>
            {children}
          </LocaleProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
