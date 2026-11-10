'use client'

import * as React from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { entityLabel, fieldLabel, listConflicts, resolutionLabels, resolveConflict, type ConflictResolution, type IngestionConflict } from '@/features/admin/data/admin-ingestion-api'
import { formatDateTime } from '@/features/admin/data/admin-team-api'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { queryKeys } from '@/lib/query-client'
import { AdminStatusTabs } from '../admin-data-table'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminPanelSkeleton } from '../admin-skeletons'
import { formatRelative } from '../demo/relative-time'
import { AdminPageHeader, StatusBadge, Tag } from '../kit'
import { DiffRows, LoadErrorPanel, messageOf, useIngestionRole } from './shared'

const DEFAULT_FILTERS = { resolution: 'open' }

function ConflictCard({ conflict, onResolve, busy }: { conflict: IngestionConflict; onResolve?: (resolution: Exclude<ConflictResolution, 'open'>) => void; busy: boolean }) {
  return (
    <article className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <header className="mb-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-foreground">
            {fieldLabel(conflict.field)} <span className="font-normal text-muted-foreground">on a {entityLabel(conflict.entityType).toLowerCase().replace(/s$/, '')}</span>
          </p>
          <p className="text-[13px] text-muted-foreground">
            {conflict.source.name} · {formatRelative(conflict.createdAt)}
            {conflict.resolvedAt ? ` · resolved ${formatDateTime(conflict.resolvedAt)}` : ''}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Tag>{conflict.reason === 'manual_override' ? 'Edited by staff' : 'Sources disagree'}</Tag>
          {conflict.resolution !== 'open' ? <StatusBadge tone="neutral">{resolutionLabels[conflict.resolution]}</StatusBadge> : null}
        </div>
      </header>
      <DiffRows
        fields={[{ field: conflict.field, production: conflict.productionValue, staged: conflict.stagedValue, changed: true, ingestible: true, overridden: true, willApply: false }]}
        create={false}
        productionLabel="Our value"
        stagedLabel="Source value"
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <Button variant="ghost" size="sm" render={<Link href={`/admin/scraper/records/${conflict.stagedRecordId}`} />}>
          Open staged record
        </Button>
        {onResolve ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={busy} onClick={() => onResolve('kept_production')}>
              Keep our value
            </Button>
            <Button size="sm" disabled={busy} onClick={() => onResolve('took_staged')}>
              Take source value
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function ConflictsView() {
  const queryClient = useQueryClient()
  const { ready } = useIngestionRole()
  const { values: f, set } = useUrlFilters(DEFAULT_FILTERS)
  const resolution = (['open', 'kept_production', 'took_staged'].includes(f.resolution) ? f.resolution : 'open') as ConflictResolution
  const query = useQuery({ queryKey: queryKeys.ingestionConflicts(resolution), queryFn: () => listConflicts(resolution), enabled: ready })
  const open = useQuery({ queryKey: queryKeys.ingestionConflicts('open'), queryFn: () => listConflicts('open'), enabled: ready && resolution !== 'open' })
  const openCount = resolution === 'open' ? query.data?.length : open.data?.length

  const resolve = useMutation({
    mutationFn: ({ id, value }: { id: string; value: Exclude<ConflictResolution, 'open'> }) => resolveConflict(id, value),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.ingestion })
      toast.success(variables.value === 'took_staged' ? 'Source value applied' : 'Our value kept')
    },
    onError: (error) => toast.error(messageOf(error, 'Could not resolve the conflict. Please try again.')),
  })

  return (
    <div className="space-y-5">
      <AdminPageHeader eyebrow="Data imports" title="Conflicts" count={openCount !== undefined ? `${openCount} open` : undefined} />
      <AdminStatusTabs
        hideAll
        value={resolution}
        onChange={(value) => set({ resolution: value })}
        options={[
          { value: 'open', label: 'Open', count: openCount },
          { value: 'kept_production', label: 'Kept ours' },
          { value: 'took_staged', label: 'Took source' },
        ]}
      />
      {query.isLoading || !ready ? (
        <AdminPanelSkeleton lines={6} />
      ) : query.isError ? (
        <LoadErrorPanel title="Could not load conflicts" error={query.error} onRetry={() => void query.refetch()} />
      ) : !query.data?.length ? (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState art="allClear" title={resolution === 'open' ? 'No open conflicts' : 'Nothing here yet'} className="py-14" />
        </div>
      ) : (
        <div className="grid gap-4">
          {query.data.map((conflict) => (
            <ConflictCard
              key={conflict.id}
              conflict={conflict}
              busy={resolve.isPending}
              onResolve={conflict.resolution === 'open' ? (value) => resolve.mutate({ id: conflict.id, value }) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}
