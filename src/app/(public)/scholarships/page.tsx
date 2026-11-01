import { Suspense } from 'react'
import { ScholarshipListingPage } from '@/features/scholarships/components/scholarship-listing-page'
import { PageLoadingSkeleton } from '@/components/feedback'

export default function ScholarshipsPage() {
  return (
    <>
      {
 }
      <Suspense fallback={<PageLoadingSkeleton />}>
        <ScholarshipListingPage />
      </Suspense>
    </>
  )
}
