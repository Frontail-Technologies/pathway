import type { Metadata } from 'next'
import { StudentPreferencesPage } from '@/features/student/components/student-preferences-page'

export const metadata: Metadata = {
  title: 'Preferences',
  description: 'Tell Pathway what you are planning so your discovery experience can be more relevant.',
  robots: { index: false },
}

export default function Page() {
  return <StudentPreferencesPage />
}
