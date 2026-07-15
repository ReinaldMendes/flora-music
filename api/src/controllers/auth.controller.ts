import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { signToken } from '../lib/jwt'

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email e senha obrigatórios' })
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' })
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' })
    const token = signToken({ id: user.id, email: user.email, role: user.role, name: user.name })
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (e: any) { return res.status(500).json({ error: e.message }) }
}

export async function me(req: any, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true },
    })
    return res.json(user)
  } catch (e: any) { return res.status(500).json({ error: e.message }) }
}
