import * as React from 'react'
import Link from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'
import type { AdminProgram } from '@/features/admin/types/programs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreVertical,
  ExternalLink,
  Eye,
  Edit,
  BookOpen,
  ArrowUpDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  levelBadgeVariant,
  directoryQualityBadgeStyles,
  statusBadgeStyles,
} from '@/features/admin/constants/programs'

export const programTableColumns: ColumnDef<AdminProgram>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto gap-1 p-0 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        <span>Program</span>
        <ArrowUpDown className="w-3.5 h-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="flex items-center gap-3 min-w-[220px]">
          <div className="w-8 h-8 rounded-lg bg-warning-surface text-warning flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <Link
              href={`/admin/programs/${item.id}`}
              className="font-semibold text-foreground hover:text-primary transition-colors truncate block"
            >
              {item.name}
            </Link>
            <span className="text-[11px] text-muted-foreground truncate block">
              {item.degree} {item.specialization ? `• ${item.specialization}` : ''}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'level',
    header: 'Study Level',
    cell: ({ row }) => {
      const level = row.original.level
      return (
        <Badge variant={levelBadgeVariant} size="sm">
          {level}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'stream',
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto gap-1 p-0 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        <span>Stream</span>
        <ArrowUpDown className="w-3.5 h-3.5" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-xs text-foreground font-medium">
        {row.original.stream}
      </span>
    ),
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground tabular-nums">
        {row.original.duration}
      </span>
    ),
  },
  {
    accessorKey: 'collegesOfferingCount',
    header: 'Institutions',
    cell: ({ row }) => {
      const count = row.original.collegesOfferingCount
      return (
        <span className="text-xs font-medium text-foreground tabular-nums">
          {count > 0 ? `${count} offerings` : '—'}
        </span>
      )
    },
  },
  {
    accessorKey: 'qualityStatus',
    header: 'Data Quality',
    cell: ({ row }) => {
      const quality = row.original.qualityStatus
      const config = directoryQualityBadgeStyles[quality]
      return (
        <Badge variant={config.variant} size="xs">
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'completeness',
    header: ({ column }) => (
      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="h-auto gap-1 p-0 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        <span>Completeness</span>
        <ArrowUpDown className="w-3.5 h-3.5" />
      </Button>
    ),
    cell: ({ row }) => {
      const item = row.original
      const status = statusBadgeStyles[item.contentStatus]
      return (
        <div className="w-[130px] space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <Badge variant={status.variant} size="xs">
              {status.label}
            </Badge>
            <span className="font-bold text-foreground tabular-nums">
              {item.completeness}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-300',
                item.completeness >= 80
                  ? 'bg-success'
                  : item.completeness >= 35
                  ? 'bg-warning'
                  : 'bg-muted-foreground/50'
              )}
              style={{ width: `${item.completeness}%` }}
            />
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'hasDetailPage',
    header: 'Detail Page',
    cell: ({ row }) => {
      const hasDetail = row.original.hasDetailPage
      return hasDetail ? (
        <Badge variant="success" size="xs">
          Live
        </Badge>
      ) : (
        <Badge variant="muted" size="xs">
          Not Available
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const item = row.original

      return (
        <div className="flex items-center justify-end" onClick={(event) => event.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  aria-label="Actions"
                />
              }
            >
              <MoreVertical className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 p-1" onClick={(event) => event.stopPropagation()}>
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/programs/${item.id}`}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  View Details
                </Link>
              </DropdownMenuItem>

              {item.hasDetailPage ? (
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <Link
                    href={`/course/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    View Public Page
                  </Link>
                </DropdownMenuItem>
              ) : null}

              <DropdownMenuSeparator />

              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/programs/${item.id}/edit`}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                  Edit Program
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
