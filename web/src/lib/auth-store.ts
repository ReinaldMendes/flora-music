import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  user: { id: string; name: string; email: string; role: string } | null
  setAuth: (token: string, user: any) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => {
        if (typeof window !== 'undefined') localStorage.setItem('flora_token', token)
        set({ token, user })
      },
      clearAuth: () => {
        if (typeof window !== 'undefined') localStorage.removeItem('flora_token')
        set({ token: null, user: null })
      },
    }),
    { name: 'flora-auth' }
  )
)
