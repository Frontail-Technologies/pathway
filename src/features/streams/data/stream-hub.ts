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
import { getCollegeDetail } from '@/features/colleges/data/college-detail'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { getScholarshipDetail } from '@/features/scholarships/data/scholarship-detail'
import type { SearchEntry, SearchKind } from '@/features/search/data/search-index'
import { getStream, streams, type StreamDefinition } from './stream-taxonomy'

export type StreamSection = {
  id: string
  title: string
  kind: SearchKind
  entries: SearchEntry[]
  viewAllHref?: string
}

export type StreamHub = { stream: StreamDefinition; sections: StreamSection[] }

const withQuery = (path: string, query: string) => (query ? `${path}?${query}` : path)

const withFallback = (detail: string | null, listing: string, name: string) => detail ?? `${listing}?q=${encodeURIComponent(name)}`

let fixtureEntries: SearchEntry[] | null = null
function getFixtureEntries(): SearchEntry[] {
  fixtureEntries ??= [
    ...colleges.map((c) => ({
      id: c.id,
      kind: 'college' as const,
      title: c.name,
      subtitle: `${c.city}, ${c.state} · ${c.type} · ${c.popularCourse}`,
      href: getCollegeDetail(c.slug) ? `/college/${c.slug}` : '/colleges',
      keywords: `${c.degree} ${c.exam} ${c.approval}`,
    })),
    ...courses.map((c) => ({
      id: c.id,
      kind: 'course' as const,
      title: c.name,
      subtitle: `${c.level} · ${c.stream} · ${c.duration}`,
      href: withFallback(getCourseDetail(c.slug) ? `/course/${c.slug}` : null, '/courses', c.name),
      keywords: `${c.degree} ${c.specialization} ${c.entranceExams.join(' ')}`,
    })),
    ...exams.map((e) => ({
      id: e.id,
      kind: 'exam' as const,
      title: e.shortName === e.name ? e.name : `${e.shortName} — ${e.name}`,
      subtitle: `${e.studyArea} · ${e.scope} · ${e.level}`,
      href: withFallback(e.hasDetailPage ? `/exam/${e.slug}` : null, '/exams', e.shortName),
      keywords: `${e.conductingBody ?? ''} ${e.description}`,
    })),
    ...scholarships.map((s) => ({
      id: s.id,
      kind: 'scholarship' as const,
      title: s.name,
      subtitle: `${s.provider} · ${s.benefitLabel}`,
      href: withFallback(getScholarshipDetail(s.slug) ? `/scholarship/${s.slug}` : null, '/scholarships', s.name),
      keywords: `${s.scholarshipType} ${s.streams.join(' ')} ${s.educationLevels.join(' ')}`,
    })),
    ...coachingProviders.map((p) => ({
      id: p.id,
      kind: 'coaching' as const,
      title: p.name,
      subtitle: `${p.providerType} · ${p.location} · ${p.exams.slice(0, 3).join(', ')}`,
      href: withFallback(p.hasDetailPage ? `/coaching/${p.slug}` : null, '/coaching', p.name),
      keywords: `${p.exams.join(' ')} ${p.subjects.join(' ')} ${p.modes.join(' ')}`,
    })),
    ...tutors.map((t) => ({
      id: t.id,
      kind: 'tutor' as const,
      title: t.name,
      subtitle: t.headline,
      href: withFallback(t.hasDetailPage ? `/tutor/${t.slug}` : null, '/tutors', t.name),
      keywords: `${t.subjects.join(' ')} ${t.exams.join(' ')} ${t.languages.join(' ')}`,
    })),
  ]
  return fixtureEntries
}

function entriesFor(kind: SearchKind, ids: string[]): SearchEntry[] {
  const wanted = new Set(ids)
  return getFixtureEntries().filter((entry) => entry.kind === kind && wanted.has(entry.id))
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

const MIN_SECTIONS = 2

export function getStreamHub(slug: string): StreamHub | undefined {
  const stream = getStream(slug)
  if (!stream) return undefined
  const hub = buildStreamHub(stream)
  return hub.sections.length >= MIN_SECTIONS ? hub : undefined
}

export const getPublishedStreams = () => streams.filter((stream) => getStreamHub(stream.slug))
