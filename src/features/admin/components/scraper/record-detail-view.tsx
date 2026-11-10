'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AlertTriangle, Check, Clock, Database, PencilLine, X } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import {
  approveStaged,
  entityLabel,
  fieldLabel,
  getStaged,
  listStaged,
  rejectStaged,
  resolutionLabels,
  stagedStatusLabels,
  stagedStatusTone,
  type StagedRecord,
} from '@/features/admin/data/admin-ingestion-api'
import { formatDateTime } from '@/features/admin/data/admin-team-api'
import { queryKeys } from '@/lib/query-client'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminPanelSkeleton } from '../admin-skeletons'
import { formatRelative } from '../demo/relative-time'
import { AdminPageHeader, FactList, Panel, RecordHeader, StatusBadge, Tag } from '../kit'
import { matchText } from './batch-review-view'
import { CorrectDialog, RejectDialog } from './record-dialogs'
import { DiffRows, ExternalSourceLink, messageOf, useIngestionRole, ValueView } from './shared'

const reviewable = (record: StagedRecord) => record.status === 'pending' || record.status === 'invalid'

export function RecordDetailView({ recordId }: { recordId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { ready } = useIngestionRole()
  const [correcting, setCorrecting] = React.useState(false)
  const [rejecting, setRejecting] = React.useState(false)
  const query = useQuery({ queryKey: queryKeys.ingestionRecord(recordId), queryFn: () => getStaged(recordId), enabled: ready })
  const record = query.data

  const applicable = React.useMemo(() => record?.diff?.fields.filter((field) => field.willApply).map((field) => field.field) ?? [], [record])
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  React.useEffect(() => setSelected(new Set(applicable)), [applicable])

  const goNext = async (current: StagedRecord) => {
    const next = (await listStaged({ batchId: current.batchId, status: 'pending', limit: 2 }).catch(() => [])).find((row) => row.id !== current.id)
    router.push(next ? `/admin/scraper/records/${next.id}` : `/admin/scraper/imports/${current.batchId}`)
  }

  const decide = useMutation({
    mutationFn: async ({ run }: { run: () => Promise<unknown>; success: string }) => run(),
    onSuccess: async (_, variables) => {
      toast.success(variables.success)
      setCorrecting(false)
      setRejecting(false)
      await queryClient.invalidateQueries({ queryKey: queryKeys.ingestion })
      if (record) await goNext(record)
    },
    onError: (error) => {
      const detail = error instanceof ApiRequestError && error.details.length ? `: ${error.details.map((item) => item.message).join('; ')}` : ''
      toast.error(`${messageOf(error, 'That did not go through.')}${detail}`)
    },
  })

  if (!record) {
    const missing = query.error instanceof ApiRequestError && query.error.status === 404
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Staged record" back={{ href: '/admin/scraper/imports', label: 'Review' }} />
        {query.isError ? (
          <div className="rounded-xl border border-border bg-card shadow-sm">
            <AdminEmptyState
              art={missing ? 'notFound' : 'loadError'}
              title={missing ? 'Record not found' : 'Could not load this record'}
              description={messageOf(query.error, 'Please try again.')}
              action={
                <Button variant="outline" onClick={() => void query.refetch()}>
                  Try again
                </Button>
              }
              className="py-14"
            />
          </div>
        ) : (
          <AdminPanelSkeleton lines={8} />
        )}
      </div>
    )
  }

  const open = reviewable(record)
  const isUpdate = record.diff?.action === 'update'
  const nothingToApply = isUpdate && applicable.length === 0
  const partial = isUpdate && selected.size > 0 && selected.size < applicable.length
  const busy = decide.isPending

  const approve = () =>
    decide.mutate({
      run: () => approveStaged(record.id, partial ? { fields: [...selected] } : {}),
      success: isUpdate ? `${record.title} updated` : `${record.title} approved`,
    })

  return (
    <div className="space-y-5">
      <RecordHeader
        title={record.title}
        back={{ href: `/admin/scraper/imports/${record.batchId}`, label: 'Batch' }}
        chips={
          <>
            <StatusBadge tone={stagedStatusTone[record.status]}>{stagedStatusLabels[record.status]}</StatusBadge>
            <Tag>{entityLabel(record.entityType)}</Tag>
            <Tag>{matchText(record)}</Tag>
          </>
        }
        meta={[
          { icon: Database, label: record.source.name },
          { icon: Clock, label: `Staged ${formatRelative(record.createdAt)}` },
        ]}
        actions={
          open ? (
            <>
              {record.status === 'pending' ? (
                <Button size="sm" className="gap-1.5" disabled={busy || nothingToApply || (isUpdate && selected.size === 0)} onClick={approve}>
                  <Check className="size-4" aria-hidden="true" />
                  {partial ? `Approve ${selected.size} field${selected.size === 1 ? '' : 's'}` : 'Approve'}
                </Button>
              ) : null}
              <Button variant={record.status === 'invalid' ? 'default' : 'outline'} size="sm" className="gap-1.5" disabled={busy} onClick={() => setCorrecting(true)}>
                <PencilLine className="size-4" aria-hidden="true" />
                Correct
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5" disabled={busy} onClick={() => setRejecting(true)}>
                <X className="size-4" aria-hidden="true" />
                Reject
              </Button>
            </>
          ) : null
        }
      />

      {record.errors.length ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
            <AlertTriangle className="size-4" aria-hidden="true" />
            {record.errors.length} problem{record.errors.length === 1 ? '' : 's'} to fix before approval
          </p>
          <ul className="mt-2 space-y-1 text-sm text-foreground">
            {record.errors.map((error, index) => (
              <li key={index}>
                <span className="font-medium">{fieldLabel(error.path.replace(/^body\./, ''))}</span>: {error.message}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {nothingToApply && open ? <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">Nothing here would change the live record. Reject it or leave it.</div> : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title={record.diff?.action === 'create' ? 'New record' : 'Changes'}>
            {record.diff ? (
              <DiffRows
                fields={record.diff.fields}
                create={record.diff.action === 'create'}
                selected={open && record.status === 'pending' ? selected : undefined}
                onToggle={(field) =>
                  setSelected((current) => {
                    const next = new Set(current)
                    if (next.has(field)) next.delete(field)
                    else next.add(field)
                    return next
                  })
                }
              />
            ) : (
              <ValueView value={record.payload} />
            )}
          </Panel>
          {record.conflicts.length ? (
            <Panel title="Conflicts">
              <ul className="divide-y divide-border">
                {record.conflicts.map((conflict) => (
                  <li key={conflict.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
                    <span className="font-medium text-foreground">{fieldLabel(conflict.field)}</span>
                    <StatusBadge tone={conflict.resolution === 'open' ? 'warning' : 'neutral'}>{resolutionLabels[conflict.resolution]}</StatusBadge>
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="sm" className="mt-3" render={<Link href="/admin/scraper/conflicts" />}>
                Open conflicts
              </Button>
            </Panel>
          ) : null}
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          {!open ? (
            <Panel title="Review">
              <FactList
                columns={1}
                items={[
                  { label: 'Decision', value: stagedStatusLabels[record.status] },
                  { label: 'Reviewed', value: formatDateTime(record.reviewedAt) },
                  { label: 'Note', value: record.reviewNote ?? '—' },
                  { label: 'Fields applied', value: record.appliedFields.length ? record.appliedFields.map(fieldLabel).join(', ') : '—' },
                ]}
              />
            </Panel>
          ) : null}
          <Panel title="From the source">
            <FactList
              columns={1}
              items={[
                { label: 'Key', value: <span className="font-mono text-[12px] break-all">{record.externalKey}</span> },
                { label: 'Page or file', value: <ExternalSourceLink href={record.raw?.url ?? null} /> },
                { label: 'Fetched', value: formatDateTime(record.raw?.fetchedAt) },
              ]}
            />
            {record.raw?.data ? (
              <div className="mt-4 border-t border-border pt-4">
                <ValueView value={record.raw.data} className="text-[13px]" />
              </div>
            ) : null}
          </Panel>
        </div>
      </div>

      <CorrectDialog
        open={correcting}
        onOpenChange={setCorrecting}
        record={record}
        busy={busy}
        onSubmit={(correction, note) => decide.mutate({ run: () => approveStaged(record.id, { correction, ...(note ? { note } : {}) }), success: `${record.title} corrected and approved` })}
      />
      <RejectDialog open={rejecting} onOpenChange={setRejecting} busy={busy} onSubmit={(note) => decide.mutate({ run: () => rejectStaged(record.id, note), success: 'Record rejected' })} />
    </div>
  )
}
