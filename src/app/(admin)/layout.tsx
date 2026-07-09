import { auth }         from '@/lib/auth'
import { redirect }     from 'next/navigation'
import AdminSidebar     from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-flora-offwhite flex">
      <AdminSidebar userName={session.user?.name || 'Admin'} />
      <main className="flex-1 ml-64 p-8 min-h-screen">{children}</main>
    </div>
  )
}
