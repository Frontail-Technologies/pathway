'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Banknote, Edit, ExternalLink, Eye, MoreHorizontal, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { directoryQualityBadgeStyles as qualityStyles } from '@/features/admin/constants/programs'
import { getAdminProgramFilterOptions, getAdminPrograms } from '@/features/admin/data/admin-programs'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import type { AdminProgram } from '@/features/admin/types/programs'
import { AdminDataTable } from '../../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, CompletenessMeter, SortHeader, StatusBadge, stopRowClick, Tag, toneFromVariant } from '../../kit'

const DEFAULT_FILTERS = { q: '', level: 'all', stream: 'all', duration: 'all', quality: 'all', page: 'all', institution: 'all' }

function RowActions({ item }: { item: AdminProgram }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${item.name}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem render={<Link href={`/admin/programs/${item.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/programs/${item.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/admissions-fees?program=${item.id}`} />}>
            <Banknote className="size-4" aria-hidden="true" />
            Admissions and fees
          </DropdownMenuItem>
          {item.hasDetailPage ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href={`/course/${item.slug}`} target="_blank" rel="noreferrer" />}>
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

export function AdminProgramsView() {
  const router = useRouter()
  const [data] = React.useState<AdminProgram[]>(() => getAdminPrograms())
  const options = React.useMemo(() => getAdminProgramFilterOptions(), [])
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const institution = options.institutions.find((i) => i.id === f.institution || i.slug === f.institution)
  const institutionValue = institution?.id ?? f.institution

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return data.filter((item) => {
      if (query && ![item.name, item.degree, item.stream, item.specialization ?? ''].some((value) => value.toLowerCase().includes(query))) return false
      if (f.level !== 'all' && item.level !== f.level) return false
      if (f.stream !== 'all' && item.stream !== f.stream) return false
      if (f.duration !== 'all' && item.duration !== f.duration) return false
      if (f.quality !== 'all' && item.qualityStatus !== f.quality) return false
      if (f.page === 'live' && !item.hasDetailPage) return false
      if (f.page === 'none' && item.hasDetailPage) return false
      if (f.institution !== 'all' && !item.offerings.some((o) => o.id === f.institution || o.slug === f.institution)) return false
      return true
    })
  }, [data, f])

  const columns = React.useMemo<ColumnDef<AdminProgram>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <SortHeader label="Course" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="min-w-[220px]">
            <Link href={`/admin/programs/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.name}
            </Link>
            <p className="text-[13px] text-muted-foreground">{[row.original.degree, row.original.specialization].filter(Boolean).join(' · ')}</p>
          </div>
        ),
      },
      { accessorKey: 'level', header: 'Level', cell: ({ row }) => <Tag>{row.original.level}</Tag> },
      {
        accessorKey: 'stream',
        header: ({ column }) => <SortHeader label="Stream" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <Tag>{row.original.stream}</Tag>,
      },
      {
        accessorKey: 'collegesOfferingCount',
        header: ({ column }) => <SortHeader label="Institutions" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <span className="tabular-nums">{row.original.collegesOfferingCount}</span>,
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
        cell: ({ row }) => (row.original.hasDetailPage ? <StatusBadge tone="success">Live</StatusBadge> : <StatusBadge>Not published</StatusBadge>),
      },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions item={row.original} /> },
    ],
    [],
  )

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Courses"
        count={`${data.length} total`}
        description="Courses in the catalogue and the institutions that offer them."
        actions={
          <Link href="/admin/programs/new" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
            <Plus className="size-4" aria-hidden="true" />
            Add course
          </Link>
        }
      />

      <AdminToolbar
        search={f.q}
        onSearchChange={(q) => set({ q })}
        searchPlaceholder="Search name, degree or stream"
        hasActiveFilters={active}
        onReset={reset}
        summary={active ? `${filtered.length} of ${data.length} match` : undefined}
      >
        <AdminFilterSelect label="Level" value={f.level} onChange={(level) => set({ level })} options={options.levels.map((l) => ({ value: l, label: l }))} />
        <AdminFilterSelect label="Stream" value={f.stream} onChange={(stream) => set({ stream })} options={options.streams.map((s) => ({ value: s, label: s }))} />
        <AdminFilterSelect label="Duration" value={f.duration} onChange={(duration) => set({ duration })} options={options.durations.map((d) => ({ value: d, label: d }))} />
        <AdminFilterSelect label="Quality" value={f.quality} onChange={(quality) => set({ quality })} options={options.qualityStatuses.filter((q) => q.value !== 'all').map((q) => ({ value: q.value, label: qualityStyles[q.value as keyof typeof qualityStyles]?.label ?? q.label }))} />
        <AdminFilterSelect label="Public page" value={f.page} onChange={(page) => set({ page })} options={[{ value: 'live', label: 'Live' }, { value: 'none', label: 'Not published' }]} />
        <AdminFilterSelect label="Institution" value={institutionValue} onChange={(next) => set({ institution: next })} options={options.institutions.map((i) => ({ value: i.id, label: i.name }))} />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={filtered}
        onRowClick={(item) => router.push(`/admin/programs/${item.id}`)}
        getRowAriaLabel={(item) => `Open ${item.name}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No courses match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const item = row.original
          const quality = qualityStyles[item.qualityStatus]
          return (
            <Link href={`/admin/programs/${item.id}`} className="block space-y-2.5 rounded-lg border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {item.level} · {item.stream} · {item.duration}
                  </p>
                </div>
                <StatusBadge tone={toneFromVariant(quality.variant)}>{quality.label}</StatusBadge>
              </div>
              <CompletenessMeter value={item.completeness} />
            </Link>
          )
        }}
      />
    </div>
  )
}
