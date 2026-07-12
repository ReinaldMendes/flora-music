'use client'
import { useCartStore } from '@/lib/cart-store'
import { useEffect, useState } from 'react'

export default function CartButton() {
  const { setOpen, itemCount } = useCartStore()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const count = mounted ? itemCount() : 0
  return (
    <button onClick={() => setOpen(true)} className="relative p-2 text-flora-deep hover:opacity-70 transition-opacity" aria-label="Carrinho">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
      </svg>
      {count > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-flora-copper text-white text-[10px] font-bold rounded-full flex items-center justify-center">{count}</span>}
    </button>
  )
}
