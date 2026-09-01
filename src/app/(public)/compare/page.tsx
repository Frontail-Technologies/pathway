import type { Metadata } from 'next'
import { CompareLandingPage } from '@/features/compare/components/compare-landing-page'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export const metadata: Metadata = { title: 'Compare Colleges' }

export default function ComparePage() {
  return (
    <>
      <CompareLandingPage />
      <MobileBottomNavigation />
    </>
  )
}
