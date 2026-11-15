import { apiRequest } from '@/features/auth/lib/session-client'

export const DIMENSION_KEYS = ['analytical', 'creative', 'social', 'practical', 'organising', 'enterprising'] as const
export type DimensionKey = (typeof DIMENSION_KEYS)[number]
export type QuestionKind = 'rating' | 'choice'

export type PsychometricOption = { label: string; dimension: DimensionKey }
export type PsychometricArea = { label: string; stream: string | null }
export type AdminDimension = { key: DimensionKey; label: string; summary: string; environments: string; areas: PsychometricArea[]; position: number }
export type AdminQuestion = { id: string; kind: QuestionKind; text: string; dimension: DimensionKey | null; options: PsychometricOption[] | null; position: number; active: boolean; updatedAt: string }
export type AdminPsychometricTest = { dimensions: AdminDimension[]; questions: AdminQuestion[] }

const base = '/admin/psychometric'

export const getPsychometricTest = () => apiRequest<AdminPsychometricTest>('GET', base)
export const createQuestion = (body: { kind: QuestionKind; text: string; dimension?: DimensionKey | null; options?: PsychometricOption[] | null }) => apiRequest<AdminQuestion>('POST', `${base}/questions`, body)
export const updateQuestion = (id: string, body: { text?: string; dimension?: DimensionKey | null; options?: PsychometricOption[] | null; active?: boolean }) =>
  apiRequest<AdminQuestion>('PATCH', `${base}/questions/${encodeURIComponent(id)}`, body)
export const reorderQuestions = (kind: QuestionKind, ids: string[]) => apiRequest<AdminPsychometricTest>('PUT', `${base}/questions/order`, { kind, ids })
export const updateDimension = (key: DimensionKey, body: { label?: string; summary?: string; environments?: string; areas?: PsychometricArea[] }) => apiRequest<AdminDimension>('PATCH', `${base}/dimensions/${key}`, body)
