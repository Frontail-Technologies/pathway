import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ExamListingPage } from '@/features/exams/components/exam-listing-page'
import { examApiQuery, listExams } from '@/features/exams/api/exams-api'
import { toUrlSearchParams } from '@/lib/search-params'

export const metadata: Metadata = {
  title: 'Entrance Exams in India',
  description: 'Explore entrance exams by stream and scope, with official notices, conducting bodies and accepting colleges.',
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function Page({ searchParams }: Props) {
  const query = examApiQuery(toUrlSearchParams(await searchParams))
  const initial = await listExams({ ...query, limit: '24' }).catch(() => null)
  return (
    <Suspense fallback={null}>
      <ExamListingPage initial={initial} initialQuery={query} />
    </Suspense>
  )
}
