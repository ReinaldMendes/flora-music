import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { slugify } from '../lib/slugify'
import { uploadImage } from '../lib/cloudinary'
import { Resend } from 'resend'

// ── VÍDEOS ─────────────────────────────────────────────────────────────
export async function getVideos(req: Request, res: Response) {
  const where: any = {}
  if (req.query.featured === 'true') where.featured = true
  const videos = await prisma.video.findMany({ where, orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }] })
  return res.json(videos)
}
export async function createVideo(req: Request, res: Response) {
  try {
    const video = await prisma.video.create({ data: { ...req.body, publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : new Date() } })
    return res.status(201).json(video)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function updateVideo(req: Request, res: Response) {
  try {
    const video = await prisma.video.update({ where: { id: req.params.id }, data: req.body })
    return res.json(video)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function deleteVideo(req: Request, res: Response) {
  await prisma.video.delete({ where: { id: req.params.id } }); return res.json({ success: true })
}

// ── FOTOS ─────────────────────────────────────────────────────────────
export async function getFotos(req: Request, res: Response) {
  const where: any = {}
  if (req.query.category) where.category = req.query.category
  const photos = await prisma.photo.findMany({ where, orderBy: { order: 'asc' } })
  return res.json(photos)
}
export async function createFoto(req: Request, res: Response) {
  try {
    const photo = await prisma.photo.create({ data: req.body })
    return res.status(201).json(photo)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function deleteFoto(req: Request, res: Response) {
  await prisma.photo.delete({ where: { id: req.params.id } }); return res.json({ success: true })
}

// ── NEWSLETTER ─────────────────────────────────────────────────────────
export async function subscribe(req: Request, res: Response) {
  try {
    const { email, name } = req.body
    if (!email) return res.status(400).json({ error: 'Email obrigatório' })
    await prisma.newsletterSubscriber.upsert({ where: { email }, update: { active: true, name }, create: { email, name } })
    return res.json({ success: true })
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function getSubscribers(req: Request, res: Response) {
  const subs = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: 'desc' } })
  return res.json(subs)
}

// ── CONFIG ─────────────────────────────────────────────────────────────
export async function getConfig(req: Request, res: Response) {
  if (req.query.key) {
    const c = await prisma.siteConfig.findUnique({ where: { key: req.query.key as string } })
    return res.json(c)
  }
  return res.json(await prisma.siteConfig.findMany())
}
export async function upsertConfig(req: Request, res: Response) {
  try {
    const { key, value } = req.body
    const c = await prisma.siteConfig.upsert({ where: { key }, update: { value }, create: { key, value } })
    return res.json(c)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

// ── CONTATO ─────────────────────────────────────────────────────────────
export async function sendContato(req: Request, res: Response) {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ error: 'Campos obrigatórios ausentes' })
    const key = process.env.RESEND_API_KEY
    if (key && key !== 're_placeholder') {
      const resend = new Resend(key)
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'contato@floramusica.com.br',
        to: process.env.RESEND_FROM_EMAIL || 'contato@floramusica.com.br',
        replyTo: email,
        subject: `[Site] ${subject || 'Mensagem de contato'}`,
        html: `<p><strong>De:</strong> ${name} (${email})</p><p><strong>Assunto:</strong> ${subject}</p><hr/><p>${message}</p>`,
      })
    }
    return res.json({ success: true })
  } catch (e: any) { return res.status(500).json({ error: e.message }) }
}

// ── UPLOAD ─────────────────────────────────────────────────────────────
export async function upload(req: Request, res: Response) {
  try {
    const file = (req as any).file
    if (!file) return res.status(400).json({ error: 'Nenhum arquivo enviado' })
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const result = await uploadImage(base64, req.body.folder || 'flora')
    return res.json(result)
  } catch (e: any) { return res.status(500).json({ error: e.message }) }
}

// ── DASHBOARD ─────────────────────────────────────────────────────────
export async function getDashboard(req: Request, res: Response) {
  const [albums, shows, posts, products, orders, subscribers, videos] = await Promise.all([
    prisma.album.count(),
    prisma.show.count({ where: { status: 'UPCOMING' } }),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.count({ where: { status: { in: ['PENDING','PAID'] } } }),
    prisma.newsletterSubscriber.count({ where: { active: true } }),
    prisma.video.count(),
  ])
  const revenue = await prisma.order.aggregate({ where: { status: 'PAID' }, _sum: { total: true } })
  const recentOrders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { items: true } })
  return res.json({ albums, shows, posts, products, orders, subscribers, videos, revenue: revenue._sum.total || 0, recentOrders })
}

// ── LOJA ─────────────────────────────────────────────────────────────
export async function getProdutos(req: Request, res: Response) {
  const where: any = {}
  if (req.query.active === 'true') where.active = true
  const products = await prisma.product.findMany({ where, orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }] })
  return res.json(products)
}
export async function getProdutoBySlug(req: Request, res: Response) {
  const p = await prisma.product.findUnique({ where: { slug: req.params.slug, active: true } })
  if (!p) return res.status(404).json({ error: 'Não encontrado' })
  return res.json(p)
}
export async function createProduto(req: Request, res: Response) {
  try {
    const { name, description, price, images, stock, category, featured, active } = req.body
    const p = await prisma.product.create({
      data: { name, slug: slugify(name), description, price: Number(price), images: images || [], stock: Number(stock), category, featured: !!featured, active: active !== false },
    })
    return res.status(201).json(p)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function updateProduto(req: Request, res: Response) {
  try {
    const data: any = { ...req.body }
    if (data.name) data.slug = slugify(data.name)
    if (data.price) data.price = Number(data.price)
    if (data.stock !== undefined) data.stock = Number(data.stock)
    const p = await prisma.product.update({ where: { id: req.params.id }, data })
    return res.json(p)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function deleteProduto(req: Request, res: Response) {
  await prisma.product.delete({ where: { id: req.params.id } }); return res.json({ success: true })
}
export async function getPedidos(req: Request, res: Response) {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { items: { include: { product: true } } } })
  return res.json(orders)
}
export async function updatePedido(req: Request, res: Response) {
  try {
    const o = await prisma.order.update({ where: { id: req.params.id }, data: { status: req.body.status } })
    return res.json(o)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function checkout(req: Request, res: Response) {
  try {
    const { items, customer, shippingAddress } = req.body
    const ids = items.map((i: any) => i.productId)
    const products = await prisma.product.findMany({ where: { id: { in: ids }, active: true } })
    if (products.length !== ids.length) return res.status(400).json({ error: 'Produto indisponível' })
    for (const item of items) {
      const p = products.find((p: any) => p.id === item.productId)!
      if (p.stock < item.quantity) return res.status(400).json({ error: `Estoque insuficiente: ${p.name}` })
    }
    const total = items.reduce((s: number, i: any) => {
      const p = products.find((p: any) => p.id === i.productId)!
      return s + p.price * i.quantity
    }, 0)
    const order = await prisma.order.create({
      data: {
        customerEmail: customer.email, customerName: customer.name, total, status: 'PENDING', shippingAddress,
        items: { create: items.map((i: any) => ({ productId: i.productId, quantity: i.quantity, price: products.find((p: any) => p.id === i.productId)!.price })) },
      },
    })
    const sk = process.env.STRIPE_SECRET_KEY
    if (sk && sk !== 'sk_test_placeholder') {
      const Stripe = (await import('stripe')).default
      const stripe = new Stripe(sk, { apiVersion: '2024-06-20' as any })
      const session = await stripe.checkout.sessions.create({
        mode: 'payment', customer_email: customer.email,
        line_items: items.map((i: any) => {
          const p = products.find((pr: any) => pr.id === i.productId)!
          return { price_data: { currency: 'brl', product_data: { name: p.name }, unit_amount: Math.round(p.price * 100) }, quantity: i.quantity }
        }),
        metadata: { orderId: order.id },
        success_url: `${process.env.FRONTEND_URL}/loja/pedido/sucesso`,
        cancel_url: `${process.env.FRONTEND_URL}/loja/checkout`,
      })
      await prisma.order.update({ where: { id: order.id }, data: { stripeId: session.id } })
      return res.json({ checkoutUrl: session.url })
    }
    return res.json({ checkoutUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/loja/pedido/sucesso`, orderId: order.id })
  } catch (e: any) { return res.status(500).json({ error: e.message }) }
}
