import type { Metadata } from 'next'
import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'
import { cookiePolicy } from '@/features/legal/data/cookies'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How Pathway may use cookies and browser storage.',
}

export default function CookiesPage() {
  return (
    <>
      <LegalPageLayout document={cookiePolicy} />
      <MobileBottomNavigation />
    </>
  )
}
