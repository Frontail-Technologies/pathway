import type { ReactNode } from 'react'
import { Container } from '@/components/shared/container'
import { DetailBody } from '@/components/shared/detail-section'
import { DetailSectionNav } from '@/components/shared/detail-section-nav'
import { DetailTabBreadcrumbs } from '@/components/shared/detail-tab-breadcrumbs'
import { hasTab, sectionNavItems, tabLinks } from '@/lib/detail-tabs'
import type { CollegeDetailData } from '../data/college-detail'
import { collegeBase, collegeTabs } from '../config/college-tabs'
import { CollegeIdentityHeader } from './college-identity-header'
import { CollegeEnquirySidebar } from './college-enquiry-sidebar'
import { CollegeActionBar } from './college-action-bar'
import { CollegeOverviewSection } from './college-overview-section'
import { CollegeCoursesSection } from './college-courses-section'
import { CollegeFeesSection } from './college-fees-section'
import { CollegeCutoffsSection } from './college-cutoffs-section'
import { CollegeAdmissionsSection } from './college-admissions-section'
import { CollegePlacementsSection } from './college-placements-section'
import { CollegeRankingsSection } from './college-rankings-section'
import { CollegeReviewsSection } from './college-reviews-section'
import { CollegeFacilitiesSection } from './college-facilities-section'
import { CollegeScholarshipsSection } from './college-scholarships-section'
import { CollegeFaqSection } from './college-faq-section'
import { SimilarCollegesSection } from './similar-colleges-section'
import { CollegeRecommendations } from './college-recommendations'

export function CollegeDetailShell({ college, children }: { college: CollegeDetailData; children: ReactNode }) {
  const base = collegeBase(college.slug)
  const has = (segment: string) => hasTab(collegeTabs, college, segment)

  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 pb-5 lg:pt-6">
        <DetailTabBreadcrumbs trail={['Home', { label: 'Colleges', href: '/colleges' }]} entityLabel={college.name} base={base} tabs={tabLinks(collegeTabs, college, base)} />
        <div className="mt-4">
          <CollegeIdentityHeader college={college} />
        </div>
      </Container>

      <DetailSectionNav items={sectionNavItems(collegeTabs, college)} label={`${college.name} sections`} />

      <DetailBody aside={<CollegeEnquirySidebar college={college} />}>
        <CollegeOverviewSection college={college} />
        {has('courses') ? (
          <>
            <CollegeCoursesSection college={college} />
            <CollegeFeesSection college={college} />
          </>
        ) : null}
        {has('cutoffs') ? <CollegeCutoffsSection college={college} /> : null}
        {has('admission') ? <CollegeAdmissionsSection college={college} /> : null}
        {has('placement') ? <CollegePlacementsSection college={college} /> : null}
        {has('rankings') ? <CollegeRankingsSection college={college} /> : null}
        {has('reviews') ? <CollegeReviewsSection college={college} /> : null}
        {has('facilities') ? <CollegeFacilitiesSection college={college} /> : null}
        {has('scholarships') ? <CollegeScholarshipsSection college={college} /> : null}
        {has('faqs') ? <CollegeFaqSection college={college} /> : null}
        <CollegeRecommendations college={college} />
        <SimilarCollegesSection college={college} />

      </DetailBody>

      {children}
      <CollegeActionBar college={college} />
    </div>
  )
}
