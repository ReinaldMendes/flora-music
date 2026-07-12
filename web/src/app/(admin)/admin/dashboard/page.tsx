'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getDashboard } from '@/lib/api'
import { formatPrice, formatDate } from '@/lib/utils'
const statusLabel: Record<string,string> = { PENDING:'Pendente', PAID:'Pago', SHIPPED:'Enviado', DELIVERED:'Entregue', CANCELLED:'Cancelado' }
const statusColor: Record<string,string> = { PENDING:'text-yellow-600', PAID:'text-green-600', SHIPPED:'text-blue-600', DELIVERED:'text-flora-forest', CANCELLED:'text-red-500' }
export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { getDashboard().then(setStats).finally(() => setLoading(false)) }, [])
  if (loading) return <div className="animate-pulse"><div className="h-8 bg-flora-moss/10 rounded w-48 mb-6"/></div>
  const cards = [
    { label: 'Álbuns', value: stats?.albums, href: '/admin/albuns' },
    { label: 'Shows', value: stats?.shows, href: '/admin/shows' },
    { label: 'Posts', value: stats?.posts, href: '/admin/blog' },
    { label: 'Produtos', value: stats?.products, href: '/admin/loja' },
    { label: 'Pedidos ativos', value: stats?.orders, href: '/admin/loja' },
    { label: 'Newsletter', value: stats?.subscribers, href: '/admin/newsletter' },
    { label: 'Vídeos', value: stats?.videos, href: '/admin/videos' },
    { label: 'Receita total', value: formatPrice(stats?.revenue || 0), href: '/admin/loja' },
  ]
  return (
    <div>
      <div className="mb-8"><h1 className="font-display text-3xl text-flora-deep">Dashboard</h1><p className="font-body text-sm text-flora-moss mt-1">Bem-vinda de volta ✦</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {cards.map(c => (
          <Link key={c.label} href={c.href} className="bg-white border border-flora-moss/10 rounded p-5 hover:border-flora-moss/30 transition-colors group">
            <p className="text-xs font-body text-flora-moss/55 uppercase tracking-wide mb-2">{c.label}</p>
            <p className="font-display text-3xl text-flora-deep group-hover:text-flora-copper transition-colors">{c.value ?? '—'}</p>
          </Link>
        ))}
      </div>
      <div className="bg-white border border-flora-moss/10 rounded p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-body font-medium text-flora-deep">Pedidos recentes</h2>
          <Link href="/admin/loja" className="text-xs font-body text-flora-moss hover:text-flora-deep transition-colors">Ver todos →</Link>
        </div>
        {!stats?.recentOrders?.length ? <p className="text-sm font-body text-flora-moss/45">Nenhum pedido ainda.</p> : (
          <table className="w-full">
            <thead><tr className="border-b border-flora-moss/10">{['Cliente','Total','Status','Data'].map(h => <th key={h} className="text-left text-xs font-body text-flora-moss/45 uppercase tracking-wide pb-3 pr-4">{h}</th>)}</tr></thead>
            <tbody>
              {stats.recentOrders.map((o: any) => (
                <tr key={o.id} className="border-b border-flora-moss/5">
                  <td className="py-3 pr-4 text-sm font-body text-flora-deep">{o.customerName}</td>
                  <td className="py-3 pr-4 text-sm font-body font-medium text-flora-deep">{formatPrice(o.total)}</td>
                  <td className="py-3 pr-4"><span className={`text-xs font-medium ${statusColor[o.status]}`}>{statusLabel[o.status]}</span></td>
                  <td className="py-3 text-xs font-body text-flora-moss/45">{formatDate(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[['/admin/albuns','+ Novo álbum'],['/admin/shows','+ Novo show'],['/admin/blog','+ Novo post'],['/admin/loja','+ Novo produto']].map(([href, label]) => (
          <Link key={href} href={href} className="text-center py-3 border border-flora-moss/20 rounded text-sm font-body text-flora-forest hover:bg-flora-deep hover:text-flora-cream hover:border-flora-deep transition-all duration-300">{label}</Link>
        ))}
      </div>
    </div>
  )
}