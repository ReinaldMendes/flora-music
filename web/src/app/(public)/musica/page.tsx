import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { fetchApi } from '@/lib/fetch-api'
import type { Album } from '@/types'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Música', description: 'Toda a discografia de Flora.' }

export default async function MusicaPage() {
  const albums = await fetchApi<Album[]>('/albuns?published=true', [])

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-deep">
        <div className="container-flora">
          <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-3">Discografia</p>
          <h1 className="font-display text-title text-flora-cream">Música</h1>
        </div>
      </div>
      <section className="section-padding bg-flora-offwhite">
        <div className="container-flora space-y-24">
          {albums.map((album, i) => (
            <AnimatedSection key={album.id} delay={i * 0.1}>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <Link href={`/musica/${album.slug}`} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-flora-moss/10">
                    {album.coverUrl && <Image src={album.coverUrl} alt={album.title} fill className="object-cover transition-all duration-700 group-hover:scale-105" sizes="(max-width:768px)100vw,50vw"/>}
                  </div>
                </Link>
                <div>
                  <Badge variant="moss" className="mb-3">{album.type}</Badge>
                  <Link href={`/musica/${album.slug}`}><h2 className="font-display text-h1 text-flora-deep hover:text-flora-copper transition-colors mb-2">{album.title}</h2></Link>
                  <p className="text-sm font-body text-flora-moss mb-6">{formatDate(album.releaseDate)}</p>
                  {album.description && <p className="font-body text-flora-forest/65 leading-relaxed mb-8">{album.description}</p>}
                  {album.tracks && (
                    <div className="space-y-1.5 mb-8">
                      {album.tracks.slice(0,5).map(track => (
                        <Link key={track.id} href={`/letras/${track.slug}`} className="group/t flex items-center justify-between py-2 border-b border-flora-moss/15 hover:border-flora-moss/35 transition-colors">
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-body text-flora-moss/45 w-4">{track.trackNumber}</span>
                            <span className="text-sm font-body text-flora-forest group-hover/t:text-flora-deep transition-colors">{track.title}</span>
                          </div>
                          <span className="text-xs font-body text-flora-moss/45">{track.duration}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                  {album.streamingLinks && (
                    <div className="flex gap-3 flex-wrap">
                      {Object.entries(album.streamingLinks).map(([platform, url]) => (
                        <a key={platform} href={url as string} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-flora-moss/30 text-xs font-body text-flora-forest rounded capitalize hover:bg-flora-deep hover:text-flora-cream hover:border-flora-deep transition-all duration-300">{platform}</a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
          {albums.length === 0 && (
            <p className="font-display text-2xl text-flora-deep/30">Em breve.</p>
          )}
        </div>
      </section>
    </>
  )
}
