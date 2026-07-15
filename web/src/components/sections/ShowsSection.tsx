'use client'
import { motion } from 'framer-motion'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import Link from 'next/link'

interface Show {
  id:string; title:string; date:string; venue:string
  city:string; state:string; ticketUrl?:string; status:string
}

const statusConfig: Record<string,{label:string;color:string}> = {
  UPCOMING:  { label:'Em breve',  color:'text-terra-natural border-terra-natural/30' },
  SOLD_OUT:  { label:'Esgotado',  color:'text-neutral-mid/50 border-neutral-mid/20' },
  CANCELLED: { label:'Cancelado', color:'text-neutral-mid/40 border-neutral-mid/15' },
  DONE:      { label:'Realizado', color:'text-forest-sage/40 border-forest-sage/15' },
}

export default function ShowsSection({ shows }: { shows: Show[] }) {
  if (!shows.length) return null

  return (
    <section className="section-flora section-sage relative">
      <div className="container-flora">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <Reveal direction="right">
              <span className="tag-flora text-forest-moss/60 block mb-4">Agenda</span>
            </Reveal>
            <TextReveal text="Próximos shows" as="h2"
              className="font-display text-forest-deep leading-none"
              style={{ fontSize: 'clamp(2.5rem,6vw,7rem)', letterSpacing: '-0.025em' } as any}
              delay={0.05}
            />
          </div>
          <Reveal direction="left" delay={0.2}>
            <Link href="/agenda"
              className="inline-flex items-center gap-2 text-[0.7rem] font-body tracking-[0.15em] uppercase text-forest-moss hover:text-forest-deep transition-colors duration-300">
              Ver agenda completa →
            </Link>
          </Reveal>
        </div>

        {/* Lista de shows */}
        <div className="space-y-0">
          {shows.map((show, i) => {
            const date = new Date(show.date)
            const config = statusConfig[show.status] || statusConfig.UPCOMING
            const isUpcoming = show.status === 'UPCOMING'

            return (
              <Reveal key={show.id} direction="up" delay={i * 0.07}>
                <motion.div
                  className="group grid grid-cols-12 gap-4 py-7 border-b border-forest-deep/8 items-center hover:bg-forest-deep/3 transition-colors duration-300 -mx-4 px-4"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3, ease: [0.25,0.46,0.45,0.94] }}
                >
                  {/* Data */}
                  <div className="col-span-3 md:col-span-2">
                    <p className="font-display text-3xl md:text-4xl text-terra-dark leading-none mb-1"
                      style={{ letterSpacing: '-0.02em' }}>
                      {date.getDate().toString().padStart(2,'0')}
                    </p>
                    <p className="font-body text-[0.65rem] text-neutral-mid uppercase tracking-wider">
                      {new Intl.DateTimeFormat('pt-BR',{month:'short'}).format(date).replace('.','')}&nbsp;·&nbsp;{date.getFullYear()}
                    </p>
                  </div>

                  {/* Separator */}
                  <div className="hidden md:block col-span-1">
                    <div className="w-px h-8 bg-forest-deep/10 mx-auto" />
                  </div>

                  {/* Info */}
                  <div className="col-span-6 md:col-span-6">
                    <p className="font-body font-medium text-forest-deep text-base md:text-lg mb-1 group-hover:text-terra-dark transition-colors duration-300">
                      {show.title}
                    </p>
                    <p className="font-body text-sm text-neutral-mid">
                      {show.venue} &nbsp;·&nbsp; {show.city}, {show.state}
                    </p>
                  </div>

                  {/* Status + CTA */}
                  <div className="col-span-3 flex flex-col md:flex-row items-end md:items-center justify-end gap-3">
                    <span className={`inline-block text-[0.6rem] font-body tracking-[0.12em] uppercase px-2.5 py-1 border ${config.color}`}>
                      {config.label}
                    </span>
                    {show.ticketUrl && isUpcoming && (
                      <motion.a
                        href={show.ticketUrl} target="_blank" rel="noopener noreferrer"
                        className="hidden md:inline-flex items-center gap-1.5 text-[0.65rem] font-body tracking-[0.12em] uppercase text-terra-dark hover:text-terra-natural transition-colors duration-300"
                        whileHover={{ x: 3 }}>
                        Ingressos →
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>

        {/* CTA mobile para ingressos */}
        <Reveal direction="up" delay={0.3}>
          <div className="mt-12 flex justify-center">
            <Link href="/agenda" className="btn-flora-light btn-flora">
              <span>Ver agenda completa</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
