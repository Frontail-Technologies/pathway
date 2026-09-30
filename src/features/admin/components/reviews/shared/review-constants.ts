import {
  type ReviewSource,
  type ReviewEntityType,
  type ModerationStatus,
  reviewSourceMap,
  moderationStatusMap,
  reviewEntityTypeMap,
} from '@/features/admin/data/admin-reviews'

export const reviewSourceFilterOptions = [
  { value: 'all', label: 'All Sources' },
  { value: 'google', label: 'Google Places' },
  { value: 'pathway', label: 'Pathway Native' },
]

export const entityTypeFilterOptions = [
  { value: 'all', label: 'All Entity Types' },
  { value: 'institution', label: 'Institutions' },
  { value: 'coaching', label: 'Coaching Providers' },
  { value: 'tutor', label: 'Individual Tutors' },
]

export const moderationStatusFilterOptions = [
  { value: 'all', label: 'All Moderation Statuses' },
  { value: 'published', label: 'Published' },
  { value: 'pending', label: 'Pending' },
  { value: 'flagged', label: 'Flagged' },
  { value: 'hidden', label: 'Hidden' },
]

export { reviewSourceMap, moderationStatusMap, reviewEntityTypeMap }
export type { ReviewSource, ReviewEntityType, ModerationStatus }
