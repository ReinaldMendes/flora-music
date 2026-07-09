'use client'
import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface Config { spotify_url:string; instagram_url:string; youtube_url:string; whatsapp:string; site_description:string }
const defaults: Config = { spotify_url:'', instagram_url:'', youtube_url:'', whatsapp:'', site_description:'' }

export default function ConfigAdminPage() {
  const [config, setConfig] = useState<Config>(defaults)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const keys = ['spotify_url','instagram_url','youtube_url','whatsapp','site_description']
    Promise.all(keys.map(k => fetch(`/api/config?key=${k}`).then(r=>r.ok?r.json():null)))
      .then(results => {
        const cfg: any = { ...defaults }
        results.forEach((r, i) => { if(r) cfg[keys[i]] = typeof r.value === 'string' ? r.value : JSON.parse(r.value||'""') })
        setConfig(cfg); setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function save() {
    setSaving(true)
    const entries = Object.entries(config)
    await Promise.all(entries.map(([key, value]) =>
      fetch('/api/config', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ key, value: JSON.stringify(value) }) })
    ))
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <p className="font-body text-sm text-flora-moss animate-pulse">Carregando configurações...</p>

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-flora-deep">Configurações</h1>
        <p className="font-body text-sm text-flora-moss mt-1">Links e informações gerais do site</p>
      </div>
      <div className="bg-white border border-flora-moss/10 rounded p-6 max-w-xl space-y-5">
        <Input label="Descrição do site" value={config.site_description} onChange={e => setConfig(c=>({...c,site_description:e.target.value}))} />
        <Input label="URL do Spotify" value={config.spotify_url} onChange={e => setConfig(c=>({...c,spotify_url:e.target.value}))} placeholder="https://open.spotify.com/artist/..." />
        <Input label="URL do Instagram" value={config.instagram_url} onChange={e => setConfig(c=>({...c,instagram_url:e.target.value}))} placeholder="https://instagram.com/..." />
        <Input label="URL do YouTube" value={config.youtube_url} onChange={e => setConfig(c=>({...c,youtube_url:e.target.value}))} placeholder="https://youtube.com/@..." />
        <Input label="WhatsApp (com DDI)" value={config.whatsapp} onChange={e => setConfig(c=>({...c,whatsapp:e.target.value}))} placeholder="+5541999999999" />
        <div className="pt-2 flex items-center gap-4">
          <Button onClick={save} loading={saving}>Salvar configurações</Button>
          {saved && <span className="text-sm font-body text-green-600">✓ Salvo!</span>}
        </div>
      </div>
    </div>
  )
}
