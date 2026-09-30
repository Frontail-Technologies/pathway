import {
  type ContentType,
  type ContentStatus,
  type ContentCategory,
  contentTypeMap,
  contentStatusMap,
  contentCategoryMap,
} from '@/features/admin/data/admin-content'

export const contentTypeOptions: { value: ContentType; label: string }[] = [
  { value: 'article', label: 'Article' },
  { value: 'guide', label: 'Guide' },
  { value: 'news', label: 'News & Circular' },
  { value: 'explainer', label: 'Explainer' },
]

export const contentStatusOptions: { value: ContentStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
]

export const contentCategoryOptions: { value: ContentCategory; label: string }[] = [
  { value: 'admissions', label: 'Admissions' },
  { value: 'exams', label: 'Exams & Prep' },
  { value: 'colleges', label: 'Institutions' },
  { value: 'courses', label: 'Programs & Courses' },
  { value: 'careers', label: 'Careers & Industry' },
  { value: 'study_abroad', label: 'Study Abroad' },
  { value: 'scholarships', label: 'Scholarships & Aid' },
  { value: 'general', label: 'General Guidance' },
]

export const contentTypeFilterOptions = [
  { value: 'all', label: 'All Types' },
  ...contentTypeOptions,
]

export const contentStatusFilterOptions = [
  { value: 'all', label: 'All Statuses' },
  ...contentStatusOptions,
]

export const contentCategoryFilterOptions = [
  { value: 'all', label: 'All Categories' },
  ...contentCategoryOptions,
]

export {
  contentTypeMap,
  contentStatusMap,
  contentCategoryMap,
}
export type {
  ContentType,
  ContentStatus,
  ContentCategory,
}
