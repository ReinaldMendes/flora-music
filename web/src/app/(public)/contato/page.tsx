'use client'
import { useState } from 'react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Section from '@/components/ui/Section'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { api } from '@/lib/api'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/flora.musica', value: '@flora.musica' },
  { label: 'Spotify',   href: 'https://open.spotify.com',           value: 'Flora' },
  { label: 'YouTube',   href: 'https://youtube.com/@floramusica',   value: '@floramusica' },
  { label: 'WhatsApp',  href: 'https://wa.me/5541999999999',        value: '+55 (41) 99999-9999' },
  { label: 'Email',     href: 'mailto:contato@floramusica.com.br',  value: 'contato@floramusica.com.br' },
]

export default function ContatoPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setStatus('loading')
    try { await api.post('/contato', form); setStatus('success'); setForm({ name:'', email:'', subject:'', message:'' }) }
    catch { setStatus('error') }
  }

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-offwhite border-b border-flora-moss/10">
        <div className="container-flora">
          <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-3">Fale comigo</p>
          <h1 className="font-display text-title text-flora-deep">Contato</h1>
        </div>
      </div>
      <Section className="bg-flora-offwhite">
        <div className="grid md:grid-cols-2 gap-16">
          <AnimatedSection>
            <h2 className="font-display text-h2 text-flora-deep mb-6">Vamos conversar</h2>
            <p className="font-body text-flora-forest/65 leading-relaxed mb-12">Para shows, parcerias, imprensa, ou simplesmente para dizer que uma canção te tocou.</p>
            <div className="space-y-4">
              {socials.map(s => (
                <div key={s.label} className="flex items-center gap-6 py-3 border-b border-flora-moss/10">
                  <span className="text-xs font-body text-flora-moss/50 min-w-[80px] uppercase tracking-wide">{s.label}</span>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm font-body text-flora-forest hover:text-flora-copper transition-colors underline-flora">{s.value}</a>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            {status === 'success' ? (
              <div className="flex flex-col items-start justify-center h-full">
                <p className="font-display text-3xl text-flora-deep mb-4">Mensagem recebida. 🌿</p>
                <p className="font-body text-flora-forest/65">Obrigada por escrever. Responderei em breve.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-body text-flora-moss hover:text-flora-deep transition-colors underline-flora">Enviar outra mensagem</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Nome" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
                  <Input label="Email" type="email" required value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
                </div>
                <Input label="Assunto" required value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} />
                <Textarea label="Mensagem" rows={6} required value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} />
                <Button type="submit" loading={status === 'loading'} className="w-full justify-center">Enviar mensagem</Button>
                {status === 'error' && <p className="text-sm text-red-500">Algo deu errado. Tente novamente.</p>}
              </form>
            )}
          </AnimatedSection>
        </div>
      </Section>
    </>
  )
}