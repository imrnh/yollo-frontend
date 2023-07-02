/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  serverRuntimeConfig: {
    // Set the maximum request body size to 10Gb 
    maxFileSize: 10 * 1000 * 1024 * 1024,
  },
}

module.exports = nextConfig
