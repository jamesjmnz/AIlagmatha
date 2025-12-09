import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure builds resolve within the frontend workspace
    root: __dirname,
  },
};

export default nextConfig;
