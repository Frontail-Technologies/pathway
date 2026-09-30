'use client'

import type { AdminBanner } from '@/features/admin/data/admin-banners'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { BannerDetailHeader } from './banner-detail-header'
import { BannerLivePreview } from './banner-live-preview'
import { BannerContentSection } from './banner-content-section'
import { BannerCtaSection } from './banner-cta-section'
import { BannerMediaSection } from './banner-media-section'
import { BannerScheduleSection } from './banner-schedule-section'
import { BannerHistorySection } from './banner-history-section'
import { BannerStatusPanel } from './banner-status-panel'
import { BannerPlacementPanel } from './banner-placement-panel'
import { BannerDestinationPanel } from './banner-destination-panel'
import { BannerActionsPanel } from './banner-actions-panel'

export function AdminBannerDetailView({ banner }: { banner: AdminBanner }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <BannerDetailHeader banner={banner} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        { }
        <div className="lg:col-span-8 space-y-6">
          <BannerLivePreview banner={banner} />
          <BannerContentSection banner={banner} />
          <BannerCtaSection banner={banner} />
          <BannerMediaSection banner={banner} />
          <BannerScheduleSection banner={banner} />
          <BannerHistorySection banner={banner} />
        </div>

        { }
        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <BannerStatusPanel banner={banner} />
            <BannerPlacementPanel banner={banner} />
            <BannerDestinationPanel banner={banner} />
            <BannerActionsPanel banner={banner} />
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
