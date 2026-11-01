import type { Metadata } from 'next'
import { TutorSettingsPage } from '@/features/tutor-space/components/tutor-settings-page'

export const metadata: Metadata = { title: 'Settings' }

export default function Page() {
  return <TutorSettingsPage />
}
