const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL

const loopbackHosts = new Set(['localhost', '127.0.0.1', '[::1]'])

function browserApiUrl(url: string | undefined) {
  if (!url || typeof window === 'undefined') return url
  try {
    const api = new URL(url)
    const page = window.location.hostname
    if (loopbackHosts.has(api.hostname) && loopbackHosts.has(page) && api.hostname !== page) {
      api.hostname = page
      return api.toString().replace(/\/$/, '')
    }
  } catch {
    return url
  }
  return url
}

const apiUrl = browserApiUrl(configuredApiUrl)

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!apiUrl) throw new Error('NEXT_PUBLIC_API_URL is not configured')
  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`, { ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } })
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  return response.json() as Promise<T>
}
export { apiUrl }
