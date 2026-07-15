import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { fetchApi } from '@/lib/fetch-api'
import Reveal from '@/components/animations/Reveal'
import TextReveal from '@/components/animations/TextReveal'
import { formatDate } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Blog', description: 'Textos e reflexões de Flora Eça.' }

export default async function BlogPage() {
  const posts = await fetchApi<any[]>('/blog?published=true', [])
  return (
    <>
      <div className="pt-40 pb-20 section-cream border-b border-forest-deep/8">
        <div className="container-flora">
          <Reveal><span className="tag-flora text-forest-moss/60 block mb-6">Palavras</span></Reveal>
          <TextReveal text="Blog" as="h1" className="font-display text-forest-deep"
            style={{ fontSize: 'clamp(5rem,14vw,14rem)', letterSpacing: '-0.04em', lineHeight: '0.88' } as any}/>
        </div>
      </div>
      <section className="section-flora section-cream">
        <div className="container-flora grid grid-cols-1 md:grid-cols-2 gap-16">
          {posts.map((post, i) => (
            <Reveal key={post.id} direction="up" delay={i*0.1}>
              <Link href={`/blog/${post.slug}`} className="group block">
                {post.coverUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden mb-6">
                    <Image src={post.coverUrl} alt={post.title} fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width:768px)100vw,50vw"/>
                  </div>
                )}
                {post.category && <span className="tag-flora text-forest-moss/60 block mb-3">{post.category}</span>}
                <h2 className="font-display text-forest-deep group-hover:text-terra-dark transition-colors duration-400 mb-3"
                  style={{ fontSize: 'clamp(1.5rem,3vw,2.75rem)', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                  {post.title}
                </h2>
                {post.publishedAt && <p className="tag-flora text-neutral-mid/45 mb-4">{formatDate(post.publishedAt)}</p>}
                {post.excerpt && <p className="font-body text-neutral-mid leading-relaxed text-sm line-clamp-3">{post.excerpt}</p>}
                <span className="inline-flex items-center gap-2 mt-5 font-body text-[0.7rem] tracking-[0.1em] uppercase text-terra-dark group-hover:gap-4 transition-all duration-300">
                  Ler mais <span>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
          {!posts.length && <p className="font-display text-2xl text-forest-deep/25">Posts em breve.</p>}
        </div>
      </section>
    </>
  )
}
