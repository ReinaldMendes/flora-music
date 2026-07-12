import { cn } from '@/lib/utils'
interface BadgeProps { children: React.ReactNode; variant?: 'default' | 'copper' | 'moss' | 'earth'; className?: string }
export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = { default: 'bg-flora-deep/10 text-flora-deep', copper: 'bg-flora-copper/10 text-flora-copper', moss: 'bg-flora-moss/15 text-flora-forest', earth: 'bg-flora-earth/10 text-flora-earth' }
  return <span className={cn('inline-block px-3 py-1 text-xs font-body font-medium rounded-full tracking-wide', variants[variant], className)}>{children}</span>
}
