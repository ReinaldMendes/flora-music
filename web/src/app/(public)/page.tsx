import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import AlbumsSection from '@/components/sections/AlbumsSection'
import ShowsSection from '@/components/sections/ShowsSection'
import VideosSection from '@/components/sections/VideosSection'
import NewsletterSection from '@/components/sections/NewsletterSection'

export const metadata: Metadata = {
  title: 'Flora — Cantora e Compositora',
  description: 'Cantora e compositora brasileira. Música que vive entre a natureza, a espiritualidade e o silêncio.',
}

async function getData() {
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
  try {
    const [albums, shows, videos] = await Promise.all([
      fetch(`${API}/albuns?published=true`, { next: { revalidate: 3600 } }).then(r => r.json()),
      fetch(`${API}/shows?status=UPCOMING`, { next: { revalidate: 1800 } }).then(r => r.json()),
      fetch(`${API}/videos?featured=true`, { next: { revalidate: 3600 } }).then(r => r.json()),
    ])
    return { albums: Array.isArray(albums) ? albums.slice(0,4) : [], shows: Array.isArray(shows) ? shows.slice(0,5) : [], videos: Array.isArray(videos) ? videos.slice(0,3) : [] }
  } catch { return { albums: [], shows: [], videos: [] } }
}

export default async function HomePage() {
  const { albums, shows, videos } = await getData()
  return (
    <>
      <HeroSection />
      <AlbumsSection albums={albums} />
      <ShowsSection shows={shows} />
      <VideosSection videos={videos} />
      <NewsletterSection />
    </>
  )
}
