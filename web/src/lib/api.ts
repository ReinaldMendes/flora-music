import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const api = axios.create({ baseURL: API_URL })

api.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('flora_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getAlbuns    = () => api.get('/albuns?published=true').then(r => r.data)
export const getAlbum     = (slug: string) => api.get(`/albuns/${slug}`).then(r => r.data)
export const getTrack     = (slug: string) => api.get(`/tracks/${slug}`).then(r => r.data)
export const getShows     = () => api.get('/shows?status=UPCOMING').then(r => r.data)
export const getAllShows   = () => api.get('/shows').then(r => r.data)
export const getBlogPosts = () => api.get('/blog?published=true').then(r => r.data)
export const getBlogPost  = (slug: string) => api.get(`/blog/${slug}`).then(r => r.data)
export const getVideos    = () => api.get('/videos').then(r => r.data)
export const getFotos     = () => api.get('/fotos').then(r => r.data)
export const getProdutos  = () => api.get('/loja/produtos?active=true').then(r => r.data)
export const getProduto   = (slug: string) => api.get(`/loja/produtos/${slug}`).then(r => r.data)
export const getConfig    = () => api.get('/config').then(r => r.data)
export const subscribe    = (data: any) => api.post('/newsletter/subscribe', data).then(r => r.data)
export const checkout     = (data: any) => api.post('/loja/checkout', data).then(r => r.data)

// Admin
export const login        = (email: string, password: string) => api.post('/auth/login', { email, password }).then(r => r.data)
export const getMe        = () => api.get('/auth/me').then(r => r.data)
export const getDashboard = () => api.get('/dashboard').then(r => r.data)
