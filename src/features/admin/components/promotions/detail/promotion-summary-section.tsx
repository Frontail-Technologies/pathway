import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Layout, Sparkles, SlidersHorizontal, Info } from 'lucide-react'

export function PromotionSummarySection({ promotion }: { promotion: AdminPromotion }) {
  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold font-heading">
          Placement Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Promotion Kind
            </span>
            <p className="text-sm font-semibold text-foreground">
              {promotion.kind === 'sponsored' ? 'Sponsored (Commercial)' : 'Featured (Editorial)'}
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
              <Layout className="w-3.5 h-3.5 text-blue-500" />
              Assigned Placement
            </span>
            <p className="text-sm font-semibold text-foreground">
              {promotion.placementLabel}
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-purple-500" />
              Display Priority
            </span>
            <p className="text-sm font-semibold text-foreground">
              {promotion.priority ? `Priority ${promotion.priority}` : 'Default (0)'}
            </p>
          </div>
        </div>

        {promotion.notes ? (
          <div className="p-3.5 bg-muted/20 rounded-lg border border-border/50 text-xs space-y-1">
            <div className="font-semibold text-foreground flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
              Internal Admin Notes
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {promotion.notes}
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
