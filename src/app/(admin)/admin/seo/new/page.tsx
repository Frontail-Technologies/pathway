import type { Metadata } from 'next'
import { AdminSeoEditorView } from '@/features/admin/components/seo/editor/admin-seo-editor-view'

export const metadata: Metadata = {
  title: 'Create SEO Override | Admin',
  description: 'Configure new search engine and social metadata overrides for public pages.',
}

export default function AdminSeoNewPage() {
  return <AdminSeoEditorView />
}
