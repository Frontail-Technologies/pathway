import { Badge } from '@/components/ui/badge'
import {
  type AdminDataQualityStatus,
  type AdminContentStatus,
} from '@/features/admin/data/admin-scholarships'
import { type ApplicationStatus } from '@/features/scholarships/data/scholarships'
import {
  qualityBadgeStyles,
  statusBadgeStyles,
  applicationStatusBadgeStyles,
} from './scholarship-constants'

export function ScholarshipQualityBadge({ status }: { status: AdminDataQualityStatus }) {
  const config = qualityBadgeStyles[status] || qualityBadgeStyles.needs_review
  return (
    <Badge variant={config.variant} size="sm">
      {config.label}
    </Badge>
  )
}

export function ScholarshipContentStatusBadge({ status }: { status: AdminContentStatus }) {
  const config = statusBadgeStyles[status] || statusBadgeStyles.basic
  return (
    <Badge variant={config.variant} size="xs">
      {config.label}
    </Badge>
  )
}

export function ScholarshipApplicationStatusBadge({
  status,
}: {
  status: ApplicationStatus | 'not-recorded'
}) {
  const config =
    applicationStatusBadgeStyles[status] || applicationStatusBadgeStyles['not-recorded']
  return (
    <Badge variant={config.variant} size="sm">
      {config.label}
    </Badge>
  )
}
