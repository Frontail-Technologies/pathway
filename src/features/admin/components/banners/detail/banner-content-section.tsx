import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Badge } from '@/components/ui/badge'

export function BannerContentSection({ banner }: { banner: AdminBanner }) {
  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Content & Copy</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1 p-3.5 bg-muted/20 rounded-lg border border-border/60">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Internal Banner Name
          </span>
          <p className="text-xs font-semibold text-foreground">{banner.name}</p>
          <p className="text-[10px] text-muted-foreground">Admin identifier, not displayed to public.</p>
        </div>

        <div className="space-y-1 p-3.5 bg-muted/20 rounded-lg border border-border/60">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
            Eyebrow / Badge Label
          </span>
          {banner.eyebrow ? (
            <Badge variant="secondary" className="text-xs font-semibold">
              {banner.eyebrow}
            </Badge>
          ) : (
            <p className="text-xs text-muted-foreground italic">None configured</p>
          )}
        </div>
      </div>

      <div className="space-y-1 p-3.5 bg-muted/20 rounded-lg border border-border/60">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Public Headline
        </span>
        <p className="text-sm font-bold text-foreground leading-snug">{banner.title}</p>
      </div>

      <div className="space-y-1 p-3.5 bg-muted/20 rounded-lg border border-border/60">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
          Supporting Copy
        </span>
        {banner.description ? (
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
            {banner.description}
          </p>
        ) : (
          <p className="text-xs text-muted-foreground italic">No supporting description provided.</p>
        )}
      </div>
    </div>
  )
}
