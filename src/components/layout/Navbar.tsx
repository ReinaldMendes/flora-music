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
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-flora-offwhite/95 backdrop-blur-md border-b border-flora-moss/10'
            : 'bg-transparent'
        )}
      >
        <div className="container-flora flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl md:text-3xl text-flora-deep tracking-wide hover:opacity-70 transition-opacity">
            Flora
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-body text-flora-forest hover:text-flora-deep hover-underline-flora transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Spotify CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-flora-moss/40 rounded text-xs font-body text-flora-forest hover:bg-flora-deep hover:text-flora-cream hover:border-flora-deep transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Ouça no Spotify
            </Link>
            <CartButton />
          </div>

          <div className="md:hidden flex items-center gap-1">
            <CartButton />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden p-2 text-flora-deep"
          >
            <span className={cn('block w-6 h-0.5 bg-current transition-all duration-300 mb-1.5', open && 'rotate-45 translate-y-2')} />
            <span className={cn('block w-6 h-0.5 bg-current transition-all duration-300 mb-1.5', open && 'opacity-0')} />
            <span className={cn('block w-6 h-0.5 bg-current transition-all duration-300', open && '-rotate-45 -translate-y-2')} />
          </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-flora-offwhite pt-20 flex flex-col"
          >
            <nav className="container-flora flex flex-col gap-2 pt-6">
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl text-flora-deep border-b border-flora-moss/10 hover:text-flora-copper transition-colors"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
                <Link
                  href="https://open.spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-flora-deep text-flora-cream text-sm font-body rounded"
                >
                  Ouça no Spotify
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
