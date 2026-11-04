import { cache } from 'react'
import { catalogGet, catalogList, isNotFound, seg, type CatalogQuery } from '@/services/api/catalog'
import { formatDate, labels, type TermRef } from '@/features/catalog/format'
import type { EducationLevel, GenderEligibility, IncomeLimitBucket, ProviderType, ScholarshipListItem as FixtureScholarship, ScholarshipType } from '../data/scholarships'
import type { RelatedScholarshipPreview, ScholarshipDetailData as FixtureDetail } from '../data/scholarship-detail'
import type { CatalogApplicationStatus } from '../data/status'

type LabelValue = { label: string; value: string }

export type ScholarshipListDto = {
  slug: string
  name: string
  provider: { name: string; initials: string | null; type: 'government' | 'private' | 'university' | 'trust_foundation' }
  scholarshipType: 'merit' | 'need' | 'minority' | 'sports' | 'research' | 'women' | 'disability'
  educationLevels: TermRef[]
  streams: TermRef[]
  states: { slug: string; name: string }[]
  categories: TermRef[]
  gender: TermRef
  incomeLimitBucket: 'below_2_5_lakh' | 'from_2_5_to_5_lakh' | 'from_5_to_8_lakh' | 'above_8_lakh' | null
  benefit: { label: string; valuePaise: number }
  applicationWindow: { opensOn: string | null; deadlineOn: string | null }
  applicationStatus: CatalogApplicationStatus
  daysRemaining: number | null
  shortEligibility: string[]
  officialApplyUrl: string | null
  featured: boolean
  hasDetailPage: boolean
}

type ScholarshipDetailDto = ScholarshipListDto & {
  overview: string | null
  eligibilitySnapshot: string[]
  benefits: { amount: string | null; coverage: string | null; duration: string | null; disbursement: string | null; note: string | null }
  eligibility: { rows: LabelValue[]; note: string | null }
  importantDates: LabelValue[]
  documents: string[]
  applicableCourses: string[]
  applicableLocations: string[]
  applicationSteps: string[]
  selectionProcess: string[]
  importantNotes: string[]
  related: { slug: string; name: string; providerName: string; benefitLabel: string; deadlineOn: string | null; applicationStatus: CatalogApplicationStatus; hasDetailPage: boolean }[]
  faqs: { question: string; answer: string }[]
}

export type ScholarshipListItem = Omit<FixtureScholarship, 'status'> & { status: CatalogApplicationStatus; daysRemaining: number | null; hasDetailPage: boolean }
export type ScholarshipRelatedItem = Omit<RelatedScholarshipPreview, 'status'> & { status: CatalogApplicationStatus }
export type ScholarshipDetailData = Omit<FixtureDetail, 'status' | 'relatedScholarships'> & { status: CatalogApplicationStatus; relatedScholarships: ScholarshipRelatedItem[] }

const providerTypes: Record<ScholarshipListDto['provider']['type'], ProviderType> = { government: 'Government', private: 'Private', university: 'University', trust_foundation: 'Trust / Foundation' }
const scholarshipTypes: Record<ScholarshipListDto['scholarshipType'], ScholarshipType> = {
  merit: 'Merit Based',
  need: 'Need Based',
  minority: 'Minority',
  sports: 'Sports',
  research: 'Research',
  women: 'Women',
  disability: 'Disability',
}
const incomeBuckets: Record<NonNullable<ScholarshipListDto['incomeLimitBucket']>, IncomeLimitBucket> = {
  below_2_5_lakh: 'Below ₹2.5 Lakh',
  from_2_5_to_5_lakh: '₹2.5–5 Lakh',
  from_5_to_8_lakh: '₹5–8 Lakh',
  above_8_lakh: 'Above ₹8 Lakh',
}

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter((part) => /^[A-Za-z]/.test(part))
    .map((part) => part[0])
    .slice(0, 4)
    .join('')
    .toUpperCase()

export function toScholarshipListItem(dto: ScholarshipListDto): ScholarshipListItem {
  return {
    id: dto.slug,
    slug: dto.slug,
    name: dto.name,
    provider: dto.provider.name,
    providerType: providerTypes[dto.provider.type],
    providerInitials: dto.provider.initials ?? initialsOf(dto.provider.name),
    scholarshipType: scholarshipTypes[dto.scholarshipType],
    educationLevels: labels(dto.educationLevels) as EducationLevel[],
    streams: labels(dto.streams),
    states: dto.states.map((state) => state.name),
    categories: labels(dto.categories),
    genderEligibility: dto.gender.label as GenderEligibility,
    incomeLimitBucket: dto.incomeLimitBucket ? incomeBuckets[dto.incomeLimitBucket] : undefined,
    benefitLabel: dto.benefit.label,
    benefitValue: Math.round(dto.benefit.valuePaise / 100),
    deadline: dto.applicationWindow.deadlineOn ?? '',
    deadlineDisplay: dto.applicationWindow.deadlineOn ? formatDate(dto.applicationWindow.deadlineOn) : 'Not announced',
    status: dto.applicationStatus,
    daysRemaining: dto.daysRemaining,
    shortEligibility: dto.shortEligibility,
    officialApplyUrl: dto.officialApplyUrl ?? undefined,
    featured: dto.featured,
    hasDetailPage: dto.hasDetailPage,
  }
}

export const listScholarships = (query: CatalogQuery) => catalogList('/scholarships', query, toScholarshipListItem)

export const scholarshipHref = (item: { slug: string; name: string; hasDetailPage: boolean }) => (item.hasDetailPage ? `/scholarship/${item.slug}` : `/scholarships?q=${encodeURIComponent(item.name)}`)

function toScholarshipDetail(dto: ScholarshipDetailDto): ScholarshipDetailData {
  const card = toScholarshipListItem(dto)
  return {
    slug: dto.slug,
    name: dto.name,
    provider: card.provider,
    providerType: card.providerType,
    providerInitials: card.providerInitials,
    scholarshipType: card.scholarshipType,
    status: card.status,
    educationLevels: card.educationLevels,
    streams: card.streams,
    benefitLabel: card.benefitLabel,
    deadline: card.deadline,
    deadlineDisplay: card.deadlineDisplay,
    overviewCopy: dto.overview ?? '',
    eligibilitySnapshot: dto.eligibilitySnapshot,
    benefits: {
      amount: dto.benefits.amount ?? card.benefitLabel,
      coverage: dto.benefits.coverage ?? '',
      duration: dto.benefits.duration ?? '',
      disbursement: dto.benefits.disbursement ?? '',
      note: dto.benefits.note ?? '',
    },
    eligibility: { rows: dto.eligibility.rows, note: dto.eligibility.note ?? '' },
    importantDates: dto.importantDates,
    documents: dto.documents,
    applicableCourses: dto.applicableCourses,
    applicableLocations: dto.applicableLocations,
    applicationSteps: dto.applicationSteps,
    selectionProcess: dto.selectionProcess,
    importantNotes: dto.importantNotes,
    officialApplyUrl: card.officialApplyUrl,
    relatedScholarships: dto.related.map((item) => ({
      slug: item.slug,
      name: item.name,
      provider: item.providerName,
      benefitLabel: item.benefitLabel,
      deadlineDisplay: item.deadlineOn ? formatDate(item.deadlineOn) : 'Not announced',
      status: item.applicationStatus,
      href: scholarshipHref(item),
    })),
    faqs: dto.faqs,
  }
}

export const getScholarshipDetail = cache(async (slug: string): Promise<ScholarshipDetailData | undefined> => {
  try {
    const dto = await catalogGet<ScholarshipDetailDto>(`/scholarships/${seg(slug)}`)
    return dto.hasDetailPage ? toScholarshipDetail(dto) : undefined
  } catch (error) {
    if (isNotFound(error)) return undefined
    throw error
  }
})
