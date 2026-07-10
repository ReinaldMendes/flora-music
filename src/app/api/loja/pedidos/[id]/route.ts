import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'

export async function PUT(req: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  const params = await context.params
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const { status } = await req.json()
    const order = await prisma.order.update({ where: { id: params.id }, data: { status } })
    return NextResponse.json(order)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
