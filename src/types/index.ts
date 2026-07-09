export type UserRole = 'ADMIN' | 'EDITOR'
export type AlbumType = 'LP' | 'EP' | 'SINGLE'
export type ShowStatus = 'UPCOMING' | 'SOLD_OUT' | 'CANCELLED' | 'DONE'
export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface Album {
  id: string
  title: string
  slug: string
  releaseDate: Date
  coverUrl: string
  description?: string | null
  type: AlbumType
  streamingLinks?: Record<string, string> | null
  featured: boolean
  published: boolean
  tracks?: Track[]
  credits?: Credit[]
}

export interface Track {
  id: string
  albumId: string
  album?: Album
  title: string
  slug: string
  lyrics?: string | null
  duration?: string | null
  trackNumber: number
  audioUrl?: string | null
  credits?: Credit[]
}

export interface Credit { id: string; name: string; role: string }

export interface Show {
  id: string
  title: string
  date: Date
  venue: string
  city: string
  state: string
  ticketUrl?: string | null
  mapEmbed?: string | null
  status: ShowStatus
  featured: boolean
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string | null
  coverUrl?: string | null
  category?: string | null
  published: boolean
  publishedAt?: Date | null
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string | null
  price: number
  images: string[]
  stock: number
  category: string
  featured: boolean
  active: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface SiteConfig {
  site_name: string
  site_description: string
  spotify_url: string
  instagram_url: string
  youtube_url: string
  whatsapp: string
}
