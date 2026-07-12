import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
interface Props { params: { slug: string } }
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try { const post = await fetch(`${API}/blog/${params.slug}`).then(r => r.json()); return { title: post.title, description: post.excerpt || post.title } }
  catch { return { title: 'Post' } }
}
export default async function BlogPostPage({ params }: Props) {
  let post: any
  try { post = await fetch(`${API}/blog/${params.slug}`, { next: { revalidate: 3600 } }).then(r => r.json()) }
  catch { notFound() }
  if (!post || post.error) notFound()
  return (
    <>
      {post.coverUrl && (
        <div className="relative h-[55vh] bg-flora-deep">
          <Image src={post.coverUrl} alt={post.title} fill className="object-cover opacity-50" priority sizes="100vw"/>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-flora-deep/70"/>
        </div>
      )}
      <section className={`section-padding bg-flora-offwhite ${!post.coverUrl ? "pt-32" : ""}`}>
        <div className="container-flora max-w-2xl">
          <AnimatedSection>
            <Link href="/blog" className="text-xs font-body text-flora-moss hover:text-flora-deep transition-colors underline-flora">← Blog</Link>
            {post.category && <Badge variant="copper" className="mt-3 mb-4">{post.category}</Badge>}
            <h1 className="font-display text-title text-flora-deep mb-4">{post.title}</h1>
            {post.publishedAt && <p className="text-sm font-body text-flora-moss mb-12">{formatDate(post.publishedAt)}</p>}
          </AnimatedSection>
          <AnimatedSection delay={0.2} variant="fade">
            <div className="space-y-6">
              {post.content.split("\n\n").map((para: string, i: number) => (
                <p key={i} className="font-lyrics text-lg text-flora-forest/80 leading-[1.9]">{para}</p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}