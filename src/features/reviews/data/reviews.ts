import type { Review, ReviewEntityType } from '../types/review'

export const canonicalReviews: Review[] = []

export function getCanonicalReviews(): Review[] {
  return canonicalReviews
}

export function getCanonicalReviewById(id: string): Review | undefined {
  return canonicalReviews.find((r) => r.id === id)
}

export function getCanonicalReviewsByEntity(
  entityType: ReviewEntityType,
  entityId: string
): Review[] {
  return canonicalReviews.filter(
    (r) => r.entityType === entityType && r.entityId === entityId
  )
}
