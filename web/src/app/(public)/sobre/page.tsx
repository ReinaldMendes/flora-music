import type { Metadata } from 'next'
import Image from 'next/image'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Section from '@/components/ui/Section'
export const metadata: Metadata = { title: 'Sobre', description: 'Conheça a história e os valores de Flora.' }
const timeline = [
  { year: '2018', event: 'Primeiras composições. A floresta como parceira.' },
  { year: '2020', event: 'Primeiros shows acústicos no Rio de Janeiro.' },
  { year: '2021', event: 'EP de estreia lançado independentemente.' },
  { year: '2022', event: 'Início das gravações do álbum Raízes.' },
  { year: '2023', event: 'Raízes é lançado e recebido com profundidade.' },
  { year: '2024', event: 'Tour nacional. Conexão com novos públicos.' },
  { year: '2025', event: 'Preparando o próximo capítulo.' },
]
export default function SobrePage() {
  return (
    <>
      <div className="relative h-[65vh] bg-flora-deep flex items-end">
        <Image src="/images/flora-sobre.jpg" alt="Flora" fill className="object-cover object-top opacity-50" priority sizes="100vw"/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-flora-deep/80"/>
        <div className="container-flora relative z-10 pb-12">
          <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-2">Sobre</p>
          <h1 className="font-display text-title text-flora-cream">Flora</h1>
        </div>
      </div>
      <Section className="bg-flora-offwhite">
        <div className="grid md:grid-cols-2 gap-16">
          <AnimatedSection><h2 className="font-display text-h1 text-flora-deep">Música que nasce<br/><em className="not-italic text-flora-moss">do que é real</em></h2></AnimatedSection>
          <AnimatedSection delay={0.2} className="space-y-5">
            <p className="font-body text-flora-forest leading-relaxed">Flora é cantora e compositora brasileira, nascida entre a cidade e a mata. Sua música nasce do encontro entre o orgânico e o espiritual — canções que falam de natureza, de cura, de amor, de Deus, de silêncio.</p>
            <p className="font-body text-flora-forest leading-relaxed">Cada composição é uma travessia. Uma forma de entender o que a vida diz quando você para de fazer barulho e começa a escutar. Flora escreve sobre o que vive, sobre o que contempla, sobre o que aprende com o vento, com o mar, com a floresta.</p>
            <p className="font-body text-flora-forest leading-relaxed">Seu trabalho mistura MPB, folk e elementos da música eletrônica orgânica. Música para quem quer sentir. Para quem não tem medo do silêncio.</p>
          </AnimatedSection>
        </div>
      </Section>
      <Section className="bg-flora-offwhite">
        <AnimatedSection><p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-3">Trajetória</p><h2 className="font-display text-h1 text-flora-deep mb-14">Linha do tempo</h2></AnimatedSection>
        <div className="relative max-w-2xl">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-flora-moss/20"/>
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 0.07} className="relative flex gap-8 pl-20">
                <div className="absolute left-0 w-16 text-right"><span className="font-display text-2xl text-flora-moss">{item.year}</span></div>
                <div className="absolute left-[26px] top-2 w-3 h-3 rounded-full bg-flora-moss/40 border-2 border-flora-moss"/>
                <p className="font-body text-flora-forest leading-relaxed">{item.event}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Section>
      <Section className="bg-flora-deep text-flora-cream">
        <AnimatedSection><p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-3">Referências</p><h2 className="font-display text-h1 text-flora-cream mb-12">Influências</h2></AnimatedSection>
        <div className="flex flex-wrap gap-3">
          {['Nana Caymmi','Milton Nascimento','Nick Drake','Seu Jorge','Elis Regina','Bon Iver','Caetano Veloso','Lenine'].map((n,i) => (
            <AnimatedSection key={n} delay={i*0.05}><span className="px-5 py-2.5 border border-flora-cream/15 font-body text-sm text-flora-cream/65 rounded hover:border-flora-moss hover:text-flora-moss transition-all duration-300 inline-block">{n}</span></AnimatedSection>
          ))}
        </div>
      </Section>
    </>
  )
}
