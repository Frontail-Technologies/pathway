'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, Check, CheckCircle2, Loader2, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { cn } from '@/lib/utils'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function useEditorGuard<T>(formData: T, cancelHref: string) {
  const router = useRouter()
  const [baseline, setBaseline] = useState(() => JSON.stringify(formData))
  const dirty = JSON.stringify(formData) !== baseline
  useUnsavedChanges(dirty)

  const markSaved = useCallback(() => setBaseline(JSON.stringify(formData)), [formData])
  const cancel = useCallback(() => {
    if (dirty && !window.confirm('Discard unsaved changes?')) return
    router.push(cancelHref)
  }, [cancelHref, dirty, router])

  return { dirty, markSaved, cancel }
}

export function EditorSection({ id, title, description, children }: { id: string; title: string; description?: string; children: ReactNode }) {
  return (
    <section id={`section-${id}`} aria-labelledby={`section-${id}-title`} className="scroll-mt-24 rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-5 py-3.5">
        <h2 id={`section-${id}-title`} className="text-[15px] font-semibold text-foreground">
          {title}
        </h2>
        {description ? <p className="mt-0.5 text-[13px] text-muted-foreground">{description}</p> : null}
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </section>
  )
}

export function Field({ label, htmlFor, required, hint, error, className, children }: { label: string; htmlFor?: string; required?: boolean; hint?: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-muted-foreground font-normal"> (required)</span> : null}
      </Label>
      {children}
      {error ? <p className="text-[13px] text-destructive">{error}</p> : hint ? <p className="text-[13px] text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export function ChipToggleGroup({ label, required, hint, error, options, selected, onToggle, format }: { label: string; required?: boolean; hint?: string; error?: string; options: readonly string[]; selected: readonly string[]; onToggle: (value: string) => void; format?: (value: string) => string }) {
  return (
    <div className="space-y-2" role="group" aria-label={label}>
      <p className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-muted-foreground font-normal"> (required)</span> : null}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(option)}
              className={cn(
                'inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40',
                on ? 'border-primary/50 bg-accent text-accent-foreground' : 'border-border bg-card text-foreground hover:bg-muted/60',
              )}
            >
              {on ? <Check className="size-3.5" aria-hidden="true" /> : null}
              {format ? format(option) : option}
            </button>
          )
        })}
      </div>
      {error ? <p className="text-[13px] text-destructive">{error}</p> : hint ? <p className="text-[13px] text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export function CheckboxField({ label, checked, onChange, hint }: { label: string; checked: boolean; onChange: (checked: boolean) => void; hint?: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 select-none">
      <Checkbox checked={checked} onCheckedChange={(value) => onChange(Boolean(value))} className="mt-0.5" />
      <span>
        <span className="block text-sm text-foreground">{label}</span>
        {hint ? <span className="block text-[13px] text-muted-foreground">{hint}</span> : null}
      </span>
    </label>
  )
}

export function StringListInput({ id, label, hint, placeholder, items, onAdd, onRemove }: { id: string; label: string; hint?: string; placeholder?: string; items: readonly string[]; onAdd: (value: string) => void; onRemove: (index: number) => void }) {
  const [value, setValue] = useState('')
  const add = () => {
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }
  return (
    <Field label={label} htmlFor={id} hint={hint}>
      <div className="flex gap-2">
        <Input
          id={id}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              add()
            }
          }}
          placeholder={placeholder}
          className="h-9 text-sm"
        />
        <Button type="button" variant="outline" size="sm" onClick={add} className="h-9 gap-1.5">
          <Plus className="size-4" aria-hidden="true" />
          Add
        </Button>
      </div>
      {items.length > 0 ? (
        <ul className="divide-y divide-border rounded-md border border-border">
          {items.map((item, index) => (
            <li key={`${item}-${index}`} className="flex items-center justify-between gap-3 px-3 py-2 text-sm text-foreground">
              <span className="min-w-0">{item}</span>
              <RemoveButton label={`Remove ${item}`} onClick={() => onRemove(index)} />
            </li>
          ))}
        </ul>
      ) : null}
    </Field>
  )
}

export function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="shrink-0 rounded p-1 text-muted-foreground outline-none hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring/40">
      <X className="size-4" aria-hidden="true" />
    </button>
  )
}

export function EditorActions({ onCancel, onSave, saveStatus, saveLabel }: { onCancel: () => void; onSave: () => void; saveStatus: SaveStatus; saveLabel: string }) {
  return (
    <>
      <Button type="button" variant="outline" size="sm" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="button" size="sm" onClick={onSave} disabled={saveStatus === 'saving'} className="gap-1.5">
        {saveStatus === 'saving' ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
        {saveLabel}
      </Button>
    </>
  )
}

export function MobileSaveBar({ dirty, ...actions }: { dirty: boolean; onCancel: () => void; onSave: () => void; saveStatus: SaveStatus; saveLabel: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-3 border-t border-border bg-card px-4 py-3 lg:hidden">
      <span className="truncate text-[13px] text-muted-foreground">{dirty ? 'Unsaved changes' : 'No changes'}</span>
      <div className="flex shrink-0 items-center gap-2">
        <EditorActions {...actions} />
      </div>
    </div>
  )
}

export function SaveNotice({ status, message }: { status: SaveStatus; message: string | null }) {
  if (!message) return null
  const error = status === 'error'
  return (
    <div role="status" className={cn('flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm', error ? 'border-destructive/30 text-destructive' : 'border-border bg-card text-foreground')}>
      {error ? <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> : <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />}
      <span>{message}</span>
    </div>
  )
}
