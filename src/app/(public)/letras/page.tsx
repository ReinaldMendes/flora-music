import type { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'

export const metadata: Metadata = {
  title: 'Letras',
  description: 'Todas as letras de Flora — leia, sinta, contemple.',
}
export const revalidate = 3600

export default async function LetrasPage() {
  const albums = await prisma.album.findMany({
    where: { published: true },
    orderBy: { releaseDate: 'desc' },
    include: {
      tracks: {
        where: { lyrics: { not: null } },
        orderBy: { trackNumber: 'asc' },
      },
    },
  })

  return (
    <>
      <div className="pt-32 pb-16 bg-flora-offwhite border-b border-flora-moss/10">
        <div className="container-flora">
          <AnimatedText>
            <p className="text-xs font-body tracking-[0.2em] uppercase text-flora-moss mb-4">Poesia</p>
            <h1 className="font-display text-title text-flora-deep">Letras</h1>
          </AnimatedText>
        </div>
      </div>

      <Section className="bg-flora-offwhite">
        <div className="space-y-16 max-w-3xl">
          {albums.map((album, i) => (
            <AnimatedText key={album.id} delay={i * 0.1}>
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-6">{album.title} · {new Date(album.releaseDate).getFullYear()}</p>
              <div className="space-y-0">
                {album.tracks.map(track => (
                  <Link
                    key={track.id}
                    href={`/letras/${track.slug}`}
                    className="group flex items-center justify-between py-4 border-b border-flora-moss/10 hover:border-flora-moss/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-display text-lg text-flora-deep group-hover:text-flora-copper transition-colors">{track.title}</span>
                    </div>
                    <span className="text-xs font-body text-flora-moss/40 group-hover:text-flora-moss transition-colors">Ler →</span>
                  </Link>
                ))}
              </div>
            </AnimatedText>
          ))}
        </div>
      </Section>
    </>
  )
}
