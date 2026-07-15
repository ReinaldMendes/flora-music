'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import Link from 'next/link'

interface Video { id:string; youtubeId:string; title:string; category?:string; featured:boolean }

export default function VideosSection({ videos }: { videos: Video[] }) {
  const [active, setActive] = useState<string|null>(null)
  if (!videos.length) return null

  return (
    <section className="section-flora section-dark relative overflow-hidden">
      <div className="container-flora">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <Reveal><span className="tag-flora text-forest-sage/60 block mb-4">Audiovisual</span></Reveal>
            <TextReveal text="Assista" as="h2"
              className="font-display text-neutral-cream"
              style={{ fontSize: 'clamp(2.5rem,8vw,8rem)', letterSpacing: '-0.03em' } as any}/>
          </div>
          <Reveal delay={0.2}>
            <Link href="/videos" className="text-[0.7rem] font-body tracking-[0.15em] uppercase text-neutral-cream/40 hover:text-neutral-cream/80 transition-colors">
              Ver todos →
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <Reveal key={video.id} direction="up" delay={i * 0.08}>
              <div
                className="group relative overflow-hidden cursor-pointer"
                onClick={() => setActive(video.id === active ? null : video.id)}
              >
                <AnimatePresence>
                  {active === video.id ? (
                    <motion.div
                      key="player"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="aspect-video bg-forest-deep">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </motion.div>
                  ) : (
                    <motion.div key="thumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="relative aspect-video bg-forest-deep overflow-hidden">
                        <img
                          src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
                        />
                        <div className="absolute inset-0 bg-forest-deep/30 group-hover:bg-forest-deep/10 transition-colors duration-500" />
                        {/* Botão play */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-14 h-14 rounded-full border border-neutral-cream/30 flex items-center justify-center glass-flora">
                            <svg className="w-5 h-5 text-neutral-cream ml-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4">
                  {video.category && <p className="tag-flora text-forest-sage/50 mb-2">{video.category}</p>}
                  <h4 className="font-body font-medium text-neutral-cream/70 group-hover:text-neutral-cream/95 transition-colors text-sm">
                    {video.title}
                  </h4>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
