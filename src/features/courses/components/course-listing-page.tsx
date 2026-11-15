'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CatalogListing } from '@/components/shared/listing/catalog-listing'
import type { FacetGroup, SelectedFilters } from '@/components/shared/listing/types'
import { Button } from '@/components/ui/button'
import { useCatalogList } from '@/hooks/use-catalog-list'
import { apiQueryFrom } from '@/lib/search-params'
import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import { toCourseListItem, type CourseListItem, type ProgramListDto } from '../api/courses-api'
import { emptyFilters, filterGroups, parseCourseFilters, parseCourseSearch, parseCourseSort, serializeCourseFilters, sortOptions, type FilterState, type SortValue } from '../data/filters'
import { CourseCard } from './course-card'

const PAGE_SIZE = 12

const groups: FacetGroup[] = filterGroups.map((group) => ({ key: group.key, title: group.title, options: group.options.map((option) => ({ value: option, label: option })) }))
const courseSortOptions = sortOptions.map((option) => ({ value: option.value, label: option.label }))

function headingFor(filters: FilterState) {
  const single = (values: string[]) => (values.length === 1 ? values[0] : '')
  const degree = single(filters.degrees)
  if (degree) return `${degree} courses in India`
  const stream = single(filters.streams)
  const level = single(filters.levels)
  const subject = [level, stream, 'courses'].filter(Boolean).join(' ')
  return subject === 'courses' ? 'Courses in India' : `${subject.charAt(0).toUpperCase()}${subject.slice(1)} in India`
}

export function CourseListingPage({ initial, initialQuery }: { initial?: CatalogList<CourseListItem> | null; initialQuery?: CatalogQuery }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filters = useMemo(() => parseCourseFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseCourseSort(searchParams), [searchParams])
  const query = useMemo(() => parseCourseSearch(searchParams), [searchParams])

  const apiQuery = useMemo(() => apiQueryFrom(serializeCourseFilters(filters, sort, query)), [filters, sort, query])
  const list = useCatalogList<ProgramListDto, CourseListItem>({ path: '/programs', query: apiQuery, map: toCourseListItem, limit: PAGE_SIZE, initial, initialQuery })

  const navigate = (selected: SelectedFilters, nextSort: string, nextQuery: string) => {
    const next = serializeCourseFilters({ ...emptyFilters, ...selected } as FilterState, nextSort as SortValue, nextQuery)
    router.push(next ? `${pathname}?${next}` : pathname, { scroll: false })
  }

  return (
    <CatalogListing
      breadcrumbs={[{ label: 'Home', href: '/' }, 'Courses']}
      title={headingFor(filters)}
      description="Fees, duration, eligibility, entrance exams and the colleges that offer each course."
      searchPlaceholder="Search courses, e.g. B.Tech, MBA"
      noun={['course', 'courses']}
      groups={groups}
      selected={filters}
      sort={sort}
      sortOptions={courseSortOptions}
      query={query}
      onNavigate={navigate}
      list={list}
      layout="grid"
      renderItems={(items) => items.map((course) => <CourseCard key={course.id} course={course} />)}
      footer={
        <div className="mt-2 flex flex-wrap items-center gap-3 rounded-xl border bg-secondary/60 p-4 sm:p-5">
          <p className="min-w-0 flex-1 text-sm font-semibold text-foreground">Picked a course? Compare the colleges that offer it.</p>
          <Button variant="cta" nativeButton={false} render={<Link href="/colleges?sort=ranking" />}>
            Explore colleges
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      }
    />
  )
}
