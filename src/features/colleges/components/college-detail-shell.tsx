import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { DetailTabNav } from '@/components/shared/detail-tab-nav'
import { DetailStickySidebar } from '@/components/shared/detail-sticky-sidebar'
import { Button } from '@/components/ui/button'
import type { CollegeDetailData } from '../data/college-detail'
import { DetailTabBreadcrumbs } from '@/components/shared/detail-tab-breadcrumbs'
import { tabLinks } from '@/lib/detail-tabs'
import { collegeBase, collegeTabs } from '../config/college-tabs'
import { CollegeIdentityHeader } from './college-identity-header'
import { CollegeEnquirySidebar } from './college-enquiry-sidebar'
import { CollegeActionBar } from './college-action-bar'

/**
 * Shared frame for every /college/[slug]/* page: breadcrumbs, identity header,
 * sticky tab bar, desktop sidebar, closing CTA and the mobile action bar.
 * Only `children` (the active tab) changes between sub-pages.
 */
export function CollegeDetailShell({ college, children }: { college: CollegeDetailData; children: ReactNode }) {
  const base = collegeBase(college.slug)
  const tabs = tabLinks(collegeTabs, college, base)

  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <DetailTabBreadcrumbs trail={['Home', { label: 'Colleges', href: '/colleges' }]} entityLabel={college.name} base={base} tabs={tabs} />
        <div className="mt-4">
          <CollegeIdentityHeader college={college} />
        </div>
      </Container>

      <DetailTabNav items={tabs.map(({ href, label }) => ({ href, label }))} label={`${college.name} sections`} />

      <Container className="px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
          <div className="min-w-0 flex-1">{children}</div>
          <DetailStickySidebar>
            <CollegeEnquirySidebar college={college} />
          </DetailStickySidebar>
        </div>
      </Container>

      <Container className="px-4 pt-8 pb-10">
        <div className="flex flex-col gap-4 rounded-[12px] border bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-bold text-foreground">Planning your application to {college.name}?</p>
            <p className="mt-0.5 text-sm text-muted-foreground">Preview colleges that may suit your profile, or explore more institutions on Pathway.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="cta" className="h-11 gap-2 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/college-predictor" />}>
              Try College Predictor
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" className="h-11 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
              Explore More Colleges
            </Button>
          </div>
        </div>
      </Container>

      <CollegeActionBar college={college} />
    </div>
  )
}
