import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import AddToCartButton from '@/components/loja/AddToCartButton'
import { formatPrice } from '@/lib/utils'

interface Props { params: { slug: string } }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const p = await prisma.product.findUnique({ where: { slug: params.slug } })
    if (!p) return { title: 'Produto não encontrado' }
    return { title: p.name, description: p.description || p.name }
  } catch {
    return { title: 'Produto', description: 'Produto de Flora' }
  }
}

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({ where: { active: true }, select: { slug: true } })
    return products.map(p => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export const revalidate = 1800

export default async function ProdutoPage({ params }: Props) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug, active: true } })
  if (!product) notFound()
  const images = product.images as string[]

  return (
    <Section className="bg-flora-offwhite pt-32">
      <Link href="/loja" className="text-xs font-body text-flora-moss hover:text-flora-deep transition-colors hover-underline-flora mb-10 block">← Loja</Link>
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <AnimatedText>
          <div className="relative aspect-square overflow-hidden rounded bg-flora-moss/10">
            {images[0] ? (
              <Image src={images[0]} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display text-8xl text-flora-moss/20">F</span>
              </div>
            )}
          </div>
        </AnimatedText>

        <AnimatedText delay={0.2} className="sticky top-24">
          <p className="text-xs font-body text-flora-moss uppercase tracking-widest mb-4">{product.category}</p>
          <h1 className="font-display text-h1 text-flora-deep mb-4">{product.name}</h1>
          <p className="font-display text-3xl text-flora-copper mb-8">{formatPrice(product.price)}</p>
          {product.description && (
            <p className="font-body text-flora-forest/70 leading-relaxed mb-8">{product.description}</p>
          )}
          {product.stock > 0 ? (
            <AddToCartButton product={{ id: product.id, name: product.name, slug: product.slug, price: product.price, images, category: product.category, stock: product.stock, description: product.description, featured: product.featured, active: product.active }} />
          ) : (
            <div className="px-6 py-4 bg-flora-moss/10 text-flora-forest/60 text-sm font-body rounded text-center">
              Produto esgotado — em breve reporemos o estoque
            </div>
          )}
          <p className="mt-6 text-xs font-body text-flora-moss/50">
            {product.stock} {product.stock === 1 ? 'unidade disponível' : 'unidades disponíveis'}
          </p>
        </AnimatedText>
      </div>
    </Section>
  )
}
