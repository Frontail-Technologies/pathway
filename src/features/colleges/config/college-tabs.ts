import type { Metadata } from 'next'
import { tabHref, tabMetadata, type DetailTab } from '@/lib/detail-tabs'
import type { CollegeDetailData } from '../data/college-detail'

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
    available: (c) => c.courses.length > 0,
  },
  {
    segment: 'cutoffs',
    label: 'Cutoffs',
    heading: (c) => `${c.name} Cutoffs ${c.cutoffs?.[0]?.year ?? ''}`.trim(),
    description: (c) => `${c.name} JoSAA opening and closing ranks by branch and quota${c.cutoffs?.[0] ? ` for ${c.cutoffs[0].year}` : ''}.`,
    available: (c) => Boolean(c.cutoffs?.length),
  },
  {
    segment: 'admission',
    label: 'Admission',
    section: 'admissions',
    heading: (c) => `${c.name} Admission`,
    description: (c) => `${c.name} admission process: exams, eligibility, selection and important dates.`,
    available: (c) => c.admissions.length > 0 || c.importantDates.length > 0,
  },
  {
    segment: 'placement',
    label: 'Placement',
    section: 'placements',
    heading: (c) => `${c.name} Placements`,
    description: (c) => `${c.name} placement highlights and recruiters that have visited campus.`,
    available: (c) => c.placementMetrics.length > 0 || c.recruiters.length > 0,
  },
  {
    segment: 'rankings',
    label: 'Rankings',
    heading: (c) => `${c.name} Rankings ${c.rankings?.[0]?.year ?? ''}`.trim(),
    description: (c) => `${c.name} NIRF ranks and scores by category.`,
    available: (c) => Boolean(c.rankings?.length),
  },
  {
    segment: 'reviews',
    label: 'Reviews',
    heading: (c) => `${c.name} Reviews`,
    description: (c) => `Student reviews of ${c.name}.`,
    available: (c) => c.reviewPreviews.length > 0 || c.reviewCategories.length > 0,
  },
  {
    segment: 'facilities',
    label: 'Facilities',
    heading: (c) => `${c.name} Facilities`,
    description: (c) => `Campus facilities at ${c.name}: ${c.facilities.slice(0, 4).join(', ')} and more.`,
    available: (c) => c.facilities.length > 0,
  },
  {
    segment: 'scholarships',
    label: 'Scholarships',
    heading: (c) => `${c.name} Scholarships`,
    description: (c) => `Scholarships available to ${c.name} students, with eligibility, benefit and deadlines.`,
    available: (c) => c.scholarships.length > 0,
  },
  {
    segment: 'faqs',
    label: 'FAQs',
    heading: (c) => `${c.name} FAQs`,
    description: (c) => `Frequently asked questions about ${c.name}.`,
    available: (c) => c.faqs.length > 0,
  },
]

export const collegeBase = (slug: string) => `/college/${slug}`
export const collegeTabHref = (slug: string, segment: string) => tabHref(collegeBase(slug), segment)

export function collegeTabMetadata(college: CollegeDetailData | undefined, segment: string): Metadata {
  return tabMetadata(collegeTabs, college, segment, (c) => collegeBase(c.slug), 'College Not Found')
}

