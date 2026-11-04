import { cache } from 'react'
import { catalogGet, catalogList, isNotFound, seg, type CatalogQuery } from '@/services/api/catalog'
import { cityName, durationText, formatLakh, formatLakhShort, labels, lakhNumber, stateName, type Place, type TermRef } from '@/features/catalog/format'
import type { CollegeListItem as FixtureCollege } from '../data/colleges'
import type { CollegeDetailData, CollegeGalleryCategory } from '../data/college-detail'

type PlacementStat = { metric: string; label: string; amountPaise: number | null; percent: number | null; count: number | null; countIsMinimum: boolean }

export type InstitutionListDto = {
  slug: string
  name: string
  shortName: string | null
  location: Place
  ownership: TermRef
  approvals: string[]
  instituteStatus: string | null
  popularProgram: { slug: string; name: string; degree: TermRef } | null
  studyMode: TermRef | null
  exams: TermRef[]
  annualTuitionPaise: number | null
  placementHighlight: PlacementStat | null
  rating: number | null
  reviewCount: number
  verified: boolean
  sponsored: boolean
  hasDetailPage: boolean
}

type OfferingDto = {
  program: { slug: string; name: string; hasDetailPage: boolean; degree: TermRef; level: TermRef; durationMonths: number | null; durationLabel: string | null }
  studyMode: TermRef | null
  exams: TermRef[]
  eligibility: string | null
  fees: { annualTuitionPaise: number | null; totalProgrammeFeePaise: number | null }
}

type InstitutionDetailDto = InstitutionListDto & {
  fullName: string | null
  establishedYear: number | null
  naacGrade: string | null
  overview: string | null
  ratings: { overall: number | null; faculty: number | null; placements: number | null; infrastructure: number | null; valueForMoney: number | null }
  facilities: TermRef[]
  recruiters: { name: string; isTop: boolean }[]
  placementStats: PlacementStat[]
  gallery: { url: string; alt: string | null; category: string | null }[]
  importantDates: { label: string; dateText: string }[]
  scholarshipNotes: { name: string; eligibility: string | null; benefit: string | null; deadlineText: string | null }[]
  offerings: OfferingDto[]
  admissions: { title: string; exams: TermRef[]; eligibility: string | null; selection: string }[]
  faqs: { question: string; answer: string }[]
}

export type CollegeListItem = FixtureCollege & { hasDetailPage: boolean }

const approvalText = (approvals: string[]) => (approvals.length ? `${approvals.join(' / ')} Approved` : '')

export function toCollegeListItem(dto: InstitutionListDto): CollegeListItem {
  return {
    id: dto.slug,
    slug: dto.slug,
    name: dto.name,
    city: cityName(dto.location),
    state: stateName(dto.location),
    type: dto.ownership.label as FixtureCollege['type'],
    approval: approvalText(dto.approvals),
    degree: dto.popularProgram?.degree.label ?? '',
    popularCourse: dto.popularProgram?.name ?? '',
    fees: formatLakh(dto.annualTuitionPaise),
    feesValue: dto.annualTuitionPaise ? lakhNumber(dto.annualTuitionPaise) : 0,
    exam: labels(dto.exams).join(' / '),
    studyMode: (dto.studyMode?.label ?? 'Full-time') as FixtureCollege['studyMode'],
    placement: dto.placementHighlight ? `${dto.placementHighlight.label} ${dto.placementHighlight.metric === 'median_package' ? 'median' : 'average'}` : '',
    rating: dto.rating ?? 0,
    reviewCount: dto.reviewCount,
    verified: dto.verified,
    sponsored: dto.sponsored,
    hasDetailPage: dto.hasDetailPage,
  }
}

export const listColleges = (query: CatalogQuery) => catalogList('/institutions', query, toCollegeListItem)

const galleryCategories: CollegeGalleryCategory[] = ['Campus', 'Library', 'Classrooms', 'Hostel', 'Labs', 'Sports']
const statLabels: Record<string, string> = { median_package: 'Median Package', average_package: 'Average Package', highest_package: 'Highest Package', placement_rate: 'Placement Rate', recruiter_count: 'Recruiters' }

function toCollegeDetail(dto: InstitutionDetailDto): CollegeDetailData {
  const card = toCollegeListItem(dto)
  const approval = dto.approvals.join(' / ')
  const stats = dto.placementStats.filter((stat, _index, all) => !(stat.metric === 'average_package' && all.some((other) => other.metric === 'median_package' && other.label === stat.label)))
  const ratingRows: [string, number | null][] = [
    ['Faculty', dto.ratings.faculty],
    ['Placements', dto.ratings.placements],
    ['Infrastructure', dto.ratings.infrastructure],
    ['Value for Money', dto.ratings.valueForMoney],
  ]
  return {
    slug: dto.slug,
    name: dto.name,
    fullName: dto.fullName ?? dto.name,
    city: card.city,
    state: card.state,
    type: card.type,
    approval,
    instituteStatus: dto.instituteStatus ?? '',
    established: dto.establishedYear ? String(dto.establishedYear) : '',
    rating: card.rating,
    reviewCount: dto.reviewCount,
    verified: dto.verified,
    sponsored: dto.sponsored,
    gallery: dto.gallery.map((image, index) => ({
      id: `g${index + 1}`,
      src: image.url,
      alt: image.alt ?? `${dto.name} campus`,
      category: (galleryCategories.find((category) => category === image.category) ?? 'Campus') as CollegeGalleryCategory,
    })),
    overviewCopy: dto.overview ?? '',
    facts: [
      { label: 'Established', value: dto.establishedYear ? String(dto.establishedYear) : '' },
      { label: 'Institution Type', value: dto.ownership.label },
      { label: 'Campus', value: card.city },
      { label: 'Approved By', value: approval },
      { label: 'Institute Status', value: dto.instituteStatus ?? '' },
      { label: 'Mode', value: dto.studyMode?.label ?? '' },
    ].filter((fact) => fact.value),
    courses: dto.offerings.map((offering) => ({
      name: offering.program.name,
      level: offering.program.level.slug === 'postgraduate' ? 'PG' : 'UG',
      mode: offering.studyMode?.label ?? '',
      duration: durationText(offering.program.durationMonths, offering.program.durationLabel),
      fees: formatLakh(offering.fees.annualTuitionPaise),
      exam: labels(offering.exams).join(' / '),
      eligibility: offering.eligibility ?? '',
    })),
    fees: dto.offerings
      .filter((offering) => offering.fees.annualTuitionPaise != null)
      .map((offering) => ({
        course: offering.program.name,
        duration: durationText(offering.program.durationMonths, offering.program.durationLabel),
        tuitionFee: formatLakhShort(offering.fees.annualTuitionPaise),
        totalFee: formatLakhShort(offering.fees.totalProgrammeFeePaise),
      })),
    admissions: dto.admissions.map((block) => ({ title: block.title, exam: labels(block.exams).join(' / '), eligibility: block.eligibility ?? '', selection: block.selection })),
    importantDates: dto.importantDates.map((row) => ({ label: row.label, date: row.dateText })),
    placementMetrics: stats.map((stat) => ({ label: statLabels[stat.metric] ?? stat.metric, value: stat.label })),
    recruiters: dto.recruiters.map((recruiter) => recruiter.name),
    facilities: labels(dto.facilities),
    scholarships: dto.scholarshipNotes.map((note) => ({ name: note.name, eligibility: note.eligibility ?? '', benefit: note.benefit ?? '', deadline: note.deadlineText ?? '' })),
    reviewCategories: ratingRows.filter((row): row is [string, number] => row[1] != null).map(([label, value]) => ({ label, value })),
    reviewPreviews: [],
    faqs: dto.faqs,
  }
}

export const getCollegeDetail = cache(async (slug: string): Promise<CollegeDetailData | undefined> => {
  try {
    const dto = await catalogGet<InstitutionDetailDto>(`/institutions/${seg(slug)}`)
    return dto.hasDetailPage ? toCollegeDetail(dto) : undefined
  } catch (error) {
    if (isNotFound(error)) return undefined
    throw error
  }
})
