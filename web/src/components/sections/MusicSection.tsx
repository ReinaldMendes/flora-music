'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import { formatDate } from '@/lib/utils'

interface Album {
  id: string; title: string; slug: string; releaseDate: string
  coverUrl: string; description?: string; type: string
  streamingLinks?: Record<string,string>
  tracks?: { id:string; title:string; duration?:string }[]
}

export default function MusicSection({ albums }: { albums: Album[] }) {
  const [hovered, setHovered] = useState<string|null>(null)

  // Álbum featured = mais recente
  const featured = albums[0]
  const rest = albums.slice(1, 4)

  if (!albums.length) return null

  const streamingIcons: Record<string,string> = {
    spotify: '♫',
    youtube: '▶',
    deezer: '≋',
    apple: '',
  }

  return (
    <section className="section-flora section-dark relative overflow-hidden">

      {/* Linha decorativa horizontal */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-forest-sage/20 to-transparent" />

      <div className="container-flora">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-24 gap-6">
          <div>
            <Reveal direction="right">
              <span className="tag-flora text-forest-sage/60 block mb-4">Discografia</span>
            </Reveal>
            <TextReveal text="A música de Flora" className="font-display text-neutral-cream leading-none"
              as="h2" delay={0.05}
              style={{ fontSize: 'clamp(2.5rem,6vw,7rem)', letterSpacing: '-0.025em' } as any}
            />
          </div>
          <Reveal direction="left" delay={0.2}>
            <Link href="/musica"
              className="inline-flex items-center gap-2 text-[0.7rem] font-body tracking-[0.15em] uppercase text-neutral-cream/40 hover:text-neutral-cream/80 transition-colors duration-300 group">
              Ver tudo
              <motion.span className="inline-block" whileHover={{ x: 4 }}>→</motion.span>
            </Link>
          </Reveal>
        </div>

        {/* Album principal (featured) */}
        {featured && (
          <Reveal direction="up" delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 pb-20 border-b border-neutral-cream/5">
              {/* Capa */}
              <Link href={`/musica/${featured.slug}`}
                className="block group relative aspect-square overflow-hidden"
                onMouseEnter={() => setHovered(featured.id)}
                onMouseLeave={() => setHovered(null)}>
                <Image src={featured.coverUrl || '/images/album-placeholder.jpg'}
                  alt={featured.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width:1024px)100vw,50vw"/>
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-forest-deep/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: hovered===featured.id ? 1:0, y: hovered===featured.id ? 0:20 }}
                  className="absolute bottom-6 left-6 right-6">
                  <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-neutral-cream/60 mb-2">Mais recente</p>
                  <p className="font-display text-3xl text-neutral-cream">{featured.title}</p>
                </motion.div>
              </Link>

              {/* Info */}
              <div className="flex flex-col justify-center lg:pl-8">
                <p className="tag-flora text-terra-natural mb-4">{featured.type}</p>
                <h3 className="font-display text-neutral-cream mb-3 leading-none"
                  style={{ fontSize: 'clamp(2rem,4vw,4.5rem)', letterSpacing: '-0.02em' }}>
                  {featured.title}
                </h3>
                <p className="font-body text-[0.7rem] text-neutral-cream/35 tracking-[0.15em] mb-8">
                  {formatDate(featured.releaseDate)}
                </p>
                {featured.description && (
                  <p className="font-body text-neutral-cream/55 leading-relaxed mb-10" style={{ fontSize: '1rem' }}>
                    {featured.description}
                  </p>
                )}

                {/* Tracklist preview */}
                {featured.tracks && featured.tracks.length > 0 && (
                  <div className="mb-10 space-y-0">
                    {featured.tracks.slice(0,5).map((track, i) => (
                      <div key={track.id}
                        className="flex items-center justify-between py-3 border-b border-neutral-cream/5 group/track hover:border-neutral-cream/15 transition-colors">
                        <div className="flex items-center gap-4">
                          <span className="font-body text-[0.6rem] text-neutral-cream/25 w-4">{String(i+1).padStart(2,'0')}</span>
                          <span className="font-body text-sm text-neutral-cream/60 group-hover/track:text-neutral-cream/90 transition-colors">
                            {track.title}
                          </span>
                        </div>
                        <span className="font-body text-[0.7rem] text-neutral-cream/25">{track.duration}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Streaming links */}
                <div className="flex flex-wrap gap-3">
                  {Object.entries(featured.streamingLinks || { spotify:'#', youtube:'#' }).map(([pl, url]) => (
                    <a key={pl} href={url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 border border-neutral-cream/10 text-neutral-cream/50 hover:border-neutral-cream/30 hover:text-neutral-cream transition-all duration-300"
                      style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'capitalize' }}>
                      <span>{streamingIcons[pl] || '♪'}</span>
                      {pl}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Grid outros álbuns */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((album, i) => (
              <Reveal key={album.id} direction="up" delay={0.1 * i}>
                <Link href={`/musica/${album.slug}`} className="group block"
                  onMouseEnter={() => setHovered(album.id)}
                  onMouseLeave={() => setHovered(null)}>
                  <div className="relative aspect-square overflow-hidden mb-4">
                    <Image src={album.coverUrl || '/images/album-placeholder.jpg'}
                      alt={album.title} fill className="object-cover transition-transform duration-800 group-hover:scale-105"
                      sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"/>
                    <div className="album-card-overlay" />
                  </div>
                  <div>
                    <p className="tag-flora text-forest-sage/50 mb-2">{album.type}</p>
                    <h4 className="font-display text-2xl text-neutral-cream/80 group-hover:text-neutral-cream transition-colors duration-300 mb-1"
                      style={{ letterSpacing: '-0.01em' }}>
                      {album.title}
                    </h4>
                    <p className="font-body text-[0.7rem] text-neutral-cream/30">
                      {formatDate(album.releaseDate)}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* Linha bottom */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-forest-sage/20 to-transparent" />
    </section>
  )
}
