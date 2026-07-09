'use client'
import { useState, useEffect } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

type Show = { id: string; title: string; date: string; venue: string; city: string; state: string; status: string; ticketUrl?: string; featured: boolean }
const statusOpts = ['UPCOMING','SOLD_OUT','CANCELLED','DONE']
const empty = { title:'', date:'', venue:'', city:'', state:'', ticketUrl:'', status:'UPCOMING', featured: false }

export default function ShowsAdminPage() {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Show|null>(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  async function load() { setLoading(true); const r = await fetch('/api/shows'); setShows(await r.json()); setLoading(false) }
  useEffect(() => { load() }, [])

  function openNew() { setEditing(null); setForm(empty); setModalOpen(true) }
  function openEdit(s: Show) { setEditing(s); setForm({ title:s.title, date:s.date?.split('T')[0]||'', venue:s.venue, city:s.city, state:s.state, ticketUrl:s.ticketUrl||'', status:s.status, featured:s.featured }); setModalOpen(true) }

  async function save() {
    setSaving(true)
    const url = editing ? `/api/shows/${editing.id}` : '/api/shows'
    await fetch(url, { method: editing ? 'PUT':'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setSaving(false); setModalOpen(false); load()
  }
  async function remove(s: Show) { if(!confirm(`Excluir "${s.title}"?`)) return; await fetch(`/api/shows/${s.id}`, {method:'DELETE'}); load() }

  const statusLabel: Record<string,string> = { UPCOMING:'Em breve', SOLD_OUT:'Esgotado', CANCELLED:'Cancelado', DONE:'Realizado' }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl text-flora-deep">Agenda</h1>
          <p className="font-body text-sm text-flora-moss mt-1">{shows.length} shows cadastrados</p>
        </div>
        <Button onClick={openNew}>+ Novo show</Button>
      </div>

      <AdminTable loading={loading} data={shows} onEdit={openEdit} onDelete={remove} columns={[
        { key:'title', label:'Show' },
        { key:'date',  label:'Data', render: s => <span className="text-flora-moss">{formatDate(s.date)}</span> },
        { key:'venue', label:'Local', render: s => <span className="text-flora-moss">{s.venue} · {s.city}/{s.state}</span> },
        { key:'status', label:'Status', render: s => <Badge variant={s.status==='UPCOMING'?'moss':'default'}>{statusLabel[s.status]}</Badge> },
      ]} />

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar show' : 'Novo show'}>
        <div className="space-y-4">
          <Input label="Título" value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Data" type="date" value={form.date} onChange={e => setForm(f=>({...f,date:e.target.value}))} required />
            <div>
              <label className="text-sm font-body font-medium text-flora-forest block mb-1.5">Status</label>
              <select value={form.status} onChange={e => setForm(f=>({...f,status:e.target.value}))} className="w-full px-4 py-3 border border-flora-moss/30 rounded text-sm font-body focus:outline-none">
                {statusOpts.map(s => <option key={s} value={s}>{statusLabel[s]}</option>)}
              </select>
            </div>
          </div>
          <Input label="Local / Casa de show" value={form.venue} onChange={e => setForm(f=>({...f,venue:e.target.value}))} required />
          <div className="grid grid-cols-3 gap-4">
            <Input label="Cidade" value={form.city} onChange={e => setForm(f=>({...f,city:e.target.value}))} className="col-span-2" required />
            <Input label="UF" maxLength={2} value={form.state} onChange={e => setForm(f=>({...f,state:e.target.value.toUpperCase()}))} required />
          </div>
          <Input label="Link de ingressos" value={form.ticketUrl} onChange={e => setForm(f=>({...f,ticketUrl:e.target.value}))} placeholder="https://..." />
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
