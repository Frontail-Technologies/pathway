import { studyLevelOptions, streamOptions } from '@/features/student/data/profile-form'

export { studyLevelOptions, streamOptions }

export const studyLevelFilterOptions = studyLevelOptions.map((value) => ({ value, label: value }))
export const streamFilterOptions = streamOptions.map((value) => ({ value, label: value }))
export const accountStatusFilterOptions = [{ value: 'demo_account', label: 'Demo account' }]
