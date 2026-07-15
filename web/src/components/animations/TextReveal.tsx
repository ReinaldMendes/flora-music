'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1'|'h2'|'h3'|'h4'|'p'|'span'
}

export default function TextReveal({ text, className, delay=0, stagger=0.04, as: Tag='h2' }: TextRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })

  // Dividir por palavras
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={cn('overflow-hidden', className)}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', skewY: 4 }}
            animate={inView ? { y: '0%', skewY: 0 } : { y: '110%', skewY: 4 }}
            transition={{
              duration: 1.0,
              delay: delay + wi * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}>
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
