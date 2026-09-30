import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { AdminDetailStickyRail } from '@/features/admin/components/admin-detail-sticky-rail'
import { TutorDetailHeader } from './tutor-detail-header'
import { TutorOverviewSection } from './tutor-overview-section'
import { TutorSubjectsExamsSection } from './tutor-subjects-exams-section'
import { TutorTeachingProfileSection } from './tutor-teaching-profile-section'
import { TutorLanguagesModesSection } from './tutor-languages-modes-section'
import { TutorPortraitMediaSection } from './tutor-portrait-media-section'
import { TutorHistorySection } from './tutor-history-section'
import { TutorQualityPanel } from './tutor-quality-panel'
import { TutorCompletenessPanel } from './tutor-completeness-panel'
import { TutorSourcePanel } from './tutor-source-panel'
import { TutorActionsPanel } from './tutor-actions-panel'

export function AdminTutorDetailView({ tutor }: { tutor: AdminTutor }) {
  return (
    <div className="space-y-6">
      <TutorDetailHeader tutor={tutor} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <TutorOverviewSection tutor={tutor} />
          <TutorSubjectsExamsSection tutor={tutor} />
          <TutorTeachingProfileSection tutor={tutor} />
          <TutorLanguagesModesSection tutor={tutor} />
          <TutorPortraitMediaSection tutor={tutor} />
          <TutorHistorySection tutorId={tutor.id} />
        </div>

        <div className="lg:col-span-4">
          <AdminDetailStickyRail>
            <TutorQualityPanel quality={tutor.quality} />
            <TutorCompletenessPanel completeness={tutor.completeness} />
            <TutorSourcePanel sourceInfo={tutor.sourceInfo} />
            <TutorActionsPanel tutor={tutor} />
          </AdminDetailStickyRail>
        </div>
      </div>
    </div>
  )
}
