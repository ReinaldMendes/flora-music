'use client'
import { useState, useEffect } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { api } from '@/lib/api'

type Video = { id:string; youtubeId:string; title:string; category?:string; featured:boolean }
const empty = { youtubeId:'', title:'', description:'', category:'', featured:false }

export default function VideosAdminPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Video|null>(null)
  const [form, setForm] = useState<any>(empty)
  const [saving, setSaving] = useState(false)

  const load = async () => { setLoading(true); const { data } = await api.get('/videos'); setVideos(data); setLoading(false) }
  useEffect(() => { load() }, [])
  const openNew = () => { setEditing(null); setForm(empty); setModalOpen(true) }
  const openEdit = (v: Video) => { setEditing(v); setForm({ youtubeId:v.youtubeId, title:v.title, description:'', category:v.category||'', featured:v.featured }); setModalOpen(true) }
  const save = async () => { setSaving(true); editing ? await api.put(`/videos/${editing.id}`, form) : await api.post('/videos', form); setSaving(false); setModalOpen(false); load() }
  const remove = async (v: Video) => { if (!confirm(`Excluir "${v.title}"?`)) return; await api.delete(`/videos/${v.id}`); load() }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl text-flora-deep">Vídeos</h1><p className="font-body text-sm text-flora-moss mt-1">{videos.length} vídeos</p></div>
        <Button onClick={openNew}>+ Novo vídeo</Button>
      </div>
      <AdminTable loading={loading} data={videos} onEdit={openEdit} onDelete={remove} columns={[
        { key:'youtubeId', label:'YouTube ID', render: v => <a href={`https://youtu.be/${v.youtubeId}`} target="_blank" rel="noopener noreferrer" className="text-flora-copper hover:underline text-xs font-mono">{v.youtubeId}</a> },
        { key:'title', label:'Título' },
        { key:'category', label:'Categoria', render: v => <span className="text-xs text-flora-moss">{v.category||'—'}</span> },
        { key:'featured', label:'Destaque', render: v => <span className={`text-xs font-medium ${v.featured?'text-green-600':'text-flora-moss/35'}`}>{v.featured?'Sim':'Não'}</span> },
      ]}/>
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'Editar vídeo':'Novo vídeo'}>
        <div className="space-y-4">
          <Input label="YouTube ID" placeholder="ex: dQw4w9WgXcQ" value={form.youtubeId} onChange={e => setForm((f:any)=>({...f,youtubeId:e.target.value}))} required/>
          <Input label="Título" value={form.title} onChange={e => setForm((f:any)=>({...f,title:e.target.value}))} required/>
          <Textarea label="Descrição" rows={3} value={form.description} onChange={e => setForm((f:any)=>({...f,description:e.target.value}))}/>
          <Input label="Categoria" value={form.category} onChange={e => setForm((f:any)=>({...f,category:e.target.value}))} placeholder="Ex: Clipes, Acústico, Bastidores..."/>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.featured} onChange={e => setForm((f:any)=>({...f,featured:e.target.checked}))} className="w-4 h-4 accent-flora-deep"/><span className="text-sm font-body text-flora-forest">Destaque na Home</span></label>
          <div className="flex gap-3 pt-2"><Button onClick={save} loading={saving} className="flex-1 justify-center">Salvar</Button><Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button></div>
        </div>
      </AdminModal>
    </div>
  )
}