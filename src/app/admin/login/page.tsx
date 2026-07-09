'use client'
import { useState }    from 'react'
import { useRouter }   from 'next/navigation'
import { signIn }      from 'next-auth/react'
import Input           from '@/components/ui/Input'
import Button          from '@/components/ui/Button'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (!result || result.error) {
      setError('Email ou senha incorretos')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-flora-deep flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="font-display text-5xl text-flora-cream text-center mb-2">Flora</p>
        <p className="text-center text-xs font-body text-flora-cream/40 uppercase tracking-widest mb-10">
          Painel administrativo
        </p>

        <form onSubmit={handleSubmit} className="bg-flora-cream/5 border border-flora-cream/10 rounded p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-body text-flora-cream/60">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-flora-cream/5 border border-flora-cream/15 rounded text-flora-cream font-body text-sm focus:outline-none focus:border-flora-moss transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-body text-flora-cream/60">Senha</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-flora-cream/5 border border-flora-cream/15 rounded text-flora-cream font-body text-sm focus:outline-none focus:border-flora-moss transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm font-body text-red-400">{error}</p>
          )}

          <Button type="submit" loading={loading} className="w-full justify-center">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
