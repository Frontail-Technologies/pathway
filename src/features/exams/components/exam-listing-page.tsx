'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CatalogListing } from '@/components/shared/listing/catalog-listing'
import type { FacetGroup, SelectedFilters } from '@/components/shared/listing/types'
import { Button } from '@/components/ui/button'
import { useCatalogList } from '@/hooks/use-catalog-list'
import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import type { Exam } from '../data/exams'
import { examApiQuery, toExam, type ExamListDto } from '../api/exams-api'
import { emptyFilters, filterGroups, parseExamFilters, parseExamSort, serializeExamFilters, sortOptions, type FilterState, type SortValue } from '../data/exams'
import { ExamCard } from './exam-cards'

const groups: FacetGroup[] = filterGroups.map((group) => ({ key: group.key, title: group.title, options: group.options.map((option) => ({ value: option, label: option })) }))

export function ExamListingPage({ initial, initialQuery }: { initial?: CatalogList<Exam> | null; initialQuery?: CatalogQuery }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filters = useMemo(() => parseExamFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseExamSort(searchParams), [searchParams])
  const query = searchParams.get('q') ?? ''
  const apiQuery = useMemo(() => examApiQuery(searchParams), [searchParams])
  const list = useCatalogList<ExamListDto, Exam>({ path: '/exams', query: apiQuery, map: toExam, limit: 24, initial, initialQuery })

  const navigate = (selected: SelectedFilters, nextSort: string, nextQuery: string) => {
    const next = serializeExamFilters({ ...emptyFilters, ...selected } as FilterState, nextSort as SortValue, nextQuery)
    router.push(next ? `${pathname}?${next}` : pathname, { scroll: false })
  }

  const area = filters.studyAreas.length === 1 ? filters.studyAreas[0] : ''

  return (
    <CatalogListing
      art="exam"
      breadcrumbs={[{ label: 'Home', href: '/' }, 'Exams']}
      title={area ? `${area} entrance exams` : 'Entrance exams in India'}
      description="Official notices, conducting bodies and the colleges that accept each exam."
      searchPlaceholder="Search exams, e.g. JEE Main, NEET"
      noun={['exam', 'exams']}
      groups={groups}
      selected={filters}
      sort={sort}
      sortOptions={sortOptions}
      query={query}
      onNavigate={navigate}
      list={list}
      renderItems={(items) => items.map((exam) => <ExamCard key={exam.id} exam={exam} />)}
      footer={
        <div className="mt-2 flex flex-wrap items-center gap-3 rounded-xl border bg-secondary/60 p-4 sm:p-5">
          <p className="min-w-0 flex-1 text-sm font-semibold text-foreground">Have your score? See the colleges and branches it could get you.</p>
          <Button variant="cta" nativeButton={false} render={<Link href="/college-predictor" />}>
            College predictor
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      }
    />
  )
}
