'use client'
import { useState } from 'react'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/flora.musica', value: '@flora.musica' },
  { label: 'Spotify', href: 'https://open.spotify.com', value: 'Flora' },
  { label: 'YouTube', href: 'https://youtube.com/@floramusica', value: '@floramusica' },
  { label: 'Email', href: 'mailto:contato@floramusica.com.br', value: 'contato@floramusica.com.br' },
  { label: 'WhatsApp', href: 'https://wa.me/5541999999999', value: '+55 (41) 99999-9999' },
]

export default function ContatoPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contato', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (res.ok) { setStatus('success'); setForm({ name:'', email:'', subject:'', message:'' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-offwhite border-b border-flora-moss/10">
        <div className="container-flora">
          <AnimatedText>
            <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-4">Fale comigo</p>
            <h1 className="font-display text-title text-flora-deep">Contato</h1>
          </AnimatedText>
        </div>
      </div>

      <Section className="bg-flora-offwhite">
        <div className="grid md:grid-cols-2 gap-16">
          <AnimatedText>
            <h2 className="font-display text-h2 text-flora-deep mb-6">Vamos conversar</h2>
            <p className="font-body text-flora-forest/70 leading-relaxed mb-12">
              Para shows, parcerias, imprensa, ou simplesmente para dizer que uma canção te tocou — este é o lugar.
            </p>

            <div className="space-y-5">
              {socials.map(s => (
                <div key={s.label} className="flex items-center gap-6 py-3 border-b border-flora-moss/10">
                  <span className="text-xs font-body text-flora-moss/50 min-w-[80px] uppercase tracking-wide">{s.label}</span>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-body text-flora-forest hover:text-flora-copper transition-colors hover-underline-flora">
                    {s.value}
                  </a>
                </div>
              ))}
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            {status === 'success' ? (
              <div className="flex flex-col items-start justify-center h-full">
                <p className="font-display text-3xl text-flora-deep mb-4">Mensagem recebida. 🌿</p>
                <p className="font-body text-flora-forest/70">Obrigada por escrever. Responderei em breve.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-body text-flora-moss hover:text-flora-deep transition-colors hover-underline-flora">
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Nome" id="name" placeholder="Seu nome" value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} required />
                  <Input label="Email" id="email" type="email" placeholder="seu@email.com" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} required />
                </div>
                <Input label="Assunto" id="subject" placeholder="Sobre o que você quer falar?" value={form.subject} onChange={e => setForm(f=>({...f,subject:e.target.value}))} required />
                <Textarea label="Mensagem" id="message" rows={6} placeholder="Escreva sua mensagem..." value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} required />
                <Button type="submit" loading={status==='loading'} className="w-full justify-center">
                  Enviar mensagem
                </Button>
                {status === 'error' && <p className="text-sm font-body text-red-500">Algo deu errado. Tente novamente.</p>}
              </form>
            )}
          </AnimatedText>
        </div>
      </Section>
    </>
  )
}
