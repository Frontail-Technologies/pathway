import {
  type PromotionKind,
  type PromotionTargetType,
  type PromotionPlacement,
  type PromotionStatus,
  promotionKindMap,
  promotionPlacementMap,
  promotionTargetTypeMap,
  promotionStatusMap,
} from '@/features/admin/data/admin-promotions'

export const promotionKindFilterOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'featured', label: 'Featured (Editorial)' },
  { value: 'sponsored', label: 'Sponsored (Commercial)' },
]

export const promotionTargetTypeFilterOptions = [
  { value: 'all', label: 'All Target Types' },
  { value: 'institution', label: 'Institutions' },
  { value: 'program', label: 'Degree Programs' },
  { value: 'scholarship', label: 'Scholarships' },
  { value: 'exam', label: 'Entrance Exams' },
  { value: 'tutor', label: 'Individual Tutors' },
  { value: 'coaching', label: 'Coaching Providers' },
]

export const promotionPlacementFilterOptions = [
  { value: 'all', label: 'All Placements' },
  { value: 'home_featured_colleges', label: 'Homepage — Featured Colleges' },
  { value: 'home_featured_courses', label: 'Homepage — Featured Programs' },
  { value: 'home_hero_support', label: 'Homepage — Hero Support Strip' },
  { value: 'college_listing_featured', label: 'College Directory Spotlight' },
  { value: 'course_listing_featured', label: 'Course Directory Spotlight' },
  { value: 'scholarship_listing_featured', label: 'Scholarships Spotlight' },
  { value: 'tutor_listing_featured', label: 'Tutors Featured Rail' },
  { value: 'coaching_listing_featured', label: 'Coaching Featured Rail' },
]

export const promotionStatusFilterOptions = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'paused', label: 'Paused' },
  { value: 'ended', label: 'Ended' },
  { value: 'draft', label: 'Draft' },
]

export {
  promotionKindMap,
  promotionPlacementMap,
  promotionTargetTypeMap,
  promotionStatusMap,
}
export type {
  PromotionKind,
  PromotionTargetType,
  PromotionPlacement,
  PromotionStatus,
}
