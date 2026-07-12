import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { fetchApi } from '@/lib/fetch-api'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Letras', description: 'Todas as letras de Flora.' }

export default async function LetrasPage() {
  const albums = await fetchApi<any[]>('/albuns?published=true', [])

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-offwhite border-b border-flora-moss/10">
        <div className="container-flora">
          <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-3">Poesia</p>
          <h1 className="font-display text-title text-flora-deep">Letras</h1>
        </div>
      </div>
      <section className="section-padding bg-flora-offwhite">
        <div className="container-flora space-y-16 max-w-3xl">
          {albums.map((album: any, i: number) => (
            <AnimatedSection key={album.id} delay={i * 0.08}>
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-6">
                {album.title} · {new Date(album.releaseDate).getFullYear()}
              </p>
              <div>
                {(album.tracks || []).filter((t: any) => t.lyrics).map((track: any) => (
                  <Link key={track.id} href={`/letras/${track.slug}`}
                    className="group flex items-center justify-between py-4 border-b border-flora-moss/10 hover:border-flora-moss/30 transition-colors">
                    <span className="font-display text-lg text-flora-deep group-hover:text-flora-copper transition-colors">{track.title}</span>
                    <span className="text-xs font-body text-flora-moss/40 group-hover:text-flora-moss transition-colors">Ler →</span>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          ))}
          {albums.length === 0 && (
            <p className="font-display text-2xl text-flora-deep/30">Letras em breve.</p>
          )}
        </div>
      </section>
    </>
  )
}
