import { catalogGet } from '@/services/api/catalog'

export type CutoffRow = {
  institute: { slug: string; name: string; state: string | null }
  program: string
  quota: string
  category: string
  gender: 'neutral' | 'female'
  openingRank: number
  closingRank: number
}

export type CutoffResult = {
  exam: { slug: string; label: string }
  year: number
  round: number
  total: number
  rows: CutoffRow[]
  institutes: { slug: string; name: string }[]
}

export type CutoffFilters = { exam: 'jee-main' | 'jee-advanced'; institute: string; q: string; category: string; quota: string; gender: 'neutral' | 'female'; pwd: boolean; page: number }

export const PAGE_SIZE = 50
const categories = ['OPEN', 'EWS', 'OBC-NCL', 'SC', 'ST']
const quotas = ['AI', 'HS', 'OS', 'JK', 'LA', 'GO']

export function parseCutoffFilters(params: Record<string, string | string[] | undefined>): CutoffFilters {
  const one = (key: string) => {
    const value = params[key]
    return (Array.isArray(value) ? value[0] : value) ?? ''
  }
  const page = Number(one('page'))
  return {
    exam: one('exam') === 'jee-advanced' ? 'jee-advanced' : 'jee-main',
    institute: /^[a-z0-9-]{1,200}$/.test(one('institute')) ? one('institute') : '',
    q: one('q').slice(0, 120),
    category: categories.includes(one('category')) ? one('category') : 'OPEN',
    quota: quotas.includes(one('quota')) ? one('quota') : '',
    gender: one('gender') === 'female' ? 'female' : 'neutral',
    pwd: one('pwd') === 'true',
    page: Number.isInteger(page) && page > 1 ? page : 1,
  }
}

export function cutoffSearch(filters: CutoffFilters) {
  const params = new URLSearchParams({ exam: filters.exam })
  if (filters.institute) params.set('institute', filters.institute)
  if (filters.q.trim()) params.set('q', filters.q.trim())
  if (filters.category !== 'OPEN') params.set('category', filters.category)
  if (filters.quota) params.set('quota', filters.quota)
  if (filters.gender === 'female') params.set('gender', 'female')
  if (filters.pwd) params.set('pwd', 'true')
  if (filters.page > 1) params.set('page', String(filters.page))
  return params.toString()
}

export const getCutoffs = (filters: CutoffFilters) =>
  catalogGet<CutoffResult>('/cutoffs/josaa', {
    exam: filters.exam,
    institute: filters.institute || undefined,
    q: filters.q.trim() || undefined,
    category: filters.category,
    quota: filters.quota || undefined,
    gender: filters.gender,
    pwd: filters.pwd ? 'true' : undefined,
    limit: String(PAGE_SIZE),
    offset: String((filters.page - 1) * PAGE_SIZE),
  }).catch(() => null)
