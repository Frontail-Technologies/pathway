import type { NoteStatus } from '@/features/notes/types/note'
import { StatusBadge, type StatusTone } from '../../kit'

const statusTone: Record<NoteStatus, StatusTone> = {
  published: 'success',
  draft: 'neutral',
  archived: 'neutral',
}

export function sentenceCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

export function NoteStatusBadge({ status, label }: { status: NoteStatus; label: string }) {
  return <StatusBadge tone={statusTone[status] ?? 'neutral'}>{label}</StatusBadge>
}

export const noteStudyLevelOptions = [
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'postgraduate', label: 'Postgraduate' },
  { value: 'class_12', label: 'Class 12' },
  { value: 'class_11', label: 'Class 11' },
  { value: 'class_10', label: 'Class 10' },
  { value: 'class_9', label: 'Class 9' },
  { value: 'diploma', label: 'Diploma' },
]
