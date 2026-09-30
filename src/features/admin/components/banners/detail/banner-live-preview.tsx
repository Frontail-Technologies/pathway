'use client'

import * as React from 'react'
import { AdminBanner } from '@/features/admin/data/admin-banners'
import { Monitor, Smartphone, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export function BannerLivePreview({ banner }: { banner: AdminBanner }) {
  const [device, setDevice] = React.useState<'desktop' | 'mobile'>('desktop')

  const activeImage = device === 'mobile' && banner.mobileImage ? banner.mobileImage : banner.image

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-foreground">Live Banner Preview</h2>
          <p className="text-[11px] text-muted-foreground">
            Rendered creative preview across responsive viewport breakpoints.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-lg border border-border/50">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer',
              device === 'desktop'
                ? 'bg-card text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer',
              device === 'mobile'
                ? 'bg-card text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-muted/20 rounded-xl border border-border/70 flex items-center justify-center min-h-[220px]">
        {device === 'desktop' ? (
          <div className="w-full relative rounded-2xl overflow-hidden bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md">
            {activeImage && (
              <img
                src={activeImage}
                alt={banner.imageAlt || banner.title}
                className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
              />
            )}
            <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                {banner.eyebrow && (
                  <Badge className="bg-white/15 text-white hover:bg-white/20 border-white/20 text-[11px] font-semibold gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{banner.eyebrow}</span>
                  </Badge>
                )}
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white leading-tight">
                  {banner.title}
                </h3>
                {banner.description && (
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {banner.description}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {banner.ctaLabel && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs shadow-sm">
                    <span>{banner.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
                {banner.secondaryCtaLabel && (
                  <span className="text-xs font-semibold text-white/80 hover:text-white underline underline-offset-4">
                    {banner.secondaryCtaLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-xs relative rounded-2xl overflow-hidden bg-linear-to-b from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md p-5 space-y-4">
            {activeImage && (
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black/20">
                <img
                  src={activeImage}
                  alt={banner.imageAlt || banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-2">
              {banner.eyebrow && (
                <Badge className="bg-white/15 text-white border-white/20 text-[10px] font-medium">
                  {banner.eyebrow}
                </Badge>
              )}
              <h3 className="text-base font-bold text-white leading-snug">
                {banner.title}
              </h3>
              {banner.description && (
                <p className="text-xs text-slate-200 leading-relaxed line-clamp-3">
                  {banner.description}
                </p>
              )}
            </div>

            <div className="space-y-2 pt-1">
              {banner.ctaLabel && (
                <div className="w-full py-2 px-3 text-center bg-white text-slate-950 font-bold text-xs rounded-lg shadow-xs">
                  {banner.ctaLabel}
                </div>
              )}
              {banner.secondaryCtaLabel && (
                <div className="w-full py-1 text-center text-xs text-white/80 font-medium">
                  {banner.secondaryCtaLabel}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
