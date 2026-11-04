import { cache } from 'react'
import { catalogGet, catalogList, isNotFound, seg, type CatalogQuery } from '@/services/api/catalog'
import { cityName, durationText, formatLakhRange, formatLakhShort, labels, lakhNumber, type Place, type TermRef } from '@/features/catalog/format'
import type { CourseListItem as FixtureCourse } from '../data/courses'
import type { CourseDetailData } from '../data/course-detail'

type Fees = { typicalPaise: number | null; minPaise: number | null; maxPaise: number | null }

export type ProgramListDto = {
  slug: string
  name: string
  degree: TermRef
  level: TermRef
  stream: TermRef | null
  specialization: TermRef | null
  studyMode: TermRef | null
  durationMonths: number | null
  durationLabel: string | null
  eligibilitySummary: string | null
  entranceExams: TermRef[]
  fees: Fees
  careerAreas: string[]
  collegesOffering: number
  hasDetailPage: boolean
}

type ProgramDetailDto = ProgramListDto & {
  listed: boolean
  fullName: string | null
  overview: string | null
  eligibility: { academic: string | null; subjects: string | null; minimumMarks: string | null; entrance: string | null; note: string | null }
  exams: { exam: TermRef; isPrimary: boolean; purpose: string | null; scopeLabel: string | null }[]
  feeRanges: { minPaise: number; maxPaise: number; ownership: TermRef }[]
  feeComponents: { minPaise: number; maxPaise: number; label: string }[]
  specializations: { name: string; description: string | null }[]
  curriculum: { yearLabel: string; subjects: string[] }[]
  careers: { role: string; description: string | null }[]
  careerMetrics: { label: string; value: string }[]
  colleges: { institution: { slug: string; name: string; location: Place; ownership: TermRef; rating: number | null; verified: boolean; hasDetailPage: boolean }; exams: TermRef[]; annualTuitionPaise: number | null }[]
  related: { slug: string; name: string; level: TermRef; durationLabel: string | null; hasDetailPage: boolean }[]
  faqs: { question: string; answer: string }[]
}

export type CourseListItem = FixtureCourse & { hasDetailPage: boolean }

const feesText = (fees: Fees) => formatLakhRange(fees.minPaise ?? fees.typicalPaise, fees.maxPaise ?? fees.typicalPaise)

export function toCourseListItem(dto: ProgramListDto): CourseListItem {
  return {
    id: dto.slug,
    slug: dto.slug,
    name: dto.name,
    degree: dto.degree.label,
    level: dto.level.label as FixtureCourse['level'],
    stream: dto.stream?.label ?? '',
    specialization: dto.specialization?.label ?? '',
    duration: durationText(dto.durationMonths, dto.durationLabel),
    durationValue: dto.durationMonths ? dto.durationMonths / 12 : 0,
    studyMode: (dto.studyMode?.label ?? 'Full-time') as FixtureCourse['studyMode'],
    eligibility: dto.eligibilitySummary ?? '',
    entranceExams: labels(dto.entranceExams),
    fees: feesText(dto.fees),
    feesValue: dto.fees.typicalPaise ? lakhNumber(dto.fees.typicalPaise) : 0,
    careerAreas: dto.careerAreas,
    collegesOffering: dto.collegesOffering,
    hasDetailPage: dto.hasDetailPage,
  }
}

export const listCourses = (query: CatalogQuery) => catalogList('/programs', query, toCourseListItem)

export const courseHref = (course: { slug: string; name: string; hasDetailPage: boolean }) => (course.hasDetailPage ? `/course/${course.slug}` : `/courses?q=${encodeURIComponent(course.name)}`)
export const collegeHref = (college: { slug: string; name: string; hasDetailPage: boolean }) => (college.hasDetailPage ? `/college/${college.slug}` : `/colleges?q=${encodeURIComponent(college.name)}`)

function toCourseDetail(dto: ProgramDetailDto): CourseDetailData {
  const course = toCourseListItem(dto)
  const examsSummary = dto.exams.filter((exam) => exam.isPrimary).map((exam) => exam.exam.label).join(' / ') || labels(dto.entranceExams).join(' / ')
  const mode = dto.studyMode?.label ?? ''
  const colleges = dto.collegesOffering ? String(dto.collegesOffering) : ''
  return {
    slug: dto.slug,
    name: dto.name,
    fullName: dto.fullName ?? dto.name,
    degree: course.degree,
    level: course.level,
    stream: course.stream,
    specialization: course.specialization,
    duration: course.duration,
    mode,
    eligibilitySummary: course.eligibility,
    examsSummary,
    feesSummary: course.fees,
    collegesCount: colleges,
    overviewCopy: dto.overview ?? '',
    facts: [
      { label: 'Level', value: course.level },
      { label: 'Duration', value: course.duration },
      { label: 'Mode', value: mode },
      { label: 'Stream', value: course.stream },
      { label: 'Degree', value: course.degree },
      { label: 'Typical Fees', value: course.fees },
      { label: 'Colleges', value: colleges },
    ].filter((fact) => fact.value),
    eligibility: {
      academic: dto.eligibility.academic ?? '',
      subjects: dto.eligibility.subjects ?? '',
      minimumMarks: dto.eligibility.minimumMarks ?? '',
      entrance: dto.eligibility.entrance ?? '',
      note: dto.eligibility.note ?? '',
    },
    fees: dto.feeRanges.map((row) => ({ institutionType: row.ownership.label, feeRange: formatLakhRange(row.minPaise, row.maxPaise) })),
    feeComponents: dto.feeComponents.map((row) => ({ label: row.label, value: formatLakhRange(row.minPaise, row.maxPaise) })),
    exams: dto.exams.map((row) => ({ name: row.exam.label, level: row.scopeLabel ?? '', purpose: row.purpose ?? '' })),
    specializations: dto.specializations.map((row) => ({ name: row.name, description: row.description ?? undefined })),
    syllabus: dto.curriculum.map((row) => ({ year: row.yearLabel, subjects: row.subjects })),
    careers: dto.careers.map((row) => ({ role: row.role, description: row.description ?? '' })),
    careerMetrics: dto.careerMetrics,
    colleges: dto.colleges.map((row) => ({
      slug: row.institution.slug,
      name: row.institution.name,
      city: cityName(row.institution.location),
      type: row.institution.ownership.label,
      exam: labels(row.exams).join(' / '),
      fees: formatLakhShort(row.annualTuitionPaise),
      verified: row.institution.verified,
      rating: row.institution.rating ?? undefined,
      href: collegeHref(row.institution),
    })),
    relatedCourses: dto.related.map((row) => ({ slug: row.slug, name: row.name, level: row.level.label, duration: row.durationLabel ?? '', href: courseHref(row) })),
    faqs: dto.faqs,
  }
}

export const getCourseDetail = cache(async (slug: string): Promise<CourseDetailData | undefined> => {
  try {
    const dto = await catalogGet<ProgramDetailDto>(`/programs/${seg(slug)}`)
    return dto.hasDetailPage ? toCourseDetail(dto) : undefined
  } catch (error) {
    if (isNotFound(error)) return undefined
    throw error
  }
})
