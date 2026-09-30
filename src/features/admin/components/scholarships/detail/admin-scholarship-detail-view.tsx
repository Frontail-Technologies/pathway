import * as React from 'react'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { ScholarshipDetailHeader } from './scholarship-detail-header'
import { ScholarshipOverviewSection } from './scholarship-overview-section'
import { ScholarshipEligibilitySection } from './scholarship-eligibility-section'
import { ScholarshipBenefitsSection } from './scholarship-benefits-section'
import { ScholarshipApplicationSection } from './scholarship-application-section'
import { ScholarshipRequiredDocsSection } from './scholarship-required-docs-section'
import { ScholarshipDocumentsSection } from './scholarship-documents-section'
import { ScholarshipHistorySection } from './scholarship-history-section'
import { ScholarshipQualityPanel } from './scholarship-quality-panel'
import { ScholarshipCompletenessPanel } from './scholarship-completeness-panel'
import { ScholarshipSourcePanel } from './scholarship-source-panel'
import { ScholarshipActionsPanel } from './scholarship-actions-panel'

export function AdminScholarshipDetailView({
  scholarship,
}: {
  scholarship: AdminScholarship
}) {
  return (
    <div className="space-y-6">
      <ScholarshipDetailHeader scholarship={scholarship} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <ScholarshipOverviewSection scholarship={scholarship} />
          <ScholarshipEligibilitySection scholarship={scholarship} />
          <ScholarshipBenefitsSection scholarship={scholarship} />
          <ScholarshipApplicationSection scholarship={scholarship} />
          <ScholarshipRequiredDocsSection scholarship={scholarship} />
          <ScholarshipDocumentsSection scholarship={scholarship} />
          <ScholarshipHistorySection />
        </div>

        <AdminDetailStickyRail className="lg:col-span-4">
          <ScholarshipQualityPanel scholarship={scholarship} />
          <ScholarshipCompletenessPanel scholarship={scholarship} />
          <ScholarshipSourcePanel scholarship={scholarship} />
          <ScholarshipActionsPanel scholarship={scholarship} />
        </AdminDetailStickyRail>
      </div>
    </div>
  )
}
