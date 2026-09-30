import type { Metadata } from 'next'
import { AdminDashboardView } from '@/features/admin/components/admin-dashboard-view'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Pathway Operations',
  description: "Manage Pathway's education catalog data, users, enquiries and content.",
}

export default function AdminDashboardPage() {
  return <AdminDashboardView />
}
