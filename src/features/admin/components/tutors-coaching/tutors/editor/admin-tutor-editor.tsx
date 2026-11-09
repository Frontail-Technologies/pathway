'use client'

import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { AdminEditorSectionNav } from '../../../admin-editor-section-nav'
import { AdminEditorLayout } from '../../../shared/admin-editor-layout'
import { AdminPageHeader } from '../../../kit'
import { EditorActions, MobileSaveBar, SaveNotice, useEditorGuard } from '../../shared/editor-kit'
import { useTutorEditor } from './use-tutor-editor'
import { TutorIdentitySection } from './sections/tutor-identity-section'
import { TutorBioSection } from './sections/tutor-bio-section'
import { TutorSubjectsExamsSection } from './sections/tutor-subjects-exams-section'
import { TutorTeachingProfileSection } from './sections/tutor-teaching-profile-section'
import { TutorLanguagesModesSection } from './sections/tutor-languages-modes-section'
import { TutorPortraitSection } from './sections/tutor-portrait-section'
import { TutorSourceSection } from './sections/tutor-source-section'

const SECTIONS = [
  { id: 'identity', label: 'Basics' },
  { id: 'bio', label: 'Bio' },
  { id: 'subjects', label: 'Subjects and exams' },
  { id: 'teaching', label: 'Teaching approach' },
  { id: 'languages', label: 'Languages and mode' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'source', label: 'Source' },
]
const SECTION_IDS = SECTIONS.map((section) => section.id)

export function AdminTutorEditor({ initialTutor }: { initialTutor?: AdminTutor }) {
  const editor = useTutorEditor(initialTutor)
  const { formData, isEditing, errors, saveStatus, saveMessage } = editor
  const backHref = isEditing ? `/admin/tutors-coaching/tutors/${formData.id}` : '/admin/tutors-coaching'
  const { dirty, markSaved, cancel } = useEditorGuard(formData, backHref)
  const { activeSectionId, scrollToSection } = useAdminScrollSpy({ sectionIds: SECTION_IDS, offset: 120 })

  const actions = {
    onCancel: cancel,
    onSave: () => editor.handleSave(markSaved),
    saveStatus,
    saveLabel: isEditing ? 'Save changes' : 'Create tutor',
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <AdminPageHeader
        back={isEditing ? { href: backHref, label: initialTutor?.name ?? 'Tutor' } : { href: backHref, label: 'Tutors & coaching' }}
        title={isEditing ? `Edit ${initialTutor?.name ?? 'tutor'}` : 'Add tutor'}
        meta={dirty ? <span className="text-[13px] text-muted-foreground">Unsaved changes</span> : undefined}
      />

      <SaveNotice status={saveStatus} message={saveMessage} />

      <AdminEditorLayout
        navigation={<AdminEditorSectionNav sections={SECTIONS} activeSectionId={activeSectionId} onSectionChange={scrollToSection} />}
        mobileActions={<MobileSaveBar dirty={dirty} {...actions} />}
      >
        <TutorIdentitySection formData={formData} errors={errors} updateField={editor.updateField} />
        <TutorBioSection formData={formData} errors={errors} updateField={editor.updateField} addArrayString={editor.addArrayString} removeArrayString={editor.removeArrayString} />
        <TutorSubjectsExamsSection formData={formData} errors={errors} toggleArrayItem={editor.toggleArrayItem} />
        <TutorTeachingProfileSection formData={formData} addArrayString={editor.addArrayString} removeArrayString={editor.removeArrayString} />
        <TutorLanguagesModesSection formData={formData} errors={errors} toggleArrayItem={editor.toggleArrayItem} />
        <TutorPortraitSection formData={formData} updateField={editor.updateField} updateAvatarField={editor.updateAvatarField} />
        <TutorSourceSection />
      </AdminEditorLayout>
    </div>
  )
}
