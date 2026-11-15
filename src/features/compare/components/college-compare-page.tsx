'use client'

import { useMemo, type ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FileDown } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Button } from '@/components/ui/button'
import { ListingError } from '@/features/catalog/listing-states'
import { CatalogRequestError } from '@/services/api/catalog'
import { maxComparisonSlots } from '../data/college-compare'
import { getComparison, parseCompareQuery, type CompareEntry } from '../api/compare-api'
import type { Selection } from './college-course-picker-dialog'
import { CompareView } from './compare-view'

type Slot = { collegeSlug: string; program: string }

function buildComparisonQuery(slots: Slot[]): string {
  if (slots.length === 0) return ''
  const params = new URLSearchParams()
  params.set('colleges', slots.map((slot) => slot.collegeSlug).join(','))
  params.set('programs', slots.map((slot) => slot.program).join(','))
  return params.toString()
}

export function CollegeComparePage({ initial, initialKey, popular }: { initial: CompareEntry[] | null; initialKey: string; popular?: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selection = useMemo(() => parseCompareQuery(searchParams), [searchParams])
  const seeded = initial && initialKey === JSON.stringify(selection)
  const comparison = useQuery({
    queryKey: queryKeys.comparison(selection),
    queryFn: () => getComparison(selection.colleges, selection.programs).then((result) => result.entries),
    initialData: seeded ? initial : undefined,
    placeholderData: (previous) => previous,
  })
  const load = {
    state: comparison.isError ? 'error' : comparison.isPending ? 'loading' : 'ready',
    entries: comparison.isError ? [] : (comparison.data ?? []),
    message: comparison.error instanceof CatalogRequestError ? comparison.error.message : undefined,
  }

  const entries = load.entries

  const currentSlots = (): Slot[] => entries.map((entry) => ({ collegeSlug: entry.college.slug, program: entry.program.slug }))

  const updateUrl = (next: Slot[]) => {
    const query = buildComparisonQuery(next)
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const addCollege = (next: Selection) => {
    const current = currentSlots()
    if (current.some((slot) => slot.collegeSlug === next.collegeSlug) || current.length >= maxComparisonSlots) return
    updateUrl([...current, { collegeSlug: next.collegeSlug, program: next.program }])
  }

  const removeCollege = (slug: string) => {
    updateUrl(currentSlots().filter((slot) => slot.collegeSlug !== slug))
  }

  const modifyCollege = (previousSlug: string, next: Selection) => {
    updateUrl(currentSlots().map((slot) => (slot.collegeSlug === previousSlug ? { collegeSlug: next.collegeSlug, program: next.program } : slot)))
  }

  const title = entries.length >= 2 ? entries.map((entry) => entry.college.shortName).join(' vs ') : 'Compare colleges'

  return (
    <div className="bg-muted/50 pb-10">
      <div className="border-b bg-card">
        <div className="container-shell px-4 pt-5 pb-6 lg:pt-6">
          <div className="print:hidden">
            <Breadcrumbs items={['Home', { label: 'Compare colleges', href: '/compare' }, entries.length >= 2 ? 'Comparison' : 'Compare']} />
          </div>
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted-foreground">NIRF rank, placements, fees, admission and facilities side by side. The best value in each row is marked.</p>
        </div>
      </div>

      <Container className="px-4 pt-5 lg:pt-6">
        {load.state === 'error' ? (
          <div className="mb-4">
            <ListingError message={load.message ?? 'The comparison couldn’t be loaded.'} onRetry={() => void comparison.refetch()} />
          </div>
        ) : null}

        <CompareView entries={entries} onAdd={addCollege} onRemove={removeCollege} onModify={modifyCollege} />

        <div className="mt-6 flex flex-col items-start gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <div className="flex items-center gap-3">
            <FileDown className="size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-foreground">Download this comparison</p>
              <p className="mt-0.5 text-xs text-muted-foreground">Keep a copy of the college comparison for offline review.</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="h-10 w-full px-6 text-sm font-semibold sm:w-fit"
            title="Opens print dialog — choose Save as PDF"
            onClick={() => window.print()}
          >
            Download PDF
          </Button>
        </div>

        {popular ? <div className="mt-6">{popular}</div> : null}

        <div className="mt-6 flex flex-col items-start gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <div>
            <p className="text-sm font-semibold text-foreground">Need help choosing a college?</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Get free counselling from our education experts.</p>
          </div>
          <Button variant="cta" className="h-10 w-full px-6 text-sm font-semibold sm:w-fit" nativeButton={false} render={<Link href="/counselling" />}>
            Get Counselling
          </Button>
        </div>
      </Container>
    </div>
  )
}
