import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
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
    ],
  },
};

export default nextConfig;
