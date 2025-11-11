import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"], // recognize .mdx files

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  experimental: {
    mdxRs: true, // use the Rust compiler for better perf
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
