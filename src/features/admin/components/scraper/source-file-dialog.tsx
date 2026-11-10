'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { FileUp } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  entityLabel,
  IMPORTABLE_TYPES,
  importCsv,
  parseSourceFile,
  RAW_FILE_ACCEPT,
  rawMimeOf,
  uploadRawFile,
  type ImportResult,
  type IngestionSource,
} from '@/features/admin/data/admin-ingestion-api'
import { queryKeys } from '@/lib/query-client'
import { Field, FormSelect } from '../demo/demo-form'
import { messageOf } from './shared'

export const isCsvSource = (source: Pick<IngestionSource, 'adapter' | 'fetchMode'>) => source.adapter === 'csv' && source.fetchMode === 'upload'
export const takesFiles = (source: Pick<IngestionSource, 'fetchMode' | 'status'>) => source.status !== 'paused' && (source.fetchMode === 'upload' || source.fetchMode === 'file')
export const runsLive = (source: Pick<IngestionSource, 'fetchMode' | 'status'>) => source.status !== 'paused' && source.fetchMode !== 'upload'

const MAX_CSV_BYTES = 2_000_000

export function SourceFileDialog({ open, onOpenChange, source }: { open: boolean; onOpenChange: (open: boolean) => void; source: IngestionSource }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const csv = isCsvSource(source)
  const importable = source.entityTypes.filter((type): type is (typeof IMPORTABLE_TYPES)[number] => (IMPORTABLE_TYPES as readonly string[]).includes(type))
  const [file, setFile] = React.useState<File | null>(null)
  const [entityType, setEntityType] = React.useState<string>(importable[0] ?? 'institution')
  const [error, setError] = React.useState<string>()
  const [result, setResult] = React.useState<ImportResult | null>(null)

  React.useEffect(() => {
    if (open) {
      setFile(null)
      setError(undefined)
      setResult(null)
    }
  }, [open])

  const mutation = useMutation({
    mutationFn: async (picked: File) => {
      if (csv) {
        if (picked.size > MAX_CSV_BYTES) throw new Error('CSV imports are limited to 2 MB. Split the file and import each part.')
        return { kind: 'csv' as const, result: await importCsv({ source: source.slug, entityType, fileName: picked.name, csv: await picked.text() }) }
      }
      const assetId = await uploadRawFile(picked)
      return { kind: 'parse' as const, job: await parseSourceFile(source.id, assetId) }
    },
    onSuccess: (outcome) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.ingestion })
      if (outcome.kind === 'csv') return setResult(outcome.result)
      toast.success('File uploaded. The worker is reading it now.')
      onOpenChange(false)
      router.push(`/admin/scraper/jobs/${outcome.job.id}`)
    },
    onError: (err) => setError(messageOf(err, 'The file could not be imported. Please try again.')),
  })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) return setError('Choose a file.')
    if (csv && !file.name.toLowerCase().endsWith('.csv')) return setError('Choose a .csv file.')
    if (!csv && !rawMimeOf(file)) return setError('Choose a CSV, Excel, HTML, PDF or JSON file.')
    setError(undefined)
    mutation.mutate(file)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {result ? (
          <div className="grid gap-4">
            <DialogHeader>
              <DialogTitle>File staged</DialogTitle>
            </DialogHeader>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              {[
                ['New records', result.toCreate],
                ['Updates', result.toUpdate],
                ['Need fixing', result.invalid],
                ['Rows staged', result.staged],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border px-3 py-2">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="text-lg font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            {result.unknownColumns.length ? <p className="text-sm text-muted-foreground">Ignored columns: {result.unknownColumns.join(', ')}</p> : null}
            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  onOpenChange(false)
                  router.push(`/admin/scraper/imports/${result.batch.id}`)
                }}
              >
                Review records
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4" noValidate>
            <DialogHeader>
              <DialogTitle>Upload to {source.name}</DialogTitle>
            </DialogHeader>
            {csv && importable.length > 1 ? (
              <Field id="file-type" label="Record type">
                <FormSelect id="file-type" value={entityType} onChange={setEntityType} options={importable.map((value) => ({ value, label: entityLabel(value) }))} />
              </Field>
            ) : null}
            <Field id="file-input" label="File" required error={error}>
              <label
                htmlFor="file-input"
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-border px-4 py-5 text-sm hover:border-primary/60 hover:bg-primary/5"
              >
                <FileUp className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="min-w-0 truncate">{file ? file.name : csv ? 'Choose a .csv file' : 'Choose the official file'}</span>
              </label>
              <input
                id="file-input"
                type="file"
                accept={csv ? '.csv' : RAW_FILE_ACCEPT}
                className="sr-only"
                onChange={(event) => {
                  setFile(event.target.files?.[0] ?? null)
                  setError(undefined)
                }}
              />
            </Field>
            <DialogFooter>
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" disabled={mutation.isPending}>
                {mutation.isPending ? 'Uploading…' : 'Upload'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
