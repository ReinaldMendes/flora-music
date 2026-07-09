import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Necessário para Vercel com Prisma
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com'   },
      { protocol: 'https', hostname: 'images.unsplash.com'  },
      { protocol: 'https', hostname: 'i.ytimg.com'          },
      { protocol: 'https', hostname: 'img.youtube.com'      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control',  value: 'on'                   },
          { key: 'X-Content-Type-Options',   value: 'nosniff'              },
          { key: 'Referrer-Policy',          value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
