import Link from 'next/link'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { Album } from '@/types'

export default function AlbumsSection({ albums }: { albums: Album[] }) {
  if (!albums.length) return null
  const [feat, ...rest] = albums
  return (
    <section className="section-padding bg-flora-offwhite">
      <div className="container-flora">
        <AnimatedSection>
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-3">Discografia</p>
          <h2 className="font-display text-title text-flora-deep mb-14">Últimos lançamentos</h2>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-10">
          <AnimatedSection delay={0.1}>
            <Link href={`/musica/${feat.slug}`} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-lg mb-6 bg-flora-moss/10">
                {feat.coverUrl && <Image src={feat.coverUrl} alt={feat.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px)100vw,50vw"/>}
              </div>
              <Badge variant="moss" className="mb-3">{feat.type}</Badge>
              <h3 className="font-display text-h2 text-flora-deep group-hover:text-flora-copper transition-colors mb-2">{feat.title}</h3>
              <p className="text-sm font-body text-flora-moss">{formatDate(feat.releaseDate)}</p>
              {feat.description && <p className="mt-3 text-sm font-body text-flora-forest/65 leading-relaxed line-clamp-2">{feat.description}</p>}
            </Link>
          </AnimatedSection>
          <div className="flex flex-col gap-6">
            {rest.map((album, i) => (
              <AnimatedSection key={album.id} delay={0.2 + i * 0.08}>
                <Link href={`/musica/${album.slug}`} className="group flex gap-5 items-start">
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-flora-moss/10">
                    {album.coverUrl && <Image src={album.coverUrl} alt={album.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="96px"/>}
                  </div>
                  <div>
                    <Badge variant="moss" className="mb-2">{album.type}</Badge>
                    <h3 className="font-display text-xl text-flora-deep group-hover:text-flora-copper transition-colors">{album.title}</h3>
                    <p className="text-xs font-body text-flora-moss mt-1">{formatDate(album.releaseDate)}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={0.5}>
              <Link href="/musica" className="inline-flex items-center gap-2 text-sm font-body text-flora-forest hover:text-flora-deep underline-flora transition-colors mt-2">Ver toda a discografia →</Link>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
