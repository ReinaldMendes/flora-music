'use client'
import { useCartStore } from '@/lib/cart-store'
import { useEffect, useState } from 'react'

export default function CartButton() {
  const { toggleCart, itemCount } = useCartStore()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const count = mounted ? itemCount() : 0

  return (
    <button onClick={toggleCart} className="relative p-2 text-flora-deep hover:opacity-70 transition-opacity" aria-label="Abrir carrinho">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-10-4h10m-10 0a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] px-1 bg-flora-copper text-white text-[10px] font-body font-medium rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  )
}
