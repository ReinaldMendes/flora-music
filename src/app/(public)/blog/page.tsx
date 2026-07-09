import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Textos, reflexões e poesias de Flora.',
}
export const revalidate = 3600

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
  })

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-offwhite border-b border-flora-moss/10">
        <div className="container-flora">
          <AnimatedText>
            <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-4">Palavras</p>
            <h1 className="font-display text-title text-flora-deep">Blog</h1>
          </AnimatedText>
        </div>
      </div>

      <Section className="bg-flora-offwhite">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, i) => (
            <AnimatedText key={post.id} delay={i * 0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                {post.coverUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden rounded mb-6 bg-flora-moss/10">
                    <Image
                      src={post.coverUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                {post.category && <Badge variant="copper" className="mb-3">{post.category}</Badge>}
                <h2 className="font-display text-h2 text-flora-deep group-hover:text-flora-copper transition-colors mb-3">{post.title}</h2>
                {post.publishedAt && (
                  <p className="text-xs font-body text-flora-moss mb-4">{formatDate(post.publishedAt)}</p>
                )}
                {post.excerpt && (
                  <p className="font-body text-flora-forest/70 leading-relaxed line-clamp-3">{post.excerpt}</p>
                )}
                <span className="inline-block mt-4 text-sm font-body text-flora-forest hover-underline-flora">Ler mais →</span>
              </Link>
            </AnimatedText>
          ))}
        </div>
      </Section>
    </>
  )
}
