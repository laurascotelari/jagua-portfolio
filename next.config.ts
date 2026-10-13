import type { NextConfig } from "next";
import { locales, sectionRoutes } from "./src/i18n/config";

const localePattern = locales.join("|");

const nextConfig: NextConfig = {
  // Locale-prefixed section paths point at their hash anchors (bare `/gallery` is handled in middleware).
  async redirects() {
    return sectionRoutes.map((id) => ({
      source: `/:locale(${localePattern})/${id}`,
      destination: `/:locale/#${id}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
