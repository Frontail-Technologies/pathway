'use client'

import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { PromotionDetailHeader } from './promotion-detail-header'
import { PromotionSummarySection } from './promotion-summary-section'
import { PromotionTargetSection } from './promotion-target-section'
import { PromotionScheduleSection } from './promotion-schedule-section'
import { PromotionStatusPanel } from './promotion-status-panel'
import { PromotionDisclosurePanel } from './promotion-disclosure-panel'
import { PromotionActionsPanel } from './promotion-actions-panel'

export function AdminPromotionDetailView({
  promotion,
}: {
  promotion: AdminPromotion
}) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <PromotionDetailHeader promotion={promotion} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <PromotionSummarySection promotion={promotion} />
          <PromotionTargetSection promotion={promotion} />
          <PromotionScheduleSection promotion={promotion} />
        </div>

        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <PromotionStatusPanel promotion={promotion} />
            <PromotionDisclosurePanel promotion={promotion} />
            <PromotionActionsPanel promotion={promotion} />
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
