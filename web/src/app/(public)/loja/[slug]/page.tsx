import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import AddToCartButton from '@/components/loja/AddToCartButton'
import { formatPrice } from '@/lib/utils'
interface Props { params: { slug: string } }
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try { const p = await fetch(`${API}/loja/produtos/${params.slug}`).then(r => r.json()); return { title: p.name, description: p.description || p.name } }
  catch { return { title: 'Produto' } }
}
export default async function ProdutoPage({ params }: Props) {
  let product: any
  try { product = await fetch(`${API}/loja/produtos/${params.slug}`, { next: { revalidate: 1800 } }).then(r => r.json()) }
  catch { notFound() }
  if (!product || product.error) notFound()
  return (
    <section className="section-padding bg-flora-offwhite pt-32">
      <div className="container-flora">
        <Link href="/loja" className="text-xs font-body text-flora-moss hover:text-flora-deep transition-colors underline-flora mb-10 block">← Loja</Link>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <AnimatedSection>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-flora-moss/10">
              {product.images?.[0]
                ? <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="(max-width:768px)100vw,50vw" priority/>
                : <div className="w-full h-full flex items-center justify-center"><span className="font-display text-8xl text-flora-moss/20">F</span></div>}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="sticky top-24">
            <p className="text-[10px] font-body text-flora-moss uppercase tracking-widest mb-3">{product.category}</p>
            <h1 className="font-display text-h1 text-flora-deep mb-4">{product.name}</h1>
            <p className="font-display text-3xl text-flora-copper mb-8">{formatPrice(product.price)}</p>
            {product.description && <p className="font-body text-flora-forest/65 leading-relaxed mb-8">{product.description}</p>}
            {product.stock > 0
              ? <AddToCartButton product={product} />
              : <div className="px-6 py-4 bg-flora-moss/10 text-flora-forest/55 text-sm font-body rounded text-center">Produto esgotado — em breve reporemos o estoque</div>}
            <p className="mt-4 text-xs font-body text-flora-moss/45">{product.stock} {product.stock === 1 ? 'unidade disponível' : 'unidades disponíveis'}</p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}