import { type Metadata } from 'next'
import { AdminPromotionEditorView } from '@/features/admin/components/promotions/editor/admin-promotion-editor-view'

export const metadata: Metadata = {
  title: 'Create Placement | Admin Console',
  description: 'Configure a new featured editorial highlight or sponsored entity placement.',
}

export default function AdminCreatePromotionPage() {
  return <AdminPromotionEditorView isCreate />
}
