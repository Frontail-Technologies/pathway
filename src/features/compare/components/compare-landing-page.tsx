import Link from 'next/link'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Button } from '@/components/ui/button'
import { CompareStarterSection } from './compare-starter-section'
import { PopularComparisonCategorySection, type ComparisonPairSpec } from './popular-comparison-category-section'

const btechPairs: ComparisonPairSpec[] = [
  { slugA: 'iit-delhi', slugB: 'iit-bombay' },
  { slugA: 'iit-bombay', slugB: 'iit-madras' },
  { slugA: 'bits-pilani', slugB: 'vit-vellore' },
]

// None of the mock colleges have an MBA programme in `programs.ts` — using an
// M.Tech override here (which the IITs/VIT genuinely offer) rather than
// mislabel a UG comparison as MBA, per the "no impossible combinations" rule
// already established for CMP-01's course-selection flow.
const mtechPairs: ComparisonPairSpec[] = [
  {
    slugA: 'iit-delhi',
    slugB: 'iit-bombay',
    programA: { degree: 'M.Tech', course: 'Computer Science & Engineering' },
    programB: { degree: 'M.Tech', course: 'Computer Science & Engineering' },
  },
  {
    slugA: 'iit-bombay',
    slugB: 'iit-madras',
    programA: { degree: 'M.Tech', course: 'Electrical Engineering' },
    programB: { degree: 'M.Tech', course: 'Electrical Engineering' },
  },
  {
    slugA: 'iit-delhi',
    slugB: 'iit-kanpur',
    programA: { degree: 'M.Tech', course: 'Mechanical Engineering' },
    programB: { degree: 'M.Tech', course: 'Mechanical Engineering' },
  },
]

export function CompareLandingPage() {
  return (
    <div className="bg-background pt-5 pb-9 lg:pt-8 lg:pb-14">
      <Container className="px-4">
        <Breadcrumbs items={['Home', 'Compare Colleges']} />

        <div className="mt-3">
          <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">Compare Colleges</h1>
          <p className="mt-1.5 text-sm text-muted-foreground sm:text-[15px]">
            Compare colleges side by side on fees, admissions, placements, ratings and facilities.
          </p>
        </div>

        <div className="mt-5 lg:mt-6">
          <CompareStarterSection />
        </div>

        <div className="mt-8 lg:mt-10">
          <PopularComparisonCategorySection title="Popular Comparisons for B.Tech" pairs={btechPairs} />
        </div>

        <div className="mt-8 lg:mt-10">
          <PopularComparisonCategorySection title="Popular Comparisons for M.Tech" pairs={mtechPairs} />
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 rounded-[10px] border bg-card p-4 sm:flex-row sm:items-center sm:justify-between lg:mt-10">
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
