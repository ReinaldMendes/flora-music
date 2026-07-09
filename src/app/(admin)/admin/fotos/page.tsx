'use client'
import { useState, useEffect } from 'react'
import AdminModal from '@/components/admin/AdminModal'
import ImageUploader from '@/components/admin/ImageUploader'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Image from 'next/image'

type Photo = { id:string; url:string; caption?:string; category?:string; featured:boolean; order:number }
const empty = { url:'', caption:'', category:'', featured:false, order:0 }

export default function FotosAdminPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  async function load() { setLoading(true); const r = await fetch('/api/fotos'); setPhotos(await r.json()); setLoading(false) }
  useEffect(() => { load() }, [])

  async function save() {
    setSaving(true)
    await fetch('/api/fotos', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setSaving(false); setModalOpen(false); setForm(empty); load()
  }
  async function remove(id: string) { if(!confirm('Excluir esta foto?')) return; await fetch(`/api/fotos/${id}`, {method:'DELETE'}); load() }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-flora-deep">Galeria</h1>
          <p className="font-body text-sm text-flora-moss mt-1">{photos.length} fotos na galeria</p>
        </div>
        <Button onClick={() => { setForm(empty); setModalOpen(true) }}>+ Adicionar foto</Button>
      </div>

      {loading ? <p className="font-body text-sm text-flora-moss animate-pulse">Carregando...</p> : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {photos.map(photo => (
            <div key={photo.id} className="relative group aspect-square rounded overflow-hidden bg-flora-moss/10">
              <Image src={photo.url} alt={photo.caption||''} fill className="object-cover" sizes="200px" />
              <div className="absolute inset-0 bg-flora-deep/0 group-hover:bg-flora-deep/60 transition-colors flex items-center justify-center">
                <button onClick={() => remove(photo.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-body text-red-300 hover:text-red-200">
                  ✕ Excluir
                </button>
              </div>
              {photo.featured && <span className="absolute top-2 left-2 w-2 h-2 bg-flora-copper rounded-full" title="Destaque" />}
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title="Adicionar foto">
        <div className="space-y-4">
          <ImageUploader label="Foto" value={form.url} onChange={url => setForm(f=>({...f,url}))} folder="galeria" />
          <Input label="Legenda" value={form.caption} onChange={e => setForm(f=>({...f,caption:e.target.value}))} />
          <Input label="Categoria" value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))} placeholder="Ex: Shows, Bastidores, Natureza..." />
          <Input label="Ordem" type="number" value={String(form.order)} onChange={e => setForm(f=>({...f,order:parseInt(e.target.value)||0}))} />
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={e => setForm(f=>({...f,featured:e.target.checked}))} className="w-4 h-4 accent-flora-deep" />
            <span className="text-sm font-body text-flora-forest">Foto em destaque</span>
          </label>
          <div className="flex gap-3 pt-2">
            <Button onClick={save} loading={saving} className="flex-1 justify-center">Adicionar</Button>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
          </div>
        </div>
      </AdminModal>
    </div>
  )
}
