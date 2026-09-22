import type { Metadata } from 'next'
import { StudentDashboardPage } from '@/features/student/components/student-dashboard-page'

export const metadata: Metadata = {
  title: 'Student Dashboard',
  description: 'Manage your profile, preferences and saved opportunities.',
  robots: { index: false },
}

export default function Page() {
  return <StudentDashboardPage />
}
