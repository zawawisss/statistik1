import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Nonaktifkan ESLint selama build
  },
};

export default nextConfig;