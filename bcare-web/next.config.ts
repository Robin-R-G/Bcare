import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  // Only set basePath in production build for GitHub Pages repo 'Bcare'
  basePath: isProd ? "/Bcare" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
