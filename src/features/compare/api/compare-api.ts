import { catalogGet, catalogList } from '@/services/api/catalog'
import { cityName, formatLakh, formatRupees, labels, stateName, type Place, type TermRef } from '@/features/catalog/format'
import type { CollegeComparisonItem } from '../data/college-compare'
import type { Degree, ProgramSnapshot } from '../data/programs'

export const MAX_COMPARE = 3

type Figure = { label: string; amountPaise: number | null; percent: number | null } | null

type CompareInstitutionDto = {
  slug: string
  name: string
  shortName: string | null
  logoUrl: string | null
  location: Place
  ownership: TermRef
  rating: number | null
  reviewCount: number
  verified: boolean
  hasDetailPage: boolean
  establishedYear: number | null
  naacGrade: string | null
  approvals: string[]
  instituteStatus: string | null
  totalProgramsLabel: string | null
  fees: { hostelPaisePerYear: number | null; otherPaisePerYear: number | null }
  placements: { averagePackage: Figure; highestPackage: Figure; placementRate: Figure; topRecruiters: string[] }
  ratings: { overall: number | null; faculty: number | null; placements: number | null; infrastructure: number | null; valueForMoney: number | null }
  facilityFlags: CollegeComparisonItem['facilities']
}

type CompareProgramDto = {
  slug: string
  degree: TermRef
  course: string
  level: TermRef
  durationLabel: string | null
  studyMode: TermRef | null
  entranceExams: TermRef[]
  eligibility: string | null
  admissionRoute: string | null
  annualTuitionPaise: number | null
}

export type ProgramOption = { slug: string; name: string; degree: string; course: string }

type CompareEntryDto = { institution: CompareInstitutionDto; program: CompareProgramDto | null; programOptions: (ProgramOption & { degree: TermRef })[] }
type CompareResponseDto = { maxSlots: number; defaultApplied: boolean; entries: CompareEntryDto[] }

export type CompareEntry = { college: CollegeComparisonItem; program: ProgramSnapshot & { slug: string }; options: ProgramOption[] }

const notAvailable = 'Not available'
const perYear = (paise: number | null) => (paise == null ? notAvailable : `${formatRupees(paise)}/yr`)

function toCollege(dto: CompareInstitutionDto): CollegeComparisonItem {
  const location = [cityName(dto.location), stateName(dto.location)].filter(Boolean).join(', ')
  return {
    slug: dto.slug,
    href: dto.hasDetailPage ? `/college/${dto.slug}` : `/colleges?q=${encodeURIComponent(dto.name)}`,
    logo: dto.logoUrl ?? '',
    name: dto.name,
    shortName: dto.shortName ?? dto.name,
    location,
    type: dto.ownership.label,
    rating: dto.rating ?? 0,
    reviewCount: dto.reviewCount,
    verified: dto.verified,
    established: dto.establishedYear ? String(dto.establishedYear) : notAvailable,
    naacGrade: dto.naacGrade ?? notAvailable,
    approvedBy: dto.approvals.join(', ') || notAvailable,
    instituteStatus: dto.instituteStatus ?? notAvailable,
    totalPrograms: dto.totalProgramsLabel ?? notAvailable,
    fees: { hostel: perYear(dto.fees.hostelPaisePerYear), other: perYear(dto.fees.otherPaisePerYear) },
    placements: {
      averagePackage: dto.placements.averagePackage?.label ?? notAvailable,
      highestPackage: dto.placements.highestPackage?.label ?? notAvailable,
      placementRate: dto.placements.placementRate?.label ?? notAvailable,
      topRecruiters: dto.placements.topRecruiters,
    },
    ratings: {
      overall: dto.ratings.overall ?? 0,
      faculty: dto.ratings.faculty ?? 0,
      placements: dto.ratings.placements ?? 0,
      infrastructure: dto.ratings.infrastructure ?? 0,
      valueForMoney: dto.ratings.valueForMoney ?? 0,
    },
    facilities: dto.facilityFlags,
  }
}

function toProgram(dto: CompareProgramDto | null): ProgramSnapshot & { slug: string } {
  if (!dto) {
    return { slug: '', degree: '' as Degree, course: notAvailable, courseLevel: notAvailable, duration: notAvailable, studyMode: notAvailable, entranceExam: notAvailable, eligibility: notAvailable, admissionRoute: notAvailable, tuition: notAvailable }
  }
  return {
    slug: dto.slug,
    degree: dto.degree.label as Degree,
    course: dto.course,
    courseLevel: dto.level.label,
    duration: dto.durationLabel ?? notAvailable,
    studyMode: dto.studyMode?.label ?? notAvailable,
    entranceExam: labels(dto.entranceExams).join(', ') || notAvailable,
    eligibility: dto.eligibility ?? notAvailable,
    admissionRoute: dto.admissionRoute ?? notAvailable,
    tuition: dto.annualTuitionPaise == null ? notAvailable : `${formatLakh(dto.annualTuitionPaise)}/yr`,
  }
}

export function parseCompareQuery(params: URLSearchParams) {
  const colleges = [...new Set((params.get('colleges') ?? '').split(',').map((slug) => slug.trim()).filter(Boolean))].slice(0, MAX_COMPARE)
  const programs = (params.get('programs') ?? '').split(',').map((slug) => slug.trim())
  return { colleges, programs: colleges.map((_, index) => programs[index] ?? '') }
}

export type Comparison = { entries: CompareEntry[]; defaultApplied: boolean }

export async function getComparison(colleges: string[], programs: string[] = []): Promise<Comparison> {
  const query: Record<string, string> = {}
  if (colleges.length) query.colleges = colleges.join(',')
  if (programs.some(Boolean)) query.programs = programs.join(',')
  const data = await catalogGet<CompareResponseDto>('/compare/colleges', query)
  return {
    defaultApplied: data.defaultApplied,
    entries: data.entries.map((entry) => ({
      college: toCollege(entry.institution),
      program: toProgram(entry.program),
      options: entry.programOptions.map((option) => ({ slug: option.slug, name: option.name, degree: option.degree.label, course: option.course })),
    })),
  }
}

export async function getComparableColleges(slugs: string[]): Promise<Map<string, CompareEntry>> {
  const unique = [...new Set(slugs)]
  const chunks = Array.from({ length: Math.ceil(unique.length / MAX_COMPARE) }, (_, index) => unique.slice(index * MAX_COMPARE, index * MAX_COMPARE + MAX_COMPARE))
  const results = await Promise.all(chunks.map((chunk) => getComparison(chunk)))
  return new Map(results.flatMap((result) => result.entries).map((entry) => [entry.college.slug, entry]))
}

export type PickerCollege = { slug: string; name: string; shortName: string; location: string; type: string; rating: number }

type InstitutionListDto = { slug: string; name: string; shortName: string | null; location: Place; ownership: TermRef; rating: number | null }

export const listPickerColleges = async () =>
  (
    await catalogList('/institutions', { limit: '100' }, (dto: InstitutionListDto) => ({
      slug: dto.slug,
      name: dto.name,
      shortName: dto.shortName ?? dto.name,
      location: [cityName(dto.location), stateName(dto.location)].filter(Boolean).join(', '),
      type: dto.ownership.label,
      rating: dto.rating ?? 0,
    }))
  ).items
