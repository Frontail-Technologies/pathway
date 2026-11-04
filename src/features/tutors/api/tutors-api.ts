import { cache } from 'react'
import { catalogGet, catalogList, isNotFound, seg, type CatalogQuery } from '@/services/api/catalog'
import { labels, type TermRef } from '@/features/catalog/format'
import type { Tutor, TutorAvatarSpec, TutorDetail, TutorExam, TutorLanguage, TutorLevel, TutorMode, TutorSubject } from '../data/tutors'

export type TutorListDto = {
  slug: string
  name: string
  headline: string
  intro: string
  avatar: TutorAvatarSpec
  portraitUrl: string | null
  subjects: TermRef[]
  exams: TermRef[]
  studyLevels: TermRef[]
  languages: TermRef[]
  modes: TermRef[]
  featured: boolean
  hasDetailPage: boolean
}

type TutorDetailDto = TutorListDto & { longBio: string | null; traits: string[]; whoHelps: string[] }

export function toTutor(dto: TutorListDto): Tutor {
  return {
    id: dto.slug,
    slug: dto.slug,
    name: dto.name,
    portrait: dto.portraitUrl ?? undefined,
    avatar: dto.avatar,
    headline: dto.headline,
    subjects: labels(dto.subjects) as TutorSubject[],
    exams: labels(dto.exams) as TutorExam[],
    studyLevels: labels(dto.studyLevels) as TutorLevel[],
    languages: labels(dto.languages) as TutorLanguage[],
    modes: labels(dto.modes) as TutorMode[],
    intro: dto.intro,
    featured: dto.featured,
    hasDetailPage: dto.hasDetailPage,
  }
}

export const listTutors = (query: CatalogQuery) => catalogList('/tutors', query, toTutor)

export type DetailedTutor = Tutor & { detail: TutorDetail; related: Tutor[] }

export const getTutorProfile = cache(async (slug: string): Promise<DetailedTutor | undefined> => {
  let dto: TutorDetailDto
  try {
    dto = await catalogGet<TutorDetailDto>(`/tutors/${seg(slug)}`)
  } catch (error) {
    if (isNotFound(error)) return undefined
    throw error
  }
  const related = await catalogGet<TutorListDto[]>(`/tutors/${seg(slug)}/related`, { limit: '3' })
  return { ...toTutor(dto), detail: { longBio: dto.longBio ?? '', traits: dto.traits, whoHelps: dto.whoHelps }, related: related.map(toTutor) }
})
