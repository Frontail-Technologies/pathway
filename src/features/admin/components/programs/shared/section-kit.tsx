'use client'

import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { StatusBadge, type StatusTone } from '../../kit'

export function EditorSection({ id, title, description, action, children }: { id: string; title: string; description?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 rounded-lg border border-border bg-card">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-3.5">
        <div className="min-w-0">
          <h2 id={`${id}-title`} className="text-[15px] font-semibold text-foreground">
            {title}
          </h2>
          {description ? <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0 text-[13px] text-muted-foreground">{action}</div> : null}
      </div>
      <div className="space-y-4 p-5">{children}</div>
    </section>
  )
}

export function Field({ label, htmlFor, required, error, hint, children, className }: { label: string; htmlFor?: string; required?: boolean; error?: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={htmlFor} className="text-[13px] font-medium text-foreground">
        {label}
        {required ? (
          <span className="text-muted-foreground" aria-hidden="true">
            *
          </span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p className="text-[13px] text-destructive" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[13px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  )
}

export type SelectOption = { value: string; label: string }

export function FormSelect({ id, value, onChange, options, placeholder, disabled, className }: { id?: string; value: string; onChange: (value: string) => void; options: SelectOption[]; placeholder?: string; disabled?: boolean; className?: string }) {
  return (
    <Select items={options} value={value} onValueChange={(next) => next && onChange(next as string)} disabled={disabled}>
      <SelectTrigger id={id} className={cn('w-full text-sm', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function RemovableChip({ children, onRemove, removeLabel }: { children: ReactNode; onRemove: () => void; removeLabel: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-border bg-card py-0.5 pr-0.5 pl-2 text-[13px] text-foreground">
      {children}
      <button type="button" onClick={onRemove} aria-label={removeLabel} className="rounded p-0.5 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40">
        <X className="size-3.5" aria-hidden="true" />
      </button>
    </span>
  )
}

export function EmptyNote({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 rounded-md border border-dashed border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">{children}</p>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function EditorActions({ onCancel, onSave, saveLabel = 'Save changes' }: { onCancel: () => void; onSave: (event: React.FormEvent) => void; saveLabel?: string }) {
  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="button" size="sm" onClick={onSave}>
        {saveLabel}
      </Button>
    </>
  )
}

export function MobileEditorBar(props: { onCancel: () => void; onSave: (event: React.FormEvent) => void; saveLabel?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-end gap-2 border-t border-border bg-card p-3 sm:hidden">
      <EditorActions {...props} />
    </div>
  )
}

export function StatusChecklist({ items }: { items: { key: string; label: string; tone: StatusTone; status: string }[] }) {
  return (
    <ul className="divide-y divide-border">
      {items.map((item) => (
        <li key={item.key} className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
          <span className="text-sm text-foreground">{item.label}</span>
          <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
        </li>
      ))}
    </ul>
  )
}

export function DocumentRow({ title, type, meta, action }: { title: string; type?: string; meta?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        <p className="text-[13px] text-muted-foreground">{[type, meta].filter(Boolean).join(' · ')}</p>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  )
}

export function humanize(value: string) {
  const text = value.replace(/_/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}
