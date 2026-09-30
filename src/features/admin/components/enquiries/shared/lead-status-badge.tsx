import { Badge } from '@/components/ui/badge'
import type { LeadStatus } from '@/features/admin/data/admin-enquiries'

const leadStatusBadgeConfig = {
  new: { label: 'New', variant: 'info' },
  contacted: { label: 'Contacted', variant: 'warning' },
  qualified: { label: 'Qualified', variant: 'info' },
  converted: { label: 'Converted', variant: 'success' },
  closed: { label: 'Closed', variant: 'muted' },
} as const

export function LeadStatusBadge({
  status,
}: {
  status: LeadStatus | string
}) {
  const config = leadStatusBadgeConfig[status as LeadStatus] ?? leadStatusBadgeConfig.closed

  return <Badge variant={config.variant} size="sm">{config.label}</Badge>
}
