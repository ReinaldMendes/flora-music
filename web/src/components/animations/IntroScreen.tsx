'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroScreen() {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState(0) // 0=loading 1=reveal 2=done

  useEffect(() => {
    // Fase 1: mostrar por 1.2s
    const t1 = setTimeout(() => setPhase(1), 1200)
    // Fase 2: iniciar saída
    const t2 = setTimeout(() => setPhase(2), 2400)
    // Fase 3: remover do DOM
    const t3 = setTimeout(() => setVisible(false), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-forest-deep z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16,1,0.3,1], delay: 0.2 }}>

          {/* Névoa */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 0 : 0.4 }}
            transition={{ duration: 1.5 }}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(134,137,93,0.15) 0%, transparent 70%)'
            }} />

          {/* Nome principal */}
          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 0 ? 1 : 0, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16,1,0.3,1], delay: 0.2 }}>
              <p className="font-display text-[0.65rem] tracking-[0.4em] uppercase text-forest-sage mb-4">
                Bem-vinda ao universo de
              </p>
              <h1 className="font-display text-[clamp(3.5rem,10vw,8rem)] text-neutral-cream leading-none tracking-[-0.02em]">
                Flora Eça
              </h1>
            </motion.div>

            {/* Linha animada */}
            <motion.div
              className="w-px bg-gradient-to-b from-transparent via-forest-sage/60 to-transparent mx-auto mt-8"
              initial={{ height: 0 }}
              animate={{ height: phase >= 0 ? 60 : 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.16,1,0.3,1] }} />
          </div>

          {/* Cortina de saída — sobe de baixo para cima */}
          {phase >= 1 && (
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-neutral-cream"
              initial={{ height: 0 }}
              animate={{ height: phase >= 2 ? '110%' : 0 }}
              transition={{ duration: 0.9, ease: [0.7,0,0.3,1] }} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
