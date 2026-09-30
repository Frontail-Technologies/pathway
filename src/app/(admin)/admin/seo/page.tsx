import type { Metadata } from 'next'
import { getAdminSeoRecords } from '@/features/admin/data/admin-seo'
import { AdminSeoView } from '@/features/admin/components/seo/directory/admin-seo-view'

export const metadata: Metadata = {
  title: 'SEO Metadata | Admin',
  description: 'Manage search-engine titles, descriptions, canonical routing, and Open Graph metadata overrides.',
}

export default function AdminSeoPage() {
  const records = getAdminSeoRecords()
  return <AdminSeoView initialRecords={records} />
}
