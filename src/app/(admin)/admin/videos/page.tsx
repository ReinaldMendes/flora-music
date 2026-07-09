'use client'
import { useState, useEffect } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

type Video = { id:string; youtubeId:string; title:string; category?:string; featured:boolean }
const empty = { youtubeId:'', title:'', description:'', category:'', featured:false }

export default function VideosAdminPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Video|null>(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  async function load() { setLoading(true); const r = await fetch('/api/videos'); setVideos(await r.json()); setLoading(false) }
  useEffect(() => { load() }, [])
  function openNew() { setEditing(null); setForm(empty); setModalOpen(true) }
  function openEdit(v: Video) { setEditing(v); setForm({ youtubeId:v.youtubeId, title:v.title, description:'', category:v.category||'', featured:v.featured }); setModalOpen(true) }
  async function save() {
    setSaving(true)
    const url = editing ? `/api/videos/${editing.id}` : '/api/videos'
    await fetch(url, { method: editing?'PUT':'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setSaving(false); setModalOpen(false); load()
  }
  async function remove(v: Video) { if(!confirm(`Excluir "${v.title}"?`)) return; await fetch(`/api/videos/${v.id}`, {method:'DELETE'}); load() }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-flora-deep">Vídeos</h1>
          <p className="font-body text-sm text-flora-moss mt-1">{videos.length} vídeos cadastrados</p>
        </div>
        <Button onClick={openNew}>+ Novo vídeo</Button>
      </div>
      <AdminTable loading={loading} data={videos} onEdit={openEdit} onDelete={remove} columns={[
        { key:'youtubeId', label:'YouTube ID', render: v => (
          <a href={`https://youtu.be/${v.youtubeId}`} target="_blank" rel="noopener noreferrer" className="text-flora-copper hover:underline text-xs font-mono">{v.youtubeId}</a>
        )},
        { key:'title', label:'Título' },
        { key:'category', label:'Categoria', render: v => <span className="text-xs text-flora-moss">{v.category||'—'}</span> },
        { key:'featured', label:'Destaque', render: v => <span className={`text-xs font-medium ${v.featured?'text-green-600':'text-flora-moss/40'}`}>{v.featured?'Sim':'Não'}</span> },
      ]} />
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'Editar vídeo':'Novo vídeo'}>
        <div className="space-y-4">
          <Input label="YouTube ID" placeholder="ex: dQw4w9WgXcQ" value={form.youtubeId} onChange={e => setForm(f=>({...f,youtubeId:e.target.value}))} required />
          <Input label="Título" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} required />
          <Textarea label="Descrição" rows={3} value={form.description as string} onChange={e => setForm(f=>({...f,description:e.target.value}))} />
          <Input label="Categoria" value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))} placeholder="Ex: Clipes, Acústico, Bastidores..." />
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(f=>({...f,featured:e.target.checked}))} className="w-4 h-4 accent-flora-deep" />
            <span className="text-sm font-body text-flora-forest">Destaque na Home</span>
          </label>
          <div className="flex gap-3 pt-2">
            <Button onClick={save} loading={saving} className="flex-1 justify-center">Salvar</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}
