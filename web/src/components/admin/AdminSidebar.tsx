'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin/dashboard', label: 'Dashboard',    icon: '◈' },
  { href: '/admin/albuns',    label: 'Álbuns',        icon: '♪' },
  { href: '/admin/shows',     label: 'Agenda',        icon: '◷' },
  { href: '/admin/blog',      label: 'Blog',          icon: '✎' },
  { href: '/admin/videos',    label: 'Vídeos',        icon: '▶' },
  { href: '/admin/fotos',     label: 'Fotos',         icon: '◫' },
  { href: '/admin/loja',      label: 'Loja',          icon: '◧' },
  { href: '/admin/newsletter',label: 'Newsletter',    icon: '✉' },
  { href: '/admin/config',    label: 'Configurações', icon: '⚙' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()

  function handleLogout() { clearAuth(); router.push('/admin/login') }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-flora-deep text-flora-cream flex flex-col border-r border-flora-cream/5">
      <div className="p-6 border-b border-flora-cream/10">
        <p className="font-display text-2xl text-flora-cream">Flora</p>
        <p className="text-xs font-body text-flora-cream/40 mt-0.5">Painel administrativo</p>
      </div>
      <nav className="flex-1 py-5 px-3 space-y-0.5 overflow-y-auto">
        {links.map(({ href, label, icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href} className={cn('flex items-center gap-3 px-3 py-2.5 rounded text-sm font-body transition-colors', active ? 'bg-flora-cream/10 text-flora-cream' : 'text-flora-cream/45 hover:text-flora-cream hover:bg-flora-cream/5')}>
              <span className="text-base w-4 text-center">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-flora-cream/10">
        <p className="text-xs font-body text-flora-cream/35 px-2 mb-2">{user?.name}</p>
        <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm font-body text-flora-cream/45 hover:text-flora-cream hover:bg-flora-cream/5 rounded transition-colors">Sair</button>
      </div>
    </aside>
  )
}
