import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { CoachingDetailHeader } from './coaching-detail-header'
import { CoachingOverviewSection } from './coaching-overview-section'
import { CoachingProgramsSection } from './coaching-programs-section'
import { CoachingFacultySection } from './coaching-faculty-section'
import { CoachingLocationsModesSection } from './coaching-locations-modes-section'
import { CoachingMediaGallerySection } from './coaching-media-gallery-section'
import { CoachingFaqsSection } from './coaching-faqs-section'
import { CoachingHistorySection } from './coaching-history-section'
import { CoachingQualityPanel } from './coaching-quality-panel'
import { CoachingCompletenessPanel } from './coaching-completeness-panel'
import { CoachingSourcePanel } from './coaching-source-panel'
import { CoachingActionsPanel } from './coaching-actions-panel'

export function AdminCoachingDetailView({ provider }: { provider: AdminCoachingProvider }) {
  return (
    <div className="space-y-6">
      <CoachingDetailHeader provider={provider} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <CoachingOverviewSection provider={provider} />
          <CoachingProgramsSection provider={provider} />
          <CoachingFacultySection provider={provider} />
          <CoachingLocationsModesSection provider={provider} />
          <CoachingMediaGallerySection provider={provider} />
          <CoachingFaqsSection provider={provider} />
          <CoachingHistorySection providerId={provider.id} />
        </div>

        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <CoachingQualityPanel quality={provider.quality} />
            <CoachingCompletenessPanel completeness={provider.completeness} />
            <CoachingSourcePanel sourceInfo={provider.sourceInfo} />
            <CoachingActionsPanel provider={provider} />
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
