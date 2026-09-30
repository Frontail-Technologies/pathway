import { Metadata } from 'next'
import { AdminReportsView } from '@/features/admin/components/reports/admin-reports-view'

export const metadata: Metadata = {
  title: 'Reports & Audits | Pathway Admin',
  description: 'Operational catalog reports, data quality audits, and subsystem availability matrices for the Pathway platform.',
}

export default function AdminReportsPage() {
  return <AdminReportsView />
}
