import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Agenda',
  description: 'Próximos shows e apresentações de Flora.',
}
export const revalidate = 1800

const statusLabel: Record<string, string> = {
  UPCOMING: 'Em breve', SOLD_OUT: 'Esgotado', CANCELLED: 'Cancelado', DONE: 'Realizado',
}

export default async function AgendaPage() {
  const [upcoming, past] = await Promise.all([
    prisma.show.findMany({ where: { status: { in: ['UPCOMING', 'SOLD_OUT'] } }, orderBy: { date: 'asc' } }),
    prisma.show.findMany({ where: { status: { in: ['DONE', 'CANCELLED'] } }, orderBy: { date: 'desc' }, take: 10 }),
  ])

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-deep text-flora-cream">
        <div className="container-flora">
          <AnimatedText>
            <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-4">Agenda</p>
            <h1 className="font-display text-title text-flora-cream">Shows</h1>
          </AnimatedText>
        </div>
      </div>

      <Section className="bg-flora-offwhite">
        {upcoming.length > 0 ? (
          <>
            <AnimatedText>
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-10">Próximos shows</p>
            </AnimatedText>
            <div className="space-y-0 max-w-3xl">
              {upcoming.map((show, i) => (
                <AnimatedText key={show.id} delay={i * 0.07}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 py-8 border-b border-flora-moss/10 hover:border-flora-moss/25 transition-colors">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="text-center min-w-[56px]">
                        <div className="font-display text-4xl text-flora-copper leading-none">
                          {new Date(show.date).getDate().toString().padStart(2,'0')}
                        </div>
                        <div className="text-xs font-body text-flora-moss/60 uppercase tracking-wider mt-1">
                          {new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(new Date(show.date))} · {new Date(show.date).getFullYear()}
                        </div>
                      </div>
                      <div>
                        <h2 className="font-body font-medium text-flora-deep text-lg">{show.title}</h2>
                        <p className="text-sm font-body text-flora-moss mt-1">{show.venue} · {show.city}/{show.state}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={show.status === 'UPCOMING' ? 'moss' : 'earth'}>{statusLabel[show.status]}</Badge>
                      {show.ticketUrl && show.status === 'UPCOMING' && (
                        <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer"
                          className="px-5 py-2.5 bg-flora-deep text-flora-cream text-xs font-body rounded hover:bg-flora-forest transition-colors">
                          Comprar ingresso
                        </a>
                      )}
                    </div>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </>
        ) : (
          <AnimatedText>
            <p className="font-display text-2xl text-flora-deep/40">Novos shows em breve.</p>
          </AnimatedText>
        )}

        {past.length > 0 && (
          <div className="mt-20">
            <AnimatedText>
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-8">Histórico</p>
            </AnimatedText>
            <div className="space-y-0 max-w-3xl opacity-60">
              {past.map((show, i) => (
                <AnimatedText key={show.id} delay={i * 0.04}>
                  <div className="flex items-center gap-6 py-4 border-b border-flora-moss/10">
                    <span className="text-sm font-body text-flora-moss min-w-[90px]">{formatDate(show.date)}</span>
                    <span className="font-body text-flora-forest text-sm">{show.title} · {show.city}/{show.state}</span>
                  </div>
                </AnimatedText>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  )
}
