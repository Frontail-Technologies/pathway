import type { Metadata } from 'next'
import { AdminInstitutionEditor } from '@/features/admin/components/institutions/admin-institution-editor'

export const metadata: Metadata = {
  title: 'Add Institution | Pathway Admin',
  description: 'Create a new institution catalog record.',
}

export default function AdminInstitutionNewPage() {
  return <AdminInstitutionEditor mode="add" />
}
