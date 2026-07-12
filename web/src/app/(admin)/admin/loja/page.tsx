'use client'
import { useState, useEffect } from 'react'
import AdminTable from '@/components/admin/AdminTable'
import AdminModal from '@/components/admin/AdminModal'
import ImageUploader from '@/components/admin/ImageUploader'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import { api } from '@/lib/api'
import { formatPrice, formatDate } from '@/lib/utils'

type Product = { id:string; name:string; category:string; price:number; stock:number; featured:boolean; active:boolean; images:string[] }
type Order = { id:string; customerName:string; customerEmail:string; total:number; status:string; createdAt:string; items:any[] }
const empty = { name:'', description:'', price:0, images:[] as string[], stock:0, category:'', featured:false, active:true }
const statusLabel: Record<string,string> = { PENDING:'Pendente', PAID:'Pago', SHIPPED:'Enviado', DELIVERED:'Entregue', CANCELLED:'Cancelado' }
const statusColor: Record<string,string> = { PENDING:'text-yellow-600', PAID:'text-green-600', SHIPPED:'text-blue-600', DELIVERED:'text-flora-forest', CANCELLED:'text-red-500' }

export default function LojaAdminPage() {
  const [tab, setTab] = useState<'produtos'|'pedidos'>('produtos')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product|null>(null)
  const [form, setForm] = useState<any>(empty)
  const [imageUrl, setImageUrl] = useState('')
  const [saving, setSaving] = useState(false)

  const load = async () => {
    setLoading(true)
    const [{ data: pr }, { data: or }] = await Promise.all([api.get('/loja/produtos'), api.get('/loja/pedidos')])
    setProducts(pr); setOrders(or); setLoading(false)
  }
  useEffect(() => { load() }, [])

  const openNew = () => { setEditing(null); setForm(empty); setImageUrl(''); setModalOpen(true) }
  const openEdit = (p: Product) => { setEditing(p); setForm({ name:p.name, description:'', price:p.price, images:p.images||[], stock:p.stock, category:p.category, featured:p.featured, active:p.active }); setImageUrl(p.images?.[0]||''); setModalOpen(true) }
  const save = async () => {
    setSaving(true)
    const body = { ...form, price: Number(form.price), stock: Number(form.stock), images: imageUrl ? [imageUrl] : form.images }
    editing ? await api.put(`/loja/produtos/${editing.id}`, body) : await api.post('/loja/produtos', body)
    setSaving(false); setModalOpen(false); load()
  }
  const remove = async (p: Product) => { if (!confirm(`Excluir "${p.name}"?`)) return; await api.delete(`/loja/produtos/${p.id}`); load() }
  const updateStatus = async (id: string, status: string) => { await api.put(`/loja/pedidos/${id}`, { status }); load() }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-flora-deep">Loja</h1>
        {tab === 'produtos' && <Button onClick={openNew}>+ Novo produto</Button>}
      </div>
      <div className="flex gap-1 mb-6 bg-flora-offwhite border border-flora-moss/10 rounded p-1 w-fit">
        {(['produtos','pedidos'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 text-sm font-body rounded transition-colors ${tab===t?'bg-white text-flora-deep shadow-sm':'text-flora-moss hover:text-flora-deep'}`}>
            {t.charAt(0).toUpperCase()+t.slice(1)}
          </button>
        ))}
      </div>
      {tab === 'produtos' ? (
        <AdminTable loading={loading} data={products} onEdit={openEdit} onDelete={remove} columns={[
          { key:'name', label:'Produto' },
          { key:'category', label:'Categoria', render: p => <span className="text-xs text-flora-moss">{p.category}</span> },
          { key:'price', label:'Preço', render: p => <span className="font-medium">{formatPrice(p.price)}</span> },
          { key:'stock', label:'Estoque', render: p => <span className={p.stock===0?'text-red-400':'text-flora-forest'}>{p.stock}</span> },
          { key:'active', label:'Status', render: p => <span className={`text-xs font-medium ${p.active?'text-green-600':'text-red-400'}`}>{p.active?'Ativo':'Inativo'}</span> },
        ]}/>
      ) : (
        <AdminTable loading={loading} data={orders} columns={[
          { key:'customerName', label:'Cliente' },
          { key:'customerEmail', label:'Email', render: o => <span className="text-xs text-flora-moss">{o.customerEmail}</span> },
          { key:'total', label:'Total', render: o => <span className="font-medium">{formatPrice(o.total)}</span> },
          { key:'status', label:'Status', render: o => (
            <select defaultValue={o.status} onChange={e => updateStatus(o.id, e.target.value)} className={`text-xs font-body border border-flora-moss/20 rounded px-2 py-1 focus:outline-none ${statusColor[o.status]}`}>
              {Object.entries(statusLabel).map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          )},
          { key:'createdAt', label:'Data', render: o => <span className="text-xs text-flora-moss">{formatDate(o.createdAt)}</span> },
        ]}/>
      )}
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing?'Editar produto':'Novo produto'} size="lg">
        <div className="space-y-4">
          <Input label="Nome do produto" value={form.name} onChange={e => setForm((f:any)=>({...f,name:e.target.value}))} required/>
          <Textarea label="Descrição" rows={3} value={form.description||''} onChange={e => setForm((f:any)=>({...f,description:e.target.value}))}/>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Preço (R$)" type="number" step="0.01" value={String(form.price)} onChange={e => setForm((f:any)=>({...f,price:parseFloat(e.target.value)||0}))}/>
            <Input label="Estoque" type="number" value={String(form.stock)} onChange={e => setForm((f:any)=>({...f,stock:parseInt(e.target.value)||0}))}/>
            <Input label="Categoria" value={form.category} onChange={e => setForm((f:any)=>({...f,category:e.target.value}))}/>
          </div>
          <ImageUploader label="Imagem do produto" value={imageUrl} onChange={setImageUrl} folder="loja"/>
          <div className="flex gap-6">
            {[['featured','Destaque'],['active','Ativo']].map(([k,l]) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form[k]} onChange={e => setForm((f:any)=>({...f,[k]:e.target.checked}))} className="w-4 h-4 accent-flora-deep"/><span className="text-sm font-body text-flora-forest">{l}</span></label>
            ))}
          </div>
          <div className="flex gap-3 pt-2"><Button onClick={save} loading={saving} className="flex-1 justify-center">Salvar</Button><Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button></div>
        </div>
      </AdminModal>
    </div>
  )
}