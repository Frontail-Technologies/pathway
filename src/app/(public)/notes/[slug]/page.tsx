import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getNoteBySlug, getPublishedNotes } from '@/features/notes/data/notes'
import { NoteDetailView } from '@/features/notes/components/public/note-detail-view'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = getNoteBySlug(slug)
  if (!note) return { title: 'Notes Not Found | Pathway' }

  return {
    title: `${note.title} | Notes & Study Material | Pathway`,
    description:
      note.shortDescription ||
      `Download and study ${note.title} on Pathway.`,
  }
}

export async function generateStaticParams() {
  const notes = getPublishedNotes()
  return notes.map((n) => ({
    slug: n.slug,
  }))
}

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params
  const note = getNoteBySlug(slug)

  if (!note || note.status !== 'published') {
    notFound()
  }

  return <NoteDetailView note={note} />
}
