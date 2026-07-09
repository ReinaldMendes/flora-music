import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'
import { slugify } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({
  albumId: z.string(),
  title: z.string().min(1),
  lyrics: z.string().optional(),
  duration: z.string().optional(),
  trackNumber: z.number(),
  audioUrl: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const track = await prisma.track.create({ data: { ...data, slug: slugify(data.title) } })
    return NextResponse.json(track, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
