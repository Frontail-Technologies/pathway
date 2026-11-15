import type { Metadata } from 'next'
import { tabHref, tabMetadata, type DetailTab } from '@/lib/detail-tabs'
import type { DetailedExam } from '../api/exams-api'

export type { DetailedExam }

export const examColleges = (exam: DetailedExam) => exam.colleges
export const examCourses = (exam: DetailedExam) => exam.courses

export const examTabs: DetailTab<DetailedExam>[] = [
  { segment: '', label: 'Overview', heading: (e) => `${e.shortName}: ${e.name}`, description: (e) => e.description },
  {
    segment: 'dates',
    label: 'Dates',
    heading: (e) => `${e.shortName} Important Dates`,
    description: (e) => `${e.shortName} application, exam and result dates from official notices.`,
    available: (e) => Boolean(e.detail.dates?.length),
  },
  {
    segment: 'eligibility',
    label: 'Eligibility',
    heading: (e) => `${e.shortName} Eligibility`,
    description: (e) => `${e.shortName} eligibility criteria: education, age and attempts.`,
    teaser: () => 'Who can apply: education, age and attempts',
    available: (e) => Boolean(e.detail.eligibility?.length),
  },
  {
    segment: 'pattern',
    label: 'Pattern & Syllabus',
    heading: (e) => `${e.shortName} Exam Pattern & Syllabus`,
    description: (e) => `${e.shortName} exam pattern and syllabus areas.`,
    teaser: (e) => (e.detail.syllabusGroups?.length ? `Pattern plus ${e.detail.syllabusGroups.length} syllabus areas` : 'Mode, sections and marking'),
    available: (e) => Boolean(e.detail.pattern?.length || e.detail.syllabusGroups?.length),
  },
  {
    segment: 'process',
    label: 'Process',
    heading: (e) => `${e.shortName} Exam & Admission Process`,
    description: (e) => `Step-by-step ${e.shortName} exam and admission process.`,
    teaser: (e) => `${e.detail.processSteps.length} steps from registration to admission`,
    available: (e) => e.detail.processSteps.length > 0,
  },
  {
    segment: 'notices',
    label: 'Notices',
    heading: (e) => `${e.shortName} Official Notices`,
    description: (e) => `Official ${e.shortName} notifications, information bulletins and syllabus files${e.conductingBody ? ` from ${e.conductingBody}` : ''}.`,
    teaser: (e) => `${e.detail.documents?.length ?? 0} official notices and bulletins`,
    available: (e) => Boolean(e.detail.documents?.length),
  },
  {
    segment: 'colleges',
    label: 'Colleges',
    heading: (e) => `Colleges Accepting ${e.shortName}`,
    description: (e) => `Colleges on Pathway related to ${e.shortName}.`,
    teaser: (e) => `${examColleges(e).length} related colleges on Pathway`,
    available: (e) => examColleges(e).length > 0,
  },
  {
    segment: 'courses',
    label: 'Courses',
    heading: (e) => `Courses Accepting ${e.shortName}`,
    description: (e) => `Courses that accept ${e.shortName} scores.`,
    teaser: (e) => `${examCourses(e).length} courses accept ${e.shortName}`,
    available: (e) => examCourses(e).length > 0,
  },
  {
    segment: 'faqs',
    label: 'FAQs',
    heading: (e) => `${e.shortName} FAQs`,
    description: (e) => `Frequently asked questions about ${e.shortName}.`,
    teaser: (e) => `${e.detail.faqs.length} common questions answered`,
    available: (e) => e.detail.faqs.length > 0,
  },
]

export const examBase = (slug: string) => `/exam/${slug}`
export const examTabHref = (slug: string, segment: string) => tabHref(examBase(slug), segment)

export function examTabMetadata(exam: DetailedExam | undefined, segment: string): Metadata {
  return tabMetadata(examTabs, exam, segment, (e) => examBase(e.slug), 'Exam Not Found')
}
