import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { formatPrice } from '@/lib/utils'
import { fetchApi } from '@/lib/fetch-api'
import type { Product } from '@/types'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Loja', description: 'Vinis, camisetas, pôsteres e produtos artesanais de Flora.' }

export default async function LojaPage() {
  const products = await fetchApi<Product[]>('/loja/produtos?active=true', [])

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-deep text-flora-cream">
        <div className="container-flora">
          <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-3">Loja</p>
          <h1 className="font-display text-title text-flora-cream mb-3">Arte para levar</h1>
          <p className="font-body text-flora-cream/45 max-w-lg">Objetos que carregam a energia da música. Cada peça feita com cuidado.</p>
        </div>
      </div>
      <section className="section-padding bg-flora-offwhite">
        <div className="container-flora grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.06}>
              <Link href={`/loja/${product.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-flora-moss/10">
                  {product.images?.[0]
                    ? <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px)50vw,(max-width:1024px)33vw,25vw"/>
                    : <div className="w-full h-full flex items-center justify-center"><span className="font-display text-5xl text-flora-moss/20">F</span></div>}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-flora-deep/60 flex items-center justify-center">
                      <span className="font-body text-sm text-flora-cream/75">Esgotado</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] font-body text-flora-moss mb-1 uppercase tracking-wide">{product.category}</p>
                <h2 className="font-body font-medium text-flora-deep group-hover:text-flora-copper transition-colors text-sm mb-1">{product.name}</h2>
                <p className="font-display text-lg text-flora-deep">{formatPrice(product.price)}</p>
              </Link>
            </AnimatedSection>
          ))}
          {products.length === 0 && (
            <p className="font-display text-2xl text-flora-deep/30 col-span-4">Produtos em breve.</p>
          )}
        </div>
      </section>
    </>
  )
}
