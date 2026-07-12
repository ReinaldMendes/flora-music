'use client'
import { useState } from 'react'
import { useCartStore } from '@/lib/cart-store'
import Button from '@/components/ui/Button'
import type { Product } from '@/types'

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore(s => s.addItem)
  const [qty, setQty] = useState(1)
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border border-flora-moss/30 rounded">
        <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-12 flex items-center justify-center text-flora-deep hover:bg-flora-moss/10 transition-colors">−</button>
        <span className="w-10 text-center font-body text-sm">{qty}</span>
        <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="w-10 h-12 flex items-center justify-center text-flora-deep hover:bg-flora-moss/10 transition-colors">+</button>
      </div>
      <Button onClick={() => addItem(product, qty)} className="flex-1 justify-center">Adicionar ao carrinho</Button>
    </div>
  )
}
