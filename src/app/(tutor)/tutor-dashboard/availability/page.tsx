import type { Metadata } from 'next'
import { TutorAvailabilityPage } from '@/features/tutor-space/components/tutor-availability-page'

export const metadata: Metadata = { title: 'Availability' }

export default function Page() {
  return <TutorAvailabilityPage />
}
