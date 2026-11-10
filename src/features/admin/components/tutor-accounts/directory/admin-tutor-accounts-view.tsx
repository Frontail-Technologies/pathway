'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import {
  formatDateTime,
  listingLabels,
  listTutorAccounts,
  verificationLabels,
  verificationTone,
  type AdminTutorAccountSummary,
  type VerificationStatus,
} from '@/features/admin/data/admin-tutor-accounts'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminEmptyState } from '../../admin-empty-state'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, SortHeader, StatusBadge, stopRowClick } from '../../kit'
import { AdminTableSkeleton } from '../../admin-skeletons'

const DEFAULT_FILTERS = { q: '', status: 'pending_review' }
const statusOptions = (Object.keys(verificationLabels) as VerificationStatus[]).map((value) => ({ value, label: verificationLabels[value] }))

type Load = { state: 'loading' } | { state: 'error'; message: string } | { state: 'ready'; rows: AdminTutorAccountSummary[] }

export function AdminTutorAccountsView() {
  const router = useRouter()
  const { hydrated, session } = useAdminSession()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)
  const status = f.status === 'all' ? undefined : (f.status as VerificationStatus)
  const query = useQuery({ queryKey: queryKeys.adminTutorAccounts(status), queryFn: () => listTutorAccounts(status), enabled: hydrated && Boolean(session) })
  const load: Load = query.isError
    ? { state: 'error', message: query.error instanceof ApiRequestError ? query.error.message : 'Could not load tutor accounts.' }
    : query.data
      ? { state: 'ready', rows: query.data }
      : { state: 'loading' }

  const rows = load.state === 'ready' ? load.rows : []
  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return query ? rows.filter((row) => [row.displayName, row.email].some((value) => value.toLowerCase().includes(query))) : rows
  }, [rows, f.q])

  const columns = React.useMemo<ColumnDef<AdminTutorAccountSummary>[]>(
    () => [
      {
        accessorKey: 'displayName',
        header: ({ column }) => <SortHeader label="Tutor" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="min-w-[200px]">
            <Link href={`/admin/tutor-accounts/${row.original.userId}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.displayName || 'Unnamed tutor'}
            </Link>
            <p className="text-[13px] text-muted-foreground">{row.original.email}</p>
          </div>
        ),
      },
      { accessorKey: 'verificationStatus', header: 'Review', cell: ({ row }) => <StatusBadge tone={verificationTone[row.original.verificationStatus]}>{verificationLabels[row.original.verificationStatus]}</StatusBadge> },
      {
        accessorKey: 'submittedAt',
        header: ({ column }) => <SortHeader label="Submitted" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <span className="whitespace-nowrap">{formatDateTime(row.original.submittedAt)}</span>,
      },
      { accessorKey: 'reviewedAt', header: 'Last reviewed', cell: ({ row }) => <span className="whitespace-nowrap">{formatDateTime(row.original.reviewedAt)}</span> },
      {
        id: 'listing',
        header: 'Listing',
        cell: ({ row }) => (row.original.listing ? <StatusBadge tone={row.original.listing.status === 'published' ? 'success' : 'neutral'}>{listingLabels[row.original.listing.status]}</StatusBadge> : <span className="text-muted-foreground">—</span>),
      },
      { accessorKey: 'accountStatus', header: 'Account', cell: ({ row }) => <StatusBadge tone={row.original.accountStatus === 'active' ? 'success' : 'danger'}>{row.original.accountStatus === 'active' ? 'Active' : row.original.accountStatus === 'suspended' ? 'Suspended' : 'Disabled'}</StatusBadge> },
    ],
    [],
  )

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Tutor reviews"
        count={load.state === 'ready' ? `${load.rows.length} ${status ? verificationLabels[status].toLowerCase() : 'total'}` : undefined}
      />

      <AdminToolbar search={f.q} onSearchChange={(q) => set({ q })} searchPlaceholder="Search name or email" hasActiveFilters={active} onReset={reset} summary={f.q && load.state === 'ready' ? `${filtered.length} of ${load.rows.length} match` : undefined}>
        <AdminFilterSelect label="Review" value={f.status} onChange={(next) => set({ status: next })} options={statusOptions} allLabel="All" />
      </AdminToolbar>

      {load.state === 'loading' ? (
        <AdminTableSkeleton rows={5} columns={5} header={false} />
      ) : load.state === 'error' ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card shadow-sm px-4 py-14 text-center">
          <p className="text-sm text-foreground">{load.message}</p>
          <Button variant="outline" size="sm" onClick={() => void query.refetch()}>
            Try again
          </Button>
        </div>
      ) : load.rows.length === 0 ? (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState art="allClear" title={status === 'pending_review' ? 'Nothing waiting for review' : 'No tutor accounts'} description={status === 'pending_review' ? 'Profiles appear here when tutors submit them from Tutor Space.' : 'Try a different review status.'} className="py-14" />
        </div>
      ) : (
        <AdminDataTable
          columns={columns}
          data={filtered}
          onRowClick={(row) => router.push(`/admin/tutor-accounts/${row.userId}`)}
          getRowAriaLabel={(row) => `Open ${row.displayName || row.email}`}
          hasActiveFilters={Boolean(f.q)}
          onResetFilters={() => set({ q: '' })}
          emptyTitle="No tutors match"
          emptyDescription="Try a different search."
          mobileCardRender={(row) => {
            const tutor = row.original
            return (
              <Link href={`/admin/tutor-accounts/${tutor.userId}`} className="block space-y-2 rounded-xl border border-border bg-card shadow-sm p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{tutor.displayName || 'Unnamed tutor'}</p>
                    <p className="truncate text-[13px] text-muted-foreground">{tutor.email}</p>
                  </div>
                  <StatusBadge tone={verificationTone[tutor.verificationStatus]}>{verificationLabels[tutor.verificationStatus]}</StatusBadge>
                </div>
                <p className="text-[13px] text-muted-foreground">Submitted {formatDateTime(tutor.submittedAt)}</p>
              </Link>
            )
          }}
        />
      )}
    </div>
  )
}
