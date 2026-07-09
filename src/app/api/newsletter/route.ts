import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name } = schema.parse(body)

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true, name: name || undefined },
      create: { email, name },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }
}

export async function GET() {
  const { auth } = await import('@/lib/auth')
  const session = await auth()
  if ((session?.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  const subscribers = await prisma.newsletterSubscriber.findMany({
    where: { active: true },
    orderBy: { subscribedAt: 'desc' },
  })
  return NextResponse.json(subscribers)
}
