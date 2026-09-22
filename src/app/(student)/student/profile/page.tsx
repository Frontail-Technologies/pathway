import type { Metadata } from 'next'
import { StudentProfilePage } from '@/features/student/components/student-profile-page'

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Keep your personal and education details up to date.',
  robots: { index: false },
}

export default function Page() {
  return <StudentProfilePage />
}
