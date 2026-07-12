'use client'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { formatDate } from '@/lib/utils'
type Subscriber = { id:string; email:string; name?:string; active:boolean; subscribedAt:string }
export default function NewsletterAdminPage() {
  const [subs, setSubs] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { api.get('/newsletter').then(({ data }) => setSubs(data)).finally(() => setLoading(false)) }, [])
  const active = subs.filter(s => s.active).length
  return (
    <div>
      <div className="mb-8"><h1 className="font-display text-3xl text-flora-deep">Newsletter</h1><p className="font-body text-sm text-flora-moss mt-1">{active} inscritos ativos</p></div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[['Total', subs.length, 'text-flora-deep'],['Ativos', active, 'text-green-600'],['Inativos', subs.length-active, 'text-flora-moss/40']].map(([l,v,c]) => (
          <div key={l as string} className="bg-white border border-flora-moss/10 rounded p-5">
            <p className="text-xs font-body text-flora-moss/55 uppercase tracking-wide mb-1">{l}</p>
            <p className={`font-display text-3xl ${c}`}>{v}</p>
          </div>
        ))}
      </div>
      {loading ? <p className="font-body text-sm text-flora-moss animate-pulse">Carregando...</p> : (
        <div className="bg-white border border-flora-moss/10 rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-flora-offwhite border-b border-flora-moss/10">
              <tr>{['Nome','Email','Status','Inscrito em'].map(h => <th key={h} className="text-left text-xs font-body text-flora-moss/55 uppercase tracking-wide px-4 py-3">{h}</th>)}</tr>
            </thead>
            <tbody>
              {subs.map(s => (
                <tr key={s.id} className="border-b border-flora-moss/5">
                  <td className="px-4 py-3 text-sm font-body text-flora-deep">{s.name||'—'}</td>
                  <td className="px-4 py-3 text-sm font-body text-flora-moss">{s.email}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium ${s.active?'text-green-600':'text-red-400'}`}>{s.active?'Ativo':'Inativo'}</span></td>
                  <td className="px-4 py-3 text-xs font-body text-flora-moss/55">{formatDate(s.subscribedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}