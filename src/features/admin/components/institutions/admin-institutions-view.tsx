'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, ExternalLink, Eye, MoreHorizontal, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { institutionContentStatusBadgeStyles as contentStyles, institutionDirectoryQualityBadgeStyles as qualityStyles } from '@/features/admin/constants/institutions'
import { getAdminInstitutionFilterOptions, getAdminInstitutions } from '@/features/admin/data/admin-institutions'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import type { AdminInstitution } from '@/features/admin/types/institutions'
import { AdminDataTable } from '../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, CompletenessMeter, SortHeader, StatusBadge, stopRowClick, Tag, toneFromVariant } from '../kit'

const DEFAULT_FILTERS = { q: '', type: 'all', state: 'all', quality: 'all', page: 'all' }

function RowActions({ item }: { item: AdminInstitution }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${item.name}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem render={<Link href={`/admin/institutions/${item.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/institutions/${item.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          {item.hasDetailPage ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href={`/college/${item.slug}`} target="_blank" rel="noreferrer" />}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open public page
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AdminInstitutionsView() {
  const router = useRouter()
  const [data] = React.useState<AdminInstitution[]>(() => getAdminInstitutions())
  const options = React.useMemo(() => getAdminInstitutionFilterOptions(), [])
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return data.filter((item) => {
      if (query && ![item.name, item.city, item.state, item.popularCourse ?? ''].some((value) => value.toLowerCase().includes(query))) return false
      if (f.type !== 'all' && item.type !== f.type) return false
      if (f.state !== 'all' && item.state !== f.state) return false
      if (f.quality !== 'all' && item.qualityStatus !== f.quality) return false
      if (f.page === 'live' && !item.hasDetailPage) return false
      if (f.page === 'none' && item.hasDetailPage) return false
      return true
    })
  }, [data, f])

  const columns = React.useMemo<ColumnDef<AdminInstitution>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <SortHeader label="Institution" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="min-w-[220px]">
            <Link href={`/admin/institutions/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.name}
            </Link>
            <p className="text-[13px] text-muted-foreground">
              {row.original.city}, {row.original.state}
            </p>
          </div>
        ),
      },
      { accessorKey: 'type', header: 'Type', cell: ({ row }) => <Tag>{row.original.type}</Tag> },
      {
        accessorKey: 'programCount',
        header: ({ column }) => <SortHeader label="Courses" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <span className="tabular-nums">{row.original.programCount}</span>,
      },
      {
        accessorKey: 'qualityStatus',
        header: 'Data quality',
        cell: ({ row }) => {
          const style = qualityStyles[row.original.qualityStatus]
          return <StatusBadge tone={toneFromVariant(style.variant)}>{style.label}</StatusBadge>
        },
      },
      {
        accessorKey: 'completeness',
        header: ({ column }) => <SortHeader label="Completeness" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <CompletenessMeter value={row.original.completeness} />,
      },
      {
        accessorKey: 'hasDetailPage',
        header: 'Public page',
        cell: ({ row }) => (row.original.hasDetailPage ? <StatusBadge tone="success">Live</StatusBadge> : <StatusBadge>Listing only</StatusBadge>),
      },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions item={row.original} /> },
    ],
    [],
  )

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Institutions"
        count={`${data.length} total`}
        description="Colleges and universities listed on Pathway."
        actions={
          <Link href="/admin/institutions/new" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
            <Plus className="size-4" aria-hidden="true" />
            Add institution
          </Link>
        }
      />

      <AdminToolbar
        search={f.q}
        onSearchChange={(q) => set({ q })}
        searchPlaceholder="Search name, city or course"
        hasActiveFilters={active}
        onReset={reset}
        summary={active ? `${filtered.length} of ${data.length} match` : undefined}
      >
        <AdminFilterSelect label="Type" value={f.type} onChange={(type) => set({ type })} options={options.types.map((t) => ({ value: t, label: t }))} />
        <AdminFilterSelect label="State" value={f.state} onChange={(state) => set({ state })} options={options.states.map((s) => ({ value: s, label: s }))} />
        <AdminFilterSelect label="Quality" value={f.quality} onChange={(quality) => set({ quality })} options={options.qualityStatuses.filter((q) => q.value !== 'all').map((q) => ({ value: q.value, label: qualityStyles[q.value as keyof typeof qualityStyles]?.label ?? q.label }))} />
        <AdminFilterSelect label="Public page" value={f.page} onChange={(page) => set({ page })} options={[{ value: 'live', label: 'Live' }, { value: 'none', label: 'Listing only' }]} />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={filtered}
        onRowClick={(item) => router.push(`/admin/institutions/${item.id}`)}
        getRowAriaLabel={(item) => `Open ${item.name}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No institutions match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const item = row.original
          const content = contentStyles[item.contentStatus]
          return (
            <Link href={`/admin/institutions/${item.id}`} className="block space-y-2.5 rounded-lg border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {item.city}, {item.state} · {item.type}
                  </p>
                </div>
                <StatusBadge tone={toneFromVariant(content.variant)}>{content.label}</StatusBadge>
              </div>
              <CompletenessMeter value={item.completeness} />
            </Link>
          )
        }}
      />
    </div>
  )
}
