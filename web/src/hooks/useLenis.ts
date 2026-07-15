'use client'
import { useEffect, useRef } from 'react'

export function useLenis() {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let lenis: any = null

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('@studio-freight/lenis')
        lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
        })

        lenisRef.current = lenis

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
      } catch {}
    }

    initLenis()

    return () => {
      lenis?.destroy()
    }
  }, [])

  return lenisRef
}
