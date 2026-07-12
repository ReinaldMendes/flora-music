import { Request, Response } from 'express'
import { uploadImage } from '../lib/cloudinary'

export async function upload(req: Request, res: Response) {
  try {
    const file = (req as any).file
    if (!file) return res.status(400).json({ error: 'Nenhum arquivo enviado' })
    const folder = req.body.folder || 'flora'
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const result = await uploadImage(base64, folder)
    return res.json(result)
  } catch (e: any) { return res.status(500).json({ error: e.message }) }
}
