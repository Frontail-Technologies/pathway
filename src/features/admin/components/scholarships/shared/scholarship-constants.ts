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
import type { StatusTone } from '../../kit'

export const providerTypes: { value: ProviderType; label: string }[] = [
  { value: 'Government', label: 'Government' },
  { value: 'Private', label: 'Private organisation' },
  { value: 'University', label: 'University or institution' },
  { value: 'Trust / Foundation', label: 'Trust or foundation' },
]

export const scholarshipTypes: { value: ScholarshipType; label: string }[] = [
  { value: 'Merit Based', label: 'Merit based' },
  { value: 'Need Based', label: 'Need based' },
  { value: 'Women', label: 'Women' },
  { value: 'Minority', label: 'Minority' },
  { value: 'Disability', label: 'Disability' },
  { value: 'Research', label: 'Research' },
  { value: 'Sports', label: 'Sports' },
]

export const educationLevels: { value: EducationLevel; label: string }[] = [
  { value: 'Class 10', label: 'Class 10' },
  { value: 'Class 12', label: 'Class 12' },
  { value: 'Undergraduate', label: 'Undergraduate' },
  { value: 'Postgraduate', label: 'Postgraduate' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'PhD', label: 'PhD' },
]

export const genderOptions: { value: GenderEligibility; label: string }[] = [
  { value: 'All Genders', label: 'All genders' },
  { value: 'Female Only', label: 'Female only' },
]

export const incomeLimitOptions: { value: IncomeLimitBucket; label: string }[] = [
  { value: 'Below ₹2.5 Lakh', label: 'Below ₹2.5 lakh a year' },
  { value: '₹2.5–5 Lakh', label: '₹2.5–5 lakh a year' },
  { value: '₹5–8 Lakh', label: '₹5–8 lakh a year' },
  { value: 'Above ₹8 Lakh', label: 'Above ₹8 lakh a year' },
]

export const benefitTypes = [
  { value: 'Monetary', label: 'Cash grant' },
  { value: 'Fee Waiver', label: 'Tuition fee waiver' },
  { value: 'Stipend', label: 'Monthly stipend' },
  { value: 'Fellowship', label: 'Research fellowship' },
  { value: 'Other', label: 'Other (books, equipment)' },
]

export const applicationStatusOptions: { value: ApplicationStatus | 'not-recorded'; label: string }[] = [
  { value: 'open', label: 'Open' },
  { value: 'closing-soon', label: 'Closing soon' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'closed', label: 'Closed' },
  { value: 'not-recorded', label: 'No date recorded' },
]

export const scholarshipDocumentTypes: { value: ScholarshipDocumentType; label: string }[] = [
  { value: 'notification', label: 'Official notification' },
  { value: 'guidelines', label: 'Guidelines' },
  { value: 'application_form', label: 'Application form' },
  { value: 'scheme_document', label: 'Scheme document' },
  { value: 'handbook', label: 'Applicant handbook' },
  { value: 'other', label: 'Other' },
]

export const scholarshipEditorNavSections = [
  { id: 'identity', label: 'Basics' },
  { id: 'provider', label: 'Provider and scope' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'dates', label: 'Dates' },
  { id: 'process', label: 'How to apply' },
  { id: 'documents', label: 'Documents' },
  { id: 'review', label: 'Source and review' },
] as const

type Styled = { label: string; tone: StatusTone }

export const qualityBadgeStyles: Record<AdminDataQualityStatus, Styled> = {
  ready: { label: 'Ready', tone: 'success' },
  needs_review: { label: 'Needs review', tone: 'warning' },
  conflict: { label: 'Conflict', tone: 'danger' },
  incomplete: { label: 'Incomplete', tone: 'neutral' },
}

export const statusBadgeStyles: Record<AdminContentStatus, Styled> = {
  complete: { label: 'Complete', tone: 'success' },
  partial: { label: 'Partial', tone: 'warning' },
  basic: { label: 'Basic', tone: 'neutral' },
}

export const applicationStatusBadgeStyles: Record<ApplicationStatus | 'not-recorded', Styled> = {
  open: { label: 'Open', tone: 'success' },
  'closing-soon': { label: 'Closing soon', tone: 'warning' },
  upcoming: { label: 'Upcoming', tone: 'info' },
  closed: { label: 'Closed', tone: 'neutral' },
  'not-recorded': { label: 'No date recorded', tone: 'neutral' },
}

export const qualityCheckStyles: Record<SectionQualityState, Styled> = {
  ready: { label: 'Ready', tone: 'success' },
  needs_review: { label: 'Needs review', tone: 'warning' },
  missing: { label: 'Missing', tone: 'neutral' },
}

export const completenessStatusStyles: Record<SectionCompletenessState, Styled> = {
  complete: { label: 'Complete', tone: 'success' },
  partial: { label: 'Partial', tone: 'warning' },
  missing: { label: 'Missing', tone: 'neutral' },
}
