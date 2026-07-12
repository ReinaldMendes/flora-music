import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { fetchApi } from '@/lib/fetch-api'

interface Props { params: { slug: string } }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await fetchApi<any>(`/albuns/${params.slug}`, null)
  if (!album) return { title: 'Álbum' }
  return { title: album.title, description: album.description || `Álbum ${album.title} de Flora.` }
}

export default async function AlbumPage({ params }: Props) {
  const album = await fetchApi<any>(`/albuns/${params.slug}`, null)
  if (!album || album.error) notFound()

  return (
    <>
      <div className="pt-24 bg-flora-deep">
        <div className="container-flora grid md:grid-cols-2 gap-12 pb-16 items-end">
          <AnimatedSection>
            <div className="relative aspect-square max-w-sm rounded-lg overflow-hidden bg-flora-moss/10">
              {album.coverUrl && <Image src={album.coverUrl} alt={album.title} fill className="object-cover" sizes="400px" priority/>}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Badge variant="moss" className="mb-4">{album.type}</Badge>
            <h1 className="font-display text-title text-flora-cream mb-3">{album.title}</h1>
            <p className="text-sm font-body text-flora-moss mb-6">{formatDate(album.releaseDate)}</p>
            {album.description && <p className="font-body text-flora-cream/55 leading-relaxed mb-8 max-w-md">{album.description}</p>}
            {album.streamingLinks && (
              <div className="flex flex-wrap gap-3">
                {Object.entries(album.streamingLinks).map(([platform, url]: any) => (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-flora-cream/10 border border-flora-cream/20 text-xs font-body text-flora-cream/65 rounded capitalize hover:bg-flora-cream hover:text-flora-deep transition-all duration-300">
                    {platform}
                  </a>
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>
      </div>

      <section className="section-padding bg-flora-offwhite">
        <div className="container-flora">
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-8">Faixas</p>
          <div className="space-y-px max-w-2xl">
            {(album.tracks || []).map((track: any, i: number) => (
              <AnimatedSection key={track.id} delay={i * 0.04}>
                <Link href={`/letras/${track.slug}`}
                  className="group flex items-center justify-between py-4 px-4 -mx-4 rounded hover:bg-flora-moss/5 transition-colors">
                  <div className="flex items-center gap-5">
                    <span className="text-sm font-body text-flora-moss/40 w-6 text-center">{track.trackNumber}</span>
                    <span className="font-body font-medium text-flora-deep group-hover:text-flora-copper transition-colors">{track.title}</span>
                  </div>
                  <span className="text-sm font-body text-flora-moss/40">{track.duration}</span>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {album.credits?.length > 0 && (
            <div className="mt-16 pt-8 border-t border-flora-moss/15">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-8">Ficha técnica</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                {album.credits.map((c: any) => (
                  <div key={c.id} className="flex gap-4">
                    <span className="text-xs font-body text-flora-moss/50 min-w-[100px]">{c.role}</span>
                    <span className="text-sm font-body text-flora-forest">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
