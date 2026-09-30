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
  { value: 'Entrance Exam', label: 'Entrance Exam Based' },
  { value: 'Merit Based', label: '10+2 / Qualifying Board Merit' },
  { value: 'Direct / Management', label: 'Direct / Management Quota' },
]

export const feePeriods = [
  { value: 'Per Annum', label: 'Per Annum (Annual)' },
  { value: 'Per Semester', label: 'Per Semester' },
  { value: 'Total Programme', label: 'Total Programme Fee' },
]

export const feeComponentTypes = [
  { value: 'tuition', label: 'Tuition Fee' },
  { value: 'hostel', label: 'Hostel & Amenities' },
  { value: 'examination', label: 'Examination & Lab Charges' },
  { value: 'admission', label: 'One-time Admission / Caution' },
  { value: 'other', label: 'Other Institutional Charges' },
]

export const offeringDocumentTypes: { value: OfferingDocumentType; label: string }[] = [
  { value: 'brochure', label: 'Admission Brochure' },
  { value: 'fee_structure', label: 'Official Fee Schedule' },
  { value: 'admission_notice', label: 'Admission Notification' },
  { value: 'guidelines', label: 'Counselling Guidelines' },
  { value: 'other', label: 'Other Asset' },
]

export const admissionsFeesEditorNavSections = [
  { id: 'identity', label: 'Offering Identity' },
  { id: 'fees', label: 'Fee Structure' },
  { id: 'eligibility', label: 'Eligibility Criteria' },
  { id: 'exams', label: 'Entrance Exams' },
  { id: 'process', label: 'Admission Process' },
  { id: 'documents', label: 'Documents & Circulars' },
  { id: 'review', label: 'Source & Review' },
] as const

export const qualityBadgeStyles: Record<AdminDataQualityStatus, { label: string; className: string; variant: 'success' | 'warning' | 'destructive' | 'muted' }> = {
  ready: { label: 'Ready', className: adminStatusBadgeClassNames.success, variant: adminStatusBadgeVariants.success },
  needs_review: { label: 'Needs Review', className: adminStatusBadgeClassNames.warning, variant: adminStatusBadgeVariants.warning },
  conflict: { label: 'Conflict Detected', className: adminStatusBadgeClassNames.destructive, variant: adminStatusBadgeVariants.destructive },
  incomplete: { label: 'Incomplete Data', className: adminStatusBadgeClassNames.muted, variant: adminStatusBadgeVariants.muted },
}

export const directoryQualityBadgeStyles: Record<AdminDataQualityStatus, { label: string; className: string; variant: 'success' | 'warning' | 'destructive' | 'muted' }> = {
  ready: { label: 'Ready', className: adminStatusBadgeClassNames.success, variant: adminStatusBadgeVariants.success },
  needs_review: { label: 'Needs Review', className: adminStatusBadgeClassNames.warning, variant: adminStatusBadgeVariants.warning },
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
  needs_review: { icon: AlertCircle, badgeClass: adminStatusBadgeClassNames.warning, label: 'Needs Review', variant: adminStatusBadgeVariants.warning },
  missing: { icon: X, badgeClass: adminStatusBadgeClassNames.muted, label: 'Missing', variant: adminStatusBadgeVariants.muted },
}

export const completenessStatusStyles: Record<SectionCompletenessState, { icon: LucideIcon; badgeClass: string; label: string; variant: 'success' | 'warning' | 'muted' }> = {
  complete: { icon: Check, badgeClass: adminStatusBadgeClassNames.success, label: 'Complete', variant: adminStatusBadgeVariants.success },
  partial: { icon: AlertCircle, badgeClass: adminStatusBadgeClassNames.warning, label: 'Partial', variant: adminStatusBadgeVariants.warning },
  missing: { icon: X, badgeClass: adminStatusBadgeClassNames.muted, label: 'Missing', variant: adminStatusBadgeVariants.muted },
}
