'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/feedback'
import { Button } from '@/components/ui/button'
import { getCollegeFeed } from '../data/colleges'
import { emptyFilters, matchesFilters, sortColleges, type FilterKey, type FilterState, type SortValue } from '../data/filters'
import { CollegeFilterSidebar } from './college-filter-sidebar'
import { CollegeResultsToolbar } from './college-results-toolbar'
import { CollegeResultCard } from './college-result-card'

const BATCH_SIZE = 8

export function CollegeListingPage() {
  const [filters, setFilters] = useState<FilterState>(emptyFilters)
  const [sort, setSort] = useState<SortValue>('popularity')
  const [compared, setCompared] = useState<string[]>([])
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)

  const feed = useMemo(() => getCollegeFeed(), [])
  const allResults = useMemo(() => sortColleges(feed.filter((college) => matchesFilters(college, filters)), sort), [feed, filters, sort])
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

  const toggleFilter = (key: FilterKey, value: string) => {
    setFilters((prev) => {
      const current = prev[key]
      const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
      return { ...prev, [key]: next }
    })
  }

  const removeFilter = (key: FilterKey, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: prev[key].filter((item) => item !== value) }))
  }

  const clearAllFilters = () => setFilters(emptyFilters)

  const toggleCompare = (id: string) => {
    setCompared((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="bg-background pt-5 pb-9 lg:pt-8 lg:pb-14">
      <Container className="px-4">
        <Breadcrumbs items={['Home', 'Colleges']} />
        <div className="mt-3">
          <PageHeader title="Colleges in India" description="Explore colleges and universities by course, location, fees, exams and more." />
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          {/* Sticky top offset = PublicHeader's actual height at lg+ (64px primary row + 40px nav row = 104px) plus 16px breathing room. */}
          <div className="sticky top-30 hidden max-h-[calc(100dvh-7.5rem-1rem)] overflow-y-auto lg:block">
            <CollegeFilterSidebar filters={filters} onToggle={toggleFilter} onClearAll={clearAllFilters} />
          </div>

          <div className="min-w-0 flex-1">
            <CollegeResultsToolbar
              resultCount={allResults.length}
              filters={filters}
              onApplyMobileFilters={setFilters}
              onRemoveFilter={removeFilter}
              onClearAll={clearAllFilters}
              sort={sort}
              onSortChange={setSort}
            />

            {allResults.length === 0 ? (
              <div className="flex flex-col items-center gap-4">
                <EmptyState title="No colleges match these filters." />
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  {visibleResults.map((college) => (
                    <CollegeResultCard key={college.id} college={college} compared={compared.includes(college.id)} onToggleCompare={toggleCompare} />
                  ))}
                </div>

                {hasMore ? (
                  <div ref={sentinelRef} className="py-4">
                    {loadingMore && (
                      <div role="status" className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Loading more colleges...
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
