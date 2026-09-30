import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { PromotionStatusBadge } from '../shared/promotion-status-badge'

export function PromotionStatusPanel({ promotion }: { promotion: AdminPromotion }) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Placement Status
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Effective State:</span>
          <PromotionStatusBadge status={promotion.effectiveStatus} />
        </div>

        <div className="p-3 bg-muted/20 rounded-lg text-[11px] text-muted-foreground space-y-1">
          <div className="font-semibold text-foreground">Schedule Automation</div>
          <p className="leading-relaxed">
            Status evaluates automatically from scheduled start and end dates relative to the current platform clock.
          </p>
        </div>
      </div>
    </div>
  )
}
