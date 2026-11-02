'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, ExternalLink, Eye, MoreHorizontal, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { AdminSeoRecord } from '@/features/admin/data/admin-seo'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, SortHeader, stopRowClick, Tag } from '../../kit'
import { SeoIndexingBadge, seoIndexingOptions, seoTargetTypeLabels, seoTargetTypeOptions } from '../shared/seo-meta'

const DEFAULT_FILTERS = { q: '', type: 'all', indexing: 'all' }
const DESCRIPTION = 'Search titles, descriptions and indexing rules that replace the defaults on a page.'

function AddSeoLink() {
  return (
    <Link href="/admin/seo/new" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
      <Plus className="size-4" aria-hidden="true" />
      Add SEO override
    </Link>
  )
}

function RowActions({ record }: { record: AdminSeoRecord }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${record.targetLabel}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem render={<Link href={`/admin/seo/${record.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/seo/${record.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href={record.targetRoutePath} target="_blank" rel="noreferrer" />}>
            <ExternalLink className="size-4" aria-hidden="true" />
            Open public page
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AdminSeoView({ initialRecords }: { initialRecords: AdminSeoRecord[] }) {
  const router = useRouter()
  const data = initialRecords
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return data.filter((record) => {
      if (query) {
        const haystack = [
          record.title || record.effectiveTitle,
          record.description || record.effectiveDescription,
          record.targetLabel,
          record.targetRoutePath,
          record.canonicalPath || record.effectiveCanonical,
          record.primaryKeyword ?? '',
          ...(record.secondaryKeywords ?? []),
        ]
        if (!haystack.some((value) => value.toLowerCase().includes(query))) return false
      }
      if (f.type !== 'all' && record.targetType !== f.type) return false
      if (f.indexing === 'inherited' && record.robotsIndex !== undefined) return false
      if (f.indexing === 'indexable' && record.robotsIndex !== true) return false
      if (f.indexing === 'noindex' && record.robotsIndex !== false) return false
      return true
    })
  }, [data, f])

  const columns = React.useMemo<ColumnDef<AdminSeoRecord>[]>(
    () => [
      {
        accessorKey: 'targetLabel',
        header: ({ column }) => <SortHeader label="Page" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="max-w-[260px] min-w-[200px]">
            <Link href={`/admin/seo/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.targetLabel}
            </Link>
            <p className="truncate text-[13px] text-muted-foreground">{row.original.targetRoutePath}</p>
          </div>
        ),
      },
      { accessorKey: 'targetType', header: 'Type', cell: ({ row }) => <Tag>{seoTargetTypeLabels[row.original.targetType] ?? row.original.targetType}</Tag> },
      {
        accessorKey: 'effectiveTitle',
        header: 'Search title',
        cell: ({ row }) => (
          <div className="max-w-[260px]">
            <p className="truncate text-foreground">{row.original.effectiveTitle}</p>
            <p className="text-[13px] text-muted-foreground tabular-nums">
              {row.original.effectiveTitle.length} characters{row.original.resolvedMetadata.isOverrideTitle ? ' · custom' : ''}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'effectiveDescription',
        header: 'Description',
        cell: ({ row }) => <p className="line-clamp-2 max-w-[280px] text-[13px] text-muted-foreground">{row.original.effectiveDescription}</p>,
      },
      { accessorKey: 'robotsIndex', header: 'Indexing', cell: ({ row }) => <SeoIndexingBadge robotsIndex={row.original.robotsIndex} robotsFollow={row.original.robotsFollow} /> },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions record={row.original} /> },
    ],
    [],
  )

  if (data.length === 0) {
    return (
      <div className="space-y-5">
        <AdminPageHeader title="SEO" description={DESCRIPTION} />
        <div className="flex flex-col items-center rounded-lg border border-border bg-card px-6 py-14 text-center">
          <p className="text-[15px] font-semibold text-foreground">No SEO overrides yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">Every page uses its default title and description. Add an override when a page needs different search text.</p>
          <div className="mt-5">
            <AddSeoLink />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader title="SEO" count={`${data.length} total`} description={DESCRIPTION} actions={<AddSeoLink />} />

      <AdminToolbar
        search={f.q}
        onSearchChange={(q) => set({ q })}
        searchPlaceholder="Search page, title or keyword"
        hasActiveFilters={active}
        onReset={reset}
        summary={active ? `${filtered.length} of ${data.length} match` : undefined}
      >
        <AdminFilterSelect label="Type" value={f.type} onChange={(type) => set({ type })} options={seoTargetTypeOptions} />
        <AdminFilterSelect label="Indexing" value={f.indexing} onChange={(indexing) => set({ indexing })} options={seoIndexingOptions} />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={filtered}
        onRowClick={(record) => router.push(`/admin/seo/${record.id}`)}
        getRowAriaLabel={(record) => `Open ${record.targetLabel}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No SEO overrides match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const record = row.original
          return (
            <Link href={`/admin/seo/${record.id}`} className="block space-y-1 rounded-lg border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 font-medium text-foreground">{record.targetLabel}</p>
                <SeoIndexingBadge robotsIndex={record.robotsIndex} robotsFollow={record.robotsFollow} />
              </div>
              <p className="truncate text-[13px] text-muted-foreground">{record.effectiveTitle}</p>
            </Link>
          )
        }}
      />
    </div>
  )
}
