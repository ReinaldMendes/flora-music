'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Reveal from '@/components/animations/Reveal'

export default function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y       = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60])

  return (
    <section ref={ref} className="relative py-40 md:py-56 overflow-hidden bg-neutral-cream">
      {/* Fundo com textura sutil */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(39,43,0,0.5) 40px, rgba(39,43,0,0.5) 41px)' }}
      />

      <div className="container-flora relative z-10">
        <motion.div style={{ opacity, y }} className="max-w-4xl mx-auto text-center">
          <Reveal direction="fade">
            <p className="font-body text-[0.6rem] tracking-[0.3em] uppercase text-forest-sage/60 mb-10">
              — Flora Eça
            </p>
          </Reveal>

          <blockquote>
            <Reveal direction="scale" delay={0.1}>
              <p className="font-display text-forest-deep leading-[1.15]"
                style={{ fontSize: 'clamp(2rem,5vw,5.5rem)', letterSpacing: '-0.025em' }}>
                &ldquo;Não entoo músicas.
              </p>
            </Reveal>
            <Reveal direction="scale" delay={0.25}>
              <p className="font-display text-forest-moss leading-[1.15]"
                style={{ fontSize: 'clamp(2rem,5vw,5.5rem)', letterSpacing: '-0.025em', fontStyle: 'italic' }}>
                Planto experiências.&rdquo;
              </p>
            </Reveal>
          </blockquote>
        </motion.div>
      </div>

      {/* Folha decorativa SVG */}
      <Reveal direction="fade" delay={0.5}>
        <div className="absolute bottom-12 right-16 opacity-5 pointer-events-none hidden lg:block">
          <svg width="200" height="280" viewBox="0 0 200 280" fill="none">
            <path d="M100 10 C160 10 190 60 185 130 C180 200 140 260 100 270 C60 260 20 200 15 130 C10 60 40 10 100 10Z"
              fill="#272B00"/>
            <path d="M100 10 L100 270" stroke="#272B00" strokeWidth="1" opacity="0.5"/>
            <path d="M40 80 Q100 60 160 80" stroke="#272B00" strokeWidth="0.5" opacity="0.4" fill="none"/>
            <path d="M25 130 Q100 110 175 130" stroke="#272B00" strokeWidth="0.5" opacity="0.4" fill="none"/>
            <path d="M35 180 Q100 160 165 180" stroke="#272B00" strokeWidth="0.5" opacity="0.4" fill="none"/>
          </svg>
        </div>
      </Reveal>
    </section>
  )
}
