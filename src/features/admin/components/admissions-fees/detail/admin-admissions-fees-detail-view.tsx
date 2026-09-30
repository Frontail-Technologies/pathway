import * as React from 'react'
import { type AdminProgramOfferingDetail } from '@/features/admin/data/admin-admissions-fees'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { AdmissionsFeesDetailHeader } from './admissions-fees-detail-header'
import { AdmissionsFeesOverviewSection } from './admissions-fees-overview-section'
import { AdmissionsFeesStructureSection } from './admissions-fees-structure-section'
import { AdmissionsFeesEligibilitySection } from './admissions-fees-eligibility-section'
import { AdmissionsFeesExamsSection } from './admissions-fees-exams-section'
import { AdmissionsFeesProcessSection } from './admissions-fees-process-section'
import { AdmissionsFeesDocumentsSection } from './admissions-fees-documents-section'
import { AdmissionsFeesHistorySection } from './admissions-fees-history-section'
import { AdmissionsFeesQualityPanel } from './admissions-fees-quality-panel'
import { AdmissionsFeesCompletenessPanel } from './admissions-fees-completeness-panel'
import { AdmissionsFeesSourcePanel } from './admissions-fees-source-panel'
import { AdmissionsFeesActionsPanel } from './admissions-fees-actions-panel'

export function AdminAdmissionsFeesDetailView({
  data,
}: {
  data: AdminProgramOfferingDetail
}) {
  const { offering } = data

  return (
    <div className="space-y-6">
      <AdmissionsFeesDetailHeader offering={offering} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <AdmissionsFeesOverviewSection offering={offering} />
          <AdmissionsFeesStructureSection offering={offering} />
          <AdmissionsFeesEligibilitySection offering={offering} />
          <AdmissionsFeesExamsSection offering={offering} />
          <AdmissionsFeesProcessSection offering={offering} />
          <AdmissionsFeesDocumentsSection offering={offering} />
          <AdmissionsFeesHistorySection />
        </div>

        <AdminDetailStickyRail className="lg:col-span-4">
          <AdmissionsFeesQualityPanel offering={offering} />
          <AdmissionsFeesCompletenessPanel offering={offering} />
          <AdmissionsFeesSourcePanel offering={offering} />
          <AdmissionsFeesActionsPanel offering={offering} />
        </AdminDetailStickyRail>
      </div>
    </div>
  )
}
