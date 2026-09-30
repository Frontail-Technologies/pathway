import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock } from 'lucide-react'

export function PromotionScheduleSection({ promotion }: { promotion: AdminPromotion }) {
  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold font-heading">
          Schedule & Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              Activation Start
            </span>
            <p className="text-sm font-semibold text-foreground">
              {promotion.startsAt
                ? new Date(promotion.startsAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Immediate / Continuous'}
            </p>
          </div>

          <div className="bg-muted/30 rounded-lg p-3 space-y-1">
            <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Conclusion Date
            </span>
            <p className="text-sm font-semibold text-foreground">
              {promotion.endsAt
                ? new Date(promotion.endsAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Ongoing / No Expiry'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
