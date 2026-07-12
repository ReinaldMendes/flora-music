'use client'
import { useState, useEffect } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import ImageUploader from '@/components/admin/ImageUploader'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'

type Album = { id:string; title:string; type:string; published:boolean; featured:boolean; releaseDate:string; coverUrl:string; description?:string; streamingLinks?:any }
const empty = { title:'', releaseDate:'', coverUrl:'', description:'', type:'LP', featured:false, published:false, streamingLinks:{ spotify:'', youtube:'', deezer:'' } }

export default function AlbunsAdminPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Album|null>(null)
  const [form, setForm] = useState<any>(empty)
  const [saving, setSaving] = useState(false)

  const load = async () => { setLoading(true); const { data } = await api.get('/albuns'); setAlbums(data); setLoading(false) }
  useEffect(() => { load() }, [])

  const openNew  = () => { setEditing(null); setForm(empty); setModalOpen(true) }
  const openEdit = (a: Album) => { setEditing(a); setForm({ title:a.title, releaseDate:a.releaseDate?.split('T')[0]||'', coverUrl:a.coverUrl, description:a.description||'', type:a.type, featured:a.featured, published:a.published, streamingLinks:a.streamingLinks||{ spotify:'', youtube:'', deezer:'' } }); setModalOpen(true) }

  const save = async () => {
    setSaving(true)
    editing ? await api.put(`/albuns/${editing.id}`, form) : await api.post('/albuns', form)
    setSaving(false); setModalOpen(false); load()
  }
  const remove = async (a: Album) => { if (!confirm(`Excluir "${a.title}"?`)) return; await api.delete(`/albuns/${a.id}`); load() }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl text-flora-deep">Álbuns</h1><p className="font-body text-sm text-flora-moss mt-1">{albums.length} álbuns</p></div>
        <Button onClick={openNew}>+ Novo álbum</Button>
      </div>
      <AdminTable loading={loading} data={albums} onEdit={openEdit} onDelete={remove} columns={[
        { key:'coverUrl', label:'', className:'w-14', render: a => <div className="w-10 h-10 rounded overflow-hidden bg-flora-moss/10">{a.coverUrl && <img src={a.coverUrl} alt={a.title} className="w-full h-full object-cover"/>}</div> },
        { key:'title', label:'Título' },
        { key:'type',  label:'Tipo', render: a => <Badge variant="moss">{a.type}</Badge> },
        { key:'releaseDate', label:'Lançamento', render: a => <span className="text-flora-moss">{formatDate(a.releaseDate)}</span> },
        { key:'published', label:'Status', render: a => <span className={`text-xs font-medium ${a.published?'text-green-600':'text-yellow-600'}`}>{a.published?'Publicado':'Rascunho'}</span> },
      ]}/>
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'Editar álbum':'Novo álbum'} size="lg">
        <div className="space-y-4">
          <Input label="Título" value={form.title} onChange={e => setForm((f:any)=>({...f,title:e.target.value}))} required/>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Data de lançamento" type="date" value={form.releaseDate} onChange={e => setForm((f:any)=>({...f,releaseDate:e.target.value}))}/>
            <div><label className="text-sm font-body font-medium text-flora-forest block mb-1.5">Tipo</label>
              <select value={form.type} onChange={e => setForm((f:any)=>({...f,type:e.target.value}))} className="w-full px-4 py-3 border border-flora-moss/30 rounded text-sm font-body focus:outline-none">
                {['LP','EP','SINGLE'].map(t => <option key={t} value={t}>{t}</option>)}</select></div>
          </div>
          <Textarea label="Descrição" rows={3} value={form.description} onChange={e => setForm((f:any)=>({...f,description:e.target.value}))}/>
          <ImageUploader label="Capa do álbum" value={form.coverUrl} onChange={url => setForm((f:any)=>({...f,coverUrl:url}))} folder="albuns"/>
          <div><p className="text-sm font-body font-medium text-flora-forest mb-3">Links de streaming</p>
            <div className="space-y-2">
              {['spotify','youtube','deezer'].map(p => (
                <Input key={p} label={p.charAt(0).toUpperCase()+p.slice(1)} placeholder={`https://${p}.com/...`} value={form.streamingLinks[p]||''} onChange={e => setForm((f:any)=>({...f,streamingLinks:{...f.streamingLinks,[p]:e.target.value}}))}/>
              ))}
            </div>
          </div>
          <div className="flex gap-6">
            {[['featured','Destaque'],['published','Publicado']].map(([k,l]) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form[k]} onChange={e => setForm((f:any)=>({...f,[k]:e.target.checked}))} className="w-4 h-4 accent-flora-deep"/>
                <span className="text-sm font-body text-flora-forest">{l}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <Button onClick={save} loading={saving} className="flex-1 justify-center">Salvar</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}