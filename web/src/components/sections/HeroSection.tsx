'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-flora-deep">
      <div className="absolute inset-0">
        <Image src="/images/hero-bg.jpg" alt="Flora" fill priority className="object-cover opacity-40" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-flora-deep/20 via-transparent to-flora-deep/90" />
      </div>

      {/* Folhas decorativas */}
      <motion.div animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-[8%] w-40 h-40 opacity-[0.07] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="#86895D"><ellipse cx="50" cy="50" rx="40" ry="65" transform="rotate(-20 50 50)"/></svg>
      </motion.div>
      <motion.div animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 left-[6%] w-24 h-24 opacity-[0.07] pointer-events-none">
        <svg viewBox="0 0 100 100" fill="#54582F"><ellipse cx="50" cy="50" rx="35" ry="55" transform="rotate(15 50 50)"/></svg>
      </motion.div>

      <div className="container-flora relative z-10 pb-16 md:pb-24">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-flora-moss text-xs font-body tracking-[0.22em] uppercase mb-6">Cantora · Compositora</motion.p>

        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-hero text-flora-cream text-balance mb-8 max-w-4xl">
          A música como<br/><em className="not-italic text-flora-moss">extensão da vida</em>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }}
          className="text-flora-cream/55 font-body text-lg md:text-xl max-w-lg leading-relaxed mb-12">
          Natureza. Silêncio. Espiritualidade.<br/>Canções que fazem a pessoa sentir.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9 }}
          className="flex flex-wrap gap-4">
          <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-4 bg-flora-cream text-flora-deep font-body text-sm font-medium rounded hover:bg-flora-moss hover:text-flora-cream transition-all duration-400">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            Ouça agora
          </a>
          <Link href="/agenda" className="inline-flex items-center gap-2 px-7 py-4 border border-flora-cream/30 text-flora-cream font-body text-sm rounded hover:bg-flora-cream/10 transition-all duration-300">Ver shows</Link>
          <Link href="/sobre" className="inline-flex items-center gap-2 px-7 py-4 text-flora-cream/55 font-body text-sm rounded hover:text-flora-cream transition-colors duration-300">Conheça a Flora →</Link>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] font-body text-flora-cream/30 tracking-widest uppercase">scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-flora-cream/30 to-transparent" />
      </motion.div>
    </section>
  )
}
