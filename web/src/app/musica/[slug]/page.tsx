import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchApi } from '@/lib/fetch-api'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import { formatDate } from '@/lib/utils'

interface Props { params: { slug: string } }
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await fetchApi<any>(`/albuns/${params.slug}`, null)
  if (!a) return { title: 'Álbum' }
  return { title: a.title, description: a.description || `${a.title} — Flora Eça` }
}

export default async function AlbumPage({ params }: Props) {
  const album = await fetchApi<any>(`/albuns/${params.slug}`, null)
  if (!album || album.error) notFound()

  return (
    <>
      <div className="pt-24 section-dark">
        <div className="container-flora grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pb-20 items-end">
          <Reveal direction="scale">
            <div className="relative aspect-square max-w-md overflow-hidden">
              {album.coverUrl && (
                <Image src={album.coverUrl} alt={album.title} fill priority
                  className="object-cover" sizes="(max-width:1024px)100vw,50vw"/>
              )}
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.15}>
            <span className="tag-flora text-forest-sage/60 block mb-5">{album.type}</span>
            <h1 className="font-display text-neutral-cream mb-4"
              style={{ fontSize: 'clamp(2.5rem,7vw,8rem)', letterSpacing: '-0.03em', lineHeight: '0.92' }}>
              {album.title}
            </h1>
            <p className="tag-flora text-neutral-cream/30 mb-8">{formatDate(album.releaseDate)}</p>
            {album.description && (
              <p className="font-body text-neutral-cream/55 leading-relaxed mb-10 max-w-md">{album.description}</p>
            )}
            {album.streamingLinks && (
              <div className="flex flex-wrap gap-3">
                {Object.entries(album.streamingLinks).map(([pl, url]) => (
                  <a key={pl} href={url as string} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-neutral-cream/15 text-[0.65rem] font-body text-neutral-cream/55 capitalize hover:border-forest-sage/40 hover:text-neutral-cream/80 transition-all duration-400">
                    {pl}
                  </a>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </div>

      <section className="section-flora section-cream">
        <div className="container-flora max-w-2xl">
          <p className="tag-flora text-forest-moss/55 mb-10">Faixas</p>
          <div className="space-y-0">
            {(album.tracks || []).map((track: any, i: number) => (
              <Reveal key={track.id} direction="up" delay={i * 0.04}>
                <Link href={`/letras/${track.slug}`}
                  className="group flex items-center justify-between py-5 border-b border-forest-deep/7 hover:border-terra-dark/20 -mx-4 px-4 hover:bg-forest-deep/[0.02] transition-all duration-300">
                  <div className="flex items-center gap-5">
                    <span className="font-body text-[0.6rem] text-neutral-mid/35 w-5 text-center">{track.trackNumber}</span>
                    <span className="font-body font-medium text-forest-deep group-hover:text-terra-dark transition-colors duration-300">{track.title}</span>
                  </div>
                  <span className="font-body text-sm text-neutral-mid/35">{track.duration}</span>
                </Link>
              </Reveal>
            ))}
          </div>

          {album.credits?.length > 0 && (
            <Reveal direction="up" delay={0.3} className="mt-16 pt-10 border-t border-forest-deep/8">
              <p className="tag-flora text-forest-moss/55 mb-8">Ficha técnica</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {album.credits.map((c: any) => (
                  <div key={c.id} className="flex gap-5">
                    <span className="font-body text-xs text-neutral-mid/40 min-w-[90px] uppercase tracking-wider pt-0.5">{c.role}</span>
                    <span className="font-body text-sm text-neutral-mid">{c.name}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  )
}
