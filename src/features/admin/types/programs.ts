import type { CourseDetailData } from '@/features/courses/data/course-detail'

export type AdminProgramStudyLevel = 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Certificate'
export type AdminContentStatus = 'complete' | 'partial' | 'basic'
export type AdminDataQualityStatus = 'ready' | 'needs_review' | 'conflict' | 'incomplete'
export type AdminSourceType = 'manual' | 'scraped' | 'imported'
export type AdminSyncStatus = 'manual' | 'imported' | 'needs_review' | 'conflict'
export type SectionCompletenessState = 'complete' | 'missing' | 'partial'
export type SectionQualityState = 'ready' | 'needs_review' | 'missing'

export type ProgramCompletenessBreakdown = {
  identity: SectionCompletenessState
  overview: SectionCompletenessState
  eligibility: SectionCompletenessState
  curriculum: SectionCompletenessState
  exams: SectionCompletenessState
  careers: SectionCompletenessState
  institutions: SectionCompletenessState
}

export type ProgramQualityBreakdown = {
  identity: SectionQualityState
  eligibility: SectionQualityState
  curriculum: SectionQualityState
  exams: SectionQualityState
  careers: SectionQualityState
  institutions: SectionQualityState
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

export type AdminProgramInstitutionOffering = {
  id: string
  slug: string
  name: string
  city: string
  state: string
  type: string
  fees?: string
  exam?: string
  hasDetailPage: boolean
}

export type AdminProgramDocumentType =
  | 'syllabus'
  | 'curriculum'
  | 'brochure'
  | 'regulation'
  | 'handbook'
  | 'other'

export type AdminProgramDocument = {
  id: string
  title: string
  type: AdminProgramDocumentType
  fileFormat?: string
  fileSize?: string
  url?: string
  originalFileName?: string
  mimeType?: string
  externalDocumentId?: string
  provenance: ProvenanceMetadata
}

export type AdminProgram = {
  id: string
  slug: string
  name: string
  degree: string
  level: AdminProgramStudyLevel
  stream: string
  specialization: string
  duration: string
  durationValue: number
  studyMode: 'Full-time' | 'Part-time' | 'Online' | 'Distance'
  eligibility: string
  entranceExams: string[]
  fees: string
  feesValue: number
  careerAreas: string[]
  collegesOfferingCount: number
  offerings: AdminProgramInstitutionOffering[]
  documents: AdminProgramDocument[]
  hasDetailPage: boolean
  completeness: number
  contentStatus: AdminContentStatus
  qualityStatus: AdminDataQualityStatus
  provenance: ProvenanceMetadata
  breakdown: ProgramCompletenessBreakdown
  qualityBreakdown: ProgramQualityBreakdown
  topIssues: ContentIssue[]
}

export type AdminProgramDetail = {
  program: AdminProgram
  detail?: CourseDetailData
}
