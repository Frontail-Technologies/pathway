'use client'

import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  bannerPlacementMap,
  BannerPlacement,
} from '@/features/banners/types/banner'
import { cn } from '@/lib/utils'
import type { BannerFormData } from './use-banner-editor'

export function BannerPlacementSection({
  formData,
  onChange,
}: {
  formData: BannerFormData
  onChange: (key: keyof BannerFormData, value: string) => void
}) {
  const placementKeys = Object.keys(bannerPlacementMap) as BannerPlacement[]

  return (
    <div id="placement" className="bg-card rounded-xl p-5 sm:p-6 border-0 shadow-xs space-y-5">
      <div>
        <h2 className="text-sm font-bold text-foreground">Placement Surface</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {placementKeys.map((key) => {
          const meta = bannerPlacementMap[key]
          const isSelected = formData.placement === key

          return (
            <div
              key={key}
              onClick={() => onChange('placement', key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onChange('placement', key)
                }
              }}
              tabIndex={0}
              role="radio"
              aria-checked={isSelected}
              className={cn(
                'p-4 rounded-xl border text-left cursor-pointer transition-all space-y-2 focus:outline-hidden focus:ring-2 focus:ring-primary/20',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-xs'
                  : 'border-border/70 hover:border-primary/40 bg-card'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-foreground block">
                  {meta.label}
                </span>
                <Badge variant="outline" className="text-[10px] shrink-0 font-mono">
                  {meta.dimensionsLabel}
                </Badge>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {meta.description}
              </p>

              <div className="flex items-center gap-1.5 pt-1 text-[10px] text-muted-foreground font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span>Surface: {meta.surface}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
