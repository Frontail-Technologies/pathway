import {
  scholarships,
  type ScholarshipListItem,
  type ProviderType,
  type ScholarshipType,
  type EducationLevel,
  type ApplicationStatus,
  type GenderEligibility,
  type IncomeLimitBucket,
} from '@/features/scholarships/data/scholarships'
import {
  getScholarshipDetail,
  type ScholarshipDetailData,
} from '@/features/scholarships/data/scholarship-detail'

export type AdminContentStatus = 'complete' | 'partial' | 'basic'
export type AdminDataQualityStatus = 'ready' | 'needs_review' | 'conflict' | 'incomplete'
export type AdminSourceType = 'manual' | 'scraped' | 'imported'
export type AdminSyncStatus = 'manual' | 'imported' | 'needs_review' | 'conflict'
export type DerivedApplicationStatus = 'open' | 'closing-soon' | 'upcoming' | 'closed' | 'not-recorded'

export type SectionCompletenessState = 'complete' | 'missing' | 'partial'
export type SectionQualityState = 'ready' | 'needs_review' | 'missing'

export type ScholarshipCompletenessBreakdown = {
  identity: SectionCompletenessState
  provider: SectionCompletenessState
  eligibility: SectionCompletenessState
  benefit: SectionCompletenessState
  dates: SectionCompletenessState
  application: SectionCompletenessState
  documents: SectionCompletenessState
}

export type ScholarshipQualityBreakdown = {
  identity: SectionQualityState
  provider: SectionQualityState
  eligibility: SectionQualityState
  benefit: SectionQualityState
  dates: SectionQualityState
  application: SectionQualityState
  source: SectionQualityState
}

export type ProvenanceMetadata = {
  sourceType: AdminSourceType
  sourceName?: string
  sourceUrl?: string
  externalSourceId?: string
  lastImportedAt?: string
  lastReviewedAt?: string
  syncStatus: AdminSyncStatus
  hasManualOverride?: boolean
}

export type ContentIssue = {
  id: string
  label: string
  severity: 'warning' | 'info'
}

export type ScholarshipDocumentType =
  | 'notification'
  | 'guidelines'
  | 'application_form'
  | 'scheme_document'
  | 'handbook'
  | 'other'

export type ScholarshipDocument = {
  id: string
  title: string
  type: ScholarshipDocumentType
  fileFormat?: string
  fileSize?: string
  url?: string
  academicSession?: string
  provenance: ProvenanceMetadata
}

export type AdminScholarship = {
  id: string
  slug: string
  name: string
  provider: string
  providerType: ProviderType
  providerInitials: string
  scholarshipType: ScholarshipType
  educationLevels: EducationLevel[]
  streams: string[]
  states: string[]
  categories: string[]
  genderEligibility: GenderEligibility
  incomeLimitBucket?: IncomeLimitBucket
  benefitLabel: string
  benefitValue: number
  benefitType: 'Monetary' | 'Fee Waiver' | 'Stipend' | 'Fellowship' | 'Other'
  benefitCoverage?: string
  benefitDuration?: string
  benefitDisbursement?: string
  deadline?: string
  deadlineDisplay?: string
  applicationStatus: DerivedApplicationStatus
  overviewCopy?: string
  shortEligibility: string[]
  eligibilityRows: { label: string; value: string }[]
  applicableCourses: string[]
  applicableLocations: string[]
  importantDates: { label: string; value: string }[]
  applicationSteps: string[]
  selectionProcess: string[]
  requiredDocuments: string[]
  officialApplyUrl?: string
  documents: ScholarshipDocument[]
  hasDetailPage: boolean
  featured?: boolean
  academicSession?: string
  provenance: ProvenanceMetadata
  completeness: number
  contentStatus: AdminContentStatus
  qualityStatus: AdminDataQualityStatus
  breakdown: ScholarshipCompletenessBreakdown
  qualityBreakdown: ScholarshipQualityBreakdown
  topIssues: ContentIssue[]
}

export type AdminScholarshipDetail = {
  scholarship: AdminScholarship
  canonicalItem: ScholarshipListItem
  detailData?: ScholarshipDetailData
}

export function getScholarshipApplicationStatus(
  deadline?: string,
  openDate?: string
): DerivedApplicationStatus {
  if (!deadline || !deadline.trim()) {
    return 'not-recorded'
  }

  const deadlineDateStr = deadline.includes('T') ? deadline : `${deadline}T23:59:59`
  const deadlineTime = new Date(deadlineDateStr).getTime()
  if (isNaN(deadlineTime)) {
    return 'not-recorded'
  }

  const now = Date.now()

  if (deadlineTime < now) {
    return 'closed'
  }

  if (openDate) {
    const openDateStr = openDate.includes('T') ? openDate : `${openDate}T00:00:00`
    const openTime = new Date(openDateStr).getTime()
    if (!isNaN(openTime) && openTime > now) {
      return 'upcoming'
    }
  }

  const msPerDay = 1000 * 60 * 60 * 24
  const daysRemaining = Math.ceil((deadlineTime - now) / msPerDay)
  if (daysRemaining <= 15) {
    return 'closing-soon'
  }

  return 'open'
}

export function calculateScholarshipCompleteness(
  scholarship: Omit<AdminScholarship, 'completeness' | 'contentStatus' | 'qualityStatus' | 'breakdown' | 'qualityBreakdown' | 'topIssues'>
): {
  percentage: number
  status: AdminContentStatus
  breakdown: ScholarshipCompletenessBreakdown
} {
  const breakdown: ScholarshipCompletenessBreakdown = {
    identity: scholarship.name && scholarship.scholarshipType && scholarship.educationLevels.length > 0 ? 'complete' : 'partial',
    provider: scholarship.provider && scholarship.providerType ? 'complete' : 'missing',
    eligibility:
      scholarship.eligibilityRows.length > 0
        ? 'complete'
        : scholarship.shortEligibility.length > 0
          ? 'partial'
          : 'missing',
    benefit:
      scholarship.benefitLabel && scholarship.benefitValue > 0 && scholarship.benefitCoverage && scholarship.benefitDuration && scholarship.benefitDisbursement
        ? 'complete'
        : scholarship.benefitLabel && scholarship.benefitValue > 0
          ? 'partial'
          : 'missing',
    dates:
      scholarship.deadline && scholarship.importantDates.length > 0
        ? 'complete'
        : scholarship.deadline
          ? 'partial'
          : 'missing',
    application:
      scholarship.officialApplyUrl && scholarship.applicationSteps.length > 0
        ? 'complete'
        : scholarship.officialApplyUrl || scholarship.applicationSteps.length > 0
          ? 'partial'
          : 'missing',
    documents: scholarship.documents.length > 0 ? 'complete' : 'missing',
  }

  const weights: Record<keyof ScholarshipCompletenessBreakdown, number> = {
    identity: 20,
    provider: 15,
    eligibility: 20,
    benefit: 20,
    dates: 10,
    application: 10,
    documents: 5,
  }

  let earned = 0
  let totalWeight = 0

  for (const [k, state] of Object.entries(breakdown) as [keyof ScholarshipCompletenessBreakdown, SectionCompletenessState][]) {
    const w = weights[k] || 10
    totalWeight += w
    if (state === 'complete') earned += w
    if (state === 'partial') earned += w * 0.5
  }

  const percentage = Math.round((earned / totalWeight) * 100)
  const status: AdminContentStatus = percentage >= 80 ? 'complete' : percentage >= 45 ? 'partial' : 'basic'

  return { percentage, status, breakdown }
}

export function calculateScholarshipQuality(
  scholarship: Omit<AdminScholarship, 'completeness' | 'contentStatus' | 'qualityStatus' | 'breakdown' | 'qualityBreakdown' | 'topIssues'>,
  completenessState: { percentage: number; breakdown: ScholarshipCompletenessBreakdown }
): {
  status: AdminDataQualityStatus
  qualityBreakdown: ScholarshipQualityBreakdown
  topIssues: ContentIssue[]
} {
  const issues: ContentIssue[] = []
  const hasSource = Boolean(scholarship.provenance?.sourceName)

  const qualityBreakdown: ScholarshipQualityBreakdown = {
    identity: scholarship.name && scholarship.scholarshipType ? 'ready' : 'needs_review',
    provider: scholarship.provider ? 'ready' : 'needs_review',
    eligibility: scholarship.eligibilityRows.length > 0 ? (hasSource ? 'ready' : 'needs_review') : scholarship.shortEligibility.length > 0 ? 'needs_review' : 'missing',
    benefit: scholarship.benefitLabel ? (hasSource ? 'ready' : 'needs_review') : 'missing',
    dates: scholarship.deadline ? (hasSource ? 'ready' : 'needs_review') : 'missing',
    application: scholarship.applicationSteps.length > 0 && scholarship.officialApplyUrl ? (hasSource ? 'ready' : 'needs_review') : scholarship.officialApplyUrl ? 'needs_review' : 'missing',
    source: hasSource ? 'ready' : 'needs_review',
  }

  if (!scholarship.benefitLabel) {
    issues.push({ id: 'benefit-missing', label: 'Financial benefit amount or coverage is not configured', severity: 'warning' })
  } else if (!hasSource) {
    issues.push({ id: 'benefit-unverified', label: 'Financial benefit schedule has no recorded official source', severity: 'warning' })
  }

  if (scholarship.deadline && !hasSource) {
    issues.push({ id: 'deadline-unverified', label: 'Application deadline has no verified official circular citation', severity: 'warning' })
  }

  if (!scholarship.officialApplyUrl && scholarship.applicationSteps.length === 0) {
    issues.push({ id: 'apply-url-missing', label: 'No official application portal URL or application steps specified', severity: 'info' })
  } else if (!scholarship.applicationSteps || scholarship.applicationSteps.length === 0) {
    issues.push({ id: 'apply-steps-missing', label: 'Step-by-step application workflow has not been detailed', severity: 'info' })
  }

  if (scholarship.documents.length === 0) {
    issues.push({ id: 'doc-pending', label: 'No official scholarship notification or scheme document attached', severity: 'info' })
  }

  let status: AdminDataQualityStatus = 'ready'
  if (completenessState.percentage < 40) {
    status = 'incomplete'
  } else if (issues.some((i) => i.severity === 'warning')) {
    status = 'needs_review'
  }

  return { status, qualityBreakdown, topIssues: issues }
}

function deriveBenefitType(label: string): 'Monetary' | 'Fee Waiver' | 'Stipend' | 'Fellowship' | 'Other' {
  const lower = label.toLowerCase()
  if (lower.includes('waiver')) return 'Fee Waiver'
  if (lower.includes('month') || lower.includes('stipend')) return 'Stipend'
  if (lower.includes('fellowship')) return 'Fellowship'
  if (lower.includes('₹') || lower.includes('lakh')) return 'Monetary'
  return 'Other'
}

export function getAdminScholarships(): AdminScholarship[] {
  return scholarships.map((item) => {
    const detail = getScholarshipDetail(item.slug)
    const hasDetailPage = !!detail

    const openDateItem = detail?.importantDates?.find((d) =>
      d.label.toLowerCase().includes('open')
    )
    const openDateValue = openDateItem?.value

    const derivedStatus = getScholarshipApplicationStatus(item.deadline, openDateValue)

    const raw: Omit<AdminScholarship, 'completeness' | 'contentStatus' | 'qualityStatus' | 'breakdown' | 'qualityBreakdown' | 'topIssues'> = {
      id: item.id,
      slug: item.slug,
      name: item.name,
      provider: item.provider,
      providerType: item.providerType,
      providerInitials: item.providerInitials,
      scholarshipType: item.scholarshipType,
      educationLevels: item.educationLevels,
      streams: item.streams,
      states: item.states,
      categories: item.categories,
      genderEligibility: item.genderEligibility,
      incomeLimitBucket: item.incomeLimitBucket,
      benefitLabel: item.benefitLabel,
      benefitValue: item.benefitValue,
      benefitType: deriveBenefitType(item.benefitLabel),
      benefitCoverage: detail?.benefits?.coverage,
      benefitDuration: detail?.benefits?.duration,
      benefitDisbursement: detail?.benefits?.disbursement,
      deadline: item.deadline || undefined,
      deadlineDisplay: item.deadlineDisplay || undefined,
      applicationStatus: derivedStatus,
      overviewCopy: detail?.overviewCopy,
      shortEligibility: item.shortEligibility || [],
      eligibilityRows: detail?.eligibility?.rows || [],
      applicableCourses: detail?.applicableCourses || [],
      applicableLocations: detail?.applicableLocations || [],
      importantDates: detail?.importantDates || [],
      applicationSteps: detail?.applicationSteps || [],
      selectionProcess: detail?.selectionProcess || [],
      requiredDocuments: detail?.documents || [],
      officialApplyUrl: item.officialApplyUrl,
      documents: [],
      hasDetailPage,
      featured: item.featured,
      academicSession: '2026-27',
      provenance: {
        sourceType: 'manual',
        syncStatus: 'manual',
        hasManualOverride: false,
      },
    }

    const completeness = calculateScholarshipCompleteness(raw)
    const quality = calculateScholarshipQuality(raw, completeness)

    return {
      ...raw,
      completeness: completeness.percentage,
      contentStatus: completeness.status,
      qualityStatus: quality.status,
      breakdown: completeness.breakdown,
      qualityBreakdown: quality.qualityBreakdown,
      topIssues: quality.topIssues,
    }
  })
}

export function getAdminScholarshipById(idOrSlug: string): AdminScholarshipDetail | undefined {
  const all = getAdminScholarships()
  const scholarship = all.find((s) => s.id === idOrSlug || s.slug === idOrSlug)
  if (!scholarship) return undefined

  const canonicalItem = scholarships.find((s) => s.id === scholarship.id || s.slug === scholarship.slug) || scholarships[0]
  const detailData = getScholarshipDetail(scholarship.slug)

  return {
    scholarship,
    canonicalItem,
    detailData,
  }
}
