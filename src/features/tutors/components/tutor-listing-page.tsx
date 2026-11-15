'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Search } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { ListingHeader } from '@/components/shared/listing/listing-header'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { cn } from '@/lib/utils'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { EmptyState } from '@/components/feedback'
import { Button } from '@/components/ui/button'
import { ListingError, ListingLoading } from '@/features/catalog/listing-states'
import { useCatalogList } from '@/hooks/use-catalog-list'
import { apiQueryFrom } from '@/lib/search-params'
import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import { toTutor, type TutorListDto } from '../api/tutors-api'
import {
  emptyFilters,
  filterGroups,
  parseTutorFilters,
  parseTutorSearch,
  parseTutorSort,
  serializeTutorFilters,
  type FilterKey,
  type Tutor,
  type FilterState,
  type SortValue,
} from '../data/tutors'
import { FeaturedTutorCard, TutorResultCard } from './tutor-cards'
import { TutorFilterSidebar, TutorResultsHeader } from './tutor-filters'

 
function TutorSearch({ query, onSearch }: { query: string; onSearch: (value: string) => void }) {
  const [draft, setDraft] = useState(query)
  useEffect(() => setDraft(query), [query])
  return (
    <form
      role="search"
      className="flex h-12 max-w-2xl items-center gap-2 rounded-xl bg-card pr-1.5 pl-3.5 text-foreground shadow-[0_8px_24px_rgba(15,23,42,0.18)]"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch(draft)
      }}
    >
      <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <input aria-label="Search tutors" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Search by subject, exam or tutor name" className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground sm:text-sm" />
      <Button type="submit" variant="cta" className="h-9 px-4 font-semibold">
        Search
      </Button>
    </form>
  )
}

const howItWorks: { art: SpotArtName; title: string; text: string }[] = [
  { art: 'search', title: 'Filter by what you need', text: 'Subject, exam, class level, language and learning mode' },
  { art: 'tutor', title: 'Read the profile', text: 'Subjects, teaching approach and who they help' },
  { art: 'guide', title: 'Get in touch', text: 'Session requests open here once scheduling is live' },
]

const subjectArt: Record<string, SpotArtName> = { Physics: 'predictor', Chemistry: 'notes', Mathematics: 'chart', Biology: 'scholarship', English: 'courses', 'Computer Science': 'presentation' }

const subjectOptions = filterGroups.find((group) => group.key === 'subjects')?.options ?? []

export function TutorListingPage({ initial, initialQuery, featured }: { initial?: CatalogList<Tutor> | null; initialQuery?: CatalogQuery; featured: Tutor[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = useMemo(() => parseTutorFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseTutorSort(searchParams), [searchParams])
  const query = useMemo(() => parseTutorSearch(searchParams), [searchParams])

  const apiQuery = useMemo(() => apiQueryFrom(serializeTutorFilters(filters, sort, query)), [filters, sort, query])
  const list = useCatalogList<TutorListDto, Tutor>({ path: '/tutors', query: apiQuery, map: toTutor, limit: 20, initial, initialQuery })
  const results = list.items

  const updateUrl = (nextFilters: FilterState, nextSort: SortValue, nextQuery: string) => {
    const queryString = serializeTutorFilters(nextFilters, nextSort, nextQuery)
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
  }
  const toggleFilter = (key: FilterKey, value: string) => {
    const current = filters[key]
    updateUrl({ ...filters, [key]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value] }, sort, query)
  }
  const removeFilter = (key: FilterKey, value: string) => updateUrl({ ...filters, [key]: filters[key].filter((item) => item !== value) }, sort, query)

  return (
    <div className="bg-muted/50">
      <ListingHeader breadcrumbs={['Home', 'Tutors']} title="Find a tutor" description="Individual tutors for your subjects, entrance exams and board classes, online or in person." art="tutor">
        <TutorSearch query={query} onSearch={(value) => updateUrl(filters, sort, value)} />
      </ListingHeader>

      <Container className="px-4 pb-12">
        <div>
          <nav aria-label="Popular subjects" className="-mx-4 flex gap-2 overflow-x-auto px-4 pt-5 [scrollbar-width:none] sm:mx-0 sm:px-0">
            {subjectOptions.map((subject) => {
              const active = filters.subjects.includes(subject)
              return (
                <button
                  key={subject}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleFilter('subjects', subject)}
                  className={cn('flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-xl border pr-3.5 pl-1.5 text-sm font-semibold whitespace-nowrap outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40', active ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary/50')}
                >
                  <SpotArt name={subjectArt[subject] ?? 'courses'} className={cn('size-8 rounded-lg', active && 'bg-card')} />
                  {subject}
                </button>
              )
            })}
          </nav>
          {featured.length === 0 ? null : <section className="pt-8" aria-labelledby="featured-tutors">
            <h2 id="featured-tutors" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
              Featured tutors
            </h2>
            <HorizontalContentRail ariaLabel="Featured tutors" className="mt-4" trackClassName="lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
              {featured.map((tutor) => (
                <FeaturedTutorCard key={tutor.id} tutor={tutor} />
              ))}
            </HorizontalContentRail>
          </section>}

          <section className="pt-10" aria-labelledby="all-tutors">
            <h2 id="all-tutors" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
              All tutors
            </h2>
            <div className="mt-4">
              <TutorResultsHeader
                resultCount={list.total}
                filters={filters}
                sort={sort}
                onSortChange={(next) => updateUrl(filters, next, query)}
                onApplyMobileFilters={(next) => updateUrl(next, sort, query)}
                onRemoveFilter={removeFilter}
                onClearAll={() => updateUrl(emptyFilters, sort, query)}
              />
            </div>

            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-7">
              <div className="sticky top-header-gap hidden max-h-[calc(100dvh-var(--pw-header-h)-2rem)] overflow-y-auto lg:block">
                <TutorFilterSidebar filters={filters} onToggle={toggleFilter} onClearAll={() => updateUrl(emptyFilters, sort, query)} />
              </div>

              <div className="min-w-0 flex-1">
                {list.status === 'loading' ? (
                  <ListingLoading label="Loading tutors" />
                ) : list.status === 'error' ? (
                  <ListingError message={list.error} onRetry={list.retry} />
                ) : results.length === 0 ? (
                  <div className="flex flex-col items-center gap-4">
                    <EmptyState title="No tutors match these filters." />
                    <div className="flex flex-wrap justify-center gap-2">
                      <Button variant="outline" onClick={() => updateUrl(emptyFilters, sort, query)}>
                        Clear filters
                      </Button>
                      <Button variant="outline" onClick={() => updateUrl(filters, sort, '')}>
                        Clear search
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {results.map((tutor) => (
                      <TutorResultCard key={tutor.id} tutor={tutor} />
                    ))}
                    {list.hasMore ? (
                      <Button variant="outline" className="self-center" disabled={list.loadingMore} onClick={list.loadMore}>
                        {list.loadingMore ? 'Loading…' : 'Load more tutors'}
                      </Button>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="pt-10" aria-labelledby="tutor-guide">
            <h2 id="tutor-guide" className="font-heading text-xl font-bold text-foreground sm:text-2xl">
              How it works
            </h2>
            <ol className="mt-4 grid gap-3 md:grid-cols-3">
              {howItWorks.map((item, index) => (
                <li key={item.title} className="flex items-center gap-3.5 rounded-xl border bg-card p-4">
                  <SpotArt name={item.art} className="size-12" />
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {index + 1}. {item.title}
                    </span>
                    <span className="block text-[13px] text-muted-foreground">{item.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-6 flex flex-col gap-4 rounded-2xl bg-primary p-5 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <SpotArt name="presentation" className="size-14 bg-card" />
              <div>
                <h2 className="font-heading text-lg font-bold sm:text-xl">Teach on Pathway</h2>
                <p className="mt-0.5 text-sm text-primary-foreground/85">Create a tutor profile, set your weekly hours and meet students who need your subjects.</p>
              </div>
            </div>
            <Button variant="cta" className="h-11 shrink-0 px-5 font-semibold" nativeButton={false} render={<Link href="/register?as=tutor" />}>
              Become a tutor
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </section>
        </div>
      </Container>
    </div>
  )
}
