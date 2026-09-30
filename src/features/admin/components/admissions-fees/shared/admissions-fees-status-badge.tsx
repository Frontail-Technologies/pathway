import { Badge } from '@/components/ui/badge'
import {
  type AdminDataQualityStatus,
  type AdminContentStatus,
} from '@/features/admin/data/admin-admissions-fees'
import {
  qualityBadgeStyles,
  directoryQualityBadgeStyles,
  statusBadgeStyles,
} from './admissions-fees-constants'

export function OfferingQualityBadge({
  status,
  compact = false,
}: {
  status: AdminDataQualityStatus
  compact?: boolean
}) {
  const cfg = compact ? directoryQualityBadgeStyles[status] : qualityBadgeStyles[status]
  return (
    <Badge variant={cfg.variant} size="sm">
      {cfg.label}
    </Badge>
  )
}

export function OfferingContentStatusBadge({
  status,
}: {
  status: AdminContentStatus
}) {
  const cfg = statusBadgeStyles[status]
  return (
    <Badge variant={cfg.variant} size="sm">
      {cfg.label}
    </Badge>
  )
}
