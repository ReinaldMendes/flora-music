import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchApi } from '@/lib/fetch-api'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Letras', description: 'Letras das músicas de Flora Eça.' }

export default async function LetrasPage() {
  const albums = await fetchApi<any[]>('/albuns?published=true', [])
  return (
    <>
      <div className="pt-40 pb-20 section-cream border-b border-forest-deep/8">
        <div className="container-flora">
          <Reveal><span className="tag-flora text-forest-moss/60 block mb-6">Poesia</span></Reveal>
          <TextReveal text="Letras" as="h1" className="font-display text-forest-deep"
            style={{ fontSize: 'clamp(5rem,14vw,14rem)', letterSpacing: '-0.04em', lineHeight: '0.88' } as any}/>
        </div>
      </div>
      <section className="section-flora section-cream">
        <div className="container-flora space-y-20 max-w-3xl">
          {albums.map((album, i) => (
            <Reveal key={album.id} direction="up" delay={i*0.08}>
              <div>
                <p className="tag-flora text-forest-moss/55 mb-8">
                  {album.title} · {new Date(album.releaseDate).getFullYear()}
                </p>
                {(album.tracks||[]).filter((t:any) => t.lyrics).map((track:any) => (
                  <Link key={track.id} href={`/letras/${track.slug}`}
                    className="group flex items-center justify-between py-5 border-b border-forest-deep/6 hover:border-terra-dark/20 transition-colors">
                    <span className="font-display text-2xl md:text-3xl text-forest-deep group-hover:text-terra-dark transition-colors duration-400"
                      style={{ letterSpacing: '-0.01em' }}>
                      {track.title}
                    </span>
                    <span className="font-body text-[0.65rem] text-neutral-mid/35 group-hover:text-terra-dark/60 tracking-widest transition-colors">
                      Ler →
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          ))}
          {!albums.length && <p className="font-display text-2xl text-forest-deep/25">Letras em breve.</p>}
        </div>
      </section>
    </>
  )
}
