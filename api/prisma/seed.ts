import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌿 Seed iniciado...')

  // Admin
  const hash = await bcrypt.hash('flora@admin2024', 12)
  await prisma.user.upsert({
    where: { email: 'admin@floramusica.com.br' },
    update: {},
    create: { name: 'Flora', email: 'admin@floramusica.com.br', password: hash, role: 'ADMIN' },
  })

  const count = await prisma.album.count()
  if (count > 0) { console.log('✓ Dados já existem'); return }

  // Álbum principal
  await prisma.album.create({
    data: {
      title: 'Raízes',
      slug: 'raizes',
      releaseDate: new Date('2023-03-21'),
      coverUrl: '/images/album-raizes.jpg',
      description: 'Um álbum sobre conexão com a terra, com a floresta e com o que há de mais essencial dentro de cada pessoa.',
      type: 'LP',
      published: true,
      featured: true,
      streamingLinks: {
        spotify: 'https://open.spotify.com',
        youtube: 'https://youtube.com',
        deezer: 'https://deezer.com',
      },
      tracks: {
        create: [
          {
            title: 'Floresta',
            slug: 'floresta',
            trackNumber: 1,
            duration: '4:12',
            lyrics: `Quando o vento passa entre as folhas
Eu ouço o que o silêncio quer dizer
A floresta fala, a terra chama
E eu aprendo a florescer

Raízes fundas, galhos largos
O tempo aqui não tem pressa
Sou árvore e sou pássaro
Sou a própria natureza`,
          },
          {
            title: 'Mar de Dentro',
            slug: 'mar-de-dentro',
            trackNumber: 2,
            duration: '3:58',
            lyrics: `Tem um mar aqui dentro de mim
Que vai e vem como as marés
Carrego oceanos no peito
E ainda assim me sustento de pé`,
          },
          {
            title: 'Silêncio',
            slug: 'silencio',
            trackNumber: 3,
            duration: '5:01',
            lyrics: `No silêncio cabe tudo
O que eu digo e o que calo
No silêncio eu me encontro
No silêncio eu me acho`,
          },
          {
            title: 'Raiz',
            slug: 'raiz',
            trackNumber: 4,
            duration: '4:33',
            lyrics: `Sou raiz que não se vê
Mas sustenta tudo que está em pé
Sou a força que alimenta
A beleza que se apresenta`,
          },
          {
            title: 'Chuva',
            slug: 'chuva',
            trackNumber: 5,
            duration: '3:45',
            lyrics: `A chuva lava o que já foi
E prepara o solo pro que vai vir
Cada gota é um recomeço
Cada temporal é um aprender a sorrir`,
          },
        ],
      },
    },
  })

  // EP
  await prisma.album.create({
    data: {
      title: 'Broto',
      slug: 'broto',
      releaseDate: new Date('2021-09-01'),
      coverUrl: '/images/album-broto.jpg',
      description: 'As primeiras canções. Um broto que encontra a luz.',
      type: 'EP',
      published: true,
      featured: false,
      streamingLinks: {
        spotify: 'https://open.spotify.com',
        youtube: 'https://youtube.com',
      },
      tracks: {
        create: [
          { title: 'Origem', slug: 'origem', trackNumber: 1, duration: '3:45', lyrics: 'Vim de onde a mata começa\nOnde o sol se levanta devagar\nCarrego a semente no peito\nQue um dia vai germinar' },
          { title: 'Vento', slug: 'vento', trackNumber: 2, duration: '4:10', lyrics: 'O vento não tem dono\nMas sabe bem pra onde vai\nAssim como eu que sigo\nSem destino que me atraia' },
          { title: 'Nascente', slug: 'nascente', trackNumber: 3, duration: '3:22', lyrics: 'Tem uma fonte aqui dentro\nQue nunca vai secar\nÉ a água que me lembra\nQue sempre vou voltar' },
        ],
      },
    },
  })

  // Shows
  await prisma.show.createMany({
    data: [
      { title: 'Flora Eça ao Vivo — Rio de Janeiro', date: new Date('2026-08-15'), venue: 'Circo Voador', city: 'Rio de Janeiro', state: 'RJ', ticketUrl: 'https://ingresso.com', status: 'UPCOMING', featured: true },
      { title: 'Flora Eça ao Vivo — São Paulo', date: new Date('2026-09-05'), venue: 'Sesc Pinheiros', city: 'São Paulo', state: 'SP', ticketUrl: 'https://ingresso.com', status: 'UPCOMING', featured: true },
      { title: 'Flora Eça ao Vivo — Curitiba', date: new Date('2026-10-03'), venue: 'Teatro Guaíra', city: 'Curitiba', state: 'PR', status: 'UPCOMING', featured: false },
      { title: 'Flora Eça ao Vivo — Belo Horizonte', date: new Date('2026-11-14'), venue: 'Palácio das Artes', city: 'Belo Horizonte', state: 'MG', status: 'UPCOMING', featured: false },
    ],
  })

  // Vídeos
  await prisma.video.createMany({
    data: [
      { youtubeId: 'jNQXAC9IVRw', title: 'Floresta — Clipe Oficial', category: 'Clipes', featured: true, publishedAt: new Date('2023-04-01') },
      { youtubeId: 'jNQXAC9IVRw', title: 'Flora Eça — Sessão Acústica', category: 'Acústico', featured: true, publishedAt: new Date('2023-06-15') },
      { youtubeId: 'jNQXAC9IVRw', title: 'Mar de Dentro — Lyric Video', category: 'Lyric', featured: true, publishedAt: new Date('2023-07-20') },
      { youtubeId: 'jNQXAC9IVRw', title: 'Bastidores do álbum Raízes', category: 'Bastidores', featured: false, publishedAt: new Date('2023-03-28') },
    ],
  })

  // Produtos
  await prisma.product.createMany({
    data: [
      { name: 'Vinil — Raízes', slug: 'vinil-raizes', description: 'Edição especial em vinil 180g com encarte exclusivo.', price: 149.90, images: ['/images/vinil.jpg'], stock: 50, category: 'Música', featured: true },
      { name: 'Camiseta Floresta', slug: 'camiseta-floresta', description: '100% algodão orgânico, serigrafada à mão com tintas naturais.', price: 89.90, images: ['/images/camiseta.jpg'], stock: 80, category: 'Vestuário', featured: true },
      { name: 'Pôster Raízes', slug: 'poster-raizes', description: 'Papel fotográfico premium 30×42cm, acabamento matte.', price: 59.90, images: ['/images/poster.jpg'], stock: 150, category: 'Arte', featured: false },
      { name: 'Ecobag Flora', slug: 'ecobag-flora', description: 'Lona natural com estampa exclusiva, alça reforçada.', price: 49.90, images: ['/images/ecobag.jpg'], stock: 100, category: 'Acessórios', featured: false },
      { name: 'Caderno Poético', slug: 'caderno-poetico', description: 'Caderno artesanal com letras e poemas originais de Flora Eça.', price: 79.90, images: ['/images/caderno.jpg'], stock: 60, category: 'Arte', featured: false },
    ],
  })

  // Blog
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'O que a floresta me ensinou sobre criar',
        slug: 'o-que-a-floresta-me-ensinou',
        excerpt: 'Às vezes o melhor processo criativo é não processar nada. É apenas sentar sob uma árvore e escutar.',
        content: `Às vezes o melhor processo criativo é não processar nada. É apenas sentar sob uma árvore e escutar.

Fui para o interior no mês passado sem violão, sem caderno, sem intenção. Voltei com três músicas.

Existe algo que a natureza faz com a gente quando paramos de tentar controlá-la: ela simplesmente preenche os espaços que criamos. E é exatamente aí, nesse espaço de abertura, que as canções nascem.

Não preciso entender o processo. Só preciso aparecer.`,
        published: true,
        publishedAt: new Date('2026-01-15'),
        category: 'Processo Criativo',
        coverUrl: '/images/blog-floresta.jpg',
      },
      {
        title: 'Bastidores do álbum Raízes',
        slug: 'bastidores-raizes',
        excerpt: 'Dois anos de processo. Mudanças, perdas, renascimentos. Tudo culminou nesse disco.',
        content: `Dois anos de processo. Mudanças, perdas, renascimentos. Tudo culminou nesse disco.

Começamos a gravar em março de 2022, numa fazenda no interior de Minas. A ideia era simples: gravar ao vivo, sem click track, sem edições excessivas. Só nós e os instrumentos.

O que aconteceu foi muito além do que esperávamos.

Cada canção carrega a memória do momento em que foi gravada — o vento entrando pela janela aberta, o cachorro que latiu no fundo de "Silêncio", a chuva que chegou exatamente quando começamos "Chuva".

Não foi planejado. Foi real.`,
        published: true,
        publishedAt: new Date('2026-02-20'),
        category: 'Bastidores',
        coverUrl: '/images/blog-raizes.jpg',
      },
    ],
  })

  // Config do site
  await prisma.siteConfig.createMany({
    data: [
      { key: 'site_name', value: '"Flora Eça"' },
      { key: 'site_description', value: '"Cantora e compositora brasileira. Canções que atravessam o tempo."' },
      { key: 'spotify_url', value: '"https://open.spotify.com/artist/floraeca"' },
      { key: 'instagram_url', value: '"https://instagram.com/flora.musica"' },
      { key: 'youtube_url', value: '"https://youtube.com/@floramusica"' },
      { key: 'whatsapp', value: '"+5521999999999"' },
      { key: 'email_shows', value: '"alinefpimentel@gmail.com"' },
      { key: 'email_contato', value: '"floramusicacontato@gmail.com"' },
    ],
  })

  console.log('✅ Seed concluído!')
}

main()
  .catch(e => { console.error('❌ Erro:', e); process.exit(1) })
  .finally(() => prisma.$disconnect())
