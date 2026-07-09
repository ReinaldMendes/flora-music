'use client'
import { useState } from 'react'
import AnimatedText from '@/components/ui/AnimatedText'
import Section from '@/components/ui/Section'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [name, setName]   = useState('')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      if (res.ok) { setStatus('success'); setEmail(''); setName('') }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <Section id="newsletter" className="bg-flora-forest text-flora-cream">
      <div className="max-w-2xl mx-auto text-center">
        <AnimatedText>
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-4">Newsletter</p>
          <h2 className="font-display text-title text-flora-cream mb-6">Fique perto</h2>
          <p className="font-body text-flora-cream/60 leading-relaxed mb-12">
            Novidades, bastidores, datas e tudo o que acontece entre uma canção e outra.<br />
            Direto no seu email. Sem spam. Só poesia.
          </p>
        </AnimatedText>

        {status === 'success' ? (
          <AnimatedText>
            <p className="font-display text-2xl text-flora-moss">Que bom que você chegou. 🌿</p>
            <p className="font-body text-flora-cream/60 mt-2">Você receberá novidades em breve.</p>
          </AnimatedText>
        ) : (
          <AnimatedText delay={0.2}>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={e => setName(e.target.value)}
                className="flex-1 px-5 py-3.5 bg-flora-cream/10 border border-flora-cream/20 rounded text-flora-cream placeholder:text-flora-cream/30 font-body text-sm focus:outline-none focus:border-flora-moss transition-colors"
              />
              <input
                type="email"
                required
                placeholder="Seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 bg-flora-cream/10 border border-flora-cream/20 rounded text-flora-cream placeholder:text-flora-cream/30 font-body text-sm focus:outline-none focus:border-flora-moss transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-7 py-3.5 bg-flora-moss text-flora-deep font-body text-sm font-medium rounded hover:bg-flora-cream transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Enviando...' : 'Assinar'}
              </button>
            </form>
            {status === 'error' && (
              <p className="mt-3 text-sm font-body text-red-300">Algo deu errado. Tente novamente.</p>
            )}
          </AnimatedText>
        )}
      </div>
    </Section>
  )
}
