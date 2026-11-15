import { cache } from 'react'
import { catalogGet, catalogList, isNotFound, seg, type CatalogQuery } from '@/services/api/catalog'
import { cityName, type Place, type TermRef } from '@/features/catalog/format'
import { parseExamFilters, parseExamSort, serializeExamFilters, type Exam, type ExamDetail, type ExamLevel, type ExamScope, type StudyArea } from '../data/exams'

export type ExamListDto = {
  slug: string
  name: string
  shortName: string
  studyArea: TermRef
  scope: 'national' | 'state' | 'institute'
  level: TermRef
  conductingBody: string | null
  description: string
  popular: boolean
  hasDetailPage: boolean
  noticeCount?: number
  collegeCount?: number
  nextDate?: { label: string; startsOn: string | null; endsOn: string | null } | null
}

type LabelValue = { label: string; value: string }

type ExamDetailDto = ExamListDto & {
  longDescription: string | null
  overview: LabelValue[]
  eligibility: LabelValue[]
  pattern: LabelValue[]
  syllabusGroups: { title: string; topics: string[] }[]
  processSteps: { title: string; text: string }[]
  institutions: { slug: string; name: string; location: Place; ownership: TermRef; rating: number | null; verified: boolean; hasDetailPage: boolean }[]
  programs: { slug: string; name: string; degree: TermRef; hasDetailPage: boolean }[]
  faqs: { question: string; answer: string }[]
  dates?: { label: string; academicSession: string | null; startsOn: string | null; endsOn: string | null; dateText: string | null; sourceUrl: string | null }[]
  documents?: { title: string; docType: string; academicSession: string | null; url: string }[]
}

const scopeLabels: Record<ExamListDto['scope'], ExamScope> = { national: 'National', state: 'State', institute: 'University / Institute' }

export function toExam(dto: ExamListDto): Exam {
  return {
    id: dto.slug,
    slug: dto.slug,
    name: dto.name,
    shortName: dto.shortName,
    studyArea: dto.studyArea.label as StudyArea,
    scope: scopeLabels[dto.scope] ?? 'National',
    level: dto.level.label as ExamLevel,
    conductingBody: dto.conductingBody ?? undefined,
    description: dto.description,
    popular: dto.popular,
    hasDetailPage: true,
    noticeCount: dto.noticeCount ?? 0,
    collegeCount: dto.collegeCount ?? 0,
    nextDate: dto.nextDate ?? null,
  }
}

export const listExams = (query: CatalogQuery) => catalogList('/exams', query, toExam)

export function examApiQuery(params: URLSearchParams): Record<string, string> {
  const query = Object.fromEntries(new URLSearchParams(serializeExamFilters(parseExamFilters(params), parseExamSort(params), params.get('q') ?? '')))
  const legacy = params.get('exam')
  if (!query.q && legacy) query.exam = legacy
  return query
}

export type ExamCollege = { slug: string; name: string; city: string; type: string; hasDetailPage: boolean }
export type ExamCourse = { slug: string; name: string; degree: string; hasDetailPage: boolean }

export type DetailedExam = Exam & { detail: ExamDetail; colleges: ExamCollege[]; courses: ExamCourse[]; related: Exam[] }

const rows = (items: LabelValue[]) => items.map((item) => ({ label: item.label, text: item.value }))

function examFactFaqs(dto: ExamDetailDto) {
  const exam = toExam(dto)
  const courses = dto.programs.map((program) => program.name)
  const faqs: ({ question: string; answer: string } | null)[] = [
    { question: `What is the full form of ${exam.shortName}?`, answer: `${exam.shortName} stands for ${exam.name}.` },
    exam.conductingBody ? { question: `Who conducts ${exam.shortName}?`, answer: `${exam.shortName} is conducted by ${exam.conductingBody}.` } : null,
    { question: `Is ${exam.shortName} a national-level exam?`, answer: `${exam.shortName} is a ${exam.scope.toLowerCase()}-level ${exam.level.toLowerCase()} entrance exam for ${exam.studyArea.toLowerCase()}.` },
    courses.length ? { question: `Which courses accept ${exam.shortName} scores?`, answer: `On Pathway, ${courses.slice(0, 6).join(', ')}${courses.length > 6 ? ` and ${courses.length - 6} more` : ''} accept ${exam.shortName}.` } : null,
  ]
  return faqs.filter((faq): faq is { question: string; answer: string } => Boolean(faq))
}

export const getDetailedExam = cache(async (slug: string): Promise<DetailedExam | undefined> => {
  let dto: ExamDetailDto
  try {
    dto = await catalogGet<ExamDetailDto>(`/exams/${seg(slug)}`)
  } catch (error) {
    if (isNotFound(error)) return undefined
    throw error
  }
  const related = await catalogGet<ExamListDto[]>(`/exams/${seg(slug)}/related`, { limit: '4' })
  return {
    ...toExam(dto),
    detail: {
      longDescription: dto.longDescription ?? dto.description,
      overview: rows(dto.overview),
      eligibility: dto.eligibility.length ? rows(dto.eligibility) : undefined,
      pattern: dto.pattern.length ? dto.pattern : undefined,
      syllabusGroups: dto.syllabusGroups.length ? dto.syllabusGroups : undefined,
      processSteps: dto.processSteps,
      faqs: dto.faqs.length ? dto.faqs : examFactFaqs(dto),
      collegeSlugs: dto.institutions.map((institution) => institution.slug),
      dates: (dto.dates ?? []).map((row) => ({ label: row.label, session: row.academicSession, startsOn: row.startsOn, endsOn: row.endsOn, dateText: row.dateText, sourceUrl: row.sourceUrl })),
      documents: (dto.documents ?? []).map((doc) => ({ title: doc.title, type: doc.docType, session: doc.academicSession, url: doc.url })),
    },
    colleges: dto.institutions.map((institution) => ({ slug: institution.slug, name: institution.name, city: cityName(institution.location), type: institution.ownership.label, hasDetailPage: true })),
    courses: dto.programs.map((program) => ({ slug: program.slug, name: program.name, degree: program.degree.label, hasDetailPage: true })),
    related: related.map(toExam),
  }
})
