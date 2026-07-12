import { Router } from 'express'
import multer from 'multer'
import { authMiddleware, adminMiddleware } from '../middlewares/auth'

import * as auth from '../controllers/auth.controller'
import * as albuns from '../controllers/albuns.controller'
import * as tracks from '../controllers/tracks.controller'
import * as shows from '../controllers/shows.controller'
import * as blog from '../controllers/blog.controller'
import * as loja from '../controllers/loja.controller'
import * as videos from '../controllers/videos.controller'
import * as fotos from '../controllers/fotos.controller'
import * as newsletter from '../controllers/newsletter.controller'
import * as config from '../controllers/config.controller'
import * as upload from '../controllers/upload.controller'
import * as dashboard from '../controllers/dashboard.controller'
import * as contato from '../controllers/contato.controller'

const router = Router()
const mem = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

// Auth
router.post('/auth/login', auth.login)
router.get('/auth/me', authMiddleware, auth.me)

// Público
router.get('/albuns', albuns.getAll)
router.get('/albuns/:slug', albuns.getBySlug)
router.get('/tracks/:slug', tracks.getBySlug)
router.get('/shows', shows.getAll)
router.get('/blog', blog.getAll)
router.get('/blog/:slug', blog.getBySlug)
router.get('/videos', videos.getAll)
router.get('/fotos', fotos.getAll)
router.get('/loja/produtos', loja.getProdutos)
router.get('/loja/produtos/:slug', loja.getProdutoBySlug)
router.post('/newsletter/subscribe', newsletter.subscribe)
router.post('/loja/checkout', loja.checkout)
router.get('/config', config.getAll)
router.post('/contato', contato.send)

// Admin
router.post('/albuns', adminMiddleware, albuns.create)
router.put('/albuns/:id', adminMiddleware, albuns.update)
router.delete('/albuns/:id', adminMiddleware, albuns.remove)

router.post('/tracks', adminMiddleware, tracks.create)
router.put('/tracks/:id', adminMiddleware, tracks.update)
router.delete('/tracks/:id', adminMiddleware, tracks.remove)

router.post('/shows', adminMiddleware, shows.create)
router.put('/shows/:id', adminMiddleware, shows.update)
router.delete('/shows/:id', adminMiddleware, shows.remove)

router.post('/blog', adminMiddleware, blog.create)
router.put('/blog/:id', adminMiddleware, blog.update)
router.delete('/blog/:id', adminMiddleware, blog.remove)

router.post('/loja/produtos', adminMiddleware, loja.createProduto)
router.put('/loja/produtos/:id', adminMiddleware, loja.updateProduto)
router.delete('/loja/produtos/:id', adminMiddleware, loja.removeProduto)
router.get('/loja/pedidos', adminMiddleware, loja.getPedidos)
router.put('/loja/pedidos/:id', adminMiddleware, loja.updatePedido)

router.post('/videos', adminMiddleware, videos.create)
router.put('/videos/:id', adminMiddleware, videos.update)
router.delete('/videos/:id', adminMiddleware, videos.remove)

router.post('/fotos', adminMiddleware, fotos.create)
router.delete('/fotos/:id', adminMiddleware, fotos.remove)

router.get('/newsletter', adminMiddleware, newsletter.getAll)

router.post('/config', adminMiddleware, config.upsert)

router.post('/upload', adminMiddleware, mem.single('file'), upload.upload)

router.get('/dashboard', adminMiddleware, dashboard.getStats)

export default router
