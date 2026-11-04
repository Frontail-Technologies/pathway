'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Loader2, MapPin, SlidersHorizontal } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { EmptyState } from '@/components/feedback'
import { ListingError, ListingLoading } from '@/features/catalog/listing-states'
import { useCatalogList } from '@/hooks/use-catalog-list'
import { apiQueryFrom } from '@/lib/search-params'
import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import { toCollegeListItem, type CollegeListItem, type InstitutionListDto } from '../api/colleges-api'
import { Button } from '@/components/ui/button'
import { emptyFilters, parseCollegeFilters, parseCollegeSearch, parseCollegeSort, serializeCollegeFilters, type FilterKey, type FilterState, type SortValue } from '../data/filters'
import { CollegeFilterSidebar } from './college-filter-sidebar'
import { CollegeResultsToolbar } from './college-results-toolbar'
import { CollegeResultCard } from './college-result-card'
import { CollegeHero } from './college-hero'
import { FeaturedCollegeTile } from './featured-colleges'

const PAGE_SIZE = 12

export function CollegeListingPage({
  initial,
  initialQuery,
  featured,
}: {
  initial?: CatalogList<CollegeListItem> | null
  initialQuery?: CatalogQuery
  featured: CollegeListItem[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filters = useMemo(() => parseCollegeFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseCollegeSort(searchParams), [searchParams])
  const query = useMemo(() => parseCollegeSearch(searchParams), [searchParams])
  const [compared, setCompared] = useState<string[]>([])

  const apiQuery = useMemo(() => apiQueryFrom(serializeCollegeFilters(filters, sort, query)), [filters, sort, query])
  const list = useCatalogList<InstitutionListDto, CollegeListItem>({ path: '/institutions', query: apiQuery, map: toCollegeListItem, limit: PAGE_SIZE, initial, initialQuery })
  const { items: visibleResults, hasMore, loadingMore, loadMore } = list

  const updateUrl = (nextFilters: FilterState, nextSort: SortValue, nextQuery: string) => {
    const next = serializeCollegeFilters(nextFilters, nextSort, nextQuery)
    router.push(next ? `${pathname}?${next}` : pathname, { scroll: false })
  }

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

  const toggleFilter = (key: FilterKey, value: string) => {
    const current = filters[key]
    updateUrl({ ...filters, [key]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value] }, sort, query)
  }

  const removeFilter = (key: FilterKey, value: string) => updateUrl({ ...filters, [key]: filters[key].filter((item) => item !== value) }, sort, query)

  const clearAllFilters = () => updateUrl(emptyFilters, sort, query)

  const toggleCompare = (id: string) => {
    setCompared((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="bg-background pb-9 lg:pb-14">
      <Container className="px-4 py-3">
        <Breadcrumbs items={['Home', 'Colleges']} />
      </Container>
      <CollegeHero query={query} onSearch={(value) => updateUrl(filters, sort, value)} />

      <Container className="px-4 pt-8">
        <div>
          {featured.length > 0 ? (
          <section aria-labelledby="featured-colleges">
            <h2 id="featured-colleges" className="font-heading text-xl font-bold text-foreground">
              Featured Colleges
            </h2>
            <HorizontalContentRail ariaLabel="Featured colleges" edgeBleed className="mt-4 sm:mx-0" trackClassName="sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:scroll-px-0">
              {featured.map((college) => (
                <FeaturedCollegeTile key={college.id} college={college} />
              ))}
            </HorizontalContentRail>
          </section>
          ) : null}

          <section className="mt-10" aria-labelledby="all-colleges">
            <h2 id="all-colleges" className="sr-only">
              All Colleges
            </h2>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
              <div className="sticky top-header-gap hidden max-h-[calc(100dvh-var(--pw-header-h)-2rem)] overflow-y-auto lg:block">
                <CollegeFilterSidebar filters={filters} onToggle={toggleFilter} onClearAll={clearAllFilters} />
              </div>

              <div className="min-w-0 flex-1">
                <CollegeResultsToolbar
                  resultCount={list.total}
                  filters={filters}
                  onApplyMobileFilters={(next) => updateUrl(next, sort, query)}
                  onRemoveFilter={removeFilter}
                  onClearAll={clearAllFilters}
                  sort={sort}
                  onSortChange={(next) => updateUrl(filters, next, query)}
                />

                {list.status === 'loading' ? (
                  <ListingLoading label="Loading colleges" />
                ) : list.status === 'error' ? (
                  <ListingError message={list.error} onRetry={list.retry} />
                ) : visibleResults.length === 0 ? (
                  <div className="flex flex-col items-center gap-4">
                    <EmptyState title="No colleges match these filters." />
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
          </section>

          <section className="pt-10" aria-labelledby="explore-guide">
            <h2 id="explore-guide" className="font-heading text-xl font-bold text-foreground">
              How to explore colleges
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { icon: SlidersHorizontal, title: 'Narrow by preference', text: 'Filter by state, city, course or fees to find colleges that fit your plan.' },
                { icon: MapPin, title: 'Compare locations', text: 'Study mode and city filters help you weigh a local college against moving away.' },
                { icon: ArrowRight, title: 'Check your chances', text: 'Once you know your exam score, the College Predictor helps you plan your next steps.' },
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
              <p className="min-w-0 flex-1 text-sm font-semibold text-foreground">Already know your exam score? Predict colleges that may match your profile.</p>
              <Button variant="cta" className="h-10 gap-2 px-5 font-semibold" nativeButton={false} render={<Link href="/college-predictor" />}>
                Try College Predictor
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
