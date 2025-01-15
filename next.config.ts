import { NextConfig } from "next";

const nextConfig: NextConfig = {
  rewrites: async () => [
    {
      source: "/public/persona-ai.html",
      destination: "/pages/api/persona-ai.ts",
    },
  ],
};

export default nextConfig;

