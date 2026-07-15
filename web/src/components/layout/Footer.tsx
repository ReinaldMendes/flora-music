import Link from 'next/link'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/flora.musica' },
  { label: 'Spotify',   href: 'https://open.spotify.com' },
  { label: 'YouTube',   href: 'https://youtube.com/@floramusica' },
  { label: 'TikTok',   href: 'https://tiktok.com/@floramusica' },
]

const columns = [
  { title: 'Música',  links: [['Álbuns','/musica'],['Letras','/letras'],['Vídeos','/videos']] },
  { title: 'Artista', links: [['Sobre','/sobre'],['Agenda','/agenda'],['Blog','/blog']] },
  { title: 'Mais',    links: [['Loja','/loja'],['Contato','/contato']] },
]

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-neutral-cream/60 section-flora">
      <div className="container-flora">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-6xl text-neutral-cream block mb-6 hover:text-forest-sage transition-colors duration-500">
              Flora Eça
            </Link>
            <p className="font-body text-sm leading-relaxed text-neutral-cream/50 max-w-xs mb-8">
              Cantora e compositora brasileira.<br/>
              Canções que atravessam o tempo.
            </p>
            <div className="flex gap-6">
              {socials.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-[0.6rem] font-body tracking-[0.18em] uppercase text-neutral-cream/35 hover:text-neutral-cream/80 transition-colors duration-300">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {columns.map(col => (
            <div key={col.title}>
              <p className="text-[0.6rem] font-body tracking-[0.2em] uppercase text-forest-sage mb-6">{col.title}</p>
              <nav className="flex flex-col gap-3">
                {col.links.map(([label, href]) => (
                  <Link key={href} href={href}
                    className="text-sm font-body text-neutral-cream/45 hover:text-neutral-cream/80 transition-colors duration-300 hover:translate-x-1 inline-block">
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}

          {/* Contato */}
          <div>
            <p className="text-[0.6rem] font-body tracking-[0.2em] uppercase text-forest-sage mb-6">Contato</p>
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-[0.65rem] font-body text-neutral-cream/30 uppercase tracking-wider mb-1">Shows</p>
                <a href="mailto:alinefpimentel@gmail.com" className="text-sm font-body text-neutral-cream/50 hover:text-neutral-cream/80 transition-colors">
                  alinefpimentel@gmail.com
                </a>
              </div>
              <div>
                <p className="text-[0.65rem] font-body text-neutral-cream/30 uppercase tracking-wider mb-1">Pessoal</p>
                <a href="mailto:floramusicacontato@gmail.com" className="text-sm font-body text-neutral-cream/50 hover:text-neutral-cream/80 transition-colors">
                  floramusicacontato@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-neutral-cream/8 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.65rem] font-body text-neutral-cream/25">
            © {new Date().getFullYear()} Flora Eça. Todos os direitos reservados.
          </p>
          <p className="text-[0.65rem] font-body text-neutral-cream/20 tracking-wider">
            Feita com poesia e cuidado.
          </p>
        </div>
      </div>
    </footer>
  )
}
