import type { Metadata } from "next";
import { DotGothic16, Nothing_You_Could_Do } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

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

export const metadata: Metadata = {
  title: { default: "Jagua jpg · Illustration", template: "%s · Jagua jpg" },
  description: "Illustration portfolio, with five new cards to pick from every day.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pixel.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-pixel">
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
