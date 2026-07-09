import { cn } from '@/lib/utils'

export default function Divider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 my-8', className)}>
      <div className="flex-1 h-px bg-flora-moss/20" />
      <svg width="16" height="16" viewBox="0 0 16 16" className="text-flora-moss/40 flex-shrink-0">
        <circle cx="8" cy="8" r="3" fill="currentColor" />
      </svg>
      <div className="flex-1 h-px bg-flora-moss/20" />
    </div>
  )
}
