'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { fetchApi } from '@/lib/fetch-api'
import { formatPrice } from '@/lib/utils'
import Reveal from '@/components/animations/Reveal'

const inputCls = "w-full px-0 py-3.5 bg-transparent border-0 border-b border-forest-deep/12 text-neutral-dark font-body text-sm placeholder:text-neutral-mid/35 focus:outline-none focus:border-terra-dark transition-colors duration-300"

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const [form, setForm] = useState({ name:'',email:'',phone:'',street:'',number:'',complement:'',neighborhood:'',city:'',state:'',zipCode:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const up = (k: string, v: string) => setForm(f => ({...f, [k]: v}))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const data = await fetchApi<any>('/loja/checkout', null, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.product.id, quantity: i.quantity })),
          customer: { name: form.name, email: form.email, phone: form.phone },
          shippingAddress: { street:form.street, number:form.number, complement:form.complement, neighborhood:form.neighborhood, city:form.city, state:form.state, zipCode:form.zipCode }
        })
      })
      if (data?.checkoutUrl) { clearCart(); window.location.href = data.checkoutUrl }
      else setError('Erro ao processar pedido.')
    } catch { setError('Algo deu errado. Tente novamente.') }
    finally { setLoading(false) }
  }

  if (!items.length) return (
    <div className="min-h-screen section-cream flex flex-col items-center justify-center gap-6">
      <p className="font-display text-3xl text-forest-deep/25">Carrinho vazio</p>
      <Link href="/loja" className="tag-flora text-terra-dark hover:text-terra-natural transition-colors">Voltar para a loja →</Link>
    </div>
  )

  return (
    <section className="pt-36 pb-24 section-cream min-h-screen">
      <div className="container-flora">
        <Reveal><h1 className="font-display text-forest-deep mb-16"
          style={{ fontSize: 'clamp(2.5rem,6vw,6rem)', letterSpacing: '-0.025em' }}>
          Finalizar compra
        </h1></Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-12">
            <div>
              <p className="tag-flora text-forest-moss/60 mb-8">Seus dados</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="col-span-2"><label className="tag-flora text-neutral-mid/40 block mb-1">Nome completo</label><input required value={form.name} onChange={e=>up('name',e.target.value)} placeholder="Seu nome" className={inputCls}/></div>
                <div><label className="tag-flora text-neutral-mid/40 block mb-1">E-mail</label><input type="email" required value={form.email} onChange={e=>up('email',e.target.value)} placeholder="seu@email.com" className={inputCls}/></div>
                <div><label className="tag-flora text-neutral-mid/40 block mb-1">Telefone</label><input required value={form.phone} onChange={e=>up('phone',e.target.value)} placeholder="(00) 00000-0000" className={inputCls}/></div>
              </div>
            </div>
            <div>
              <p className="tag-flora text-forest-moss/60 mb-8">Endereço de entrega</p>
              <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                <div className="col-span-1"><label className="tag-flora text-neutral-mid/40 block mb-1">CEP</label><input required value={form.zipCode} onChange={e=>up('zipCode',e.target.value)} placeholder="00000-000" className={inputCls}/></div>
                <div className="col-span-3"><label className="tag-flora text-neutral-mid/40 block mb-1">Rua</label><input required value={form.street} onChange={e=>up('street',e.target.value)} placeholder="Nome da rua" className={inputCls}/></div>
                <div className="col-span-1"><label className="tag-flora text-neutral-mid/40 block mb-1">Número</label><input required value={form.number} onChange={e=>up('number',e.target.value)} className={inputCls}/></div>
                <div className="col-span-3"><label className="tag-flora text-neutral-mid/40 block mb-1">Complemento</label><input value={form.complement} onChange={e=>up('complement',e.target.value)} className={inputCls}/></div>
                <div className="col-span-2"><label className="tag-flora text-neutral-mid/40 block mb-1">Bairro</label><input required value={form.neighborhood} onChange={e=>up('neighborhood',e.target.value)} className={inputCls}/></div>
                <div className="col-span-1 col-start-1"><label className="tag-flora text-neutral-mid/40 block mb-1">Cidade</label><input required value={form.city} onChange={e=>up('city',e.target.value)} className={inputCls}/></div>
                <div><label className="tag-flora text-neutral-mid/40 block mb-1">UF</label><input required maxLength={2} value={form.state} onChange={e=>up('state',e.target.value.toUpperCase())} className={inputCls}/></div>
              </div>
            </div>
            {error && <p className="font-body text-sm text-red-500/70">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-5 bg-forest-deep text-neutral-cream font-body text-[0.7rem] tracking-[0.15em] uppercase hover:bg-terra-dark transition-colors duration-400 disabled:opacity-50">
              {loading ? 'Processando...' : 'Ir para pagamento seguro'}
            </button>
          </form>

          <div className="bg-forest-sage/6 p-8 h-fit">
            <p className="tag-flora text-forest-moss/55 mb-8">Resumo</p>
            <div className="space-y-5 mb-8">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-forest-sage/10">
                    {product.images?.[0] && <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="64px"/>}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm text-forest-deep mb-0.5">{product.name}</p>
                    <p className="font-body text-xs text-neutral-mid">{quantity}× {formatPrice(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-forest-deep/8 pt-5 flex justify-between items-center">
              <span className="font-body text-sm text-neutral-mid">Total</span>
              <span className="font-display text-2xl text-forest-deep" style={{ letterSpacing: '-0.01em' }}>{formatPrice(total())}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
