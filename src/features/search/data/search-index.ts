import { getPublishedNotes } from '@/features/notes/data/notes'
import { streams } from '@/features/streams/data/stream-taxonomy'

export type SearchKind = 'stream' | 'college' | 'course' | 'exam' | 'scholarship' | 'coaching' | 'tutor' | 'note' | 'tool'

export const searchKinds: { kind: SearchKind; label: string; plural: string }[] = [
  { kind: 'stream', label: 'Stream', plural: 'Streams' },
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
  keywords: string
}

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
    ...streams.map((s) => ({
      id: `stream-${s.slug}`,
      kind: 'stream' as const,
      title: s.name,
      subtitle: `${s.tagline} · colleges, courses, exams`,
      href: `/${s.slug}`,
      keywords: s.examKeywords.join(' '),
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

export const searchLocalEntries = searchEntries

export const popularSearches = ['IIT Delhi', 'B.Tech Computer Science', 'JEE Main', 'NEET', 'MBA', 'Scholarship', 'CAT', 'College Predictor']
