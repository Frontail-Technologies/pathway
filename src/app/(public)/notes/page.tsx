import { Metadata } from 'next'
import { getPublishedNotes } from '@/features/notes/data/notes'
import { NotesMarketplaceView } from '@/features/notes/components/public/notes-marketplace-view'

export const metadata: Metadata = {
  title: 'Notes & Study Material | Pathway',
  description: 'Discover revision notes, formula sheets, chapter summaries, and exam preparation material.',
}

export default function NotesMarketplacePage() {
  const notes = getPublishedNotes()

  return <NotesMarketplaceView initialNotes={notes} />
}
