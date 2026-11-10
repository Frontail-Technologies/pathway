'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { fieldLabel, type StagedRecord } from '@/features/admin/data/admin-ingestion-api'
import { Field } from '../demo/demo-form'

type Entry = { path: string[]; original: unknown; text: string; complex: boolean; problem?: string }

const pathOf = (raw: string) => raw.replace(/^body\./, '').split('.').filter(Boolean)

function read(payload: Record<string, unknown>, path: string[]): unknown {
  let current: unknown = payload
  for (const key of path) {
    if (!current || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[key]
  }
  return current
}

function textOf(value: unknown) {
  if (value === undefined || value === null) return ''
  return typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)
}

function entriesFor(record: StagedRecord): Entry[] {
  const entries = new Map<string, Entry>()
  for (const error of record.errors) {
    const path = pathOf(error.path)
    if (!path.length) continue
    const original = read(record.payload, path)
    entries.set(path.join('.'), { path, original, text: textOf(original), complex: typeof original === 'object' && original !== null, problem: error.message })
  }
  for (const [key, value] of Object.entries(record.payload)) {
    if (key === 'slug' || [...entries.keys()].some((existing) => existing === key || existing.startsWith(`${key}.`))) continue
    entries.set(key, { path: [key], original: value, text: textOf(value), complex: typeof value === 'object' && value !== null })
  }
  return [...entries.values()]
}

function parse(entry: Entry, text: string): unknown {
  const trimmed = text.trim()
  if (entry.complex) return trimmed ? JSON.parse(trimmed) : null
  if (typeof entry.original === 'number') return trimmed === '' ? null : Number(trimmed)
  if (typeof entry.original === 'boolean') return trimmed === 'true'
  if (entry.original === undefined && /^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)
  return trimmed === '' ? null : trimmed
}

export function CorrectDialog({
  open,
  onOpenChange,
  record,
  busy,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  record: StagedRecord
  busy: boolean
  onSubmit: (correction: Record<string, unknown>, note: string) => void
}) {
  const initial = React.useMemo(() => entriesFor(record), [record])
  const [values, setValues] = React.useState<Record<string, string>>({})
  const [note, setNote] = React.useState('')
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    if (open) {
      setValues(Object.fromEntries(initial.map((entry) => [entry.path.join('.'), entry.text])))
      setNote('')
      setErrors({})
    }
  }, [open, initial])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const correction: Record<string, unknown> = {}
    const problems: Record<string, string> = {}
    for (const entry of initial) {
      const key = entry.path.join('.')
      const text = values[key] ?? ''
      if (text === entry.text) continue
      let value: unknown
      try {
        value = parse(entry, text)
      } catch {
        problems[key] = 'Enter valid JSON.'
        continue
      }
      if (typeof value === 'number' && Number.isNaN(value)) {
        problems[key] = 'Enter a number.'
        continue
      }
      const [top, ...rest] = entry.path
      if (!top) continue
      if (!rest.length) {
        correction[top] = value
        continue
      }
      const base = (correction[top] ?? structuredClone(record.payload[top] ?? {})) as Record<string, unknown>
      let cursor = base
      for (const key of rest.slice(0, -1)) {
        cursor[key] = typeof cursor[key] === 'object' && cursor[key] !== null ? cursor[key] : {}
        cursor = cursor[key] as Record<string, unknown>
      }
      cursor[rest[rest.length - 1]!] = value
      correction[top] = base
    }
    if (Object.keys(problems).length) return setErrors(problems)
    if (!Object.keys(correction).length) return setErrors({ form: 'Change at least one value.' })
    onSubmit(correction, note.trim())
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>Correct and approve</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            {initial.map((entry) => {
              const key = entry.path.join('.')
              const id = `correct-${key.replace(/\W/g, '-')}`
              return (
                <Field key={key} id={id} label={entry.path.map(fieldLabel).join(' › ')} error={errors[key] ?? entry.problem}>
                  {entry.complex ? (
                    <Textarea
                      id={id}
                      rows={Math.min(10, Math.max(3, (values[key] ?? '').split('\n').length))}
                      value={values[key] ?? ''}
                      onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
                      className="font-mono text-[12px]"
                      spellCheck={false}
                    />
                  ) : (
                    <Input
                      id={id}
                      value={values[key] ?? ''}
                      onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
                      aria-invalid={entry.problem || errors[key] ? true : undefined}
                      className="h-9"
                    />
                  )}
                </Field>
              )
            })}
            <Field id="correct-note" label="Note">
              <Input id="correct-note" value={note} onChange={(event) => setNote(event.target.value)} className="h-9" maxLength={500} />
            </Field>
          </div>
          {errors.form ? <p className="text-sm text-destructive">{errors.form}</p> : null}
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={busy}>
              {busy ? 'Approving…' : 'Approve with corrections'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function RejectDialog({ open, onOpenChange, busy, onSubmit }: { open: boolean; onOpenChange: (open: boolean) => void; busy: boolean; onSubmit: (note: string) => void }) {
  const [note, setNote] = React.useState('')
  const [error, setError] = React.useState<string>()

  React.useEffect(() => {
    if (open) {
      setNote('')
      setError(undefined)
    }
  }, [open])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (note.trim().length < 3) return setError('Give a short reason.')
    onSubmit(note.trim())
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>Reject this record</DialogTitle>
          </DialogHeader>
          <Field id="reject-note" label="Reason" required error={error}>
            <Textarea
              id="reject-note"
              rows={3}
              autoFocus
              maxLength={500}
              value={note}
              onChange={(event) => {
                setNote(event.target.value)
                setError(undefined)
              }}
            />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" size="sm" disabled={busy}>
              {busy ? 'Rejecting…' : 'Reject'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
