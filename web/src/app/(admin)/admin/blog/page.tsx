'use client'
import { useState, useEffect } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import ImageUploader from '@/components/admin/ImageUploader'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'

type Post = { id:string; title:string; category?:string; published:boolean; publishedAt?:string; content:string; coverUrl?:string; excerpt?:string }
const empty = { title:'', content:'', excerpt:'', coverUrl:'', category:'', published:false }

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Post|null>(null)
  const [form, setForm] = useState<any>(empty)
  const [saving, setSaving] = useState(false)

  const load = async () => { setLoading(true); const { data } = await api.get('/blog'); setPosts(data); setLoading(false) }
  useEffect(() => { load() }, [])
  const openNew = () => { setEditing(null); setForm(empty); setModalOpen(true) }
  const openEdit = (p: Post) => { setEditing(p); setForm({ title:p.title, content:p.content, excerpt:p.excerpt||'', coverUrl:p.coverUrl||'', category:p.category||'', published:p.published }); setModalOpen(true) }
  const save = async () => { setSaving(true); editing ? await api.put(`/blog/${editing.id}`, form) : await api.post('/blog', form); setSaving(false); setModalOpen(false); load() }
  const remove = async (p: Post) => { if (!confirm(`Excluir "${p.title}"?`)) return; await api.delete(`/blog/${p.id}`); load() }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-display text-3xl text-flora-deep">Blog</h1><p className="font-body text-sm text-flora-moss mt-1">{posts.length} posts</p></div>
        <Button onClick={openNew}>+ Novo post</Button>
      </div>
      <AdminTable loading={loading} data={posts} onEdit={openEdit} onDelete={remove} columns={[
        { key:'title', label:'Título' },
        { key:'category', label:'Categoria', render: p => <span className="text-xs text-flora-moss">{p.category||'—'}</span> },
        { key:'publishedAt', label:'Data', render: p => <span className="text-xs text-flora-moss">{p.publishedAt?formatDate(p.publishedAt):'—'}</span> },
        { key:'published', label:'Status', render: p => <span className={`text-xs font-medium ${p.published?'text-green-600':'text-yellow-600'}`}>{p.published?'Publicado':'Rascunho'}</span> },
      ]}/>
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'Editar post':'Novo post'} size="xl">
        <div className="space-y-4">
          <Input label="Título" value={form.title} onChange={e => setForm((f:any)=>({...f,title:e.target.value}))} required/>
          <Input label="Categoria" value={form.category} onChange={e => setForm((f:any)=>({...f,category:e.target.value}))} placeholder="Ex: Reflexão, Bastidores..."/>
          <Textarea label="Resumo (excerpt)" rows={2} value={form.excerpt} onChange={e => setForm((f:any)=>({...f,excerpt:e.target.value}))}/>
          <Textarea label="Conteúdo" rows={14} value={form.content} onChange={e => setForm((f:any)=>({...f,content:e.target.value}))} placeholder="Escreva o conteúdo completo..."/>
          <ImageUploader label="Imagem de capa" value={form.coverUrl} onChange={url => setForm((f:any)=>({...f,coverUrl:url}))} folder="blog"/>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.published} onChange={e => setForm((f:any)=>({...f,published:e.target.checked}))} className="w-4 h-4 accent-flora-deep"/><span className="text-sm font-body text-flora-forest">Publicar agora</span></label>
          <div className="flex gap-3 pt-2"><Button onClick={save} loading={saving} className="flex-1 justify-center">Salvar</Button><Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button></div>
        </div>
      </AdminModal>
    </div>
  )
}