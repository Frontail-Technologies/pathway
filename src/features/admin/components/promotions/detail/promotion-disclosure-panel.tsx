import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { PromotionKindBadge } from '../shared/promotion-kind-badge'
import { ShieldAlert, CheckCircle2 } from 'lucide-react'

export function PromotionDisclosurePanel({ promotion }: { promotion: AdminPromotion }) {
  return (
    <div className="bg-card rounded-xl p-4 shadow-xs border-0 space-y-3">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
        Public Disclosure Policy
      </h3>

      <div className="space-y-2.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Promotion Kind:</span>
          <PromotionKindBadge kind={promotion.kind} />
        </div>

        {promotion.kind === 'sponsored' ? (
          <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 text-purple-950 space-y-1.5 text-[11px]">
            <div className="font-semibold flex items-center gap-1.5 text-purple-900">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-700" />
              Mandatory Sponsored Label
            </div>
            <p className="leading-relaxed text-purple-800">
              Commercial promotions must prominently render the public <code className="font-semibold px-1 py-0.2 bg-purple-100/80 rounded text-purple-900">Sponsored</code> badge. Deceptive native advertisement treatments are strictly prohibited.
            </p>
          </div>
        ) : (
          <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 text-amber-950 space-y-1.5 text-[11px]">
            <div className="font-semibold flex items-center gap-1.5 text-amber-900">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              Editorial Highlight
            </div>
            <p className="leading-relaxed text-amber-800">
              Editorial featured placements are curated by Pathway academic editors based on curriculum quality and student interest.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
