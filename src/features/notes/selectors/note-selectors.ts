import { Note } from '../types/note'
import { canonicalNotes } from '../data/notes'
import { canonicalEntitlements } from '../data/note-access'









 
export function hasClientNoteEntitlement(
  studentId: string | undefined,
  noteId: string
): boolean {
  if (!studentId) return false
  return canonicalEntitlements.some(
    (e) => e.studentId === studentId && e.noteId === noteId && !e.revokedAt
  )
}

export function getAccessibleNotesForStudent(
  studentId: string | undefined
): Note[] {
  if (!studentId) return []
  const entitlementNoteIds = new Set(
    canonicalEntitlements
      .filter((e) => e.studentId === studentId && !e.revokedAt)
      .map((e) => e.noteId)
  )
  return canonicalNotes.filter((note) => entitlementNoteIds.has(note.id))
}

export type NoteFilterCriteria = {
  search?: string
  studyLevel?: string
  stream?: string
  subject?: string
  noteType?: string
  pricingType?: string
}

export function filterNotes(
  notes: Note[],
  criteria: NoteFilterCriteria
): Note[] {
  return notes.filter((note) => {
    if (criteria.search) {
      const q = criteria.search.toLowerCase()
      const matchTitle = note.title.toLowerCase().includes(q)
      const matchDesc = note.description?.toLowerCase().includes(q) || false
      const matchShortDesc = note.shortDescription?.toLowerCase().includes(q) || false
      const matchSubject = note.subject?.toLowerCase().includes(q) || false
      const matchAuthor = note.authorName?.toLowerCase().includes(q) || false
      if (!matchTitle && !matchDesc && !matchShortDesc && !matchSubject && !matchAuthor) {
        return false
      }
    }

    if (criteria.studyLevel && criteria.studyLevel !== 'all') {
      if (note.studyLevel?.toLowerCase() !== criteria.studyLevel.toLowerCase()) {
        return false
      }
    }

    if (criteria.stream && criteria.stream !== 'all') {
      if (note.stream?.toLowerCase() !== criteria.stream.toLowerCase()) {
        return false
      }
    }

    if (criteria.subject && criteria.subject !== 'all') {
      if (note.subject?.toLowerCase() !== criteria.subject.toLowerCase()) {
        return false
      }
    }

    if (criteria.noteType && criteria.noteType !== 'all') {
      if (note.noteType !== criteria.noteType) {
        return false
      }
    }

    if (criteria.pricingType && criteria.pricingType !== 'all') {
      if (note.pricingType !== criteria.pricingType) {
        return false
      }
    }

    return true
  })
}
