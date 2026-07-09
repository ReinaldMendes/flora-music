'use client'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-flora-deep/40 z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-flora-offwhite z-[70] flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-flora-moss/10">
              <h2 className="font-display text-2xl text-flora-deep">Carrinho</h2>
              <button onClick={() => setOpen(false)} className="text-flora-moss hover:text-flora-deep transition-colors" aria-label="Fechar carrinho">
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <p className="font-display text-2xl text-flora-deep/30 mb-2">Carrinho vazio</p>
                <p className="font-body text-sm text-flora-forest/50 mb-6">Explore a loja e encontre algo especial.</p>
                <Link href="/loja" onClick={() => setOpen(false)} className="text-sm font-body text-flora-moss hover:text-flora-deep transition-colors hover-underline-flora">
                  Ir para a loja →
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                  {items.map(({ product, quantity }) => {
                    const images = product.images as string[]
                    return (
                      <div key={product.id} className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden bg-flora-moss/10">
                          {images[0] && <Image src={images[0]} alt={product.name} fill className="object-cover" sizes="80px" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-body text-sm font-medium text-flora-deep">{product.name}</p>
                          <p className="text-sm font-body text-flora-copper mt-1">{formatPrice(product.price)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center border border-flora-moss/20 rounded text-xs">
                              <button onClick={() => updateQuantity(product.id, quantity - 1)} className="w-7 h-7 flex items-center justify-center hover:bg-flora-moss/10">−</button>
                              <span className="w-7 text-center">{quantity}</span>
                              <button onClick={() => updateQuantity(product.id, quantity + 1)} className="w-7 h-7 flex items-center justify-center hover:bg-flora-moss/10">+</button>
                            </div>
                            <button onClick={() => removeItem(product.id)} className="text-xs font-body text-flora-moss/50 hover:text-red-400 transition-colors">
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="p-6 border-t border-flora-moss/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-flora-forest/70">Subtotal</span>
                    <span className="font-display text-2xl text-flora-deep">{formatPrice(total())}</span>
                  </div>
                  <p className="text-xs font-body text-flora-moss/50">Frete calculado no checkout</p>
                  <Link href="/loja/checkout" onClick={() => setOpen(false)}>
                    <Button className="w-full justify-center" size="lg">Finalizar compra</Button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
