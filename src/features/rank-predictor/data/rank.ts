export type RankExamSlug = 'jee-main' | 'neet-ug'

export type RankExam = {
  slug: RankExamSlug
  label: string
  rankLabel: string
  appeared: number
  year: number
  source: string
  next: (rank: number) => { href: string; label: string }
}

export const rankExams: RankExam[] = [
  {
    slug: 'jee-main',
    label: 'JEE Main',
    rankLabel: 'common rank list (CRL)',
    appeared: 1_475_103,
    year: 2025,
    source: 'NTA JEE (Main) 2025 result press note',
    next: (rank) => ({ href: `/college-predictor?exam=jee-main&rank=${rank}#results`, label: 'See colleges for this rank' }),
  },
  {
    slug: 'neet-ug',
    label: 'NEET UG',
    rankLabel: 'all India rank (AIR)',
    appeared: 2_209_318,
    year: 2025,
    source: 'NTA NEET (UG) 2025 result press note',
    next: () => ({ href: '/medical', label: 'Explore medical colleges and courses' }),
  },
]

export const rankExamFromSlug: Record<string, string> = Object.fromEntries(rankExams.map((exam) => [exam.slug, exam.label]))

export const getRankExam = (slug: string | undefined) => rankExams.find((exam) => exam.slug === slug) ?? rankExams[0]!

export const referencePercentiles = [99.99, 99.9, 99.5, 99, 98, 97, 95, 92, 90, 85, 80, 75]

export function rankFromPercentile(percentile: number, appeared: number) {
  return Math.max(1, Math.round(((100 - percentile) * appeared) / 100))
}

export function parsePercentile(raw: string | undefined) {
  if (!raw) return null
  const value = Number(raw)
  return Number.isFinite(value) && value > 0 && value <= 100 ? value : null
}
