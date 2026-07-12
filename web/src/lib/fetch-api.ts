/**
 * Fetch seguro para o build do Next.js:
 * - Retorna fallback se a API estiver offline
 * - Garante que o resultado é sempre do tipo esperado
 */
export async function fetchApi<T>(
  path: string,
  fallback: T,
  options?: RequestInit
): Promise<T> {
  const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
  try {
    const res = await fetch(`${API}${path}`, {
      cache: 'no-store',
      ...options,
    })
    if (!res.ok) return fallback
    const data = await res.json()
    return data ?? fallback
  } catch {
    return fallback
  }
}
