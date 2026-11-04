import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ExamListingPage } from '@/features/exams/components/exam-listing-page'
import { examApiQuery, listExams } from '@/features/exams/api/exams-api'
import { toUrlSearchParams } from '@/lib/search-params'

export const metadata: Metadata = {
  title: 'Entrance Exams',
  description: 'Explore entrance exams by course, stream and study goal.',
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function Page({ searchParams }: Props) {
  const query = examApiQuery(toUrlSearchParams(await searchParams))
  const [initial, popular] = await Promise.all([
    listExams({ ...query, limit: '100' }).catch(() => null),
    listExams({ sort: 'popular', limit: '100' })
      .then((list) => list.items.filter((exam) => exam.popular))
      .catch(() => []),
  ])
  return (
    <Suspense fallback={null}>
      <ExamListingPage initial={initial} initialQuery={query} popular={popular} />
    </Suspense>
  )
}
