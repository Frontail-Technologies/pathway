import { Suspense } from 'react'
import { ScholarshipListingPage } from '@/features/scholarships/components/scholarship-listing-page'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'
import { PageLoadingSkeleton } from '@/components/feedback'

export default function ScholarshipsPage() {
  return (
    <>
      {/* ScholarshipListingPage reads useSearchParams() to sync filters/sort
          with the URL, which Next.js requires to sit inside a Suspense boundary. */}
      <Suspense fallback={<PageLoadingSkeleton />}>
        <ScholarshipListingPage />
      </Suspense>
      <MobileBottomNavigation />
    </>
  )
}
