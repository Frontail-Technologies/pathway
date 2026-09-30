import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Link as LinkIcon, CheckCircle2, AlertCircle } from 'lucide-react'

export function BannerDestinationPanel({ banner }: { banner: AdminBanner }) {
  const isInternal = banner.ctaHref?.startsWith('/')

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Public Destination Check
      </h3>

      {banner.ctaHref ? (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-muted/20 rounded-lg border border-border/60 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <LinkIcon className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Target Destination</span>
            </div>
            <p className="font-mono text-[11px] text-muted-foreground break-all">{banner.ctaHref}</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {isInternal ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-muted-foreground">Internal Pathway Route</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-muted-foreground">External Web Destination</span>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="p-3 bg-muted/20 rounded-lg border border-border/60 text-xs text-muted-foreground">
          No primary CTA destination configured for this banner.
        </div>
      )}
    </div>
  )
}
