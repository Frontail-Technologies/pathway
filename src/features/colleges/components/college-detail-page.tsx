import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { DetailSectionNav } from '@/components/shared/detail-section-nav'
import { DetailStickySidebar } from '@/components/shared/detail-sticky-sidebar'
import { Button } from '@/components/ui/button'
import type { CollegeDetailData } from '../data/college-detail'
import { CollegeIdentityHeader } from './college-identity-header'
import { CollegeOverviewSection } from './college-overview-section'
import { CollegeCoursesSection } from './college-courses-section'
import { CollegeFeesSection } from './college-fees-section'
import { CollegeAdmissionsSection } from './college-admissions-section'
import { CollegePlacementsSection } from './college-placements-section'
import { CollegeFacilitiesSection } from './college-facilities-section'
import { CollegeScholarshipsSection } from './college-scholarships-section'
import { CollegeReviewsSection } from './college-reviews-section'
import { CollegeFaqSection } from './college-faq-section'
import { CollegeEnquirySidebar } from './college-enquiry-sidebar'
import { CollegeActionBar } from './college-action-bar'

const COLLEGE_NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses', label: 'Courses' },
  { id: 'fees', label: 'Fees' },
  { id: 'admissions', label: 'Admissions' },
  { id: 'placements', label: 'Placements' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'scholarships', label: 'Scholarships' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' },
]

export function CollegeDetailPage({ college }: { college: CollegeDetailData }) {
  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', { label: 'Colleges', href: '/colleges' }, college.name]} />
        <div className="mt-4">
          <CollegeIdentityHeader college={college} />
        </div>
      </Container>

      <DetailSectionNav items={COLLEGE_NAV_SECTIONS} />

      <Container className="px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
          <div className="min-w-0 flex-1">
            <CollegeOverviewSection college={college} />
            <CollegeCoursesSection college={college} />
            <CollegeFeesSection college={college} />
            <CollegeAdmissionsSection college={college} />
            <CollegePlacementsSection college={college} />
            <CollegeFacilitiesSection college={college} />
            <CollegeScholarshipsSection college={college} />
            <CollegeReviewsSection college={college} />
            <CollegeFaqSection college={college} />
          </div>

          <DetailStickySidebar>
            <CollegeEnquirySidebar college={college} />
          </DetailStickySidebar>
        </div>
      </Container>

      <Container className="px-4 pb-10">
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
