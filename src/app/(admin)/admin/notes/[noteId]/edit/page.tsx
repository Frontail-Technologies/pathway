import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminNoteById, getAdminNotes } from '@/features/admin/data/admin-notes'
import { AdminNoteEditorView } from '@/features/admin/components/notes/editor/admin-note-editor-view'

type Props = {
  params: Promise<{ noteId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { noteId } = await params
  const note = getAdminNoteById(noteId)
  if (!note) return { title: 'Edit Note | Pathway Admin' }

  return {
    title: `Edit: ${note.title} | Notes & Study Material | Pathway Admin`,
    description: `Edit metadata, study classification, downloadable PDF asset, and pricing for ${note.title}.`,
  }
}

export async function generateStaticParams() {
  const notes = getAdminNotes()
  return notes.map((n) => ({
    noteId: n.id,
  }))
}

export default async function AdminNoteEditPage({ params }: Props) {
  const { noteId } = await params
  const note = getAdminNoteById(noteId)

  if (!note) {
    notFound()
  }

  return <AdminNoteEditorView initialNote={note} />
}
