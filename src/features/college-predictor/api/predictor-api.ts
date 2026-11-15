import { catalogGet } from '@/services/api/catalog'
import { predictorQuery, type Prediction, type PredictorInput } from '../data/predictor'

export async function getPrediction(input: PredictorInput): Promise<Prediction | null> {
  if (!input.rank) return null
  return catalogGet<Prediction>('/predictors/josaa', predictorQuery(input)).catch(() => null)
}
