import type { SeoTargetType } from '@/features/seo/types/seo-metadata'
import { StatusBadge, type StatusTone } from '../../kit'

/** Short, plain names for what an SEO record applies to. */
export const seoTargetTypeLabels: Record<SeoTargetType, string> = {
  static_page: 'Page',
  institution: 'Institution',
  program: 'Course',
  exam: 'Exam',
  scholarship: 'Scholarship',
  tutor: 'Tutor',
  coaching: 'Coaching',
  note: 'Note',
}

export const seoTargetTypeOptions = (Object.keys(seoTargetTypeLabels) as SeoTargetType[]).map((value) => ({ value, label: seoTargetTypeLabels[value] }))

export const seoIndexingOptions = [
  { value: 'inherited', label: 'Default' },
  { value: 'indexable', label: 'Indexed' },
  { value: 'noindex', label: 'Not indexed' },
]

export function getSeoIndexing(robotsIndex?: boolean, robotsFollow?: boolean): { label: string; tone: StatusTone } {
  if (robotsIndex === undefined) {
    return robotsFollow === false ? { label: 'Links not followed', tone: 'warning' } : { label: 'Default', tone: 'neutral' }
  }
  if (robotsIndex) {
    return robotsFollow === false ? { label: 'Indexed, links not followed', tone: 'warning' } : { label: 'Indexed', tone: 'success' }
  }
  return robotsFollow === true ? { label: 'Not indexed, links followed', tone: 'warning' } : { label: 'Not indexed', tone: 'warning' }
}

export function SeoIndexingBadge({ robotsIndex, robotsFollow }: { robotsIndex?: boolean; robotsFollow?: boolean }) {
  const state = getSeoIndexing(robotsIndex, robotsFollow)
  return <StatusBadge tone={state.tone}>{state.label}</StatusBadge>
}
