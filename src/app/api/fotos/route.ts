import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'
import { z } from 'zod'

const schema = z.object({
  url: z.string().min(1),
  caption: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

export async function GET() {
  const photos = await prisma.photo.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(photos)
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const photo = await prisma.photo.create({ data })
    return NextResponse.json(photo, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
