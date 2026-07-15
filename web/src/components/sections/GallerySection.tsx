'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import Link from 'next/link'

interface Photo { id:string; url:string; caption?:string; category?:string }

// Layout editorial masonry-like fixo
const LAYOUT = [
  { col:'col-span-12 md:col-span-7', aspect:'aspect-[4/3]' },
  { col:'col-span-12 md:col-span-5', aspect:'aspect-[3/4]' },
  { col:'col-span-12 md:col-span-5', aspect:'aspect-[3/4]' },
  { col:'col-span-12 md:col-span-7', aspect:'aspect-[16/9]' },
]

export default function GallerySection({ photos }: { photos: Photo[] }) {
  const items = photos.slice(0, 4)
  if (!items.length) return null

  return (
    <section className="section-flora section-cream">
      <div className="container-flora">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <Reveal><span className="tag-flora text-forest-moss/60 block mb-4">Galeria</span></Reveal>
            <TextReveal text="Imagens" as="h2"
              className="font-display text-forest-deep"
              style={{ fontSize: 'clamp(2.5rem,6vw,7rem)', letterSpacing: '-0.025em' } as any}/>
          </div>
          <Reveal delay={0.2}>
            <Link href="/sobre" className="text-[0.7rem] font-body tracking-[0.15em] uppercase text-forest-moss hover:text-forest-deep transition-colors">
              Ver galeria →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {items.map((photo, i) => {
            const layout = LAYOUT[i] || LAYOUT[0]
            return (
              <Reveal key={photo.id} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.1}
                className={layout.col}>
                <div className={`relative ${layout.aspect} overflow-hidden group`}>
                  <Image
                    src={photo.url}
                    alt={photo.caption || 'Flora Eça'}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width:768px)100vw,60vw"
                  />
                  {/* Overlay hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  {photo.caption && (
                    <motion.p
                      className="absolute bottom-4 left-4 font-body text-xs text-neutral-cream/80 tracking-wider"
                      initial={{ opacity: 0, y: 8 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {photo.caption}
                    </motion.p>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
