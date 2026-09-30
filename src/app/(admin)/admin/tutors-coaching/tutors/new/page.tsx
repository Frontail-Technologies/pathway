import type { Metadata } from 'next'
import { AdminTutorEditor } from '@/features/admin/components/tutors-coaching/tutors/editor/admin-tutor-editor'

export const metadata: Metadata = {
  title: 'Create Individual Tutor | Pathway Admin',
  description: 'Create a new individual educator profile.',
}

export default function AdminCreateTutorPage() {
  return <AdminTutorEditor />
}
