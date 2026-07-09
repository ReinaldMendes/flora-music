import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Assinatura inválida' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.orderId
    if (orderId) {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID' },
        include: { items: { include: { product: true } } },
      })

      // Decrementar estoque
      for (const item of order.items) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      }

      // Email de confirmação
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder') {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'contato@floramusica.com.br',
          to: order.customerEmail,
          subject: 'Seu pedido foi confirmado — Flora',
          html: `<p>Olá ${order.customerName},</p><p>Seu pedido foi confirmado! Em breve enviaremos os detalhes do envio.</p>`,
        })
      }
    }
  }

  return NextResponse.json({ received: true })
}
