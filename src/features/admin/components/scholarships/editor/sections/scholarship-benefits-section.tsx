import * as React from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { benefitTypes } from '../../shared/scholarship-constants'

export function ScholarshipBenefitsSection({
  benefitLabel,
  setBenefitLabel,
  benefitValue,
  setBenefitValue,
  benefitType,
  setBenefitType,
  benefitCoverage,
  setBenefitCoverage,
  benefitDuration,
  setBenefitDuration,
  benefitDisbursement,
  setBenefitDisbursement,
  errors,
}: {
  benefitLabel: string
  setBenefitLabel: (v: string) => void
  benefitValue: string
  setBenefitValue: (v: string) => void
  benefitType: 'Monetary' | 'Fee Waiver' | 'Stipend' | 'Fellowship' | 'Other'
  setBenefitType: (v: 'Monetary' | 'Fee Waiver' | 'Stipend' | 'Fellowship' | 'Other') => void
  benefitCoverage: string
  setBenefitCoverage: (v: string) => void
  benefitDuration: string
  setBenefitDuration: (v: string) => void
  benefitDisbursement: string
  setBenefitDisbursement: (v: string) => void
  errors: Record<string, string>
}) {
  return (
    <section id="benefits" className="rounded-lg border border-border bg-card p-5 sm:p-6 space-y-5 scroll-mt-20">
      <h2 className="text-[15px] font-semibold text-foreground">
        Benefits
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">
              Benefit amount <span className="text-destructive">*</span>
            </label>
            <Input
              value={benefitLabel}
              onChange={(e) => setBenefitLabel(e.target.value)}
              placeholder="e.g. ₹50,000/year or Full Tuition Waiver or ₹31,000/month"
              className={`text-sm ${errors.benefitLabel ? 'border-destructive' : ''}`}
            />
            {errors.benefitLabel && (
              <span className="text-[13px] text-destructive block">{errors.benefitLabel}</span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Benefit type
            </label>
            <Select
              items={benefitTypes}
              value={benefitType}
              onValueChange={(val) => setBenefitType(val as any)}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Benefit type" />
              </SelectTrigger>
              <SelectContent>
                {benefitTypes.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Approximate value in ₹ (used for sorting)
            </label>
            <Input
              type="number"
              value={benefitValue}
              onChange={(e) => setBenefitValue(e.target.value)}
              placeholder="e.g. 50000"
              className="text-sm"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-sm font-medium text-foreground">
              Coverage
            </label>
            <Input
              value={benefitCoverage}
              onChange={(e) => setBenefitCoverage(e.target.value)}
              placeholder="e.g. Tuition fees, academic books, and laboratory expenses"
              className="text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/60">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Duration and renewal
            </label>
            <Input
              value={benefitDuration}
              onChange={(e) => setBenefitDuration(e.target.value)}
              placeholder="e.g. For full degree duration, renewed annually upon 60%+ marks"
              className="text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Disbursement
            </label>
            <Input
              value={benefitDisbursement}
              onChange={(e) => setBenefitDisbursement(e.target.value)}
              placeholder="e.g. Directly credited to student Aadhaar-linked bank account (DBT)"
              className="text-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
