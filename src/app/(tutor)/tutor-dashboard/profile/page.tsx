import type { Metadata } from 'next'
import { TutorProfilePage } from '@/features/tutor-space/components/tutor-profile-page'

export const metadata: Metadata = { title: 'Profile' }

export default function Page() {
  return <TutorProfilePage />
}
