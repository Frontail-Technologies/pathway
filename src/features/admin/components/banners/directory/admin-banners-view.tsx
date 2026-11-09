'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, ExternalLink, Eye, MoreHorizontal, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { AdminBanner } from '@/features/admin/data/admin-banners'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, SortHeader, StatusBadge, stopRowClick, Tag } from '../../kit'
import { bannerPlacementOptions, bannerStatusLabels, bannerStatusOptions, bannerStatusTones, formatBannerWindow, placementLabel } from '../shared/banner-constants'

const DEFAULT_FILTERS = { q: '', placement: 'all', status: 'all' }

function NewBannerLink() {
  return (
    <Link href="/admin/banners/new" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
      <Plus className="size-4" aria-hidden="true" />
      New banner
    </Link>
  )
}

function Thumb({ banner }: { banner: AdminBanner }) {
  return banner.image ? (
    // eslint-disable-next-line @next/next/no-img-element -- banner artwork can be any URL
    <img src={banner.image} alt="" className="h-10 w-16 shrink-0 rounded-md border border-border object-cover" />
  ) : (
    <div className="h-10 w-16 shrink-0 rounded-md border border-border bg-muted" aria-hidden="true" />
  )
}

function RowActions({ banner }: { banner: AdminBanner }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${banner.name}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem render={<Link href={`/admin/banners/${banner.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/banners/${banner.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          {banner.ctaHref ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href={banner.ctaHref} target="_blank" rel="noreferrer" />}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open link
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AdminBannersView({ initialBanners }: { initialBanners: AdminBanner[] }) {
  const router = useRouter()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return initialBanners.filter((banner) => {
      if (query && ![banner.name, banner.title, banner.description ?? '', banner.eyebrow ?? '', banner.ctaLabel ?? ''].some((value) => value.toLowerCase().includes(query))) return false
      if (f.placement !== 'all' && banner.placement !== f.placement) return false
      if (f.status !== 'all' && banner.effectiveStatus !== f.status) return false
      return true
    })
  }, [initialBanners, f])

  const columns = React.useMemo<ColumnDef<AdminBanner>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <SortHeader label="Banner" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="flex min-w-[260px] items-center gap-3">
            <Thumb banner={row.original} />
            <div className="min-w-0">
              <Link href={`/admin/banners/${row.original.id}`} onClick={stopRowClick} className="block truncate font-medium text-foreground hover:text-primary hover:underline">
                {row.original.name}
              </Link>
              <p className="max-w-[260px] truncate text-[13px] text-muted-foreground">{row.original.title}</p>
            </div>
          </div>
        ),
      },
      { accessorKey: 'placement', header: 'Placement', cell: ({ row }) => <Tag>{placementLabel(row.original.placement)}</Tag> },
      {
        id: 'schedule',
        accessorFn: (banner) => banner.startsAt ?? '',
        header: ({ column }) => <SortHeader label="Runs" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{formatBannerWindow(row.original.startsAt, row.original.endsAt)}</span>,
      },
      {
        accessorKey: 'effectiveStatus',
        header: 'Status',
        cell: ({ row }) => <StatusBadge tone={bannerStatusTones[row.original.effectiveStatus]}>{bannerStatusLabels[row.original.effectiveStatus]}</StatusBadge>,
      },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions banner={row.original} /> },
    ],
    [],
  )

  if (initialBanners.length === 0) {
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Banners" description="Promotional strips shown on the homepage and study abroad page." />
        <div className="flex flex-col items-center rounded-xl border border-border bg-card shadow-sm px-6 py-14 text-center">
          <p className="text-[15px] font-semibold text-foreground">No banners yet</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">Create a banner, pick where it shows, and schedule when it runs.</p>
          <div className="mt-5">
            <NewBannerLink />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <AdminPageHeader title="Banners" count={`${initialBanners.length} total`} description="Promotional strips shown on the homepage and study abroad page." actions={<NewBannerLink />} />

      <AdminToolbar
        search={f.q}
        onSearchChange={(q) => set({ q })}
        searchPlaceholder="Search name, headline or button"
        hasActiveFilters={active}
        onReset={reset}
        summary={active ? `${filtered.length} of ${initialBanners.length} match` : undefined}
      >
        <AdminFilterSelect label="Placement" value={f.placement} onChange={(placement) => set({ placement })} options={bannerPlacementOptions} />
        <AdminFilterSelect label="Status" value={f.status} onChange={(status) => set({ status })} options={bannerStatusOptions} />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={filtered}
        onRowClick={(banner) => router.push(`/admin/banners/${banner.id}`)}
        getRowAriaLabel={(banner) => `Open ${banner.name}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No banners match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const banner = row.original
          return (
            <Link href={`/admin/banners/${banner.id}`} className="flex items-start gap-3 rounded-xl border border-border bg-card shadow-sm p-4">
              <Thumb banner={banner} />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-start justify-between gap-3">
                  <p className="truncate font-medium text-foreground">{banner.name}</p>
                  <StatusBadge tone={bannerStatusTones[banner.effectiveStatus]}>{bannerStatusLabels[banner.effectiveStatus]}</StatusBadge>
                </div>
                <p className="text-[13px] text-muted-foreground">
                  {placementLabel(banner.placement)} · {formatBannerWindow(banner.startsAt, banner.endsAt)}
                </p>
              </div>
            </Link>
          )
        }}
      />
    </div>
  )
}
