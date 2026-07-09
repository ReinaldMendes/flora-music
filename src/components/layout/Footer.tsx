import Link from 'next/link'

const socialLinks = [
  { href: 'https://instagram.com/flora.musica',  label: 'Instagram' },
  { href: 'https://open.spotify.com',            label: 'Spotify' },
  { href: 'https://youtube.com/@floramusica',    label: 'YouTube' },
  { href: 'https://tiktok.com/@floramusica',     label: 'TikTok' },
]

const pageLinks = [
  { href: '/sobre',       label: 'Sobre' },
  { href: '/musica',      label: 'Música' },
  { href: '/letras',      label: 'Letras' },
  { href: '/agenda',      label: 'Agenda' },
  { href: '/loja',        label: 'Loja' },
  { href: '/blog',        label: 'Blog' },
  { href: '/contato',     label: 'Contato' },
]

export default function Footer() {
  return (
    <footer className="bg-flora-deep text-flora-cream/70">
      <div className="container-flora py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div>
            <p className="font-display text-5xl text-flora-cream mb-4">Flora</p>
            <p className="text-sm font-body leading-relaxed text-flora-cream/50">
              Cantora e compositora brasileira.<br />
              Música que vive entre a natureza,<br />
              a espiritualidade e o silêncio.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="text-xs font-body font-medium tracking-widest uppercase text-flora-cream/30 mb-6">Páginas</p>
            <nav className="flex flex-col gap-3">
              {pageLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="text-sm font-body text-flora-cream/60 hover:text-flora-cream transition-colors hover-underline-flora">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-body font-medium tracking-widest uppercase text-flora-cream/30 mb-6">Redes sociais</p>
            <nav className="flex flex-col gap-3">
              {socialLinks.map(({ href, label }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-body text-flora-cream/60 hover:text-flora-cream transition-colors hover-underline-flora">
                  {label}
                </a>
              ))}
            </nav>
            <div className="mt-8">
              <p className="text-xs font-body text-flora-cream/30 mb-3">Assine a newsletter</p>
              <Link href="#newsletter" className="inline-block px-5 py-2.5 border border-flora-cream/20 text-xs font-body text-flora-cream/60 rounded hover:border-flora-cream/50 hover:text-flora-cream transition-all duration-300">
                Quero receber novidades
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-flora-cream/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-flora-cream/25">
            © {new Date().getFullYear()} Flora. Todos os direitos reservados.
          </p>
          <p className="text-xs font-body text-flora-cream/25">
            Feito com cuidado e poesia.
          </p>
        </div>
      </div>
    </footer>
  )
}
