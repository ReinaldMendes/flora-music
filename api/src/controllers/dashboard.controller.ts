import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function getStats(req: Request, res: Response) {
  const [albums, shows, posts, products, orders, subscribers, videos] = await Promise.all([
    prisma.album.count(),
    prisma.show.count({ where: { status: 'UPCOMING' } }),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.product.count({ where: { active: true } }),
    prisma.order.count({ where: { status: { in: ['PENDING', 'PAID'] } } }),
    prisma.newsletterSubscriber.count({ where: { active: true } }),
    prisma.video.count(),
  ])
  const revenue = await prisma.order.aggregate({ where: { status: 'PAID' }, _sum: { total: true } })
  const recentOrders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { items: true } })
  return res.json({ albums, shows, posts, products, orders, subscribers, videos, revenue: revenue._sum.total || 0, recentOrders })
}
