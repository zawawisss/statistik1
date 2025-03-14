/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Outputs a Single-Page Application (SPA).
    distDir: './dist', // Changes the build output directory to `./dist/`.
    eslint: {
      ignoreDuringBuilds: true,
    },
  }
   
  export default nextConfig