import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'
import { slugify } from '@/lib/utils'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const album = await prisma.album.findUnique({
    where: { id: params.id },
    include: { tracks: { orderBy: { trackNumber: 'asc' }, include: { credits: true } }, credits: true },
  })
  if (!album) return NextResponse.json({ error: 'Não encontrado' }, { status: 404 })
  return NextResponse.json(album)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const body = await req.json()
    const updateData: any = { ...body }
    if (body.title) updateData.slug = slugify(body.title)
    if (body.releaseDate) updateData.releaseDate = new Date(body.releaseDate)
    const album = await prisma.album.update({ where: { id: params.id }, data: updateData })
    return NextResponse.json(album)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin()
  if (error) return error
  await prisma.album.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
