import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2, AlertCircle } from 'lucide-react'
import { type FeeComponent } from '@/features/admin/data/admin-admissions-fees'
import { feePeriods, feeComponentTypes } from '../../shared/admissions-fees-constants'

export function FeesEditorSection({
  annualFee,
  onAnnualFeeChange,
  totalProgrammeFee,
  onTotalProgrammeFeeChange,
  feePeriod,
  onFeePeriodChange,
  feeComponents,
  newCompLabel,
  onNewCompLabelChange,
  newCompAmount,
  onNewCompAmountChange,
  newCompPeriod,
  onNewCompPeriodChange,
  newCompType,
  onNewCompTypeChange,
  onAddFeeComponent,
  onRemoveFeeComponent,
  errors,
}: {
  annualFee: string
  onAnnualFeeChange: (val: string) => void
  totalProgrammeFee: string
  onTotalProgrammeFeeChange: (val: string) => void
  feePeriod: string
  onFeePeriodChange: (val: 'Per Annum' | 'Per Semester' | 'Total Programme') => void
  feeComponents: FeeComponent[]
  newCompLabel: string
  onNewCompLabelChange: (val: string) => void
  newCompAmount: string
  onNewCompAmountChange: (val: string) => void
  newCompPeriod: string
  onNewCompPeriodChange: (val: string) => void
  newCompType: 'tuition' | 'hostel' | 'examination' | 'admission' | 'other'
  onNewCompTypeChange: (val: 'tuition' | 'hostel' | 'examination' | 'admission' | 'other') => void
  onAddFeeComponent: () => void
  onRemoveFeeComponent: (id: string) => void
  errors: Record<string, string>
}) {
  return (
    <section id="fees" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Fee Structure & Components
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="fee-annual" className="text-xs font-semibold">
            Annual Tuition Fee <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fee-annual"
            value={annualFee}
            onChange={(e) => onAnnualFeeChange(e.target.value)}
            placeholder="e.g. ₹2.2 Lakh"
            className="text-xs"
          />
          {errors.annualFee && (
            <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.annualFee}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="fee-total" className="text-xs font-semibold">
            Total Programme Fee
          </Label>
          <Input
            id="fee-total"
            value={totalProgrammeFee}
            onChange={(e) => onTotalProgrammeFeeChange(e.target.value)}
            placeholder="e.g. ₹8.8 Lakh"
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="fee-period" className="text-xs font-semibold">
            Standard Fee Billing Period
          </Label>
          <Select
            items={feePeriods}
            value={feePeriod}
            onValueChange={(val) => onFeePeriodChange((val as any) || 'Per Annum')}
          >
            <SelectTrigger id="fee-period" className="w-full text-xs">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {feePeriods.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-foreground">
            Itemized Fee Components ({feeComponents.length})
          </span>
        </div>

        {feeComponents.length > 0 && (
          <div className="divide-y divide-border/60 -my-1">
            {feeComponents.map((comp) => (
              <div
                key={comp.id}
                className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{comp.label}</span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-semibold bg-muted text-muted-foreground border-0 px-1.5 py-0 capitalize"
                    >
                      {comp.type}
                    </Badge>
                  </div>
                  <span className="text-[11px] text-muted-foreground block">
                    {comp.period}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-bold text-foreground">{comp.amount}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFeeComponent(comp.id)}
                    className="h-7 px-2 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-3.5 rounded-lg bg-muted/30 border border-border/60 space-y-3">
          <span className="text-xs font-semibold text-foreground block">
            Add Fee Component
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div className="sm:col-span-2">
              <Input
                value={newCompLabel}
                onChange={(e) => onNewCompLabelChange(e.target.value)}
                placeholder="Component title (e.g. Hostel Amenities, Lab Charges)"
                className="text-xs h-8"
              />
            </div>

            <div>
              <Input
                value={newCompAmount}
                onChange={(e) => onNewCompAmountChange(e.target.value)}
                placeholder="Amount (e.g. ₹15,000)"
                className="text-xs h-8"
              />
            </div>

            <div>
              <Select
                items={feeComponentTypes}
                value={newCompType}
                onValueChange={(val) => onNewCompTypeChange((val as any) || 'tuition')}
              >
                <SelectTrigger className="w-full text-xs h-8">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {feeComponentTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAddFeeComponent}
              disabled={!newCompLabel.trim() || !newCompAmount.trim()}
              className="text-xs h-8 font-semibold bg-card"
            >
              <Plus className="w-3.5 h-3.5 mr-1 text-primary" />
              Add Component
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
