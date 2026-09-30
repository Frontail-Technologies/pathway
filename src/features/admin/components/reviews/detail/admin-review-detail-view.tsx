'use client'

import type { AdminReview } from '@/features/admin/data/admin-reviews'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { ReviewDetailHeader } from './review-detail-header'
import { ReviewSummarySection } from './review-summary-section'
import { ReviewContentSection } from './review-content-section'
import { ReviewEntitySection } from './review-entity-section'
import { ReviewSourcePanel } from './review-source-panel'
import { ReviewModerationPanel } from './review-moderation-panel'
import { ReviewActionsPanel } from './review-actions-panel'

export function AdminReviewDetailView({ review }: { review: AdminReview }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <ReviewDetailHeader review={review} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <ReviewSummarySection review={review} />
          <ReviewContentSection review={review} />
          <ReviewEntitySection review={review} />
        </div>

        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <ReviewModerationPanel review={review} />
            <ReviewSourcePanel review={review} />
            <ReviewActionsPanel review={review} />
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
