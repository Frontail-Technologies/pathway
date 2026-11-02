import { type Metadata } from 'next'
import { getAdminContent } from '@/features/admin/data/admin-content'
import { AdminContentView } from '@/features/admin/components/content/directory/admin-content-view'

export const metadata: Metadata = {
  title: 'Articles | Pathway admin',
  description: 'Guides, news and explainers written by the Pathway team.',
}

export default function AdminContentPage() {
  const content = getAdminContent()

  return <AdminContentView initialContent={content} />
}
