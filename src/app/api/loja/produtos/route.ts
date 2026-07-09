import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/api-auth'
import { slugify } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  images: z.array(z.string()).default([]),
  stock: z.number().min(0),
  category: z.string().min(1),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
})

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin()
  if (error) return error
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const product = await prisma.product.create({ data: { ...data, slug: slugify(data.name) } })
    return NextResponse.json(product, { status: 201 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
