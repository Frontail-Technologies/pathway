import * as React from 'react'
import Link from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'
import {
  type AdminProgramOffering,
} from '@/features/admin/data/admin-admissions-fees'
import { Button, buttonVariants } from '@/components/ui/button'
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
  Eye,
  Edit2,
  ArrowUpDown,
  Building2,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { OfferingQualityBadge } from '../shared/admissions-fees-status-badge'
import { statusBadgeStyles } from '../shared/admissions-fees-constants'

export function getAdmissionsFeesColumns(): ColumnDef<AdminProgramOffering>[] {
  return [
    {
      accessorKey: 'identity',
      header: ({ column }) => (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider text-muted-foreground"
        >
          <span>Offering (Program & Institution)</span>
          <ArrowUpDown className="h-3.5 w-3.5" />
        </button>
      ),
      accessorFn: (row) => `${row.programName} ${row.institutionName}`,
      cell: ({ row }) => {
        const off = row.original
        return (
          <div className="space-y-1 max-w-[280px]">
            <Link
              href={`/admin/admissions-fees/${off.id}`}
              className="font-bold text-xs text-foreground hover:text-primary transition-colors block truncate"
            >
              {off.programName}
            </Link>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground truncate">
              <Building2 className="w-3 h-3 shrink-0 text-muted-foreground/70" />
              <span className="truncate">{off.institutionName}</span>
              <span>•</span>
              <span className="shrink-0">{off.institutionCity}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: 'level',
      header: 'Level / Stream',
      cell: ({ row }) => {
        const off = row.original
        return (
          <div className="space-y-1">
            <Badge
              variant="secondary"
              className="text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border-0"
            >
              {off.level}
            </Badge>
            <span className="text-[11px] text-muted-foreground block truncate">
              {off.stream} • {off.duration}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'annualFeeValue',
      header: ({ column }) => (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider text-muted-foreground"
        >
          <span>Fee Structure</span>
          <ArrowUpDown className="h-3.5 w-3.5" />
        </button>
      ),
      cell: ({ row }) => {
        const off = row.original
        if (!off.annualFee) {
          return <span className="text-xs text-muted-foreground italic">Pending schedule</span>
        }
        return (
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-foreground block">
              {off.annualFee}
            </span>
            <span className="text-[11px] text-muted-foreground block">
              Total: {off.totalProgrammeFee || 'N/A'}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'entranceExams',
      header: 'Entrance Exams',
      cell: ({ row }) => {
        const exams = row.original.entranceExams
        if (!exams || exams.length === 0) {
          return <span className="text-xs text-muted-foreground italic">Direct / Board Merit</span>
        }
        return (
          <div className="flex flex-wrap gap-1 max-w-[190px]">
            {exams.map((ex) => (
              <Badge
                key={ex}
                variant="secondary"
                className="text-[10px] font-semibold bg-muted/80 text-foreground border-0 px-1.5 py-0"
              >
                {ex}
              </Badge>
            ))}
          </div>
        )
      },
    },
    {
      accessorKey: 'counsellingBody',
      header: 'Admission Mode',
      cell: ({ row }) => {
        const off = row.original
        return (
          <div className="space-y-0.5 max-w-[170px]">
            <span className="text-xs font-medium text-foreground block truncate">
              {off.admissionMode}
            </span>
            <span className="text-[11px] text-muted-foreground block truncate">
              {off.counsellingBody || 'Institutional'}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'qualityStatus',
      header: 'Data Quality',
      cell: ({ row }) => {
        return <OfferingQualityBadge status={row.original.qualityStatus} compact />
      },
    },
    {
      accessorKey: 'completeness',
      header: ({ column }) => (
        <button
          type="button"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider text-muted-foreground"
        >
          <span>Completeness</span>
          <ArrowUpDown className="h-3.5 w-3.5" />
        </button>
      ),
      cell: ({ row }) => {
        const item = row.original
        const status = statusBadgeStyles[item.contentStatus]
        return (
          <div className="w-[120px] space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <Badge
                variant="secondary"
                className={cn('text-[10px] font-semibold px-1.5 py-0', status.className)}
              >
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
                    ? 'bg-emerald-500'
                    : item.completeness >= 35
                    ? 'bg-amber-500'
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
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const off = row.original
        return (
          <div className="flex items-center justify-end gap-1">
            <Link
              href={`/admin/admissions-fees/${off.id}`}
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                className: 'h-8 px-2 text-xs font-semibold hover:text-primary',
              })}
            >
              <Eye className="w-3.5 h-3.5 mr-1" />
              View
            </Link>

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
              <DropdownMenuContent align="end" className="w-48 p-1 text-xs">
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <Link
                    href={`/admin/admissions-fees/${off.id}`}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                    View Offering Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <Link
                    href={`/admin/admissions-fees/${off.id}/edit`}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                    Edit Admissions & Fees
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <Link
                    href={`/admin/institutions/${off.institutionId}`}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                    View Institution Admin
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <Link
                    href={`/admin/programs/${off.programId}`}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    View Canonical Program
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}
