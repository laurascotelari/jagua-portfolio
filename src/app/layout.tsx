import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Pass-through root; `<html>` / `<body>` live in `[locale]/layout.tsx`. */
export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/illustrations/favicon4.png", type: "image/png", sizes: "75x75" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
