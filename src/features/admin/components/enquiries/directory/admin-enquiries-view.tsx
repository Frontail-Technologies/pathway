'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Download, ExternalLink, Eye, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { formatDateTime } from '@/features/admin/components/demo/relative-time'
import { useAdminEnquiries } from '@/features/admin/hooks/use-admin-enquiries'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { downloadCsv } from '@/features/admin/utils/export-csv'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminEmptyState } from '../../admin-empty-state'
import { AdminTableSkeleton } from '../../admin-skeletons'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, Monogram, SortHeader, stopRowClick, Tag } from '../../kit'
import { LeadStatusBadge } from '../shared/lead-status-badge'
import { assignmentOptions, enquirySourceLabels, enquirySourceOptions, enquiryTitle, leadStatusOptions } from '../shared/enquiry-constants'

const DEFAULT_FILTERS = { q: '', status: 'all', source: 'all', assignee: 'all' }

function RowActions({ enquiry }: { enquiry: AdminEnquiry }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for enquiry from ${enquiry.contactName}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem render={<Link href={`/admin/enquiries/${enquiry.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          {enquiry.studentId || enquiry.targetAdminUrl ? <DropdownMenuSeparator /> : null}
          {enquiry.studentId ? (
            <DropdownMenuItem render={<Link href={`/admin/students/${enquiry.studentId}`} />}>
              <ExternalLink className="size-4" aria-hidden="true" />
              Open student
            </DropdownMenuItem>
          ) : null}
          {enquiry.targetAdminUrl ? (
            <DropdownMenuItem render={<Link href={enquiry.targetAdminUrl} />}>
              <ExternalLink className="size-4" aria-hidden="true" />
              Open {enquiry.targetName ?? 'record'}
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AdminEnquiriesView() {
  const router = useRouter()
  const query = useAdminEnquiries()
  const initialEnquiries = React.useMemo(() => query.data ?? [], [query.data])
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const beforeTabs = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return initialEnquiries.filter((enquiry) => {
      if (query && ![enquiry.contactName, enquiry.contactEmail ?? '', enquiry.contactPhone ?? '', enquiry.subject ?? '', enquiry.targetName ?? ''].some((value) => value.toLowerCase().includes(query))) return false
      if (f.source !== 'all' && enquiry.source !== f.source) return false
      if (f.assignee === 'unassigned' && enquiry.assignedTo) return false
      return true
    })
  }, [initialEnquiries, f])
  const filtered = React.useMemo(() => (f.status === 'all' ? beforeTabs : beforeTabs.filter((enquiry) => enquiry.status === f.status)), [beforeTabs, f.status])
  const statusTabs = React.useMemo(() => leadStatusOptions.map((option) => ({ ...option, count: beforeTabs.filter((enquiry) => enquiry.status === option.value).length })), [beforeTabs])
  const chips = [
    ...(f.source !== 'all' ? [{ id: 'source', label: `Source: ${enquirySourceLabels[f.source as keyof typeof enquirySourceLabels] ?? f.source}`, onRemove: () => set({ source: 'all' }) }] : []),
    ...(f.assignee !== 'all' ? [{ id: 'assignee', label: 'Unassigned only', onRemove: () => set({ assignee: 'all' }) }] : []),
  ]
  const exportRows = () =>
    downloadCsv('enquiries', filtered, [
      { header: 'Received', value: (e) => e.createdAt },
      { header: 'Name', value: (e) => e.contactName },
      { header: 'Phone', value: (e) => e.contactPhone },
      { header: 'Email', value: (e) => e.contactEmail },
      { header: 'City', value: (e) => e.contactCity },
      { header: 'Source', value: (e) => enquirySourceLabels[e.source] },
      { header: 'About', value: (e) => e.targetName },
      { header: 'Subject', value: (e) => e.subject },
      { header: 'Status', value: (e) => e.statusLabel },
      { header: 'Channel', value: (e) => (e.channel === 'app' ? 'Mobile app' : 'Website') },
    ])

  const columns = React.useMemo<ColumnDef<AdminEnquiry>[]>(
    () => [
      {
        accessorKey: 'contactName',
        header: ({ column }) => <SortHeader label="Contact" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="flex min-w-[240px] items-center gap-3">
            <Monogram name={row.original.contactName} className="rounded-full" />
            <div className="min-w-0">
              <Link href={`/admin/enquiries/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
                {row.original.contactName}
              </Link>
              <p className="max-w-[260px] truncate text-[13px] text-muted-foreground">{enquiryTitle(row.original)}</p>
            </div>
          </div>
        ),
      },
      { accessorKey: 'source', header: 'Source', cell: ({ row }) => <Tag>{enquirySourceLabels[row.original.source] ?? row.original.sourceLabel}</Tag> },
      {
        accessorKey: 'targetName',
        header: 'About',
        cell: ({ row }) => <span className="block max-w-[200px] truncate">{row.original.targetName ?? <span className="text-muted-foreground">General guidance</span>}</span>,
      },
      { accessorKey: 'status', header: 'Status', cell: ({ row }) => <LeadStatusBadge status={row.original.status} /> },
      {
        accessorKey: 'assignedTo',
        header: 'Assigned to',
        cell: ({ row }) => <span className={row.original.assignedTo ? 'text-foreground' : 'text-muted-foreground'}>{row.original.assignedTo ?? 'Unassigned'}</span>,
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => <SortHeader label="Received" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <span className="text-[13px] whitespace-nowrap text-muted-foreground tabular-nums">{formatDateTime(row.original.createdAt)}</span>,
      },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions enquiry={row.original} /> },
    ],
    [],
  )

  const total = initialEnquiries.length

  return (
    <div className="space-y-5">
      <AdminPageHeader title="Enquiries" count={total > 0 ? `${total} total` : undefined} />

      {query.isError ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card shadow-sm px-4 py-14 text-center">
          <p className="text-sm text-foreground">{query.error instanceof ApiRequestError ? query.error.message : 'Could not load enquiries.'}</p>
          <Button variant="outline" size="sm" onClick={() => void query.refetch()}>
            Try again
          </Button>
        </div>
      ) : !query.data ? (
        <AdminTableSkeleton rows={5} columns={6} />
      ) : total === 0 ? (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState
            art="inboxEmpty"
            title="No enquiries yet"
            description="Enquiries, brochure requests and counselling call-backs from the website and app will appear here as they arrive."
            className="py-14"
          />
        </div>
      ) : (
        <>
          <AdminDataTable
            columns={columns}
            data={filtered}
            getRowId={(enquiry) => enquiry.id}
            tabs={{ value: f.status, onChange: (status) => set({ status }), options: statusTabs, total: beforeTabs.length }}
            toolbar={
              <AdminToolbar
                search={f.q}
                onSearchChange={(q) => set({ q })}
                searchPlaceholder="Search name, phone, email or subject"
                resultCount={filtered.length}
                onReset={active ? reset : undefined}
                advancedCount={f.assignee !== 'all' ? 1 : 0}
                advanced={<AdminFilterSelect block label="Assigned to" value={f.assignee} onChange={(assignee) => set({ assignee })} options={assignmentOptions} allLabel="Anyone" />}
                actions={
                  <Button type="button" variant="outline" className="h-9 gap-1.5 rounded-lg bg-card" onClick={exportRows} disabled={!filtered.length}>
                    <Download className="size-4" aria-hidden="true" />
                    Export
                  </Button>
                }
              >
                <AdminFilterSelect label="Source" value={f.source} onChange={(source) => set({ source })} options={enquirySourceOptions} />
              </AdminToolbar>
            }
            chips={chips}
            onRowClick={(enquiry) => router.push(`/admin/enquiries/${enquiry.id}`)}
            getRowAriaLabel={(enquiry) => `Open enquiry from ${enquiry.contactName}`}
            hasActiveFilters={active}
            onResetFilters={reset}
            emptyTitle="No enquiries match"
            emptyDescription="Try a different search or clear the filters."
            mobileCardRender={(row) => {
              const enquiry = row.original
              return (
                <Link href={`/admin/enquiries/${enquiry.id}`} className="block space-y-2 rounded-xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{enquiry.contactName}</p>
                      <p className="truncate text-[13px] text-muted-foreground">{enquiryTitle(enquiry)}</p>
                    </div>
                    <LeadStatusBadge status={enquiry.status} />
                  </div>
                  <p className="text-[13px] text-muted-foreground">
                    {enquirySourceLabels[enquiry.source]} · {enquiry.targetName ?? 'General guidance'} · {formatDateTime(enquiry.createdAt)}
                  </p>
                </Link>
              )
            }}
          />
        </>
      )}
    </div>
  )
}
