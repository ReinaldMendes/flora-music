import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen bg-flora-offwhite flex flex-col items-center justify-center text-center px-6">
      <p className="font-display text-[120px] leading-none text-flora-moss/20 select-none">404</p>
      <h1 className="font-display text-4xl text-flora-deep mb-4">Página não encontrada</h1>
      <p className="font-body text-flora-forest/60 mb-10">Talvez esta página tenha se perdido na floresta.</p>
      <Link href="/" className="px-8 py-4 bg-flora-deep text-flora-cream font-body text-sm rounded hover:bg-flora-forest transition-colors">Voltar para o início</Link>
    </div>
  )
}
