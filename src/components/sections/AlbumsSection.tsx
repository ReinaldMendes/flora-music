import Link from 'next/link'
import Image from 'next/image'
import AnimatedText from '@/components/ui/AnimatedText'
import Section from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { Album } from '@/types'

interface Props { albums: Album[] }

export default function AlbumsSection({ albums }: Props) {
  if (!albums.length) return null
  const featured = albums[0]
  const rest = albums.slice(1)

  return (
    <Section id="musica" className="bg-flora-offwhite">
      <AnimatedText>
        <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-4">Discografia</p>
        <h2 className="font-display text-title text-flora-deep mb-16">Últimos lançamentos</h2>
      </AnimatedText>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Featured Album */}
        <AnimatedText delay={0.1}>
          <Link href={`/musica/${featured.slug}`} className="group block">
            <div className="relative aspect-square overflow-hidden rounded mb-6 bg-flora-moss/10">
              <Image
                src={featured.coverUrl || '/images/album-placeholder.jpg'}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <Badge variant="moss" className="mb-3">{featured.type}</Badge>
            <h3 className="font-display text-h2 text-flora-deep group-hover:text-flora-copper transition-colors mb-2">{featured.title}</h3>
            <p className="text-sm font-body text-flora-moss">{formatDate(featured.releaseDate)}</p>
            {featured.description && (
              <p className="mt-3 text-sm font-body text-flora-forest/70 leading-relaxed line-clamp-2">{featured.description}</p>
            )}
          </Link>
        </AnimatedText>

        {/* Other Albums */}
        <div className="flex flex-col gap-6">
          {rest.map((album, i) => (
            <AnimatedText key={album.id} delay={0.2 + i * 0.1}>
              <Link href={`/musica/${album.slug}`} className="group flex gap-5 items-start">
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded bg-flora-moss/10">
                  <Image
                    src={album.coverUrl || '/images/album-placeholder.jpg'}
                    alt={album.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="96px"
                  />
                </div>
                <div>
                  <Badge variant="moss" className="mb-2 text-xs">{album.type}</Badge>
                  <h3 className="font-display text-xl text-flora-deep group-hover:text-flora-copper transition-colors">{album.title}</h3>
                  <p className="text-xs font-body text-flora-moss mt-1">{formatDate(album.releaseDate)}</p>
                </div>
              </Link>
            </AnimatedText>
          ))}
          <AnimatedText delay={0.5}>
            <Link
              href="/musica"
              className="inline-flex items-center gap-2 text-sm font-body text-flora-forest hover:text-flora-deep hover-underline-flora transition-colors mt-4"
            >
              Ver toda a discografia →
            </Link>
          </AnimatedText>
        </div>
      </div>
    </Section>
  )
}
