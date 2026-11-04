'use client'

import { useEffect, useMemo, useRef } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { EmptyState } from '@/components/feedback'
import { Button } from '@/components/ui/button'
import { ListingError, ListingLoading } from '@/features/catalog/listing-states'
import { useCatalogList } from '@/hooks/use-catalog-list'
import { apiQueryFrom } from '@/lib/search-params'
import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import { toScholarshipListItem, type ScholarshipListDto, type ScholarshipListItem } from '../api/scholarships-api'
import {
  emptyFilters,
  parseScholarshipFilters,
  parseScholarshipSearch,
  parseScholarshipSort,
  serializeScholarshipFilters,
  type FilterKey,
  type FilterState,
  type SortValue,
} from '../data/filters'
import { ScholarshipFilterSidebar } from './scholarship-filter-sidebar'
import { ScholarshipResultsToolbar } from './scholarship-results-toolbar'
import { ScholarshipResultCard } from './scholarship-result-card'
import { ScholarshipHero } from './scholarship-hero'

const PAGE_SIZE = 12

export function ScholarshipListingPage({ initial, initialQuery }: { initial?: CatalogList<ScholarshipListItem> | null; initialQuery?: CatalogQuery }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  
  
  
  
  const filters = useMemo(() => parseScholarshipFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseScholarshipSort(searchParams), [searchParams])
  const query = useMemo(() => parseScholarshipSearch(searchParams), [searchParams])

  const apiQuery = useMemo(() => apiQueryFrom(serializeScholarshipFilters(filters, sort, query)), [filters, sort, query])
  const list = useCatalogList<ScholarshipListDto, ScholarshipListItem>({ path: '/scholarships', query: apiQuery, map: toScholarshipListItem, limit: PAGE_SIZE, initial, initialQuery })
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
      { rootMargin: '200px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [hasMore, loadMore])

  
  
  const updateUrl = (nextFilters: FilterState, nextSort: SortValue, nextQuery: string) => {
    const queryString = serializeScholarshipFilters(nextFilters, nextSort, nextQuery)
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
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
        <Breadcrumbs items={['Home', 'Scholarships']} />
      </Container>
      <ScholarshipHero query={query} onSearch={(value) => updateUrl(filters, sort, value)} />

      <Container className="px-4 pt-8">
        <div>
        <p className="text-sm font-semibold text-primary">{list.status === 'ready' ? `${list.total.toLocaleString('en-IN')} ${list.total === 1 ? 'Scholarship' : 'Scholarships'} available` : 'Scholarships'}</p>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <div className="sticky top-header-gap hidden max-h-[calc(100dvh-var(--pw-header-h)-2rem)] overflow-y-auto lg:block">
            <ScholarshipFilterSidebar filters={filters} onToggle={toggleFilter} onClearAll={clearAllFilters} />
          </div>

          <div className="min-w-0 flex-1">
            <ScholarshipResultsToolbar
              resultCount={list.total}
              filters={filters}
              onApplyMobileFilters={applyMobileFilters}
              onToggleFilter={toggleFilter}
              onRemoveFilter={removeFilter}
              onClearAll={clearAllFilters}
              sort={sort}
              onSortChange={handleSortChange}
            />

            {list.status === 'loading' ? (
                <ListingLoading label="Loading scholarships" />
              ) : list.status === 'error' ? (
                <ListingError message={list.error} onRetry={list.retry} />
              ) : visibleResults.length === 0 ? (
              <div className="flex flex-col items-center gap-4">
                <EmptyState title="No scholarships found. Try adjusting your filters." />
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
                <div className="flex flex-col gap-3 sm:gap-4">
                  {visibleResults.map((scholarship) => (
                    <ScholarshipResultCard key={scholarship.id} scholarship={scholarship} />
                  ))}
                </div>

                {hasMore ? (
                  <div ref={sentinelRef} className="py-4">
                    {loadingMore && (
                      <div role="status" className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Loading more scholarships...
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
        </div>
      </Container>
    </div>
  )
}
