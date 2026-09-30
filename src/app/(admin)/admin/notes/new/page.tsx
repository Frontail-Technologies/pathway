import { type Metadata } from 'next'
import { AdminNoteEditorView } from '@/features/admin/components/notes/editor/admin-note-editor-view'

export const metadata: Metadata = {
  title: 'Create Study Note | Notes & Study Material | Pathway Admin',
  description: 'Configure and publish educational notes, revision material, formula sheets, or exam study packages.',
}

export default function AdminNoteNewPage() {
  return <AdminNoteEditorView initialNote={null} />
}
