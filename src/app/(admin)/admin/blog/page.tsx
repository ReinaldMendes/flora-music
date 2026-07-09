'use client'
import { useState, useEffect } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import ImageUploader from '@/components/admin/ImageUploader'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

type Post = { id:string; title:string; category?:string; published:boolean; publishedAt?:string; excerpt?:string; content:string; coverUrl?:string }
const empty = { title:'', content:'', excerpt:'', coverUrl:'', category:'', published:false }

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Post|null>(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  async function load() { setLoading(true); const r = await fetch('/api/blog'); setPosts(await r.json()); setLoading(false) }
  useEffect(() => { load() }, [])

  function openNew() { setEditing(null); setForm(empty); setModalOpen(true) }
  function openEdit(p: Post) { setEditing(p); setForm({ title:p.title, content:p.content, excerpt:p.excerpt||'', coverUrl:p.coverUrl||'', category:p.category||'', published:p.published }); setModalOpen(true) }

  async function save() {
    setSaving(true)
    const url = editing ? `/api/blog/${editing.id}` : '/api/blog'
    await fetch(url, { method: editing?'PUT':'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setSaving(false); setModalOpen(false); load()
  }
  async function remove(p: Post) { if(!confirm(`Excluir "${p.title}"?`)) return; await fetch(`/api/blog/${p.id}`, {method:'DELETE'}); load() }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-flora-deep">Blog</h1>
          <p className="font-body text-sm text-flora-moss mt-1">{posts.length} posts</p>
        </div>
        <Button onClick={openNew}>+ Novo post</Button>
      </div>

      <AdminTable loading={loading} data={posts} onEdit={openEdit} onDelete={remove} columns={[
        { key:'title', label:'Título' },
        { key:'category', label:'Categoria', render: p => <span className="text-flora-moss text-xs">{p.category||'—'}</span> },
        { key:'publishedAt', label:'Data', render: p => <span className="text-flora-moss text-xs">{p.publishedAt ? formatDate(p.publishedAt) : '—'}</span> },
        { key:'published', label:'Status', render: p => <span className={`text-xs font-medium ${p.published?'text-green-600':'text-yellow-600'}`}>{p.published?'Publicado':'Rascunho'}</span> },
      ]} />

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'Editar post':'Novo post'} size="xl">
        <div className="space-y-4">
          <Input label="Título" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Categoria" value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))} placeholder="Ex: Reflexão, Bastidores..." />
          </div>
          <Textarea label="Resumo (excerpt)" rows={2} value={form.excerpt} onChange={e => setForm(f=>({...f,excerpt:e.target.value}))} />
          <Textarea label="Conteúdo" rows={12} value={form.content} onChange={e => setForm(f=>({...f,content:e.target.value}))} placeholder="Escreva o conteúdo completo do post..." />
          <ImageUploader label="Imagem de capa" value={form.coverUrl} onChange={url => setForm(f=>({...f,coverUrl:url}))} folder="blog" />
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.published} onChange={e => setForm(f=>({...f,published:e.target.checked}))} className="w-4 h-4 accent-flora-deep" />
            <span className="text-sm font-body text-flora-forest">Publicar agora</span>
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
