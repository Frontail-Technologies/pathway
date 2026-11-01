import type { Metadata } from 'next'
import { TutorRequestsPage } from '@/features/tutor-space/components/tutor-requests-page'

export const metadata: Metadata = { title: 'Session Requests' }

export default function Page() {
  return <TutorRequestsPage />
}
