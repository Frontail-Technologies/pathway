import {
  type AdminDataQualityStatus,
  type AdminContentStatus,
  type SectionQualityState,
  type SectionCompletenessState,
  type ScholarshipDocumentType,
} from '@/features/admin/data/admin-scholarships'
import {
  type ProviderType,
  type ScholarshipType,
  type EducationLevel,
  type ApplicationStatus,
  type GenderEligibility,
  type IncomeLimitBucket,
} from '@/features/scholarships/data/scholarships'
import { Check, AlertCircle, X, type LucideIcon } from 'lucide-react'
import {
  adminStatusBadgeClassNames,
  adminStatusBadgeVariants,
} from '@/features/admin/constants/status'

export const providerTypes: { value: ProviderType; label: string }[] = [
  { value: 'Government', label: 'Government Body' },
  { value: 'Private', label: 'Private Organization' },
  { value: 'University', label: 'University / Institution' },
  { value: 'Trust / Foundation', label: 'Trust / Foundation' },
]

export const scholarshipTypes: { value: ScholarshipType; label: string }[] = [
  { value: 'Merit Based', label: 'Merit Based' },
  { value: 'Need Based', label: 'Need Based / EWS' },
  { value: 'Women', label: 'Women in Education' },
  { value: 'Minority', label: 'Minority Community' },
  { value: 'Disability', label: 'Persons with Disabilities' },
  { value: 'Research', label: 'Research & Fellowship' },
  { value: 'Sports', label: 'Sports Excellence' },
]

export const educationLevels: { value: EducationLevel; label: string }[] = [
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 12', label: 'Class 12' },
  { value: 'Undergraduate', label: 'Undergraduate (UG)' },
  { value: 'Postgraduate', label: 'Postgraduate (PG)' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'PhD', label: 'Doctorate / PhD' },
]

export const genderOptions: { value: GenderEligibility; label: string }[] = [
  { value: 'All Genders', label: 'All Genders' },
  { value: 'Female Only', label: 'Female Only' },
]

export const incomeLimitOptions: { value: IncomeLimitBucket; label: string }[] = [
  { value: 'Below ₹2.5 Lakh', label: 'Below ₹2.5 Lakh / Year' },
  { value: '₹2.5–5 Lakh', label: '₹2.5–5 Lakh / Year' },
  { value: '₹5–8 Lakh', label: '₹5–8 Lakh / Year' },
  { value: 'Above ₹8 Lakh', label: 'Above ₹8 Lakh / Year' },
]

export const benefitTypes = [
  { value: 'Monetary', label: 'Direct Monetary Grant' },
  { value: 'Fee Waiver', label: 'Full / Partial Tuition Waiver' },
  { value: 'Stipend', label: 'Monthly Maintenance Stipend' },
  { value: 'Fellowship', label: 'Research Fellowship' },
  { value: 'Other', label: 'Equipment / Book Grant' },
]

export const applicationStatusOptions: { value: ApplicationStatus | 'not-recorded'; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'closing-soon', label: 'Closing Soon' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'closed', label: 'Closed' },
  { value: 'not-recorded', label: 'Date Not Recorded' },
]

export const scholarshipDocumentTypes: { value: ScholarshipDocumentType; label: string }[] = [
  { value: 'notification', label: 'Official Notification' },
  { value: 'guidelines', label: 'Scheme Guidelines' },
  { value: 'application_form', label: 'Application Form' },
  { value: 'scheme_document', label: 'Scheme Policy Document' },
  { value: 'handbook', label: 'Applicant Handbook' },
  { value: 'other', label: 'Other Asset' },
]

export const scholarshipEditorNavSections = [
  { id: 'identity', label: 'Scholarship Identity' },
  { id: 'provider', label: 'Provider & Scope' },
  { id: 'eligibility', label: 'Eligibility Criteria' },
  { id: 'benefits', label: 'Financial Benefits' },
  { id: 'dates', label: 'Application Window' },
  { id: 'process', label: 'Application Process' },
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

export const applicationStatusBadgeStyles: Record<ApplicationStatus | 'not-recorded', { label: string; className: string; variant: 'success' | 'warning' | 'muted' }> = {
  open: { label: 'Open', className: adminStatusBadgeClassNames.success, variant: adminStatusBadgeVariants.success },
  'closing-soon': { label: 'Closing Soon', className: adminStatusBadgeClassNames.warning, variant: adminStatusBadgeVariants.warning },
  upcoming: { label: 'Upcoming', className: adminStatusBadgeClassNames.muted, variant: adminStatusBadgeVariants.muted },
  closed: { label: 'Closed', className: adminStatusBadgeClassNames.muted, variant: adminStatusBadgeVariants.muted },
  'not-recorded': { label: 'Date Not Recorded', className: adminStatusBadgeClassNames.muted, variant: adminStatusBadgeVariants.muted },
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
