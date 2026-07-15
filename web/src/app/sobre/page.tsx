import type { Metadata } from 'next'
import Image from 'next/image'
import { fetchApi } from '@/lib/fetch-api'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import Parallax from '@/components/animations/Parallax'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Sobre', description: 'Conheça a história de Flora Eça.' }

const timeline = [
  { year: '2018', text: 'Primeiras composições. A floresta como parceira.' },
  { year: '2020', text: 'Primeiros shows acústicos no Rio de Janeiro.' },
  { year: '2021', text: 'EP de estreia lançado de forma independente.' },
  { year: '2022', text: 'Início das gravações do álbum Raízes.' },
  { year: '2023', text: 'Raízes é lançado com profundidade e alcance.' },
  { year: '2024', text: 'Tour nacional. Conexão com novos públicos.' },
  { year: '2025', text: 'Preparando o próximo capítulo.' },
]

export default async function SobrePage() {
  const photos = await fetchApi<any[]>('/fotos?category=sobre', [])

  return (
    <>
      {/* Hero da página */}
      <div className="relative min-h-[70vh] bg-forest-deep flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/flora-portrait.jpg" alt="Flora Eça" fill priority
            className="object-cover object-top opacity-50" sizes="100vw"/>
          <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/10 via-transparent to-forest-deep/90"/>
        </div>
        <div className="container-flora relative z-10 pb-16 md:pb-20">
          <Reveal direction="up">
            <span className="tag-flora text-forest-sage/70 block mb-4">Sobre a artista</span>
          </Reveal>
          <TextReveal text="Flora Eça" as="h1"
            className="font-display text-neutral-cream"
            style={{ fontSize: 'clamp(4rem,12vw,11rem)', letterSpacing: '-0.03em', lineHeight: '0.9' } as any}/>
        </div>
      </div>

      {/* Bio */}
      <section className="section-flora section-cream">
        <div className="container-flora">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <Reveal direction="scale">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src="/images/flora-portrait.jpg" alt="Flora Eça" fill
                    className="object-cover" sizes="(max-width:1024px)100vw,40vw"/>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:pt-8 space-y-10">
              <TextReveal text="Música que nasce da floresta." as="h2"
                className="font-display text-forest-deep"
                style={{ fontSize: 'clamp(2rem,4vw,4.5rem)', letterSpacing: '-0.02em', lineHeight: '1.05' } as any}
                delay={0.1}/>
              {[
                'Flora Eça nasceu entre a floresta e a canção. Sua música vive no espaço entre a natureza e o silêncio — onde palavras se tornam raízes e melodias se tornam vento.',
                'Compositora de alma poética e voz contemplativa, Flora escreve sobre o que atravessa: o amor, a espiritualidade, a cura, a ancestralidade que habita cada ser humano.',
                'Cada canção é uma floresta inteira. Cada letra, uma folha que cai com intenção. Uma artista que não entoa músicas — ela planta experiências.',
                'Influenciada por Nana Caymmi, Milton Nascimento, Nick Drake e pela própria natureza que a rodeia, Flora criou um universo sonoro único: orgânico, espiritual e absolutamente verdadeiro.',
              ].map((p, i) => (
                <Reveal key={i} direction="up" delay={0.1*i}>
                  <p className="font-body text-neutral-mid leading-relaxed" style={{ fontSize: '1.0625rem' }}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-flora section-dark">
        <div className="container-flora">
          <Reveal><span className="tag-flora text-forest-sage/60 block mb-16">Trajetória</span></Reveal>
          <div className="space-y-0 max-w-3xl">
            {timeline.map((item, i) => (
              <Reveal key={item.year} direction="left" delay={i * 0.07}>
                <div className="flex gap-8 py-8 border-b border-neutral-cream/5 group">
                  <span className="font-display text-3xl text-forest-sage/40 w-20 flex-shrink-0 group-hover:text-terra-natural transition-colors duration-500"
                    style={{ letterSpacing: '-0.02em' }}>{item.year}</span>
                  <p className="font-body text-neutral-cream/60 leading-relaxed self-center text-base group-hover:text-neutral-cream/80 transition-colors duration-500">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Influências */}
      <section className="section-flora section-cream">
        <div className="container-flora text-center">
          <Reveal><span className="tag-flora text-forest-moss/60 block mb-12">Referências</span></Reveal>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {['Nana Caymmi','Milton Nascimento','Nick Drake','Seu Jorge','Elis Regina','Bon Iver','Caetano Veloso','Lenine','Adriana Calcanhotto'].map((n, i) => (
              <Reveal key={n} delay={i * 0.04}>
                <span className="px-5 py-2.5 border border-forest-deep/10 font-body text-sm text-neutral-mid hover:border-terra-dark/30 hover:text-terra-dark transition-all duration-400 inline-block">
                  {n}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contatos */}
      <section className="section-flora" style={{ background: '#F2F1EA' }}>
        <div className="container-flora max-w-xl mx-auto text-center">
          <Reveal><TextReveal text="Fale comigo" as="h2" className="font-display text-forest-deep mb-10"
            style={{ fontSize: 'clamp(2.5rem,5vw,5rem)', letterSpacing: '-0.025em' } as any}/></Reveal>
          <Reveal direction="up" delay={0.2}>
            <div className="space-y-5">
              <div>
                <p className="tag-flora text-forest-moss/60 mb-2">Shows & Produção</p>
                <a href="mailto:alinefpimentel@gmail.com" className="font-body text-neutral-dark hover:text-terra-dark transition-colors text-base underline decoration-forest-deep/20 hover:decoration-terra-dark/40">
                  alinefpimentel@gmail.com
                </a>
              </div>
              <div className="w-px h-8 bg-forest-deep/10 mx-auto"/>
              <div>
                <p className="tag-flora text-forest-moss/60 mb-2">Contato pessoal</p>
                <a href="mailto:floramusicacontato@gmail.com" className="font-body text-neutral-dark hover:text-terra-dark transition-colors text-base underline decoration-forest-deep/20 hover:decoration-terra-dark/40">
                  floramusicacontato@gmail.com
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
