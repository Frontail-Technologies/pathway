'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, ExternalLink, Eye, MoreHorizontal, Plus } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { examCompleteness, examLevelOptions, examScopeOptions, examStudyAreaOptions, getAdminExams, type AdminExam } from '@/features/admin/data/admin-exams'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../admin-data-table'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, CompletenessMeter, SortHeader, StatusBadge, stopRowClick, Tag } from '../kit'
import { useExamsWithEdits } from './use-exam-edits'

const DEFAULT_FILTERS = { q: '', area: 'all', level: 'all', scope: 'all', page: 'all' }

function RowActions({ item }: { item: AdminExam }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${item.shortName}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem render={<Link href={`/admin/exams/${item.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/exams/${item.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          {item.hasDetailPage ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href={`/exam/${item.slug}`} target="_blank" rel="noreferrer" />}>
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

const toOptions = (values: readonly string[]) => values.map((value) => ({ value, label: value }))

export function AdminExamsView() {
  const router = useRouter()
  const base = React.useMemo(() => getAdminExams(), [])
  const { exams } = useExamsWithEdits(base)
  const data = React.useMemo<AdminExam[]>(() => exams.map((exam) => ({ ...exam, completeness: examCompleteness(exam) })), [exams])
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return data.filter((item) => {
      if (query && ![item.name, item.shortName, item.conductingBody ?? '', item.slug].some((value) => value.toLowerCase().includes(query))) return false
      if (f.area !== 'all' && item.studyArea !== f.area) return false
      if (f.level !== 'all' && item.level !== f.level) return false
      if (f.scope !== 'all' && item.scope !== f.scope) return false
      if (f.page === 'live' && !item.hasDetailPage) return false
      if (f.page === 'none' && item.hasDetailPage) return false
      return true
    })
  }, [data, f])

  const columns = React.useMemo<ColumnDef<AdminExam>[]>(
    () => [
      {
        accessorKey: 'shortName',
        header: ({ column }) => <SortHeader label="Exam" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="min-w-[220px]">
            <Link href={`/admin/exams/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.shortName}
            </Link>
            <p className="text-[13px] text-muted-foreground">{row.original.name}</p>
          </div>
        ),
      },
      { accessorKey: 'studyArea', header: 'Study area', cell: ({ row }) => <Tag>{row.original.studyArea}</Tag> },
      { accessorKey: 'level', header: 'Level', cell: ({ row }) => <span className="whitespace-nowrap">{row.original.level}</span> },
      { accessorKey: 'conductingBody', header: 'Conducting body', cell: ({ row }) => <span className="text-muted-foreground">{row.original.conductingBody ?? 'Not recorded'}</span> },
      {
        accessorKey: 'hasDetailPage',
        header: 'Public page',
        cell: ({ row }) => (row.original.hasDetailPage ? <StatusBadge tone="success">Live</StatusBadge> : <StatusBadge>Listing only</StatusBadge>),
      },
      {
        accessorKey: 'completeness',
        header: ({ column }) => <SortHeader label="Completeness" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <CompletenessMeter value={row.original.completeness} />,
      },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions item={row.original} /> },
    ],
    [],
  )

  return (
    <div className="space-y-5">
      <AdminPageHeader
        title="Exams"
        count={`${data.length} total`}
        description="Entrance exams listed on Pathway and the public pages built for them."
        actions={
          <Link href="/admin/exams/new" className={buttonVariants({ size: 'sm', className: 'gap-1.5' })}>
            <Plus className="size-4" aria-hidden="true" />
            Add exam
          </Link>
        }
      />

      <AdminToolbar
        search={f.q}
        onSearchChange={(q) => set({ q })}
        searchPlaceholder="Search name or conducting body"
        hasActiveFilters={active}
        onReset={reset}
        summary={active ? `${filtered.length} of ${data.length} match` : undefined}
      >
        <AdminFilterSelect label="Study area" value={f.area} onChange={(area) => set({ area })} options={toOptions(examStudyAreaOptions)} />
        <AdminFilterSelect label="Level" value={f.level} onChange={(level) => set({ level })} options={toOptions(examLevelOptions)} />
        <AdminFilterSelect label="Scope" value={f.scope} onChange={(scope) => set({ scope })} options={toOptions(examScopeOptions)} />
        <AdminFilterSelect label="Public page" value={f.page} onChange={(page) => set({ page })} options={[{ value: 'live', label: 'Live' }, { value: 'none', label: 'Listing only' }]} />
      </AdminToolbar>

      <AdminDataTable
        columns={columns}
        data={filtered}
        onRowClick={(item) => router.push(`/admin/exams/${item.id}`)}
        getRowAriaLabel={(item) => `Open ${item.shortName}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No exams match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => {
          const item = row.original
          return (
            <Link href={`/admin/exams/${item.id}`} className="block space-y-2.5 rounded-lg border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-foreground">{item.shortName}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {item.studyArea} · {item.level} · {item.scope}
                  </p>
                </div>
                {item.hasDetailPage ? <StatusBadge tone="success">Live</StatusBadge> : <StatusBadge>Listing only</StatusBadge>}
              </div>
              <CompletenessMeter value={item.completeness} />
            </Link>
          )
        }}
      />
    </div>
  )
}
