'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, Clock, Info } from 'lucide-react'
import type { BannerFormData } from './use-banner-editor'

export function BannerScheduleSection({
  formData,
  errors,
  onChange,
}: {
  formData: BannerFormData
  errors: Record<string, string>
  onChange: (key: keyof BannerFormData, value: string) => void
}) {
  return (
    <div id="schedule" className="bg-card rounded-xl p-5 sm:p-6 border-0 shadow-xs space-y-5">
      <div>
        <h2 className="text-sm font-bold text-foreground">Schedule Window (Optional)</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="banner-starts-at" className="text-xs font-semibold flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Starts At (Date & Time)</span>
          </Label>
          <Input
            id="banner-starts-at"
            type="datetime-local"
            value={formData.startsAt}
            onChange={(e) => onChange('startsAt', e.target.value)}
            className="text-xs font-mono"
          />
          <p className="text-[10px] text-muted-foreground">
            Leave blank to activate immediately upon publishing.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="banner-ends-at" className="text-xs font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span>Ends At (Date & Time)</span>
          </Label>
          <Input
            id="banner-ends-at"
            type="datetime-local"
            value={formData.endsAt}
            onChange={(e) => onChange('endsAt', e.target.value)}
            className="text-xs font-mono"
          />
          {errors.endsAt ? (
            <p className="text-[11px] text-destructive">{errors.endsAt}</p>
          ) : (
            <p className="text-[10px] text-muted-foreground">
              Leave blank to keep creative active indefinitely.
            </p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 bg-muted/20 rounded-lg border border-border/60 text-xs text-muted-foreground">
        <Info className="w-4 h-4 text-muted-foreground/80 shrink-0 mt-0.5" />
        <span>
          Banners configured with a future start date will automatically reflect as <span className="font-semibold text-foreground">Scheduled</span> until the window opens, after which they become <span className="font-semibold text-foreground">Active</span>.
        </span>
      </div>
    </div>
  )
}
