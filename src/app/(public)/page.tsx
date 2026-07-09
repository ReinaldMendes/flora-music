import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import AlbumsSection from '@/components/sections/AlbumsSection'
import ShowsSection from '@/components/sections/ShowsSection'
import VideosSection from '@/components/sections/VideosSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import InstagramSection from '@/components/sections/InstagramSection'

export const metadata: Metadata = {
  title: 'Flora — Cantora e Compositora',
  description: 'Cantora e compositora brasileira. Música que vive entre a natureza, a espiritualidade e o silêncio.',
  openGraph: {
    title: 'Flora — Cantora e Compositora',
    description: 'Cantora e compositora brasileira. Música que vive entre a natureza, a espiritualidade e o silêncio.',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
}

export const revalidate = 3600

async function getData() {
  try {
    const { prisma } = await import('@/lib/prisma')
    const [albums, shows, videos] = await Promise.all([
      prisma.album.findMany({
        where: { published: true },
        orderBy: { releaseDate: 'desc' },
        take: 4,
        include: { tracks: { take: 1 } },
      }),
      prisma.show.findMany({
        where: { status: 'UPCOMING' },
        orderBy: { date: 'asc' },
        take: 6,
      }),
      prisma.video.findMany({
        where: { featured: true },
        orderBy: [{ publishedAt: 'desc' }],
        take: 3,
      }),
    ])
    return { albums, shows, videos }
  } catch {
    return { albums: [], shows: [], videos: [] }
  }
}

export default async function HomePage() {
  const { albums, shows, videos } = await getData()
  return (
    <>
      <HeroSection />
      <AlbumsSection albums={albums as any} />
      <ShowsSection shows={shows as any} />
      <VideosSection videos={videos} />
      <NewsletterSection />
      <InstagramSection />
    </>
  )
}
