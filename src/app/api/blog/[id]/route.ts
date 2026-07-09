import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'
import { slugify } from '@/lib/utils'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const body = await req.json()
    const updateData: any = { ...body }
    if (body.title) updateData.slug = slugify(body.title)
    if (body.published === true) {
      const existing = await prisma.blogPost.findUnique({ where: { id: params.id } })
      if (!existing?.publishedAt) updateData.publishedAt = new Date()
    }
    const post = await prisma.blogPost.update({ where: { id: params.id }, data: updateData })
    return NextResponse.json(post)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin()
  if (error) return error
  await prisma.blogPost.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
