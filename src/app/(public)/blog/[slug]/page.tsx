import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

interface Props { params: { slug: string } }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } })
    if (!post) return { title: 'Post não encontrado' }
    return { title: post.title, description: post.excerpt || post.title }
  } catch {
    return { title: 'Blog', description: 'Post de blog da Flora' }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug, published: true },
  })
  if (!post) notFound()

  return (
    <>
      {post.coverUrl && (
        <div className="relative h-[60vh] bg-flora-deep">
          <Image src={post.coverUrl} alt={post.title} fill className="object-cover opacity-50" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-flora-deep/70" />
        </div>
      )}

      <Section className={`bg-flora-offwhite ${!post.coverUrl ? 'pt-32' : ''}`}>
        <div className="max-w-2xl mx-auto">
          <AnimatedText>
            <Link href="/blog" className="text-xs font-body text-flora-moss hover:text-flora-deep transition-colors">← Blog</Link>
            {post.category && <Badge variant="copper" className="block mt-3 mb-4">{post.category}</Badge>}
            <h1 className="font-display text-title text-flora-deep mb-4">{post.title}</h1>
            {post.publishedAt && (
              <p className="text-sm font-body text-flora-moss mb-12">{formatDate(post.publishedAt)}</p>
            )}
          </AnimatedText>

          <AnimatedText delay={0.2} variant="fadeIn">
            <div className="font-body text-flora-forest leading-[1.9] space-y-6 prose-flora">
              {post.content.split('\n\n').map((para, i) => (
                <p key={i} className="font-lyrics text-lg text-flora-forest/80">{para}</p>
              ))}
            </div>
          </AnimatedText>
        </div>
      </Section>
    </>
  )
}
