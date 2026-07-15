import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from './routes'

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'flora-api' }))
app.use('/api', routes)

app.listen(PORT, () => console.log(`🌿 Flora API rodando na porta ${PORT}`))
export default app
