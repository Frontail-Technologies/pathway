import { cache } from 'react'
import { catalogGet, catalogList, isNotFound, seg, type CatalogQuery } from '@/services/api/catalog'
import type { NoteType } from '../types/note'

export type PublicNote = {
  slug: string
  title: string
  shortDescription: string | null
  noteType: NoteType
  studyLevel: string | null
  stream: string | null
  subject: string | null
  pricingType: 'free' | 'paid'
  pricePaise: number | null
  coverImageUrl: string | null
  authorName: string | null
  providerName: string | null
  hasPreview: boolean
  pageCount: number | null
  exams: { slug: string; label: string }[]
  publishedAt: string | null
}

export type PublicNoteDetail = PublicNote & { description: string | null; previewUrl: string | null; programs: { slug: string; label: string }[] }

export const listNotes = (query: CatalogQuery) => catalogList<PublicNote, PublicNote>('/notes', query, (item) => item)

export const getNote = cache(async (slug: string): Promise<PublicNoteDetail | undefined> => {
  try {
    return await catalogGet<PublicNoteDetail>(`/notes/${seg(slug)}`)
  } catch (error) {
    if (isNotFound(error)) return undefined
    throw error
  }
})

export const notePrice = (note: Pick<PublicNote, 'pricingType' | 'pricePaise'>) =>
  note.pricingType === 'free' || !note.pricePaise ? 'Free' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(note.pricePaise / 100)

export function notesApiQuery(params: URLSearchParams): CatalogQuery {
  const types = params.get('type') ?? ''
  const pricing = (params.get('pricing') ?? '').split(',').filter(Boolean)
  return {
    q: params.get('q') || undefined,
    type: types || undefined,
    pricing: pricing.length === 1 ? pricing[0] : undefined,
  }
}
