import { type Metadata } from 'next'
import { AdminBannerEditorView } from '@/features/admin/components/banners/editor/admin-banner-editor-view'

export const metadata: Metadata = {
  title: 'New banner | Pathway admin',
  description: 'Create a new banner.',
}

export default function AdminBannerNewPage() {
  return <AdminBannerEditorView initialBanner={null} />
}
