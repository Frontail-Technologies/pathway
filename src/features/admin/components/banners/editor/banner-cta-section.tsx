'use client'

import { Input } from '@/components/ui/input'
import { suggestedPathwayRoutes } from '@/features/banners/types/banner'
import { Field, FormSection } from '../shared/banner-form'
import type { BannerFormData } from './use-banner-editor'

export function BannerCtaSection({ formData, errors, onChange }: { formData: BannerFormData; errors: Record<string, string>; onChange: (key: keyof BannerFormData, value: string) => void }) {
  return (
    <FormSection id="cta" title="Buttons">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="banner-cta-label" label="Main button text">
          <Input id="banner-cta-label" value={formData.ctaLabel} onChange={(e) => onChange('ctaLabel', e.target.value)} placeholder="e.g. Predict my college" className="text-sm" />
        </Field>
        <Field id="banner-cta-href" label="Main button link" error={errors.ctaHref}>
          <Input id="banner-cta-href" value={formData.ctaHref} onChange={(e) => onChange('ctaHref', e.target.value)} placeholder="/college-predictor" aria-invalid={!!errors.ctaHref} className="font-mono text-sm" />
        </Field>
      </div>

      <div className="space-y-1.5">
        <p className="text-[13px] text-muted-foreground">Common pages</p>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPathwayRoutes.map((route) => (
            <button
              key={route.href}
              type="button"
              onClick={() => onChange('ctaHref', route.href)}
              aria-pressed={formData.ctaHref === route.href}
              className="rounded-md border border-border bg-card px-2 py-1 text-[13px] text-foreground outline-none hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring/40 aria-pressed:border-primary/50 aria-pressed:bg-accent aria-pressed:text-accent-foreground"
            >
              {route.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
        <Field id="banner-sec-label" label="Second button text" hint="Optional.">
          <Input id="banner-sec-label" value={formData.secondaryCtaLabel} onChange={(e) => onChange('secondaryCtaLabel', e.target.value)} placeholder="e.g. Learn more" className="text-sm" />
        </Field>
        <Field id="banner-sec-href" label="Second button link" error={errors.secondaryCtaHref}>
          <Input id="banner-sec-href" value={formData.secondaryCtaHref} onChange={(e) => onChange('secondaryCtaHref', e.target.value)} placeholder="/exams" aria-invalid={!!errors.secondaryCtaHref} className="font-mono text-sm" />
        </Field>
      </div>
    </FormSection>
  )
}
