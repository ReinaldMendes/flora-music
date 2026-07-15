'use client'
import { useEffect, useRef } from 'react'
import { lerp } from '@/lib/utils'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return

    let mx = 0, my = 0
    let dx = 0, dy = 0
    let rx = 0, ry = 0
    let rafId: number

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a,button,[data-hover]')) {
        dotRef.current?.classList.add('is-hovered')
        ringRef.current?.classList.add('is-hovered')
      }
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a,button,[data-hover]')) {
        dotRef.current?.classList.remove('is-hovered')
        ringRef.current?.classList.remove('is-hovered')
      }
    }

    const tick = () => {
      dx = lerp(dx, mx, 0.2)
      dy = lerp(dy, my, 0.2)
      rx = lerp(rx, mx, 0.08)
      ry = lerp(ry, my, 0.08)
      if (dotRef.current)  { dotRef.current.style.left  = dx+'px'; dotRef.current.style.top  = dy+'px' }
      if (ringRef.current) { ringRef.current.style.left = rx+'px'; ringRef.current.style.top = ry+'px' }
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
