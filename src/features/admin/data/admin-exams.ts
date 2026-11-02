import { exams, scopeOptions, studyAreaOptions, type Exam, type ExamLevel, type ExamScope, type StudyArea } from '@/features/exams/data/exams'
import { ADMIN_STORAGE_KEYS, readAdminStorage, writeAdminStorage } from './admin-demo-storage'

export const examLevelOptions: ExamLevel[] = ['Undergraduate', 'Postgraduate']
export { scopeOptions as examScopeOptions, studyAreaOptions as examStudyAreaOptions }

/** Detail sections a public exam page can show, in page order. */
export const EXAM_DETAIL_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'pattern', label: 'Exam pattern' },
  { id: 'syllabus', label: 'Syllabus' },
  { id: 'process', label: 'Process' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'colleges', label: 'Colleges to explore' },
] as const

export type ExamDetailSectionId = (typeof EXAM_DETAIL_SECTIONS)[number]['id']

export function examSectionCounts(exam: Exam): Record<ExamDetailSectionId, number> {
  const d = exam.detail
  return {
    overview: d?.overview.length ?? 0,
    eligibility: d?.eligibility?.length ?? 0,
    pattern: d?.pattern?.length ?? 0,
    syllabus: d?.syllabusGroups?.length ?? 0,
    process: d?.processSteps.length ?? 0,
    faqs: d?.faqs.length ?? 0,
    colleges: d?.collegeSlugs?.length ?? 0,
  }
}

/** Simple derived score: listing basics plus each public-page section that has content. */
export function examCompleteness(exam: Exam): number {
  const counts = examSectionCounts(exam)
  const checks = [
    Boolean(exam.name && exam.shortName),
    Boolean(exam.conductingBody),
    exam.description.trim().length >= 40,
    exam.hasDetailPage,
    Boolean(exam.detail?.longDescription),
    ...EXAM_DETAIL_SECTIONS.map((section) => counts[section.id] > 0),
  ]
  return Math.round((checks.filter(Boolean).length / checks.length) * 100)
}

export type AdminExam = Exam & { completeness: number }

export function toAdminExam(exam: Exam): AdminExam {
  return { ...exam, completeness: examCompleteness(exam) }
}

export function getAdminExams(): AdminExam[] {
  return exams.map(toAdminExam)
}

export function getAdminExamById(idOrSlug: string): Exam | undefined {
  return exams.find((exam) => exam.id === idOrSlug || exam.slug === idOrSlug)
}

/* ------------------------------------------------------------------ editor values */

export type PairRow = { a: string; b: string }

export type ExamFormValues = {
  name: string
  shortName: string
  slug: string
  studyArea: StudyArea
  scope: ExamScope
  level: ExamLevel
  conductingBody: string
  description: string
  longDescription: string
  popular: boolean
  hasDetailPage: boolean
  officialUrl: string
  datesNote: string
  processSteps: PairRow[]
  eligibility: PairRow[]
  pattern: PairRow[]
  syllabus: string
  seoTitle: string
  seoDescription: string
}

export function examToFormValues(exam?: Exam): ExamFormValues {
  const d = exam?.detail
  return {
    name: exam?.name ?? '',
    shortName: exam?.shortName ?? '',
    slug: exam?.slug ?? '',
    studyArea: exam?.studyArea ?? 'Engineering',
    scope: exam?.scope ?? 'National',
    level: exam?.level ?? 'Undergraduate',
    conductingBody: exam?.conductingBody ?? '',
    description: exam?.description ?? '',
    longDescription: d?.longDescription ?? '',
    popular: exam?.popular ?? false,
    hasDetailPage: exam?.hasDetailPage ?? false,
    officialUrl: '',
    datesNote: '',
    processSteps: d?.processSteps.map((s) => ({ a: s.title, b: s.text })) ?? [],
    eligibility: d?.eligibility?.map((e) => ({ a: e.label, b: e.text })) ?? [],
    pattern: d?.pattern?.map((p) => ({ a: p.label, b: p.value })) ?? [],
    syllabus: d?.syllabusGroups?.map((g) => g.title).join(', ') ?? '',
    seoTitle: exam ? `${exam.shortName}: eligibility, pattern and process` : '',
    seoDescription: exam?.description ?? '',
  }
}

const cleanRows = (rows: PairRow[]) => rows.filter((row) => row.a.trim() || row.b.trim())

/** Applies saved demo edits on top of the fixture record. */
export function applyExamFormValues(exam: Exam, values: ExamFormValues): Exam {
  const syllabus = values.syllabus
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const base = exam.detail
  return {
    ...exam,
    name: values.name,
    shortName: values.shortName,
    slug: values.slug,
    studyArea: values.studyArea,
    scope: values.scope,
    level: values.level,
    conductingBody: values.conductingBody || undefined,
    description: values.description,
    popular: values.popular,
    hasDetailPage: values.hasDetailPage,
    detail:
      base || values.longDescription || cleanRows(values.processSteps).length
        ? {
            overview: base?.overview ?? [],
            faqs: base?.faqs ?? [],
            collegeSlugs: base?.collegeSlugs,
            longDescription: values.longDescription,
            processSteps: cleanRows(values.processSteps).map((r) => ({ title: r.a, text: r.b })),
            eligibility: cleanRows(values.eligibility).map((r) => ({ label: r.a, text: r.b })),
            pattern: cleanRows(values.pattern).map((r) => ({ label: r.a, value: r.b })),
            syllabusGroups: syllabus.map((title) => ({ title, topics: base?.syllabusGroups?.find((g) => g.title === title)?.topics })),
          }
        : undefined,
  }
}

/* ------------------------------------------------------------------ demo edits (this device) */

type ExamEdits = Record<string, { values: ExamFormValues; savedAt: string }>

export function readExamEdits(): ExamEdits {
  return readAdminStorage<ExamEdits>(ADMIN_STORAGE_KEYS.examEdits, {})
}

export function saveExamEdit(examId: string, values: ExamFormValues) {
  writeAdminStorage(ADMIN_STORAGE_KEYS.examEdits, { ...readExamEdits(), [examId]: { values, savedAt: new Date().toISOString() } })
}

export function discardExamEdit(examId: string) {
  const next = { ...readExamEdits() }
  delete next[examId]
  writeAdminStorage(ADMIN_STORAGE_KEYS.examEdits, next)
}
