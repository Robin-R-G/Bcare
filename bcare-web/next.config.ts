import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables static export for GitHub Pages when explicitly building
  ...(process.env.NODE_ENV === 'production' ? { output: "export" } : {}),
  basePath: "/Bcare",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
