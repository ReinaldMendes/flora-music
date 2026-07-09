'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AdminModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

export default function AdminModal({ open, onClose, title, children, size = 'md' }: AdminModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-flora-deep/50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2 }}
            className={cn('fixed inset-x-4 top-1/2 -translate-y-1/2 z-[60] w-full mx-auto', sizes[size])}
            style={{ maxHeight: '90vh' }}
          >
            <div className="bg-white rounded-lg shadow-2xl flex flex-col" style={{ maxHeight: '90vh' }}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-flora-moss/10 flex-shrink-0">
                <h3 className="font-body font-medium text-flora-deep">{title}</h3>
                <button onClick={onClose} className="text-flora-moss/60 hover:text-flora-deep transition-colors text-lg">✕</button>
              </div>
              <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
