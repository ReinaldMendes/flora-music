import Link from 'next/link'
import AnimatedText from '@/components/ui/AnimatedText'
import Section from '@/components/ui/Section'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { Show } from '@/types'

interface Props { shows: Show[] }

const statusLabel: Record<string, string> = {
  UPCOMING: 'Em breve',
  SOLD_OUT: 'Esgotado',
  CANCELLED: 'Cancelado',
  DONE: 'Realizado',
}

export default function ShowsSection({ shows }: Props) {
  if (!shows.length) return null

  return (
    <Section className="bg-flora-deep text-flora-cream">
      <AnimatedText>
        <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-4">Agenda</p>
        <h2 className="font-display text-title text-flora-cream mb-16">Próximos shows</h2>
      </AnimatedText>

      <div className="space-y-0">
        {shows.map((show, i) => (
          <AnimatedText key={show.id} delay={i * 0.08}>
            <div className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-flora-cream/10 hover:border-flora-cream/20 transition-colors gap-4">
              <div className="flex items-start gap-6">
                <div className="text-center min-w-[60px]">
                  <div className="font-display text-3xl text-flora-moss">
                    {new Date(show.date).getDate().toString().padStart(2,'0')}
                  </div>
                  <div className="text-xs font-body text-flora-cream/40 uppercase tracking-wide">
                    {new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(new Date(show.date))}
                  </div>
                </div>
                <div>
                  <h3 className="font-body font-medium text-flora-cream group-hover:text-flora-moss transition-colors">{show.title}</h3>
                  <p className="text-sm font-body text-flora-cream/50 mt-1">{show.venue} · {show.city}/{show.state}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={show.status === 'UPCOMING' ? 'moss' : 'default'}>
                  {statusLabel[show.status]}
                </Badge>
                {show.ticketUrl && show.status === 'UPCOMING' && (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-body text-flora-moss hover:text-flora-cream transition-colors hover-underline-flora"
                  >
                    Ingressos →
                  </a>
                )}
              </div>
            </div>
          </AnimatedText>
        ))}
      </div>

      <AnimatedText delay={0.4} className="mt-10">
        <Link href="/agenda" className="inline-flex items-center gap-2 text-sm font-body text-flora-moss hover:text-flora-cream transition-colors hover-underline-flora">
          Ver toda a agenda →
        </Link>
      </AnimatedText>
    </Section>
  )
}
