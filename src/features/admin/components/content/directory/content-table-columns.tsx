import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { ContentTypeBadge } from '../shared/content-type-badge'
import { ContentStatusBadge } from '../shared/content-status-badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, ExternalLink, Eye, Edit3, Link2Off } from 'lucide-react'

export const contentTableColumns: ColumnDef<AdminContentEntry>[] = [
  {
    accessorKey: 'title',
    header: 'Title & Excerpt',
    cell: ({ row }) => {
      const entry = row.original
      return (
        <div className="flex flex-col min-w-[240px] max-w-[340px]">
          <Link
            href={`/admin/content/${entry.id}`}
            className="text-xs font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
          >
            {entry.title}
          </Link>
          {entry.excerpt && (
            <span className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
              {entry.excerpt}
            </span>
          )}
          <span className="text-[10px] text-muted-foreground/70 font-mono mt-0.5">
            /{entry.slug}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => <ContentTypeBadge type={row.original.type} />,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <span className="text-xs text-foreground font-medium">
        {row.original.categoryLabel}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <ContentStatusBadge status={row.original.status} />,
  },
  {
    id: 'updated',
    header: 'Updated / Published',
    cell: ({ row }) => {
      const entry = row.original
      const date = entry.updatedAt || entry.publishedAt || entry.createdAt
      if (!date) {
        return <span className="text-xs text-muted-foreground/60">—</span>
      }
      return (
        <span className="text-xs text-muted-foreground">
          {new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      )
    },
  },
  {
    id: 'publicLink',
    header: 'Public Page',
    cell: () => (
      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/80 font-medium">
        <Link2Off className="w-3 h-3 text-muted-foreground/60" />
        <span>Not Available</span>
      </span>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const entry = row.original
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="hover:bg-muted text-muted-foreground hover:text-foreground"
                  aria-label="Content actions menu"
                />
              }
            >
              <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-1">
              <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground font-medium">
                Content Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/content/${entry.id}`}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>View Details</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/content/${entry.id}/edit`}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Edit Content</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled className="flex items-center gap-2 px-2.5 py-1.5 text-xs opacity-50 cursor-not-allowed">
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Public Page (Not Available)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
