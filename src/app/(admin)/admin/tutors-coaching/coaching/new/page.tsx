import type { Metadata } from 'next'
import { AdminCoachingEditor } from '@/features/admin/components/tutors-coaching/coaching/editor/admin-coaching-editor'

export const metadata: Metadata = {
  title: 'Add coaching provider | Pathway Admin',
  description: 'Create a new coaching institute or online academy profile.',
}

export default function AdminCreateCoachingPage() {
  return <AdminCoachingEditor />
}
