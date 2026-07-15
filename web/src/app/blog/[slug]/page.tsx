import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchApi } from '@/lib/fetch-api'
import Reveal from '@/components/animations/Reveal'
import { formatDate } from '@/lib/utils'

interface Props { params: { slug: string } }
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await fetchApi<any>(`/blog/${params.slug}`, null)
  if (!p) return { title: 'Post' }
  return { title: p.title, description: p.excerpt || p.title }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await fetchApi<any>(`/blog/${params.slug}`, null)
  if (!post || post.error) notFound()

  return (
    <>
      {post.coverUrl && (
        <div className="relative h-[60vh] section-dark overflow-hidden">
          <Image src={post.coverUrl} alt={post.title} fill priority
            className="object-cover opacity-45" sizes="100vw"/>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-forest-deep/85"/>
        </div>
      )}
      <section className={`section-flora section-cream ${!post.coverUrl ? 'pt-40' : ''}`}>
        <div className="container-flora max-w-2xl mx-auto">
          <Reveal>
            <Link href="/blog" className="tag-flora text-forest-moss/60 hover:text-terra-dark transition-colors block mb-10">
              ← Blog
            </Link>
            {post.category && (
              <span className="tag-flora text-terra-natural block mb-4">{post.category}</span>
            )}
            <h1 className="font-display text-forest-deep mb-4"
              style={{ fontSize: 'clamp(2.5rem,6vw,6rem)', letterSpacing: '-0.025em', lineHeight: '1.0' }}>
              {post.title}
            </h1>
            {post.publishedAt && (
              <p className="tag-flora text-neutral-mid/45 mb-16">{formatDate(post.publishedAt)}</p>
            )}
          </Reveal>

          <Reveal direction="fade" delay={0.2}>
            <div className="space-y-7">
              {post.content.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="font-serif text-neutral-dark leading-[1.9]"
                  style={{ fontFamily: '"EB Garamond", Georgia, serif', fontSize: '1.25rem' }}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
