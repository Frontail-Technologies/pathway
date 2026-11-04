import { Suspense } from 'react'
import { CourseListingPage } from '@/features/courses/components/course-listing-page'
import { listCourses } from '@/features/courses/api/courses-api'
import { parseCourseFilters, parseCourseSearch, parseCourseSort, serializeCourseFilters } from '@/features/courses/data/filters'
import { PageLoadingSkeleton } from '@/components/feedback'
import { apiQueryFrom, toUrlSearchParams } from '@/lib/search-params'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function CoursesPage({ searchParams }: Props) {
  const params = toUrlSearchParams(await searchParams)
  const query = apiQueryFrom(serializeCourseFilters(parseCourseFilters(params), parseCourseSort(params), parseCourseSearch(params)))
  const initial = await listCourses({ ...query, limit: '12' }).catch(() => null)
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <CourseListingPage initial={initial} initialQuery={query} />
    </Suspense>
  )
}
