'use client'

import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { CompletenessMeter, SortHeader, stopRowClick } from '../../../kit'
import { RowActions } from '../../shared/row-actions'
import { TagOverflow } from '../../shared/tags'
import { providerPlace, sentenceCase } from '../../shared/tutor-coaching-constants'
import { QualityStatusBadge } from '../../shared/tutor-status-badge'

export const coachingColumns: ColumnDef<AdminCoachingProvider>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortHeader label="Provider" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
    cell: ({ row }) => {
      const provider = row.original
      return (
        <div className="min-w-[220px]">
          <Link href={`/admin/tutors-coaching/coaching/${provider.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
            {provider.name}
          </Link>
          <p className="text-[13px] text-muted-foreground">{providerPlace(provider)}</p>
        </div>
      )
    },
  },
  { accessorKey: 'providerType', header: 'Type', cell: ({ row }) => <span className="whitespace-nowrap text-muted-foreground">{sentenceCase(row.original.providerType)}</span> },
  { id: 'exams', header: 'Exams', cell: ({ row }) => <TagOverflow items={row.original.exams} /> },
  { id: 'modes', header: 'Mode', cell: ({ row }) => <span className="text-muted-foreground">{row.original.modes.join(', ') || '—'}</span> },
  {
    id: 'status',
    accessorFn: (provider) => provider.quality.status,
    header: 'Status',
    cell: ({ row }) => <QualityStatusBadge status={row.original.quality.status} />,
  },
  {
    id: 'completeness',
    accessorFn: (provider) => provider.completeness.percentage,
    header: ({ column }) => <SortHeader label="Completeness" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
    cell: ({ row }) => <CompletenessMeter value={row.original.completeness.percentage} />,
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const provider = row.original
      return (
        <RowActions
          name={provider.name}
          viewHref={`/admin/tutors-coaching/coaching/${provider.id}`}
          editHref={`/admin/tutors-coaching/coaching/${provider.id}/edit`}
          publicHref={provider.hasDetailPage ? `/coaching/${provider.slug}` : undefined}
        />
      )
    },
  },
]
