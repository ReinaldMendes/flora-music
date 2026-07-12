import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { slugify } from '../lib/slugify'

export async function getAll(req: Request, res: Response) {
  const { published } = req.query
  const where = published === 'true' ? { published: true } : {}
  const posts = await prisma.blogPost.findMany({ where, orderBy: { createdAt: 'desc' } })
  return res.json(posts)
}

export async function getBySlug(req: Request, res: Response) {
  const post = await prisma.blogPost.findUnique({ where: { slug: req.params.slug, published: true } })
  if (!post) return res.status(404).json({ error: 'Post não encontrado' })
  return res.json(post)
}

export async function create(req: Request, res: Response) {
  try {
    const { title, content, excerpt, coverUrl, category, published } = req.body
    const post = await prisma.blogPost.create({ data: { title, slug: slugify(title), content, excerpt, coverUrl, category, published: !!published, publishedAt: published ? new Date() : null } })
    return res.status(201).json(post)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

export async function update(req: Request, res: Response) {
  try {
    const data: any = { ...req.body }
    if (data.title) data.slug = slugify(data.title)
    if (data.published === true) {
      const ex = await prisma.blogPost.findUnique({ where: { id: req.params.id } })
      if (!ex?.publishedAt) data.publishedAt = new Date()
    }
    const post = await prisma.blogPost.update({ where: { id: req.params.id }, data })
    return res.json(post)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

export async function remove(req: Request, res: Response) {
  await prisma.blogPost.delete({ where: { id: req.params.id } })
  return res.json({ success: true })
}
