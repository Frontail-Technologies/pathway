import type { Metadata } from 'next'
import { tabHref, tabMetadata, type DetailTab } from '@/lib/detail-tabs'
import type { CourseDetailData } from '../data/course-detail'

export const courseTabs: DetailTab<CourseDetailData>[] = [
  { segment: '', label: 'Overview', heading: (c) => c.name, description: (c) => `${c.fullName}: eligibility, fees, syllabus, careers and colleges.` },
  {
    segment: 'eligibility',
    label: 'Eligibility & Exams',
    heading: (c) => `${c.name} Eligibility & Entrance Exams`,
    description: (c) => `${c.name} eligibility (${c.eligibilitySummary}) and accepted entrance exams.`,
    teaser: (c) => `${c.eligibilitySummary} · ${c.exams.length} entrance exams`,
  },
  {
    segment: 'fees',
    label: 'Fees',
    heading: (c) => `${c.name} Fees`,
    description: (c) => `${c.name} fees by college type and fee components.`,
    teaser: (c) => c.feesSummary,
  },
  {
    segment: 'syllabus',
    label: 'Syllabus',
    heading: (c) => `${c.name} Syllabus & Specializations`,
    description: (c) => `${c.name} year-wise syllabus and specializations.`,
    teaser: (c) => `${c.syllabus.length}-year syllabus · ${c.specializations.length} specializations`,
  },
  {
    segment: 'careers',
    label: 'Careers',
    heading: (c) => `${c.name} Careers & Jobs`,
    description: (c) => `Career options and roles after ${c.name}.`,
    teaser: (c) => `${c.careers.length} career paths after ${c.degree}`,
  },
  {
    segment: 'colleges',
    label: 'Colleges',
    heading: (c) => `${c.name} Colleges`,
    description: (c) => `Colleges offering ${c.name}.`,
    teaser: (c) => `${c.collegesCount} colleges offer this course`,
  },
  {
    segment: 'faqs',
    label: 'FAQs',
    heading: (c) => `${c.name} FAQs`,
    description: (c) => `Frequently asked questions about ${c.name}.`,
    teaser: () => 'Common questions answered',
  },
]

export const courseBase = (slug: string) => `/course/${slug}`
export const courseTabHref = (slug: string, segment: string) => tabHref(courseBase(slug), segment)

export function courseTabMetadata(course: CourseDetailData | undefined, segment: string): Metadata {
  return tabMetadata(courseTabs, course, segment, (c) => courseBase(c.slug), 'Course Not Found')
}

export const legacyCourseAnchors: Record<string, string> = {
  overview: '',
  related: '',
  eligibility: 'eligibility',
  exams: 'eligibility',
  fees: 'fees',
  specializations: 'syllabus',
  syllabus: 'syllabus',
  careers: 'careers',
  colleges: 'colleges',
  faqs: 'faqs',
}
