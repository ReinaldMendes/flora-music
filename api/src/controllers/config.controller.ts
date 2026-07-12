import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function getAll(req: Request, res: Response) {
  const { key } = req.query
  if (key) {
    const config = await prisma.siteConfig.findUnique({ where: { key: key as string } })
    return res.json(config)
  }
  const configs = await prisma.siteConfig.findMany()
  return res.json(configs)
}
export async function upsert(req: Request, res: Response) {
  try {
    const { key, value } = req.body
    const config = await prisma.siteConfig.upsert({ where: { key }, update: { value }, create: { key, value } })
    return res.json(config)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
