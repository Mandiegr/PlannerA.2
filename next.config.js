/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['tsx', 'api.ts', 'api.tsx', '/api/*'],
  images: {
        domains: ['lh3.googleusercontent.com'],
      },

}

module.exports = nextConfig
