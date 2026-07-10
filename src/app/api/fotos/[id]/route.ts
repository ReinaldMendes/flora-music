import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'

export async function DELETE(_req: NextRequest, context: { params: { id: string } | Promise<{ id: string }> }) {
  const params = await context.params
  const { error } = await requireAdmin()
  if (error) return error
  await prisma.photo.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
