export type NoteType =
  | 'chapter_notes'
  | 'revision_notes'
  | 'formula_sheet'
  | 'exam_notes'
  | 'lecture_notes'
  | 'practice_material'
  | 'other'

export const noteTypeMap: Record<
  NoteType,
  { label: string; description: string }
> = {
  chapter_notes: {
    label: 'Chapter Notes',
    description: 'Comprehensive topic breakdowns and subject module summaries.',
  },
  revision_notes: {
    label: 'Revision Notes',
    description: 'Concise high-yield summaries tailored for quick revision.',
  },
  formula_sheet: {
    label: 'Formula Sheet',
    description: 'Consolidated equations, theorems, formulas, and key identities.',
  },
  exam_notes: {
    label: 'Exam Notes',
    description: 'Targeted preparation packs for competitive and entrance exams.',
  },
  lecture_notes: {
    label: 'Lecture Notes',
    description: 'Detailed classroom session notes and academic lecture transcripts.',
  },
  practice_material: {
    label: 'Practice Material',
    description: 'Question banks, model test sheets, and guided problem sets.',
  },
  other: {
    label: 'Other',
    description: 'Reference handbooks, charts, and supplementary educational aids.',
  },
}

export type StudyLevel =
  | 'undergraduate'
  | 'postgraduate'
  | 'class_12'
  | 'class_11'
  | 'class_10'
  | 'class_9'
  | 'diploma'
  | 'school'

export const studyLevelMap: Record<
  string,
  { label: string; description?: string }
> = {
  undergraduate: {
    label: 'Undergraduate',
    description: 'B.Tech, B.Sc, B.Com, MBBS, BA, BCA degree programs',
  },
  postgraduate: {
    label: 'Postgraduate',
    description: 'M.Tech, M.Sc, MBA, MS, MA, MCA master programs',
  },
  class_12: {
    label: 'Class 12',
    description: 'Senior Secondary / 12th Grade',
  },
  class_11: {
    label: 'Class 11',
    description: 'Higher Secondary / 11th Grade',
  },
  class_10: {
    label: 'Class 10',
    description: 'Secondary School / 10th Grade',
  },
  class_9: {
    label: 'Class 9',
    description: 'Secondary Foundation / 9th Grade',
  },
  diploma: {
    label: 'Diploma',
    description: 'Polytechnic & vocational diploma courses',
  },
  school: {
    label: 'School (K-12)',
    description: 'Primary & secondary general schooling',
  },
}

export function formatStudyLevel(level?: string): string {
  if (!level) return 'General'
  const normalized = level.toLowerCase().trim()
  if (studyLevelMap[normalized]) {
    return studyLevelMap[normalized].label
  }
  return level
    .split(/[_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

export const streamOptions = [
  { value: 'engineering_technology', label: 'Engineering & Technology' },
  { value: 'medicine_health', label: 'Medicine & Health Sciences' },
  { value: 'management_business', label: 'Management & Business' },
  { value: 'pure_sciences', label: 'Pure Sciences' },
  { value: 'commerce_banking', label: 'Commerce & Banking' },
  { value: 'law_legal', label: 'Law & Legal Studies' },
  { value: 'arts_humanities', label: 'Arts & Humanities' },
  { value: 'computer_applications', label: 'Computer Applications' },
  { value: 'general_foundation', label: 'General / Foundation' },
]

export const streamMap: Record<string, string> = {
  engineering_technology: 'Engineering & Technology',
  medicine_health: 'Medicine & Health Sciences',
  management_business: 'Management & Business',
  pure_sciences: 'Pure Sciences',
  commerce_banking: 'Commerce & Banking',
  law_legal: 'Law & Legal Studies',
  arts_humanities: 'Arts & Humanities',
  computer_applications: 'Computer Applications',
  general_foundation: 'General / Foundation',
  
  'Engineering & Technology': 'Engineering & Technology',
  'Medicine & Health Sciences': 'Medicine & Health Sciences',
  'Management & Business': 'Management & Business',
  'Pure Sciences': 'Pure Sciences',
  'Commerce & Banking': 'Commerce & Banking',
  'Law & Legal Studies': 'Law & Legal Studies',
  'Arts & Humanities': 'Arts & Humanities',
  'Computer Applications': 'Computer Applications',
  'General / Foundation': 'General / Foundation',
  engineering: 'Engineering & Technology',
  medicine: 'Medicine & Health Sciences',
  management: 'Management & Business',
  science: 'Pure Sciences',
  commerce: 'Commerce & Banking',
  law: 'Law & Legal Studies',
  arts: 'Arts & Humanities',
}

export function formatStream(stream?: string): string {
  if (!stream) return 'General'
  if (streamMap[stream]) return streamMap[stream]
  const normalized = stream.toLowerCase().trim()
  if (streamMap[normalized]) return streamMap[normalized]
  return stream
    .split(/[_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

export type PricingType = 'free' | 'paid'

export const pricingTypeMap: Record<
  PricingType,
  { label: string; description: string }
> = {
  free: {
    label: 'Free Notes',
    description: 'Open download for registered students.',
  },
  paid: {
    label: 'Paid Notes',
    description: 'Requires verified one-time payment.',
  },
}

export type NoteStatus = 'draft' | 'published' | 'archived'

export const noteStatusMap: Record<
  NoteStatus,
  {
    label: string
    variant: 'default' | 'secondary' | 'outline' | 'destructive'
    description: string
  }
> = {
  draft: {
    label: 'Draft',
    variant: 'secondary',
    description: 'In editing, visible only in Admin console.',
  },
  published: {
    label: 'Published',
    variant: 'default',
    description: 'Eligible for discovery, preview, and student access.',
  },
  archived: {
    label: 'Archived',
    variant: 'outline',
    description: 'Withdrawn from active discovery catalog.',
  },
}

export type NotePreviewAsset = {
  id?: string
  fileName?: string
  mimeType?: string
  fileSizeBytes?: number
  pageCount?: number
  publicUrl?: string
}

export type NoteDownloadAsset = {
  id?: string
  fileName?: string
  mimeType?: string
  fileSizeBytes?: number
  pageCount?: number
  assetId?: string
}

export type Note = {
  id: string
  slug: string
  title: string
  shortDescription?: string
  description?: string
  studyLevel?: string
  stream?: string
  subject?: string
  courseIds?: string[]
  examIds?: string[]
  noteType: NoteType
  pricingType: PricingType
  pricePaise?: number 
  currency: 'INR'
  previewAsset?: NotePreviewAsset
  downloadableAsset?: NoteDownloadAsset
  coverImage?: string
  authorName?: string
  providerName?: string
  status: NoteStatus
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}




 
export function formatINRFromPaise(pricePaise?: number): string {
  if (pricePaise === undefined || pricePaise === null || pricePaise === 0) {
    return 'Free'
  }
  const rupees = pricePaise / 100
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees)
}

export function formatFileSize(bytes?: number): string {
  if (!bytes || bytes === 0) return 'Unknown size'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}




 
export function formatDateTimeSafe(isoString?: string): string {
  if (!isoString) return '—'
  const d = new Date(isoString)
  if (isNaN(d.getTime())) return '—'
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const min = String(d.getUTCMinutes()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd} ${hh}:${min} UTC`
}
