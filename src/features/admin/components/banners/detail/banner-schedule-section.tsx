import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Calendar, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { bannerStatusMap } from '@/features/banners/types/banner'

export function BannerScheduleSection({ banner }: { banner: AdminBanner }) {
  const statusMeta = bannerStatusMap[banner.effectiveStatus] || bannerStatusMap.draft

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Schedule & Display Window</h2>
        <Badge variant={statusMeta.variant} className="text-xs font-semibold">
          {statusMeta.label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5 p-3.5 bg-muted/20 rounded-lg border border-border/60">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Starts At</span>
          </div>
          <p className="text-xs font-semibold text-foreground">
            {banner.startsAt ? new Date(banner.startsAt).toLocaleString() : 'Immediate (No start date)'}
          </p>
        </div>

        <div className="space-y-1.5 p-3.5 bg-muted/20 rounded-lg border border-border/60">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5" />
            <span>Ends At</span>
          </div>
          <p className="text-xs font-semibold text-foreground">
            {banner.endsAt ? new Date(banner.endsAt).toLocaleString() : 'Indefinite (No end date)'}
          </p>
        </div>
      </div>
    </div>
  )
}
