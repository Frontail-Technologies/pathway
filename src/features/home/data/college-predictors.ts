export type CollegePredictor = {
  exam: string
  description: string
  href: string
}

export const collegePredictors: CollegePredictor[] = [
  { exam: 'JEE Main', description: 'Predict NITs and GFTIs by rank', href: '/college-predictor?exam=jee-main' },
  { exam: 'NEET', description: 'Predict medical colleges by score', href: '/college-predictor?exam=neet' },
  { exam: 'CUET', description: 'Predict central university options', href: '/college-predictor?exam=cuet' },
  { exam: 'CAT', description: 'Predict B-schools by percentile', href: '/college-predictor?exam=cat' },
]
