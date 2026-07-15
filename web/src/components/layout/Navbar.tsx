'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import CartButton from '@/components/loja/CartButton'

const links = [
  { href: '/sobre',   label: 'Sobre' },
  { href: '/musica',  label: 'Música' },
  { href: '/letras',  label: 'Letras' },
  { href: '/videos',  label: 'Vídeos' },
  { href: '/agenda',  label: 'Agenda' },
  { href: '/loja',    label: 'Loja' },
  { href: '/blog',    label: 'Blog' },
  { href: '/contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={cn('navbar', scrolled && 'scrolled')}>
        <div className="container-flora flex items-center justify-between">
          <Link href="/" className={cn(
            'nav-logo font-display text-2xl tracking-wider transition-colors duration-500',
            scrolled ? 'text-forest-deep' : 'text-neutral-cream'
          )}>
            Flora Eça
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {links.map(({ href, label }) => (
              <Link key={href} href={href}
                className={cn(
                  'nav-link text-xs font-body font-medium tracking-[0.18em] uppercase transition-all duration-500 relative group',
                  scrolled ? 'text-forest-moss hover:text-forest-deep' : 'text-neutral-cream/70 hover:text-neutral-cream'
                )}>
                {label}
                <span className={cn(
                  'absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-500 group-hover:w-full',
                  scrolled ? 'bg-terra-dark' : 'bg-neutral-cream/40'
                )} />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <CartButton light={scrolled} />
            <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 px-5 py-2.5 border text-xs font-body font-medium tracking-[0.15em] uppercase transition-all duration-500',
                scrolled
                  ? 'border-forest-deep/20 text-forest-deep hover:bg-forest-deep hover:text-neutral-cream'
                  : 'border-neutral-cream/30 text-neutral-cream hover:bg-neutral-cream/10'
              )}>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Ouvir
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <CartButton light={scrolled} />
            <button onClick={() => setOpen(!open)} aria-label="Menu"
              className={cn('flex flex-col gap-1.5 p-2 transition-colors duration-300',
                scrolled ? 'text-forest-deep' : 'text-neutral-cream')}>
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-current origin-center" />
              <motion.span animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.2 }}
                className="block w-6 h-px bg-current" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} transition={{ duration: 0.3 }}
                className="block w-6 h-px bg-current origin-center" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-forest-deep z-[998] flex flex-col items-center justify-center">
            <nav className="flex flex-col items-center gap-2">
              {links.map(({ href, label }, i) => (
                <motion.div key={href}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16,1,0.3,1] }}>
                  <Link href={href} onClick={() => setOpen(false)}
                    className="block font-display text-5xl md:text-7xl text-neutral-cream/80 hover:text-neutral-cream transition-colors duration-300 py-2 text-center">
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="absolute bottom-12 flex gap-8">
              {['Instagram','Spotify','YouTube','TikTok'].map(s => (
                <a key={s} href="#" className="text-xs font-body tracking-[0.15em] uppercase text-neutral-cream/40 hover:text-neutral-cream/80 transition-colors">
                  {s}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
