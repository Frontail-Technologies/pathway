'use client'

import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { DetailSectionNav } from '@/components/shared/detail-section-nav'
import { DetailBody } from '@/components/shared/detail-section'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import { MobileActionBar, MobileActionBarSave } from '@/components/shared/mobile-action-bar'
import { EnquiryDialog } from '@/features/enquiries/components/enquiry-dialog'
import { Button } from '@/components/ui/button'
import type { ScholarshipDetailData } from '../api/scholarships-api'
import { ScholarshipIdentityHeader } from './scholarship-identity-header'
import { ScholarshipOpportunitySnapshot } from './scholarship-opportunity-snapshot'
import { ScholarshipEligibilitySnapshot } from './scholarship-eligibility-snapshot'
import { ScholarshipAboutSection } from './scholarship-about-section'
import { ScholarshipEligibilitySection } from './scholarship-eligibility-section'
import { ScholarshipBenefitsSection } from './scholarship-benefits-section'
import { ScholarshipDatesSection } from './scholarship-dates-section'
import { ScholarshipDocumentsSection } from './scholarship-documents-section'
import { ScholarshipApplicationSection } from './scholarship-application-section'
import { ScholarshipSelectionSection } from './scholarship-selection-section'
import { ScholarshipRelatedSection } from './scholarship-related-section'
import { ScholarshipFaqSection } from './scholarship-faq-section'
import { ScholarshipOfficialDocuments } from './scholarship-official-documents'
import { ScholarshipActionSidebar } from './scholarship-action-sidebar'

function sectionsFor(scholarship: ScholarshipDetailData) {
  const benefits = scholarship.benefits
  return {
    overview: Boolean(scholarship.overviewCopy),
    eligibility: scholarship.eligibility.rows.length > 0 || Boolean(scholarship.eligibility.note),
    benefits: Boolean(benefits.amount || benefits.coverage || benefits.duration || benefits.disbursement),
    dates: scholarship.importantDates.length > 0,
    documents: scholarship.documents.length > 0,
    official: Boolean(scholarship.officialDocuments?.length),
    apply: scholarship.applicationSteps.length > 0,
    selection: scholarship.selectionProcess.length > 0,
    faqs: scholarship.faqs.length > 0,
  }
}

const NAV = [
  { id: 'overview', label: 'Overview', key: 'overview' },
  { id: 'eligibility', label: 'Eligibility', key: 'eligibility' },
  { id: 'benefits', label: 'Benefits', key: 'benefits' },
  { id: 'dates', label: 'Dates', key: 'dates' },
  { id: 'documents', label: 'Documents', key: 'documents' },
  { id: 'official-documents', label: 'Official files', key: 'official' },
  { id: 'apply', label: 'Apply', key: 'apply' },
  { id: 'selection', label: 'Selection', key: 'selection' },
  { id: 'faqs', label: 'FAQs', key: 'faqs' },
] as const

export function ScholarshipDetailPage({ scholarship }: { scholarship: ScholarshipDetailData }) {
  const { saved, toggleSaved } = useSavedItem('scholarship', scholarship.slug, 'Scholarship')
  const has = sectionsFor(scholarship)
  const nav = NAV.filter((item) => has[item.key]).map(({ id, label }) => ({ id, label }))

  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', { label: 'Scholarships', href: '/scholarships' }, scholarship.name]} />
        <div className="mt-4 pb-5">
          <ScholarshipIdentityHeader scholarship={scholarship} />
          <ScholarshipOpportunitySnapshot scholarship={scholarship} />
          <ScholarshipEligibilitySnapshot scholarship={scholarship} />
        </div>
      </Container>

      {nav.length > 1 ? <DetailSectionNav items={nav} label={`${scholarship.name} sections`} /> : null}

      <DetailBody aside={<ScholarshipActionSidebar scholarship={scholarship} saved={saved} onToggleSaved={toggleSaved} />}>
        {has.overview ? <ScholarshipAboutSection scholarship={scholarship} /> : null}
        {has.eligibility ? <ScholarshipEligibilitySection scholarship={scholarship} /> : null}
        {has.benefits ? <ScholarshipBenefitsSection scholarship={scholarship} /> : null}
        {has.dates ? <ScholarshipDatesSection scholarship={scholarship} /> : null}
        {has.documents ? <ScholarshipDocumentsSection scholarship={scholarship} /> : null}
        {has.official ? <ScholarshipOfficialDocuments scholarship={scholarship} /> : null}
        {has.apply ? <ScholarshipApplicationSection scholarship={scholarship} /> : null}
        {has.selection ? <ScholarshipSelectionSection scholarship={scholarship} /> : null}
        {has.faqs ? <ScholarshipFaqSection scholarship={scholarship} /> : null}
        <ScholarshipRelatedSection scholarship={scholarship} />
      </DetailBody>

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
            Apply on official site
          </Button>
        )}
      </MobileActionBar>
    </div>
  )
}
