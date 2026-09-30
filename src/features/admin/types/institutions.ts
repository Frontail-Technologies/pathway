import type { CollegeDetailData } from '@/features/colleges/data/college-detail'

export type AdminContentStatus = 'complete' | 'partial' | 'basic'
export type AdminDataQualityStatus = 'ready' | 'needs_review' | 'conflict' | 'incomplete'
export type AdminSourceType = 'manual' | 'scraped' | 'imported'
export type AdminSyncStatus = 'manual' | 'imported' | 'needs_review' | 'conflict'
export type InstitutionType = 'Government' | 'Private' | 'Deemed'
export type SectionCompletenessState = 'complete' | 'missing' | 'partial'
export type SectionQualityState = 'ready' | 'needs_review' | 'missing'

export type CompletenessBreakdown = {
  identity: SectionCompletenessState
  overview: SectionCompletenessState
  programs: SectionCompletenessState
  fees: SectionCompletenessState
  admissions: SectionCompletenessState
  facilities: SectionCompletenessState
  placements: SectionCompletenessState
  scholarships: SectionCompletenessState
  media: SectionCompletenessState
}

export type DataQualityBreakdown = {
  identity: SectionQualityState
  programs: SectionQualityState
  fees: SectionQualityState
  admissions: SectionQualityState
  placements: SectionQualityState
  scholarships: SectionQualityState
  media: SectionQualityState
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

export type AdminInstitution = {
  id: string
  slug: string
  name: string
  city: string
  state: string
  type: InstitutionType
  approval: string
  degree: string
  popularCourse: string
  fees: string
  feesValue: number
  exam: string
  placement: string
  hasDetailPage: boolean
  completeness: number
  contentStatus: AdminContentStatus
  qualityStatus: AdminDataQualityStatus
  programCount: number
  provenance: ProvenanceMetadata
  breakdown: CompletenessBreakdown
  qualityBreakdown: DataQualityBreakdown
  topIssues: ContentIssue[]
}

export type AdminInstitutionDetail = {
  institution: AdminInstitution
  detail?: CollegeDetailData
}
