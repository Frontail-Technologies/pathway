import { AdminSeoRecord } from '@/features/admin/data/admin-seo'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { SeoDetailHeader } from './seo-detail-header'
import { SeoSearchPreview } from './seo-search-preview'
import { SeoSocialPreview } from './seo-social-preview'
import { SeoMetadataSection } from './seo-metadata-section'
import { SeoCanonicalSection } from './seo-canonical-section'
import { SeoTargetInfoSection } from './seo-target-info-section'
import { SeoHistorySection } from './seo-history-section'
import { SeoStatusPanel } from './seo-status-panel'
import { SeoTargetPanel } from './seo-target-panel'
import { SeoOverridePanel } from './seo-override-panel'
import { SeoActionsPanel } from './seo-actions-panel'

export function AdminSeoDetailView({ record }: { record: AdminSeoRecord }) {
  return (
    <div className="space-y-6">
      <SeoDetailHeader record={record} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        { }
        <div className="lg:col-span-8 space-y-6">
          <SeoSearchPreview metadata={record.resolvedMetadata} />
          <SeoSocialPreview metadata={record.resolvedMetadata} />
          <SeoMetadataSection record={record} />
          <SeoCanonicalSection record={record} />
          <SeoTargetInfoSection record={record} />
          <SeoHistorySection record={record} />
        </div>

        { }
        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <div className="space-y-4">
              <SeoStatusPanel record={record} />
              <SeoTargetPanel record={record} />
              <SeoOverridePanel record={record} />
              <SeoActionsPanel record={record} />
            </div>
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
