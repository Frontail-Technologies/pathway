import { cache } from 'react'
import { emptyFilters as emptyCourseFilters, serializeCourseFilters } from '@/features/courses/data/filters'
import { serializeExamFilters } from '@/features/exams/data/exams'
import { emptyFilters as emptyScholarshipFilters, serializeScholarshipFilters } from '@/features/scholarships/data/filters'
import { emptyFilters as emptyCoachingFilters, examOptions as coachingExamOptions, serializeCoachingFilters } from '@/features/coaching/data/filters'
import { emptyFilters as emptyTutorFilters, filterGroups as tutorFilterGroups, serializeTutorFilters } from '@/features/tutors/data/tutors'
import { examFromSlug } from '@/features/college-predictor/data/predictor'
import { rankExamFromSlug } from '@/features/rank-predictor/data/rank'
import { listCatalogEntries, type CatalogKind } from '@/features/search/api/catalog-search'
import type { SearchEntry } from '@/features/search/data/search-index'
import { apiQueryFrom } from '@/lib/search-params'
import { getStream, type StreamDefinition } from '../data/stream-taxonomy'
import type { StreamHub, StreamSection } from '../data/stream-hub'

const SECTION_SIZE = 8
const withQuery = (path: string, query: string) => (query ? `${path}?${query}` : path)
const degreeSlug = (label: string) => label.toLowerCase().replace(/[^a-z0-9]/g, '')

const tutorExamOptions = tutorFilterGroups.find((group) => group.key === 'exams')?.options ?? []

type Plan = { id: string; title: string; kind: CatalogKind; listing: string; query: string }

function plansFor(stream: StreamDefinition): Plan[] {
  const coachingExams = stream.examKeywords.filter((name) => (coachingExamOptions as readonly string[]).includes(name))
  const tutorExams = stream.examKeywords.filter((name) => (tutorExamOptions as readonly string[]).includes(name))
  return [
    { id: 'courses', title: `Popular ${stream.name} Courses`, kind: 'course', listing: '/courses', query: stream.courseStream ? serializeCourseFilters({ ...emptyCourseFilters, streams: [stream.courseStream] }, 'popularity') : '' },
    { id: 'exams', title: `${stream.name} Entrance Exams`, kind: 'exam', listing: '/exams', query: stream.studyArea ? serializeExamFilters({ studyAreas: [stream.studyArea], scopes: [] }, 'popular', '') : '' },
    { id: 'colleges', title: `${stream.name} Colleges`, kind: 'college', listing: '/colleges', query: stream.collegeDegrees.length ? `courses=${stream.collegeDegrees.map(degreeSlug).join(',')}` : '' },
    { id: 'scholarships', title: `${stream.name} Scholarships`, kind: 'scholarship', listing: '/scholarships', query: stream.scholarshipStream ? serializeScholarshipFilters({ ...emptyScholarshipFilters, streams: [stream.scholarshipStream] }, 'recommended') : '' },
    { id: 'coaching', title: `${stream.name} Coaching`, kind: 'coaching', listing: '/coaching', query: coachingExams.length ? serializeCoachingFilters({ ...emptyCoachingFilters, exams: coachingExams }, 'recommended', '') : '' },
    { id: 'tutors', title: `${stream.name} Tutors`, kind: 'tutor', listing: '/tutors', query: tutorExams.length ? serializeTutorFilters({ ...emptyTutorFilters, exams: tutorExams }, 'featured', '') : '' },
  ]
}

const MIN_SECTIONS = 2

export const getStreamHub = cache(async (slug: string): Promise<StreamHub | undefined> => {
  const stream = getStream(slug)
  if (!stream) return undefined
  const plans = plansFor(stream).filter((plan) => plan.query)
  const lists = await Promise.all(plans.map((plan) => listCatalogEntries(plan.kind, { ...apiQueryFrom(plan.query), limit: String(SECTION_SIZE) })))

  const sections: StreamSection[] = plans.map((plan, index) => ({
    id: plan.id,
    title: plan.title,
    kind: plan.kind,
    entries: lists[index]!.items,
    viewAllHref: withQuery(plan.listing, plan.query),
  }))

  const examSection = sections.find((section) => section.id === 'exams')
  const tools: SearchEntry[] = (examSection?.entries ?? []).flatMap((entry) => {
    const examSlug = entry.id.replace(/^exam-/, '')
    const name = entry.title.split(' — ')[0]
    return [
      ...(examFromSlug[examSlug] ? [{ id: `cp-${examSlug}`, kind: 'tool' as const, title: `${name} College Predictor`, subtitle: 'Preview colleges from your score', href: `/college-predictor?exam=${examSlug}`, keywords: '' }] : []),
      ...(rankExamFromSlug[examSlug] ? [{ id: `rp-${examSlug}`, kind: 'tool' as const, title: `${name} Rank Predictor`, subtitle: 'Estimate a rank range from your marks', href: `/rank-predictor?exam=${examSlug}`, keywords: '' }] : []),
    ]
  })
  const ordered = [...sections.slice(0, 3), { id: 'tools', title: 'Predictors & Tools', kind: 'tool' as const, entries: tools }, ...sections.slice(3)]

  const hub = { stream, sections: ordered.filter((section) => section.entries.length > 0) }
  return hub.sections.filter((section) => section.kind !== 'tool').length >= MIN_SECTIONS ? hub : undefined
})
