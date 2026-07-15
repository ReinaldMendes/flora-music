'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/lib/cart-store'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, total } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-forest-deep/50 z-[200] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-neutral-cream z-[201] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-7 border-b border-forest-deep/8">
              <div>
                <h2 className="font-display text-2xl text-forest-deep" style={{ letterSpacing: '-0.01em' }}>
                  Carrinho
                </h2>
                {items.length > 0 && (
                  <p className="font-body text-xs text-neutral-mid mt-0.5">
                    {items.length} {items.length === 1 ? 'item' : 'itens'}
                  </p>
                )}
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-neutral-mid hover:text-forest-deep transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Vazio */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <p className="font-display text-3xl text-forest-deep/20 mb-6" style={{ letterSpacing: '-0.01em' }}>
                  Carrinho vazio
                </p>
                <p className="font-body text-sm text-neutral-mid/50 mb-8">
                  Explore a loja e encontre algo especial.
                </p>
                <Link
                  href="/loja"
                  onClick={() => setOpen(false)}
                  className="tag-flora text-terra-dark hover:text-terra-natural transition-colors"
                >
                  Ir para a loja →
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-4">
                    <div
                      className="relative flex-shrink-0 overflow-hidden bg-forest-sage/8"
                      style={{ width: 72, height: 72 }}
                    >
                      {product.images?.[0] && (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="72px"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-medium text-forest-deep mb-1 truncate">
                        {product.name}
                      </p>
                      <p className="font-display text-lg text-terra-dark mb-2" style={{ letterSpacing: '-0.01em' }}>
                        {formatPrice(product.price)}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-forest-deep/12">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-mid hover:text-forest-deep text-sm"
                          >−</button>
                          <span className="w-7 text-center font-body text-xs">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-mid hover:text-forest-deep text-sm"
                          >+</button>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="font-body text-xs text-neutral-mid/40 hover:text-terra-dark transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-7 border-t border-forest-deep/8 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-neutral-mid">Subtotal</span>
                  <span className="font-display text-2xl text-forest-deep" style={{ letterSpacing: '-0.01em' }}>
                    {formatPrice(total())}
                  </span>
                </div>
                <p className="font-body text-xs text-neutral-mid/40">
                  Frete calculado no checkout
                </p>
                <Link
                  href="/loja/checkout"
                  onClick={() => setOpen(false)}
                  className="block w-full py-4 bg-forest-deep text-neutral-cream font-body text-xs tracking-[0.15em] uppercase text-center hover:bg-terra-dark transition-colors duration-400"
                >
                  Finalizar compra
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
