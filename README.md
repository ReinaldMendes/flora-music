# Flora — Site Oficial

Site oficial da cantora e compositora Flora. Construído com Next.js 14 (App Router), Prisma, PostgreSQL, NextAuth, Stripe e Cloudinary.

---

## Stack

- **Frontend:** Next.js 14 App Router · TypeScript · TailwindCSS · Framer Motion
- **Backend:** Next.js API Routes · Prisma ORM · PostgreSQL
- **Auth:** NextAuth v5 (JWT)
- **Mídia:** Cloudinary
- **Pagamentos:** Stripe
- **Email:** Resend
- **Deploy:** Vercel (frontend) + Railway (PostgreSQL)

---

## Setup local

### 1. Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Banco de dados

```bash
# Criar as tabelas
npm run db:push

# Popular com dados iniciais
npm run db:seed
```

### 4. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## Admin

URL: http://localhost:3000/admin/login

**Credenciais iniciais (seed):**
- Email: `admin@floramusica.com.br`
- Senha: `flora@admin2024`

⚠️ **Troque a senha após o primeiro login em produção.**

---

## Deploy

### Railway (PostgreSQL)

1. Crie um projeto no [Railway](https://railway.app)
2. Adicione um serviço PostgreSQL
3. Copie a `DATABASE_URL` gerada

### Vercel (Frontend)

1. Conecte o repositório no [Vercel](https://vercel.com)
2. Configure todas as variáveis de ambiente (veja `.env.example`)
3. O build roda `prisma generate && next build` automaticamente
4. Após o primeiro deploy, rode as migrations:
   ```bash
   npx prisma migrate deploy
   ```

---

## Estrutura de pastas

```
flora-musica/
├── src/
│   ├── app/
│   │   ├── (public)/        ← Páginas públicas (Home, Sobre, Música, etc.)
│   │   ├── (admin)/         ← Painel administrativo
│   │   └── api/             ← API Routes (REST)
│   ├── components/
│   │   ├── ui/              ← Componentes base (Button, Input, etc.)
│   │   ├── layout/          ← Navbar, Footer
│   │   ├── sections/        ← Seções das páginas públicas
│   │   ├── admin/           ← Componentes do painel admin
│   │   └── loja/            ← Componentes da loja (Cart, etc.)
│   ├── lib/                 ← Prisma, Auth, Cloudinary, Stripe, Utils
│   └── types/               ← Tipos TypeScript globais
├── prisma/
│   ├── schema.prisma        ← Schema do banco de dados
│   └── seed.ts              ← Dados iniciais
└── public/
    └── images/              ← Imagens estáticas (coloque hero-bg.jpg aqui)
```

---

## Imagens necessárias

Coloque em `/public/images/`:

| Arquivo | Uso |
|---|---|
| `hero-bg.jpg` | Background do hero da Home |
| `flora-sobre.jpg` | Foto da Flora na página Sobre |
| `og-default.jpg` | Open Graph padrão (1200×630) |
| `album-placeholder.jpg` | Placeholder de capa de álbum |

---

## Serviços externos

| Serviço | Uso | Plano gratuito |
|---|---|---|
| [Railway](https://railway.app) | PostgreSQL | $5 free crédito |
| [Cloudinary](https://cloudinary.com) | Upload de imagens | 25GB gratuito |
| [Stripe](https://stripe.com) | Pagamentos | Sandbox gratuito |
| [Resend](https://resend.com) | Emails transacionais | 3.000/mês grátis |

---

## Comandos úteis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run db:push      # Sincronizar schema com o banco
npm run db:migrate   # Rodar migrations (produção)
npm run db:seed      # Popular banco com dados iniciais
npm run db:studio    # Abrir Prisma Studio (GUI do banco)
```
