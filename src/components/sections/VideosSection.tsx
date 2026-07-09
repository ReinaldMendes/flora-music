import Link from 'next/link'
import AnimatedText from '@/components/ui/AnimatedText'
import Section from '@/components/ui/Section'

interface Video { id: string; youtubeId: string; title: string; description?: string | null }
interface Props { videos: Video[] }

export default function VideosSection({ videos }: Props) {
  if (!videos.length) return null

  return (
    <Section className="bg-flora-cream/30">
      <AnimatedText>
        <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-4">Vídeos</p>
        <h2 className="font-display text-title text-flora-deep mb-16">Assista</h2>
      </AnimatedText>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((video, i) => (
          <AnimatedText key={video.id} delay={i * 0.12}>
            <div className="group">
              <div className="relative aspect-video overflow-hidden rounded mb-4 bg-flora-deep">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0&showinfo=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              </div>
              <h3 className="font-body font-medium text-flora-deep text-sm group-hover:text-flora-copper transition-colors">
                {video.title}
              </h3>
            </div>
          </AnimatedText>
        ))}
      </div>

      <AnimatedText delay={0.4} className="mt-10">
        <Link href="/videos" className="inline-flex items-center gap-2 text-sm font-body text-flora-forest hover:text-flora-deep transition-colors hover-underline-flora">
          Ver todos os vídeos →
        </Link>
      </AnimatedText>
    </Section>
  )
}
