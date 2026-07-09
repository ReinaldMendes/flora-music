import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Música',
  description: 'Toda a discografia de Flora — álbuns, EPs e singles.',
}
export const revalidate = 3600

export default async function MusicaPage() {
  const albums = await prisma.album.findMany({
    where: { published: true },
    orderBy: { releaseDate: 'desc' },
    include: { tracks: { orderBy: { trackNumber: 'asc' }, take: 5 } },
  })

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-deep text-flora-cream">
        <div className="container-flora">
          <AnimatedText>
            <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-4">Discografia</p>
            <h1 className="font-display text-title text-flora-cream">Música</h1>
          </AnimatedText>
        </div>
      </div>

      <Section className="bg-flora-offwhite">
        <div className="space-y-24">
          {albums.map((album, i) => (
            <AnimatedText key={album.id} delay={i * 0.1}>
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <Link href={`/musica/${album.slug}`} className="group">
                  <div className="relative aspect-square overflow-hidden rounded bg-flora-moss/10">
                    <Image
                      src={album.coverUrl}
                      alt={album.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </Link>
                <div>
                  <Badge variant="moss" className="mb-4">{album.type}</Badge>
                  <Link href={`/musica/${album.slug}`}>
                    <h2 className="font-display text-h1 text-flora-deep hover:text-flora-copper transition-colors mb-3">{album.title}</h2>
                  </Link>
                  <p className="text-sm font-body text-flora-moss mb-6">{formatDate(album.releaseDate)}</p>
                  {album.description && (
                    <p className="font-body text-flora-forest/70 leading-relaxed mb-8">{album.description}</p>
                  )}
                  {/* Tracklist preview */}
                  <div className="space-y-2">
                    {album.tracks.map(track => (
                      <Link
                        key={track.id}
                        href={`/letras/${track.slug}`}
                        className="group/track flex items-center justify-between py-2 border-b border-flora-moss/15 hover:border-flora-moss/40 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-body text-flora-moss/50 w-4">{track.trackNumber}</span>
                          <span className="text-sm font-body text-flora-forest group-hover/track:text-flora-deep transition-colors">{track.title}</span>
                        </div>
                        <span className="text-xs font-body text-flora-moss/50">{track.duration}</span>
                      </Link>
                    ))}
                  </div>
                  {/* Streaming links */}
                  {album.streamingLinks && (
                    <div className="flex gap-3 mt-6 flex-wrap">
                      {Object.entries(album.streamingLinks as Record<string,string>).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-flora-moss/30 text-xs font-body text-flora-forest rounded capitalize hover:bg-flora-deep hover:text-flora-cream hover:border-flora-deep transition-all duration-300"
                        >
                          {platform}
                        </a>
                      ))}
                    </div>
                  )}
                  <Link href={`/musica/${album.slug}`} className="inline-flex items-center gap-2 mt-6 text-sm font-body text-flora-forest hover:text-flora-deep hover-underline-flora transition-colors">
                    Ver álbum completo →
                  </Link>
                </div>
              </div>
            </AnimatedText>
          ))}
        </div>
      </Section>
    </>
  )
}
