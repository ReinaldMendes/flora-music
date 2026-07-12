'use client'
import { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api } from '@/lib/api'

interface Cfg { site_name:string; site_description:string; spotify_url:string; instagram_url:string; youtube_url:string; whatsapp:string }
const defaults: Cfg = { site_name:'', site_description:'', spotify_url:'', instagram_url:'', youtube_url:'', whatsapp:'' }

export default function ConfigAdminPage() {
  const [config, setConfig] = useState<Cfg>(defaults)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.get('/config').then(({ data }) => {
      const cfg: any = { ...defaults }
      if (Array.isArray(data)) data.forEach((c: any) => { try { cfg[c.key] = JSON.parse(c.value) } catch { cfg[c.key] = c.value } })
      setConfig(cfg)
    }).finally(() => setLoading(false))
  }, [])

  async function save() {
    setSaving(true)
    await Promise.all(Object.entries(config).map(([key, value]) => api.post('/config', { key, value: JSON.stringify(value) })))
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <p className="font-body text-sm text-flora-moss animate-pulse">Carregando...</p>

  const fields: [keyof Cfg, string, string][] = [
    ['site_name', 'Nome do site', ''],
    ['site_description', 'Descrição', ''],
    ['spotify_url', 'URL do Spotify', 'https://open.spotify.com/artist/...'],
    ['instagram_url', 'URL do Instagram', 'https://instagram.com/...'],
    ['youtube_url', 'URL do YouTube', 'https://youtube.com/@...'],
    ['whatsapp', 'WhatsApp (com DDI)', '+5541999999999'],
  ]

  return (
    <div>
      <div className="mb-8"><h1 className="font-display text-3xl text-flora-deep">Configurações</h1><p className="font-body text-sm text-flora-moss mt-1">Links e informações gerais do site</p></div>
      <div className="bg-white border border-flora-moss/10 rounded p-6 max-w-xl space-y-5">
        {fields.map(([k, l, p]) => (
          <Input key={k} label={l} placeholder={p} value={config[k]} onChange={e => setConfig(c => ({...c, [k]: e.target.value}))}/>
        ))}
        <div className="pt-2 flex items-center gap-4">
          <Button onClick={save} loading={saving}>Salvar configurações</Button>
          {saved && <span className="text-sm font-body text-green-600">✓ Salvo!</span>}
        </div>
      </div>
    </div>
  )
}