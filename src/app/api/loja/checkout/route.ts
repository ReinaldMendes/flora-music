import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({
  items: z.array(z.object({ productId: z.string(), quantity: z.number().min(1) })),
  customer: z.object({ name: z.string(), email: z.string().email(), phone: z.string() }),
  shippingAddress: z.object({
    street: z.string(), number: z.string(), complement: z.string().optional(),
    neighborhood: z.string(), city: z.string(), state: z.string(), zipCode: z.string(),
  }),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, customer, shippingAddress } = schema.parse(body)

    // Buscar produtos reais no banco para validar preço e estoque
    const productIds = items.map(i => i.productId)
    const products = await prisma.product.findMany({ where: { id: { in: productIds }, active: true } })

    if (products.length !== productIds.length) {
      return NextResponse.json({ error: 'Um ou mais produtos não estão disponíveis' }, { status: 400 })
    }

    for (const item of items) {
      const product = products.find(p => p.id === item.productId)!
      if (product.stock < item.quantity) {
        return NextResponse.json({ error: `Estoque insuficiente para ${product.name}` }, { status: 400 })
      }
    }

    const total = items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId)!
      return sum + product.price * item.quantity
    }, 0)

    // Criar pedido pendente
    const order = await prisma.order.create({
      data: {
        customerEmail: customer.email,
        customerName: customer.name,
        total,
        status: 'PENDING',
        shippingAddress,
        items: {
          create: items.map(item => {
            const product = products.find(p => p.id === item.productId)!
            return { productId: item.productId, quantity: item.quantity, price: product.price }
          }),
        },
      },
    })

    // Se Stripe configurado, cria sessão de checkout real
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_placeholder') {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: customer.email,
        line_items: items.map(item => {
          const product = products.find(p => p.id === item.productId)!
          return {
            price_data: {
              currency: 'brl',
              product_data: { name: product.name },
              unit_amount: Math.round(product.price * 100),
            },
            quantity: item.quantity,
          }
        }),
        metadata: { orderId: order.id },
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/loja/pedido/sucesso`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/loja/checkout`,
      })

      await prisma.order.update({ where: { id: order.id }, data: { stripeId: session.id } })
      return NextResponse.json({ checkoutUrl: session.url })
    }

    // Modo dev sem Stripe configurado
    return NextResponse.json({ checkoutUrl: `${process.env.NEXT_PUBLIC_APP_URL}/loja/pedido/sucesso`, orderId: order.id })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message || 'Erro ao processar checkout' }, { status: 500 })
  }
}
