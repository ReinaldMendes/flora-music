import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Product {
  id: string; name: string; price: number; images: string[]
  stock: number; slug: string; category: string
  description?: string; active: boolean; featured: boolean
}

interface CartItem { product: Product; quantity: number }

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
        if (existing) return {
          items: state.items.map(i => i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) } : i),
          isOpen: true,
        }
        return { items: [...state.items, { product, quantity }], isOpen: true }
      }),
      removeItem: (id) => set(s => ({ items: s.items.filter(i => i.product.id !== id) })),
      updateQuantity: (id, qty) => set(s => ({
        items: qty <= 0
          ? s.items.filter(i => i.product.id !== id)
          : s.items.map(i => i.product.id === id ? { ...i, quantity: qty } : i)
      })),
      clearCart: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
      total: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
      itemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: 'flora-cart' }
  )
)
