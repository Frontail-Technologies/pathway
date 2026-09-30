import { colleges } from '@/features/colleges/data/colleges'
import { coachingProviders } from '@/features/coaching/data/coaching'
import { tutors } from '@/features/tutors/data/tutors'
import type {
  Review,
  ReviewSource,
  ReviewEntityType,
  ModerationStatus,
} from '@/features/reviews/types/review'
import {
  reviewSourceMap,
  moderationStatusMap,
  reviewEntityTypeMap,
} from '@/features/reviews/types/review'
import { canonicalReviews } from '@/features/reviews/data/reviews'

export type { Review, ReviewSource, ReviewEntityType, ModerationStatus }
export { reviewSourceMap, moderationStatusMap, reviewEntityTypeMap }

export type AdminReview = Review & {
  targetName?: string
  targetAdminUrl?: string
  sourceLabel: string
  sourceShortLabel: string
  statusLabel: string
  entityTypeLabel: string
  isGoogleReview: boolean
  isPathwayNative: boolean
  scraperExcluded: boolean
}

export function resolveReviewEntityDetails(
  type?: ReviewEntityType,
  id?: string
): { name?: string; adminUrl?: string } {
  if (!type || !id) return {}

  switch (type) {
    case 'institution': {
      const col = colleges.find((c) => c.slug === id || c.id === id)
      return {
        name: col?.name ?? id,
        adminUrl: col ? `/admin/institutions/${col.id || col.slug}` : undefined,
      }
    }
    case 'coaching': {
      const coa = coachingProviders.find((c) => c.slug === id || c.id === id)
      return {
        name: coa?.name ?? id,
        adminUrl: coa ? `/admin/tutors-coaching/coaching/${coa.id || coa.slug}` : undefined,
      }
    }
    case 'tutor': {
      const tut = tutors.find((t) => t.slug === id || t.id === id)
      return {
        name: tut?.name ?? id,
        adminUrl: tut ? `/admin/tutors-coaching/tutors/${tut.id || tut.slug}` : undefined,
      }
    }
    default:
      return { name: id }
  }
}

export function mapToAdminReview(review: Review): AdminReview {
  const resolved = resolveReviewEntityDetails(review.entityType, review.entityId)
  const isGoogleReview = review.source === 'google'
  const isPathwayNative = review.source === 'pathway'

  return {
    ...review,
    targetName: resolved.name,
    targetAdminUrl: resolved.adminUrl,
    sourceLabel: reviewSourceMap[review.source]?.label ?? review.source,
    sourceShortLabel: reviewSourceMap[review.source]?.shortLabel ?? review.source,
    statusLabel:
      review.moderationStatus
        ? moderationStatusMap[review.moderationStatus]?.label ?? review.moderationStatus
        : 'Published',
    entityTypeLabel:
      reviewEntityTypeMap[review.entityType]?.label ?? review.entityType,
    isGoogleReview,
    isPathwayNative,
    scraperExcluded: true,
  }
}

export function getAdminReviews(): AdminReview[] {
  return canonicalReviews.map(mapToAdminReview)
}

export function getAdminReviewById(id: string): AdminReview | undefined {
  const item = canonicalReviews.find((r) => r.id === id)
  if (!item) return undefined
  return mapToAdminReview(item)
}

export function getAdminReviewsByEntity(
  entityType: ReviewEntityType,
  entityId: string
): AdminReview[] {
  return canonicalReviews
    .filter((r) => r.entityType === entityType && r.entityId === entityId)
    .map(mapToAdminReview)
}

export function getReviewModerationStats(): Record<ModerationStatus, number> {
  const stats: Record<ModerationStatus, number> = {
    pending: 0,
    published: 0,
    hidden: 0,
    flagged: 0,
  }

  canonicalReviews.forEach((r) => {
    if (r.moderationStatus && stats[r.moderationStatus] !== undefined) {
      stats[r.moderationStatus] += 1
    }
  })

  return stats
}
