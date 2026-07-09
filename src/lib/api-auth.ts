import { NextResponse } from 'next/server'

export async function requireAdmin() {
  const { auth } = await import('@/lib/auth')
  const session  = await auth()
  const role     = (session?.user as any)?.role

  if (!session || (role !== 'ADMIN' && role !== 'EDITOR')) {
    return { error: NextResponse.json({ error: 'Não autorizado' }, { status: 401 }) }
  }

  return { session, role }
}
