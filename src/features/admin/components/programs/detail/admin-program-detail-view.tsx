'use client'

import * as React from 'react'
import type { AdminProgramDetail } from '@/features/admin/types/programs'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { ProgramDetailHeader } from './program-detail-header'
import { ProgramOverviewSection } from './program-overview-section'
import { ProgramEligibilitySection } from './program-eligibility-section'
import { ProgramCurriculumSection } from './program-curriculum-section'
import { ProgramDocumentsSection } from './program-documents-section'
import { ProgramExamsSection } from './program-exams-section'
import { ProgramInstitutionsSection } from './program-institutions-section'
import { ProgramCareerSection } from './program-career-section'
import { ProgramHistorySection } from './program-history-section'
import { ProgramQualityPanel } from './program-quality-panel'
import { ProgramCompletenessPanel } from './program-completeness-panel'
import { ProgramSourcePanel } from './program-source-panel'
import { ProgramActionsPanel } from './program-actions-panel'

export function AdminProgramDetailView({
  data,
}: {
  data: AdminProgramDetail
}) {
  const { program, detail } = data

  return (
    <div className="space-y-6">
      <ProgramDetailHeader program={program} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <ProgramOverviewSection program={program} detail={detail} />
          <ProgramEligibilitySection program={program} detail={detail} />
          <ProgramCurriculumSection syllabus={detail?.syllabus} />
          <ProgramDocumentsSection documents={program.documents} programId={program.id} />
          <ProgramExamsSection exams={detail?.exams} fallbackExams={program.entranceExams} />
          <ProgramInstitutionsSection offerings={program.offerings} />
          <ProgramCareerSection
            careerMetrics={detail?.careerMetrics}
            careers={detail?.careers}
            careerAreas={program.careerAreas}
          />
          <ProgramHistorySection />
        </div>

        <AdminDetailStickyRail className="lg:col-span-4">
          <ProgramQualityPanel program={program} />
          <ProgramCompletenessPanel program={program} />
          <ProgramSourcePanel />
          <ProgramActionsPanel program={program} />
        </AdminDetailStickyRail>
      </div>
    </div>
  )
}
