import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import type { CollegeDetailData } from '../data/college-detail'
import { CollegeIdentityHeader } from './college-identity-header'
import { CollegeDetailNav } from './college-detail-nav'
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

export function CollegeDetailPage({ college }: { college: CollegeDetailData }) {
  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', 'Colleges', college.name]} />
        <div className="mt-4">
          <CollegeIdentityHeader college={college} />
        </div>
      </Container>

      <CollegeDetailNav />

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

          <div className="hidden shrink-0 lg:sticky lg:top-40 lg:block lg:w-75">
            <CollegeEnquirySidebar college={college} />
          </div>
        </div>
      </Container>
    </div>
  )
}
