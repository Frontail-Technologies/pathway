'use client'

import * as React from 'react'
import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import { reviewTableColumns } from './review-table-columns'
import { ReviewFilters, type ReviewFilterState } from './review-filters'
import { ReviewMobileCard } from './review-mobile-card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare } from 'lucide-react'

export function AdminReviewsView({
  initialReviews,
}: {
  initialReviews: AdminReview[]
}) {
  const [filters, setFilters] = React.useState<ReviewFilterState>({
    search: '',
    source: 'all',
    entityType: 'all',
    status: 'all',
  })

  const handleFilterChange = (key: keyof ReviewFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      source: 'all',
      entityType: 'all',
      status: 'all',
    })
  }

  const filteredData = React.useMemo(() => {
    return initialReviews.filter((review) => {
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const matchTitle = review.title?.toLowerCase().includes(query)
        const matchBody = review.body?.toLowerCase().includes(query)
        const matchReviewer = review.reviewerName?.toLowerCase().includes(query)
        const matchTarget = review.targetName?.toLowerCase().includes(query)
        if (!matchTitle && !matchBody && !matchReviewer && !matchTarget) {
          return false
        }
      }

      if (filters.source !== 'all' && review.source !== filters.source) {
        return false
      }

      if (filters.entityType !== 'all' && review.entityType !== filters.entityType) {
        return false
      }

      if (filters.status !== 'all') {
        const currentStatus = review.moderationStatus ?? 'published'
        if (currentStatus !== filters.status) {
          return false
        }
      }

      return true
    })
  }, [initialReviews, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              Reviews
            </h1>
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 border-0"
            >
              {initialReviews.length} Reviews
            </Badge>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
        <ReviewFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {initialReviews.length === 0 ? (
          <div className="p-12 text-center bg-muted/10 rounded-xl border border-dashed border-border/80 space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">No reviews yet.</h3>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <AdminDataTable
                columns={reviewTableColumns}
                data={filteredData}
                pageSize={10}
              />
            </div>

            <div className="md:hidden space-y-3">
              {filteredData.length > 0 ? (
                filteredData.map((review) => (
                  <ReviewMobileCard key={review.id} review={review} />
                ))
              ) : (
                <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground text-xs">
                  No reviews found matching current filter criteria.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
