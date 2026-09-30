import { type Metadata } from 'next'
import { getAdminContent } from '@/features/admin/data/admin-content'
import { AdminContentView } from '@/features/admin/components/content/directory/admin-content-view'

export const metadata: Metadata = {
  title: 'Articles & Content | Admin Console',
  description: 'Manage editorial articles, guides, circulars, and explainers with canonical entity linkages.',
}

export default function AdminContentPage() {
  const content = getAdminContent()

  return <AdminContentView initialContent={content} />
}
