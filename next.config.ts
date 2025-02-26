import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',
    basePath: '/bitcoin',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
