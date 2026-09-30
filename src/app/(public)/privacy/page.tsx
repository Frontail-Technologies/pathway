import type { Metadata } from 'next'
import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'
import { privacyPolicy } from '@/features/legal/data/privacy'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Pathway handles information when you use the education discovery platform.',
}

export default function PrivacyPage() {
  return (
    <>
      <LegalPageLayout document={privacyPolicy} />
      <MobileBottomNavigation />
    </>
  )
}
