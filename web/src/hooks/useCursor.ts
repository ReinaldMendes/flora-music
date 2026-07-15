'use client'
import { useEffect, useRef } from 'react'
import { lerp } from '@/lib/utils'

export function useCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return

    let mouse    = { x: 0, y: 0 }
    let dotPos   = { x: 0, y: 0 }
    let ringPos  = { x: 0, y: 0 }
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        dotRef.current?.classList.add('is-hovered')
        ringRef.current?.classList.add('is-hovered')
      }
    }
    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) {
        dotRef.current?.classList.remove('is-hovered')
        ringRef.current?.classList.remove('is-hovered')
      }
    }

    const animate = () => {
      dotPos.x  = lerp(dotPos.x,  mouse.x, 0.18)
      dotPos.y  = lerp(dotPos.y,  mouse.y, 0.18)
      ringPos.x = lerp(ringPos.x, mouse.x, 0.10)
      ringPos.y = lerp(ringPos.y, mouse.y, 0.10)

      if (dotRef.current) {
        dotRef.current.style.left = dotPos.x + 'px'
        dotRef.current.style.top  = dotPos.y + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.x + 'px'
        ringRef.current.style.top  = ringPos.y + 'px'
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return { dotRef, ringRef }
}
