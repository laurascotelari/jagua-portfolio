import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Shrikhand } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

const display = Shrikhand({
  variable: "--font-shrikhand",
  weight: "400",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const body = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Jaguá · Illustration", template: "%s · Jaguá" },
  description: "Illustration portfolio, with a new Art of the Day every day.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${hand.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <MotionProvider>
          <SiteNav />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
