export const TUTOR_SUBJECT_OPTIONS = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Computer Science'] as const

export const TUTOR_EXAM_OPTIONS = ['JEE Main', 'JEE Advanced', 'NEET UG', 'CUET UG', 'Board Exams'] as const

export const TUTOR_LEVEL_OPTIONS = ['Class 6–8', 'Class 9–10', 'Class 11–12', 'Undergraduate'] as const

export const TUTOR_LANGUAGE_OPTIONS = ['English', 'Hindi', 'Bengali', 'Tamil'] as const

export const TUTOR_MODE_OPTIONS = ['Online', 'In-person'] as const

export const COACHING_PROVIDER_TYPES = ['Coaching Institute', 'Online Platform'] as const

export const COACHING_MODE_OPTIONS = ['Offline', 'Online', 'Hybrid'] as const

export const COACHING_COURSE_TYPE_OPTIONS = [
  'Classroom Program',
  'Live Classes',
  'Test Series',
  'Crash Course',
  'Weekend Batch',
  'Self-Paced Course',
  'Foundation Batch',
  'Portfolio Guidance',
] as const

export const COACHING_EXAM_OPTIONS = ['JEE Main', 'JEE Advanced', 'NEET UG', 'CUET UG', 'CAT', 'XAT', 'GATE', 'CLAT', 'NID DAT', 'UCEED', 'CA Foundation', 'Olympiad'] as const

export function sentenceCase(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase()
}

export function toOptions(values: readonly string[]) {
  return values.map((value) => ({ value, label: value }))
}

export const PUBLIC_PAGE_FILTER_OPTIONS = [
  { value: 'live', label: 'Live' },
  { value: 'none', label: 'Listing only' },
]

export function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function providerPlace(provider: { location: string; state?: string }) {
  return provider.state ? `${provider.location}, ${provider.state}` : provider.location
}
