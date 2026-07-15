import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/cursor/CustomCursor'
import IntroScreen from '@/components/animations/IntroScreen'
import ScrollProgress from '@/components/animations/ScrollProgress'
import CartDrawer from '@/components/loja/CartDrawer'

export const viewport: Viewport = {
  themeColor: '#272B00',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Flora Eça — Cantora e Compositora',
    template: '%s | Flora Eça',
  },
  description: 'Cantora e compositora brasileira. Canções que atravessam o tempo.',
  keywords: ['Flora Eça', 'cantora', 'compositora', 'música brasileira', 'folk', 'natureza', 'espiritualidade'],
  authors: [{ name: 'Flora Eça' }],
  creator: 'Flora Eça',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Flora Eça',
    images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: 'Flora Eça' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/og.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-cream text-neutral-dark antialiased">
        {/* Intro cinematográfica */}
        <IntroScreen />

        {/* Cursor custom (desktop only) */}
        <CustomCursor />

        {/* Barra de progresso de scroll */}
        <ScrollProgress />

        {/* Navbar */}
        <Navbar />

        {/* Conteúdo */}
        <main>{children}</main>

        {/* Footer */}
        <Footer />

        {/* Carrinho lateral */}
        <CartDrawer />
      </body>
    </html>
  )
}
