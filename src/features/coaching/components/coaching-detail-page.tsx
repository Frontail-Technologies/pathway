'use client'

import { Container } from '@/components/shared/container'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { DetailSectionNav } from '@/components/shared/detail-section-nav'
import { DetailStickySidebar } from '@/components/shared/detail-sticky-sidebar'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import { MobileActionBar, MobileActionBarSave } from '@/components/shared/mobile-action-bar'
import { Button } from '@/components/ui/button'
import { CoachingEnquiryDialog } from './coaching-enquiry-dialog'
import type { CoachingDetail } from '../api/coaching-api'
import { CoachingIdentityHero } from './coaching-identity-hero'
import { CoachingAboutSection } from './coaching-about-section'
import { CoachingProgramsSection } from './coaching-programs-section'
import { CoachingFacultySection } from './coaching-faculty-section'
import { CoachingLocationSection } from './coaching-location-section'
import { SimilarCoachingInstitutes } from './similar-coaching-institutes'
import { CoachingFaqSection } from './coaching-faq-section'
import { CoachingDetailCta } from './coaching-detail-cta'
import { CoachingEnquiryCard } from './coaching-enquiry-card'



const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'programs', label: 'Programs' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'location', label: 'Location' },
  { id: 'faqs', label: 'FAQs' },
]

export function CoachingDetailPage({ provider }: { provider: CoachingDetail }) {
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
        <div className="grid gap-x-6 gap-y-8 lg:grid-cols-[1fr_18.75rem]">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <CoachingAboutSection provider={provider} />
            <CoachingProgramsSection provider={provider} />
            <CoachingFacultySection provider={provider} />
            <CoachingLocationSection provider={provider} />
            <div className="lg:hidden">
              <SimilarCoachingInstitutes provider={provider} />
            </div>
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

      <MobileActionBar label={`${provider.name} actions`}>
        <MobileActionBarSave saved={saved} onToggle={toggleSaved} entityLabel="provider" />
        <CoachingEnquiryDialog provider={provider} trigger={<Button variant="cta" className="h-11 flex-1 px-3 text-sm font-semibold">Enquire Now</Button>} />
      </MobileActionBar>
    </div>
  )
}
