import type { StatusTone } from '@/features/admin/components/kit'
import type { AdminPromotion, PromotionKind, PromotionPlacement, PromotionStatus, PromotionTargetType } from '@/features/admin/data/admin-promotions'
import { promotionPlacementMap } from '@/features/admin/data/admin-promotions'

export type { PromotionKind, PromotionPlacement, PromotionStatus, PromotionTargetType }

/** Admin-facing labels, sentence case. */
export const promotionKindLabels: Record<PromotionKind, string> = {
  featured: 'Featured',
  sponsored: 'Sponsored',
}

export const promotionKindHints: Record<PromotionKind, string> = {
  featured: 'Picked by the Pathway team. No paid label.',
  sponsored: 'Paid placement. The site shows a "Sponsored" label next to it.',
}

export const promotionStatusLabels: Record<PromotionStatus, string> = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  active: 'Live',
  paused: 'Paused',
  ended: 'Ended',
}

export const promotionStatusTones: Record<PromotionStatus, StatusTone> = {
  draft: 'neutral',
  scheduled: 'info',
  active: 'success',
  paused: 'warning',
  ended: 'neutral',
}

export const promotionStatusHints: Record<PromotionStatus, string> = {
  draft: 'Not shown on the site.',
  scheduled: 'Goes live at the start date.',
  active: 'Showing on the site.',
  paused: 'Hidden until you resume it.',
  ended: 'The end date has passed.',
}

export const promotionPlacementLabels: Record<PromotionPlacement, string> = {
  home_featured_colleges: 'Homepage · featured colleges',
  home_featured_courses: 'Homepage · featured courses',
  home_hero_support: 'Homepage · below the hero',
  college_listing_featured: 'Colleges list · top',
  course_listing_featured: 'Courses list · top',
  scholarship_listing_featured: 'Scholarships list · top',
  tutor_listing_featured: 'Tutors list · featured',
  coaching_listing_featured: 'Coaching list · featured',
}

export const promotionTargetTypeLabels: Record<PromotionTargetType, string> = {
  institution: 'Institution',
  program: 'Course',
  scholarship: 'Scholarship',
  exam: 'Exam',
  tutor: 'Tutor',
  coaching: 'Coaching',
}

const toOptions = <K extends string>(labels: Record<K, string>) => (Object.keys(labels) as K[]).map((value) => ({ value, label: labels[value] }))

export const promotionKindOptions = toOptions(promotionKindLabels)
export const promotionStatusOptions = toOptions(promotionStatusLabels)
export const promotionPlacementOptions = toOptions(promotionPlacementLabels)
export const promotionTargetTypeOptions = toOptions(promotionTargetTypeLabels)

export const placementSlots = (placement: PromotionPlacement) => promotionPlacementMap[placement]?.maxSlots

/** A readable name for a placement that has no label of its own. */
export function promotionTitle(promotion: AdminPromotion) {
  return promotion.label || promotion.targetName || promotion.targetId
}

export function formatPromotionDate(value?: string) {
  if (!value) return null
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatPromotionWindow(startsAt?: string, endsAt?: string) {
  if (!startsAt && !endsAt) return 'No end date'
  return `${formatPromotionDate(startsAt) ?? 'Now'} – ${formatPromotionDate(endsAt) ?? 'no end date'}`
}
