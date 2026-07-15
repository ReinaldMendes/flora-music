'use client'
import { useCartStore } from '@/lib/cart-store'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function CartButton({ light = false }: { light?: boolean }) {
  const { setOpen, itemCount } = useCartStore()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const count = mounted ? itemCount() : 0

  return (
    <button
      onClick={() => setOpen(true)}
      className={cn(
        'relative flex items-center transition-colors duration-300',
        light
          ? 'text-neutral-mid hover:text-forest-deep'
          : 'text-neutral-cream/70 hover:text-neutral-cream'
      )}
      aria-label="Carrinho"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-terra-dark text-white text-[9px] font-bold rounded-full flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}
