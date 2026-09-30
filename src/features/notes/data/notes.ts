import { Note } from '../types/note'




 
export const canonicalNotes: Note[] = []

export function getNotes(): Note[] {
  return canonicalNotes
}

export function getPublishedNotes(): Note[] {
  return canonicalNotes.filter((note) => note.status === 'published')
}

export function getNoteBySlug(slug: string): Note | undefined {
  return canonicalNotes.find((note) => note.slug === slug)
}

export function getNoteById(id: string): Note | undefined {
  return canonicalNotes.find((note) => note.id === id)
}
