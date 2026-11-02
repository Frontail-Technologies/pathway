import { type Metadata } from 'next'
import { AdminPromotionEditorView } from '@/features/admin/components/promotions/editor/admin-promotion-editor-view'

export const metadata: Metadata = {
  title: 'New featured listing | Pathway admin',
  description: 'Feature a record on the homepage or a list page.',
}

export default function AdminCreatePromotionPage() {
  return <AdminPromotionEditorView isCreate />
}
