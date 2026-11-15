import type { Metadata } from 'next'
import { getPsychometricTest } from '@/features/psychometric-test/api/psychometric-api'
import { PsychometricTestPage } from '@/features/psychometric-test/components/psychometric-test-page'

export const metadata: Metadata = {
  title: 'Psychometric Test',
  description: 'A short career-interest test: see which kinds of work suit you and which streams and courses to explore.',
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  return <PsychometricTestPage test={await getPsychometricTest()} />
}
