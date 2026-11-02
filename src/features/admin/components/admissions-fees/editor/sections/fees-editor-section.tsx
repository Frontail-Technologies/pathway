import * as React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type FeeComponent } from '@/features/admin/data/admin-admissions-fees'
import { EditorSection, Field, FormSelect } from '../../../programs/shared/section-kit'
import { feePeriods, feeComponentTypes } from '../../shared/admissions-fees-constants'

type FeePeriod = 'Per Annum' | 'Per Semester' | 'Total Programme'
type FeeComponentType = 'tuition' | 'hostel' | 'examination' | 'admission' | 'other'

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
  onFeePeriodChange: (val: FeePeriod) => void
  feeComponents: FeeComponent[]
  newCompLabel: string
  onNewCompLabelChange: (val: string) => void
  newCompAmount: string
  onNewCompAmountChange: (val: string) => void
  newCompPeriod: string
  onNewCompPeriodChange: (val: string) => void
  newCompType: FeeComponentType
  onNewCompTypeChange: (val: FeeComponentType) => void
  onAddFeeComponent: () => void
  onRemoveFeeComponent: (id: string) => void
  errors: Record<string, string>
}) {
  const typeLabel = (value: string) => feeComponentTypes.find((t) => t.value === value)?.label ?? value
  const periodLabel = (value: string) => feePeriods.find((p) => p.value === value)?.label ?? value

  return (
    <EditorSection id="fees" title="Fees">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Annual fee" htmlFor="fee-annual" required error={errors.annualFee}>
          <Input id="fee-annual" value={annualFee} onChange={(e) => onAnnualFeeChange(e.target.value)} placeholder="e.g. ₹2.2 Lakh" aria-invalid={!!errors.annualFee} className="text-sm" />
        </Field>
        <Field label="Whole course fee" htmlFor="fee-total">
          <Input id="fee-total" value={totalProgrammeFee} onChange={(e) => onTotalProgrammeFeeChange(e.target.value)} placeholder="e.g. ₹8.8 Lakh" className="text-sm" />
        </Field>
        <Field label="Billed" htmlFor="fee-period">
          <FormSelect id="fee-period" value={feePeriod} onChange={(val) => onFeePeriodChange(val as FeePeriod)} options={feePeriods} placeholder="Choose period" />
        </Field>
      </div>

      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-medium text-foreground">Breakdown</p>
          <span className="text-[13px] text-muted-foreground">{feeComponents.length} items</span>
        </div>

        {feeComponents.length > 0 ? (
          <ul className="divide-y divide-border rounded-md border border-border">
            {feeComponents.map((comp) => (
              <li key={comp.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{comp.label}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {typeLabel(comp.type)} · {periodLabel(comp.period)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-medium text-foreground tabular-nums">{comp.amount}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => onRemoveFeeComponent(comp.id)} className="text-muted-foreground hover:text-destructive" aria-label={`Remove ${comp.label}`}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:items-end">
          <Field label="Item" htmlFor="fee-comp-label" className="sm:col-span-4">
            <Input id="fee-comp-label" value={newCompLabel} onChange={(e) => onNewCompLabelChange(e.target.value)} placeholder="e.g. Hostel" className="text-sm" />
          </Field>
          <Field label="Amount" htmlFor="fee-comp-amount" className="sm:col-span-2">
            <Input id="fee-comp-amount" value={newCompAmount} onChange={(e) => onNewCompAmountChange(e.target.value)} placeholder="₹15,000" className="text-sm" />
          </Field>
          <Field label="Type" htmlFor="fee-comp-type" className="sm:col-span-2">
            <FormSelect id="fee-comp-type" value={newCompType} onChange={(val) => onNewCompTypeChange(val as FeeComponentType)} options={feeComponentTypes} placeholder="Type" />
          </Field>
          <Field label="Billed" htmlFor="fee-comp-period" className="sm:col-span-2">
            <FormSelect id="fee-comp-period" value={newCompPeriod} onChange={onNewCompPeriodChange} options={feePeriods} placeholder="Period" />
          </Field>
          <Button type="button" variant="outline" onClick={onAddFeeComponent} disabled={!newCompLabel.trim() || !newCompAmount.trim()} className="gap-1.5 sm:col-span-2">
            <Plus className="size-4" aria-hidden="true" />
            Add
          </Button>
        </div>
      </div>
    </EditorSection>
  )
}
