import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { slugify } from '../lib/slugify'
import Stripe from 'stripe'

// PRODUTOS
export async function getProdutos(req: Request, res: Response) {
  const { active } = req.query
  const where = active === 'true' ? { active: true } : {}
  const products = await prisma.product.findMany({ where, orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }] })
  return res.json(products)
}

export async function getProdutoBySlug(req: Request, res: Response) {
  const product = await prisma.product.findUnique({ where: { slug: req.params.slug, active: true } })
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' })
  return res.json(product)
}

export async function createProduto(req: Request, res: Response) {
  try {
    const { name, description, price, images, stock, category, featured, active } = req.body
    const product = await prisma.product.create({ data: { name, slug: slugify(name), description, price: Number(price), images: images || [], stock: Number(stock), category, featured: !!featured, active: active !== false } })
    return res.status(201).json(product)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

export async function updateProduto(req: Request, res: Response) {
  try {
    const data: any = { ...req.body }
    if (data.name) data.slug = slugify(data.name)
    if (data.price) data.price = Number(data.price)
    if (data.stock !== undefined) data.stock = Number(data.stock)
    const product = await prisma.product.update({ where: { id: req.params.id }, data })
    return res.json(product)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

export async function removeProduto(req: Request, res: Response) {
  await prisma.product.delete({ where: { id: req.params.id } })
  return res.json({ success: true })
}

// PEDIDOS
export async function getPedidos(req: Request, res: Response) {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { items: { include: { product: true } } } })
  return res.json(orders)
}

export async function updatePedido(req: Request, res: Response) {
  try {
    const order = await prisma.order.update({ where: { id: req.params.id }, data: { status: req.body.status } })
    return res.json(order)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

// CHECKOUT
export async function checkout(req: Request, res: Response) {
  try {
    const { items, customer, shippingAddress } = req.body
    const productIds = items.map((i: any) => i.productId)
    const products = await prisma.product.findMany({ where: { id: { in: productIds }, active: true } })
    if (products.length !== productIds.length) return res.status(400).json({ error: 'Produto indisponível' })

    for (const item of items) {
      const p = products.find((p: any) => p.id === item.productId)!
      if (p.stock < item.quantity) return res.status(400).json({ error: `Estoque insuficiente: ${p.name}` })
    }

    const total = items.reduce((sum: number, item: any) => {
      const p = products.find((p: any) => p.id === item.productId)!
      return sum + p.price * item.quantity
    }, 0)

    const order = await prisma.order.create({
      data: {
        customerEmail: customer.email, customerName: customer.name, total,
        status: 'PENDING', shippingAddress,
        items: { create: items.map((item: any) => ({ productId: item.productId, quantity: item.quantity, price: products.find((p: any) => p.id === item.productId)!.price })) }
      }
    })

    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (stripeKey && stripeKey !== 'sk_test_placeholder') {
      const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' as any })
      const session = await stripe.checkout.sessions.create({
        mode: 'payment', customer_email: customer.email,
        line_items: items.map((item: any) => {
          const p = products.find((pr: any) => pr.id === item.productId)!
          return { price_data: { currency: 'brl', product_data: { name: p.name }, unit_amount: Math.round(p.price * 100) }, quantity: item.quantity }
        }),
        metadata: { orderId: order.id },
        success_url: `${process.env.FRONTEND_URL}/loja/pedido/sucesso`,
        cancel_url: `${process.env.FRONTEND_URL}/loja/checkout`,
      })
      await prisma.order.update({ where: { id: order.id }, data: { stripeId: session.id } })
      return res.json({ checkoutUrl: session.url })
    }

    return res.json({ checkoutUrl: `${process.env.FRONTEND_URL}/loja/pedido/sucesso`, orderId: order.id })
  } catch (e: any) { return res.status(500).json({ error: e.message }) }
}
