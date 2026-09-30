import type { Metadata } from 'next'
import { AdminInstitutionsView } from '@/features/admin/components/institutions/admin-institutions-view'

export const metadata: Metadata = {
  title: 'Institutions Management | Pathway Admin',
  description: 'Manage college and university catalog records, profile completeness, and ingestion status.',
}

export default function AdminInstitutionsPage() {
  return <AdminInstitutionsView />
}
