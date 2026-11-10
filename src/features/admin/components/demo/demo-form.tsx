'use client'

import type { ReactNode } from 'react'
import { Info, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

export function DemoNote({ children = 'Demo: changes are saved on this device only.', className }: { children?: ReactNode; className?: string }) {
  return (
    <p className={cn('flex items-start gap-1.5 text-[13px] text-muted-foreground', className)}>
      <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

export function FormSection({ id, title, children, className }: { id?: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('scroll-mt-24 rounded-xl border border-border bg-card shadow-sm', className)}>
      <div className="border-b border-border px-5 py-3.5">
        <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </section>
  )
}

export function Field({ id, label, error, required, children, className }: { id: string; label: string; error?: string; required?: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-destructive" aria-hidden="true">*</span> : null}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[13px] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function FormSelect<T extends string>({ id, value, onChange, options, placeholder, className }: { id?: string; value: T; onChange: (value: T) => void; options: { value: T; label: string }[]; placeholder?: string; className?: string }) {
  return (
    <Select value={value} onValueChange={(next) => next !== null && onChange(next as T)} items={options}>
      <SelectTrigger id={id} className={cn('h-9 w-full bg-card text-sm', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function ToggleRow({ title, control }: { title: string; control: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
      </div>
      <div className="shrink-0 pt-0.5">{control}</div>
    </div>
  )
}

export type PairRow = { a: string; b: string }

export function PairRowsEditor({ idPrefix, rows, onChange, aLabel, bLabel, aPlaceholder, bPlaceholder, addLabel, emptyText }: { idPrefix: string; rows: PairRow[]; onChange: (rows: PairRow[]) => void; aLabel: string; bLabel: string; aPlaceholder?: string; bPlaceholder?: string; addLabel: string; emptyText: string }) {
  const update = (index: number, patch: Partial<PairRow>) => onChange(rows.map((row, i) => (i === index ? { ...row, ...patch } : row)))
  return (
    <div className="space-y-2">
      {rows.length === 0 ? <p className="text-[13px] text-muted-foreground">{emptyText}</p> : null}
      {rows.map((row, index) => (
        <div key={index} className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] sm:items-center">
          <Input id={`${idPrefix}-${index}-a`} aria-label={`${aLabel} ${index + 1}`} value={row.a} placeholder={aPlaceholder} onChange={(event) => update(index, { a: event.target.value })} className="h-9" />
          <Input id={`${idPrefix}-${index}-b`} aria-label={`${bLabel} ${index + 1}`} value={row.b} placeholder={bPlaceholder} onChange={(event) => update(index, { b: event.target.value })} className="h-9" />
          <Button type="button" variant="ghost" size="icon-sm" className="justify-self-end text-muted-foreground hover:text-destructive" aria-label={`Remove row ${index + 1}`} onClick={() => onChange(rows.filter((_, i) => i !== index))}>
            <Trash2 className="size-4" aria-hidden="true" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => onChange([...rows, { a: '', b: '' }])}>
        <Plus className="size-4" aria-hidden="true" />
        {addLabel}
      </Button>
    </div>
  )
}

export function StickySaveBar({ visible, onDiscard, saveLabel = 'Save changes', message = 'You have unsaved changes', formId, className }: { visible: boolean; onDiscard: () => void; saveLabel?: string; message?: string; formId?: string; className?: string }) {
  if (!visible) return null
  return (
    <div role="region" aria-label="Unsaved changes" className={cn('sticky bottom-4 z-30 flex items-center justify-between gap-3 rounded-xl border border-border bg-card shadow-sm px-4 py-3', className)}>
      <p className="text-sm text-foreground">{message}</p>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onDiscard}>
          Discard
        </Button>
        <Button type="submit" size="sm" form={formId}>
          {saveLabel}
        </Button>
      </div>
    </div>
  )
}
