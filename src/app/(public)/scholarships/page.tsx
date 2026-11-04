import { Suspense } from 'react'
import { ScholarshipListingPage } from '@/features/scholarships/components/scholarship-listing-page'
import { listScholarships } from '@/features/scholarships/api/scholarships-api'
import { parseScholarshipFilters, parseScholarshipSearch, parseScholarshipSort, serializeScholarshipFilters } from '@/features/scholarships/data/filters'
import { PageLoadingSkeleton } from '@/components/feedback'
import { apiQueryFrom, toUrlSearchParams } from '@/lib/search-params'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function ScholarshipsPage({ searchParams }: Props) {
  const params = toUrlSearchParams(await searchParams)
  const query = apiQueryFrom(serializeScholarshipFilters(parseScholarshipFilters(params), parseScholarshipSort(params), parseScholarshipSearch(params)))
  const initial = await listScholarships({ ...query, limit: '12' }).catch(() => null)
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <ScholarshipListingPage initial={initial} initialQuery={query} />
    </Suspense>
  )
}
