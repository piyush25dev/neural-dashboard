import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // Ignore build errors (not recommended for production)
    // ignoreBuildErrors: false,
  },
  eslint: {
    // Run ESLint on build
    ignoreDuringBuilds: false,
  },
  // Image optimization
  images: {
    unoptimized: true,
  },
  // Headers for performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

export default nextConfig