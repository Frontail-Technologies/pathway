import { Badge } from '@/components/ui/badge'
import type { PromotionStatus } from '@/features/admin/data/admin-promotions'
import { promotionStatusMap } from '@/features/admin/data/admin-promotions'
import { CheckCircle2, Clock, Pause, StopCircle, FileText } from 'lucide-react'

const statusConfig: Record<
  PromotionStatus,
  { variant: 'success' | 'info' | 'warning' | 'muted'; icon: React.ComponentType<{ className?: string }> }
> = {
  active: {
    variant: 'success',
    icon: CheckCircle2,
  },
  scheduled: {
    variant: 'info',
    icon: Clock,
  },
  paused: {
    variant: 'warning',
    icon: Pause,
  },
  ended: {
    variant: 'muted',
    icon: StopCircle,
  },
  draft: {
    variant: 'muted',
    icon: FileText,
  },
}

export function PromotionStatusBadge({
  status,
}: {
  status: PromotionStatus
}) {
  const config = statusConfig[status] || statusConfig.draft
  const meta = promotionStatusMap[status]
  const Icon = config.icon

  return (
    <Badge variant={config.variant} size="sm">
      <Icon />
      <span>{meta?.label ?? status}</span>
    </Badge>
  )
}
