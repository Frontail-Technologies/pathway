'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight, BookOpen, ChevronRight, GraduationCap, Loader2, MapPin, MonitorPlay } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { EmptyState } from '@/components/feedback'
import { Button } from '@/components/ui/button'
import { coachingProviders, getCoachingFeed, type CoachingProvider } from '../data/coaching'
import { getCoachingVisual } from '../data/visuals'
import {
  emptyFilters,
  matchesFilters,
  matchesSearch,
  parseCoachingFilters,
  parseCoachingSearch,
  parseCoachingSort,
  serializeCoachingFilters,
  sortCoachingProviders,
  type FilterKey,
  type FilterState,
  type SortValue,
} from '../data/filters'
import { CoachingFilterSidebar } from './coaching-filter-sidebar'
import { CoachingResultCard } from './coaching-result-card'
import { CoachingResultsHeader } from './coaching-results-header'
import { CoachingResultsToolbar } from './coaching-results-toolbar'




const BATCH_SIZE = 6

export function CoachingListingPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = useMemo(() => parseCoachingFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseCoachingSort(searchParams), [searchParams])
  const query = useMemo(() => parseCoachingSearch(searchParams), [searchParams])

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)

  const feed = useMemo(() => getCoachingFeed(), [])
  const recommendedProviders = useMemo(() => sortCoachingProviders(coachingProviders, 'recommended').slice(0, 3), [])
  const allResults = useMemo(
    () => sortCoachingProviders(feed.filter((provider) => matchesFilters(provider, filters) && matchesSearch(provider, query)), sort),
    [feed, filters, query, sort]
  )
  const visibleResults = allResults.slice(0, visibleCount)
  const hasMore = visibleCount < allResults.length

  useEffect(() => {
    setVisibleCount(BATCH_SIZE)
  }, [filters, query, sort])

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

  const updateUrl = (nextFilters: FilterState, nextSort: SortValue, nextQuery: string) => {
    const queryString = serializeCoachingFilters(nextFilters, nextSort, nextQuery)
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
  const handleSearchChange = (nextQuery: string) => updateUrl(filters, sort, nextQuery)

  return (
    <div className="bg-background pb-9 lg:pb-14">
      <Container className="max-w-[1360px] px-4 pt-5 lg:pt-7">
        <CoachingHero />

        <div className="relative z-10 -mt-5 px-0 sm:-mt-6 lg:px-8">
          <CoachingResultsToolbar query={query} onSearchChange={handleSearchChange} />
        </div>

        <RecommendedProviders providers={recommendedProviders} />

        <CoachingResultsHeader
          resultCount={allResults.length}
          filters={filters}
          onApplyMobileFilters={applyMobileFilters}
          onRemoveFilter={removeFilter}
          onClearAll={clearAllFilters}
          sort={sort}
          onSortChange={handleSortChange}
        />

        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-7">
          <div className="sticky top-34 hidden max-h-[calc(100dvh-8.5rem-1rem)] overflow-y-auto lg:block">
            <CoachingFilterSidebar filters={filters} onToggle={toggleFilter} onClearAll={clearAllFilters} />
          </div>

          <div className="min-w-0 flex-1">
            {allResults.length === 0 ? (
              <div className="flex flex-col items-center gap-4">
                <EmptyState title="No coaching providers match these filters." />
                <Button variant="outline" onClick={() => updateUrl(emptyFilters, 'recommended', '')}>
                  Clear Search & Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 sm:gap-4">
                  {visibleResults.map((provider) => (
                    <CoachingResultCard key={provider.id} provider={provider} />
                  ))}
                </div>

                {hasMore ? (
                  <div ref={sentinelRef} className="py-4">
                    {loadingMore && (
                      <div role="status" className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        Loading more providers...
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

function CoachingHero() {
  const examCount = new Set(coachingProviders.flatMap((provider) => provider.exams)).size
  const modeCount = new Set(coachingProviders.flatMap((provider) => provider.modes)).size

  return (
    <section className="overflow-hidden rounded-[14px] border bg-card shadow-[0_16px_42px_rgba(15,23,42,0.08)]">
      {


 }
      <div className="grid min-h-[250px] lg:min-h-[300px] lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.85fr)] lg:grid-rows-[auto_auto]">
        <div className="relative z-10 order-1 flex flex-col justify-center p-5 sm:p-7 lg:order-0 lg:col-start-1 lg:row-start-1 lg:p-8">
          <CoachingBreadcrumb />
          <h1 className="mt-4 font-heading text-3xl font-extrabold text-foreground sm:text-4xl">Coaching Institute Discovery</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Find coaching institutes and exam preparation academies by exam, subject, learning mode, location and course type.
          </p>
        </div>
        <div className="relative order-2 min-h-54 lg:order-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:min-h-full">
          <Image
            src="/coaching/coaching-hero.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,250,252,0)_45%,rgba(248,250,252,0.78)_100%)] lg:bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.58)_18%,rgba(255,255,255,0)_48%)]" />
        </div>
        <div className="relative z-10 order-3 flex flex-wrap gap-x-6 gap-y-3 px-5 pb-5 sm:px-7 sm:pb-7 lg:order-0 lg:col-start-1 lg:row-start-2 lg:px-8 lg:pb-8">
          <HeroStat icon={<GraduationCap className="size-4" aria-hidden="true" />} title={`${coachingProviders.length}+ Providers`} label="Coaching institutes & academies" />
          <HeroStat icon={<BookOpen className="size-4" aria-hidden="true" />} title={`${examCount} Exam Categories`} label="JEE, NEET, CAT & more" />
          <HeroStat icon={<MonitorPlay className="size-4" aria-hidden="true" />} title={`${modeCount} Learning Modes`} label="Online, offline, hybrid" />
        </div>
      </div>
    </section>
  )
}

function CoachingBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="font-medium hover:text-primary hover:underline">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="font-medium text-foreground">Coaching</li>
      </ol>
    </nav>
  )
}

function HeroStat({ icon, title, label }: { icon: ReactNode; title: string; label: string }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-bold text-foreground">{title}</span>
        <span className="block text-xs text-muted-foreground">{label}</span>
      </span>
    </span>
  )
}

function RecommendedProviders({ providers }: { providers: CoachingProvider[] }) {
  return (
    <section className="mt-7 sm:mt-8">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Recommended</p>
          <h2 className="mt-1 font-heading text-xl font-bold text-foreground">Recommended Coaching Providers</h2>
        </div>
        <Link href="/coaching" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline sm:text-sm">
          View all
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
        {providers.map((provider) => (
          <RecommendedProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </section>
  )
}

function RecommendedProviderCard({ provider }: { provider: CoachingProvider }) {
  const visual = getCoachingVisual(provider)
  
  
  
  const tags = [...provider.exams, ...provider.subjects].slice(0, 3)

  return (
    <article className="group grid w-[82vw] shrink-0 snap-start overflow-hidden rounded-[10px] border bg-card shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-colors hover:border-primary/35 sm:w-auto">
      <div className="relative h-30">
        <Image
          src={visual.src}
          alt=""
          fill
          sizes="(min-width: 640px) 33vw, 82vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ objectPosition: visual.objectPosition }}
        />
        <div className="absolute top-3 left-3 rounded-md bg-card/95 px-2 py-1 text-xs font-semibold text-foreground shadow-sm">{visual.label}</div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate font-heading text-base font-bold text-foreground">{provider.name}</h3>
          <ChevronRight className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {provider.providerType} · {provider.location}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
