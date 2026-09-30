export type ContentType = 'article' | 'guide' | 'news' | 'explainer'

export type ContentStatus = 'draft' | 'published' | 'archived'

export type ContentCategory =
  | 'admissions'
  | 'exams'
  | 'colleges'
  | 'courses'
  | 'careers'
  | 'study_abroad'
  | 'scholarships'
  | 'general'

export type RelatedEntityType =
  | 'institution'
  | 'program'
  | 'scholarship'
  | 'exam'
  | 'tutor'
  | 'coaching'

export type RelatedEntityRef = {
  entityType: RelatedEntityType
  entityId: string
}

export type ContentEntry = {
  id: string
  slug: string
  type: ContentType
  title: string
  excerpt?: string
  body?: string
  category?: ContentCategory
  tags?: string[]
  authorName?: string
  heroImage?: string
  status: ContentStatus
  publishedAt?: string
  updatedAt?: string
  createdAt?: string
  relatedEntityRefs?: RelatedEntityRef[]
  scraperExcluded?: boolean
}

export const contentTypeMap: Record<
  ContentType,
  { label: string; description: string }
> = {
  article: {
    label: 'Article',
    description: 'In-depth editorial analysis, education trends, and comprehensive commentary.',
  },
  guide: {
    label: 'Guide',
    description: 'Step-by-step guidance for admissions, preparation strategies, and decision-making.',
  },
  news: {
    label: 'News & Circular',
    description: 'Timely notifications, official government circulars, and exam schedule announcements.',
  },
  explainer: {
    label: 'Explainer',
    description: 'Clear breakdowns of complex admission criteria, quotas, cutoffs, and regulatory changes.',
  },
}

export const contentStatusMap: Record<
  ContentStatus,
  { label: string; description: string }
> = {
  draft: {
    label: 'Draft',
    description: 'Work in progress. Not visible on public surfaces.',
  },
  published: {
    label: 'Published',
    description: 'Active and available for editorial rendering.',
  },
  archived: {
    label: 'Archived',
    description: 'Retired editorial piece preserved for administrative history.',
  },
}

export const contentCategoryMap: Record<
  ContentCategory,
  { label: string; description: string }
> = {
  admissions: {
    label: 'Admissions',
    description: 'Counselling, quotas, cutoffs, and application procedures',
  },
  exams: {
    label: 'Exams & Prep',
    description: 'Entrance examination syllabus, pattern, and preparation',
  },
  colleges: {
    label: 'Institutions',
    description: 'Campus life, faculty, accreditation, and NIRF reviews',
  },
  courses: {
    label: 'Programs & Courses',
    description: 'Degree curriculum, specialisations, and academic scope',
  },
  careers: {
    label: 'Careers & Industry',
    description: 'Career opportunities, job roles, and placement insights',
  },
  study_abroad: {
    label: 'Study Abroad',
    description: 'International destinations, visa guidelines, and test scores',
  },
  scholarships: {
    label: 'Scholarships & Aid',
    description: 'Financial assistance, grants, fee waivers, and schemes',
  },
  general: {
    label: 'General Guidance',
    description: 'General education advice and student life',
  },
}

export const relatedEntityTypeMap: Record<RelatedEntityType, { label: string }> = {
  institution: { label: 'Institution' },
  program: { label: 'Degree Program' },
  scholarship: { label: 'Scholarship' },
  exam: { label: 'Entrance Exam' },
  tutor: { label: 'Individual Tutor' },
  coaching: { label: 'Coaching Provider' },
}
