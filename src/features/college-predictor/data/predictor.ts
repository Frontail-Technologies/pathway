export type PredictorExamSlug = 'jee-main' | 'jee-advanced'
export type PredictorCategory = 'OPEN' | 'EWS' | 'OBC-NCL' | 'SC' | 'ST'
export type PredictorGender = 'neutral' | 'female'
export type Chance = 'safe' | 'likely' | 'reach'

export const predictorExams: { slug: PredictorExamSlug; label: string; counselling: string }[] = [
  { slug: 'jee-main', label: 'JEE Main', counselling: 'NITs, IIITs and GFTIs' },
  { slug: 'jee-advanced', label: 'JEE Advanced', counselling: 'IITs' },
]

export const examFromSlug: Record<string, string> = Object.fromEntries(predictorExams.map((exam) => [exam.slug, exam.label]))

export const predictorCategories: { value: PredictorCategory; label: string }[] = [
  { value: 'OPEN', label: 'General (OPEN)' },
  { value: 'EWS', label: 'EWS' },
  { value: 'OBC-NCL', label: 'OBC-NCL' },
  { value: 'SC', label: 'SC' },
  { value: 'ST', label: 'ST' },
]

export const chanceLabel: Record<Chance, string> = { safe: 'High chance', likely: 'Good chance', reach: 'Low chance' }

export const quotaLabel: Record<string, string> = { AI: 'All India', HS: 'Home state', OS: 'Other state', JK: 'J&K', LA: 'Ladakh', GO: 'Goa' }

export type PredictorInput = { exam: PredictorExamSlug; rank: number | null; category: PredictorCategory; gender: PredictorGender; pwd: boolean; state: string }

const isExam = (value: string | undefined): value is PredictorExamSlug => predictorExams.some((exam) => exam.slug === value)
const isCategory = (value: string | undefined): value is PredictorCategory => predictorCategories.some((option) => option.value === value)

export function parsePredictorInput(params: Record<string, string | string[] | undefined>): PredictorInput {
  const one = (key: string) => {
    const value = params[key]
    return Array.isArray(value) ? value[0] : value
  }
  const rank = Number(one('rank'))
  const exam = one('exam')
  const category = one('category')
  const state = one('state') ?? ''
  return {
    exam: isExam(exam) ? exam : 'jee-main',
    rank: Number.isInteger(rank) && rank > 0 && rank <= 2_000_000 ? rank : null,
    category: isCategory(category) ? category : 'OPEN',
    gender: one('gender') === 'female' ? 'female' : 'neutral',
    pwd: one('pwd') === 'true',
    state: /^[a-z0-9-]{1,80}$/.test(state) ? state : '',
  }
}

export function predictorQuery(input: PredictorInput) {
  const query: Record<string, string> = { exam: input.exam }
  if (input.rank) query.rank = String(input.rank)
  if (input.category !== 'OPEN') query.category = input.category
  if (input.gender === 'female') query.gender = 'female'
  if (input.pwd) query.pwd = 'true'
  if (input.state && input.exam === 'jee-main') query.state = input.state
  return query
}

export type PredictionSeat = { program: string; quota: string; category: string; gender: PredictorGender; openingRank: number; closingRank: number; chance: Chance }
export type PredictionCollege = { slug: string; name: string; city: string | null; state: string | null; nirfRank: number | null; bestChance: Chance; seats: PredictionSeat[] }
export type Prediction = {
  exam: { slug: string; label: string }
  year: number | null
  round: number | null
  counts: { safe: number; likely: number; reach: number; colleges: number }
  colleges: PredictionCollege[]
}
