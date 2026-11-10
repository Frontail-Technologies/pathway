'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, Eye, MoreHorizontal, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, SortHeader, StatusBadge, stopRowClick, Tag } from '../../kit'
import { contentCategoryLabels, contentCategoryOptions, contentStatusLabels, contentStatusOptions, contentStatusTones, contentTypeLabels, contentTypeOptions, formatContentDate } from '../shared/content-constants'
import { AdminEmptyState } from '../../admin-empty-state'

const DEFAULT_FILTERS = { q: '', type: 'all', category: 'all', status: 'all' }

const lastChanged = (entry: AdminContentEntry) => entry.updatedAt || entry.publishedAt || entry.createdAt

function NewArticleLink() {
  return (
    <Link href="/admin/content/new" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
      <Plus className="size-4" aria-hidden="true" />
      New article
    </Link>
  )
}

function RowActions({ entry }: { entry: AdminContentEntry }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${entry.title}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem render={<Link href={`/admin/content/${entry.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/content/${entry.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AdminContentView({ initialContent }: { initialContent: AdminContentEntry[] }) {
  const router = useRouter()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return initialContent.filter((entry) => {
      if (query && ![entry.title, entry.slug, entry.excerpt ?? '', entry.authorName ?? ''].some((value) => value.toLowerCase().includes(query))) return false
      if (f.type !== 'all' && entry.type !== f.type) return false
      if (f.category !== 'all' && entry.category !== f.category) return false
      if (f.status !== 'all' && entry.status !== f.status) return false
      return true
    })
  }, [initialContent, f])

  const columns = React.useMemo<ColumnDef<AdminContentEntry>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => <SortHeader label="Title" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="max-w-[360px] min-w-[240px]">
            <Link href={`/admin/content/${row.original.id}`} onClick={stopRowClick} className="line-clamp-1 font-medium text-foreground hover:text-primary hover:underline">
              {row.original.title}
            </Link>
            {row.original.authorName ? <p className="text-[13px] text-muted-foreground">{row.original.authorName}</p> : null}
          </div>
        ),
      },
      { accessorKey: 'type', header: 'Type', cell: ({ row }) => <Tag>{contentTypeLabels[row.original.type]}</Tag> },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.category ? contentCategoryLabels[row.original.category] : '—'}</span>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <StatusBadge tone={contentStatusTones[row.original.status]}>{contentStatusLabels[row.original.status]}</StatusBadge>,
      },
      {
        id: 'updated',
        accessorFn: (entry) => lastChanged(entry) ?? '',
        header: ({ column }) => <SortHeader label="Updated" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground tabular-nums">{formatContentDate(lastChanged(row.original)) ?? '—'}</span>,
      },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions entry={row.original} /> },
    ],
    [],
  )

  if (initialContent.length === 0) {
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Articles" />
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState art="noArticles" title="No articles yet" description="Write the first guide or news post. It stays a draft until you publish it." action={<NewArticleLink />} className="py-12" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader title="Articles" count={`${initialContent.length} total`} actions={<NewArticleLink />} />
<AdminDataTable
  tabs={{ value: f.status, onChange: (value) => set({ status: value }), options: contentStatusOptions }}
  toolbar={
    <AdminToolbar
          search={f.q}
          onSearchChange={(q) => set({ q })}
          searchPlaceholder="Search title, slug or author"
          hasActiveFilters={active}
          onReset={reset}
          summary={active ? `${filtered.length} of ${initialContent.length} match` : undefined}
        >
          <AdminFilterSelect label="Type" value={f.type} onChange={(type) => set({ type })} options={contentTypeOptions} />
          <AdminFilterSelect label="Category" value={f.category} onChange={(category) => set({ category })} options={contentCategoryOptions} />
        </AdminToolbar>
  }
        columns={columns}
        data={filtered}
        onRowClick={(entry) => router.push(`/admin/content/${entry.id}`)}
        getRowAriaLabel={(entry) => `Open ${entry.title}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No articles match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const entry = row.original
          return (
            <Link href={`/admin/content/${entry.id}`} className="block space-y-2 rounded-xl border border-border bg-card shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="line-clamp-2 min-w-0 font-medium text-foreground">{entry.title}</p>
                <StatusBadge tone={contentStatusTones[entry.status]}>{contentStatusLabels[entry.status]}</StatusBadge>
              </div>
              <p className="text-[13px] text-muted-foreground">
                {[contentTypeLabels[entry.type], entry.category ? contentCategoryLabels[entry.category] : null, formatContentDate(lastChanged(entry))].filter(Boolean).join(' · ')}
              </p>
            </Link>
          )
        }}
      />
    </div>
  )
}
