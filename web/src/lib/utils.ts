import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const formatDate = (date: string | Date, locale = 'pt-BR') =>
  new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date))

export const formatDateShort = (date: string | Date) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(new Date(date))

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const mapRange = (
  value: number,
  inMin: number, inMax: number,
  outMin: number, outMax: number
) => ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin

// Delay assíncrono
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Scroll progress
export const getScrollProgress = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  return docHeight > 0 ? scrollTop / docHeight : 0
}
