export type PromotionKind = 'featured' | 'sponsored'

export type PromotionTargetType =
  | 'institution'
  | 'program'
  | 'scholarship'
  | 'exam'
  | 'tutor'
  | 'coaching'

export type PromotionPlacement =
  | 'home_featured_colleges'
  | 'home_featured_courses'
  | 'home_hero_support'
  | 'college_listing_featured'
  | 'course_listing_featured'
  | 'scholarship_listing_featured'
  | 'tutor_listing_featured'
  | 'coaching_listing_featured'

export type PromotionStatus = 'draft' | 'scheduled' | 'active' | 'paused' | 'ended'

export type Promotion = {
  id: string
  kind: PromotionKind
  targetType: PromotionTargetType
  targetId: string
  placement: PromotionPlacement
  status: PromotionStatus
  startsAt?: string
  endsAt?: string
  priority?: number
  label?: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export const promotionKindMap: Record<
  PromotionKind,
  { label: string; description: string; disclosureText: string }
> = {
  featured: {
    label: 'Featured (Editorial)',
    description: 'Curated editorial selection highlighted for academic relevance.',
    disclosureText: 'Featured',
  },
  sponsored: {
    label: 'Sponsored (Commercial)',
    description: 'Commercially promoted placement requiring explicit public disclosure.',
    disclosureText: 'Sponsored',
  },
}

export const promotionPlacementMap: Record<
  PromotionPlacement,
  { label: string; surface: string; maxSlots: number }
> = {
  home_featured_colleges: {
    label: 'Homepage — Featured Colleges',
    surface: 'Homepage',
    maxSlots: 4,
  },
  home_featured_courses: {
    label: 'Homepage — Featured Programs',
    surface: 'Homepage',
    maxSlots: 4,
  },
  home_hero_support: {
    label: 'Homepage — Hero Support Strip',
    surface: 'Homepage',
    maxSlots: 3,
  },
  college_listing_featured: {
    label: 'College Directory — Top Spotlight',
    surface: 'Colleges Listing',
    maxSlots: 2,
  },
  course_listing_featured: {
    label: 'Course Directory — Top Spotlight',
    surface: 'Courses Listing',
    maxSlots: 2,
  },
  scholarship_listing_featured: {
    label: 'Scholarships Directory — Top Spotlight',
    surface: 'Scholarships Listing',
    maxSlots: 2,
  },
  tutor_listing_featured: {
    label: 'Tutors Directory — Featured Educator Rail',
    surface: 'Tutors Listing',
    maxSlots: 3,
  },
  coaching_listing_featured: {
    label: 'Coaching Directory — Featured Institute Rail',
    surface: 'Coaching Listing',
    maxSlots: 3,
  },
}

export const promotionTargetTypeMap: Record<
  PromotionTargetType,
  { label: string; description: string }
> = {
  institution: { label: 'Institution', description: 'Colleges / Universities' },
  program: { label: 'Degree Program', description: 'Undergraduate / Postgraduate courses' },
  scholarship: { label: 'Scholarship', description: 'Financial aid / grants' },
  exam: { label: 'Entrance Exam', description: 'National / state exams' },
  tutor: { label: 'Individual Tutor', description: 'Educator profile' },
  coaching: { label: 'Coaching Provider', description: 'Coaching institute' },
}

export const promotionStatusMap: Record<
  PromotionStatus,
  { label: string; description: string }
> = {
  active: { label: 'Active', description: 'Currently rendered in designated placement slot.' },
  scheduled: { label: 'Scheduled', description: 'Configured for future activation window.' },
  paused: { label: 'Paused', description: 'Temporarily suppressed from public rendering.' },
  ended: { label: 'Ended', description: 'Campaign schedule has concluded.' },
  draft: { label: 'Draft', description: 'Placement configuration pending final review.' },
}

export function getPromotionScheduleStatus(
  promotion: Promotion,
  now: Date = new Date()
): PromotionStatus {
  if (promotion.status === 'paused' || promotion.status === 'draft') {
    return promotion.status
  }

  const nowMs = now.getTime()
  const startMs = promotion.startsAt ? new Date(promotion.startsAt).getTime() : null
  const endMs = promotion.endsAt ? new Date(promotion.endsAt).getTime() : null

  if (startMs && startMs > nowMs) {
    return 'scheduled'
  }

  if (endMs && endMs < nowMs) {
    return 'ended'
  }

  return 'active'
}
