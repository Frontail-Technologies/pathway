'use client'

import { useMemo } from 'react'
import type { Exam } from '@/features/exams/data/exams'
import { ADMIN_STORAGE_KEYS } from '@/features/admin/data/admin-demo-storage'
import { applyExamFormValues, type ExamFormValues } from '@/features/admin/data/admin-exams'
import { useDemoStorage } from '@/features/admin/hooks/use-demo-storage'

type ExamEdits = Record<string, { values: ExamFormValues; savedAt: string }>

export function useExamsWithEdits<T extends Exam>(list: T[]) {
  const [edits, , loaded] = useDemoStorage<ExamEdits>(ADMIN_STORAGE_KEYS.examEdits, {})
  const merged = useMemo(() => list.map((exam) => (edits[exam.id] ? { ...exam, ...applyExamFormValues(exam, edits[exam.id]!.values) } : exam)), [list, edits])
  return { exams: merged, edits, loaded }
}
