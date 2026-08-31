'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/feedback'
import { Button } from '@/components/ui/button'
import { getCourseFeed } from '../data/courses'
import {
  emptyFilters,
  matchesFilters,
  parseCourseFilters,
  parseCourseSort,
  serializeCourseFilters,
  sortCourses,
  type FilterKey,
  type FilterState,
  type SortValue,
} from '../data/filters'
import { CourseFilterSidebar } from './course-filter-sidebar'
import { CourseResultsToolbar } from './course-results-toolbar'
import { CourseResultCard } from './course-result-card'

const BATCH_SIZE = 8

export function CourseListingPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // The URL is the single source of truth for applied filters/sort — see the
  // "URL query-state convention" note in `data/filters.ts`. Deriving instead
  // of mirroring into a separate `useState` is what makes browser Back/Forward
  // (which re-renders with new `searchParams`) restore the correct state.
  const filters = useMemo(() => parseCourseFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseCourseSort(searchParams), [searchParams])

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)

  const feed = useMemo(() => getCourseFeed(), [])
  const allResults = useMemo(() => sortCourses(feed.filter((course) => matchesFilters(course, filters)), sort), [feed, filters, sort])
  const visibleResults = allResults.slice(0, visibleCount)
  const hasMore = visibleCount < allResults.length

  // Reset the loaded batch whenever the active query (filters/sort) changes.
  useEffect(() => {
    setVisibleCount(BATCH_SIZE)
  }, [filters, sort])

  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef(false)

  useEffect(() => {
    if (!hasMore) return
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loadingRef.current) {
          loadingRef.current = true
          setLoadingMore(true)
          window.setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, allResults.length))
            setLoadingMore(false)
            loadingRef.current = false
          }, 500)
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, allResults.length])

  // Pushes a new history entry so Back/Forward step through each committed
  // filter/sort change (per COURSE-01's URL filter-state rules), without
  // scrolling the page back to the top.
  const updateUrl = (nextFilters: FilterState, nextSort: SortValue) => {
    const query = serializeCourseFilters(nextFilters, nextSort)
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const toggleFilter = (key: FilterKey, value: string) => {
    const current = filters[key]
    const nextValues = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    updateUrl({ ...filters, [key]: nextValues }, sort)
  }

  const removeFilter = (key: FilterKey, value: string) => {
    updateUrl({ ...filters, [key]: filters[key].filter((item) => item !== value) }, sort)
  }

  const clearAllFilters = () => updateUrl(emptyFilters, sort)

  // Mobile Sheet applies its own local draft state — the URL only updates
  // once here, on Apply, never while the user is merely toggling checkboxes
  // inside the still-open Sheet.
  const applyMobileFilters = (nextFilters: FilterState) => updateUrl(nextFilters, sort)

  const handleSortChange = (nextSort: SortValue) => updateUrl(filters, nextSort)

  return (
    <div className="bg-background pt-5 pb-9 lg:pt-8 lg:pb-14">
      <Container className="px-4">
        <Breadcrumbs items={['Home', 'Courses']} />
        <div className="mt-3">
          <PageHeader
            title="Courses in India"
            description="Explore undergraduate, postgraduate, diploma and certificate courses by specialization, fees, duration and career options."
          />
          <p className="mt-2 text-sm font-semibold text-primary">2,400+ Courses</p>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* Sticky top offset = PublicHeader's actual height at lg+ (64px primary row + 40px nav row = 104px) plus 16px breathing room. */}
          <div className="sticky top-30 hidden max-h-[calc(100dvh-7.5rem-1rem)] overflow-y-auto lg:block">
            <CourseFilterSidebar filters={filters} onToggle={toggleFilter} onClearAll={clearAllFilters} />
          </div>

          <div className="min-w-0 flex-1">
            <CourseResultsToolbar
              resultCount={allResults.length}
              filters={filters}
              onApplyMobileFilters={applyMobileFilters}
              onRemoveFilter={removeFilter}
              onClearAll={clearAllFilters}
              sort={sort}
              onSortChange={handleSortChange}
            />

            {allResults.length === 0 ? (
              <div className="flex flex-col items-center gap-4">
                <EmptyState title="No courses match these filters." />
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  {visibleResults.map((course) => (
                    <CourseResultCard key={course.id} course={course} />
                  ))}
                </div>

                {hasMore ? (
                  <div ref={sentinelRef} className="py-4">
                    {loadingMore && (
                      <div role="status" className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Loading more courses...
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="py-4 text-center text-sm text-muted-foreground">You&apos;ve reached the end of the results.</p>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
