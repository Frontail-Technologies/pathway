import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminNoteById, getAdminNotes } from '@/features/admin/data/admin-notes'
import { AdminNoteDetailView } from '@/features/admin/components/notes/detail/admin-note-detail-view'

type Props = {
  params: Promise<{ noteId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { noteId } = await params
  const note = getAdminNoteById(noteId)
  if (!note) return { title: 'Note Not Found | Pathway Admin' }

  return {
    title: `${note.title} | Note Details | Pathway Admin`,
    description: `Administrative overview and asset management for ${note.title}.`,
  }
}

export async function generateStaticParams() {
  const notes = getAdminNotes()
  return notes.map((n) => ({
    noteId: n.id,
  }))
}

export default async function AdminNoteDetailPage({ params }: Props) {
  const { noteId } = await params
  const note = getAdminNoteById(noteId)

  if (!note) {
    notFound()
  }

  return <AdminNoteDetailView note={note} />
}
