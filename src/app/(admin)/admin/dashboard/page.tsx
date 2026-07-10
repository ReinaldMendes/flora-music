import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function getStats() {
  const [albums, shows, posts, products, orders, subscribers, videos] = await Promise.all([
    prisma.album.count(),
    prisma.show.count({ where: { status: 'UPCOMING' } }),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.count({ where: { status: { in: ['PENDING', 'PAID'] } } }),
    prisma.newsletterSubscriber.count({ where: { active: true } }),
    prisma.video.count(),
  ])
  const revenue = await prisma.order.aggregate({
    where: { status: 'PAID' },
    _sum: { total: true },
  })
  return { albums, shows, posts, products, orders, subscribers, videos, revenue: revenue._sum.total || 0 }
}

async function getRecentOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { items: true },
  })
}

export default async function DashboardPage() {
  const [stats, recentOrders] = await Promise.all([getStats(), getRecentOrders()])

  const statCards = [
    { label: 'Álbuns',        value: stats.albums,      href: '/admin/albuns',     color: 'bg-flora-deep' },
    { label: 'Shows',         value: stats.shows,       href: '/admin/shows',      color: 'bg-flora-forest' },
    { label: 'Posts',         value: stats.posts,       href: '/admin/blog',       color: 'bg-flora-copper' },
    { label: 'Produtos',      value: stats.products,    href: '/admin/loja',       color: 'bg-flora-earth' },
    { label: 'Pedidos ativos',value: stats.orders,      href: '/admin/loja',       color: 'bg-flora-forest' },
    { label: 'Newsletter',    value: stats.subscribers, href: '/admin/newsletter', color: 'bg-flora-deep' },
    { label: 'Vídeos',        value: stats.videos,      href: '/admin/videos',     color: 'bg-flora-moss' },
    { label: 'Receita total', value: new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(stats.revenue), href: '/admin/loja', color: 'bg-flora-copper' },
  ]

  const statusLabel: Record<string,string> = { PENDING:'Pendente', PAID:'Pago', SHIPPED:'Enviado', DELIVERED:'Entregue', CANCELLED:'Cancelado' }
  const statusColor: Record<string,string> = { PENDING:'text-yellow-600', PAID:'text-green-600', SHIPPED:'text-blue-600', DELIVERED:'text-flora-forest', CANCELLED:'text-red-500' }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-flora-deep">Dashboard</h1>
        <p className="font-body text-sm text-flora-moss mt-1">Bem-vinda de volta ✦</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map(card => (
          <Link key={card.label} href={card.href}
            className="bg-white border border-flora-moss/10 rounded p-5 hover:border-flora-moss/30 transition-colors group">
            <p className="text-xs font-body text-flora-moss/60 uppercase tracking-wide mb-2">{card.label}</p>
            <p className="font-display text-3xl text-flora-deep group-hover:text-flora-copper transition-colors">{card.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white border border-flora-moss/10 rounded p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-body font-medium text-flora-deep">Pedidos recentes</h2>
          <Link href="/admin/loja" className="text-xs font-body text-flora-moss hover:text-flora-deep transition-colors hover-underline-flora">
            Ver todos →
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-sm font-body text-flora-moss/50">Nenhum pedido ainda.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-flora-moss/10">
                {['Cliente','Email','Itens','Total','Status','Data'].map(h => (
                  <th key={h} className="text-left text-xs font-body text-flora-moss/50 uppercase tracking-wide pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-flora-moss/5 hover:bg-flora-moss/2 transition-colors">
                  <td className="py-3 pr-4 text-sm font-body text-flora-deep">{order.customerName}</td>
                  <td className="py-3 pr-4 text-sm font-body text-flora-moss">{order.customerEmail}</td>
                  <td className="py-3 pr-4 text-sm font-body text-flora-moss">{order.items.length}</td>
                  <td className="py-3 pr-4 text-sm font-body text-flora-deep font-medium">
                    {new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(order.total)}
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-body font-medium ${statusColor[order.status]}`}>
                      {statusLabel[order.status]}
                    </span>
                  </td>
                  <td className="py-3 text-xs font-body text-flora-moss/50">
                    {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick links */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: '/admin/albuns', label: '+ Novo álbum' },
          { href: '/admin/shows',  label: '+ Novo show' },
          { href: '/admin/blog',   label: '+ Novo post' },
          { href: '/admin/loja',   label: '+ Novo produto' },
        ].map(l => (
          <Link key={l.href} href={l.href}
            className="text-center py-3 border border-flora-moss/20 rounded text-sm font-body text-flora-forest hover:bg-flora-deep hover:text-flora-cream hover:border-flora-deep transition-all duration-300">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
