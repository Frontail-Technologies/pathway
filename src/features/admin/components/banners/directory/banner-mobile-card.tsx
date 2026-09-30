import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Badge } from '@/components/ui/badge'
import { bannerStatusMap } from '@/features/banners/types/banner'
import { Button } from '@/components/ui/button'
import { Image as ImageIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function BannerMobileCard({ banner }: { banner: AdminBanner }) {
  const statusMeta = bannerStatusMap[banner.effectiveStatus] || bannerStatusMap.draft

  return (
    <div className="p-4 rounded-xl border border-border/70 bg-card space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded-lg border border-border/80 bg-muted/40 flex items-center justify-center shrink-0 overflow-hidden">
            {banner.image ? (
              <img
                src={banner.image}
                alt={banner.imageAlt || banner.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="w-5 h-5 text-muted-foreground/60" />
            )}
          </div>
          <div className="min-w-0 space-y-0.5">
            <h3 className="text-xs font-bold text-foreground truncate">{banner.name}</h3>
            <p className="text-[11px] text-muted-foreground truncate">{banner.title}</p>
          </div>
        </div>

        <Badge variant={statusMeta.variant} className="text-[10px] shrink-0 font-medium">
          {statusMeta.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border/40">
        <div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
            Placement
          </span>
          <span className="font-medium text-foreground truncate block">
            {banner.placementMeta.surface}
          </span>
        </div>

        <div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
            CTA
          </span>
          <span className="font-medium text-foreground truncate block">
            {banner.ctaLabel || 'None'}
          </span>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-end gap-2 border-t border-border/40">
        <Button
          variant="outline"
          size="sm"
          render={<Link href={`/admin/banners/${banner.id}/edit`}>Edit</Link>}
          className="h-7 text-xs px-2.5"
        />
        <Button
          size="sm"
          render={
            <Link href={`/admin/banners/${banner.id}`} className="inline-flex items-center gap-1">
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          }
          className="h-7 text-xs px-2.5"
        />
      </div>
    </div>
  )
}
