import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'
import { z } from 'zod'

const schema = z.object({
  youtubeId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean().optional(),
  publishedAt: z.string().optional(),
})

export async function GET() {
  const videos = await prisma.video.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(videos)
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const video = await prisma.video.create({
      data: { ...data, publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date() },
    })
    return NextResponse.json(video, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
