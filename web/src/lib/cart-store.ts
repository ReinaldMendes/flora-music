import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setOpen: (open: boolean) => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, quantity = 1) => set(state => {
        const existing = state.items.find(i => i.product.id === product.id)
        if (existing) return { items: state.items.map(i => i.product.id === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) } : i), isOpen: true }
        return { items: [...state.items, { product, quantity }], isOpen: true }
      }),
      removeItem: (productId) => set(state => ({ items: state.items.filter(i => i.product.id !== productId) })),
      updateQuantity: (productId, quantity) => set(state => ({
        items: quantity <= 0 ? state.items.filter(i => i.product.id !== productId) : state.items.map(i => i.product.id === productId ? { ...i, quantity } : i),
      })),
      clearCart: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
      total: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      itemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: 'flora-cart' }
  )
)
