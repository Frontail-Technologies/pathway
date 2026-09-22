import type { Metadata } from 'next'
import { StudentSavedPage } from '@/features/student/components/student-saved-page'

export const metadata: Metadata = {
  title: 'Saved Items',
  description: 'Colleges, courses, scholarships, coaching and tutors you have saved.',
  robots: { index: false },
}

export default function Page() {
  return <StudentSavedPage />
}
