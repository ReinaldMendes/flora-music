# Deploy — Flora Eça

## Arquitetura
```
flora/
├── web/   → Next.js 14  →  Vercel  (frontend)
└── api/   → Node.js + Express + Prisma  →  Railway (backend)
```

---

## 1. Imagens obrigatórias (coloque em web/public/images/)

| Arquivo | Uso |
|---|---|
| `hero-bg.jpg` | Foto da Flora — background do Hero (use a foto enviada, 1920×1080) |
| `flora-portrait.jpg` | Foto da Flora — seção Sobre (use a foto enviada, 800×1200) |
| `og.jpg` | Open Graph compartilhamento (1200×630) |
| `album-raizes.jpg` | Capa do álbum Raízes |
| `album-broto.jpg` | Capa do EP Broto |
| `vinil.jpg` | Foto produto vinil |
| `camiseta.jpg` | Foto produto camiseta |
| `poster.jpg` | Foto produto pôster |
| `ecobag.jpg` | Foto produto ecobag |
| `caderno.jpg` | Foto produto caderno |
| `blog-floresta.jpg` | Capa post blog |
| `blog-raizes.jpg` | Capa post blog |

---

## 2. Railway — API + PostgreSQL

1. Acesse railway.app → New Project
2. **Add Service → PostgreSQL** → copie a DATABASE_URL
3. **Add Service → GitHub Repo** → selecione este repo
   - Root Directory: `api`
   - Build Command: `npm install && npm run build`
   - Start Command: `npx prisma migrate deploy && node dist/index.js`

4. Variables (Settings → Variables):
```
DATABASE_URL        = (gerado pelo PostgreSQL do Railway)
JWT_SECRET          = (openssl rand -base64 32)
NODE_ENV            = production
PORT                = 3001
FRONTEND_URL        = https://seu-projeto.vercel.app
CLOUDINARY_CLOUD_NAME = ...
CLOUDINARY_API_KEY    = ...
CLOUDINARY_API_SECRET = ...
STRIPE_SECRET_KEY     = sk_live_... (opcional)
RESEND_API_KEY        = re_... (opcional)
RESEND_FROM_EMAIL     = contato@floramusica.com.br
```

5. Após deploy, rode o seed:
   Railway → Deploy tab → Execute Command:
   ```
   npx tsx prisma/seed.ts
   ```

---

## 3. Vercel — Frontend

1. vercel.com → Import Repository
2. **Root Directory: `web`**
3. Framework: Next.js (auto-detectado)
4. Variables:
```
NEXT_PUBLIC_API_URL = https://sua-api.up.railway.app/api
NEXT_PUBLIC_APP_URL = https://seu-projeto.vercel.app
```
5. Deploy!

---

## 4. Credenciais Admin

- URL: `https://seu-projeto.vercel.app/admin/login`
- Email: `admin@floramusica.com.br`
- Senha: `flora@admin2024`

⚠️ Troque a senha imediatamente após o primeiro login.

---

## 5. Desenvolvimento local

```bash
# API
cd api
cp .env.example .env    # preencha DATABASE_URL (Neon.tech gratuito)
npm install
npm run db:push
npm run db:seed
npm run dev             # porta 3001

# Frontend
cd web
cp .env.example .env.local
npm install
npm run dev             # porta 3000
```
