import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Flora — Cantora e Compositora',
    template: '%s | Flora',
  },
  description: 'Cantora e compositora brasileira. Música que vive entre a natureza, a espiritualidade e o silêncio.',
  keywords: ['Flora', 'cantora', 'compositora', 'música brasileira', 'folk', 'natureza'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Flora',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-flora-offwhite text-flora-deep antialiased">
        {children}
      </body>
    </html>
  )
}
