'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FileDown } from 'lucide-react'
import Link from 'next/link'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Button } from '@/components/ui/button'
import { defaultComparisonSlugs, getCollegeComparisonItem, maxComparisonSlots, parseComparisonSlugs } from '../data/college-compare'
import { getProgramSnapshot, parseProgramSlug, serializeProgramSlug, type Degree } from '../data/programs'
import type { ComparisonEntry } from '../data/comparison-sections'
import { comparisonSections } from '../data/comparison-sections'
import { ComparePageHeader } from './compare-page-header'
import { CollegeCompareHeaderRow } from './college-compare-header-row'
import { ComparisonSection } from './comparison-section'
import { MobileComparisonHeaderRow } from './mobile-comparison-header-row'
import { MobileComparisonSection } from './mobile-comparison-section'
import { PopularComparisonsSection } from './popular-comparisons-section'
import type { Selection } from './college-course-picker-dialog'

type SlotSelection = { collegeSlug: string; degree: Degree; course: string }

function buildComparisonQuery(selections: SlotSelection[]): string {
  if (selections.length === 0) return ''
  const params = new URLSearchParams()
  params.set('colleges', selections.map((s) => s.collegeSlug).join(','))
  params.set('programs', selections.map((s) => serializeProgramSlug(s.degree, s.course)).join(','))
  return params.toString()
}

export function CollegeComparePage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // The URL is the single source of truth for the selection (same
  // convention as CRS-01's filter state). `colleges` is required for a
  // slot to exist at all; a missing/invalid `programs` entry for that slot
  // safely falls back to the college's own default program — so URLs
  // carrying only `colleges=` (from before program support) keep working.
  const collegeSlugs = useMemo(() => {
    const urlSlugs = parseComparisonSlugs(searchParams)
    return urlSlugs.length > 0 ? urlSlugs : defaultComparisonSlugs
  }, [searchParams])

  const programSlugs = useMemo(() => searchParams.get('programs')?.split(',') ?? [], [searchParams])

  const entries: ComparisonEntry[] = useMemo(
    () =>
      collegeSlugs
        .map((slug, index) => {
          const college = getCollegeComparisonItem(slug)
          if (!college) return undefined
          const { degree, course } = parseProgramSlug(slug, programSlugs[index])
          return { college, program: getProgramSnapshot(slug, degree, course) }
        })
        .filter((entry): entry is ComparisonEntry => Boolean(entry)),
    [collegeSlugs, programSlugs]
  )

  const currentSelections = (): SlotSelection[] => entries.map((entry) => ({ collegeSlug: entry.college.slug, degree: entry.program.degree, course: entry.program.course }))

  const updateUrl = (nextSelections: SlotSelection[]) => {
    const query = buildComparisonQuery(nextSelections)
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  const addCollege = (selection: Selection) => {
    const current = currentSelections()
    if (current.some((entry) => entry.collegeSlug === selection.collegeSlug) || current.length >= maxComparisonSlots) return
    updateUrl([...current, selection])
  }

  const removeCollege = (slug: string) => {
    updateUrl(currentSelections().filter((entry) => entry.collegeSlug !== slug))
  }

  const modifyCollege = (previousSlug: string, selection: Selection) => {
    updateUrl(currentSelections().map((entry) => (entry.collegeSlug === previousSlug ? selection : entry)))
  }

  // Mirrors the comparison body's horizontal scroll onto the (separately
  // sticky) header row — see the note on `COMPARE_GRID_COLS_DATA` in
  // compare-grid.ts for why the header can't share the body's own
  // `overflow-x-auto` container. Desktop and mobile each get their own
  // independent scroll value since only one layout is ever visible at once.
  const [scrollLeft, setScrollLeft] = useState(0)
  const [mobileScrollLeft, setMobileScrollLeft] = useState(0)

  return (
    <div className="bg-background pt-5 pb-9 lg:pt-8 lg:pb-14">
      <Container className="px-4">
        <div className="print:hidden">
          <Breadcrumbs items={['Home', 'Compare Colleges']} />
        </div>
        <div className="mt-3">
          <ComparePageHeader />
        </div>

        {entries.length > 2 && <p className="mt-3 text-xs text-muted-foreground md:hidden print:hidden">Swipe to see more →</p>}

        <div className="mt-3 lg:mt-4">
          {/* Desktop/tablet (md+): unchanged attribute + up-to-3-column matrix. Forced visible in print regardless of viewport, since the printed output always uses this layout. */}
          <div className="hidden md:block print:block">
            <CollegeCompareHeaderRow entries={entries} onRemove={removeCollege} onAdd={addCollege} onModify={modifyCollege} scrollLeft={scrollLeft} />
            <div
              onScroll={(event) => setScrollLeft(event.currentTarget.scrollLeft)}
              className="overflow-x-auto rounded-b-[10px] border border-t-0 print:overflow-visible print:rounded-none print:border-none"
            >
              {comparisonSections.map((section) => (
                <ComparisonSection key={section.title} section={section} entries={entries} />
              ))}
            </div>
          </div>

          {/* Mobile (< md): two-column layout with the label inline in each cell — no shared attribute column (see compare-grid.ts). Never shown in print. */}
          <div className="md:hidden print:hidden">
            <MobileComparisonHeaderRow entries={entries} onRemove={removeCollege} onAdd={addCollege} onModify={modifyCollege} scrollLeft={mobileScrollLeft} />
            <div onScroll={(event) => setMobileScrollLeft(event.currentTarget.scrollLeft)} className="overflow-x-auto rounded-b-[10px] border border-t-0">
              {comparisonSections.map((section) => (
                <MobileComparisonSection key={section.title} section={section} entries={entries} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 rounded-[10px] border bg-card p-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
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

        <div className="mt-6">
          <PopularComparisonsSection />
        </div>

        <div className="mt-6 flex flex-col items-start gap-3 rounded-[10px] border bg-card p-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
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
