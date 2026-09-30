import { type Metadata } from 'next'
import { getAdminScholarships } from '@/features/admin/data/admin-scholarships'
import { AdminScholarshipsView } from '@/features/admin/components/scholarships/directory/admin-scholarships-view'

export const metadata: Metadata = {
  title: 'Scholarships & Financial Aid | Admin Console',
  description: 'Manage institutional, government, and trust scholarship schemes, eligibility criteria, and deadlines.',
}

export default function AdminScholarshipsPage() {
  const scholarships = getAdminScholarships()

  return <AdminScholarshipsView initialScholarships={scholarships} />
}
