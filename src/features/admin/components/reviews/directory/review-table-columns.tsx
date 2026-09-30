'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { ReviewSourceBadge } from '../shared/review-source-badge'
import { ModerationStatusBadge } from '../shared/moderation-status-badge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export const reviewTableColumns: ColumnDef<AdminReview>[] = [
  {
    accessorKey: 'id',
    header: 'Review',
    cell: ({ row }) => {
      const review = row.original
      return (
        <div className="space-y-1 max-w-[280px]">
          <div className="flex items-center gap-1.5">
            {review.rating ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                {review.rating.toFixed(1)}
              </span>
            ) : null}
            <span className="font-semibold text-xs text-foreground truncate">
              {review.title || 'Review Entry'}
            </span>
          </div>
          {review.body ? (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">
              {review.body}
            </p>
          ) : null}
          <div className="text-[10px] text-muted-foreground font-mono">
            #{review.id}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'targetName',
    header: 'Entity',
    cell: ({ row }) => {
      const review = row.original
      return (
        <div className="space-y-0.5">
          {review.targetAdminUrl ? (
            <Link
              href={review.targetAdminUrl}
              className="font-medium text-xs text-primary hover:underline block truncate max-w-[200px]"
            >
              {review.targetName || review.entityId}
            </Link>
          ) : (
            <span className="text-xs font-medium text-foreground block truncate max-w-[200px]">
              {review.targetName || review.entityId}
            </span>
          )}
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal text-muted-foreground border-border/60">
            {review.entityTypeLabel}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => {
      return <ReviewSourceBadge source={row.original.source} />
    },
  },
  {
    accessorKey: 'reviewerName',
    header: 'Reviewer',
    cell: ({ row }) => {
      const review = row.original
      return (
        <div className="space-y-0.5 text-xs">
          <div className="font-medium text-foreground">
            {review.reviewerName || 'Anonymous'}
          </div>
          {review.verifiedSession ? (
            <div className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
              <CheckCircle className="w-3 h-3" />
              <span>Verified Session</span>
            </div>
          ) : null}
        </div>
      )
    },
  },
  {
    accessorKey: 'moderationStatus',
    header: 'Status',
    cell: ({ row }) => {
      return <ModerationStatusBadge status={row.original.moderationStatus} />
    },
  },
  {
    accessorKey: 'submittedAt',
    header: 'Submitted',
    cell: ({ row }) => {
      const date = row.original.submittedAt
      if (!date) return <span className="text-xs text-muted-foreground">—</span>
      return (
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {new Date(date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      )
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      const review = row.original
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="hover:bg-muted text-muted-foreground hover:text-foreground"
                  aria-label="Review actions menu"
                />
              }
            >
              <MoreHorizontal className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 p-1">
              <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground font-medium">
                Review Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-0 focus:bg-transparent">
                <Link
                  href={`/admin/reviews/${review.id}`}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Inspect Review</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
