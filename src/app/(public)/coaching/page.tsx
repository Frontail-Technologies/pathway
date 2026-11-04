import { Suspense } from 'react'
import { CoachingListingPage } from '@/features/coaching/components/coaching-listing-page'
import { listCoaching } from '@/features/coaching/api/coaching-api'
import { parseCoachingFilters, parseCoachingSearch, parseCoachingSort, serializeCoachingFilters } from '@/features/coaching/data/filters'
import { PageLoadingSkeleton } from '@/components/feedback'
import { apiQueryFrom, toUrlSearchParams } from '@/lib/search-params'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function CoachingPage({ searchParams }: Props) {
  const params = toUrlSearchParams(await searchParams)
  const query = apiQueryFrom(serializeCoachingFilters(parseCoachingFilters(params), parseCoachingSort(params), parseCoachingSearch(params)))
  const [initial, top] = await Promise.all([
    listCoaching({ ...query, limit: '12' }).catch(() => null),
    listCoaching({ limit: '3' }).catch(() => null),
  ])
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <CoachingListingPage initial={initial} initialQuery={query} recommended={top?.items ?? []} providerCount={top?.page.total ?? null} />
    </Suspense>
  )
}
