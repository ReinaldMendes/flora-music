import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchApi } from '@/lib/fetch-api'
import Reveal from '@/components/animations/Reveal'

interface Props { params: { slug: string } }
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await fetchApi<any>(`/tracks/${params.slug}`, null)
  if (!t) return { title: 'Letra' }
  return { title: `${t.title} — Letra`, description: `Letra de "${t.title}" de Flora Eça.` }
}

export default async function LetraPage({ params }: Props) {
  const track = await fetchApi<any>(`/tracks/${params.slug}`, null)
  if (!track || track.error || !track.lyrics) notFound()

  return (
    <section className="pt-40 pb-24 section-cream min-h-screen">
      <div className="container-flora max-w-2xl mx-auto">
        <Reveal>
          <Link href="/letras" className="tag-flora text-forest-moss/60 hover:text-terra-dark transition-colors block mb-8">
            ← Letras
          </Link>
          {track.album && (
            <Link href={`/musica/${track.album.slug}`}
              className="font-body text-sm text-neutral-mid/50 hover:text-forest-deep transition-colors block mb-3">
              {track.album.title} · {new Date(track.album.releaseDate).getFullYear()}
            </Link>
          )}
          <h1 className="font-display text-forest-deep mb-20"
            style={{ fontSize: 'clamp(3rem,8vw,7rem)', letterSpacing: '-0.03em', lineHeight: '0.92' }}>
            {track.title}
          </h1>
        </Reveal>

        <Reveal direction="fade" delay={0.2}>
          <div className="font-serif text-xl text-neutral-dark leading-[2.1] whitespace-pre-line tracking-wide"
            style={{ fontFamily: '"EB Garamond", Georgia, serif', fontSize: 'clamp(1.125rem,2vw,1.375rem)' }}>
            {track.lyrics}
          </div>
        </Reveal>

        {track.credits?.length > 0 && (
          <Reveal direction="up" delay={0.4} className="mt-20 pt-10 border-t border-forest-deep/8">
            <p className="tag-flora text-forest-moss/55 mb-8">Créditos</p>
            <div className="space-y-3">
              {track.credits.map((c: any) => (
                <div key={c.id} className="flex gap-8">
                  <span className="font-body text-xs text-neutral-mid/40 min-w-[100px] uppercase tracking-wider pt-0.5">{c.role}</span>
                  <span className="font-body text-sm text-neutral-mid">{c.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
