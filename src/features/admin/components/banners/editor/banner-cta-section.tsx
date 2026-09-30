'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { suggestedPathwayRoutes } from '@/features/banners/types/banner'
import type { BannerFormData } from './use-banner-editor'

export function BannerCtaSection({
  formData,
  errors,
  onChange,
}: {
  formData: BannerFormData
  errors: Record<string, string>
  onChange: (key: keyof BannerFormData, value: string) => void
}) {
  return (
    <div id="cta" className="bg-card rounded-xl p-5 sm:p-6 border-0 shadow-xs space-y-5">
      <div>
        <h2 className="text-sm font-bold text-foreground">Call to Action (CTA) Configuration</h2>
      </div>

      <div className="space-y-4">
        { }
        <div className="p-4 bg-muted/20 rounded-xl border border-border/60 space-y-3">
          <span className="text-xs font-bold text-foreground block">Primary Action</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="banner-cta-label" className="text-xs font-semibold">
                Primary CTA Button Label
              </Label>
              <Input
                id="banner-cta-label"
                value={formData.ctaLabel}
                onChange={(e) => onChange('ctaLabel', e.target.value)}
                placeholder="e.g. Predict My College, Explore Programs"
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="banner-cta-href" className="text-xs font-semibold">
                Primary Destination Route / URL
              </Label>
              <Input
                id="banner-cta-href"
                value={formData.ctaHref}
                onChange={(e) => onChange('ctaHref', e.target.value)}
                placeholder="/college-predictor or /colleges"
                className="text-xs font-mono"
              />
              {errors.ctaHref && (
                <p className="text-[11px] text-destructive">{errors.ctaHref}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
              Quick Select Known Pathway Routes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestedPathwayRoutes.map((route) => (
                <button
                  key={route.href}
                  type="button"
                  onClick={() => onChange('ctaHref', route.href)}
                  className="px-2 py-1 rounded-md text-[11px] bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors cursor-pointer"
                >
                  {route.label} <span className="font-mono text-[10px] text-muted-foreground/70">({route.href})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        { }
        <div className="p-4 bg-muted/20 rounded-xl border border-border/60 space-y-3">
          <span className="text-xs font-bold text-foreground block">Secondary Action (Optional)</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="banner-sec-label" className="text-xs font-semibold">
                Secondary CTA Label
              </Label>
              <Input
                id="banner-sec-label"
                value={formData.secondaryCtaLabel}
                onChange={(e) => onChange('secondaryCtaLabel', e.target.value)}
                placeholder="e.g. Learn More, View Guidelines"
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="banner-sec-href" className="text-xs font-semibold">
                Secondary Destination Route / URL
              </Label>
              <Input
                id="banner-sec-href"
                value={formData.secondaryCtaHref}
                onChange={(e) => onChange('secondaryCtaHref', e.target.value)}
                placeholder="/exams or /careers"
                className="text-xs font-mono"
              />
              {errors.secondaryCtaHref && (
                <p className="text-[11px] text-destructive">{errors.secondaryCtaHref}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
