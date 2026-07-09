import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌿 Iniciando seed...')

  // Admin user
  const hashedPassword = await bcrypt.hash('flora@admin2024', 12)
  await prisma.user.upsert({
    where:  { email: 'admin@floramusica.com.br' },
    update: {},
    create: {
      name:     'Flora',
      email:    'admin@floramusica.com.br',
      password: hashedPassword,
      role:     'ADMIN',
    },
  })
  console.log('✓ Usuário admin criado')

  // Verificar se já tem dados
  const albumCount = await prisma.album.count()
  if (albumCount > 0) {
    console.log('✓ Dados de exemplo já existem — seed encerrado.')
    return
  }

  // Álbum exemplo
  await prisma.album.create({
    data: {
      title:       'Raízes',
      slug:        'raizes',
      releaseDate: new Date('2023-03-21'),
      coverUrl:    '/images/album-raizes.jpg',
      description: 'Um álbum sobre conexão com a terra, com a floresta e com o que há de mais essencial dentro de cada pessoa.',
      type:        'LP',
      published:   true,
      featured:    true,
      streamingLinks: {
        spotify: 'https://open.spotify.com',
        youtube: 'https://youtube.com',
        deezer:  'https://deezer.com',
      },
      tracks: {
        create: [
          {
            title: 'Floresta', slug: 'floresta', trackNumber: 1, duration: '4:12',
            lyrics: 'Quando o vento passa entre as folhas\nEu ouço o que o silêncio quer dizer\nA floresta fala, a terra chama\nE eu aprendo a florescer\n\nRaízes fundas, galhos largos\nO tempo aqui não tem pressa\nSou árvore e sou pássaro\nSou a própria natureza',
          },
          {
            title: 'Mar de Dentro', slug: 'mar-de-dentro', trackNumber: 2, duration: '3:58',
            lyrics: 'Tem um mar aqui dentro de mim\nQue vai e vem como as marés\nCarrego oceanos no peito\nE ainda assim me sustento de pé',
          },
          {
            title: 'Silêncio', slug: 'silencio', trackNumber: 3, duration: '5:01',
            lyrics: 'No silêncio cabe tudo\nO que eu digo e o que calo\nNo silêncio eu me encontro\nNo silêncio eu me acho',
          },
        ],
      },
    },
  })

  // Shows
  await prisma.show.createMany({
    data: [
      { title: 'Flora ao Vivo – Rio de Janeiro', date: new Date('2026-08-15'), venue: 'Circo Voador',   city: 'Rio de Janeiro', state: 'RJ', ticketUrl: 'https://ingresso.com', status: 'UPCOMING', featured: true  },
      { title: 'Flora ao Vivo – São Paulo',      date: new Date('2026-09-05'), venue: 'Sesc Pinheiros', city: 'São Paulo',       state: 'SP', ticketUrl: 'https://ingresso.com', status: 'UPCOMING', featured: true  },
      { title: 'Flora ao Vivo – Curitiba',       date: new Date('2026-10-03'), venue: 'Teatro Guaíra',  city: 'Curitiba',        state: 'PR',                                   status: 'UPCOMING', featured: false },
    ],
  })

  // Vídeos
  await prisma.video.createMany({
    data: [
      { youtubeId: 'jNQXAC9IVRw', title: 'Floresta – Clipe Oficial',      category: 'Clipes',     featured: true,  publishedAt: new Date() },
      { youtubeId: 'jNQXAC9IVRw', title: 'Flora – Sessão Acústica',       category: 'Acústico',   featured: true,  publishedAt: new Date() },
      { youtubeId: 'jNQXAC9IVRw', title: 'Bastidores do álbum Raízes',    category: 'Bastidores', featured: false, publishedAt: new Date() },
    ],
  })

  // Produtos
  await prisma.product.createMany({
    data: [
      { name: 'Vinil – Raízes',    slug: 'vinil-raizes',       description: 'Edição especial em vinil 180g',        price: 149.90, images: ['/images/vinil.jpg'],    stock: 50,  category: 'Música',      featured: true  },
      { name: 'Camiseta Floresta', slug: 'camiseta-floresta',  description: '100% algodão orgânico, serigrafada',   price:  79.90, images: ['/images/camiseta.jpg'], stock: 100, category: 'Vestuário',   featured: true  },
      { name: 'Pôster Raízes',     slug: 'poster-raizes',      description: 'Papel fotográfico premium 30×42cm',    price:  49.90, images: ['/images/poster.jpg'],   stock: 200, category: 'Arte',        featured: false },
      { name: 'Ecobag Flora',      slug: 'ecobag-flora',       description: 'Lona natural, estampa exclusiva',      price:  39.90, images: ['/images/ecobag.jpg'],   stock: 150, category: 'Acessórios',  featured: false },
    ],
  })

  // Posts do blog
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'O que a floresta me ensinou sobre criar', slug: 'o-que-a-floresta-me-ensinou',
        excerpt: 'Às vezes o melhor processo criativo é não processar nada.',
        content: 'Às vezes o melhor processo criativo é não processar nada. É apenas sentar sob uma árvore e escutar.\n\nFui para o interior no mês passado sem violão, sem caderno, sem intenção. Voltei com três músicas.',
        published: true, publishedAt: new Date('2026-01-15'), category: 'Reflexão',
      },
      {
        title: 'Novo álbum: os bastidores de Raízes', slug: 'bastidores-raizes',
        excerpt: 'Dois anos de processo. Mudanças, perdas, renascimentos.',
        content: 'Dois anos de processo. Mudanças, perdas, renascimentos. Tudo culminou nesse disco.\n\nComeçamos a gravar em março de 2022, numa fazenda no interior de Minas Gerais.',
        published: true, publishedAt: new Date('2026-02-20'), category: 'Bastidores',
      },
    ],
  })

  // Configurações do site
  await prisma.siteConfig.createMany({
    data: [
      { key: 'site_name',        value: JSON.stringify('Flora') },
      { key: 'site_description', value: JSON.stringify('Cantora e compositora brasileira. Música que vive entre a natureza, a espiritualidade e o silêncio.') },
      { key: 'spotify_url',      value: JSON.stringify('https://open.spotify.com/artist/floramusica') },
      { key: 'instagram_url',    value: JSON.stringify('https://instagram.com/flora.musica') },
      { key: 'youtube_url',      value: JSON.stringify('https://youtube.com/@floramusica') },
      { key: 'whatsapp',         value: JSON.stringify('+5541999999999') },
    ],
  })

  console.log('✅ Seed concluído com sucesso!')
}

main()
  .catch(e => { console.error('❌ Erro no seed:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
