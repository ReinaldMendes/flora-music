import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function VideosSection({ videos }: { videos: any[] }) {
  if (!videos.length) return null
  return (
    <section className="section-padding bg-flora-cream/20">
      <div className="container-flora">
        <AnimatedSection>
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-3">Audiovisual</p>
          <h2 className="font-display text-title text-flora-deep mb-14">Assista</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <AnimatedSection key={video.id} delay={i * 0.1}>
              <div className="group">
                <div className="relative aspect-video overflow-hidden rounded-lg mb-4 bg-flora-deep">
                  <iframe src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" loading="lazy"/>
                </div>
                {video.category && <p className="text-[10px] font-body text-flora-moss uppercase tracking-widest mb-1">{video.category}</p>}
                <h3 className="font-body font-medium text-flora-deep text-sm group-hover:text-flora-copper transition-colors">{video.title}</h3>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.4} className="mt-10">
          <Link href="/videos" className="inline-flex items-center gap-2 text-sm font-body text-flora-forest hover:text-flora-deep underline-flora transition-colors">Ver todos os vídeos →</Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
