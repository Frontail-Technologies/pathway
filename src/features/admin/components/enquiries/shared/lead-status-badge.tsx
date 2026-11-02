import type { LeadStatus } from '@/features/admin/data/admin-enquiries'
import { StatusBadge } from '@/features/admin/components/kit'
import { leadStatusLabels, leadStatusTones } from './enquiry-constants'

export function LeadStatusBadge({ status }: { status: LeadStatus | string }) {
  const key = (status in leadStatusLabels ? status : 'closed') as LeadStatus
  return <StatusBadge tone={leadStatusTones[key]}>{leadStatusLabels[key]}</StatusBadge>
}
