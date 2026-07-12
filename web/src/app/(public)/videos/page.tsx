import type { Metadata } from 'next'
import AnimatedSection from '@/components/ui/AnimatedSection'
export const metadata: Metadata = { title: 'Vídeos', description: 'Clipes, sessões acústicas e bastidores de Flora.' }
async function getData() {
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
  try { return await fetch(`${API}/videos`, { next: { revalidate: 3600 } }).then(r => r.json()) }
  catch { return [] }
}
export default async function VideosPage() {
  const videos = await getData()
  return (
    <>
      <div className="pt-32 pb-16 bg-flora-deep text-flora-cream">
        <div className="container-flora">
          <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-3">Audiovisual</p>
          <h1 className="font-display text-title text-flora-cream">Vídeos</h1>
        </div>
      </div>
      <section className="section-padding bg-flora-offwhite">
        <div className="container-flora grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video: any, i: number) => (
            <AnimatedSection key={video.id} delay={i * 0.07}>
              <div className="group">
                <div className="relative aspect-video overflow-hidden rounded-lg mb-4 bg-flora-deep">
                  <iframe src={`https://www.youtube.com/embed/${video.youtubeId}?modestbranding=1&rel=0`} title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="absolute inset-0 w-full h-full" loading="lazy"/>
                </div>
                {video.category && <p className="text-[10px] font-body text-flora-moss uppercase tracking-widest mb-1">{video.category}</p>}
                <h2 className="font-body font-medium text-flora-deep group-hover:text-flora-copper transition-colors">{video.title}</h2>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  )
}