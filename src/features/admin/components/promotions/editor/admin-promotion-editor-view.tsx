'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { getTargetOptionsForType } from '@/features/admin/data/admin-promotions'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { cn } from '@/lib/utils'
import { AdminPageHeader } from '../../kit'
import {
  placementSlots,
  promotionKindHints,
  promotionKindOptions,
  promotionPlacementOptions,
  promotionStatusLabels,
  promotionTargetTypeOptions,
  promotionTitle,
  type PromotionKind,
  type PromotionPlacement,
  type PromotionStatus,
  type PromotionTargetType,
} from '../shared/promotion-constants'
import { Field, FormNotice, FormSection } from '../shared/promotion-form'

/** Only these can be set by hand; scheduled and ended follow from the dates. */
const statusItems = (['active', 'draft', 'paused'] as PromotionStatus[]).map((value) => ({ value, label: promotionStatusLabels[value] }))

type FormState = {
  kind: PromotionKind
  targetType: PromotionTargetType
  targetId: string
  placement: PromotionPlacement
  status: PromotionStatus
  label: string
  startsAt: string
  endsAt: string
  priority: string
  notes: string
}

function initialState(promotion?: AdminPromotion): FormState {
  return {
    kind: promotion?.kind ?? 'featured',
    targetType: promotion?.targetType ?? 'institution',
    targetId: promotion?.targetId ?? getTargetOptionsForType(promotion?.targetType ?? 'institution')[0]?.id ?? '',
    placement: promotion?.placement ?? 'home_featured_colleges',
    status: promotion?.status ?? 'active',
    label: promotion?.label ?? '',
    startsAt: promotion?.startsAt ? promotion.startsAt.split('T')[0]! : '',
    endsAt: promotion?.endsAt ? promotion.endsAt.split('T')[0]! : '',
    priority: promotion?.priority !== undefined ? String(promotion.priority) : '10',
    notes: promotion?.notes ?? '',
  }
}

function SelectField<T extends string>({ id, value, onChange, items, placeholder, className }: { id: string; value: T; onChange: (value: T) => void; items: { value: T; label: string }[]; placeholder?: string; className?: string }) {
  return (
    <Select value={value} onValueChange={(next) => next && onChange(next as T)} items={items}>
      <SelectTrigger id={id} className={cn('w-full text-sm', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function AdminPromotionEditorView({ promotion, isCreate = false }: { promotion?: AdminPromotion; isCreate?: boolean }) {
  const router = useRouter()
  const [form, setForm] = React.useState<FormState>(() => initialState(promotion))
  const [initialSnapshot] = React.useState(() => JSON.stringify(form))
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [apiNotice, setApiNotice] = React.useState<string | null>(null)

  const isDirty = JSON.stringify(form) !== initialSnapshot
  useUnsavedChanges(isDirty)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(({ [key]: _removed, ...rest }) => rest)
  }

  const targetItems = React.useMemo(() => getTargetOptionsForType(form.targetType).map((option) => ({ value: option.id, label: option.subtext ? `${option.label} · ${option.subtext}` : option.label })), [form.targetType])

  const changeTargetType = (targetType: PromotionTargetType) => {
    setForm((prev) => ({ ...prev, targetType, targetId: getTargetOptionsForType(targetType)[0]?.id ?? '' }))
  }

  const backHref = !isCreate && promotion ? `/admin/promotions/${promotion.id}` : '/admin/promotions'
  const handleCancel = () => {
    if (isDirty && !window.confirm('Discard your unsaved changes?')) return
    router.push(backHref)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (!form.targetId) next.targetId = 'Choose a record.'
    const priority = Number(form.priority)
    if (!Number.isInteger(priority) || priority < 1 || priority > 100) next.priority = 'Use a whole number from 1 to 100.'
    if (form.startsAt && form.endsAt && form.endsAt < form.startsAt) next.endsAt = 'End must be after the start.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      setApiNotice(null)
      return
    }
    setApiNotice('Saving needs the Admin API, which is not connected yet, so nothing was saved.')
  }

  const slots = placementSlots(form.placement)
  const actions = (
    <>
      <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
        Cancel
      </Button>
      <Button type="submit" size="sm">
        {isCreate ? 'Create listing' : 'Save changes'}
      </Button>
    </>
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-4xl space-y-6 pb-12">
      <AdminPageHeader
        back={!isCreate && promotion ? { href: backHref, label: promotionTitle(promotion) } : { href: '/admin/promotions', label: 'Featured listings' }}
        title={isCreate ? 'New featured listing' : 'Edit featured listing'}
        actions={actions}
      />

      {apiNotice ? <FormNotice>{apiNotice}</FormNotice> : null}

      <FormSection id="type" title="Type and placement">
        <div role="radiogroup" aria-label="Type" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {promotionKindOptions.map(({ value, label }) => {
            const selected = form.kind === value
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => update('kind', value)}
                className={cn('space-y-1 rounded-lg border p-3.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40', selected ? 'border-primary bg-accent' : 'border-border bg-card hover:border-primary/40')}
              >
                <span className="block text-sm font-medium text-foreground">{label}</span>
                <span className="block text-[13px] text-muted-foreground">{promotionKindHints[value]}</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="promotion-placement" label="Slot" hint={slots ? `Up to ${slots} listings show here.` : undefined}>
            <SelectField id="promotion-placement" value={form.placement} onChange={(value) => update('placement', value)} items={promotionPlacementOptions} />
          </Field>
          <Field id="promotion-label" label="Label" hint="Optional. Shown to admins in the list.">
            <Input id="promotion-label" value={form.label} onChange={(e) => update('label', e.target.value)} placeholder="e.g. Autumn engineering spotlight" className="text-sm" />
          </Field>
        </div>
      </FormSection>

      <FormSection id="record" title="Featured record">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="promotion-target-type" label="Record type">
            <SelectField id="promotion-target-type" value={form.targetType} onChange={changeTargetType} items={promotionTargetTypeOptions} />
          </Field>
          <Field id="promotion-target" label="Record" required error={errors.targetId}>
            <SelectField id="promotion-target" value={form.targetId} onChange={(value) => update('targetId', value)} items={targetItems} placeholder="Select a record" />
          </Field>
        </div>
      </FormSection>

      <FormSection id="schedule" title="Schedule and order">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field id="promotion-starts" label="Starts" hint="Blank starts right away.">
            <Input id="promotion-starts" type="date" value={form.startsAt} onChange={(e) => update('startsAt', e.target.value)} className="text-sm" />
          </Field>
          <Field id="promotion-ends" label="Ends" error={errors.endsAt} hint="Blank runs with no end date.">
            <Input id="promotion-ends" type="date" value={form.endsAt} onChange={(e) => update('endsAt', e.target.value)} aria-invalid={!!errors.endsAt} className="text-sm" />
          </Field>
          <Field id="promotion-priority" label="Priority" error={errors.priority} hint="1–100. Higher shows first.">
            <Input id="promotion-priority" type="number" min={1} max={100} value={form.priority} onChange={(e) => update('priority', e.target.value)} aria-invalid={!!errors.priority} className="text-sm tabular-nums" />
          </Field>
        </div>
      </FormSection>

      <FormSection id="publishing" title="Status and notes">
        <Field id="promotion-status" label="Status" className="max-w-xs">
          <SelectField id="promotion-status" value={form.status} onChange={(value) => update('status', value)} items={statusItems} />
        </Field>
        <Field id="promotion-notes" label="Notes" hint="Only admins see these.">
          <Textarea id="promotion-notes" value={form.notes} onChange={(e) => update('notes', e.target.value)} rows={3} className="text-sm" />
        </Field>
      </FormSection>

      <div className="flex items-center justify-end gap-2 border-t border-border pt-4">{actions}</div>
    </form>
  )
}
