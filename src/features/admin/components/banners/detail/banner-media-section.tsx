import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Image as ImageIcon, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function BannerMediaSection({ banner }: { banner: AdminBanner }) {
  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Media & Creative Assets</h2>
        <Badge variant="outline" className="text-[10px] font-mono">
          Recommended: {banner.placementMeta.dimensionsLabel}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        { }
        <div className="space-y-2 p-3.5 bg-muted/20 rounded-lg border border-border/60">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Desktop Image Asset
          </span>

          {banner.image ? (
            <div className="space-y-2">
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-border/60 bg-muted/40">
                <img
                  src={banner.image}
                  alt={banner.imageAlt || banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] font-mono text-muted-foreground truncate">{banner.image}</p>
            </div>
          ) : (
            <div className="py-8 text-center bg-muted/30 rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground space-y-1">
              <ImageIcon className="w-5 h-5 mx-auto text-muted-foreground/60" />
              <p>No desktop image linked</p>
            </div>
          )}
        </div>

        { }
        <div className="space-y-2 p-3.5 bg-muted/20 rounded-lg border border-border/60">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Mobile Image Asset (Optional)
          </span>

          {banner.mobileImage ? (
            <div className="space-y-2">
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-border/60 bg-muted/40">
                <img
                  src={banner.mobileImage}
                  alt={banner.imageAlt || banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] font-mono text-muted-foreground truncate">
                {banner.mobileImage}
              </p>
            </div>
          ) : (
            <div className="py-8 text-center bg-muted/30 rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground space-y-1">
              <ImageIcon className="w-5 h-5 mx-auto text-muted-foreground/60" />
              <p>Falls back to desktop image</p>
              <p className="text-[10px] text-muted-foreground/70">No dedicated mobile crop</p>
            </div>
          )}
        </div>
      </div>

      <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-1">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Accessibility Alt Text
        </span>
        <p className="text-xs text-foreground">
          {banner.imageAlt || <span className="italic text-muted-foreground">None provided</span>}
        </p>
      </div>
    </div>
  )
}
