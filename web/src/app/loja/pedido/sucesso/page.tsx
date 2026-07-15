import Link from 'next/link'
import Reveal from '@/components/animations/Reveal'
export default function PedidoSucessoPage() {
  return (
    <div className="min-h-screen section-cream flex items-center justify-center">
      <div className="container-flora max-w-lg text-center">
        <Reveal direction="scale">
          <p className="font-display text-8xl text-forest-sage/30 mb-6 leading-none">🌿</p>
          <h1 className="font-display text-forest-deep mb-4"
            style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', letterSpacing: '-0.025em' }}>
            Pedido confirmado
          </h1>
          <p className="font-body text-neutral-mid leading-relaxed mb-12 text-base">
            Obrigada por levar um pouco da nossa música com você.<br/>
            Você receberá um e-mail com os detalhes e o rastreamento do envio.
          </p>
          <Link href="/loja"
            className="inline-flex items-center gap-2 py-4 px-8 bg-forest-deep text-neutral-cream font-body text-[0.7rem] tracking-[0.15em] uppercase hover:bg-terra-dark transition-colors duration-400">
            Voltar para a loja
          </Link>
        </Reveal>
      </div>
    </div>
  )
}
