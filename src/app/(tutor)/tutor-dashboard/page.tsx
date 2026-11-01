import type { Metadata } from 'next'
import { TutorOverviewPage } from '@/features/tutor-space/components/tutor-overview-page'

export const metadata: Metadata = { title: 'Overview' }

export default function Page() {
  return <TutorOverviewPage />
}
