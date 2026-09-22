import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ExamListingPage } from '@/features/exams/components/exam-listing-page'

export const metadata: Metadata = {
  title: 'Entrance Exams',
  description: 'Explore entrance exams by course, stream and study goal.',
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ExamListingPage />
    </Suspense>
  )
}
