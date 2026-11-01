import type { Metadata } from 'next'
import { tabHref, tabMetadata, type DetailTab } from '@/lib/detail-tabs'
import type { CollegeDetailData } from '../data/college-detail'

/**
 * College detail sub-pages (Shiksha-style): each topic is its own URL under
 * /college/[slug], sharing one header + tab bar layout. `segment: ''` is the
 * overview at /college/[slug].
 */
export const collegeTabs: DetailTab<CollegeDetailData>[] = [
  {
    segment: '',
    label: 'Overview',
    heading: (c) => c.name,
    description: (c) => `${c.fullName}, ${c.city}: courses, fees, admission, placements, facilities and FAQs.`,
  },
  {
    segment: 'courses',
    label: 'Courses & Fees',
    heading: (c) => `${c.name} Courses & Fees`,
    description: (c) => `${c.courses.length} programmes at ${c.name} with fees, duration, accepted exams and eligibility.`,
  },
  {
    segment: 'admission',
    label: 'Admission',
    heading: (c) => `${c.name} Admission`,
    description: (c) => `${c.name} admission process: exams, eligibility, selection and important dates.`,
  },
  {
    segment: 'placement',
    label: 'Placement',
    heading: (c) => `${c.name} Placements`,
    description: (c) => `${c.name} placement highlights and recruiters that have visited campus.`,
  },
  {
    segment: 'reviews',
    label: 'Reviews',
    heading: (c) => `${c.name} Reviews`,
    description: (c) => `Student reviews of ${c.name}.`,
  },
  {
    segment: 'facilities',
    label: 'Facilities',
    heading: (c) => `${c.name} Facilities`,
    description: (c) => `Campus facilities at ${c.name}: ${c.facilities.slice(0, 4).join(', ')} and more.`,
  },
  {
    segment: 'scholarships',
    label: 'Scholarships',
    heading: (c) => `${c.name} Scholarships`,
    description: (c) => `Scholarships available to ${c.name} students, with eligibility, benefit and deadlines.`,
  },
  {
    segment: 'faqs',
    label: 'FAQs',
    heading: (c) => `${c.name} FAQs`,
    description: (c) => `Frequently asked questions about ${c.name}.`,
  },
]

export const collegeBase = (slug: string) => `/college/${slug}`
export const collegeTabHref = (slug: string, segment: string) => tabHref(collegeBase(slug), segment)

export function collegeTabMetadata(college: CollegeDetailData | undefined, segment: string): Metadata {
  return tabMetadata(collegeTabs, college, segment, (c) => collegeBase(c.slug), 'College Not Found')
}

/**
 * Old single-page anchors (/college/x#placements) → new sub-page segment.
 * Used to forward legacy links and bookmarks.
 */
export const legacyCollegeAnchors: Record<string, string> = {
  overview: '',
  courses: 'courses',
  fees: 'courses',
  admissions: 'admission',
  placements: 'placement',
  facilities: 'facilities',
  scholarships: 'scholarships',
  reviews: 'reviews',
  faqs: 'faqs',
}
