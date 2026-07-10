import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'
import { slugify } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1),
  releaseDate: z.string(),
  coverUrl: z.string().min(1),
  description: z.string().optional(),
  type: z.enum(['LP', 'EP', 'SINGLE']),
  streamingLinks: z.record(z.string(), z.string()).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
})

export async function GET() {
  const albums = await prisma.album.findMany({
    orderBy: { releaseDate: 'desc' },
    include: { tracks: true, _count: { select: { tracks: true } } },
  })
  return NextResponse.json(albums)
}

export async function POST(req: NextRequest) {
  const authResult = await requireAdmin()
  const error = authResult.error
  if (error) return error

  try {
    const body = await req.json()
    const data = schema.parse(body)
    const album = await prisma.album.create({
      data: { ...data, slug: slugify(data.title), releaseDate: new Date(data.releaseDate) },
    })
    return NextResponse.json(album, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Dados inválidos' }, { status: 400 })
  }
}
