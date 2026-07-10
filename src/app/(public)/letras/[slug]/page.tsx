import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'

interface Props { params: { slug: string } }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const track = await prisma.track.findUnique({ where: { slug: params.slug }, include: { album: true } })
    if (!track) return { title: 'Letra não encontrada' }
    return { title: `${track.title} — Letra`, description: `Letra de "${track.title}" do álbum ${track.album.title} de Flora.` }
  } catch {
    return { title: 'Letra', description: 'Letra de música de Flora' }
  }
}

export async function generateStaticParams() {
  try {
    const tracks = await prisma.track.findMany({ where: { lyrics: { not: null } }, select: { slug: true } })
    return tracks.map(t => ({ slug: t.slug }))
  } catch {
    return []
  }
}

export const revalidate = 3600

export default async function LetraPage({ params }: Props) {
  const track = await prisma.track.findUnique({
    where: { slug: params.slug },
    include: { album: { select: { title: true, slug: true, releaseDate: true } }, credits: true },
  })
  if (!track || !track.lyrics) notFound()

  return (
    <Section className="bg-flora-offwhite pt-32">
      <div className="max-w-2xl mx-auto">
        <AnimatedText>
          <Link href="/letras" className="text-xs font-body text-flora-moss hover:text-flora-deep transition-colors hover-underline-flora">
            ← Letras
          </Link>
          <Link href={`/musica/${track.album.slug}`} className="block mt-3 text-sm font-body text-flora-forest/60 hover:text-flora-forest transition-colors">
            {track.album.title} · {new Date(track.album.releaseDate).getFullYear()}
          </Link>
          <h1 className="font-display text-title text-flora-deep mt-2 mb-16">{track.title}</h1>
        </AnimatedText>

        <AnimatedText delay={0.2} variant="fadeIn">
          <div className="font-lyrics text-lg text-flora-forest leading-[2.2] whitespace-pre-line tracking-wide">
            {track.lyrics}
          </div>
        </AnimatedText>

        {track.credits.length > 0 && (
          <AnimatedText delay={0.4} className="mt-16 pt-8 border-t border-flora-moss/15">
            <p className="text-xs font-body font-medium tracking-[0.15em] uppercase text-flora-moss mb-6">Créditos</p>
            <div className="space-y-2">
              {track.credits.map(c => (
                <div key={c.id} className="flex gap-6">
                  <span className="text-xs font-body text-flora-moss/50 min-w-[110px]">{c.role}</span>
                  <span className="text-sm font-body text-flora-forest">{c.name}</span>
                </div>
              ))}
            </div>
          </AnimatedText>
        )}
      </div>
    </Section>
  )
}
