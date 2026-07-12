import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { formatDate, truncate } from '@/lib/utils'
export const metadata: Metadata = { title: 'Blog', description: 'Textos, reflexões e poesias de Flora.' }
async function getData() {
  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
  try { return await fetch(`${API}/blog?published=true`, { next: { revalidate: 3600 } }).then(r => r.json()) }
  catch { return [] }
}
export default async function BlogPage() {
  const posts = await getData()
  return (
    <>
      <div className="pt-32 pb-16 bg-flora-offwhite border-b border-flora-moss/10">
        <div className="container-flora">
          <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-3">Palavras</p>
          <h1 className="font-display text-title text-flora-deep">Blog</h1>
        </div>
      </div>
      <section className="section-padding bg-flora-offwhite">
        <div className="container-flora grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post: any, i: number) => (
            <AnimatedSection key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                {post.coverUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-6 bg-flora-moss/10">
                    <Image src={post.coverUrl} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px)100vw,50vw"/>
                  </div>
                )}
                {post.category && <Badge variant="copper" className="mb-3">{post.category}</Badge>}
                <h2 className="font-display text-h2 text-flora-deep group-hover:text-flora-copper transition-colors mb-3">{post.title}</h2>
                {post.publishedAt && <p className="text-xs font-body text-flora-moss mb-4">{formatDate(post.publishedAt)}</p>}
                {post.excerpt && <p className="font-body text-flora-forest/65 leading-relaxed line-clamp-3">{post.excerpt}</p>}
                <span className="inline-block mt-4 text-sm font-body text-flora-forest underline-flora">Ler mais →</span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  )
}