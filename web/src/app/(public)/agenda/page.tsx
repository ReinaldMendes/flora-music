import type { Metadata } from 'next'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
export const metadata: Metadata = { title: 'Agenda', description: 'Próximos shows e apresentações de Flora.' }
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
const statusLabel: Record<string,string> = { UPCOMING: 'Em breve', SOLD_OUT: 'Esgotado', CANCELLED: 'Cancelado', DONE: 'Realizado' }
async function getData() {
  try {
    const shows = await fetch(`${API}/shows`, { next: { revalidate: 1800 } }).then(r => r.json())
    return { upcoming: shows.filter((s: any) => ["UPCOMING","SOLD_OUT"].includes(s.status)), past: shows.filter((s: any) => ["DONE","CANCELLED"].includes(s.status)) }
  } catch { return { upcoming: [], past: [] } }
}
export default async function AgendaPage() {
  const { upcoming, past } = await getData()
  return (
    <>
      <div className="pt-32 pb-16 bg-flora-deep text-flora-cream">
        <div className="container-flora">
          <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-3">Agenda</p>
          <h1 className="font-display text-title text-flora-cream">Shows</h1>
        </div>
      </div>
      <section className="section-padding bg-flora-offwhite">
        <div className="container-flora">
          {upcoming.length > 0 ? (
            <>
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-10">Próximos shows</p>
              <div className="max-w-3xl space-y-0">
                {upcoming.map((show: any, i: number) => (
                  <AnimatedSection key={show.id} delay={i * 0.07}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 py-8 border-b border-flora-moss/10 hover:border-flora-moss/25 transition-colors">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="text-center min-w-[52px]">
                          <div className="font-display text-4xl text-flora-copper leading-none">{new Date(show.date).getDate().toString().padStart(2,"0")}</div>
                          <div className="text-[10px] font-body text-flora-moss/55 uppercase tracking-wider mt-1">{new Intl.DateTimeFormat("pt-BR",{month:"short"}).format(new Date(show.date))} · {new Date(show.date).getFullYear()}</div>
                        </div>
                        <div>
                          <h2 className="font-body font-medium text-flora-deep text-lg">{show.title}</h2>
                          <p className="text-sm font-body text-flora-moss mt-1">{show.venue} · {show.city}/{show.state}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={show.status === "UPCOMING" ? "moss" : "earth"}>{statusLabel[show.status]}</Badge>
                        {show.ticketUrl && show.status === "UPCOMING" && (
                          <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-flora-deep text-flora-cream text-xs font-body rounded hover:bg-flora-forest transition-colors">Comprar ingresso</a>
                        )}
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </>
          ) : (
            <p className="font-display text-2xl text-flora-deep/35">Novos shows em breve.</p>
          )}
          {past.length > 0 && (
            <div className="mt-20 opacity-55">
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-8">Histórico</p>
              <div className="max-w-3xl">
                {past.slice(0,8).map((show: any) => (
                  <div key={show.id} className="flex items-center gap-6 py-3.5 border-b border-flora-moss/10">
                    <span className="text-sm font-body text-flora-moss min-w-[100px]">{formatDate(show.date)}</span>
                    <span className="font-body text-flora-forest text-sm">{show.title} · {show.city}/{show.state}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}