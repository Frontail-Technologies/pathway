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
  { id: 'tool-college-predictor', kind: 'tool', title: 'College Predictor', subtitle: 'Colleges and branches within reach of your rank', href: '/college-predictor', keywords: 'predict admission chances jee neet cutoff' },
  { id: 'tool-rank-predictor', kind: 'tool', title: 'Rank Predictor', subtitle: 'Estimate your rank from your percentile', href: '/rank-predictor', keywords: 'predict rank percentile marks score' },
  { id: 'tool-cutoffs', kind: 'tool', title: 'JoSAA Cutoff Explorer', subtitle: 'Opening and closing ranks for every branch and quota', href: '/cutoffs', keywords: 'josaa cutoff closing rank opening rank nit iit iiit branch' },
  { id: 'tool-exam-calendar', kind: 'tool', title: 'Exam Calendar', subtitle: 'Application, exam and result dates', href: '/exam-calendar', keywords: 'exam dates calendar schedule application result' },
  { id: 'tool-loan-calculator', kind: 'tool', title: 'Education Loan EMI Calculator', subtitle: 'Monthly EMI and total interest for a study loan', href: '/education-loan-calculator', keywords: 'education loan emi calculator interest study loan' },
  { id: 'tool-neet-rank-predictor', kind: 'tool', title: 'NEET UG Rank Predictor', subtitle: 'Estimate your NEET rank from your percentile', href: '/rank-predictor?exam=neet-ug', keywords: 'neet rank predictor percentile air medical' },
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

