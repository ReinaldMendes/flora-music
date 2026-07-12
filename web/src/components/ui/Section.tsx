import { cn } from '@/lib/utils'
interface SectionProps { children: React.ReactNode; className?: string; id?: string; fullWidth?: boolean }
export default function Section({ children, className, id, fullWidth }: SectionProps) {
  return (
    <section id={id} className={cn('section-padding', className)}>
      {fullWidth ? children : <div className="container-flora">{children}</div>}
    </section>
  )
}
