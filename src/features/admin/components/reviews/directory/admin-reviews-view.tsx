'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ColumnDef } from '@tanstack/react-table'
import { ExternalLink, Eye, MessageSquare, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../admin-data-table'
import { AdminEmptyState } from '../../admin-empty-state'
import { AdminFilterSelect, AdminPageHeader, AdminToolbar, SortHeader, stopRowClick, Tag } from '../../kit'
import { ModerationStatusBadge } from '../shared/moderation-status-badge'
import { Rating } from '../shared/review-rating'
import { formatReviewDate, moderationStatusOptions, reviewEntityTypeLabels, reviewEntityTypeOptions, reviewSourceLabels, reviewSourceOptions } from '../shared/review-constants'

const DEFAULT_FILTERS = { q: '', source: 'all', entity: 'all', status: 'all' }

function RowActions({ review }: { review: AdminReview }) {
  return (
    <div className="flex justify-end" onClick={stopRowClick} onKeyDown={stopRowClick}>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground" aria-label="Review actions" />}>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem render={<Link href={`/admin/reviews/${review.id}`} />}>
            <Eye className="size-4" aria-hidden="true" />
            View
          </DropdownMenuItem>
          {review.targetAdminUrl ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem render={<Link href={review.targetAdminUrl} />}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Open {reviewEntityTypeLabels[review.entityType].toLowerCase()}
              </DropdownMenuItem>
            </>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function AdminReviewsView({ initialReviews }: { initialReviews: AdminReview[] }) {
  const router = useRouter()
  const { values: f, set, reset, active } = useUrlFilters(DEFAULT_FILTERS)

  const filtered = React.useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return initialReviews.filter((review) => {
      if (query && ![review.title ?? '', review.body ?? '', review.reviewerName ?? '', review.targetName ?? ''].some((value) => value.toLowerCase().includes(query))) return false
      if (f.source !== 'all' && review.source !== f.source) return false
      if (f.entity !== 'all' && review.entityType !== f.entity) return false
      if (f.status !== 'all' && (review.moderationStatus ?? 'published') !== f.status) return false
      return true
    })
  }, [initialReviews, f])

  const columns = React.useMemo<ColumnDef<AdminReview>[]>(
    () => [
      {
        id: 'review',
        accessorFn: (review) => review.title ?? review.body ?? '',
        header: 'Review',
        cell: ({ row }) => (
          <div className="max-w-[320px] min-w-[220px]">
            <Link href={`/admin/reviews/${row.original.id}`} onClick={stopRowClick} className="font-medium text-foreground hover:text-primary hover:underline">
              {row.original.title || 'Untitled review'}
            </Link>
            {row.original.body ? <p className="line-clamp-1 text-[13px] text-muted-foreground">{row.original.body}</p> : null}
          </div>
        ),
      },
      {
        accessorKey: 'rating',
        header: ({ column }) => <SortHeader label="Rating" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <Rating value={row.original.rating} />,
      },
      {
        accessorKey: 'targetName',
        header: 'For',
        cell: ({ row }) => (
          <div>
            <p className="max-w-[200px] truncate">{row.original.targetName || row.original.entityId}</p>
            <p className="text-[13px] text-muted-foreground">{reviewEntityTypeLabels[row.original.entityType]}</p>
          </div>
        ),
      },
      { accessorKey: 'source', header: 'Source', cell: ({ row }) => <Tag>{reviewSourceLabels[row.original.source]}</Tag> },
      {
        accessorKey: 'reviewerName',
        header: 'Reviewer',
        cell: ({ row }) => (
          <div>
            <p>{row.original.reviewerName || 'Anonymous'}</p>
            {row.original.verifiedSession ? <p className="text-[13px] text-muted-foreground">Verified session</p> : null}
          </div>
        ),
      },
      { accessorKey: 'moderationStatus', header: 'Status', cell: ({ row }) => <ModerationStatusBadge status={row.original.moderationStatus} /> },
      {
        accessorKey: 'submittedAt',
        header: ({ column }) => <SortHeader label="Submitted" sorted={column.getIsSorted()} onToggle={() => column.toggleSorting(column.getIsSorted() === 'asc')} />,
        cell: ({ row }) => <span className="text-[13px] whitespace-nowrap text-muted-foreground">{formatReviewDate(row.original.submittedAt) ?? '—'}</span>,
      },
      { id: 'actions', header: () => <span className="sr-only">Actions</span>, cell: ({ row }) => <RowActions review={row.original} /> },
    ],
    [],
  )

  const total = initialReviews.length

  return (
    <div className="space-y-5">
      <AdminPageHeader title="Reviews" count={total > 0 ? `${total} total` : undefined} description="Student reviews and imported Google reviews for institutions, coaching and tutors." />

      {total === 0 ? (
        <div className="rounded-xl border border-border bg-card shadow-sm">
          <AdminEmptyState
            icon={MessageSquare}
            title="No reviews yet"
            description="Reviews from students and synced Google reviews will appear here for moderation once they are connected."
            className="py-14"
          />
        </div>
      ) : (
        <>
          <AdminToolbar
            search={f.q}
            onSearchChange={(q) => set({ q })}
            searchPlaceholder="Search reviewer, title or text"
            hasActiveFilters={active}
            onReset={reset}
            summary={active ? `${filtered.length} of ${total} match` : undefined}
          >
            <AdminFilterSelect label="Status" value={f.status} onChange={(status) => set({ status })} options={moderationStatusOptions} />
            <AdminFilterSelect label="Source" value={f.source} onChange={(source) => set({ source })} options={reviewSourceOptions} />
            <AdminFilterSelect label="For" value={f.entity} onChange={(entity) => set({ entity })} options={reviewEntityTypeOptions} />
          </AdminToolbar>

          <AdminDataTable
            columns={columns}
            data={filtered}
            onRowClick={(review) => router.push(`/admin/reviews/${review.id}`)}
            getRowAriaLabel={(review) => `Open review ${review.title ?? review.id}`}
            hasActiveFilters={active}
            onResetFilters={reset}
            emptyTitle="No reviews match"
            emptyDescription="Try a different search or clear the filters."
            mobileCardRender={(row) => {
              const review = row.original
              return (
                <Link href={`/admin/reviews/${review.id}`} className="block space-y-2 rounded-xl border border-border bg-card shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{review.title || 'Untitled review'}</p>
                      <p className="truncate text-[13px] text-muted-foreground">
                        {review.targetName || review.entityId} · {reviewSourceLabels[review.source]}
                      </p>
                    </div>
                    <ModerationStatusBadge status={review.moderationStatus} />
                  </div>
                  {review.body ? <p className="line-clamp-2 text-sm text-muted-foreground">{review.body}</p> : null}
                  <div className="flex items-center justify-between text-[13px] text-muted-foreground">
                    <span>By {review.reviewerName || 'Anonymous'}</span>
                    <Rating value={review.rating} />
                  </div>
                </Link>
              )
            }}
          />
        </>
      )}
    </div>
  )
}
