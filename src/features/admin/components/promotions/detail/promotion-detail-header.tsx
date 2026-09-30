import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { PromotionKindBadge } from '../shared/promotion-kind-badge'
import { PromotionStatusBadge } from '../shared/promotion-status-badge'
import { ArrowLeft, Edit } from 'lucide-react'
import Link from 'next/link'

export function PromotionDetailHeader({ promotion }: { promotion: AdminPromotion }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/promotions"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Placements</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              {promotion.label || `${promotion.kindLabel} #${promotion.id}`}
            </h1>
            <PromotionKindBadge kind={promotion.kind} />
            <PromotionStatusBadge status={promotion.effectiveStatus} />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>ID: <code className="font-mono text-foreground font-medium">{promotion.id}</code></span>
            <span>•</span>
            <span>Placement: {promotion.placementLabel}</span>
          </div>
        </div>

        <Link
          href={`/admin/promotions/${promotion.id}/edit`}
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md border border-input bg-background hover:bg-muted transition-colors text-foreground shrink-0 self-start sm:self-auto"
        >
          <Edit className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Edit Placement</span>
        </Link>
      </div>
    </div>
  )
}
