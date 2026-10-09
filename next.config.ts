import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is one long page now; the old routes point at their sections.
  async redirects() {
    return ["gallery", "cards", "about"].map((id) => ({
      source: `/${id}`,
      destination: `/#${id}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
