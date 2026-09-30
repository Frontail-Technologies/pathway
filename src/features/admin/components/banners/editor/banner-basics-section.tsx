'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { BannerFormData } from './use-banner-editor'

export function BannerBasicsSection({
  formData,
  errors,
  onChange,
}: {
  formData: BannerFormData
  errors: Record<string, string>
  onChange: (key: keyof BannerFormData, value: string) => void
}) {
  return (
    <div id="basics" className="bg-card rounded-xl p-5 sm:p-6 border-0 shadow-xs space-y-5">
      <div>
        <h2 className="text-sm font-bold text-foreground">Basic Information</h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="banner-name" className="text-xs font-semibold text-foreground">
              Internal Banner Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="banner-name"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="e.g. Admissions Campaign Callout"
              className="text-xs"
            />
            {errors.name ? (
              <p className="text-[11px] text-destructive">{errors.name}</p>
            ) : (
              <p className="text-[10px] text-muted-foreground">
                For administrative cataloging and identification.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="banner-eyebrow" className="text-xs font-semibold text-foreground">
              Eyebrow / Badge Label
            </Label>
            <Input
              id="banner-eyebrow"
              value={formData.eyebrow}
              onChange={(e) => onChange('eyebrow', e.target.value)}
              placeholder="e.g. Admissions Open or Free Tool"
              className="text-xs"
            />
            <p className="text-[10px] text-muted-foreground">
              Small badge rendered above the main headline.
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="banner-title" className="text-xs font-semibold text-foreground">
            Headline <span className="text-destructive">*</span>
          </Label>
          <Input
            id="banner-title"
            value={formData.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="e.g. Know Your Admission Chances in Top Engineering Colleges"
            className="text-xs font-medium"
          />
          {errors.title ? (
            <p className="text-[11px] text-destructive">{errors.title}</p>
          ) : (
            <p className="text-[10px] text-muted-foreground">
              Primary public headline text rendered inside the banner creative.
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="banner-description" className="text-xs font-semibold text-foreground">
            Supporting Copy
          </Label>
          <Textarea
            id="banner-description"
            rows={3}
            value={formData.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="e.g. Enter your rank, category, and preferred state to get a personalised list of eligible colleges."
            className="text-xs resize-y"
          />
          <p className="text-[10px] text-muted-foreground">
            Descriptive text providing context for the call to action.
          </p>
        </div>
      </div>
    </div>
  )
}
