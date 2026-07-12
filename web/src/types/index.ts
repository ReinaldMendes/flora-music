export type AlbumType   = 'LP' | 'EP' | 'SINGLE'
export type ShowStatus  = 'UPCOMING' | 'SOLD_OUT' | 'CANCELLED' | 'DONE'
export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface Album { id: string; title: string; slug: string; releaseDate: string; coverUrl: string; description?: string; type: AlbumType; streamingLinks?: Record<string, string>; featured: boolean; published: boolean; tracks?: Track[]; credits?: Credit[] }
export interface Track { id: string; albumId: string; album?: Album; title: string; slug: string; lyrics?: string; duration?: string; trackNumber: number; credits?: Credit[] }
export interface Credit { id: string; name: string; role: string }
export interface Show { id: string; title: string; date: string; venue: string; city: string; state: string; ticketUrl?: string; status: ShowStatus; featured: boolean }
export interface BlogPost { id: string; title: string; slug: string; content: string; excerpt?: string; coverUrl?: string; category?: string; published: boolean; publishedAt?: string }
export interface Product { id: string; name: string; slug: string; description?: string; price: number; images: string[]; stock: number; category: string; featured: boolean; active: boolean }
export interface CartItem { product: Product; quantity: number }
