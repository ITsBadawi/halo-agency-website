/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    '192.168.0.115:3000',
    '192.168.0.115',
    '26.136.242.28:3000',
    '26.136.242.28',
    'localhost:3000',
    'localhost',
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
