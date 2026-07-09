import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'

export default async function NewsletterAdminPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: 'desc' },
  })
  const active = subscribers.filter(s => s.active).length

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl text-flora-deep">Newsletter</h1>
        <p className="font-body text-sm text-flora-moss mt-1">{active} inscritos ativos</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-flora-moss/10 rounded p-5">
          <p className="text-xs font-body text-flora-moss/60 uppercase tracking-wide mb-1">Total</p>
          <p className="font-display text-3xl text-flora-deep">{subscribers.length}</p>
        </div>
        <div className="bg-white border border-flora-moss/10 rounded p-5">
          <p className="text-xs font-body text-flora-moss/60 uppercase tracking-wide mb-1">Ativos</p>
          <p className="font-display text-3xl text-green-600">{active}</p>
        </div>
        <div className="bg-white border border-flora-moss/10 rounded p-5">
          <p className="text-xs font-body text-flora-moss/60 uppercase tracking-wide mb-1">Inativos</p>
          <p className="font-display text-3xl text-flora-moss/40">{subscribers.length - active}</p>
        </div>
      </div>

      <div className="bg-white border border-flora-moss/10 rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-flora-offwhite border-b border-flora-moss/10">
            <tr>
              {['Nome','Email','Status','Inscrito em'].map(h => (
                <th key={h} className="text-left text-xs font-body text-flora-moss/60 uppercase tracking-wide px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscribers.map(sub => (
              <tr key={sub.id} className="border-b border-flora-moss/5">
                <td className="px-4 py-3 text-sm font-body text-flora-deep">{sub.name || '—'}</td>
                <td className="px-4 py-3 text-sm font-body text-flora-moss">{sub.email}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-body font-medium ${sub.active ? 'text-green-600' : 'text-red-400'}`}>
                    {sub.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs font-body text-flora-moss/60">{formatDate(sub.subscribedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
