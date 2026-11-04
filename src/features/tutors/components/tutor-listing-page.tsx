'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, MessageSquareText, Search, SlidersHorizontal, UserRoundCheck } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { HorizontalContentRail } from '@/components/shared/horizontal-content-rail'
import { StudentToolHero } from '@/components/shared/student-tool/student-tool-hero'
import { EmptyState } from '@/components/feedback'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ListingError, ListingLoading } from '@/features/catalog/listing-states'
import { useCatalogList } from '@/hooks/use-catalog-list'
import { apiQueryFrom } from '@/lib/search-params'
import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import { toTutor, type TutorListDto } from '../api/tutors-api'
import {
  emptyFilters,
  parseTutorFilters,
  parseTutorSearch,
  parseTutorSort,
  serializeTutorFilters,
  type FilterKey,
  type Tutor,
  type FilterState,
  type SortValue,
} from '../data/tutors'
import { TutorPortrait } from './tutor-avatar'
import { FeaturedTutorCard, TutorResultCard } from './tutor-cards'
import { TutorFilterSidebar, TutorResultsHeader } from './tutor-filters'

 
const heroArtTutor = { name: 'Tutor', avatar: { skin: '#e0b088', hair: '#2b2118', shirt: '#3b6fd6', style: 'short', glasses: true } } as const

function TutorHeroArt() {
  return (
    <div className="relative hidden h-52 w-96 shrink-0 lg:block" aria-hidden="true">
      <div className="absolute top-2 left-2 rounded-2xl bg-white/90 px-4 py-2 text-xs font-semibold text-primary shadow-[0_12px_28px_rgba(30,58,138,0.12)] ring-1 ring-primary/10">
        Personal guidance,
        <br />
        one subject at a time
      </div>
      <TutorPortrait tutor={heroArtTutor} className="absolute right-12 bottom-6 h-44 w-36 rounded-2xl shadow-[0_16px_30px_rgba(30,58,138,0.18)]" />
      <svg viewBox="0 0 120 60" className="absolute right-0 bottom-0 h-20 w-44 drop-shadow-[0_10px_16px_rgba(30,58,138,0.2)]">
        <path d="M22 4h76a4 4 0 0 1 4 4v38H18V8a4 4 0 0 1 4-4Z" fill="#1e3a8a" />
        <rect x="24" y="10" width="72" height="30" rx="2" fill="#dbe6fb" />
        <circle cx="60" cy="25" r="5" fill="#1d4ed8" />
        <path d="M6 46h108l-6 10H12Z" fill="#c7d6f5" />
      </svg>
      <span className="absolute top-6 right-2 text-xl text-cta/70">+</span>
    </div>
  )
}

function TutorHero({ query, onSearch }: { query: string; onSearch: (value: string) => void }) {
  const [draft, setDraft] = useState(query)
  useEffect(() => setDraft(query), [query])

  return (
    <StudentToolHero eyebrow="Find a Tutor" titleLead="Find the Right" titleAccent="Tutor" description="Connect with individual tutors for personalised guidance in your subjects and exams." artwork={<TutorHeroArt />}>
      <form
        role="search"
        className="mt-4 flex max-w-xl items-center gap-2 rounded-[12px] border bg-card p-1.5 shadow-[0_10px_30px_rgba(30,58,138,0.08)]"
        onSubmit={(event) => {
          event.preventDefault()
          onSearch(draft)
        }}
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input aria-label="Search tutors" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Search by subject, exam or tutor name" className="h-11 border-0 bg-transparent pl-9 text-base shadow-none focus-visible:ring-0 sm:text-sm" />
        </div>
        <Button type="submit" variant="cta" className="h-11 px-5 font-semibold">
          Search
        </Button>
      </form>
    </StudentToolHero>
  )
}

const howItWorks = [
  { icon: SlidersHorizontal, title: 'Filter by what you need', text: 'Choose a subject, exam, class level, language and learning mode.' },
  { icon: UserRoundCheck, title: 'Read the profile', text: 'See the tutor’s subjects, teaching approach and who they help.' },
  { icon: MessageSquareText, title: 'Get in touch', text: 'Session requests will open here once scheduling is connected.' },
]

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
    <div className="bg-background">
      <Container className="px-4 py-3">
        <Breadcrumbs items={['Home', 'Tutors']} />
      </Container>
      <TutorHero query={query} onSearch={(value) => updateUrl(filters, sort, value)} />

      <Container className="px-4 pb-10">
        <div>
          {featured.length === 0 ? null : <section className="pt-8" aria-labelledby="featured-tutors">
            <h2 id="featured-tutors" className="font-heading text-xl font-bold text-foreground">
              Featured Tutors
            </h2>
            <HorizontalContentRail ariaLabel="Featured tutors" className="mt-4" trackClassName="lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
              {featured.map((tutor) => (
                <FeaturedTutorCard key={tutor.id} tutor={tutor} />
              ))}
            </HorizontalContentRail>
          </section>}

          <section className="pt-10" aria-labelledby="all-tutors">
            <h2 id="all-tutors" className="font-heading text-xl font-bold text-foreground">
              All Tutors
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
                        Clear Filters
                      </Button>
                      <Button variant="outline" onClick={() => updateUrl(filters, sort, '')}>
                        Clear Search
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
            <h2 id="tutor-guide" className="font-heading text-xl font-bold text-foreground">
              How Tutor Discovery Works
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {howItWorks.map((item) => (
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
              <p className="min-w-0 flex-1 text-sm font-semibold text-foreground">Preparing for an entrance exam? Explore exams first, then find a tutor for your subjects.</p>
              <Button variant="cta" className="h-10 gap-2 px-5 font-semibold" nativeButton={false} render={<Link href="/exams" />}>
                Explore Exams
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-[12px] border bg-card p-5">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground">Are you a tutor?</p>
                <p className="mt-0.5 text-xs leading-5 text-muted-foreground">Manage your profile, weekly availability and session requests in Tutor Space.</p>
              </div>
              <Button variant="outline" className="h-10 px-5 font-semibold" nativeButton={false} render={<Link href="/tutor-dashboard" />}>
                Open Tutor Space
              </Button>
            </div>
          </section>
        </div>
      </Container>
    </div>
  )
}
