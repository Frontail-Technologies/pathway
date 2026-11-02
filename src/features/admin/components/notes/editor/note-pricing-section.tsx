'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { PricingType } from '@/features/notes/types/note'
import type { NoteFormData } from './use-note-editor'

export function NotePricingSection({
  formData,
  errors,
  onFieldChange,
}: {
  formData: NoteFormData
  errors: Record<string, string>
  onFieldChange: (key: keyof NoteFormData, value: NoteFormData[keyof NoteFormData]) => void
}) {
  const isPaid = formData.pricingType === 'paid'

  return (
    <div id="pricing" className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5">
      <div>
        <h2 className="text-[15px] font-semibold text-foreground">Price</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Access</Label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              type="button"
              aria-pressed={!isPaid}
              onClick={() => onFieldChange('pricingType', 'free')}
              className={cn(
                'p-3.5 rounded-lg border text-left cursor-pointer transition-colors space-y-1',
                !isPaid
                  ? 'border-primary/50 bg-accent text-accent-foreground'
                  : 'border-border hover:bg-muted bg-card text-foreground'
              )}
            >
              <p className="text-sm font-medium">Free</p>
              <p className="text-[13px] text-muted-foreground">Signed-in students download it for free.</p>
            </button>

            <button
              type="button"
              aria-pressed={isPaid}
              onClick={() => onFieldChange('pricingType', 'paid')}
              className={cn(
                'p-3.5 rounded-lg border text-left cursor-pointer transition-colors space-y-1',
                isPaid
                  ? 'border-primary/50 bg-accent text-accent-foreground'
                  : 'border-border hover:bg-muted bg-card text-foreground'
              )}
            >
              <p className="text-sm font-medium">Paid</p>
              <p className="text-[13px] text-muted-foreground">Students pay once to download.</p>
            </button>
          </div>
        </div>

        {isPaid && (
          <div className="space-y-1.5 max-w-xs pt-1">
            <Label htmlFor="note-price" className="text-sm font-medium text-foreground">
              Price in ₹ <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ₹
              </span>
              <Input
                id="note-price"
                type="number"
                min="1"
                step="1"
                value={formData.priceRupees}
                onChange={(e) => onFieldChange('priceRupees', e.target.value)}
                placeholder="199"
                className="pl-7 text-sm tabular-nums"
              />
            </div>
            {errors.priceRupees ? (
              <p className="text-[13px] text-destructive">{errors.priceRupees}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Whole rupees only.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
