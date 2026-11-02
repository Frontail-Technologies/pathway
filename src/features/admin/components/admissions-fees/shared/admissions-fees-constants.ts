import {
  type AdminDataQualityStatus,
  type AdminContentStatus,
  type SectionQualityState,
  type SectionCompletenessState,
  type OfferingDocumentType,
} from '@/features/admin/data/admin-admissions-fees'
import {
  adminStatusBadgeClassNames,
  adminStatusBadgeVariants,
} from '@/features/admin/constants/status'
import { Check, AlertCircle, X, type LucideIcon } from 'lucide-react'

export const admissionModes = [
  { value: 'Entrance Exam', label: 'Entrance exam' },
  { value: 'Merit Based', label: 'Merit (board marks)' },
  { value: 'Direct / Management', label: 'Direct or management quota' },
]

export const feePeriods = [
  { value: 'Per Annum', label: 'Per year' },
  { value: 'Per Semester', label: 'Per semester' },
  { value: 'Total Programme', label: 'Whole course' },
]

export const feeComponentTypes = [
  { value: 'tuition', label: 'Tuition' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'examination', label: 'Exam and lab' },
  { value: 'admission', label: 'Admission and deposit' },
  { value: 'other', label: 'Other' },
]

export const offeringDocumentTypes: { value: OfferingDocumentType; label: string }[] = [
  { value: 'brochure', label: 'Admission brochure' },
  { value: 'fee_structure', label: 'Fee schedule' },
  { value: 'admission_notice', label: 'Admission notice' },
  { value: 'guidelines', label: 'Counselling guidelines' },
  { value: 'other', label: 'Other' },
]

export const admissionsFeesEditorNavSections = [
  { id: 'identity', label: 'Basics' },
  { id: 'fees', label: 'Fees' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'exams', label: 'Entrance exams' },
  { id: 'process', label: 'Admission steps' },
  { id: 'documents', label: 'Documents' },
  { id: 'review', label: 'Source and review' },
] as const

export const qualityBadgeStyles: Record<AdminDataQualityStatus, { label: string; className: string; variant: 'success' | 'warning' | 'destructive' | 'muted' }> = {
  ready: { label: 'Ready', className: adminStatusBadgeClassNames.success, variant: adminStatusBadgeVariants.success },
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
