import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Badge } from '@/components/ui/badge'
import { bannerStatusMap } from '@/features/banners/types/banner'
import { ShieldCheck } from 'lucide-react'

export function BannerStatusPanel({ banner }: { banner: AdminBanner }) {
  const statusMeta = bannerStatusMap[banner.effectiveStatus] || bannerStatusMap.draft

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Banner Status
        </h3>
        <Badge variant={statusMeta.variant} className="text-xs font-semibold">
          {statusMeta.label}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {statusMeta.description}
      </p>

      <div className="pt-3 border-t border-border/60 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Manual Editorial Control</span>
        </div>
        <p className="text-[11px] text-muted-foreground/80 pl-6">
          Standalone creative isolated from automated scrapers and entity promotions.
        </p>
      </div>
    </div>
  )
}
