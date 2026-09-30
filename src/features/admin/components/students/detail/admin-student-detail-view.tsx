import type { AdminStudent } from '@/features/admin/data/admin-students'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { StudentDetailHeader } from './student-detail-header'
import { StudentOverviewSection } from './student-overview-section'
import { StudentEducationSection } from './student-education-section'
import { StudentPreferencesSection } from './student-preferences-section'
import { StudentCareerExperienceSection } from './student-career-experience-section'
import { StudentCrossModuleSection } from './student-cross-module-section'
import { StudentCompletenessPanel } from './student-completeness-panel'
import { StudentAccountStatusPanel } from './student-account-status-panel'
import { StudentSourcePanel } from './student-source-panel'
import { StudentActionsPanel } from './student-actions-panel'

export function AdminStudentDetailView({ student }: { student: AdminStudent }) {
  return (
    <div className="space-y-6">
      <StudentDetailHeader student={student} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <StudentOverviewSection student={student} />
          <StudentEducationSection student={student} />
          <StudentPreferencesSection student={student} />
          <StudentCareerExperienceSection student={student} />
          <StudentCrossModuleSection />
        </div>

        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <StudentCompletenessPanel student={student} />
            <StudentAccountStatusPanel student={student} />
            <StudentSourcePanel student={student} />
            <StudentActionsPanel student={student} />
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
