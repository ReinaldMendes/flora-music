import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function subscribe(req: Request, res: Response) {
  try {
    const { email, name } = req.body
    if (!email) return res.status(400).json({ error: 'Email obrigatório' })
    await prisma.newsletterSubscriber.upsert({ where: { email }, update: { active: true, name }, create: { email, name } })
    return res.json({ success: true })
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function getAll(req: Request, res: Response) {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: 'desc' } })
  return res.json(subscribers)
}
