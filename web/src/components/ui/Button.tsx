import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'copper'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 font-body font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flora-moss'
    const variants = {
      primary: 'bg-flora-deep text-flora-cream hover:bg-flora-forest',
      outline: 'border border-flora-deep text-flora-deep hover:bg-flora-deep hover:text-flora-cream',
      ghost:   'text-flora-deep hover:bg-flora-deep/5',
      copper:  'bg-flora-copper text-flora-cream hover:bg-flora-earth',
    }
    const sizes = { sm: 'px-4 py-2 text-sm rounded', md: 'px-6 py-3 text-sm rounded', lg: 'px-8 py-4 text-base rounded' }
    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>
        {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
