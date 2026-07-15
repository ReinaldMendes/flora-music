'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import { fetchApi } from '@/lib/fetch-api'

const socials = [
  { label:'Instagram', href:'https://instagram.com/flora.musica', handle:'@flora.musica' },
  { label:'Spotify',   href:'https://open.spotify.com',           handle:'Flora Eça' },
  { label:'YouTube',   href:'https://youtube.com/@floramusica',   handle:'@floramusica' },
  { label:'TikTok',    href:'https://tiktok.com/@floramusica',    handle:'@floramusica' },
]

export default function ContatoPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setStatus('loading')
    try {
      await fetchApi('/contato', null, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)
      })
      setStatus('success'); setForm({ name:'',email:'',subject:'',message:'' })
    } catch { setStatus('error') }
  }

  const inputCls = "w-full px-0 py-4 bg-transparent border-0 border-b border-forest-deep/15 text-neutral-dark font-body text-base placeholder:text-neutral-mid/40 focus:outline-none focus:border-terra-dark transition-colors duration-300"

  return (
    <>
      <div className="pt-40 pb-20 section-cream border-b border-forest-deep/8">
        <div className="container-flora">
          <Reveal><span className="tag-flora text-forest-moss/60 block mb-6">Contato</span></Reveal>
          <TextReveal text="Vamos conversar." as="h1" className="font-display text-forest-deep"
            style={{ fontSize: 'clamp(3.5rem,10vw,10rem)', letterSpacing: '-0.035em', lineHeight: '0.92' } as any}/>
        </div>
      </div>

      <section className="section-flora section-cream">
        <div className="container-flora grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          {/* Info */}
          <div>
            <Reveal direction="up">
              <p className="font-body text-neutral-mid leading-relaxed mb-16" style={{ fontSize: '1.0625rem' }}>
                Para shows, parcerias, imprensa ou simplesmente para dizer que uma canção te tocou — este é o lugar.
              </p>
            </Reveal>
            <div className="space-y-10 mb-16">
              <Reveal direction="up" delay={0.1}>
                <div>
                  <p className="tag-flora text-forest-sage/60 mb-3">Shows & Produção</p>
                  <a href="mailto:alinefpimentel@gmail.com" className="font-body text-lg text-forest-deep hover:text-terra-dark transition-colors duration-300">
                    alinefpimentel@gmail.com
                  </a>
                </div>
              </Reveal>
              <div className="w-12 h-px bg-forest-deep/10"/>
              <Reveal direction="up" delay={0.2}>
                <div>
                  <p className="tag-flora text-forest-sage/60 mb-3">Contato pessoal</p>
                  <a href="mailto:floramusicacontato@gmail.com" className="font-body text-lg text-forest-deep hover:text-terra-dark transition-colors duration-300">
                    floramusicacontato@gmail.com
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal direction="up" delay={0.3}>
              <div>
                <p className="tag-flora text-forest-sage/60 mb-6">Redes sociais</p>
                <div className="space-y-3">
                  {socials.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between py-3 border-b border-forest-deep/6 hover:border-terra-dark/20 group transition-colors">
                      <span className="font-body text-sm text-neutral-mid group-hover:text-forest-deep transition-colors">{s.label}</span>
                      <span className="font-body text-sm text-neutral-mid/50 group-hover:text-terra-dark transition-colors">{s.handle} →</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Formulário */}
          <div>
            {status === 'success' ? (
              <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} className="py-16">
                <p className="font-display text-3xl text-forest-deep mb-4" style={{ letterSpacing:'-0.02em' }}>
                  Mensagem recebida. 🌿
                </p>
                <p className="font-body text-neutral-mid">Obrigada por escrever. Responderei em breve.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 tag-flora text-forest-moss hover:text-terra-dark transition-colors">
                  Enviar outra mensagem
                </button>
              </motion.div>
            ) : (
              <Reveal direction="up" delay={0.2}>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="tag-flora text-forest-moss/60 block mb-2">Nome</label>
                      <input type="text" required placeholder="Seu nome" value={form.name}
                        onChange={e => setForm(f=>({...f,name:e.target.value}))} className={inputCls}/>
                    </div>
                    <div>
                      <label className="tag-flora text-forest-moss/60 block mb-2">E-mail</label>
                      <input type="email" required placeholder="seu@email.com" value={form.email}
                        onChange={e => setForm(f=>({...f,email:e.target.value}))} className={inputCls}/>
                    </div>
                  </div>
                  <div>
                    <label className="tag-flora text-forest-moss/60 block mb-2">Assunto</label>
                    <input type="text" required placeholder="Sobre o que quer conversar?" value={form.subject}
                      onChange={e => setForm(f=>({...f,subject:e.target.value}))} className={inputCls}/>
                  </div>
                  <div>
                    <label className="tag-flora text-forest-moss/60 block mb-2">Mensagem</label>
                    <textarea required rows={5} placeholder="Escreva sua mensagem..." value={form.message}
                      onChange={e => setForm(f=>({...f,message:e.target.value}))}
                      className={inputCls + ' resize-none'}/>
                  </div>
                  {status === 'error' && <p className="text-sm font-body text-red-500/70">Algo deu errado. Tente novamente.</p>}
                  <button type="submit" disabled={status==='loading'}
                    className="btn-flora-light btn-flora">
                    <span>{status==='loading' ? 'Enviando...' : 'Enviar mensagem'}</span>
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
