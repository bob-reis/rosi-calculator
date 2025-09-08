/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Do not block builds on ESLint errors in CI/Vercel
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
