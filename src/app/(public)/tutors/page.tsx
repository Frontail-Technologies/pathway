import { Suspense } from 'react'
import type { Metadata } from 'next'
import { TutorListingPage } from '@/features/tutors/components/tutor-listing-page'
import { listTutors } from '@/features/tutors/api/tutors-api'
import { parseTutorFilters, parseTutorSearch, parseTutorSort, serializeTutorFilters } from '@/features/tutors/data/tutors'
import { apiQueryFrom, toUrlSearchParams } from '@/lib/search-params'

export const metadata: Metadata = {
  title: 'Find Tutors',
  description: 'Find individual tutors by subject, exam, class level, language and learning mode.',
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function Page({ searchParams }: Props) {
  const params = toUrlSearchParams(await searchParams)
  const query = apiQueryFrom(serializeTutorFilters(parseTutorFilters(params), parseTutorSort(params), parseTutorSearch(params)))
  const [initial, featured] = await Promise.all([
    listTutors({ ...query, limit: '20' }).catch(() => null),
    listTutors({ limit: '10' })
      .then((list) => list.items.filter((tutor) => tutor.featured).slice(0, 3))
      .catch(() => []),
  ])
  return (
    <Suspense fallback={null}>
      <TutorListingPage initial={initial} initialQuery={query} featured={featured} />
    </Suspense>
  )
}
