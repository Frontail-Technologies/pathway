import { Metadata } from 'next'
import { AdminReportsView } from '@/features/admin/components/reports/admin-reports-view'

export const metadata: Metadata = {
  title: 'Reports | Pathway Admin',
  description: 'Catalogue, data quality and data source reports.',
}

export default function AdminReportsPage() {
  return <AdminReportsView />
}
