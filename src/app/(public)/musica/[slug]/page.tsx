import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'
import Badge from '@/components/ui/Badge'
import Divider from '@/components/ui/Divider'
import { formatDate } from '@/lib/utils'

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = await prisma.album.findUnique({ where: { slug: params.slug } })
  if (!album) return { title: 'Álbum não encontrado' }
  return { title: album.title, description: album.description || `Álbum ${album.title} de Flora.` }
}

export async function generateStaticParams() {
  const albums = await prisma.album.findMany({ where: { published: true }, select: { slug: true } })
  return albums.map(a => ({ slug: a.slug }))
}

export const revalidate = 3600

export default async function AlbumPage({ params }: Props) {
  const album = await prisma.album.findUnique({
    where: { slug: params.slug, published: true },
    include: {
      tracks: { orderBy: { trackNumber: 'asc' }, include: { credits: true } },
      credits: true,
    },
  })
  if (!album) notFound()

  return (
    <>
      <div className="pt-24 bg-flora-deep">
        <div className="container-flora grid md:grid-cols-2 gap-12 pb-16 items-end">
          <AnimatedText>
            <div className="relative aspect-square max-w-sm rounded overflow-hidden">
              <Image src={album.coverUrl} alt={album.title} fill className="object-cover" sizes="400px" priority />
            </div>
          </AnimatedText>
          <AnimatedText delay={0.2}>
            <Badge variant="moss" className="mb-4">{album.type}</Badge>
            <h1 className="font-display text-title text-flora-cream mb-3">{album.title}</h1>
            <p className="text-sm font-body text-flora-moss mb-6">{formatDate(album.releaseDate)}</p>
            {album.description && (
              <p className="font-body text-flora-cream/60 leading-relaxed mb-8 max-w-md">{album.description}</p>
            )}
            {album.streamingLinks && (
              <div className="flex flex-wrap gap-3">
                {Object.entries(album.streamingLinks as Record<string,string>).map(([platform, url]) => (
                  <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-flora-cream/10 border border-flora-cream/20 text-xs font-body text-flora-cream/70 rounded capitalize hover:bg-flora-cream hover:text-flora-deep transition-all duration-300">
                    {platform}
                  </a>
                ))}
              </div>
            )}
          </AnimatedText>
        </div>
      </div>

      <Section className="bg-flora-offwhite">
        <AnimatedText>
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-8">Faixas</p>
        </AnimatedText>
        <div className="space-y-px">
          {album.tracks.map((track, i) => (
            <AnimatedText key={track.id} delay={i * 0.05}>
              <Link href={`/letras/${track.slug}`} className="group flex items-center justify-between py-4 px-4 -mx-4 rounded hover:bg-flora-moss/5 transition-colors">
                <div className="flex items-center gap-5">
                  <span className="text-sm font-body text-flora-moss/40 w-6 text-center">{track.trackNumber}</span>
                  <div>
                    <p className="font-body font-medium text-flora-deep group-hover:text-flora-copper transition-colors">{track.title}</p>
                    {track.credits.length > 0 && (
                      <p className="text-xs font-body text-flora-moss/60 mt-0.5">{track.credits.map(c => `${c.name} (${c.role})`).join(' · ')}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {track.duration && <span className="text-sm font-body text-flora-moss/40">{track.duration}</span>}
                  {track.lyrics && <span className="text-xs font-body text-flora-forest/50 group-hover:text-flora-forest transition-colors">Letra →</span>}
                </div>
              </Link>
            </AnimatedText>
          ))}
        </div>

        {/* Ficha Técnica */}
        {album.credits.length > 0 && (
          <>
            <Divider className="my-12" />
            <AnimatedText>
              <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-8">Ficha técnica</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                {album.credits.map(credit => (
                  <div key={credit.id} className="flex gap-4">
                    <span className="text-xs font-body text-flora-moss/50 min-w-[100px] pt-0.5">{credit.role}</span>
                    <span className="text-sm font-body text-flora-forest">{credit.name}</span>
                  </div>
                ))}
              </div>
            </AnimatedText>
          </>
        )}
      </Section>
    </>
  )
}
