import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: [
    "better-auth",
    "kysely",
    "@better-auth/kysely-adapter",
  ],
  images: {
    qualities: [80, 100],
  },
};

export default nextConfig;
