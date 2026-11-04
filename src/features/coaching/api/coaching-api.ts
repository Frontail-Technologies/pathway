import { cache } from 'react'
import { catalogGet, catalogList, isNotFound, seg, type CatalogQuery } from '@/services/api/catalog'
import { labels, type TermRef } from '@/features/catalog/format'
import type { CoachingProvider, CoachingProviderType, LearningMode } from '../data/coaching'

export type CoachingListDto = {
  slug: string
  name: string
  providerType: 'coaching_institute' | 'online_platform'
  location: { city: { slug: string; name: string } | null; state: { slug: string; name: string } | null; onlineOnly: boolean }
  exams: TermRef[]
  subjects: TermRef[]
  modes: TermRef[]
  courseTypes: TermRef[]
  programLabel: string
  highlights: string[]
  coverImageUrl: string | null
  featured: boolean
  hasDetailPage: boolean
}

type CoachingDetailDto = CoachingListDto & {
  about: string | null
  gallery: { url: string; alt: string | null }[]
  programs: { name: string; modeLabel: string | null; courseType: TermRef | null; description: string }[]
  facultyNotes: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
}

const providerTypes: Record<CoachingListDto['providerType'], CoachingProviderType> = { coaching_institute: 'Coaching Institute', online_platform: 'Online Platform' }
const modeLabels: Record<string, LearningMode> = { online: 'Online', 'in-person': 'Offline', hybrid: 'Hybrid' }

export type CoachingListItem = CoachingProvider & { coverImageUrl?: string; hasDetailPage: boolean }
export type CoachingDetail = CoachingListItem & { similar: CoachingListItem[] }

export function toCoachingListItem(dto: CoachingListDto): CoachingListItem {
  return {
    id: dto.slug,
    slug: dto.slug,
    name: dto.name,
    providerType: providerTypes[dto.providerType],
    location: dto.location.onlineOnly || !dto.location.city ? 'Online' : dto.location.city.name,
    state: dto.location.state?.name,
    exams: labels(dto.exams),
    subjects: labels(dto.subjects),
    modes: dto.modes.map((mode) => modeLabels[mode.slug]).filter((mode): mode is LearningMode => Boolean(mode)),
    courseTypes: labels(dto.courseTypes),
    programLabel: dto.programLabel,
    highlights: dto.highlights,
    featured: dto.featured,
    coverImageUrl: dto.coverImageUrl ?? undefined,
    hasDetailPage: dto.hasDetailPage,
  }
}

export const listCoaching = (query: CatalogQuery) => catalogList('/coaching', query, toCoachingListItem)

export const getCoachingDetail = cache(async (slug: string): Promise<CoachingDetail | undefined> => {
  let dto: CoachingDetailDto
  try {
    dto = await catalogGet<CoachingDetailDto>(`/coaching/${seg(slug)}`)
  } catch (error) {
    if (isNotFound(error)) return undefined
    throw error
  }
  if (!dto.hasDetailPage) return undefined
  const similar = await catalogGet<CoachingListDto[]>(`/coaching/${seg(slug)}/similar`, { limit: '3' })
  return {
    ...toCoachingListItem(dto),
    aboutCopy: dto.about ?? undefined,
    gallery: dto.gallery.map((image) => image.url),
    programs: dto.programs.map((program) => ({ name: program.name, mode: program.modeLabel ?? undefined, courseType: program.courseType?.label, description: program.description })),
    facultyNotes: dto.facultyNotes,
    faqs: dto.faqs,
    similar: similar.map(toCoachingListItem),
  }
})
