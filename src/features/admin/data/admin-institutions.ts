import { colleges, type CollegeListItem } from '@/features/colleges/data/colleges'
import { getCollegeDetail, type CollegeDetailData } from '@/features/colleges/data/college-detail'
import type {
  AdminContentStatus,
  AdminDataQualityStatus,
  AdminInstitution,
  AdminInstitutionDetail,
  CompletenessBreakdown,
  ContentIssue,
  DataQualityBreakdown,
  SectionCompletenessState,
} from '../types/institutions'

export type {
  AdminContentStatus,
  AdminDataQualityStatus,
  AdminInstitution,
  AdminInstitutionDetail,
  CompletenessBreakdown,
  ContentIssue,
  DataQualityBreakdown,
  SectionCompletenessState,
} from '../types/institutions'

export function calculateInstitutionCompleteness(
  college: CollegeListItem,
  detail?: CollegeDetailData
): {
  percentage: number
  status: AdminContentStatus
  breakdown: CompletenessBreakdown
} {
  const hasDetail = !!detail

  const breakdown: CompletenessBreakdown = {
    identity: college.name && college.slug && college.type ? 'complete' : 'partial',
    overview: hasDetail && detail.overviewCopy ? 'complete' : 'missing',
    programs: hasDetail && detail.courses?.length > 0 ? 'complete' : college.popularCourse ? 'partial' : 'missing',
    fees: hasDetail && detail.fees?.length > 0 ? 'complete' : college.fees ? 'partial' : 'missing',
    admissions: hasDetail && detail.admissions?.length > 0 ? 'complete' : college.exam ? 'partial' : 'missing',
    facilities: hasDetail && detail.facilities?.length > 0 ? 'complete' : 'missing',
    placements: hasDetail && detail.placementMetrics?.length > 0 ? 'complete' : college.placement ? 'partial' : 'missing',
    scholarships: hasDetail && detail.scholarships?.length > 0 ? 'complete' : 'missing',
    media: hasDetail && detail.gallery?.length > 0 ? 'complete' : 'missing',
  }

  const weights: Record<keyof CompletenessBreakdown, number> = {
    identity: 15,
    overview: 15,
    programs: 15,
    fees: 15,
    admissions: 10,
    facilities: 10,
    placements: 10,
    scholarships: 5,
    media: 5,
  }

  let totalScore = 0
  for (const [key, state] of Object.entries(breakdown) as [keyof CompletenessBreakdown, SectionCompletenessState][]) {
    const weight = weights[key]
    if (state === 'complete') {
      totalScore += weight
    } else if (state === 'partial') {
      totalScore += Math.round(weight * 0.4)
    }
  }

  let status: AdminContentStatus = 'basic'
  if (totalScore >= 80) {
    status = 'complete'
  } else if (totalScore >= 35) {
    status = 'partial'
  }

  return {
    percentage: Math.min(totalScore, 100),
    status,
    breakdown,
  }
}

export function calculateInstitutionQuality(
  college: CollegeListItem,
  detail?: CollegeDetailData
): {
  status: AdminDataQualityStatus
  breakdown: DataQualityBreakdown
  topIssues: ContentIssue[]
} {
  const hasDetail = !!detail

  const breakdown: DataQualityBreakdown = {
    identity: college.name && college.slug && college.approval ? 'ready' : 'needs_review',
    programs: hasDetail && detail.courses?.length > 0 ? 'ready' : 'needs_review',
    fees: hasDetail && detail.fees?.length > 0 ? 'ready' : 'needs_review',
    admissions: hasDetail && detail.admissions?.length > 0 ? 'ready' : 'needs_review',
    placements: hasDetail && detail.placementMetrics?.length > 0 ? 'needs_review' : college.placement ? 'needs_review' : 'missing',
    scholarships: hasDetail && detail.scholarships?.length > 0 ? 'needs_review' : 'missing',
    media: hasDetail && detail.gallery?.length > 0 ? 'ready' : 'missing',
  }

  const topIssues: ContentIssue[] = []

  if (!hasDetail) {
    topIssues.push({
      id: 'missing-detail',
      label: 'Public detail page not authored',
      severity: 'warning',
    })
    topIssues.push({
      id: 'missing-programs',
      label: 'Course curriculum and fee schedules missing',
      severity: 'warning',
    })
    topIssues.push({
      id: 'missing-media',
      label: 'Campus photography and media unlinked',
      severity: 'info',
    })
  } else {
    topIssues.push({
      id: 'placement-src',
      label: 'Placement CTC and package claims lack verified source',
      severity: 'warning',
    })
    topIssues.push({
      id: 'scholarship-src',
      label: 'Scholarship amounts and deadlines require source review',
      severity: 'info',
    })
  }

  let status: AdminDataQualityStatus = 'incomplete'
  if (hasDetail) {
    status = 'needs_review'
  } else {
    status = 'incomplete'
  }

  return {
    status,
    breakdown,
    topIssues,
  }
}

export function getAdminInstitutions(): AdminInstitution[] {
  return colleges.map((college) => {
    const detail = getCollegeDetail(college.slug)
    const hasDetailPage = !!detail
    const completenessResult = calculateInstitutionCompleteness(college, detail)
    const qualityResult = calculateInstitutionQuality(college, detail)
    const programCount = detail?.courses?.length || 1

    return {
      id: college.id,
      slug: college.slug,
      name: college.name,
      city: college.city,
      state: college.state,
      type: college.type,
      approval: college.approval,
      degree: college.degree,
      popularCourse: college.popularCourse,
      fees: college.fees,
      feesValue: college.feesValue,
      exam: college.exam,
      placement: college.placement,
      hasDetailPage,
      completeness: completenessResult.percentage,
      contentStatus: completenessResult.status,
      qualityStatus: qualityResult.status,
      programCount,
      provenance: {
        sourceType: 'manual',
        syncStatus: 'manual',
      },
      breakdown: completenessResult.breakdown,
      qualityBreakdown: qualityResult.breakdown,
      topIssues: qualityResult.topIssues,
    }
  })
}

export function getAdminInstitutionById(id: string): AdminInstitutionDetail | undefined {
  const all = getAdminInstitutions()
  const institution = all.find((item) => item.id === id || item.slug === id)
  if (!institution) return undefined

  const detail = getCollegeDetail(institution.slug)
  return {
    institution,
    detail,
  }
}

export function getAdminInstitutionFilterOptions(): {
  types: string[]
  states: string[]
  cities: string[]
  qualityStatuses: { value: string; label: string }[]
} {
  const types = Array.from(new Set(colleges.map((c) => c.type))).sort()
  const states = Array.from(new Set(colleges.map((c) => c.state))).sort()
  const cities = Array.from(new Set(colleges.map((c) => c.city))).sort()
  const qualityStatuses = [
    { value: 'all', label: 'All Quality' },
    { value: 'ready', label: 'Ready' },
    { value: 'needs_review', label: 'Needs Review' },
    { value: 'conflict', label: 'Conflict' },
    { value: 'incomplete', label: 'Incomplete' },
  ]

  return { types, states, cities, qualityStatuses }
}
