import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(1),
  date: z.string(),
  venue: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(2),
  ticketUrl: z.string().optional(),
  mapEmbed: z.string().optional(),
  status: z.enum(['UPCOMING', 'SOLD_OUT', 'CANCELLED', 'DONE']).optional(),
  featured: z.boolean().optional(),
})

export async function GET() {
  const shows = await prisma.show.findMany({ orderBy: { date: 'asc' } })
  return NextResponse.json(shows)
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const show = await prisma.show.create({ data: { ...data, date: new Date(data.date) } })
    return NextResponse.json(show, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
