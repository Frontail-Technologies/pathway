'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { Edit, ExternalLink, Eye, MoreHorizontal, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { AdminStudent } from '@/features/admin/data/admin-students'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminEmptyState } from '../../admin-empty-state'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, CompletenessMeter, SortHeader, stopRowClick, Tag } from '../../kit'
import { StudentStatusBadge } from '../shared/student-status-badge'
import { accountStatusFilterOptions, streamFilterOptions, studyLevelFilterOptions } from '../shared/student-constants'

const DEFAULT_FILTERS = { q: '', level: 'all', stream: 'all', account: 'all' }

function RowActions({ student }: { student: AdminStudent }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label={`Actions for ${student.name}`} />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem render={<Link href={`/admin/students/${student.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href={`/admin/students/${student.id}/edit`} />}>
            <Edit className="size-4" aria-hidden="true" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href="/student" target="_blank" rel="noreferrer" />}>
            <ExternalLink className="size-4" aria-hidden="true" />
            Open student space
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AdminStudentsView({ initialStudents }: { initialStudents: AdminStudent[] }) {
  const router = useRouter()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return initialStudents.filter((student) => {
      if (query && ![student.name, student.email].some((value) => value.toLowerCase().includes(query))) return false
      if (f.level !== 'all' && student.studyLevel !== f.level) return false
      if (f.stream !== 'all' && student.stream !== f.stream) return false
      if (f.account !== 'all' && student.accountStatus !== f.account) return false
      return true
    })
  }, [initialStudents, f])

  const columns = React.useMemo<ColumnDef<AdminStudent>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => <SortHeader label="Student" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => (
          <div className="min-w-[200px]">
            <Link href={`/admin/students/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.name}
            </Link>
            <p className="text-[13px] text-muted-foreground">{row.original.email}</p>
          </div>
        ),
      },
      { accessorKey: 'studyLevel', header: 'Study level', cell: ({ row }) => row.original.studyLevel ?? <span className="text-muted-foreground">—</span> },
      {
        accessorKey: 'stream',
        header: 'Stream',
        cell: ({ row }) => (
          <div>
            <p>{row.original.stream ?? <span className="text-muted-foreground">—</span>}</p>
            {row.original.studyGoal ? <p className="text-[13px] text-muted-foreground">{row.original.studyGoal}</p> : null}
          </div>
        ),
      },
      {
        accessorKey: 'preferredExams',
        header: 'Exams',
        cell: ({ row }) =>
          row.original.preferredExams.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {row.original.preferredExams.map((exam) => (
                <Tag key={exam}>{exam}</Tag>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">—</span>
          ),
      },
      {
        id: 'completion',
        accessorFn: (student) => student.profileCompletion.percent,
        header: ({ column }) => <SortHeader label="Profile" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <CompletenessMeter value={row.original.profileCompletion.percent} />,
      },
      { accessorKey: 'accountStatus', header: 'Account', cell: ({ row }) => <StudentStatusBadge status={row.original.accountStatus} /> },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions student={row.original} /> },
    ],
    [],
  )

  const total = initialStudents.length

  return (
    <div className="space-y-5">
      <AdminPageHeader title="Students" count={total > 0 ? `${total} total` : undefined} description="Student accounts and the study preferences they have shared." />

      {total === 0 ? (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState icon={Users} title="No students yet" description="Student accounts will appear here once sign-up is connected." className="py-14" />
        </div>
      ) : (
        <>
          <AdminToolbar
            search={f.q}
            onSearchChange={(q) => set({ q })}
            searchPlaceholder="Search name or email"
            hasActiveFilters={active}
            onReset={reset}
            summary={active ? `${filtered.length} of ${total} match` : undefined}
          >
            <AdminFilterSelect label="Study level" value={f.level} onChange={(level) => set({ level })} options={studyLevelFilterOptions} />
            <AdminFilterSelect label="Stream" value={f.stream} onChange={(stream) => set({ stream })} options={streamFilterOptions} />
            <AdminFilterSelect label="Account" value={f.account} onChange={(account) => set({ account })} options={accountStatusFilterOptions} />
          </AdminToolbar>

          <AdminDataTable
            columns={columns}
            data={filtered}
            onRowClick={(student) => router.push(`/admin/students/${student.id}`)}
            getRowAriaLabel={(student) => `Open ${student.name}`}
            hasActiveFilters={active}
            onResetFilters={reset}
            emptyTitle="No students match"
            emptyDescription="Try a different search or clear the filters."
            mobileCardRender={(row) => {
              const student = row.original
              return (
                <Link href={`/admin/students/${student.id}`} className="block space-y-2.5 rounded-xl border border-border bg-card shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{student.name}</p>
                      <p className="truncate text-[13px] text-muted-foreground">
                        {[student.studyLevel, student.stream].filter(Boolean).join(' · ') || student.email}
                      </p>
                    </div>
                    <StudentStatusBadge status={student.accountStatus} />
                  </div>
                  <CompletenessMeter value={student.profileCompletion.percent} />
                </Link>
              )
            }}
          />
        </>
      )}
    </div>
  )
}
