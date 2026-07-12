import { Request, Response } from 'express'
import { Resend } from 'resend'

export async function send(req: Request, res: Response) {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ error: 'Campos obrigatórios ausentes' })

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder') {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'contato@floramusica.com.br',
        to:   process.env.RESEND_FROM_EMAIL || 'contato@floramusica.com.br',
        replyTo: email,
        subject: `[Site] ${subject || 'Mensagem de contato'}`,
        html: `<p><strong>De:</strong> ${name} (${email})</p><p><strong>Assunto:</strong> ${subject}</p><hr/><p>${message}</p>`,
      })
    }

    return res.json({ success: true })
  } catch (e: any) {
    return res.status(500).json({ error: e.message })
  }
}
