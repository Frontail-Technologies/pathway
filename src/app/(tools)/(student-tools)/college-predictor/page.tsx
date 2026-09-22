import { Suspense } from 'react'
import type { Metadata } from 'next'
import { CollegePredictorPage } from '@/features/college-predictor/components/college-predictor-page'

export const metadata: Metadata = {
  title: 'College Predictor',
  description: 'Find colleges that may match your entrance-exam profile, category and preferences.',
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CollegePredictorPage />
    </Suspense>
  )
}
