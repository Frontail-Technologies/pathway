import { colleges } from '@/features/colleges/data/colleges'
import { courses } from '@/features/courses/data/courses'
import { emptyFilters as emptyCourseFilters, serializeCourseFilters } from '@/features/courses/data/filters'
import { exams, serializeExamFilters } from '@/features/exams/data/exams'
import { scholarships } from '@/features/scholarships/data/scholarships'
import { emptyFilters as emptyScholarshipFilters, serializeScholarshipFilters } from '@/features/scholarships/data/filters'
import { coachingProviders } from '@/features/coaching/data/coaching'
import { emptyFilters as emptyCoachingFilters, serializeCoachingFilters } from '@/features/coaching/data/filters'
import { tutors, emptyFilters as emptyTutorFilters, serializeTutorFilters } from '@/features/tutors/data/tutors'
import { examFromSlug } from '@/features/college-predictor/data/predictor'
import { rankExamFromSlug } from '@/features/rank-predictor/data/rank'
import { getSearchIndex, type SearchEntry, type SearchKind } from '@/features/search/data/search-index'
import { getStream, streams, type StreamDefinition } from './stream-taxonomy'

export type StreamSection = {
  id: string
  title: string
  kind: SearchKind
  entries: SearchEntry[]
  /** Listing pre-filtered to this stream where the listing supports it. */
  viewAllHref?: string
}

export type StreamHub = { stream: StreamDefinition; sections: StreamSection[] }

const withQuery = (path: string, query: string) => (query ? `${path}?${query}` : path)

/** Reuse the search index so titles, subtitles and "never 404" links match search results. */
function entriesFor(kind: SearchKind, ids: string[]): SearchEntry[] {
  const wanted = new Set(ids)
  return getSearchIndex().filter((entry) => entry.kind === kind && wanted.has(entry.id))
}

export function buildStreamHub(stream: StreamDefinition): StreamHub {
  const keywordMatch = (list: readonly string[]) => list.some((name) => stream.examKeywords.includes(name))
  const streamExams = stream.studyArea ? exams.filter((exam) => exam.studyArea === stream.studyArea) : []

  const tools: SearchEntry[] = streamExams.flatMap((exam) => [
    ...(examFromSlug[exam.slug] ? [{ id: `cp-${exam.slug}`, kind: 'tool' as const, title: `${exam.shortName} College Predictor`, subtitle: 'Preview colleges from your score', href: `/college-predictor?exam=${exam.slug}`, keywords: '' }] : []),
    ...(rankExamFromSlug[exam.slug] ? [{ id: `rp-${exam.slug}`, kind: 'tool' as const, title: `${exam.shortName} Rank Predictor`, subtitle: 'Estimate a rank range from your marks', href: `/rank-predictor?exam=${exam.slug}`, keywords: '' }] : []),
  ])

  const sections: StreamSection[] = [
    {
      id: 'courses',
      title: `Popular ${stream.name} Courses`,
      kind: 'course',
      entries: entriesFor('course', courses.filter((c) => c.stream === stream.courseStream).map((c) => c.id)),
      viewAllHref: stream.courseStream ? withQuery('/courses', serializeCourseFilters({ ...emptyCourseFilters, streams: [stream.courseStream] }, 'popularity')) : '/courses',
    },
    {
      id: 'exams',
      title: `${stream.name} Entrance Exams`,
      kind: 'exam',
      entries: entriesFor('exam', streamExams.map((e) => e.id)),
      viewAllHref: stream.studyArea ? withQuery('/exams', serializeExamFilters({ studyAreas: [stream.studyArea], scopes: [] }, 'popular', '')) : '/exams',
    },
    {
      id: 'colleges',
      title: `${stream.name} Colleges`,
      kind: 'college',
      entries: entriesFor('college', colleges.filter((c) => stream.collegeDegrees.includes(c.degree)).map((c) => c.id)),
      viewAllHref: '/colleges',
    },
    { id: 'tools', title: 'Predictors & Tools', kind: 'tool', entries: tools },
    {
      id: 'scholarships',
      title: `${stream.name} Scholarships`,
      kind: 'scholarship',
      entries: entriesFor('scholarship', scholarships.filter((s) => stream.scholarshipStream && s.streams.includes(stream.scholarshipStream)).map((s) => s.id)),
      viewAllHref: stream.scholarshipStream ? withQuery('/scholarships', serializeScholarshipFilters({ ...emptyScholarshipFilters, streams: [stream.scholarshipStream] }, 'recommended')) : '/scholarships',
    },
    {
      id: 'coaching',
      title: `${stream.name} Coaching`,
      kind: 'coaching',
      entries: entriesFor('coaching', coachingProviders.filter((p) => keywordMatch(p.exams)).map((p) => p.id)),
      viewAllHref: withQuery('/coaching', serializeCoachingFilters({ ...emptyCoachingFilters, exams: stream.examKeywords.filter((name) => coachingProviders.some((p) => p.exams.includes(name))) }, 'recommended', '')),
    },
    {
      id: 'tutors',
      title: `${stream.name} Tutors`,
      kind: 'tutor',
      entries: entriesFor('tutor', tutors.filter((t) => keywordMatch(t.exams)).map((t) => t.id)),
      viewAllHref: withQuery('/tutors', serializeTutorFilters({ ...emptyTutorFilters, exams: stream.examKeywords.filter((name) => tutors.some((t) => (t.exams as readonly string[]).includes(name))) }, 'featured', '')),
    },
  ]

  return { stream, sections: sections.filter((section) => section.entries.length > 0) }
}

/** A hub is only published when it has real content in at least two sections. */
const MIN_SECTIONS = 2

export function getStreamHub(slug: string): StreamHub | undefined {
  const stream = getStream(slug)
  if (!stream) return undefined
  const hub = buildStreamHub(stream)
  return hub.sections.length >= MIN_SECTIONS ? hub : undefined
}

export const getPublishedStreams = () => streams.filter((stream) => getStreamHub(stream.slug))
