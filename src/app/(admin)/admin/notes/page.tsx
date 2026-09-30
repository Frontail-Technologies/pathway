import { type Metadata } from 'next'
import { getAdminNotes } from '@/features/admin/data/admin-notes'
import { AdminNotesView } from '@/features/admin/components/notes/directory/admin-notes-view'

export const metadata: Metadata = {
  title: 'Notes & Study Material | Admin Console',
  description: 'Manage educational notes, formula sheets, revision summaries, downloadable PDF assets, and commercial pricing.',
}

export default function AdminNotesPage() {
  const notes = getAdminNotes()

  return <AdminNotesView initialNotes={notes} />
}
