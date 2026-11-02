'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink, Eye, Inbox, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminEmptyState } from '../../admin-empty-state'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, SortHeader, stopRowClick, Tag } from '../../kit'
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

export function AdminEnquiriesView({ initialEnquiries }: { initialEnquiries: AdminEnquiry[] }) {
  const router = useRouter()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return initialEnquiries.filter((enquiry) => {
      if (query && ![enquiry.contactName, enquiry.contactEmail ?? '', enquiry.subject ?? '', enquiry.targetName ?? ''].some((value) => value.toLowerCase().includes(query))) return false
      if (f.status !== 'all' && enquiry.status !== f.status) return false
      if (f.source !== 'all' && enquiry.source !== f.source) return false
      if (f.assignee === 'unassigned' && enquiry.assignedTo) return false
      return true
    })
  }, [initialEnquiries, f])

  const columns = React.useMemo<ColumnDef<AdminEnquiry>[]>(
    () => [
      {
        accessorKey: 'contactName',
        header: ({ column }) => <SortHeader label="Contact" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="min-w-[200px]">
            <Link href={`/admin/enquiries/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.contactName}
            </Link>
            <p className="max-w-[260px] truncate text-[13px] text-muted-foreground">{enquiryTitle(row.original)}</p>
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
        cell: ({ row }) => <span className="text-[13px] whitespace-nowrap text-muted-foreground tabular-nums">{row.original.createdAt}</span>,
      },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions enquiry={row.original} /> },
    ],
    [],
  )

  const total = initialEnquiries.length

  return (
    <div className="space-y-5">
      <AdminPageHeader title="Enquiries" count={total > 0 ? `${total} total` : undefined} description="Questions, brochure requests and call-backs from students." />

      {total === 0 ? (
        <div className="rounded-lg border border-border bg-card">
          <AdminEmptyState
            icon={Inbox}
            title="No enquiries yet"
            description="Enquiries from college, course, tutor and counselling forms will appear here once form submissions are connected."
            className="py-14"
          />
        </div>
      ) : (
        <>
          <AdminToolbar
            search={f.q}
            onSearchChange={(q) => set({ q })}
            searchPlaceholder="Search name, email or subject"
            hasActiveFilters={active}
            onReset={reset}
            summary={active ? `${filtered.length} of ${total} match` : undefined}
          >
            <AdminFilterSelect label="Status" value={f.status} onChange={(status) => set({ status })} options={leadStatusOptions} />
            <AdminFilterSelect label="Source" value={f.source} onChange={(source) => set({ source })} options={enquirySourceOptions} />
            <AdminFilterSelect label="Assigned to" value={f.assignee} onChange={(assignee) => set({ assignee })} options={assignmentOptions} allLabel="Anyone" />
          </AdminToolbar>

          <AdminDataTable
            columns={columns}
            data={filtered}
            onRowClick={(enquiry) => router.push(`/admin/enquiries/${enquiry.id}`)}
            getRowAriaLabel={(enquiry) => `Open enquiry from ${enquiry.contactName}`}
            hasActiveFilters={active}
            onResetFilters={reset}
            emptyTitle="No enquiries match"
            emptyDescription="Try a different search or clear the filters."
            mobileCardRender={(row) => {
              const enquiry = row.original
              return (
                <Link href={`/admin/enquiries/${enquiry.id}`} className="block space-y-2 rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{enquiry.contactName}</p>
                      <p className="truncate text-[13px] text-muted-foreground">{enquiryTitle(enquiry)}</p>
                    </div>
                    <LeadStatusBadge status={enquiry.status} />
                  </div>
                  <p className="text-[13px] text-muted-foreground">
                    {enquirySourceLabels[enquiry.source]} · {enquiry.targetName ?? 'General guidance'} · {enquiry.createdAt}
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
