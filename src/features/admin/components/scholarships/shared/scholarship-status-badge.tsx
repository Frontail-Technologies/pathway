import { type AdminDataQualityStatus, type AdminContentStatus } from '@/features/admin/data/admin-scholarships'
import { type ApplicationStatus } from '@/features/scholarships/data/scholarships'
import { StatusBadge } from '../../kit'
import { qualityBadgeStyles, statusBadgeStyles, applicationStatusBadgeStyles } from './scholarship-constants'

export function ScholarshipQualityBadge({ status }: { status: AdminDataQualityStatus }) {
  const config = qualityBadgeStyles[status] ?? qualityBadgeStyles.needs_review
  return <StatusBadge tone={config.tone}>{config.label}</StatusBadge>
}

export function ScholarshipContentStatusBadge({ status }: { status: AdminContentStatus }) {
  const config = statusBadgeStyles[status] ?? statusBadgeStyles.basic
  return <StatusBadge tone={config.tone}>{config.label}</StatusBadge>
}

export function ScholarshipApplicationStatusBadge({ status }: { status: ApplicationStatus | 'not-recorded' }) {
  const config = applicationStatusBadgeStyles[status] ?? applicationStatusBadgeStyles['not-recorded']
  return <StatusBadge tone={config.tone}>{config.label}</StatusBadge>
}
