import { Suspense } from 'react'
import type { Metadata } from 'next'
import { RankPredictorPage } from '@/features/rank-predictor/components/rank-predictor-page'

export const metadata: Metadata = {
  title: 'Rank Predictor',
  description: 'Estimate how your exam performance may translate into a rank once verified exam data is connected.',
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <RankPredictorPage />
    </Suspense>
  )
}
