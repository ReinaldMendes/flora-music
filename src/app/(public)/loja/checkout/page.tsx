'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import Section from '@/components/ui/Section'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    street: '', number: '', complement: '', neighborhood: '',
    city: '', state: '', zipCode: '',
  })

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/loja/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.product.id, quantity: i.quantity })),
          customer: { name: form.name, email: form.email, phone: form.phone },
          shippingAddress: {
            street: form.street, number: form.number, complement: form.complement,
            neighborhood: form.neighborhood, city: form.city, state: form.state, zipCode: form.zipCode,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao processar pedido')
      if (data.checkoutUrl) {
        clearCart()
        window.location.href = data.checkoutUrl
      }
    } catch (err: any) {
      setError(err.message || 'Algo deu errado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <Section className="bg-flora-offwhite pt-32 text-center">
        <p className="font-display text-2xl text-flora-deep/40 mb-4">Seu carrinho está vazio</p>
        <Link href="/loja" className="text-sm font-body text-flora-moss hover:text-flora-deep hover-underline-flora">Voltar para a loja →</Link>
      </Section>
    )
  }

  return (
    <Section className="bg-flora-offwhite pt-32">
      <h1 className="font-display text-title text-flora-deep mb-12">Finalizar compra</h1>
      <div className="grid md:grid-cols-3 gap-12">
        <form onSubmit={handleCheckout} className="md:col-span-2 space-y-8">
          <div>
            <p className="text-xs font-body font-medium tracking-[0.15em] uppercase text-flora-moss mb-4">Seus dados</p>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nome completo" required value={form.name} onChange={e => update('name', e.target.value)} className="col-span-2" />
              <Input label="Email" type="email" required value={form.email} onChange={e => update('email', e.target.value)} />
              <Input label="Telefone" required value={form.phone} onChange={e => update('phone', e.target.value)} />
            </div>
          </div>

          <div>
            <p className="text-xs font-body font-medium tracking-[0.15em] uppercase text-flora-moss mb-4">Endereço de entrega</p>
            <div className="grid grid-cols-4 gap-4">
              <Input label="CEP" required value={form.zipCode} onChange={e => update('zipCode', e.target.value)} className="col-span-1" />
              <Input label="Rua" required value={form.street} onChange={e => update('street', e.target.value)} className="col-span-3" />
              <Input label="Número" required value={form.number} onChange={e => update('number', e.target.value)} />
              <Input label="Complemento" value={form.complement} onChange={e => update('complement', e.target.value)} className="col-span-2" />
              <Input label="Bairro" required value={form.neighborhood} onChange={e => update('neighborhood', e.target.value)} className="col-span-3 row-start-3" />
              <Input label="Cidade" required value={form.city} onChange={e => update('city', e.target.value)} className="col-span-2" />
              <Input label="Estado" required maxLength={2} value={form.state} onChange={e => update('state', e.target.value.toUpperCase())} className="col-span-1" />
            </div>
          </div>

          {error && <p className="text-sm font-body text-red-500">{error}</p>}

          <Button type="submit" loading={loading} size="lg" className="w-full justify-center">
            Ir para pagamento seguro
          </Button>
          <p className="text-xs font-body text-flora-moss/50 text-center">Pagamento processado com segurança via Stripe</p>
        </form>

        {/* Order Summary */}
        <div className="bg-white border border-flora-moss/10 rounded p-6 h-fit sticky top-24">
          <p className="text-xs font-body font-medium tracking-[0.15em] uppercase text-flora-moss mb-6">Resumo do pedido</p>
          <div className="space-y-4 mb-6">
            {items.map(({ product, quantity }) => {
              const images = product.images as string[]
              return (
                <div key={product.id} className="flex gap-3">
                  <div className="relative w-14 h-14 flex-shrink-0 rounded overflow-hidden bg-flora-moss/10">
                    {images[0] && <Image src={images[0]} alt={product.name} fill className="object-cover" sizes="56px" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-body text-flora-deep">{product.name}</p>
                    <p className="text-xs font-body text-flora-moss">{quantity}x {formatPrice(product.price)}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="border-t border-flora-moss/10 pt-4 flex justify-between">
            <span className="font-body text-sm text-flora-forest">Total</span>
            <span className="font-display text-2xl text-flora-deep">{formatPrice(total())}</span>
          </div>
        </div>
      </div>
    </Section>
  )
}
