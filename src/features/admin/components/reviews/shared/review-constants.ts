import type { ModerationStatus, ReviewEntityType, ReviewSource } from '@/features/admin/data/admin-reviews'
import type { StatusTone } from '@/features/admin/components/kit'

export const reviewSourceLabels: Record<ReviewSource, string> = {
  google: 'Google',
  pathway: 'Pathway',
}

export const reviewEntityTypeLabels: Record<ReviewEntityType, string> = {
  institution: 'Institution',
  coaching: 'Coaching',
  tutor: 'Tutor',
}

export const moderationStatusLabels: Record<ModerationStatus, string> = {
  published: 'Published',
  pending: 'Pending',
  flagged: 'Flagged',
  hidden: 'Hidden',
}

export const moderationStatusDescriptions: Record<ModerationStatus, string> = {
  published: 'Visible on the public profile.',
  pending: 'Waiting for review before it is shown.',
  flagged: 'Reported or marked for a closer look.',
  hidden: 'Hidden from the public profile.',
}

export const moderationStatusTones: Record<ModerationStatus, StatusTone> = {
  published: 'success',
  pending: 'warning',
  flagged: 'danger',
  hidden: 'neutral',
}

const toOptions = <T extends string>(labels: Record<T, string>) => (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }))

export const reviewSourceOptions = toOptions(reviewSourceLabels)
export const reviewEntityTypeOptions = toOptions(reviewEntityTypeLabels)
export const moderationStatusOptions = toOptions(moderationStatusLabels)

export function formatReviewDate(value?: string) {
  if (!value) return undefined
  return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
