import { type Metadata } from 'next'
import { AdminBannerEditorView } from '@/features/admin/components/banners/editor/admin-banner-editor-view'

export const metadata: Metadata = {
  title: 'Create Banner | Banners | Pathway Admin',
  description: 'Configure and create a new standalone visual banner creative in Pathway.',
}

export default function AdminBannerNewPage() {
  return <AdminBannerEditorView initialBanner={null} />
}
