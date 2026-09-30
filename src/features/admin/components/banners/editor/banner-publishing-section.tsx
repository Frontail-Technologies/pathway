'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Save, AlertCircle, Info, CheckCircle2 } from 'lucide-react'
import { BannerStatus, bannerStatusMap } from '@/features/banners/types/banner'
import type { BannerFormData } from './use-banner-editor'

export function BannerPublishingSection({
  isEditing,
  formData,
  apiNotice,
  onChange,
  onSubmit,
}: {
  isEditing: boolean
  formData: BannerFormData
  apiNotice: string | null
  onChange: (key: keyof BannerFormData, value: string) => void
  onSubmit: (e: React.FormEvent) => void
}) {
  const allowedStatuses: BannerStatus[] = ['draft', 'active', 'paused']

  return (
    <div id="publishing" className="bg-card rounded-xl p-5 sm:p-6 border-0 shadow-xs space-y-5">
      <div>
        <h2 className="text-sm font-bold text-foreground">Publishing</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5 max-w-xs">
          <Label htmlFor="banner-status" className="text-xs font-semibold text-foreground">
            Lifecycle Status
          </Label>
          <Select
            value={formData.status}
            onValueChange={(val) => onChange('status', val ?? 'draft')}
          >
            <SelectTrigger id="banner-status" className="text-xs bg-background">
              <SelectValue placeholder="Select status">
                {bannerStatusMap[formData.status]?.label ?? 'Draft'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {allowedStatuses.map((st) => (
                <SelectItem key={st} value={st} className="text-xs">
                  {bannerStatusMap[st].label} — {bannerStatusMap[st].description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {apiNotice && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-semibold">{apiNotice}</p>
              <p className="text-[11px] text-muted-foreground">
                All form inputs and media selections were validated locally.
              </p>
            </div>
          </div>
        )}

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-border/60">
          <Button
            type="submit"
            onClick={onSubmit}
            className="text-xs font-semibold gap-1.5 h-9 px-4"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Banner Changes' : 'Create Banner'}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
