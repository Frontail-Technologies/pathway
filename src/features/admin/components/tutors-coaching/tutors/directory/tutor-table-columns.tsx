'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { CompletenessMeter, SortHeader, stopRowClick } from '../../../kit'
import { RowActions } from '../../shared/row-actions'
import { TagOverflow } from '../../shared/tags'
import { QualityStatusBadge } from '../../shared/tutor-status-badge'

export const tutorColumns: ColumnDef<AdminTutor>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortHeader label="Tutor" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
    cell: ({ row }) => {
      const tutor = row.original
      return (
        <div className="flex min-w-[220px] items-center gap-3">
          <TutorPortrait tutor={tutor} className="size-8 shrink-0 rounded-full" />
          <div className="min-w-0">
            <Link href={`/admin/tutors-coaching/tutors/${tutor.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {tutor.name}
            </Link>
            <p className="max-w-[240px] truncate text-[13px] text-muted-foreground">{tutor.headline}</p>
          </div>
        </div>
      )
    },
  },
  { id: 'subjects', header: 'Subjects', cell: ({ row }) => <TagOverflow items={row.original.subjects} /> },
  { id: 'exams', header: 'Exams', cell: ({ row }) => <TagOverflow items={row.original.exams} /> },
  { id: 'modes', header: 'Mode', cell: ({ row }) => <span className="text-muted-foreground">{row.original.modes.join(', ') || '—'}</span> },
  {
    id: 'status',
    accessorFn: (tutor) => tutor.quality.status,
    header: 'Status',
    cell: ({ row }) => <QualityStatusBadge status={row.original.quality.status} />,
  },
  {
    id: 'completeness',
    accessorFn: (tutor) => tutor.completeness.percentage,
    header: ({ column }) => <SortHeader label="Completeness" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
    cell: ({ row }) => <CompletenessMeter value={row.original.completeness.percentage} />,
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const tutor = row.original
      return (
        <RowActions
          name={tutor.name}
          viewHref={`/admin/tutors-coaching/tutors/${tutor.id}`}
          editHref={`/admin/tutors-coaching/tutors/${tutor.id}/edit`}
          publicHref={tutor.hasDetailPage ? `/tutors/${tutor.slug}` : undefined}
        />
      )
    },
  },
]
