'use client'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded]   = useState(false)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax na imagem
  const imgY     = useTransform(scrollYProgress, [0,1], ['0%', '30%'])
  const opacity  = useTransform(scrollYProgress, [0,0.6], [1, 0])
  const scale    = useTransform(scrollYProgress, [0,1], [1, 1.08])

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setLoaded(true), 2800) // após intro
    return () => clearTimeout(t)
  }, [])

  // Partículas de luz
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 15 + (i * 7.5) % 85,
    y: 10 + (i * 11) % 80,
    size: 2 + (i % 3),
    delay: i * 0.3,
    duration: 4 + (i % 3) * 2,
  }))

  return (
    <section ref={containerRef} className="hero-section">
      {/* Imagem de fundo com parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: imgY, scale }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Flora Eça"
          fill
          priority
          quality={95}
          className="object-cover object-center"
          sizes="100vw"
          onLoad={() => {}}
        />
      </motion.div>

      {/* Gradiente cinematográfico multicamada */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-transparent to-forest-deep/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/30 via-transparent to-transparent" />
        {/* Vinheta nos cantos */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(39,43,0,0.5) 100%)' }} />
      </div>

      {/* Partículas de luz flutuando */}
      {mounted && particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-forest-sage/30 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            x: [0, 8, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Conteúdo principal */}
      <motion.div
        className="relative z-10 w-full container-flora pb-20 md:pb-28"
        style={{ opacity }}
      >
        <AnimatePresence>
          {loaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Tag superior */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16,1,0.3,1] }}
                className="flex items-center gap-4 mb-8"
              >
                <span className="w-8 h-px bg-forest-sage/60" />
                <span className="tag-flora text-forest-sage/80">Cantora · Compositora</span>
              </motion.div>

              {/* Título cinematográfico */}
              <div className="overflow-hidden mb-6">
                <motion.h1
                  initial={{ y: '105%', skewY: 3 }}
                  animate={{ y: '0%', skewY: 0 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16,1,0.3,1] }}
                  className="font-display text-neutral-cream leading-none"
                  style={{ fontSize: 'clamp(4rem, 12vw, 13rem)', letterSpacing: '-0.03em' }}
                >
                  Flora
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-10">
                <motion.h1
                  initial={{ y: '105%', skewY: 3 }}
                  animate={{ y: '0%', skewY: 0 }}
                  transition={{ duration: 1.2, delay: 0.35, ease: [0.16,1,0.3,1] }}
                  className="font-display text-neutral-cream/60 leading-none"
                  style={{ fontSize: 'clamp(2rem, 6vw, 7rem)', letterSpacing: '-0.02em', fontStyle: 'italic' }}
                >
                  Eça
                </motion.h1>
              </div>

              {/* Frase de impacto */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.16,1,0.3,1] }}
                className="font-body text-neutral-cream/55 text-lg md:text-xl max-w-sm leading-relaxed mb-12"
                style={{ fontWeight: 300, letterSpacing: '0.01em' }}
              >
                Canções que atravessam o tempo.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.9, ease: [0.16,1,0.3,1] }}
                className="flex flex-wrap gap-4 items-center"
              >
                <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"
                  className="btn-flora group">
                  <span className="flex items-center gap-3">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Ouvir agora
                  </span>
                </a>

                <a href="/agenda"
                  className="inline-flex items-center gap-2 text-[0.7rem] font-body font-medium tracking-[0.15em] uppercase text-neutral-cream/60 hover:text-neutral-cream transition-colors duration-300">
                  Ver agenda
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Indicador de scroll */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-center gap-3 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-12 bg-gradient-to-b from-neutral-cream/50 to-transparent"
          />
          <span className="tag-flora text-neutral-cream/35 vertical-text"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
            Scroll
          </span>
        </motion.div>
      )}
    </section>
  )
}
