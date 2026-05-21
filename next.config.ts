import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev "N" badge during development so it doesn't overlap
  // the mobile bottom bar in captures.
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
