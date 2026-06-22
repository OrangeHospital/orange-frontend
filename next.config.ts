import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      // Sanity CDN
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      // Legacy API servers — kept during transition
      {
        protocol: "http",
        hostname: "13.203.125.10",
        port: "2010",
      },
      {
        protocol: "http",
        hostname: "3.111.240.196",
        port: "7071",
      },
      {
        protocol: "https",
        hostname: "assets.orangechildrenhospital.com",
      },
    ],
  },
};

export default nextConfig;
