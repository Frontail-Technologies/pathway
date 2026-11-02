import type { StatusTone } from '@/features/admin/components/kit'
import type { ContentCategory, ContentStatus, ContentType, RelatedEntityType } from '@/features/admin/data/admin-content'

export type { ContentCategory, ContentStatus, ContentType, RelatedEntityType }

/** Admin-facing labels, sentence case. The shared content maps carry public-facing copy. */
export const contentTypeLabels: Record<ContentType, string> = {
  article: 'Article',
  guide: 'Guide',
  news: 'News',
  explainer: 'Explainer',
}

export const contentStatusLabels: Record<ContentStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
}

export const contentStatusTones: Record<ContentStatus, StatusTone> = {
  draft: 'neutral',
  published: 'success',
  archived: 'neutral',
}

export const contentStatusHints: Record<ContentStatus, string> = {
  draft: 'Only admins can see drafts.',
  published: 'Ready to show on the site.',
  archived: 'Kept for reference, not shown on the site.',
}

export const contentCategoryLabels: Record<ContentCategory, string> = {
  admissions: 'Admissions',
  exams: 'Exams',
  colleges: 'Colleges',
  courses: 'Courses',
  careers: 'Careers',
  study_abroad: 'Study abroad',
  scholarships: 'Scholarships',
  general: 'General',
}

export const relatedEntityTypeLabels: Record<RelatedEntityType, string> = {
  institution: 'Institution',
  program: 'Course',
  scholarship: 'Scholarship',
  exam: 'Exam',
  tutor: 'Tutor',
  coaching: 'Coaching',
}

const toOptions = <K extends string>(labels: Record<K, string>) => (Object.keys(labels) as K[]).map((value) => ({ value, label: labels[value] }))

export const contentTypeOptions = toOptions(contentTypeLabels)
export const contentStatusOptions = toOptions(contentStatusLabels)
export const contentCategoryOptions = toOptions(contentCategoryLabels)
export const relatedEntityTypeOptions = toOptions(relatedEntityTypeLabels)

export function formatContentDate(value?: string) {
  if (!value) return null
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
