export type ReviewSource = 'google' | 'pathway'

export type ReviewEntityType = 'institution' | 'coaching' | 'tutor'

export type ModerationStatus = 'pending' | 'published' | 'hidden' | 'flagged'

export type Review = {
  id: string
  source: ReviewSource
  entityType: ReviewEntityType
  entityId: string
  rating?: number
  title?: string
  body?: string
  reviewerName?: string
  reviewerAvatar?: string
  submittedAt?: string
  moderationStatus?: ModerationStatus
  verifiedSession?: boolean
  sessionId?: string
  studentId?: string
  externalPlaceId?: string
  externalReviewId?: string
  sourceUrl?: string
}

export const reviewSourceMap: Record<
  ReviewSource,
  { label: string; shortLabel: string; description: string }
> = {
  google: {
    label: 'Google Business / Places',
    shortLabel: 'Google',
    description: 'External customer review via Google Places integration.',
  },
  pathway: {
    label: 'Pathway Native',
    shortLabel: 'Pathway',
    description: 'Direct student review submitted on Pathway.',
  },
}

export const moderationStatusMap: Record<
  ModerationStatus,
  { label: string; description: string }
> = {
  published: {
    label: 'Published',
    description: 'Visible across public entity profile pages.',
  },
  pending: {
    label: 'Pending Moderation',
    description: 'Awaiting administrative review prior to publication.',
  },
  hidden: {
    label: 'Hidden',
    description: 'Suppressed from public display by administrator.',
  },
  flagged: {
    label: 'Flagged for Review',
    description: 'Reported or identified as requiring manual investigation.',
  },
}

export const reviewEntityTypeMap: Record<
  ReviewEntityType,
  { label: string; description: string }
> = {
  institution: {
    label: 'Institution',
    description: 'College / University profile',
  },
  coaching: {
    label: 'Coaching Provider',
    description: 'Coaching institute / academy',
  },
  tutor: {
    label: 'Individual Tutor',
    description: 'Educator profile',
  },
}
