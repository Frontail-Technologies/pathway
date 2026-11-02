import type { Metadata } from 'next'
import { AdminProgramEditor } from '@/features/admin/components/programs/admin-program-editor'

export const metadata: Metadata = {
  title: 'Add course | Pathway Admin',
  description: 'Add a course to the catalogue.',
}

export default function AdminProgramCreatePage() {
  return <AdminProgramEditor mode="create" />
}
