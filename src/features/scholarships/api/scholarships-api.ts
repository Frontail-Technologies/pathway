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
  officialDocuments?: { title: string; docType: string; academicSession: string | null; url: string }[]
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
    hasDetailPage: true,
  }
}

export const listScholarships = (query: CatalogQuery) => catalogList('/scholarships', query, toScholarshipListItem)

export const scholarshipHref = (item: { slug: string }) => `/scholarship/${item.slug}`

function generatedOverview(card: ScholarshipListItem) {
  const levels = card.educationLevels.length ? card.educationLevels.join(' and ').toLowerCase() : ''
  const type = card.scholarshipType ? `${card.scholarshipType.toLowerCase()} ` : ''
  const parts = [`${card.name} is a ${type}scholarship offered by ${card.provider}${levels ? ` for ${levels} students` : ''}.`]
  if (card.benefitLabel) parts.push(`The award is ${card.benefitLabel}.`)
  if (card.deadlineDisplay && card.deadlineDisplay !== 'Not announced') parts.push(`Applications close on ${card.deadlineDisplay}.`)
  return parts.join(' ')
}

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
    overviewCopy: dto.overview ?? generatedOverview(card),
    officialDocuments: (dto.officialDocuments ?? []).map((doc) => ({ title: doc.title, type: doc.docType, session: doc.academicSession, url: doc.url })),
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

async function similarScholarships(slug: string): Promise<ScholarshipRelatedItem[]> {
  const list = await listScholarships({ sort: 'closing-soon', limit: '5' }).catch(() => null)
  return (list?.items ?? [])
    .filter((item) => item.slug !== slug)
    .slice(0, 4)
    .map((item) => ({ slug: item.slug, name: item.name, provider: item.provider, benefitLabel: item.benefitLabel, deadlineDisplay: item.deadlineDisplay, status: item.status, href: scholarshipHref(item) }))
}

function scholarshipFactFaqs(detail: ScholarshipDetailData) {
  const levels = detail.educationLevels.join(' and ').toLowerCase()
  const faqs: ({ question: string; answer: string } | null)[] = [
    { question: `Who offers the ${detail.name}?`, answer: `The ${detail.name} is offered by ${detail.provider}.` },
    detail.benefitLabel ? { question: `How much is the ${detail.name}?`, answer: `The benefit is ${detail.benefitLabel}${detail.benefits.duration ? `, for ${detail.benefits.duration.toLowerCase()}` : ''}.` } : null,
    levels ? { question: `Who can apply for the ${detail.name}?`, answer: `It is open to ${levels} students${detail.streams.length ? ` in ${detail.streams.join(', ')}` : ' in all streams'}.` } : null,
    { question: `What is the last date to apply?`, answer: detail.deadlineDisplay && detail.deadlineDisplay !== 'Not announced' ? `The recorded deadline is ${detail.deadlineDisplay}. Confirm it on the provider's official website.` : `The provider has not announced a deadline yet.` },
    detail.officialApplyUrl ? { question: `How do I apply?`, answer: `Applications are made on ${detail.provider}'s official website. Pathway links to it but does not process applications.` } : null,
  ]
  return faqs.filter((faq): faq is { question: string; answer: string } => Boolean(faq))
}

export const getScholarshipDetail = cache(async (slug: string): Promise<ScholarshipDetailData | undefined> => {
  try {
    const dto = await catalogGet<ScholarshipDetailDto>(`/scholarships/${seg(slug)}`)
    const detail = toScholarshipDetail(dto)
    const related = detail.relatedScholarships.length ? detail.relatedScholarships : await similarScholarships(detail.slug)
    return { ...detail, relatedScholarships: related, faqs: detail.faqs.length ? detail.faqs : scholarshipFactFaqs(detail) }
  } catch (error) {
    if (isNotFound(error)) return undefined
    throw error
  }
})
