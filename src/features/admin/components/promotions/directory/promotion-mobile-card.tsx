import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { PromotionKindBadge } from '../shared/promotion-kind-badge'
import { PromotionStatusBadge } from '../shared/promotion-status-badge'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Calendar } from 'lucide-react'
import Link from 'next/link'

export function PromotionMobileCard({ promotion }: { promotion: AdminPromotion }) {
  return (
    <div className="bg-card rounded-xl p-4 border border-border/60 shadow-xs space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 min-w-0">
          <div className="font-semibold text-sm text-foreground truncate">
            {promotion.label || `${promotion.kindLabel} #${promotion.id}`}
          </div>
          <p className="text-xs text-muted-foreground font-mono">#{promotion.id}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <PromotionKindBadge kind={promotion.kind} />
          <PromotionStatusBadge status={promotion.effectiveStatus} />
        </div>
      </div>

      <div className="pt-2 border-t border-border/40 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="space-y-0.5">
          <div className="font-medium text-foreground">
            {promotion.targetName || promotion.targetId}
          </div>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal text-muted-foreground border-border/60">
            {promotion.targetTypeLabel}
          </Badge>
        </div>
        <div className="text-right text-muted-foreground text-[11px]">
          <div>{promotion.placementLabel}</div>
          {promotion.priority ? <div>Priority: {promotion.priority}</div> : null}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
        <div className="text-muted-foreground flex items-center gap-1 text-[11px]">
          <Calendar className="w-3 h-3" />
          <span>
            {promotion.startsAt
              ? new Date(promotion.startsAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })
              : 'Immediate'}{' '}
            –{' '}
            {promotion.endsAt
              ? new Date(promotion.endsAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                })
              : 'Ongoing'}
          </span>
        </div>
        <Link
          href={`/admin/promotions/${promotion.id}`}
          className="inline-flex items-center h-7 px-2 text-xs font-medium rounded text-foreground hover:text-primary hover:bg-muted transition-colors"
        >
          Details
          <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  )
}
