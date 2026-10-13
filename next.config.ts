import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Locale-prefixed section paths point at their hash anchors (bare `/gallery` is handled in middleware).
  async redirects() {
    return ["gallery", "cards", "about"].map((id) => ({
      source: `/:locale(pt|en)/${id}`,
      destination: `/:locale/#${id}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
