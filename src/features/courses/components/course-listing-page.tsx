'use client'

import { useEffect, useMemo, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Layers, Loader2, Search } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { EmptyState } from '@/components/feedback'
import { ListingError, ListingLoading } from '@/features/catalog/listing-states'
import { Button } from '@/components/ui/button'
import { useCatalogList } from '@/hooks/use-catalog-list'
import { apiQueryFrom } from '@/lib/search-params'
import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import { toCourseListItem, type CourseListItem, type ProgramListDto } from '../api/courses-api'
import {
  emptyFilters,
  parseCourseFilters,
  parseCourseSearch,
  parseCourseSort,
  serializeCourseFilters,
  type FilterKey,
  type FilterState,
  type SortValue,
} from '../data/filters'
import { CourseFilterSidebar } from './course-filter-sidebar'
import { CourseResultsToolbar } from './course-results-toolbar'
import { CourseResultCard } from './course-result-card'
import { CourseHero } from './course-hero'

const PAGE_SIZE = 12

export function CourseListingPage({ initial, initialQuery }: { initial?: CatalogList<CourseListItem> | null; initialQuery?: CatalogQuery }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  
  
  
  
  const filters = useMemo(() => parseCourseFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseCourseSort(searchParams), [searchParams])
  const query = useMemo(() => parseCourseSearch(searchParams), [searchParams])

  const apiQuery = useMemo(() => apiQueryFrom(serializeCourseFilters(filters, sort, query)), [filters, sort, query])
  const list = useCatalogList<ProgramListDto, CourseListItem>({ path: '/programs', query: apiQuery, map: toCourseListItem, limit: PAGE_SIZE, initial, initialQuery })
  const { items: visibleResults, hasMore, loadingMore, loadMore } = list

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasMore) return
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore()
      },
      { rootMargin: '200px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, loadMore])

  
  
  const updateUrl = (nextFilters: FilterState, nextSort: SortValue, nextQuery: string) => {
    const query = serializeCourseFilters(nextFilters, nextSort, nextQuery)
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const toggleFilter = (key: FilterKey, value: string) => {
    const current = filters[key]
    const nextValues = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    updateUrl({ ...filters, [key]: nextValues }, sort, query)
  }

  const removeFilter = (key: FilterKey, value: string) => {
    updateUrl({ ...filters, [key]: filters[key].filter((item) => item !== value) }, sort, query)
  }

  const clearAllFilters = () => updateUrl(emptyFilters, sort, query)

  
  
  
  const applyMobileFilters = (nextFilters: FilterState) => updateUrl(nextFilters, sort, query)

  const handleSortChange = (nextSort: SortValue) => updateUrl(filters, nextSort, query)

  return (
    <div className="bg-background pb-9 lg:pb-14">
      <Container className="px-4 py-3">
        <Breadcrumbs items={['Home', 'Courses']} />
      </Container>
      <CourseHero query={query} onSearch={(value) => updateUrl(filters, sort, value)} />

      <Container className="px-4 pt-8">
        <div>
          <p className="text-sm font-semibold text-primary">{list.status === 'ready' ? `${list.total.toLocaleString('en-IN')} ${list.total === 1 ? 'Course' : 'Courses'}` : 'Courses'}</p>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="sticky top-header-gap hidden max-h-[calc(100dvh-var(--pw-header-h)-2rem)] overflow-y-auto lg:block">
              <CourseFilterSidebar filters={filters} onToggle={toggleFilter} onClearAll={clearAllFilters} />
            </div>

            <div className="min-w-0 flex-1">
              <CourseResultsToolbar
                resultCount={list.total}
                filters={filters}
                onApplyMobileFilters={applyMobileFilters}
                onRemoveFilter={removeFilter}
                onClearAll={clearAllFilters}
                sort={sort}
                onSortChange={handleSortChange}
              />

              {list.status === 'loading' ? (
                <ListingLoading label="Loading courses" />
              ) : list.status === 'error' ? (
                <ListingError message={list.error} onRetry={list.retry} />
              ) : visibleResults.length === 0 ? (
                <div className="flex flex-col items-center gap-4">
                  <EmptyState title="No courses match these filters." />
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button variant="outline" onClick={clearAllFilters}>
                      Clear Filters
                    </Button>
                    {query && (
                      <Button variant="outline" onClick={() => updateUrl(filters, sort, '')}>
                        Clear Search
                      </Button>
                    )}
                  </div>
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

          <section className="pt-10" aria-labelledby="explore-guide">
            <h2 id="explore-guide" className="font-heading text-xl font-bold text-foreground">
              How to explore courses
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { icon: Layers, title: 'Narrow by field', text: 'Filter by stream, level or specialization to find courses that match your goals.' },
                { icon: Search, title: 'Search directly', text: 'Already know a course name or degree? Use the search bar to jump straight to it.' },
                { icon: ArrowRight, title: 'Check the colleges', text: 'Each course page lists colleges that offer it, along with entrance exams and fees.' },
              ].map((item) => (
                <div key={item.title} className="flex h-full items-start gap-3 rounded-[12px] border bg-card p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <item.icon className="size-4.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[12px] border bg-primary/5 p-5">
              <p className="min-w-0 flex-1 text-sm font-semibold text-foreground">Looking for colleges instead? Browse by course, location and exams.</p>
              <Button variant="cta" className="h-10 gap-2 px-5 font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
                Explore Colleges
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
