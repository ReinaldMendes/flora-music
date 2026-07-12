'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore()
  const router = useRouter()
  useEffect(() => { if (!token) router.push('/admin/login') }, [token, router])
  if (!token) return null
  return (
    <div className="min-h-screen bg-flora-offwhite flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 min-h-screen">{children}</main>
    </div>
  )
}
