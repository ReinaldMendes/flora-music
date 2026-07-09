'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: 'fadeUp' | 'fadeIn' | 'blurIn'
}

const variants = {
  fadeUp:  { hidden: { opacity: 0, y: 24 },          visible: { opacity: 1, y: 0 } },
  fadeIn:  { hidden: { opacity: 0 },                  visible: { opacity: 1 } },
  blurIn:  { hidden: { opacity: 0, filter: 'blur(8px)' }, visible: { opacity: 1, filter: 'blur(0px)' } },
}

export default function AnimatedText({
  children, className, delay = 0, variant = 'fadeUp'
}: AnimatedTextProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      variants={variants[variant]}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
