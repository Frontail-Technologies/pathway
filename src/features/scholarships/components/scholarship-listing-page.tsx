'use client'

import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FilterPill } from '@/components/shared/filter-toolbar'
import { CatalogListing } from '@/components/shared/listing/catalog-listing'
import type { FacetGroup, SelectedFilters } from '@/components/shared/listing/types'
import { useCatalogList } from '@/hooks/use-catalog-list'
import { apiQueryFrom } from '@/lib/search-params'
import type { CatalogList, CatalogQuery } from '@/services/api/catalog'
import { toScholarshipListItem, type ScholarshipListDto, type ScholarshipListItem } from '../api/scholarships-api'
import {
  applicationStatusOptions,
  emptyFilters,
  filterGroups,
  parseScholarshipFilters,
  parseScholarshipSearch,
  parseScholarshipSort,
  serializeScholarshipFilters,
  sortOptions,
  type FilterState,
  type SortValue,
} from '../data/filters'
import { ScholarshipResultCard } from './scholarship-result-card'

const PAGE_SIZE = 12

const groups: FacetGroup[] = filterGroups.map((group) => ({ key: group.key, title: group.title, options: group.options.map((option) => ({ value: option, label: option })) }))
const scholarshipSortOptions = sortOptions.map((option) => ({ value: option.value, label: option.label }))

export function ScholarshipListingPage({ initial, initialQuery }: { initial?: CatalogList<ScholarshipListItem> | null; initialQuery?: CatalogQuery }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const filters = useMemo(() => parseScholarshipFilters(searchParams), [searchParams])
  const sort = useMemo(() => parseScholarshipSort(searchParams), [searchParams])
  const query = useMemo(() => parseScholarshipSearch(searchParams), [searchParams])

  const apiQuery = useMemo(() => apiQueryFrom(serializeScholarshipFilters(filters, sort, query)), [filters, sort, query])
  const list = useCatalogList<ScholarshipListDto, ScholarshipListItem>({ path: '/scholarships', query: apiQuery, map: toScholarshipListItem, limit: PAGE_SIZE, initial, initialQuery })

  const navigate = (selected: SelectedFilters, nextSort: string, nextQuery: string) => {
    const next = serializeScholarshipFilters({ ...emptyFilters, ...selected } as FilterState, nextSort as SortValue, nextQuery)
    router.push(next ? `${pathname}?${next}` : pathname, { scroll: false })
  }

  const statuses = filters.statuses
  const statusPills = (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Application status">
      <FilterPill active={statuses.length === 0} onClick={() => navigate({ ...filters, statuses: [] }, sort, query)}>
        All
      </FilterPill>
      {applicationStatusOptions.map((status) => (
        <FilterPill key={status} active={statuses.length === 1 && statuses[0] === status} onClick={() => navigate({ ...filters, statuses: [status] }, sort, query)}>
          {status}
        </FilterPill>
      ))}
    </div>
  )

  return (
    <CatalogListing
      breadcrumbs={[{ label: 'Home', href: '/' }, 'Scholarships']}
      title={statuses.length === 1 ? `${statuses[0]} scholarships in India` : 'Scholarships in India'}
      description="Government and private scholarships with award amounts, eligibility, deadlines and official application links."
      searchPlaceholder="Search scholarships or providers"
      noun={['scholarship', 'scholarships']}
      groups={groups}
      selected={filters}
      sort={sort}
      sortOptions={scholarshipSortOptions}
      query={query}
      onNavigate={navigate}
      list={list}
      aboveResults={statusPills}
      layout="grid"
      renderItems={(items) => items.map((scholarship) => <ScholarshipResultCard key={scholarship.id} scholarship={scholarship} />)}
    />
  )
}
