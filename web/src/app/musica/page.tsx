import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { fetchApi } from '@/lib/fetch-api'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Música', description: 'Toda a discografia de Flora Eça.' }

export default async function MusicaPage() {
  const albums = await fetchApi<any[]>('/albuns?published=true', [])

  return (
    <>
      <div className="pt-40 pb-20 section-dark">
        <div className="container-flora">
          <Reveal><span className="tag-flora text-forest-sage/60 block mb-6">Discografia</span></Reveal>
          <TextReveal text="Música" as="h1" className="font-display text-neutral-cream"
            style={{ fontSize: 'clamp(5rem,14vw,14rem)', letterSpacing: '-0.04em', lineHeight: '0.88' } as any}/>
        </div>
      </div>

      <section className="section-flora section-cream">
        <div className="container-flora space-y-32">
          {albums.map((album, i) => (
            <Reveal key={album.id} direction="up" delay={i * 0.08}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${i%2===1 ? 'lg:direction-rtl' : ''}`}>
                <Link href={`/musica/${album.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={album.coverUrl||'/images/album-placeholder.jpg'} alt={album.title} fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width:1024px)100vw,50vw"/>
                    <div className="absolute inset-0 bg-forest-deep/0 group-hover:bg-forest-deep/10 transition-colors duration-500"/>
                  </div>
                </Link>
                <div className={i%2===1 ? 'lg:order-first' : ''}>
                  <span className="tag-flora text-forest-moss mb-4 block">{album.type}</span>
                  <Link href={`/musica/${album.slug}`}>
                    <h2 className="font-display text-forest-deep hover:text-terra-dark transition-colors duration-400 mb-3"
                      style={{ fontSize: 'clamp(2rem,4vw,5rem)', letterSpacing: '-0.025em', lineHeight: '1.0' }}>
                      {album.title}
                    </h2>
                  </Link>
                  <p className="tag-flora text-neutral-mid/50 mb-8">{formatDate(album.releaseDate)}</p>
                  {album.description && (
                    <p className="font-body text-neutral-mid leading-relaxed mb-10">{album.description}</p>
                  )}
                  {album.tracks?.slice(0,5).map((t: any, ti: number) => (
                    <Link key={t.id} href={`/letras/${t.slug}`}
                      className="group/t flex justify-between py-3 border-b border-forest-deep/6 hover:border-terra-dark/20 transition-colors">
                      <div className="flex gap-4 items-center">
                        <span className="font-body text-[0.6rem] text-neutral-mid/40 w-4">{ti+1}</span>
                        <span className="font-body text-sm text-neutral-mid group-hover/t:text-forest-deep transition-colors">{t.title}</span>
                      </div>
                      <span className="font-body text-[0.7rem] text-neutral-mid/35">{t.duration}</span>
                    </Link>
                  ))}
                  {album.streamingLinks && (
                    <div className="flex gap-3 mt-8 flex-wrap">
                      {Object.entries(album.streamingLinks).map(([pl, url]) => (
                        <a key={pl} href={url as string} target="_blank" rel="noopener noreferrer"
                          className="px-4 py-2 border border-forest-deep/12 text-[0.65rem] font-body text-neutral-mid capitalize hover:border-terra-dark/30 hover:text-terra-dark transition-all duration-300">
                          {pl}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
          {!albums.length && (
            <p className="font-display text-3xl text-forest-deep/25 text-center">Em breve.</p>
          )}
        </div>
      </section>
    </>
  )
}
