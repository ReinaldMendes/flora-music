import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'

interface Props { params: { slug: string } }
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const track = await fetch(`${API}/tracks/${params.slug}`).then(r => r.json())
    return { title: `${track.title} — Letra`, description: `Letra de "${track.title}" de Flora.` }
  } catch { return { title: 'Letra' } }
}

export default async function LetraPage({ params }: Props) {
  let track: any
  try { track = await fetch(`${API}/tracks/${params.slug}`, { next: { revalidate: 3600 } }).then(r => r.json()) }
  catch { notFound() }
  if (!track || track.error || !track.lyrics) notFound()
  return (
    <section className="section-padding bg-flora-offwhite pt-32">
      <div className="container-flora max-w-2xl">
        <AnimatedSection>
          <Link href="/letras" className="text-xs font-body text-flora-moss hover:text-flora-deep transition-colors underline-flora">← Letras</Link>
          {track.album && (
            <Link href={`/musica/${track.album.slug}`} className="block mt-3 text-sm font-body text-flora-forest/55 hover:text-flora-forest transition-colors">
              {track.album.title} · {new Date(track.album.releaseDate).getFullYear()}
            </Link>
          )}
          <h1 className="font-display text-title text-flora-deep mt-2 mb-16">{track.title}</h1>
        </AnimatedSection>
        <AnimatedSection delay={0.2} variant="fade">
          <div className="font-lyrics text-lg text-flora-forest leading-[2.2] whitespace-pre-line tracking-wide">
            {track.lyrics}
          </div>
        </AnimatedSection>
        {track.credits?.length > 0 && (
          <AnimatedSection delay={0.4} className="mt-16 pt-8 border-t border-flora-moss/15">
            <p className="text-xs font-body font-medium tracking-[0.15em] uppercase text-flora-moss mb-6">Créditos</p>
            <div className="space-y-2">
              {track.credits.map((c: any) => (
                <div key={c.id} className="flex gap-6">
                  <span className="text-xs font-body text-flora-moss/50 min-w-[110px]">{c.role}</span>
                  <span className="text-sm font-body text-flora-forest">{c.name}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}