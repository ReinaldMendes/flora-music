import type { Metadata } from 'next'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Divider from '@/components/ui/Divider'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheça a história, os valores e a essência de Flora — cantora e compositora brasileira.',
}

const timeline = [
  { year: '2018', event: 'Primeiras composições. A floresta como parceira.' },
  { year: '2020', event: 'Primeiros shows acústicos no Rio de Janeiro.' },
  { year: '2021', event: 'EP de estreia lançado independentemente.' },
  { year: '2022', event: 'Início das gravações do álbum Raízes.' },
  { year: '2023', event: 'Raízes é lançado e recebido com profundidade.' },
  { year: '2024', event: 'Tour nacional. Conexão com novos públicos.' },
  { year: '2025', event: 'Preparando o próximo capítulo.' },
]

const influences = ['Nana Caymmi', 'Milton Nascimento', 'Nick Drake', 'Seu Jorge', 'Elis Regina', 'Bon Iver', 'Caetano Veloso']

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <div className="relative h-[70vh] bg-flora-deep flex items-end">
        <Image
          src="/images/flora-sobre.jpg"
          alt="Flora"
          fill
          className="object-cover opacity-50 object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-flora-deep/80" />
        <div className="container-flora relative z-10 pb-12">
          <AnimatedText>
            <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-3">Sobre</p>
            <h1 className="font-display text-title text-flora-cream">Flora</h1>
          </AnimatedText>
        </div>
      </div>

      {/* Bio */}
      <Section className="bg-flora-offwhite">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <AnimatedText>
            <h2 className="font-display text-h1 text-flora-deep mb-8">
              Música que nasce<br />
              <em>do que é real</em>
            </h2>
          </AnimatedText>
          <AnimatedText delay={0.2} className="space-y-5">
            <p className="font-body text-flora-forest leading-relaxed">
              Flora é cantora e compositora brasileira, nascida entre a cidade e a mata. Sua música nasce do encontro entre o orgânico e o espiritual — canções que falam de natureza, de cura, de amor, de Deus, de silêncio.
            </p>
            <p className="font-body text-flora-forest leading-relaxed">
              Cada composição é uma travessia. Uma forma de entender o que a vida diz quando você para de fazer barulho e começa a escutar. Flora escreve sobre o que vive, sobre o que contempla, sobre o que aprende com o vento, com o mar, com a floresta.
            </p>
            <p className="font-body text-flora-forest leading-relaxed">
              Seu trabalho mistura MPB, folk e elementos da música eletrônica orgânica, criando uma linguagem que é ao mesmo tempo íntima e universal. Música para quem quer sentir. Para quem não tem medo do silêncio.
            </p>
          </AnimatedText>
        </div>
      </Section>

      <Divider className="container-flora" />

      {/* Linha do tempo */}
      <Section className="bg-flora-offwhite">
        <AnimatedText>
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-4">Trajetória</p>
          <h2 className="font-display text-h1 text-flora-deep mb-16">Linha do tempo</h2>
        </AnimatedText>
        <div className="relative max-w-2xl">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-flora-moss/20 ml-8" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <AnimatedText key={item.year} delay={i * 0.08} className="relative flex gap-8 pl-20">
                <div className="absolute left-0 w-16 text-right">
                  <span className="font-display text-2xl text-flora-moss">{item.year}</span>
                </div>
                <div className="absolute left-[30px] top-2 w-2.5 h-2.5 rounded-full bg-flora-moss/40 border-2 border-flora-moss" />
                <p className="font-body text-flora-forest leading-relaxed pt-0.5">{item.event}</p>
              </AnimatedText>
            ))}
          </div>
        </div>
      </Section>

      {/* Influências */}
      <Section className="bg-flora-deep text-flora-cream">
        <AnimatedText>
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-4">Referências</p>
          <h2 className="font-display text-h1 text-flora-cream mb-12">Influências</h2>
        </AnimatedText>
        <div className="flex flex-wrap gap-3">
          {influences.map((name, i) => (
            <AnimatedText key={name} delay={i * 0.06}>
              <span className="px-5 py-2.5 border border-flora-cream/15 font-body text-sm text-flora-cream/70 rounded hover:border-flora-moss hover:text-flora-moss transition-all duration-300">
                {name}
              </span>
            </AnimatedText>
          ))}
        </div>
      </Section>

      {/* Valores */}
      <Section className="bg-flora-offwhite">
        <AnimatedText>
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-4">O que move a música</p>
          <h2 className="font-display text-h1 text-flora-deep mb-16">Valores</h2>
        </AnimatedText>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {['Natureza', 'Espiritualidade', 'Autenticidade', 'Silêncio', 'Conexão humana', 'Poesia'].map((value, i) => (
            <AnimatedText key={value} delay={i * 0.08}>
              <div className="group">
                <div className="w-8 h-0.5 bg-flora-moss mb-4 transition-all duration-500 group-hover:w-16" />
                <p className="font-display text-xl text-flora-deep">{value}</p>
              </div>
            </AnimatedText>
          ))}
        </div>
      </Section>
    </>
  )
}
