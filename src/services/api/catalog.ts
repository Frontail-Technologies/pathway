import { apiUrl } from './client'

export type PageInfo = { nextCursor: string | null; hasMore: boolean; total?: number }
export type CatalogList<T> = { items: T[]; page: PageInfo }
export type CatalogQuery = Record<string, string | undefined>

export class CatalogRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
  ) {
    super(message)
    this.name = 'CatalogRequestError'
  }
}

export const isNotFound = (error: unknown) => error instanceof CatalogRequestError && error.status === 404

export function toQueryString(query: CatalogQuery = {}) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) if (value) params.set(key, value)
  const text = params.toString()
  return text ? `?${text}` : ''
}

async function request<T>(path: string, query?: CatalogQuery): Promise<{ data: T; page?: PageInfo }> {
  if (!apiUrl) throw new CatalogRequestError('The catalog is not configured for this site (NEXT_PUBLIC_API_URL).', 0, 'NOT_CONFIGURED')
  const url = `${apiUrl.replace(/\/$/, '')}${path}${toQueryString(query)}`
  let response: Response
  try {
    response = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' })
  } catch {
    throw new CatalogRequestError('Could not reach Pathway. Check your connection and try again.', 0, 'NETWORK_ERROR')
  }
  const payload = (await response.json().catch(() => null)) as { data?: T; page?: PageInfo; error?: { code: string; message: string } } | null
  if (response.ok && payload && 'data' in payload) return { data: payload.data as T, page: payload.page }
  throw new CatalogRequestError(payload?.error?.message ?? `Catalog request failed (HTTP ${response.status})`, response.status, payload?.error?.code ?? 'UNEXPECTED_RESPONSE')
}

export async function catalogList<Dto, Item>(path: string, query: CatalogQuery, map: (dto: Dto) => Item): Promise<CatalogList<Item>> {
  const { data, page } = await request<Dto[]>(path, query)
  return { items: data.map(map), page: page ?? { nextCursor: null, hasMore: false, total: data.length } }
}

export async function catalogGet<Dto>(path: string, query?: CatalogQuery): Promise<Dto> {
  return (await request<Dto>(path, query)).data
}

export const seg = (value: string) => encodeURIComponent(value)
