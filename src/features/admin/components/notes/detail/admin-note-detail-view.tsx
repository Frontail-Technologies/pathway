'use client'

import type { AdminNote } from '@/features/admin/data/admin-notes'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { NoteDetailHeader } from './note-detail-header'
import { NoteOverviewSection } from './note-overview-section'
import { NotePreviewSection } from './note-preview-section'
import { NoteStudyClassificationSection } from './note-study-classification-section'
import { NoteRelatedEntitiesSection } from './note-related-entities-section'
import { NoteDownloadAssetSection } from './note-download-asset-section'
import { NoteHistorySection } from './note-history-section'
import { NoteStatusPanel } from './note-status-panel'
import { NotePricingPanel } from './note-pricing-panel'
import { NoteAssetStatusPanel } from './note-asset-status-panel'
import { NoteActionsPanel } from './note-actions-panel'

export function AdminNoteDetailView({ note }: { note: AdminNote }) {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <NoteDetailHeader note={note} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        { }
        <div className="lg:col-span-8 space-y-6">
          <NoteOverviewSection note={note} />
          <NotePreviewSection note={note} />
          <NoteStudyClassificationSection note={note} />
          <NoteRelatedEntitiesSection note={note} />
          <NoteDownloadAssetSection note={note} />
          <NoteHistorySection note={note} />
        </div>

        { }
        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <NoteStatusPanel note={note} />
            <NotePricingPanel note={note} />
            <NoteAssetStatusPanel note={note} />
            <NoteActionsPanel note={note} />
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
