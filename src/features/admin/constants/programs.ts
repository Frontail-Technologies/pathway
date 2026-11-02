import type {
  AdminProgramStudyLevel,
  AdminDataQualityStatus,
  AdminContentStatus,
  AdminProgramDocumentType,
  SectionQualityState,
  SectionCompletenessState,
} from '@/features/admin/types/programs'
import { Check, AlertCircle, X, type LucideIcon } from 'lucide-react'
import { adminStatusBadgeClassNames, adminStatusBadgeVariants } from './status'

export const studyLevels: { value: AdminProgramStudyLevel; label: string }[] = [
  { value: 'Undergraduate', label: 'Undergraduate (UG)' },
  { value: 'Postgraduate', label: 'Postgraduate (PG)' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Certificate', label: 'Certificate' },
]

export const streams: { value: string; label: string }[] = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Management', label: 'Management' },
  { value: 'Medical', label: 'Medical and healthcare' },
  { value: 'Science', label: 'Science and IT' },
  { value: 'Law', label: 'Law' },
  { value: 'Commerce', label: 'Commerce and banking' },
  { value: 'Arts & Humanities', label: 'Arts and humanities' },
]

export const studyModes: { value: 'Full-time' | 'Part-time' | 'Online' | 'Distance'; label: string }[] = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Online', label: 'Online' },
  { value: 'Distance', label: 'Distance learning' },
]

export const documentTypes: { value: AdminProgramDocumentType; label: string }[] = [
  { value: 'syllabus', label: 'Syllabus' },
  { value: 'curriculum', label: 'Curriculum' },
  { value: 'brochure', label: 'Brochure' },
  { value: 'regulation', label: 'Academic regulations' },
  { value: 'handbook', label: 'Handbook' },
  { value: 'other', label: 'Other' },
]

export const programEditorNavSections = [
  { id: 'identity', label: 'Basics' },
  { id: 'overview', label: 'Overview' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'curriculum', label: 'Curriculum' },
  { id: 'exams', label: 'Entrance exams' },
  { id: 'documents', label: 'Documents' },
  { id: 'relationships', label: 'Institutions' },
  { id: 'review', label: 'Source and review' },
] as const

export const levelBadgeVariant = adminStatusBadgeVariants.muted

export const qualityBadgeStyles: Record<AdminDataQualityStatus, { label: string; className: string; variant: 'success' | 'warning' | 'destructive' | 'muted' }> = {
  ready: { label: 'Ready to publish', className: adminStatusBadgeClassNames.success, variant: adminStatusBadgeVariants.success },
  needs_review: { label: 'Needs review', className: adminStatusBadgeClassNames.warning, variant: adminStatusBadgeVariants.warning },
  conflict: { label: 'Conflict', className: adminStatusBadgeClassNames.destructive, variant: adminStatusBadgeVariants.destructive },
  incomplete: { label: 'Incomplete', className: adminStatusBadgeClassNames.muted, variant: adminStatusBadgeVariants.muted },
}

export const directoryQualityBadgeStyles: Record<AdminDataQualityStatus, { label: string; className: string; variant: 'success' | 'warning' | 'destructive' | 'muted' }> = {
  ready: { label: 'Ready', className: adminStatusBadgeClassNames.success, variant: adminStatusBadgeVariants.success },
  needs_review: { label: 'Needs review', className: adminStatusBadgeClassNames.warning, variant: adminStatusBadgeVariants.warning },
  conflict: { label: 'Conflict', className: adminStatusBadgeClassNames.destructive, variant: adminStatusBadgeVariants.destructive },
  incomplete: { label: 'Incomplete', className: adminStatusBadgeClassNames.muted, variant: adminStatusBadgeVariants.muted },
}

export const statusBadgeStyles: Record<AdminContentStatus, { label: string; className: string; variant: 'success' | 'warning' | 'muted' }> = {
  complete: { label: 'Complete', className: adminStatusBadgeClassNames.success, variant: adminStatusBadgeVariants.success },
  partial: { label: 'Partial', className: adminStatusBadgeClassNames.warning, variant: adminStatusBadgeVariants.warning },
  basic: { label: 'Basic', className: adminStatusBadgeClassNames.muted, variant: adminStatusBadgeVariants.muted },
}

export const qualityCheckStyles: Record<SectionQualityState, { icon: LucideIcon; badgeClass: string; label: string; variant: 'success' | 'warning' | 'muted' }> = {
  ready: { icon: Check, badgeClass: adminStatusBadgeClassNames.success, label: 'Ready', variant: adminStatusBadgeVariants.success },
  needs_review: { icon: AlertCircle, badgeClass: adminStatusBadgeClassNames.warning, label: 'Needs review', variant: adminStatusBadgeVariants.warning },
  missing: { icon: X, badgeClass: adminStatusBadgeClassNames.muted, label: 'Missing', variant: adminStatusBadgeVariants.muted },
}

export const completenessStatusStyles: Record<SectionCompletenessState, { icon: LucideIcon; badgeClass: string; label: string; variant: 'success' | 'warning' | 'muted' }> = {
  complete: { icon: Check, badgeClass: adminStatusBadgeClassNames.success, label: 'Complete', variant: adminStatusBadgeVariants.success },
  partial: { icon: AlertCircle, badgeClass: adminStatusBadgeClassNames.warning, label: 'Partial', variant: adminStatusBadgeVariants.warning },
  missing: { icon: X, badgeClass: adminStatusBadgeClassNames.muted, label: 'Missing', variant: adminStatusBadgeVariants.muted },
}
