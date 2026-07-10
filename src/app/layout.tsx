import type { Metadata } from 'next'
import './globals.css'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Flora — Cantora e Compositora',
    template: '%s | Flora',
  },
  description: 'Cantora e compositora brasileira. Música que vive entre a natureza, a espiritualidade e o silêncio.',
  keywords: ['Flora', 'cantora', 'compositora', 'música brasileira', 'folk', 'natureza', 'espiritualidade'],
  authors: [{ name: 'Flora' }],
  creator: 'Flora',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Flora',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Flora — Cantora e Compositora' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og-default.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MusicGroup',
              name: 'Flora',
              url: process.env.NEXT_PUBLIC_APP_URL,
              sameAs: [
                'https://open.spotify.com/artist/floramusica',
                'https://instagram.com/flora.musica',
                'https://youtube.com/@floramusica',
              ],
            }),
          }}
        />
      </head>
      <body className="bg-flora-offwhite text-flora-deep antialiased">
        {children}
      </body>
    </html>
  )
}
