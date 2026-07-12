import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function getAll(req: Request, res: Response) {
  const photos = await prisma.photo.findMany({ orderBy: { order: 'asc' } })
  return res.json(photos)
}
export async function create(req: Request, res: Response) {
  try {
    const photo = await prisma.photo.create({ data: req.body })
    return res.status(201).json(photo)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}
export async function remove(req: Request, res: Response) {
  await prisma.photo.delete({ where: { id: req.params.id } })
  return res.json({ success: true })
}
