import { Suspense } from 'react'
import { CollegeListingPage } from '@/features/colleges/components/college-listing-page'
import { listColleges } from '@/features/colleges/api/colleges-api'
import { parseCollegeFilters, parseCollegeSearch, parseCollegeSort, serializeCollegeFilters } from '@/features/colleges/data/filters'
import { PageLoadingSkeleton } from '@/components/feedback'
import { apiQueryFrom, toUrlSearchParams } from '@/lib/search-params'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function CollegesPage({ searchParams }: Props) {
  const params = toUrlSearchParams(await searchParams)
  const query = apiQueryFrom(serializeCollegeFilters(parseCollegeFilters(params), parseCollegeSort(params), parseCollegeSearch(params)))
  const [initial, featured] = await Promise.all([listColleges({ ...query, limit: '12' }).catch(() => null), listColleges({ limit: '3' }).then((list) => list.items).catch(() => [])])
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <CollegeListingPage initial={initial} initialQuery={query} featured={featured} />
    </Suspense>
  )
}
