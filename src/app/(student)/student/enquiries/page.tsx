import type { Metadata } from 'next'
import { StudentEnquiriesPage } from '@/features/student/components/student-enquiries-page'

export const metadata: Metadata = {
  title: 'Counselling and Enquiries',
  description: 'Your counselling and enquiry updates.',
  robots: { index: false },
}

export default function Page() {
  return <StudentEnquiriesPage />
}
