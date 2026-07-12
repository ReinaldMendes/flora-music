import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function getAll(req: Request, res: Response) {
  const { featured } = req.query
  const where = featured === 'true' ? { featured: true } : {}
  const videos = await prisma.video.findMany({ where, orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }] })
  return res.json(videos)
}
export async function create(req: Request, res: Response) {
  try {
    const video = await prisma.video.create({ data: { ...req.body, publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : new Date() } })
    return res.status(201).json(video)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function update(req: Request, res: Response) {
  try {
    const video = await prisma.video.update({ where: { id: req.params.id }, data: req.body })
    return res.json(video)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function remove(req: Request, res: Response) {
  await prisma.video.delete({ where: { id: req.params.id } })
  return res.json({ success: true })
}
