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
    <section id="benefits" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-5 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Financial Benefits & Support Structure
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-semibold text-foreground">
              Benefit Display Amount / Headline <span className="text-destructive">*</span>
            </label>
            <Input
              value={benefitLabel}
              onChange={(e) => setBenefitLabel(e.target.value)}
              placeholder="e.g. ₹50,000/year or Full Tuition Waiver or ₹31,000/month"
              className={`text-xs ${errors.benefitLabel ? 'border-destructive' : ''}`}
            />
            {errors.benefitLabel && (
              <span className="text-[11px] text-destructive block">{errors.benefitLabel}</span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Grant Mechanism Type
            </label>
            <Select
              items={benefitTypes}
              value={benefitType}
              onValueChange={(val) => setBenefitType(val as any)}
            >
              <SelectTrigger className="w-full text-xs">
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
            <label className="text-xs font-semibold text-foreground">
              Approximate Rupee Value (Sorting)
            </label>
            <Input
              type="number"
              value={benefitValue}
              onChange={(e) => setBenefitValue(e.target.value)}
              placeholder="e.g. 50000"
              className="text-xs"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-semibold text-foreground">
              Coverage Scope
            </label>
            <Input
              value={benefitCoverage}
              onChange={(e) => setBenefitCoverage(e.target.value)}
              placeholder="e.g. Tuition fees, academic books, and laboratory expenses"
              className="text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/60">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Benefit Duration & Renewal Rules
            </label>
            <Input
              value={benefitDuration}
              onChange={(e) => setBenefitDuration(e.target.value)}
              placeholder="e.g. For full degree duration, renewed annually upon 60%+ marks"
              className="text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground">
              Disbursement Channel
            </label>
            <Input
              value={benefitDisbursement}
              onChange={(e) => setBenefitDisbursement(e.target.value)}
              placeholder="e.g. Directly credited to student Aadhaar-linked bank account (DBT)"
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
