import { AdminBanner } from '@/features/admin/data/admin-banners'
import { ExternalLink, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

export function BannerCtaSection({ banner }: { banner: AdminBanner }) {
  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Call to Action (CTA) Configuration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 p-3.5 bg-muted/20 rounded-lg border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Primary CTA
            </span>
            {banner.ctaHref && (
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-sm">
                Configured
              </span>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground">
              {banner.ctaLabel || <span className="italic text-muted-foreground">No label</span>}
            </p>
            {banner.ctaHref ? (
              <Link
                href={banner.ctaHref}
                target="_blank"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:underline mt-1 break-all"
              >
                <span>{banner.ctaHref}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </Link>
            ) : (
              <p className="text-[11px] text-muted-foreground italic mt-0.5">No destination URL</p>
            )}
          </div>
        </div>

        <div className="space-y-2 p-3.5 bg-muted/20 rounded-lg border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              Secondary CTA (Optional)
            </span>
            {banner.secondaryCtaHref ? (
              <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded-sm">
                Configured
              </span>
            ) : (
              <span className="text-[10px] font-medium text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded-sm">
                None
              </span>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground">
              {banner.secondaryCtaLabel || (
                <span className="italic text-muted-foreground">None configured</span>
              )}
            </p>
            {banner.secondaryCtaHref ? (
              <Link
                href={banner.secondaryCtaHref}
                target="_blank"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:underline mt-1 break-all"
              >
                <span>{banner.secondaryCtaHref}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </Link>
            ) : (
              <p className="text-[11px] text-muted-foreground italic mt-0.5">No secondary link</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
