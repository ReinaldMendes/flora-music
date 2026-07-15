'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  duration?: number
  once?: boolean
}

const variants = {
  up:    { hidden: { opacity:0, y:60 },          visible: { opacity:1, y:0 } },
  down:  { hidden: { opacity:0, y:-40 },         visible: { opacity:1, y:0 } },
  left:  { hidden: { opacity:0, x:60 },          visible: { opacity:1, x:0 } },
  right: { hidden: { opacity:0, x:-60 },         visible: { opacity:1, x:0 } },
  fade:  { hidden: { opacity:0 },                visible: { opacity:1 } },
  scale: { hidden: { opacity:0, scale:0.92 },    visible: { opacity:1, scale:1 } },
}

export default function Reveal({ children, className, delay=0, direction='up', duration=0.9, once=true }: RevealProps) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px 0px' })
  const ctrl = useAnimation()

  useEffect(() => {
    if (inView) ctrl.start('visible')
    else if (!once) ctrl.start('hidden')
  }, [inView, ctrl, once])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={ctrl}
      variants={variants[direction]}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}>
      {children}
    </motion.div>
  )
}
