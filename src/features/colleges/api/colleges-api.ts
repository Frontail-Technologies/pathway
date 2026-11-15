import { cache } from 'react'
import { collegeFactFaqs } from '../utils'
import { catalogGet, catalogList, isNotFound, seg, type CatalogQuery } from '@/services/api/catalog'
import { cityName, durationText, formatLakh, formatLakhShort, formatLpa, labels, lakhNumber, placementLabel, placementValue, stateName, type Place, type TermRef } from '@/features/catalog/format'
import type { CollegeListItem as FixtureCollege } from '../data/colleges'
import type { CollegeDetailData, CollegeGalleryCategory } from '../data/college-detail'
import { emptyCollegeFacets, type CollegeFacets } from '../data/listing-filters'

type PlacementStat = { metric: string; label: string; amountPaise: number | null; percent: number | null; count: number | null; countIsMinimum: boolean; academicYear?: string | null }

type RankingDto = { framework: string; category: string; rank: number; year: number }

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
  ranking?: RankingDto | null
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

type KeyFactsDto = { sanctionedIntake: number | null; studentCount: number | null; phdStudentCount: number | null; facultyCount: number | null; academicYear: string | null }
type RankingRowDto = { framework: string; category: string; year: number; rank: number | null; rankBand: string | null; score: number | null }
type CutoffSetDto = { exam: string; examLabel: string; year: number; round: number | null; rows: { programLabel: string; quota: string; openingRank: number | null; closingRank: number | null }[] }

type InstitutionDetailDto = InstitutionListDto & {
  fullName: string | null
  establishedYear: number | null
  naacGrade: string | null
  keyFacts?: KeyFactsDto | null
  rankings?: RankingRowDto[]
  cutoffs?: CutoffSetDto[]
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

export type CollegeRanking = { source: string; rank: number; year: number; category: string }

export type CollegeListItem = FixtureCollege & {
  hasDetailPage: boolean
  ranking: CollegeRanking | null
  instituteStatus: string
  packageValue: string
  packageLabel: string
  exams: string[]
}

const rankingCategory: Record<string, string> = { overall: '', university: 'University', engineering: 'Engineering', management: 'Management', medical: 'Medical', pharmacy: 'Pharmacy', law: 'Law', architecture: 'Architecture', dental: 'Dental', research: 'Research', college: 'College', agriculture: 'Agriculture', innovation: 'Innovation' }

function packageLabel(stat: PlacementStat | null) {
  if (!stat?.amountPaise) return ''
  const kind = stat.metric === 'median_package' ? 'Median package' : stat.metric === 'highest_package' ? 'Highest package' : 'Average package'
  const level = /^(UG|PG)/.exec(stat.label)?.[1]
  return level ? `${kind} (${level})` : kind
}

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
    placement: dto.placementHighlight?.amountPaise ? formatLpa(dto.placementHighlight.amountPaise) : '',
    rating: dto.rating ?? 0,
    reviewCount: dto.reviewCount,
    verified: dto.verified,
    sponsored: dto.sponsored,
    hasDetailPage: true,
    ranking: dto.ranking ? { source: dto.ranking.framework, rank: dto.ranking.rank, year: dto.ranking.year, category: rankingCategory[dto.ranking.category] ?? dto.ranking.category } : null,
    instituteStatus: dto.instituteStatus ?? '',
    packageValue: dto.placementHighlight?.amountPaise ? formatLpa(dto.placementHighlight.amountPaise) : '',
    packageLabel: packageLabel(dto.placementHighlight),
    exams: labels(dto.exams),
  }
}

export const listColleges = (query: CatalogQuery) => catalogList('/institutions', query, toCollegeListItem)

export const getCollegeFacets = cache(async (): Promise<CollegeFacets> => catalogGet<CollegeFacets>('/institutions/facets').catch(() => emptyCollegeFacets))

const galleryCategories: CollegeGalleryCategory[] = ['Campus', 'Library', 'Classrooms', 'Hostel', 'Labs', 'Sports']
const statLabels: Record<string, string> = { median_package: 'Median Package', average_package: 'Average Package', highest_package: 'Highest Package', placement_rate: 'Placement Rate', recruiter_count: 'Recruiters' }

function toCollegeDetail(dto: InstitutionDetailDto): CollegeDetailData {
  const card = toCollegeListItem(dto)
  const approval = dto.approvals.join(' / ')
  const stats = dto.placementStats.filter((stat, _index, all) => !(stat.metric === 'average_package' && all.some((other) => other.metric === 'median_package' && other.label === stat.label)))
  const latestRankingYear = Math.max(0, ...(dto.rankings ?? []).map((row) => row.year))
  const rankingRows = (dto.rankings ?? [])
    .filter((row) => row.year === latestRankingYear)
    .map((row) => ({ source: row.framework, category: rankingCategory[row.category] || 'Overall', year: row.year, rank: row.rank, band: row.rankBand, score: row.score }))
    .sort((a, b) => (a.category === 'Overall' ? -1 : b.category === 'Overall' ? 1 : (a.rank ?? 9999) - (b.rank ?? 9999)))
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
    naacGrade: dto.naacGrade ?? undefined,
    keyFacts: dto.keyFacts
      ? { students: dto.keyFacts.studentCount, phdStudents: dto.keyFacts.phdStudentCount, faculty: dto.keyFacts.facultyCount, intake: dto.keyFacts.sanctionedIntake, year: dto.keyFacts.academicYear }
      : null,
    rankings: rankingRows,
    cutoffs: (dto.cutoffs ?? []).map((set) => ({
      exam: set.exam,
      examLabel: set.examLabel,
      year: set.year,
      round: set.round,
      rows: set.rows.map((row) => ({ program: row.programLabel, quota: row.quota, opening: row.openingRank, closing: row.closingRank })),
    })),
    placementYear: stats.find((stat) => stat.academicYear)?.academicYear ?? undefined,
    highlights: {
      rank: rankingRows.find((row) => row.rank != null && row.category === 'Overall') ?? rankingRows.find((row) => row.rank != null) ?? null,
      packageValue: card.packageValue,
      packageLabel: card.packageLabel,
      tuition: card.fees.replace(' Lakh', ' L'),
      students: dto.keyFacts?.studentCount ?? null,
    },
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
      href: `/course/${offering.program.slug}`,
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
    placementMetrics: stats.map((stat) => ({ label: placementLabel(stat.label) || statLabels[stat.metric] || stat.metric, value: placementValue(stat) })).filter((metric) => metric.value),
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
    const detail = toCollegeDetail(dto)
    return detail.faqs.length ? detail : { ...detail, faqs: collegeFactFaqs(detail) }
  } catch (error) {
    if (isNotFound(error)) return undefined
    throw error
  }
})
