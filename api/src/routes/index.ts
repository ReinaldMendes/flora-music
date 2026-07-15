import { Router } from 'express'
import multer from 'multer'
import { authMiddleware, adminMiddleware } from '../middlewares/auth'
import * as auth    from '../controllers/auth.controller'
import * as albuns  from '../controllers/albuns.controller'
import * as tracks  from '../controllers/tracks.controller'
import * as shows   from '../controllers/shows.controller'
import * as blog    from '../controllers/blog.controller'
import * as misc    from '../controllers/misc.controller'

const router = Router()
const mem = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } })

// ── AUTH ─────────────────────────────────────────────────────────────
router.post('/auth/login', auth.login)
router.get('/auth/me', authMiddleware, auth.me)

// ── PÚBLICO ─────────────────────────────────────────────────────────
router.get('/albuns', albuns.getAll)
router.get('/albuns/:slug', albuns.getBySlug)
router.get('/tracks/:slug', tracks.getBySlug)
router.get('/shows', shows.getAll)
router.get('/blog', blog.getAll)
router.get('/blog/:slug', blog.getBySlug)
router.get('/videos', misc.getVideos)
router.get('/fotos', misc.getFotos)
router.get('/loja/produtos', misc.getProdutos)
router.get('/loja/produtos/:slug', misc.getProdutoBySlug)
router.get('/config', misc.getConfig)
router.post('/newsletter/subscribe', misc.subscribe)
router.post('/contato', misc.sendContato)
router.post('/loja/checkout', misc.checkout)

// ── ADMIN ─────────────────────────────────────────────────────────────
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

router.post('/videos', adminMiddleware, misc.createVideo)
router.put('/videos/:id', adminMiddleware, misc.updateVideo)
router.delete('/videos/:id', adminMiddleware, misc.deleteVideo)

router.post('/fotos', adminMiddleware, misc.createFoto)
router.delete('/fotos/:id', adminMiddleware, misc.deleteFoto)

router.post('/loja/produtos', adminMiddleware, misc.createProduto)
router.put('/loja/produtos/:id', adminMiddleware, misc.updateProduto)
router.delete('/loja/produtos/:id', adminMiddleware, misc.deleteProduto)
router.get('/loja/pedidos', adminMiddleware, misc.getPedidos)
router.put('/loja/pedidos/:id', adminMiddleware, misc.updatePedido)

router.get('/newsletter', adminMiddleware, misc.getSubscribers)
router.post('/config', adminMiddleware, misc.upsertConfig)
router.post('/upload', adminMiddleware, mem.single('file'), misc.upload)
router.get('/dashboard', adminMiddleware, misc.getDashboard)

export default router
