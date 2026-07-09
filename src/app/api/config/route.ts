import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key')
  if (key) {
    const config = await prisma.siteConfig.findUnique({ where: { key } })
    return NextResponse.json(config)
  }
  const configs = await prisma.siteConfig.findMany()
  return NextResponse.json(configs)
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error
  const { key, value } = await req.json()
  const config = await prisma.siteConfig.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  })
  return NextResponse.json(config)
}
