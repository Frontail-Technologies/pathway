import { type Metadata } from 'next'
import { AdminContentEditorView } from '@/features/admin/components/content/editor/admin-content-editor-view'

export const metadata: Metadata = {
  title: 'New article | Pathway admin',
  description: 'Write a new article.',
}

export default function AdminContentNewPage() {
  return <AdminContentEditorView initialEntry={null} />
}
