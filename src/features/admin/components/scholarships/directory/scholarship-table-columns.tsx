import * as React from 'react'
import Link from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreHorizontal,
  Eye,
  Edit2,
  ExternalLink,
  Award,
  ArrowUpDown,
  Building,
} from 'lucide-react'
import {
  directoryQualityBadgeStyles,
  statusBadgeStyles,
} from '../shared/scholarship-constants'
import { ScholarshipApplicationStatusBadge } from '../shared/scholarship-status-badge'

export const scholarshipTableColumns: ColumnDef<AdminScholarship>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="-ml-3 h-8 text-xs font-bold text-foreground hover:bg-muted"
      >
        <span>Scholarship</span>
        <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => {
      const sch = row.original
      return (
        <div className="flex items-start gap-3 min-w-[240px] max-w-[320px] py-1">
          <div className="w-8 h-8 rounded-lg bg-success-surface text-success font-bold flex items-center justify-center shrink-0 text-xs">
            {sch.providerInitials || <Award className="w-4 h-4" />}
          </div>
          <div className="space-y-1 min-w-0">
            <Link
              href={`/admin/scholarships/${sch.id}`}
              className="font-bold text-foreground text-xs hover:text-primary transition-colors block truncate"
            >
              {sch.name}
            </Link>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1 truncate">
                <Building className="w-3 h-3 text-muted-foreground/70" />
                {sch.provider}
              </span>
              <Badge
                variant="secondary"
                className="text-[10px] font-semibold bg-muted text-muted-foreground border-0 px-1.5 py-0"
              >
                {sch.scholarshipType}
              </Badge>
            </div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'providerType',
    header: 'Provider',
    cell: ({ row }) => {
      const sch = row.original
      return (
        <div className="space-y-1 text-xs min-w-[130px]">
          <span className="font-semibold text-foreground block">{sch.provider}</span>
          <Badge
            variant="secondary"
            className="text-[10px] font-medium bg-muted text-muted-foreground border-0 px-1.5 py-0"
          >
            {sch.providerType}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'educationLevels',
    header: 'Study Level',
    cell: ({ row }) => {
      const levels = row.original.educationLevels
      if (levels.length === 0) {
        return <span className="text-xs text-muted-foreground">All Levels</span>
      }
      return (
        <div className="flex flex-wrap gap-1 max-w-[160px]">
          {levels.map((lvl) => (
            <Badge
              key={lvl}
              variant="secondary"
              className="text-[10px] font-medium bg-muted text-muted-foreground border-0 px-1.5 py-0"
            >
              {lvl}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: 'benefitValue',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="-ml-3 h-8 text-xs font-bold text-foreground hover:bg-muted"
      >
        <span>Benefit</span>
        <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => {
      const sch = row.original
      return (
        <div className="space-y-0.5 min-w-[120px]">
          <span className="font-bold text-foreground text-xs block">
            {sch.benefitLabel || '—'}
          </span>
          <span className="text-[10px] text-muted-foreground block">
            {sch.benefitType}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'deadline',
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="-ml-3 h-8 text-xs font-bold text-foreground hover:bg-muted"
      >
        <span>Deadline & Window</span>
        <ArrowUpDown className="w-3.5 h-3.5 ml-1 text-muted-foreground" />
      </Button>
    ),
    cell: ({ row }) => {
      const sch = row.original
      return (
        <div className="space-y-1 min-w-[130px]">
          <span className="text-xs font-semibold text-foreground block">
            {sch.deadlineDisplay || 'Date Not Recorded'}
          </span>
          <ScholarshipApplicationStatusBadge status={sch.applicationStatus} />
        </div>
      )
    },
  },
  {
    accessorKey: 'qualityStatus',
    header: 'Data Quality',
    cell: ({ row }) => {
      const status = row.original.qualityStatus
      const config = directoryQualityBadgeStyles[status] || directoryQualityBadgeStyles.needs_review
      return (
        <Badge
          variant="secondary"
          className={`text-[11px] font-semibold px-2 py-0.5 ${config.className}`}
        >
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'completeness',
    header: 'Completeness',
    cell: ({ row }) => {
      const sch = row.original
      const statusConfig = statusBadgeStyles[sch.contentStatus]
      return (
        <div className="space-y-1.5 min-w-[110px]">
          <div className="flex items-center justify-between text-xs">
            <span className={`text-[10px] font-bold ${statusConfig.className} px-1.5 rounded`}>
              {statusConfig.label}
            </span>
            <span className="font-mono text-[11px] font-semibold text-muted-foreground">
              {sch.completeness}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                sch.completeness >= 80
                  ? 'bg-success'
                  : sch.completeness >= 45
                  ? 'bg-warning'
                  : 'bg-muted-foreground'
              }`}
              style={{ width: `${sch.completeness}%` }}
            />
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'hasDetailPage',
    header: 'Public Detail',
    cell: ({ row }) => {
      const hasPage = row.original.hasDetailPage
      return (
        <Badge
          variant="secondary"
          className={`text-[10px] font-semibold px-1.5 py-0.5 border-0 ${
            hasPage ? 'bg-success-surface text-success' : 'bg-muted text-muted-foreground'
          }`}
        >
          {hasPage ? 'Live Detail' : 'Not Configured'}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const sch = row.original
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  aria-label={`Actions for ${sch.name}`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-44 p-1">
              <DropdownMenuLabel className="text-[11px] font-bold text-muted-foreground px-2 py-1">
                Scholarship Actions
              </DropdownMenuLabel>
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/scholarships/${sch.id}`}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  View Details
                </Link>
              </DropdownMenuItem>

              {sch.hasDetailPage ? (
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <Link
                    href={`/scholarship/${sch.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    Public Page
                  </Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem disabled className="px-2 py-1.5 text-xs font-medium text-muted-foreground/60 cursor-not-allowed">
                  <ExternalLink className="w-3.5 h-3.5 mr-2" />
                  Public Unavailable
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/scholarships/${sch.id}/edit`}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                  Edit Scholarship
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
