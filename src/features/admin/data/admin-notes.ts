import {
  Note,
  NoteType,
  NoteStatus,
  PricingType,
  noteTypeMap,
  noteStatusMap,
  formatINRFromPaise,
  formatFileSize,
} from '@/features/notes/types/note'
import { canonicalNotes } from '@/features/notes/data/notes'
import { courses } from '@/features/courses/data/courses'
import { exams } from '@/features/exams/data/exams'

export interface AdminNote extends Note {
  typeMeta: { label: string; description: string }
  statusMeta: {
    label: string
    variant: 'default' | 'secondary' | 'outline' | 'destructive'
    description: string
  }
  formattedPrice: string
  resolvedCourses: { id: string; name: string; slug: string }[]
  resolvedExams: { id: string; name: string; slug: string }[]
}

export function transformToAdminNote(note: Note): AdminNote {
  const typeMeta = noteTypeMap[note.noteType] || noteTypeMap.other
  const statusMeta = noteStatusMap[note.status] || noteStatusMap.draft
  const formattedPrice = formatINRFromPaise(note.pricePaise)

  const resolvedCourses = (note.courseIds || [])
    .map((id) => {
      const course = courses.find((c) => c.id === id || c.slug === id)
      return course ? { id: course.id, name: course.name, slug: course.slug } : null
    })
    .filter((c): c is { id: string; name: string; slug: string } => c !== null)

  const resolvedExams = (note.examIds || [])
    .map((id) => {
      const exam = exams.find((e) => e.id === id || e.slug === id)
      return exam ? { id: exam.id, name: exam.name, slug: exam.slug } : null
    })
    .filter((e): e is { id: string; name: string; slug: string } => e !== null)

  return {
    ...note,
    typeMeta,
    statusMeta,
    formattedPrice,
    resolvedCourses,
    resolvedExams,
  }
}

export function getAdminNotes(): AdminNote[] {
  return canonicalNotes.map(transformToAdminNote)
}

export function getAdminNoteById(id: string): AdminNote | undefined {
  const note = canonicalNotes.find((n) => n.id === id)
  if (!note) return undefined
  return transformToAdminNote(note)
}

export function getNotesSummaryStats(): {
  total: number
  published: number
  draft: number
  free: number
  paid: number
} {
  const notes = getAdminNotes()
  return {
    total: notes.length,
    published: notes.filter((n) => n.status === 'published').length,
    draft: notes.filter((n) => n.status === 'draft').length,
    free: notes.filter((n) => n.pricingType === 'free').length,
    paid: notes.filter((n) => n.pricingType === 'paid').length,
  }
}
