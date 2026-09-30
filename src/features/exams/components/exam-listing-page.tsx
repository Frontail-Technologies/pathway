'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Compass, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { EmptyState } from '@/components/feedback'
import { Button } from '@/components/ui/button'
import {
  emptyFilters,
  exams,
  matchesFilters,
  matchesSearch,
  parseExamFilters,
  parseExamSearch,
  parseExamSort,
  serializeExamFilters,
  sortExams,
  type FilterKey,
  type FilterState,
  type SortValue,
} from '../data/exams'
import { ExamHero } from './exam-hero'
import { ExamCard, PopularExamTile } from './exam-cards'
import { ExamFilterSidebar, ExamResultsHeader } from './exam-filters'

export function ExamListingPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const filters = useMemo(() => parseExamFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseExamSort(searchParams), [searchParams])
  const query = useMemo(() => parseExamSearch(searchParams), [searchParams])

  const popular = useMemo(() => exams.filter((exam) => exam.popular), [])
  const results = useMemo(() => sortExams(exams.filter((exam) => matchesFilters(exam, filters) && matchesSearch(exam, query)), sort), [filters, query, sort])

  const updateUrl = (nextFilters: FilterState, nextSort: SortValue, nextQuery: string) => {
    const queryString = serializeExamFilters(nextFilters, nextSort, nextQuery)
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
        <Breadcrumbs items={['Home', 'Exams']} />
      </Container>
      <ExamHero query={query} onSearch={(value) => updateUrl(filters, sort, value)} />

      <Container className="px-4 pb-10">
        <div>
          <section className="pt-8" aria-labelledby="popular-exams">
            <h2 id="popular-exams" className="font-heading text-xl font-bold text-foreground">
              Popular Exams
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {popular.map((exam) => (
                <PopularExamTile key={exam.id} exam={exam} />
              ))}
            </div>
          </section>

          <section className="pt-10" aria-labelledby="all-exams">
            <h2 id="all-exams" className="font-heading text-xl font-bold text-foreground">
              All Exams
            </h2>
            <div className="mt-4">
              <ExamResultsHeader
                resultCount={results.length}
                filters={filters}
                sort={sort}
                onSortChange={(next) => updateUrl(filters, next, query)}
                onApplyMobileFilters={(next) => updateUrl(next, sort, query)}
                onRemoveFilter={removeFilter}
                onClearAll={() => updateUrl(emptyFilters, sort, query)}
              />
            </div>

            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-7">
              <div className="sticky top-34 hidden lg:block">
                <ExamFilterSidebar filters={filters} onToggle={toggleFilter} onClearAll={() => updateUrl(emptyFilters, sort, query)} />
              </div>

              <div className="min-w-0 flex-1">
                {results.length === 0 ? (
                  <div className="flex flex-col items-center gap-4">
                    <EmptyState title="No exams match these filters." />
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
                  <div className="grid gap-4 md:grid-cols-2">
                    {results.map((exam) => (
                      <ExamCard key={exam.id} exam={exam} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="pt-10" aria-labelledby="explore-guide">
            <h2 id="explore-guide" className="font-heading text-xl font-bold text-foreground">
              How to explore exams
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {[
                { icon: Compass, title: 'Start with your goal', text: 'Filter by study area to see exams for engineering, medical, management, law or general undergraduate courses.' },
                { icon: GraduationCap, title: 'Check the scope', text: 'National, state and institute-level exams have different participating colleges — use the scope filter.' },
                { icon: ArrowRight, title: 'Try our student tools', text: 'Once you know your exam, the College and Rank Predictors help you plan your next steps.' },
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
              <p className="min-w-0 flex-1 text-sm font-semibold text-foreground">Already know your exam? Predict colleges that may match your profile.</p>
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
