import { Suspense } from 'react'
import type { Metadata } from 'next'
import { CollegeComparePage } from '@/features/compare/components/college-compare-page'
import { PopularComparisonsSection } from '@/features/compare/components/popular-comparisons-section'
import { getComparison, parseCompareQuery } from '@/features/compare/api/compare-api'
import { PageLoadingSkeleton } from '@/components/feedback'
import { toUrlSearchParams } from '@/lib/search-params'

export const metadata: Metadata = { title: 'Compare Colleges' }

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function CompareCollegesPage({ searchParams }: Props) {
  const selection = parseCompareQuery(toUrlSearchParams(await searchParams))
  const initial = await getComparison(selection.colleges, selection.programs)
    .then((result) => result.entries)
    .catch(() => null)
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <CollegeComparePage initial={initial} initialKey={JSON.stringify(selection)} popular={<PopularComparisonsSection />} />
    </Suspense>
  )
}
