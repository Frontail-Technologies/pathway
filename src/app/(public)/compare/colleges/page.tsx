import { Suspense } from 'react'
import type { Metadata } from 'next'
import { CollegeComparePage } from '@/features/compare/components/college-compare-page'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'
import { PageLoadingSkeleton } from '@/components/feedback'

export const metadata: Metadata = { title: 'Compare Colleges' }

export default function CompareCollegesPage() {
  return (
    <>
      {/* CollegeComparePage reads useSearchParams() to keep the selected
          colleges in sync with the URL, which Next.js requires to sit
          inside a Suspense boundary. */}
      <Suspense fallback={<PageLoadingSkeleton />}>
        <CollegeComparePage />
      </Suspense>
      <MobileBottomNavigation />
    </>
  )
}
