'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, Eye, MoreHorizontal, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, SortHeader, StatusBadge, stopRowClick, Tag } from '../../kit'
import {
  formatPromotionWindow,
  promotionKindLabels,
  promotionKindOptions,
  promotionPlacementLabels,
  promotionPlacementOptions,
  promotionStatusLabels,
  promotionStatusOptions,
  promotionStatusTones,
  promotionTargetTypeLabels,
  promotionTargetTypeOptions,
  promotionTitle,
} from '../shared/promotion-constants'

const DEFAULT_FILTERS = { q: '', kind: 'all', target: 'all', placement: 'all', status: 'all' }

function NewListingLink() {
  return (
    <Link href="/admin/promotions/new" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
      <Plus className="size-4" aria-hidden="true" />
      New listing
    </Link>
  )
}

function RowActions({ promotion }: { promotion: AdminPromotion }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${promotionTitle(promotion)}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem render={<Link href={`/admin/promotions/${promotion.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/promotions/${promotion.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AdminPromotionsView({ initialPromotions }: { initialPromotions: AdminPromotion[] }) {
  const router = useRouter()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return initialPromotions.filter((promotion) => {
      if (query && ![promotion.label ?? '', promotion.targetName ?? '', promotionPlacementLabels[promotion.placement] ?? ''].some((value) => value.toLowerCase().includes(query))) return false
      if (f.kind !== 'all' && promotion.kind !== f.kind) return false
      if (f.target !== 'all' && promotion.targetType !== f.target) return false
      if (f.placement !== 'all' && promotion.placement !== f.placement) return false
      if (f.status !== 'all' && promotion.effectiveStatus !== f.status) return false
      return true
    })
  }, [initialPromotions, f])

  const columns = React.useMemo<ColumnDef<AdminPromotion>[]>(
    () => [
      {
        id: 'name',
        accessorFn: (promotion) => promotionTitle(promotion),
        header: ({ column }) => <SortHeader label="Listing" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => {
          const promotion = row.original
          return (
            <div className="max-w-[300px] min-w-[220px]">
              <Link href={`/admin/promotions/${promotion.id}`} onClick={stopRowClick} className="block truncate font-medium text-foreground hover:text-primary hover:underline">
                {promotionTitle(promotion)}
              </Link>
              <p className="truncate text-[13px] text-muted-foreground">
                {promotionTargetTypeLabels[promotion.targetType]}
                {promotion.label && promotion.targetName ? ` · ${promotion.targetName}` : ''}
              </p>
            </div>
          )
        },
      },
      { accessorKey: 'kind', header: 'Type', cell: ({ row }) => <Tag>{promotionKindLabels[row.original.kind]}</Tag> },
      { accessorKey: 'placement', header: 'Placement', cell: ({ row }) => <span className="text-muted-foreground">{promotionPlacementLabels[row.original.placement]}</span> },
      {
        accessorKey: 'priority',
        header: ({ column }) => <SortHeader label="Priority" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <span className="tabular-nums">{row.original.priority ?? '—'}</span>,
      },
      {
        id: 'schedule',
        accessorFn: (promotion) => promotion.startsAt ?? '',
        header: ({ column }) => <SortHeader label="Runs" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{formatPromotionWindow(row.original.startsAt, row.original.endsAt)}</span>,
      },
      {
        accessorKey: 'effectiveStatus',
        header: 'Status',
        cell: ({ row }) => <StatusBadge tone={promotionStatusTones[row.original.effectiveStatus]}>{promotionStatusLabels[row.original.effectiveStatus]}</StatusBadge>,
      },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions promotion={row.original} /> },
    ],
    [],
  )

  const description = 'Colleges, courses and other records highlighted on the homepage and list pages.'

  if (initialPromotions.length === 0) {
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Featured listings" description={description} />
        <div className="flex flex-col items-center rounded-xl border border-border bg-card shadow-sm px-6 py-14 text-center">
          <p className="text-[15px] font-semibold text-foreground">No featured listings yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">Feature a college, course or tutor in a homepage or list-page slot. Paid listings are labelled as sponsored.</p>
          <div className="mt-5">
            <NewListingLink />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader title="Featured listings" count={`${initialPromotions.length} total`} description={description} actions={<NewListingLink />} />

      <AdminToolbar
        search={f.q}
        onSearchChange={(q) => set({ q })}
        searchPlaceholder="Search label, record or placement"
        hasActiveFilters={active}
        onReset={reset}
        summary={active ? `${filtered.length} of ${initialPromotions.length} match` : undefined}
      >
        <AdminFilterSelect label="Type" value={f.kind} onChange={(kind) => set({ kind })} options={promotionKindOptions} />
        <AdminFilterSelect label="Record" value={f.target} onChange={(target) => set({ target })} options={promotionTargetTypeOptions} />
        <AdminFilterSelect label="Placement" value={f.placement} onChange={(placement) => set({ placement })} options={promotionPlacementOptions} />
        <AdminFilterSelect label="Status" value={f.status} onChange={(status) => set({ status })} options={promotionStatusOptions} />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={filtered}
        onRowClick={(promotion) => router.push(`/admin/promotions/${promotion.id}`)}
        getRowAriaLabel={(promotion) => `Open ${promotionTitle(promotion)}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No listings match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const promotion = row.original
          return (
            <Link href={`/admin/promotions/${promotion.id}`} className="block space-y-1.5 rounded-xl border border-border bg-card shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 truncate font-medium text-foreground">{promotionTitle(promotion)}</p>
                <StatusBadge tone={promotionStatusTones[promotion.effectiveStatus]}>{promotionStatusLabels[promotion.effectiveStatus]}</StatusBadge>
              </div>
              <p className="text-[13px] text-muted-foreground">
                {promotionKindLabels[promotion.kind]} · {promotionPlacementLabels[promotion.placement]}
              </p>
              <p className="text-[13px] text-muted-foreground">{formatPromotionWindow(promotion.startsAt, promotion.endsAt)}</p>
            </Link>
          )
        }}
      />
    </div>
  )
}
