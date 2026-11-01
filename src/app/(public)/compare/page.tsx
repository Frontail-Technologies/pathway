import type { Metadata } from 'next'
import { CompareLandingPage } from '@/features/compare/components/compare-landing-page'

export const metadata: Metadata = { title: 'Compare Colleges' }

export default function ComparePage() {
  return (
    <>
      <CompareLandingPage />
    </>
  )
}
