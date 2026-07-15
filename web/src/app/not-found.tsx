import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen section-dark flex flex-col items-center justify-center text-center px-6">
      <p className="font-display text-[20vw] leading-none text-forest-sage/8 select-none mb-0">404</p>
      <h1 className="font-display text-neutral-cream -mt-8 mb-6"
        style={{ fontSize: 'clamp(2rem,5vw,5rem)', letterSpacing: '-0.025em' }}>
        Página não encontrada
      </h1>
      <p className="font-body text-neutral-cream/40 mb-12">
        Talvez esta página tenha se perdido na floresta.
      </p>
      <Link href="/" className="btn-flora">
        <span>Voltar para o início</span>
      </Link>
    </div>
  )
}
