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
  onFieldChange: (key: keyof NoteFormData, value: any) => void
}) {
  const isPaid = formData.pricingType === 'paid'

  return (
    <div id="pricing" className="bg-card rounded-xl p-5 sm:p-6 border-0 shadow-xs space-y-5">
      <div>
        <h2 className="text-sm font-bold text-foreground">Pricing & Access</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-foreground">Access Model</Label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <div
              onClick={() => onFieldChange('pricingType', 'free')}
              className={cn(
                'p-3.5 rounded-xl border text-center cursor-pointer transition-all space-y-1',
                !isPaid
                  ? 'border-success bg-success-surface text-success'
                  : 'border-border/70 hover:border-primary/40 bg-card text-muted-foreground'
              )}
            >
              <p className="text-xs font-bold">Free Access</p>
              <p className="text-[10px]">Open download for registered students.</p>
            </div>

            <div
              onClick={() => onFieldChange('pricingType', 'paid')}
              className={cn(
                'p-3.5 rounded-xl border text-center cursor-pointer transition-all space-y-1',
                isPaid
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border/70 hover:border-primary/40 bg-card text-muted-foreground'
              )}
            >
              <p className="text-xs font-bold">Paid Purchase</p>
              <p className="text-[10px]">Requires verified one-time payment.</p>
            </div>
          </div>
        </div>

        {isPaid && (
          <div className="space-y-1.5 max-w-xs pt-1">
            <Label htmlFor="note-price" className="text-xs font-semibold text-foreground">
              Purchase Price (in Indian Rupees ₹) <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
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
                className="pl-7 text-xs font-mono font-bold"
              />
            </div>
            {errors.priceRupees ? (
              <p className="text-[11px] text-destructive">{errors.priceRupees}</p>
            ) : (
              <p className="text-[10px] text-muted-foreground">
                Normalized internally to integer paise ({parseInt(formData.priceRupees || '0', 10) * 100} Paise).
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
