import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import { listColleges, type CollegeListItem } from '@/features/colleges/api/colleges-api'
import { listCourses, type CourseListItem } from '@/features/courses/api/courses-api'
import { listExams } from '@/features/exams/api/exams-api'
import { listScholarships, type ScholarshipListItem } from '@/features/scholarships/api/scholarships-api'
import { listCoaching, type CoachingListItem } from '@/features/coaching/api/coaching-api'
import { listTutors } from '@/features/tutors/api/tutors-api'
import type { Exam } from '@/features/exams/data/exams'
import type { Tutor } from '@/features/tutors/data/tutors'
import type { SearchEntry, SearchKind } from '../data/search-index'

export type CatalogKind = Extract<SearchKind, 'college' | 'course' | 'exam' | 'scholarship' | 'coaching' | 'tutor'>
export const catalogKinds: CatalogKind[] = ['college', 'course', 'exam', 'scholarship', 'coaching', 'tutor']

const listing = (path: string, name: string) => `${path}?q=${encodeURIComponent(name)}`

export const collegeEntry = (c: CollegeListItem): SearchEntry => ({
  id: `college-${c.slug}`,
  kind: 'college',
  title: c.name,
  subtitle: [`${c.city}${c.state ? `, ${c.state}` : ''}`, c.type, c.popularCourse].filter(Boolean).join(' · '),
  href: c.hasDetailPage ? `/college/${c.slug}` : listing('/colleges', c.name),
  keywords: '',
})
export const courseEntry = (c: CourseListItem): SearchEntry => ({
  id: `course-${c.slug}`,
  kind: 'course',
  title: c.name,
  subtitle: [c.level, c.stream, c.duration].filter(Boolean).join(' · '),
  href: c.hasDetailPage ? `/course/${c.slug}` : listing('/courses', c.name),
  keywords: '',
})
export const examEntry = (e: Exam): SearchEntry => ({
  id: `exam-${e.slug}`,
  kind: 'exam',
  title: e.shortName === e.name ? e.name : `${e.shortName} — ${e.name}`,
  subtitle: [e.studyArea, e.scope, e.level].filter(Boolean).join(' · '),
  href: e.hasDetailPage ? `/exam/${e.slug}` : listing('/exams', e.shortName),
  keywords: '',
})
export const scholarshipEntry = (s: ScholarshipListItem): SearchEntry => ({
  id: `scholarship-${s.slug}`,
  kind: 'scholarship',
  title: s.name,
  subtitle: `${s.provider} · ${s.benefitLabel}`,
  href: s.hasDetailPage ? `/scholarship/${s.slug}` : listing('/scholarships', s.name),
  keywords: '',
})
export const coachingEntry = (p: CoachingListItem): SearchEntry => ({
  id: `coaching-${p.slug}`,
  kind: 'coaching',
  title: p.name,
  subtitle: [p.providerType, p.location, p.exams.slice(0, 3).join(', ')].filter(Boolean).join(' · '),
  href: p.hasDetailPage ? `/coaching/${p.slug}` : listing('/coaching', p.name),
  keywords: '',
})
export const tutorEntry = (t: Tutor): SearchEntry => ({ id: `tutor-${t.slug}`, kind: 'tutor', title: t.name, subtitle: t.headline, href: `/tutor/${t.slug}`, keywords: '' })

export async function listCatalogEntries(kind: CatalogKind, query: CatalogQuery): Promise<CatalogList<SearchEntry>> {
  const toEntries = <T,>(list: CatalogList<T>, map: (item: T) => SearchEntry) => ({ items: list.items.map(map), page: list.page })
  if (kind === 'college') return toEntries(await listColleges(query), collegeEntry)
  if (kind === 'course') return toEntries(await listCourses(query), courseEntry)
  if (kind === 'exam') return toEntries(await listExams(query), examEntry)
  if (kind === 'scholarship') return toEntries(await listScholarships(query), scholarshipEntry)
  if (kind === 'coaching') return toEntries(await listCoaching(query), coachingEntry)
  return toEntries(await listTutors(query), tutorEntry)
}

export type CatalogSearch = { entries: SearchEntry[]; counts: Map<SearchKind, number>; failed: CatalogKind[] }

export async function searchCatalog(q: string, { type, perKind = 4 }: { type?: SearchKind; perKind?: number } = {}): Promise<CatalogSearch> {
  const kinds = catalogKinds
  const settled = await Promise.allSettled(kinds.map((kind) => listCatalogEntries(kind, { q, limit: String(type === kind ? 50 : perKind) })))
  const entries: SearchEntry[] = []
  const counts = new Map<SearchKind, number>()
  const failed: CatalogKind[] = []
  settled.forEach((result, index) => {
    const kind = kinds[index]!
    if (result.status === 'rejected') {
      failed.push(kind)
      return
    }
    const total = result.value.page.total ?? result.value.items.length
    if (total > 0) counts.set(kind, total)
    entries.push(...result.value.items)
  })
  return { entries, counts, failed }
}
