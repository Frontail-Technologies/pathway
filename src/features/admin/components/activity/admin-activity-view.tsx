'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ADMIN_STORAGE_KEYS } from '@/features/admin/data/admin-demo-storage'
import { ADMIN_ACTIVITY_ACTIONS, ADMIN_ACTIVITY_AREAS, clearAdminActivity, type AdminActivityAction, type AdminActivityEntry } from '@/features/admin/data/admin-activity'
import { useDemoStorage } from '@/features/admin/hooks/use-demo-storage'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../admin-data-table'
import { AdminEmptyState } from '../admin-empty-state'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, StatusBadge, stopRowClick, Tag, type StatusTone } from '../kit'
import { DemoNote } from '../demo/demo-form'
import { formatDateTime, formatRelative } from '../demo/relative-time'

const DEFAULT_FILTERS = { q: '', area: 'all', action: 'all' }

const actionTone: Record<AdminActivityAction, StatusTone> = {
  Created: 'success',
  Published: 'success',
  Updated: 'info',
  Invited: 'info',
  'Role changed': 'info',
  Unpublished: 'neutral',
  Removed: 'danger',
  Reset: 'warning',
}

const toOptions = (values: readonly string[]) => values.map((value) => ({ value, label: value }))

export function AdminActivityView() {
  const router = useRouter()
  const [entries, , loaded] = useDemoStorage<AdminActivityEntry[]>(ADMIN_STORAGE_KEYS.activity, [])
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return entries.filter((entry) => {
      if (query && !entry.label.toLowerCase().includes(query)) return false
      if (f.area !== 'all' && entry.area !== f.area) return false
      if (f.action !== 'all' && entry.action !== f.action) return false
      return true
    })
  }, [entries, f])

  const columns = React.useMemo<ColumnDef<AdminActivityEntry>[]>(
    () => [
      {
        accessorKey: 'at',
        header: 'When',
        cell: ({ row }) => (
          <time dateTime={row.original.at} title={formatDateTime(row.original.at)} className="whitespace-nowrap text-muted-foreground">
            {formatRelative(row.original.at)}
          </time>
        ),
      },
      { accessorKey: 'action', header: 'Action', cell: ({ row }) => <StatusBadge tone={actionTone[row.original.action] ?? 'neutral'}>{row.original.action}</StatusBadge> },
      {
        accessorKey: 'label',
        header: 'Item',
        cell: ({ row }) =>
          row.original.href ? (
            <Link href={row.original.href} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{row.original.label}</span>
          ),
      },
      { accessorKey: 'area', header: 'Area', cell: ({ row }) => <Tag>{row.original.area}</Tag> },
      { accessorKey: 'actor', header: 'By', cell: ({ row }) => <span className="text-muted-foreground">{row.original.actor}</span> },
    ],
    [],
  )

  const clear = () => {
    if (!window.confirm('Clear the activity log on this device?')) return
    clearAdminActivity()
    toast.success('Activity log cleared')
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Activity log"
        count={loaded ? `${entries.length} ${entries.length === 1 ? 'change' : 'changes'}` : undefined}
        description="Changes made in this admin, newest first."
        meta={<DemoNote>Demo: there is no server audit trail, so only changes made in this browser are listed.</DemoNote>}
        actions={
          entries.length > 0 ? (
            <Button type="button" variant="outline" size="sm" onClick={clear}>
              Clear log
            </Button>
          ) : undefined
        }
      />

      {!loaded ? null : entries.length === 0 ? (
        <div className="rounded-xl border border-border bg-card shadow-sm py-10">
          <AdminEmptyState art="noActivity" title="No activity yet" description="Changes you make in the admin will be listed here." />
        </div>
      ) : (
        <>
<AdminDataTable
  toolbar={
    <AdminToolbar search={f.q} onSearchChange={(q) => set({ q })} searchPlaceholder="Search items" hasActiveFilters={active} onReset={reset} summary={active ? `${filtered.length} of ${entries.length} match` : undefined}>
              <AdminFilterSelect label="Area" value={f.area} onChange={(area) => set({ area })} options={toOptions(ADMIN_ACTIVITY_AREAS)} />
              <AdminFilterSelect label="Action" value={f.action} onChange={(action) => set({ action })} options={toOptions(ADMIN_ACTIVITY_ACTIONS)} />
            </AdminToolbar>
  }
            columns={columns}
            data={filtered}
            pageSize={20}
            onRowClick={(entry) => entry.href && router.push(entry.href)}
            getRowAriaLabel={(entry) => `${entry.action} ${entry.label}`}
            hasActiveFilters={active}
            onResetFilters={reset}
            emptyTitle="No changes match"
            emptyDescription="Try a different search or clear the filters."
            mobileCardRender={(row) => {
              const entry = row.original
              return (
                <div className="space-y-1 rounded-xl border border-border bg-card shadow-sm p-4">
                  <div className="flex items-center justify-between gap-3">
                    <StatusBadge tone={actionTone[entry.action] ?? 'neutral'}>{entry.action}</StatusBadge>
                    <span className="text-[13px] text-muted-foreground">{formatRelative(entry.at)}</span>
                  </div>
                  {entry.href ? (
                    <Link href={entry.href} className="block text-sm font-medium text-foreground hover:text-primary">
                      {entry.label}
                    </Link>
                  ) : (
                    <p className="text-sm font-medium text-foreground">{entry.label}</p>
                  )}
                  <p className="text-[13px] text-muted-foreground">{entry.area}</p>
                </div>
              )
            }}
          />
        </>
      )}
    </div>
  )
}
