import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { Show } from '@/types'

const statusLabel: Record<string, string> = { UPCOMING: 'Em breve', SOLD_OUT: 'Esgotado', CANCELLED: 'Cancelado', DONE: 'Realizado' }

export default function ShowsSection({ shows }: { shows: Show[] }) {
  if (!shows.length) return null
  return (
    <section className="section-padding bg-flora-deep text-flora-cream">
      <div className="container-flora">
        <AnimatedSection>
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-3">Agenda</p>
          <h2 className="font-display text-title text-flora-cream mb-14">Próximos shows</h2>
        </AnimatedSection>
        <div className="space-y-0">
          {shows.map((show, i) => (
            <AnimatedSection key={show.id} delay={i * 0.07}>
              <div className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-flora-cream/10 hover:border-flora-cream/20 transition-colors gap-4">
                <div className="flex items-start gap-6">
                  <div className="text-center min-w-[56px]">
                    <div className="font-display text-4xl text-flora-moss leading-none">{new Date(show.date).getDate().toString().padStart(2,'0')}</div>
                    <div className="text-[10px] font-body text-flora-cream/40 uppercase tracking-wider mt-1">{new Intl.DateTimeFormat('pt-BR',{month:'short'}).format(new Date(show.date))} · {new Date(show.date).getFullYear()}</div>
                  </div>
                  <div>
                    <h3 className="font-body font-medium text-flora-cream group-hover:text-flora-moss transition-colors">{show.title}</h3>
                    <p className="text-sm font-body text-flora-cream/45 mt-1">{show.venue} · {show.city}/{show.state}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={show.status === 'UPCOMING' ? 'moss' : 'default'}>{statusLabel[show.status]}</Badge>
                  {show.ticketUrl && show.status === 'UPCOMING' && (
                    <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-body text-flora-moss hover:text-flora-cream transition-colors underline-flora">Ingressos →</a>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.5} className="mt-10">
          <Link href="/agenda" className="inline-flex items-center gap-2 text-sm font-body text-flora-moss hover:text-flora-cream transition-colors underline-flora">Ver toda a agenda →</Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
