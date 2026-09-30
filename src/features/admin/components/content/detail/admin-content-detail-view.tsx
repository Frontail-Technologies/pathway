'use client'

import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { ContentDetailHeader } from './content-detail-header'
import { ContentBodyPreview } from './content-body-preview'
import { ContentMediaSection } from './content-media-section'
import { ContentRelatedEntitiesSection } from './content-related-entities-section'
import { ContentStatusPanel } from './content-status-panel'
import { ContentMetadataPanel } from './content-metadata-panel'
import { ContentPublicPagePanel } from './content-public-page-panel'
import { ContentActionsPanel } from './content-actions-panel'

export function AdminContentDetailView({
  entry,
}: {
  entry: AdminContentEntry
}) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <ContentDetailHeader entry={entry} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <ContentBodyPreview entry={entry} />
          <ContentMediaSection entry={entry} />
          <ContentRelatedEntitiesSection entry={entry} />
        </div>

        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <ContentStatusPanel entry={entry} />
            <ContentMetadataPanel entry={entry} />
            <ContentPublicPagePanel entry={entry} />
            <ContentActionsPanel entry={entry} />
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
