import { type Metadata } from 'next'
import { AdminScholarshipEditor } from '@/features/admin/components/scholarships/editor/admin-scholarship-editor'

export const metadata: Metadata = {
  title: 'Create Scholarship Scheme | Admin Console',
  description: 'Add a new scholarship opportunity, financial support grant, and eligibility criteria.',
}

export default function AdminNewScholarshipPage() {
  return <AdminScholarshipEditor mode="create" />
}
