import { type Metadata } from 'next'
import { AdminScholarshipEditor } from '@/features/admin/components/scholarships/editor/admin-scholarship-editor'

export const metadata: Metadata = {
  title: 'New scholarship | Pathway Admin',
  description: 'Add a new scholarship opportunity, financial support grant, and eligibility criteria.',
}

export default function AdminNewScholarshipPage() {
  return <AdminScholarshipEditor mode="create" />
}
