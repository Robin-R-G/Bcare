import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Bcare", // Required for GitHub Pages with a repo named 'Bcare'
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
