/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Pastikan ini ada untuk App Router
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
