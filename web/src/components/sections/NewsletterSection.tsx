'use client'
import { useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { subscribe } from '@/lib/api'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setStatus('loading')
    try { await subscribe({ email, name }); setStatus('success'); setEmail(''); setName('') }
    catch { setStatus('error') }
  }

  return (
    <section className="section-padding bg-flora-forest text-flora-cream" id="newsletter">
      <div className="container-flora max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-3">Newsletter</p>
          <h2 className="font-display text-title text-flora-cream mb-5">Fique perto</h2>
          <p className="font-body text-flora-cream/55 leading-relaxed mb-12">Novidades, bastidores, datas e tudo que acontece entre uma canção e outra.<br/>Direto no seu email. Sem spam. Só poesia.</p>
        </AnimatedSection>
        {status === 'success' ? (
          <AnimatedSection>
            <p className="font-display text-2xl text-flora-moss">Que bom que você chegou. 🌿</p>
            <p className="font-body text-flora-cream/55 mt-2">Você receberá novidades em breve.</p>
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} className="flex-1 px-5 py-3.5 bg-flora-cream/10 border border-flora-cream/20 rounded text-flora-cream placeholder:text-flora-cream/30 font-body text-sm focus:outline-none focus:border-flora-moss transition-colors"/>
              <input type="email" required placeholder="Seu email" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 px-5 py-3.5 bg-flora-cream/10 border border-flora-cream/20 rounded text-flora-cream placeholder:text-flora-cream/30 font-body text-sm focus:outline-none focus:border-flora-moss transition-colors"/>
              <button type="submit" disabled={status === 'loading'} className="px-7 py-3.5 bg-flora-moss text-flora-deep font-body text-sm font-medium rounded hover:bg-flora-cream transition-colors disabled:opacity-50">
                {status === 'loading' ? '...' : 'Assinar'}
              </button>
            </form>
            {status === 'error' && <p className="mt-3 text-sm font-body text-red-300">Algo deu errado. Tente novamente.</p>}
          </AnimatedSection>
        )}
      </div>
    </section>
  )
}
