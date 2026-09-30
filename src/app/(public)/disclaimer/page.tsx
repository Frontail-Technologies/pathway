import type { Metadata } from 'next'
import { LegalPageLayout } from '@/features/legal/components/legal-page-layout'
import { disclaimer } from '@/features/legal/data/disclaimer'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important information about the educational content, predictors and tools on Pathway.',
}

export default function DisclaimerPage() {
  return (
    <>
      <LegalPageLayout document={disclaimer} />
      <MobileBottomNavigation />
    </>
  )
}
