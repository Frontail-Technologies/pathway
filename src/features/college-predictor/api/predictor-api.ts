import { catalogGet } from '@/services/api/catalog'
import { predictorQuery, type Prediction, type PredictorInput } from '../data/predictor'

export async function getPrediction(input: PredictorInput): Promise<Prediction | null> {
  if (!input.rank) return null
  return catalogGet<Prediction>('/predictors/josaa', predictorQuery(input)).catch(() => null)
}

export type ExamCoverage = { slug: string; label: string; year: number; round: number; institutes: number; seats: number }

export const getPredictorCoverage = () => catalogGet<ExamCoverage[]>('/predictors/exams').catch(() => [] as ExamCoverage[])
