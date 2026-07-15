import { fetchApi } from '@/lib/fetch-api'
import HeroSection      from '@/components/sections/HeroSection'
import AboutSection     from '@/components/sections/AboutSection'
import MusicSection     from '@/components/sections/MusicSection'
import QuoteSection     from '@/components/sections/QuoteSection'
import ShowsSection     from '@/components/sections/ShowsSection'
import VideosSection    from '@/components/sections/VideosSection'
import GallerySection   from '@/components/sections/GallerySection'
import NewsletterSection from '@/components/sections/NewsletterSection'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [albums, shows, videos, photos] = await Promise.all([
    fetchApi<any[]>('/albuns?published=true', []),
    fetchApi<any[]>('/shows?status=UPCOMING', []),
    fetchApi<any[]>('/videos?featured=true',  []),
    fetchApi<any[]>('/fotos',                  []),
  ])

  return (
    <>
      {/* 1. Hero cinematográfico — tela cheia, fundo floresta */}
      <HeroSection />

      {/* 2. Sobre — narrativa visual com parallax */}
      <AboutSection />

      {/* 3. Música — discografia editorial */}
      <MusicSection albums={albums.slice(0,5)} />

      {/* 4. Quote — frase de impacto */}
      <QuoteSection />

      {/* 5. Shows — timeline elegante */}
      <ShowsSection shows={shows.slice(0,6)} />

      {/* 6. Vídeos — grade com player integrado */}
      <VideosSection videos={videos.slice(0,6)} />

      {/* 7. Galeria — layout editorial */}
      <GallerySection photos={photos.slice(0,4)} />

      {/* 8. Newsletter — call to action final */}
      <NewsletterSection />
    </>
  )
}
