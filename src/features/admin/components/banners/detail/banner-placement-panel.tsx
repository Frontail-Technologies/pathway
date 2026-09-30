import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Badge } from '@/components/ui/badge'
import { LayoutGrid } from 'lucide-react'

export function BannerPlacementPanel({ banner }: { banner: AdminBanner }) {
  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Placement Surface
        </h3>
        <Badge variant="outline" className="text-xs font-semibold">
          {banner.placementMeta.surface}
        </Badge>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2 text-foreground font-semibold">
          <LayoutGrid className="w-4 h-4 text-primary shrink-0" />
          <span>{banner.placementMeta.label}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed text-[11px]">
          {banner.placementMeta.description}
        </p>
      </div>

      <div className="pt-3 border-t border-border/60 text-xs text-muted-foreground space-y-1">
        <span className="font-semibold text-foreground">Recommended Dimensions:</span>
        <p className="font-mono text-[11px] text-primary">{banner.placementMeta.dimensionsLabel}</p>
      </div>
    </div>
  )
}
