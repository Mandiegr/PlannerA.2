/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['tsx', 'api.ts', 'api.tsx', '/api/*'],

}

module.exports = nextConfig
