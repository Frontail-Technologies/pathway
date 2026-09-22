import type { Metadata } from 'next'
import { PsychometricTestPage } from '@/features/psychometric-test/components/psychometric-test-page'

export const metadata: Metadata = {
  title: 'Psychometric Test',
  description: 'Explore your interests, strengths and preferred ways of working to discover career directions worth considering.',
}

export default function Page() {
  return <PsychometricTestPage />
}
