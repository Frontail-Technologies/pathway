import type { AdminTutorPortraitStatus, AdminTutorQualityStatus } from '@/features/admin/data/admin-tutors'
import type { AdminCoachingQualityStatus } from '@/features/admin/data/admin-coaching'
import { StatusBadge, type StatusTone } from '../../kit'

type QualityStatus = AdminTutorQualityStatus | AdminCoachingQualityStatus

const qualityMeta: Record<QualityStatus, { label: string; tone: StatusTone }> = {
  Ready: { label: 'Ready', tone: 'success' },
  'Needs Review': { label: 'Needs review', tone: 'warning' },
  Conflict: { label: 'Conflict', tone: 'danger' },
  Missing: { label: 'Missing data', tone: 'neutral' },
}

export const QUALITY_FILTER_OPTIONS = (Object.keys(qualityMeta) as QualityStatus[]).map((value) => ({ value, label: qualityMeta[value].label }))

/** The single status shown for a tutor or coaching provider: whether the record is ready to publish. */
export function QualityStatusBadge({ status }: { status: QualityStatus }) {
  const meta = qualityMeta[status] ?? qualityMeta.Missing
  return <StatusBadge tone={meta.tone}>{meta.label}</StatusBadge>
}

export const portraitLabel: Record<AdminTutorPortraitStatus, string> = {
  real: 'Photo',
  illustration: 'Illustrated avatar',
  missing: 'No portrait',
}

export function PublicPageBadge({ live }: { live: boolean }) {
  return live ? <StatusBadge tone="success">Public page live</StatusBadge> : <StatusBadge>Listing only</StatusBadge>
}
