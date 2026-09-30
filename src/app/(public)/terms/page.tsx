import type { Metadata } from 'next'
import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'
import { termsAndConditions } from '@/features/legal/data/terms'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that apply when you use Pathway, an education discovery and planning platform.',
}

export default function TermsPage() {
  return (
    <>
      <LegalPageLayout document={termsAndConditions} />
      <MobileBottomNavigation />
    </>
  )
}
