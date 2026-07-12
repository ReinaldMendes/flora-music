import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { slugify } from '../lib/slugify'

export async function getAll(req: Request, res: Response) {
  const { published } = req.query
  const where = published === 'true' ? { published: true } : {}
  const albums = await prisma.album.findMany({ where, orderBy: { releaseDate: 'desc' }, include: { tracks: { orderBy: { trackNumber: 'asc' } }, credits: true } })
  return res.json(albums)
}

export async function getBySlug(req: Request, res: Response) {
  const album = await prisma.album.findUnique({ where: { slug: req.params.slug }, include: { tracks: { orderBy: { trackNumber: 'asc' }, include: { credits: true } }, credits: true } })
  if (!album) return res.status(404).json({ error: 'Álbum não encontrado' })
  return res.json(album)
}

export async function create(req: Request, res: Response) {
  try {
    const { title, releaseDate, coverUrl, description, type, streamingLinks, featured, published } = req.body
    const album = await prisma.album.create({ data: { title, slug: slugify(title), releaseDate: new Date(releaseDate), coverUrl, description, type, streamingLinks, featured: !!featured, published: !!published } })
    return res.status(201).json(album)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

export async function update(req: Request, res: Response) {
  try {
    const data: any = { ...req.body }
    if (data.title) data.slug = slugify(data.title)
    if (data.releaseDate) data.releaseDate = new Date(data.releaseDate)
    const album = await prisma.album.update({ where: { id: req.params.id }, data })
    return res.json(album)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

export async function remove(req: Request, res: Response) {
  await prisma.album.delete({ where: { id: req.params.id } })
  return res.json({ success: true })
}
