// UI-phase only: no rank engine, no score-to-rank data, no backend. Everything is local, typed and replaceable.

export type RankExam = 'JEE Main' | 'JEE Advanced' | 'NEET UG' | 'CUET UG'
export type RankInputType = 'score' | 'percentile'

export type RankPredictorDraft = {
  exam: RankExam | ''
  inputType: RankInputType
  value: string
  category: string
}

export const emptyRankDraft: RankPredictorDraft = { exam: '', inputType: 'score', value: '', category: '' }

// Same exams that appear in the Pathway top-exams fixture. One exam at a time: rank is this tool's *output*, so it is never an input.
export const rankExams: RankExam[] = ['JEE Main', 'JEE Advanced', 'NEET UG', 'CUET UG']

/** Maps the safe `?exam=` slugs (exam only — never scores/percentiles/category). */
export const rankExamFromSlug: Record<string, RankExam> = {
  'jee-main': 'JEE Main',
  'jee-advanced': 'JEE Advanced',
  neet: 'NEET UG',
  'neet-ug': 'NEET UG',
  cuet: 'CUET UG',
  'cuet-ug': 'CUET UG',
}

export const inputTypeLabel: Record<RankInputType, string> = { score: 'Score', percentile: 'Percentile' }
export const rankCategories = ['General', 'OBC-NCL', 'SC', 'ST', 'EWS']

export type RankErrors = { exam?: string; value?: string }

// No official exam maximums are assumed until verified exam data exists: score >= 0, percentile 0-100.
export function validateRankInput(draft: RankPredictorDraft): RankErrors {
  const errors: RankErrors = {}
  if (!draft.exam) errors.exam = 'Choose the exam you want a rank estimate for.'
  const raw = draft.value.trim()
  const label = inputTypeLabel[draft.inputType].toLowerCase()
  if (!raw) {
    errors.value = `Enter your ${label}.`
    return errors
  }
  const number = Number(raw)
  if (!Number.isFinite(number)) errors.value = `Enter a valid number for your ${label}.`
  else if (draft.inputType === 'percentile' && (number < 0 || number > 100)) errors.value = 'Percentile must be between 0 and 100.'
  else if (draft.inputType === 'score' && number < 0) errors.value = 'Score cannot be negative.'
  return errors
}
