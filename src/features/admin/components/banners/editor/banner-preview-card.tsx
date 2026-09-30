'use client'

import * as React from 'react'
import { Monitor, Smartphone, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { BannerFormData } from './use-banner-editor'

export function BannerPreviewCard({
  formData,
  effectiveDesktopImage,
  effectiveMobileImage,
}: {
  formData: BannerFormData
  effectiveDesktopImage?: string | null
  effectiveMobileImage?: string | null
}) {
  const [device, setDevice] = React.useState<'desktop' | 'mobile'>('desktop')

  const activeImage =
    device === 'mobile' && effectiveMobileImage
      ? effectiveMobileImage
      : effectiveDesktopImage

  const title = formData.title || 'Your Banner Headline Will Appear Here'
  const description =
    formData.description || 'Supporting description and contextual details for the call to action.'
  const eyebrow = formData.eyebrow
  const ctaLabel = formData.ctaLabel || 'Action Button'
  const secondaryCtaLabel = formData.secondaryCtaLabel

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Live Draft Preview
          </h3>
          <p className="text-[10px] text-muted-foreground">
            Updates in real-time as you author the creative.
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
            <Monitor className="w-3 h-3" />
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
            <Smartphone className="w-3 h-3" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      <div className="p-4 bg-muted/20 rounded-xl border border-border/70 flex items-center justify-center min-h-[180px]">
        {device === 'desktop' ? (
          <div className="w-full relative rounded-xl overflow-hidden bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-sm">
            {activeImage && (
              <img
                src={activeImage}
                alt={formData.imageAlt || title}
                className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
              />
            )}
            <div className="relative p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-md">
                {eyebrow && (
                  <Badge className="bg-white/15 text-white hover:bg-white/20 border-white/20 text-[10px] font-semibold gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                    <span>{eyebrow}</span>
                  </Badge>
                )}
                <h4 className="text-base sm:text-lg font-bold font-heading text-white leading-tight">
                  {title}
                </h4>
                {description && (
                  <p className="text-xs text-slate-200 leading-relaxed line-clamp-2">
                    {description}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {ctaLabel && (
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-slate-950 font-bold text-xs shadow-xs">
                    <span>{ctaLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                )}
                {secondaryCtaLabel && (
                  <span className="text-xs font-semibold text-white/80 underline underline-offset-4">
                    {secondaryCtaLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[260px] relative rounded-xl overflow-hidden bg-linear-to-b from-blue-900 via-indigo-900 to-slate-900 text-white shadow-sm p-4 space-y-3">
            {activeImage && (
              <div className="aspect-video w-full rounded-md overflow-hidden border border-white/10 bg-black/20">
                <img
                  src={activeImage}
                  alt={formData.imageAlt || title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="space-y-1.5">
              {eyebrow && (
                <Badge className="bg-white/15 text-white border-white/20 text-[9px] font-medium">
                  {eyebrow}
                </Badge>
              )}
              <h4 className="text-sm font-bold text-white leading-snug">
                {title}
              </h4>
              {description && (
                <p className="text-[11px] text-slate-200 leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}
            </div>

            <div className="space-y-1.5 pt-1">
              {ctaLabel && (
                <div className="w-full py-1.5 px-2.5 text-center bg-white text-slate-950 font-bold text-[11px] rounded-md shadow-xs">
                  {ctaLabel}
                </div>
              )}
              {secondaryCtaLabel && (
                <div className="w-full text-center text-[10px] text-white/80 font-medium">
                  {secondaryCtaLabel}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
