'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import type { ScholarshipDetailData } from '../data/scholarship-detail'
import { ScholarshipIdentityHeader } from './scholarship-identity-header'
import { ScholarshipOpportunitySnapshot } from './scholarship-opportunity-snapshot'
import { ScholarshipEligibilitySnapshot } from './scholarship-eligibility-snapshot'
import { ScholarshipTopActions } from './scholarship-top-actions'
import { ScholarshipDetailNav } from './scholarship-detail-nav'
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

export function ScholarshipDetailPage({ scholarship }: { scholarship: ScholarshipDetailData }) {
  // Lifted here (rather than local to one component) because the top action
  // row's and the desktop sidebar's "Save Scholarship" controls must reflect
  // the same underlying state.
  const [saved, setSaved] = useState(false)
  const toggleSaved = () => {
    const next = !saved
    setSaved(next)
    toast.success(next ? 'Scholarship saved to your list.' : 'Scholarship removed from saved items.')
  }

  return (
    <div className="bg-background">
      {/*
        Top-of-page order (identical on mobile and desktop, per the domain-
        identity correction pass): identity -> opportunity snapshot ->
        eligibility-at-a-glance -> save/apply actions. This is what gives
        Scholarship Detail its own "opportunity + eligibility check +
        application guide" shape instead of Course Detail's identity+facts+
        actions block.
      */}
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', 'Scholarships', scholarship.name]} />
        <div className="mt-4 border-b pb-5 sm:pb-6">
          <ScholarshipIdentityHeader scholarship={scholarship} />
          <ScholarshipOpportunitySnapshot scholarship={scholarship} />
          <ScholarshipEligibilitySnapshot scholarship={scholarship} />
          <ScholarshipTopActions scholarship={scholarship} saved={saved} onToggleSaved={toggleSaved} />
        </div>
      </Container>

      <ScholarshipDetailNav />

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

          {/* Desktop-only single sticky action card — no second sticky mobile
              conversion bar (Mobile Detail Rule reused from COL-02/CRS-02).
              Mobile gets its action summary once, at the top of the page. */}
          <div className="hidden shrink-0 lg:sticky lg:top-40 lg:block lg:w-75">
            <ScholarshipActionSidebar scholarship={scholarship} saved={saved} onToggleSaved={toggleSaved} />
          </div>
        </div>
      </Container>
    </div>
  )
}
