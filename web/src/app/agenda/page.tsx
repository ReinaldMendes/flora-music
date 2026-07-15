import type { Metadata } from 'next'
import { fetchApi } from '@/lib/fetch-api'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Agenda', description: 'Próximos shows de Flora Eça.' }

const statusCfg: Record<string,{label:string;cls:string}> = {
  UPCOMING:  { label:'Em breve',  cls:'text-terra-natural border-terra-natural/25' },
  SOLD_OUT:  { label:'Esgotado',  cls:'text-neutral-mid/40 border-neutral-mid/15' },
  CANCELLED: { label:'Cancelado', cls:'text-neutral-mid/30 border-neutral-mid/12' },
  DONE:      { label:'Realizado', cls:'text-forest-sage/35 border-forest-sage/12' },
}

export default async function AgendaPage() {
  const shows = await fetchApi<any[]>('/shows', [])
  const upcoming = shows.filter(s => ['UPCOMING','SOLD_OUT'].includes(s.status))
  const past = shows.filter(s => ['DONE','CANCELLED'].includes(s.status))

  return (
    <>
      <div className="pt-40 pb-20 section-dark">
        <div className="container-flora">
          <Reveal><span className="tag-flora text-forest-sage/60 block mb-6">Agenda</span></Reveal>
          <TextReveal text="Shows" as="h1" className="font-display text-neutral-cream"
            style={{ fontSize: 'clamp(5rem,14vw,14rem)', letterSpacing: '-0.04em', lineHeight: '0.88' } as any}/>
        </div>
      </div>

      <section className="section-flora section-cream">
        <div className="container-flora">
          {upcoming.length > 0 ? (
            <>
              <Reveal><span className="tag-flora text-forest-moss/60 block mb-14">Próximas apresentações</span></Reveal>
              <div className="space-y-0 max-w-4xl">
                {upcoming.map((show, i) => {
                  const date = new Date(show.date)
                  const cfg = statusCfg[show.status] || statusCfg.UPCOMING
                  return (
                    <Reveal key={show.id} direction="up" delay={i*0.07}>
                      <div className="group grid grid-cols-12 gap-4 py-10 border-b border-forest-deep/8 items-center hover:bg-forest-deep/[0.02] transition-colors -mx-4 px-4">
                        <div className="col-span-3 md:col-span-2">
                          <p className="font-display text-4xl md:text-5xl text-terra-dark leading-none"
                            style={{ letterSpacing: '-0.02em' }}>
                            {date.getDate().toString().padStart(2,'0')}
                          </p>
                          <p className="font-body text-[0.6rem] text-neutral-mid/50 uppercase tracking-widest mt-1">
                            {new Intl.DateTimeFormat('pt-BR',{month:'short'}).format(date)} {date.getFullYear()}
                          </p>
                        </div>
                        <div className="col-span-7 md:col-span-8">
                          <p className="font-body font-medium text-forest-deep text-lg mb-1 group-hover:text-terra-dark transition-colors duration-300">
                            {show.title}
                          </p>
                          <p className="font-body text-sm text-neutral-mid">
                            {show.venue} · {show.city}, {show.state}
                          </p>
                        </div>
                        <div className="col-span-2 flex flex-col items-end gap-3">
                          <span className={`text-[0.55rem] font-body tracking-[0.1em] uppercase px-2.5 py-1 border ${cfg.cls}`}>
                            {cfg.label}
                          </span>
                          {show.ticketUrl && show.status === 'UPCOMING' && (
                            <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer"
                              className="hidden md:block text-[0.6rem] font-body tracking-[0.1em] uppercase text-terra-dark hover:text-terra-natural transition-colors">
                              Ingressos →
                            </a>
                          )}
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <p className="font-display text-3xl text-forest-deep/25 mb-4">Novos shows em breve.</p>
              <p className="font-body text-neutral-mid/50 text-sm">Acompanhe as redes sociais para ser a primeira a saber.</p>
            </div>
          )}

          {past.length > 0 && (
            <div className="mt-24 pt-12 border-t border-forest-deep/8 opacity-50">
              <Reveal><span className="tag-flora text-neutral-mid/50 block mb-10">Histórico</span></Reveal>
              <div className="space-y-0 max-w-3xl">
                {past.slice(0,8).map(show => (
                  <Reveal key={show.id}>
                    <div className="flex items-center gap-6 py-4 border-b border-forest-deep/5">
                      <span className="font-body text-[0.7rem] text-neutral-mid/45 min-w-[90px]">
                        {new Date(show.date).toLocaleDateString('pt-BR',{month:'short',year:'numeric'})}
                      </span>
                      <span className="font-body text-sm text-neutral-mid/55">{show.title} · {show.city}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
