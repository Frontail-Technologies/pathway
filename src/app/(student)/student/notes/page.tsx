import { Metadata } from 'next'
import { StudentMyNotesView } from '@/features/notes/components/student/student-my-notes-view'

export const metadata: Metadata = {
  title: 'My Notes | Student Account | Pathway',
  description: 'Access and download your purchased and saved educational study materials.',
}

export default function StudentNotesPage() {
  return <StudentMyNotesView />
}
