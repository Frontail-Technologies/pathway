import {
  studyLevelOptions as rawStudyLevelOptions,
  streamOptions as rawStreamOptions,
} from '@/features/student/data/profile-form'

export { rawStudyLevelOptions as studyLevelOptions, rawStreamOptions as streamOptions }

export const studyLevelFilterOptions = [
  { value: 'all', label: 'All Study Levels' },
  ...rawStudyLevelOptions.map((opt) => ({ value: opt, label: opt })),
]

export const streamFilterOptions = [
  { value: 'all', label: 'All Streams' },
  ...rawStreamOptions.map((opt) => ({ value: opt, label: opt })),
]

export const accountStatusOptions = [
  { value: 'all', label: 'All Account Statuses' },
  { value: 'demo_account', label: 'Demo Account' },
]
