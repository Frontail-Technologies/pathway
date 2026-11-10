'use client'

import * as React from 'react'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import {
  createSource,
  ENTITY_TYPES,
  entityLabel,
  FETCH_MODES,
  fetchModeLabels,
  kindLabels,
  SOURCE_KINDS,
  updateSource,
  type EntityType,
  type FetchMode,
  type IngestionSource,
  type SourceInput,
  type SourceKind,
} from '@/features/admin/data/admin-ingestion-api'
import { slugify } from '@/features/admin/utils/slug'
import { queryKeys } from '@/lib/query-client'
import { Field, FormSelect } from '../demo/demo-form'
import { UrlPreview } from '../kit'

export const ADAPTERS = [
  { value: 'lgd', label: 'Local Government Directory' },
  { value: 'ugc_universities', label: 'UGC universities list' },
  { value: 'institution_table', label: 'Institution table (AISHE, NAAC)' },
  { value: 'nta_notices', label: 'NTA notice board' },
  { value: 'nirf_rankings', label: 'NIRF rankings' },
  { value: 'nsp_scholarships', label: 'National Scholarship Portal' },
  { value: 'csv', label: 'CSV import' },
]

type Draft = {
  name: string
  kind: SourceKind
  adapter: string
  fetchMode: FetchMode
  entityTypes: EntityType[]
  baseUrl: string
  allowedPaths: string
  schedule: string
  rateLimitPerMinute: string
  respectRobots: boolean
  termsUrl: string
  licenceNote: string
  config: string
}

const emptyDraft: Draft = {
  name: '',
  kind: 'regulator',
  adapter: 'csv',
  fetchMode: 'upload',
  entityTypes: ['institution'],
  baseUrl: '',
  allowedPaths: '',
  schedule: '',
  rateLimitPerMinute: '30',
  respectRobots: true,
  termsUrl: '',
  licenceNote: '',
  config: '{}',
}

function draftOf(source: IngestionSource | null): Draft {
  if (!source) return emptyDraft
  return {
    name: source.name,
    kind: source.kind,
    adapter: source.adapter,
    fetchMode: source.fetchMode,
    entityTypes: source.entityTypes,
    baseUrl: source.baseUrl ?? '',
    allowedPaths: source.allowedPaths.join('\n'),
    schedule: source.schedule ?? '',
    rateLimitPerMinute: String(source.rateLimitPerMinute),
    respectRobots: source.respectRobots,
    termsUrl: source.termsUrl ?? '',
    licenceNote: source.licenceNote ?? '',
    config: JSON.stringify(source.config, null, 2),
  }
}

type Errors = Partial<Record<keyof Draft | 'form', string>>

const SERVER_FIELDS: Record<string, keyof Draft> = { schedule: 'schedule', baseUrl: 'baseUrl', termsUrl: 'termsUrl', adapter: 'adapter', name: 'name', slug: 'name', entityTypes: 'entityTypes' }

export function SourceEditorDialog({ open, onOpenChange, source }: { open: boolean; onOpenChange: (open: boolean) => void; source: IngestionSource | null }) {
  const queryClient = useQueryClient()
  const [draft, setDraft] = React.useState<Draft>(emptyDraft)
  const [errors, setErrors] = React.useState<Errors>({})

  React.useEffect(() => {
    if (open) {
      setDraft(draftOf(source))
      setErrors({})
    }
  }, [open, source])

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined, form: undefined }))
  }

  const slug = source ? source.slug : slugify(draft.name)

  const mutation = useMutation({
    mutationFn: (input: SourceInput) => (source ? updateSource(source.id, input) : createSource({ ...input, slug })),
    onSuccess: (saved) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.ingestion })
      toast.success(source ? 'Source saved' : `${saved.name} added`)
      onOpenChange(false)
    },
    onError: (error) => {
      if (error instanceof ApiRequestError && error.details.length) {
        const next: Errors = {}
        for (const detail of error.details) {
          const key = SERVER_FIELDS[(detail.path ?? '').replace(/^body\./, '').split('.')[0] ?? '']
          if (key && !next[key]) next[key] = detail.message
        }
        setErrors(Object.keys(next).length ? next : { form: error.message })
        return
      }
      setErrors({ form: error instanceof ApiRequestError ? error.message : 'Could not save the source. Please try again.' })
    },
  })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const next: Errors = {}
    if (!draft.name.trim()) next.name = 'Enter a name.'
    else if (!slug) next.name = 'Use letters or numbers in the name.'
    if (!draft.entityTypes.length) next.entityTypes = 'Pick at least one record type.'
    const rate = Number(draft.rateLimitPerMinute)
    if (!Number.isInteger(rate) || rate < 1 || rate > 600) next.rateLimitPerMinute = 'Use a whole number from 1 to 600.'
    let config: Record<string, unknown> = {}
    try {
      const parsed: unknown = JSON.parse(draft.config.trim() || '{}')
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error()
      config = parsed as Record<string, unknown>
    } catch {
      next.config = 'Enter a JSON object, for example {}.'
    }
    if (Object.keys(next).length) return setErrors(next)
    mutation.mutate({
      name: draft.name.trim(),
      kind: draft.kind,
      adapter: draft.adapter,
      fetchMode: draft.fetchMode,
      entityTypes: draft.entityTypes,
      baseUrl: draft.baseUrl.trim() || null,
      allowedPaths: draft.allowedPaths
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      schedule: draft.schedule.trim() || null,
      rateLimitPerMinute: rate,
      respectRobots: draft.respectRobots,
      termsUrl: draft.termsUrl.trim() || null,
      licenceNote: draft.licenceNote.trim() || null,
      config,
    })
  }

  const toggleType = (type: EntityType) => set('entityTypes', draft.entityTypes.includes(type) ? draft.entityTypes.filter((item) => item !== type) : [...draft.entityTypes, type])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>{source ? `Edit ${source.name}` : 'Add a source'}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="source-name" label="Name" required error={errors.name} className="sm:col-span-2">
              <Input id="source-name" value={draft.name} onChange={(event) => set('name', event.target.value)} aria-invalid={errors.name ? true : undefined} className="h-9" autoFocus={!source} />
            </Field>
            <UrlPreview prefix="sources/" slug={slug} locked={Boolean(source)} label="Identifier" className="sm:col-span-2" />
            <Field id="source-kind" label="Kind">
              <FormSelect id="source-kind" value={draft.kind} onChange={(value) => set('kind', value)} options={SOURCE_KINDS.map((value) => ({ value, label: kindLabels[value] }))} />
            </Field>
            <Field id="source-mode" label="How we get the data">
              <FormSelect id="source-mode" value={draft.fetchMode} onChange={(value) => set('fetchMode', value)} options={FETCH_MODES.map((value) => ({ value, label: fetchModeLabels[value] }))} />
            </Field>
            <Field id="source-adapter" label="Adapter" error={errors.adapter}>
              <FormSelect
                id="source-adapter"
                value={draft.adapter}
                onChange={(value) => set('adapter', value)}
                options={ADAPTERS.some((item) => item.value === draft.adapter) ? ADAPTERS : [...ADAPTERS, { value: draft.adapter, label: draft.adapter }]}
              />
            </Field>
            <Field id="source-rate" label="Requests per minute" error={errors.rateLimitPerMinute}>
              <Input id="source-rate" inputMode="numeric" value={draft.rateLimitPerMinute} onChange={(event) => set('rateLimitPerMinute', event.target.value)} className="h-9" />
            </Field>
            <Field id="source-types" label="Record types" error={errors.entityTypes} className="sm:col-span-2">
              <div id="source-types" className="flex flex-wrap gap-2">
                {ENTITY_TYPES.map((type) => {
                  const on = draft.entityTypes.includes(type)
                  return (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleType(type)}
                      className={
                        on
                          ? 'h-8 rounded-full border border-primary bg-primary/10 px-3 text-[13px] font-medium text-primary'
                          : 'h-8 rounded-full border border-border px-3 text-[13px] text-muted-foreground hover:text-foreground'
                      }
                    >
                      {entityLabel(type)}
                    </button>
                  )
                })}
              </div>
            </Field>
            <Field id="source-base" label="Website" error={errors.baseUrl}>
              <Input id="source-base" type="url" placeholder="https://" value={draft.baseUrl} onChange={(event) => set('baseUrl', event.target.value)} className="h-9" />
            </Field>
            <Field id="source-schedule" label="Schedule (cron, India time)" error={errors.schedule}>
              <Input id="source-schedule" placeholder="0 4 1 * *" value={draft.schedule} onChange={(event) => set('schedule', event.target.value)} className="h-9 font-mono" />
            </Field>
            <Field id="source-paths" label="Allowed paths" className="sm:col-span-2">
              <Textarea id="source-paths" rows={3} placeholder="/one/path/per/line" value={draft.allowedPaths} onChange={(event) => set('allowedPaths', event.target.value)} className="font-mono text-[13px]" />
            </Field>
            <Field id="source-terms" label="Terms page" error={errors.termsUrl}>
              <Input id="source-terms" type="url" placeholder="https://" value={draft.termsUrl} onChange={(event) => set('termsUrl', event.target.value)} className="h-9" />
            </Field>
            <div className="flex items-end">
              <label className="flex h-9 items-center gap-2.5 text-sm text-foreground">
                <Switch checked={draft.respectRobots} onCheckedChange={(checked) => set('respectRobots', Boolean(checked))} />
                Respect robots.txt
              </label>
            </div>
            <Field id="source-licence" label="Licence and attribution" className="sm:col-span-2">
              <Textarea id="source-licence" rows={2} value={draft.licenceNote} onChange={(event) => set('licenceNote', event.target.value)} />
            </Field>
            <Field id="source-config" label="Adapter settings (JSON)" error={errors.config} className="sm:col-span-2">
              <Textarea id="source-config" rows={5} value={draft.config} onChange={(event) => set('config', event.target.value)} className="font-mono text-[12px]" spellCheck={false} />
            </Field>
          </div>

          {errors.form ? <p className="text-sm text-destructive">{errors.form}</p> : null}

          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving…' : source ? 'Save source' : 'Add source'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
