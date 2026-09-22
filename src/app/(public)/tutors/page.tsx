import { Suspense } from 'react'
import type { Metadata } from 'next'
import { TutorListingPage } from '@/features/tutors/components/tutor-listing-page'

export const metadata: Metadata = {
  title: 'Find Tutors',
  description: 'Find individual tutors by subject, exam, class level, language and learning mode.',
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <TutorListingPage />
    </Suspense>
  )
}
