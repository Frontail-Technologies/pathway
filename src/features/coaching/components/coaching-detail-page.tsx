'use client'

import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { DetailSectionNav } from '@/components/shared/detail-section-nav'
import { DetailStickySidebar } from '@/components/shared/detail-sticky-sidebar'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import type { CoachingProvider } from '../data/coaching'
import { CoachingIdentityHero } from './coaching-identity-hero'
import { CoachingAboutSection } from './coaching-about-section'
import { CoachingProgramsSection } from './coaching-programs-section'
import { CoachingFacultySection } from './coaching-faculty-section'
import { CoachingLocationSection } from './coaching-location-section'
import { SimilarCoachingInstitutes } from './similar-coaching-institutes'
import { CoachingFaqSection } from './coaching-faq-section'
import { CoachingDetailCta } from './coaching-detail-cta'
import { CoachingEnquiryCard } from './coaching-enquiry-card'

// Only sections with real, fixture-backed content get a tab — no empty
// Results/Reviews tabs (no data exists to back either for this record).
const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'programs', label: 'Programs' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'location', label: 'Location' },
  { id: 'faqs', label: 'FAQs' },
]

export function CoachingDetailPage({ provider }: { provider: CoachingProvider }) {
  const { saved, toggleSaved } = useSavedItem('coaching', provider.slug, 'Provider')

  return (
    <div className="bg-background">
      <Container className="px-4 pt-5 lg:pt-6">
        <Breadcrumbs items={['Home', { label: 'Coaching', href: '/coaching' }, provider.name]} />
        <div className="mt-4">
          <CoachingIdentityHero provider={provider} saved={saved} onToggleSaved={toggleSaved} />
        </div>
      </Container>

      <DetailSectionNav items={NAV_SECTIONS} />

      <Container className="px-4">
        {/* A two-row grid, not a single flex column, is required here: a
            `position: sticky` element's excursion is bounded by its
            containing block, and if Similar Institutes shared that same
            containing block directly below the (taller) Enquiry card, the
            card would geometrically cover it right before releasing — a
            provable property of sticky positioning, not a z-index/paint bug.
            Putting Enquiry in row 1 (stretched to the main column's height,
            giving it room to release near the bottom of the page) and
            Similar in row 2 (its own containing block, entirely below row 1)
            keeps the sidebar sticky without ever overlapping Similar. */}
        <div className="grid gap-x-6 gap-y-8 lg:grid-cols-[1fr_18.75rem]">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <CoachingAboutSection provider={provider} />
            <CoachingProgramsSection provider={provider} />
            <CoachingFacultySection provider={provider} />
            <CoachingLocationSection provider={provider} />
            {/* Similar Institutes moves into the desktop sidebar (compact rows)
                below — this mobile-only instance covers small screens, where
                there is no sidebar at all. */}
            <div className="lg:hidden">
              <SimilarCoachingInstitutes provider={provider} />
            </div>
            {/* FAQ stays in the main column at every breakpoint (not duplicated
                into the sidebar): the sticky nav's "FAQs" tab needs exactly one
                always-rendered `#faqs` target — a compact sidebar copy would
                either collide on `id="faqs"` or leave the desktop tab scrolling
                to a hidden, zero-height duplicate. */}
            <CoachingFaqSection provider={provider} />
          </div>

          <div className="hidden lg:col-start-2 lg:row-start-1 lg:block">
            <DetailStickySidebar>
              <CoachingEnquiryCard provider={provider} saved={saved} onToggleSaved={toggleSaved} />
            </DetailStickySidebar>
          </div>

          <div className="hidden lg:col-start-2 lg:row-start-2 lg:block">
            <SimilarCoachingInstitutes provider={provider} compact />
          </div>
        </div>
      </Container>

      <Container className="px-4">
        <CoachingDetailCta provider={provider} saved={saved} onToggleSaved={toggleSaved} />
      </Container>
    </div>
  )
}
