export type DimensionKey = 'analytical' | 'creative' | 'social' | 'practical' | 'organising' | 'enterprising'
export type Likert = 1 | 2 | 3 | 4 | 5

export type TestDimension = { key: DimensionKey; label: string; summary: string; environments: string; areas: { label: string; stream: string | null }[] }
export type RatingQuestion = { id: string; text: string; dimension: DimensionKey }
export type ChoiceQuestion = { id: string; text: string; options: { label: string; dimension: DimensionKey }[] }
export type PsychometricTest = { dimensions: TestDimension[]; ratings: RatingQuestion[]; choices: ChoiceQuestion[] }

export const likertLabels: Record<Likert, string> = { 1: 'Strongly dislike', 2: 'Dislike', 3: 'Neutral', 4: 'Like', 5: 'Strongly like' }
export const likertValues: Likert[] = [1, 2, 3, 4, 5]

export const studyLevels = ['Class 9–10', 'Class 11–12', 'Undergraduate', 'Postgraduate']
export const studyAreas = ['Science', 'Commerce', 'Arts & Humanities', 'Engineering', 'Medical', 'Management', 'Law', 'Design', 'Not sure yet']
export const exploringOptions = ['Career options', 'College / course direction', 'My strengths', 'My interests', 'Not sure yet']

export const RATING_PAGE_SIZE = 4
const CHOICE_POINTS = 2

export type PsychometricDraft = {
  studyLevel: string
  studyArea: string
  exploring: string[]
  ratings: Partial<Record<string, Likert>>
  choices: Partial<Record<string, DimensionKey>>
}

export const emptyDraft: PsychometricDraft = { studyLevel: '', studyArea: '', exploring: [], ratings: {}, choices: {} }

export type DimensionScore = { dimension: TestDimension; points: number; max: number; strength: number }

export function scoreDraft(test: PsychometricTest, draft: PsychometricDraft): DimensionScore[] {
  return test.dimensions
    .map((dimension, index) => {
      const ratings = test.ratings.filter((question) => question.dimension === dimension.key)
      const ratingPoints = ratings.reduce((sum, question) => sum + (draft.ratings[question.id] ?? 0), 0)
      const choiceChances = test.choices.filter((question) => question.options.some((option) => option.dimension === dimension.key)).length
      const choicePoints = test.choices.reduce((sum, question) => sum + (draft.choices[question.id] === dimension.key ? CHOICE_POINTS : 0), 0)
      const max = ratings.length * 5 + choiceChances * CHOICE_POINTS
      const points = ratingPoints + choicePoints
      return { score: { dimension, points, max, strength: max ? points / max : 0 }, index }
    })
    .sort((a, b) => b.score.strength - a.score.strength || a.index - b.index)
    .map(({ score }) => score)
}

export const ratingPages = (test: PsychometricTest) => Math.max(1, Math.ceil(test.ratings.length / RATING_PAGE_SIZE))
export const ratingPage = (test: PsychometricTest, page: number) => test.ratings.slice(page * RATING_PAGE_SIZE, (page + 1) * RATING_PAGE_SIZE)
export const isAboutYouComplete = (draft: PsychometricDraft) => Boolean(draft.studyLevel && draft.studyArea && draft.exploring.length)
export const unansweredRatings = (test: PsychometricTest, draft: PsychometricDraft, page: number) => ratingPage(test, page).filter((question) => !draft.ratings[question.id]).map((question) => question.id)
export const unansweredChoices = (test: PsychometricTest, draft: PsychometricDraft) => test.choices.filter((question) => !draft.choices[question.id]).map((question) => question.id)
