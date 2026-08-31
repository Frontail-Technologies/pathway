import { Suspense } from 'react'
import { CourseListingPage } from '@/features/courses/components/course-listing-page'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'
import { PageLoadingSkeleton } from '@/components/feedback'

export default function CoursesPage() {
  return (
    <>
      {/* CourseListingPage reads useSearchParams() to sync filters/sort with the
          URL, which Next.js requires to sit inside a Suspense boundary. */}
      <Suspense fallback={<PageLoadingSkeleton />}>
        <CourseListingPage />
      </Suspense>
      <MobileBottomNavigation />
    </>
  )
}
