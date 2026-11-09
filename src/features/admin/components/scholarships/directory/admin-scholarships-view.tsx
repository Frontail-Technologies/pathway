'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, ExternalLink, Eye, MoreHorizontal, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { AdminScholarship } from '@/features/admin/data/admin-scholarships'
import type { EducationLevel } from '@/features/scholarships/data/scholarships'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, CompletenessMeter, SortHeader, StatusBadge, stopRowClick, Tag } from '../../kit'
import { applicationStatusOptions, educationLevels, providerTypes, qualityBadgeStyles, scholarshipTypes } from '../shared/scholarship-constants'
import { ScholarshipApplicationStatusBadge, ScholarshipQualityBadge } from '../shared/scholarship-status-badge'

const DEFAULT_FILTERS = { q: '', provider: 'all', level: 'all', type: 'all', window: 'all', quality: 'all', page: 'all' }

const qualityOptions = (Object.keys(qualityBadgeStyles) as (keyof typeof qualityBadgeStyles)[]).map((value) => ({ value, label: qualityBadgeStyles[value].label }))

function RowActions({ item }: { item: AdminScholarship }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${item.name}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem render={<Link href={`/admin/scholarships/${item.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/scholarships/${item.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          {item.hasDetailPage ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href={`/scholarship/${item.slug}`} target="_blank" rel="noreferrer" />}>
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

export function AdminScholarshipsView({ initialScholarships }: { initialScholarships: AdminScholarship[] }) {
  const router = useRouter()
  const data = initialScholarships
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return data.filter((item) => {
      if (query && ![item.name, item.provider, item.scholarshipType, ...item.streams, ...item.categories].some((value) => value.toLowerCase().includes(query))) return false
      if (f.provider !== 'all' && item.providerType !== f.provider) return false
      if (f.level !== 'all' && item.educationLevels.length > 0 && !item.educationLevels.includes(f.level as EducationLevel)) return false
      if (f.type !== 'all' && item.scholarshipType !== f.type) return false
      if (f.window !== 'all' && item.applicationStatus !== f.window) return false
      if (f.quality !== 'all' && item.qualityStatus !== f.quality) return false
      if (f.page === 'live' && !item.hasDetailPage) return false
      if (f.page === 'none' && item.hasDetailPage) return false
      return true
    })
  }, [data, f])

  const columns = React.useMemo<ColumnDef<AdminScholarship>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <SortHeader label="Scholarship" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="max-w-[280px] min-w-[200px]">
            <Link href={`/admin/scholarships/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.name}
            </Link>
            <p className="truncate text-[13px] text-muted-foreground">
              {row.original.provider} · {row.original.providerType}
            </p>
          </div>
        ),
      },
      { accessorKey: 'scholarshipType', header: 'Type', cell: ({ row }) => <Tag>{row.original.scholarshipType}</Tag> },
      {
        accessorKey: 'benefitValue',
        header: ({ column }) => <SortHeader label="Benefit" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="min-w-[100px]">
            <p className="font-medium text-foreground">{row.original.benefitLabel || '—'}</p>
            <p className="text-[13px] text-muted-foreground">{row.original.benefitType}</p>
          </div>
        ),
      },
      {
        accessorKey: 'deadline',
        header: ({ column }) => <SortHeader label="Deadline" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="min-w-[100px]">
            <p className="text-foreground">{row.original.deadlineDisplay || '—'}</p>
            <ScholarshipApplicationStatusBadge status={row.original.applicationStatus} />
          </div>
        ),
      },
      { accessorKey: 'qualityStatus', header: 'Data quality', cell: ({ row }) => <ScholarshipQualityBadge status={row.original.qualityStatus} /> },
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
        title="Scholarships"
        count={`${data.length} total`}
        description="Government, private and university scholarships listed on Pathway."
        actions={
          <Link href="/admin/scholarships/new" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
            <Plus className="size-4" aria-hidden="true" />
            Add scholarship
          </Link>
        }
      />
<AdminDataTable
  tabs={{ value: f.window, onChange: (value) => set({ window: value }), options: applicationStatusOptions }}
  toolbar={
    <AdminToolbar
          search={f.q}
          onSearchChange={(q) => set({ q })}
          searchPlaceholder="Search name, provider or stream"
          hasActiveFilters={active}
          onReset={reset}
          summary={active ? `${filtered.length} of ${data.length} match` : undefined}
        >
          <AdminFilterSelect label="Provider" value={f.provider} onChange={(provider) => set({ provider })} options={providerTypes} />
          <AdminFilterSelect label="Level" value={f.level} onChange={(level) => set({ level })} options={educationLevels} />
          <AdminFilterSelect label="Type" value={f.type} onChange={(type) => set({ type })} options={scholarshipTypes} />
          <AdminFilterSelect label="Quality" value={f.quality} onChange={(quality) => set({ quality })} options={qualityOptions} />
          <AdminFilterSelect label="Public page" value={f.page} onChange={(page) => set({ page })} options={[{ value: 'live', label: 'Live' }, { value: 'none', label: 'Listing only' }]} />
        </AdminToolbar>
  }
        columns={columns}
        data={filtered}
        onRowClick={(item) => router.push(`/admin/scholarships/${item.id}`)}
        getRowAriaLabel={(item) => `Open ${item.name}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No scholarships match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const item = row.original
          return (
            <Link href={`/admin/scholarships/${item.id}`} className="block space-y-2.5 rounded-xl border border-border bg-card shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {item.provider} · {item.benefitLabel || item.benefitType}
                  </p>
                </div>
                <ScholarshipApplicationStatusBadge status={item.applicationStatus} />
              </div>
              <CompletenessMeter value={item.completeness} />
            </Link>
          )
        }}
      />
    </div>
  )
}
