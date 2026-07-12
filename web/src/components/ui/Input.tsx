import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string }
const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && <label htmlFor={id} className="text-sm font-medium text-flora-forest font-body">{label}</label>}
    <input ref={ref} id={id} className={cn('w-full px-4 py-3 bg-white border border-flora-moss/30 rounded text-flora-deep font-body placeholder:text-flora-moss/50 text-sm focus:outline-none focus:border-flora-forest focus:ring-1 focus:ring-flora-forest/20 transition-all duration-200', error && 'border-red-400', className)} {...props} />
    {error && <p className="text-xs text-red-500 font-body">{error}</p>}
  </div>
))
Input.displayName = 'Input'
export default Input
