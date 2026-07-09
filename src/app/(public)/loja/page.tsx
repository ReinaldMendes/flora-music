import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Badge from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Loja',
  description: 'Vinis, camisetas, pôsteres e produtos artesanais de Flora.',
}
export const revalidate = 1800

export default async function LojaPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  })
  const categories = [...new Set(products.map(p => p.category))]

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-deep text-flora-cream">
        <div className="container-flora">
          <AnimatedText>
            <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-4">Loja</p>
            <h1 className="font-display text-title text-flora-cream">Arte para levar</h1>
            <p className="font-body text-flora-cream/50 mt-4 max-w-lg">Objetos que carregam a energia da música. Cada peça feita com cuidado.</p>
          </AnimatedText>
        </div>
      </div>

      <Section className="bg-flora-offwhite">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => {
            const images = product.images as string[]
            return (
              <AnimatedText key={product.id} delay={i * 0.06}>
                <Link href={`/loja/${product.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded mb-4 bg-flora-moss/10">
                    {images[0] ? (
                      <Image
                        src={images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-flora-moss/10">
                        <span className="font-display text-4xl text-flora-moss/30">F</span>
                      </div>
                    )}
                    {product.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="copper">Destaque</Badge>
                      </div>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-flora-deep/60 flex items-center justify-center">
                        <span className="font-body text-sm text-flora-cream/80">Esgotado</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-body text-flora-moss mb-1">{product.category}</p>
                  <h2 className="font-body font-medium text-flora-deep group-hover:text-flora-copper transition-colors text-sm mb-1">{product.name}</h2>
                  <p className="font-display text-lg text-flora-deep">{formatPrice(product.price)}</p>
                </Link>
              </AnimatedText>
            )
          })}
        </div>
      </Section>
    </>
  )
}
