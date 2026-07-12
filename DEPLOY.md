# Deploy — Flora Música

## Arquitetura
```
flora/
├── api/   → Node.js + Express + Prisma  →  Railway
└── web/   → Next.js 14                  →  Vercel
```

---

## 1. Railway — API + PostgreSQL

1. Acesse [railway.app](https://railway.app) → New Project
2. **Add Service → PostgreSQL** → copie a `DATABASE_URL`
3. **Add Service → GitHub Repo** → selecione este repositório
   - Root Directory: `api`
   - Build Command: `npm install && npm run build`
   - Start Command: `npx prisma migrate deploy && node dist/index.js`

4. Variáveis de ambiente na API (Settings → Variables):
```
DATABASE_URL        = (gerado automaticamente pelo PostgreSQL do Railway)
JWT_SECRET          = (openssl rand -base64 32)
NODE_ENV            = production
PORT                = 3001
FRONTEND_URL        = https://seu-projeto.vercel.app
CLOUDINARY_CLOUD_NAME = seu-cloud-name
CLOUDINARY_API_KEY    = sua-api-key
CLOUDINARY_API_SECRET = seu-api-secret
STRIPE_SECRET_KEY     = sk_live_... (opcional)
RESEND_API_KEY        = re_... (opcional)
RESEND_FROM_EMAIL     = contato@floramusica.com.br
```

5. Após primeiro deploy, popule o banco:
```bash
# Na aba "Deploy" do Railway → Execute Command:
npx tsx prisma/seed.ts
```

---

## 2. Vercel — Frontend

1. Acesse [vercel.com](https://vercel.com) → Import Repository
2. **Root Directory: `web`**
3. Framework: Next.js (detectado automaticamente)
4. Variáveis de ambiente:
```
NEXT_PUBLIC_API_URL  = https://sua-api.up.railway.app/api
NEXT_PUBLIC_APP_URL  = https://seu-projeto.vercel.app
```
5. Deploy!

---

## 3. Imagens necessárias

Coloque em `web/public/images/`:
| Arquivo | Dimensão | Uso |
|---|---|---|
| `hero-bg.jpg` | 1920×1080 | Background hero Home |
| `flora-sobre.jpg` | 1200×800 | Foto da Flora — Sobre |
| `og-default.jpg` | 1200×630 | Open Graph |

---

## Credenciais iniciais do Admin

- URL: `https://seu-projeto.vercel.app/admin/login`
- Email: `admin@floramusica.com.br`
- Senha: `flora@admin2024`

⚠️ **Troque a senha imediatamente após o primeiro login.**

---

## Comandos locais (desenvolvimento)

```bash
# API
cd api
cp .env.example .env       # preencha as variáveis
npm install
npm run db:push            # criar tabelas
npm run db:seed            # popular dados iniciais
npm run dev                # rodar na porta 3001

# Frontend
cd web
cp .env.example .env.local # preencha as variáveis
npm install
npm run dev                # rodar na porta 3000
```
