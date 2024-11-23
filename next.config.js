/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  basePath: '',      // Base path for GitHub Pages
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig 