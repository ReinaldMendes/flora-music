import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-flora-deep text-flora-cream/70">
      <div className="container-flora py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p className="font-display text-5xl text-flora-cream mb-4">Flora</p>
            <p className="text-sm font-body leading-relaxed text-flora-cream/50">Cantora e compositora brasileira.<br/>Música que vive entre a natureza,<br/>a espiritualidade e o silêncio.</p>
          </div>
          <div>
            <p className="text-xs font-body font-medium tracking-widest uppercase text-flora-cream/30 mb-6">Páginas</p>
            <nav className="flex flex-col gap-3">
              {[['/', 'Home'], ['/sobre', 'Sobre'], ['/musica', 'Música'], ['/letras', 'Letras'], ['/agenda', 'Agenda'], ['/loja', 'Loja'], ['/blog', 'Blog'], ['/contato', 'Contato']].map(([href, label]) => (
                <Link key={href} href={href} className="text-sm font-body text-flora-cream/55 hover:text-flora-cream transition-colors underline-flora">{label}</Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-xs font-body font-medium tracking-widest uppercase text-flora-cream/30 mb-6">Redes sociais</p>
            <nav className="flex flex-col gap-3">
              {[['https://instagram.com/flora.musica', 'Instagram'], ['https://open.spotify.com', 'Spotify'], ['https://youtube.com/@floramusica', 'YouTube'], ['https://tiktok.com/@floramusica', 'TikTok']].map(([href, label]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-body text-flora-cream/55 hover:text-flora-cream transition-colors underline-flora">{label}</a>
              ))}
            </nav>
          </div>
        </div>
        <div className="border-t border-flora-cream/10 mt-16 pt-8 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs font-body text-flora-cream/25">© {new Date().getFullYear()} Flora. Todos os direitos reservados.</p>
          <p className="text-xs font-body text-flora-cream/25">Feito com cuidado e poesia.</p>
        </div>
      </div>
    </footer>
  )
}
