import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
export default function PedidoSucessoPage() {
  return (
    <section className="section-padding bg-flora-offwhite pt-32 min-h-[70vh] flex items-center">
      <div className="container-flora text-center max-w-lg mx-auto">
        <AnimatedSection>
          <p className="font-display text-6xl mb-6">🌿</p>
          <h1 className="font-display text-title text-flora-deep mb-4">Pedido confirmado</h1>
          <p className="font-body text-flora-forest/65 leading-relaxed mb-10">Obrigada por levar um pouco da nossa música com você. Você receberá um email com os detalhes do pedido e o acompanhamento do envio.</p>
          <Link href="/loja" className="inline-block px-8 py-4 bg-flora-deep text-flora-cream font-body text-sm rounded hover:bg-flora-forest transition-colors">Voltar para a loja</Link>
        </AnimatedSection>
      </div>
    </section>
  )
}