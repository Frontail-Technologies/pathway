'use client'

import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { DetailSectionNav } from '@/components/shared/detail-section-nav'
import { DetailStickySidebar } from '@/components/shared/detail-sticky-sidebar'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import { MobileActionBar, MobileActionBarSave } from '@/components/shared/mobile-action-bar'
import { EnquiryDialog } from '@/features/enquiries/components/enquiry-dialog'
import { Button } from '@/components/ui/button'
import type { ScholarshipDetailData } from '../api/scholarships-api'
import { ScholarshipIdentityHeader } from './scholarship-identity-header'
import { ScholarshipOpportunitySnapshot } from './scholarship-opportunity-snapshot'
import { ScholarshipEligibilitySnapshot } from './scholarship-eligibility-snapshot'
import { ScholarshipTopActions } from './scholarship-top-actions'
import { ScholarshipAboutSection } from './scholarship-about-section'
import { ScholarshipEligibilitySection } from './scholarship-eligibility-section'
import { ScholarshipBenefitsSection } from './scholarship-benefits-section'
import { ScholarshipDatesSection } from './scholarship-dates-section'
import { ScholarshipDocumentsSection } from './scholarship-documents-section'
import { ScholarshipApplicationSection } from './scholarship-application-section'
import { ScholarshipSelectionSection } from './scholarship-selection-section'
import { ScholarshipRelatedSection } from './scholarship-related-section'
import { ScholarshipFaqSection } from './scholarship-faq-section'
import { ScholarshipActionSidebar } from './scholarship-action-sidebar'

const SCHOLARSHIP_NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'dates', label: 'Dates' },
  { id: 'documents', label: 'Documents' },
  { id: 'apply', label: 'Apply' },
  { id: 'selection', label: 'Selection' },
  { id: 'faqs', label: 'FAQs' },
]

export function ScholarshipDetailPage({ scholarship }: { scholarship: ScholarshipDetailData }) {
  
  
  
  const { saved, toggleSaved } = useSavedItem('scholarship', scholarship.slug, 'Scholarship')

  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', { label: 'Scholarships', href: '/scholarships' }, scholarship.name]} />
        <div className="mt-4 border-b pb-5 sm:pb-6">
          <ScholarshipIdentityHeader scholarship={scholarship} />
          <ScholarshipOpportunitySnapshot scholarship={scholarship} />
          <ScholarshipEligibilitySnapshot scholarship={scholarship} />
          <ScholarshipTopActions scholarship={scholarship} saved={saved} onToggleSaved={toggleSaved} />
        </div>
      </Container>

      <DetailSectionNav items={SCHOLARSHIP_NAV_SECTIONS} />

      <Container className="px-4">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-6">
          <div className="min-w-0 flex-1">
            <ScholarshipAboutSection scholarship={scholarship} />
            <ScholarshipEligibilitySection scholarship={scholarship} />
            <ScholarshipBenefitsSection scholarship={scholarship} />
            <ScholarshipDatesSection scholarship={scholarship} />
            <ScholarshipDocumentsSection scholarship={scholarship} />
            <ScholarshipApplicationSection scholarship={scholarship} />
            <ScholarshipSelectionSection scholarship={scholarship} />
            <ScholarshipRelatedSection scholarship={scholarship} />
            <ScholarshipFaqSection scholarship={scholarship} />
          </div>

          <DetailStickySidebar>
            <ScholarshipActionSidebar scholarship={scholarship} saved={saved} onToggleSaved={toggleSaved} />
          </DetailStickySidebar>
        </div>
      </Container>

      <MobileActionBar label={`${scholarship.name} actions`}>
        <MobileActionBarSave saved={saved} onToggle={toggleSaved} entityLabel="scholarship" />
        <EnquiryDialog
          intent="counselling"
          entityName={scholarship.name}
          entity={{ kind: 'scholarship', slug: scholarship.slug }}
          description={`Get help checking eligibility and applying for ${scholarship.name}.`}
          trigger={<Button variant={scholarship.officialApplyUrl ? 'outline' : 'cta'} className="h-11 flex-1 px-3 text-sm font-semibold">Get Help</Button>}
        />
        {scholarship.officialApplyUrl && (
          <Button variant="cta" className="h-11 flex-1 px-3 text-sm font-semibold" nativeButton={false} render={<a href={scholarship.officialApplyUrl} target="_blank" rel="noopener noreferrer" />}>
            Official Apply
          </Button>
        )}
      </MobileActionBar>
    </div>
  )
}
