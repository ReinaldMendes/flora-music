import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export async function getAll(req: Request, res: Response) {
  const { status } = req.query
  const where = status ? { status: status as any } : {}
  const shows = await prisma.show.findMany({ where, orderBy: { date: 'asc' } })
  return res.json(shows)
}

export async function create(req: Request, res: Response) {
  try {
    const show = await prisma.show.create({ data: { ...req.body, date: new Date(req.body.date) } })
    return res.status(201).json(show)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

export async function update(req: Request, res: Response) {
  try {
    const data: any = { ...req.body }
    if (data.date) data.date = new Date(data.date)
    const show = await prisma.show.update({ where: { id: req.params.id }, data })
    return res.json(show)
  } catch (e: any) { return res.status(400).json({ error: e.message }) }
}

export async function remove(req: Request, res: Response) {
  await prisma.show.delete({ where: { id: req.params.id } })
  return res.json({ success: true })
}
