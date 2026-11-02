import type { ModerationStatus } from '@/features/admin/data/admin-reviews'
import { StatusBadge } from '@/features/admin/components/kit'
import { moderationStatusLabels, moderationStatusTones } from './review-constants'

export function ModerationStatusBadge({ status }: { status?: ModerationStatus }) {
  const current = status ?? 'published'
  return <StatusBadge tone={moderationStatusTones[current]}>{moderationStatusLabels[current]}</StatusBadge>
}
