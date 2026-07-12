import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { slugify } from '../lib/slugify'

export async function create(req: Request, res: Response) {
  try {
    const { albumId, title, lyrics, duration, trackNumber, audioUrl } = req.body
    const track = await prisma.track.create({ data: { albumId, title, slug: slugify(title), lyrics, duration, trackNumber: Number(trackNumber), audioUrl } })
    return res.status(201).json(track)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

export async function getBySlug(req: Request, res: Response) {
  const track = await prisma.track.findUnique({ where: { slug: req.params.slug }, include: { album: true, credits: true } })
  if (!track) return res.status(404).json({ error: 'Faixa não encontrada' })
  return res.json(track)
}

export async function update(req: Request, res: Response) {
  try {
    const data: any = { ...req.body }
    if (data.title) data.slug = slugify(data.title)
    const track = await prisma.track.update({ where: { id: req.params.id }, data })
    return res.json(track)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

export async function remove(req: Request, res: Response) {
  await prisma.track.delete({ where: { id: req.params.id } })
  return res.json({ success: true })
}
