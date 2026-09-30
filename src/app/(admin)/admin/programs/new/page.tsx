import type { Metadata } from 'next'
import { AdminProgramEditor } from '@/features/admin/components/programs/admin-program-editor'

export const metadata: Metadata = {
  title: 'Create Academic Program | Pathway Admin',
  description: 'Create a canonical academic program with structured curriculum, entrance exams, and document resources.',
}

export default function AdminProgramCreatePage() {
  return <AdminProgramEditor mode="create" />
}
