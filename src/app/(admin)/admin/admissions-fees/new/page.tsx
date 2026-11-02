import type { Metadata } from 'next'
import { AdminAdmissionsFeesEditor } from '@/features/admin/components/admissions-fees/editor/admin-admissions-fees-editor'

export const metadata: Metadata = {
  title: 'Add offering | Admissions & fees | Pathway Admin',
  description: 'Add fees and admission rules for a course at an institution.',
}

export default function AdminAdmissionsFeesCreatePage() {
  return <AdminAdmissionsFeesEditor mode="create" />
}
