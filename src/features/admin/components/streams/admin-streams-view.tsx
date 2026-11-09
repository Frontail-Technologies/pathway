'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import type { AdminStream } from '@/features/admin/data/admin-streams'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, SortHeader, StatusBadge, stopRowClick } from '../kit'
import { DemoNote } from '../demo/demo-form'
import { useStreamPublish } from './use-stream-publish'

const DEFAULT_FILTERS = { q: '', status: 'all' }

type Row = AdminStream & { published: boolean; overridden: boolean; sectionCount: number }

const num = (value: number) => <span className={value === 0 ? 'text-muted-foreground tabular-nums' : 'tabular-nums'}>{value}</span>

export function AdminStreamsView({ streams }: { streams: AdminStream[] }) {
  const router = useRouter()
  const { isPublished, isOverridden } = useStreamPublish()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const data = React.useMemo<Row[]>(() => streams.map((stream) => ({ ...stream, published: isPublished(stream), overridden: isOverridden(stream), sectionCount: stream.sections.length })), [streams, isPublished, isOverridden])
  const publishedCount = data.filter((row) => row.published).length

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return data.filter((row) => {
      if (query && ![row.name, row.slug, row.tagline].some((value) => value.toLowerCase().includes(query))) return false
      if (f.status === 'published' && !row.published) return false
      if (f.status === 'hidden' && row.published) return false
      return true
    })
  }, [data, f])

  const columns = React.useMemo<ColumnDef<Row>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <SortHeader label="Stream" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="min-w-[200px]">
            <Link href={`/admin/streams/${row.original.slug}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.name}
            </Link>
            <p className="text-[13px] text-muted-foreground">{row.original.tagline}</p>
          </div>
        ),
      },
      { accessorKey: 'slug', header: 'Address', cell: ({ row }) => <span className="font-mono text-[13px] text-muted-foreground">/{row.original.slug}</span> },
      {
        accessorKey: 'published',
        header: 'Status',
        cell: ({ row }) => (
          <div className="flex flex-col gap-0.5">
            {row.original.published ? <StatusBadge tone="success">Published</StatusBadge> : <StatusBadge>Not published</StatusBadge>}
            {row.original.overridden ? <span className="text-xs text-muted-foreground">Changed on this device</span> : null}
          </div>
        ),
      },
      { accessorKey: 'sectionCount', header: ({ column }) => <SortHeader label="Sections" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />, cell: ({ row }) => num(row.original.sectionCount) },
      { accessorKey: 'collegeCount', header: 'Colleges', cell: ({ row }) => num(row.original.collegeCount) },
      { accessorKey: 'courseCount', header: 'Courses', cell: ({ row }) => num(row.original.courseCount) },
      { accessorKey: 'examCount', header: 'Exams', cell: ({ row }) => num(row.original.examCount) },
    ],
    [],
  )

  return (
    <div className="space-y-5">
      <AdminPageHeader title="Streams" count={`${publishedCount} of ${data.length} published`} description="Top-level hubs such as /engineering that gather colleges, courses, exams and more for one subject area." meta={<DemoNote>Demo: publishing changes are saved on this device only and don&apos;t change the public site.</DemoNote>} />

      <AdminToolbar search={f.q} onSearchChange={(q) => set({ q })} searchPlaceholder="Search streams" hasActiveFilters={active} onReset={reset} summary={active ? `${filtered.length} of ${data.length} match` : undefined}>
        <AdminFilterSelect label="Status" value={f.status} onChange={(status) => set({ status })} options={[{ value: 'published', label: 'Published' }, { value: 'hidden', label: 'Not published' }]} />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={filtered}
        onRowClick={(row) => router.push(`/admin/streams/${row.slug}`)}
        getRowAriaLabel={(row) => `Open ${row.name} hub`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No streams match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const item = row.original
          return (
            <Link href={`/admin/streams/${item.slug}`} className="block space-y-1.5 rounded-xl border border-border bg-card shadow-sm p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-foreground">{item.name}</p>
                {item.published ? <StatusBadge tone="success">Published</StatusBadge> : <StatusBadge>Not published</StatusBadge>}
              </div>
              <p className="text-[13px] text-muted-foreground">
                {item.collegeCount} colleges · {item.courseCount} courses · {item.examCount} exams
              </p>
            </Link>
          )
        }}
      />
    </div>
  )
}
