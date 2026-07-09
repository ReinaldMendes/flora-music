import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'
import { slugify } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  coverUrl: z.string().optional(),
  category: z.string().optional(),
  published: z.boolean().optional(),
})

export async function GET() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const post = await prisma.blogPost.create({
      data: { ...data, slug: slugify(data.title), publishedAt: data.published ? new Date() : null },
    })
    return NextResponse.json(post, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
