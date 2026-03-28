import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/api/**",
      },
      {
        protocol: "https",
        hostname: "**.devtunnels.ms",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "**localhost",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "api.hey-ineed.com",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
