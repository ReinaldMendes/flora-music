'use client'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import Parallax from '@/components/animations/Parallax'

const bio = [
  { label: '001', text: 'Flora Eça nasceu entre a floresta e a canção. Sua música vive no espaço entre a natureza e o silêncio — onde palavras se tornam raízes e melodias se tornam vento.' },
  { label: '002', text: 'Compositora de alma poética e voz contemplativa, Flora escreve sobre o que atravessa: o amor, a espiritualidade, a cura, a ancestralidade que habita cada ser.' },
  { label: '003', text: 'Cada canção é uma floresta inteira. Cada letra, uma folha que cai com intenção. Uma artista que não entoa músicas — ela planta experiências.' },
]

const facts = [
  { number: '2021', label: 'Primeiro lançamento' },
  { number: '50k+', label: 'Ouvintes mensais' },
  { number: '3',    label: 'Álbuns lançados' },
  { number: '∞',    label: 'Histórias para contar' },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const xText = useTransform(scrollYProgress, [0,1], ['-4%', '4%'])

  return (
    <section ref={sectionRef} className="section-flora section-cream relative overflow-hidden">

      {/* Texto decorativo em movimento no fundo */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none opacity-[0.03]"
        style={{ x: xText }}>
        <span className="font-display text-[20vw] text-forest-deep leading-none">
          FLORA EÇA FLORA EÇA FLORA EÇA
        </span>
      </motion.div>

      <div className="container-flora relative z-10">

        {/* Header da seção */}
        <div className="flex items-start justify-between mb-20 md:mb-28">
          <Reveal direction="right">
            <span className="tag-flora text-forest-moss">Sobre a artista</span>
          </Reveal>
          <Reveal direction="left">
            <span className="font-body text-[0.65rem] text-neutral-mid tracking-[0.15em]">
              — 001
            </span>
          </Reveal>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Coluna esquerda — foto */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="scale" delay={0.1}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/flora-portrait.jpg"
                  alt="Flora Eça"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width:1024px) 100vw, 42vw"
                />
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/20 via-transparent to-transparent" />

                {/* Tag flutuante */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute bottom-6 left-6 glass-flora px-4 py-3"
                >
                  <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-neutral-cream/70 mb-1">
                    Cantora & Compositora
                  </p>
                  <p className="font-display text-xl text-neutral-cream">
                    Flora Eça
                  </p>
                </motion.div>
              </div>
            </Reveal>

            {/* Decoração lateral */}
            <Reveal direction="fade" delay={0.4}>
              <div className="absolute -right-6 top-1/3 hidden lg:flex flex-col items-center gap-3">
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-forest-sage/40 to-transparent" />
                <span className="font-body text-[0.6rem] tracking-[0.2em] uppercase text-neutral-mid"
                  style={{ writingMode: 'vertical-rl' }}>
                  Fotografia · Natureza
                </span>
              </div>
            </Reveal>
          </div>

          {/* Coluna direita — texto */}
          <div className="lg:col-span-7 lg:pt-12">

            {/* Título grande */}
            <div className="mb-16">
              <TextReveal
                text="Música que"
                className="font-display text-forest-deep leading-none mb-2"
                style={{ fontSize: 'clamp(2.5rem,5vw,6rem)', letterSpacing: '-0.025em' } as any}
                delay={0.1}
              />
              <TextReveal
                text="nasce da"
                className="font-display text-forest-deep leading-none mb-2"
                style={{ fontSize: 'clamp(2.5rem,5vw,6rem)', letterSpacing: '-0.025em', fontStyle: 'italic' } as any}
                delay={0.2}
              />
              <TextReveal
                text="floresta."
                className="font-display text-terra-dark leading-none"
                style={{ fontSize: 'clamp(2.5rem,5vw,6rem)', letterSpacing: '-0.025em' } as any}
                delay={0.3}
              />
            </div>

            {/* Bio em parágrafos numerados */}
            <div className="space-y-10 mb-16">
              {bio.map((item, i) => (
                <Reveal key={item.label} direction="up" delay={0.1 * i}>
                  <div className="flex gap-6 group">
                    <span className="font-body text-[0.6rem] text-neutral-mid/50 mt-1.5 flex-shrink-0 tracking-wider">
                      {item.label}
                    </span>
                    <p className="font-body text-neutral-mid leading-relaxed" style={{ fontSize: '1.0625rem' }}>
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <Reveal direction="up" delay={0.3}>
              <a href="/sobre"
                className="btn-flora-light btn-flora inline-flex">
                <span>Conheça mais</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </Reveal>
          </div>
        </div>

        {/* Números / fatos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 md:mt-32 pt-12 border-t border-forest-deep/8">
          {facts.map((fact, i) => (
            <Reveal key={fact.label} direction="up" delay={0.1 * i}>
              <div className="text-center md:text-left">
                <p className="font-display text-5xl md:text-6xl text-forest-deep mb-2 leading-none"
                  style={{ letterSpacing: '-0.02em' }}>
                  {fact.number}
                </p>
                <p className="font-body text-sm text-neutral-mid">{fact.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
