import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(5),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder') {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'contato@floramusica.com.br',
        to: process.env.RESEND_FROM_EMAIL || 'contato@floramusica.com.br',
        replyTo: data.email,
        subject: `[Site] ${data.subject}`,
        html: `<p><strong>De:</strong> ${data.name} (${data.email})</p><p>${data.message}</p>`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
  }
}
