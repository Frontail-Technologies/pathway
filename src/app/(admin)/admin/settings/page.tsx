import type { Metadata } from 'next'
import { AdminSettingsView } from '@/features/admin/components/settings/admin-settings-view'

export const metadata: Metadata = {
  title: 'Settings | Pathway Admin',
  description: 'Site details, lead routing and notifications.',
}

export default function AdminSettingsPage() {
  return <AdminSettingsView />
}
