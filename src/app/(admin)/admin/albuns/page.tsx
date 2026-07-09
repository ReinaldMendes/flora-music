'use client'
import { useState, useEffect } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import ImageUploader from '@/components/admin/ImageUploader'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

type Album = { id: string; title: string; type: string; published: boolean; featured: boolean; releaseDate: string; coverUrl: string; description?: string; streamingLinks?: any }

const emptyForm = { title: '', releaseDate: '', coverUrl: '', description: '', type: 'LP' as 'LP'|'EP'|'SINGLE', featured: false, published: false, streamingLinks: { spotify: '', youtube: '', deezer: '' } }

export default function AlbunsAdminPage() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Album | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch('/api/albuns')
    setAlbums(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openNew() { setEditing(null); setForm(emptyForm); setModalOpen(true) }
  function openEdit(album: Album) {
    setEditing(album)
    setForm({
      title: album.title, releaseDate: album.releaseDate?.split('T')[0] || '', coverUrl: album.coverUrl,
      description: album.description || '', type: album.type as any, featured: album.featured,
      published: album.published, streamingLinks: album.streamingLinks || { spotify: '', youtube: '', deezer: '' },
    })
    setModalOpen(true)
  }

  async function save() {
    setSaving(true)
    const url = editing ? `/api/albuns/${editing.id}` : '/api/albuns'
    const method = editing ? 'PUT' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false)
    setModalOpen(false)
    load()
  }

  async function remove(album: Album) {
    if (!confirm(`Excluir "${album.title}"?`)) return
    await fetch(`/api/albuns/${album.id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-flora-deep">Álbuns</h1>
          <p className="font-body text-sm text-flora-moss mt-1">{albums.length} {albums.length === 1 ? 'álbum' : 'álbuns'} cadastrados</p>
        </div>
        <Button onClick={openNew}>+ Novo álbum</Button>
      </div>

      <AdminTable
        loading={loading}
        data={albums}
        onEdit={openEdit}
        onDelete={remove}
        columns={[
          { key: 'coverUrl', label: '', render: (a) => (
            <div className="w-10 h-10 rounded overflow-hidden bg-flora-moss/10 flex-shrink-0">
              {a.coverUrl && <img src={a.coverUrl} alt={a.title} className="w-full h-full object-cover" />}
            </div>
          ), className: 'w-14' },
          { key: 'title', label: 'Título' },
          { key: 'type', label: 'Tipo', render: (a) => <Badge variant="moss">{a.type}</Badge> },
          { key: 'releaseDate', label: 'Lançamento', render: (a) => <span className="text-flora-moss">{formatDate(a.releaseDate)}</span> },
          { key: 'published', label: 'Status', render: (a) => (
            <span className={`text-xs font-body font-medium ${a.published ? 'text-green-600' : 'text-yellow-600'}`}>
              {a.published ? 'Publicado' : 'Rascunho'}
            </span>
          )},
        ]}
      />

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar álbum' : 'Novo álbum'} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Título" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} required className="col-span-2" />
            <Input label="Data de lançamento" type="date" value={form.releaseDate} onChange={e => setForm(f=>({...f,releaseDate:e.target.value}))} />
            <div>
              <label className="text-sm font-body font-medium text-flora-forest block mb-1.5">Tipo</label>
              <select value={form.type} onChange={e => setForm(f=>({...f,type:e.target.value as any}))} className="w-full px-4 py-3 border border-flora-moss/30 rounded text-sm font-body text-flora-deep focus:outline-none focus:border-flora-forest">
                {['LP','EP','SINGLE'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <Textarea label="Descrição" rows={3} value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} />
          <ImageUploader label="Capa do álbum" value={form.coverUrl} onChange={url => setForm(f=>({...f,coverUrl:url}))} folder="albuns" />
          <div>
            <p className="text-sm font-body font-medium text-flora-forest mb-3">Links de streaming</p>
            <div className="space-y-2">
              {['spotify','youtube','deezer'].map(platform => (
                <Input key={platform} label={platform.charAt(0).toUpperCase()+platform.slice(1)}
                  placeholder={`https://${platform}.com/...`}
                  value={form.streamingLinks[platform as keyof typeof form.streamingLinks] || ''}
                  onChange={e => setForm(f=>({...f,streamingLinks:{...f.streamingLinks,[platform]:e.target.value}}))}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured} onChange={e => setForm(f=>({...f,featured:e.target.checked}))} className="w-4 h-4 accent-flora-deep" />
              <span className="text-sm font-body text-flora-forest">Destaque</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={e => setForm(f=>({...f,published:e.target.checked}))} className="w-4 h-4 accent-flora-deep" />
              <span className="text-sm font-body text-flora-forest">Publicado</span>
            </label>
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
