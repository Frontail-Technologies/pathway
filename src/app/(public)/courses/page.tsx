import { Suspense } from 'react'
import { CourseListingPage } from '@/features/courses/components/course-listing-page'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'
import { PageLoadingSkeleton } from '@/components/feedback'

export default function CoursesPage() {
  return (
    <>
      {
 }
      <Suspense fallback={<PageLoadingSkeleton />}>
        <CourseListingPage />
      </Suspense>
      <MobileBottomNavigation />
    </>
  )
}
