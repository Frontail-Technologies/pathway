import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CollegeListingPage } from '@/features/colleges/components/college-listing-page'
import { getCollegeFacets, listColleges } from '@/features/colleges/api/colleges-api'
import { parseCollegeListingFilters, parseCollegeListingSearch, parseCollegeListingSort, serializeCollegeListing } from '@/features/colleges/data/listing-filters'
import { PageLoadingSkeleton } from '@/components/feedback'
import { apiQueryFrom, toUrlSearchParams } from '@/lib/search-params'

export const metadata: Metadata = {
  title: 'Colleges & Universities in India',
  description: 'Compare colleges and universities in India by NIRF rank, fees, placements, courses and entrance exams.',
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function CollegesPage({ searchParams }: Props) {
  const params = toUrlSearchParams(await searchParams)
  const query = apiQueryFrom(serializeCollegeListing(parseCollegeListingFilters(params), parseCollegeListingSort(params), parseCollegeListingSearch(params)))
  const [initial, facets] = await Promise.all([listColleges({ ...query, limit: '12' }).catch(() => null), getCollegeFacets()])
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <CollegeListingPage initial={initial} initialQuery={query} facets={facets} />
    </Suspense>
  )
}
