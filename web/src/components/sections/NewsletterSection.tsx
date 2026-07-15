'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import { fetchApi } from '@/lib/fetch-api'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [name, setName]   = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetchApi('/newsletter/subscribe', null, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      setStatus('success')
      setEmail(''); setName('')
    } catch { setStatus('error') }
  }

  return (
    <section className="section-flora relative overflow-hidden" style={{ background: '#1a1d00' }}>

      {/* Gradiente de fundo */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(134,137,93,0.08) 0%, transparent 70%)' }} />

      {/* Linha topo */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-forest-sage/20 to-transparent" />

      <div className="container-flora relative z-10">
        <div className="max-w-2xl mx-auto text-center">

          <Reveal direction="fade">
            <span className="tag-flora text-forest-sage/50 block mb-8">Fique perto</span>
          </Reveal>

          <TextReveal
            text="Receba novidades"
            as="h2"
            className="font-display text-neutral-cream leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem,6vw,6.5rem)', letterSpacing: '-0.025em' } as any}
            delay={0.05}
          />
          <TextReveal
            text="em primeira mão."
            as="h2"
            className="font-display text-forest-sage leading-none mb-10"
            style={{ fontSize: 'clamp(2.5rem,6vw,6.5rem)', letterSpacing: '-0.025em', fontStyle: 'italic' } as any}
            delay={0.2}
          />

          <Reveal direction="up" delay={0.3}>
            <p className="font-body text-neutral-cream/40 leading-relaxed mb-14" style={{ fontSize: '1rem' }}>
              Bastidores, lançamentos, datas e tudo que acontece entre uma<br className="hidden md:block"/>
              canção e outra. Direto no seu e-mail. Sem spam. Só poesia.
            </p>
          </Reveal>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-8">
                <p className="font-display text-3xl text-forest-sage mb-3">Que bom que você chegou. 🌿</p>
                <p className="font-body text-neutral-cream/40 text-sm">
                  Você receberá novidades em breve.
                </p>
              </motion.div>
            ) : (
              <Reveal key="form" direction="up" delay={0.4}>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="flex-1 px-5 py-4 bg-neutral-cream/5 border border-neutral-cream/10 text-neutral-cream placeholder:text-neutral-cream/25 font-body text-sm focus:outline-none focus:border-forest-sage/40 transition-colors duration-300"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="flex-1 px-5 py-4 bg-neutral-cream/5 border border-neutral-cream/10 text-neutral-cream placeholder:text-neutral-cream/25 font-body text-sm focus:outline-none focus:border-forest-sage/40 transition-colors duration-300"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-7 py-4 bg-terra-dark text-neutral-cream font-body text-[0.7rem] tracking-[0.15em] uppercase hover:bg-terra-natural transition-colors duration-300 disabled:opacity-50 whitespace-nowrap">
                    {status === 'loading' ? '...' : 'Assinar'}
                  </button>
                </form>
                {status === 'error' && (
                  <p className="mt-4 text-sm font-body text-red-400/70">Algo deu errado. Tente novamente.</p>
                )}
              </Reveal>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
