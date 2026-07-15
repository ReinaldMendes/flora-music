import type { Metadata } from 'next'
import { fetchApi } from '@/lib/fetch-api'
import VideosSection from '@/components/sections/VideosSection'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Vídeos', description: 'Clipes e sessões de Flora Eça.' }

export default async function VideosPage() {
  const videos = await fetchApi<any[]>('/videos', [])
  return (
    <>
      <div className="pt-40 pb-20 section-dark">
        <div className="container-flora">
          <Reveal><span className="tag-flora text-forest-sage/60 block mb-6">Audiovisual</span></Reveal>
          <TextReveal text="Vídeos" as="h1" className="font-display text-neutral-cream"
            style={{ fontSize: 'clamp(5rem,14vw,14rem)', letterSpacing: '-0.04em', lineHeight: '0.88' } as any}/>
        </div>
      </div>
      <VideosSection videos={videos} />
    </>
  )
}
