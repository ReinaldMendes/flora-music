import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'

export const metadata: Metadata = {
  title: 'Vídeos',
  description: 'Clipes, sessões acústicas e bastidores de Flora.',
}
export const revalidate = 3600

export default async function VideosPage() {
  const videos = await prisma.video.findMany({ orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }] })
  const categories = [...new Set(videos.map(v => v.category).filter(Boolean))]

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-deep text-flora-cream">
        <div className="container-flora">
          <AnimatedText>
            <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-4">Audiovisual</p>
            <h1 className="font-display text-title text-flora-cream">Vídeos</h1>
          </AnimatedText>
        </div>
      </div>

      <Section className="bg-flora-offwhite">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, i) => (
            <AnimatedText key={video.id} delay={i * 0.07}>
              <div className="group">
                <div className="relative aspect-video overflow-hidden rounded mb-4 bg-flora-deep">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
                {video.category && (
                  <p className="text-xs font-body text-flora-moss uppercase tracking-wide mb-2">{video.category}</p>
                )}
                <h2 className="font-body font-medium text-flora-deep group-hover:text-flora-copper transition-colors">{video.title}</h2>
                {video.description && <p className="text-sm font-body text-flora-forest/60 mt-1 line-clamp-2">{video.description}</p>}
              </div>
            </AnimatedText>
          ))}
        </div>
      </Section>
    </>
  )
}
