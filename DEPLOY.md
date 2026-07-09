# Guia de Deploy — Flora Música

## Pré-requisitos

- Conta no [Railway](https://railway.app) (banco de dados)
- Conta no [Vercel](https://vercel.com) (frontend)
- Conta no [Cloudinary](https://cloudinary.com) (imagens)
- Conta no [Stripe](https://stripe.com) (pagamentos — opcional para começar)
- Conta no [Resend](https://resend.com) (emails — opcional para começar)

---

## Passo 1 — Railway (PostgreSQL)

1. Acesse [railway.app](https://railway.app) e crie um novo projeto
2. Clique em **+ New Service → PostgreSQL**
3. Após criado, vá em **Variables** e copie a `DATABASE_URL`
   - O formato será: `postgresql://postgres:senha@host:port/railway`
   - **Adicione `?sslmode=require` no final:** `postgresql://...railway?sslmode=require`
postgresql://postgres:vCNZznpKEUZtMRMIFXIeaEPPbMvNmRvo@hayabusa.proxy.rlwy.net:58281/railway?sslmode=require
---

## Passo 2 — Cloudinary

1. Acesse [cloudinary.com](https://cloudinary.com) e crie conta gratuita
2. No Dashboard, copie:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## Passo 3 — Vercel

1. Faça push do projeto para um repositório GitHub/GitLab
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Em **Environment Variables**, adicione TODAS as variáveis abaixo:

```
DATABASE_URL          = postgresql://...?sslmode=require
AUTH_SECRET           = (gere com: openssl rand -base64 32)
NEXTAUTH_URL          = https://seu-projeto.vercel.app
CLOUDINARY_CLOUD_NAME = seu-cloud-name
CLOUDINARY_API_KEY    = sua-api-key
CLOUDINARY_API_SECRET = seu-api-secret
NEXT_PUBLIC_APP_URL   = https://seu-projeto.vercel.app

# Stripe (pode deixar vazio para começar)
STRIPE_SECRET_KEY              = sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_...
STRIPE_WEBHOOK_SECRET          = whsec_...

# Resend (pode deixar vazio para começar)
RESEND_API_KEY    = re_...
RESEND_FROM_EMAIL = contato@seudominio.com.br
```

4. Clique em **Deploy**

---

## Passo 4 — Banco de dados (após primeiro deploy)

No terminal local, com a DATABASE_URL do Railway:

```bash
# Instalar dependências
npm install

# Criar variável de ambiente local
echo 'DATABASE_URL="postgresql://...?sslmode=require"' > .env.local

# Criar as tabelas
npm run db:push

# Popular com dados iniciais
npm run db:seed
```

---

## Passo 5 — Acesso ao Admin

- URL: `https://seu-projeto.vercel.app/admin/login`
- Email: `admin@floramusica.com.br`
- Senha: `flora@admin2024`

⚠️ **Troque a senha imediatamente após o primeiro login.**

---

## Imagens necessárias

Coloque as imagens em `/public/images/` antes do deploy:

| Arquivo              | Dimensão recomendada | Uso                              |
|----------------------|----------------------|----------------------------------|
| `hero-bg.jpg`        | 1920×1080px          | Background do hero da Home       |
| `flora-sobre.jpg`    | 1200×800px           | Foto da Flora na página Sobre    |
| `og-default.jpg`     | 1200×630px           | Open Graph (compartilhamento)    |
| `album-placeholder.jpg` | 800×800px         | Placeholder de capa de álbum     |

---

## Geração do AUTH_SECRET

```bash
openssl rand -base64 32
```

Cole o resultado na variável `AUTH_SECRET` no Vercel.

---

## Stripe Webhook (para confirmar pagamentos)

1. No painel do Stripe, vá em **Developers → Webhooks**
2. Clique em **+ Add endpoint**
3. URL: `https://seu-projeto.vercel.app/api/stripe/webhook`
4. Eventos: selecione `checkout.session.completed`
5. Copie o **Signing Secret** e coloque em `STRIPE_WEBHOOK_SECRET`

---

## Domínio personalizado

1. No Vercel, vá em **Settings → Domains**
2. Adicione `floramusica.com.br` (ou o domínio da Flora)
3. Atualize `NEXTAUTH_URL` e `NEXT_PUBLIC_APP_URL` com o domínio final
4. Faça um novo deploy após atualizar as variáveis

---

## Comandos úteis

```bash
npm run dev          # Rodar localmente
npm run build        # Build de produção
npm run db:push      # Sincronizar schema com o banco
npm run db:migrate   # Rodar migrations (recomendado em produção)
npm run db:seed      # Popular banco com dados iniciais
npm run db:studio    # Abrir Prisma Studio (interface visual do banco)
```
