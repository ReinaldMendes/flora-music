import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { fetchApi } from '@/lib/fetch-api'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import { formatPrice } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Loja', description: 'Produtos e merch de Flora Eça.' }

export default async function LojaPage() {
  const products = await fetchApi<any[]>('/loja/produtos?active=true', [])
  return (
    <>
      <div className="pt-40 pb-20 section-dark">
        <div className="container-flora">
          <Reveal><span className="tag-flora text-forest-sage/60 block mb-6">Loja</span></Reveal>
          <TextReveal text="Arte para levar." as="h1" className="font-display text-neutral-cream"
            style={{ fontSize: 'clamp(3rem,9vw,10rem)', letterSpacing: '-0.035em', lineHeight: '0.92' } as any}/>
        </div>
      </div>
      <section className="section-flora section-cream">
        <div className="container-flora grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, i) => (
            <Reveal key={product.id} direction="up" delay={i*0.06}>
              <Link href={`/loja/${product.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden mb-4 bg-forest-sage/8">
                  {product.images?.[0]
                    ? <Image src={product.images[0]} alt={product.name} fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width:640px)50vw,(max-width:1024px)33vw,25vw"/>
                    : <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-6xl text-forest-sage/20">F</span>
                      </div>
                  }
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-neutral-cream/80 flex items-center justify-center">
                      <span className="tag-flora text-neutral-mid/50">Esgotado</span>
                    </div>
                  )}
                </div>
                <span className="tag-flora text-forest-moss/50 block mb-1.5">{product.category}</span>
                <h3 className="font-body font-medium text-forest-deep group-hover:text-terra-dark transition-colors duration-300 text-sm mb-1">
                  {product.name}
                </h3>
                <p className="font-display text-xl text-forest-deep" style={{ letterSpacing: '-0.01em' }}>
                  {formatPrice(product.price)}
                </p>
              </Link>
            </Reveal>
          ))}
          {!products.length && <p className="font-display text-2xl text-forest-deep/25 col-span-4">Produtos em breve.</p>}
        </div>
      </section>
    </>
  )
}
