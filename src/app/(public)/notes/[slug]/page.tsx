import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getNote } from '@/features/notes/api/notes-api'
import { NoteDetailPage } from '@/features/notes/components/public/note-detail-page'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getNote((await params).slug).catch(() => undefined)
  if (!note) return { title: 'Notes Not Found' }
  return { title: note.title, description: note.shortDescription ?? `${note.title} on Pathway.`, alternates: { canonical: `/notes/${note.slug}` } }
}

export default async function NotePage({ params }: Props) {
  const note = await getNote((await params).slug)
  if (!note) notFound()
  return <NoteDetailPage note={note} />
}
