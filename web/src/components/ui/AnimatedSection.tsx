'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
interface Props { children: React.ReactNode; className?: string; delay?: number; variant?: 'up' | 'fade' }
export default function AnimatedSection({ children, className, delay = 0, variant = 'up' }: Props) {
  const variants = {
    up:   { hidden: { opacity: 0, y: 28 },          visible: { opacity: 1, y: 0 } },
    fade: { hidden: { opacity: 0 },                  visible: { opacity: 1 } },
  }
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      variants={variants[variant]} className={cn(className)}>
      {children}
    </motion.div>
  )
}
