'use client'

import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { bannerStatusMap } from '@/features/banners/types/banner'
import { ArrowLeft, Edit, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function BannerDetailHeader({ banner }: { banner: AdminBanner }) {
  const statusMeta = bannerStatusMap[banner.effectiveStatus] || bannerStatusMap.draft

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/banners"
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Banners</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              {banner.name}
            </h1>
            <Badge variant={statusMeta.variant} className="text-xs font-semibold">
              {statusMeta.label}
            </Badge>
            <Badge variant="outline" className="text-xs font-medium">
              {banner.placementMeta.surface}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Headline: <span className="text-foreground font-medium">{banner.title}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {banner.ctaHref && (
            <Button
              variant="outline"
              size="sm"
              render={
                <Link href={banner.ctaHref} target="_blank" className="flex items-center gap-1.5 text-xs font-medium">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Test Link</span>
                </Link>
              }
            />
          )}
          <Button
            size="sm"
            render={
              <Link href={`/admin/banners/${banner.id}/edit`} className="flex items-center gap-1.5 text-xs font-semibold">
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Banner</span>
              </Link>
            }
          />
        </div>
      </div>
    </div>
  )
}
