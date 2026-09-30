import type { Metadata } from 'next'
import { AdminAdmissionsFeesEditor } from '@/features/admin/components/admissions-fees/editor/admin-admissions-fees-editor'

export const metadata: Metadata = {
  title: 'Create Program Offering | Admissions & Fees | Pathway Admin',
  description: 'Configure fee structure, entrance exam requirements, and admission procedures for a new institution program offering.',
}

export default function AdminAdmissionsFeesCreatePage() {
  return <AdminAdmissionsFeesEditor mode="create" />
}
