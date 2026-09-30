import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { EnquiryDetailHeader } from './enquiry-detail-header'
import { EnquirySummarySection } from './enquiry-summary-section'
import { EnquiryContactSection } from './enquiry-contact-section'
import { EnquiryRelatedEntitySection } from './enquiry-related-entity-section'
import { EnquiryMessageSection } from './enquiry-message-section'
import { EnquiryFollowupSection } from './enquiry-followup-section'
import { EnquiryNotesSection } from './enquiry-notes-section'
import { EnquiryStatusPanel } from './enquiry-status-panel'
import { EnquiryAssignmentPanel } from './enquiry-assignment-panel'
import { EnquiryRelatedRecordsPanel } from './enquiry-related-records-panel'
import { EnquiryActionsPanel } from './enquiry-actions-panel'

export function AdminEnquiryDetailView({ enquiry }: { enquiry: AdminEnquiry }) {
  return (
    <div className="space-y-6">
      <EnquiryDetailHeader enquiry={enquiry} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <EnquirySummarySection enquiry={enquiry} />
          <EnquiryContactSection enquiry={enquiry} />
          <EnquiryRelatedEntitySection enquiry={enquiry} />
          <EnquiryMessageSection enquiry={enquiry} />
          <EnquiryFollowupSection enquiry={enquiry} />
          <EnquiryNotesSection enquiry={enquiry} />
        </div>

        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <EnquiryStatusPanel enquiry={enquiry} />
            <EnquiryAssignmentPanel enquiry={enquiry} />
            <EnquiryRelatedRecordsPanel enquiry={enquiry} />
            <EnquiryActionsPanel enquiry={enquiry} />
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
