import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import AlbumsSection from '@/components/sections/AlbumsSection'
import ShowsSection from '@/components/sections/ShowsSection'
import VideosSection from '@/components/sections/VideosSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import { fetchApi } from '@/lib/fetch-api'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Flora — Cantora e Compositora',
  description: 'Cantora e compositora brasileira. Música que vive entre a natureza, a espiritualidade e o silêncio.',
}

export default async function HomePage() {
  const [albums, shows, videos] = await Promise.all([
    fetchApi<any[]>('/albuns?published=true', []),
    fetchApi<any[]>('/shows?status=UPCOMING', []),
    fetchApi<any[]>('/videos?featured=true', []),
  ])

  return (
    <>
      <HeroSection />
      <AlbumsSection albums={albums.slice(0, 4)} />
      <ShowsSection shows={shows.slice(0, 5)} />
      <VideosSection videos={videos.slice(0, 3)} />
      <NewsletterSection />
    </>
  )
}
