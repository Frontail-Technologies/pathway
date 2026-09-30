import Link from 'next/link'
import { type ColumnDef } from '@tanstack/react-table'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { LeadStatusBadge } from '../shared/lead-status-badge'
import { EnquirySourceBadge } from '../shared/enquiry-source-badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, ExternalLink, UserCheck } from 'lucide-react'

export const enquiryTableColumns: ColumnDef<AdminEnquiry>[] = [
  {
    accessorKey: 'subject',
    header: 'Enquiry',
    cell: ({ row }) => {
      const enquiry = row.original
      return (
        <div className="flex flex-col py-1">
          <Link
            href={`/admin/enquiries/${enquiry.id}`}
            className="text-sm font-semibold text-foreground hover:text-primary hover:underline transition-colors"
          >
            {enquiry.subject || `Enquiry #${enquiry.id}`}
          </Link>
          <span className="text-xs text-muted-foreground font-mono">
            ID: {enquiry.id}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => {
      return <EnquirySourceBadge source={row.original.source} />
    },
  },
  {
    accessorKey: 'targetName',
    header: 'Target Entity',
    cell: ({ row }) => {
      const enquiry = row.original
      if (!enquiry.targetName) {
        return <span className="text-xs text-muted-foreground">General Guidance</span>
      }

      if (enquiry.targetAdminUrl) {
        return (
          <Link
            href={enquiry.targetAdminUrl}
            className="text-xs font-medium text-foreground hover:text-primary hover:underline transition-colors block truncate max-w-[180px]"
          >
            {enquiry.targetName}
          </Link>
        )
      }

      return (
        <span className="text-xs font-medium text-foreground truncate block max-w-[180px]">
          {enquiry.targetName}
        </span>
      )
    },
  },
  {
    accessorKey: 'contactName',
    header: 'Student / Contact',
    cell: ({ row }) => {
      const enquiry = row.original
      return (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            {enquiry.isRegisteredStudent && enquiry.studentId ? (
              <Link
                href={`/admin/students/${enquiry.studentId}`}
                className="text-xs font-semibold text-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1"
              >
                <span>{enquiry.contactName}</span>
                <UserCheck className="w-3 h-3 text-purple-600 shrink-0" />
              </Link>
            ) : (
              <span className="text-xs font-semibold text-foreground">
                {enquiry.contactName}
              </span>
            )}
          </div>
          {enquiry.contactEmail && (
            <span className="text-[11px] text-muted-foreground truncate max-w-[160px]">
              {enquiry.contactEmail}
            </span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Lead Status',
    cell: ({ row }) => {
      return <LeadStatusBadge status={row.original.status} />
    },
  },
  {
    accessorKey: 'assignedTo',
    header: 'Assigned To',
    cell: ({ row }) => {
      const assignee = row.original.assignedTo
      return (
        <span className="text-xs text-muted-foreground">
          {assignee || 'Unassigned'}
        </span>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      const dateStr = row.original.createdAt
      if (!dateStr) return <span className="text-xs text-muted-foreground">—</span>
      return (
        <span className="text-xs text-muted-foreground font-mono">
          {dateStr}
        </span>
      )
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const enquiry = row.original

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="hover:bg-muted text-muted-foreground hover:text-foreground"
                  aria-label="Enquiry actions menu"
                />
              }
            >
              <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-1">
              <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground font-medium">
                Enquiry Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/enquiries/${enquiry.id}`}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>View Details</span>
                </Link>
              </DropdownMenuItem>
              {enquiry.studentId && (
                <DropdownMenuItem className="p-0 focus:bg-transparent">
                  <Link
                    href={`/admin/students/${enquiry.studentId}`}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>View Student Profile</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
