'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SourceNote } from '@/components/shared/source-note'
import { CatalogListing } from '@/components/shared/listing/catalog-listing'
import type { SelectedFilters } from '@/components/shared/listing/types'
import { Button } from '@/components/ui/button'
import { useCatalogList } from '@/hooks/use-catalog-list'
import { apiQueryFrom } from '@/lib/search-params'
import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import { toCollegeListItem, type CollegeListItem, type InstitutionListDto } from '../api/colleges-api'
import {
  collegeFacetGroups,
  collegeSortOptions,
  parseCollegeListingFilters,
  parseCollegeListingSearch,
  parseCollegeListingSort,
  serializeCollegeListing,
  type CollegeFacets,
} from '../data/listing-filters'
import { CollegeCard } from './college-card'

const PAGE_SIZE = 12

function headingFor(groups: ReturnType<typeof collegeFacetGroups>, selected: SelectedFilters) {
  const label = (key: string) => {
    const values = selected[key] ?? []
    if (values.length !== 1) return ''
    return groups.find((group) => group.key === key)?.options.find((option) => option.value === values[0])?.label ?? ''
  }
  const subject = [label('instituteTypes'), label('courses'), 'colleges'].filter(Boolean).join(' ')
  const title = subject === 'colleges' ? 'Colleges & universities' : subject.charAt(0).toUpperCase() + subject.slice(1)
  return `${title} in ${label('cities') || label('states') || 'India'}`
}

export function CollegeListingPage({ initial, initialQuery, facets }: { initial?: CatalogList<CollegeListItem> | null; initialQuery?: CatalogQuery; facets: CollegeFacets }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selected = useMemo(() => parseCollegeListingFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseCollegeListingSort(searchParams), [searchParams])
  const query = useMemo(() => parseCollegeListingSearch(searchParams), [searchParams])
  const groups = useMemo(() => collegeFacetGroups(facets), [facets])

  const apiQuery = useMemo(() => apiQueryFrom(serializeCollegeListing(selected, sort, query)), [selected, sort, query])
  const list = useCatalogList<InstitutionListDto, CollegeListItem>({ path: '/institutions', query: apiQuery, map: toCollegeListItem, limit: PAGE_SIZE, initial, initialQuery })

  const navigate = (nextSelected: SelectedFilters, nextSort: string, nextQuery: string) => {
    const next = serializeCollegeListing(nextSelected, nextSort, nextQuery)
    router.push(next ? `${pathname}?${next}` : pathname, { scroll: false })
  }

  return (
    <CatalogListing
      art="college"
      breadcrumbs={[{ label: 'Home', href: '/' }, 'Colleges']}
      title={headingFor(groups, selected)}
      description="Compare colleges by NIRF rank, fees, median package and entrance exams."
      meta={<SourceNote source="NIRF 2025, AISHE and JoSAA" note="Official data sources" />}
      searchPlaceholder="Search by college name or city"
      noun={['college', 'colleges']}
      groups={groups}
      selected={selected}
      sort={sort}
      sortOptions={collegeSortOptions}
      query={query}
      onNavigate={navigate}
      list={list}
      renderItems={(items) => items.map((college) => <CollegeCard key={college.id} college={college} />)}
      footer={
        <div className="mt-2 flex flex-wrap items-center gap-3 rounded-xl border bg-secondary/60 p-4 sm:p-5">
          <p className="min-w-0 flex-1 text-sm font-semibold text-foreground">Know your JEE rank? See which colleges and branches you could get.</p>
          <Button variant="cta" nativeButton={false} render={<Link href="/college-predictor" />}>
            College predictor
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      }
    />
  )
}
