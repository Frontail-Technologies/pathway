import Link from 'next/link'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Button } from '@/components/ui/button'
import { CompareStarterSection } from './compare-starter-section'
import { rankedPairs } from '../api/compare-api'
import { PopularComparisonCategorySection } from './popular-comparison-category-section'

export async function CompareLandingPage() {
  const btech = await rankedPairs('btech', 3)
  return (
    <div className="bg-muted/50 pb-10">
      <div className="border-b bg-card">
        <div className="container-shell px-4 pt-5 pb-6 lg:pt-6">
          <Breadcrumbs items={['Home', { label: 'Colleges', href: '/colleges' }, 'Compare colleges']} />
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">Compare colleges</h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted-foreground">See NIRF rank, placements, fees, admission and facilities side by side for up to three colleges.</p>
        </div>
      </div>

      <Container className="flex flex-col gap-8 px-4 pt-5 lg:pt-6">
        <CompareStarterSection />
        <PopularComparisonCategorySection title="Top B.Tech colleges compared" courses="btech" />
        <PopularComparisonCategorySection title="Top MBA colleges compared" courses="mba" exclude={btech.flat()} />

        <div className="flex flex-col items-start gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
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
