import { type Metadata } from 'next'
import { AdminContentEditorView } from '@/features/admin/components/content/editor/admin-content-editor-view'

export const metadata: Metadata = {
  title: 'Create Content | Articles & Content | Pathway Admin',
  description: 'Author new editorial article, admission guide, circular, or explainer in the Pathway CMS.',
}

export default function AdminContentNewPage() {
  return <AdminContentEditorView initialEntry={null} />
}
