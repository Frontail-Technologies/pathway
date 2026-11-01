import { colleges } from '@/features/colleges/data/colleges'
import { getCollegeDetail } from '@/features/colleges/data/college-detail'
import { courses } from '@/features/courses/data/courses'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { exams } from '@/features/exams/data/exams'
import { scholarships } from '@/features/scholarships/data/scholarships'
import { getScholarshipDetail } from '@/features/scholarships/data/scholarship-detail'
import { coachingProviders } from '@/features/coaching/data/coaching'
import { tutors } from '@/features/tutors/data/tutors'
import { getPublishedNotes } from '@/features/notes/data/notes'

export type SearchKind = 'college' | 'course' | 'exam' | 'scholarship' | 'coaching' | 'tutor' | 'note' | 'tool'

export const searchKinds: { kind: SearchKind; label: string; plural: string }[] = [
  { kind: 'college', label: 'College', plural: 'Colleges' },
  { kind: 'course', label: 'Course', plural: 'Courses' },
  { kind: 'exam', label: 'Exam', plural: 'Exams' },
  { kind: 'scholarship', label: 'Scholarship', plural: 'Scholarships' },
  { kind: 'coaching', label: 'Coaching', plural: 'Coaching' },
  { kind: 'tutor', label: 'Tutor', plural: 'Tutors' },
  { kind: 'note', label: 'Notes', plural: 'Notes' },
  { kind: 'tool', label: 'Tool', plural: 'Tools' },
]

export type SearchEntry = {
  id: string
  kind: SearchKind
  title: string
  subtitle: string
  href: string
  /** Extra searchable text that isn't displayed. */
  keywords: string
}

/** Detail page if one exists, otherwise the listing pre-filtered by name (never a 404). */
const withFallback = (detail: string | null, listing: string, name: string) => detail ?? `${listing}?q=${encodeURIComponent(name)}`

const tools: SearchEntry[] = [
  { id: 'tool-college-predictor', kind: 'tool', title: 'College Predictor', subtitle: 'Preview colleges from your exam score', href: '/college-predictor', keywords: 'predict admission chances jee neet cutoff' },
  { id: 'tool-rank-predictor', kind: 'tool', title: 'Rank Predictor', subtitle: 'Estimate a rank range from your marks', href: '/rank-predictor', keywords: 'predict rank percentile marks score' },
  { id: 'tool-compare', kind: 'tool', title: 'Compare Colleges', subtitle: 'Side-by-side fees, placements and ratings', href: '/compare/colleges', keywords: 'compare vs versus' },
  { id: 'tool-psychometric', kind: 'tool', title: 'Psychometric Test', subtitle: 'Discover careers that match your interests', href: '/psychometric-test', keywords: 'career aptitude test personality' },
  { id: 'tool-resume', kind: 'tool', title: 'Resume Builder', subtitle: 'Build a student resume', href: '/resume-builder', keywords: 'cv resume' },
  { id: 'tool-counselling', kind: 'tool', title: 'Free Counselling', subtitle: 'Talk to an education counsellor', href: '/counselling', keywords: 'counsellor guidance advice help call' },
]

let cached: SearchEntry[] | null = null

export function getSearchIndex(): SearchEntry[] {
  if (cached) return cached
  cached = [
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
    ...getPublishedNotes().map((n) => ({
      id: n.id,
      kind: 'note' as const,
      title: n.title,
      subtitle: [n.subject, n.stream, n.studyLevel].filter(Boolean).join(' · ') || 'Study notes',
      href: `/notes/${n.slug}`,
      keywords: n.shortDescription ?? '',
    })),
    ...tools,
  ]
  return cached
}

const normalize = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

/**
 * Every query word must be the start of some word in the entry ("cat" finds
 * CAT, not "education"). Title matches rank above subtitle/keyword matches;
 * a title that starts with the whole query ranks top.
 */
export function searchEntries(query: string): SearchEntry[] {
  const q = normalize(query)
  if (!q) return []
  const words = q.split(' ')
  const hasPrefix = (tokens: string[], word: string) => tokens.some((token) => token.startsWith(word))
  const scored: { entry: SearchEntry; score: number }[] = []
  for (const entry of getSearchIndex()) {
    const title = normalize(entry.title)
    const titleTokens = title.split(' ')
    const allTokens = [...titleTokens, ...normalize(`${entry.subtitle} ${entry.keywords}`).split(' ')]
    if (!words.every((word) => hasPrefix(allTokens, word))) continue
    let score = words.filter((word) => hasPrefix(titleTokens, word)).length * 10
    if (title.startsWith(q)) score += 50
    else if (` ${title}`.includes(` ${q}`)) score += 25
    scored.push({ entry, score })
  }
  return scored.sort((a, b) => b.score - a.score).map(({ entry }) => entry)
}

export const popularSearches = ['IIT Delhi', 'B.Tech Computer Science', 'JEE Main', 'NEET', 'MBA', 'Scholarship', 'CAT', 'College Predictor']
