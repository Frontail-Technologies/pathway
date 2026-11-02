'use client'

import type { BannerPlacement } from '@/features/banners/types/banner'
import { cn } from '@/lib/utils'
import { bannerPlacementHints, bannerPlacementOptions, placementDimensions } from '../shared/banner-constants'
import { FormSection } from '../shared/banner-form'
import type { BannerFormData } from './use-banner-editor'

export function BannerPlacementSection({ formData, onChange }: { formData: BannerFormData; onChange: (key: keyof BannerFormData, value: string) => void }) {
  return (
    <FormSection id="placement" title="Placement" description="Where the banner appears on the site.">
      <div role="radiogroup" aria-label="Placement" className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {bannerPlacementOptions.map(({ value, label }) => {
          const selected = formData.placement === value
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange('placement', value)}
              className={cn(
                'space-y-1 rounded-lg border p-3.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40',
                selected ? 'border-primary bg-accent' : 'border-border bg-card hover:border-primary/40',
              )}
            >
              <span className="block text-sm font-medium text-foreground">{label}</span>
              <span className="block text-[13px] text-muted-foreground">{bannerPlacementHints[value as BannerPlacement]}</span>
              <span className="block text-xs text-muted-foreground tabular-nums">{placementDimensions(value as BannerPlacement)}</span>
            </button>
          )
        })}
      </div>
    </FormSection>
  )
}
