import { Badge } from '@/components/ui/badge'
import type { ModerationStatus } from '@/features/admin/data/admin-reviews'
import { moderationStatusMap } from '@/features/admin/data/admin-reviews'
import { CheckCircle2, Clock, EyeOff, AlertTriangle } from 'lucide-react'

const statusConfig: Record<
  ModerationStatus,
  { variant: 'success' | 'warning' | 'muted' | 'destructive'; icon: React.ComponentType<{ className?: string }> }
> = {
  published: {
    variant: 'success',
    icon: CheckCircle2,
  },
  pending: {
    variant: 'warning',
    icon: Clock,
  },
  hidden: {
    variant: 'muted',
    icon: EyeOff,
  },
  flagged: {
    variant: 'destructive',
    icon: AlertTriangle,
  },
}

export function ModerationStatusBadge({
  status,
}: {
  status?: ModerationStatus
}) {
  const currentStatus = status ?? 'published'
  const config = statusConfig[currentStatus] || statusConfig.published
  const meta = moderationStatusMap[currentStatus]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} size="sm">
      <Icon />
      <span>{meta?.label ?? currentStatus}</span>
    </Badge>
  )
}
