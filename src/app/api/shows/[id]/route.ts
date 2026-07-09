import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const body = await req.json()
    const updateData: any = { ...body }
    if (body.date) updateData.date = new Date(body.date)
    const show = await prisma.show.update({ where: { id: params.id }, data: updateData })
    return NextResponse.json(show)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin()
  if (error) return error
  await prisma.show.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
