'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import { fetchApi } from '@/lib/fetch-api'
import { useCartStore } from '@/lib/cart-store'
import Reveal from '@/components/animations/Reveal'
import { formatPrice } from '@/lib/utils'

export default function ProdutoPage() {
  const { slug } = useParams() as { slug: string }
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => {
    fetchApi<any>(`/loja/produtos/${slug}`, null).then(p => {
      setProduct(p); setLoading(false)
    })
  }, [slug])

  if (loading) return (
    <div className="min-h-screen section-cream flex items-center justify-center">
      <p className="font-display text-3xl text-forest-deep/20 animate-pulse">Carregando...</p>
    </div>
  )
  if (!product || product.error) return (
    <div className="min-h-screen section-cream flex items-center justify-center">
      <p className="font-display text-3xl text-forest-deep/25">Produto não encontrado.</p>
    </div>
  )

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <section className="pt-36 pb-24 section-cream min-h-screen">
      <div className="container-flora">
        <Link href="/loja" className="tag-flora text-forest-moss/60 hover:text-terra-dark transition-colors block mb-12">
          ← Loja
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <Reveal direction="scale">
            <div className="relative aspect-square overflow-hidden bg-forest-sage/8">
              {product.images?.[0]
                ? <Image src={product.images[0]} alt={product.name} fill priority
                    className="object-cover" sizes="(max-width:1024px)100vw,50vw"/>
                : <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-9xl text-forest-sage/15">F</span>
                  </div>
              }
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15} className="lg:sticky lg:top-28">
            <span className="tag-flora text-forest-moss/55 block mb-4">{product.category}</span>
            <h1 className="font-display text-forest-deep mb-4"
              style={{ fontSize: 'clamp(2rem,5vw,5rem)', letterSpacing: '-0.025em', lineHeight: '1.0' }}>
              {product.name}
            </h1>
            <p className="font-display text-4xl text-terra-dark mb-8" style={{ letterSpacing: '-0.02em' }}>
              {formatPrice(product.price)}
            </p>
            {product.description && (
              <p className="font-body text-neutral-mid leading-relaxed mb-10 text-base">{product.description}</p>
            )}

            {product.stock > 0 ? (
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-forest-deep/15">
                    <button onClick={() => setQty(q => Math.max(1, q-1))}
                      className="w-12 h-12 flex items-center justify-center text-forest-deep hover:bg-forest-deep/5 transition-colors font-body text-lg">−</button>
                    <span className="w-10 text-center font-body text-sm">{qty}</span>
                    <button onClick={() => setQty(q => Math.min(product.stock, q+1))}
                      className="w-12 h-12 flex items-center justify-center text-forest-deep hover:bg-forest-deep/5 transition-colors font-body text-lg">+</button>
                  </div>
                  <button onClick={handleAdd}
                    className={`flex-1 py-4 font-body text-[0.7rem] tracking-[0.15em] uppercase transition-all duration-400 ${
                      added ? 'bg-forest-moss text-neutral-cream' : 'bg-forest-deep text-neutral-cream hover:bg-terra-dark'
                    }`}>
                    {added ? '✓ Adicionado' : 'Adicionar ao carrinho'}
                  </button>
                </div>
                <p className="font-body text-xs text-neutral-mid/45">
                  {product.stock} {product.stock === 1 ? 'unidade disponível' : 'unidades disponíveis'}
                </p>
              </div>
            ) : (
              <div className="py-4 px-6 bg-forest-sage/8 text-center">
                <p className="font-body text-sm text-neutral-mid/55">Produto esgotado — em breve reporemos o estoque</p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
